import { getCopy } from "@/data";
import { isLocale, type Locale } from "@/lib/i18n";
import EventsBrowser from "@/components/EventsBrowser";
import { Bay, SectionHead } from "@/components/ui";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  return (
    <Bay>
      <SectionHead eyebrow={c.nav.events} title={c.evTitle} />
      <EventsBrowser locale={locale} />
    </Bay>
  );
}
