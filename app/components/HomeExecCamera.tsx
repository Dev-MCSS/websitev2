import CloudinaryImage from "./CloudinaryImage";
import styles from "./home-exec-camera.module.css";

export default function HomeExecCamera() {
  return (
    <section className={styles.section} aria-labelledby="exec-heading">
      <div className={styles.camera}>
        <span className={styles.screwLeft} aria-hidden="true" />
        <span className={styles.screwRight} aria-hidden="true" />
        <span className={styles.shutter} aria-hidden="true" />
        <span className={styles.flash} aria-hidden="true" />

        <div className={styles.viewfinder}>
          <div className={styles.screenHeader} aria-hidden="true">
            <span>MCSS / 2026</span>
            <span className={styles.recording}>REC</span>
          </div>
          <CloudinaryImage
            publicId="mcss/team/group"
            alt="MCSS executive team group photo"
            width={1600}
            height={900}
            sizes="(min-width: 820px) 680px, calc(100vw - 72px)"
            className={styles.teamPhoto}
          />
        </div>

        <div className={styles.controls} aria-hidden="true">
          <span className={styles.mode}>MODE</span>
          <span className={styles.controlDial}>
            <i className={styles.directionUp} />
            <i className={styles.directionRight} />
            <i className={styles.directionDown} />
            <i className={styles.directionLeft} />
          </span>
          <span className={styles.display}>DISP</span>
        </div>

        <div className={styles.memoryCard} aria-hidden="true">
          <span className={styles.memoryLabel}>MCSS</span>
          <span className={styles.memoryType}>SIM CARD</span>
          <span className={styles.memoryCapacity}>1944</span>
          <span className={styles.memoryContacts}>
            <i /><i /><i /><i /><i /><i />
          </span>
        </div>
      </div>

      <div className={styles.infoPanel}>
        <h2 id="exec-heading">Meet the exec team</h2>
        <p>
          The people behind the memories, events, and late-night group chats.
          Recruitment begins at the start of every school year—keep an eye on
          our socials to join the next MCSS fam.
        </p>
      </div>
    </section>
  );
}
