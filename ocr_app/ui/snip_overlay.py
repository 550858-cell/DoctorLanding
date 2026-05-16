"""Полноэкранный оверлей выделения области (как «Ножницы»)."""

from __future__ import annotations

import mss
from PIL import Image
from PyQt6.QtCore import QPoint, QRect, Qt, pyqtSignal
from PyQt6.QtGui import QColor, QGuiApplication, QKeyEvent, QMouseEvent, QPainter, QPen
from PyQt6.QtWidgets import QWidget


class SnipOverlay(QWidget):
    """Затемняет весь виртуальный рабочий стол, даёт выделить прямоугольник.

    Сигнал `captured` отдаёт PIL.Image выбранной области.
    `cancelled` — если пользователь нажал Esc / правую кнопку.
    """

    captured = pyqtSignal(object)
    cancelled = pyqtSignal()

    def __init__(self) -> None:
        super().__init__()
        self.setWindowFlags(
            Qt.WindowType.FramelessWindowHint
            | Qt.WindowType.WindowStaysOnTopHint
            | Qt.WindowType.Tool
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        self.setCursor(Qt.CursorShape.CrossCursor)
        self._origin = QPoint()
        self._rubber = QRect()
        self._dragging = False
        # Геометрия всего виртуального экрана (все мониторы).
        self._virtual = QGuiApplication.primaryScreen().virtualGeometry()

    def start(self) -> None:
        self.setGeometry(self._virtual)
        self._rubber = QRect()
        self._dragging = False
        self.showFullScreen()
        self.raise_()
        self.activateWindow()

    # --- отрисовка ----------------------------------------------------
    def paintEvent(self, _event) -> None:
        p = QPainter(self)
        p.fillRect(self.rect(), QColor(0, 0, 0, 120))
        if not self._rubber.isNull():
            # «Прорезаем» окно выделения — показываем экран без затемнения.
            p.setCompositionMode(
                QPainter.CompositionMode.CompositionMode_Clear
            )
            p.fillRect(self._rubber, Qt.GlobalColor.transparent)
            p.setCompositionMode(
                QPainter.CompositionMode.CompositionMode_SourceOver
            )
            pen = QPen(QColor(0, 137, 123), 2)
            p.setPen(pen)
            p.drawRect(self._rubber)

    # --- мышь ---------------------------------------------------------
    def mousePressEvent(self, e: QMouseEvent) -> None:
        if e.button() == Qt.MouseButton.RightButton:
            self._finish_cancel()
            return
        self._origin = e.pos()
        self._rubber = QRect(self._origin, self._origin)
        self._dragging = True
        self.update()

    def mouseMoveEvent(self, e: QMouseEvent) -> None:
        if self._dragging:
            self._rubber = QRect(self._origin, e.pos()).normalized()
            self.update()

    def mouseReleaseEvent(self, e: QMouseEvent) -> None:
        if not self._dragging:
            return
        self._dragging = False
        rect = QRect(self._origin, e.pos()).normalized()
        self.hide()
        if rect.width() < 5 or rect.height() < 5:
            self.cancelled.emit()
            return
        img = self._grab(rect)
        if img is None:
            self.cancelled.emit()
        else:
            self.captured.emit(img)

    def keyPressEvent(self, e: QKeyEvent) -> None:
        if e.key() == Qt.Key.Key_Escape:
            self._finish_cancel()

    def _finish_cancel(self) -> None:
        self._dragging = False
        self.hide()
        self.cancelled.emit()

    # --- захват пикселей ---------------------------------------------
    def _grab(self, rect: QRect) -> Image.Image | None:
        # Координаты окна -> абсолютные координаты виртуального экрана.
        gx = self._virtual.x() + rect.x()
        gy = self._virtual.y() + rect.y()
        try:
            with mss.mss() as sct:
                shot = sct.grab(
                    {
                        "left": gx,
                        "top": gy,
                        "width": rect.width(),
                        "height": rect.height(),
                    }
                )
            return Image.frombytes(
                "RGB", shot.size, shot.bgra, "raw", "BGRX"
            )
        except Exception:
            return None
