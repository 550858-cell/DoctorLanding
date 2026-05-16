"use client";

import { useRef, useState } from "react";
import { Placeholder } from "./Placeholder";

export function BeforeAfter({ variant = 0 }: { variant?: number }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  function move(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl"
      onMouseMove={(e) => e.buttons === 1 && move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      <Placeholder
        label="После"
        variant={variant + 1}
        rounded="rounded-2xl"
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <Placeholder
          label="До"
          variant={variant}
          rounded="rounded-none"
          className="absolute inset-0 h-full w-[100vw] max-w-none"
        />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          aria-label="Двигайте, чтобы сравнить до и после"
          onMouseDown={(e) => {
            e.preventDefault();
            const onMove = (ev: MouseEvent) => move(ev.clientX);
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
          className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-primary shadow-card"
        >
          <span className="text-xs font-bold">↔</span>
        </button>
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-medium text-white">
        До
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-white">
        После
      </span>
    </div>
  );
}
