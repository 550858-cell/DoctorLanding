"""Главное окно SimpleOCR: кнопки, результат, история, трей, хоткей."""

from __future__ import annotations

import sys
from pathlib import Path

import pyperclip
from PIL import Image, ImageGrab
from PyQt6.QtCore import QObject, Qt, QThread, pyqtSignal
from PyQt6.QtGui import QAction, QGuiApplication, QIcon
from PyQt6.QtWidgets import (
    QApplication,
    QFileDialog,
    QHBoxLayout,
    QLabel,
    QListWidget,
    QListWidgetItem,
    QMainWindow,
    QMenu,
    QMessageBox,
    QPushButton,
    QSystemTrayIcon,
    QTextEdit,
    QVBoxLayout,
    QWidget,
)

from core import history as hist
from core.hotkeys import HotkeyManager
from core.language_check import INSTALL_INSTRUCTION, check_languages
from core.ocr_engine import OcrError, recognize_pil
from ui.settings_dialog import SettingsDialog
from ui.snip_overlay import SnipOverlay

ICON_PATH = Path(__file__).resolve().parent.parent / "resources" / "icon.ico"
IMAGE_FILTER = (
    "Изображения (*.png *.jpg *.jpeg *.bmp *.webp *.tiff *.tif)"
)


class OcrWorker(QThread):
    """OCR в отдельном потоке — UI не зависает."""

    done = pyqtSignal(str, str)   # text, lang_tag
    failed = pyqtSignal(str)

    def __init__(self, image: Image.Image, lang_tag: str | None) -> None:
        super().__init__()
        self._image = image
        self._lang = lang_tag or None

    def run(self) -> None:
        try:
            res = recognize_pil(self._image, self._lang)
            self.done.emit(res.text, res.lang_tag)
        except OcrError as e:
            self.failed.emit(str(e))
        except Exception as e:  # noqa: BLE001
            self.failed.emit(f"Неожиданная ошибка: {e}")


class HotkeyBridge(QObject):
    """Перебрасывает колбэк keyboard (чужой поток) в поток Qt."""

    triggered = pyqtSignal()


