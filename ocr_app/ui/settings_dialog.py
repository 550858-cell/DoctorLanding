"""Диалог настроек: язык OCR, горячая клавиша, поведение."""

from __future__ import annotations

from PyQt6.QtWidgets import (
    QCheckBox,
    QComboBox,
    QDialog,
    QDialogButtonBox,
    QFormLayout,
    QLineEdit,
    QVBoxLayout,
)

from core.ocr_engine import available_languages


class SettingsDialog(QDialog):
    def __init__(self, settings: dict, parent=None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Настройки SimpleOCR")
        self.setMinimumWidth(380)
        self._settings = dict(settings)

        form = QFormLayout()

        self.lang_box = QComboBox()
        self.lang_box.addItem("Авто (русский → английский)", "")
        langs = available_languages()
        for tag in langs:
            self.lang_box.addItem(tag, tag)
        current = settings.get("lang_tag", "")
        idx = self.lang_box.findData(current)
        self.lang_box.setCurrentIndex(idx if idx >= 0 else 0)
        form.addRow("Язык OCR:", self.lang_box)

        self.hotkey_edit = QLineEdit(settings.get("hotkey", "ctrl+shift+s"))
        form.addRow("Горячая клавиша:", self.hotkey_edit)

        self.auto_copy = QCheckBox("Копировать в буфер автоматически")
        self.auto_copy.setChecked(bool(settings.get("auto_copy", True)))

        self.tray = QCheckBox("Сворачивать в трей при закрытии")
        self.tray.setChecked(bool(settings.get("minimize_to_tray", True)))

        buttons = QDialogButtonBox(
            QDialogButtonBox.StandardButton.Ok
            | QDialogButtonBox.StandardButton.Cancel
        )
        buttons.accepted.connect(self.accept)
        buttons.rejected.connect(self.reject)

        root = QVBoxLayout(self)
        root.addLayout(form)
        root.addWidget(self.auto_copy)
        root.addWidget(self.tray)
        root.addWidget(buttons)

        if not langs:
            self.lang_box.setEnabled(False)

    def result_settings(self) -> dict:
        self._settings.update(
            {
                "lang_tag": self.lang_box.currentData() or "",
                "hotkey": self.hotkey_edit.text().strip() or "ctrl+shift+s",
                "auto_copy": self.auto_copy.isChecked(),
                "minimize_to_tray": self.tray.isChecked(),
            }
        )
        return self._settings
