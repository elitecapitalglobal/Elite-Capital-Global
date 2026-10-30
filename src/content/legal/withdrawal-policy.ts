import type { LegalDocument } from "./types";

/**
 * Web version of "Elite FX Capital – Withdrawal Policy" (20102026_V1.0).
 *
 * Wording is the PDF's, clause for clause. Only these mechanical changes were
 * made; the downloadable PDF is built from this file (`npm run legal:pdf`),
 * so the two always match:
 *   - Details table: registration number, registered office, principal place
 *     of business and phone removed; contact changed to support@, the
 *     address for account and payment help.
 *   - Former section 13 (Dormant accounts) removed on the client's
 *     instruction of 30 October 2026. Sections 14–17 renumbered 13–16, and
 *     the cross-reference in 3.4 updated to match.
 *   - 6.3, 8.2, 8.3: "one (1) business days" → "one (1) business day".
 *   - 12.1: missing figure filled from Client Agreement 13.5 — "within five
 *     (5) business days".
 *   - 15.1 (was 16.1): info@ and phone → support@.
 *   - 16.1 (was 17.1): stray comma removed from "this, Policy".
 *   - 5.2: missing full stop after "The order below applies".
 *   - 10.3: "clause 9.12" → "clause 9.11" — 9.11 is the mistaken-payment
 *     clause in the published Client Agreement; 9.12 is set-off.
 *
 * Updated 30 October 2026 from the client's revised PDF: 7.1 reworded and
 * its second sentence added. Also on 30 October 2026, by client instruction,
 * restricted-jurisdiction wording in 2.2 and 9.1 covers citizens as well as
 * residents, matching Client Agreement 2.2 and the footer.
 */