class MainWindow(QMainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("SimpleOCR — текст с экрана")
        self.resize(880, 560)
        if ICON_PATH.exists():
            self.setWindowIcon(QIcon(str(ICON_PATH)))

        self.settings = hist.load_settings()
        self._worker: OcrWorker | None = None

        self._build_ui()
        self._build_tray()
        self._build_overlay()
        self._build_hotkey()

        self._refresh_history()
        self._check_languages_first_run()

    # ---------- UI ----------------------------------------------------
    def _build_ui(self) -> None:
        central = QWidget()
        root = QHBoxLayout(central)

        # --- левая колонка: история ---
        left = QVBoxLayout()
        left.addWidget(QLabel("История (последние 10)"))
        self.history_list = QListWidget()
        self.history_list.setMaximumWidth(240)
        self.history_list.itemClicked.connect(self._restore_from_history)
        left.addWidget(self.history_list)
        clear_btn = QPushButton("Очистить историю")
        clear_btn.clicked.connect(self._clear_history)
        left.addWidget(clear_btn)

        # --- правая колонка: действия + результат ---
        right = QVBoxLayout()
        actions = QHBoxLayout()
        self.btn_snip = QPushButton("Выделить область")
        self.btn_open = QPushButton("Открыть изображение")
        self.btn_clip = QPushButton("Из буфера")
        self.btn_snip.clicked.connect(self.start_snip)
        self.btn_open.clicked.connect(self.open_image)
        self.btn_clip.clicked.connect(self.from_clipboard)
        for b in (self.btn_snip, self.btn_open, self.btn_clip):
            actions.addWidget(b)
        right.addLayout(actions)

        self.status = QLabel("Готово. Ctrl+Shift+S — захват области.")
        self.status.setStyleSheet("color:#5A6A68;")
        right.addWidget(self.status)

        self.result = QTextEdit()
        self.result.setPlaceholderText("Распознанный текст появится здесь…")
        right.addWidget(self.result)

        bottom = QHBoxLayout()
        self.btn_copy = QPushButton("Скопировать снова")
        self.btn_copy.clicked.connect(self._copy_again)
        self.btn_settings = QPushButton("Настройки")
        self.btn_settings.clicked.connect(self._open_settings)
        bottom.addWidget(self.btn_copy)
        bottom.addWidget(self.btn_settings)
        bottom.addStretch(1)
        right.addLayout(bottom)

        root.addLayout(left)
        root.addLayout(right, 1)
        self.setCentralWidget(central)

    def _build_tray(self) -> None:
        icon = QIcon(str(ICON_PATH)) if ICON_PATH.exists() else QIcon()
        self.tray = QSystemTrayIcon(icon, self)
        self.tray.setToolTip("SimpleOCR")
        menu = QMenu()
        act_show = QAction("Открыть окно", self)
        act_snip = QAction("Захват области", self)
        act_quit = QAction("Выход", self)
        act_show.triggered.connect(self._restore_window)
        act_snip.triggered.connect(self.start_snip)
        act_quit.triggered.connect(self._quit)
        menu.addAction(act_show)
        menu.addAction(act_snip)
        menu.addSeparator()
        menu.addAction(act_quit)
        self.tray.setContextMenu(menu)
        self.tray.activated.connect(self._tray_activated)
        self.tray.show()

    def _build_overlay(self) -> None:
        self.overlay = SnipOverlay()
        self.overlay.captured.connect(self._on_captured)
        self.overlay.cancelled.connect(
            lambda: self._set_status("Захват отменён.")
        )

    def _build_hotkey(self) -> None:
        self._bridge = HotkeyBridge()
        self._bridge.triggered.connect(self.start_snip)
        self.hotkeys = HotkeyManager()
        try:
            self.hotkeys.register(
                self.settings.get("hotkey", "ctrl+shift+s"),
                self._bridge.triggered.emit,
            )
        except Exception as e:  # noqa: BLE001
            self._set_status(f"Не удалось назначить хоткей: {e}")

    # ---------- действия ---------------------------------------------
    def start_snip(self) -> None:
        if self._worker and self._worker.isRunning():
            return
        self.hide()
        QApplication.processEvents()
        self.overlay.start()

    def open_image(self) -> None:
        path, _ = QFileDialog.getOpenFileName(
            self, "Выберите изображение", "", IMAGE_FILTER
        )
        if not path:
            return
        try:
            img = Image.open(path)
            img.load()
        except Exception as e:  # noqa: BLE001
            self._error(f"Не удалось открыть файл: {e}")
            return
        self._run_ocr(img)

    def from_clipboard(self) -> None:
        try:
            data = ImageGrab.grabclipboard()
        except Exception as e:  # noqa: BLE001
            self._error(f"Буфер обмена недоступен: {e}")
            return
        if isinstance(data, list) and data:
            try:
                data = Image.open(data[0])
            except Exception:
                data = None
        if not isinstance(data, Image.Image):
            self._error("В буфере обмена нет изображения.")
            return
        self._run_ocr(data)

    def _on_captured(self, image: Image.Image) -> None:
        self._restore_window()
        self._run_ocr(image)

    # ---------- OCR ---------------------------------------------------
    def _run_ocr(self, image: Image.Image) -> None:
        if self._worker and self._worker.isRunning():
            return
        self._set_status("Распознавание…")
        self._set_busy(True)
        self._worker = OcrWorker(
            image, self.settings.get("lang_tag", "") or None
        )
        self._worker.done.connect(self._on_ocr_done)
        self._worker.failed.connect(self._on_ocr_failed)
        self._worker.finished.connect(lambda: self._set_busy(False))
        self._worker.start()

    def _on_ocr_done(self, text: str, lang_tag: str) -> None:
        text = text.strip()
        self.result.setPlainText(text)
        if not text:
            self._set_status(f"Текст не найден (язык: {lang_tag}).")
            return
        if self.settings.get("auto_copy", True):
            self._safe_copy(text)
            self._set_status(
                f"Распознано ({lang_tag}) и скопировано в буфер."
            )
        else:
            self._set_status(f"Распознано (язык: {lang_tag}).")
        hist.add_history(text)
        self._refresh_history()

    def _on_ocr_failed(self, message: str) -> None:
        self._error(message)
        self._set_status("Ошибка распознавания.")

    # ---------- история ----------------------------------------------
    def _refresh_history(self) -> None:
        self.history_list.clear()
        for entry in hist.load_history():
            preview = entry["text"].replace("\n", " ")[:48]
            item = QListWidgetItem(f"{entry['ts']}\n{preview}")
            item.setData(Qt.ItemDataRole.UserRole, entry["text"])
            self.history_list.addItem(item)

    def _restore_from_history(self, item: QListWidgetItem) -> None:
        self.result.setPlainText(item.data(Qt.ItemDataRole.UserRole))
        self._set_status("Текст восстановлен из истории.")

    def _clear_history(self) -> None:
        hist.clear_history()
        self._refresh_history()
        self._set_status("История очищена.")

    # ---------- буфер/настройки --------------------------------------
    def _copy_again(self) -> None:
        text = self.result.toPlainText().strip()
        if text:
            self._safe_copy(text)
            self._set_status("Скопировано в буфер.")

    def _safe_copy(self, text: str) -> None:
        try:
            pyperclip.copy(text)
        except Exception:  # noqa: BLE001
            QGuiApplication.clipboard().setText(text)

    def _open_settings(self) -> None:
        dlg = SettingsDialog(self.settings, self)
        if dlg.exec():
            self.settings = dlg.result_settings()
            hist.save_settings(self.settings)
            try:
                self.hotkeys.register(
                    self.settings["hotkey"], self._bridge.triggered.emit
                )
            except Exception as e:  # noqa: BLE001
                self._error(f"Хоткей не назначен: {e}")
            self._set_status("Настройки сохранены.")

    # ---------- языковые пакеты --------------------------------------
    def _check_languages_first_run(self) -> None:
        st = check_languages()
        if not st.has_any:
            QMessageBox.warning(
                self, "Нет OCR-языков", INSTALL_INSTRUCTION
            )
        elif not st.russian_ok:
            QMessageBox.information(
                self, "Русский язык OCR не установлен", INSTALL_INSTRUCTION
            )

    # ---------- трей / окно ------------------------------------------
    def _tray_activated(self, reason) -> None:
        if reason == QSystemTrayIcon.ActivationReason.Trigger:
            self._restore_window()

    def _restore_window(self) -> None:
        self.showNormal()
        self.raise_()
        self.activateWindow()

    def _quit(self) -> None:
        self.hotkeys.unregister()
        self.tray.hide()
        QApplication.quit()

    def closeEvent(self, event) -> None:
        if self.settings.get("minimize_to_tray", True):
            event.ignore()
            self.hide()
            self.tray.showMessage(
                "SimpleOCR",
                "Свёрнуто в трей. Ctrl+Shift+S — захват области.",
                QSystemTrayIcon.MessageIcon.Information,
                2500,
            )
        else:
            self._quit()

    # ---------- helpers ----------------------------------------------
    def _set_status(self, text: str) -> None:
        self.status.setText(text)

    def _set_busy(self, busy: bool) -> None:
        for b in (self.btn_snip, self.btn_open, self.btn_clip):
            b.setEnabled(not busy)

    def _error(self, message: str) -> None:
        QMessageBox.critical(self, "SimpleOCR", message)


def run() -> int:
    app = QApplication(sys.argv)
    app.setApplicationName("SimpleOCR")
    app.setQuitOnLastWindowClosed(False)
    win = MainWindow()
    win.show()
    return app.exec()
