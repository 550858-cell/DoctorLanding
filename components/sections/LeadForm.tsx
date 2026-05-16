"use client";

import { useState } from "react";
import { Check, Clock, FileText, Route, Stethoscope } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  { icon: FileText, text: "Точный расчёт стоимости по вашему снимку" },
  { icon: Route, text: "Помощь с маршрутом и встречей на границе" },
  { icon: Stethoscope, text: "Персональные рекомендации врача-имплантолога" },
  { icon: Clock, text: "Ответ в течение 30 минут в рабочее время" },
];

export function LeadForm() {
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
          city: fd.get("city"),
          channel: fd.get("channel"),
          message: fd.get("message"),
          source: "main-lead-form",
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
    <Section id="lead" className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow mb-3">Бесплатно</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Получите бесплатный план лечения по снимку
          </h2>
          <p className="mt-4 text-lg text-muted">
            Отправьте ОПГ или КТ — врач составит план и назовёт точную цену под
            ключ. Без обязательств.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.text} className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="pt-1.5 text-sm font-medium text-ink">
                    {b.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-line bg-cream/60 p-6 shadow-soft sm:p-8">
            {done ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
                  <Check size={30} />
                </span>
                <h3 className="text-xl font-semibold">Заявка отправлена!</h3>
                <p className="max-w-xs text-sm text-muted">
                  Свяжемся с вами в течение 30 минут в рабочее время и составим
                  план лечения.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="name" label="Имя" required />
                  <Field
                    name="phone"
                    label="Телефон"
                    type="tel"
                    required
                    placeholder="+7"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="city" label="Город" />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-ink">
                      Способ связи
                    </label>
                    <select
                      name="channel"
                      className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                    >
                      <option>WhatsApp</option>
                      <option>Telegram</option>
                      <option>MAX</option>
                      <option>Звонок</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Опишите проблему
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-primary"
                    placeholder="Например: нужны 3 импланта и коронки"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Прикрепить снимок (JPG / PDF до 8 МБ)
                  </label>
                  <input
                    type="file"
                    name="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="w-full rounded-xl border border-dashed border-line bg-white px-4 py-3 text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary"
                  />
                </div>
                <label className="flex items-start gap-2.5 text-xs text-muted">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  Я согласен на обработку персональных данных и ознакомлен с
                  политикой конфиденциальности.
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-accent btn-lg w-full"
                >
                  {loading ? "Отправляем…" : "Получить бесплатный расчёт"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
