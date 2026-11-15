import { NextResponse } from "next/server";

import { obsluzZalaczniki } from "@/lib/automaty/gmail-zalaczniki";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: Request) {
  const sekret = process.env.AUTOMAT_SEKRET;
  if (!sekret || req.headers.get("x-automat") !== sekret)
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  return NextResponse.json({ ok: true, wyniki: await obsluzZalaczniki("zalaczniki-z-maila") });
}
