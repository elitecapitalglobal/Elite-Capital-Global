/**
 * Every route the site links to, other than the home page and the two that
 * need bespoke layouts (`/contact`, `/help`).
 *
 * These are real pages, not stubs — but they are *content*, not components.
 * One registry plus one catch-all route renders all of them, so adding a page
 * is an entry here rather than a new file. If a page later grows a layout of
 * its own, give it a real route: a static segment always wins over the
 * catch-all in Next's matcher, so `src/app/careers/page.tsx` would simply take
 * over from the `careers` entry below with no other change.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * COMPLIANCE — READ BEFORE LAUNCH
 *
 * Elite Capital's regulatory details are NOT in this file, because I do not
 * have them. Every place one belongs carries a `[[...]]` placeholder. They are
 * deliberately loud and deliberately unstyled: a false licence number on a CFD
 * site is a regulatory offence, and a plausible-looking invented one is worse
 * than an obvious blank. Fill them in or delete the containing page.
 *
 * The same applies to `RISK`, `RESTRICTED` and `ENTITIES` in `footer.ts`.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type PageBlock = { heading: string; body: string };

export type PageDef = {
  /** Route path without the leading slash. */
  slug: string;
  /** Browser tab + <h1>. */
  title: string;
  lead: string;
  /** Short feature blocks, rendered as a card grid. */
  blocks?: PageBlock[];
  /** Long-form prose, rendered as paragraphs under an optional heading. */
  prose?: { heading?: string; paragraphs: string[] }[];
  cta?: { label: string; href: string };
};

const OPEN = { label: "Open Live Account", href: "/open-account" };
const DEMO = { label: "Try a Demo Account", href: "/demo" };

/* -------------------------------------------------------------------------- */
/* Markets                                                                     */
/* -------------------------------------------------------------------------- */

