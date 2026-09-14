import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import CloudinaryImage from "../components/CloudinaryImage";
import styles from "./events-playground.module.css";

export const metadata: Metadata = {
  title: "Events section explorations — MCSS",
  description: "Four visual directions for the MCSS homepage events section.",
};

export const dynamic = "force-dynamic";

const photos = [
  { title: "Casino Night", id: "mcss/events/2025-2026/casino_night_2025" },
  { title: "Mooncake Workshop", id: "mcss/events/2025-2026/mooncake_2025" },
  { title: "Tang Yuan Workshop", id: "mcss/events/2025-2026/tangyuan_2026_1" },
  { title: "Love O’Clock", id: "mcss/events/2025-2026/LC_2026_1" },
  { title: "Lunar New Year Market", id: "mcss/events/2025-2026/LNY_market_2026_2" },
  { title: "Johnny Chay Show", id: "mcss/events/2025-2026/johnnychay_2025" },
] as const;

function EventPhoto({ index, className }: { index: number; className?: string }) {
  const photo = photos[index];
  return (
    <CloudinaryImage
      publicId={photo.id}
      alt={`${photo.title} with MCSS`}
      width={900}
      height={680}
      sizes="(min-width: 900px) 360px, 70vw"
      className={className}
    />
  );
}

function EventsCta({ light = false }: { light?: boolean }) {
  return (
    <Link className={`${styles.cta}${light ? ` ${styles.ctaLight}` : ""}`} href="/events">
      <span>View all events</span>
      <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}

export default function EventsPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <Link href="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" /> Home</Link>
        <p className={styles.kicker}>MCSS / HOMEPAGE EXPLORATION</p>
        <h1>Four ways to remember a good night.</h1>
        <p className={styles.lede}>Each direction is designed as the bridge between Overview and Membership Card. They use the same warm paper, muted ink, and MCSS red—without repeating the hero’s card-switching interaction.</p>
      </header>

      <div className={styles.variants}>
        <section className={styles.variant} aria-labelledby="variant-one">
          <div className={styles.variantMeta}><span>01</span><div><h2 id="variant-one">Field notes</h2><p>Tactile, loose, and closest to the college scrapbook references.</p></div></div>
          <div className={styles.fieldNotes}>
            <div className={styles.fieldCopy}>
              <p className={styles.handNote}>good people, good nights ✶</p>
              <h3>Events</h3>
              <p>Culture, chaos, and the kind of nights that become inside jokes.</p>
              <EventsCta />
            </div>
            <figure className={`${styles.paperPhoto} ${styles.paperOne}`}><EventPhoto index={0} /><figcaption>Casino Night / 2025</figcaption></figure>
            <figure className={`${styles.paperPhoto} ${styles.paperTwo}`}><EventPhoto index={4} /><figcaption>LNY Market</figcaption></figure>
            <figure className={`${styles.paperPhoto} ${styles.paperThree}`}><EventPhoto index={2} /><figcaption>Made by hand</figcaption></figure>
            <figure className={`${styles.paperPhoto} ${styles.paperFour}`}><EventPhoto index={3} /><figcaption>Love O’Clock</figcaption></figure>
            <span className={styles.paperclip} aria-hidden="true" />
            <span className={styles.redStamp} aria-hidden="true">MCSS<br />ARCHIVE</span>
          </div>
        </section>

        <section className={styles.variant} aria-labelledby="variant-two">
          <div className={styles.variantMeta}><span>02</span><div><h2 id="variant-two">The archive</h2><p>A structured contact sheet with a graphic editorial edge.</p></div></div>
          <div className={styles.archive}>
            <div className={styles.archiveHeader}><span>MCSS PHOTO DEPT.</span><span>2025—2026</span></div>
            <div className={styles.contactSheet}>
              {photos.map((photo, index) => (
                <figure key={photo.id}><EventPhoto index={index} /><figcaption><b>0{index + 1}</b>{photo.title}</figcaption></figure>
              ))}
            </div>
            <div className={styles.archiveCopy}>
              <p>OPEN FILE / 06</p>
              <h3>A year worth keeping.</h3>
              <EventsCta light />
            </div>
          </div>
        </section>

        <section className={styles.variant} aria-labelledby="variant-three">
          <div className={styles.variantMeta}><span>03</span><div><h2 id="variant-three">One roll left</h2><p>A cinematic photo strip that reads as one continuous memory.</p></div></div>
          <div className={styles.filmSection}>
            <div className={styles.filmHeading}><div><p>MCSS / ROLL 26</p><h3>See what<br />develops.</h3></div><p>From workshops to late nights, there’s always another frame waiting.</p></div>
            <div className={styles.filmStrip}>
              {photos.slice(0, 5).map((photo, index) => (
                <figure key={photo.id}><EventPhoto index={index} /><figcaption><span>0{index + 1}</span>{photo.title}</figcaption></figure>
              ))}
            </div>
            <div className={styles.filmFooter}><span>36 EXP · COLOR</span><EventsCta /></div>
          </div>
        </section>

        <section className={styles.variant} aria-labelledby="variant-four">
          <div className={styles.variantMeta}><span>04</span><div><h2 id="variant-four">The yearbook index</h2><p>Not a collage: a confident editorial directory led by event names.</p></div></div>
          <div className={styles.yearbook}>
            <div className={styles.yearbookLead}><p>THE SOCIAL CALENDAR</p><h3>We did<br />all this?</h3><EventsCta /></div>
            <div className={styles.eventIndex}>
              {photos.slice(0, 4).map((photo, index) => (
                <Link href="/events" className={styles.indexRow} key={photo.id}>
                  <span>0{index + 1}</span>
                  <strong>{photo.title}</strong>
                  <EventPhoto index={index} />
                  <ArrowRight size={22} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
