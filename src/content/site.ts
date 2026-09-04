/**
 * Every string on the site. Nothing is hardcoded in JSX.
 *
 * Copy is written for this site. Where a section's *structure* is borrowed
 * (the four-up cost row, the fund-safety banner, the two-audience split, the
 * platform-range card, the split advantages panel), the wording is not — it is
 * rewritten in plain English rather than lifted. Lines marked `REVIEW:` make a
 * claim about the firm and need compliance sign-off before launch.
 *
 * The `ticker` list below is instrument metadata only — no prices. Live
 * prices come from Yahoo Finance at request time; see `src/lib/quotes.ts` and
 * `Ticker.tsx`.
 */

export const site = {
  name: "Elite Capital",
  tagline: "Forex & CFD Trading Platform",

  /** Regulatory. Not decorative — must stay above the fold. */
  riskDisclaimer:
    "CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.",

  cta: {
    /**
     * `short` is used in the nav below 640px, where the full label does not
     * fit alongside the logo and the menu button on a 320px screen. It is
     * real alternate copy, not a truncation — keep both saying the same
     * thing if you edit either.
     */
    primary: {
      label: "Open Live Account",
      short: "Open Account",
      href: "/coming-soon",
    },
    secondary: { label: "Try Demo Account", href: "/coming-soon" },
    login: { label: "Log In", href: "#accounts" },
  },

  /** Footer brand paragraph. The link columns live in `footer.ts`. */
  footerBlurb:
    "Elite Capital provides online trading in forex, commodities, indices, metals and shares through MetaTrader 5 and our browser-based Web Portal.",
} as const;

/* -------------------------------------------------------------------------- */
/* Navigation                                                                  */
/* -------------------------------------------------------------------------- */

export type NavGroup = {
  title: string;
  items: { label: string; desc: string; href: string }[];
};

export type NavItem = {
  label: string;
  href?: string;
  groups?: NavGroup[];
};

