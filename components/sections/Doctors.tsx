import { GraduationCap } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { doctors } from "@/lib/content";

export function Doctors() {
  return (
    <Section>
      <SectionHead
        eyebrow="Команда"
        title="Наши специалисты"
        subtitle="Врачи с образованием ведущих медицинских университетов Китая и десятилетиями практики."
      />
      <Reveal>
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2">
          {doctors.map((d, i) => (
            <article
              key={d.name}
              className="w-[280px] shrink-0 snap-start rounded-3xl border border-line bg-white p-5 shadow-soft sm:w-[300px]"
            >
              <Placeholder
                label="Фото врача"
                className="aspect-[4/5] w-full"
                variant={i}
                rounded="rounded-2xl"
              />
              <h3 className="mt-4 text-lg font-semibold">{d.name}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{d.role}</p>
              <p className="mt-1 text-sm text-muted">{d.exp}</p>
              <p className="mt-3 flex items-start gap-2 text-sm text-muted">
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-primary" />
                {d.edu}
              </p>
            </article>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
