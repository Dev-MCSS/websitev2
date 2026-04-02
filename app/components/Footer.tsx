const FOOTER_LINKS = [
  { href: "#events", label: "Events" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#about", label: "About" },
  { href: "#membership_card", label: "Membership Card" },
];

export default function Footer() {
  return (
    <footer className="ds-container" aria-label="Site footer">
      <div className="relative flex min-h-[50vh] flex-col overflow-hidden rounded-lg bg-(--palette-neutral-100)">
        <div className="flex flex-1 flex-col justify-center p-6 text-(--palette-neutral-700) lg:p-10">
          <div className="flex flex-col gap-8 py-8">
          <div className="flex flex-col gap-3">
            <p className="ds-text-title text-(--palette-neutral-900)">MCSS</p>
            <p className="ds-text-body max-w-2xl text-(--palette-neutral-600)">
              Building the coolest fam in Montreal through events, partnerships, and student life.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="ds-text-subtitle">
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

          <p className="ds-text-body-sm text-(--palette-neutral-600)">
            Copyright 2026 MCSS. All rights reserved.
          </p>
        </div>
        </div>
        <div className="h-6 w-full bg-danger" aria-hidden="true" />
      </div>
    </footer>
  );
}
