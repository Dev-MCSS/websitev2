"use client";

import { useRef, useState } from "react";
import { events } from "@/data/events";
import CategoryFilter from "../components/CategoryFilter";
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

const gallerySizes = "(max-width: 600px) calc(100vw - 48px), (max-width: 900px) 46vw, 30vw";
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const categories = Object.entries(events);
const filterOptions = [
  { value: "all", label: "All years" },
  ...categories.map(([yearKey, category]) => ({ value: yearKey, label: category.span })),
];
const items = categories.flatMap(([yearKey, category]) =>
  category.items.map((item) => ({ ...item, yearKey })),
);

function pickRequestWidth() {
  if (typeof window === "undefined") return 1600;
  return pickLightboxBreakpointWidth(
    window.innerWidth - 48,
    window.innerHeight - 128,
    window.devicePixelRatio,
  );
}

export default function EventsGallery() {
  const [selectedYear, setSelectedYear] = useState("all");
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const preloadedRef = useRef(new Set<string>());

  const filteredItems = selectedYear === "all"
    ? items
    : items.filter((item) => item.yearKey === selectedYear);

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
      <CategoryFilter options={filterOptions} selected={selectedYear} onSelect={setSelectedYear} ariaLabel="Filter photographs by school year" />

      <div className={styles.gallery}>
        {filteredItems.map((item) => (
          <figure className={styles.item} key={`${item.yearKey}-${item.image}`}>
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
              <span className={styles.photo}>
                <span className={styles.imageWindow}>
                  <CloudinaryImage publicId={item.image} alt="" width={1200} height={900} sizes={gallerySizes} loading="lazy" decoding="async" draggable={false} />
                </span>
                <span className={styles.caption}>{item.title}</span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {filteredItems.length === 0 ? <p className={styles.empty}>No photographs found for that year.</p> : null}
      <EventImageLightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
