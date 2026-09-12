import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, ChevronRight, MapPin, Ticket } from "lucide-react";

import HomeFooter from "../components/HomeFooter";
import HomeNavbar from "../components/HomeNavbar";
import styles from "./ui-playground.module.css";

const dmMono = localFont({
  src: "../../public/fonts/dm-mono-medium.ttf",
  weight: "500",
  style: "normal",
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Visual direction — MCSS",
  description: "A working visual direction for the next MCSS website.",
};

// This is an internal review surface, never a public production route.
export const dynamic = "force-dynamic";

const swatches = [
  ["Night ink", "#171817"],
  ["Warm white", "#F7F3ED"],
  ["Tea beige", "#EDE5D8"],
  ["Brand red", "#D7292A"],
  ["Tomato", "#C95F4F"],
  ["Persimmon", "#E88958"],
  ["Butter", "#E8C958"],
] as const;

export default function UiPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main id="top" className={`${styles.page} ${dmMono.variable}`}>
      <HomeNavbar />
      <div className={styles.shell}>
        <section className={styles.hero} aria-labelledby="direction-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>MCSS / visual direction</p>
            <h1 id="direction-title">A lively home for <span>the fam.</span></h1>
            <p className={styles.intro}>A warmer, more editorial MCSS: built around real moments, generous space, and a confident voice that feels as welcoming as the people in it.</p>
            <div className={styles.actions}>
              <a className={styles.primaryButton} href="#components">Explore the system <ArrowUpRight aria-hidden="true" /></a>
              <Link className={styles.textButton} href="/events">See current events <ChevronRight aria-hidden="true" /></Link>
            </div>
          </div>
          <figure className={styles.heroImage}>
            <Image src="/images/optimized/home/lny_market_2026.webp" alt="Students gathered at an MCSS Lunar New Year market" fill sizes="(min-width: 900px) 42vw, 100vw" priority />
            <figcaption>New Year market, 2026</figcaption>
          </figure>
        </section>

        <section className={styles.section} aria-labelledby="type-title">
          <div className={styles.sectionHeading}><p>Type & voice</p><h2 id="type-title">Clear enough to lead.<br />Warm enough to join.</h2></div>
          <div className={styles.typeGrid}>
            <article className={styles.typeSpec}><span>Display / Metropolis Bold</span><strong>Make plans<br />that matter.</strong><small>72 / 0.94 / −0.06em</small></article>
            <article className={styles.typeSpec}><span>Heading / Metropolis Semibold</span><h3>What’s happening next</h3><small>36 / 1.0 / −0.04em</small></article>
            <article className={styles.typeSpec}><span>Body / Metropolis Regular</span><p>Experiences that celebrate Chinese heritage, create lasting friendships, and make Montréal feel a little more like home.</p><small>18 / 1.45 / −0.02em</small></article>
            <article className={styles.typeSpec}><span>Utility / DM Mono Medium</span><b>FALL 2026 · MONTREAL</b><small>13 / 1.0 / 0.08em</small></article>
            <article className={`${styles.typeSpec} ${styles.navType}`}><span>Navigation / Georgia Italic</span><em>Events&nbsp;&nbsp; Sponsors&nbsp;&nbsp; About</em><small>Georgia Italic / 34 / 1.05</small></article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="colour-title">
          <div className={styles.sectionHeading}><p>Colour</p><h2 id="colour-title">Night-forward, with warmth<br />where it counts.</h2></div>
          <div className={styles.swatches}>
            {swatches.map(([name, value]) => <div className={styles.swatch} key={value}><i style={{ background: value }} /><span>{name}</span><code>{value}</code></div>)}
          </div>
          <p className={styles.iconNote}>Icons: <strong>Lucide React</strong> — outlined icons at 16–20px, using 1.5–2px strokes. The only exception is the custom filled TikTok glyph in the shared footer because Lucide does not provide that brand icon.</p>
        </section>

        <section id="components" className={styles.section} aria-labelledby="component-title">
          <div className={styles.sectionHeading}><p>Components</p><h2 id="component-title">Structured for a site that<br />still feels human.</h2></div>
          <div className={styles.componentGrid}>
            <article className={`${styles.componentCard} ${styles.eventCard}`}>
              <Image src="/images/optimized/home/casino_night_2025.JPG" alt="MCSS Casino Night crowd" fill sizes="(min-width: 900px) 48vw, 100vw" />
              <div className={styles.eventShade} />
              <div className={styles.eventContent}><p>Thursday, October 16</p><h3>Casino Night</h3><span>More cards, less small talk <ArrowUpRight aria-hidden="true" /></span></div>
            </article>
            <article className={`${styles.componentCard} ${styles.detailsCard}`}>
              <p>Designed details</p><div className={styles.detailRows}><div><CalendarDays aria-hidden="true" /><span>Date & time</span><b>Oct 16 · 9 PM</b></div><div><MapPin aria-hidden="true" /><span>Location</span><b>Thomson House</b></div><div><Ticket aria-hidden="true" /><span>Entry</span><b>Members first</b></div></div><a href="#membership">Get a membership <ArrowUpRight aria-hidden="true" /></a>
            </article>
            <article className={`${styles.componentCard} ${styles.quoteCard}`}><p>“I joined for the events and stayed because suddenly I had people to call on a random Tuesday.”</p><span>— Member, class of 2027</span></article>
          </div>
        </section>

        <section id="membership" className={styles.membership} aria-labelledby="membership-title">
          <div><p className={styles.eyebrow}>The invitation</p><h2 id="membership-title">You’re already<br />on the list.</h2><p>Membership gives you early access, better prices, and a standing reason to say yes to the next thing.</p><Link className={styles.lightButton} href="/#membership_card">Become a member <ArrowUpRight aria-hidden="true" /></Link></div>
          <Image src="/images/optimized/home/membership_card.webp" alt="MCSS membership card" width={720} height={460} sizes="(min-width: 900px) 40vw, 85vw" />
        </section>
      </div>
      <HomeFooter />
    </main>
  );
}
