import { calendar } from "@/content/site";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EconomicCalendar } from "@/components/ui/EconomicCalendar";
import { fetchCalendar } from "@/lib/calendar";

/**
 * The week's economic releases, straight after Markets: what you can trade,
 * then what's about to move it.
 *
 * Drawn in house (glass panel, emerald accents, mono figures) rather than
 * embedded, so it reads as part of the page. The feed is fetched server-side
 * and cached for an hour — see `lib/calendar.ts`.
 */
export async function CalendarSection() {
  const events = await fetchCalendar();

  return (
    <Section surface="white" id="calendar" className="section-y">
      <div className="shell">
        <Reveal>
          <SectionHead heading={calendar.heading} lead={calendar.lead} surface="white" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10 md:mt-12">
          <EconomicCalendar events={events} />
        </Reveal>
      </div>
    </Section>
  );
}
