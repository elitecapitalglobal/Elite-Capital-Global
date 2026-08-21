import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Edge } from "@/components/sections/Edge";
import { Advantages } from "@/components/sections/Advantages";
import { Platforms } from "@/components/sections/Platforms";
import { Markets } from "@/components/sections/Markets";
import { FundSafety } from "@/components/sections/FundSafety";
import { Accounts } from "@/components/sections/Accounts";
import { EveryTrader } from "@/components/sections/EveryTrader";
import { Steps } from "@/components/sections/Steps";
import { Support } from "@/components/sections/Support";
import { Faq } from "@/components/sections/Faq";
import { ClosingCta } from "@/components/sections/ClosingCta";

/**
 * The page's rhythm is the deep/clear alternation, and it is legible right
 * here — that's the point of keeping section order in one flat list.
 *
 *   deep   Hero, Ticker
 *   clear  Edge
 *   split  Advantages          (pale left half, indigo right half)
 *   white  Platforms
 *   tint   Markets
 *   clear  FundSafety          (light band, indigo panel)
 *   white  Accounts
 *   tint   EveryTrader         (light band, one indigo card)
 *   tint   Steps
 *   white  Support
 *   clear  Faq
 *   deep   ClosingCta, Footer
 *
 * The page is mostly light, which is Vertex Pro's own balance: one dark hero,
 * a long light body, one dark block at the end. Dark now appears only where it
 * is carrying something — the hero, the advantages panel, the fund-safety
 * banner, the experienced-trader card, and the closing drench. Flipping more
 * sections to `deep` is what made the earlier version read as a wall of navy.
 *
 * `clear` / `tint` / `white` are shades of the same light state, alternated so
 * the long light stretch does not flatten out. To flip a section, change its
 * `surface` prop in its own file. To reorder, move a line here. See PLAN.md §3.
 */
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <Edge />
        <Advantages />
        <Platforms />
        <Markets />
        <FundSafety />
        <Accounts />
        <EveryTrader />
        <Steps />
        <Support />
        <Faq />
        <ClosingCta />
      </main>
    </>
  );
}
