import { doVps } from "@/lib/prodit";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = (req: Request) => doVps(req, "/czarne-listy/sprawdz");
