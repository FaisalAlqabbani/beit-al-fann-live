import { getCopy } from "@/data";
import type { Locale } from "@/lib/i18n";
import ArchesSvg from "./ArchesSvg";

export default function Footer({ locale }: { locale: Locale }) {
  const c = getCopy(locale);
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="bay flex flex-col gap-5 py-9 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[70ch] text-[13.5px] leading-relaxed text-muted">
          {c.foot}
        </p>
        <ArchesSvg
          className="h-10 w-28 shrink-0 opacity-40"
          stroke="var(--muted)"
        />
      </div>
    </footer>
  );
}
