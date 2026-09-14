import Image from "next/image";
import CloudinaryImage from "./CloudinaryImage";
import styles from "./home-svg-camera.module.css";

export default function HomeSvgCamera() {
  return (
    <section className={styles.section} aria-label="Alternative compact-camera design">
      <figure className={styles.camera}>
        <CloudinaryImage
          publicId="mcss/team/group"
          alt="MCSS executive team group photo"
          width={1058}
          height={568}
          sizes="(min-width: 820px) 402px, 52vw"
          className={styles.photo}
        />
        <Image
          src="/images/home-redesign/mcss-compact-camera.svg"
          alt="Silver MCSS compact camera with a dangling beaded keychain"
          width={1000}
          height={760}
          className={styles.shell}
        />
      </figure>
    </section>
  );
}
