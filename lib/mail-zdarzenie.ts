// Otwarcia i kliknięcia maili z kampanii do firm. Identyfikator w adresie to
// losowy token nadany przy wysyłce; adres e-mail odbiorcy nie trafia do adresu
// ani do kolektora, mapowanie token -> firma zostaje u nadawcy.
const KOLEKTOR = process.env.RUCH_URL ?? "http://146.59.80.185:8087/wizyta";
const SEKRET = process.env.RUCH_SEKRET ?? "";

export function tokenMaila(id: string): string | null {
  return /^[a-z0-9]{6,16}$/.test(id) ? id : null;
}

export async function zapiszZdarzenieMaila(
  token: string,
  zdarzenie: "otwarcie_maila" | "klik_maila",
  request: Request,
  cel = "",
) {
  if (!SEKRET) return;
  const ua = request.headers.get("user-agent") ?? "";
  try {
    await fetch(KOLEKTOR, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Sekret": SEKRET },
      body: JSON.stringify({
        sciezka: `/mail/${token}${cel ? `?cel=${cel}` : ""}`.slice(0, 300),
        zrodlo: "b2b-email",
        kampania: "b2b",
        sesja: token,
        zdarzenie,
        przegladarka: ua.slice(0, 30),
        system: "",
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Pomiar nigdy nie może popsuć odbiorcy maila ani przekierowania.
  }
}
