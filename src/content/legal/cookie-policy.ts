import type { LegalDocument } from "./types";

/**
 * Web version of "Elite FX Capital – Cookie Policy" (20 October 2026).
 *
 * Changes from the PDF, all approved by the client on 23 October 2026:
 *   - Company details table: address, registration number and phone removed.
 *   - Section 5: the placeholder cookie table is replaced with what is true
 *     today — the public site sets no cookies, and Vercel Analytics is
 *     cookieless. Update this when the Client Area or live chat goes live.
 *   - 7.2: the unfinished "using." sentence completed for the no-banner case.
 *   - 11.1: phone removed; questions go to info@.
 */
export const cookiePolicy: LegalDocument = {
  title: "Cookie Policy",
  summary:
    "How elitecapital.global uses cookies and similar technologies, and how you can control them.",
  meta: "Last updated 20 October 2026",
  sections: [
    {
      id: "company-details",
      title: "Company details",
      blocks: [
        "This Cookie Policy applies to the website elitecapital.global, operated by Elite fx Capital Ltd.",
        {
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Company", "Elite fx Capital Ltd. (trading as Elite fx Capital)"],
              ["Incorporation", "International Business Company registered in Saint Lucia"],
              ["Website", "elitecapital.global"],
              ["Questions about cookies", "info@elitecapital.global"],
            ],
          },
        },
      ],
    },
    {
      id: "about",
      title: "1. About this policy",
      blocks: [
        "1.1 This Cookie Policy explains how Elite fx Capital Ltd. (the “Company”, “we” or “us”) uses cookies and similar technologies on elitecapital.global and related pages, including the Client Area (together, the “Website”).",
        "1.2 Read this policy together with the Privacy Policy and the Client Agreement. If the Privacy Policy and this policy differ on how personal data is used, the Privacy Policy applies.",
        "1.3 We may update this policy. The current version is always published on the Website, and the date at the top shows when it was last changed.",
      ],
    },
    {
      id: "what-cookies-are",
      title: "2. What cookies are",
      blocks: [
        "2.1 Cookies are small text files that a website stores on your device when you visit it. They let the website recognise your device on later visits, remember your choices, and measure how the site is used.",
        "2.2 This policy also covers similar technologies used on the Website, such as local storage and pixels (small image files that record page views).",
      ],
    },
    {
      id: "why",
      title: "3. Why we use cookies",
      blocks: [
        "3.1 We use cookies to:",
        {
          list: [
            "keep the Website secure and working, including signing you in to the Client Area and supporting fraud checks;",
            "remember your preferences, such as language and display settings;",
            "understand how visitors use the Website, so that we can improve it; and",
            "measure the reach of our marketing.",
          ],
        },
        "3.2 Cookies do not give us access to your Access Details. You must never share your Access Details with anyone, including through a cookie or a link you do not trust.",
      ],
    },
    {
      id: "categories",
      title: "4. Categories of cookies",
      blocks: [
        "4.1 The Website may use cookies in the categories below.",
        {
          table: {
            head: ["Category", "What it does", "Consent needed"],
            rows: [
              ["Strictly necessary", "Runs the Website, keeps you signed in to the Client Area, and supports security and fraud checks", "No"],
              ["Performance and analytics", "Counts visitors and shows how pages are used, so that we can improve the Website", "Yes, where the law requires it"],
              ["Functional", "Remembers choices such as language and display settings", "Yes, where the law requires it"],
              ["Marketing and targeting", "Records visits to show more relevant offers, and may be shared with advertising partners", "Yes, where the law requires it"],
            ],
          },
        },
      ],
    },
    {
      id: "cookies-we-set",
      title: "5. Cookies we set on the Website",
      blocks: [
        "5.1 The public website at elitecapital.global currently sets no cookies.",
        "5.2 We measure visits with Vercel Analytics, which counts page views without using cookies and without identifying you.",
        "5.3 When the Client Area and live chat go live, they will need their own cookies. We will list each one here, with its purpose and how long it lasts, before it is used. We review this section at least once a year, and whenever we add a new tool.",
      ],
    },
    {
      id: "third-party",
      title: "6. Third-party cookies",
      blocks: [
        "6.1 Some cookies may be set by third parties that provide services to us, such as analytics, identity verification or live chat. We do not control these cookies. Each provider decides how long its cookies last and how it uses the data.",
        "6.2 Where a third party processes personal data for us, we will agree its obligations in writing, as described in the Privacy Policy.",
        "6.3 For details of a third party’s cookies, read that party’s own cookie and privacy policy.",
      ],
    },
    {
      id: "your-choices",
      title: "7. Your choices",
      blocks: [
        "7.1 Strictly necessary cookies are needed for the Website to work. They cannot be switched off without affecting how you use it.",
        "7.2 For other cookies, we will ask for your consent where the law requires it. You will be able to accept, reject or change your choice at any time.",
        "7.3 Withdrawing consent does not affect processing that took place before you withdrew it.",
      ],
    },
    {
      id: "browser",
      title: "8. Managing cookies in your browser",
      blocks: [
        "8.1 Most browsers let you view, delete and block cookies. The settings are usually in the privacy or security section of the browser. Blocking all cookies, including strictly necessary ones, may stop parts of the Website from working, including the Client Area.",
        "8.2 Deleting cookies signs you out of the Client Area and resets your preferences.",
        "8.3 We are not responsible for problems caused by blocking or deleting cookies that the Website needs in order to work.",
      ],
    },
    {
      id: "personal-data",
      title: "9. Personal data",
      blocks: [
        "9.1 Some cookies collect personal data, such as an IP address or device information. We use this data as described in the Privacy Policy, and keep it only as long as needed for the purposes in this policy.",
        "9.2 Information collected by security cookies may also be used for the identity verification and anti-fraud checks described in the Client Agreement.",
      ],
    },
    {
      id: "changes",
      title: "10. Changes to this policy",
      blocks: [
        "10.1 We may change this policy at any time. Changes take effect when they are published on the Website.",
        "10.2 Continuing to use the Website after a change takes effect means that you accept the updated policy.",
      ],
    },
    {
      id: "contact",
      title: "11. Contact us",
      blocks: [
        "11.1 For questions about this policy, email info@elitecapital.global.",
        "11.2 This policy is governed by the law that governs the Client Agreement.",
      ],
    },
  ],
};
