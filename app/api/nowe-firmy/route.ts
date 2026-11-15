import { NextResponse } from "next/server";
import { dane } from "@/lib/fl-dane";
import { originDozwolony, utworzLimit } from "@/lib/limit-ip";
import {
  type Filtr,
  czystePkd,
  czysteWoj,
  oplaconaSesja,
} from "@/lib/nowe-firmy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limit = utworzLimit();
const blad = (error: string, status: number) =>
  NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  if (!originDozwolony(req.headers.get("origin"))) return blad("origin", 403);
  if (limit(req)) return blad("Za dużo prób, spróbuj za minutę.", 429);

  const w = await req.json().catch(() => ({}));
  const sesjaId = String(w.sesja ?? "");
  const s = await oplaconaSesja(sesjaId);
  if (!s)
    return blad(
      "Ta płatność nie jest opłacona albo nie dotyczy tego produktu.",
      402,
    );
  const email: string = s.customer_details?.email ?? s.customer_email ?? "";
  if (!email) return blad("Brak adresu e-mail w płatności.", 400);

  const pkd = czystePkd(w.pkd);
  if (!pkd)
    return blad(
      "Kody PKD wpisz po przecinku w formacie 62, 62.0 albo 62.01.Z, najwyżej pięć.",
      400,
    );
  const woj = czysteWoj(w.woj);
  if (!woj) return blad("Nieprawidłowe województwo.", 400);

  const db = dane("nowefirmy");
  const stary = await db.pobierz<Filtr>("filtry", sesjaId);
  const filtr: Filtr = {
    sesja: sesjaId,
    email,
    subskrypcja: String(s.subscription ?? ""),
    pkd,
    woj,
    tylkoGlowne: w.tylkoGlowne !== false,
    ...(stary?.dane.ostatni_mail
      ? { ostatni_mail: stary.dane.ostatni_mail }
      : {}),
  };
  await db.ustaw("filtry", sesjaId, { klucz: sesjaId, dane: filtr });
  return NextResponse.json({ ok: true, pierwszy: !stary });
}
