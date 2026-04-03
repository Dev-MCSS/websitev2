"use client";

import { useState } from "react";
import { Grid2x2, List, MapPin } from "lucide-react";
import {
  sponsors,
  sponsorAddresses,
  type SponsorItem,
} from "@/data/sponsors";
import CloudinaryImage from "../components/CloudinaryImage";

type ViewMode = "gallery" | "list";

function mapsHref(name: string, addr: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + addr)}`;
}

function SponsorCard({ item }: { item: SponsorItem }) {
  const addresses = sponsorAddresses(item);

  return (
    <div className="ds-card flex flex-col overflow-hidden">
      <div className="relative flex aspect-square items-center justify-center bg-(--palette-neutral-50) p-4">
        <CloudinaryImage
          publicId={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
          className="object-contain object-center p-6"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-semibold">{item.name}</h3>

        <div className="flex items-start gap-2">
          <span className="font-medium">{item.discount}</span>
        </div>

        <div className="flex items-start gap-2 text-muted">
          <MapPin
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <div className="ds-text-body-sm">
            {addresses.map((addr, i) => (
              <span key={addr}>
                {i > 0 && ", "}
                <a
                  href={mapsHref(item.name, addr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-muted/40 underline-offset-2 transition-colors hover:text-foreground"
                >
                  {addr}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorRow({ item }: { item: SponsorItem }) {
  const addresses = sponsorAddresses(item);

  return (
    <div className="grid items-center gap-x-4 gap-y-3 border-b border-border px-3 py-3 last:border-b-0 grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_1fr] md:gap-y-0">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-(--palette-neutral-50) row-span-2 md:row-span-1">
        <CloudinaryImage
          publicId={item.image}
          alt={item.name}
          fill
          sizes="40px"
          className="object-contain object-center p-1.5"
        />
      </div>

      <div className="min-w-0">
        <h3 className="ds-text-body-sm font-semibold">{item.name}</h3>
        <div className="flex items-start gap-1.5 text-muted">
          <MapPin size={12} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span className="ds-text-caption">
            {addresses.map((addr, i) => (
              <span key={addr}>
                {i > 0 && ", "}
                <a
                  href={mapsHref(item.name, addr)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-muted/40 underline-offset-2 transition-colors hover:text-foreground"
                >
                  {addr}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>

      <span className="ds-text-caption font-medium col-start-2 md:col-start-auto">
        {item.discount}
      </span>
    </div>
  );
}

export default function SponsorsView() {
  const [view, setView] = useState<ViewMode>("gallery");
  const categories = Object.entries(sponsors);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setView("gallery")}
          aria-pressed={view === "gallery"}
          className={`ds-btn min-h-0! gap-2! px-3! py-2! ${view === "gallery" ? "bg-accent! text-accent-fg! border-transparent!" : ""}`}
        >
          <Grid2x2 size={18} strokeWidth={2} aria-hidden />
          <span className="ds-text-body-sm">Gallery View</span>
        </button>
        <button
          type="button"
          onClick={() => setView("list")}
          aria-pressed={view === "list"}
          className={`ds-btn min-h-0! gap-2! px-3! py-2! ${view === "list" ? "bg-accent! text-accent-fg! border-transparent!" : ""}`}
        >
          <List size={18} strokeWidth={2} aria-hidden />
          <span className="ds-text-body-sm">List View</span>
        </button>
      </div>

      <div className="flex flex-col gap-12 pb-8">
        {categories.map(([key, category]) => (
          <section key={key} aria-labelledby={`cat-${key}`}>
            <h2
              id={`cat-${key}`}
              className="ds-text-title mb-6 border-b border-border pb-3"
            >
              {category.span}
            </h2>

            {view === "gallery" ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {category.items.map((item) => (
                  <SponsorCard key={item.image} item={item} />
                ))}
              </div>
            ) : (
              <div className="ds-card overflow-hidden">
                {category.items.map((item) => (
                  <SponsorRow key={item.image} item={item} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
