import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent": "FluxLab-Omnibus-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
};

// Sklepy zapisuja ten komunikat na kilkanascie sposobow. Kazdy wzorzec musi
// laczyc slowo o najnizszej cenie z okresem 30 dni, zeby nie liczyc jako
// zgodnosci przypadkowego "30 dni na zwrot".
const WZORCE: RegExp[] = [
  /najni[zż]sza\s+cena[^<]{0,80}30\s*dni/i,
  /30\s*dni[^<]{0,80}najni[zż]sza\s+cena/i,
  /cena\s+sprzed[^<]{0,40}obni[zż]k/i,
  /najni[zż]sza\s+cena\s+z\s+ostatnich/i,
];

const PULAPKA = /30\s*dni\s+na\s+(zwrot|odst[aą]pienie)/i;

const MAX_PRODUKTOW = 8;

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
      { error: "Podaj sam adres sklepu, na przykład twojsklep.pl" },
      { status: 400 },
    );
  }

  // Store API WooCommerce wystawia liste realnie przecenionych pozycji.
  // Bez klucza, bez wtyczki, bez zadnych dostepow do panelu.
  const surowe = await pobierz(
    `https://${domena}/wp-json/wc/store/v1/products?on_sale=true&per_page=${MAX_PRODUKTOW}`,
    15000,
  );

  if (surowe === null) {
    return NextResponse.json({
      domena,
      status: "BRAK_API",
      naglowek: "Nie mogę odczytać listy promocji z tego sklepu",
      opis:
        "Ten sklep nie udostępnia publicznie listy przecenionych produktów, więc nie sprawdzę go automatycznie. Najpewniej nie stoi na WooCommerce. Napisz, na czym stoi, a sprawdzę go ręcznie i odeślę wynik.",
    });
  }

  let lista: Array<Record<string, unknown>>;
  try {
    const dane = JSON.parse(surowe);
    lista = Array.isArray(dane) ? dane : [];
  } catch {
    return NextResponse.json({
      domena,
      status: "BRAK_API",
      naglowek: "Nie mogę odczytać listy promocji z tego sklepu",
      opis:
        "Odpowiedź sklepu nie jest listą produktów, więc automatyczne sprawdzenie nie zadziała. Napisz, na jakim silniku stoi sklep, sprawdzę ręcznie.",
    });
  }

  if (lista.length === 0) {
    return NextResponse.json({
      domena,
      status: "BRAK_PROMOCJI",
      naglowek: "Nie widzę teraz żadnej aktywnej promocji",
      opis:
        "Obowiązek podania najniższej ceny z 30 dni dotyczy momentu obniżki, więc bez aktywnych przecen nie ma czego sprawdzać. Wróć, gdy ruszy najbliższa promocja, albo napisz, a sprawdzę archiwalne.",
    });
  }

  const produkty = await Promise.all(
    lista.slice(0, MAX_PRODUKTOW).map(async (poz) => {
      const url = String(poz.permalink || "");
      const ceny = (poz.prices || {}) as Record<string, unknown>;
      const minor = Number(ceny.currency_minor_unit ?? 2);
      const nazwa = odkoduj(String(poz.name || "")).slice(0, 120);
      const regularna = naZlote(ceny.regular_price, minor);
      const promocyjna = naZlote(ceny.sale_price, minor);
      if (!url) return null;

      const html = await pobierz(url, 12000);
      if (html === null) {
        return {
          nazwa,
          url,
          regularna,
          promocyjna,
          zgodny: true,
          powod: "karta niedostępna, pominięta",
          pominiety: true,
        };
      }
      const trafienie = WZORCE.some((w) => w.test(html));
      const powod = trafienie
        ? "jest informacja o najniższej cenie"
        : PULAPKA.test(html)
          ? "jest tylko informacja o 30 dniach na zwrot, to co innego"
          : "brak informacji o najniższej cenie z 30 dni";
      return {
        nazwa,
        url,
        regularna,
        promocyjna,
        zgodny: trafienie,
        powod,
        pominiety: false,
      };
    }),
  );

  const zbadane = produkty.filter(
    (p): p is NonNullable<typeof p> => p !== null && !p.pominiety,
  );
  const niezgodne = zbadane.filter((p) => !p.zgodny);
  const procent = zbadane.length
    ? Math.round((niezgodne.length / zbadane.length) * 100)
    : 0;

  const werdykt = niezgodne.length === 0 ? "ZIELONY" : procent >= 50 ? "CZERWONY" : "ZOLTY";

  return NextResponse.json({
    domena,
    status: "OK",
    werdykt,
    zbadane: zbadane.length,
    niezgodne: niezgodne.length,
    procent,
    naglowek:
      niezgodne.length === 0
        ? `Wszystkie ${zbadane.length} sprawdzone przeceny mają wymaganą informację`
        : `${niezgodne.length} z ${zbadane.length} sprawdzonych przecen bez wymaganej informacji`,
    opis:
      niezgodne.length === 0
        ? "Na sprawdzonych kartach znalazłem komunikat o najniższej cenie z 30 dni przed obniżką. To dobra wiadomość, choć nie mówi jeszcze, czy podana kwota jest prawdziwa."
        : "Przy każdej obniżce sklep ma obowiązek podać najniższą cenę z 30 dni przed promocją. Poniżej pozycje, na których tej informacji nie znalazłem. Każda ma link, więc sprawdzisz to samodzielnie.",
    produkty: zbadane.map((p) => ({
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
