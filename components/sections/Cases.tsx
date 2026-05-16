import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { cases } from "@/lib/content";

export function Cases() {
  return (
    <Section className="bg-white">
      <SectionHead
        eyebrow="Результаты"
        title="Реальные результаты пациентов"
        subtitle="Передвигайте ползунок, чтобы увидеть состояние до и после лечения."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 0.08}>
            <div className="rounded-3xl border border-line bg-cream/50 p-4">
              <BeforeAfter variant={i % 4} />
              <div className="px-2 py-4">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.meta}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
