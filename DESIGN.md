# Design System: Elite Capital

Single source of truth for the visual language. Every value here exists as a CSS custom
property in `src/app/globals.css` — this document explains *what each one is for*, the CSS
file is what the browser reads. If they disagree, the CSS wins and this file is stale; fix it.

---

## 1. Visual Theme & Atmosphere

Two lighting conditions on one material.

The material is **liquid glass over milled metal**: surfaces that catch a hard light along
their top edge, blur what sits behind them in a ramp rather than a step, and cast three
progressively softer shadows. The lighting flips between two states as you scroll.

**`deep`** — a trading floor at night. Deep indigo, a royal-blue bloom rising from below the
fold, glass panels floating clear of the background with white edge-light. Data glows.
Used where the product is being shown.

**`clear`** — a private bank at midday. Cool off-white, the same panels now bevelled with
soft navy shadow instead of white highlight, blue reduced to a single structural accent.
Used where the reader is being asked to think.

The flip between them is the page's pacing. Neither state is "the theme"; the alternation is.

- **Density** — 4 / 10. Airy in `clear`, tighter in `deep` where market data lives.
- **Variance** — 6 / 10. Asymmetric bentos and an off-centre hero card cluster, over a
  disciplined 12-column grid. Not chaotic.
- **Motion** — 6 / 10. Fluid, orchestrated, never decorative. One choreographed page-load and
  scroll reveals that fit what they reveal. Two perpetual loops, both earned: the market
  ticker (a tape that isn't moving reads as stale data) and the asset-class marquee. Both
  pause on hover so a reader can actually read them, and both stop under reduced motion,
  where the track becomes manually scrollable instead.

---

## 2. Colour Palette & Roles

**Vertex Pro's palette, adopted 1:1.** Every value below is one of that template's own
design tokens: its two brand darks (`#050061`, `#071a3d`), the Tailwind blue ramp its accent
is built from, and its neutral scale. The previous navy-and-gold identity was replaced
wholesale — if you find gold anywhere in `src/`, it is a leftover, not a survivor.

### Navy — structure
| Name | Hex | Role |
|---|---|---|
| **Indigo** | `#050061` | `deep` page background and hero floor. The darkest surface; nothing sits behind it. |
| **Deep Navy** | `#071a3d` | `deep` section background — the ticker, the footer, panels that need to sit off the indigo. |
| **Panel Navy** | `#172554` | Glass panel fill base in `deep`, before opacity. (blue-950) |
| **Raised Navy** | `#1e3a8a` | Hover state, inner chrome, and body copy on `clear` at 80%. (blue-900) |
| **Slate Navy** | `#1e40af` | Borders on solid navy, the cool end of the hero wash. (blue-800) |

### Blue — the single accent
| Name | Hex | Role |
|---|---|---|
| **Pressed Blue** | `#1d4ed8` | CTA hover/press, accent text on `clear` where 5.2:1 is not enough headroom. |
| **Signal Blue** | `#2563eb` | Primary CTA fill, focus ring, active nav. The load-bearing accent. |
| **Lit Blue** | `#60a5fa` | Accent text and icons on navy, links on `deep`, item titles in the advantages panel. |
| **Pale Blue** | `#bfdbfe` | Hairlines on navy, quiet trim. Never a fill. |
| **Tint** | `#eff6ff` | The pale half of the advantages split, quiet section fills. |

Unlike the gold it replaced, Signal Blue works as **both** a fill and as text: white on it is
5.2:1, and it is 5.2:1 on `#fafafa`. That is why the primary button is a flat fill rather
than a gradient — see the note in `Button.tsx`. Blue stays at accent weight everywhere except
the closing CTA and the fund-safety banner, which are allowed the full drench.

### Ink — text and light surfaces
| Name | Hex | Role | Contrast |
|---|---|---|---|
| **Ink** | `#fafafa` | `clear` page background; primary text on `deep`. | 18.9:1 on Indigo |
| **Ink Muted** | `#dbeafe` | Body copy on `deep`. | 14.6:1 on Indigo |
| **Ink Faint** | `#94a3b8` | Metadata, labels, captions on `deep`. **Never body copy.** | 6.4:1 on Indigo |
| **Navy on Ink** | `#071a3d` | Primary text on `clear`. | 17.0:1 on Ink |
| **Navy Muted** | `#1e3a8a` @ 80% | Body copy on `clear`. | 8.6:1 on Ink |

Ink Faint is the one value **not** taken from Vertex Pro. Its neutral grey (`#a3a3a3`) goes
muddy on a saturated indigo — the background pushes blue through it and it reads as dirty
rather than quiet. `#94a3b8` is the same lightness rotated onto the surface's own hue.

### Market state — functional only
| Name | Hex | Role |
|---|---|---|
| **Bid Green** | `#3ecf8e` | Price up. Never a brand colour, never a CTA. |
| **Ask Red** | `#e3564c` | Price down. Same restriction. |

Colour is never the only carrier of up/down state — every price change also has a ▲/▼ glyph
and a sign on the number, for colour-blind readers and for screenshots.

### Banned in this palette
- Gold, champagne, amber — the previous accent. It is gone; do not reintroduce it as a
  "warm second accent". The one exception is the logo (see §4).
- Pure black `#000000`. Indigo is the floor.
- Any second accent hue. If something needs to stand out and blue is taken, use weight,
  size, or surface — not a new colour.
- A gradient fill behind a text label. Blue-600 is the lightest fill white text may sit on;
  anything lighter fails contrast while still looking correct in a screenshot.
- Neon glows, `box-shadow` with a saturated colour and a large spread.

---

## 3. Typographic Architecture

**Display + UI — `Mona Sans`** (variable, `wght 200–900` + `wdth 75–125`).
The same family Vertex Pro uses. One family, not a pair: the width axis gives display type its
own voice without the muddiness of two similar grotesks sitting next to each other.

**Numerals — `Geist Mono`** (variable). Prices, spreads, deposits, ticker, table figures only.
Mono here is functional — tabular alignment on a trading site — not a "technical" costume. It
never sets a sentence.

### Scale — 1.25 ratio, fluid
| Token | Size | Weight | Tracking | Leading | Use |
|---|---|---|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 5.25rem)` | 500 | `-0.035em` | `1.02` | Hero h1 only |
| `--text-h2` | `clamp(2rem, 4vw, 3.25rem)` | 500 | `-0.03em` | `1.06` | Section headings |
| `--text-h3` | `clamp(1.25rem, 1.6vw, 1.5rem)` | 600 | `-0.02em` | `1.25` | Card headings |
| `--text-lead` | `clamp(1.0625rem, 1.4vw, 1.25rem)` | 400 | `-0.011em` | `1.6` | Hero + section intros |
| `--text-body` | `1.0625rem` (17px) | 400 | `-0.006em` | `1.65` | Paragraphs |
| `--text-sm` | `0.875rem` (14px) | 500 | `0` | `1.5` | UI, nav, buttons |
| `--text-label` | `0.75rem` (12px) | 600 | `0.06em` | `1.4` | Metadata, table heads |

Tracking is **size-specific and always negative above 20px** — a fixed `letter-spacing` is
wrong somewhere. Body sits near zero, small text at zero, never positive.

Display type on `deep` gets `+0.04` line-height over the same size on `clear`: light type on
dark reads lighter and needs the room.

Body copy is capped at **68ch**. `text-wrap: balance` on h1–h3, `pretty` on paragraphs.

### Banned
- The old `Plus Jakarta Sans` + `Fraunces` pair — both are training-data defaults.
- `Inter`, `DM Sans`, `Space Grotesk`, `Outfit`, `Playfair`, `Cormorant`.
- A second sans in the same genre as Mona Sans.
- Any serif. This is a data surface, not an editorial one.
- All-caps body copy. Caps are for `--text-label` and nothing else.
- Uppercase tracked eyebrows above every section heading. Two exist on the whole page,
  where they carry real information.

---

## 4. The Material — glass and chrome

This is the part that makes the site look like Chrom rather than like a generic dark SaaS
page. Three utilities, defined in `globals.css`.

### What makes it read as glass rather than as grey plastic

Four things, and dropping any one of them is what "cheap glassmorphism" means:

1. **A sheen.** A top-to-bottom gradient inside the fill, so the surface catches light
   unevenly the way a curved edge does. A flat wash reads as plastic.
2. **Saturation.** `saturate(190%)` pushes the colour bleeding through the blur, so the
   material picks its surroundings up instead of averaging them to mud.
3. **The edge ladder.** Bright inset top rim, dimmer side rims, three softening drops. One
   flat 1px border reads as a div.
4. **Enough opacity to stop text.** Below roughly 85% fill, body copy scrolling underneath
   ghosts through as grey smears. Translucency should carry colour and shape, never
   letterforms. **Blur alone will not fix this** — the fill has to be opaque enough.

> **The blur must come from `@apply backdrop-blur-*`, never a hand-written
> `backdrop-filter`.** Lightning CSS deletes the hand-written form silently while keeping
> every other property in the rule. See PLAN.md §7 trap 0.

### `.bevel-deep` — glass on navy
Seven-stop shadow ladder. Order matters; the insets must come before the drops.

```
inset  0    1px   0            rgba(244,241,233,0.28)   /* top edge catches light */
inset  0   -1px   0            rgba(244,241,233,0.06)   /* bottom edge, faint */
inset -1.3px 0    1.3px -0.5px rgba(244,241,233,0.10)   /* left rim */
inset  1.3px 0    1.3px -0.5px rgba(244,241,233,0.10)   /* right rim */
0      0.6px 1.6px -1.5px      rgba(4,8,20,0.55)        /* contact shadow */
0      2.3px 6px   -3px        rgba(4,8,20,0.45)        /* mid */
0      10px  26px  -4px        rgba(4,8,20,0.35)        /* ambient */
```
Fill: `rgba(17,26,52,0.55)`. Blur: `blur(20px) saturate(160%)`.

### `.bevel-clear` — chrome on ink
Same ladder, inverted lighting: the inset highlight goes to `rgba(255,255,255,0.9)` and the
drops warm toward navy at lower opacity. Fill `rgba(255,255,255,0.72)`.

### `<Marquee />` — the continuous loops

Both perpetual loops (market tape, asset classes) go through one component, because the
sizing rule is subtle and both hand-rolled versions got it wrong.

The track holds N copies and slides left by exactly one (`-100% / N`). At the wrap, what is
left to fill the screen is `(N - 1) x copyWidth`. If that is narrower than the viewport, a
blank gap slides past before the loop restarts:

> **`(copies - 1) x copyWidth >= widest viewport you support`**

Two copies is the reflex answer and it fails on anything wide — a 2160px copy on a 3440px
ultrawide leaves a 1265px hole every lap. Current settings clear 4K with ~890px to spare:

| Track | copies | copy width | cover at wrap |
|---|---|---|---|
| Ticker | 4 | ~1440px | ~4310px |
| Markets | 3 | ~2160px | ~4320px |

**Measure one copy in the browser and re-derive `copies` whenever you add or remove items.**
Items must carry trailing space via `pe-*`, never a `gap` on the track — a gap also lands
between copies and puts a visible seam at the wrap.

### `<ProgressiveBlur />` — the ramp
Six absolutely-positioned layers, `blur(0.5 / 1 / 2 / 3 / 5 / 8px)`, each `mask-image`d to a
band so the blur *ramps* over the height instead of stepping. This is Chrom's signature and
the reason its glass looks like real depth of field. Used behind the floating header.

**`direction` must point at the chrome.** The header is anchored to the top, so it takes
`direction="up"` — heaviest blur at the top of the band, clearing downward, so content
sharpens as it moves away from the pill.

Getting this backwards does not look like "no blur"; it looks like *the glass is sitting
under the content instead of over it*. Content stays crisp exactly where it slides behind the
pill, and the blur pools in the empty band below. That is a confusing symptom to diagnose, so
check `direction` first if the glass ever looks inert.

### `.nav-glass-deep` / `.nav-glass-clear` — chrome that crosses surfaces
The floating nav is the one element that travels over **both** surface states, so it owns a
pair of variants and swaps between them at the boundary (`SiteHeader.tsx` reads which
`[data-surface]` section is under the pill on scroll).

Holding one tint the whole way down is what made the earlier version look cheap: a dark
translucent bar over an off-white section averages out to a flat grey slab, and the text passing
beneath it smears. Both variants therefore run a heavier fill (90%+) than a panel does.

**Any new full-width section must carry `data-surface="deep"` or `"clear"`**, or the nav will
keep the previous section's palette while crossing it.

**The logo is exempt.** It is still the gold wordmark, and it stays that way on both variants.
It is the brand mark, not a UI icon — do not re-tint it to match the pill, and do not
"fix" it to blue in CSS. Replacing it is an asset decision, not a stylesheet one.

### Rules
- **Never stack two translucent surfaces.** A glass card inside a glass panel destroys
  legibility. One layer of glass, then solid.
- **A blur ramp must never reach readable text.** The `<ProgressiveBlur />` under the nav is
  sized to just past the pill. Taller, and it smears the heading of whatever section is
  scrolling underneath — which reads as a dirty screen, not as depth.
- **Bigger surfaces read thicker** — a full-width nav gets `blur(20px)`, a small chip gets
  `blur(8px)`.
- Glass is for things that float above content: nav, hero cards, pricing, dropdowns. Body
  copy and data tables sit on solid fills.
- Under `prefers-reduced-transparency`, every glass surface becomes solid and the blur is
  dropped. Handled globally; do not re-implement per component.

### Radii
| Token | Value | Use |
|---|---|---|
| `--r-pill` | `999px` | Buttons, chips, nav pill, badges |
| `--r-panel` | `32px` | Large cards, bento tiles, pricing |
| `--r-card` | `24px` | Standard cards, market rows |
| `--r-inner` | `14px` | Chrome inside a card, icon badges |
| `--r-tight` | `8px` | Inputs, table cells |

Larger and softer than the existing site (which capped at 22px). Chrom's proportions.

---

## 5. Component Behaviours

**Primary button** — flat `Signal Blue` fill, white text, `--r-pill`, `18px 34px`. Feedback on
**pointer-down**, not release: `scale(0.97)` in 100ms. Hover lifts `-1px` and deepens to
`Pressed Blue`. Not a gradient — see §2. No glow, ever.

Its padding is set in `base`, so overriding it from `className` needs the important modifier
(`!px-3`); a plain `px-3` loses to Tailwind's property ordering and fails silently.

**Secondary button** — transparent with a 1px `Ink @ 22%` border on `deep`,
`Navy @ 18%` on `clear`. Border goes blue on hover. Same press feedback.

**Glass card** — `.bevel-deep` / `.bevel-clear`, `--r-panel`. Hover raises the top-edge
highlight and lifts `-3px`. The lift is a `transform`, never a `margin` or `top`.

**Market row** — solid fill, mono numerals, `▲`/`▼` glyph plus a signed percentage. Price
changes flash the cell background for 300ms, not the text colour (text colour changes are
hard to catch in peripheral vision).

**Accordion (FAQ)** — native `<details>`/`<summary>`. Chevron rotates 180°. Height animated
via `grid-template-rows: 0fr → 1fr`, which is the only way to transition auto height without
JS measuring.

**Focus** — a 2px `Signal Blue` ring at 2px offset on every interactive element. Never
removed, never `outline: none` without a replacement. It must be visible on both surfaces.

**Touch targets** — 44px minimum on everything interactive, including ticker links and
footer items.

**Loading** — skeleton blocks matching the real layout's dimensions. No spinners.

---

## 6. Layout Principles

- Container `1440px`, gutters `clamp(20px, 4vw, 40px)`.
- 12-column grid. Asymmetric splits are the default for feature sections;
  `repeat(auto-fit, minmax(280px, 1fr))` where a grid genuinely needs to be breakpoint-free.
- Section padding `clamp(72px, 9vw, 148px)` block. Vary it — the hero and the closing CTA get
  more, the ticker gets almost none. Uniform section padding is what makes a page feel like
  a template.
- **The three-equal-cards row is banned.** Advantages is a bento: one wide tile, two medium,
  three small.
- Full-height uses `min-h-[100dvh]`, never `h-screen`.
- No overlapping text. The hero card cluster overlaps *itself* (Vertex 1:1) but never the
  headline; the headline's zone is clear at every breakpoint.
- z-index is a named scale in `globals.css`: `--z-sticky: 40`, `--z-dropdown: 50`,
  `--z-scrim: 60`, `--z-modal: 70`. No arbitrary `9999`.

### Responsive — 320px to 3440px

The container steps rather than growing without limit, so an ultrawide never renders the site
as a narrow ribbon and a line of text never grows past a comfortable measure:

| Viewport | `--container-shell` |
|---|---|
| default | `1440px` |
| ≥ `1920px` (`3xl`) | `1600px` |
| ≥ `2560px` (`4xl`) | `1760px` |

- Below `768px` every multi-column layout collapses to one column. No exceptions.
- Horizontal overflow at any width is a bug, not a tradeoff. Wide content (marquee tracks) is
  clipped by the component that owns it, never by `body`.
- **Bento grids must fill their rows.** A wide tile counts as two cells; keep the total a
  multiple of the column count or the grid ends with a visible hole.
  `grid-auto-flow: dense` is set as a backstop so editing `site.ts` degrades gracefully.
- Headings and labels are tested at every breakpoint against the **longest real string in
  `site.ts`**, not against lorem. Two known-tight spots: the nav CTA at 320px (which is why
  `site.ts` carries a `short` label), and the word "Commission" in the account stat tiles
  (which is why they stack in the 1024–1280 band).

---

## 7. Motion

All timing constants live in `src/lib/motion.ts`. Nothing hardcodes a duration.

- **Easing** — `ease-out-expo`, `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce, no elastic, no
  `linear` except the ticker.
