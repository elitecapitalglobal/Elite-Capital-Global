/**
 * Deposits & Withdrawals page — all copy and payment-method data.
 *
 * Confirmed with the client on 23 October 2026:
 *   - Five method types, no payment-provider brand names.
 *   - USD 10 minimum per transaction on every method. No fixed maximum;
 *     the provider may set its own (see `limitsNote`).
 *   - Deposits accepted 24/7. Withdrawals processed 24/5, Monday to Friday.
 *     Arrival after that depends on the bank or provider.
 *   - OTP on withdrawals, 3D Secure on cards, card refund rule, verification
 *     usually reviewed within 1 business day.
 *   - Client funds: "segregated accounts" only — no mention of banks.
 *
 * To add or change a method, edit `methods` only. Speed (1 fastest – 4
 * slowest) drives the sort order and the meter on each card.
 */

export type MethodType = "card" | "bank" | "wallet" | "crypto";

export type Method = {
  id: string;
  name: string;
  sub: string;
  type: MethodType;
  icon: "card" | "bank" | "globe" | "wallet" | "crypto";
  deposit: { time: string; speed: 1 | 2 | 3 | 4 };
  notes?: string[];
};

export const MIN_PER_TRANSACTION = "USD 10";
export const MAX_PER_TRANSACTION = "No fixed maximum";

export const limitsNote =
  "We don’t set an upper limit. Your bank, card issuer, wallet or the network may apply its own. For large amounts, we may ask for proof of where the money came from before we process it.";

export const withdrawal = {
  availability: "Processed 24/5, Monday to Friday",
  arrival: "Depends on your bank or provider",
};

export const methods: Method[] = [
  {
    id: "card",
    name: "Debit & credit cards",
    sub: "Pay with your bank card",
    type: "card",
    icon: "card",
    deposit: { time: "Usually instant", speed: 1 },
    notes: [
      "Your bank confirms every card deposit with 3D Secure.",
      "Card withdrawals are refunded to the same card, up to the total you deposited with it. Profits above that are paid by bank transfer or crypto.",
    ],
  },
  {
    id: "ewallet",
    name: "E-wallets",
    sub: "Pay from an online wallet",
    type: "wallet",
    icon: "wallet",
    deposit: { time: "Usually instant", speed: 1 },
    notes: ["Use a wallet registered in your own name."],
  },
  {
    id: "local-bank",
    name: "Local bank transfer",
    sub: "Pay from your bank in your own currency",
    type: "bank",
    icon: "globe",
    deposit: { time: "Usually same day", speed: 3 },
    notes: [
      "The local options available to you appear in your Client Area, based on your country of residence.",
    ],
  },
  {
    id: "wire",
    name: "International bank wire",
    sub: "Transfer from any bank, worldwide",
    type: "bank",
    icon: "bank",
    deposit: { time: "1–5 business days", speed: 4 },
    notes: [
      "Your bank, or any bank in between, may deduct its own charges.",
    ],
  },
  {
    id: "crypto",
    name: "Crypto",
    sub: "USDT, BTC, ETH and other major coins",
    type: "crypto",
    icon: "crypto",
    deposit: { time: "After network confirmation", speed: 2 },
    notes: [
      "Always copy the address and network shown in your Client Area for each deposit. Crypto sent on a different network, or to an old address, can be lost.",
    ],
  },
];

export const steps: Record<MethodType, { deposit: string[]; withdraw: string[] }> = {
  card: {
    deposit: [
      "Log in to your Client Area and choose Deposit.",
      "Select cards and the account you want to fund.",
      "Enter the amount and your card details.",
      "Approve the payment with your bank (3D Secure).",
    ],
    withdraw: [
      "Choose Withdraw in your Client Area.",
      "Select the card you deposited with.",
      "Enter the amount, up to your total card deposits.",
      "Confirm with your one-time password.",
    ],
  },
  bank: {
    deposit: [
      "Choose Deposit and select bank transfer.",
      "Copy our bank details and your unique reference.",
      "Send the transfer from a bank account in your own name.",
      "Keep your payment confirmation until the funds arrive.",
    ],
    withdraw: [
      "Choose Withdraw and select bank transfer.",
      "Add or select a bank account in your own name.",
      "Enter the amount.",
      "Confirm with your one-time password.",
    ],
  },
  wallet: {
    deposit: [
      "Choose Deposit and select e-wallet.",
      "Enter the amount.",
      "Log in to your wallet when redirected, and approve the payment.",
      "Your balance updates automatically.",
    ],
    withdraw: [
      "Choose Withdraw and select e-wallet.",
      "Select the wallet you deposited from.",
      "Enter the amount.",
      "Confirm with your one-time password.",
    ],
  },
  crypto: {
    deposit: [
      "Choose Deposit and select the coin and network.",
      "Copy the address shown, or scan the QR code.",
      "Send from your wallet on exactly the same network.",
      "Funds are credited after network confirmation.",
    ],
    withdraw: [
      "Choose Withdraw and select the coin and network.",
      "Paste your wallet address and check it carefully.",
      "Enter the amount.",
      "Confirm with your one-time password.",
    ],
  },
};

