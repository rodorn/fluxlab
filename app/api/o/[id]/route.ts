import { tokenMaila, zapiszZdarzenieMaila } from "@/lib/mail-zdarzenie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PIKSEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64",
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = tokenMaila((await params).id.replace(/\.gif$/, ""));
  if (token) await zapiszZdarzenieMaila(token, "otwarcie_maila", request);
  return new Response(PIKSEL, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    },
  });
}
