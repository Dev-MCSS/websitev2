import Link from "next/link";

import CloudinaryImage from "./CloudinaryImage";

export default function ExecTeam() {
  return (
    <>
      <section className="ds-container py-8">
        <div className="relative overflow-hidden rounded-lg">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-black/50 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-4 pt-5 sm:px-6 sm:pt-6">
            <div className="flex flex-col drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <h2 className="ds-text-title text-white">Executive Team</h2>
              <span className="ds-text-body-sm text-white/80">2024 – 2025</span>
            </div>
          </div>
          <CloudinaryImage
            publicId="mcss/team/group"
            alt="MCSS team group"
            width={1600}
            height={900}
            sizes="100vw"
            className="h-auto w-full rounded-lg"
          />
        </div>
      </section>

      <section className="ds-container pt-0!">
        <div className="flex flex-col items-start gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
          <h2 className="ds-text-title text-foreground">
            Want to join the fam?
          </h2>
          <p className="max-w-2xl ds-text-body text-muted">
            If you&apos;ve ever wanted to be a part of a loving and caring family
            🏠, have plenty fun while planning exciting events 🤪, and make friends
            with people that have the drippiest swag 😎, then MCSS is the perfect
            place for you!
          </p>
          <Link
            href="/about/#recruitment"
            className="shrink-0 rounded-md px-4 py-2 font-semibold text-(--palette-neutral-0) transition-colors hover:brightness-110 mt-4"
            style={{ backgroundColor: "var(--palette-neutral-950)" }}
          >
            Recruitment
          </Link>
        </div>
      </section>
    </>
  );
}
