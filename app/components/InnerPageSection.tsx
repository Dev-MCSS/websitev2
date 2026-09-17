import type { ReactNode } from "react";
import MetallicHeroTitle from "./MetallicHeroTitle";
import styles from "./inner-page-section.module.css";

export default function InnerPageSection({
  title,
  titleId,
  children,
}: {
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <MetallicHeroTitle id={titleId}>{title}</MetallicHeroTitle>
      {children}
    </section>
  );
}
