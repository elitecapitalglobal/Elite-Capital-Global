import type { Metadata } from "next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Interactions } from "@/components/ui/Interactions";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SiteFooter } from "@/components/sections/SiteFooter";

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

export const metadata: Metadata = {
  title: "Elite Capital — Forex & CFD Trading Platform",
  description:
    "Trade forex, commodities, indices, metals and shares with tight spreads, fast execution and platforms built for every kind of trader.",
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
    <html lang="en" className={`${mona.variable} ${geistMono.variable}`}>
      <body>
        {process.env.NEXT_PUBLIC_NO_SMOOTH !== "1" && <SmoothScroll />}
        <Interactions />

        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
