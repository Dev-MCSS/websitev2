import type { SVGProps } from "react";
import { Facebook, Instagram } from "lucide-react";

import CloudinaryImage from "./CloudinaryImage";

/** Lucide has no TikTok icon; filled glyph matches icon row weight. */
function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const FOOTER_SOCIAL_LINKS = [
  { href: "https://www.instagram.com/mcssfam/", label: "Instagram", Icon: Instagram },
  { href: "https://www.facebook.com/mcss.ca", label: "Facebook", Icon: Facebook },
  { href: "https://www.tiktok.com/@mcssfam", label: "TikTok", Icon: TikTokIcon },
] as const;

const FOOTER_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/sponsor", label: "Sponsors" },
  { href: "/about", label: "About" },
  { href: "/#membership_card", label: "Membership Card" },
];

const FOOTER_LED_ITEMS = [
  "#mcssfam",
  "#drippiest swag",
  "#aura",
  "#exciting events",
  "#fam",
  "#juicy deals",
] as const;

export default function Footer() {
  return (
    <footer className="ds-container" aria-label="Site footer">
      <div className="relative flex min-h-[50vh] flex-col overflow-hidden rounded-lg bg-(--palette-neutral-100)">
        <div className="flex flex-1 flex-col p-6 pb-16 text-(--palette-neutral-700) lg:p-10 lg:pb-20">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-10 pb-8">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-col gap-3">
                <p className="ds-text-title text-(--palette-neutral-900)">MCSS • McGill Chinese Students' Society</p>
                <p className="ds-text-body max-w-2xl text-(--palette-neutral-600)">
                  The largest and most influential cultural student organization in Eastern Canada.
                </p>
              </div>

              <nav aria-label="Footer navigation" className="ds-text-subtitle mt-4">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {FOOTER_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="rounded-md px-1 py-1 transition-colors hover:text-(--palette-neutral-900)"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Social media" className="mt-6">
                <div className="inline-flex rounded-lg bg-(--palette-neutral-0) p-1 sm:p-2">
                  <ul className="flex flex-wrap items-center gap-1">
                    {FOOTER_SOCIAL_LINKS.map(({ href, label, Icon }) => (
                      <li key={href}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex size-10 items-center justify-center rounded-md text-(--palette-neutral-900) transition-colors hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
                          aria-label={label}
                        >
                          <Icon className="size-5 shrink-0" strokeWidth={2} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* <p className="ds-text-body-sm mt-4 text-(--palette-neutral-600)">
                Copyright 2026
              </p> */}
            </div>

            <div className="hidden min-[786px]:block shrink-0 self-end sm:self-start">
              <CloudinaryImage
                publicId="mcss/home/mcss-logo-square-gradient"
                alt="MCSS logo"
                width={160}
                height={160}
                sizes="(min-width: 640px) 144px, 112px"
                className="h-auto w-28 rounded-lg sm:w-36"
              />
            </div>
          </div>
        </div>

        <aside
          className="pointer-events-none absolute inset-x-4 bottom-4 z-10"
          aria-label="MCSS taglines"
        >
          <div className="ds-footer-led-surface w-full py-2">
            <div className="ds-footer-led-viewport">
              <div className="ds-footer-led-track">
                {([0, 1, 2] as const).map((copy) => (
                  <div
                    key={copy}
                    className="ds-footer-led-segment"
                    aria-hidden={copy > 0 || undefined}
                  >
                    {FOOTER_LED_ITEMS.map((label) => (
                      <span
                        key={`${copy}-${label}`}
                        className="ds-text-body font-medium whitespace-nowrap text-(--palette-neutral-0)"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </footer>
  );
}
