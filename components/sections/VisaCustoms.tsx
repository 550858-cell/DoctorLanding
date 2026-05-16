import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { visaCards } from "@/lib/content";

export function VisaCustoms() {
  return (
    <Section>
      <SectionHead
        eyebrow="Граница и таможня"
        title="Виза не нужна — это удобно"
        subtitle="Хэйхэ — самый простой въезд в Китай для жителей России."
      />
      <div className="grid gap-5 sm:grid-cols-3">
        {visaCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-soft">
              <span className="text-3xl" aria-hidden>
                {c.emoji}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