const markets: PageDef[] = [
  {
    slug: "markets/forex",
    title: "Forex",
    lead: "Over 50 currency pairs — majors, minors and a working selection of exotics — priced from 0.0 pips on the ECN account.",
    blocks: [
      { heading: "The majors, tightly priced", body: "EUR/USD, GBP/USD, USD/JPY and the rest of the majors carry our tightest spreads, and they stay quoted through the London and New York sessions." },
      { heading: "Minors and crosses", body: "Trade the crosses without routing through the dollar first, so you are not paying two spreads to express one view." },
      { heading: "Exotics, where they make sense", body: "A selected list rather than a long one. We list pairs we can price properly instead of padding the count." },
      { heading: "Sessions that actually overlap", body: "The book runs from the Sydney open to the New York close, five days a week, so a position opened in one session can be managed in the next." },
    ],
    cta: OPEN,
  },
  {
    slug: "markets/metals",
    title: "Metals",
    lead: "Gold and silver against the dollar and the euro, plus platinum and palladium, with the liquidity to size properly.",
    blocks: [
      { heading: "Gold, priced like a major", body: "XAU/USD is the most traded instrument on most retail books, and we price it accordingly rather than treating it as a side market." },
      { heading: "Silver and the rest", body: "XAG/USD, platinum and palladium, quoted spot with no delivery obligation and no storage to arrange." },
      { heading: "A genuine hedge", body: "Metals often move against equities and the dollar, which is the whole reason to hold them alongside the rest of a book." },
    ],
    cta: OPEN,
  },
  {
    slug: "markets/commodities",
    title: "Commodities",
    lead: "Energy and agricultural CFDs — crude, natural gas and the soft commodities — without a futures account or a delivery date to worry about.",
    blocks: [
      { heading: "Energy", body: "WTI and Brent crude plus natural gas, the instruments that move first when the macro picture changes." },
      { heading: "Softs", body: "Coffee, sugar, wheat and corn, for traders who follow weather and harvest cycles rather than central banks." },
      { heading: "No delivery, no roll paperwork", body: "These are cash-settled CFDs. You are trading the price, so there is no barrel arriving and no contract to roll by hand." },
    ],
    cta: OPEN,
  },
  {
    slug: "markets/indices",
    title: "Indices",
    lead: "Take a view on a whole market instead of picking one name inside it — the US, European and Asian benchmarks, cash and futures.",
    blocks: [
      { heading: "The benchmarks", body: "US30, NAS100, SPX500, GER40, UK100 and the major Asian indices, all on one account." },
      { heading: "One ticket, broad exposure", body: "An index is the lazy way to express a macro view: no single earnings miss can undo the whole position." },
      { heading: "Extended hours", body: "Index CFDs trade well beyond the underlying exchange's session, so you can react to news when the cash market is shut." },
    ],
    cta: OPEN,
  },
  {
    slug: "markets/shares",
    title: "Shares",
    lead: "CFDs on globally listed equities from the major exchanges — long or short, with no need to hold the underlying stock.",
    blocks: [
      { heading: "The names people actually trade", body: "US large-cap technology, European industrials and a working list from the major Asian exchanges." },
      { heading: "Short without borrowing", body: "A share CFD is short-able as easily as it is long-able. There is no stock loan to arrange and no recall risk." },
      { heading: "Sized to the account", body: "Fractional exposure means a $200 stock does not need a $200 minimum ticket to be tradeable." },
    ],
    prose: [
      {
        paragraphs: [
          "A share CFD tracks the price of a listed company, but it is not the share itself. You do not own the stock, you have no shareholder rights, and you do not get a vote. Dividend adjustments are applied to open positions rather than paid to you as a shareholder.",
        ],
      },
    ],
    cta: OPEN,
  },
  {
    slug: "markets/crypto",
    title: "Crypto CFDs",
    lead: "Trade price movements in the major cryptocurrencies around the clock, without a wallet, an exchange account or a private key to lose.",
    blocks: [
      { heading: "The liquid names", body: "Bitcoin, Ethereum and a short list of large-cap alternatives — the ones deep enough to price honestly." },
      { heading: "Open all week", body: "Crypto does not respect the trading week, so this book stays open when the rest of the platform is closed." },
      { heading: "No custody problem", body: "You never hold the asset, so there is no wallet to secure, no exchange to trust with your balance and no key to lose." },
    ],
    prose: [
      {
        heading: "Be clear about the risk here",
        paragraphs: [
          "Crypto is the most volatile book we offer, by a wide margin. Double-digit percentage moves inside a single session are ordinary rather than exceptional, and leverage multiplies them in both directions.",
          "Leverage on crypto CFDs is capped well below our other markets for that reason, and the cap is not negotiable.",
        ],
      },
    ],
    cta: OPEN,
  },
];

/* -------------------------------------------------------------------------- */
/* Platforms                                                                   */
/* -------------------------------------------------------------------------- */

