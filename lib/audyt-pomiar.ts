/**
 * Pomiar strony na potrzeby darmowego audytu zbiorczego.
 *
 * Tu nie ma ani jednej opinii. Ten moduł wyłącznie zbiera fakty: co serwer
 * odesłał, jak szybko, ile to waży i co stoi w dokumencie. Ocena i kolejność
 * napraw powstają osobno, w module opisowym i w modelu. Rozdział jest celowy,
 * bo raport, w którym nie da się wskazać źródła liczby, jest wart tyle co
 * cudza opinia o cudzej stronie.
 *
 * Świadomie NIE udajemy tu Lighthouse. Nie mamy przeglądarki, więc nie mierzymy
 * czasu rysowania ani przesunięć układu i nigdzie tego nie obiecujemy. Mierzymy
 * to, co widać z serwera, i to nazywamy po imieniu.
 */

import dns from "dns/promises";
import tls from "tls";

/** Górne ograniczenia, żeby jeden audyt nie zjadł całego czasu funkcji. */
const CZAS_STRONY_MS = 12_000;
const CZAS_ZASOBU_MS = 6_000;
const MAX_ZASOBOW = 30;

export type Zasob = {
  adres: string;
  rodzaj: "skrypt" | "styl" | "obraz" | "font";
  bajty: number | null;
  kompresja: string | null;
  cache: string | null;
  status: number | null;
};

export type Mobile = {
  /** Znacznik viewport. Bez niego telefon udaje ekran 980 px i wszystko jest małe. */
  viewport: string | null;
  /** Czy strona blokuje powiększanie dwoma palcami. */
  blokujePowiekszanie: boolean;
  /** Czy serwer oddaje telefonowi inny dokument niż komputerowi. */
  osobnaWersja: boolean;
  /** Czas i waga zmierzone z nagłówkami telefonu. */
  ttfbMs: number | null;
  htmlBajty: number | null;
  /** Reguły @media znalezione w arkuszach. Brak = układ się nie przestawia. */
  regulMedia: number;
  /** Stałe szerokości w pikselach, typowa przyczyna przewijania w bok. */
  stalychSzerokosci: number;
  /** Obrazy bez srcset: telefon pobiera wersję przygotowaną na duży ekran. */
  obrazowBezSrcset: number;
  /** Szacunek czasu pobrania całości na typowym łączu komórkowym. */
  sekundNa4G: number | null;
  /** Łączna waga dokumentu i zmierzonych zasobów. */
  wagaCalosci: number;
  /** Ile znaków stylów udało się faktycznie przeczytać. Przy zerze nie
   *  wolno orzekać o responsywności, bo brak dowodu to nie dowód braku. */
  cssZnakow: number;
};

export type Pomiar = {
  domena: string;
  bazowyAdres: string | null;
  osiagalna: boolean;
  /** Serwer odpowiedział, ale nie treścią strony, tylko ekranem ochrony. */
  zablokowany: boolean;
  powodBlokady: string | null;
  /** Czas do pierwszego bajtu dokumentu, w milisekundach. */
  ttfbMs: number | null;
  /** Pełny czas pobrania dokumentu. */
  pelnyMs: number | null;
  statusHtml: number | null;
  htmlBajty: number | null;
  kompresjaHtml: string | null;
  cacheHtml: string | null;
  serwer: string | null;
  /** Wersja bez www i z www: czy obie oddają treść (duplikat dla wyszukiwarki). */
  obieWersjeDzialaja: boolean | null;
  httpPrzekierowuje: boolean | null;
  cert: {
    wystawca: string;
    waznyDo: string;
    dniDoKonca: number;
    pasujeDoDomeny: boolean;
  } | null;
  tytul: string | null;
  opisMeta: string | null;
  h1: string[];
  canonical: string | null;
  jezyk: string | null;
  noindex: boolean;
  og: boolean;
  daneStrukturalne: string[];
  hreflang: string[];
  obrazy: { wszystkie: number; bezAlt: number; bezWymiarow: number; bezLazy: number };
  /** Ile znaków treści zostaje po usunięciu skryptów i stylów. */
  trescZnakow: number;
  robots: { jest: boolean; blokujeWszystko: boolean; blokujeAi: string[]; mapaWskazana: boolean };
  sitemap: { jest: boolean; adresow: number | null };
  llms: boolean;
  zasoby: Zasob[];
  poczta: { spf: boolean; dmarc: boolean; dmarcPolityka: string | null; mx: boolean };
  mobile: Mobile;
};

