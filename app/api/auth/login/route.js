import { NextResponse } from "next/server";
import { SESSION_COOKIE, createSessionToken, timingSafeEqual } from "@/lib/session";

export async function POST(req) {
  const user = process.env.DASHBOARD_BASIC_AUTH_USER;
  const pass = process.env.DASHBOARD_BASIC_AUTH_PASS;

  if (!user || !pass || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: "Auth not configured" }, { status: 503 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { username, password } = body || {};
  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = timingSafeEqual(username, user) && timingSafeEqual(password, pass);
  if (!ok) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
