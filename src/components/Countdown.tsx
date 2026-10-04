"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { getCopy } from "@/data";
import type { Locale } from "@/lib/i18n";

type Parts = { d: number; h: number; m: number } | null;

function remaining(target: string): Parts {
  const ms = new Date(target).getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    d: Math.floor(ms / 864e5),
    h: Math.floor(ms / 36e5) % 24,
    m: Math.floor(ms / 6e4) % 60,
  };
}

const TICK = 30_000;

/**
 * A clock the renderer can subscribe to. The server snapshot is null, and React
 * reuses it for the hydrating render, so the markup matches on both sides and
 * the digits only appear once we are safely on the client.
 */
function useTick(): number | null {
  return useSyncExternalStore(
    (onChange) => {
      const id = setInterval(onChange, TICK);
      return () => clearInterval(id);
    },
    () => Math.floor(Date.now() / TICK),
    () => null,
  );
}

export default function Countdown({
  target,
  locale,
}: {
  target: string;
  locale: Locale;
}) {
  const c = getCopy(locale);
  const still = useReducedMotion();
  const tick = useTick();

  const parts: Parts = tick === null ? null : remaining(target);
  if (!parts) return null;

  const cells: Array<[number, string]> = [
    [parts.d, c.ui.days],
    [parts.h, c.ui.hrs],
    [parts.m, c.ui.min],
  ];

  return (
    <div className="flex gap-2.5" aria-live="polite">
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="min-w-[74px] rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 text-center backdrop-blur-sm"
        >
          <div className="relative h-[34px] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.b
                key={value}
                initial={still ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                animate={still ? { opacity: 1 } : { y: 0, opacity: 1 }}
                exit={still ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="tnum absolute inset-0 block text-[27px] font-semibold leading-[34px] text-saffron [font-family:var(--font-fraunces)]"
              >
                {value}
              </motion.b>
            </AnimatePresence>
          </div>
          <span className="block text-[11.5px] text-white/65">{label}</span>
        </div>
      ))}
    </div>
  );
}
