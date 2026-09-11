"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const easeInOutCubic = (progress: number) =>
  progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export default function MembershipCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      if (reducedMotion.matches) {
        element.style.transform = "translateY(0) scale(1)";
        return;
      }

      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const { top } = element.getBoundingClientRect();
      // Wait briefly after entry, then let the lift play out before scaling.
      // The longer viewport range makes the movement feel deliberate, rather
      // than snapping into its final presentation state.
      const progress = clamp(
        (viewportHeight * 0.88 - top) / (viewportHeight * 1.02),
        0,
        1,
      );
      const lift = easeInOutCubic(clamp(progress / 0.75, 0, 1));
      const scaleIn = easeInOutCubic(clamp((progress - 0.78) / 0.22, 0, 1));
      const translateY = 58 * (1 - lift);
      const scale = 0.78 + 0.22 * scaleIn;

      element.style.transform = `translateY(${translateY}px) scale(${scale})`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onScroll);
    reducedMotion.addEventListener("change", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      reducedMotion.removeEventListener("change", onScroll);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
