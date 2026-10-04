"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { getCopy } from "@/data";
import { DEFAULT_ZONE, ZONES, type Zone } from "@/data/zones";
import { dirOf, type Locale } from "@/lib/i18n";

type PlanState = "now" | "live";

export default function HousePlan({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const rtl = dirOf(locale) === "rtl";
  const still = useReducedMotion();

  const [selected, setSelected] = useState<Zone["k"]>(DEFAULT_ZONE);
  const [state, setState] = useState<PlanState>("live");

  const live = state === "live";
  const zone = ZONES.find((z) => z.k === selected)!;
  const L = locale === "ar" ? zone.ar : zone.en;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-1.5">{c.spEyebrow}</p>
          <h1 className="text-[clamp(27px,3.8vw,38px)]">{c.spTitle}</h1>
        </div>

        <div
          role="group"
          aria-label={c.spTitle}
          className="inline-flex rounded-full border border-[var(--line)] bg-[var(--bg)] p-1"
        >
          {(["now", "live"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={state === s}
              onClick={() => setState(s)}
              className={`relative rounded-full px-4 py-1.5 text-[13.5px] transition-colors ${
                state === s ? "text-bg" : "text-muted"
              }`}
            >
              {state === s && (
                <motion.span
                  layoutId="plan-state"
                  className="absolute inset-0 rounded-full bg-[var(--fg)]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative z-10">
                {s === "now" ? c.ui.now : c.ui.live}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
        {/* ---------------------------------------------------------- plan */}
        <div className="grid gap-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
          <svg
            viewBox="0 0 600 460"
            className="block w-full"
            role="img"
            aria-label={c.planNote}
          >
            <rect width="600" height="460" fill="var(--ground)" rx="6" />

            {ZONES.map((z) => {
              const zc = locale === "ar" ? z.ar : z.en;
              const isSel = z.k === selected;
              const tall = z.h > 60;

              // SVG resolves text-anchor along the inline direction, which the
              // <text> inherits from the document. Under dir="rtl" the inline
              // start IS the right edge, so "start" anchors the label to the
              // box's inner edge in both directions and it always runs inward.
              // (Using "end" here is what pushed the Arabic labels outside.)
              const padX = 16;
              const textX = rtl ? z.x + z.w - padX : z.x + padX;
              const anchor = "start";
              const letterY = z.y + (tall ? 34 : 30);
              const titleY = tall ? z.y + 60 : z.y + 30;
              const titleX = tall
                ? textX
                : rtl
                  ? z.x + z.w - padX - 28
                  : z.x + padX + 28;

              return (
                <g
                  key={z.k}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={`${c.ui.zone} ${z.k}: ${zc.t}`}
                  className="cursor-pointer outline-none"
                  onClick={() => setSelected(z.k)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(z.k);
                    }
                  }}
                >
                  <motion.rect
                    x={z.x + 3}
                    y={z.y + 3}
                    width={z.w - 6}
                    height={z.h - 6}
                    rx={10}
                    animate={{
                      fill: live ? `var(${z.col})` : "var(--zone-off)",
                    }}
                    transition={{ duration: 0.45 }}
                    whileHover={still ? undefined : { opacity: 0.88 }}
                  />

                  {isSel && (
                    <motion.rect
                      x={z.x + 3}
                      y={z.y + 3}
                      width={z.w - 6}
                      height={z.h - 6}
                      rx={10}
                      fill="none"
                      stroke="var(--saffron)"
                      strokeWidth={5}
                      strokeDasharray="14 10"
                      animate={
                        still ? undefined : { strokeDashoffset: [0, -48] }
                      }
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <text
                    x={textX}
                    y={letterY}
                    textAnchor={anchor}
                    fill={live ? "#F7F5F0" : "var(--zone-off-ink)"}
                    fontSize={20}
                    fontWeight={700}
                    style={{ fontFamily: "var(--font-reem), sans-serif" }}
                  >
                    {z.k}
                  </text>

                  <text
                    x={titleX}
                    y={titleY}
                    textAnchor={anchor}
                    fill={live ? "#F7F5F0" : "var(--zone-off-ink)"}
                    fontSize={15}
                    style={{ fontFamily: "var(--font-plex), sans-serif" }}
                  >
                    {zc.t}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-[13.5px] text-muted">{c.planNote}</p>

          <div className="flex flex-wrap gap-2">
            {ZONES.map((z) => {
              const zc = locale === "ar" ? z.ar : z.en;
              const isSel = z.k === selected;
              return (
                <button
                  key={z.k}
                  type="button"
                  aria-pressed={isSel}
                  onClick={() => setSelected(z.k)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-[13px] transition-colors ${
                    isSel
                      ? "border-[var(--fg)] bg-[var(--fg)] text-bg"
                      : "border-[var(--line)] text-muted hover:border-[var(--accent)] hover:text-fg"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: live ? `var(${z.col})` : "var(--zone-off)",
                    }}
                  />
                  {z.k} · {zc.t}
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------- inspector */}
        <div
          aria-live="polite"
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6"
        >
          {/* Keyed so React remounts and the CSS entrance replays. Deliberately
              not AnimatePresence `mode="wait"`: that holds the previous zone on
              screen until an exit animation finishes, and a throttled tab would
              leave the inspector showing the wrong zone. */}
          <div key={selected} className="fade-up grid gap-4">
            <p className="eyebrow">
              {c.ui.zone} {zone.k}
            </p>
            <h2 className="text-[25px]">{L.t}</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[10px] bg-[var(--surface-2)] p-3.5">
                <b className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] text-muted rtl:tracking-normal">
                  {c.ui.now}
                </b>
                <p className="text-[14px] leading-relaxed">{L.now}</p>
              </div>
              <div className="rounded-[10px] bg-[var(--teal)] p-3.5 text-[#f2fbf8]">
                <b className="mb-1 block text-[11px] font-bold uppercase tracking-[0.1em] opacity-80 rtl:tracking-normal">
                  {c.ui.live}
                </b>
                <p className="text-[14px] leading-relaxed">{L.live}</p>
              </div>
            </div>

            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px]">
              <dt className="text-muted">{c.ui.rm}</dt>
              <dd className="m-0 font-semibold">{L.rm}</dd>
              <dt className="text-muted">{c.ui.cost}</dt>
              <dd className="m-0 font-semibold">{L.cost}</dd>
              <dt className="text-muted">{c.ui.fix}</dt>
              <dd className="m-0 font-semibold">{L.fix}</dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
