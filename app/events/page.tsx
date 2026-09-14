import type { Metadata } from "next";
import { ArrowDown, CalendarDays } from "lucide-react";
import CloudinaryImage from "../components/CloudinaryImage";
import InnerPageShell from "../components/InnerPageShell";
import shell from "../components/inner-page.module.css";
import EventsGallery from "./EventsGallery";
import styles from "./events.module.css";

export const metadata: Metadata = {
  title: "Events — MCSS",
  description:
    "Parties, cultural celebrations, competitions, and more — explore the MCSS event archive.",
};

export default function EventsPage() {
  return (
    <InnerPageShell tone="rose">
      <section className={shell.hero} aria-labelledby="events-title">
        <div className={shell.heroCopy} data-reveal>
          <p className={shell.kicker}>Made at McGill · remembered together</p>
          <h1 id="events-title">
            Come for the event. Leave with <em>the story.</em>
          </h1>
          <p className={shell.lede}>
            Culture nights, friendly competition, big celebrations, and the
            wonderfully unplanned moments in between. This is the MCSS archive.
          </p>
          <div className={shell.heroActions}>
            <a className={shell.inkButton} href="#event-archive">
              Browse the archive <ArrowDown size={17} aria-hidden />
            </a>
            <a className={shell.paperButton} href="https://www.instagram.com/mcssfam/" target="_blank" rel="noreferrer">
              See what&apos;s next <CalendarDays size={17} aria-hidden />
            </a>
          </div>
        </div>

        <div className={shell.heroVisual} data-photo-stack aria-label="Recent MCSS event photographs">
          <figure className={`${shell.photoFrame} ${shell.frameOne}`} data-caption="Lunar New Year">
            <CloudinaryImage publicId="mcss/events/2025-2026/LNY_market_2026_2" alt="Students celebrating at the MCSS Lunar New Year Market" fill sizes="(min-width: 861px) 38vw, 72vw" />
          </figure>
          <figure className={`${shell.photoFrame} ${shell.frameTwo}`} data-caption="Mooncake Workshop">
            <CloudinaryImage publicId="mcss/events/2025-2026/mooncake_2025" alt="MCSS Mooncake Workshop" fill sizes="(min-width: 861px) 32vw, 62vw" />
          </figure>
          <figure className={`${shell.photoFrame} ${shell.frameThree}`} data-caption="Casino Night">
            <CloudinaryImage publicId="mcss/events/2025-2026/casino_night_2025" alt="Friends gathered at MCSS Casino Night" fill priority sizes="(min-width: 861px) 35vw, 68vw" />
          </figure>
        </div>
      </section>

      <section id="event-archive" className={`${shell.section} ${styles.archive}`} aria-labelledby="archive-title">
        <div className={shell.sectionHeading} data-reveal>
          <p className={shell.kicker}>Two years, plenty of evidence</p>
          <h2 id="archive-title">The camera roll</h2>
          <p>Pick a school year, then open any frame for the full-size memory. The mix changes; the feeling stays familiar.</p>
        </div>
        <EventsGallery />
      </section>

      <aside className={shell.cta} data-reveal aria-labelledby="events-cta-title">
        <div>
          <h2 id="events-cta-title">The next photo could have you in it.</h2>
          <p>Follow MCSS for upcoming gatherings, workshops, socials, and ticket releases.</p>
        </div>
        <a className={shell.paperButton} href="https://www.instagram.com/mcssfam/" target="_blank" rel="noreferrer">Follow @mcssfam</a>
      </aside>
    </InnerPageShell>
  );
}