const platformPages: PageDef[] = [
  {
    slug: "platforms/mt5",
    title: "MetaTrader 5",
    lead: "The full multi-asset terminal. Everything you know from MT4, plus the depth-of-market, timeframes and strategy testing that MT4 never got.",
    blocks: [
      { heading: "21 timeframes", body: "Against MT4's nine. If you work off a 2-hour or 12-hour chart, you no longer have to fake it." },
      { heading: "Depth of market", body: "See the book on eligible instruments rather than inferring liquidity from the spread alone." },
      { heading: "Strategy tester worth using", body: "Multi-threaded, multi-currency backtesting, so an idea can be checked against real history in minutes." },
      { heading: "Expert Advisors", body: "Full MQL5 support for automated strategies and custom indicators, running server-side against our feed." },
    ],
    cta: OPEN,
  },
  {
    slug: "platforms/webtrader",
    title: "Web Portal",
    lead: "The whole account in a browser tab. Nothing to install, nothing to keep updated, and nothing left behind on a machine that isn't yours.",
    blocks: [
      { heading: "Opens anywhere", body: "Any modern browser on any operating system. Useful on a work machine where you cannot install software." },
      { heading: "The same account", body: "Identical positions, balance and history as the desktop terminal — it is one account, not a limited web version of one." },
      { heading: "Charting that holds up", body: "Full drawing tools, indicators and saved layouts, kept against your login rather than the device." },
    ],
    cta: DEMO,
  },
  {
    slug: "platforms/mobile",
    title: "Mobile Apps",
    lead: "iOS and Android. Built for managing a position you already have, rather than pretending a phone is a trading desk.",
    blocks: [
      { heading: "Manage, don't just watch", body: "Full order entry, modification and close-out — not a read-only portfolio screen." },
      { heading: "Alerts that reach you", body: "Push notifications on price levels, margin and filled orders, so you are not refreshing a chart all day." },
      { heading: "Log in once", body: "Biometric unlock after the first sign-in, because typing a password on a phone at speed is how mistakes happen." },
    ],
    cta: OPEN,
  },
  {
    slug: "platforms/copy",
    title: "Copy Trading",
    lead: "Follow a strategy you rate and mirror its trades on your own account, proportional to your balance. You keep control of your money and you can stop at any time.",
    blocks: [
      { heading: "Pick on evidence", body: "Every strategy publishes its track record, drawdown and risk profile. Judge it on the drawdown, not the headline return." },
      { heading: "Scaled to your account", body: "Trades copy in proportion to your balance, so you are not forced to match someone else's position size." },
      { heading: "Your money stays yours", body: "Funds never leave your account. You are mirroring trades, not handing anyone a deposit to manage." },
      { heading: "Leave whenever", body: "Stop copying, close the copied positions, or cap the risk per strategy. None of it needs our permission." },
    ],
    prose: [
      {
        heading: "What copy trading does not do",
        paragraphs: [
          "It does not remove risk, and it does not transfer it to somebody else. A strategy's past record tells you what already happened, not what happens next, and copying a losing week loses you real money.",
          "Choosing to follow a strategy is your decision, made on your own account. Elite Capital does not select, endorse or vouch for any strategy provider, and nothing on the platform is a recommendation to follow one.",
        ],
      },
    ],
    cta: DEMO,
  },
];

/* -------------------------------------------------------------------------- */
/* Account actions                                                             */
/* -------------------------------------------------------------------------- */

