import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { FAQ } from "@/components/sections/FAQ";
import { LeadForm } from "@/components/sections/LeadForm";
import { getServicePage, servicePages } from "@/lib/servicePages";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const sp = getServicePage(params.slug);
  if (!sp) return {};
  return {
    title: sp.metaTitle,
    description: sp.metaDescription,
    alternates: { canonical: `/${sp.slug}` },
    openGraph: {
      title: sp.metaTitle,
      description: sp.metaDescription,
      url: `${site.url}/${sp.slug}`,
      type: "website",
      locale: "ru_RU",
    },
    twitter: { card: "summary_large_image", title: sp.metaTitle },
  };
}

export default function ServicePageRoute({
  params,
}: {
  params: { slug: string };
}) {
  const sp = getServicePage(params.slug);
  if (!sp) notFound();

  const related = servicePages.filter((s) => s.slug !== sp.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 lg:pt-36">
        <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
        <div className="absolute -right-32 -top-20 -z-10 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="container-x grid items-center gap-12 pb-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow">Стоматология Жуйкан · Хэйхэ</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">
              {sp.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{sp.hero}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="tnum rounded-full bg-success/12 px-4 py-2 font-semibold text-success">
                {sp.priceFrom}
              </span>
              <span className="text-sm text-muted">
                Цена под ключ · проживание включено
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#lead" className="btn-accent btn-lg">
                Получить расчёт по снимку
                <ArrowRight size={18} />
              </Link>
              <a href={site.whatsapp} className="btn-ghost btn-lg">
                Написать в WhatsApp
              </a>
            </div>
          </div>
          <Placeholder
            label={sp.name}
            className="aspect-[4/5] w-full"
            variant={2}
          />
        </div>
      </section>

      {/* About */}
      <Section>
        <SectionHead eyebrow="О процедуре" title="Что это и кому подходит" />
        <Reveal>
          <p className="max-w-3xl text-base leading-relaxed text-muted">
            {sp.about}
          </p>
        </Reveal>
      </Section>

      {/* Variants */}
      <Section className="bg-white">
        <SectionHead
          eyebrow="Варианты"
          title="Виды и материалы"
          subtitle="Все цены — под ключ, без скрытых платежей."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sp.variants.map((v, i) => (
            <Reveal key={v.name} delay={(i % 4) * 0.06}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-cream/50 p-6">
                <h3 className="font-semibold">{v.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{v.note}</p>
                <span className="tnum mt-4 font-semibold text-primary">
                  {v.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Steps */}
      <Section>
        <SectionHead eyebrow="Этапы" title="Как проходит лечение" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sp.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                <span className="tnum grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Before/After */}
      <Section className="bg-white">
        <SectionHead eyebrow="Результаты" title="До и после" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-3xl border border-line bg-cream/50 p-4">
                <BeforeAfter variant={i % 4} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Guarantees */}
      <Section>
        <SectionHead eyebrow="Гарантии" title="Официальная гарантия" />
        <div className="grid gap-5 sm:grid-cols-2">
          {sp.guarantees.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 0.08}>
              <div className="flex items-start gap-4 rounded-3xl border border-line bg-white p-7 shadow-soft">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check size={18} />
                </span>
                <div>
                  <h3 className="font-semibold">{g.title}</h3>
                  <p className="mt-1 text-sm text-muted">{g.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FAQ items={sp.faq} />

      <LeadForm />

      {/* Related */}
      <Section>
        <SectionHead eyebrow="Ещё" title="Похожие услуги" />
        <div className="grid gap-5 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className="group flex items-center justify-between rounded-3xl border border-line bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div>
                <h3 className="font-semibold">{r.name}</h3>
                <span className="tnum text-sm text-primary">{r.priceFrom}</span>
              </div>
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
