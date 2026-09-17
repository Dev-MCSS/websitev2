import localFont from "next/font/local";
import type { ReactNode } from "react";
import styles from "./metallic-hero-title.module.css";

const bogartAlt = localFont({
  src: "../../public/fonts/bogart-alt-semibold-trial.ttf",
  weight: "600",
  style: "normal",
  display: "swap",
});

type MetallicHeroTitleProps = {
  id: string;
  children: ReactNode;
};

export default function MetallicHeroTitle({ id, children }: MetallicHeroTitleProps) {
  return <h1 id={id} className={`${styles.title} ${bogartAlt.className}`}>{children}</h1>;
}
