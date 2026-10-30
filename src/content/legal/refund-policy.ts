import type { LegalDocument } from "./types";

/**
 * Web version of "Elite FX Capital – Refund Policy" (20102026_V0.1).
 *
 * Wording is the PDF's, clause for clause. Only these mechanical changes were
 * made; the downloadable PDF is built from this file (`npm run legal:pdf`):
 *   - Details table: registration number, registered office and principal
 *     place of business removed; version row set to the cover's version.
 *   - Cross-references corrected to the published Client Agreement:
 *       3.1  "under section 12" → "under section 11" (restricted
 *            jurisdictions is section 11 of this Policy);
 *       8.2  "clause 9.11 and clause 13.11" → "clause 9.10" (currency
 *            conversion; 13.11 does not exist);
 *       9.1  "clause 9.14" → "clause 9.13" (card disputes);
 *       10.1 "clause 8.4" → "clauses 4.7 and 13.6" (8.4 is about partners;
 *            abusive trading is in 4.7 and 13.6).
 *   - 14.1: info@ and phone → support@, the address refund requests already
 *     use in 5.1.
 *   - 5.5, 7.6: "one (1) business days" → "one (1) business day".
 *   - Meta reads "Drafted 20 October 2026", per the client on 30 October 2026.
 */
export const refundPolicy: LegalDocument = {
  title: "Refund Policy",
  summary:
    "When a deposit may be returned to you, how to ask for a refund, and how an approved refund is paid.",
  meta: "Version 20102026_V0.1 · Drafted 20 October 2026",
  pdf: "/documents/elite-fx-capital-refund-policy.pdf",
  sections: [
    {
      id: "company-details",
      title: "Company details",
      blocks: [
        "This Refund Policy applies to deposits received by Elite fx Capital Ltd. (trading as Elite FX Capital) through elitecapital.global.",
        {
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Company", "Elite fx Capital Ltd. (trading as Elite FX Capital)"],
              ["Incorporation", "International Business Company under the laws of Saint Lucia"],
              ["Website", "elitecapital.global"],
              ["Refund requests", "support@elitecapital.global"],
              ["Version", "20102026_V0.1"],
            ],
          },
        },
      ],
    },
    {
      id: "purpose",
      title: "1. Purpose and scope",
      blocks: [
        "1.1 This Refund Policy (the “Policy”) is issued by Elite fx Capital Ltd. (the “Company”). It explains when the Company may return a deposit to a Client, how to ask for a refund, and how any approved refund is paid.",
        "1.2 A refund is the return of money that the Company has received from a Client, where the money should not have been credited or should not remain with the Company. A refund is different from a withdrawal of the Client’s Balance, which is governed by the Withdrawal Policy.",
        "1.3 This Policy applies to deposits made by any payment method the Company accepts.",
        "1.4 This Policy forms part of the Client Agreement, in particular clause 9 (deposits and client money) and clause 13 (termination). Terms defined in the Client Agreement have the same meaning here.",
      ],
    },
    {
      id: "exceptional",
      title: "2. Refunds are exceptional",
      blocks: [
        "2.1 A refund is available only in the circumstances described in section 3, and only where the Company is satisfied, on the evidence provided, that the request is justified.",
        "2.2 The Company may refuse any refund request at its reasonable discretion, subject to applicable law. Where the law requires a reason, the Company will give one.",
        "2.3 Making a deposit does not in itself entitle a Client to a refund. By depositing, the Client confirms that they have read the Client Agreement and accept the risks of trading.",
      ],
    },
    {
      id: "may-be-considered",
      title: "3. Cases in which a refund may be considered",
      blocks: [
        "3.1 A refund may be considered where:",
        {
          list: [
            "the same deposit was made twice in error, and the duplicate can be clearly identified;",
            "a deposit was made in error, the amount is still held as Balance, and none of it has been used for trading;",
            "a deposit was made from a payment method that is not in the Client’s own name, and the Company returns it under clause 9.5 of the Client Agreement;",
            "the Company gave the Client incorrect payment details, and a deposit was made to the wrong account as a result;",
            "a deposit was received from a restricted jurisdiction, and the Company is required to return it under section 11;",
            "the law, a regulator or a court requires the return of the funds; or",
            "the Compliance function approves a refund in other exceptional circumstances, recorded in writing.",
          ],
        },
        "3.2 Where a deposit should have been credited but was not, because of an error on the Company’s side, the Company will credit the deposit to the Client’s account first. A refund is made only if the credit is not possible.",
      ],
    },
    {
      id: "will-not-be-made",
      title: "4. Cases in which a refund will not be made",
      blocks: [
        "4.1 A refund will not be made:",
        {
          list: [
            "for trading losses, market movements, or any fall in the value of an open position;",
            "for funds that have been used for trading or as Margin, and then lost or closed out;",
            "for a deposit made by a third party, or made to pay another person;",
            "for a request made after the time limit in clause 5.3, unless clause 5.4 applies;",
            "while verification is incomplete, or the source of the funds has not been established under clause 9.6 of the Client Agreement;",
            "where the refund would be paid to a different person or to an account that is not in the original payer’s name;",
            "for bank, card or intermediary fees that the Client has agreed to bear, except as set out in clause 8.1; or",
            "for a deposit covered by a card dispute raised under section 9.",
          ],
        },
      ],
    },
    {
      id: "how-to-request",
      title: "5. How to request a refund",
      blocks: [
        "5.1 A request must be made in writing, from the email address registered to the trading account, to support@elitecapital.global.",
        "5.2 Each request must include:",
        {
          list: [
            "the Client’s full name and trading account number;",
            "the transaction reference, the date and the amount of the deposit, and the payment method used;",
            "a clear explanation of why the refund is requested; and",
            "the evidence that supports the request, such as a card or bank statement showing the transaction, or a copy of the duplicate payment.",
          ],
        },
        "5.3 A request must be made within three (3) calendar days of the original deposit.",
        "5.4 The time limit in clause 5.3 may be extended where the delay is caused by an error on the Company’s side, or by the Client’s bank or payment provider. The Company decides whether the extension applies.",
        "5.5 The Company may ask for further information. The Client must provide it within one (1) business day, or the request may be refused.",
        "5.6 Introducing brokers and affiliates may not accept or process refund requests. They must refer every request to the Company.",
      ],
    },
    {
      id: "assessment",
      title: "6. Assessment and decision",
      blocks: [
        "6.1 The Company reviews the request, the deposit records and, where needed, the source of the funds under clause 9.6 of the Client Agreement.",
        "6.2 The Company aims to decide within two (2) business days of receiving complete information.",
        "6.3 The decision is given to the Client in writing, with the reason where the law allows.",
        "6.4 A refused request does not prevent the Client from requesting a withdrawal of the Balance under the Withdrawal Policy.",
        "6.5 A Client may complain about a decision under section 14.",
      ],
    },
    {
      id: "payment",
      title: "7. How approved refunds are paid",
      blocks: [
        "7.1 An approved refund is returned to the original source of the deposit, where practicable. This follows clause 9.7 of the Client Agreement and section 5 of the Withdrawal Policy.",
        "7.2 A refund to a card is made only to the same card used for the original deposit. A refund to a bank account is made only to an account in the Client’s name, verified under the Withdrawal Policy.",
        "7.3 Where the original source cannot be used, the Company may ask for alternative details in the Client’s own name. Those details must be verified before any payment.",
        "7.4 Where only part of a deposit is eligible, the Company refunds that part.",
        "7.5 Refunds are not paid to a third party, to a payment source in a restricted jurisdiction, or to an account not in the Client’s name.",
        "7.6 Approved refunds are processed within one (1) business day of approval. The time taken by the Client’s bank or payment provider is outside the Company’s control.",
      ],
    },
    {
      id: "fees",
      title: "8. Fees and exchange rate differences",
      blocks: [
        "8.1 Any fee charged by a bank, card issuer, payment provider or intermediary is deducted from a refund. Where the refund arises from an error on the Company’s side, the Company will absorb those fees.",
        "8.2 Where a deposit was made in a currency other than the Account’s base currency, the refund is made at the Company’s rate on the date of the refund. Any difference between the deposit rate and the refund rate is borne by the Client, consistent with clause 9.10 of the Client Agreement.",
      ],
    },
    {
      id: "chargebacks",
      title: "9. Card disputes and chargebacks",
      blocks: [
        "9.1 A Client must not raise a chargeback or dispute with a card issuer for a deposit while a refund request for that deposit is under review. Doing so is a breach of clause 9.13 of the Client Agreement.",
        "9.2 Where a chargeback has been raised, the Company may suspend the account and any withdrawal until the dispute is resolved, and may recover its costs, as set out in section 11 of the Withdrawal Policy.",
        "9.3 A refund approved under this Policy does not stop a chargeback that has already been raised. The Company will tell the Client if a chargeback affects a refund.",
      ],
    },
    {
      id: "misuse",
      title: "10. Misuse of this Policy",
      blocks: [
        "10.1 The Company may refuse a request, and may restrict the account, where it believes a request is made to obtain funds improperly. This includes:",
        {
          list: [
            "a request made after trading, where the deposit has been used and the Client now wants it back;",
            "repeated requests for the same or similar deposits;",
            "a deposit followed by a refund request with little or no trading, which may indicate money passing through the account;",
            "a request to return funds to a different source from the original deposit; and",
            "a request linked to abusive trading practices described in clauses 4.7 and 13.6 of the Client Agreement.",
          ],
        },
        "10.2 The Company may recover any amount paid in error, or paid in breach of this Policy.",
      ],
    },
    {
      id: "restricted-jurisdictions",
      title: "11. Deposits from restricted jurisdictions",
      blocks: [
        "11.1 The Company does not accept deposits from residents of, or citizens of, a restricted jurisdiction. Such deposits are returned under the procedure the Company has approved for that purpose.",
        "11.2 No refund is paid to a payment source in a restricted jurisdiction, except where counsel has confirmed in writing that the payment may lawfully be made.",
      ],
    },
    {
      id: "aml",
      title: "12. Anti-money laundering and records",
      blocks: [
        "12.1 Refunds are subject to the Anti-Money Laundering Policy. The Company may refuse or delay a refund where it cannot verify the source of the funds, or where it suspects money laundering, terrorist financing or a breach of sanctions.",
        "12.2 The Company does not tell the Client about any report made under the Anti-Money Laundering Policy.",
        "12.3 The Company keeps a record of each refund request, the evidence reviewed, the decision and the payment reference, for the period set out in the Anti-Money Laundering Policy.",
      ],
    },
    {
      id: "closure",
      title: "13. Account closure",
      blocks: [
        "13.1 Where an account is closed, any deposit still held as Balance is returned under clause 13.5 of the Client Agreement and section 12 of the Withdrawal Policy. This Policy applies to deposits that the Client believes should be refunded in full or in part.",
      ],
    },
    {
      id: "complaints",
      title: "14. Complaints",
      blocks: [
        "14.1 A Client who disagrees with a refund decision may contact Customer Support at support@elitecapital.global, quoting the account number and the request reference.",
        "14.2 Complaints are handled under the Complaints Procedure.",
      ],
    },
    {
      id: "changes",
      title: "15. Changes and governing law",
      blocks: [
        "15.1 The Company may change this Policy. Changes are published on the Website and apply to requests made after publication.",
        "15.2 This Policy is governed by the law that governs the Client Agreement.",
      ],
    },
  ],
};
