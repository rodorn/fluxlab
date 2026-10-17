import { NextResponse } from "next/server";

import { wolneTerminy } from "@/lib/terminy";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await wolneTerminy(), {
    headers: { "Cache-Control": "no-store" },
  });
}
