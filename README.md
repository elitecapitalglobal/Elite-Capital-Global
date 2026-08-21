# Elite Capital

Marketing site for Elite Capital's forex and CFD offering.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, GSAP, Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

Lenis inertial scroll swallows synthetic scroll events, which breaks Playwright/Cypress and
screenshot tooling. Disable it for those runs:

```bash
NEXT_PUBLIC_NO_SMOOTH=1 npm run dev
```

---

## ⚠️ Before this goes live

Three things in this repo are deliberately unfinished. They are marked with `[[DOUBLE
BRACKETS]]` in the source so they are impossible to miss and impossible to ship by accident.

**1. There are no real regulatory details anywhere.**
Entity names, regulators, licence numbers, registered addresses and the list of restricted
jurisdictions are all placeholders, in `src/content/footer.ts` and `src/content/pages.ts`.
They were left blank on purpose: a plausible-looking invented licence number on a CFD site is
a false regulatory claim, which is far worse than a visible gap. Fill them in or delete the
containing block.

**2. `support@elitecapital.com` is a guess.** It appears on the contact page and in the
footer. Confirm the real inbox.

**3. `public/web-trader.png` is an IC Markets screenshot** — a competitor's branding, sitting
in the platforms section. It must be replaced. `public/mobile-app.png` is a generic mockup
but carries third-party logos (Tesla, Google, Amazon), which is worth a check too.

Also: lines marked `// REVIEW:` in `src/content/site.ts` make claims about the firm — costs,
execution, withdrawals — and need compliance sign-off. Market prices are illustrative and
labelled *Sample data* in the UI; do not remove that label without wiring a real feed. The
CFD risk disclaimer in the header and footer is a regulatory requirement, not decoration.

---

## Where things live

```
src/
  app/
    globals.css          Every design token. Change the brand here.
    layout.tsx           Fonts, header, footer, smooth scroll, pointer interactions.
    page.tsx             Home section order — the light/dark rhythm is visible here.
    [...slug]/page.tsx   Renders every page in the content registry.
    contact/page.tsx     Bespoke layout.
    help/page.tsx        Redirects to the FAQ.
  content/
    site.ts              Every string on the home page and in the nav.
    pages.ts             Every interior page, as content rather than files.
    footer.ts            Footer links and the legal disclosure stack.
    languages.ts         The language picker's list. Read the header comment.
  lib/motion.ts          Every duration, ease and stagger. Plus canAnimate().
  components/
    ui/                  Section, Reveal, Button, Interactions, LanguagePicker…
    sections/            One file per home-page section.
public/                  Brand images.
```

**[DESIGN.md](DESIGN.md)** is the token reference — every colour with its role and contrast
ratio, the glass material spec, and the component behaviours.
**[PRODUCT.md](PRODUCT.md)** covers who the site is for and the design principles.

## Quick answers

| I want to… | Go to |
|---|---|
| Change a colour, radius or font size | the `@theme` block in `src/app/globals.css` |
| Change home-page copy, prices or FAQ | `src/content/site.ts` |
| Add or edit an interior page | `src/content/pages.ts` — one entry, no new file |
| Give a page its own layout | add `src/app/<slug>/page.tsx`; a static route beats the catch-all |
| Change footer links or legal text | `src/content/footer.ts` |
| Flip a section between light and dark | its `surface` prop (`deep` / `clear` / `tint` / `white`) |
| Reorder or remove a home section | `src/app/page.tsx` |
| Change animation timing | `src/lib/motion.ts` |
| Make a card tilt toward the pointer | add `data-tilt` + `card-glow card-3d lift-hover` |

---

## Traps

All of these were hit during the build. They will bite again if reintroduced, and every one
of them fails *silently* — which is why they are written down.

**1. Never hand-write `backdrop-filter`.**
Lightning CSS, which Tailwind v4 compiles through, drops a hand-written `backdrop-filter` /
`-webkit-backdrop-filter` declaration. Every other property in the rule survives, so nothing
errors and nothing warns — the glass just renders flat, with no blur and no saturation, and
the cause is invisible in the source. Use Tailwind's own utilities
(`@apply backdrop-blur-[28px] backdrop-saturate-[190%]`), as `globals.css` does. After
touching any glass rule, verify in the browser rather than in the source:

```js
getComputedStyle(document.querySelector('.bevel-deep')).backdropFilter  // must not be "none"
```

**2. Tailwind orders utilities by property, not by class order.**
Passing `px-3` through a `className` does **not** override a `px-8` baked into a component's
base classes — the base wins, and the element silently keeps its original padding. Use the
important modifier (`!px-3`). The same trap applies to `hidden` vs `inline-flex`. This one
cost a broken mobile menu at 320px: the header CTA rendered 40px wider than intended and
pushed the menu button clean off the pill.

**3. Scroll reveals are `gsap.from()`, never `gsap.to()` off an `opacity-0` class.**
The resting state must be what is already in the DOM, so a section is readable if JS never
runs. Inverting this ships blank sections to crawlers and to anyone whose bundle fails.
`canAnimate()` in `src/lib/motion.ts` guards the related failure: `rAF` does not run in a
hidden tab, so a `from()` start state would be written and never cleared.

**4. Anchors in shared chrome must be `/#foo`, not `#foo`.**
The header renders on every route. A bare hash resolves against the current page, so
`#accounts` silently goes nowhere from `/markets/forex`.

**5. `body` must not get `overflow-x: clip`.**
It makes `<body>` a clip container, and `position: sticky` descendants then resolve against
it instead of the viewport — which strands the sticky header mid-page. Clip wide content at
the component that owns it instead (see `Ticker`, `Markets`).

**6. A marquee needs enough copies to cover the widest viewport.**
`(copies - 1) × copyWidth >= widest supported viewport`, or a blank gap slides past every
lap. Two copies is the reflex answer and it is wrong on anything ultrawide. See the header
comment in `components/ui/Marquee.tsx`.

---

## What the language picker actually does

It records a preference and sets `<html lang>` and `dir`. **It does not translate the page.**
There are no message catalogues in this repo, and machine-translating regulated financial
copy would be actively dangerous rather than merely incomplete. Every locale except English
is marked "coming soon" in the UI so the picker never promises a translation that is not
there. Real i18n means `next-intl` or Next's own i18n routing, one catalogue per locale, and
a human translator accountable for the legal pages. See `src/content/languages.ts`.
