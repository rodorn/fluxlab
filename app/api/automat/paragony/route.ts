import { NextResponse } from "next/server";
import { dane } from "@/lib/fl-dane";
import { automatDozwolony } from "@/lib/fl-produkty";
import { type Konto, subskrypcjaAktywna, usunKonto } from "@/lib/paragony";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  if (!automatDozwolony(req)) return NextResponse.json({ error: "x-automat" }, { status: 401 });
  if (new URL(req.url).searchParams.get("akcja") !== "sprzatanie") return NextResponse.json({ error: "akcja: sprzatanie" }, { status: 400 });
  const konta = await dane("paragony").lista<Konto>("konta", { limit: 500 });
  const usuniete: string[] = [];
  for (const k of konta) {
    if (await subskrypcjaAktywna(k.dane.subskrypcja)) continue;
    await usunKonto(k.id);
    usuniete.push(k.id.slice(0, 6));
  }
  return NextResponse.json({ kont: konta.length, usunieto: usuniete });
}
