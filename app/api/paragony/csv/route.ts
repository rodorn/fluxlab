import { NextResponse } from "next/server";
import { csv, pozycje, tokenPoArkuszu } from "@/lib/paragony";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const u = new URL(req.url);
  const token = await tokenPoArkuszu(u.searchParams.get("k") ?? "");
  if (!token) return NextResponse.json({ error: "brak arkusza" }, { status: 404 });
  const m = u.searchParams.get("m") ?? "";
  const lista = (await pozycje(token)).map((x) => x.p).filter((p) => !/^\d{4}-\d{2}$/.test(m) || p.data.startsWith(m));
  return new NextResponse(csv(lista), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="paragony${/^\d{4}-\d{2}$/.test(m) ? `-${m}` : ""}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
