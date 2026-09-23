import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const UA = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0",
  Accept: "text/html,application/xhtml+xml",
};

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

type Wariant = {
  adres: string;
  kod: number | null;
  przekierowanieDo: string | null;
  rozmiar: number | null;
  canonical: string | null;
  blad: string | null;
};

function canonicalZHtml(html: string): string | null {
  // Bierzemy tylko znacznik link rel=canonical, w obu kolejnosciach atrybutow.
  const m =
    html.match(
      /<link[^>]+rel=["']?canonical["']?[^>]*href=["']([^"']+)["']/i,
    ) ||
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']?canonical["']?/i,
    );
  return m ? m[1] : null;
}

function normalizujAdres(a: string | null): string | null {
  if (!a) return null;
  return a
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "");
}

async function pobierz(adres: string): Promise<Wariant> {
  const pusty: Wariant = {
    adres,
    kod: null,
    przekierowanieDo: null,
    rozmiar: null,
    canonical: null,
    blad: null,
  };
  try {
    const r = await fetch(adres, {
      headers: UA,
      redirect: "manual",
      signal: AbortSignal.timeout(12000),
    });
    const kod = r.status;
    if (kod >= 300 && kod < 400) {
      return { ...pusty, kod, przekierowanieDo: r.headers.get("location") };
    }
    if (kod !== 200) return { ...pusty, kod };
    const html = await r.text();
    return {
      ...pusty,
      kod,
      rozmiar: html.length,
      canonical: canonicalZHtml(html.slice(0, 200000)),
    };
  } catch (e) {
    const m = e instanceof Error ? e.message : "";
    return { ...pusty, blad: /timeout|abort/i.test(m) ? "przekroczony czas" : "brak połączenia" };
  }
}

