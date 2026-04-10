import type { Metadata } from "next";
import { sponsorTotalCount } from "@/data/sponsors";
import CloudinaryImage from "../components/CloudinaryImage";
import HeroNavbar from "../components/HeroNavbar";
import Footer from "../components/Footer";
import SponsorsView from "./SponsorsView";

export const metadata: Metadata = {
  title: "Sponsors — MCSS",
  description:
    "Browse all MCSS membership card sponsors offering exclusive discounts across Montreal.",
};

export default function SponsorsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <HeroNavbar />

      <div className="ds-container" style={{ paddingTop: 84 }}>
        <div className="ds-container-surface-warm-gradient mb-6">
          <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:flex-row lg:items-start lg:gap-4">
            <div className="flex flex-1 flex-col gap-4 lg:min-w-[20rem] lg:basis-[52%]">
              <h1 className="ds-text-display font-semibold">Sponsors</h1>
              <p className="ds-text-body max-w-2xl font-semibold!">
                Explore {sponsorTotalCount} sponsors offering exclusive discounts
                for MCSS 2025-2026 school year membership card holders across
                Montreal.
              </p>
            </div>
            <div className="flex w-full shrink-0 justify-end lg:basis-[48%] lg:self-start">
              <div className="w-full overflow-hidden rounded-lg lg:max-h-[40vh] lg:w-auto lg:shrink-0">
                <CloudinaryImage
                  publicId="mcss/card/membership_card"
                  alt="MCSS membership card"
                  width={1400}
                  height={880}
                  sizes="(min-width: 1024px) min(42vw, 560px), 100vw"
                  className="h-auto w-full object-contain object-center lg:max-h-[40vh] lg:w-auto lg:max-w-[min(100%,42vw)] lg:object-right"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SponsorsView />
        </div>
      </div>

      <Footer />
    </main>
  );
}
