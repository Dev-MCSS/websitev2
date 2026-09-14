import CloudinaryImage from "./CloudinaryImage";
import MembershipCardReveal from "./MembershipCardReveal";
import PrimaryButton from "./PrimaryButton";
import styles from "./home-membership.module.css";

export default function HomeMembership() {
  return (
    <section id="membership_card" aria-labelledby="membership-heading" className={styles.section}>
      <div className={styles.surround}>
        <MembershipCardReveal>
          <CloudinaryImage
            publicId="mcss/card/front_25-26"
            alt="MCSS joint membership card for 2025–2026"
            width={1400}
            height={880}
            sizes="(min-width: 731px) 587px, calc(100vw - 96px)"
            className={styles.card}
          />
        </MembershipCardReveal>
      </div>

      <div className={styles.description}>
        <h2 id="membership-heading" className={styles.label}>Membership Card</h2>
        <p className={styles.copy}>
          Get up to 20% off at restaurants and drink &amp; dessert shops across
          Montreal with our joint McGill Asian society membership card.
        </p>
        <div className={styles.discoverPlacement}>
          <PrimaryButton href="/sponsors">Sponsors</PrimaryButton>
        </div>
      </div>

    </section>
  );
}
