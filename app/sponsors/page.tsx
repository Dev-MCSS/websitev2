import type { Metadata } from "next";
import InnerPageShell from "../components/InnerPageShell";
import InnerPageSection from "../components/InnerPageSection";
import MembershipCardVisual from "../components/MembershipCardVisual";
import SponsorMap from "./SponsorMap";
import SponsorsView from "./SponsorsView";
import styles from "./sponsors.module.css";

const sponsorMapId = "1fWnJ-at5-HoMJcElBM9h8-WnRwJbLd0";

export const metadata: Metadata = {
  title: "Sponsors — MCSS",
  description: "Find every MCSS membership card discount across Montreal.",
};

export default function SponsorsPage() {
  return (
    <InnerPageShell tone="home">
      <InnerPageSection title="Sponsors" titleId="sponsors-title">
        <MembershipCardVisual />
        <div className={styles.directoryHeading} data-reveal>
          <h2 id="directory-title">Membership discounts</h2>
          <p>The 2026-2027 East Asian Clubs Membership Card is here!</p>
          <p>Brought to you by HKSN, JSA, KSA, MASSA, MCSS, and MTSA, we’re bringing you discounts at restaurants and local businesses across Montreal.</p>
          <p>Pick up a card for $5 at one of our events, activities night, or DM us on <a className={styles.instagramLink} href="https://www.instagram.com/mcssfam/" target="_blank" rel="noreferrer">instagram</a> to arrange a pick up.</p>
        </div>
        <SponsorMap mapId={sponsorMapId} />
        <SponsorsView />
      </InnerPageSection>
    </InnerPageShell>
  );
}
