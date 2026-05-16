import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <Section id="how" className="bg-white">
      <SectionHead
        eyebrow="Просто и понятно"
        title="Как пройти лечение: 5 простых шагов"
        subtitle="От первого сообщения до возвращения домой с гарантией — мы рядом на каждом этапе."
      />

      {/* Desktop horizontal */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="relative h-full rounded-3xl border border-line bg-cream/60 p-6">
                {i < steps.length - 1 && (
                  <span className="absolute -right-3 top-10 z-10 h-2.5 w-2.5 animate-pulse-dot rounded-full bg-primary" />
                )}
                <span className="tnum grid h-11 w-11 place-items-center rounded-full bg-primary text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="space-y-4 lg:hidden">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="tnum grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">
                  {i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-line" />
                )}
              </div>
              <div className="pb-4">
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
