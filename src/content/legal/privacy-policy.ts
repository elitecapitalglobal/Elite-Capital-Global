import type { LegalDocument } from "./types";

/**
 * Approved by the client on 23 October 2026. Built from clause 11 of the
 * Client Agreement, Annex I of the AML Policy and the Cookie Policy.
 * No regulator, address, phone number or registration number — by
 * instruction. Clause 11.2's named authority is generalised to "public
 * authorities" for the same reason.
 */
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  summary:
    "What personal data we collect, why we collect it, who we share it with, and the choices you have.",
  meta: "Last updated 23 October 2026",
  sections: [
    {
      id: "who-we-are",
      title: "1. Who we are",
      blocks: [
        "Elite fx Capital Ltd. (“we”, “us”) runs elitecapital.global and the Client Area. We are registered in Saint Lucia as an International Business Company.",
        "This policy explains what personal data we collect, why we collect it, and the choices you have. Read it together with the Client Agreement, the Cookie Policy and the Anti-Money Laundering Policy.",
      ],
    },
    {
      id: "what-we-collect",
      title: "2. What we collect",
      blocks: [
        {
          list: [
            "Identity details: full name, date and place of birth, and a copy of your passport, national ID card or other accepted ID.",
            "Contact details: home address, country of residence, email address and mobile number.",
            "Verification documents: proof of address and, where needed, proof of source of funds or wealth.",
            "Financial details: payment method details, deposits, withdrawals and transaction history.",
            "Trading data: your account activity and trading history.",
            "Technical data: IP address, device and browser information, and login records.",
            "For corporate clients: company documents, plus details of directors, shareholders and beneficial owners.",
          ],
        },
      ],
    },
    {
      id: "why-we-use-it",
      title: "3. Why we use it",
      blocks: [
        {
          list: [
            "To open and run your account and provide our services.",
            "To check your identity and screen against sanctions and politically exposed person (PEP) lists.",
            "To meet our anti-money laundering duties.",
            "To process deposits and withdrawals, and to prevent fraud.",
            "To answer your questions and complaints.",
            "To send you service messages and, with your consent, marketing. You can opt out of marketing at any time.",
          ],
        },
      ],
    },
    {
      id: "who-we-share-it-with",
      title: "4. Who we share it with",
      blocks: [
        "We share personal data only where we need to, with:",
        {
          list: [
            "banks, payment providers and clearing counterparties;",
            "identity verification and screening providers;",
            "public authorities, where the law requires us to;",
            "introducing partners, limited to the information described in the Client Agreement; and",
            "professional advisers, where needed.",
          ],
        },
        "We do not sell your personal data.",
      ],
    },
    {
      id: "transfers-abroad",
      title: "5. Transfers abroad",
      blocks: [
        "Some of our service providers are based outside Saint Lucia. When we share data with them, we agree in writing how they must protect it.",
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "6. How long we keep it",
      blocks: [
        "We keep records for seven (7) years after our relationship ends or after your last transaction, whichever is later, as our Anti-Money Laundering Policy requires. After that, we delete or anonymise them.",
      ],
    },
    {
      id: "how-we-protect-it",
      title: "7. How we protect it",
      blocks: [
        "Data travels over encrypted connections. Only staff who need your data can access it. Withdrawals are approved with a one-time password.",
      ],
    },
    {
      id: "your-choices",
      title: "8. Your choices and rights",
      blocks: [
        "You can ask us to:",
        {
          list: [
            "give you a copy of your data;",
            "correct your data;",
            "delete your data, where the law allows; and",
            "stop using your data for marketing.",
          ],
        },
        "We may have to keep some data to meet legal duties. If you withdraw consent we need to provide our services, we may not be able to keep your account open.",
      ],
    },
    {
      id: "cookies",
      title: "9. Cookies",
      blocks: ["See our Cookie Policy for how the website uses cookies."],
    },
    {
      id: "changes",
      title: "10. Changes",
      blocks: [
        "We may update this policy. We will publish the current version on the website and email you about material changes.",
      ],
    },
    {
      id: "contact",
      title: "11. Contact",
      blocks: [
        "For privacy questions or requests, email info@elitecapital.global. We reply within 1 business day.",
      ],
    },
  ],
};
