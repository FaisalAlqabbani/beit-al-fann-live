"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { getCopy } from "@/data";
import { EVENTS, FEATURED_AT, FEATURED_ID } from "@/data/events";
import type { Locale } from "@/lib/i18n";
import { useHydrated, useStore } from "@/lib/store";
import ArchesSvg from "./ArchesSvg";
import Countdown from "./Countdown";
import CapacityMeter from "./CapacityMeter";
import { Button } from "./ui";

export default function Hero({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const still = useReducedMotion();

  const featured = EVENTS.find((e) => e.id === FEATURED_ID)!;
  const hydrated = useHydrated();
  const reservations = useStore((s) => s.reservations);
  const reserve = useStore((s) => s.reserve);
  const pushToast = useStore((s) => s.pushToast);

  const mine = hydrated && reservations.includes(FEATURED_ID);
  const left = featured.cap - featured.taken - (mine ? 1 : 0);

  // The page's one orchestrated entrance: title words, then meta, then arches.
  const words = c.heroTitle.split(" ");

  return (
    <section className="bay">
      <div className="relative overflow-hidden rounded-[22px] bg-[var(--ink)] text-[#f4ece1]">
        {/* façade, slow Ken Burns */}
        <motion.div
          className="absolute inset-0"
          initial={still ? false : { scale: 1.12 }}
          animate={still ? undefined : { scale: 1 }}
          transition={{ duration: 22, ease: "linear" }}
        >
          <Image
            src="/images/facade.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_38%]"
          />
        </motion.div>

        {/* scrim: keeps AA contrast over any part of the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,16,14,.95)_0%,rgba(20,16,14,.8)_38%,rgba(20,16,14,.28)_70%,rgba(20,16,14,.45)_100%)] rtl:bg-[linear-gradient(260deg,rgba(20,16,14,.95)_0%,rgba(20,16,14,.8)_38%,rgba(20,16,14,.28)_70%,rgba(20,16,14,.45)_100%)]"
        />

        {/* drifting warmth */}
        {!still && (
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <motion.span
              className="absolute -left-24 top-0 h-[26rem] w-[26rem] rounded-full bg-[var(--rust)] opacity-25 blur-[90px]"
              animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute bottom-[-6rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--plum)] opacity-30 blur-[100px]"
              animate={{ x: [0, -70, 0], y: [0, -30, 0] }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        <div className="relative grid items-end gap-8 p-6 pt-10 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:p-14">
          <div className="grid max-w-[56ch] gap-5">
            <p className="fade-up text-[12.5px] font-bold uppercase tracking-[0.18em] text-saffron rtl:text-[14px] rtl:normal-case rtl:tracking-normal">
              {c.heroEyebrow}
            </p>

            <h1 className="text-[clamp(40px,7vw,78px)] text-white">
              {words.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <span
                    className="rise"
                    style={{ animationDelay: `${100 + i * 90}ms` }}
                  >
                    {w}
                  </span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>

            <div
              className="fade-up grid gap-3"
              style={{ animationDelay: "420ms" }}
            >
              <p className="max-w-[48ch] text-[16.5px] leading-relaxed text-white/85">
                {c.heroSub}
              </p>
              <p className="text-[14px] text-white/60">{c.heroMeta}</p>
            </div>

            <div
              className="fade-up grid gap-5"
              style={{ animationDelay: "560ms" }}
            >
              <Countdown target={FEATURED_AT} locale={locale} />

              <div className="max-w-[26rem]">
                <CapacityMeter
                  label={c.spots}
                  left={left}
                  cap={featured.cap}
                  onDark
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  disabled={mine}
                  onClick={() => {
                    reserve(FEATURED_ID);
                    pushToast(c.ui.toastR);
                  }}
                >
                  {mine ? c.ui.reserved : c.rsvp}
                </Button>
                <Link href={`/${locale}/house`}>
                  <Button variant="ghost" magnetic={false} className="text-white/85">
                    {c.seeSpace}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden justify-self-end lg:block">
            <ArchesSvg draw className="h-[220px] w-[340px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
