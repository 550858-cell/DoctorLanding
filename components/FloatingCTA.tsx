"use client";

import Link from "next/link";
import { MessageCircle, Send, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingCTA() {
  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col gap-3 lg:flex">
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card transition-transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </a>
        <a
          href={site.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в Telegram"
          className="grid h-14 w-14 place-items-center rounded-full bg-[#229ED9] text-white shadow-card transition-transform hover:scale-110"
        >
          <Send size={22} />
        </a>
        <a
          href={`tel:${site.phoneRaw}`}
          aria-label="Позвонить"
          className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-card transition-transform hover:scale-110"
        >
          <Phone size={22} />
        </a>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white/95 backdrop-blur-md lg:hidden">
        <a
          href={`tel:${site.phoneRaw}`}
          className="flex flex-col items-center gap-1 py-3 text-xs font-semibold text-ink"
        >
          <Phone size={20} className="text-primary" />
          Позвонить
        </a>
        <a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 border-x border-line py-3 text-xs font-semibold text-ink"
        >
          <MessageCircle size={20} className="text-[#25D366]" />
          WhatsApp
        </a>
        <Link
          href="/#lead"
          className="flex flex-col items-center gap-1 bg-accent py-3 text-xs font-semibold text-white"
        >
          <Send size={20} />
          Расчёт
        </Link>
      </div>
    </>
  );
}
