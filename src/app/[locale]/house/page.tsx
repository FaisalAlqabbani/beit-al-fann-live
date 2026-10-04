import Image from "next/image";

import { getCopy } from "@/data";
import { isLocale, type Locale } from "@/lib/i18n";
import HousePlan from "@/components/HousePlan";
import { Bay } from "@/components/ui";

export default async function HousePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  return (
    <div className="grid gap-12">
      <Bay>
        <div className="relative h-[180px] overflow-hidden rounded-[18px] sm:h-[240px]">
          <Image
            src="/images/arcade.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[50%_58%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,16,14,.78),rgba(20,16,14,.12))]"
          />
        </div>
      </Bay>

      <Bay>
        <HousePlan locale={locale} />
      </Bay>

      <Bay>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6">
            <h2 className="mb-3 text-[21px] text-teal">{c.willT}</h2>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[14.5px] leading-relaxed">
              {c.will.map((w) => (
                <li key={w} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-teal">
                    ✓
                  </span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6">
            <h2 className="mb-3 text-[21px] text-accent">
              {c.neverT}
            </h2>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[14.5px] leading-relaxed">
              {c.never.map((n) => (
                <li key={n} className="flex gap-2.5">
                  <span aria-hidden="true" className="text-accent">
                    ✕
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 max-w-[80ch] text-[13.5px] leading-relaxed text-muted">
          {c.lawNote}
        </p>
      </Bay>
    </div>
  );
}
