import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Commit aktualnego wdrożenia; karta otwarta przed wdrożeniem porównuje go ze swoim.
export function GET() {
  return NextResponse.json(
    { wersja: process.env.VERCEL_GIT_COMMIT_SHA ?? "lokalna" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
