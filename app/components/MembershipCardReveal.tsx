"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import styles from "./home-membership.module.css";

export default function MembershipCardReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const resetTilt = () => {
    const element = ref.current;
    element?.style.setProperty("--tilt-x", "0deg");
    element?.style.setProperty("--tilt-y", "0deg");
  };

  const tiltCard = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    element.style.setProperty("--tilt-x", `${(0.5 - y) * 8}deg`);
    element.style.setProperty("--tilt-y", `${(x - 0.5) * 10}deg`);
    element.style.setProperty("--pointer-x", `${x * 100}%`);
    element.style.setProperty("--pointer-y", `${y * 100}%`);
  };

  return (
    <div
      ref={ref}
      className={styles.cardFrame}
      onPointerMove={tiltCard}
      onPointerLeave={resetTilt}
      onPointerCancel={resetTilt}
    >
      {children}
    </div>
  );
}
