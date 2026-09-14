import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import CloudinaryImage from "../components/CloudinaryImage";
import InnerPageShell from "../components/InnerPageShell";
import shell from "../components/inner-page.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — MCSS",
  description: "Meet the McGill Chinese Students’ Society — bringing culture, community, and friendship to McGill since 1944.",
};

const MCGILL_MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.102574089894!2d-73.57972132374357!3d45.50473487910113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c6eaf01%3A0x3c6d176cb9152745!2sMcGill%20University!5e0!3m2!1sen!2sca!4v1709222400000!5m2!1sen!2sca";

export default function AboutPage() {
  return (
    <InnerPageShell tone="ink">
      <section className={shell.hero} aria-labelledby="about-title">
        <div className={shell.heroCopy} data-reveal>
          <p className={shell.kicker}>At McGill since 1944</p>
          <h1 id="about-title">Eighty years of finding <em>your people.</em></h1>
          <p className={shell.lede}>
            MCSS creates a welcoming place to celebrate Chinese heritage, try
            something new, and build friendships that last beyond campus.
          </p>
          <div className={shell.heroActions}>
            <a className={shell.inkButton} href="#our-story">Read our story <ArrowDown size={17} aria-hidden /></a>
            <Link className={shell.paperButton} href="/events">See us in action <ArrowRight size={17} aria-hidden /></Link>
          </div>
        </div>

        <div className={`${styles.dossier} ${shell.paperPanel}`} data-photo-stack>
          <div className={styles.tab}>MCSS · Montréal</div>
          <div className={styles.groupPhoto}>
            <CloudinaryImage publicId="mcss/team/group" alt="The MCSS executive team together" fill priority sizes="(min-width: 861px) 40vw, 85vw" />
          </div>
          <div className={styles.dossierMeta}>
            <span>Chinese Students’ Society</span><span>McGill University</span>
          </div>
        </div>
      </section>

      <section id="our-story" className={`${shell.section} ${styles.story}`} aria-labelledby="story-title">
        <div className={shell.sectionHeading} data-reveal>
          <p className={shell.kicker}>Rooted here, growing forward</p>
          <h2 id="story-title">A community with history</h2>
        </div>
        <div className={styles.timeline}>
          <article className={styles.origin} data-reveal>
            <p className={styles.year}>1944</p>
            <h3>It starts with belonging.</h3>
            <p>MCSS is founded at McGill, creating a student-led space for cultural connection and mutual support.</p>
            <a href="https://200.mcgill.ca/history/the-mcgill-chinese-students-society-and-the-nisei-club/" target="_blank" rel="noreferrer">Explore the McGill archive <ArrowRight size={16} aria-hidden /></a>
          </article>
          <article className={styles.now} data-reveal>
            <p className={styles.year}>Today</p>
            <h3>More than 1,500 active members.</h3>
            <p>Now one of Eastern Canada&apos;s largest cultural student organizations, MCSS welcomes students from every background.</p>
          </article>
          <article className={styles.always} data-reveal>
            <p className={styles.year}>Always</p>
            <h3>Built by students, for students.</h3>
            <p>As an SSMU-recognized non-profit, proceeds support charitable causes and future member programming.</p>
          </article>
        </div>
      </section>

      <section className={`${shell.section} ${styles.values}`} aria-labelledby="values-title">
        <div className={shell.sectionHeading} data-reveal>
          <p className={shell.kicker}>What brings us together</p>
          <h2 id="values-title">Culture is something you do</h2>
        </div>
        <div className={styles.valueGrid}>
          <article className={styles.valueLarge} data-reveal><span>Heritage</span><h3>Celebrate heritage</h3><p>Traditions feel most alive when they are shared, remixed, taught, and enjoyed together.</p></article>
          <article className={styles.valueTall} data-reveal><span>Belonging</span><h3>Make room</h3><p>Whether you grew up close to Chinese culture or are meeting it for the first time, there is a seat for you.</p></article>
          <article className={styles.valueSmall} data-reveal><span>Growth</span><h3>Grow together</h3><p>Academic, professional, and personal growth all get easier with a community beside you.</p></article>
        </div>
      </section>

      <section className={`${shell.section} ${styles.location}`} aria-labelledby="location-title">
        <div className={styles.locationCopy} data-reveal>
          <p className={shell.kicker}>Our home base</p>
          <h2 id="location-title">Find us downtown.</h2>
          <p>Our community is rooted on McGill&apos;s downtown campus in the heart of Montréal, Québec.</p>
          <a href="https://maps.google.com/?q=McGill+University+Montreal" target="_blank" rel="noreferrer" className={shell.paperButton}>Open in Maps <MapPin size={17} aria-hidden /></a>
        </div>
        <div className={styles.map} data-reveal>
          <iframe title="Map of McGill University, Montréal" src={MCGILL_MAP_EMBED_SRC} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>
      </section>

      <aside className={shell.cta} data-reveal aria-labelledby="about-cta-title">
        <div><h2 id="about-cta-title">There’s more room in the family.</h2><p>The easiest way to understand MCSS is to join us at the next event.</p></div>
        <Link className={shell.paperButton} href="/events">Browse events</Link>
      </aside>
    </InnerPageShell>
  );
}
