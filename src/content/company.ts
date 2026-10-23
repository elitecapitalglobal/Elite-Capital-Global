/**
 * Copy for the company pages: About, Contact, Compliance.
 *
 * Every line here was confirmed with the client on 23 October 2026. Rules
 * that came out of that review, which apply to anything added later:
 *   - No person is named anywhere — roles only ("our compliance team").
 *   - No regulator, licence, registration number, street address or phone
 *     number. The company is registered in Saint Lucia; that is all we say.
 *   - Email only: support@ (account and payment help), info@ (general and
 *     privacy), compliance@ (AML, KYC and complaints). Replies within
 *     1 business day.
 */

import { contact } from "@/content/site";

export const about = {
  hero: {
    label: "About us",
    title: "About Elite fx Capital",
    lead: "Elite fx Capital is an online broker. We give traders access to forex, metals, indices, shares, commodities and crypto CFDs from a single account.",
  },
  intro: [
    "You can trade on MetaTrader 5, in your browser on our Web Portal, or on our mobile apps. One login works across all of them.",
    "We built Elite fx Capital around a simple idea: trading costs, rules and payments should be easy to understand before you place your first trade. We show our spreads, minimum deposits and payment rules openly. We do not charge fees to deposit or withdraw.",
  ],
  vision: {
    title: "Our vision",
    body: "To be the broker traders trust because it is clear and fair, and because it is there when they need it.",
  },
  mission: {
    title: "Our mission",
    body: "To give every trader, whether new or experienced, fair pricing, dependable execution and straightforward access to their money. We back that up with support in their own language, at any hour.",
  },
  offer: {
    heading: "What we offer",
    items: [
      { title: "Six markets, one account", body: "Forex, metals, indices, shares, commodities and crypto CFDs." },
      { title: "Three account types", body: "Standard for those starting out, ECN for raw spreads with commission, and Pro for high-volume traders." },
      { title: "Your choice of platform", body: "MetaTrader 5, the Web Portal, mobile apps and copy trading." },
      { title: "Free deposits and withdrawals", body: "We charge no fees. Your bank or payment provider may charge its own." },
    ],
  },
  protect: {
    heading: "How we protect you",
    items: [
      { title: "Segregated client funds", body: "Your money is held separately from the company’s own money." },
      { title: "Negative balance protection", body: "You cannot lose more than the balance in your account." },
      { title: "Identity and payment checks", body: "We verify every client and every payment, in line with our Anti-Money Laundering Policy." },
    ],
  },
  company: {
    heading: "Company information",
    body: contact.registration,
  },
};

export const contactPage = {
  hero: {
    label: "Contact us",
    title: "We’re here to help, 24/7",
    lead: `Our multilingual team answers by email and live chat, 24 hours a day, 7 days a week. We reply to every email within ${contact.replyTime}.`,
  },
  channels: [
    {
      title: "Account and payment help",
      body: "Questions about your account, deposits, withdrawals, verification or the trading platforms.",
      email: contact.support,
      cta: "Email support",
    },
    {
      title: "General enquiries",
      body: "General questions about Elite fx Capital, or about how we use your personal data.",
      email: contact.info,
      cta: "Email us",
    },
    {
      title: "Compliance and complaints",
      body: "Questions about our AML and identity checks, or a complaint you want to raise.",
      email: contact.compliance,
      cta: "Email compliance",
    },
  ],
  chat: {
    title: "Live chat",
    body: "The fastest way to reach us. Our team is online 24/7.",
    cta: "Start live chat",
  },
  tips: {
    heading: "Help us answer faster",
    items: [
      "Write from the email address registered to your account.",
      "Include your account number and a short description of the problem.",
      "For a payment, add the amount, the date and your payment reference or transaction hash.",
      "Never send your password, one-time password or full card number. We will never ask for them.",
    ],
  },
  more: {
    heading: "You may find your answer here",
    links: [
      { label: "Deposits & withdrawals", desc: "Methods, limits and timings.", href: "/deposits-and-withdrawals" },
      { label: "Help Centre", desc: "Answers to common trading questions.", href: "/#faq" },
      { label: "Compliance & complaints", desc: "Our complaints process and policies.", href: "/compliance" },
    ],
  },
};

export const compliance = {
  hero: {
    label: "Compliance",
    title: "How we keep your account and your money safe",
    lead: "The checks we carry out, the policies that govern your account, and what to do if something goes wrong.",
  },
  status: {
    heading: "Who we are",
    body: [
      contact.registration,
      "We follow the anti-money laundering and counter-terrorist financing laws that apply to us in Saint Lucia, and we do not accept clients from restricted jurisdictions.",
    ],
  },
  approach: {
    heading: "Our approach",
    lead: "Every client and every payment goes through the same checks. They protect you, and they protect the financial system.",
    items: [
      { title: "Know your client", body: "We verify your identity and address before you can trade or withdraw. We usually review documents within 1 business day." },
      { title: "Sanctions and PEP screening", body: "We screen every client against international sanctions and politically exposed person lists, at onboarding and on an ongoing basis." },
      { title: "Payment checks", body: "Payments must be in your own name, and withdrawals go back to the method you paid with wherever possible." },
      { title: "Segregated client funds", body: "Client money is held in segregated accounts, separate from the company’s own money." },
      { title: "Negative balance protection", body: "On every account. You cannot lose more than the balance in your account." },
      { title: "Records kept for 7 years", body: "We keep identity and transaction records for seven years after our relationship ends." },
    ],
  },
  documents: {
    heading: "Policies and legal documents",
    lead: "These documents form part of your agreement with us. Please read them before you open an account.",
    items: [
      { title: "Client Agreement", body: "The terms that apply to your trading account.", href: "/legal/client-agreement" },
      { title: "Anti-Money Laundering Policy", body: "Our identity, source-of-funds and screening checks.", href: "/legal/aml-policy" },
      { title: "Privacy Policy", body: "What personal data we collect and how we use it.", href: "/legal/privacy-policy" },
      { title: "Cookie Policy", body: "How the website uses cookies.", href: "/legal/cookie-policy" },
    ],
  },
  complaints: {
    heading: "Making a complaint",
    lead: "If something has gone wrong, tell us. We take every complaint seriously and handle it fairly.",
    steps: [
      { title: "Email our compliance team", body: `Write to ${contact.compliance} from your registered email address.` },
      { title: "We acknowledge it", body: "We confirm we have received your complaint within 1 business day." },
      { title: "We investigate", body: "We review your account records and may ask you for more information." },
      { title: "You get our answer", body: "We send our final response in writing within 15 business days." },
    ],
    include: {
      heading: "Please include",
      items: [
        "your full name and account number;",
        "the date and details of the problem;",
        "the outcome you are looking for; and",
        "any supporting documents, such as screenshots or payment receipts.",
      ],
    },
  },
};
