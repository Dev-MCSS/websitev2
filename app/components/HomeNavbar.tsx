'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import styles from './home-navbar.module.css';

const destinations = [
  { href: '/events', label: 'Events' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/about', label: 'About' },
];

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);
  const island = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigationId = useId();

  // Next keeps recently visited routes mounted but hidden. A menu is transient UI,
  // so reset it before this route is cached instead of restoring a stale dropdown.
  useLayoutEffect(() => {
    return () => setOpen(false);
  }, []);

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
                <Link href={item.href} onNavigate={() => setOpen(false)}>
                  <span className={styles.linkLabel}>{item.label}</span>
                  <ArrowUpRight className={styles.linkArrow} aria-hidden="true" strokeWidth={1.5} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
