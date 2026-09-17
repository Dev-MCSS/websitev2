"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HomeNavbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";
import styles from "./inner-page.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type InnerPageShellProps = {
  children: ReactNode;
  tone?: "rose" | "amber" | "ink" | "home";
};

export default function InnerPageShell({
  children,
  tone = "rose",
}: InnerPageShellProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef} className={`${styles.page} ${styles[tone]}`}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <HomeNavbar />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <HomeFooter />
    </div>
  );
}
