import type { LegalDocument } from "./types";

/**
 * Client-facing summary of "Elite FX Capital – AML Policy" (V1.0, 20 October
 * 2026). Agreed with the client on 23 October 2026: summary on the site, no
 * PDF download until the PDF is re-exported without address and registration
 * number.
 *
 * Deliberately left out: the risk matrix (s.7), staff rules (s.18), the
 * internal STR/UOR procedure (s.15, s.17), the EDD deposit thresholds (Annex
 * I), the regulator/FIU table (s.3) and the unfilled corporate placeholders
 * ([NUMBER] years, [20]%). Sanctions lists are described generically rather
 * than by issuing authority.
 */
export const amlPolicy: LegalDocument = {
  title: "Anti-Money Laundering Policy",
  summary:
    "How we prevent money laundering and terrorist financing, and what that means for you when you open an account, deposit or withdraw.",
  meta: "Summary of policy version 20102026_V1.0 · Approved 20 October 2026 · Next review 30 June 2027",
  sections: [
    {
      id: "our-commitment",
      title: "Our commitment",
      blocks: [
        "Elite fx Capital Ltd. is committed to preventing money laundering and terrorist financing. Our Board has adopted an Anti-Money Laundering (AML) Policy, and every employee must follow it.",
        "We follow the anti-money laundering and counter-terrorist financing laws that apply to us in Saint Lucia. We take a risk-based approach: the higher the risk, the more checks we carry out.",
        "This page summarises the parts of the policy that affect you as a client.",
      ],
    },
    {
      id: "who-we-accept",
      title: "Who we accept",
      blocks: [
        "We open an account only after we have confirmed who you are, why you want the account and where your money comes from. We do not accept:",
        {
          list: [
            "anonymous accounts or accounts in a false name;",
            "people or companies we cannot properly identify;",
            "anyone on an international sanctions list;",
            "residents of the countries listed under Regional Restrictions on our website;",
            "clients whose funds or business we cannot verify;",
            "applications with incomplete or invalid documents; or",
            "anyone linked to drug trafficking, terrorism or organised crime.",
          ],
        },
      ],
    },
    {
      id: "verifying-your-identity",
      title: "Verifying your identity",
      blocks: [
        "Before you can trade or withdraw, we need to verify your profile. For individual clients we collect:",
        {
          ordered: true,
          list: [
            "your full name, as shown on your passport or national ID card, and any other names you use;",
            "your date and place of birth;",
            "your home address and country of residence;",
            "your mobile number and email address;",
            "a copy of your passport or national ID card; and",
            "a proof of address.",
          ],
        },
        "Proof of identity: passport, national ID card, driving licence, residence permit or work permit. We cannot accept expired or damaged documents.",
        "Proof of address: dated within the last six (6) months. We accept a utility bill, bank or credit card statement, bank reference letter, signed tenancy agreement, or latest tax notice.",
        "We usually review your documents within 1 business day.",
      ],
    },
    {
      id: "corporate-clients",
      title: "Corporate clients",
      blocks: [
        "For a company, partnership or other legal entity we also need:",
        {
          list: [
            "the full company name, registration number, country of registration, registered address, phone and email;",
            "the certificate of incorporation, memorandum and articles, and a certificate of good standing or equivalent;",
            "a list of directors and shareholders, and a structure chart;",
            "the latest audited accounts, or a written explanation of why there are none;",
            "a copy of any licence, if the company carries on regulated activity;",
            "a board resolution authorising the person who acts for the company; and",
            "identity documents and a signed source-of-funds declaration for each beneficial owner and major shareholder.",
          ],
        },
      ],
    },
    {
      id: "source-of-funds",
      title: "Source of funds",
      blocks: [
        "We may ask where the money you deposit comes from, and for documents that show it. For example, if your funds come from a property sale or a severance payment, we may ask for the sale or settlement papers.",
        "For larger deposits, or where your account is higher risk, we carry out enhanced checks. These can include a source-of-funds or source-of-wealth form and supporting documents. We may hold a deposit or withdrawal until we receive them.",
      ],
    },
    {
      id: "screening",
      title: "Sanctions and PEP screening",
      blocks: [
        "We screen every client against international sanctions lists, politically exposed person (PEP) lists, criminal records and negative media. We do this before we open your account, before we provide services, and on an ongoing basis.",
        "If you are a politically exposed person, or closely linked to one, we apply enhanced due diligence. We may refuse service.",
      ],
    },
    {
      id: "payments",
      title: "Deposits and withdrawals",
      blocks: [
        {
          list: [
            "Every payment must come from an account, card or wallet in your own name. We return third-party payments to the sender.",
            "Withdrawals go back to the method you deposited with, wherever possible.",
            "We compare withdrawals with the deposits that funded the account.",
            "Money deposited and withdrawn with little or no trading, or deposits from several unrelated sources, may be reviewed.",
          ],
        },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring your account",
      blocks: [
        "We monitor deposits, trading and withdrawals for activity that does not match your profile. If something looks unusual, we may ask you questions or for documents. Being asked does not mean we suspect you of wrongdoing.",
        "We may delay or refuse a transaction, or restrict your account, while we look into it. Where the law requires, we report suspicious activity to the relevant authorities. The law may prevent us from telling you that a report has been made.",
      ],
    },
    {
      id: "keeping-records",
      title: "Keeping records",
      blocks: [
        "We keep identity documents, transaction records and screening results for seven (7) years after our relationship ends or after your last transaction, whichever is later.",
      ],
    },
    {
      id: "contact",
      title: "Questions",
      blocks: [
        "If you have a question about our AML checks or the documents we have asked for, email our compliance team at compliance@elitecapital.global. We reply within 1 business day.",
      ],
    },
  ],
};
