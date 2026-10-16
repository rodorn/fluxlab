import { tokenMaila, zapiszZdarzenieMaila } from "@/lib/mail-zdarzenie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Link z maila do firmy: zapisuje kliknięcie i przekierowuje na podstronę
// fluxlab.pl z utm, żeby źródło zostało zapamiętane (lib/zrodlo.ts).
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = tokenMaila((await params).id);
  const d = new URL(request.url).searchParams.get("d") ?? "/";
  const cel = /^\/[a-z0-9\-/]*$/.test(d) && !d.startsWith("//") ? d : "/";
  if (token) await zapiszZdarzenieMaila(token, "klik_maila", request, cel);
  const url = new URL(cel, "https://fluxlab.pl");
  url.searchParams.set("utm_source", "b2b");
  url.searchParams.set("utm_medium", "email");
  url.searchParams.set("utm_campaign", "b2b-firmy");
  if (token) url.searchParams.set("utm_content", token);
  return Response.redirect(url.toString(), 302);
}
