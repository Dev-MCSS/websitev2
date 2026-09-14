"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, Ticket } from "lucide-react";
import { sponsors, sponsorAddresses, type SponsorItem } from "@/data/sponsors";
import CloudinaryImage from "../components/CloudinaryImage";
import styles from "./sponsors.module.css";

function mapsHref(name: string, address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;
}
function SponsorTicket({ item, category }: { item: SponsorItem; category: string }) {
  const addresses = sponsorAddresses(item);

  return (
    <article className={styles.ticket} data-reveal>
      <div className={styles.logoWell}>
        <CloudinaryImage publicId={item.image} alt={`${item.name} logo`} fill sizes="(min-width: 1100px) 18vw, (min-width: 650px) 28vw, 88vw" className={styles.logo} />
      </div>
      <div className={styles.ticketBody}>
        <div>
          <p className={styles.category}>{category}</p>
          <h3>{item.name}</h3>
        </div>
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
  const categories = Object.entries(sponsors);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () => categories.flatMap(([key, category]) => category.items.map((item) => ({ ...item, categoryKey: key, category: category.span }))),
    [categories],
  );

  const filtered = items.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.categoryKey === activeCategory;
    const searchText = `${item.name} ${item.discount} ${sponsorAddresses(item).join(" ")}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <div className={styles.controls} data-reveal>
        <label className={styles.search}>
          <Search size={18} aria-hidden />
          <span className={styles.srOnly}>Search sponsors</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a name, deal, or street" type="search" />
        </label>
        <div className={styles.categories} aria-label="Filter sponsors by category">
          <button type="button" aria-pressed={activeCategory === "all"} className={activeCategory === "all" ? styles.active : ""} onClick={() => setActiveCategory("all")}>All</button>
          {categories.map(([key, category]) => <button key={key} type="button" aria-pressed={activeCategory === key} className={activeCategory === key ? styles.active : ""} onClick={() => setActiveCategory(key)}>{category.span}</button>)}
        </div>
        <p className={styles.results} aria-live="polite">{filtered.length} {filtered.length === 1 ? "place" : "places"}</p>
      </div>

      <div className={styles.ticketGrid}>
        {filtered.map((item) => <SponsorTicket key={item.image} item={item} category={item.category} />)}
      </div>
      {filtered.length === 0 ? <div className={styles.empty}><p>No matches yet.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Reset the search</button></div> : null}
    </>
  );
}
