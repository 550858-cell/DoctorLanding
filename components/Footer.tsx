import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/content";

const info = [
  { label: "О клинике", href: "/#about" },
  { label: "Как лечиться", href: "/#how" },
  { label: "Цены", href: "/#prices" },
  { label: "Гарантии", href: "/#guarantees" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-line bg-white">
      <div className="container-x py-14 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-white">
                Ж
              </span>
              <span className="font-display text-xl font-bold">Жуйкан</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Государственный многопрофильный медицинский центр в Хэйхэ.
              Стоматология для пациентов из России — в 800 м от границы.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              Услуги
            </h3>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link
                    href={`/${s.slug}`}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              Информация
            </h3>
            <ul className="space-y-2.5">
              {info.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">
              Контакты
            </h3>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Phone size={15} className="shrink-0 text-primary" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Mail size={15} className="shrink-0 text-primary" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={15} className="shrink-0 text-primary" />
                {site.hours}
              </li>
            </ul>
            <div className="mt-5 flex gap-2.5">
              {[
                { label: "VK", href: site.socials.vk },
                { label: "TG", href: site.socials.telegram },
                { label: "WA", href: site.socials.whatsapp },
                { label: "MAX", href: site.socials.max },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-xs font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-muted">
            Имеются противопоказания, необходима консультация специалиста.
            Информация на сайте не является публичной офертой. Окончательная
            стоимость определяется после осмотра и диагностики.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Стоматология «Жуйкан». Все права защищены.</span>
            <Link href="/#lead" className="hover:text-primary">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
