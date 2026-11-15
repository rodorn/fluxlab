import { db, podpisOdbZgodny, type Odbiorca } from "@/lib/newsletter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const strona = (t: string, status = 200) =>
  new Response(
    `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Newsletter</title></head><body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:48px auto;padding:0 16px;color:#111827"><p style="font-size:18px;line-height:1.5">${t}</p></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } },
  );

export async function GET(req: Request) {
  const u = new URL(req.url);
  const o = (u.searchParams.get("o") ?? "").replace(/[^A-Za-z0-9_-]/g, "");
  if (!o || !podpisOdbZgodny(o, u.searchParams.get("t") ?? "")) return strona("Link jest nieprawidłowy albo wygasł.", 400);
  const d = await db.pobierz<Odbiorca>("odbiorcy", o);
  if (!d) return strona("Nie znaleziono zapisu. Wypełnij formularz jeszcze raz.", 404);
  if (d.dane.status !== "potwierdzony") await db.zmien("odbiorcy", o, { dane: { status: "potwierdzony" } });
  return strona("Zapis potwierdzony. Od teraz dostaniesz maila z nowym wpisem. W każdej wiadomości jest link do wypisu.");
}
