import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

// Page routes: unauthenticated visitors are redirected to /login.
const PAGE_PREFIXES = ["/dashboard", "/admin"];
// API routes: unauthenticated requests get a plain 401 (no redirect, no HTML).
const API_PREFIXES = ["/api/appointments", "/api/patients"];

function matchesPrefix(pathname, prefixes) {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  const isPage = matchesPrefix(pathname, PAGE_PREFIXES);
  const isApi = matchesPrefix(pathname, API_PREFIXES);
  if (!isPage && !isApi) return NextResponse.next();

  if (!process.env.SESSION_SECRET) {
    return new NextResponse("Auth not configured", { status: 503 });
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);
  if (valid) return NextResponse.next();

  if (isApi) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/appointments/:path*",
    "/api/patients/:path*",
  ],
};
