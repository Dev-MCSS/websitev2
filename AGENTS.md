<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Local development

- Start the site from this directory with `npm run dev` (or `./run-dev.sh`).
- A black or indefinitely loading `localhost:3000` page has previously been caused by stale `.next`, `node_modules/.cache`, and `tsconfig.tsbuildinfo` state. The `dev` script clears those generated caches automatically before starting Next.js.
- Keep TypeScript incremental compilation disabled in `tsconfig.json`; enabling it has caused route compilation and `tsc --noEmit` to hang in this project.
- Do not report the server as ready based only on Next.js's `Ready` line. Verify `/` returns HTTP 200; a static asset such as `/favicon.ico` can still succeed while the homepage compiler is stalled.
- If manual recovery is needed, stop the server, run `rm -rf .next node_modules/.cache tsconfig.tsbuildinfo`, restart with `npm run dev`, and verify the homepage response.
