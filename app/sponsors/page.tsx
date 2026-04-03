import type { Metadata } from "next";
import { sponsorTotalCount } from "@/data/sponsors";
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
          <div className="ds-container-text">
            <h1 className="ds-text-display">Sponsors</h1>
            <p className="ds-text-body max-w-2xl">
              {sponsorTotalCount} sponsors offering exclusive discounts for MCSS
              membership card holders across Montreal.
            </p>
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
