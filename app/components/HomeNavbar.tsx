'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import styles from './home-navbar.module.css';

const destinations = [
  { href: '/events', label: 'Events', detail: 'Make a few memories' },
  { href: '/sponsors', label: 'Sponsors', detail: 'Meet our community partners' },
  { href: '/about', label: 'About', detail: 'Get to know MCSS' },
  { href: '/#membership_card', label: 'Membership', detail: 'Find your place in the fam' },
];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const island = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigationId = useId();

  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !island.current?.contains(event.target)) setOpen(false);
    };
    const dismissEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissEscape);
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <div
        ref={island}
        className={`${styles.island} ${open ? styles.open : ''}`}
        onBlur={(event) => {
          if (event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <div className={styles.bar}>
          <a
            href="#top"
            className={styles.brand}
            aria-label="MCSS home"
            onClick={() => setOpen(false)}
          >
            <Image src="/images/optimized/logo/mcss-logo.webp" alt="" width={72} height={40} />
          </a>
          <div className={styles.tapeWindow} aria-hidden="true">
            <span className={styles.reel}><span /></span>
            <span className={styles.tapeLabel}>MCSS · SIDE A</span>
            <span className={styles.reel}><span /></span>
          </div>
          <button
            ref={toggle}
            className={styles.toggle}
            type="button"
            aria-expanded={open}
            aria-controls={navigationId}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen((previous) => !previous)}
          >
            <span className={styles.menuLabel}>{open ? 'Close' : 'Menu'}</span>
            <span className={styles.icon} aria-hidden="true"><span /><span /></span>
          </button>
        </div>
        <nav id={navigationId} aria-label="Main navigation" className={styles.navigation} inert={!open} aria-hidden={!open}>
          <ul className={styles.links}>
            {destinations.map((item, index) => (
              <li key={item.href} style={{ '--link-delay': `${40 + index * 45}ms` } as CSSProperties}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span><span className={styles.linkLabel}>{item.label}</span><span className={styles.detail}>{item.detail}</span></span>
                  <span className={styles.index} aria-hidden="true">0{index + 1} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
