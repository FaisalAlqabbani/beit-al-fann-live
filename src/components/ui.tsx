"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/* ---------------------------------------------------------------- Bay ----- */

/** A bay of the arcade: the page's one structural unit. */
export function Bay({
  children,
  className = "",
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  return <Tag className={`bay ${className}`}>{children}</Tag>;
}

/* ------------------------------------------------------------- Heading ---- */

export function SectionHead({
  eyebrow,
  title,
  aside,
}: {
  eyebrow?: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <h2 className="text-[clamp(27px,3.6vw,38px)]">{title}</h2>
      </div>
      {aside}
    </div>
  );
}

/* -------------------------------------------------------------- Button ---- */

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "ghost" | "quiet";
  disabled?: boolean;
  className?: string;
  magnetic?: boolean;
};

/**
 * Primary buttons lean a few pixels toward the cursor. It is the one piece of
 * decoration that survives Chanel's rule — it marks the action you want.
 */
export function Button({
  children,
  onClick,
  type = "button",
  variant = "solid",
  disabled,
  className = "",
  magnetic = true,
}: BtnProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pull, setPull] = useState({ x: 0, y: 0 });
  const still = useReducedMotion();
  const pullable = magnetic && !still && !disabled && variant === "solid";

  const base =
    "relative inline-flex select-none items-center justify-center gap-2 rounded-full px-6 py-3 text-[14.5px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const skin = {
    solid:
      "bg-[var(--accent)] text-accent-ink hover:bg-[var(--ember)] disabled:hover:bg-[var(--accent)]",
    ghost:
      "border border-current text-current hover:border-[var(--accent)] hover:text-accent",
    quiet:
      "border border-[var(--line)] bg-[var(--surface)] text-fg hover:border-[var(--accent)]",
  }[variant];

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${skin} ${className}`}
      animate={pull}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onPointerMove={(e) => {
        if (!pullable || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPull({
          x: (e.clientX - (r.left + r.width / 2)) * 0.22,
          y: (e.clientY - (r.top + r.height / 2)) * 0.3,
        });
      }}
      onPointerLeave={() => setPull({ x: 0, y: 0 })}
      whileTap={still ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

/* ---------------------------------------------------------------- Chip ---- */

export function Chip({
  children,
  pressed,
  onClick,
  layoutId,
}: {
  children: ReactNode;
  pressed?: boolean;
  onClick?: () => void;
  layoutId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={`relative shrink-0 rounded-full border px-4 py-1.5 text-[13.5px] transition-colors ${
        pressed
          ? "border-[var(--fg)] text-bg"
          : "border-[var(--line)] bg-[var(--surface)] text-muted hover:border-[var(--accent)] hover:text-fg"
      }`}
    >
      {pressed && layoutId && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-full bg-[var(--fg)]"
          transition={{ type: "spring", stiffness: 420, damping: 36 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* -------------------------------------------------------------- Notice ---- */

export function Notice({
  title,
  children,
  tone = "neutral",
}: {
  title: string;
  children: ReactNode;
  tone?: "neutral" | "good";
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 ${
        tone === "good"
          ? "border-s-4 border-s-[var(--teal)]"
          : "border-s-4 border-s-[var(--accent)]"
      }`}
    >
      <h3 className="mb-1.5 text-[18px]">{title}</h3>
      <div className="text-[14.5px] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Reveal ---- */

/** Used once per page, on the first fold only — not on every section. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={still ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={still ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
