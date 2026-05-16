"use client";

import { MessageCircle } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { priceCompare } from "@/lib/content";
import { waLink } from "@/lib/site";

export function PriceCompare() {
  return (
    <Section id="prices" className="bg-white">
      <SectionHead
        eyebrow="Главное — экономия"
        title="Сравните цены: Россия vs Жуйкан"
        subtitle="Все цены — под ключ. В стоимость уже включены материалы, работа врача, проживание и трансфер."
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-line">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr] bg-primary/5 px-6 py-4 text-sm font-semibold text-ink sm:grid">
            <span>Услуга</span>
            <span className="text-right">Средняя цена в РФ</span>
            <span className="text-right">Цена в Жуйкан</span>
            <span className="text-right">Экономия</span>
          </div>
          {priceCompare.map((row, i) => (
            <div
              key={row.service}
              className={`grid grid-cols-2 gap-2 px-5 py-4 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:px-6 ${
                i % 2 ? "bg-cream/60" : "bg-white"
              }`}
            >
              <span className="col-span-2 font-medium text-ink sm:col-span-1">
                {row.service}
              </span>
              <span className="tnum text-sm text-muted line-through sm:text-right sm:text-base sm:no-underline">
                {row.ru}
              </span>
              <span className="tnum text-right text-sm font-semibold text-ink sm:text-base">
                {row.us}
              </span>
              <div className="col-span-2 mt-1 sm:col-span-1 sm:mt-0 sm:text-right">
                <span className="inline-flex rounded-full bg-success/12 px-3 py-1 text-sm font-semibold text-success tnum">
                  {row.save}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex justify-center">
        <a
          href={waLink(
            "Здравствуйте! Пришлите, пожалуйста, полный прайс клиники Жуйкан.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-lg"
        >
          <MessageCircle size={18} />
          Получить полный прайс в WhatsApp
        </a>
      </Reveal>
    </Section>
  );
}
