import {
  BAZA,
  TOKEN_RE,
  csv,
  konto,
  type Zgloszenie,
} from "@/lib/automaty/formularz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NAGLOWKI = {
  "Content-Type": "text/csv; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ token: string }> },
) {
  const { token } = await ctx.params;
  if (!TOKEN_RE.test(token))
    return new Response("Nieznany formularz.\n", { status: 404 });
  const k = await konto(token);
  if (!k) return new Response("Nieznany formularz.\n", { status: 404 });
  const lista = await BAZA.lista<Zgloszenie>("zgloszenia", {
    klucz: token,
    limit: 1000,
    kolejnosc: "asc",
  });
  return new Response(csv(lista), { headers: NAGLOWKI });
}
