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

/** Baner zgody na cookies zasłania i rozmywa zrzut. Usuwamy duże warstwy fixed
 *  z wysokim z-index, znane kontenery CMP oraz blokadę przewijania i rozmycie. */
const BEZ_ZGOD = `(() => {
  const sel = '[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],[id*=gdpr i],[class*=gdpr i],[id*=onetrust i],[id*=didomi i],[id*=usercentrics i],#CybotCookiebotDialog,.cmp-container,[aria-modal=true]';
  document.querySelectorAll(sel).forEach(e => { const p = getComputedStyle(e).position; if (p === 'fixed' || p === 'sticky' || e.getAttribute('aria-modal') === 'true') e.remove(); });
  const vw = innerWidth * innerHeight;
  document.querySelectorAll('body *').forEach(e => {
    const st = getComputedStyle(e);
    if (st.position !== 'fixed') return;
    const r = e.getBoundingClientRect();
    if (r.width * r.height > vw * 0.25 && (+st.zIndex || 0) >= 100) e.remove();
  });
  for (const e of [document.documentElement, document.body, ...document.querySelectorAll('body > *')]) {
    e.style.setProperty('filter', 'none', 'important');
    e.style.setProperty('overflow', 'visible', 'important');
  }
  document.documentElement.style.setProperty('overflow', 'auto', 'important');
})()`;

/** Zrzut ekranu górnej części strony przez Zyte (przeglądarka po ich stronie),
 *  jako data URL JPEG. Bez klucza albo przy błędzie zwraca null. */
export async function zrzutPrzezZyte(url: string, limitMs = 25000): Promise<string | null> {
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
        screenshot: true,
        screenshotOptions: { format: "jpeg", fullPage: false },
        viewport: { width: 1280, height: 800 },
        actions: [
          { action: "evaluate", source: BEZ_ZGOD },
          { action: "waitForTimeout", timeout: 0.5 },
        ],
      }),
    });
    if (!odp.ok) {
      console.error("Zyte zrzut:", odp.status, (await odp.text()).slice(0, 300));
      return null;
    }
    const d = (await odp.json()) as { screenshot?: string };
    return d.screenshot ? `data:image/jpeg;base64,${d.screenshot}` : null;
  } catch {
    return null;
  }
}
