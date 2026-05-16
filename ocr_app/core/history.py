"""История распознаваний и настройки в %APPDATA%/SimpleOCR/."""

from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path

APP_DIR_NAME = "SimpleOCR"
MAX_HISTORY = 10


def app_dir() -> Path:
    base = os.environ.get("APPDATA") or str(Path.home())
    d = Path(base) / APP_DIR_NAME
    d.mkdir(parents=True, exist_ok=True)
    return d


HISTORY_FILE = lambda: app_dir() / "history.json"  # noqa: E731
SETTINGS_FILE = lambda: app_dir() / "settings.json"  # noqa: E731

DEFAULT_SETTINGS = {
    "lang_tag": "",          # пусто = автоопределение
    "hotkey": "ctrl+shift+s",
    "auto_copy": True,
    "minimize_to_tray": True,
}


def _read_json(path: Path, fallback):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return fallback


def _write_json(path: Path, data) -> None:
    try:
        path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
        )
    except OSError:
        pass


def load_settings() -> dict:
    data = _read_json(SETTINGS_FILE(), {})
    merged = {**DEFAULT_SETTINGS, **(data if isinstance(data, dict) else {})}
    return merged


def save_settings(settings: dict) -> None:
    _write_json(SETTINGS_FILE(), settings)


def load_history() -> list[dict]:
    data = _read_json(HISTORY_FILE(), [])
    return data if isinstance(data, list) else []


def add_history(text: str) -> list[dict]:
    text = (text or "").strip()
    if not text:
        return load_history()
    items = load_history()
    items.insert(
        0,
        {"text": text, "ts": datetime.now().strftime("%Y-%m-%d %H:%M:%S")},
    )
    items = items[:MAX_HISTORY]
    _write_json(HISTORY_FILE(), items)
    return items


def clear_history() -> None:
    _write_json(HISTORY_FILE(), [])
