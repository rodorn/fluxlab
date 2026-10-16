/**
 * Wersje językowe: rozpoznanie języka bez AI i kontrole tłumaczeń.
 *
 * Język rozpoznajemy po słowach funkcyjnych (spójniki, przyimki, zaimki),
 * które w każdym tekście występują często i prawie się nie powtarzają między
 * językami. Decyzja zapada tylko przy wyraźnej przewadze jednego języka,
 * inaczej wynik to „nieustalony”. Ten sam tekst daje zawsze ten sam wynik.
 *
 * Z tego modułu korzystają: narzędzie /kontrola-jezykow, darmowy audyt jednej
 * strony i płatny audyt całej strony.
 */

import { odmien } from "./odmiana";

export type KodJezyka =
  | "pl"
  | "en"
  | "de"
  | "uk"
  | "ru"
  | "cs"
  | "fr"
  | "es"
  | "it";

export const NAZWA_JEZYKA: Record<KodJezyka, string> = {
  pl: "polski",
  en: "angielski",
  de: "niemiecki",
  uk: "ukraiński",
  ru: "rosyjski",
  cs: "czeski",
  fr: "francuski",
  es: "hiszpański",
  it: "włoski",
};

/** „po polsku”, „po angielsku”... */
export function poJezyku(k: KodJezyka): string {
  return NAZWA_JEZYKA[k].replace(/ki$/, "ku");
}

const SLOWA: Record<KodJezyka, string> = {
  pl: "i w na z się nie do że jest to jak po dla od o ale co już tak czy jego jej ich przez przy oraz lub być który która które ten ta te tym tego jako są tylko może można także także także więc gdy bardzo także nasz nasze naszych twoje twój jeśli jeżeli również będzie został zostać",
  en: "the and of to in is that for it with as was on be by are this from or have an not but at which you your we our they their will can has had been more all about there if would what when so no who its also into than only other than these those how then them should could may were",
  de: "der die das und ist nicht ein eine einen dem den des mit auf für von zu im sich auch es wir sie ihr ihre unsere unser wie oder aber bei nach aus wenn werden wird wurde hat haben sind noch nur über durch zum zur dass kann können mehr diese dieser sehr schon",
  uk: "і в на з що не до це як та для від по за але його її їх ми ви вони він вона бути є було буде також який яка які цей ця ці щоб коли тому або вже ще дуже тільки може можна наш наші ваш ваші при через між після",
  ru: "и в не на что с по это как для от из но его её их мы вы они он она быть был была было будет также который которая которые этот эта эти чтобы когда или уже ещё очень только может можно наш наши ваш ваши при через после",
  cs: "a v se na je že to s z do o k jako pro ale by jsou být byl bylo jsme jste nebo také jeho její jejich který která které tento tato tyto když už ještě velmi jen může můžete naše náš vaše váš při přes podle bez mezi aby",
  fr: "le la les de des du et est en un une que qui dans pour pas sur au aux avec ce cette ces il elle nous vous ils sont être été plus par se sa son ses leur leurs mais ou où comme tout tous aussi très peut faire fait nos votre vos",
  es: "el la los las de del y que en un una es por con para no se su sus al lo como más pero o este esta estos estas ser son fue ha han muy también sobre entre cuando donde todo todos nuestro nuestra nuestros puede hacer hay sin desde",
  it: "il lo la gli le di del della dei e è che in un una per non con su sono come più ma anche questo questa questi tutto tutti nostro nostra nostri suo sua loro essere stato può fare molto quando dove se dalla nella alla degli delle",
};

// Słowo wspólne dla kilku języków (np. „na” w polskim i czeskim) liczy się
// każdemu z nich ułamkowo: 1/n, gdzie n to liczba języków, które je mają.
const ZBIORY = Object.fromEntries(
  Object.entries(SLOWA).map(([k, v]) => [k, new Set(v.split(/\s+/))]),
) as Record<KodJezyka, Set<string>>;
const WAGA_SLOWA = new Map<string, number>();
for (const zb of Object.values(ZBIORY))
  for (const w of zb) WAGA_SLOWA.set(w, (WAGA_SLOWA.get(w) ?? 0) + 1);
