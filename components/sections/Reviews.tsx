import { Star, PlayCircle } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";

export function Reviews() {
  return (
    <Section id="reviews">
      <SectionHead
        eyebrow="Отзывы"
        title="Что говорят пациенты"
        subtitle="Более 15 000 пациентов из России доверили нам свои улыбки."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.06}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-muted">{r.city}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {r.text}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {r.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {t}
                  </span>
                ))}
                {r.video && (
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    <PlayCircle size={15} />
                    Видеоотзыв
                  </button>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-muted">Мы в соцсетях:</span>
        {[
          { label: "VK", href: site.socials.vk },
          { label: "Telegram", href: site.socials.telegram },
          { label: "WhatsApp", href: site.socials.whatsapp },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="chip hover:border-primary hover:text-primary"
          >
            {s.label}
          </a>
        ))}
      </Reveal>
    </Section>
  );
}