export const withdrawalPolicy: LegalDocument = {
  title: "Withdrawal Policy",
  summary:
    "How you withdraw funds from your trading account, and the conditions that apply.",
  meta: "Version 20102026_V1.0 · Dated 20 October 2026",
  pdf: "/documents/elite-fx-capital-withdrawal-policy.pdf",
  sections: [
    {
      id: "company-details",
      title: "Company details",
      blocks: [
        "This Withdrawal Policy applies to every Trading Account opened with Elite fx Capital Ltd. through elitecapital.global.",
        {
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Company", "Elite fx Capital Ltd. (trading as Elite FX Capital)"],
              ["Incorporation", "International Business Company under the laws of Saint Lucia"],
              ["Website", "elitecapital.global"],
              ["Questions about withdrawals", "support@elitecapital.global"],
              ["Version", "20102026_V1.0"],
            ],
          },
        },
      ],
    },
    {
      id: "introduction",
      title: "1. Introduction and scope",
      blocks: [
        "1.1 This Withdrawal Policy (the “Policy”) is issued by Elite fx Capital Ltd. (the “Company”). It sets out how a Client withdraws funds from a Trading Account, and the conditions that apply.",
        "1.2 The Policy forms part of the Client Agreement, in particular clause 9 (fees, deposits, withdrawals and client money) and clause 13 (termination). Terms defined in the Client Agreement have the same meaning here.",
        "1.3 The Company may set minimum and maximum amounts and other withdrawal limits, under the Client Agreement and its internal policies, and subject to applicable law. The limits are published on the Website and apply to every Client.",
        "1.4 The Company processes withdrawal requests promptly and carefully. Every request is subject to this Policy, to the verification steps in section 8 and to applicable law.",
      ],
    },
    {
      id: "who-may-withdraw",
      title: "2. Who may withdraw",
      blocks: [
        "2.1 Only the Client, as the holder of the Trading Account, may request a withdrawal. Withdrawals to a third party, or to any account that is not in the Client’s own name, are not permitted.",
        "2.2 A withdrawal can be requested only from an account that:",
        {
          list: [
            "has completed verification under the Anti-Money Laundering Policy;",
            "is not suspended, restricted or under investigation;",
            "is not held by a Client who is a resident or citizen of a Restricted Jurisdiction, and is not to be paid to one; and",
            "has no outstanding request for documents from the Company.",
          ],
        },
        "2.3 A corporate Client must withdraw to a bank account in the company’s own name. The authorised signatory must be confirmed under section 8.",
      ],
    },
    {
      id: "how-to-request",
      title: "3. How to request a withdrawal",
      blocks: [
        "3.1 The Client requests a withdrawal through the Client Area, by selecting an available method and entering the amount.",
        "3.2 The Company confirms receipt of each request and shows its status in the Client Area.",
        "3.3 A request is final once submitted. The Company may cancel a request before processing starts at the Client’s written request.",
        "3.4 A Client who has not received confirmation should contact Customer Support (section 15) before submitting another request for the same amount.",
      ],
    },
    {
      id: "amounts",
      title: "4. Amounts and balance",
      blocks: [
        "4.1 A withdrawal cannot exceed the Balance of the Trading Account.",
        "4.2 A withdrawal must not reduce the Account below the Margin needed for Open Positions. The Company may refuse or reduce a withdrawal that would cause a Margin Call or a Stop-Out.",
        "4.3 Minimum and maximum amounts apply by method and by period, as published on the Website.",
        "4.4 Funds in a pending withdrawal are reserved from the Balance and do not count as free margin until the request is completed or cancelled.",
      ],
    },
    {
      id: "return-to-source",
      title: "5. Return to the source of the deposit",
      blocks: [
        "5.1 To protect all parties against fraud, the Company returns withdrawals to the original source of the deposit, where practicable. This is the principle in clause 9.7 of the Client Agreement.",
        "5.2 The order below applies.",
        {
          table: {
            head: ["Order", "Method", "Rule", "Verification"],
            rows: [
              ["1", "Credit or debit card", "Refund to the same card, for at least the total amount deposited by card.", "Card ownership"],
              ["2/3", "E-wallet", "Refund to the same e-wallet, once card refunds are complete.", "Wallet ownership"],
              ["2/3", "Bank transfer", "Transfer to a bank account in the Client’s name, once the methods above are used.", "Bank account ownership"],
              ["4", "Other methods", "As listed on the Website.", "As required"],
            ],
          },
        },
        "5.3 Where the original source is closed, no longer available or cannot be verified, the Company may ask for alternative details in the Client’s own name. Section 8 applies to those details.",
        "5.4 Where the Balance includes profits, the order in clause 5.2 applies to the whole Balance.",
      ],
    },
    {
      id: "processing",
      title: "6. Processing",
      blocks: [
        "6.1 A withdrawal passes through the steps below. The times shown are targets and will be confirmed once operations are tested.",
        {
          table: {
            head: ["Step", "What happens", "Target time"],
            rows: [
              ["1. Request received", "Request confirmed in the Client Area", "Instant"],
              ["2. Checks", "Balance, margin, verification and screening under the AML Policy", "Within one (1) business day"],
              ["3. Approval", "Withdrawal approved for payment", "Within one (1) business day"],
              ["4. Payment", "Sent to the payment provider or bank", "Within one (1) business day"],
            ],
          },
        },
        "6.2 Processing times for each method are published on the Website. The Company does not control the time taken by payment providers, banks, or card networks, and those times may change.",
        "6.3 If a withdrawal is not completed within the published time for its method, the Client may contact Customer Support. The Company will review the case and give the Client an update within one (1) business day.",
        "6.4 Requests received outside working hours are processed on the next working day.",
      ],
    },
    {
      id: "fees",
      title: "7. Fees and charges",
      blocks: [
        "7.1 The Company does not charge withdrawal fees, as stated on the Website. However, fees may vary depending on the withdrawal method used.",
        "7.2 Banks, card issuers, e-wallet providers and intermediaries may charge their own fees. The Client bears those fees, which are deducted from the amount withdrawn or charged to the Client.",
        "7.3 Where a third party imposes a charge for a particular method, or a withdrawal needs extra processing, the Company may pass that charge on. Any such charge is published on the Website before it applies.",
        "7.4 Where a withdrawal is returned because the Client’s details are wrong, the Client bears the cost of the return.",
        "7.5 Where a withdrawal is paid in a currency other than the Account’s base currency, the Company converts it at its rate, and the Client bears the conversion cost.",
      ],
    },
    {
      id: "verification",
      title: "8. Verification and documents",
      blocks: [
        "8.1 The Company may ask for documents before it approves a withdrawal. These can include identity documents, proof of card or wallet ownership, proof of bank account ownership, and evidence of the source of funds.",
        "8.2 The Client must provide the documents within one (1) business day of the request. If they are not provided in time, the Company may refuse the request.",
        "8.3 The Company reviews documents within one (1) business day for standard cases, and within three (3) business days for complex cases.",
        "8.4 Further documents may be required under the Anti-Money Laundering Policy, the Company’s internal policies or applicable law at the time of the withdrawal.",
      ],
    },
    {
      id: "holds",
      title: "9. Holds and refusals",
      blocks: [
        "9.1 The Company may hold, delay or refuse a withdrawal where:",
        {
          list: [
            "verification is incomplete, or documents are not provided in time;",
            "the Company suspects fraud, money laundering, terrorist financing, sanctions breach or market abuse;",
            "the withdrawal would go to a third party, or to an account not in the Client’s name;",
            "the Client is a resident or citizen of a Restricted Jurisdiction, or the destination is in one;",
            "the Account is under investigation, or a regulator, court or law requires a hold;",
            "the Margin for Open Positions would fall below the required level;",
            "a chargeback or payment dispute is open on a deposit;",
            "a deposit has not been verified as coming from the Client, under clause 9.6 of the Client Agreement; or",
            "the Client has breached the Client Agreement.",
          ],
        },
        "9.2 Where the Company holds or refuses a withdrawal, it tells the Client the reason, unless the law prohibits this. Where a report is made under the Anti-Money Laundering Policy, the Company does not tell the Client about it.",
        "9.3 A refused withdrawal is returned to the Balance. Funds are not lost by a refusal.",
      ],
    },
    {
      id: "third-party",
      title: "10. Third-party payments and mistaken funds",
      blocks: [
        "10.1 The Company does not accept deposits from third parties. A deposit received from a third party is returned to the sender where possible, at the Client’s cost, and the Account may be restricted while the Company investigates.",
        "10.2 A withdrawal to a third party is refused.",
        "10.3 Where the Company pays money to the Client by mistake, the Client must return it promptly. The Company may reverse the payment or deduct the amount from the Balance, under clause 9.11 of the Client Agreement.",
      ],
    },
    {
      id: "chargebacks",
      title: "11. Chargebacks and disputes",
      blocks: [
        "11.1 The Client must not dispute a legitimate deposit or withdrawal with a card issuer or payment provider. Where a chargeback is raised, the Company may suspend the Account and withdrawals until the disputes are resolved.",
        "11.2 Where a chargeback is raised without a valid reason, the Client bears the Company’s costs of dealing with it.",
      ],
    },
    {
      id: "closure",
      title: "12. Account closure and final withdrawals",
      blocks: [
        "12.1 When an Account is closed under the Client Agreement, the Company closes Open Positions, deducts amounts owed, and returns the remaining Balance to the Client within five (5) business days, as stated in clause 13.5 of the Client Agreement.",
        "12.2 The final withdrawal follows section 5.",
        "12.3 Where an Account is closed for abuse or fraud, the Company may cancel profits from that activity once its investigation is complete, as provided in the Client Agreement.",
      ],
    },
    {
      id: "tax",
      title: "13. Tax",
      blocks: [
        "13.1 The Client is responsible for all tax returns, reports and payments that arise from withdrawals, in their country of residence. The Company does not give tax advice.",
      ],
    },
    {
      id: "records",
      title: "14. Records",
      blocks: [
        "14.1 The Company keeps a record of each withdrawal request, the verification carried out, the method used, the payment reference, and any decision to hold or refuse the request, for the period set out in the Anti-Money Laundering Policy.",
      ],
    },
    {
      id: "complaints",
      title: "15. Complaints",
      blocks: [
        "15.1 A Client with a question about a withdrawal should contact Customer Support at support@elitecapital.global, quoting the Account number and the request reference.",
        "15.2 Complaints are handled under the Complaints Procedure.",
      ],
    },
    {
      id: "changes",
      title: "16. Changes to this Policy and governing law",
      blocks: [
        "16.1 The Company may change this Policy. Changes are published on the Website, and the Client is told of material changes. The Client should check the Policy regularly.",
        "16.2 This Policy is governed by the law that governs the Client Agreement.",
      ],
    },
  ],
};