const accountPages: PageDef[] = [
  {
    slug: "open-account",
    title: "Open a live account",
    lead: "Three steps and a working day or so for verification. You will need proof of identity and proof of address before the account can be funded.",
    blocks: [
      { heading: "1. Apply", body: "The form takes a few minutes. We ask about your trading experience because the rules require it, and because the answers set your leverage." },
      { heading: "2. Verify", body: "Upload a government-issued photo ID and a recent utility bill or bank statement showing your address." },
      { heading: "3. Fund and trade", body: "Once you are approved, deposit from $100 on Standard and the account is live on every platform at once." },
    ],
    prose: [
      {
        heading: "Before you apply",
        paragraphs: [
          "CFDs are leveraged products. Most retail accounts lose money trading them, and you should not open one with capital you cannot afford to lose entirely.",
          "What we can offer you depends on where you live. Some jurisdictions are restricted altogether, and leverage caps differ between the rest — the application will tell you which rules apply to you before you finish it.",
        ],
      },
    ],
    cta: DEMO,
  },
  {
    slug: "demo",
    title: "Try a demo account",
    lead: "Live market prices, virtual money, no deposit and no deadline. The right place to learn the platform, and the only honest way to test a strategy before it costs you anything.",
    blocks: [
      { heading: "Real prices", body: "The demo runs on the same feed as the live book, so the spreads and the fills you see are the ones you would have got." },
      { heading: "Every platform", body: "MetaTrader 5, the Web Portal and the mobile apps all accept a demo login." },
      { heading: "No clock on it", body: "Use it for a week or a year. There is no countdown and no upgrade prompt." },
    ],
    prose: [
      {
        heading: "The one thing a demo cannot teach you",
        paragraphs: [
          "Slippage and emotion. A demo fills more kindly than a live book in fast markets, and losing virtual money does not feel like losing real money — which is precisely the variable that ruins most live accounts.",
          "Treat a good demo run as evidence the strategy is worth testing small, not as evidence it works.",
        ],
      },
    ],
    cta: OPEN,
  },
  {
    slug: "login",
    title: "Log in",
    lead: "Client area sign-in.",
    prose: [
      {
        paragraphs: [
          "[[WIRE THIS UP — the client area is not part of this site. Point this route at your account portal, or replace this page with the real sign-in form.]]",
          "Never enter your Elite Capital password on a page you did not reach from this domain. We will never ask for it by email, chat or phone.",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Company                                                                     */
/* -------------------------------------------------------------------------- */

const companyPages: PageDef[] = [
  {
    slug: "careers",
    title: "Careers",
    lead: "We are a small team and we hire slowly. If you want to build the parts of a broker that clients actually touch, we would like to hear from you.",
    blocks: [
      { heading: "Engineering", body: "Low-latency execution, the platforms and the client area. Mostly TypeScript and Go, with a lot of care about what happens under load." },
      { heading: "Client experience", body: "The support desk is a first-class team here, not an overflow queue. Multilingual, and empowered to actually fix things." },
      { heading: "Compliance and risk", body: "The people who keep the licences valid and the leverage sane. Unglamorous and completely load-bearing." },
    ],
    prose: [
      {
        paragraphs: [
          "No openings are listed right now. Send us what you have been working on and why this industry interests you — we keep good applications on file and we do come back to them.",
        ],
      },
    ],
    cta: { label: "Email us", href: "/contact" },
  },
  {
    slug: "media",
    title: "Media coverage",
    lead: "Press mentions, interviews and commentary.",
    prose: [
      {
        paragraphs: [
          "[[ADD COVERAGE — list real press items here, with outlet, date and a link. Leave this page out of the navigation until there is something on it.]]",
          "For media enquiries, interview requests or comment on market conditions, reach us through the contact page and mark the message for the press desk.",
        ],
      },
    ],
    cta: { label: "Contact the press desk", href: "/contact" },
  },
  {
    slug: "announcements",
    title: "Announcements",
    lead: "Platform updates, trading-hours changes and service notices.",
    prose: [
      {
        heading: "Trading hours around public holidays",
        paragraphs: [
          "Sessions are shortened or suspended on exchange holidays, and the affected instruments differ each time. Notices are posted here and emailed to affected clients before the date.",
        ],
      },
      {
        heading: "Platform maintenance",
        paragraphs: [
          "Scheduled maintenance runs at the weekend, outside market hours, and is announced at least 48 hours in advance. Emergency maintenance is announced as it happens.",
        ],
      },
      {
        paragraphs: [
          "[[REPLACE WITH REAL NOTICES — this page should be a dated list. The two entries above are the standing categories, not actual announcements.]]",
        ],
      },
    ],
  },
  {
    slug: "regulation",
    title: "Regulation",
    lead: "Who we are licensed by, and what that means for your account.",
    prose: [
      {
        heading: "Our licences",
        paragraphs: [
          "[[FILL IN — one paragraph per licensed entity: the registered company name, the regulator, the licence or registration number, and the registered office address. This is the single most-checked page on a broker's site and an empty or inaccurate version of it does real damage.]]",
        ],
      },
      {
        heading: "Which entity holds your account",
        paragraphs: [
          "The entity you contract with is determined by where you live, and it is confirmed to you during the application before you deposit anything. The products, leverage caps and protections available to you follow from that entity, not from the brand.",
        ],
      },
      {
        heading: "How client money is held",
        paragraphs: [
          "Client funds are held in segregated accounts, separate from the money the business operates on. Segregation means your balance is not ours to use as working capital; it is not a guarantee against trading losses, which remain yours.",
          "Every account carries negative balance protection, so a position cannot leave you owing more than your balance.",
        ],
      },
      {
        heading: "If something goes wrong",
        paragraphs: [
          "Complaints go to the support desk first and we will acknowledge them in writing. If we cannot resolve it between us, you can escalate to the regulator of the entity holding your account, and the complaints procedure in our legal documents sets out how.",
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Legal                                                                       */
/* -------------------------------------------------------------------------- */

const legalPages: PageDef[] = [
  {
    slug: "legal",
    title: "Legal documents",
    lead: "The agreements and disclosures that govern your account. Worth reading before you deposit rather than after something goes wrong.",
    blocks: [
      { heading: "Client Agreement", body: "The contract between you and Elite Capital: what we do, what you agree to, and how either side ends it." },
      { heading: "Risk Disclosure", body: "What leveraged trading can cost you, written plainly and at full length." },
      { heading: "Order Execution Policy", body: "How your orders are routed and filled, and what we do when the market gaps." },
      { heading: "Privacy Policy", body: "What we collect, why, how long we keep it and who else sees it." },
      { heading: "Cookie Policy", body: "What runs in your browser on this site and how to turn the optional parts off." },
      { heading: "AML & KYC Policy", body: "Why we ask for identity documents and what we are required to do with them." },
    ],
    prose: [
      {
        paragraphs: [
          "[[ATTACH THE DOCUMENTS — each item above should link to the current signed PDF, with a version date. A legal page that names documents without providing them is worse than not having the page.]]",
        ],
      },
    ],
  },
  {
    slug: "legal/terms",
    title: "Terms & conditions",
    lead: "The client agreement, in summary. The full executed document governs and is available on request.",
    prose: [
      {
        heading: "Using this site",
        paragraphs: [
          "By using this website you accept these terms, our privacy policy and our cookie policy. If you do not accept them, stop using the site.",
          "Nothing on this website is investment advice, a recommendation, or an offer to buy or sell anything. It is general information, it takes no account of your circumstances, and you should get independent advice if you need it.",
        ],
      },
      {
        heading: "Your account",
        paragraphs: [
          "You are responsible for keeping your login credentials secure and for every instruction placed through your account. Tell us immediately if you think someone else has access to it.",
          "You confirm that the money you deposit is yours, that it comes from a lawful source, and that you are not acting on behalf of anyone else unless we have agreed to that in writing.",
        ],
      },
      {
        heading: "Availability",
        paragraphs: [
          "We do not promise the platform will be available without interruption. Markets gap, connections drop and systems need maintenance. Where we can, we schedule downtime outside trading hours and announce it in advance.",
        ],
      },
      {
        paragraphs: [
          "[[REPLACE WITH THE EXECUTED AGREEMENT — the above is a plain-English summary written for this site, not a legal instrument. Have your counsel supply the binding text.]]",
        ],
      },
    ],
  },
  {
    slug: "legal/privacy",
    title: "Privacy policy",
    lead: "What we collect about you, why we need it, and what we do with it.",
    prose: [
      {
        heading: "What we collect",
        paragraphs: [
          "Identity and contact details, the identity documents required to verify you, financial information relevant to assessing your application, and records of your trading and your contact with our support desk.",
          "We also collect technical information automatically — IP address, device and browser, and how you move around this site.",
        ],
      },
      {
        heading: "Why we hold it",
        paragraphs: [
          "To operate your account, to meet anti-money-laundering and know-your-client obligations that we cannot opt out of, to support you, and to improve the service. Marketing is consent-based and you can withdraw that consent at any time without affecting your account.",
        ],
      },
      {
        heading: "Who else sees it",
        paragraphs: [
          "Regulators and law enforcement where we are legally required to disclose; payment providers to move your money; identity-verification providers to check your documents; and technology suppliers who process data on our instructions. We do not sell your personal data.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "You can ask for a copy of what we hold, ask us to correct it, ask us to delete it, or object to how we use it. Some records we are legally required to keep for a set period even after an account closes, and we will tell you when that applies.",
        ],
      },
      {
        paragraphs: [
          "[[ADD THE DATA CONTROLLER DETAILS — the registered entity name, its data-protection contact address, and the supervisory authority clients can complain to.]]",
        ],
      },
    ],
  },
  {
    slug: "legal/cookies",
    title: "Cookie policy",
    lead: "What this site stores in your browser, and how to switch off the parts that are optional.",
    prose: [
      {
        heading: "Strictly necessary",
        paragraphs: [
          "These keep you signed in, remember your language, and protect the site against abuse. They cannot be turned off, because without them the site does not work.",
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          "These tell us which pages get read and where people give up. They are optional, they are off until you accept them, and refusing them changes nothing about how the site behaves for you.",
        ],
      },
      {
        heading: "Marketing",
        paragraphs: [
          "These measure whether an advert led somewhere useful. Also optional, also off by default.",
        ],
      },
      {
        heading: "Turning them off",
        paragraphs: [
          "Every browser can block or delete cookies in its own settings. Blocking the strictly necessary ones will break sign-in.",
        ],
      },
    ],
  },
  {
    slug: "legal/aml",
    title: "AML & KYC policy",
    lead: "Why we ask for your documents, and what we are required to do with them.",
    prose: [
      {
        heading: "Why we verify you",
        paragraphs: [
          "Anti-money-laundering law requires us to know who our clients are before we hold their money. That is not a policy we can waive for convenience, and an unverified account cannot be funded or traded.",
        ],
      },
      {
        heading: "What we ask for",
        paragraphs: [
          "A government-issued photo ID, a recent document confirming your address, and — depending on the size and pattern of your deposits — evidence of where the money came from.",
          "We may repeat these checks during the life of the account, particularly if your activity changes materially.",
        ],
      },
      {
        heading: "What we are required to do",
        paragraphs: [
          "Monitor for unusual activity, keep records for the period the law specifies, and report suspicion to the relevant authority. We are generally prohibited from telling you that such a report has been made.",
          "We will refuse, suspend or close an account where we cannot satisfy these obligations, and we will return remaining client money to its verified source where we are permitted to.",
        ],
      },
    ],
  },
  {
    slug: "legal/risk-disclosure",
    title: "Risk disclosure",
    lead: "The full version of the warning at the top of every page. Read it before you deposit.",
    prose: [
      {
        heading: "Leverage works in both directions",
        paragraphs: [
          "CFDs are leveraged, which means a small deposit controls a much larger position. The same leverage that multiplies a gain multiplies a loss, and it does so at the same speed.",
          "Most retail investor accounts lose money trading CFDs. Assume you are in that group until your own record over a meaningful period proves otherwise.",
        ],
      },
      {
        heading: "You do not own the asset",
        paragraphs: [
          "A CFD tracks a price. It gives you no ownership of the underlying instrument, no shareholder rights, no vote and no entitlement to delivery.",
        ],
      },
      {
        heading: "Markets gap",
        paragraphs: [
          "Prices can jump from one level to another without trading in between — over a weekend, around a data release, or in a shock. A stop-loss is an instruction to trade at the next available price, not a guarantee of the price you set.",
        ],
      },
      {
        heading: "Margin and close-out",
        paragraphs: [
          "If your equity falls below the required margin, positions can be closed automatically without further notice to you. That protects you from the position getting worse; it does not protect you from the loss already taken.",
          "Negative balance protection applies to every Elite Capital account, so you cannot end up owing more than your balance. Losing the entire balance remains possible.",
        ],
      },
      {
        heading: "Past performance",
        paragraphs: [
          "Nothing that already happened — in a market, in a strategy, or in a copy-trading track record — tells you what happens next. Treat historical figures as context, never as an expectation.",
        ],
      },
      {
        heading: "Get advice if you need it",
        paragraphs: [
          "This site is general information and takes no account of your objectives, financial situation or needs. If you are unsure whether these products suit you, take independent advice before trading.",
        ],
      },
    ],
  },
];

export const pages: PageDef[] = [
  ...markets,
  ...platformPages,
  ...accountPages,
  ...companyPages,
  ...legalPages,
];

export const pageBySlug = new Map(pages.map((p) => [p.slug, p]));
