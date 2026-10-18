const OKNO_MS = 60_000;
const MAX = 5;

/** Fabryka limitu 5 zapytań na minutę na IP (pamięć procesu). */
export function utworzLimit() {
  const log = new Map<string, number[]>();
  return (req: Request): boolean => {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const teraz = Date.now();
    const trafienia = (log.get(ip) ?? []).filter((t) => teraz - t < OKNO_MS);
    if (trafienia.length >= MAX) {
      log.set(ip, trafienia);
      return true;
    }
    trafienia.push(teraz);
    log.set(ip, trafienia);
    return false;
  };
}

export function originDozwolony(origin: string | null): boolean {
  if (!origin) return true;
  return (
    origin === "https://fluxlab.pl" ||
    origin === "https://www.fluxlab.pl" ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  );
}
