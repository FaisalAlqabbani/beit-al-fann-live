"use client";

import { AnimatePresence, motion } from "motion/react";
import { useStore } from "@/lib/store";

export default function ToastHost() {
  const toasts = useStore((s) => s.toasts);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[65] mx-auto flex max-w-[430px] flex-col gap-2"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 460, damping: 32 }}
            className="pointer-events-auto rounded-xl bg-[var(--fg)] px-4 py-3 text-[14.5px] font-semibold text-bg shadow-[0_18px_40px_-16px_rgba(0,0,0,.6)]"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
