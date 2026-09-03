"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Marquee";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const read = () => setScrolled(window.scrollY > 24);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  // Escape closes whatever is open. Never trap the reader in a menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A short close delay so the pointer can cross the gap between the trigger
  // and the panel without the menu snapping shut.
  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  // Scrolled, the pill always wears the deep glass palette, no matter what
  // surface is scrolling underneath it. At rest it has no chrome at all and
  // floats directly on the hero, which is now the light `clear` palette —
  // so the text/logo tone flips with `scrolled` to stay legible in both
  // states instead of assuming a dark hero underneath.
  const t = {
    pill: scrolled ? "nav-glass-deep" : "",
    link: scrolled
      ? "text-ink-300 hover:text-ink-100"
      : "text-navy-700 hover:text-navy-900",
    linkActive: scrolled ? "text-blue-400" : "text-blue-700",
    quiet: scrolled
      ? "text-ink-300 hover:text-blue-400"
      : "text-navy-700 hover:text-blue-700",
    burger: scrolled ? "text-ink-100" : "text-navy-900",
    // The mega panel and mobile drawer are solid, not glass (DESIGN.md §4),
    // so they need their own light/dark pairing rather than reusing the
    // pill's glass utilities.
    panel: scrolled ? "panel-solid" : "panel-solid-clear",
    panelLabel: scrolled ? "text-blue-400" : "text-blue-700",
    panelTitle: scrolled
      ? "text-ink-100 group-hover:text-blue-400"
      : "text-navy-900 group-hover:text-blue-700",
    panelDesc: scrolled ? "text-ink-500" : "text-navy-700/70",
    panelHover: scrolled ? "hover:bg-navy-700" : "hover:bg-navy-900/6",
    panelBorder: scrolled ? "border-ink-100/8" : "border-navy-900/10",
    panelText: scrolled ? "text-ink-300" : "text-navy-700",
    ghost: (scrolled ? "ghost" : "ghostDark") as "ghost" | "ghostDark",
  };

  return (
    <>
      {/* Regulatory. Above everything, never collapsed behind an interaction.
          Below `sm` the full sentence has no room to sit on one line and
          wrapping it eats too much vertical space above the fold, so it
          scrolls as a marquee instead; `sm` and up it's wide enough to read
          as a static centred line. */}
      <div className="relative z-[var(--z-sticky)] overflow-hidden bg-ink-100 text-navy-900">
        <Marquee copies={3} duration="34s" className="py-2 sm:hidden">
          <p className="flex shrink-0 items-center whitespace-nowrap pe-10 text-[11px] leading-snug text-navy-700/85">
            <strong className="font-semibold">Disclaimer:</strong>{" "}
            {site.riskDisclaimer}
          </p>
        </Marquee>
        <p className="shell hidden py-2 text-center text-[11.5px] leading-snug text-navy-700/85 sm:block">
          <strong className="font-semibold">Disclaimer:</strong>{" "}
          {site.riskDisclaimer}
        </p>
      </div>

      <header
        className="sticky top-4 z-[var(--z-sticky)]"
        onMouseLeave={hoverClose}
      >
        <div className="shell">
          <div
            // At 320px the pill's whole budget is logo + CTA + menu button.
            // Padding and gaps are tuned so the CTA never has to shrink below
            // its own text width — see the `shrink-0` on it below.
            className={`${t.pill} mx-auto flex items-center gap-2 rounded-pill transition-[margin,padding,max-width] duration-500 ease-[var(--ease-out-expo)] sm:gap-3 ${
              scrolled
                ? "mt-2.5 max-w-6xl px-2.5 py-1.5 sm:px-4 sm:py-2"
                : "mt-4 max-w-full px-2.5 py-2 sm:px-5 sm:py-2.5"
            }`}
          >
            <Link
              href="/"
              className="flex min-h-11 shrink-0 items-center"
              aria-label={`${site.name} home`}
            >
              <Logo
                // Unlike the old raster logo, colour here follows the theme
                // tokens rather than staying fixed — see Logo.tsx. Sizing is
                // em-based, so the old height pairs become font sizes.
                // Smaller below `sm` than the old scale: with the burger no
                // longer able to shrink, the logo is what has to give at
                // 320px. Logo + CTA + burger fits in 284px only at the small
                // step.
                tone={scrolled ? "light" : "dark"}
                className={`transition-all duration-500 ease-[var(--ease-out-expo)] ${
                  scrolled ? "text-[20px] sm:text-[32px]" : "text-[24px] sm:text-[40px]"
                }`}
              />
            </Link>

            <nav className="ml-6 hidden items-center gap-1 lg:ml-10 lg:flex">
              {nav.map((item) =>
                item.groups ? (
                  <div
                    key={item.label}
                    onMouseEnter={() => hoverOpen(item.label)}
                  >
                    <button
                      className={`flex min-h-11 items-center gap-1.5 rounded-pill px-3 text-sm font-medium transition-colors ${
                        open === item.label ? t.linkActive : t.link
                      }`}
                      aria-expanded={open === item.label}
                      onClick={() =>
                        setOpen(open === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <Chevron open={open === item.label} />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={`flex min-h-11 items-center rounded-pill px-3 text-sm font-medium transition-colors ${t.link}`}
                    onMouseEnter={hoverClose}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
              <Link
                href={site.cta.login.href}
                className={`hidden min-h-11 items-center px-3 text-sm font-medium transition-colors sm:flex ${t.quiet}`}
              >
                {site.cta.login.label}
              </Link>
              {/* Stays visible at every width — it is the page's whole
                  purpose, and burying it in the drawer costs conversions. */}
              <Button
                href={site.cta.primary.href}
                // The `!` on the padding is required, not stylistic. `Button`'s
                // base sets `px-8 py-[0.9rem]`, and Tailwind orders utilities
                // by property rather than by class-attribute order — so a plain
                // `px-3` here LOSES to the base and the pill silently renders
                // 40px wider than intended. At 320px that overflow is what
                // pushes the menu button off the pill. See Button.tsx.
                className="shrink-0 !px-3 !py-2.5 text-[12.5px] sm:!px-6 sm:text-sm"
              >
                <span className="sm:hidden">{site.cta.primary.short}</span>
                <span className="hidden sm:inline">
                  {site.cta.primary.label}
                </span>
              </Button>
              <button
                // `shrink-0` is load-bearing, not tidiness. Without it this is
                // the last flex child with any give at 320px, so it collapses
                // to zero width and the entire mobile navigation becomes
                // unreachable — while still rendering, so it looks fine in the
                // DOM and disappears only on the narrowest phones.
                className={`flex size-11 shrink-0 items-center justify-center rounded-pill lg:hidden ${t.burger}`}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <Burger open={mobileOpen} />
              </button>
            </div>
          </div>

          {/* Mega panel. Solid, not glass — glass on glass destroys
              legibility, and this holds body copy. DESIGN.md §4. Its
              light/dark pairing follows the pill's own `scrolled` toggle
              rather than staying fixed to the dark palette. */}
          {nav.map((item) =>
            item.groups && open === item.label ? (
              <div
                key={item.label}
                className="absolute inset-x-0 top-full z-[var(--z-dropdown)] px-[var(--gutter)]"
                onMouseEnter={() => hoverOpen(item.label)}
              >
                <div
                  className={`${t.panel} mx-auto mt-2 flex max-w-6xl flex-wrap gap-x-8 gap-y-6 rounded-panel p-7 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]`}
                >
                  {item.groups.map((group) => (
                    <div key={group.title} className="min-w-56 flex-1">
                      <p className={`type-label mb-2.5 px-3 ${t.panelLabel}`}>
                        {group.title}
                      </p>
                      {group.items.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setOpen(null)}
                          className={`group block rounded-inner px-3 py-2 transition-colors ${t.panelHover}`}
                        >
                          <span
                            className={`block text-sm font-semibold transition-colors ${t.panelTitle}`}
                          >
                            {link.label}
                          </span>
                          <span
                            className={`block text-[12.5px] leading-snug ${t.panelDesc}`}
                          >
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="absolute inset-x-0 top-full z-[var(--z-dropdown)] px-[var(--gutter)] lg:hidden">
            <div
              className={`${t.panel} mt-2 max-h-[70dvh] overflow-y-auto rounded-panel p-5`}
            >
              {nav.map((item) => (
                <div
                  key={item.label}
                  className={`border-b py-2.5 last:border-0 ${t.panelBorder}`}
                >
                  <p className={`type-label mb-1.5 ${t.panelLabel}`}>
                    {item.label}
                  </p>
                  <div className="grid gap-0.5 sm:grid-cols-2">
                    {(item.groups ?? [])
                      .flatMap((g) => g.items)
                      .map((link) => (
                        <Link
                          key={link.href + link.label}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex min-h-11 items-center rounded-inner px-3 text-sm ${t.panelText}`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    {!item.groups && (
                      <Link
                        href={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`flex min-h-11 items-center rounded-inner px-3 text-sm ${t.panelText}`}
                      >
                        Go to {item.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-4 grid gap-2">
                <Button href={site.cta.login.href} variant={t.ghost}>
                  {site.cta.login.label}
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 10 6"
      aria-hidden
      className={`transition-transform duration-300 ease-[var(--ease-out-expo)] ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M1 1l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
      <path
        d="M1 2h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300 ease-[var(--ease-out-expo)]"
        style={open ? { transform: "translateY(5px) rotate(45deg)" } : undefined}
      />
      <path
        d="M1 7h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="transition-opacity duration-200"
        style={open ? { opacity: 0 } : undefined}
      />
      <path
        d="M1 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300 ease-[var(--ease-out-expo)]"
        style={
          open ? { transform: "translateY(-5px) rotate(-45deg)" } : undefined
        }
      />
    </svg>
  );
}
