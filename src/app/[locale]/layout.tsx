import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, Reem_Kufi, IBM_Plex_Sans_Arabic } from "next/font/google";

import "../globals.css";
import { LOCALES, dirOf, isLocale, type Locale } from "@/lib/i18n";
import { getCopy } from "@/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";

/* Fraunces carries the display voice: soft terminals and a little wonk, so the
   headings feel cut rather than set. Arabic falls back to Reem Kufi. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

const reem = Reem_Kufi({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-reem",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Beit Al-Fann Live · بيت الفن حيّ",
  description:
    "A student innovation prototype that brings weekly debates, an artistic residency and art workshops to Beit Al-Fann, the 1920s heritage house in downtown Amman.",
  icons: { icon: "/icon.svg" },
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const l = locale as Locale;
  const c = getCopy(l);

  return (
    <html lang={l} dir={dirOf(l)} suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${reem.variable} ${plex.variable}`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[70] focus:rounded-full focus:bg-[var(--fg)] focus:px-5 focus:py-2 focus:text-bg"
        >
          {c.skip}
        </a>

        <div
          role="note"
          className="bg-[var(--saffron)] px-4 py-1.5 text-center text-[12.5px] font-semibold text-[#19100c]"
        >
          {c.proto}
        </div>

        <Header locale={l} />

        <main id="main" className="pb-24 pt-8 sm:pt-10">
          {children}
        </main>

        <Footer locale={l} />
        <ToastHost />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
