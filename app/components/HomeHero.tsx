'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from 'react';
import { homePhotos } from '../../data/home-photos';
import styles from './home-hero.module.css';

const TURN_MS = 900;
const SWAP_FADE_MS = 350;
const SWAP_HALF_MS = SWAP_FADE_MS / 2;
const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
};
const getReducedMotion = () => window.matchMedia(reducedQuery).matches;
const getServerReducedMotion = () => true;

export default function HomeHero() {
  const [active, setActive] = useState(4);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [frontSlot, setFrontSlot] = useState<'a' | 'b'>('a');
  const [slotA, setSlotA] = useState(4);
  const [slotB, setSlotB] = useState(0);
  const [backSwapPhase, setBackSwapPhase] = useState<'out' | 'in' | null>(null);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, getServerReducedMotion);
  const turnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swapInTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const motion = {
    duration: TURN_MS,
    outgoing: { liftX: -18, liftY: -6, liftRotate: -14 },
    backCard: { x: 3, y: 1, rotate: 8 },
    incoming: { riseX: 10, riseY: -1.5, riseRotate: 13 },
    easing: 'cubic-bezier(.22, 1, .36, 1)',
  };
  const motionStyle = {
    '--turn-duration': `${motion.duration}ms`,
    '--turn-ease': motion.easing,
    '--outgoing-lift-x': `${motion.outgoing.liftX}cqw`,
    '--outgoing-lift-y': `${motion.outgoing.liftY}cqw`,
    '--outgoing-lift-rotate': `${motion.outgoing.liftRotate}deg`,
    '--back-card-x': `${motion.backCard.x}cqw`,
    '--back-card-y': `${motion.backCard.y}cqw`,
    '--back-card-rotate': `${motion.backCard.rotate}deg`,
    '--incoming-rise-x': `${motion.incoming.riseX}cqw`,
    '--incoming-rise-y': `${motion.incoming.riseY}cqw`,
    '--incoming-rise-rotate': `${motion.incoming.riseRotate}deg`,
  } as CSSProperties;

  // Warm the next card before its turn without downloading every event at once.
  useEffect(() => {
    const nextPhoto = new window.Image();
    nextPhoto.src = homePhotos[(active + 1) % homePhotos.length].src;
  }, [active]);

  const move = useCallback((direction: number) => {
    if (turnTimer.current) return;
    const next = (active + direction + homePhotos.length) % homePhotos.length;
    if (reduced) {
      setActive(next);
      if (frontSlot === 'a') {
        setSlotA(next);
        setSlotB((next + 1) % homePhotos.length);
      } else {
        setSlotB(next);
        setSlotA((next + 1) % homePhotos.length);
      }
      return;
    }

    const incomingSlot = frontSlot === 'a' ? 'b' : 'a';
    setOutgoing(active);
    if (incomingSlot === 'a') setSlotA(next);
    else setSlotB(next);
    setBackSwapPhase(null);
    const following = (next + direction + homePhotos.length) % homePhotos.length;
    swapTimer.current = setTimeout(() => {
      setBackSwapPhase('out');
      swapInTimer.current = setTimeout(() => {
        if (frontSlot === 'a') setSlotA(following);
        else setSlotB(following);
        setBackSwapPhase('in');
      }, SWAP_HALF_MS);
    }, Math.max(0, motion.duration - (SWAP_FADE_MS + 150)));
    turnTimer.current = setTimeout(() => {
      setActive(next);
      setFrontSlot(incomingSlot);
      setOutgoing(null);
      setBackSwapPhase(null);
      turnTimer.current = null;
    }, motion.duration);
  }, [active, reduced, motion.duration, frontSlot]);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => { if (!document.hidden) move(1); }, 6000);
    return () => clearInterval(timer);
  }, [reduced, move]);

  useEffect(() => () => {
    if (turnTimer.current) clearTimeout(turnTimer.current);
    if (swapTimer.current) clearTimeout(swapTimer.current);
    if (swapInTimer.current) clearTimeout(swapInTimer.current);
  }, []);

  const photo = (index: number, decorative = false, swapPhase: 'out' | 'in' | null = null) => (
    <>
      <div className={swapPhase === 'out' ? styles.photoFadeOut : swapPhase === 'in' ? styles.photoFadeIn : undefined}>
        <Image src={homePhotos[index].src} alt={decorative ? '' : homePhotos[index].alt}
        width={1200} height={660} className={styles.photo}
        sizes="(min-width: 1440px) 812px, 57vw" unoptimized={homePhotos[index].src.startsWith('https:')}
        loading={index === 4 ? 'eager' : 'lazy'} />
      </div>
      <figcaption className={`${styles.caption} ${swapPhase === 'out' ? styles.captionBlurOut : swapPhase === 'in' ? styles.captionBlurIn : ''}`}>{homePhotos[index].title}</figcaption>
    </>
  );

  const activateNextCard = () => move(1);
  const handleRearCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activateNextCard();
  };

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <h1 id="home-title" className={styles.srOnly}>McGill Chinese Students’ Society — MCSS fam</h1>
      <div className={styles.composition} style={motionStyle}>
        <div className={styles.wordmarkSection}>
          <div className={styles.wordmark} aria-hidden="true" />
        </div>
        <div className={styles.photoStackSection}>
          <Image className={styles.stamp} src="/images/home-redesign/stamp.svg" alt="" aria-hidden="true" width={131} height={131} />
          <Image className={styles.tile} src="/images/home-redesign/tile.svg" alt="" aria-hidden="true" width={338} height={321} />
          <figure
            id={frontSlot === 'b' ? 'home-photo' : undefined}
            className={`${styles.frame} ${frontSlot === 'a' ? `${styles.rear} ${outgoing !== null ? styles.entering : ''}` : `${styles.front} ${outgoing !== null ? styles.leaving : ''}`}`}
            role={frontSlot === 'a' ? 'button' : undefined}
            tabIndex={frontSlot === 'a' ? 0 : undefined}
            aria-label={frontSlot === 'a' ? `Show next event photograph: ${homePhotos[slotB].title}` : undefined}
            onClick={frontSlot === 'a' ? activateNextCard : undefined}
            onKeyDown={frontSlot === 'a' ? handleRearCardKeyDown : undefined}
          >
            {photo(slotB, frontSlot === 'a')}
            <span className={styles.depthOverlay} aria-hidden="true" />
          </figure>
          <Image className={styles.paper} src="/images/home-redesign/paper.svg" alt="" aria-hidden="true" width={637} height={637} />
          <Image className={styles.heart} src="/images/home-redesign/heart.svg" alt="" aria-hidden="true" width={108} height={103} />
          <figure
            id={frontSlot === 'a' ? 'home-photo' : undefined}
            className={`${styles.frame} ${frontSlot === 'a' ? `${styles.front} ${outgoing !== null ? styles.leaving : ''}` : `${styles.rear} ${outgoing !== null ? styles.entering : ''}`}`}
            role={frontSlot !== 'a' ? 'button' : undefined}
            tabIndex={frontSlot !== 'a' ? 0 : undefined}
            aria-label={frontSlot !== 'a' ? `Show next event photograph: ${homePhotos[slotA].title}` : undefined}
            onClick={frontSlot !== 'a' ? activateNextCard : undefined}
            onKeyDown={frontSlot !== 'a' ? handleRearCardKeyDown : undefined}
          >
            {photo(slotA, frontSlot !== 'a', frontSlot === 'a' && outgoing !== null ? backSwapPhase : null)}
            <span className={styles.depthOverlay} aria-hidden="true" />
          </figure>
          <Image className={styles.binder} src="/images/home-redesign/binder-clip.svg" alt="" aria-hidden="true" width={141} height={163} />
        </div>
      </div>
    </section>
  );
}
