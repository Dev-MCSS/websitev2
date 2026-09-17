# MCSS website

Next.js 16 app for the McMaster Chinese Students Society website.

## Development

Run `npm run dev` from the repository root. The script clears stale Next.js and TypeScript caches before starting. Verify the homepage at `http://localhost:3000/` after the server starts.

Run `npm run lint` and `npm run build` before deploying.

## Project layout

- `app/`: public pages, shared components, and their styles.
- `data/`: content used by the pages.
- `public/`: files served directly by URL. Only put assets intended for visitors here.
- `deliverables/`: internal handoff files, not website assets.
- `design-playgrounds/` and `design.md`: design working materials.

The `/design`, `/ui-playground`, and `/events-playground` pages are development references and return 404 in production. The `deliverables/` and design working directories are outside `public/`, so Next.js does not serve them as static assets. `.vercelignore` also omits these working files from Vercel CLI uploads.
