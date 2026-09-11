# MCSS homepage design reference

Status: implemented on `feat/homepage-redesign`; validation details below.

## Source and scope

- Visual source: https://www.figma.com/design/OWFKao21dXEy3JX5B7zPWt/MCSSv2?node-id=314-1179
- Implementation branch: `feat/homepage-redesign`.
- First pass: expandable pill navigation, MCSS fam artwork and photo collage,
  clean overview text, and the membership visual and description.
- Footer and additional homepage sections are deferred.
- Navigation motion source: http://localhost:3002/#top; source inspected at
  `/Users/vassi/Documents/Projects/Explorations/mcssv3/app/page.tsx` and
  `app/globals.css`. Direct HTTP access failed in this session; motion values below
  are source-verified, not browser-verified.
- Preserve other routes and existing uncommitted development fixes.

## Verified typography

- Body: Metropolis Regular, existing local font, desktop 24px, line-height 1.3,
  letter-spacing -1.32px in the reference.
- Section labels: DM Mono Medium, 16px, line-height 1, letter-spacing 0.64px.
  Self-hosted at `public/fonts/dm-mono-medium.ttf`, with its OFL license alongside it.
- Photo captions: Georgia Italic, 28.8px in the reference.
- Photo index: Courier New Regular, 10px, 15px line-height, 0.4px tracking.
- MCSS fam: export the complete Figma artwork as SVG, including its lettering;
  do not recreate its silhouette with live text. Figma identifies Georgia Bold
  within the artwork.
- Mobile typography must remain readable independently of collage scaling.

## Verified visual values

- Page background: #ffffff.
- Body/caption text: #242423. Reference label text: #828282; implementation uses
  #76716b for improved small-text contrast on white. Shared beige surface: #eee7dc.
- MCSS fam lettering: #989595.
- Photo frame: #e8e8e4.
- Membership gradient: #f4dfb5 to #e88997, top to bottom.
- Reference body column: 582px wide; paragraph gap: 25px.
- Front photo frame: approximately 835.195px wide, 12px top/side padding,
  16px bottom padding; image height 446.398px at reference scale.
- Rear photo frame: 8.08-degree rotation. Front frame remains unrotated.
- Front frame shadow: 2px 8px 2px rgba(0,0,0,0.25).
- Membership surround: 683 by 421px, 20px radius; reference inner placeholder
  is 564 by 309px with 9px radius. Use the current membership image instead.
- Navbar drawing: 290 by 39px, #e2e2e2, 8px radius. The requested pill shape
  and MCSSv3 interaction take precedence where they differ from this sketch.

These are desktop reference measurements, not universal fixed page dimensions.

## Assets and composition

- Use the five existing MCSSv3 photos: Casino Night, Mooncake Workshop, Love O’Clock,
  Tang Yuan Workshop, and Casino Night details. Reuse its exact local images and
  Cloudinary public IDs. Keep captions synchronized with the actual photo.
- Current rendered membership asset: Cloudinary `mcss/card/front_25-26`.
  A separate local `membership_card.webp` also exists; do not silently substitute it.
- Export exact Figma artwork for MCSS fam, binder clip, torn paper, patterned tile,
  and red stamp. Preserve alpha, masks, proportions, rotations, and layer order.
- Commit durable exported assets; temporary Figma asset links expire.
- Use a bounded, proportionally scaled composition for artwork; use normal document
  flow for overview and membership so text can grow without collisions.
- Decorative layers must not intercept clicks and should be hidden from assistive
  technology. Provide meaningful image alternatives and a semantic page heading.

## Responsive and interaction rules

- Desktop fidelity is checked at the Figma frame's actual dimensions.
- Confirmed mobile approach: scale the complete collage
  together within the viewport; preserve every decorative layer and avoid overflow.
- Use independent page gutters and readable text sizing on narrow viewports.
- Navigation must support keyboard activation, visible focus, Escape dismissal,
  correct expanded state, and non-focusable hidden links.
- Ensure touch targets are at least 44px, even where the visible reference is smaller.
- Respect reduced motion. Five photos cycle like flashcards being lifted, turned, and tucked into a stack,
  with restrained perspective/rotation and opacity rather than sliding horizontally
  away. Decorations and the resting frame composition stay fixed. Provide pause/manual controls and stop automatic transitions
  for reduced motion. Cadence: six seconds; in-place lift/tuck duration: 900ms. Preload the next photo.
