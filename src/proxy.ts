import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES } from "@/lib/i18n";

/** Send bare paths to the visitor's remembered locale, else English. */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const saved = req.cookies.get(LOCALE_COOKIE)?.value;
  const locale = LOCALES.find((l) => l === saved) ?? DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|icon.svg|images|favicon.ico|.*\\.).*)"],
};
