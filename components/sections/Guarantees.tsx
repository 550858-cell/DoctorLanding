import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { guarantees } from "@/lib/content";

export function Guarantees() {
  return (
    <Section id="guarantees" className="bg-white">
      <SectionHead
        eyebrow="Risk-reversal"
        title="Гарантия — то, что вы получаете официально"
        subtitle="Договор государственного образца и гарантийный электронный талон на руках."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {guarantees.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.08}>
            <div className="flex h-full items-start gap-4 rounded-3xl border border-line bg-cream/50 p-7">
              <span className="text-3xl" aria-hidden>
                {g.emoji}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {g.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