const CYRYLICA: KodJezyka[] = ["uk", "ru"];

/** Litery, które w tej grupie języków ma tylko jeden z nich. */
const ZNAKI: [KodJezyka, RegExp][] = [
  ["pl", /[ąęłńśźżć]/g],
  ["uk", /[іїєґ]/g],
  ["ru", /[ыэъё]/g],
  ["cs", /[řůěťď]/g],
  ["de", /ß/g],
  ["es", /[ñ¿¡]/g],
  ["fr", /[çœ]/g],
];

export type Rozpoznanie = {
  jezyk: KodJezyka | null;
  trafien: number;
  slow: number;
};

/**
 * Język tekstu albo null. `minimum` to liczba trafień zwycięzcy, a zwycięzca
 * musi mieć co najmniej dwa razy tyle trafień co drugi język.
 */
export function rozpoznajJezyk(tekst: string, minimum = 3): Rozpoznanie {
  const maly = tekst.toLowerCase();
  // Jednoliterowe słowo pisane wielką literą to zwykle skrót (S.A., A4),
  // a nie spójnik, więc go nie liczymy.
  const slowa = (tekst.match(/[\p{L}']+/gu) ?? [])
    .filter((w) => w.length > 1 || w === w.toLowerCase())
    .map((w) => w.toLowerCase());
  // Najpierw alfabet: tekst cyrylicą to ukraiński albo rosyjski, łaciński to
  // cała reszta. Dzięki temu wspólne krótkie słowa nie mieszają obu grup.
  const cyr = (maly.match(/\p{Script=Cyrillic}/gu) ?? []).length;
  const lac = (maly.match(/\p{Script=Latin}/gu) ?? []).length;
  const kandydaci = (Object.keys(ZBIORY) as KodJezyka[]).filter(
    (k) => CYRYLICA.includes(k) === cyr > lac,
  );
  const punkty = {} as Record<KodJezyka, number>;
  for (const k of kandydaci) punkty[k] = 0;
  for (const s of slowa) {
    const n = WAGA_SLOWA.get(s);
    if (!n) continue;
    for (const k of kandydaci) if (ZBIORY[k].has(s)) punkty[k] += 1 / n;
  }
  // Litery charakterystyczne: najwyżej dwa punkty, żeby nazwa własna z
  // polską literą nie przeważyła całego zdania po angielsku.
  for (const [k, re] of ZNAKI)
    if (k in punkty) punkty[k] += Math.min(2, (maly.match(re) ?? []).length);
  const ranking = (Object.entries(punkty) as [KodJezyka, number][]).sort(
    (a, b) => b[1] - a[1],
  );
  const [pierwszy, drugi = ["pl", 0] as [KodJezyka, number]] = ranking;
  const jezyk =
    pierwszy[1] >= minimum && pierwszy[1] >= 2 * drugi[1] ? pierwszy[0] : null;
  return { jezyk, trafien: Math.round(pierwszy[1] * 10) / 10, slow: slowa.length };
}

/* ------------------------------------------------------------------ */
/* Tekst strony                                                         */
/* ------------------------------------------------------------------ */

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

function bezKodu(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

/** Widoczne bloki tekstu (między znacznikami), od 12 do 400 znaków. */
export function blokiTekstu(html: string): string[] {
  return bezKodu(html)
    .split(/<[^>]+>/)
    .map((t) => dekoduj(t).replace(/\s+/g, " ").trim())
    .filter((t) => t.length >= 12 && t.length <= 400);
}

export function tekstStrony(html: string): string {
  const body = html.match(/<body\b[\s\S]*$/i)?.[0] ?? html;
  return dekoduj(bezKodu(body).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------------------------------------------ */
/* Polski tekst w wersji obcej (reguła narzędzia /kontrola-jezykow)      */
/* ------------------------------------------------------------------ */

// Słowa, które w tekście obcojęzycznym praktycznie nie występują przypadkiem.
// Sama obecność polskich znaków nie wystarcza, bo nazwy własne (Łódź,
// Gdańsk) pojawiają się w poprawnych tłumaczeniach.
const POLSKIE_SLOWA = [
  "się",
  "jest",
  "dla",
  "oraz",
  "więcej",
  "wszystkie",
  "nasze",
  "naszych",
  "który",
  "która",
  "które",
  "można",
  "zobacz",
  "dowiedz",
  "sprawdź",
  "zapytaj",
  "czytaj",
  "kontakt z nami",
  "produkty",
  "usługi",
  "firma",
  "oferta",
  "strona",
  "polityka",
  "prywatności",
  "warunki",
  "dostawa",
  "zamówienie",
  "koszyk",
  "cena",
  "nowość",
  "przeczytaj",
  "pokaż",
  "wybierz",
  "jakość",
  "realizacji",
  "realizacje",
  "współpraca",
  "zapraszamy",
  "dziękujemy",
];
const POLSKIE_ZNAKI = /[ąćęłńóśźż]/i;

/** Blok uznajemy za polski przy dwóch niezależnych sygnałach albo gdy tak mówi rozpoznanie. */
export function polskiBlok(tekst: string): string[] {
  const maly = tekst.toLowerCase();
  const trafienia = POLSKIE_SLOWA.filter((s) =>
    new RegExp(`(^|[^a-ząćęłńóśźż])${s}([^a-ząćęłńóśźż]|$)`, "i").test(maly),
  );
  if (POLSKIE_ZNAKI.test(tekst)) trafienia.push("polskie znaki");
  if (trafienia.length >= 2) return trafienia.slice(0, 3);
  return rozpoznajJezyk(tekst).jezyk === "pl" ? ["słowa funkcyjne"] : [];
}

/* ------------------------------------------------------------------ */
/* Analiza jednej strony                                                */
/* ------------------------------------------------------------------ */

export type AnalizaJezyka = {
  /** Atrybut lang z <html>, pierwszy człon, małymi literami. */
  lang: string | null;
  /** Język strony: rozpoznany z tekstu, a gdy się nie da, z atrybutu lang. */
  jezyk: KodJezyka | null;
  /** Język rozpoznany z samego tekstu (null, gdy nie ma wyraźnej przewagi). */
  rozpoznany: KodJezyka | null;
  /** Bloki w innym języku niż strona. */
  obce: { jezyk: KodJezyka; cytat: string }[];
  /** Tytuł, opis, alt i przyciski w innym języku niż strona. */
  meta: string[];
  /** Trójki słów do porównania z drugą wersją. */
  trojki: Set<string>;
  /** Tekst strony do kontroli pisowni (przycięty). */
  tekst: string;
  blokow: number;
};

function trojkiSlow(tekst: string, limit = 4000): Set<string> {
  const s = tekst.toLowerCase().match(/[\p{L}\d]+/gu) ?? [];
  const wynik = new Set<string>();
  for (let i = 0; i + 2 < s.length && wynik.size < limit; i++)
    wynik.add(`${s[i]} ${s[i + 1]} ${s[i + 2]}`);
  return wynik;
}

export function podobienstwo(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let wspolne = 0;
  for (const x of a) if (b.has(x)) wspolne++;
  return wspolne / (a.size + b.size - wspolne);
}

function przytnij(t: string, n = 120): string {
  return t.length > n ? t.slice(0, n - 3).trimEnd() + "..." : t;
}

export function analizujJezyk(html: string): AnalizaJezyka {
  const lang =
    html
      .match(/<html[^>]*\blang\s*=\s*["']?([a-zA-Z]{2,3})/i)?.[1]
      ?.toLowerCase() ?? null;
  const tekst = tekstStrony(html);
  const rozpoznany = rozpoznajJezyk(tekst, 10).jezyk;
  // Gdy treść jest wymieszana i rozpoznanie nie rozstrzyga, za język strony
  // bierzemy jej deklarację. Właśnie takie strony najczęściej mają
  // niedokończone tłumaczenie.
  const jezyk =
    rozpoznany ?? (lang && lang in NAZWA_JEZYKA ? (lang as KodJezyka) : lang === "ua" ? "uk" : null);
  const bloki = blokiTekstu(html);
  const obce: AnalizaJezyka["obce"] = [];
  if (jezyk) {
    for (const b of bloki) {
      const r = rozpoznajJezyk(b, 4);
      const obcy: KodJezyka | null = r.jezyk ?? (jezyk !== "pl" && polskiBlok(b).length ? "pl" : null);
      if (obcy && obcy !== jezyk) obce.push({ jezyk: obcy, cytat: przytnij(b) });
    }
  }
  const meta: string[] = [];
  if (jezyk) {
    const sprawdz = (nazwa: string, t: string, minimum: number) => {
      const r = rozpoznajJezyk(t, minimum);
      if (r.jezyk && r.jezyk !== jezyk)
        meta.push(
          `${nazwa} po ${poJezyku(r.jezyk)}: „${przytnij(t, 80)}”`,
        );
    };
    const tytul = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    if (tytul) sprawdz("tytuł", dekoduj(tytul).trim(), 2);
    const opis = [...html.matchAll(/<meta\b[^>]*>/gi)]
      .map((m) => m[0])
      .find((t) => /name=["']description["']/i.test(t))
      ?.match(/content=["']([^"']*)["']/i)?.[1];
    if (opis) sprawdz("opis", dekoduj(opis), 3);
    const alty = [
      ...bezKodu(html).matchAll(/<img\b[^>]*\balt=["']([^"']{3,})["']/gi),
    ].map((m) => dekoduj(m[1]));
    // Każdy opis i przycisk osobno: sklejone razem przegłosowałyby się
    // nawzajem i cytat pokazywałby nie ten fragment.
    const zle = (lista: string[], minimum: number) =>
      lista.filter((t) => {
        const r = rozpoznajJezyk(t, minimum);
        return r.jezyk && r.jezyk !== jezyk;
      });
    const zleAlty = zle(alty, 3);
    if (zleAlty.length)
      meta.push(
        `${zleAlty.length} ${odmien(zleAlty.length, "opis obrazu", "opisy obrazów", "opisów obrazów")} (alt) w innym języku, np. „${przytnij(zleAlty[0], 80)}”`,
      );
    const przyciski = [
      ...bezKodu(html).matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi),
    ]
      .map((m) =>
        dekoduj(m[1].replace(/<[^>]+>/g, " "))
          .replace(/\s+/g, " ")
          .trim(),
      )
      .filter(Boolean);
    const zlePrzyciski = zle(przyciski, 2);
    if (zlePrzyciski.length)
      meta.push(
        `${zlePrzyciski.length} ${odmien(zlePrzyciski.length, "przycisk", "przyciski", "przycisków")} w innym języku, np. „${przytnij(zlePrzyciski[0], 80)}”`,
      );
  }
  return {
    lang,
    jezyk,
    rozpoznany,
    obce,
    meta,
    trojki: trojkiSlow(tekst),
    tekst: tekst.slice(0, 40_000),
    blokow: bloki.length,
  };
}

/* ------------------------------------------------------------------ */
/* Kontrole na parze stron i na jednej stronie                          */
/* ------------------------------------------------------------------ */

export type ZnaleziskoJezyka = { klucz: string; szczegol: string };

/** Kontrole jednej strony: obce bloki, lang niezgodny z treścią, metadane. */
export function kontroleJezykaStrony(a: AnalizaJezyka): ZnaleziskoJezyka[] {
  const z: ZnaleziskoJezyka[] = [];
  // Jeden obcy fragment to zwykle cytat albo nazwa nagrody. Zgłaszamy od dwóch.
  if (a.jezyk && a.obce.length >= 2) {
    const przyklad = a.obce[0];
    z.push({
      klucz: "jezyk_obce_bloki",
      szczegol: `${a.obce.length} ${odmien(a.obce.length, "fragment", "fragmenty", "fragmentów")} w innym języku niż strona (${NAZWA_JEZYKA[a.jezyk]}), np. ${NAZWA_JEZYKA[przyklad.jezyk]}: „${przyklad.cytat}”`,
    });
  }
  if (
    a.rozpoznany &&
    a.lang &&
    a.lang !== a.rozpoznany &&
    !(a.lang === "ua" && a.rozpoznany === "uk")
  )
    z.push({
      klucz: "jezyk_lang_niezgodny",
      szczegol: `lang="${a.lang}", a treść jest po ${poJezyku(a.rozpoznany)}`,
    });
  if (a.meta.length)
    z.push({ klucz: "jezyk_meta", szczegol: a.meta.slice(0, 3).join("; ") });
  return z;
}

/** Wersja obca prawie taka sama jak polska: brak tłumaczenia. */
export function kontrolaTlumaczenia(
  obca: AnalizaJezyka,
  polska: AnalizaJezyka,
  adresPolskiej: string,
): ZnaleziskoJezyka | null {
  const p = podobienstwo(obca.trojki, polska.trojki);
  if (p <= 0.6) return null;
  return {
    klucz: "brak_tlumaczenia",
    szczegol: `${Math.round(p * 100)}% tekstu jak w wersji ${adresPolskiej}`,
  };
}

/* ------------------------------------------------------------------ */
/* Wersje językowe strony                                               */
/* ------------------------------------------------------------------ */

/** Pary kod → adres z <link hreflang>, bez x-default. */
export function hreflangi(
  html: string,
  baza: string,
): { kod: string; adres: string }[] {
  const wynik: { kod: string; adres: string }[] = [];
  for (const m of html.matchAll(/<link\b[^>]*hreflang[^>]*>/gi)) {
    const kod = m[0].match(/hreflang\s*=\s*["']([^"']+)["']/i)?.[1];
    const href = m[0].match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!kod || !href || /x-default/i.test(kod)) continue;
    try {
      wynik.push({
        kod: kod.toLowerCase(),
        adres: new URL(dekoduj(href), baza).toString(),
      });
    } catch {
      /* zły adres */
    }
  }
  return wynik;
}

/** Adresy wersji obcojęzycznych strony głównej (hreflang albo /en/, /de/...). */
export function znajdzWersje(html: string, domena: string): string[] {
  const cele = new Set<string>();
  const hreflangiA = [
    ...html.matchAll(/hreflang=["']([a-z-]+)["'][^>]*href=["']([^"']+)["']/gi),
  ];
  const odwrotne = [
    ...html.matchAll(/href=["']([^"']+)["'][^>]*hreflang=["']([a-z-]+)["']/gi),
  ];
  // x-default prawie zawsze wskazuje wersję wyjściową, czyli polską.
  const pomijaj = (kod: string) => /^pl/i.test(kod) || /x-default/i.test(kod);
  for (const m of hreflangiA) if (!pomijaj(m[1])) cele.add(m[2]);
  for (const m of odwrotne) if (!pomijaj(m[2])) cele.add(m[1]);
  // Nawet bez hreflang większość serwisów trzyma wersje pod /en/ albo /de/.
  const korzen = domena.replace(/^www\./, "");
  for (const kod of ["en", "de", "cs", "sk", "uk", "fr", "es", "it"]) {
    const wzgledny = new RegExp(`href=["']/${kod}(/|["'])`, "i");
    const pelny = new RegExp(
      `href=["']https?://(?:www\\.)?${korzen.replace(/\./g, "\\.")}/${kod}(/|["'])`,
      "i",
    );
    if (wzgledny.test(html) || pelny.test(html))
      cele.add(`https://${domena}/${kod}/`);
  }
  return [...cele].slice(0, 4);
}

const UA = {
  "User-Agent":
    "Mozilla/5.0 (compatible; FluxlabAudyt/1.0; +https://fluxlab.pl/audyt)",
};

export async function pobierzHtml(
  url: string,
  ms = 12000,
): Promise<string | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      signal: AbortSignal.timeout(ms),
      redirect: "follow",
    });
    if (!r.ok) return null;
    return (await r.text()).slice(0, 3_000_000);
  } catch {
    return null;
  }
}

function pelnyAdres(url: string, domena: string): string {
  return url.startsWith("http")
    ? url
    : `https://${domena}${url.startsWith("/") ? "" : "/"}${url}`;
}

/* ------------------------------------------------------------------ */
/* Narzędzie /kontrola-jezykow                                          */
/* ------------------------------------------------------------------ */

export function czystaDomenaJezyk(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

export type WersjaZbadana = {
  url: string;
  deklarowanyJezyk: string | null;
  hreflang: number;
  blokow: number;
  polskie: { tekst: string; trafienia: string[] }[];
  analiza: AnalizaJezyka;
};

/** Wersje obcojęzyczne strony głównej razem z analizą każdej. */
export async function zbadajWersje(
  domena: string,
  glowna: string,
): Promise<WersjaZbadana[]> {
  let wersje = znajdzWersje(glowna, domena);
  // Część serwisów buduje przełącznik języka skryptem, więc w kodzie strony
  // głównej nie ma odnośnika. Zanim uznamy, że wersji nie ma, pukamy wprost.
  if (wersje.length === 0) {
    const wyniki = await Promise.all(
      ["en", "de"].map(async (kod) => {
        for (const baza of [`https://${domena}`, `https://www.${domena}`]) {
          const html = await pobierzHtml(`${baza}/${kod}/`, 10000);
          if (html && html.length > 2000) return `${baza}/${kod}/`;
        }
        return null;
      }),
    );
    wersje = wyniki.filter((w): w is string => !!w);
  }
  const zbadane: WersjaZbadana[] = [];
  const juz = new Set<string>();
  for (const url of wersje) {
    const pelny = pelnyAdres(url, domena);
    const klucz = pelny.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    if (juz.has(klucz)) continue;
    juz.add(klucz);
    const html = await pobierzHtml(pelny);
    if (html === null) continue;
    const lang = html.match(/<html[^>]*\blang=["']([^"']+)["']/i)?.[1] ?? null;
    // Trafiliśmy na wersję polską: pomijamy ją zamiast raportować jej własny
    // język jako niedokończone tłumaczenie.
    if (lang && /^pl/i.test(lang)) continue;
    const bloki = blokiTekstu(html);
    const polskie = bloki
      .map((b) => ({ tekst: b.slice(0, 160), trafienia: polskiBlok(b) }))
      .filter((b) => b.trafienia.length);
    zbadane.push({
      url: pelny,
      deklarowanyJezyk: lang,
      hreflang: (html.match(/hreflang=/gi) || []).length,
      blokow: bloki.length,
      polskie,
      analiza: analizujJezyk(html),
    });
    if (zbadane.length >= 3) break;
  }
  return zbadane;
}

/** Odpowiedź narzędzia /kontrola-jezykow, bez zmian w kształcie. */
export async function kontrolaJezykow(
  domena: string,
): Promise<Record<string, unknown>> {
  const glowna =
    (await pobierzHtml(`https://${domena}/`)) ??
    (await pobierzHtml(`https://www.${domena}/`));
  if (glowna === null) {
    return {
      domena,
      status: "BRAK_STRONY",
      naglowek: "Nie możemy otworzyć tej strony",
      opis: "Strona nie odpowiedziała albo odrzuciła połączenie. Sprawdź pisownię adresu. Jeśli jest poprawny, sprawdzimy ją ręcznie i odeślemy wynik.",
    };
  }
  const zbadane = await zbadajWersje(domena, glowna);
  if (zbadane.length === 0 && znajdzWersje(glowna, domena).length === 0) {
    return {
      domena,
      status: "BRAK_WERSJI",
      naglowek: "Nie znaleźliśmy obcojęzycznej wersji tej strony",
      opis: "Nie widzimy ani odnośników do wersji językowych, ani znaczników, po których wyszukiwarka je rozpoznaje. Jeśli wersja obcojęzyczna istnieje pod innym adresem, podaj go wprost, a sprawdzimy właśnie ją.",
    };
  }
  if (zbadane.length === 0) {
    return {
      domena,
      status: "BRAK_STRONY",
      naglowek: "Znaleźliśmy wersje językowe, ale żadna się nie otworzyła",
      opis: "Adresy wersji obcojęzycznych nie odpowiedziały. Sprawdzimy je ręcznie.",
    };
  }
  const polskichRazem = zbadane.reduce((s, z) => s + z.polskie.length, 0);
  const blokowRazem = zbadane.reduce((s, z) => s + z.blokow, 0);
  const bezHreflang = zbadane.filter((z) => z.hreflang === 0).length;
  const deklarowany =
    zbadane.map((z) => z.deklarowanyJezyk).find((l): l is string => !!l) ??
    null;
  const klamieOJezyku =
    !!deklarowany && !/^pl/i.test(deklarowany) && polskichRazem > 0;
  const werdykt =
    polskichRazem === 0 && bezHreflang === 0
      ? "ZIELONY"
      : polskichRazem >= 5 || bezHreflang === zbadane.length
        ? "CZERWONY"
        : "ZOLTY";
  const naglowek =
    polskichRazem === 0 && bezHreflang === 0
      ? "Wersja obcojęzyczna wygląda na dokończoną"
      : polskichRazem > 0 && deklarowany
        ? `${polskichRazem} fragmentów wciąż po polsku na stronie oznaczonej jako ${deklarowany}`
        : polskichRazem > 0
          ? `${polskichRazem} fragmentów wciąż po polsku w wersji obcojęzycznej`
          : `${bezHreflang} z ${zbadane.length} sprawdzonych stron bez znaczników wersji językowej`;
  return {
    domena,
    status: "OK",
    werdykt,
    naglowek,
    deklarowanyJezyk: deklarowany,
    klamieOJezyku,
    polskichRazem,
    blokowRazem,
    stronBadanych: zbadane.length,
    bezHreflang,
    strony: zbadane.map((z) => ({
      url: z.url,
      deklarowanyJezyk: z.deklarowanyJezyk,
      hreflang: z.hreflang,
      blokow: z.blokow,
      polskich: z.polskie.length,
      przyklady: z.polskie.slice(0, 5).map((p) => p.tekst),
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Audyt jednej strony: strona główna i jej wersje                      */
/* ------------------------------------------------------------------ */

/**
 * Znaleziska językowe strony głównej i wersji obcych, po jednym na rodzaj
 * (audyt jednej strony pokazuje każdy problem raz). Zwraca też analizę
 * strony głównej, bo z niej korzysta kontrola pisowni.
 */
export async function kontroleJezykoweGlownej(
  domena: string,
  html: string,
  adres: string,
): Promise<{ znaleziska: ZnaleziskoJezyka[]; glowna: AnalizaJezyka }> {
  const glowna = analizujJezyk(html);
  const wszystkie: { adres: string; z: ZnaleziskoJezyka }[] =
    kontroleJezykaStrony(glowna).map((z) => ({ adres, z }));
  const wersje = await zbadajWersje(domena, html).catch(
    () => [] as WersjaZbadana[],
  );
  for (const w of wersje) {
    for (const z of kontroleJezykaStrony(w.analiza))
      wszystkie.push({ adres: w.url, z });
    if (glowna.jezyk === "pl" && w.analiza.jezyk !== "pl") {
      const t = kontrolaTlumaczenia(w.analiza, glowna, adres);
      if (t) wszystkie.push({ adres: w.url, z: t });
    }
  }
  const poKluczu = new Map<string, string[]>();
  for (const { adres: a, z } of wszystkie) {
    if (!poKluczu.has(z.klucz)) poKluczu.set(z.klucz, []);
    poKluczu.get(z.klucz)!.push(`${a}: ${z.szczegol}`);
  }
  return {
    znaleziska: [...poKluczu].map(([klucz, l]) => ({
      klucz,
      szczegol: l.slice(0, 3).join(" | "),
    })),
    glowna,
  };
}
