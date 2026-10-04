export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "bafl-lang";

export function isLocale(v: string | undefined): v is Locale {
  return v === "en" || v === "ar";
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Index into the bilingual tuples ported from index.html ([en, ar]). */
export function idx(locale: Locale): 0 | 1 {
  return locale === "ar" ? 1 : 0;
}

export const other = (locale: Locale): Locale => (locale === "ar" ? "en" : "ar");
