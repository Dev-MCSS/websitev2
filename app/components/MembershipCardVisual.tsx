import CloudinaryImage from "./CloudinaryImage";
import MembershipCardReveal from "./MembershipCardReveal";
import styles from "./home-membership.module.css";

export default function MembershipCardVisual() {
  return (
    <div className={styles.surround}>
      <MembershipCardReveal>
        <CloudinaryImage
          publicId="mcss/card/front_26-27"
          alt="MCSS joint membership card for 2026–2027"
          width={1400}
          height={880}
          sizes="(min-width: 731px) 587px, calc(100vw - 96px)"
          className={styles.card}
        />
      </MembershipCardReveal>
    </div>
  );
}