- MCSSv3 navigation: centered and fixed 16px from the top; click/tap toggles the
  island, links close it, and Escape dismisses it.
- Match its width transition of 460ms, height transition of 520ms, and radius
  transition of 420ms, all using cubic-bezier(0.22, 1, 0.36, 1).
- Menu content fades/slides in from y=-8px over 220ms; links enter from y=-6px
  with an initial 40ms delay and a 45ms stagger.
- MCSSv3 dimensions are 146x56px closed and up to 430x342px open; mobile
  uses 138x52px closed and viewport width minus 20px open. These are motion
  references: retain Figma visual styling and size the expanded panel for real content.
- The plain MCSS logo occupies the left side of the pill only after scrolling
  down (proposed threshold: 80px). At the top it is visually hidden and not focusable.
- Use a light beige navigation surface, warm ink, and consistent shared colors;
  never a black pill. Light mode only is confirmed; no theme toggle.
- Use semantic header/nav/main landmarks, one accessible h1 associated with the
  SVG wordmark, and h2 section labels styled to match Figma.
- Below membership text, show real sponsor avatars from the existing sponsor data
  and a custom “Discover more” link styled as a button, pointing to /sponsors.
- Proposed menu destinations: existing Events, Sponsors, About, and membership anchor.
  Keep the first pass in the Figma light palette; theme switching is outside this scope.

## Implementation sequence

1. Use the confirmed scope and source-verified MCSSv3 motion specification below;
   visually inspect the running reference when browser access is available.
2. Export artwork, verify image crops, source DM Mono, and finalize these tokens.
3. Build the homepage composition with scoped styles, reusing the existing Next.js,
   React, Tailwind, local fonts, and image infrastructure. Read the installed Next.js
   documentation as required by AGENTS.md before coding.
4. Build the expandable navigation as a homepage variant so shared navigation on
   other routes does not change incidentally.
5. Add overview, membership image, and short description.
6. Apply mobile/tablet layouts and accessibility behavior.
7. Compare browser screenshots to Figma, correcting crops, layering, typography,
   spacing, shadows, and proportions. Record intentional responsive differences.
8. Run lint, TypeScript checking, and production build. Verify the homepage returns
   HTTP 200 and exercise navigation on desktop and mobile. Check existing routes.

## Acceptance criteria

- Accurate reference composition using real exported artwork and current photos.
- No horizontal overflow or clipped meaningful content at 320, 390, 768, 1024,
  and 1440px viewport widths; also inspect at the Figma frame's exact dimensions.
- Text remains readable at 200% zoom; menu is operable by keyboard and touch.
- No layout shifts from missing image dimensions or delayed artwork sizing.
- Reduced-motion behavior works; closed menu content cannot receive focus.
- Footer and unfinished Figma placeholder shapes are excluded from this first pass.
- Update this document with final decisions and verified implementation values.

## Implementation notes

- Expanded navigation destinations use existing routes; light-only mode is confirmed.
- Navigation and flashcard animations were exercised in Chromium. The island remains
  290 by 48px closed; expanded width is capped at 430px and height at 358px, with
  internal scrolling for short viewports. The plain logo appears above 80px scroll.
- Corrected the overview grammar to “one of the largest and most influential
  cultural student organizations”, preserving its meaning.
- Decorative exports use multiply blending to eliminate white export margins; the
  art container clips only beyond its bounds to protect the overview content.
- Existing other-page components remain available. This homepage omits footer and exec team.
- Mobile adds 48px top clearance for the fixed navigation and puts carousel controls
  in document flow; text uses 20px / 1.45 with -0.6px tracking and 24px side gutters.
- Browser checks passed at 320, 390, 768, 1024, and 1440px: no horizontal overflow,
  Escape/focus restoration, scroll-driven logo visibility, five loaded photos,
  real sponsor avatars, and light-only rendering under a dark system preference.
- Homepage, Events, About, and Sponsors routes return HTTP 200. TypeScript passes.
- Production build (`npm run build -- --webpack`) and TypeScript pass. All changed
  homepage TypeScript files pass ESLint. Full-repository lint reports six existing
  errors in Footer, HeroNavbar, ScrollRevealCard, theme-toggle, and EventImageLightbox,
  plus five existing image warnings. Those unrelated files were not changed.
- Local dependency reads stalled; lint was completed using an isolated temporary
  installation of the exact package-lock dependencies and the same ESLint config.
- Local preview runs at http://localhost:3000/ using the webpack development server.
