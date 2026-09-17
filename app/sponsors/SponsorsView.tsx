import { MapPin, Ticket } from "lucide-react";
import { sponsors, sponsorAddresses, type SponsorItem } from "@/data/sponsors";
import CloudinaryImage from "../components/CloudinaryImage";
import styles from "./sponsors.module.css";

function mapsHref(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}
function SponsorTicket({ item }: { item: SponsorItem }) {
  const addresses = sponsorAddresses(item);

  return (
    <article className={styles.ticket} data-reveal>
      <div className={styles.logoWell}>
        <CloudinaryImage publicId={item.image} alt={`${item.name} image`} fill sizes="(min-width: 1100px) 18vw, (min-width: 650px) 28vw, 88vw" className={styles.logo} />
      </div>
      <div className={styles.ticketBody}>
        <h3>{item.name}</h3>
        <p className={styles.discount}><Ticket size={18} aria-hidden />{item.discount}</p>
        <div className={styles.addresses}>
          <MapPin size={16} aria-hidden />
          <p>{addresses.map((address, index) => <span key={address}>{index > 0 ? " · " : null}<a href={mapsHref(item.name, address)} target="_blank" rel="noreferrer">{address}</a></span>)}</p>
        </div>
      </div>
    </article>
  );
}

export default function SponsorsView() {
  return (
    <div className={styles.sponsorSections}>
      {Object.values(sponsors).map((category) => (
        <section key={category.span} aria-label={category.span}>
          <h2 className={styles.categoryHeading}>{category.span}</h2>
          <div className={styles.ticketGrid}>
            {category.items.map((item) => <SponsorTicket key={item.image} item={item} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
