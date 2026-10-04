import { en, type Copy } from "./copy.en";
import { ar } from "./copy.ar";
import type { Locale } from "@/lib/i18n";

const DICT: Record<Locale, Copy> = { en, ar };

export function getCopy(locale: Locale): Copy {
  return DICT[locale] ?? en;
}

export type { Copy };
export { en, ar };
