import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

// Sklepy odsiewaja nietypowe naglowki. Pomiar 2026-09-21: przy wlasnym UA
// siedem z siedmiu sprawdzonych sklepow oddawalo 403 albo przekierowanie bez
// tresci, przy naglowkach przegladarki te same siedem oddalo strone.
const UA = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
  "Accept-Language": "pl-PL,pl;q=0.9",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
};

// Sklepy zapisuja ten komunikat na kilkanascie sposobow. Kazdy wzorzec musi
// laczyc slowo o najnizszej cenie z okresem 30 dni, zeby nie liczyc jako
// zgodnosci przypadkowego "30 dni na zwrot".
const WZORCE: RegExp[] = [
  /najni[zż]sza\s+cena[^<]{0,80}30\s*dni/i,
  /30\s*dni[^<]{0,80}najni[zż]sza\s+cena/i,
  /cena\s+sprzed[^<]{0,40}obni[zż]k/i,
  /najni[zż]sza\s+cena\s+z\s+ostatnich/i,
  /najni[zż]sza\s+cena\s+w\s+ci[aą]gu/i,
];

const PULAPKA = /30\s*dni\s+na\s+(zwrot|odst[aą]pienie)/i;

// Slad przekreslonej ceny na karcie. Sklep, ktory nie wystawia listy promocji
// w zadnym API, i tak musi pokazac cene przed obnizka, zeby przecena byla
// widoczna dla kupujacego.
// Kwota, a nie dowolna liczba. Bez tego warunku za przecene robi sie numer
// katalogowy albo rok produkcji.
const KWOTA = String.raw`\d[\d\s.,]{0,12}(z[lł]|PLN|&nbsp;z)`;

const PRZEKRESLONA: RegExp[] = [
  new RegExp(String.raw`<del[\s>][\s\S]{0,200}?` + KWOTA, "i"),
  new RegExp(String.raw`<s[\s>][\s\S]{0,200}?` + KWOTA, "i"),
  new RegExp(
    String.raw`class="[^"]{0,120}(old-?price|regular-?price|price--old|price-old|price__old|was-?price|crossed|line-through)[^"]{0,60}"[^>]{0,200}>[\s\S]{0,200}?` +
      KWOTA,
    "i",
  ),
];

/**
 * Znacznik przekreslonej ceny szuka sie wylacznie w tresci strony. Na surowym
 * HTML wzorzec `<s` trafial w zminifikowany skrypt, bo `c<s;c++` wyglada jak
 * otwarcie znacznika. Pomiar na morele.net: 13 z 14 kart bylo w ten sposob
 * blednie uznanych za przecenione.
 */
function bezSkryptow(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
}

const MAX_PRODUKTOW = 8;
/** Ile kart otwieramy w sciezce uniwersalnej, zanim przestaniemy szukac przecen. */
const MAX_KART = 14;

// Galezie mapy strony, ktore z definicji nie zawieraja kart produktow.
// Sprawdzone na morele.net, gdzie indeks ma 587 map, a pierwsze z nich to
// kategorie, marki i zdjecia.
const POMIN_MAPE =
  /(categor|kategori|brand|marki|image|zdjec|blog|artyku|guide|porad|static|strony|noindex|unavailable|niedostep)/i;

// Adresy listingow i tresci. Karta produktu to nie kategoria ani wpis blogowy.
const POMIN_ADRES =
  /\/(kategoria|kategorie|category|blog|artykul|poradnik|guide|marka|producent|brand|szukaj|search|strona)\//i;

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

