"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
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
  const yearOptions = useMemo(
    () =>
      categories.map(([yearKey, category]) => ({
        yearKey,
        label: category.span,
      })),
    [categories],
  );
  const allYearKeys = useMemo(
    () => yearOptions.map((option) => option.yearKey),
    [yearOptions],
  );
  const [selectedYearKeys, setSelectedYearKeys] = useState<string[]>(allYearKeys);
  const selectedYearSet = useMemo(
    () => new Set(selectedYearKeys),
    [selectedYearKeys],
  );
  const allYearsSelected =
    selectedYearKeys.length === allYearKeys.length && allYearKeys.length > 0;
  const selectedYearPills = useMemo(() => {
    if (allYearsSelected || selectedYearKeys.length === 0) return ["All Years"];
    return yearOptions
      .filter((option) => selectedYearSet.has(option.yearKey))
      .map((option) => option.label);
  }, [allYearsSelected, selectedYearKeys.length, selectedYearSet, yearOptions]);

  const galleryItems = useMemo(
    () =>
      categories.flatMap(([yearKey, category]) =>
        category.items.map((item) => ({
          ...item,
          yearKey,
        })),
      ),
    [categories],
  );
  const filteredItems = useMemo(() => {
    if (selectedYearSet.size === 0 || allYearsSelected) return galleryItems;
    return galleryItems.filter((item) => selectedYearSet.has(item.yearKey));
  }, [allYearsSelected, galleryItems, selectedYearSet]);

  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const preloadedRef = useRef(new Set<string>());
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFilterOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isFilterOpen]);

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
      <div className="flex flex-col gap-6 pb-8">
        <div className="flex flex-wrap items-center justify-start gap-2">
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              aria-expanded={isFilterOpen}
              aria-haspopup="menu"
              onClick={() => setIsFilterOpen((open) => !open)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent bg-danger px-4 py-2 text-accent-fg transition-colors duration-150 ease-(--ds-ease-standard) hover:brightness-110"
            >
              <span className="ds-text-body-sm font-semibold">Filter by Year</span>
              <ChevronDown
                size={16}
                strokeWidth={2}
                className={`transition-transform duration-150 ease-(--ds-ease-standard) ${isFilterOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              className={`absolute left-0 z-20 mt-2 w-64 rounded-lg border border-border bg-(--palette-neutral-0) p-2 transition-all duration-150 ease-(--ds-ease-standard) ${
                isFilterOpen
                  ? "pointer-events-auto scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
              role="menu"
              aria-hidden={!isFilterOpen}
            >
              <label className="flex cursor-pointer items-center gap-3 rounded-md pl-2 pr-4 py-2 transition-colors duration-150 ease-(--ds-ease-standard) hover:bg-(--palette-neutral-100)">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={allYearsSelected}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedYearKeys(allYearKeys);
                    } else {
                      setSelectedYearKeys([]);
                    }
                  }}
                />
                <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm border border-danger bg-danger-muted text-transparent transition-colors duration-150 ease-(--ds-ease-standard) peer-checked:border-danger peer-checked:bg-danger peer-checked:text-accent-fg">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </span>
                <span className="ds-text-body-sm font-semibold text-(--palette-neutral-900)">
                  All Years
                </span>
              </label>
              <div className="my-2 h-px bg-border" />
              <div className="flex max-h-56 flex-col gap-1 overflow-y-auto">
                {yearOptions.map((option) => (
                  <label
                    key={option.yearKey}
                    className="flex cursor-pointer items-center gap-3 rounded-md pl-2 pr-4 py-2 transition-colors duration-150 ease-(--ds-ease-standard) hover:bg-(--palette-neutral-100)"
                  >
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={selectedYearSet.has(option.yearKey)}
                      onChange={(e) => {
                        setSelectedYearKeys((prev) => {
                          if (e.target.checked) {
                            if (prev.includes(option.yearKey)) return prev;
                            return [...prev, option.yearKey];
                          }
                          return prev.filter((yearKey) => yearKey !== option.yearKey);
                        });
                      }}
                    />
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm border border-danger bg-danger-muted text-transparent transition-colors duration-150 ease-(--ds-ease-standard) peer-checked:border-danger peer-checked:bg-danger peer-checked:text-accent-fg">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </span>
                    <span className="ds-text-body-sm text-(--palette-neutral-900)">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {selectedYearPills.map((label) => (
            <span
              key={label}
              className="ds-text-body-sm inline-flex items-center rounded-full border px-4 py-2 font-semibold"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--palette-danger) 18%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--palette-danger) 35%, transparent)",
                color: "var(--palette-danger)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          className="columns-2 md:columns-3 lg:columns-4"
          style={{ columnGap: "var(--spacing-4)" }}
        >
          {filteredItems.map((item) => (
            <div key={`${item.yearKey}-${item.image}`} className="mb-4 break-inside-avoid">
              <button
                type="button"
                className="group w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left transition-transform duration-200 ease-(--ds-ease-standard) motion-reduce:transition-none"
                aria-label={`Open preview: ${item.title}`}
                onPointerEnter={() =>
                  preloadLightboxImage(item.image, pickRequestWidth())
                }
                onFocus={() => preloadLightboxImage(item.image, pickRequestWidth())}
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

        {filteredItems.length === 0 ? (
          <p className="ds-text-body-sm text-(--palette-neutral-700)">
            No events found for the selected years.
          </p>
        ) : null}
      </div>

      <EventImageLightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}
