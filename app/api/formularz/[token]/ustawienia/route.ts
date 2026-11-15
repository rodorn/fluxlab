import { NextResponse } from "next/server";

import {
  BAZA,
  TOKEN_RE,
  konto,
  webhookDozwolony,
  wyslijNaKanal,
} from "@/lib/automaty/formularz";
import { utworzLimit } from "@/lib/limit-ip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;

const limit = utworzLimit();

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  const k = TOKEN_RE.test(token) ? await konto(token) : null;
  if (!k)
    return NextResponse.json({ error: "Nieznany formularz." }, { status: 404 });
  const zgloszen = await BAZA.licz("zgloszenia", { klucz: token });
  return NextResponse.json({
    nazwa: k.dane.nazwa,
    aktywna: k.dane.aktywna,
    kanal: Boolean(k.dane.webhook),
    zgloszen,
  });
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  if (limit(req))
    return NextResponse.json(
      { error: "Za dużo prób, spróbuj za minutę." },
      { status: 429 },
    );
  const k = TOKEN_RE.test(token) ? await konto(token) : null;
  if (!k || !k.dane.aktywna)
    return NextResponse.json({ error: "Nieznany formularz." }, { status: 404 });

  const wej = await req.json().catch(() => null);
  const webhook = typeof wej?.webhook === "string" ? wej.webhook.trim() : "";
  if (!webhook) {
    await BAZA.zmien("konta", token, { dane: { webhook: "" } });
    return NextResponse.json({ ok: true, kanal: false });
  }
  if (!webhookDozwolony(webhook))
    return NextResponse.json(
      {
        error:
          "To nie wygląda na adres webhooka Slacka (hooks.slack.com) ani Teams (webhook.office.com, logic.azure.com).",
      },
      { status: 400 },
    );
  const dziala = await wyslijNaKanal(webhook, k.dane.nazwa, {
    Wiadomość:
      "To jest test z Fluxlab. Jeśli widzisz tę wiadomość, kanał działa.",
  });
  if (!dziala)
    return NextResponse.json(
      {
        error:
          "Kanał odrzucił wiadomość testową. Sprawdź, czy adres jest pełny i nie został usunięty.",
      },
      { status: 422 },
    );
  await BAZA.zmien("konta", token, { dane: { webhook } });
  return NextResponse.json({ ok: true, kanal: true });
}
