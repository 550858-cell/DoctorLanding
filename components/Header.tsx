"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Услуги", href: "/#services" },
  { label: "Цены", href: "/#prices" },
  { label: "О клинике", href: "/#about" },
  { label: "Как лечиться", href: "/#how" },
  { label: "Отзывы", href: "/#reviews" },
  { label: "Контакты", href: "/#contacts" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/90 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Жуйкан — на главную">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-white">
            Ж
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Жуйкан
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary"
          >
            <Phone size={16} className="text-primary" />
            {site.phoneDisplay}
          </a>
          <Link href="/#lead" className="btn-accent btn-md">
            Получить расчёт
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6 shadow-card transition-transform duration-300",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-lg font-bold">Меню</span>
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-white"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6">
            <a
              href={`tel:${site.phoneRaw}`}
              className="btn-ghost btn-md"
            >
              <Phone size={16} /> {site.phoneDisplay}
            </a>
            <Link
              href="/#lead"
              onClick={() => setOpen(false)}
              className="btn-accent btn-lg"
            >
              Получить расчёт
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
