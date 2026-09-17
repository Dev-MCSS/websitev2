"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home-exec-camera.module.css";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const publicId = "mcss/home/recruitment-video";
const videoUrl = cloudName
  ? `https://res.cloudinary.com/${cloudName}/video/upload/q_auto:eco,w_1080/${publicId}.mp4`
  : undefined;
const posterUrl = cloudName
  ? `https://res.cloudinary.com/${cloudName}/video/upload/so_1,w_720,q_auto:eco/${publicId}.jpg`
  : undefined;

export default function RecruitmentVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (!videoUrl) return null;

  return (
    <div ref={containerRef} className={styles.recruitmentVideo}>
      <video
        aria-label="MCSS recruitment video"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={posterUrl}
        src={shouldLoad ? videoUrl : undefined}
      />
    </div>
  );
}
