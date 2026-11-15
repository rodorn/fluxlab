import { db, podpisOdbZgodny, type Odbiorca } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function wypisz(req: Request) {
  const u = new URL(req.url);
  const o = (u.searchParams.get("o") ?? "").replace(/[^A-Za-z0-9_-]/g, "");
  if (!o || !podpisOdbZgodny(o, u.searchParams.get("t") ?? "")) return false;
  const d = await db.pobierz<Odbiorca>("odbiorcy", o);
  if (d && d.dane.status !== "wypisany") await db.zmien("odbiorcy", o, { dane: { status: "wypisany" } });
  return true;
}

export async function GET(req: Request) {
  const ok = await wypisz(req);
  return new Response(
    `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wypis z newslettera</title></head><body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:48px auto;padding:0 16px;color:#111827"><p style="font-size:18px;line-height:1.5">${ok ? "Wypisano. Nie wyślemy więcej wiadomości na ten adres." : "Link jest nieprawidłowy albo wygasł."}</p></body></html>`,
    { status: ok ? 200 : 400, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } },
  );
}

export async function POST(req: Request) {
  return new Response(null, { status: (await wypisz(req)) ? 200 : 400 });
}