export const funding = {
  hero: {
    label: "Deposits & withdrawals",
    title: "Move your money in and out with confidence",
    lead: "Fund your account by card, bank transfer, e-wallet or crypto. We don’t charge you to deposit or withdraw, and every withdrawal is confirmed with a one-time password.",
    glance: [
      { value: "0%", label: "Our fee on deposits and withdrawals" },
      { value: "24/7", label: "Deposits accepted, every day" },
      { value: "24/5", label: "Withdrawals processed, Monday to Friday" },
      { value: "USD 10", label: "Minimum per transaction" },
    ],
  },
  jump: [
    { label: "Payment methods", href: "#methods" },
    { label: "How it works", href: "#how" },
    { label: "Account minimums", href: "#accounts" },
    { label: "Your money", href: "#safety" },
    { label: "Before you transfer", href: "#rules" },
    { label: "FAQs", href: "#faq" },
  ],
  methods: {
    heading: "Choose how to pay",
    lead: "Every method has the same limits and no fee from us. Select a method for timings and step-by-step instructions.",
    foot: "0% is Elite fx Capital’s fee. Your bank, card issuer, wallet or the blockchain network may charge its own fee. The methods you see in your Client Area depend on your country of residence.",
  },
  how: {
    heading: "How it works",
    deposit: {
      title: "Making a deposit",
      lead: "Most deposits reach your trading account in minutes.",
      steps: [
        { title: "Log in and verify your profile", body: "Upload proof of identity and address once. We usually review it within 1 business day." },
        { title: "Choose Deposit and your method", body: "Pick the trading account you want to fund." },
        { title: "Enter the amount and confirm", body: "Pay from an account, card or wallet in your own name." },
        { title: "Start trading", body: "Your balance updates as soon as the payment is confirmed." },
      ],
    },
    withdraw: {
      title: "Making a withdrawal",
      lead: "Your money goes back the way it came, wherever possible.",
      steps: [
        { title: "Log in and choose Withdraw", body: "Check your free margin covers the amount, so your open trades are not affected." },
        { title: "Select your method", body: "We suggest the method you first deposited with." },
        { title: "Confirm with your one-time password", body: "We send a code to your registered email or mobile number." },
        { title: "Track it to your account", body: "Follow its status in your Client Area until the funds arrive." },
      ],
    },
    timeline: {
      title: "Where your withdrawal is at each stage",
      stages: [
        { title: "Request", body: "Submitted in your Client Area", when: "Any time" },
        { title: "Confirmed", body: "Approved with your one-time password", when: "Any time" },
        { title: "Processed", body: "Checked by our Finance team", when: "24/5, Monday to Friday" },
        { title: "Sent", body: "Passed to your bank or provider", when: "Once processed" },
        { title: "Received", body: "Funds in your account or wallet", when: "Depends on your bank or provider" },
      ],
    },
  },
  accounts: {
    heading: "Minimum first deposit by account",
    lead: "Payment limits set the size of each transfer. Your account type sets the minimum first deposit.",
  },
  safety: {
    heading: "Your money stays where it belongs",
    lead: "Client funds are held in segregated accounts, kept apart from the money we run the business on. Every payment in or out goes through the same checks.",
    items: [
      { icon: "bank", title: "Segregated client accounts", body: "Your funds are held separately from the company’s own money." },
      { icon: "lock", title: "OTP-protected withdrawals", body: "Only you can approve money leaving your account." },
      { icon: "shield", title: "Negative balance protection", body: "On every account. You cannot lose more than your account balance." },
      { icon: "id", title: "Identity and AML checks", body: "We verify who is paying and where the money comes from." },
      { icon: "card", title: "3D Secure card payments", body: "Your bank confirms every card deposit." },
      { icon: "sync", title: "Encrypted end to end", body: "Payment and personal data travel over encrypted connections." },
    ],
  },
  rules: {
    heading: "A few simple rules keep your money moving",
    items: [
      { title: "Pay in your own name", body: "Deposits must come from a bank account, card or wallet in your name. Payments from anyone else are returned to the sender." },
      { title: "Withdraw the way you paid", body: "We return funds to your original payment method where possible. Card withdrawals are refunded up to the amount you deposited by card; anything above that is paid by bank transfer or crypto." },
      { title: "Keep your profile verified", body: "You need a verified profile to withdraw. We may ask where your funds came from, and hold a payment until we hear back." },
      { title: "Mind your open trades", body: "You can withdraw from free margin only. Taking out funds that support open positions could lead to a stop-out." },
      { title: "Currency conversion", body: "If you pay in a currency other than your account’s base currency, we convert it at our rate, and the conversion cost is yours." },
      { title: "Talk to us before a chargeback", body: "If something looks wrong, contact us first. Disputing a genuine deposit with your card issuer may lead to your account being suspended." },
    ],
    checklist: {
      title: "Ready to withdraw?",
      lead: "Tick off these four checks to avoid delays.",
      items: [
        "My identity and address are verified",
        "I’m withdrawing to a method in my own name",
        "My free margin covers the amount",
        "I can receive my one-time password",
      ],
      done: "All set. You’re ready to request your withdrawal.",
    },
  },
  faq: {
    heading: "Questions about moving money",
    lead: "Can’t find what you’re looking for? Our team answers in your language, 24/7.",
    items: [
      { q: "Do you charge fees for deposits or withdrawals?", a: "No. Elite fx Capital doesn’t charge for deposits or withdrawals. Your bank, card issuer, wallet or the blockchain network may charge its own fee. Separately, an account with no deposits, withdrawals or trading for three months may be charged a dormant account fee of USD 10 a month, as set out in our Client Agreement." },
      { q: "When can I make a deposit?", a: "Any time. We accept deposits 24 hours a day, 7 days a week." },
      { q: "How long does a withdrawal take?", a: "Our Finance team processes withdrawal requests 24 hours a day, Monday to Friday. A request made at the weekend is processed from Monday. Once we have sent it, the time it takes to arrive depends on your bank or provider." },
      { q: "Is there a maximum amount?", a: "We don’t set a fixed maximum. Your bank, card issuer, wallet or the network may set its own limit. For large amounts, we may ask for proof of where the money came from before we process it." },
      { q: "Why do I need to verify my profile before withdrawing?", a: "Anti-money laundering rules require us to know who our clients are. Verification also means nobody else can withdraw your money. You only need to do it once: upload proof of identity and proof of address in your Client Area. We usually review it within 1 business day." },
      { q: "Can I pay from a friend’s or family member’s account?", a: "No. Every payment must come from an account in your own name. We return third-party payments to the sender, which can delay your trading." },
      { q: "Why can’t I withdraw my profits to my card?", a: "Card payments can only be refunded up to the amount you deposited by card. Once that has been returned, you can withdraw your profits by bank transfer or crypto." },
      { q: "What happens if I pay in a different currency?", a: "If you pay in a currency other than your account’s base currency, we convert it at our rate when it arrives, and the conversion cost is yours." },
      { q: "What if I send crypto on the wrong network?", a: "Always copy the address and network shown in your Client Area for each deposit. Crypto sent on a different network, or to an old address, can be lost and cannot always be recovered. Contact support straight away with your transaction hash." },
      { q: "My deposit hasn’t arrived. What should I do?", a: "First check the usual timing for your method above. If that has passed, email support@elitecapital.global with your account number, the amount, the date and your payment reference or transaction hash, and we’ll trace it for you." },
    ],
  },
  help: {
    heading: "Need a hand with a payment?",
    lead: "Our support team is available by live chat and email, 24/7. We reply to every email within 1 business day.",
  },
};
