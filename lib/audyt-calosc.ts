/**
 * Płatny audyt całej strony: wszystkie podstrony, do 200 adresów.
 *
 * Lista adresów pochodzi z mapy witryny (także z indeksu map), a gdy mapy nie
 * ma, z linków wewnętrznych zbieranych od strony głównej wszerz. Każdą
 * podstronę pobieramy raz i sprawdzamy regułami, bez modelu. Te same dane dają
 * zawsze ten sam raport, bo i lista problemów, i kolejność adresów w niej są
 * wyliczone, a nie napisane.
 *
 * Sprawy całej domeny (certyfikat, wersje z www i bez, poczta) liczy obecny
 * pomiar darmowego audytu. Nie powielamy go tu, tylko wołamy.
 */

import { pobierzPrzezZyte } from "./zyte";
import { czystaDomena, zmierz } from "./audyt-pomiar";
import { ocenStrone, zZnaleziska, type Ustalenie } from "./audyt-ocena";
import { odmien } from "./odmiana";
import {
  KATALOG,
  cechyStrony,
  kontroleStrony,
  kontroleWitryny,
  polaczCechy,
  regulyRobots,
  zablokowanyPrzezRobots,
  sprawdzAkcje,
  type Cechy,
  type Znalezisko,
} from "./audyt-kontrole";
import {
  analizujJezyk,
  hreflangi,
  kontrolaTlumaczenia,
  kontroleJezykaStrony,
  pobierzHtml,
  type AnalizaJezyka,
} from "./audyt-jezyki";
import { znajdzLiterowki } from "./audyt-pisownia";
import { arkuszeStrony, przygotujCss, sprawdzKursor, type ArkuszKursora } from "./kursor";

const UA =
  "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)";

export const LIMIT_PODSTRON = 200;
const WSPOLBIEZNOSC = 4;
const CZAS_STRONY_MS = 10_000;
const CZAS_LINKU_MS = 7_000;
const MAX_LINKOW_DO_SPRAWDZENIA = 300;
const MAX_MAP = 40;
const MAX_HTML_BAJTOW = 3_000_000;
const CIEZKI_HTML = 500 * 1024;

const PLIKI =
  /\.(pdf|jpe?g|png|gif|webp|avif|svg|ico|zip|rar|7z|gz|mp4|mp3|webm|mov|avi|docx?|xlsx?|pptx?|csv|txt|xml|json|css|js|woff2?|ttf|eot)$/i;

export type Strona = {
  adres: string;
  status: number | null;
  koncowy: string;
  przekierowania: string[];
  html: boolean;
  htmlBajty: number | null;
  tytul: string | null;
  opis: string | null;
  h1: number;
  canonical: string | null;
  noindex: boolean;
  obrazyBezAlt: number;
  mieszane: string[];
  linki: string[];
  /** Klikalne elementy bez rączki kursora. Null, gdy nie dało się ocenić
   *  (brak dokumentu albo nieprzeczytany arkusz stylów). */
  kursor: { bezRaczki: number; przyklady: string[] } | null;
  /** Wspólne kontrole jednej podstrony (lib/audyt-kontrole.ts). */
  znaleziska: Znalezisko[];
  cechy: Cechy | null;
  /** Treść pierwszego H1. */
  h1Tekst: string | null;
  /** Adresy z link rel=alternate hreflang. */
  hreflang: string[];
  /** Adresy obrazów z dokumentu (do sprawdzenia, czy istnieją). */
  obrazy: string[];
};

export type WynikCalosci = {
  domena: string;
  baza: string;
  zbadano: string;
  czasS: number;
  zrodlo: "mapa" | "linki";
  wMapie: number | null;
  /** Adresy, które znaleźliśmy, ale nie zmieściły się w limicie albo w czasie. */
  pominiete: number;
  strony: Strona[];
  zlamane: { cel: string; status: number; na: string[] }[];
  sprawdzonychLinkow: number;
  domenowe: Ustalenie[];
  osiagalna: boolean;
};

type Odpowiedz = {
  status: number;
  koncowy: string;
  przekierowania: string[];
  naglowki: Headers;
  tekst: string | null;
};

const ENCJE: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function dekoduj(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCodePoint(parseInt(h, 16)),
    )
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&(\w+);/g, (m, n) => ENCJE[n] ?? m);
}

/**
 * Pobranie z ręcznym prowadzeniem przekierowań, żeby każdy krok trafił do
 * raportu. Treść czytamy tylko z dokumentu HTML i tylko gdy jest potrzebna.
 */
const BLOKADA = /cf-browser-verification|just a moment|attention required|access denied|datadome|please enable js and disable any ad blocker/i;

/** Pobranie podstrony; gdy serwer odrzuca zwykły pomiar, drugie podejście przez Zyte. */
async function pobierz(
  adres: string,
  limitMs: number,
  czytajTresc: boolean,
): Promise<Odpowiedz | null> {
  const o = await pobierzWprost(adres, limitMs, czytajTresc);
  const zablokowana =
    !o ||
    o.status === 403 ||
    o.status === 429 ||
    o.status === 503 ||
    (o.tekst !== null && BLOKADA.test(o.tekst.slice(0, 4000)));
  if (!czytajTresc || !zablokowana) return o;
  const z = await pobierzPrzezZyte(adres, Math.min(limitMs * 3, 40000));
  if (!z || z.status >= 400 || BLOKADA.test(z.tekst.slice(0, 4000))) return o;
  return {
    status: z.status,
    koncowy: z.koncowy,
    przekierowania: o?.przekierowania ?? [],
    naglowki: z.naglowki,
    tekst: z.tekst.length > MAX_HTML_BAJTOW ? z.tekst.slice(0, MAX_HTML_BAJTOW) : z.tekst,
  };
}

async function pobierzWprost(
  adres: string,
  limitMs: number,
  czytajTresc: boolean,
): Promise<Odpowiedz | null> {
  const sygnal = AbortSignal.timeout(limitMs);
  const przekierowania: string[] = [];
  let url = adres;
  try {
    for (let krok = 0; krok < 8; krok++) {
      const odp = await fetch(url, {
        redirect: "manual",
        signal: sygnal,
        headers: { "user-agent": UA, "accept-encoding": "gzip, deflate, br" },
      });
      const cel = odp.headers.get("location");
      if (odp.status >= 300 && odp.status < 400 && cel) {
        await odp.body?.cancel().catch(() => {});
        przekierowania.push(url);
        url = new URL(cel, url).toString();
        continue;
      }
      const typ = odp.headers.get("content-type") ?? "";
      let tekst: string | null = null;
      if (czytajTresc && /html/i.test(typ)) {
        tekst = await odp.text();
        if (tekst.length > MAX_HTML_BAJTOW)
          tekst = tekst.slice(0, MAX_HTML_BAJTOW);
      } else {
        await odp.body?.cancel().catch(() => {});
      }
      return {
        status: odp.status,
        koncowy: url,
        przekierowania,
        naglowki: odp.headers,
        tekst,
      };
    }
    return {
      status: 310,
      koncowy: url,
      przekierowania,
      naglowki: new Headers(),
      tekst: null,
    };
  } catch {
    return null;
  }
}

