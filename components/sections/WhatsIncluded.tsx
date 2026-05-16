import { Check, X } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import {
  includedInRussia,
  includedInZhuykan,
  includedChips,
} from "@/lib/content";

export function WhatsIncluded() {
  return (
    <Section>
      <SectionHead
        eyebrow="Всё включено"
        title="Цена под ключ — никаких скрытых платежей"
        subtitle="Вы знаете точную стоимость заранее. На месте не появляется ни одной доплаты."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-white p-7">
            <h3 className="text-lg font-semibold text-muted">В России</h3>
            <ul className="mt-5 space-y-3">
              {includedInRussia.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-line text-ink/50">
                    <X size={13} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border-2 border-primary/30 bg-primary/[0.04] p-7">
            <h3 className="text-lg font-semibold text-primary">В Жуйкан</h3>
            <ul className="mt-5 space-y-3">
              {includedInZhuykan.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-ink">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                    <Check size={13} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-8 flex flex-wrap justify-center gap-2.5">
        {includedChips.map((c) => (
          <span key={c} className="chip">
            <Check size={14} className="text-success" />
            {c}
          </span>
        ))}
      </Reveal>
    </Section>
  );
}
