import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, CreditCard } from "lucide-react";
import { sponsorTotalCount } from "@/data/sponsors";
import CloudinaryImage from "../components/CloudinaryImage";
import InnerPageShell from "../components/InnerPageShell";
import shell from "../components/inner-page.module.css";
import SponsorsView from "./SponsorsView";
import styles from "./sponsors.module.css";

export const metadata: Metadata = {
  title: "Sponsors — MCSS",
  description: "Find every MCSS membership card discount across Montreal.",
};

export default function SponsorsPage() {
  return (
    <InnerPageShell tone="amber">
      <section className={shell.hero} aria-labelledby="sponsors-title">
        <div className={shell.heroCopy} data-reveal>
          <p className={shell.kicker}>One card · {sponsorTotalCount} local perks</p>
          <h1 id="sponsors-title">Your membership card has <em>plans.</em></h1>
          <p className={shell.lede}>
            Eat, sip, and explore Montréal for less. Show your 2025–2026 joint
            Asian society membership card at any participating business below.
          </p>
          <div className={shell.heroActions}>
            <a className={shell.inkButton} href="#sponsor-directory">Find a deal <ArrowDown size={17} aria-hidden /></a>
            <Link className={shell.paperButton} href="/#membership_card">Get the card <CreditCard size={17} aria-hidden /></Link>
          </div>
        </div>

        <div className={`${styles.cardStage} ${shell.paperPanel}`} data-photo-stack aria-label="MCSS membership card">
          <span className={styles.grid} aria-hidden="true" />
          <div className={styles.cardWrap}>
            <CloudinaryImage publicId="mcss/card/front_25-26" alt="MCSS joint membership card for 2025–2026" width={1400} height={880} priority sizes="(min-width: 861px) 40vw, 82vw" />
          </div>
          <p className={styles.cardNote}>Keep it close. Montréal gets cheaper.</p>
        </div>
      </section>

      <section id="sponsor-directory" className={`${shell.section} ${styles.directory}`} aria-labelledby="directory-title">
        <div className={shell.sectionHeading} data-reveal>
          <p className={shell.kicker}>The pocket-sized guide</p>
          <h2 id="directory-title">Pick your next stop</h2>
          <p>Search by name, discount, or street. Tap an address to open it in Maps.</p>
        </div>
        <SponsorsView />
      </section>

      <aside className={shell.cta} data-reveal aria-labelledby="sponsor-cta-title">
        <div>
          <h2 id="sponsor-cta-title">Good food. Better company. A nicer total.</h2>
          <p>Your MCSS membership supports community programming while unlocking discounts all year.</p>
        </div>
        <Link className={shell.paperButton} href="/#membership_card">Explore membership</Link>
      </aside>
    </InnerPageShell>
  );
}
