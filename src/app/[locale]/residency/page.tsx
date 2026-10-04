import { getCopy } from "@/data";
import { isLocale, type Locale } from "@/lib/i18n";
import ResidencyForm from "@/components/ResidencyForm";
import { Bay, Notice } from "@/components/ui";

export default async function ResidencyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  return (
    <Bay>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
          <p className="eyebrow mb-2">{c.callEyebrow}</p>
          <h1 className="mb-3 text-[clamp(26px,4vw,36px)]">{c.callTitle}</h1>
          <p className="mb-7 max-w-[62ch] text-[15.5px] leading-relaxed text-muted">
            {c.callDesc}
          </p>
          <ResidencyForm locale={locale} />
        </div>

        <div className="grid gap-4">
          <Notice title={c.howT}>{c.howD}</Notice>
          <Notice title={c.getT} tone="good">
            {c.getD}
          </Notice>
        </div>
      </div>
    </Bay>
  );
}
