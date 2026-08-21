import { support } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * Support gets its own section rather than a line in a feature grid, because
 * "can I reach a person when something goes wrong" is a deciding question for
 * anyone who has been let down by a broker before — and a bullet point does
 * not answer it with any weight.
 *
 * Left-weighted with a large illustrative mark on the right, which is what
 * keeps it from reading as another centred CTA block so soon before the real
 * one at the foot of the page.
 */
export function Support() {
  return (
    <Section surface="white" className="section-y">
      <div className="shell grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
        <Reveal>
          <h2 className="type-h2 whitespace-pre-line text-navy-900">
            {support.heading}
          </h2>
          <p className="type-lead measure mt-5 text-navy-700/80">
            {support.lead}
          </p>
          <div className="mt-8">
            <Button href={support.cta.href}>{support.cta.label}</Button>
          </div>
        </Reveal>

        {/* Decorative. Hidden below `lg`, where it would push the CTA a full
            screen down the page for no informational gain. */}
        <Reveal className="hidden lg:block">
          <Conversation />
        </Reveal>
      </div>
    </Section>
  );
}

/**
 * Two speech bubbles, the reply already arriving. Drawn rather than
 * illustrated so it re-tints with the palette and costs no request.
 */
function Conversation() {
  return (
    <svg
      viewBox="0 0 320 240"
      aria-hidden
      className="ms-auto h-auto w-full max-w-[380px]"
    >
      <defs>
        <linearGradient id="support-in" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-blue-600)" />
          <stop offset="100%" stopColor="var(--color-navy-950)" />
        </linearGradient>
      </defs>

      {/* Incoming — the reader's question. */}
      <g>
        <rect
          x="8"
          y="24"
          width="196"
          height="86"
          rx="24"
          fill="var(--color-blue-50)"
          stroke="var(--color-navy-900)"
          strokeOpacity="0.1"
        />
        <g fill="var(--color-navy-900)" fillOpacity="0.16">
          <rect x="32" y="50" width="130" height="9" rx="4.5" />
          <rect x="32" y="70" width="96" height="9" rx="4.5" />
        </g>
      </g>

      {/* The reply. */}
      <g>
        <rect
          x="116"
          y="128"
          width="196"
          height="86"
          rx="24"
          fill="url(#support-in)"
        />
        <g fill="#fff" fillOpacity="0.5">
          <rect x="140" y="154" width="120" height="9" rx="4.5" />
          <rect x="140" y="174" width="150" height="9" rx="4.5" />
        </g>
      </g>

      {/* Typing dots, on the incoming side — someone is already answering. */}
      <g fill="var(--color-blue-600)">
        <circle cx="40" cy="146" r="6" opacity="0.9" />
        <circle cx="62" cy="146" r="6" opacity="0.6" />
        <circle cx="84" cy="146" r="6" opacity="0.35" />
      </g>
    </svg>
  );
}
