/** Pobranie strony przez Zyte API, gdy serwer klienta odrzuca zwykły pomiar
 *  (Cloudflare, 403, captcha). Zyte pobiera stronę jak przeglądarka z adresu
 *  domowego, więc dostajemy ten sam HTML, który widzi klient. Czasów z takiego
 *  pobrania nie traktujemy jako pomiaru szybkości. Bez klucza zwraca null. */
export type ZyteOdpowiedz = {
  status: number;
  koncowy: string;
  tekst: string;
  naglowki: Headers;
};

export function zyteDostepne(): boolean {
  return Boolean(process.env.ZYTE_API_KEY);
}

export async function pobierzPrzezZyte(
  url: string,
  limitMs = 40000,
): Promise<ZyteOdpowiedz | null> {
  const klucz = process.env.ZYTE_API_KEY;
  if (!klucz) return null;
  try {
    const odp = await fetch("https://api.zyte.com/v1/extract", {
      method: "POST",
      signal: AbortSignal.timeout(limitMs),
      headers: {
        authorization: `Basic ${Buffer.from(`${klucz}:`).toString("base64")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url,
        httpResponseBody: true,
        httpResponseHeaders: true,
      }),
    });
    if (!odp.ok) return null;
    const d = (await odp.json()) as {
      url?: string;
      statusCode?: number;
      httpResponseBody?: string;
      httpResponseHeaders?: { name: string; value: string }[];
    };
    if (!d.httpResponseBody) return null;
    const naglowki = new Headers();
    for (const h of d.httpResponseHeaders ?? []) {
      try {
        naglowki.append(h.name, h.value);
      } catch {
        /* nagłówek z niedozwolonym znakiem */
      }
    }
    return {
      status: d.statusCode ?? 200,
      koncowy: d.url ?? url,
      tekst: Buffer.from(d.httpResponseBody, "base64").toString("utf8"),
      naglowki,
    };
  } catch {
    return null;
  }
}
