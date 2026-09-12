import HomeNavbar from "./components/HomeNavbar";
import HomeHero from "./components/HomeHero";
import HomeMembership from "./components/HomeMembership";
import HomeFooter from "./components/HomeFooter";
import PrimaryButton from "./components/PrimaryButton";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div id="top" className={styles.home}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <HomeNavbar />
      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <section className={styles.overview} aria-labelledby="overview-heading">
          <h2 id="overview-heading">overview</h2>
          <p>
            McGill Chinese Students’ Society (MCSS) is the most largest and influential
            cultural student organization in Eastern Canada.
          </p>
          <p>
            We strive to enrich student life at McGill by creating meaningful experiences
            that celebrate Chinese heritage, foster personal and academic growth, and build
            lasting friendships. Whether it’s through festive cultural events, fun nights out,
            or casual dinners, our goal is to create a welcoming and dynamic space for students
            from all backgrounds.
          </p>
          <p>
            If you’re looking to connect with your culture, meet new people, or simply get more
            out of your university experience, MCSS welcomes you to be part of our story.
          </p>
          <p>
            Established in{' '}
            <a
              className={styles.historyLink}
              href="https://200.mcgill.ca/history/the-mcgill-chinese-students-society-and-the-nisei-club/"
              target="_blank"
              rel="noreferrer"
            >
              1944
            </a>
            .
          </p>
          <PrimaryButton href="/about" className={styles.overviewCta}>About</PrimaryButton>
        </section>
        <HomeMembership />
      </main>
      <HomeFooter />
    </div>
  );
}
