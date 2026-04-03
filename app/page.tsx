import {
  sponsorPreviewForMembershipCard,
  sponsorTotalCount,
} from "@/data/sponsors";
import HeroNavbar from "./components/HeroNavbar";
import ExecTeam from "./components/ExecTeam";
import HeroImageSwitcher from "./components/HeroImageSwitcher";
import Footer from "./components/Footer";
import CloudinaryImage from "./components/CloudinaryImage";
import ScrollRevealCard from "./components/ScrollRevealCard";

export default function Home() {
  const sponsorMoreCount = Math.max(
    0,
    sponsorTotalCount - sponsorPreviewForMembershipCard.length,
  );

  return (
    <main className="flex min-h-0 flex-1 flex-col">
      <section className="relative h-screen w-full overflow-hidden">
        <HeroNavbar />
        <HeroImageSwitcher />
      </section>

      <section id="membership_card" className="ds-container">
        <div className="rounded-lg bg-(--palette-neutral-950) p-4 lg:p-6">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Left — membership card image */}
            <div
              className="ds-grain flex items-center justify-center overflow-hidden rounded-lg lg:w-1/2"
              style={{
                background:
                  "linear-gradient(135deg, var(--palette-neutral-800) 0%, var(--palette-neutral-950) 100%)",
                aspectRatio: "1.414",
                perspective: "900px",
              }}
            >
              {/* <CloudinaryImage
                publicId="mcss/card/membership_card"
                alt="MCSS Membership Card"
                width={1400}
                height={880}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full rounded-md"
              /> */}
              <ScrollRevealCard className="w-3/4">
                <CloudinaryImage
                  publicId="mcss/card/front_25-26"
                  alt="MCSS Membership Card 25-26"
                  width={1400}
                  height={880}
                  sizes="(min-width: 1024px) 37vw, 75vw"
                  className="h-auto w-full rounded-lg shadow-lg"
                />
              </ScrollRevealCard>
            </div>

            {/* Right — text + sponsor gallery */}
            <div className="flex flex-col gap-6 lg:w-1/2 lg:py-2">
              <div className="flex flex-col gap-4">
                <h3 className="ds-text-headline ds-text-headline-relaxed font-semibold text-(--palette-neutral-0)">
                  Unlock{" "}
                  <span className="ds-membership-highlight">
                    juicy deals
                    <span
                      className="ds-membership-highlight-bar"
                      aria-hidden
                    />
                  </span>{" "}
                  with our membership card! 😛✨🍚
                </h3>
                <p className="ds-text-body text-(--palette-neutral-400)">
                  Get {" "}
                  <span className="font-bold text-(--palette-neutral-0)">
                  up to 20% off
                  </span>{" "}
                  at restaurants and drink & dessert shops across Montreal with our joint membership card with JSA, HKSN, MTSA, KSA, and MASSA student societies from McGill.
                </p>
              </div>

              <div className="rounded-lg bg-background p-2">
                {/* <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                  {sponsorPreviewForMembershipCard.map((item) => (
                    <div
                      key={item.image}
                      className="relative aspect-square overflow-hidden rounded-lg bg-white"
                    >
                      <CloudinaryImage
                        publicId={item.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 10vw, 25vw"
                        className="object-contain object-center p-1.5"
                        style={{
                          borderRadius: "var(--ds-container-radius)",
                          overflow: "hidden",
                        }}
                      />
                    </div>
                  ))}
                  {sponsorMoreCount > 0 && (
                    <div
                      className="flex aspect-square items-center justify-center rounded-lg bg-(--palette-neutral-700) px-1 text-center ds-text-caption font-bold! leading-tight text-(--palette-neutral-0)"
                      aria-label={`${sponsorMoreCount} more sponsors not shown in this preview`}
                    >
                      +{sponsorMoreCount} more
                    </div>
                  )}
                </div> */}

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2.5">
                      {sponsorPreviewForMembershipCard.slice(0, 5).map((item, i) => (
                        <div
                          key={item.image}
                          className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-(--palette-neutral-0) drop-shadow-[0px_0_3px_rgba(0,0,0,0.25)]${i >= 3 ? " hidden sm:block" : ""}`}
                        >
                          <CloudinaryImage
                            publicId={item.image}
                            alt=""
                            fill
                            sizes="36px"
                            className="scale-150 object-cover"
                            rawTransformations={["e_blur:10000", "q_auto:low"]}
                            aria-hidden="true"
                          />
                          <CloudinaryImage
                            publicId={item.image}
                            alt={item.name}
                            fill
                            sizes="36px"
                            className="object-contain object-center p-1"
                          />
                        </div>
                      ))}
                      <div
                        className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-(--palette-neutral-0) bg-(--palette-neutral-200) text-[12px] font-bold leading-none text-(--palette-neutral-950) drop-shadow-[0px_0_3px_rgba(0,0,0,0.25)]"
                        aria-label={`${sponsorTotalCount - 3} more sponsors`}
                      >
                        <span className="sm:hidden">+{sponsorTotalCount - 3}</span>
                        <span className="hidden sm:inline">+{sponsorTotalCount - 5}</span>
                      </div>
                    </div>
                    {/* <span className="ds-text-caption text-(--palette-neutral-400)">
                      {sponsorTotalCount} sponsors
                    </span> */}
                  </div>

                  <a
                    href="/sponsors"
                    className="shrink-0 rounded-md px-4 py-2 font-semibold text-(--palette-neutral-950) transition-colors hover:brightness-110"
                    style={{ backgroundColor: "var(--palette-membership-highlight)" }}
                  >
                    View Discounts
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-(--palette-neutral-700) bg-(--palette-neutral-900) p-1">
                <h4 className="m-0 px-3 py-2.5 ds-text-subtitle font-medium text-(--palette-neutral-0)">
                  Where can I get a card?
                </h4>
                <div className="border-t border-(--palette-neutral-800) px-3 pb-3 pt-2">
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-(--palette-neutral-400)">
                    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-(--palette-neutral-500)">
                      Order a card online at the start of the school year via google form and pick it up on
                      campus
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-(--palette-neutral-500)">
                      Message us on Instagram and we’ll help you out
                    </li>
                    <li className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-(--palette-neutral-500)">
                      Pick one up at our events
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExecTeam />

      <Footer />
    </main>
  );
}