export async function POST(request: Request) {
  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomena(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj samą domenę, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  const adresy = [
    `https://${domena}`,
    `https://www.${domena}`,
    `http://${domena}`,
    `http://www.${domena}`,
  ];
  const warianty = await Promise.all(adresy.map(pobierz));
  const [bezWww, zWww] = warianty;

  const obaDzialaja = bezWww.kod === 200 && zWww.kod === 200;
  const tenSamRozmiar =
    obaDzialaja &&
    bezWww.rozmiar !== null &&
    zWww.rozmiar !== null &&
    Math.abs(bezWww.rozmiar - zWww.rozmiar) <= Math.max(200, bezWww.rozmiar * 0.01);
  // Canonical ratuje sytuacje tylko wtedy, gdy obie wersje wskazuja TEN SAM
  // adres. Strona, ktora w kazdej wersji wskazuje sama siebie, nie scala
  // niczego: to dwa niezalezne adresy, kazdy przekonany, ze jest glowny.
  const kanonBez = normalizujAdres(bezWww.canonical);
  const kanonWww = normalizujAdres(zWww.canonical);
  const maCanonical = Boolean(kanonBez && kanonWww && kanonBez === kanonWww);
  const canonicalNaSiebie = Boolean(
    kanonBez && kanonWww && kanonBez !== kanonWww,
  );

  // Serwery za duzymi dostawcami potrafia blokowac ruch z serwerowni i zwracac
  // 403 na wszystko. To nie jest blad konfiguracji strony, wiec nie udajemy
  // werdyktu, tylko mowimy wprost, ze nie da sie tego stad ocenic.
  const zablokowane = warianty.every(
    (w) => w.kod === 403 || w.kod === 401 || w.kod === 429,
  );
  const nicNieodpowiada = warianty.every((w) => w.kod === null);

  let werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY" | "NIEROZSTRZYGNIETE";
  let naglowek: string;
  let komentarz: string;

  if (nicNieodpowiada) {
    werdykt = "NIEROZSTRZYGNIETE";
    naglowek = "Żaden z adresów nie odpowiedział";
    komentarz =
      "Strona może być chwilowo niedostępna albo blokuje połączenia spoza przeglądarki. Spróbuj za chwilę.";
  } else if (zablokowane) {
    werdykt = "NIEROZSTRZYGNIETE";
    naglowek = "Serwer blokuje to sprawdzenie";
    komentarz =
      "Wszystkie cztery adresy odpowiedziały odmową dostępu, niezależnie od wersji. To zabezpieczenie hostingu przed ruchem z serwerowni, a nie błąd Twojej strony. Z zewnątrz nie da się wtedy ocenić przekierowań i nie będziemy zgadywał.";
  } else if (obaDzialaja && tenSamRozmiar && canonicalNaSiebie) {
    werdykt = "CZERWONY";
    naglowek = "Każda wersja adresu ogłasza się główną";
    komentarz = `Obie wersje zwracają tę samą treść i obie mają znacznik wersji głównej, tylko że każda wskazuje samą siebie: ${bezWww.canonical} oraz ${zWww.canonical}. To nie scala niczego. Wyszukiwarka dostaje dwa adresy, z których każdy twierdzi, że jest tym właściwym, więc wybiera sama, a siła linków dalej dzieli się na dwa. Brzmi jak drobiazg, ale skutek jest identyczny jak przy całkowitym braku znacznika.`;
  } else if (obaDzialaja && tenSamRozmiar && !maCanonical) {
    werdykt = "CZERWONY";
    naglowek = "Twoja strona odpowiada pod dwoma adresami naraz";
    komentarz =
      "Adres z www i bez www zwracają tę samą treść, żaden nie przekierowuje na drugi i nie ma znacznika wskazującego wersję główną. Dla wyszukiwarki to dwie osobne strony o identycznej zawartości: siła linków prowadzących do Ciebie dzieli się na dwa adresy zamiast sumować na jednym, a wyszukiwarka sama wybiera, którą wersję pokazać. Często nie tę, która jest na wizytówce i na fakturach.";
  } else if (obaDzialaja && tenSamRozmiar && maCanonical) {
    werdykt = "ZOLTY";
    naglowek = "Dwa adresy działają, ale wersja główna jest wskazana";
    komentarz = `Obie wersje zwracają treść, natomiast znacznik kanoniczny wskazuje ${
      bezWww.canonical || zWww.canonical
    } jako wersję właściwą. Wyszukiwarka to zwykle uszanuje, więc najgorszy scenariusz jest odsunięty. Mimo to poprawnie jest przekierować jedną wersję na drugą po stronie serwera, bo znacznik jest podpowiedzią, a przekierowanie faktem.`;
  } else if (
    (bezWww.kod === 200 || zWww.kod === 200) &&
    [bezWww, zWww].some(
      (w) => w.kod === null || (w.kod !== null && w.kod >= 400),
    )
  ) {
    // Jedna wersja dziala, druga nie odpowiada albo zwraca blad. Czesto
    // dlatego, ze certyfikat wystawiono tylko na jedna z nich.
    const zepsuta = bezWww.kod === 200 ? zWww : bezWww;
    werdykt = "ZOLTY";
    naglowek = "Jedna z wersji adresu nie działa";
    komentarz = `Adres ${zepsuta.adres} ${
      zepsuta.kod === null
        ? "nie nawiązuje połączenia"
        : `zwraca błąd ${zepsuta.kod}`
    }, podczas gdy druga wersja działa normalnie. Klient, który wpisze adres w tej wersji albo trafi na starszy link, zobaczy komunikat o błędzie zamiast Twojej strony. Najczęstsza przyczyna to certyfikat wystawiony tylko na jedną z wersji albo brak przekierowania dla drugiej.`;
  } else if (obaDzialaja && !tenSamRozmiar) {
    werdykt = "ZOLTY";
    naglowek = "Oba adresy działają, ale pokazują różną treść";
    komentarz =
      "Wersja z www i bez www odpowiadają, lecz zwracają treść różnej wielkości. To bywa celowe, na przykład gdy jedna wersja to osobny serwis, ale bywa też objawem dwóch niezależnych kopii strony, z których jedna nie jest aktualizowana. Warto to rozstrzygnąć, zanim zaczniecie inwestować w pozycjonowanie.";
  } else {
    werdykt = "ZIELONY";
    naglowek = "Masz jeden adres główny";
    komentarz =
      "Jedna wersja adresu przekierowuje na drugą, więc wyszukiwarka widzi jedną stronę i cała siła linków kumuluje się na jednym adresie. Tak właśnie powinno to wyglądać.";
  }

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    komentarz,
    warianty,
    tenSamRozmiar,
    maCanonical,
    canonicalNaSiebie,
  });
}
