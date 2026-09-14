import Link from "next/link";
import { ArrowLeft, CalendarDays } from "lucide-react";
import InnerPageShell from "./components/InnerPageShell";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <InnerPageShell tone="rose">
      <section className={styles.missing} aria-labelledby="missing-title">
        <div className={styles.copy} data-reveal>
          <p className={styles.code}>404 · Side B is blank</p>
          <h1 id="missing-title">This track isn&apos;t on the tape.</h1>
          <p>The page may have moved, or the link took a wrong turn somewhere around Sherbrooke.</p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primary}>Back home <ArrowLeft size={17} aria-hidden /></Link>
            <Link href="/events" className={styles.secondary}>Browse events <CalendarDays size={17} aria-hidden /></Link>
          </div>
        </div>
        <div className={styles.cassette} data-photo-stack aria-hidden="true">
          <span className={styles.screwOne} /><span className={styles.screwTwo} />
          <div className={styles.label}><strong>MCSS</strong><span>LOST / FOUND</span><i /></div>
          <div className={styles.window}><span /><b>404</b><span /></div>
          <div className={styles.notch} />
        </div>
      </section>
    </InnerPageShell>
  );
}

