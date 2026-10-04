import { getCopy } from "@/data";
import { isLocale, type Locale } from "@/lib/i18n";
import RoomRequestForm from "@/components/RoomRequestForm";
import { Bay, Notice } from "@/components/ui";

export default async function RequestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  const caps: Array<[string, string]> = [
    [c.spaces[0], "120"],
    [c.spaces[2], "40"],
    [c.spaces[1], "12"],
  ];

  return (
    <Bay>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="eyebrow mb-2">{c.bookEyebrow}</p>
          <h1 className="mb-3 text-[clamp(26px,4vw,36px)]">{c.bookTitle}</h1>
          <p className="mb-7 max-w-[62ch] text-[15.5px] leading-relaxed text-muted">
            {c.bookDesc}
          </p>
          <RoomRequestForm locale={locale} />
        </div>

        <div className="grid gap-4">
          <Notice title={c.hoursT}>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt>{c.h1}</dt>
              <dd className="tnum m-0 font-semibold text-fg">
                10:00–18:00
              </dd>
              <dt>{c.h2}</dt>
              <dd className="tnum m-0 font-semibold text-fg">
                10:00–23:00
              </dd>
              <dt>{c.h3}</dt>
              <dd className="m-0 font-semibold text-fg">{c.h3v}</dd>
            </dl>
          </Notice>

          <Notice title={c.whereT}>{c.whereD}</Notice>

          <Notice title={c.capsT} tone="good">
            <dl className="mb-2 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5">
              {caps.map(([label, n]) => (
                <div key={label} className="contents">
                  <dt>{label}</dt>
                  <dd className="tnum m-0 font-semibold text-fg">
                    {n}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="text-[13px]">{c.capsN}</p>
          </Notice>
        </div>
      </div>
    </Bay>
  );
}
