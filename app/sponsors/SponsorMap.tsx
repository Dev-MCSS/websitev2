import styles from "./sponsors.module.css";

const MAP_TITLE = "2026-2027 East Asian Club Membership Discounts";

export default function SponsorMap({ mapId }: { mapId: string }) {
  const id = encodeURIComponent(mapId);

  return (
    <section className={styles.sponsorMap} aria-label="Sponsor locations">
      <iframe
        title={MAP_TITLE}
        src={`https://www.google.com/maps/d/embed?mid=${id}&ehbc=2E312F`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a
        className={styles.sponsorMapLink}
        href={`https://www.google.com/maps/d/viewer?mid=${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open the full map
      </a>
    </section>
  );
}
