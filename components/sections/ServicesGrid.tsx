import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

export function ServicesGrid() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="Услуги"
        title="Полный спектр стоматологии и эстетики"
        subtitle="От лечения кариеса до имплантации под ключ — с гарантией и проживанием."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <Link
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  {s.price ? (
                    <span className="tnum font-semibold text-primary">
                      {s.price}
                    </span>
                  ) : (
                    <span className="text-sm text-muted">По запросу</span>
                  )}
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
