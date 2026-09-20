import { NextResponse } from "next/server";
import { wykreslenia } from "@/lib/wykreslenia";

export const runtime = "nodejs";
export const maxDuration = 60;
export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(await wykreslenia());
}
