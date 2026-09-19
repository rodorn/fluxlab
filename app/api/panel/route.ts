import { NextResponse } from "next/server";
import {
  PANEL_COOKIE,
  PANEL_SESSION_MAX_AGE,
  createSession,
  getGatePassword,
  passwordMatches,
} from "@/app/panel/gate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FAILURE_TTL_MS = 30 * 60 * 1000;
const MAX_DELAY_MS = 8000;

/**
 * Licznik prób trzymany globalnie, a nie po adresie z nagłówka.
 * Lewy wpis „x-forwarded-for" pisze sam pytający, więc kluczowanie po nim
 * dawało hamulec, który omija się jedną linijką. Hasło jest jedno, więc
 * wspólny licznik niczego nie gubi, a tego nie da się obejść.
 */
const failures = { count: 0, seenAt: 0 };

function pruneFailures(now: number) {
  if (failures.count && now - failures.seenAt > FAILURE_TTL_MS)
    failures.count = 0;
}

function delayFor(count: number): number {
  if (count <= 0) return 0;
  return Math.min(500 * 2 ** (count - 1), MAX_DELAY_MS);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backToPanel(req: Request, error: boolean): NextResponse {
  const target = new URL(error ? "/panel?e=1" : "/panel", req.url);
  return NextResponse.redirect(target, 303);
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    // Lokalny dev chodzi po http, więc Secure tylko na wdrożeniu.
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export async function POST(req: Request) {
  const password = getGatePassword();
  if (!password) return new NextResponse(null, { status: 404 });

  const form = await req.formData().catch(() => null);
  if (!form) return backToPanel(req, true);

  if (form.get("intent") === "logout") {
    const res = backToPanel(req, false);
    res.cookies.set(PANEL_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
    return res;
  }

  const candidate = form.get("password");
  pruneFailures(Date.now());

  await sleep(delayFor(failures.count));

  if (typeof candidate !== "string" || !passwordMatches(candidate, password)) {
    failures.count += 1;
    failures.seenAt = Date.now();
    return backToPanel(req, true);
  }

  failures.count = 0;
  const res = backToPanel(req, false);
  res.cookies.set(PANEL_COOKIE, createSession(password), {
    ...cookieOptions(),
    maxAge: PANEL_SESSION_MAX_AGE,
  });
  return res;
}
