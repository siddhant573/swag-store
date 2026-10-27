import { NextResponse } from "next/server";
import { DEMO_PASSWORD, DEMO_USER, SESSION_COOKIE } from "@/server/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const next = String(form.get("next") ?? "/") || "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  if (username !== DEMO_USER || password !== DEMO_PASSWORD) {
    return NextResponse.redirect(new URL(`/login?error=1&next=${encodeURIComponent(safeNext)}`, req.url), 303);
  }
  const res = NextResponse.redirect(new URL(safeNext, req.url), 303);
  res.cookies.set(SESSION_COOKIE, username, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
