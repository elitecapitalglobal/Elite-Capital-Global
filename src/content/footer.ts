/**
 * The footer.
 *
 * Structure follows what XM, FxPro, Vantage and StarTrader all converge on,
 * because it is driven by disclosure obligations rather than by taste:
 *
 *   1. Link columns, grouped by what the reader is trying to do.
 *   2. A contact block — a regulated firm has to be reachable.
 *   3. RISK WARNING, at length. Not the one-liner from the header.
 *   4. REGIONAL RESTRICTIONS — who we may not serve.
 *   5. REGULATORY INFORMATION — one paragraph per licensed entity.
 *   6. A bottom bar with the copyright line.
 *
 * All four put 3–5 in ALL-CAPS labelled blocks at the very bottom, below the
 * links. That is the convention a compliance reviewer will look for, so this
 * follows it.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE `[[...]]` MARKERS ARE DELIBERATE AND MUST BE FILLED IN BEFORE LAUNCH.
 *
 * I do not have Elite Capital's licensing details, and I will not invent them.
 * Every competitor footer above names real entities, real regulators and real
 * licence numbers; a fabricated equivalent is a false regulatory claim, which
 * is materially worse than a visible blank. Fill them in or remove the block.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

/**
 * Single-page site: every link below is an anchor into a section already on
 * this page, never a route. Columns that used to point at now-deleted
 * sub-pages (per-market, per-platform, legal, company) collapse to whichever
 * on-page section covers that ground.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "Trading",
    links: [
      { label: "Account Types", href: "#accounts" },
      { label: "Markets", href: "#markets" },
      { label: "Platforms", href: "#platforms" },
      { label: "Our Advantages", href: "#advantages" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#faq" },
      { label: "Contact Us", href: "#support" },
    ],
  },
];

export const footerContact = {
  heading: "Talk to us",
  body: "Multilingual support, 24 hours a day, 5 days a week.",
  email: "support@elitecapital.com", // REVIEW: confirm the live inbox
  /** Add phone / address when they exist. Do not invent either. */
  address: "[[REGISTERED OFFICE ADDRESS]]",
};

/** ALL-CAPS labelled disclosure blocks, in the order the industry uses. */
export const footerLegal = [
  {
    label: "Risk Warning",
    paragraphs: [
      "CFDs are complex, leveraged instruments and they carry a high risk of losing money quickly. Leverage magnifies losses exactly as much as it magnifies gains, and most retail investor accounts lose money trading these products. You should not trade with money you cannot afford to lose entirely.",
      "When you trade a CFD you do not own the underlying asset and you acquire no rights to it. Markets can gap, which means a stop-loss is an instruction to trade at the next available price rather than a guarantee of the price you set. Past performance tells you nothing reliable about future results.",
      "Nothing on this website is investment advice or a recommendation to trade. It is general information that takes no account of your objectives, financial situation or needs. Read our legal documents in full, and take independent advice if you are unsure whether these products are appropriate for you.",
    ],
  },
  {
    label: "Regional Restrictions",
    paragraphs: [
      "Elite Capital does not provide services to residents of jurisdictions where such offerings are prohibited by applicable law, including countries under international sanctions and/or FATF blacklisting. The aforementioned include but are not limited to: Afghanistan, Belarus, Cuba, Democratic Republic of Congo, Haiti, Iran, Israel, Myanmar, North Korea, Russia, South Sudan, Syria, Ukraine, Venezuela, Yemen, and other jurisdictions with restrictive local regulations, including the United States of America. These restrictions apply to all client acquisition methods, including through Introducing Brokers or Affiliates.",
      "Elite Capital reserves the right to restrict services to residents of any other jurisdiction where such offerings may be prohibited or deemed high risk.",
    ],
  },
  {
    label: "Regulatory Information",
    paragraphs: [
      "The entity that holds your account is determined by your country of residence and is confirmed to you during the application. The products, leverage limits and protections available to you follow from that entity. A licence granted by an authority does not mean the authority endorses the products offered under it.",
    ],
  },
  {
    label: "Client Funds",
    paragraphs: [
      "Client money is held in segregated accounts, separate from the capital the business operates on. Every Elite Capital account carries negative balance protection, so you cannot lose more than the balance in your account. Segregation and negative balance protection do not protect you against trading losses, which remain yours.",
    ],
  },
];
