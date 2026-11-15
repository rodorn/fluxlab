import { ics, zKodu } from "@/lib/kalendarz-terminow";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const u = zKodu(new URL(req.url).searchParams.get("k"));
  if (!u) return new Response("Nieprawidłowy kod kalendarza.", { status: 400 });
  return new Response(ics(u), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="terminy-podatkowe-i-zus.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
