# MCSS design reference

The current home page is the visual source of truth for new pages. Use this document as a guide, then check the linked components and CSS before changing a pattern. The earlier Figma measurements and implementation notes have been superseded by the live home page.

## Where to look

| Pattern | Current implementation |
| --- | --- |
| Page colors, overview typography, section spacing | `app/home.module.css` |
| Membership card visual and interaction | `app/components/MembershipCardVisual.tsx`, `MembershipCardReveal.tsx`, `home-membership.module.css` |
| Membership label, text, and sponsor preview | `app/components/HomeMembership.tsx`, `home-membership.module.css` |
| FAQ label and quiet paper surfaces | `app/components/HomeFaq.tsx`, `home-faq.module.css` |
| Site navigation | `app/components/HomeNavbar.tsx`, `home-navbar.module.css` |
| Decorative hero and photo treatment | `app/components/HomeHero.tsx`, `home-hero.module.css` |
| Inner page title position | `app/components/InnerPageSection.tsx`, `MetallicHeroTitle.tsx` |
| Font registration and sitewide defaults | `app/layout.tsx`, `app/globals.css` |

## Visual direction

- Keep the page background white and the editorial layout spacious. Use decoration around images and controls; keep reading areas simple.
- Main ink is `#242423`. Muted section labels use `#76716b`. The home page's warm neutrals include `#eee7dc`, `#e8e8e4`, and the membership surround's `#f3eddf`. Use the red accent sparingly for links, offers, and primary actions.
- Text should sit in a narrow reading column, about 540px wide, while galleries and grids can use the wider page container. The membership card visual is about 683px wide.
- Favor purposeful, generous space between visual sections. Inside a reading block, the label-to-copy gap is 25px. The home overview uses the same 25px gap between paragraphs.

## Type hierarchy

1. **Page title:** Use `InnerPageSection` and its shared `MetallicHeroTitle` on inner pages. This preserves the Events and Sponsors title position and metallic Bogart treatment. At viewport widths above 900px, the shared section uses 32px less top space than its base layout. Each page gets one `h1`.
2. **Section label:** Follow Home's Overview, Membership Card, and FAQ headings: Georgia italic, 24px, weight 400, line-height 1, muted `#76716b`. A section label can still be an `h2`; its semantic level does not require a larger visual size.
3. **Reading copy:** Use the registered Metropolis font, weight 400, `1rem`, line-height 1.2, normal letter spacing, dark ink. Keep paragraphs concise and left aligned in the reading column.
4. **Item titles and supporting text:** Use Metropolis for business names, discounts, addresses, and other functional content. Item titles may be medium weight. Reserve Georgia italic for short editorial labels and image captions.
5. **Mono:** DM Mono is available for small utility labels and navigation details. Avoid using it as the main body font.

These are the current CSS values, not scaled measurements from screenshots. Browser zoom and display density change their apparent pixel size.

## Components and surfaces

- Reuse `MembershipCardVisual` wherever the interactive card image appears. It owns the grid paper surround and uses `MembershipCardReveal` for pointer tilt and the card's light effect.
- Use `HomeMembership` when the full home page section is wanted. It also includes descriptive copy, sponsor avatars, and a button. Use only `MembershipCardVisual` when a page needs the image alone.
- Keep card and image surfaces tactile but restrained: warm paper, thin borders, soft shadows, and subtle hover movement. The surrounding page stays white.
- Keep sponsor cards as a three column desktop grid, two columns at medium width, and one column on small screens. Put the logo above the details at every width. The offer and address must remain readable and the address must remain a usable Maps link.
- Avoid adding duplicate introductions, large display headings, or unrelated calls to action between a section's visual, its explanation, and its content.

## Responsive and interaction rules

- Home reading columns use 24px side gutters on small screens; inner page containers use 16px. Preserve those gutters and never let meaningful text or controls clip horizontally.
- Let text wrap naturally. Do not position reading copy as decoration or depend on a fixed image height.
- Interactive elements need visible keyboard focus. Links and controls should have clear hit areas and accessible names.
- Respect `prefers-reduced-motion`. Decorative animation can stop; content and navigation must remain available.
- Check both desktop and mobile layouts after changes, and verify `/` returns HTTP 200 before calling a local server ready, as required by `AGENTS.md`.

## Sponsors page application

The current sequence is shared inner page title → interactive card visual → Home-style section label and short explanation → sponsor grid. The title shares its layout with Events. The introduction and card text follow Home's typography and white background. The sponsor ticket shape remains recognizable, while its text follows the home page hierarchy.