function pusty(domena: string): Pomiar {
  return {
    domena,
    bazowyAdres: null,
    osiagalna: false,
    zablokowany: false,
    powodBlokady: null,
    ttfbMs: null,
    pelnyMs: null,
    statusHtml: null,
    htmlBajty: null,
    kompresjaHtml: null,
    cacheHtml: null,
    serwer: null,
    obieWersjeDzialaja: null,
    httpPrzekierowuje: null,
    cert: null,
    tytul: null,
    opisMeta: null,
    h1: [],
    canonical: null,
    jezyk: null,
    noindex: false,
    og: false,
    daneStrukturalne: [],
    hreflang: [],
    obrazy: { wszystkie: 0, bezAlt: 0, bezWymiarow: 0, bezLazy: 0 },
    trescZnakow: 0,
    robots: { jest: false, blokujeWszystko: false, blokujeAi: [], mapaWskazana: false },
    sitemap: { jest: false, adresow: null },
    llms: false,
    zasoby: [],
    poczta: { spf: false, dmarc: false, dmarcPolityka: null, mx: false },
    mobile: {
      viewport: null,
      blokujePowiekszanie: false,
      osobnaWersja: false,
      ttfbMs: null,
      htmlBajty: null,
      regulMedia: 0,
      stalychSzerokosci: 0,
      obrazowBezSrcset: 0,
      sekundNa4G: null,
      wagaCalosci: 0,
      cssZnakow: 0,
    },
  };
}

export function czystaDomena(wejscie: unknown): string {
  if (typeof wejscie !== "string") return "";
  let d = wejscie.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/^www\./, "");
  d = d.split("/")[0].split("?")[0].split("#")[0].split(":")[0];
  return d.slice(0, 253);
}

/** Nagłówki telefonu. Część serwisów oddaje pod nimi zupełnie inny dokument. */
const UA_TELEFON =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)";

async function pobierz(
  adres: string,
  limitMs = CZAS_ZASOBU_MS,
  metoda: "GET" | "HEAD" = "GET",
  ua?: string,
): Promise<{ odp: Response; tekst: string; ttfb: number; pelny: number } | null> {
  const przerwij = new AbortController();
  const budzik = setTimeout(() => przerwij.abort(), limitMs);
  const start = Date.now();
  try {
    const odp = await fetch(adres, {
      method: metoda,
      redirect: "follow",
      signal: przerwij.signal,
      headers: {
        // Przedstawiamy się uczciwie. Właściciel strony, który zajrzy do logów,
        // ma prawo wiedzieć, kto go odpytał i po co.
        "user-agent":
          ua ??
          "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)",
        "accept-encoding": "gzip, deflate, br",
      },
    });
    const ttfb = Date.now() - start;
    const tekst = metoda === "GET" ? await odp.text() : "";
    return { odp, tekst, ttfb, pelny: Date.now() - start };
  } catch {
    return null;
  } finally {
    clearTimeout(budzik);
  }
}

/** Certyfikat czytamy wprost z uścisku dłoni, bo fetch go nie pokazuje. */
function pobierzCert(domena: string): Promise<Pomiar["cert"]> {
  return new Promise((gotowe) => {
    const koniec = setTimeout(() => {
      gniazdo.destroy();
      gotowe(null);
    }, 8000);
    const gniazdo = tls.connect(
      { host: domena, port: 443, servername: domena, rejectUnauthorized: false },
      () => {
        const c = gniazdo.getPeerCertificate();
        clearTimeout(koniec);
        if (!c || !c.valid_to) {
          gniazdo.destroy();
          return gotowe(null);
        }
        const doKiedy = new Date(c.valid_to);
        const nazwy = [
          ...(c.subject?.CN ? [c.subject.CN] : []),
          ...String(c.subjectaltname ?? "")
            .split(",")
            .map((s) => s.trim().replace(/^DNS:/, "")),
        ].filter(Boolean);
        const pasuje = nazwy.some(
          (n) =>
            n === domena ||
            n === `www.${domena}` ||
            (n.startsWith("*.") && domena.endsWith(n.slice(1))),
        );
        gniazdo.destroy();
        gotowe({
          wystawca: String(c.issuer?.O ?? c.issuer?.CN ?? "nieznany"),
          waznyDo: doKiedy.toISOString().slice(0, 10),
          dniDoKonca: Math.round((doKiedy.getTime() - Date.now()) / 86_400_000),
          pasujeDoDomeny: pasuje,
        });
      },
    );
    gniazdo.on("error", () => {
      clearTimeout(koniec);
      gotowe(null);
    });
  });
}

