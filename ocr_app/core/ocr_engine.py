"""Обёртка над нативным Windows OCR (Windows.Media.Ocr) через winsdk.

Синхронный API поверх асинхронного winsdk — предназначен для вызова
из QThread (см. ui/main_window.py).
"""

from __future__ import annotations

import asyncio
import io
from dataclasses import dataclass

from winsdk.windows.media.ocr import OcrEngine
from winsdk.windows.globalization import Language
from winsdk.windows.graphics.imaging import BitmapDecoder
from winsdk.windows.storage.streams import (
    DataWriter,
    InMemoryRandomAccessStream,
)

# Языки по умолчанию: сначала русский, затем английский.
DEFAULT_LANG_PRIORITY = ("ru", "ru-RU", "en", "en-US")


class OcrError(Exception):
    """Ошибка распознавания (например, язык не установлен в системе)."""


@dataclass
class OcrResult:
    text: str
    lang_tag: str


def available_languages() -> list[str]:
    """BCP-47 теги языков, для которых в системе есть OCR-движок."""
    return [
        lang.language_tag
        for lang in OcrEngine.available_recognizer_languages
    ]


def is_language_available(lang_tag: str) -> bool:
    try:
        return bool(OcrEngine.is_language_supported(Language(lang_tag)))
    except Exception:
        return False


def _pick_engine(lang_tag: str | None) -> tuple[OcrEngine, str]:
    """Создаёт движок для указанного языка либо подбирает доступный."""
    candidates: list[str] = []
    if lang_tag:
        candidates.append(lang_tag)
    candidates.extend(DEFAULT_LANG_PRIORITY)

    for tag in candidates:
        try:
            engine = OcrEngine.try_create_from_language(Language(tag))
        except Exception:
            engine = None
        if engine is not None:
            return engine, tag

    # Последняя попытка — язык, заданный профилем пользователя Windows.
    engine = OcrEngine.try_create_from_user_profile_languages()
    if engine is not None:
        installed = available_languages()
        return engine, (installed[0] if installed else "user-profile")

    raise OcrError(
        "Не найден ни один установленный OCR-язык. "
        "Установите языковой пакет (см. инструкцию в приложении)."
    )


async def _recognize_async(
    image_bytes: bytes, lang_tag: str | None
) -> OcrResult:
    stream = InMemoryRandomAccessStream()
    writer = DataWriter(stream.get_output_stream_at(0))
    writer.write_bytes(image_bytes)
    await writer.store_async()
    await writer.flush_async()
    writer.detach_stream()
    stream.seek(0)

    decoder = await BitmapDecoder.create_async(stream)
    bitmap = await decoder.get_software_bitmap_async()

    engine, used_tag = _pick_engine(lang_tag)
    result = await engine.recognize_async(bitmap)
    return OcrResult(text=result.text or "", lang_tag=used_tag)


def recognize_bytes(image_bytes: bytes, lang_tag: str | None = None) -> OcrResult:
    """Синхронное распознавание из байтов изображения (любой формат,
    поддерживаемый WIC: png/jpg/bmp/tiff/...)."""
    if not image_bytes:
        raise OcrError("Пустое изображение.")
    try:
        return asyncio.run(_recognize_async(image_bytes, lang_tag))
    except OcrError:
        raise
    except Exception as exc:  # winsdk/COM ошибки
        raise OcrError(f"Сбой OCR: {exc}") from exc


def recognize_pil(image, lang_tag: str | None = None) -> OcrResult:
    """Распознавание из объекта PIL.Image."""
    buf = io.BytesIO()
    if image.mode not in ("RGB", "RGBA", "L"):
        image = image.convert("RGB")
    image.save(buf, format="PNG")
    return recognize_bytes(buf.getvalue(), lang_tag)


def recognize_file(path: str, lang_tag: str | None = None) -> OcrResult:
    """Распознавание из файла изображения."""
    with open(path, "rb") as fh:
        return recognize_bytes(fh.read(), lang_tag)


if __name__ == "__main__":
    # Мини-тест: генерируем картинки с русским и английским текстом
    # и прогоняем через нативный OCR. Запускать на Windows 10+.
    from PIL import Image, ImageDraw, ImageFont

    def make_image(text: str) -> Image.Image:
        img = Image.new("RGB", (640, 140), "white")
        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.truetype("arial.ttf", 48)
        except OSError:
            font = ImageFont.load_default()
        draw.text((20, 40), text, fill="black", font=font)
        return img

    print("Установленные OCR-языки:", available_languages())

    for sample, tag in (
        ("Привет, мир! 1234", "ru"),
        ("Hello world 5678", "en"),
    ):
        try:
            res = recognize_pil(make_image(sample), tag)
            print(f"[{tag}] ожидалось ~ {sample!r} -> {res.text!r} "
                  f"(движок: {res.lang_tag})")
        except OcrError as e:
            print(f"[{tag}] ОШИБКА: {e}")
