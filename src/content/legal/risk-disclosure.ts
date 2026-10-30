import type { LegalDocument } from "./types";

/**
 * Web version of "Elite FX Capital – Risk Disclosure Notice" (V0.1).
 *
 * Wording is the PDF's, clause for clause. Only these mechanical changes were
 * made; the downloadable PDF is built from this file (`npm run legal:pdf`):
 *   - Details table: registration number, registered office and principal
 *     place of business removed; version row set to the same version as the
 *     Refund Policy, and "draft" dropped.
 *   - Meta reads "Version 20102026_V0.1 · Drafted 20 October 2026", matching
 *     the Refund Policy, per the client on 30 October 2026 (the PDF's cover
 *     and table disagreed: 20/10/2026 vs "0.1 draft, 30 October 2026").
 *   - The bold lead-in of each bullet in section 2 and each product in 11 is
 *     kept as the opening words of the line (pages render plain text).
 *   - "Public Document" line left to the PDF builder, which adds its own.
 * Kept as written, per the client: 9.2's reference to a Conflicts of Interest
 * Policy, although that policy is not yet published.
 */
export const riskDisclosure: LegalDocument = {
  title: "Risk Disclosure Notice",
  summary:
    "The main risks of trading CFDs with Elite fx Capital: leverage, margin and stop-out, price gaps, costs, and how to protect yourself.",
  meta: "Version 20102026_V0.1 · Drafted 20 October 2026",
  pdf: "/documents/elite-fx-capital-risk-disclosure-notice.pdf",
  sections: [
    {
      id: "company-details",
      title: "Company details",
      blocks: [
        "This Risk Disclosure Notice applies to every client of Elite fx Capital Ltd. (trading as Elite FX Capital) and forms part of the Client Agreement.",
        {
          table: {
            head: ["Item", "Detail"],
            rows: [
              ["Company", "Elite fx Capital Ltd. (trading as Elite FX Capital)"],
              ["Incorporation", "International Business Company under the laws of Saint Lucia"],
              ["Website", "elitecapital.global"],
              ["Version", "20102026_V0.1"],
            ],
          },
        },
      ],
    },
    {
      id: "introduction",
      title: "1. Introduction",
      blocks: [
        "1.1 Trading contracts for difference (CFDs) is complex. It is leveraged, it does not guarantee any return or protect your capital, and it carries a high risk of losing money quickly. CFDs are not suitable for everyone.",
        "1.2 Before you trade, you should understand how CFDs work, the risks described in this notice, and your own financial position. Trade only money that you can afford to lose, and make sure you have enough funds set aside for any losses.",
        "1.3 This notice cannot describe every risk. It gives a fair account of the main risks. You are responsible for finding out more, and for seeking independent advice where you need it.",
        "1.4 Making a deposit, opening a trading account or placing an Order means that you have read this notice, understand the risks, and accept them.",
      ],
    },
    {
      id: "key-risks",
      title: "2. Key risks at a glance",
      blocks: [
        "The main risks are set out below. The rest of this notice explains each one in more detail.",
        {
          list: [
            "You can lose all the money in your trading account. Negative balance protection stops your losses from exceeding your balance. It does not stop you losing the balance itself.",
            "Leverage magnifies gains and losses. A small price movement can have a large effect on your account.",
            "You can be closed out. If your margin level falls to the stop-out level, positions may be closed automatically at prices that are not in your favour.",
            "Prices can jump. Gaps, slippage and illiquidity can mean that an order is filled at a price different from the one you expected, and that a stop-loss does not limit your loss as you intended.",
            "Costs add up. Spreads, commissions, overnight financing and conversion costs all reduce your return.",
            "Some products are more volatile than others. Crypto CFDs in particular can move very sharply, and trade at any time.",
            "Copy trading and automated tools do not remove risk. You remain responsible for the results of the traders or tools you use.",
            "Our interests can differ from yours. Where we act as counterparty to your trades, we may gain when you lose.",
          ],
        },
      ],
    },
    {
      id: "leverage",
      title: "3. Leverage",
      blocks: [
        "3.1 Leverage lets you control a position that is larger than the margin you put up. The margin is the amount of your own money needed to open and keep the position. Our Standard account offers leverage of up to 1:300. The leverage available on each account and instrument is published on the Website.",
        "3.2 Leverage increases both gains and losses in the same way. Its effect is largest when the market moves against you.",
        "3.3 For example, with leverage of 1:300, the margin needed for a position is about 0.33% of its value. For a position of USD 10,000, that is about USD 33. A movement of about 0.33% against the position, before costs, would use up that margin. The figures are illustrations only. Actual margin requirements vary by instrument and are set out on the Website.",
        "3.4 Higher leverage leaves less room for error. You can reduce your exposure by using lower leverage, by trading smaller positions, or by holding more funds in your account than the minimum required.",
      ],
    },
    {
      id: "margin",
      title: "4. Margin, margin calls and stop-out",
      blocks: [
        "4.1 Your margin level is your equity as a percentage of the margin in use. It falls when your losses grow or when the margin requirement rises.",
        "4.2 We may send a margin call, but we are not obliged to. You must monitor your account yourself.",
        "4.3 When your margin level reaches the stop-out level, we may close some or all of your open positions automatically. Positions are closed at the prices available at the time, starting with the largest loss. These prices may be much worse than the prices you expected, and the close-out can happen quickly, including outside your working hours.",
        "4.4 We may also increase margin requirements, reduce leverage, or refuse new orders at any time, including during volatile markets or before major news. These changes can close positions or require you to add funds quickly.",
      ],
    },
    {
      id: "negative-balance-protection",
      title: "5. Negative balance protection",
      blocks: [
        "5.1 Negative balance protection means that you cannot lose more than the balance of your trading account. If a position closes with a loss larger than your balance, we do not ask you to pay the difference.",
        "5.2 Negative balance protection does not protect your balance. You can lose all the money in your account, including through ordinary trading losses. It also does not limit losses that are less than your balance, and it does not guard against slippage or gaps that reduce your balance.",
        "5.3 The protection is set out in the Client Agreement.",
      ],
    },
    {
      id: "market-risk",
      title: "6. Market and price risk",
      blocks: [
        "6.1 The price of a CFD depends on events in the real world, including government policy, legislation, economic data, commercial developments, natural disasters, social and political events, and geopolitical developments. Prices can rise or fall sharply, and you may lose money on a position even when your view of the market is correct.",
        "6.2 Every position is exposed to market risk, and some are also exposed to currency, interest rate, commodity and equity risk.",
      ],
    },
    {
      id: "gaps-slippage",
      title: "7. Gap risk and slippage",
      blocks: [
        "7.1 Prices can move from one level to another without trading in between. This is known as a gap. Gaps are more likely when markets are closed and reopen, over a weekend, around public holidays, and around major announcements.",
        "7.2 A stop-loss order is triggered when the market reaches the set price. It is not guaranteed to fill at that price. If a gap occurs, the order may be filled at a worse price, and your loss may be larger than you intended.",
        "7.3 Slippage is the difference between the price you expected and the price at which your order is filled. Slippage can work for or against you. It is more likely in fast markets, around news, at the open and close of trading, and for pending orders. The Company’s execution arrangements are described on the Website.",
      ],
    },
    {
      id: "liquidity",
      title: "8. Liquidity, volatility and trading suspension",
      blocks: [
        "8.1 Some CFDs can become hard to trade, or can become unavailable, during periods of low liquidity or market stress. You may be unable to close a position when you want to, or only at a poor price.",
        "8.2 Volatility can cause orders to take longer to process, cause prices to change very quickly, and in some cases lead to trading being restricted or suspended. We may suspend or restrict trading in an instrument, or limit the size of orders, for risk reasons.",
        "8.3 Losses from these events may be larger than you expect and difficult to control or predict.",
      ],
    },
    {
      id: "otc-counterparty",
      title: "9. Over the counter trading, counterparty and conflicts",
      blocks: [
        "9.1 CFDs are traded over the counter. They are not traded on a regulated exchange, and there is no central clearing house. Your contract is with the Company, and you carry the credit risk of the Company as your counterparty.",
        "9.2 Where the Company acts as counterparty, the Company may gain when you lose. Its interests can therefore differ from yours. Where the Company routes orders to other providers, your trades depend on the availability and prices of those providers. The Company manages these conflicts under its Conflicts of Interest Policy.",
      ],
    },
    {
      id: "client-money",
      title: "10. Client money and third parties",
      blocks: [
        "10.1 The Company holds client money in segregated accounts with banks and other institutions. The Company takes care in choosing these institutions, but it does not control them.",
        "10.2 Segregation protects client money from the Company’s own creditors, but it does not protect you against trading losses. If a bank or other institution fails, recovery of your money may be delayed or may be incomplete. The Company is not liable for losses caused by the acts or omissions of a third party or by a third party’s insolvency, except as the law requires.",
        "10.3 Funds used as margin for open positions are at risk from trading losses.",
      ],
    },
    {
      id: "product-risks",
      title: "11. Product specific risks",
      blocks: [
        "11.1 Forex. Currency prices respond to interest rates, economic data, central bank decisions and political events. Pairs can move sharply, especially around announcements and during thin trading.",
        "11.2 Metals. Gold, silver, platinum and palladium can be volatile. Prices respond to currency movements, interest rates, industrial demand and investor sentiment.",
        "11.3 Indices. An index can fall sharply, for example in a market-wide event. Some indices are affected by the performance of a small number of large companies.",
        "11.4 Shares. CFDs on shares follow the price of the underlying share. Prices can gap around company results and announcements. Corporate actions such as dividends, share splits and mergers can affect the price and the terms of your position.",
        "11.5 Commodities. Energy and soft commodities can be highly volatile, and are affected by weather, supply disruption, geopolitical events and changes in demand. Some CFDs have expiry dates, and positions in them may be closed automatically at expiry, as set out in the Client Agreement.",
        "11.6 Cryptocurrency CFDs. Crypto CFDs can move very sharply in short periods. They trade at any time, including at weekends and holidays. They are exposed to events affecting a particular token or network, to technology failures, to changes in regulation, and to the removal of an instrument from the Platform. A position may be closed if an instrument is removed or suspended.",
      ],
    },
    {
      id: "overnight-financing",
      title: "12. Overnight financing",
      blocks: [
        "12.1 A position held overnight may attract a financing charge, known as a swap, which may be a debit or a credit. Swap charges accumulate and can exceed the profit or loss on a position over time. Swap rates are published on the Website.",
      ],
    },
    {
      id: "copy-trading",
      title: "13. Copy trading",
      blocks: [
        "13.1 Copy trading lets your account follow the positions of another trader. The trader you copy may lose money, change strategy, stop trading, or close positions in ways you do not expect.",
        "13.2 Copied trades are placed automatically, so losses can occur before you can stop copying. Past results are not a reliable guide to future results. You remain responsible for the results of any trader you copy.",
        "13.3 The Company does not guarantee the performance of any trader.",
      ],
    },
    {
      id: "automated-trading",
      title: "14. Automated trading and tools",
      blocks: [
        "14.1 Expert advisers, trading bots and other automated tools can malfunction, can place orders you did not intend, and can lose money quickly. Using them does not reduce the risk of trading. You use them at your own risk, and the Company is not responsible for losses they cause.",
      ],
    },
    {
      id: "technology",
      title: "15. Technology, connectivity and communication",
      blocks: [
        "15.1 Online trading depends on your device, your internet connection, power supply, and the Company’s systems. Failures of hardware, software, connectivity, servers or energy supply can prevent you from placing, changing or closing orders, and can cause losses. You should use a stable connection, up to date software and security protection.",
        "15.2 Communications from the Company are sent to the contact details registered on your account and posted on the Website. You must keep your contact details up to date and check for notices regularly. A missed notice is not a failure by the Company.",
      ],
    },
    {
      id: "currency",
      title: "16. Currency and conversion risk",
      blocks: [
        "16.1 If you deposit or withdraw in a currency that is different from the currency of your trading account, exchange rates can change between the time you deposit or withdraw and the time the funds are credited. The Company’s conversion costs, and those of your bank or payment provider, are borne by you.",
      ],
    },
    {
      id: "legal-tax",
      title: "17. Legal restrictions, taxes and your jurisdiction",
      blocks: [
        "17.1 Trading CFDs must be permitted under the laws of the country where you live or are a citizen. It is your responsibility to check this before you open an account or trade.",
        "17.2 The Company does not provide services to residents of restricted countries, as listed on the Website. A list of restricted countries is part of the Company’s terms.",
        "17.3 You are responsible for any tax on your trading, your deposits and your withdrawals in your country of residence. The Company does not give tax advice.",
      ],
    },
    {
      id: "execution-only",
      title: "18. Execution-only basis and no advice",
      blocks: [
        "18.1 We provide an execution only service. We do not advise you on whether to trade, what to trade, or when to trade, and we do not monitor your trading to decide whether it is suitable for you.",
        "18.2 You make your own decisions. Any market analysis or commentary from us or from third parties is general information only, and is not a recommendation.",
      ],
    },
    {
      id: "fraud",
      title: "19. Fraud and impersonation",
      blocks: [
        "19.1 Some individuals and businesses pretend to represent a broker in order to take money from traders. Please protect yourself as follows:",
        {
          list: [
            "Contact us only through the contact details on the Website, and use only official addresses ending in elitecapital.global.",
            "Do not respond to unsolicited messages offering trading, investment or recovery services.",
            "Never send money to a personal account, a third party or a cryptocurrency wallet that we have not given you in writing.",
            "Never share your password or a verification code. We will never ask for either by phone, chat or email.",
            "Report any suspected impersonation to us immediately.",
          ],
        },
        "19.2 Other websites may use names similar to ours. Check the web address and the registration details before you rely on any website or message.",
      ],
    },
    {
      id: "market-information",
      title: "20. Market information and third party content",
      blocks: [
        "20.1 Prices shown on the Platform and the Website are indicative. The prices used to execute your orders are those on the Company’s trading server. Market information, research and news may be incomplete, out of date or wrong, and are not a basis for trading on their own.",
      ],
    },
    {
      id: "acknowledgements",
      title: "21. Your acknowledgements",
      blocks: [
        "By opening a trading account, depositing or placing an Order, you confirm that:",
        {
          list: [
            "you have read this Risk Disclosure Notice and the Client Agreement, and understand them;",
            "you understand that you may lose some or all of the money in your trading account;",
            "you have assessed your financial situation and are trading only with funds you can afford to lose;",
            "you have decided to trade on your own judgement, and you have had the opportunity to seek independent advice;",
            "you understand that the Company does not advise you and does not assess the suitability of your trades; and",
            "you are permitted by the law of your country of residence to trade CFDs with the Company.",
          ],
        },
      ],
    },
    {
      id: "changes",
      title: "22. Changes",
      blocks: [
        "22.1 The Company may update this notice. The current version is published on the Website. Changes apply from publication, and you should check the notice regularly.",
      ],
    },
  ],
};
