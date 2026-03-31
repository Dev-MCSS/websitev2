"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";

export interface HeroSlide {
  title: string;
  year: string;
  src: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "CASINO NIGHT",
    year: "2025",
    src: "/images/optimized/home/casino_night_2025.JPG",
    alt: "Casino Night 2025 event",
  },
  {
    title: "JOHNNY CHAY",
    year: "2025",
    src: "/images/optimized/home/johnny.JPG",
    alt: "Johnny Orlando concert",
  },
  {
    title: "LNY MARKET",
    year: "2026",
    src: "/images/optimized/home/lny_market_2026.webp",
    alt: "Lunar New Year Market 2026",
  },
];

const CYCLE_MS = 6000;

function HeroEdgeVignette() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        zIndex: 2,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)",
      }}
      aria-hidden="true"
    />
  );
}

export default function HeroImageSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const activeSlide = HERO_SLIDES[activeIndex];

  const selectSlide = (i: number) => {
    setActiveIndex(i);
    setCycleKey((k) => k + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
      setCycleKey((k) => k + 1);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [cycleKey]);

  return (
    <>
      <div className="absolute inset-0 bg-black" />

      {HERO_SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className="object-cover transition-opacity duration-700 ease-(--ds-ease-standard) motion-reduce:duration-0"
          style={{
            zIndex: i === activeIndex ? 1 : 0,
            opacity: i === activeIndex ? 1 : 0,
          }}
        />
      ))}

      <HeroEdgeVignette />

      <div className="absolute inset-x-12 top-[35%] z-4">
        <h1
          className="text-white"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 3rem)",
            lineHeight: 1.2,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 16px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
          }}
        >
          The largest and most influential
          <br className="hidden md:block" />
          <span className="md:pl-16">
            {" "}cultural student organization in Eastern Canada.
          </span>
        </h1>
      </div>

      <div className="absolute inset-x-6 bottom-6 z-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex shrink-0 items-center gap-3 rounded-md bg-white p-2 shadow-ds-2"
        role="group"
        aria-label="Hero image switcher"
      >
        <div className="relative flex items-center gap-2">
          {/* Floating selection frame — slides to the active thumbnail */}
          <div
            className="pointer-events-none absolute top-0 left-0 z-10 size-10 overflow-hidden rounded-sm outline-[3px] outline-offset-1 outline-[#D82C2C] transition-transform duration-300 ease-(--ds-ease-standard)"
            style={{
              transform: `translateX(calc(${activeIndex} * (var(--spacing-10) + var(--spacing-2))))`,
            }}
          >
            <div
              key={cycleKey}
              className="absolute bottom-1 left-0 size-1 rounded-full bg-white"
              style={{
                animation: `hero-dot ${CYCLE_MS}ms linear`,
                boxShadow: "0 0 3px rgba(255,255,255,0.8)",
              }}
            />
          </div>

          {HERO_SLIDES.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => selectSlide(i)}
                aria-label={`Show ${slide.title} ${slide.year}`}
                aria-pressed={isActive}
                className={`relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-sm transition-opacity duration-(--ds-duration-fast) ease-(--ds-ease-standard) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive ? "" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={slide.src}
                  alt=""
                  width={40}
                  height={40}
                  sizes="40px"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          {/* <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-[#D82C2C]">
            <Star size={20} strokeWidth={2} className="text-white" />
          </div> */}
          <div
            className="flex h-10 items-center gap-6 rounded-sm px-3"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(220,30,30,0.7)), rgba(9,9,11,0.95)",
              boxShadow:
                "inset 0 0 10px rgba(220,30,30,0.5), inset 0 0 24px rgba(220,30,30,0.2), inset 0 0 1px rgba(220,30,30,0.6)",
            }}
          >
            <span className="ds-text-body whitespace-nowrap font-medium text-white">
              {activeSlide.title}
            </span>
            <span className="ds-text-body whitespace-nowrap font-normal text-white/60">
              {activeSlide.year}
            </span>
          </div>
        </div>
      </div>

      <p className="flex items-center gap-1 text-white/70">
        <MapPin size={14} strokeWidth={2} />
        <span className="text-sm font-medium tracking-normal">
          Montreal, QC
        </span>
      </p>
      </div>
    </>
  );
}
