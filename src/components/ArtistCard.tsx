"use client";

import { motion, useReducedMotion } from "motion/react";

import { getCopy } from "@/data";
import type { Artist } from "@/data/artists";
import { idx, type Locale } from "@/lib/i18n";
import { useStore } from "@/lib/store";

/**
 * The artwork is generated, not photographed: odd cards get the arcade, even
 * cards get a sun over a horizon. Same rule and palette as index.html.
 */
function GeneratedArt({ artist, i }: { artist: Artist; i: number }) {
  const still = useReducedMotion();
  const [ground, mark] = artist.c;
  const arcade = i % 2 === 1;

  return (
    <svg
      viewBox="0 0 160 120"
      className="aspect-[4/3] w-full rounded-[10px]"
      role="img"
      aria-label={artist.w[0]}
    >
      <rect width="160" height="120" fill={ground} />
      {arcade ? (
        <motion.path
          d="M30 120V65a25 25 0 0 1 50 0v55M90 120V65a25 25 0 0 1 50 0v55"
          fill="none"
          stroke={mark}
          strokeWidth={5}
          initial={still ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      ) : (
        <>
          <motion.circle
            cx={50 + i * 12}
            cy={55}
            r={28}
            fill={mark}
            initial={still ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            style={{ transformOrigin: `${50 + i * 12}px 55px` }}
          />
          <rect x="20" y="92" width="120" height="8" fill={mark} />
        </>
      )}
    </svg>
  );
}

export default function ArtistCard({
  artist,
  i,
  locale,
}: {
  artist: Artist;
  i: number;
  locale: Locale;
}) {
  const c = getCopy(locale);
  const L = idx(locale);
  const pushToast = useStore((s) => s.pushToast);

  return (
    <article className="grid content-start gap-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 transition-shadow hover:shadow-[0_22px_50px_-30px_color-mix(in_srgb,var(--accent)_70%,transparent)]">
      <GeneratedArt artist={artist} i={i} />
      <h3 className="mt-1 text-[19px]">{artist.n[L]}</h3>
      <p className="text-[13.5px] text-muted">{artist.d[L]}</p>
      <p className="text-[15px]">
        {artist.w[L]} · <b className="tnum">{artist.p}</b>
      </p>
      <button
        type="button"
        onClick={() => pushToast(c.ui.toastBuy)}
        className="justify-self-start rounded-full border border-[var(--line)] px-4 py-1.5 text-[13.5px] transition-colors hover:border-[var(--accent)] hover:text-accent"
      >
        {c.ui.buy}
      </button>
    </article>
  );
}
