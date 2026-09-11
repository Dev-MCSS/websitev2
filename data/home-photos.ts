const cloud = (id: string) => `https://res.cloudinary.com/mcss-website/image/upload/f_auto,q_auto,w_1400/${id}`;

/** The five existing MCSSv3 photographs, in their original order. */
export const homePhotos = [
  { title: 'Casino Night', src: cloud('mcss/events/2025-2026/casino_night_2025'), alt: 'MCSS members together at Casino Night' },
  { title: 'Mooncake Workshop', src: '/images/home-redesign/mooncake.jpg', alt: 'MCSS members making mooncakes around a table' },
  { title: 'Love O’Clock', src: cloud('mcss/events/2025-2026/LC_2026_1'), alt: 'MCSS members at Love O’Clock' },
  { title: 'Tang Yuan Workshop', src: cloud('mcss/events/2025-2026/tangyuan_2026_1'), alt: 'MCSS members at a tang yuan workshop' },
  { title: 'Casino Night', src: '/images/home-redesign/casino.jpg', alt: 'Cupcakes and playing chips at MCSS Casino Night' },
] as const;
