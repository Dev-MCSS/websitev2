import type { Metadata } from "next";
import HeroNavbar from "../components/HeroNavbar";
import Footer from "../components/Footer";
import CloudinaryImage from "../components/CloudinaryImage";

export const metadata: Metadata = {
  title: "About — MCSS",
  description:
    "McGill Chinese Students' Society (MCSS) — Eastern Canada's largest cultural student organization, serving McGill since 1944.",
};

/** Share → Embed map (McGill University, Montreal). */
const MCGILL_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.102574089894!2d-73.57972132374357!3d45.50473487910113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c6eaf01%3A0x3c6d176cb9152745!2sMcGill%20University!5e0!3m2!1sen!2sca!4v1709222400000!5m2!1sen!2sca";

export default function AboutPage() {
  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col">
      <HeroNavbar />

      <div className="ds-container min-w-0" style={{ paddingTop: 84 }}>
        <div className="ds-container-surface-dark-gradient mb-6">
          <div className="grid grid-cols-1 gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:grid-cols-2 lg:items-start lg:gap-4">
            <div className="min-w-0 flex flex-col gap-4">
              <h1 className="ds-text-display font-semibold">About us</h1>
              <div className="flex min-w-0 max-w-2xl flex-col gap-4">
                <p className="ds-text-body font-semibold">
                  McGill Chinese Students&apos; Society (MCSS) is the largest and
                  most influential cultural student organization in Eastern
                  Canada. We strive to enrich student life at McGill by creating
                  meaningful experiences that celebrate Chinese heritage, foster
                  personal and academic growth, and build lasting friendships.
                </p>
              </div>
            </div>
            <div className="min-w-0 w-full">
              <div className="w-full overflow-hidden rounded-lg lg:max-h-[40vh]">
                <CloudinaryImage
                  publicId="mcss/team/group"
                  alt="MCSS members group photo"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) min(50vw, 720px), 100vw"
                  className="h-auto w-full lg:max-h-[40vh] lg:object-cover lg:object-right"
                />
              </div>
            </div>
          </div>
        </div>

        <section
          aria-labelledby="about-community-heading"
          className="mb-8 overflow-hidden rounded-lg border border-(--palette-neutral-200) bg-background pb-6"
        >
          <div className="grid min-w-0 grid-cols-1 gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:grid-cols-2 lg:items-start lg:gap-4">
            <div className="min-w-0 flex max-w-2xl flex-col gap-4">
              <h2
                id="about-community-heading"
                className="ds-text-title font-semibold text-foreground"
              >
                Our community
              </h2>
              <p className="ds-text-body text-muted">
                Founded in 1944, MCSS serves a vibrant community of over 1,500
                active members. As a non-profit organization officially
                recognized under the Students&apos; Society of McGill University
                (SSMU), all proceeds from our events are reinvested to support
                charitable causes and enhance future programming for our members.
              </p>
              <p className="ds-text-body text-muted">
                Our community is rooted on McGill&apos;s downtown campus in
                Montreal, Quebec.
              </p>
            </div>
            <div className="min-w-0 w-full">
              <div className="overflow-hidden rounded-lg shadow-ds-1">
                <iframe
                  title="Map of McGill University, Montreal"
                  src={MCGILL_MAP_EMBED_SRC}
                  className="aspect-16/10 min-h-[280px] w-full border-0 sm:min-h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