async function txt(nazwa: string): Promise<string[]> {
  try {
    return (await dns.resolveTxt(nazwa)).map((c) => c.join(""));
  } catch {
    return [];
  }
}

async function poczta(domena: string): Promise<Pomiar["poczta"]> {
  const [mx, spf, dmarc] = await Promise.all([
    dns.resolveMx(domena).catch(() => []),
    txt(domena),
    txt(`_dmarc.${domena}`),
  ]);
  const wpisDmarc = dmarc.find((t) => t.toLowerCase().startsWith("v=dmarc1"));
  return {
    mx: mx.length > 0,
    spf: spf.some((t) => t.toLowerCase().startsWith("v=spf1")),
    dmarc: Boolean(wpisDmarc),
    dmarcPolityka: wpisDmarc?.match(/p=(\w+)/)?.[1] ?? null,
  };
}

/** Wyciąga adresy zasobów z dokumentu i zamienia je na adresy bezwzględne. */
function zasobyZHtml(html: string, baza: string): { adres: string; rodzaj: Zasob["rodzaj"] }[] {
  const lista: { adres: string; rodzaj: Zasob["rodzaj"] }[] = [];
  const dodaj = (sur: string | undefined, rodzaj: Zasob["rodzaj"]) => {
    if (!sur) return;
    if (sur.startsWith("data:")) return;
    try {
      lista.push({ adres: new URL(sur, baza).toString(), rodzaj });
    } catch {
      /* adres, którego nie da się złożyć, pomijamy */
    }
  };
  for (const m of html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)) dodaj(m[1], "skrypt");
  for (const m of html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi))
    dodaj(m[0].match(/href=["']([^"']+)["']/i)?.[1], "styl");
  for (const m of html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) dodaj(m[1], "obraz");
  const widziane = new Set<string>();
  return lista.filter((z) => (widziane.has(z.adres) ? false : widziane.add(z.adres)));
}

/**
 * Waga zasobów.
 *
 * Zaczynamy od HEAD, bo to jedno zapytanie bez treści. Kłopot w tym, że
 * serwery oddające odpowiedź strumieniowo, a tak działa większość nowych
 * platform, nie podają wtedy content-length. Gdybyśmy na tym poprzestali,
 * liczylibyśmy wagę strony wyłącznie z plików, które akurat zadeklarowały
 * rozmiar, i wychodziłby z tego czas ładowania kilkukrotnie za dobry.
 * Raport podawałby wtedy liczbę, która brzmi wiarygodnie i jest nieprawdziwa,
 * a to gorsze niż nie podać jej wcale. Dlatego brakujące pozycje dobieramy
 * zwykłym GET i liczymy bajty, które faktycznie przyszły.
 */
async function zmierzZasoby(
  wejscie: { adres: string; rodzaj: Zasob["rodzaj"] }[],
): Promise<Zasob[]> {
  const doSprawdzenia = wejscie.slice(0, MAX_ZASOBOW);
  return Promise.all(
    doSprawdzenia.map(async (z): Promise<Zasob> => {
      const glowa = await pobierz(z.adres, CZAS_ZASOBU_MS, "HEAD");
      const dl = glowa?.odp.headers.get("content-length");
      if (glowa && dl) {
        return {
          ...z,
          bajty: Number(dl),
          kompresja: glowa.odp.headers.get("content-encoding"),
          cache: glowa.odp.headers.get("cache-control"),
          status: glowa.odp.status,
        };
      }
      const cialo = await pobierzBajty(z.adres);
      if (!cialo) {
        return {
          ...z,
          bajty: null,
          kompresja: glowa?.odp.headers.get("content-encoding") ?? null,
          cache: glowa?.odp.headers.get("cache-control") ?? null,
          status: glowa?.odp.status ?? null,
        };
      }
      return {
        ...z,
        bajty: cialo.bajty,
        kompresja: cialo.odp.headers.get("content-encoding"),
        cache: cialo.odp.headers.get("cache-control"),
        status: cialo.odp.status,
      };
    }),
  );
}

