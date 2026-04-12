"use client";

import { useRef, useState } from "react";
import { events } from "@/data/events";
import CloudinaryImage from "../components/CloudinaryImage";
import EventImageLightbox from "./EventImageLightbox";
import {
  buildLightboxHighResSrc,
  pickLightboxBreakpointWidth,
} from "./lightboxImage";

type LightboxItem = {
  publicId: string;
  title: string;
  requestWidth: number;
  previewWidth: number;
  previewHeight: number;
};

const gallerySizes =
  "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 90vw";
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function pickRequestWidth() {
  if (typeof window === "undefined") return 1600;
  const width = window.innerWidth - 48;
  const height = window.innerHeight - 128;
  return pickLightboxBreakpointWidth(width, height, window.devicePixelRatio);
}

function buildLightboxSrc(publicId: string, requestWidth: number) {
  return buildLightboxHighResSrc(cloudName, publicId, requestWidth);
}

export default function EventsGallery() {
  const categories = Object.entries(events);
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const preloadedRef = useRef(new Set<string>());

  const preloadLightboxImage = (publicId: string, requestWidth: number) => {
    const src = buildLightboxSrc(publicId, requestWidth);
    if (!src || preloadedRef.current.has(src)) return;
    preloadedRef.current.add(src);
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  };

  return (
    <>
      <div className="flex flex-col gap-12 pb-8">
        {categories.map(([key, category]) => (
          <section key={key} aria-labelledby={`events-cat-${key}`}>
            <h2
              id={`events-cat-${key}`}
              className="ds-text-title mb-6 border-b border-border pb-3"
            >
              {category.span}
            </h2>

            <div
              className="columns-2 md:columns-3 lg:columns-4"
              style={{ columnGap: "var(--spacing-4)" }}
            >
              {category.items.map((item) => (
                <div
                  key={`${key}-${item.image}`}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    type="button"
                    className="group w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left transition-transform duration-200 ease-(--ds-ease-standard) motion-reduce:transition-none"
                    aria-label={`Open preview: ${item.title}`}
                    onPointerEnter={() =>
                      preloadLightboxImage(item.image, pickRequestWidth())
                    }
                    onFocus={() =>
                      preloadLightboxImage(item.image, pickRequestWidth())
                    }
                    onPointerDown={() =>
                      preloadLightboxImage(item.image, pickRequestWidth())
                    }
                    onClick={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      const requestWidth = pickRequestWidth();
                      preloadLightboxImage(item.image, requestWidth);
                      setLightbox({
                        publicId: item.image,
                        title: item.title,
                        requestWidth,
                        previewWidth: img?.naturalWidth || 4,
                        previewHeight: img?.naturalHeight || 3,
                      });
                    }}
                  >
                    <div className="overflow-hidden rounded-lg bg-(--palette-neutral-100)">
                      <div className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-(--ds-ease-standard) group-hover:scale-105 motion-reduce:group-hover:scale-100">
                        <CloudinaryImage
                          publicId={item.image}
                          alt=""
                          width={1200}
                          height={900}
                          sizes={gallerySizes}
                          className="h-auto w-full"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <EventImageLightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}