function bezKotwicy(u: URL): string {
  u.hash = "";
  return u.toString();
}

function wewnetrzny(adres: string, hosty: Set<string>): boolean {
  try {
    const u = new URL(adres);
    return (
      (u.protocol === "https:" || u.protocol === "http:") &&
      hosty.has(u.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

function linkiZHtml(
  html: string,
  zrodlo: string,
  hosty: Set<string>,
): string[] {
  const wynik = new Set<string>();
  for (const m of html.matchAll(/<a\s[^>]*?href\s*=\s*["']([^"']+)["']/gi)) {
    const href = dekoduj(m[1].trim());
    if (!href || /^(mailto:|tel:|javascript:|#|data:)/i.test(href)) continue;
    try {
      const u = new URL(href, zrodlo);
      if (!hosty.has(u.hostname.toLowerCase())) continue;
      if (u.protocol !== "https:" && u.protocol !== "http:") continue;
      wynik.add(bezKotwicy(u));
    } catch {
      /* zły adres w linku pomijamy */
    }
  }
  return [...wynik];
}

function metaTresc(html: string, nazwa: string): string | null {
  for (const m of html.matchAll(/<meta\s[^>]*>/gi)) {
    const tag = m[0];
    if (
      !new RegExp(`(?:name|property)\\s*=\\s*["']${nazwa}["']`, "i").test(tag)
    )
      continue;
    const c = tag.match(/content\s*=\s*"([^"]*)"|content\s*=\s*'([^']*)'/i);
    if (c) return dekoduj((c[1] ?? c[2] ?? "").trim());
  }
  return null;
}

function przeanalizuj(adres: string, o: Odpowiedz, hosty: Set<string>): Strona {
  const s: Strona = {
    adres,
    status: o.status,
    koncowy: o.koncowy,
    przekierowania: o.przekierowania,
    html: o.tekst !== null,
    htmlBajty: null,
    tytul: null,
    opis: null,
    h1: 0,
    canonical: null,
    noindex: false,
    obrazyBezAlt: 0,
    mieszane: [],
    linki: [],
    kursor: null,
    znaleziska: [],
    cechy: null,
    h1Tekst: null,
    hreflang: [],
    obrazy: [],
  };
  const html = o.tekst;
  if (html === null) return s;
  s.htmlBajty = Buffer.byteLength(html, "utf8");
  const glowa = html.match(/<head[\s>][\s\S]*?<\/head>/i)?.[0] ?? html;
  const t = glowa.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  s.tytul = t === undefined ? null : dekoduj(t.replace(/\s+/g, " ").trim());
  s.opis = metaTresc(glowa, "description");
  s.h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  s.h1Tekst = h1
    ? dekoduj(h1.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim() || null
    : null;
  for (const m of html.matchAll(/<link\s[^>]*hreflang[^>]*>/gi)) {
    const h = m[0].match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!h) continue;
    try {
      s.hreflang.push(new URL(dekoduj(h), o.koncowy).toString());
    } catch {
      /* zły adres */
    }
  }
  const obrazy = new Set<string>();
  for (const m of html.matchAll(/<img\s[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi)) {
    if (/^data:/i.test(m[1])) continue;
    try {
      const u = new URL(dekoduj(m[1].trim()), o.koncowy);
      if (/^https?:$/.test(u.protocol)) obrazy.add(u.toString());
    } catch {
      /* zły adres */
    }
  }
  s.obrazy = [...obrazy].slice(0, 50);
  for (const m of glowa.matchAll(/<link\s[^>]*>/gi)) {
    if (/rel\s*=\s*["']canonical["']/i.test(m[0])) {
      const h = m[0].match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
      if (h) {
        try {
          s.canonical = new URL(dekoduj(h), o.koncowy).toString();
        } catch {
          s.canonical = h;
        }
      }
      break;
    }
  }
  const robots = [
    metaTresc(glowa, "robots"),
    metaTresc(glowa, "googlebot"),
    o.naglowki.get("x-robots-tag"),
  ]
    .filter(Boolean)
    .join(" ");
  s.noindex = /noindex/i.test(robots);
  s.obrazyBezAlt = [...html.matchAll(/<img\s[^>]*>/gi)].filter(
    (m) => !/\salt\s*=/i.test(m[0]),
  ).length;
  if (o.koncowy.startsWith("https://")) {
    const mieszane = new Set<string>();
    for (const m of html.matchAll(
      /<(?:img|script|iframe|source|video|audio|embed)\s[^>]*?(?:src|srcset)\s*=\s*["']\s*(http:\/\/[^"'\s,]+)/gi,
    )) {
      mieszane.add(m[1]);
    }
    for (const m of html.matchAll(/<link\s[^>]*>/gi)) {
      if (!/rel\s*=\s*["'][^"']*(stylesheet|icon|preload)/i.test(m[0]))
        continue;
      const h = m[0].match(/href\s*=\s*["']\s*(http:\/\/[^"']+)/i)?.[1];
      if (h) mieszane.add(h);
    }
    s.mieszane = [...mieszane].sort().slice(0, 10);
  }
  s.linki = linkiZHtml(html, o.koncowy, hosty);
  if (o.status < 300) {
    s.znaleziska = kontroleStrony(html, o.koncowy);
    s.cechy = cechyStrony(html, o.koncowy);
  }
  return s;
}

/** Adresy z mapy witryny, z rozwinięciem indeksów map. */
async function adresyZMapy(
  baza: string,
  hosty: Set<string>,
): Promise<{ adresy: string[]; razem: number; robots: string } | null> {
  let robots = "";
  try {
    const o = await fetch(`${baza}/robots.txt`, {
      headers: { "user-agent": UA },
      signal: AbortSignal.timeout(CZAS_LINKU_MS),
    });
    if (o.ok) robots = (await o.text()).slice(0, 100_000);
  } catch {
    /* brak robots.txt to nie błąd */
  }
  const zRobots = [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1]);

  const odwiedzone = new Set<string>();
  // Każda mapa to osobna lista. Przy więcej niż 200 adresach bierzemy po
  // kolei po jednym z każdej, żeby limit nie wyczerpał się na samych wpisach
  // bloga, gdy usługi stoją w następnej mapie.
  const listy: string[][] = [];
  const przejdz = async (korzen: string) => {
    const doPobrania = [korzen];
    while (doPobrania.length && odwiedzone.size < MAX_MAP) {
      const adres = doPobrania.shift()!;
      if (odwiedzone.has(adres) || /\.gz$/i.test(adres)) continue;
      odwiedzone.add(adres);
      let xml = "";
      try {
        const o = await fetch(adres, {
          headers: { "user-agent": UA },
          signal: AbortSignal.timeout(CZAS_STRONY_MS),
        });
        if (!o.ok) continue;
        xml = (await o.text()).slice(0, 20_000_000);
      } catch {
        continue;
      }
      const locs = [
        ...xml.matchAll(
          /<loc>\s*(?:<!\[CDATA\[)?\s*([^<\]\s]+)\s*(?:\]\]>)?\s*<\/loc>/gi,
        ),
      ].map((m) => dekoduj(m[1]));
      if (/<sitemapindex[\s>]/i.test(xml)) doPobrania.unshift(...locs);
      else if (/<urlset[\s>]/i.test(xml)) listy.push(locs.filter((l) => wewnetrzny(l, hosty)));
    }
  };
  // Mapy wskazane w robots.txt mają pierwszeństwo. Domyślne adresy
  // sprawdzamy tylko wtedy, gdy robots.txt nic nie wskazał albo wskazał
  // martwy adres, i kończymy na pierwszym, który zadziała.
  for (const k of zRobots) await przejdz(k);
  for (const k of [`${baza}/sitemap.xml`, `${baza}/sitemap_index.xml`, `${baza}/wp-sitemap.xml`]) {
    if (listy.some((l) => l.length)) break;
    await przejdz(k);
  }
  const unikalne = listy.map((l) => [
    ...new Set(l.map((a) => bezKotwicy(new URL(a)))),
  ]);
  const wszystkie = new Set(unikalne.flat());
  if (wszystkie.size === 0) return null;
  const wybrane: string[] = [];
  const juz = new Set<string>();
  for (let i = 0; wybrane.length < wszystkie.size; i++) {
    let dodano = false;
    for (const l of unikalne) {
      if (i < l.length) {
        dodano = true;
        if (!juz.has(l[i])) {
          juz.add(l[i]);
          wybrane.push(l[i]);
        }
      }
    }
    if (!dodano) break;
  }
  return { adresy: wybrane, razem: wszystkie.size, robots };
}

/** Pula zadań o stałej współbieżności, z kolejką, która może rosnąć w trakcie. */
async function pula(
  kolejka: string[],
  wykonaj: (adres: string) => Promise<void>,
  mozna: () => boolean,
): Promise<void> {
  let aktywne = 0;
  await new Promise<void>((gotowe) => {
    const dalej = () => {
      while (aktywne < WSPOLBIEZNOSC && kolejka.length && mozna()) {
        const adres = kolejka.shift()!;
        aktywne++;
        wykonaj(adres)
          .catch(() => {})
          .finally(() => {
            aktywne--;
            dalej();
          });
      }
      if (aktywne === 0) gotowe();
    };
    dalej();
  });
}

export async function zbadajCalosc(
  domenaWejscie: string,
  opcje: { terminStronMs?: number; terminLinkowMs?: number } = {},
): Promise<WynikCalosci> {
  const start = Date.now();
  const domena = czystaDomena(domenaWejscie);
  const terminStron = start + (opcje.terminStronMs ?? 170_000);
  const terminLinkow = start + (opcje.terminLinkowMs ?? 215_000);

  // Sprawy całej domeny liczymy równolegle, tym samym pomiarem co darmowy audyt.
  const domenowePromise = zmierz(domena)
    .then((p) =>
      // Kursor oceniamy osobno na każdej podstronie, więc nie powtarzamy go
      // w sprawach domeny.
      p.osiagalna && !p.zablokowany
        ? ocenStrone(p).filter(
            (u) =>
              u.klucz !== "kursor" &&
              (KATALOG[u.klucz]?.zakres ?? "domena") === "domena",
          )
        : [],
    )
    .catch(() => [] as Ustalenie[]);

  const hosty = new Set([domena, `www.${domena}`]);
  let baza = `https://${domena}`;
  let glowna = await pobierz(baza, CZAS_STRONY_MS, true);
  if (!glowna || glowna.status >= 500) {
    const zWww = await pobierz(`https://www.${domena}`, CZAS_STRONY_MS, true);
    if (zWww) {
      glowna = zWww;
      baza = `https://www.${domena}`;
    }
  }
  if (glowna) {
    const host = new URL(glowna.koncowy).hostname.toLowerCase();
    hosty.add(host);
    baza = `${new URL(glowna.koncowy).protocol}//${host}`;
  }

  const wynik: WynikCalosci = {
    domena,
    baza,
    zbadano: new Date(start).toISOString(),
    czasS: 0,
    zrodlo: "linki",
    wMapie: null,
    pominiete: 0,
    strony: [],
    zlamane: [],
    sprawdzonychLinkow: 0,
    domenowe: [],
    osiagalna: Boolean(glowna),
  };

  if (glowna) {
    const mapa = await adresyZMapy(baza, hosty);
    const stronyPoAdresie = new Map<string, Strona>();
    const zaplanowane = new Set<string>();
    const kolejka: string[] = [];
    const dodaj = (a: string) => {
      if (zaplanowane.has(a) || zaplanowane.size >= LIMIT_PODSTRON)
        return false;
      zaplanowane.add(a);
      kolejka.push(a);
      return true;
    };

    const startowy = bezKotwicy(new URL(glowna.koncowy));
    if (mapa) {
      wynik.zrodlo = "mapa";
      wynik.wMapie = mapa.razem;
      for (const a of mapa.adresy) dodaj(a);
    } else {
      dodaj(startowy);
    }

    // Arkusz stylów pobieramy raz na adres, bo zwykle wszystkie podstrony
    // dzielą te same pliki.
    const arkuszePamiec = new Map<
      string,
      Promise<{ arkusz: ArkuszKursora; bajty: number } | null>
    >();
    const arkusz = (adres: string) => {
      let w = arkuszePamiec.get(adres);
      if (!w) {
        w = fetch(adres, {
          headers: { "user-agent": UA },
          signal: AbortSignal.timeout(CZAS_LINKU_MS),
        })
          .then(async (r) => {
            if (!r.ok) return null;
            const t = await r.text();
            return { arkusz: przygotujCss(t), bajty: t.length };
          })
          .catch(() => null);
        arkuszePamiec.set(adres, w);
      }
      return w;
    };

    // Analiza języka każdej podstrony i jej wersje z hreflang. Sam HTML
    // nie zostaje w pamięci, tylko to, czego potrzebują kontrole.
    const jezyki = new Map<string, AnalizaJezyka>();
    const alternatywy = new Map<string, { kod: string; adres: string }[]>();

    const znalezione = new Set<string>(zaplanowane);
    await pula(
      kolejka,
      async (adres) => {
        const o = await pobierz(adres, CZAS_STRONY_MS, true);
        const s = o
          ? przeanalizuj(adres, o, hosty)
          : ({
              adres,
              status: null,
              koncowy: adres,
              przekierowania: [],
              html: false,
              htmlBajty: null,
              tytul: null,
              opis: null,
              h1: 0,
              canonical: null,
              noindex: false,
              obrazyBezAlt: 0,
              mieszane: [],
              linki: [],
              kursor: null,
              znaleziska: [],
              cechy: null,
              h1Tekst: null,
              hreflang: [],
              obrazy: [],
            } satisfies Strona);
        if (o?.tekst && o.status < 300) {
          const { arkusze, nieprzeczytane } = await arkuszeStrony(
            o.tekst,
            o.koncowy,
            arkusz,
          );
          if (nieprzeczytane === 0) {
            const k = sprawdzKursor(o.tekst, arkusze);
            s.kursor = {
              bezRaczki: k.bezRaczki,
              przyklady: k.problemy.slice(0, 3).map((x) => x.opis),
            };
          }
        }
        if (o?.tekst && o.status < 300 && s.html) {
          const a = analizujJezyk(o.tekst);
          jezyki.set(adres, a);
          alternatywy.set(adres, hreflangi(o.tekst, o.koncowy));
          s.znaleziska.push(...kontroleJezykaStrony(a));
        }
        stronyPoAdresie.set(adres, s);
        for (const l of s.linki) {
          znalezione.add(l);
          if (!mapa && !PLIKI.test(new URL(l).pathname)) dodaj(l);
        }
      },
      () => Date.now() < terminStron,
    );
    wynik.strony = [...stronyPoAdresie.values()].sort((a, b) =>
      a.adres.localeCompare(b.adres),
    );
    wynik.pominiete = mapa
      ? Math.max(0, mapa.razem - wynik.strony.length)
      : Math.max(
          0,
          [...znalezione].filter(
            (a) => !PLIKI.test(new URL(a).pathname) && !stronyPoAdresie.has(a),
          ).length,
        );

    // Linki wewnętrzne: status celu znamy z badania podstron, resztę
    // sprawdzamy osobno, bez czytania treści.
    const statusy = new Map<string, number | null>();
    const dokad = new Map<string, string>();
    for (const s of wynik.strony) {
      statusy.set(s.adres, s.status);
      if (s.przekierowania.length) dokad.set(s.adres, s.koncowy);
    }
    const zrodla = new Map<string, Set<string>>();
    for (const s of wynik.strony) {
      for (const l of s.linki) {
        if (!zrodla.has(l)) zrodla.set(l, new Set());
        zrodla.get(l)!.add(s.adres);
      }
    }
    const doSprawdzenia = [...zrodla.keys()]
      .filter((l) => !statusy.has(l))
      .sort()
      .slice(0, MAX_LINKOW_DO_SPRAWDZENIA);
    await pula(
      doSprawdzenia,
      async (cel) => {
        const o = await pobierz(cel, CZAS_LINKU_MS, false);
        statusy.set(cel, o ? o.status : null);
        if (o && o.przekierowania.length) dokad.set(cel, o.koncowy);
      },
      () => Date.now() < terminLinkow,
    );

    // Obrazy: każdy adres raz, najwyżej 150 na badanie.
    const obrazyZ = new Map<string, Set<string>>();
    for (const s of wynik.strony)
      for (const i of s.obrazy) {
        if (!obrazyZ.has(i)) obrazyZ.set(i, new Set());
        obrazyZ.get(i)!.add(s.adres);
      }
    const statusObrazu = new Map<string, number | null>();
    await pula(
      [...obrazyZ.keys()].sort().slice(0, 150),
      async (i) => {
        const o = await pobierz(i, CZAS_LINKU_MS, false);
        statusObrazu.set(i, o ? o.status : null);
      },
      () => Date.now() < terminLinkow,
    );
    const zlychObrazow = new Map<string, string[]>();
    for (const [i, st] of statusObrazu) {
      if (st !== 404 && st !== 410) continue;
      for (const a of obrazyZ.get(i)!) {
        if (!zlychObrazow.has(a)) zlychObrazow.set(a, []);
        zlychObrazow.get(a)!.push(i);
      }
    }

    // Zależności między podstronami: przekierowania w linkach, hreflang,
    // mapa a robots.txt, podstrony spoza mapy.
    const poAdresie = new Map(wynik.strony.map((s) => [bezUkosnika(s.adres), s]));
    const dopisz = (s: Strona, klucz: string, szczegol: string) => {
      const juz = s.znaleziska.find((z) => z.klucz === klucz);
      if (juz) {
        if (juz.szczegol.length < 300) juz.szczegol += `; ${szczegol}`;
        else if (!juz.szczegol.endsWith("i więcej"))
          juz.szczegol += "; i więcej";
      }
      else s.znaleziska.push({ klucz, szczegol });
    };
    const robots = mapa ? regulyRobots(mapa.robots) : null;
    const wMapie = new Set((mapa?.adresy ?? []).map(bezUkosnika));
    for (const s of wynik.strony) {
      const doPrzekierowan = s.linki.filter((l) => dokad.has(l));
      if (doPrzekierowan.length)
        dopisz(
          s,
          "linki_do_przekierowan",
          `${doPrzekierowan.length} ${odmien(doPrzekierowan.length, "link", "linki", "linków")}, np. ${krotki(doPrzekierowan[0])} → ${krotki(dokad.get(doPrzekierowan[0])!)}`,
        );
      const zle = zlychObrazow.get(s.adres);
      if (zle)
        dopisz(s, "obrazy_404", `${zle.length} ${odmien(zle.length, "obraz", "obrazy", "obrazów")}, np. ${zle[0]}`);
      for (const h of s.hreflang) {
        const cel = poAdresie.get(bezUkosnika(h));
        if (!cel || cel === s || !cel.html) continue;
        if (!cel.hreflang.some((x) => bezUkosnika(x) === bezUkosnika(s.adres)))
          dopisz(s, "hreflang_bledy", `${krotki(cel.adres)} nie wskazuje z powrotem tej podstrony`);
      }
      if (robots && wMapie.has(bezUkosnika(s.adres))) {
        const u = new URL(s.adres);
        if (zablokowanyPrzezRobots(u.pathname + u.search, robots))
          dopisz(s, "robots_blokuje_mape", "adres jest w mapie i jest zablokowany w robots.txt");
      }
    }
    if (mapa) {
      const poza: [string, Set<string>][] = [];
      for (const [l, na] of zrodla) {
        if (wMapie.has(bezUkosnika(l)) || dokad.has(l) || statusy.get(l) !== 200) continue;
        const u = new URL(l);
        // Kolejne strony listy wpisów nie muszą być w mapie.
        if (u.search || PLIKI.test(u.pathname) || /\/page\/\d+\/?$/.test(u.pathname))
          continue;
        poza.push([l, na]);
      }
      // Strona z noindex (meta albo X-Robots-Tag) albo z canonical na inny
      // adres celowo nie stoi w mapie, więc najpierw czytamy jej nagłówek.
      const doMapy = new Set<string>();
      await pula(
        poza.map(([l]) => l).slice(0, 40),
        async (l) => {
          const o = await pobierz(l, CZAS_LINKU_MS, true);
          if (!o || o.tekst === null || o.status !== 200) return;
          const s = przeanalizuj(l, o, hosty);
          if (!s.noindex && (!s.canonical || bezUkosnika(s.canonical) === bezUkosnika(s.koncowy)))
            doMapy.add(l);
        },
        () => Date.now() < start + 230_000,
      );
      for (const [l, na] of poza.slice(0, 40)) {
        if (!doMapy.has(l)) continue;
        const zrodlo = poAdresie.get(bezUkosnika([...na].sort()[0]));
        if (zrodlo) dopisz(zrodlo, "poza_mapa", krotki(l));
      }
    }

    // Wersje językowe: obca wersja porównana z polską. Brakujące alternatywy
    // dociągamy, najwyżej 15 i tylko gdy zostało dość czasu.
    const analizaPo = (a: string) => {
      for (const [k, v] of jezyki) if (bezUkosnika(k) === bezUkosnika(a)) return v;
      return undefined;
    };
    const doPobrania = new Map<string, string>();
    for (const s of wynik.strony) {
      const a = jezyki.get(s.adres);
      if (!a || a.jezyk !== "pl") continue;
      for (const alt of alternatywy.get(s.adres) ?? []) {
        if (/^pl/.test(alt.kod) || bezUkosnika(alt.adres) === bezUkosnika(s.adres)) continue;
        if (!analizaPo(alt.adres) && !doPobrania.has(alt.adres)) doPobrania.set(alt.adres, s.adres);
      }
    }
    const dociagniete = new Map<string, AnalizaJezyka>();
    if (Date.now() < start + 225_000)
      await pula(
        [...doPobrania.keys()].sort().slice(0, 15),
        async (alt) => {
          const h = await pobierzHtml(alt, CZAS_LINKU_MS);
          if (h) dociagniete.set(alt, analizujJezyk(h));
        },
        () => Date.now() < start + 240_000,
      );
    for (const s of wynik.strony) {
      const pl = jezyki.get(s.adres);
      if (!pl || pl.jezyk !== "pl") continue;
      for (const alt of alternatywy.get(s.adres) ?? []) {
        if (/^pl/.test(alt.kod) || bezUkosnika(alt.adres) === bezUkosnika(s.adres)) continue;
        const zbadana = analizaPo(alt.adres);
        const obca = zbadana ?? dociagniete.get(alt.adres);
        if (!obca || obca.jezyk === "pl") continue;
        const t = kontrolaTlumaczenia(obca, pl, krotki(s.adres));
        const cel = zbadana ? poAdresie.get(bezUkosnika(alt.adres)) : s;
        if (!cel) continue;
        const przedrostek = zbadana ? "" : `wersja ${krotki(alt.adres)}: `;
        if (t) dopisz(cel, t.klucz, przedrostek + t.szczegol);
        // Podstrony z crawla mają już własne kontrole języka, dociągnięte nie.
        if (!zbadana) for (const z of kontroleJezykaStrony(obca)) dopisz(s, z.klucz, przedrostek + z.szczegol);
      }
    }

    // Literówki na podstronach rozpoznanych jako polskie.
    if (Date.now() < start + 250_000) {
      const polskie = wynik.strony
        .filter((s) => jezyki.get(s.adres)?.rozpoznany === "pl")
        .map((s) => ({ adres: s.adres, tekst: jezyki.get(s.adres)!.tekst }));
      const literowki = polskie.length ? await znajdzLiterowki(polskie, domena) : null;
      for (const l of literowki ?? []) {
        const s = poAdresie.get(bezUkosnika(l.adres));
        if (s) dopisz(s, "literowki", `${l.slowo} → ${l.podpowiedz}${l.cytat ? ` („${l.cytat}”)` : ""}`);
      }
    }
    wynik.sprawdzonychLinkow = [...zrodla.keys()].filter((l) =>
      statusy.has(l),
    ).length;
    for (const [cel, na] of zrodla) {
      const st = statusy.get(cel);
      if (st && st >= 400 && st !== 429) {
        wynik.zlamane.push({ cel, status: st, na: [...na].sort() });
      }
    }
    wynik.zlamane.sort((a, b) => a.cel.localeCompare(b.cel));
  }

  // Cechy całej witryny (polityka prywatności, kontakt, NIP, zgoda na
  // cookies, sklep): wystarczy, że są na którejkolwiek podstronie.
  const cechy = wynik.strony.flatMap((s) => (s.cechy ? [s.cechy] : []));
  const witryna = cechy.length
    ? [
        ...kontroleWitryny(
          polaczCechy(cechy),
          `na żadnej z ${cechy.length} ${odmien(cechy.length, "sprawdzonej podstrony", "sprawdzonych podstron", "sprawdzonych podstron")}`,
        ),
        ...(await sprawdzAkcje(polaczCechy(cechy).akcje)),
      ]
    : [];
  wynik.domenowe = [
    ...(await domenowePromise),
    ...witryna.flatMap((z) => {
      const u = zZnaleziska(z);
      return u ? [u] : [];
    }),
  ].sort((a, b) => (a.waga === b.waga ? 0 : a.waga === "krytyczne" || (a.waga === "wazne" && b.waga === "drobne") ? -1 : 1));
  wynik.czasS = Math.round((Date.now() - start) / 1000);
  return wynik;
}

/* ------------------------------------------------------------------ */
/* Ocena: z faktów o podstronach lista problemów pogrupowana po rodzaju */
/* ------------------------------------------------------------------ */

export type Grupa = {
  klucz: string;
  tytul: string;
  ryzyko: string;
  waga: "wazne" | "drobne";
  wpisy: { adres: string; szczegol?: string }[];
};

const TYTUL_MIN = 10;
const TYTUL_MAX = 60;
const OPIS_MIN = 50;
const OPIS_MAX = 160;

function bezUkosnika(a: string): string {
  return a.replace(/\/$/, "");
}

export function grupujProblemy(w: WynikCalosci): Grupa[] {
  // Grupy, które mówią o błędach i utracie ruchu, idą przed kosmetyką.
  const WAZNE = new Set([
    "bledy",
    "zlamane",
    "brak_odpowiedzi",
    "noindex",
    "canonical_inny",
    "mieszana",
  ]);
  const g = (klucz: string, tytul: string, ryzyko: string): Grupa => ({
    klucz,
    tytul,
    ryzyko,
    waga: WAZNE.has(klucz) ? "wazne" : "drobne",
    wpisy: [],
  });
  const bledy = g(
    "bledy",
    "Podstrony zwracają błąd",
    "Klient i wyszukiwarka trafiają na stronę błędu, a Google z czasem usuwa taki adres z wyników.",
  );
  const brakOdp = g(
    "brak_odpowiedzi",
    "Podstrony nie odpowiedziały w 10 sekund",
    "Tak długo nikt nie czeka, a robot Google odpuszcza i wraca rzadziej.",
  );
  const przekierowania = g(
    "przekierowania",
    w.zrodlo === "mapa"
      ? "Adresy z mapy witryny przekierowują"
      : "Linki prowadzą przez przekierowanie",
    "Wyszukiwarka traci czas na adresy pośrednie, a mapa witryny przestaje być dla niej wiarygodna.",
  );
  const lancuchy = g(
    "lancuchy",
    "Łańcuchy przekierowań (więcej niż jeden krok)",
    "Każdy krok spowalnia wejście i osłabia przeniesienie pozycji ze starego adresu.",
  );
  const tytulBrak = g(
    "tytul_brak",
    "Brak tytułu strony",
    "Google sam wymyśla nagłówek wyniku, zwykle gorszy niż Twój, i rzadziej się w niego klika.",
  );
  const tytulDup = g(
    "tytul_duplikat",
    "Ten sam tytuł na kilku podstronach",
    "Wyszukiwarka nie wie, którą podstronę pokazać, i podstrony konkurują ze sobą o to samo zapytanie.",
  );
  const tytulDl = g(
    "tytul_dlugosc",
    `Tytuł krótszy niż ${TYTUL_MIN} albo dłuższy niż ${TYTUL_MAX} znaków`,
    "Za długi tytuł Google ucina w wynikach, za krótki nie mówi, czego dotyczy podstrona.",
  );
  const opisBrak = g(
    "opis_brak",
    "Brak opisu (meta description)",
    "Pod wynikiem pojawia się przypadkowy fragment tekstu zamiast zachęty do kliknięcia.",
  );
  const opisDup = g(
    "opis_duplikat",
    "Ten sam opis na kilku podstronach",
    "Identyczne opisy w wynikach wyglądają jak powielona treść i obniżają klikalność.",
  );
  const opisDl = g(
    "opis_dlugosc",
    `Opis krótszy niż ${OPIS_MIN} albo dłuższy niż ${OPIS_MAX} znaków`,
    "Za długi opis zostaje ucięty, za krótki Google często zastępuje własnym fragmentem.",
  );
  const h1Brak = g(
    "h1_brak",
    "Brak nagłówka H1",
    "Wyszukiwarka i czytniki ekranu nie dostają jasnej informacji, o czym jest podstrona.",
  );
  const h1Wiele = g(
    "h1_wiele",
    "Więcej niż jeden nagłówek H1",
    "Rozmywa temat podstrony, a wyszukiwarka musi zgadywać, który nagłówek jest główny.",
  );
  const canBrak = g(
    "canonical_brak",
    "Brak adresu kanonicznego (canonical)",
    "Ta sama treść pod kilkoma adresami (z parametrami, z ukośnikiem i bez) dzieli między siebie pozycję.",
  );
  const canInny = g(
    "canonical_inny",
    "Canonical wskazuje inny adres",
    "Podstrona mówi Google, żeby jej nie pokazywał, tylko inny adres. Jeżeli to pomyłka, znika z wyników.",
  );
  const noindex = g(
    "noindex",
    "Podstrona zablokowana dla wyszukiwarki (noindex)",
    "Google jej nie pokaże. Jeżeli ma przyciągać klientów, to blokada jest błędem.",
  );
  const ciezki = g(
    "ciezki_html",
    "Dokument HTML cięższy niż 500 kB",
    "Na słabym łączu podstrona ładuje się wyraźnie dłużej, zanim cokolwiek się pokaże.",
  );
  const alt = g(
    "alt",
    "Obrazy bez opisu alternatywnego (alt)",
    "Obraz nie trafi do wyszukiwarki grafiki, a osoba niewidoma nie wie, co przedstawia.",
  );
  const mieszane = g(
    "mieszana",
    "Mieszana treść: pliki po http na stronie https",
    "Przeglądarka blokuje takie pliki albo pokazuje ostrzeżenie, że strona nie jest w pełni bezpieczna.",
  );
  const kursor = g(
    "kursor",
    "Klikalne elementy nie zmieniają kursora na rączkę",
    "Przycisk, który nie zmienia kursora, wygląda na nieklikalny, więc część osób go nie kliknie.",
  );
  const zlamane = g(
    "zlamane",
    "Linki wewnętrzne prowadzą do błędu",
    "Klient klika i trafia w ślepy zaułek, a wyszukiwarka uznaje stronę za zaniedbaną.",
  );

  const html = w.strony.filter(
    (s) => s.html && s.status !== null && s.status < 300,
  );

  for (const s of w.strony) {
    if (s.status === null) brakOdp.wpisy.push({ adres: s.adres });
    else if (s.status >= 400)
      bledy.wpisy.push({ adres: s.adres, szczegol: `kod ${s.status}` });
    if (
      s.przekierowania.length > 0 &&
      (w.zrodlo === "mapa" || s.adres !== w.baza + "/")
    ) {
      przekierowania.wpisy.push({
        adres: s.adres,
        szczegol: `prowadzi do ${s.koncowy}`,
      });
    }
    if (s.przekierowania.length > 1) {
      lancuchy.wpisy.push({
        adres: s.adres,
        szczegol: `${s.przekierowania.length} ${odmien(s.przekierowania.length, "krok", "kroki", "kroków")}, koniec: ${s.koncowy}`,
      });
    }
  }

  // Duplikaty liczymy tylko między podstronami, które same uważają się za
  // kanoniczne. Wersja z parametrem, która wskazuje oryginał, ma prawo mieć
  // ten sam tytuł.
  const kanoniczne = html.filter(
    (s) =>
      !s.noindex &&
      (!s.canonical || bezUkosnika(s.canonical) === bezUkosnika(s.koncowy)),
  );
  const duplikaty = (pole: (s: Strona) => string | null, grupa: Grupa) => {
    const mapa = new Map<string, Strona[]>();
    for (const s of kanoniczne) {
      const v = pole(s)?.trim().toLowerCase();
      if (!v) continue;
      if (!mapa.has(v)) mapa.set(v, []);
      mapa.get(v)!.push(s);
    }
    for (const lista of mapa.values()) {
      if (lista.length < 2) continue;
      for (const s of lista) {
        grupa.wpisy.push({
          adres: s.adres,
          szczegol: `„${(pole(s) ?? "").slice(0, 90)}”, na ${lista.length} podstronach`,
        });
      }
    }
  };
  duplikaty((s) => s.tytul, tytulDup);
  const h1Dup = g("h1_duplikat", KATALOG.h1_duplikat.tytul, KATALOG.h1_duplikat.skutek);
  duplikaty((s) => s.h1Tekst, h1Dup);
  duplikaty((s) => s.opis, opisDup);

  for (const s of html) {
    if (!s.tytul) tytulBrak.wpisy.push({ adres: s.adres });
    else if (s.tytul.length < TYTUL_MIN || s.tytul.length > TYTUL_MAX)
      tytulDl.wpisy.push({
        adres: s.adres,
        szczegol: `${s.tytul.length} ${odmien(s.tytul.length, "znak", "znaki", "znaków")}`,
      });
    if (!s.opis) opisBrak.wpisy.push({ adres: s.adres });
    else if (s.opis.length < OPIS_MIN || s.opis.length > OPIS_MAX)
      opisDl.wpisy.push({
        adres: s.adres,
        szczegol: `${s.opis.length} ${odmien(s.opis.length, "znak", "znaki", "znaków")}`,
      });
    if (s.h1 === 0) h1Brak.wpisy.push({ adres: s.adres });
    else if (s.h1 > 1)
      h1Wiele.wpisy.push({
        adres: s.adres,
        szczegol: `${s.h1} ${odmien(s.h1, "nagłówek", "nagłówki", "nagłówków")}`,
      });
    if (!s.canonical) canBrak.wpisy.push({ adres: s.adres });
    else if (bezUkosnika(s.canonical) !== bezUkosnika(s.koncowy))
      canInny.wpisy.push({
        adres: s.adres,
        szczegol: `wskazuje ${s.canonical}`,
      });
    if (s.noindex) noindex.wpisy.push({ adres: s.adres });
    if (s.htmlBajty !== null && s.htmlBajty > CIEZKI_HTML)
      ciezki.wpisy.push({
        adres: s.adres,
        szczegol: `${Math.round(s.htmlBajty / 1024)} kB`,
      });
    if (s.obrazyBezAlt > 0)
      alt.wpisy.push({
        adres: s.adres,
        szczegol: `${s.obrazyBezAlt} ${odmien(s.obrazyBezAlt, "obraz", "obrazy", "obrazów")}`,
      });
    if (s.kursor && s.kursor.bezRaczki > 0)
      kursor.wpisy.push({
        adres: s.adres,
        szczegol: `${s.kursor.bezRaczki} ${odmien(s.kursor.bezRaczki, "element", "elementy", "elementów")}, np. ${s.kursor.przyklady.join(", ")}`,
      });
    if (s.mieszane.length > 0)
      mieszane.wpisy.push({
        adres: s.adres,
        szczegol: s.mieszane.slice(0, 3).join(", "),
      });
  }

  for (const z of w.zlamane) {
    const na =
      z.na.slice(0, 3).join(", ") +
      (z.na.length > 3 ? ` i ${z.na.length - 3} innych` : "");
    zlamane.wpisy.push({
      adres: z.cel,
      szczegol: `kod ${z.status}, link na: ${na}`,
    });
  }

  const wspolne = new Map<string, Grupa>();
  for (const s of html) {
    for (const z of s.znaleziska) {
      const k = KATALOG[z.klucz];
      if (!k) continue;
      if (!wspolne.has(z.klucz))
        wspolne.set(z.klucz, {
          klucz: z.klucz,
          tytul: k.tytul,
          ryzyko: k.skutek,
          waga: k.waga,
          wpisy: [],
        });
      wspolne.get(z.klucz)!.wpisy.push({ adres: s.adres, szczegol: z.szczegol });
    }
  }

  return [
    bledy,
    zlamane,
    brakOdp,
    noindex,
    canInny,
    mieszane,
    przekierowania,
    lancuchy,
    tytulBrak,
    tytulDup,
    opisBrak,
    opisDup,
    h1Brak,
    h1Wiele,
    canBrak,
    tytulDl,
    opisDl,
    alt,
    kursor,
    ciezki,
    h1Dup,
    ...wspolne.values(),
  ]
    .filter((x) => x.wpisy.length > 0)
    // sort jest stabilny, więc w obrębie wagi zostaje kolejność z listy
    .sort((a, b) => (a.waga === b.waga ? 0 : a.waga === "wazne" ? -1 : 1));
}

/* ------------------------------------------------------------------ */
/* Raport mailem                                                        */
/* ------------------------------------------------------------------ */

/** Tyle adresów pokazujemy w grupie, resztę liczbą. */
const NAJWYZEJ_ADRESOW = 10;

export const PLATNOSC = {
  netto: "10,00 zł",
  vat: "2,30 zł",
  brutto: "12,30 zł",
  odbiorca: "Paweł Iwanek (FluxLab)",
  adres: "ul. Żołnierska 10/36, 20-801 Lublin",
  nip: "7123336008",
  rachunek: "97 1950 0001 2006 0021 4419 0001",
};

function esc(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function krotki(adres: string): string {
  try {
    const u = new URL(adres);
    return u.pathname + u.search || "/";
  } catch {
    return adres;
  }
}

export function daneliczbowe(w: WynikCalosci) {
  const grupy = grupujProblemy(w);
  return {
    grupy,
    sprawdzone: w.strony.length,
    zBledem: w.strony.filter((s) => s.status === null || s.status >= 400)
      .length,
    problemow: grupy.reduce((s, g) => s + g.wpisy.length, 0),
    // Liczymy tylko zbadane podstrony. Wpisy o złamanych linkach mają
    // w adresie cel linku, a nie podstronę.
    podstronZProblemem: new Set(
      grupy
        .flatMap((g) => g.wpisy.map((x) => x.adres))
        .filter((a) => w.strony.some((s) => s.adres === a)),
    ).size,
  };
}

const WAGA_DOMENY: Record<string, string> = {
  krytyczne: "krytyczne",
  wazne: "ważne",
  drobne: "drobne",
};

export function raportHtml(
  w: WynikCalosci,
  opcje: { nip?: string; naglowek?: string } = {},
): string {
  const d = daneliczbowe(w);
  const data = new Date(w.zbadano).toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
  });
  const p = (t: string) =>
    `<p style="margin:0 0 10px;font-size:14px;line-height:1.55;color:#374151">${t}</p>`;
  const h2 = (t: string) =>
    `<h2 style="margin:30px 0 10px;font-size:17px;color:#111827;border-bottom:2px solid #6366f1;padding-bottom:6px">${esc(t)}</h2>`;
  const liczba = (n: number | string, opis: string) =>
    `<td style="padding:10px 12px;border:1px solid #e5e7eb;text-align:center"><div style="font-size:22px;font-weight:800;color:#111827">${n}</div><div style="font-size:12px;color:#6b7280">${esc(opis)}</div></td>`;

  const zrodlo =
    w.zrodlo === "mapa"
      ? `Adresy wzięliśmy z mapy witryny (${w.wMapie} ${odmien(w.wMapie ?? 0, "adres", "adresy", "adresów")}).`
      : "Mapy witryny nie znaleźliśmy, więc adresy zebraliśmy z linków, zaczynając od strony głównej.";
  const pominiete =
    w.pominiete > 0
      ? ` ${w.pominiete} ${odmien(w.pominiete, "adres", "adresy", "adresów")} nie ${odmien(w.pominiete, "zmieścił", "zmieściły", "zmieściło")} się w limicie ${LIMIT_PODSTRON} podstron albo w czasie badania.`
      : "";

  let tresc = "";
  if (opcje.naglowek) tresc += opcje.naglowek;
  tresc += `<h1 style="margin:0 0 6px;font-size:22px;color:#111827">Audyt całej strony ${esc(w.domena)}</h1>`;
  tresc += p(`Zbadano ${esc(data)}. ${zrodlo}${pominiete}`);

  if (!w.osiagalna || d.sprawdzone === 0) {
    tresc += p(
      "Twoja strona nie odpowiedziała na nasze zapytania, więc nie mamy czego ocenić. Za taki audyt nic nie płacisz. Sprawdź adres i odpisz na tę wiadomość, a zbadamy ją jeszcze raz.",
    );
  } else {
    tresc += `<table style="border-collapse:collapse;width:100%;margin:14px 0"><tr>
      ${liczba(d.sprawdzone, "podstron sprawdzonych")}
      ${liczba(d.zBledem, "z błędem lub bez odpowiedzi")}
      ${liczba(d.podstronZProblemem, "podstron do poprawy")}
      ${liczba(d.problemow, "problemów łącznie")}
    </tr></table>`;
    tresc += p(
      `Sprawdziliśmy też ${w.sprawdzonychLinkow} ${odmien(w.sprawdzonychLinkow, "link wewnętrzny", "linki wewnętrzne", "linków wewnętrznych")}. Badanie trwało ${w.czasS} s.`,
    );

    tresc += h2("Problemy na podstronach");
    if (d.grupy.length === 0) {
      tresc += p("Nie znaleźliśmy problemów na żadnej sprawdzonej podstronie.");
    }
    for (const g of d.grupy) {
      tresc += `<h3 style="margin:22px 0 4px;font-size:15px;color:#111827">${esc(g.tytul)} (${g.wpisy.length})</h3>`;
      tresc += `<p style="margin:0 0 8px;font-size:13px;color:#6b7280">${esc(g.ryzyko)}</p>`;
      tresc += `<ul style="margin:0;padding-left:18px">`;
      for (const x of g.wpisy.slice(0, NAJWYZEJ_ADRESOW)) {
        tresc += `<li style="font-size:13px;line-height:1.5;color:#374151;word-break:break-all"><a href="${esc(x.adres)}" style="color:#4f46e5">${esc(krotki(x.adres))}</a>${x.szczegol ? ` <span style="color:#6b7280">(${esc(x.szczegol)})</span>` : ""}</li>`;
      }
      if (g.wpisy.length > NAJWYZEJ_ADRESOW)
        tresc += `<li style="font-size:13px;line-height:1.5;color:#6b7280">i ${g.wpisy.length - NAJWYZEJ_ADRESOW} innych</li>`;
      tresc += `</ul>`;
    }
  }

  tresc += h2("Cała witryna, domena i poczta");
  if (w.domenowe.length === 0) {
    tresc += p(
      "Certyfikat, nagłówki, dane kontaktowe, polityka prywatności i zabezpieczenia poczty są w porządku albo nie dało się ich zmierzyć.",
    );
  } else {
    tresc += `<ul style="margin:0;padding-left:18px">`;
    for (const u of w.domenowe) {
      tresc += `<li style="font-size:13px;line-height:1.5;color:#374151;margin-bottom:6px"><strong>${esc(u.tytul)}</strong> <span style="color:#6b7280">(${WAGA_DOMENY[u.waga] ?? u.waga})</span><br>${esc(u.fakt)} ${esc(u.skutek)}</li>`;
    }
    tresc += `</ul>`;
  }

  tresc += h2("Co dalej");
  tresc += p(
    "Każdą pozycję z listy możesz poprawić sam albo przekazać osobie, która opiekuje się stroną. Jeżeli wolisz, żebyśmy zrobili to my, odpisz na tę wiadomość, a podamy cenę.",
  );

  if (w.osiagalna && d.sprawdzone > 0) {
    tresc += h2("Płatność");
    tresc += `<table style="border-collapse:collapse;font-size:14px;color:#111827">
      <tr><td style="padding:3px 14px 3px 0;color:#6b7280">Kwota</td><td><strong>${PLATNOSC.brutto} brutto</strong> (${PLATNOSC.netto} netto + 23% VAT ${PLATNOSC.vat})</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:#6b7280">Odbiorca</td><td>${esc(PLATNOSC.odbiorca)}, ${esc(PLATNOSC.adres)}</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:#6b7280">NIP</td><td>${PLATNOSC.nip}</td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:#6b7280">Rachunek</td><td><strong>${PLATNOSC.rachunek}</strong></td></tr>
      <tr><td style="padding:3px 14px 3px 0;color:#6b7280">Tytuł</td><td>Audyt ${esc(w.domena)}</td></tr>
    </table>`;
    tresc += p(
      opcje.nip
        ? `Fakturę VAT wystawimy na NIP ${esc(opcje.nip)} po otrzymaniu wpłaty.`
        : "Potrzebujesz faktury na firmę? Odpisz z numerem NIP.",
    );
  }
  tresc += `<p style="margin:26px 0 0;font-size:13px;color:#6b7280">FluxLab, <a href="https://fluxlab.pl" style="color:#4f46e5">fluxlab.pl</a></p>`;

  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><title>Audyt ${esc(w.domena)}</title></head><body style="margin:0;background:#f9fafb"><div style="max-width:720px;margin:0 auto;padding:24px 20px;background:#ffffff;font-family:Arial,Helvetica,sans-serif">${tresc}</div></body></html>`;
}

export function raportTekst(
  w: WynikCalosci,
  opcje: { nip?: string } = {},
): string {
  const d = daneliczbowe(w);
  const l: string[] = [`Audyt całej strony ${w.domena}`, ""];
  if (!w.osiagalna || d.sprawdzone === 0) {
    l.push(
      "Twoja strona nie odpowiedziała, więc nie mamy czego ocenić. Za taki audyt nic nie płacisz.",
    );
  } else {
    l.push(
      `Podstron sprawdzonych: ${d.sprawdzone}`,
      `Z błędem lub bez odpowiedzi: ${d.zBledem}`,
      `Podstron do poprawy: ${d.podstronZProblemem}`,
      `Problemów łącznie: ${d.problemow}`,
      "",
    );
    for (const g of d.grupy) {
      l.push(`${g.tytul} (${g.wpisy.length})`, g.ryzyko);
      for (const x of g.wpisy.slice(0, NAJWYZEJ_ADRESOW))
        l.push(`  ${x.adres}${x.szczegol ? ` (${x.szczegol})` : ""}`);
      if (g.wpisy.length > NAJWYZEJ_ADRESOW)
        l.push(`  i ${g.wpisy.length - NAJWYZEJ_ADRESOW} innych`);
      l.push("");
    }
  }
  if (w.domenowe.length) {
    l.push("Cała witryna, domena i poczta");
    for (const u of w.domenowe) l.push(`  ${u.tytul}: ${u.fakt}`);
    l.push("");
  }
  if (w.osiagalna && d.sprawdzone > 0) {
    l.push(
      "Płatność",
      `Kwota: ${PLATNOSC.brutto} brutto (${PLATNOSC.netto} netto + 23% VAT)`,
      `Odbiorca: ${PLATNOSC.odbiorca}, ${PLATNOSC.adres}`,
      `NIP: ${PLATNOSC.nip}`,
      `Rachunek: ${PLATNOSC.rachunek}`,
      `Tytuł: Audyt ${w.domena}`,
      opcje.nip
        ? `Fakturę wystawimy na NIP ${opcje.nip}.`
        : "Faktura na firmę: odpisz z numerem NIP.",
    );
  }
  return l.join("\n");
}
