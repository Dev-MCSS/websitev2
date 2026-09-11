import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sponsorPreviewForMembershipCard, sponsorTotalCount } from "@/data/sponsors";
import CloudinaryImage from "./CloudinaryImage";
import MembershipCardReveal from "./MembershipCardReveal";
import styles from "./home-membership.module.css";

export default function HomeMembership() {
  const preview = sponsorPreviewForMembershipCard.slice(0, 5);
  const remaining = Math.max(0, sponsorTotalCount - preview.length);

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
        <h2 id="membership-heading" className={styles.label}>membership card</h2>
        <p className={styles.copy}>
          Get up to 20% off at restaurants and drink &amp; dessert shops across
          Montreal with our joint McGill Asian society membership card.
        </p>
        <div className={styles.sponsors}>
          <ul className={styles.avatars} aria-label="Membership sponsors" role="list">
            {preview.map((sponsor) => (
              <li className={styles.avatar} key={sponsor.image}>
                <CloudinaryImage
                  publicId={sponsor.image}
                  alt={sponsor.name}
                  width={88}
                  height={88}
                  sizes="44px"
                  className={styles.logo}
                />
              </li>
            ))}
            {remaining > 0 && (
              <li className={`${styles.avatar} ${styles.more}`} aria-label={`${remaining} more sponsors`}>
                <span aria-hidden="true">+{remaining}</span>
              </li>
            )}
          </ul>
          <Link href="/sponsors" className={styles.discover}>
            Discover more<span className={styles.srOnly}> membership sponsors</span>
            <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
