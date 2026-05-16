"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/ui/Placeholder";
import { trustChips, brands } from "@/lib/content";
import { MiniLeadForm } from "@/components/sections/MiniLeadForm";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute -right-32 -top-32 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -left-40 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              Клиника в 800 м от границы с Россией
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
            >
              Стоматология в Китае дешевле на{" "}
              <span className="text-primary">40–70%</span>, чем в России
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
            >
              Государственная клиника «Жуйкан» в Хэйхэ. Импланты Straumann,
              циркониевые коронки, протезирование. Встретим на границе,
              бесплатное проживание, гарантия до 20 лет.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-7 flex flex-wrap gap-2.5"
            >
              {trustChips.map((c) => (
                <span key={c} className="chip">
                  <Check size={15} className="text-success" />
                  {c}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="#lead" className="btn-accent btn-lg">
                Рассчитать стоимость
                <ArrowRight size={18} />
              </Link>
              <Link href="#prices" className="btn-ghost btn-lg">
                Посмотреть цены
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-sm text-muted"
            >
              Без посредников · Оплата в рублях · Виза не нужна
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <Placeholder
              label="Клиника «Жуйкан», Хэйхэ"
              className="aspect-[4/5] w-full"
              rounded="rounded-[1.5rem]"
              variant={2}
            />
            <div className="absolute -bottom-6 -left-4 w-[88%] sm:-left-8 sm:w-[78%]">
              <MiniLeadForm />
            </div>
          </motion.div>
        </div>

        <div className="relative mt-20 overflow-hidden border-y border-line py-6">
          <div className="flex w-max animate-marquee gap-12">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-display text-lg font-semibold text-muted/70"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
