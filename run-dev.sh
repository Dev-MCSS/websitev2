#!/usr/bin/env bash
# Run Next dev from repo root even if your shell's cwd is stale (ENOENT uv_cwd).
# The npm script clears stale Next.js and TypeScript caches before it starts.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
exec npm run dev
