"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup } from "motion/react";

import { getCopy } from "@/data";
import { EVENTS, type EventType } from "@/data/events";
import type { Locale } from "@/lib/i18n";
import EventCard from "./EventCard";
import { Chip } from "./ui";

type Filter = "all" | EventType;
const FILTERS: Filter[] = ["all", "late", "workshop", "show"];

export default function EventsBrowser({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  const [filter, setFilter] = useState<Filter>("all");

  const shown = EVENTS.filter((e) => filter === "all" || e.type === filter);

  return (
    <>
      <div
        role="group"
        aria-label={c.nav.events}
        className="mb-7 flex flex-wrap gap-2"
      >
        <LayoutGroup id="event-filters">
          {FILTERS.map((f) => (
            <Chip
              key={f}
              pressed={filter === f}
              onClick={() => setFilter(f)}
              layoutId="filter-pill"
            >
              {c.ui.filters[f]}
            </Chip>
          ))}
        </LayoutGroup>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((e) => (
            <EventCard key={e.id} event={e} locale={locale} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
