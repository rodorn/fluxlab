import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent": "FluxLab-Lang-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
};

// Slowa, ktore w tekscie obcojezycznym praktycznie nie wystepuja przypadkiem.
// Sama obecnosc polskich znakow nie wystarcza, bo nazwy wlasne (Lodz, Gdansk)
// pojawiaja sie w poprawnych tlumaczeniach.
const POLSKIE_SLOWA = [
  "się","jest","dla","oraz","więcej","wszystkie","nasze","naszych","który","która",
  "które","można","zobacz","dowiedz","sprawdź","zapytaj","czytaj","kontakt z nami",
  "produkty","usługi","firma","oferta","strona","polityka","prywatności","warunki",
  "dostawa","zamówienie","koszyk","cena","nowość","przeczytaj","pokaż","wybierz",
  "jakość","realizacji","realizacje","współpraca","zapraszamy","dziękujemy",
];

const POLSKIE_ZNAKI = /[ąćęłńóśźż]/i;

type Blok = { tekst: string; trafienia: string[] };

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "");
}

async function pobierz(url: string, ms = 12000): Promise<string | null> {
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

/** Wycina skrypty i style, potem zbiera widoczne bloki tekstu. */
function blokiTekstu(html: string): string[] {
  const bez = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  return bez
    .split(/<[^>]+>/)
    .map((t) =>
      t
        .replace(/&nbsp;/g, " ")
        .replace(/&#(\d+);/g, (_, k) => String.fromCharCode(Number(k)))
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter((t) => t.length >= 12 && t.length <= 400);
}

/** Blok uznajemy za polski dopiero przy dwoch niezaleznych sygnalach. */
function polski(tekst: string): string[] {
  const maly = tekst.toLowerCase();
  const trafienia = POLSKIE_SLOWA.filter((s) =>
    new RegExp(`(^|[^a-ząćęłńóśźż])${s}([^a-ząćęłńóśźż]|$)`, "i").test(maly),
  );
  if (POLSKIE_ZNAKI.test(tekst)) trafienia.push("polskie znaki");
  return trafienia.length >= 2 ? trafienia.slice(0, 3) : [];
}

function znajdzWersje(html: string, domena: string): string[] {
  const cele = new Set<string>();
  const hreflangi = [...html.matchAll(/hreflang=["']([a-z-]+)["'][^>]*href=["']([^"']+)["']/gi)];
  const odwrotne = [...html.matchAll(/href=["']([^"']+)["'][^>]*hreflang=["']([a-z-]+)["']/gi)];
  // x-default prawie zawsze wskazuje wersje wyjsciowa, czyli polska, wiec
  // traktowanie go jak wersji obcojezycznej konczy sie liczeniem polskiego
  // tekstu na polskiej stronie jako bledu.
  const pomijaj = (kod: string) => /^pl/i.test(kod) || /x-default/i.test(kod);
  for (const m of hreflangi) if (!pomijaj(m[1])) cele.add(m[2]);
  for (const m of odwrotne) if (!pomijaj(m[2])) cele.add(m[1]);
  // Nawet bez hreflang wiekszosc serwisow trzyma wersje pod /en/ albo /de/.
  // Link bywa wzgledny ("/en/") albo pelny ("https://firma.pl/en/"), wiec
  // lapiemy oba, inaczej duze serwisy wygladaja jak pozbawione tlumaczenia.
  const korzen = domena.replace(/^www\./, "");
  for (const kod of ["en", "de", "cs", "sk", "uk", "fr", "es", "it"]) {
    const wzgledny = new RegExp(`href=["']/${kod}(/|["'])`, "i");
    const pelny = new RegExp(
      `href=["']https?://(?:www\\.)?${korzen.replace(/\./g, "\\.")}/${kod}(/|["'])`,
      "i",
    );
    if (wzgledny.test(html) || pelny.test(html)) {
      cele.add(`https://${domena}/${kod}/`);
    }
  }
  return [...cele].slice(0, 4);
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
      { error: "Podaj sam adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  const glowna = (await pobierz(`https://${domena}/`)) ?? (await pobierz(`https://www.${domena}/`));
  if (glowna === null) {
    return NextResponse.json({
      domena,
      status: "BRAK_STRONY",
      naglowek: "Nie możemy otworzyć tej strony",
      opis:
        "Strona nie odpowiedziała albo odrzuciła połączenie. Sprawdź pisownię adresu. Jeśli jest poprawny, sprawdzimy ją ręcznie i odeślemy wynik.",
    });
  }

  let wersje = znajdzWersje(glowna, domena);

  // Czesc duzych serwisow buduje przelacznik jezyka skryptem, wiec w kodzie
  // strony glownej nie ma zadnego odnosnika. Zanim uznamy, ze wersji nie ma,
  // pukamy wprost pod typowe sciezki.
  if (wersje.length === 0) {
    const sondy = ["en", "de"];
    const wyniki = await Promise.all(
      sondy.map(async (kod) => {
        for (const baza of [`https://${domena}`, `https://www.${domena}`]) {
          const html = await pobierz(`${baza}/${kod}/`, 10000);
          if (html && html.length > 2000) return `${baza}/${kod}/`;
        }
        return null;
      }),
    );
    wersje = wyniki.filter((w): w is string => !!w);
  }

  if (wersje.length === 0) {
    return NextResponse.json({
      domena,
      status: "BRAK_WERSJI",
      naglowek: "Nie znaleźliśmy obcojęzycznej wersji tej strony",
      opis:
        "Nie widzimy ani odnośników do wersji językowych, ani znaczników, po których wyszukiwarka je rozpoznaje. Jeśli wersja obcojęzyczna istnieje pod innym adresem, podaj go wprost, a sprawdzimy właśnie ją.",
    });
  }

  const zbadane: Array<{
    url: string;
    deklarowanyJezyk: string | null;
    hreflang: number;
    blokow: number;
    polskie: Blok[];
  }> = [];

  for (const url of wersje) {
    const pelny = url.startsWith("http")
      ? url
      : `https://${domena}${url.startsWith("/") ? "" : "/"}${url}`;
    const html = await pobierz(pelny);
    if (html === null) continue;
    const lang = html.match(/<html[^>]*\blang=["']([^"']+)["']/i)?.[1] ?? null;
    // Bezpiecznik: jesli trafilismy na wersje polska, pomijamy ja zamiast
    // raportowac jej wlasny jezyk jako niedokonczone tlumaczenie.
    if (lang && /^pl/i.test(lang)) continue;
    const hreflang = (html.match(/hreflang=/gi) || []).length;
    const bloki = blokiTekstu(html);
    const polskie: Blok[] = [];
    for (const b of bloki) {
      const tr = polski(b);
      if (tr.length) polskie.push({ tekst: b.slice(0, 160), trafienia: tr });
    }
    zbadane.push({
      url: pelny,
      deklarowanyJezyk: lang,
      hreflang,
      blokow: bloki.length,
      polskie,
    });
    if (zbadane.length >= 3) break;
  }

  if (zbadane.length === 0) {
    return NextResponse.json({
      domena,
      status: "BRAK_STRONY",
      naglowek: "Znaleźliśmy wersje językowe, ale żadna się nie otworzyła",
      opis: "Adresy wersji obcojęzycznych nie odpowiedziały. Sprawdzimy je ręcznie.",
    });
  }

  const polskichRazem = zbadane.reduce((s, z) => s + z.polskie.length, 0);
  const blokowRazem = zbadane.reduce((s, z) => s + z.blokow, 0);
  const bezHreflang = zbadane.filter((z) => z.hreflang === 0).length;
  const deklaracje = zbadane
    .map((z) => z.deklarowanyJezyk)
    .filter((l): l is string => !!l);
  const deklarowany = deklaracje[0] ?? null;
  const klamieOJezyku = !!deklarowany && !/^pl/i.test(deklarowany) && polskichRazem > 0;

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

  return NextResponse.json({
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
  });
}
