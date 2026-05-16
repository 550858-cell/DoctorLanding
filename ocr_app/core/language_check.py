"""Проверка установленных OCR-языковых пакетов Windows."""

from __future__ import annotations

from dataclasses import dataclass

from .ocr_engine import available_languages, is_language_available

RUSSIAN_TAGS = ("ru", "ru-RU")

INSTALL_INSTRUCTION = (
    "Языковой пакет распознавания для русского языка не установлен.\n\n"
    "Как установить:\n"
    "1. Откройте «Параметры» Windows (Win + I).\n"
    "2. Время и язык  →  Язык и регион  (Time & Language → Language).\n"
    "3. «Добавить язык» (Add a language)  →  выберите «Русский».\n"
    "4. Откройте установленный язык  →  «Параметры»  →\n"
    "   «Дополнительные компоненты»  →  установите\n"
    "   «Базовый набор для ввода» (Optional features → Basic typing).\n"
    "5. Перезапустите приложение.\n\n"
    "Без пакета распознавание для русского недоступно — будет\n"
    "использован любой другой установленный OCR-язык."
)


@dataclass
class LanguageStatus:
    russian_ok: bool
    installed: list[str]

    @property
    def has_any(self) -> bool:
        return bool(self.installed)


def check_languages() -> LanguageStatus:
    installed = available_languages()
    russian_ok = any(is_language_available(tag) for tag in RUSSIAN_TAGS)
    return LanguageStatus(russian_ok=russian_ok, installed=installed)


if __name__ == "__main__":
    st = check_languages()
    print("Установленные OCR-языки:", st.installed or "нет")
    print("Русский доступен:", st.russian_ok)
    if not st.russian_ok:
        print("\n" + INSTALL_INSTRUCTION)
