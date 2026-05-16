"""Глобальные горячие клавиши (работают, когда окно свёрнуто/в трее)."""

from __future__ import annotations

from typing import Callable

import keyboard


class HotkeyManager:
    """Тонкая обёртка над `keyboard`. Колбэк вызывается в потоке
    библиотеки keyboard — пробрасывайте его в Qt через сигнал."""

    def __init__(self) -> None:
        self._handle = None
        self._combo: str | None = None

    def register(self, combo: str, callback: Callable[[], None]) -> None:
        self.unregister()
        self._combo = combo
        # suppress=False — не блокируем комбинацию для других приложений.
        self._handle = keyboard.add_hotkey(combo, callback, suppress=False)

    def unregister(self) -> None:
        if self._handle is not None:
            try:
                keyboard.remove_hotkey(self._handle)
            except (KeyError, ValueError):
                pass
            self._handle = None

    @property
    def combo(self) -> str | None:
        return self._combo
