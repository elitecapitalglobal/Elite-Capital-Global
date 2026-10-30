import type { Metadata } from "next";
import { connection } from "next/server";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Open a Live Account | Elite fx Capital",
  description: "Open your Elite fx Capital trading account in three short steps.",
};

export default async function SignupPage() {
  // Rendered per request: the strict CSP nonce (src/proxy.ts) is new every time.
  await connection();
  return (
    <AuthShell
      eyebrow="Live account"
      title={
        <>
          An account,
          <br />
          <span className="text-blue-400">made for you.</span>
        </>
      }
      lead="Three short steps. You will verify your identity in the client portal afterwards, and our team is here at every stage."
      points={[
        { k: "Our fees", v: "None to deposit or withdraw" },
        { k: "Payments", v: "From USD 10 per transaction" },
        { k: "Your funds", v: "Held in segregated accounts" },
        { k: "Your losses", v: "Never more than your balance" },
        { k: "Support", v: "Multilingual, 24/7" },
      ]}
    >
      <SignupForm />
    </AuthShell>
  );
}
