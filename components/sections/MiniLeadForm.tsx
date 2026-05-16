"use client";

import { useState } from "react";
import { PhoneCall, Check } from "lucide-react";

export function MiniLeadForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          source: "hero-mini-form",
        }),
      });
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white/95 p-5 shadow-card backdrop-blur">
      {done ? (
        <div className="flex items-center gap-3 py-2">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-success/15 text-success">
            <Check size={20} />
          </span>
          <p className="text-sm font-medium text-ink">
            Спасибо! Перезвоним в течение 30 минут.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <PhoneCall size={16} className="text-accent" />
            Бесплатный звонок-консультация
          </div>
          <input
            name="name"
            required
            placeholder="Ваше имя"
            aria-label="Ваше имя"
            className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            name="phone"
            required
            type="tel"
            placeholder="+7 (___) ___-__-__"
            aria-label="Телефон"
            className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-accent btn-md w-full"
          >
            {loading ? "Отправляем…" : "Жду звонка"}
          </button>
        </form>
      )}
    </div>
  );
}
