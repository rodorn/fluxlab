import { NextResponse } from "next/server";

import { emailZLinku } from "@/lib/bramka";
import { podpisZgodny, ustaw, znajdz } from "@/lib/fl-produkty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function obsluz(request: Request, przekieruj: boolean) {
  const u = new URL(request.url);
  const p = (u.searchParams.get("p") ?? "").replace(/[^a-z0-9-]/g, "");
  const email = emailZLinku(u.searchParams.get("e") ?? "");
  let ok = false;
  if (p && email && podpisZgodny(p, email, u.searchParams.get("t") ?? "")) {
    try {
      const s = await znajdz(p, email);
      if (s) await ustaw(s.id, { fl_aktywna: "0" });
      ok = true;
    } catch {}
  }
  if (!przekieruj) return new NextResponse(null, { status: ok ? 200 : 400 });
  return NextResponse.redirect(new URL(`/wypis?${ok ? "ok=1" : "blad=1"}`, u.origin), 303);
}

export async function GET(request: Request) {
  return obsluz(request, true);
}

export async function POST(request: Request) {
  return obsluz(request, false);
}
