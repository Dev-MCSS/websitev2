'use client';

import { Facebook, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import type { SVGProps } from 'react';
import styles from './home-footer.module.css';

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socials = [
  { href: 'https://www.instagram.com/mcssfam/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.facebook.com/mcss.ca', label: 'Facebook', Icon: Facebook },
  { href: 'https://www.tiktok.com/@mcssfam', label: 'TikTok', Icon: TikTokIcon },
] as const;

const tileSlots = [null, socials[0], socials[1], socials[2], null, null, null, null, null] as const;

const links = [
  { href: '/events', label: 'Events' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/#membership_card', label: 'Membership' },
] as const;

export default function HomeFooter() {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="MCSS footer"
    >
      <div className={styles.shell}>
        <span className={`${styles.screw} ${styles.screwLeft}`} aria-hidden="true" />
        <span className={`${styles.screw} ${styles.screwRight}`} aria-hidden="true" />

        <nav className={styles.rack} aria-label="MCSS social media">
          <ul>
            {tileSlots.map((social, index) => {
              if (!social) {
                return (
                  <motion.li key={`tile-${index}`} className={styles.backTile} aria-hidden="true"
                    initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.05 + index * 0.035, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}>
                    <span />
                  </motion.li>
                );
              }
              const { href, label, Icon } = social;
              return (
                <motion.li key={href} className={styles.socialTile}
                  initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.05 + index * 0.035, duration: 0.46, ease: [0.22, 1, 0.36, 1] }}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Follow MCSS on ${label}`}>
                    <Icon aria-hidden="true" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.base}>
          <nav aria-label="Footer navigation">
            <ul>{links.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </nav>
          <p>McGill Chinese Students’ Society · Montréal · Since 1944</p>
          <p>© {new Date().getFullYear()} MCSS</p>
        </div>
      </div>
    </motion.footer>
  );
}
