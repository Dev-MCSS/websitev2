"use client";

import { useMemo, useRef, useState } from "react";
import { events } from "@/data/events";
import CloudinaryImage from "../components/CloudinaryImage";
import EventImageLightbox from "./EventImageLightbox";
import { buildLightboxHighResSrc, pickLightboxBreakpointWidth } from "./lightboxImage";
import styles from "./events.module.css";

type LightboxItem = {
  publicId: string;
  title: string;
  requestWidth: number;
  previewWidth: number;
  previewHeight: number;
};

const gallerySizes = "(min-width: 900px) 30vw, (min-width: 480px) 46vw, 48vw";
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function pickRequestWidth() {
  if (typeof window === "undefined") return 1600;
  return pickLightboxBreakpointWidth(
    window.innerWidth - 48,
    window.innerHeight - 128,
    window.devicePixelRatio,
  );
}

export default function EventsGallery() {
  const categories = Object.entries(events);
  const [selectedYear, setSelectedYear] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const preloadedRef = useRef(new Set<string>());

  const items = useMemo(
    () =>
      categories.flatMap(([yearKey, category]) =>
        category.items.map((item, index) => ({ ...item, yearKey, year: category.span, index })),
      ),
    [categories],
  );
  const filteredItems = selectedYear === "all" ? items : items.filter((item) => item.yearKey === selectedYear);

  const preload = (publicId: string, requestWidth: number) => {
    const src = buildLightboxHighResSrc(cloudName, publicId, requestWidth);
    if (!src || preloadedRef.current.has(src)) return;
    preloadedRef.current.add(src);
    const image = new Image();
    image.decoding = "async";
    image.src = src;
  };

  return (
    <>
      <div className={styles.toolbar} data-reveal aria-label="Filter event photographs by school year">
        <div className={styles.filterGroup}>
          <button type="button" className={`${styles.filter} ${selectedYear === "all" ? styles.filterActive : ""}`} aria-pressed={selectedYear === "all"} onClick={() => setSelectedYear("all")}>All years</button>
          {categories.map(([yearKey, category]) => (
            <button key={yearKey} type="button" className={`${styles.filter} ${selectedYear === yearKey ? styles.filterActive : ""}`} aria-pressed={selectedYear === yearKey} onClick={() => setSelectedYear(yearKey)}>{category.span}</button>
          ))}
        </div>
        <span className={styles.count} aria-live="polite">{filteredItems.length} photographs</span>
      </div>

      <div className={styles.gallery}>
        {filteredItems.map((item) => (
          <figure className={styles.item} key={`${item.yearKey}-${item.image}`} data-reveal>
            <button
              type="button"
              className={styles.photoButton}
              aria-label={`Open full-size photograph: ${item.title}`}
              onPointerEnter={() => preload(item.image, pickRequestWidth())}
              onFocus={() => preload(item.image, pickRequestWidth())}
              onClick={(event) => {
                const image = event.currentTarget.querySelector("img");
                const requestWidth = pickRequestWidth();
                preload(item.image, requestWidth);
                setLightbox({
                  publicId: item.image,
                  title: item.title,
                  requestWidth,
                  previewWidth: image?.naturalWidth || 4,
                  previewHeight: image?.naturalHeight || 3,
                });
              }}
            >
              <div className={styles.photo}>
                <CloudinaryImage publicId={item.image} alt="" width={1200} height={900} sizes={gallerySizes} loading="lazy" decoding="async" draggable={false} />
                <figcaption className={styles.caption}><span>{item.title}</span><span>{item.year}</span></figcaption>
              </div>
            </button>
          </figure>
        ))}
      </div>

      {filteredItems.length === 0 ? <p className={styles.empty}>No photographs found for that year.</p> : null}
      <EventImageLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