// WooCommerce oddaje nazwy z encjami HTML (&#8211;, &amp;), a w tabeli wynikow
// wygladaja jak smiec. Dekodujemy najczestsze plus forme liczbowa.
function odkoduj(tekst: string): string {
  return tekst
    .replace(/&#(\d+);/g, (_, kod) => String.fromCharCode(Number(kod)))
    .replace(/&#x([0-9a-f]+);/gi, (_, kod) => String.fromCharCode(parseInt(kod, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function naZlote(wartosc: unknown, minor: number): number {
  const n = Number(wartosc);
  return Number.isFinite(n) ? Math.round(n) / 10 ** minor : 0;
}

function naLiczbe(wartosc: unknown): number {
  const n = Number(String(wartosc ?? "").replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

async function pobierz(url: string, ms: number): Promise<string | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      signal: AbortSignal.timeout(ms),
      redirect: "follow",
    });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

/** Wyciaga obiekty Product z wszystkich blokow ld+json na stronie. */
function produktyZeStrukturalnych(html: string): Array<Record<string, unknown>> {
  const znalezione: Array<Record<string, unknown>> = [];
  const bloki = html.matchAll(
    /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi,
  );
  for (const blok of bloki) {
    let dane: unknown;
    try {
      dane = JSON.parse(blok[1].trim().replace(/^﻿/, ""));
    } catch {
      continue;
    }
    const chodz = (o: unknown) => {
      if (!o || typeof o !== "object") return;
      if (Array.isArray(o)) return o.forEach(chodz);
      const rec = o as Record<string, unknown>;
      const typ = rec["@type"];
      if (typ === "Product" || (Array.isArray(typ) && typ.includes("Product"))) {
        znalezione.push(rec);
      }
      if (rec["@graph"]) chodz(rec["@graph"]);
    };
    chodz(dane);
  }
  return znalezione;
}

function pierwszaOferta(produkt: Record<string, unknown>): Record<string, unknown> | null {
  const of = produkt.offers;
  if (!of) return null;
  const jedna = Array.isArray(of) ? of[0] : of;
  return jedna && typeof jedna === "object" ? (jedna as Record<string, unknown>) : null;
}

type Karta = {
  nazwa: string;
  url: string;
  regularna: number;
  promocyjna: number;
  zgodny: boolean;
  powod: string;
};

/** Ocena jednej karty produktu: czy jest przy niej wymagany komunikat. */
function ocenKarte(html: string, url: string, nazwa: string, regularna: number, promocyjna: number): Karta {
  const trafienie = WZORCE.some((w) => w.test(html));
  const powod = trafienie
    ? "jest informacja o najniższej cenie"
    : PULAPKA.test(html)
      ? "jest tylko informacja o 30 dniach na zwrot, to co innego"
      : "brak informacji o najniższej cenie z 30 dni";
  return { nazwa, url, regularna, promocyjna, zgodny: trafienie, powod };
}

/** Adresy sitemap z robots.txt, a gdy ich tam nie ma, dwa domyslne. */
async function adresySitemap(baza: string): Promise<string[]> {
  const robots = await pobierz(`${baza}/robots.txt`, 6000);
  const z = robots
    ? [...robots.matchAll(/^\s*sitemap:\s*(\S+)/gim)].map((m) => m[1].trim())
    : [];
  if (z.length) return [...new Set(z)].slice(0, 4);
  return [`${baza}/sitemap.xml`, `${baza}/sitemap_index.xml`];
}

function adresyZXml(xml: string): string[] {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) =>
    m[1].replace(/&amp;/g, "&"),
  );
}

/**
 * Sciezka uniwersalna: schodzi po sitemapie do adresow stron, otwiera kilkanascie
 * z nich i zostawia te, ktore sa karta produktu z widoczna obnizka. Dziala na
 * kazdym silniku, ktory oddaje gotowy HTML, bo opiera sie na dwoch rzeczach,
 * ktore sklep i tak musi pokazac: danych strukturalnych produktu i cenie
 * przed obnizka.
 */
async function przezSitemape(baza: string, koniec: number): Promise<Karta[] | null> {
  const kolejka = await adresySitemap(baza);
  const zbadane: string[] = [];
  const karty: Karta[] = [];
  let odwiedzone = 0;

  while (kolejka.length && odwiedzone < 8 && karty.length === 0 && Date.now() < koniec) {
    const adres = kolejka.shift();
    if (!adres) break;
    odwiedzone += 1;
    const xml = await pobierz(adres, 8000);
    if (!xml) continue;
    const adresy = adresyZXml(xml);

    if (/<sitemapindex/i.test(xml)) {
      // Mapa map. Bierzemy tylko te galezie, ktore moga zawierac karty
      // produktow, i najpierw te, ktore same sie tak nazywaja.
      const uzyteczne = adresy.filter((u) => !POMIN_MAPE.test(u));
      const produktowe = uzyteczne.filter((u) => /produkt|product|oferta|item/i.test(u));
      kolejka.unshift(...produktowe.slice(0, 4), ...uzyteczne.slice(0, 2));
      continue;
    }

    const strony = [...new Set(adresy)].filter(
      (u) => !/\.(xml|pdf|jpe?g|png|webp)$/i.test(u) && !POMIN_ADRES.test(u),
    );
    if (!strony.length) continue;
    zbadane.push(...strony);

    // Rownomiernie po calej liscie, zeby nie badac wylacznie jednej kategorii.
    const krok = Math.max(1, Math.floor(strony.length / MAX_KART));
    const probka: string[] = [];
    for (let i = 0; i < strony.length && probka.length < MAX_KART; i += krok) {
      probka.push(strony[i]);
    }

    const zebrane = await Promise.all(
      probka.map(async (url) => {
        if (Date.now() > koniec) return null;
        const html = await pobierz(url, 9000);
        if (!html) return null;
        const produkt = produktyZeStrukturalnych(html)[0];
        if (!produkt) return null;
        if (!PRZEKRESLONA.some((w) => w.test(bezSkryptow(html)))) return null;
        const nazwa = odkoduj(String(produkt.name || "")).slice(0, 120);
        if (!nazwa) return null;
        const oferta = pierwszaOferta(produkt);
        const cena = naLiczbe(oferta?.price ?? oferta?.lowPrice);
        return ocenKarte(html, url, nazwa, 0, cena);
      }),
    );
    karty.push(...zebrane.filter((k): k is Karta => k !== null));
  }

  // Zadna mapa nie dala sie odczytac, to nie to samo co brak przecen.
  if (!zbadane.length) return null;
  return karty;
}

