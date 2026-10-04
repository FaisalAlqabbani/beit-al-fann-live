"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

import { getCopy } from "@/data";
import { LOCALE_COOKIE, other, type Locale } from "@/lib/i18n";

const ROUTES = [
  { seg: "", key: "home" },
  { seg: "events", key: "events" },
  { seg: "residency", key: "residency" },
  { seg: "artists", key: "artists" },
  { seg: "house", key: "house" },
  { seg: "request", key: "request" },
] as const;

export default function Header({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const pathname = usePathname();
  const router = useRouter();

  const current = pathname.replace(`/${locale}`, "").replace(/^\//, "");

  function switchLanguage() {
    const next = other(locale);
    try {
      document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* cookies blocked — the URL still carries the locale */
    }
    router.push(`/${next}${current ? `/${current}` : ""}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <div className="bay flex h-[66px] items-center gap-4">
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2.5"
          aria-label={c.brand}
        >
          <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
            <rect width="40" height="40" rx="10" fill="var(--accent)" />
            <path
              d="M10 32V19a10 10 0 0 1 20 0v13"
              fill="none"
              stroke="var(--accent-ink)"
              strokeWidth="3"
            />
            <circle cx="20" cy="20" r="3" fill="var(--saffron)" />
          </svg>
          <span className="hidden text-[19px] font-semibold tracking-tight sm:block [font-family:var(--font-fraunces)] rtl:[font-family:var(--font-reem)]">
            {c.brand}
          </span>
        </Link>

        <nav
          aria-label={c.nav.home}
          className="-mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ROUTES.map(({ seg, key }) => {
            const active = current === seg;
            return (
              <Link
                key={key}
                href={`/${locale}${seg ? `/${seg}` : ""}`}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[14px] transition-colors ${
                  active
                    ? "text-bg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--fg)]"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative z-10">{c.nav[key]}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={switchLanguage}
          className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1.5 text-[13px] font-semibold transition-colors hover:border-[var(--accent)] hover:text-accent"
        >
          {c.ui.lang}
        </button>
      </div>
    </header>
  );
}
