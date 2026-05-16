import { Play } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { clinicStats } from "@/lib/content";

export function About() {
  return (
    <Section id="about" className="bg-white">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHead
            eyebrow="О клинике"
            title="Государственный медицинский центр «Жуйкан»"
          />
          <Reveal>
            <p className="text-base leading-relaxed text-muted">
              Многопрофильный медицинский центр «Жуйкан» расположен в престижном
              районе Хэйхэ, в 800 м от границы с Россией. Площадь — более 3 000 м².
              9 стоматологических кабинетов, VIP-кабинет для имплантации,
              отделение традиционной китайской медицины, косметология.
              Оборудование ESAY MEDICAL AI, SINOL Dental, сертификаты CE и
              ISO 13485. Работаем с пациентами из России более 15 лет — приняли
              более 15 000 человек.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {clinicStats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-line bg-cream/60 p-5"
                >
                  <div className="tnum font-display text-2xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="relative">
            <Placeholder
              label="Видеообзор клиники"
              className="aspect-[5/4] w-full"
              variant={0}
            />
            <button
              type="button"
              aria-label="Смотреть видеообзор клиники"
              className="absolute inset-0 m-auto grid h-18 w-18 h-[72px] w-[72px] place-items-center rounded-full bg-white/90 text-primary shadow-card transition-transform hover:scale-110"
            >
              <Play size={26} className="ml-1" fill="currentColor" />
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