/** Pobranie treści wyłącznie po to, żeby ją zważyć. */
async function pobierzBajty(
  adres: string,
): Promise<{ odp: Response; bajty: number } | null> {
  const przerwij = new AbortController();
  const budzik = setTimeout(() => przerwij.abort(), CZAS_ZASOBU_MS);
  try {
    const odp = await fetch(adres, {
      redirect: "follow",
      signal: przerwij.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)",
        "accept-encoding": "gzip, deflate, br",
      },
    });
    const buf = await odp.arrayBuffer();
    return { odp, bajty: buf.byteLength };
  } catch {
    return null;
  } finally {
    clearTimeout(budzik);
  }
}

function tekstBezSkryptow(html: string): number {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

/**
 * Pomiar wersji mobilnej.
 *
 * Nie mamy przeglądarki, więc nie udajemy, że rysujemy stronę na telefonie.
 * Sprawdzamy to, co da się ustalić rzetelnie: czy serwer oddaje telefonowi
 * inny dokument, czy strona w ogóle deklaruje, że jest na telefon
 * przygotowana, czy arkusze zawierają reguły przestawiające układ, ile z tego
 * wszystkiego telefon musi pobrać i jak długo to potrwa na łączu komórkowym.
 */
async function zmierzMobile(
  baza: string,
  htmlDesktop: string,
  wagaZasobow: number,
  zasoby: Zasob[],
): Promise<Mobile> {
  const dok = await pobierz(baza, CZAS_STRONY_MS, "GET", UA_TELEFON);
  const html = dok?.tekst ?? htmlDesktop;

  const viewport =
    html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
    null;

  // Arkusze pobieramy jeszcze raz, ale tylko te, które już znamy z pomiaru
  // głównego, i najwyżej cztery. Reguły @media i sztywne szerokości mówią,
  // czy układ w ogóle ma się jak przestawić na wąskim ekranie.
  const arkusze = zasoby.filter((z) => z.rodzaj === "styl").slice(0, 4);
  const trescArkuszy = await Promise.all(
    arkusze.map(async (a) => (await pobierz(a.adres, CZAS_ZASOBU_MS))?.tekst ?? ""),
  );
  const css = [
    ...trescArkuszy,
    ...[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]),
  ].join("\n");

  const regulMedia = (css.match(/@media[^{]*\(\s*(max|min)-width/gi) ?? []).length;
  const stalychSzerokosci = (
    css.match(/(?:^|[;{\s])(?:min-)?width\s*:\s*(\d{3,})px/gi) ?? []
  ).filter((m) => Number(m.match(/(\d{3,})px/)?.[1] ?? 0) >= 600).length;

  const tagiObrazow = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  const obrazowBezSrcset = tagiObrazow.filter((t) => !/\ssrcset=/i.test(t)).length;

  const htmlBajty = Buffer.byteLength(html, "utf8");
  const wagaCalosci = htmlBajty + wagaZasobow;
  // 1,6 Mb/s to ostrożny szacunek dla przeciętnego zasięgu poza centrum miasta.
  const sekundNa4G = wagaCalosci ? Number((wagaCalosci / (1_600_000 / 8)).toFixed(1)) : null;

  // Dokument uznajemy za osobny, gdy różnica długości jest wyraźna. Drobne
  // różnice biorą się ze znaczników losowych i nie znaczą nic.
  const osobnaWersja =
    dok !== null &&
    Math.abs(htmlBajty - Buffer.byteLength(htmlDesktop, "utf8")) /
      Math.max(1, Buffer.byteLength(htmlDesktop, "utf8")) >
      0.25;

  return {
    viewport,
    blokujePowiekszanie: /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\.0)?\b/i.test(
      viewport ?? "",
    ),
    osobnaWersja,
    ttfbMs: dok?.ttfb ?? null,
    htmlBajty,
    regulMedia,
    stalychSzerokosci,
    obrazowBezSrcset,
    sekundNa4G,
    wagaCalosci,
    cssZnakow: css.length,
  };
}

/**
 * Rozpoznanie ekranu ochrony przed robotami.
 *
 * To nie jest ozdobnik, tylko warunek tego, żeby raport mówił prawdę.
 * Przy pierwszym uruchomieniu na dużych serwisach wyszło 2/100 z adnotacją
 * "brak znacznika viewport" i "prawie nie ma treści". Obie nieprawdziwe:
 * serwer oddał 403 z jednozdaniową stroną ochrony, a pomiar wziął ją za
 * stronę firmy i wypisał na jej podstawie błędy krytyczne. Raport, który
 * zmyśla wady, jest gorszy niż brak raportu, więc od tej pory taki przypadek
 * nazywamy po imieniu i nie orzekamy o niczym, czego nie widzieliśmy.
 */
function wykryjBlokade(status: number, html: string): string | null {
  if (status === 403) return "serwer odrzucił połączenie (403)";
  if (status === 429) return "serwer uznał pomiar za zbyt częsty (429)";
  if (status >= 400) return `serwer odpowiedział błędem ${status}`;
  const p = html.slice(0, 4000).toLowerCase();
  if (p.includes("access denied") || p.includes("attention required"))
    return "strona ochrony zamiast treści";
  if (p.includes("cf-browser-verification") || p.includes("just a moment"))
    return "weryfikacja przeglądarki Cloudflare";
  if (p.includes("datadome") || p.includes("please enable js and disable any ad blocker"))
    return "system ochrony przed robotami";
  if (p.includes("captcha") && html.length < 8000) return "captcha zamiast treści";
  return null;
}

const ROBOTY_AI = ["GPTBot", "ClaudeBot", "anthropic-ai", "PerplexityBot", "CCBot", "Google-Extended"];

/**
 * Parser robots.txt.
 *
 * Pierwsza wersja szukała w całym pliku wzorca "User-agent: *" a dalej
 * gdziekolwiek "Disallow: /". Na prawdziwym pliku dużego sklepu dało to
 * oskarżenie, że witryna zamyka się przed wyszukiwarkami, podczas gdy ta
 * reguła należała do bloku innego robota, kilkadziesiąt linii niżej.
 * Wyrażenie regularne nie widzi, gdzie kończy się jeden blok i zaczyna
 * następny, więc trzeba przejść plik linia po linii.
 */
function czytajRobots(tekst: string): { agenci: string[]; disallow: string[] }[] {
  const bloki: { agenci: string[]; disallow: string[] }[] = [];
  let biezacy: { agenci: string[]; disallow: string[] } | null = null;
  let poprzedniaToAgent = false;

  for (const surowa of tekst.split(/\r?\n/)) {
    const linia = surowa.split("#")[0].trim();
    if (!linia) continue;
    const [kluczSurowy, ...reszta] = linia.split(":");
    const klucz = kluczSurowy.trim().toLowerCase();
    const wartosc = reszta.join(":").trim();

    if (klucz === "user-agent") {
      // Kilka linii User-agent pod rząd opisuje jeden wspólny zestaw reguł.
      if (!biezacy || !poprzedniaToAgent) {
        biezacy = { agenci: [], disallow: [] };
        bloki.push(biezacy);
      }
      biezacy.agenci.push(wartosc.toLowerCase());
      poprzedniaToAgent = true;
      continue;
    }
    poprzedniaToAgent = false;
    if (klucz === "disallow" && biezacy) biezacy.disallow.push(wartosc);
  }
  return bloki;
}

/** Czy podany robot ma zamkniętą całą witrynę we własnym bloku reguł. */
function zamknietyDla(
  bloki: { agenci: string[]; disallow: string[] }[],
  agent: string,
): boolean {
  const szukany = agent.toLowerCase();
  const blok = bloki.find((b) => b.agenci.includes(szukany));
  if (!blok) return false;
  return blok.disallow.some((d) => d === "/");
}

export async function zmierz(domenaWejscie: string): Promise<Pomiar> {
  const domena = czystaDomena(domenaWejscie);
  const wynik = pusty(domena);
  if (!domena) return wynik;

  // Najpierw wersja bez www, potem z www. Kolejność ma znaczenie, bo pierwsza
  // działająca staje się adresem bazowym dla wszystkich dalszych pomiarów.
  let baza = `https://${domena}`;
  let dok = await pobierz(baza, CZAS_STRONY_MS);
  if (!dok || dok.odp.status >= 500) {
    baza = `https://www.${domena}`;
    const druga = await pobierz(baza, CZAS_STRONY_MS);
    if (druga) dok = druga;
    else baza = `https://${domena}`;
  }

  const [cert, pocztaWynik] = await Promise.all([pobierzCert(domena), poczta(domena)]);
  wynik.cert = cert;
  wynik.poczta = pocztaWynik;

  if (!dok) return wynik;

  wynik.osiagalna = true;
  wynik.bazowyAdres = baza;
  wynik.statusHtml = dok.odp.status;

  // Gdy to nie jest strona klienta, tylko bramka ochronna, kończymy tutaj.
  // Certyfikat i wpisy poczty zostają, bo te zmierzyliśmy z DNS i z uścisku
  // dłoni, niezależnie od tego, co serwer zrobił z zapytaniem HTTP.
  const blokada = wykryjBlokade(dok.odp.status, dok.tekst);
  if (blokada) {
    wynik.zablokowany = true;
    wynik.powodBlokady = blokada;
    return wynik;
  }

  // Czas pierwszej odpowiedzi bierzemy z lepszego z dwóch pomiarów, i tylko
  // wtedy, gdy pierwszy wypadł źle. Serwery usypiane między wejściami, a tak
  // działa dziś większość tanich hostingów i platform bezserwerowych, oddają
  // pierwszą odpowiedź po sekundzie, a każdą następną po kilkudziesięciu
  // milisekundach. Bez tego powtórzenia wystawialibyśmy rachunek na kilkaset
  // złotych za wolny serwer komuś, kto ma po prostu usypianą instancję.
  wynik.ttfbMs = dok.ttfb;
  wynik.pelnyMs = dok.pelny;
  if (dok.ttfb > 700) {
    const kontrola = await pobierz(baza, CZAS_STRONY_MS);
    if (kontrola && kontrola.ttfb < dok.ttfb) {
      wynik.ttfbMs = kontrola.ttfb;
      wynik.pelnyMs = kontrola.pelny;
    }
  }
  wynik.statusHtml = dok.odp.status;
  wynik.htmlBajty = Buffer.byteLength(dok.tekst, "utf8");
  wynik.kompresjaHtml = dok.odp.headers.get("content-encoding");
  wynik.cacheHtml = dok.odp.headers.get("cache-control");
  wynik.serwer = dok.odp.headers.get("server");

  const html = dok.tekst;
  wynik.tytul = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim().slice(0, 300) ?? null;
  wynik.opisMeta =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]?.trim() ??
    null;
  wynik.h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 5);
  wynik.canonical =
    html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null;
  wynik.jezyk = html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? null;
  wynik.noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
  wynik.og = /<meta[^>]+property=["']og:title["']/i.test(html);
  wynik.daneStrukturalne = [
    ...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g),
  ].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i).slice(0, 12);
  wynik.hreflang = [...html.matchAll(/hreflang=["']([^"']+)["']/gi)]
    .map((m) => m[1])
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 12);
  wynik.trescZnakow = tekstBezSkryptow(html);

  const tagiObrazow = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  wynik.obrazy = {
    wszystkie: tagiObrazow.length,
    bezAlt: tagiObrazow.filter((t) => !/\salt=/i.test(t)).length,
    bezWymiarow: tagiObrazow.filter((t) => !/\swidth=/i.test(t) || !/\sheight=/i.test(t)).length,
    bezLazy: tagiObrazow.filter((t) => !/loading=["']lazy["']/i.test(t)).length,
  };

  const [robotsTxt, llmsTxt, mapa, wersjaWww, poHttp] = await Promise.all([
    pobierz(`${baza}/robots.txt`),
    pobierz(`${baza}/llms.txt`),
    pobierz(`${baza}/sitemap.xml`),
    pobierz(baza.includes("://www.") ? `https://${domena}` : `https://www.${domena}`),
    pobierz(`http://${domena}`),
  ]);

  if (robotsTxt && robotsTxt.odp.ok) {
    const t = robotsTxt.tekst.slice(0, 60_000);
    const bloki = czytajRobots(t);
    wynik.robots = {
      jest: true,
      blokujeWszystko: zamknietyDla(bloki, "*"),
      blokujeAi: ROBOTY_AI.filter((r) => zamknietyDla(bloki, r)),
      mapaWskazana: /^\s*sitemap:/im.test(t),
    };
  }
  wynik.llms = Boolean(llmsTxt?.odp.ok);
  if (mapa && mapa.odp.ok) {
    wynik.sitemap = { jest: true, adresow: (mapa.tekst.match(/<loc>/g) ?? []).length || null };
  }
  // Obie wersje oddają treść wtedy, gdy druga nie przekierowała na pierwszą.
  wynik.obieWersjeDzialaja = wersjaWww
    ? wersjaWww.odp.ok && !wersjaWww.odp.url.startsWith(baza)
    : false;
  wynik.httpPrzekierowuje = poHttp ? poHttp.odp.url.startsWith("https://") : null;

  wynik.zasoby = await zmierzZasoby(zasobyZHtml(html, baza));
  const wagaZasobow = wynik.zasoby.reduce((s, z) => s + (z.bajty ?? 0), 0);
  wynik.mobile = await zmierzMobile(baza, html, wagaZasobow, wynik.zasoby);
  return wynik;
}
