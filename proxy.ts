import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Design system reference at /design is dev-only. In production, rewrite to a
 * non-existent path so Next serves a 404 (URL bar can still show /design).
 */
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    const { pathname } = request.nextUrl;
    if (pathname === "/design" || pathname.startsWith("/design/")) {
      return NextResponse.rewrite(new URL("/__design-dev-only", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/design", "/design/:path*"],
};
