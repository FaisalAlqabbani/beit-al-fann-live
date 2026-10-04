"use client";

import { motion, useReducedMotion } from "motion/react";

/** Re-mounts per navigation, so each route fades and lifts in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const still = useReducedMotion();
  return (
    <motion.div
      initial={still ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
