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
 *   5. COMPANY INFORMATION — registration only; no regulator is named.
 *   6. A bottom bar with the copyright line.
 *
 * All four put 3–5 in ALL-CAPS labelled blocks at the very bottom, below the
 * links. That is the convention a compliance reviewer will look for, so this
 * follows it.
 *
 * Elite fx Capital Ltd. is registered in Saint Lucia and holds no financial
 * services licence. Do not add a regulator, licence number or "regulated by"
 * line here unless that changes — a fabricated one is a false regulatory claim.
 */

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

/**
 * Home-page anchors are written `/#id` so they resolve from every route, not
 * only from `/`. Company and legal pages are real routes.
 */
export const footerColumns: FooterColumn[] = [
  {
    title: "Trading",
    links: [
      { label: "Account Types", href: "/#accounts" },
      { label: "Markets", href: "/#markets" },
      { label: "Platforms", href: "/#platforms" },
      { label: "Deposits & Withdrawals", href: "/deposits-and-withdrawals" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Compliance", href: "/compliance" },
      { label: "Help Centre", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Client Agreement", href: "/legal/client-agreement" },
      { label: "AML Policy", href: "/legal/aml-policy" },
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Cookie Policy", href: "/legal/cookie-policy" },
    ],
  },
  {
    /** Mirrors `fundSafety.points` in `site.ts` — same three facts, not new claims. */
    title: "Client Protection",
    links: [
      { label: "Segregated Client Accounts", href: "/#fund-safety" },
      { label: "Negative Balance Protection", href: "/#fund-safety" },
      { label: "Encrypted End to End", href: "/#fund-safety" },
    ],
  },
];

/**
 * Email only. No phone number and no street address are published on the
 * site — by instruction, not by oversight. Keep these in step with `contact`
 * in `site.ts`, which the company pages read.
 */
export const footerContact = {
  heading: "Talk to us",
  body: "Multilingual support, 24 hours a day, 7 days a week.",
  emails: [
    { label: "Support", address: "support@elitecapital.global" },
    { label: "General enquiries", address: "info@elitecapital.global" },
    { label: "Compliance", address: "compliance@elitecapital.global" },
  ],
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
      "Elite fx Capital does not provide services to residents of jurisdictions where such offerings are prohibited by applicable law, including countries under international sanctions and/or FATF blacklisting. The aforementioned include but are not limited to: Afghanistan, Belarus, Cuba, Democratic Republic of Congo, Haiti, Iran, Israel, Myanmar, North Korea, Russia, South Sudan, Syria, Ukraine, Venezuela, Yemen, and other jurisdictions with restrictive local regulations, including the United States of America. These restrictions apply to all client acquisition methods, including through Introducing Brokers or Affiliates.",
      "Elite fx Capital reserves the right to restrict services to residents of any other jurisdiction where such offerings may be prohibited or deemed high risk.",
    ],
  },
  {
    /** Registration only. The company holds no licence, so no regulator is named. */
    label: "Company Information",
    paragraphs: [
      "Elite fx Capital Ltd. is registered in Saint Lucia as an International Business Company. The website elitecapital.global is operated by Elite fx Capital Ltd.",
    ],
  },
  {
    label: "Client Funds",
    paragraphs: [
      "Client money is held in segregated accounts, separate from the capital the business operates on. Every Elite fx Capital account carries negative balance protection, so you cannot lose more than the balance in your account. Segregation and negative balance protection do not protect you against trading losses, which remain yours.",
    ],
  },
];