/** Shopify wystawia caly katalog z cena porownawcza, bez zadnego klucza. */
async function przezShopify(baza: string): Promise<Karta[] | null> {
  const surowe = await pobierz(`${baza}/products.json?limit=250`, 7000);
  if (!surowe) return null;
  let pozycje: Array<Record<string, unknown>>;
  try {
    const dane = JSON.parse(surowe);
    pozycje = Array.isArray(dane?.products) ? dane.products : [];
  } catch {
    return null;
  }
  if (!pozycje.length) return null;

  const przecenione: Array<{ nazwa: string; url: string; regularna: number; promocyjna: number }> = [];
  for (const poz of pozycje) {
    const warianty = Array.isArray(poz.variants) ? (poz.variants as Array<Record<string, unknown>>) : [];
    const w = warianty.find((v) => naLiczbe(v.compare_at_price) > naLiczbe(v.price));
    if (!w) continue;
    przecenione.push({
      nazwa: odkoduj(String(poz.title || "")).slice(0, 120),
      url: `${baza}/products/${String(poz.handle || "")}`,
      regularna: naLiczbe(w.compare_at_price),
      promocyjna: naLiczbe(w.price),
    });
    if (przecenione.length >= MAX_PRODUKTOW) break;
  }
  // Sklep jest na Shopify, ale nie ma teraz ani jednej przeceny.
  if (!przecenione.length) return [];

  const karty = await Promise.all(
    przecenione.map(async (p) => {
      const html = await pobierz(p.url, 10000);
      if (html === null) return null;
      return ocenKarte(html, p.url, p.nazwa, p.regularna, p.promocyjna);
    }),
  );
  return karty.filter((k): k is Karta => k !== null);
}

/** WooCommerce Store API oddaje liste realnie przecenionych pozycji. */
async function przezWoo(baza: string): Promise<Karta[] | null> {
  const surowe = await pobierz(
    `${baza}/wp-json/wc/store/v1/products?on_sale=true&per_page=${MAX_PRODUKTOW}`,
    7000,
  );
  if (surowe === null) return null;

  let lista: Array<Record<string, unknown>>;
  try {
    const dane = JSON.parse(surowe);
    lista = Array.isArray(dane) ? dane : [];
  } catch {
    return null;
  }
  if (!lista.length) return [];

  const karty = await Promise.all(
    lista.slice(0, MAX_PRODUKTOW).map(async (poz) => {
      const url = String(poz.permalink || "");
      if (!url) return null;
      const ceny = (poz.prices || {}) as Record<string, unknown>;
      const minor = Number(ceny.currency_minor_unit ?? 2);
      const nazwa = odkoduj(String(poz.name || "")).slice(0, 120);
      const html = await pobierz(url, 12000);
      if (html === null) return null;
      return ocenKarte(
        html,
        url,
        nazwa,
        naZlote(ceny.regular_price, minor),
        naZlote(ceny.sale_price, minor),
      );
    }),
  );
  return karty.filter((k): k is Karta => k !== null);
}

