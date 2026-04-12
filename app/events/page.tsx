import type { Metadata } from "next";
import Image from "next/image";
import HeroNavbar from "../components/HeroNavbar";
import Footer from "../components/Footer";
import EventsGallery from "./EventsGallery";

export const metadata: Metadata = {
  title: "Events — MCSS",
  description:
    "Parties, cultural celebrations, competitions, and more — see highlights from recent MCSS school years.",
};

export default function EventsPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <HeroNavbar />

      <div className="ds-container" style={{ paddingTop: 84 }}>
        <div className="ds-container-surface-dark-gradient mb-6">
          <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:flex-row lg:items-start lg:gap-4">
            <div className="flex flex-1 flex-col gap-4 lg:min-w-[20rem] lg:basis-[52%]">
              <h1 className="ds-text-display font-semibold">Events</h1>
              <p className="ds-text-body max-w-2xl font-semibold">
                We host a wide range of events, including parties, cultural
                celebrations, competitions, and more!
              </p>
            </div>
            <div className="flex w-full shrink-0 justify-end lg:basis-[48%] lg:self-start">
              <div className="w-full overflow-hidden rounded-lg lg:max-h-[40vh] lg:w-auto lg:shrink-0">
                <Image
                  src="/images/optimized/home/casino_night_2025.JPG"
                  alt="MCSS event highlight"
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
          <EventsGallery />
        </div>
      </div>

      <Footer />
    </main>
  );
}
