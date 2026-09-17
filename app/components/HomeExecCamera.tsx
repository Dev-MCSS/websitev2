import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
          height={511}
          className={styles.cameraShell}
        />
      </figure>

      <div className={styles.infoPanel}>
        <h2 id="exec-heading">Exec Team</h2>
        <p>
          If you&apos;ve ever wanted to be a part of a loving and caring family,
          help plan exciting events and make friends with the drippiest swag,
          then MCSS is the perfect place for you!
        </p>
        <p>Fall 2026 recruitment is now open:</p>
        <a
          className={styles.recruitmentButton}
          href="https://forms.gle/iEyxY9UDWwKjEtSn6?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAcGRvZgJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAac5O8AVDCnO5n8368-nIWPZ0au_1SiLwDwGCxJa8RmseFWohBheA5bHwmyxHg_aem_5pOGAYXMAgrEkWo9U-kmfg"
          target="_blank"
          rel="noreferrer"
        >
          <span>Apply Now</span>
          <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