/** Sklep bywa pod www, bywa bez. Sprawdzamy, ktory wariant w ogole odpowiada. */
async function ustalBaze(domena: string): Promise<string | null> {
  const warianty = domena.startsWith("www.")
    ? [`https://${domena}`, `https://${domena.slice(4)}`]
    : [`https://${domena}`, `https://www.${domena}`];
  for (const baza of warianty) {
    // HEAD, a nie GET. Strona glowna sklepu wazy nawet ponad megabajt, a tu
    // chodzi wylacznie o to, ktory wariant adresu w ogole odpowiada.
    try {
      const r = await fetch(`${baza}/`, {
        method: "HEAD",
        headers: UA,
        redirect: "follow",
        signal: AbortSignal.timeout(6000),
      });
      if (r.ok) return baza;
    } catch {
      // Czesc serwerow nie obsluguje HEAD, wiec sprawdzamy jeszcze raz zwyklym
      // zapytaniem, zanim uznamy adres za martwy.
    }
    if (await pobierz(`${baza}/`, 6000)) return baza;
  }
  return null;
}

export async function POST(request: Request) {
  const koniec = Date.now() + 50000;
  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomena(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj sam adres sklepu, na przykład twojsklep.pl" },
      { status: 400 },
    );
  }

  const baza = await ustalBaze(domena);
  if (!baza) {
    return NextResponse.json({
      domena,
      status: "BRAK_ODPOWIEDZI",
      naglowek: "Ten adres nie odpowiedział",
      opis:
        "Pod tym adresem nie dostałem strony sklepu. Sprawdź, czy nie ma literówki, i czy sklep na pewno działa pod tą domeną.",
    });
  }

  let karty = await przezWoo(baza);
  let metoda = "listy przecen z WooCommerce";

  if (karty === null) {
    karty = await przezShopify(baza);
    metoda = "listy przecen z Shopify";
  }
  if (karty === null && koniec - Date.now() > 8000) {
    karty = await przezSitemape(baza, koniec);
    metoda = "próbki kart produktów z mapy strony";
  }

  if (karty === null) {
    return NextResponse.json({
      domena,
      status: "BRAK_API",
      naglowek: "Nie mogę odczytać listy produktów z tego sklepu",
      opis:
        "Ten sklep nie udostępnia listy przecen w żaden ze sposobów, które sprawdzam, i nie ma czytelnej mapy strony z kartami produktów. Najczęściej znaczy to, że ceny doczytuje skrypt już w przeglądarce. Napisz, na czym stoi sklep, sprawdzę go ręcznie i odeślę wynik.",
    });
  }

  if (karty.length === 0) {
    return NextResponse.json({
      domena,
      status: "BRAK_PROMOCJI",
      metoda,
      naglowek: "Nie widzę teraz żadnej aktywnej promocji",
      opis:
        "Obowiązek podania najniższej ceny z 30 dni dotyczy momentu obniżki, więc bez aktywnych przecen nie ma czego sprawdzać. Wróć, gdy ruszy najbliższa promocja, albo napisz, a sprawdzę archiwalne.",
    });
  }

  const niezgodne = karty.filter((p) => !p.zgodny);
  const procent = Math.round((niezgodne.length / karty.length) * 100);
  const werdykt = niezgodne.length === 0 ? "ZIELONY" : procent >= 50 ? "CZERWONY" : "ZOLTY";
  const probka = metoda.startsWith("próbki");

  return NextResponse.json({
    domena,
    status: "OK",
    metoda,
    probka,
    werdykt,
    zbadane: karty.length,
    niezgodne: niezgodne.length,
    procent,
    naglowek:
      niezgodne.length === 0
        ? `Wszystkie ${karty.length} sprawdzone przeceny mają wymaganą informację`
        : `${niezgodne.length} z ${karty.length} sprawdzonych przecen bez wymaganej informacji`,
    opis:
      niezgodne.length === 0
        ? "Na sprawdzonych kartach znalazłem komunikat o najniższej cenie z 30 dni przed obniżką. To dobra wiadomość, choć nie mówi jeszcze, czy podana kwota jest prawdziwa."
        : "Przy każdej obniżce sklep ma obowiązek podać najniższą cenę z 30 dni przed promocją. Poniżej pozycje, na których tej informacji nie znalazłem. Każda ma link, więc sprawdzisz to samodzielnie.",
    produkty: karty.map((p) => ({
      nazwa: p.nazwa,
      url: p.url,
      regularna: p.regularna,
      promocyjna: p.promocyjna,
      zgodny: p.zgodny,
      powod: p.powod,
      obnizka:
        p.regularna > 0
          ? Math.round(((p.regularna - p.promocyjna) / p.regularna) * 100)
          : 0,
    })),
  });
}
