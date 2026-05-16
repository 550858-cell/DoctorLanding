"use client";

import { useMemo, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { calculator } from "@/lib/content";
import { waLink } from "@/lib/site";

const categories = Object.keys(calculator) as Array<keyof typeof calculator>;

function AnimatedTotal({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 90, damping: 18 });
  spring.set(value);
  const text = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("ru-RU"),
  );
  return (
    <motion.span className="tnum">{text}</motion.span>
  );
}

export function Calculator() {
  const [cat, setCat] = useState<keyof typeof calculator>(categories[0]);
  const [selected, setSelected] = useState<Record<string, number>>({});

  const total = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected],
  );

  function toggle(name: string, price: number) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = price;
      return next;
    });
  }

  const waMessage = useMemo(() => {
    const items = Object.entries(selected)
      .map(([n, p]) => `• ${n} — ${p.toLocaleString("ru-RU")} ₽`)
      .join("\n");
    return `Здравствуйте! Рассчитал на сайте Жуйкан:\n${items || "—"}\n\nИтого: ${total.toLocaleString("ru-RU")} ₽\nПрошу уточнить точную стоимость.`;
  }, [selected, total]);

  return (
    <Section id="calculator">
      <SectionHead
        eyebrow="Калькулятор"
        title="Рассчитайте стоимость лечения за 30 секунд"
        subtitle="Отметьте нужные позиции — итог посчитается автоматически. Точную цену подтвердит врач по снимку."
      />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <Reveal>
          <div className="rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    cat === c
                      ? "bg-primary text-white"
                      : "border border-line text-muted hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <ul className="mt-6 space-y-2.5">
              {calculator[cat].map((item) => {
                const active = Boolean(selected[item.name]);
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onClick={() => toggle(item.name, item.price)}
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left transition-all ${
                        active
                          ? "border-primary bg-primary/[0.05]"
                          : "border-line hover:border-primary/30"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid h-5 w-5 place-items-center rounded-md border ${
                            active
                              ? "border-primary bg-primary text-white"
                              : "border-line"
                          }`}
                        >
                          {active && <Check size={13} />}
                        </span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </span>
                      <span className="tnum shrink-0 text-sm font-semibold text-primary">
                        {item.price.toLocaleString("ru-RU")} ₽
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border-2 border-primary/25 bg-primary/[0.04] p-7 lg:sticky lg:top-24">
            <p className="text-sm font-medium text-muted">
              Предварительный итог
            </p>
            <div className="mt-2 font-display text-4xl font-bold text-primary">
              <AnimatedTotal value={total} /> ₽
            </div>
            <p className="mt-3 text-sm text-muted">
              Цена под ключ — включает работу врача, материалы, проживание и
              трансфер.
            </p>
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent btn-lg mt-6 w-full"
            >
              <MessageCircle size={18} />
              Отправить расчёт в WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