- **Springs** — where a gesture is involved, critically damped: `bounce 0`, `duration 0.4`.
  Bounce is only permitted after a momentum gesture (a flick), and there are none here.
- **Entrance reveal** — `y: 24px`, `opacity: 0`, `filter: blur(8px)` → resolved, `0.7s`,
  stagger `0.06s`. Written as `gsap.from()` so the resting state is what's in the DOM.
- **Hero load** — one orchestrated timeline: aurora fades up, headline masks in by line, then
  the card cluster settles with a `0.08s` stagger. Runs once, ~1.4s total.
- **Materialize, don't fade.** Glass surfaces animate `backdrop-filter` blur radius and
  `scale` together on entry, so they read as a material arriving.
- **Animate `transform` and `opacity` only** (plus `filter`/`backdrop-filter` where the
  effect requires it, which is GPU-composited). Never `top`, `left`, `width`, `height`.
- **Reduced motion** replaces every reveal with the resting state instantly and stops the
  ticker. This is a global rule in `globals.css` plus a `gsap.matchMedia()` guard; it is not
  optional and not per-component.

---

## 8. Anti-Patterns — banned in this codebase

Visual:
- Gradient text (`background-clip: text`). Solid colours; emphasis via weight.
- Side-stripe borders (a thick coloured `border-left` on cards or callouts).
- Neon or coloured outer glows.
- The big-number-plus-tiny-label hero metric template.
- Identical card grids, especially three equal cards in a row.
- An uppercase tracked eyebrow above every section.
- `01 / 02 / 03` markers as section scaffolding. The Steps section uses numbers because it
  genuinely is an ordered sequence; nothing else does.
- Custom mouse cursors.
- Pure black; emoji anywhere in the UI.
- Glass stacked on glass.

Content:
- **Fabricated metrics.** No invented uptime percentages, execution latencies, user counts,
  or ratings. Market figures are labelled *Sample data* and must stay labelled until a real
  feed is wired.
- **Fabricated testimonials or client names.** Not "Sarah J., Founder". Either real and
  attributable, or the section doesn't ship.
- Generic placeholder names (`Acme`, `Nexus`, `John Doe`).
- AI copy tells: "Elevate", "Seamless", "Unleash", "Next-Gen", "Supercharge".
- Filler UI text: "Scroll to explore", bouncing chevrons, scroll-hint arrows.
- Removing or minimising the CFD risk disclaimer. It is a regulatory requirement.
