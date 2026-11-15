// Usługa kodów QR stoi na VPS (SQLite, mail, miesięczny raport). Strona tylko
// przekazuje żądania z sekretem, bo przeglądarka nie łączy się z VPS wprost.
const ADRES = process.env.QR_URL ?? "http://146.59.80.185:8088";
const SEKRET = process.env.RUCH_SEKRET ?? "";

export async function qr(
  sciezka: string,
  opcje: { metoda?: "GET" | "POST"; body?: unknown; ua?: string; limit?: number } = {},
): Promise<{ status: number; dane: Record<string, unknown> }> {
  const res = await fetch(ADRES + sciezka, {
    method: opcje.metoda ?? "GET",
    headers: {
      "X-Sekret": SEKRET,
      "X-UA": (opcje.ua ?? "").slice(0, 300),
      ...(opcje.body ? { "Content-Type": "application/json" } : {}),
    },
    body: opcje.body ? JSON.stringify(opcje.body) : undefined,
    signal: AbortSignal.timeout(opcje.limit ?? 10000),
    cache: "no-store",
  });
  const dane = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { status: res.status, dane };
}
