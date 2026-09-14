import Image from "next/image";
import CloudinaryImage from "./CloudinaryImage";
import styles from "./home-exec-camera.module.css";

export default function HomeExecCamera() {
  return (
    <section className={styles.section} aria-labelledby="exec-heading">
      <figure className={styles.camera}>
        <CloudinaryImage
          publicId="mcss/team/group"
          alt="MCSS executive team group photo"
          width={1521}
          height={1008}
          sizes="(min-width: 820px) 536px, 70vw"
          className={styles.teamPhoto}
        />
        <Image
          src="/images/home-redesign/mcss-cam.svg"
          alt=""
          aria-hidden="true"
          width={718}
          height={576}
          className={styles.cameraShell}
        />
      </figure>

      <div className={styles.infoPanel}>
        <h2 id="exec-heading">Exec Team</h2>
        <p>
          The people behind the memories, events, and late-night group chats.
          Recruitment begins at the start of every school year—keep an eye on
          our socials to join the next MCSS fam.
        </p>
      </div>
    </section>
  );
}
