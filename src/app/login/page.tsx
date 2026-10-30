import type { Metadata } from "next";
import { connection } from "next/server";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | Elite fx Capital",
  description: "Log in to your Elite fx Capital client portal.",
};

export default async function LoginPage() {
  // Rendered per request: the strict CSP nonce (src/proxy.ts) is new every time.
  await connection();
  return (
    <AuthShell
      eyebrow="Client portal"
      title={
        <>
          Welcome
          <br />
          <span className="text-blue-400">back.</span>
        </>
      }
      lead="Deposit, withdraw and manage your trading accounts, all from your client portal."
      points={[
        { k: "Withdrawals", v: "Confirmed with a one-time password" },
        { k: "Your password", v: "We will never ask for it" },
        { k: "Before you log in", v: "Check the address reads elitecapital.global" },
      ]}
    >
      <LoginForm />
    </AuthShell>
  );
}
