"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const START = {
  opacity: 0,
  scale: 0.75,
  translateX: -5,
  translateY: -18,
  rotateX: 30,
  rotateY: -40,
  rotateZ: 10,
};

const END = {
  opacity: 1,
  scale: 1,
  translateX: -5,
  translateY: 0,
  rotateX: 12,
  rotateY: -27,
  rotateZ: 4,
};

export default function ScrollRevealCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) {
      if (el) {
        el.style.opacity = "1";
        // Match the "end" transform composition used during scroll.
        el.style.transform = `translateX(${END.translateX}%) translateY(${END.translateY}px) scale(${END.scale}) rotateY(${END.rotateY}deg) rotateX(${END.rotateX}deg) rotateZ(${END.rotateZ}deg)`;
      }
      return;
    }

    let rafId: number;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // Use the visual viewport for iOS/Android browsers where innerHeight can
      // change while the browser chrome collapses/expands during scroll.
      const vvp = window.visualViewport;
      const viewH = vvp?.height ?? window.innerHeight;

      // progress: 0 when element top enters the bottom of viewport,
      //           1 when element center reaches 40% from top of viewport
      const triggerStart = viewH;
      const triggerEnd = viewH * 0.4;
      // Align rect measurements to the visual viewport.
      const elementCenter =
        rect.top + rect.height / 2 - (vvp?.offsetTop ?? 0);
      const raw = (triggerStart - elementCenter) / (triggerStart - triggerEnd);
      const t = easeOutCubic(clamp(raw, 0, 1));

      const opacity = lerp(START.opacity, END.opacity, t);
      const scale = lerp(START.scale, END.scale, t);
      const tx = lerp(START.translateX, END.translateX, t);
      const ty = lerp(START.translateY, END.translateY, t);
      const rx = lerp(START.rotateX, END.rotateX, t);
      const ry = lerp(START.rotateY, END.rotateY, t);
      const rz = lerp(START.rotateZ, END.rotateZ, t);

      el.style.opacity = String(opacity);
      el.style.transform = `translateX(${tx}%) translateY(${ty}px) scale(${scale}) rotateY(${ry}deg) rotateX(${rx}deg) rotateZ(${rz}deg)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onVisualViewportResize = () => {
      // Keep the animation stable when the address bar / browser chrome changes.
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", onVisualViewportResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener(
        "resize",
        onVisualViewportResize,
      );
    };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d",
        willChange: "transform, opacity",
        opacity: 0,
      }}
    >
      {children}
    </div>
  );
}
