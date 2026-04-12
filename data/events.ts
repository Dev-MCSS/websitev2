/**
 * Past event photos (Cloudinary public IDs under `image`).
 */

export type EventItem = {
  title: string;
  /** Cloudinary public ID, e.g. "mcss/events/2025-2026/casino_night_2025" */
  image: string;
};

export type EventYearCategory = {
  span: string;
  items: EventItem[];
};

/** Strip extension and prefix with `mcss/` for Cloudinary public IDs. */
export function eventImagePublicId(relativePath: string): string {
  const trimmed = relativePath.replace(/^\/+/, "");
  const noExt = trimmed.replace(/\.(jpe?g|png|webp)$/i, "");
  return `mcss/${noExt}`;
}

export const events: Record<string, EventYearCategory> = {
  "2025-2026": {
    span: "2025 - 2026",
    items: [
      {
        title: "Casino Night",
        image: eventImagePublicId("events/2025-2026/casino_night_2025.jpg"),
      },
      {
        title: "Casino Night",
        image: eventImagePublicId("events/2025-2026/casino_night_2025_3.jpg"),
      },
      {
        title: "Mooncake Workshop",
        image: eventImagePublicId("events/2025-2026/mooncake_2025.jpg"),
      },
      {
        title: "Mooncake Workshop",
        image: eventImagePublicId("events/2025-2026/mooncake_2025_2.jpg"),
      },
      {
        title: "Tang Yuan Workshop",
        image: eventImagePublicId("events/2025-2026/tangyuan_2026_1.jpg"),
      },
      {
        title: "Love O'Clock",
        image: eventImagePublicId("events/2025-2026/LC_2026_1.jpg"),
      },
      {
        title: "Love O'Clock",
        image: eventImagePublicId("events/2025-2026/LC_2026_2.jpg"),
      },
      {
        title: "Lunar New Year Market",
        image: eventImagePublicId("events/2025-2026/LNY_market_2026_2.jpg"),
      },
      {
        title: "Johnny Chay Show",
        image: eventImagePublicId("events/2025-2026/johnnychay_2025.jpg"),
      },
      {
        title: "Johnny Chay Show",
        image: eventImagePublicId("events/2025-2026/johnny_chay_2025_2.jpg"),
      },
    ],
  },
  "2024-2025": {
    span: "2024 - 2025",
    items: [
      {
        title: "Badminton Tournament",
        image: eventImagePublicId("events/2024-2025/badminton_2025.jpg"),
      },
      {
        title: "Speed Dating",
        image: eventImagePublicId("events/2024-2025/speed_dating_2025_2.jpg"),
      },
      {
        title: "Speed Dating",
        image: eventImagePublicId("events/2024-2025/speed_dating_2025.jpg"),
      },
      {
        title: "Tang Yuan Event",
        image: eventImagePublicId("events/2024-2025/tangyuan_2025.jpg"),
      },
      {
        title: "Lunar New Year Market",
        image: eventImagePublicId("events/2024-2025/lny_market_2025.jpg"),
      },
      {
        title: "Lunar New Year Market",
        image: eventImagePublicId("events/2024-2025/lny_market_2025_2.jpg"),
      },
      {
        title: "Lunar New Year Party",
        image: eventImagePublicId("events/2024-2025/lny_party_2025.jpg"),
      },
      {
        title: "Lunar New Year Party",
        image: eventImagePublicId("events/2024-2025/lny_party_2025_2.jpg"),
      },
      {
        title: "Casino Night",
        image: eventImagePublicId("events/2024-2025/casino_night_2024.jpg"),
      },
      {
        title: "Casino Night",
        image: eventImagePublicId("events/2024-2025/casino_night_2024_2.jpg"),
      },
      {
        title: "Casino Night",
        image: eventImagePublicId("events/2024-2025/casino_night_2024_3.jpg"),
      },
      {
        title: "Palazo",
        image: eventImagePublicId("events/2024-2025/palazo_2024.jpg"),
      },
      {
        title: "Welcome Party",
        image: eventImagePublicId("events/2024-2025/welcome_party_2024.jpg"),
      },
    ],
  },
};
