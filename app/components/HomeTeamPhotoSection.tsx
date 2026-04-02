import { Flower } from "lucide-react";

import CloudinaryImage from "./CloudinaryImage";

const titleGradientText = {
  backgroundImage:
    "linear-gradient(to top right, #F5C834, #F11C1C)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const iconGlow = { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" };

export default function HomeTeamPhotoSection() {
  return (
    <section className="ds-container py-8">
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-linear-to-b from-black/55 to-transparent"
          aria-hidden
        />
        <h2 className="absolute inset-x-0 top-0 z-20 flex items-center justify-center gap-2 px-4 pt-6 sm:gap-4">
          <Flower
            className="size-5 shrink-0 text-(--palette-neutral-0) sm:size-6"
            strokeWidth={2}
            aria-hidden
            style={iconGlow}
          />
          <div className="rounded-lg bg-black/50 px-2 py-1 backdrop-blur-md sm:px-3 sm:py-2">
            <span
              className="min-w-0 ds-text-headline text-center font-semibold"
              style={titleGradientText}
            >
              Exec team 2024 - 2025
            </span>
          </div>
          <Flower
            className="size-5 shrink-0 text-(--palette-neutral-0) sm:size-6"
            strokeWidth={2}
            aria-hidden
            style={iconGlow}
          />
        </h2>
        <CloudinaryImage
          publicId="mcss/team/group"
          alt="MCSS team group"
          width={1600}
          height={900}
          sizes="100vw"
          className="h-auto w-full rounded-lg"
        />
      </div>
    </section>
  );
}
