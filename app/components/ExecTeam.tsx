import { Flower } from "lucide-react";
import { GFS_Didot } from "next/font/google";

import CloudinaryImage from "./CloudinaryImage";

const gfsDidot = GFS_Didot({
  weight: "400",
  subsets: ["greek"],
  display: "swap",
});

const titleGradientText = {
  backgroundImage:
    "linear-gradient(to top right, #F5C834, #F11C1C)",
  WebkitBackgroundClip: "text" as const,
  backgroundClip: "text" as const,
  color: "transparent",
  WebkitTextFillColor: "transparent",
};

const iconGlow = { filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))" };

export default function ExecTeam() {
  return (
    <section className="ds-container py-8">
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-black/50 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 pt-5 sm:px-6 sm:pt-6">
          <div className="flex flex-col drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <h2 className="ds-text-title text-white">Executive Team</h2>
            <span className="ds-text-body-sm text-white/80">2024 – 2025</span>
          </div>
        </div>
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
