"use client";

import { useEffect, useRef, useState } from "react";

export default function GradientPill({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="gradient-pill-wrap">
      <div
        className={`gradient-pill-border ${visible ? "gradient-pill-active" : ""}`}
      >
        <div className="rounded-full bg-white px-6 py-2">{children}</div>
      </div>
    </div>
  );
}
