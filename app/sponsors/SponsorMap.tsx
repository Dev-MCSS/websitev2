import { ArrowRight } from "lucide-react";
import styles from "./sponsors.module.css";

const MAP_TITLE = "2026-2027 East Asian Club Membership Discounts";

export default function SponsorMap({ mapId }: { mapId: string }) {
  const id = encodeURIComponent(mapId);

  return (
    <section className={styles.sponsorMap} aria-label="Sponsor locations">
      <div className={styles.sponsorMapFrame}>
        <iframe
          title={MAP_TITLE}
          src={`https://www.google.com/maps/d/embed?mid=${id}&ehbc=2E312F`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className={styles.sponsorMapActions}>
        <a
          className={styles.sponsorMapAction}
          href={`https://www.google.com/maps/d/viewer?mid=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Open the full map</span>
          <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
