#!/usr/bin/env bash
# Run Next dev from repo root even if your shell's cwd is stale (ENOENT uv_cwd).
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
exec npm run dev
