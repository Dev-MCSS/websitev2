"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import GradientPill from "./GradientPill";

const NAV_LINKS = [
  { href: "/events", label: "Events" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/#about", label: "About" },
];

export default function HeroNavbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y <= 80 || y < lastY);
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onClickOutside);
    return () => document.removeEventListener("pointerdown", onClickOutside);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-20 flex items-start justify-between px-(--ds-container-margin-inline) transition-all duration-200 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div ref={menuRef}>
        <div
          className="flex items-center gap-4 rounded-lg pl-4 pr-2 py-2 text-white backdrop-blur"
          style={{ backgroundColor: "rgba(9, 9, 11, 0.9)" }}
        >
          <a href="/" aria-label="MCSS home" className="shrink-0">
            <img
              src="/images/optimized/logo/mcss-logo-white.png"
              alt="MCSS logo"
              className="h-8 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary navigation"
            className="hidden sm:block ds-text-subtitle font-medium"
          >
            <ul className="flex items-center gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-md px-4 py-2 transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="sm:hidden flex items-center justify-center size-8 cursor-pointer rounded-md border border-white/20 transition-colors hover:bg-white/10"
          >
            {menuOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <Menu size={20} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-200 ease-out ${
            menuOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <nav
            aria-label="Mobile navigation"
            className="rounded-lg p-2 text-white backdrop-blur ds-text-subtitle font-medium"
            style={{ backgroundColor: "rgba(9, 9, 11, 0.9)" }}
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-4 py-2 transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <a
        href="/#membership_card"
        className="shrink-0"
        aria-label="Membership card"
      >
        <GradientPill>
          <span className="font-semibold text-foreground whitespace-nowrap">
            <span className="inline sm:hidden md:inline">Membership Card</span>
            <span className="hidden sm:inline md:hidden">Membership</span>
          </span>
        </GradientPill>
      </a>
    </header>
  );
}
