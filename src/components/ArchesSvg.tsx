"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The arcade of the house, used as the hero's signature and as a rule between
 * bays. `draw` animates the stroke in once, then lights the three lamps.
 */
export default function ArchesSvg({
  draw = false,
  className = "",
  stroke = "var(--saffron)",
}: {
  draw?: boolean;
  className?: string;
  stroke?: string;
}) {
  const still = useReducedMotion();
  const animate = draw && !still;

  const arch = (d: string, i: number) => (
    <motion.path
      key={d}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={3}
      strokeLinecap="round"
      initial={animate ? { pathLength: 0, opacity: 0 } : false}
      animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
      transition={{ duration: 1.1, delay: 0.25 + i * 0.16, ease: "easeInOut" }}
    />
  );

  return (
    <svg
      viewBox="0 0 360 200"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {[
        "M10 200V100a50 50 0 0 1 100 0v100",
        "M130 200V100a50 50 0 0 1 100 0v100",
        "M250 200V100a50 50 0 0 1 100 0v100",
      ].map(arch)}

      {[60, 180, 300].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={120}
          r={4}
          fill={stroke}
          initial={animate ? { opacity: 0, scale: 0.4 } : false}
          animate={
            animate
              ? { opacity: [0, 1, 0.65, 1], scale: 1 }
              : { opacity: 0.9 }
          }
          transition={{
            delay: 1.2 + i * 0.14,
            duration: 1.6,
            ease: "easeOut",
          }}
          style={{ transformOrigin: `${cx}px 120px` }}
        />
      ))}

      <motion.path
        d="M0 199h360"
        stroke={stroke}
        strokeWidth={2}
        initial={animate ? { pathLength: 0 } : false}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}
