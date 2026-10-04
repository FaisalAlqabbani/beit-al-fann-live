"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function inputClass(invalid: boolean) {
  return [
    "w-full rounded-[10px] border bg-[var(--surface)] px-3.5 py-2.5 text-[15px]",
    "transition-[border-color,box-shadow] outline-none",
    "focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent)]",
    invalid ? "border-[var(--accent)]" : "border-[var(--line)]",
  ].join(" ");
}

export function FieldError({
  message,
  shake,
}: {
  message?: string;
  shake?: number;
}) {
  const still = useReducedMotion();
  return (
    <div className="min-h-[1.15em]">
      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={`${message}-${shake}`}
            role="alert"
            initial={
              still ? { opacity: 0 } : { opacity: 0, x: [0, -4, 4, -3, 0] }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[13px] font-medium text-accent"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Field({
  id,
  label,
  error,
  shake,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  shake?: number;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[13.5px] font-semibold">
          {label}
        </label>
        {hint && <span className="text-[12.5px]">{hint}</span>}
      </div>
      {children}
      <FieldError message={error} shake={shake} />
    </div>
  );
}
