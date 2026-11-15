/** Klient wspólnej bazy fl-dane (https://dane.fluxlab.pl). Dokument = (produkt, kolekcja, id) + opcjonalny klucz + JSON. Tylko z serwera. */
export type Dok<T = Record<string, unknown>> = { id: string; klucz: string | null; dane: T; utworzono: string; zmieniono: string };

const URL_DANE = process.env.DANE_URL ?? "https://dane.fluxlab.pl";

async function wolaj(metoda: string, sciezka: string, body?: unknown) {
  const r = await fetch(`${URL_DANE}/${sciezka}`, {
    method: metoda,
    headers: { "X-Dane-Sekret": process.env.DANE_SEKRET ?? "", "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (r.status === 404) return null;
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`fl-dane ${r.status}: ${d?.error ?? ""}`);
  return d;
}

export function dane(produkt: string) {
  return {
    dodaj: async (kol: string, o: { id?: string; klucz?: string; dane: unknown }): Promise<string> => (await wolaj("POST", `${produkt}/${kol}`, o)).id,
    ustaw: (kol: string, id: string, o: { klucz?: string; dane: unknown }) => wolaj("PUT", `${produkt}/${kol}/${encodeURIComponent(id)}`, o),
    zmien: (kol: string, id: string, o: { klucz?: string; dane: Record<string, unknown> }) => wolaj("PATCH", `${produkt}/${kol}/${encodeURIComponent(id)}`, o),
    pobierz: async <T = Record<string, unknown>>(kol: string, id: string): Promise<Dok<T> | null> => wolaj("GET", `${produkt}/${kol}/${encodeURIComponent(id)}`),
    lista: async <T = Record<string, unknown>>(kol: string, q: { klucz?: string; od?: string; limit?: number; kolejnosc?: "asc" | "desc" } = {}): Promise<Dok<T>[]> => {
      const p = new URLSearchParams(Object.entries(q).filter(([, v]) => v !== undefined).map(([k, v]) => [k, String(v)]));
      return (await wolaj("GET", `${produkt}/${kol}?${p}`)).dokumenty;
    },
    licz: async (kol: string, q: { klucz?: string; od?: string } = {}): Promise<number> => {
      const p = new URLSearchParams({ licz: "1", ...(q.klucz ? { klucz: q.klucz } : {}), ...(q.od ? { od: q.od } : {}) });
      return (await wolaj("GET", `${produkt}/${kol}?${p}`)).licznik;
    },
    usun: (kol: string, id: string) => wolaj("DELETE", `${produkt}/${kol}/${encodeURIComponent(id)}`),
    usunKlucz: (klucz: string, kol?: string) => wolaj("DELETE", `${produkt}${kol ? `/${kol}` : ""}?klucz=${encodeURIComponent(klucz)}`),
    usunPrzed: (kol: string, przed: string) => wolaj("DELETE", `${produkt}/${kol}?przed=${encodeURIComponent(przed)}`),
  };
}
