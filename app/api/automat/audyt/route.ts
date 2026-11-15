import { NextResponse } from "next/server";
import { czystaDomena } from "@/lib/audyt-pomiar";
import {
  daneliczbowe,
  raportHtml,
  zbadajCalosc,
} from "@/lib/audyt-calosc";
import { automatDozwolony } from "@/lib/fl-produkty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(req: Request) {
  if (!automatDozwolony(req))
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const domena = czystaDomena(new URL(req.url).searchParams.get("domena"));
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena))
    return NextResponse.json({ error: "domena" }, { status: 400 });
  const wynik = await zbadajCalosc(domena);
  const d = daneliczbowe(wynik);
  return NextResponse.json({
    domena,
    osiagalna: wynik.osiagalna,
    zbadano: wynik.zbadano,
    czasS: wynik.czasS,
    sprawdzone: d.sprawdzone,
    zBledem: d.zBledem,
    problemow: d.problemow,
    podstronZProblemem: d.podstronZProblemem,
    grupy: d.grupy.map((g) => ({
      klucz: g.klucz,
      tytul: g.tytul,
      waga: g.waga,
      wpisy: g.wpisy.slice(0, 300),
    })),
    html: raportHtml(wynik),
  });
}
