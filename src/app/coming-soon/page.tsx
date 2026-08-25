import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Coming Soon | Elite Capital",
  description:
    "Our client portal is launching soon. Check back shortly to open your account.",
};

/**
 * Every "open account" CTA on the marketing site points here until the CRM
 * ships — there is no live sign-up flow yet, so the honest destination is a
 * holding page rather than a form nobody can submit.
 */
export default function ComingSoonPage() {
  return (
    <Section surface="deep" className="section-y min-h-[70dvh]">
      <div className="shell flex flex-col items-center text-center">
        <p className="type-label text-blue-400">Client Portal</p>
        <h1 className="type-display mt-4 max-w-2xl text-ink-100">
          Account opening is coming soon
        </h1>
        <p className="type-lead measure mt-5 max-w-xl text-ink-300">
          We&apos;re putting the finishing touches on our new client portal.
          Sign-ups will open shortly — in the meantime, explore the platform
          or reach out to our support team with any questions.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="mailto:support@elitecapital.com" variant="ghost">
            Contact support
          </Button>
        </div>
      </div>
    </Section>
  );
}
