import Link from "next/link";

import { getCopy } from "@/data";
import { EVENTS } from "@/data/events";
import { isLocale, type Locale } from "@/lib/i18n";
import Hero from "@/components/Hero";
import EventCard from "@/components/EventCard";
import { Bay, Reveal, SectionHead } from "@/components/ui";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  const pillars = [
    { t: c.p1t, d: c.p1d, rail: "var(--accent)" },
    { t: c.p2t, d: c.p2d, rail: "var(--teal)" },
    { t: c.p3t, d: c.p3d, rail: "var(--saffron)" },
  ];

  return (
    <div className="grid gap-16 sm:gap-20">
      <Hero locale={locale} />

      {/* Three pillars — the pitch in three lines. */}
      <Bay>
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div
                className="h-full border-t-[3px] pt-4"
                style={{ borderTopColor: p.rail }}
              >
                <h3 className="mb-2 text-[21px]">{p.t}</h3>
                <p className="text-[15px] leading-relaxed text-muted">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Bay>

      <Bay>
        <SectionHead
          title={c.upNext}
          aside={
            <Link
              href={`/${locale}/events`}
              className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1.5 text-[13.5px] transition-colors hover:border-[var(--accent)] hover:text-accent"
            >
              {c.allEvents}
            </Link>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.slice(0, 3).map((e) => (
            <EventCard key={e.id} event={e} locale={locale} />
          ))}
        </div>
      </Bay>
    </div>
  );
}
