import type { Metadata, Viewport } from "next";
import { Mona_Sans, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Interactions } from "@/components/ui/Interactions";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Analytics } from "@vercel/analytics/next";

/**
 * One family, two axes. Mona Sans carries a width axis, so display type can be
 * set wider than body copy without introducing a second grotesk that would sit
 * too close to it. See DESIGN.md §3.
 */
const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** Prices, spreads, deposits. Never sets a sentence. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The wordmark only — never body copy. A soft, faceted display serif
 * (opsz-aware, so it stays crisp at logotype sizes rather than reading like
 * shrunk book text) to give the brand mark its own identity apart from Mona
 * Sans, the way a logotype almost always sits on a different face to the UI
 * around it. See `Logo.tsx`.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
  display: "swap",
});

const title = "Elite Capital | Forex & CFD Trading Platform";
const description =
  "Trade forex, commodities, indices, metals and shares with tight spreads, fast execution and platforms built for every kind of trader.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Elite Capital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
};

/**
 * Header and footer live here, not in `page.tsx`. Every route on the site
 * carries the same chrome — including the risk disclaimer in the header and
 * the regulatory stack in the footer, which are not optional on any page of a
 * CFD site.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${mona.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body>
        {process.env.NEXT_PUBLIC_NO_SMOOTH !== "1" && <SmoothScroll />}
        <Interactions />

        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
