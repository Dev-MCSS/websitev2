import localFont from "next/font/local";
import HomeNavbar from "./components/HomeNavbar";
import HomeHero from "./components/HomeHero";
import HomeMembership from "./components/HomeMembership";
import styles from "./home.module.css";

const dmMono = localFont({
  src: "../public/fonts/dm-mono-medium.ttf",
  weight: "500",
  style: "normal",
  variable: "--font-dm-mono",
  display: "swap",
});

export default function Home() {
  return (
    <div id="top" className={`${styles.home} ${dmMono.variable}`}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <HomeNavbar />
      <main id="main-content" tabIndex={-1}>
        <HomeHero />
        <section className={styles.overview} aria-labelledby="overview-heading">
          <h2 id="overview-heading">overview</h2>
          <p>
            McGill Chinese Students’ Society (MCSS) is one of the largest and most
            influential cultural student organizations in Eastern Canada.
          </p>
          <p>
            We bring students together through cultural celebrations, social events,
            and community initiatives, creating a welcoming space to experience
            Chinese culture, foster friendships, and shape memories.
          </p>
          <p>Established in 1944.</p>
        </section>
        <HomeMembership />
      </main>
    </div>
  );
}
