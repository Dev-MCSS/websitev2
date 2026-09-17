import { sponsorPreviewForMembershipCard, sponsorTotalCount } from "@/data/sponsors";
import CloudinaryImage from "./CloudinaryImage";
import MembershipCardVisual from "./MembershipCardVisual";
import PrimaryButton from "./PrimaryButton";
import styles from "./home-membership.module.css";

export default function HomeMembership() {
  const sponsorPreview = sponsorPreviewForMembershipCard;
  const remainingSponsors = sponsorTotalCount - sponsorPreview.length;

  return (
    <section id="membership_card" aria-labelledby="membership-heading" className={styles.section}>
      <MembershipCardVisual />

      <div className={styles.description}>
        <h2 id="membership-heading" className={styles.label}>Membership Card</h2>
        <p className={styles.copy}>
          Get up to 20% off at restaurants and drink &amp; dessert shops across
          Montreal with our joint McGill Asian society membership card.
        </p>
        <ul className={styles.sponsorPreview} aria-label="Featured membership sponsors">
          {sponsorPreview.map((sponsor) => (
            <li key={sponsor.image}>
              <CloudinaryImage
                publicId={sponsor.image}
                alt={sponsor.name}
                width={96}
                height={96}
                sizes="56px"
              />
            </li>
          ))}
          <li className={styles.sponsorCount} aria-label={`${remainingSponsors} more sponsors`}>
            +{remainingSponsors}
          </li>
        </ul>
        <div className={styles.discoverPlacement}>
          <PrimaryButton href="/sponsors">Sponsors</PrimaryButton>
        </div>
      </div>

    </section>
  );
}
