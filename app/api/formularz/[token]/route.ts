import { NextResponse } from "next/server";

import {
  BAZA,
  TOKEN_RE,
  ZGLOSZEN_NA_GODZINE,
  konto,
  oczyscPola,
  wyslijNaKanal,
} from "@/lib/automaty/formularz";
import { utworzLimit } from "@/lib/limit-ip";

export const runtime = "nodejs";
export const maxDuration = 20;

const limit = utworzLimit();
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const MAX_BAJTOW = 40_000;

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

const blad = (error: string, status: number) =>
  NextResponse.json({ error }, { status, headers: CORS });

export async function POST(
  req: Request,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  if (!TOKEN_RE.test(token)) return blad("Nieznany formularz.", 404);
  if (limit(req)) return blad("Za dużo zgłoszeń, spróbuj za minutę.", 429);
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BAJTOW)
    return blad("Zgłoszenie jest za duże.", 413);

  const ct = req.headers.get("content-type") ?? "";
  const json = ct.includes("json");
  let wej: unknown;
  try {
    wej = json ? await req.json() : Object.fromEntries(await req.formData());
  } catch {
    return blad("Nieprawidłowe dane.", 400);
  }
  if (!wej || typeof wej !== "object" || Array.isArray(wej))
    return blad("Nieprawidłowe dane.", 400);

  const k = await konto(token);
  if (!k || !k.dane.aktywna)
    return blad("Ten formularz nie jest aktywny.", 404);

  const { pola, sterujace } = oczyscPola(wej as Record<string, unknown>);
  const next = /^https:\/\//.test(sterujace._next ?? "") ? sterujace._next : "";
  const gotowe = () =>
    json || !next
      ? NextResponse.json({ ok: true }, { headers: CORS })
      : NextResponse.redirect(next, { status: 303, headers: CORS });

  if (sterujace._honey) return gotowe();
  if (!Object.values(pola).some(Boolean))
    return blad("Zgłoszenie jest puste.", 400);

  const odGodziny = new Date(Date.now() - 3_600_000).toISOString();
  if (
    (await BAZA.licz("zgloszenia", { klucz: token, od: odGodziny })) >=
    ZGLOSZEN_NA_GODZINE
  )
    return blad("Za dużo zgłoszeń w ciągu godziny.", 429);

  await BAZA.dodaj("zgloszenia", { klucz: token, dane: { pola } });
  if (k.dane.webhook) await wyslijNaKanal(k.dane.webhook, k.dane.nazwa, pola);
  return gotowe();
}
