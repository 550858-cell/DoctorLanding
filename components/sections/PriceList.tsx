import { MessageCircle } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { priceList } from "@/lib/content";
import { waLink } from "@/lib/site";

export function PriceList() {
  return (
    <Section className="bg-cream">
      <SectionHead
        eyebrow="Полный прайс"
        title="Прайс-лист клиники «Жуйкан»"
        subtitle="Цены зависят от страны-производителя материала. Все цены — под ключ, в рублях, без скрытых доплат."
      />

      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="hidden grid-cols-[2.4fr_1fr_1fr_1fr] bg-primary/5 px-6 py-4 text-sm font-semibold text-ink sm:grid">
            <span>Наименование</span>
            <span className="text-right">Китай</span>
            <span className="text-right">Япония</span>
            <span className="text-right">Германия</span>
          </div>
          {priceList.map((row, i) => (
            <div
              key={row.name}
              className={`grid grid-cols-1 gap-1.5 px-5 py-4 sm:grid-cols-[2.4fr_1fr_1fr_1fr] sm:gap-2 sm:px-6 ${
                i % 2 ? "bg-cream/50" : "bg-white"
              }`}
            >
              <span className="font-medium text-ink">{row.name}</span>
              <PriceCell label="Китай" value={row.cn} highlight />
              <PriceCell label="Япония" value={row.jp} />
              <PriceCell label="Германия" value={row.de} />
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 text-center">
        <p className="text-sm text-muted">
          Окончательная стоимость определяется после осмотра и снимка.
          Имеются противопоказания, необходима консультация специалиста.
        </p>
        <a
          href={waLink(
            "Здравствуйте! Хочу уточнить цены по прайсу клиники Жуйкан.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-lg mt-6"
        >
          <MessageCircle size={18} />
          Уточнить цену в WhatsApp
        </a>
      </Reveal>
    </Section>
  );
}

function PriceCell({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  if (!value) {
    return (
      <span className="hidden text-right text-muted/50 sm:block">—</span>
    );
  }
  return (
    <span
      className={`tnum flex items-baseline justify-between sm:block sm:text-right ${
        highlight ? "font-semibold text-primary" : "text-ink"
      }`}
    >
      <span className="text-xs font-normal text-muted sm:hidden">{label}</span>
      <span>{value}</span>
    </span>
  );
}
