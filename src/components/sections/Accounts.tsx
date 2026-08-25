import { accounts } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TierCard } from "./TierCard";
import { StandardTierCard } from "./StandardTierCard";

/**
 * Chrom's pricing block — three tiers: Standard (with its own Dollar/Cent
 * toggle, see `StandardTierCard.tsx`), ECN and Pro. Standard is the
 * recommended, lifted card; ECN and Pro render through the same `TierCard`
 * Standard does, just without a toggle.
 *
 * The old version was a comparison table with ✓ and ✕ glyphs. Cards scan
 * faster for the switcher, who is here for exactly one number.
 */
export function Accounts() {
  return (
    <Section surface="white" id="accounts" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead
            heading={accounts.heading}
            lead={accounts.lead}
            surface="white"
            align="center"
          />
        </Reveal>

        <Reveal stagger className="mt-10 grid items-start md:mt-12 gap-5 lg:grid-cols-3">
          <StandardTierCard />
          {accounts.tiers.map((tier) => (
            <TierCard key={tier.name} {...tier} />
          ))}
        </Reveal>

        <p className="mt-18 text-center text-[13px] text-navy-700/65">
          Leverage is subject to terms and regulatory guidelines and varies by
          jurisdiction.
        </p>
      </div>
    </Section>
  );
}
