import { getCopy } from "@/data";
import { ARTISTS } from "@/data/artists";
import { isLocale, type Locale } from "@/lib/i18n";
import ArtistCard from "@/components/ArtistCard";
import { Bay, SectionHead } from "@/components/ui";

export default async function ArtistsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const c = getCopy(locale);

  return (
    <Bay>
      <SectionHead
        eyebrow={c.nav.artists}
        title={c.artTitle}
        aside={
          <p className="text-[13.5px] text-muted">{c.artNote}</p>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARTISTS.map((a, i) => (
          <ArtistCard key={a.n[0]} artist={a} i={i} locale={locale} />
        ))}
      </div>
    </Bay>
  );
}
