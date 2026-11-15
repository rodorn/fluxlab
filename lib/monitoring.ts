/** Połączenie strony z usługą monitoringu na VPS (cron, baza, wysyłka maili). */
const URL_VPS = process.env.MONIT_URL ?? "http://146.59.80.185:8095";

export async function wywolajMonitoring(sciezka: string, init?: { body?: unknown }): Promise<{ status: number; dane: Record<string, unknown> }> {
  const sekret = process.env.MONIT_SEKRET;
  if (!sekret) return { status: 503, dane: { error: "Usługa chwilowo niedostępna. Spróbuj za chwilę." } };
  try {
    const r = await fetch(`${URL_VPS}${sciezka}`, {
      method: init?.body ? "POST" : "GET",
      headers: { "X-Sekret": sekret, "Content-Type": "application/json" },
      body: init?.body ? JSON.stringify(init.body) : undefined,
      signal: AbortSignal.timeout(50_000),
      cache: "no-store",
    });
    return { status: r.status, dane: await r.json().catch(() => ({})) };
  } catch {
    return { status: 502, dane: { error: "Usługa chwilowo niedostępna. Spróbuj za chwilę." } };
  }
}