export const nav: NavItem[] = [
  {
    label: "Trading",
    groups: [
      {
        title: "FX & Commodities",
        items: [
          { label: "Forex", desc: "Trade 50+ currency pairs with tight, competitive spreads.", href: "#markets" },
          { label: "Metals", desc: "Gold, silver and precious metals with deep liquidity.", href: "#markets" },
          { label: "Commodities", desc: "Diversify with oil, gas and other soft commodities.", href: "#markets" },
        ],
      },
      {
        title: "Equities & Digital",
        items: [
          { label: "Indices", desc: "Get exposure to the world's leading stock indices.", href: "#markets" },
          { label: "Shares", desc: "CFDs on global equities from major exchanges.", href: "#markets" },
          { label: "Crypto CFDs", desc: "Speculate on Bitcoin, Ethereum and more, 24/7.", href: "#markets" },
        ],
      },
    ],
  },
  {
    /**
     * Two terminals, not four. MT4 and Pro-Link were removed with the rest of
     * the lineup — if either comes back, it goes here and in `platforms`.
     */
    label: "Platforms",
    groups: [
      {
        title: "Trading Terminals",
        items: [
          { label: "MetaTrader 5", desc: "The full multi-asset terminal, with the tooling to match.", href: "#platforms" },
          { label: "Web Portal", desc: "Trade in your browser. Nothing to download, nothing to update.", href: "#platforms" },
        ],
      },
      {
        title: "Tools & Programs",
        items: [
          { label: "Mobile Apps", desc: "The same account in your pocket, on iOS and Android.", href: "#platforms" },
          { label: "Copy Trading", desc: "Follow a strategy you rate and mirror it on your own account.", href: "#platforms" },
        ],
      },
    ],
  },
  // Single-page site: every href is a same-page anchor, never a route.
  { label: "Accounts", href: "#accounts" },
  {
    label: "Elite",
    groups: [
      {
        title: "Why Elite Capital",
        items: [
          { label: "Fast Execution", desc: "Orders routed for low-latency fills.", href: "#advantages" },
          { label: "Competitive Spreads", desc: "Tight pricing across all markets.", href: "#advantages" },
          { label: "Flexible Leverage", desc: "Trading power that fits your strategy.", href: "#advantages" },
          { label: "Negative Balance Protection", desc: "Your account can never be pushed below zero.", href: "#fund-safety" },
        ],
      },
      {
        title: "Support",
        items: [
          { label: "Help Center", desc: "Answers to common trading questions.", href: "#faq" },
          { label: "Contact Us", desc: "Reach our multilingual support team, 24/7.", href: "#support" },
        ],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export const hero = {
  kicker: "Forex & CFD Trading",
  headline: ["Trade global markets with", "precision and trust"],
  lead: "Elite Capital gives you access to forex, commodities, indices, metals and shares with tight spreads, fast execution, and platforms built for every kind of trader.",
  /** Facts only — no ratings or counts we can't source. */
  trustRow: [
    "Segregated client funds",
    "Negative balance protection",
    "Multilingual support, 24/7",
  ],
};

/* -------------------------------------------------------------------------- */
/* Ticker                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * `symbol` is the Yahoo Finance ticker fetched for this row; `decimals` is
 * how the live price is formatted. Gold and silver are priced off the COMEX
 * futures contract (`GC=F` / `SI=F`) — Yahoo has no working `XAUUSD=X` /
 * `XAGUSD=X` spot symbol despite those looking like the obvious choice.
 */
export const ticker = [
  { pair: "EUR/USD", symbol: "EURUSD=X", decimals: 4 },
  { pair: "GBP/USD", symbol: "GBPUSD=X", decimals: 4 },
  { pair: "XAU/USD", symbol: "GC=F", decimals: 2 },
  { pair: "XAG/USD", symbol: "SI=F", decimals: 2 },
  { pair: "US30", symbol: "^DJI", decimals: 1 },
  { pair: "NAS100", symbol: "^NDX", decimals: 1 },
  { pair: "BTC/USD", symbol: "BTC-USD", decimals: 0 },
  { pair: "WTI Oil", symbol: "CL=F", decimals: 2 },
] as const;

/* -------------------------------------------------------------------------- */
/* Cost & execution row — the four things a switching trader checks first      */
/* -------------------------------------------------------------------------- */

/**
 * `icon` selects a glyph from the map in Edge.tsx. Adding an item without
 * adding its icon there renders the fallback, not a blank — but add both.
 */
export const edge = {
  items: [
    {
      icon: "spread" as const,
      title: "Spreads that stay tight",
      body: "Majors start at 0.0 pips on ECN and 1.0 pips on Standard.",
    },
    {
      icon: "cost" as const,
      title: "No cost hiding in the fill",
      body: "The spread is the price. No platform fee, no commission outside ECN.", // REVIEW
    },
    {
      icon: "execution" as const,
      title: "Fills you can plan around",
      body: "Orders go through at the price you clicked — no requotes, no rejections.", // REVIEW
    },
    {
      icon: "withdraw" as const,
      title: "Withdrawals without the wait",
      body: "Take your money out whenever you want it, and pay nothing to do it.", // REVIEW
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Our advantages — split panel                                                */
/* -------------------------------------------------------------------------- */

export const advantages = {
  heading: "Our advantages",
  lead: "A trading setup built around the people using it, not around the fine print.",
  items: [
    { title: "Fast execution", body: "Orders routed for low-latency fills, even when the market is moving." },
    { title: "Competitive spreads", body: "Pricing built to keep the running cost of trading down." },
    { title: "Flexible leverage", body: "Choose the trading power that suits your strategy, within your regulator's limits." },
    { title: "Easy transactions", body: "Funding and withdrawals that are quick, simple and free of charge." }, // REVIEW
    { title: "Support in your language", body: "Real people, 24/7, in the language you are most comfortable using." },
    { title: "Negative balance protection", body: "Your account cannot be pushed below zero. Losses stop at your balance." }, // REVIEW
  ],
};

/* -------------------------------------------------------------------------- */
/* Platforms — bento + the range card                                          */
/* -------------------------------------------------------------------------- */

export const platforms = {
  heading: "Trade your way,\non any device",
  lead: "Two terminals, one login, and the same account behind both.",
  items: [
    { title: "Mobile App", body: "The same account in your pocket, on iOS and Android.", image: "/mobile-app.png" },
    { title: "Web Portal", body: "Trade straight from your browser. Nothing to install, nothing to keep updated.", image: "/web-trader.png" },
    { title: "MetaTrader 5", body: "The full multi-asset terminal, with the charting and automation to match." },
    { title: "Copy Trading", body: "Follow a strategy you rate and mirror its trades on your own account." },
  ],
};

/* -------------------------------------------------------------------------- */
/* Markets — continuous loop                                                   */
/* -------------------------------------------------------------------------- */

export const markets = {
  heading: "One account,\nevery major market",
  lead: "Six asset classes, one login, one margin pool.",
  /**
   * `symbols` are a representative sample, not the full instrument list —
   * `count` still carries that claim. Each maps to a Yahoo Finance ticker;
   * live prices are fetched in `Markets.tsx` via `src/lib/quotes.ts`, the
   * same feed the header ticker uses.
   */
  items: [
    {
      name: "Forex",
      body: "Major, minor and exotic currency pairs.",
      count: "50+ pairs",
      symbols: [
        { label: "EUR/USD", symbol: "EURUSD=X", decimals: 4 },
        { label: "GBP/USD", symbol: "GBPUSD=X", decimals: 4 },
        { label: "USD/JPY", symbol: "JPY=X", decimals: 2 },
        { label: "AUD/USD", symbol: "AUDUSD=X", decimals: 4 },
      ],
    },
    {
      name: "Metals",
      body: "Gold, silver and other precious metals CFDs.",
      count: "Spot & futures",
      symbols: [
        { label: "Gold", symbol: "GC=F", decimals: 2 },
        { label: "Silver", symbol: "SI=F", decimals: 2 },
        { label: "Platinum", symbol: "PL=F", decimals: 2 },
        { label: "Palladium", symbol: "PA=F", decimals: 2 },
      ],
    },
    {
      name: "Indices",
      body: "Trade the world's leading stock indices.",
      count: "Global coverage",
      symbols: [
        { label: "US30", symbol: "^DJI", decimals: 1 },
        { label: "SPX500", symbol: "^GSPC", decimals: 1 },
        { label: "NAS100", symbol: "^NDX", decimals: 1 },
        { label: "GER40", symbol: "^GDAXI", decimals: 1 },
      ],
    },
    {
      name: "Shares",
      body: "CFDs on globally listed equities.",
      count: "Major exchanges",
      symbols: [
        { label: "Apple", symbol: "AAPL", decimals: 2 },
        { label: "Microsoft", symbol: "MSFT", decimals: 2 },
        { label: "Amazon", symbol: "AMZN", decimals: 2 },
        { label: "Tesla", symbol: "TSLA", decimals: 2 },
      ],
    },
    {
      name: "Commodities",
      body: "Energy and agricultural commodity CFDs.",
      count: "Energy & softs",
      symbols: [
        { label: "WTI Oil", symbol: "CL=F", decimals: 2 },
        { label: "Natural Gas", symbol: "NG=F", decimals: 3 },
        { label: "Coffee", symbol: "KC=F", decimals: 2 },
        { label: "Wheat", symbol: "ZW=F", decimals: 2 },
      ],
    },
    {
      name: "Crypto CFDs",
      body: "Trade price movements in major cryptocurrencies.",
      count: "24/7 market",
      symbols: [
        { label: "BTC/USD", symbol: "BTC-USD", decimals: 0 },
        { label: "ETH/USD", symbol: "ETH-USD", decimals: 2 },
        { label: "SOL/USD", symbol: "SOL-USD", decimals: 2 },
        { label: "XRP/USD", symbol: "XRP-USD", decimals: 4 },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Fund safety banner                                                          */
/* REVIEW: every line here is a claim about how client money is held.          */
/* -------------------------------------------------------------------------- */

export const fundSafety = {
  heading: "Your money stays\nwhere it belongs",
  lead: "Client funds sit in segregated accounts with established banks, kept apart from the money we run the business on. Negative balance protection means a bad session can never take you past zero.",
  points: [
    "Segregated client accounts",
    "Negative balance protection",
    "Encrypted end to end",
  ],
};

/* -------------------------------------------------------------------------- */
/* Account tiers                                                               */
/* -------------------------------------------------------------------------- */

export const accounts = {
  heading: "An account for\nevery trading style",
  lead: "Three tiers, one platform. Move between them as your volume changes.",
  /**
   * Standard isn't one price list — it's the same account in two
   * denominations, dollar or cent lots. That's a toggle inside one card
   * (`StandardTierCard.tsx`), not two separate cards, so the reader compares
   * ECN and Pro against one "Standard" rather than two near-identical tiers.
   */
  standard: {
    name: "Standard",
    blurb: "For traders opening their first live position and learning how a fill behaves.",
    cta: "Open Standard Account",
    modes: {
      dollar: {
        label: "Dollar",
        deposit: "100", // REVIEW: minimum deposit to open — distinct from the $1,000 spread-promo threshold below
        spread: "0.0",
        commission: "None",
        features: [
          "0.0 spread on deposits up to $1,000",
          "Leverage up to 1:300",
          "Not swap-free",
          "Negative balance protection",
          "Fast execution on every order",
          "Support 24/7",
        ],
      },
      cent: {
        label: "Cent",
        deposit: "10", // REVIEW: minimum deposit not specified — confirm actual figure
        spread: "1.0", // REVIEW: specified only as "min spread" — confirm the actual figure
        commission: "None",
        features: [
          "Every symbol tradable in cent lots",
          "Leverage up to 1:300",
          "Not swap-free",
          "Minimal spreads across all symbols",
          "Fast execution on every order",
          "Support 24/7",
        ],
      },
    },
  },
  tiers: [
    {
      name: "ECN",
      blurb: "For high-volume and algorithmic traders who would rather pay commission than spread.",
      deposit: "1,000", // REVIEW: minimum deposit not specified — confirm actual figure
      spread: "0.0",
      commission: "Per lot",
      cta: "Open ECN Account",
      features: [
        "Tight, raw spreads from 0.0 pips",
        "Not swap-free",
        "Commission-based pricing",
        "Market execution",
        "Zero-latency order routing",
        "Support 24/7",
      ],
    },
    {
      name: "Pro",
      blurb: "The ECN account, behind a larger deposit — for high-volume traders who want more headroom.",
      deposit: "20,000",
      spread: "0.0",
      commission: "Per lot",
      cta: "Open Pro Account",
      features: [
        "Tight, raw spreads from 0.0 pips",
        "Not swap-free",
        "Commission-based pricing",
        "Market execution",
        "Zero-latency order routing",
        "Support 24/7",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Two audiences, one page                                                     */
/* -------------------------------------------------------------------------- */

export const everyTrader = {
  heading: "There's a way in, whatever\nstage you're at",
  lead: "We would rather clear the obstacles than sell you a way around them.",
  cards: [
    {
      tone: "light" as const,
      title: "New to trading?",
      body: "Practise on a demo account with live market prices and none of the risk. Work through our guides at your own pace, and move to a live account whenever you feel ready.",
      cta: { label: "Start on a demo", href: "/coming-soon" },
    },
    {
      tone: "dark" as const,
      title: "Been at this a while?",
      body: "Raw spreads, deeper liquidity and the advanced tooling you already know how to use, plus a named contact who picks up when you call.",
      cta: { label: "See the ECN account", href: "/coming-soon" },
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Steps — a real ordered sequence, which is why it gets numbers               */
/* -------------------------------------------------------------------------- */

export const steps = {
  heading: "Open your account\nin three steps",
  items: [
    { title: "Register", body: "Create your account in minutes with a simple, secure sign-up process." },
    { title: "Fund", body: "Deposit using a range of fast, secure payment methods." },
    { title: "Trade", body: "Access global markets and start trading on your preferred platform." },
  ],
};

/* -------------------------------------------------------------------------- */
/* Support                                                                     */
/* -------------------------------------------------------------------------- */

export const support = {
  heading: "Real people, whenever\nthe market is open",
  lead: "Reach us by chat, email or phone, 24/7, in a wide range of languages. No ticket queue, no bot to argue with first.",
  cta: { label: "Talk to us", href: "mailto:info@elitecapital.global" },
  phone: "+1-758-572-0609",
};

/* -------------------------------------------------------------------------- */
/* FAQ                                                                         */
/* REVIEW: answers below make claims and need compliance sign-off.             */
/* -------------------------------------------------------------------------- */

export const faq = {
  heading: "Questions worth\nasking a broker",
  lead: "Can't find it? Our support team answers in your language, 24/7.",
  items: [
    {
      q: "What do I need to open a live account?",
      a: "A completed application, proof of identity and proof of address. Minimum deposits start at $100 on the Standard account. Verification requirements depend on the jurisdiction you apply from.", // REVIEW
    },
    {
      q: "Are my funds held separately from the firm's?",
      a: "Yes. Client money is held in segregated accounts, apart from the capital Elite Capital operates on, and every account carries negative balance protection.", // REVIEW
    },
    {
      q: "What does trading actually cost me?",
      a: "On Standard and Pro the cost is the spread — from 1.0 and 0.6 pips — with no commission. On ECN you pay a raw spread from 0.0 pips plus a commission per lot. There are no requotes and no platform fees.", // REVIEW
    },
    {
      q: "Which platforms can I trade on?",
      a: "MetaTrader 5 and our browser-based Web Portal, plus the iOS and Android apps. One account works across all of them, and Copy Trading sits on top.", // REVIEW
    },
    {
      q: "Can I lose more than I deposit?",
      a: "No. CFDs are leveraged, so losses can be large and fast, but negative balance protection applies to every Elite Capital account — your losses stop at your balance. Read the risk disclosure in full before you trade.", // REVIEW
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Closing CTA                                                                 */
/* -------------------------------------------------------------------------- */

export const closing = {
  heading: "Start trading with\nElite Capital today",
  lead: "Open a live account, or practice risk-free on a demo first.",
};

