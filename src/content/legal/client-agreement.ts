import type { LegalDocument } from "./types";

/**
 * Web version of "Elite FX Capital – Client Agreement" (20102026_V1.0).
 *
 * Wording is the PDF's, clause for clause. Only these mechanical changes were
 * made, as approved by the client on 23 October 2026 — the PDF needs the same
 * edits so the two match:
 *   - Details table: licence/regulator placeholder, registration number,
 *     incorporation date, registered office and phone removed; support
 *     contact changed to support@.
 *   - 1.7: stray quotation mark removed from "Open Position".
 *   - 4.7, 6.4, 12.1: accidentally repeated text removed.
 *   - 8.3: list re-lettered (d) → (e) for the final item, which skipped (e).
 *   - 11.2: "including the Financial Intelligence Authority" → "where the
 *     law requires it".
 *   - 13.6: garbled opening punctuation fixed ("Protection, CFDs" →
 *     "Protection. CFDs").
 *   - 14.2: complaints route and times aligned with the Compliance page
 *     (compliance@, 1 business day, 15 business days).
 *   - Approval/sign-off table (names, MLRO, counsel) removed — internal.
 * The Risk Disclosure and Fee Schedule named in 1.2 are not yet published,
 * so they are mentioned but not linked.
 */
export const clientAgreement: LegalDocument = {
  title: "Client Agreement",
  summary:
    "The terms that apply between you and Elite fx Capital Ltd. when you open and use a trading account.",
  meta: "Version 20102026_V1.0 · Effective 20 October 2026 · Next review 31 December 2026",
  sections: [
    {
      id: "parties",
      title: "Parties and company details",
      blocks: [
        "This agreement is between Elite fx Capital Ltd. and each client who opens a trading account.",
        {
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Company", "Elite fx Capital Ltd. (trading as Elite fx Capital)"],
              ["Incorporation", "International Business Company registered in Saint Lucia"],
              ["Website", "elitecapital.global"],
              ["Customer support", "support@elitecapital.global, 24/7"],
            ],
          },
        },
      ],
    },
    {
      id: "scope",
      title: "1. Parties, scope and definitions",
      blocks: [
        "1.1 This Client Agreement (the “Agreement”) is made between Elite fx Capital Ltd. (the “Company”) and the individual or entity that opens and activates a trading account (the “Client”).",
        "1.2 The Agreement consists of this document and the following documents, which are published on the Website and form part of the Agreement: the Risk Disclosure, the Privacy Policy, the Cookie Policy, the Anti-Money Laundering Policy, the Complaints Procedure and the Fee Schedule.",
        "1.3 The Client accepts this Agreement by completing the application and activating the Trading Account. The Client should read all the Agreement before trading and should ask for clarification or independent advice where needed.",
        "1.4 The English version prevails. Translations are provided for convenience only.",
        "1.5 This Agreement replaces earlier arrangements on the same subject. No statement by an employee or Partner changes it unless the Company confirms the change in writing.",
        "1.6 The Company may provide this Agreement and all notices electronically, including through the Website and the Client Area.",
        "1.7 In this Agreement:",
        {
          list: [
            "Account or Trading Account means the account the Company opens for the Client to trade Instruments.",
            "Balance means the funds in the Account, excluding the result of Open Positions.",
            "Equity means the Balance plus or minus the result of Open Positions.",
            "Margin means the funds the Client must hold to keep Open Positions open. Margin Level is Equity divided by Margin, expressed as a percentage.",
            "Margin Call means a notice, if the Company gives one, that the Margin Level is below the required level.",
            "Stop-Out means the automatic closure of Open Positions under clause 5.5.",
            "CFD means a contract for difference, under which the parties exchange the difference between the opening and closing price of an Underlying Asset, without ownership of that asset.",
            "Instrument means a CFD the Company makes available.",
            "Order means an instruction, placed through the Platform, to open, change or close a position.",
            "Open Position means a position that has not been closed.",
            "Platform means the MetaTrader 5 trading platform and any other trading tool the Company provides, including the web portal and mobile apps.",
            "Partner means a third party that introduces clients to the Company.",
            "Client Area means the secure area of the Website where the Client manages their Account.",
            "Restricted Jurisdiction means a country or territory listed on the Website as one in which the Company does not provide services.",
            "Client Money means the Client’s funds held by the Company, as described in clause 9.9.",
            "Website means elitecapital.global.",
          ],
        },
      ],
    },
    {
      id: "eligibility",
      title: "2. Eligibility and account opening",
      blocks: [
        "2.1 The Client must be at least 18 years old, or the age of majority where they live if that is higher and must have full legal capacity. A Client trades for their own account unless the Company agrees otherwise in writing. A corporate Client must provide the corporate documents listed in the Anti-Money Laundering Policy and must be authorised to bind the entity.",
        "2.2 The Client must not reside in, or be a citizen of, a Restricted Jurisdiction. The Company may refuse or stop services if a client’s residence or citizenship changes.",
        "2.3 This Agreement is not a public offer. The Company may accept or refuse any application and may end the relationship under clause 13. Where the law requires a reason, the Company will give one.",
        "2.4 To open an Account, the Client must complete the application, provide the identity and address documents listed in the Anti-Money Laundering Policy, and pass verification. This Agreement takes effect when the Account is activated. Until then, no trading is permitted.",
        "2.5 The Company may request further information or documents at any time, including evidence of source of funds, and may restrict or suspend the Account until it receives them. If the Client does not provide them within the time requested, the Company may terminate this Agreement.",
        "2.6 The Client must give accurate information and must tell the Company promptly, in writing, of any change to it. The Company may rely on the information provided unless it has reason to believe the information is wrong.",
        "2.7 The Client consents to check against sanctions, politically exposed person (PEP) and other screening lists, and to the use of third-party verification providers, as described in the Privacy Policy.",
        "2.8 The Company offers Standard, ECN and Pro Accounts. Minimum deposits, pricing, leverage and features are set out on the Website and may change under clause 9.2. The Client chooses an account type when applying and may request a change where the Company allows it.",
        "2.9 Each Client may hold one Account unless the Company approves otherwise in writing. Multiple accounts held by one person, or accounts sharing identifiers such as IP address, device or payment method, may be closed and their results cancelled.",
      ],
    },
    {
      id: "services",
      title: "3. Services and execution-only basis",
      blocks: [
        "3.1 The Company gives the Client online access to trade CFDs on forex, metals, indices, shares, commodities and cryptocurrencies (crypto CFDs), as available on the Platform. The Company executes Orders on an execution-only basis.",
        "3.2 The Company does not give investment, legal, tax or financial advice. It does not recommend any trade, does not manage the Client’s Account on a discretionary basis, and does not provide custody services for the Client’s assets, other than holding Client Money under clause 9.9.",
        "3.3 Market commentary, research or analysis published by the Company is general information for education and marketing. It is not advice and must not be the sole basis for a trading decision.",
        "3.4 A CFD does not give the Client ownership of the underlying asset, and the Client does not receive physical delivery of it. CFDs are traded over the counter, not on a regulated exchange.",
        "3.5 The Instruments, trading hours, margin requirements, expiry arrangements and contract specifications are published on the Website and the Platform. Where they differ, the Company’s trading server records prevail.",
        "3.6 The Company may add, remove, suspend or change Instruments and their specifications. Where it closes an Instrument with Open Positions, it will give notice where practicable and will close those positions at a fair price.",
        "3.7 The Company may refuse or limit access to the Services where the law requires it, where the Client breaches this Agreement, or where the Company considers it necessary to protect itself or its clients.",
      ],
    },
    {
      id: "orders",
      title: "4. Orders and execution",
      blocks: [
        "4.1 Orders must be placed through the Platform or through another channel the Company has approved in writing. The Company may reject Orders received by other means.",
        "4.2 An Order becomes binding when the Company accepts it. An accepted Order cannot be cancelled unless the Platform allows cancellation, or the Company agrees.",
        "4.3 A market Order is executed at the best available price at the time. Prices can move quickly, so the executed price may differ from the price shown when the Order was placed. This is known as slippage. It is more likely in fast markets, around news, at market open or close, and for Pending Orders. Slippage can work for or against the Client.",
        "4.4 A stop-loss or other Pending Order is triggered when the market reaches the set price. It is not guaranteed to be executed at that price.",
        "4.5 The Company’s execution arrangements are set out in its execution policy on the Website.",
        "4.6 Prices are taken from the Company’s trading server. Where a price is clearly erroneous, the Company may correct it or cancel the affected trades, and it will tell the Client.",
        "4.7 The Company may refuse to execute an Order, cancel it, or close Open Positions where:",
        {
          list: [
            "the Client does not have enough Margin;",
            "the Company suspects market abuse, manipulation, insider dealing, fraud or money laundering;",
            "the Client is using price latency, pricing errors or arbitrage that exploits the Company’s systems;",
            "the Order breaches this Agreement, or the Client is in a Restricted Jurisdiction;",
            "the Company’s exposure limits for an Instrument have been reached; or",
            "the law or a regulator requires it.",
          ],
        },
        "4.8 Where an Instrument has an expiry date, the Company may close Open Positions in it at the price set at expiry. The Client is responsible for tracking expiry dates.",
        "4.9 The Company is not obliged to execute Orders outside the trading hours published on the Website.",
        "4.10 A Client who wishes to close part of a position must place an Order to do so.",
      ],
    },
    {
      id: "margin",
      title: "5. Margin, leverage and close-out",
      blocks: [
        "5.1 The Client must keep enough funds in the Account to meet the Margin required for each Open Position. Margin requirements for each Instrument are published on the Website. They may change, including in volatile markets or before major news events.",
        "5.2 Leverage depends on the Account type and the Instrument. The Standard Account offers a leverage of up to 1:300. The Company may reduce leverage or increase Margin requirements for risk or regulatory reasons, with notice where practicable.",
        "5.3 The Margin Level is shown on the Platform. When it falls to the level in clause 5.5, the Company may close Open Positions.",
        "5.4 The Company may, but is not required to, send a Margin Call. The Client must monitor the Account. Not receiving a Margin Call does not change the Client’s responsibilities.",
        "5.5 When the Margin Level falls to stop-out level, the Company may close Open Positions automatically at available market prices, starting with the largest loss. A Stop-Out can happen faster than the Client expects, especially in fast markets or over a weekend.",
        "5.6 The Company may close all or part of the Open Positions, without notice, where the Account is exposed beyond the Company’s limits, or where the Client is in breach of this Agreement.",
        "5.7 Negative balance protection applies to every Account. The Client’s losses cannot exceed the Balance of that Account, so the Client does not owe the Company any amount beyond the Balance. The Client must not trade in ways designed to exploit this protection. If it is abused, the Company may act under clauses 4.7 and 13.2.",
        "5.8 Where Margin is insufficient, the Client must deposit additional funds immediately. Until they do, the Company may refuse new Orders.",
        "5.9 The Client remains responsible for all losses on Open Positions, including losses caused by a Stop-Out or by any closure under this clause 5.",
      ],
    },
    {
      id: "platform",
      title: "6. Platform, access and security",
      blocks: [
        "6.1 The Company grants the Client a limited, non-exclusive, non-transferable licence to use the Platform to place Orders and view Account information. The Client must not copy, modify, reverse engineer or resell the Platform or the Website.",
        "6.2 The Client may use automated trading tools, including expert advisers and trading bots, at their own risk. The Company is not responsible for losses caused by those tools. It may restrict any tool that places an unreasonable load on its systems or breaches of clause 6.4.",
        "6.3 The Client must keep their Access Details confidential, change them when asked, and notify the Company immediately if they suspect unauthorised access. Orders placed with the Access Details are treated as the Client’s, and the Client is responsible for them unless the Company is at fault.",
        "6.4 The Client must not:",
        {
          list: [
            "access or try to access the Company’s systems or another client’s account;",
            "interfere with the Platform or the Website, including by introducing malicious software;",
            "allow another person to trade the Account, unless the Company approves this in writing; or",
            "use software to scrape or automate access to Company information, other than the Platform features the Company provides.",
          ],
        },
        "6.5 The Client is responsible for their own equipment, internet access and security measures. The Company is not liable for losses caused by equipment failure, internet or power outages, or the Client’s own device.",
        "6.6 The Company will try to keep the Platform available. It may suspend access for maintenance, upgrades or security reasons, and will give notice where practicable. It is not liable for losses caused by unavailability outside its reasonable control.",
        "6.7 To the extent the law allows, the Platform is provided as it is. The Company does not guarantee uninterrupted service.",
      ],
    },
    {
      id: "risk",
      title: "7. Risk disclosure and client acknowledgements",
      blocks: [
        "7.1 CFDs are complex, leveraged products with a high risk of loss. Leverage can produce large gains and large losses. A small price movement can cause a large change in the value of the Account.",
        "7.2 The Website states that most retail investor accounts lose money trading these products. The Client should consider this before trading.",
        "7.3 The Client can lose all the funds deposited. Negative balance protection under clause 5.7 limits losses to the Balance, but it does not protect the Client from ordinary trading losses.",
        "7.4 Specific risks include:",
        {
          list: [
            "Gap risk: prices can jump between trading sessions and move past stop levels.",
            "Liquidity risk: some Instruments may become hard to trade, or prices may move sharply at certain times.",
            "Crypto CFD risk: crypto prices can be highly volatile and trade at any time. The Company may change or suspend crypto Instruments.",
            "Swap risk: positions held overnight may incur swap charges or credits.",
            "Expiry risk: positions may be closed automatically at expiry.",
            "Technology risk: failures of the Platform, the internet or power may prevent trading or closing positions.",
            "Copy trading risk: see clause 8.3.",
          ],
        },
        "7.5 The Client confirms that they have read the Risk Disclosure, understand the risks, have considered their financial situation and experience, and can bear losses, including the loss of all deposited funds.",
        "7.6 Past performance, back tests, forecasts and market analysis do not guarantee future results.",
        "7.7 Trading decisions are the Client’s own. The Company does not assess whether any trade is suitable for the Client.",
      ],
    },
    {
      id: "conflicts",
      title: "8. Conflicts of interest, copy trading and partners",
      blocks: [
        "8.1 The Company acts as counterparty to Client trades, passes Orders to liquidity providers or other brokers, or does both.",
        "8.2 The Company’s interests may conflict with the Client’s. For example, the Company earns spreads, commissions, and swaps, and it has relationships with Partners and liquidity providers. The Company takes reasonable steps to identify and manage conflicts. Where a conflict cannot be fully avoided, the Company will act fairly and disclose it where the law requires.",
        "8.3 Copy trading lets the Client automatically copy the Orders of another trader (a “Strategy Provider”) in proportion to settings the Client chooses.",
        {
          list: [
            "(a) The Company does not guarantee the results of any Strategy Provider. Past performance is not a reliable guide.",
            "(b) Copied Orders are executed automatically, so the Client may suffer losses before they can stop copying.",
            "(c) Where a Strategy Provider receives a fee, the Client will be told the amount and its basis before copying.",
            "(d) The Client can stop copying at any time. Positions already copied remain at Open Positions until they are closed.",
            "(e) Copy trading does not make the Company an adviser. Nothing in copy trading is advice from the Company.",
          ],
        },
        "8.4 Partners who introduce clients are not agents of the Company. They cannot bind the Company, make commitments on its behalf, or receive Client Money. The Company may pay commissions to Partners and may share with a Partner the information needed to calculate them. It will not share a client’s contact details with a Partner without the Client’s consent.",
        "8.5 The Company may end its arrangement with any Partner at any time. The Client should not rely on a Partner’s statements about the Services.",
      ],
    },
    {
      id: "fees",
      title: "9. Fees, deposits, withdrawals and client money",
      blocks: [
        "9.1 The Client must pay the spreads, commissions, swaps and other charges that apply to their Account, as set out in the Fee Schedule on the Website. Spreads form part of the price the Client trades at. The Company does not charge a platform fee.",
        "9.2 Changes to fees take effect when they are published on the Website, or on a later date stated in the notice. The Client should check the Website regularly.",
        "9.3 Deposits and withdrawals are free of charge, as stated on the Website. Where a bank or payment provider charges a fee, the Client bears that fee.",
        "9.4 Inactive and Dormant Trading Accounts.",
        {
          list: [
            "The Client acknowledges and confirms that any Account(s) opened with the Company where there is no deposits, withdrawals or trading activity for a period of 3 (three) months, shall be classified by the Company as a Dormant Account.",
            "The Company reserves the right to charge a monthly Dormant Fee of $10 or equivalent in other currency on Dormant Accounts.",
            "Following 3 (three) months from the date where an Account is classified as Dormant and taking into consideration that the Account does not maintain any funds, the Company reserves the right to classify the Account as an Inactive Account.",
            "The Company reserves the right to close Inactive Accounts at its sole discretion.",
            "Fees may be payable by the Client by virtue of the fact that the Trading Platform is continually provided for trading, regardless of the actual use. The Client agrees that he/she is liable to and will pay the applicable fee as notified from time to time and that the Company may deduct such fee from any funds held by the Company.",
            "Where the Client has more than 1 Trading Account and at least one of his/her trading accounts is active, no Inactivity Fee applied even where one or more of the Client’s Trading Accounts was deemed inactive. The Company reserves the right to transfer any funds remaining in the Inactive Trading Account, at the applicable foreign exchange rate, to the Active Trading Account and proceed with the closure of the Trading Account.",
          ],
        },
        "9.5 Deposits must come from an account or payment method in the Client’s own name. Third-party deposits are not accepted. The Company will return a third-party deposit to its sender where possible, at the Client’s cost, and may restrict the Account while it investigates.",
        "9.6 The Company may request evidence of the source of any deposit. It may delay crediting a deposit, or refuse it and return it, if the source cannot be verified.",
        "9.7 Withdrawals are requested through the Client Area and are subject to verification. The Company normally returns withdrawals to the original deposit method, where practicable.",
        "9.8 The Company may delay or refuse a withdrawal where:",
        {
          list: [
            "verification is incomplete;",
            "the law or a court order requires it;",
            "the Client’s Margin is insufficient for Open Positions;",
            "the Company suspects fraud, money laundering or a breach of this Agreement; or",
            "the Account is under investigation.",
          ],
        },
        "9.9 Client Money is held in segregated accounts, separate from the Company’s own money. The Company does not pay interest on Client Money. Separate holding does not protect the Client against trading losses, and it does not guarantee full recovery if a bank fails.",
        "9.10 Where a deposit, withdrawal or fee is in a currency other than the Account’s base currency, it is converted at the Company’s rate, and the Client bears the conversion cost.",
        "9.11 If the Company pays the Client by mistake, it may reverse the payment or deduct the amount from the Account. The Client must return any mistaken payment promptly.",
        "9.12 The Company may apply any amount the Client owes against the Balance, and where the Client holds more than one account, it may combine them.",
        "9.13 The Client must not dispute a legitimate deposit with their card issuer. If they do, the Company may suspend the Account, recover its costs, and close the Account.",
      ],
    },
    {
      id: "tax",
      title: "10. Tax, communications and records",
      blocks: [
        "10.1 The Client is responsible for their own tax reporting and payments in their country of residence. The Company does not give tax advice.",
        "10.2 The Company sends notices through the Client Area, the registered email address or the Platform, and may use telephone calls. A notice is treated as received when it is sent to the registered email address or posted in the Client Area. The Client must keep their contact details current and check notices regularly, including spam folders.",
        "10.3 A communication from the Client takes effect when the Company receives it.",
        "10.4 The Company may record telephone calls and keep electronic messages, including chats and emails, with the Client. Recordings may be used to resolve disputes, check compliance, train staff and meet legal obligations, and may be shared with regulators and relevant banks.",
        "10.5 The Client can see their Orders, positions and transaction history in the Client Area. The Company keeps records of Orders, transactions and communications as required by law and by the Anti-Money Laundering Policy.",
        "10.6 The Company may contact the Client about its products. The Client may opt out of marketing at any time. Opting out does not affect service messages.",
      ],
    },
    {
      id: "data",
      title: "11. Data protection and confidentiality",
      blocks: [
        "11.1 The Company processes personal data as described in the Privacy Policy. The Client consents to this processing to the extent needed to provide the Services, comply with the law, and carry out the verification and screening described in clause 2.",
        "11.2 The Company may share personal data with:",
        {
          list: [
            "regulators and authorities, where the law requires it;",
            "banks, payment providers and clearing counterparties;",
            "identity and screening providers;",
            "Partners, but only the information described in clause 8.4; and",
            "professional advisers, where needed.",
          ],
        },
        "11.3 The Company keeps records for as long as needed to meet its legal obligations and in line with the Anti-Money Laundering Policy.",
        "11.4 The Company does not sell personal data. The Client may withdraw consent to marketing at any time. Withdrawing consent needed to provide the Services may mean the Company cannot continue the relationship.",
        "11.5 The Client must keep confidential any non-public information about the Company’s systems, prices or unpublished terms that they receive under this Agreement. The Company must keep Client information confidential, except where this Agreement permits disclosure, or the law requires it.",
      ],
    },
    {
      id: "liability",
      title: "12. Representations, market information and liability",
      blocks: [
        "12.1 Each time the Client accepts this Agreement or places an Order, the Client confirms that:",
        {
          list: [
            "they trade as principal, for their own account, unless the Company has approved otherwise;",
            "the information they have given is true, accurate and complete;",
            "the funds they deposit are their own, come from lawful sources, and are not used for terrorist financing, sanctions evasion or any other unlawful purpose;",
            "they are not in a Restricted Jurisdiction, and no restriction prevents them from trading; and",
            "they will tell the Company promptly of any change that affects these confirmations.",
          ],
        },
        "12.2 Market information published by the Company or by third parties is provided for general information only. It does not take account of the Client’s circumstances. The Company does not guarantee its accuracy, completeness, or timeliness, and it is not liable for trading decisions made on it. Information may be changed or withdrawn at any time.",
        "12.3 The Company is not liable for indirect losses, loss of profit or consequential loss, including losses caused by:",
        {
          list: [
            "failures of the Platform, the internet or power supply;",
            "the Client’s trading decisions;",
            "third-party providers or services outside the Company’s control; or",
            "unauthorised access caused by the Client’s failure to protect their Access Details.",
          ],
        },
        "12.4 The Client is responsible for losses the Company suffers because the Client breached this Agreement, gave false information, misused the Services or acted fraudulently. The Client indemnifies the Company against those losses, except losses caused by the Company’s gross negligence, wilful misconduct or fraud.",
      ],
    },
    {
      id: "termination",
      title: "13. Force majeure, suspension and termination",
      blocks: [
        "13.1 The Company is not liable for delay or failure caused by events beyond its reasonable control. These include natural disasters, war, terrorism, pandemics, government action, market closures or suspensions, the failure of an exchange, liquidity provider, bank or data provider, and cyber-attacks. During such an event, the Company may, to the extent necessary, suspend or modify its obligations, widen spreads, increase Margin, close positions at prices it considers fair, or restrict trading.",
        "13.2 The Company may suspend or restrict an Account immediately, and where necessary without prior notice, if:",
        {
          list: [
            "verification is incomplete or documents are not provided;",
            "it suspects fraud, money laundering, terrorist financing, market abuse or a breach of this Agreement;",
            "the Client is found to be in a Restricted Jurisdiction;",
            "a law, regulator or court requires it; or",
            "the Client abuses Negative Balance Protection or the Services as described in clause 4.7.",
          ],
        },
        "13.3 The Client may end this Agreement by giving three (3) business days’ written notice from the registered email address. Termination takes effect once Open Positions are closed, and amounts owed are paid.",
        "13.4 The Company may end this Agreement by giving three (3) calendar days’ written notice. It may end this Agreement immediately, without notice, for any reason in clause 13.2 or where continuing would breach the law or a regulatory requirement.",
        "13.5 On termination, the Company closes Open Positions at the market price available when they close, subject to market conditions. It deducts amounts owed, including fees and recovery costs, and returns the remaining Balance to the Client, normally to the original source of deposit, within five (5) business days. Where the Account’s results came from abuse or fraud, the Company may cancel the profits from that activity after its investigation is complete.",
        "13.6 Negative Balance Protection. CFDs are leveraged products and therefore incur a high level of risk and may result in the loss of all the Client’s Capital. For the benefit of the Company’s Clients, the Company has implemented a “negative balance protection” (NBP) mechanism, on an account basis, whereby the Client cannot lose more than the funds available in that Trading Account.",
        "Nonetheless, the Client is expected to actively monitor and manage open positions in the Trading Account. It is possible for adverse market movements to result in the loss of more than the Client’s Account balance, so that it becomes negative. In this case, the Company will bear the negative consequences of such adverse events, and any of the Client’s losses will be limited to the Client’s Account balance.",
        "Any trading activity that is reasonably considered by the Company to exploit or misuse the Negative Balance Protection mechanism, or to create unfair advantages, may be deemed Abusive Behaviour/Abusive Trading. Without limitation, this may include:",
        {
          ordered: true,
          list: [
            "Arbitrage strategies or attempts to generate risk-free profits",
            "Abusive or manipulative trading patterns",
            "Trading without genuine market risk exposure",
            "Coordinated trading or hedging with other accounts or third parties",
            "Any attempt to exploit or circumvent the NBP mechanism",
          ],
        },
        "In such cases, the Company reserves the right, acting at its sole and reasonable discretion, to take any action it deems necessary and as provided herein as an Event of Default, including but not limited to:",
        {
          ordered: true,
          list: [
            "Suspending or restricting the Trading Account(s)",
            "Suspending or restricting additional trading account opening",
            "Adjusting or removing any profits deemed to be improperly obtained",
            "Set max leverage limitations or reduce leverage",
            "Removing Negative Balance Protection (in whole or in part)",
            "Terminating this Agreement",
          ],
        },
        "Beyond the actions described above, where the Company reasonably suspects or determines that Abusive Trading Activity has occurred and an abuse of the NBP and breach of this clause, including but not limited to the activities described above, this shall constitute a breach of this Agreement. In such circumstances, and without limitation, the Company reserves the right, acting at its sole and reasonable discretion, without notice, to:",
        {
          ordered: true,
          list: [
            "Not apply the Negative Balance Protection in relation to affected transactions or accounts.",
            "Transfer or set-off funds held across any of the Client’s Trading Accounts and/or wallet(s).",
            "Use available balances in related accounts/wallets to satisfy any obligations arising from abusive activity.",
          ],
        },
        "For the avoidance of doubt, any such actions may be applied across accounts held by the same Client where reasonably necessary to address or remedy the identified breach.",
        "13.7 Clauses on payment, confidentiality, indemnity, risk, governing law and liability continue after termination.",
      ],
    },
    {
      id: "general",
      title: "14. Amendments, complaints, governing law and general",
      blocks: [
        "14.1 The Company may amend this Agreement by publishing the amended version on the Website. For material changes, the Company will notify the Client by email. A Client who does not accept a change may end this Agreement under clause 13.3 before the change takes effect. Continuing trade after a change takes effect means the Client has accepted it.",
        "14.2 A Client with a concern should contact the Company’s compliance team at compliance@elitecapital.global. The Company will acknowledge a complaint within one (1) business day and send a final written response within fifteen (15) business days. If the Client is not satisfied, they may escalate under the Complaints Procedure. A complaint should include the Client’s name, Account number, the date and details of the problem, the outcome the Client seeks, and any supporting documents.",
        "14.3 The parties will first try to resolve any dispute in good faith.",
        "14.4 The Client must tell the Company if their residence or citizenship changes. The Company may close the Account if the Client is in a Restricted Jurisdiction.",
        "14.5 The Client may not transfer their rights or obligations under this Agreement. The Company may transfer its rights to a successor or group company, with notice to the Client.",
        "14.6 If any provision is unenforceable, the rest of this Agreement remains in force.",
        "14.7 A delay or failure by the Company in exercising a right is not a waiver of that right.",
        "14.8 No third party has rights under this Agreement.",
        "14.9 This Agreement and the documents in clause 1.2 form the entire agreement between the parties on its subject matter and replace earlier understandings on the same subject.",
      ],
    },
    {
      id: "acceptance",
      title: "Acceptance",
      blocks: [
        "Clients accept this Agreement electronically by completing the application and ticking the acceptance box. The acceptance record, including date, time, and version, is kept in the Client file.",
      ],
    },
  ],
};
