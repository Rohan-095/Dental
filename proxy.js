import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/api/appointments", "/api/patients"];

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="dental-ai-receptionist", charset="UTF-8"',
    },
  });
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function proxy(req) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (!isProtected) return NextResponse.next();

  const user = process.env.DASHBOARD_BASIC_AUTH_USER;
  const pass = process.env.DASHBOARD_BASIC_AUTH_PASS;

  // Fail closed: never expose protected routes if creds aren't configured.
  if (!user || !pass) {
    return new NextResponse("Auth not configured", { status: 503 });
  }

  const header = req.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return unauthorized();

  let decoded;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return unauthorized();

  const providedUser = decoded.slice(0, idx);
  const providedPass = decoded.slice(idx + 1);

  if (
    timingSafeEqual(providedUser, user) &&
    timingSafeEqual(providedPass, pass)
  ) {
    return NextResponse.next();
  }

  return unauthorized();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/appointments/:path*",
    "/api/patients/:path*",
  ],
};
