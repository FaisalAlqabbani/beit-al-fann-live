"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { getCopy } from "@/data";
import type { HouseEvent } from "@/data/events";
import type { Locale } from "@/lib/i18n";
import { useHydrated, useStore } from "@/lib/store";
import { Button } from "./ui";

const RAIL: Record<HouseEvent["type"], string> = {
  late: "var(--accent)",
  workshop: "var(--saffron)",
  show: "var(--teal)",
};

function Sparks({ show }: { show: boolean }) {
  const still = useReducedMotion();
  if (still) return null;
  return (
    <AnimatePresence>
      {show && (
        <span className="pointer-events-none absolute inset-0 overflow-visible">
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                style={{
                  background: i % 2 ? "var(--saffron)" : "var(--ember)",
                }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos(angle) * 54,
                  y: Math.sin(angle) * 54,
                  scale: 0.3,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            );
          })}
        </span>
      )}
    </AnimatePresence>
  );
}

export default function EventCard({
  event,
  locale,
}: {
  event: HouseEvent;
  locale: Locale;
}) {
  const c = getCopy(locale);
  const [title, when, desc] = locale === "ar" ? event.ar : event.en;

  const hydrated = useHydrated();
  const reservations = useStore((s) => s.reservations);
  const reserve = useStore((s) => s.reserve);
  const pushToast = useStore((s) => s.pushToast);

  // Before hydration, render the server's view: nothing reserved.
  const mine = hydrated && reservations.includes(event.id);
  const left = event.cap - event.taken - (mine ? 1 : 0);

  const [burst, setBurst] = useState(false);
  const still = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 220,
    damping: 22,
  });

  function onReserve() {
    reserve(event.id);
    pushToast(c.ui.toastR);
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  let action: React.ReactNode;
  if (event.open) {
    action = (
      <span className="text-[14px] font-semibold text-teal">
        {c.ui.drop}
      </span>
    );
  } else if (mine) {
    action = (
      <span className="relative">
        <Button disabled magnetic={false}>
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <motion.path
              d="M4 10.5 8 14.5 16 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={still ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </svg>
          {c.ui.reserved}
        </Button>
        <Sparks show={burst} />
      </span>
    );
  } else if (left <= 0) {
    action = (
      <Button variant="ghost" onClick={() => pushToast(c.ui.toastW)}>
        {c.ui.waitlist}
      </Button>
    );
  } else {
    action = <Button onClick={onReserve}>{c.ui.reserve}</Button>;
  }

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={still ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (still || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="group relative grid gap-3 overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 ps-6 transition-shadow hover:shadow-[0_22px_50px_-28px_color-mix(in_srgb,var(--accent)_75%,transparent)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 start-0 w-[5px]"
        style={{ background: RAIL[event.type] }}
      />

      <span
        className="justify-self-start rounded-full px-3 py-1 text-[11.5px] font-bold"
        style={{
          background: `color-mix(in srgb, ${RAIL[event.type]} 18%, transparent)`,
          color: RAIL[event.type],
        }}
      >
        {c.ui.filters[event.type]}
      </span>

      <h3 className="text-[20px]">{title}</h3>
      <p className="tnum text-[14px] font-medium text-muted">{when}</p>
      <p className="text-[15px] leading-relaxed">{desc}</p>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        {action}
        {!event.open && (
          <span
            className={`tnum text-[14px] ${
              left <= 0
                ? "font-semibold text-accent"
                : "text-muted"
            }`}
          >
            {left <= 0 ? c.ui.full : c.ui.left(left)}
          </span>
        )}
      </div>
    </motion.article>
  );
}
