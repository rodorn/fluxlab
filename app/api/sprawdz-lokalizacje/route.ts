import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent": "FluxLab-Local-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
};

// Kazda branza to zestaw tagow OpenStreetMap. Trzymamy je po stronie serwera,
// zeby uzytkownik wybieral z listy, a nie uczyl sie skladni bazy map.
export const BRANZE: Record<
  string,
  { etykieta: string; filtry: string[] }
> = {
  apteka: { etykieta: "Apteka", filtry: ['"amenity"="pharmacy"'] },
  restauracja: {
    etykieta: "Restauracja lub bar",
    filtry: ['"amenity"="restaurant"', '"amenity"="fast_food"', '"amenity"="bar"'],
  },
  fryzjer: { etykieta: "Fryzjer", filtry: ['"shop"="hairdresser"'] },
  kosmetyczka: { etykieta: "Salon kosmetyczny", filtry: ['"shop"="beauty"'] },
  piekarnia: { etykieta: "Piekarnia", filtry: ['"shop"="bakery"'] },
  silownia: {
    etykieta: "Siłownia lub klub fitness",
    filtry: ['"leisure"="fitness_centre"'],
  },
  przedszkole: {
    etykieta: "Przedszkole lub żłobek",
    filtry: ['"amenity"="kindergarten"'],
  },
  weterynarz: { etykieta: "Weterynarz", filtry: ['"amenity"="veterinary"'] },
  warsztat: { etykieta: "Warsztat samochodowy", filtry: ['"shop"="car_repair"'] },
  myjnia: { etykieta: "Myjnia samochodowa", filtry: ['"amenity"="car_wash"'] },
  kwiaciarnia: { etykieta: "Kwiaciarnia", filtry: ['"shop"="florist"'] },
  dentysta: { etykieta: "Dentysta", filtry: ['"amenity"="dentist"'] },
};

async function get(url: string, ms: number): Promise<string | null> {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(ms) });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

function km(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLon = ((bLon - aLon) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

/** Ludnosc gminy z GUS. Zwraca null, gdy nie da sie jednoznacznie dopasowac. */
async function ludnosc(
  nazwaGminy: string,
): Promise<{ liczba: number; rok: string; jednostka: string } | null> {
  const szukaj = await get(
    `https://bdl.stat.gov.pl/api/v1/units/search?name=${encodeURIComponent(
      nazwaGminy,
    )}&format=json&page-size=10`,
    15000,
  );
  if (!szukaj) return null;
  let wyniki: Array<{ id: string; name: string; level: number }>;
  try {
    wyniki = JSON.parse(szukaj)?.results ?? [];
  } catch {
    return null;
  }
  // Poziom 6 to gmina. Wariant bez dopisku "miasto" albo "obszar wiejski"
  // obejmuje calosc, czyli to, co odpowiada zasiegowi dojazdu.
  const gmina =
    wyniki.find((r) => r.level === 6 && !/-\s*(miasto|obszar)/i.test(r.name)) ??
    wyniki.find((r) => r.level === 6);
  if (!gmina) return null;

  const dane = await get(
    `https://bdl.stat.gov.pl/api/v1/data/by-unit/${gmina.id}?var-id=72305&format=json`,
    15000,
  );
  if (!dane) return null;
  try {
    const j = JSON.parse(dane);
    const wartosci = j?.results?.[0]?.values ?? [];
    const ostatnia = wartosci[wartosci.length - 1];
    if (!ostatnia?.val) return null;
    return {
      liczba: Number(ostatnia.val),
      rok: String(ostatnia.year),
      jednostka: gmina.name,
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let miejsce = "";
  let branza = "";
  try {
    const body = await request.json();
    miejsce = String(body?.miejsce || "").trim().slice(0, 120);
    branza = String(body?.branza || "").trim();
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (miejsce.length < 3) {
    return NextResponse.json(
      { error: "Podaj miejscowość albo adres, na przykład Grodzisk Mazowiecki." },
      { status: 400 },
    );
  }
  const def = BRANZE[branza];
  if (!def) {
    return NextResponse.json({ error: "Wybierz branżę z listy." }, { status: 400 });
  }

  const geoTekst = await get(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      miejsce,
    )}&format=json&limit=1&countrycodes=pl&addressdetails=1`,
    15000,
  );
  let geo: {
    lat: string;
    lon: string;
    display_name: string;
    address?: Record<string, string>;
  } | null = null;
  try {
    geo = geoTekst ? JSON.parse(geoTekst)?.[0] ?? null : null;
  } catch {
    geo = null;
  }
  if (!geo) {
    return NextResponse.json({
      status: "BRAK_MIEJSCA",
      naglowek: "Nie znalazłem takiego miejsca w Polsce",
      opis:
        "Spróbuj samą nazwą miejscowości albo dopisz gminę, na przykład Grodzisk Mazowiecki, mazowieckie.",
    });
  }

  const lat = Number(geo.lat);
  const lon = Number(geo.lon);
  const adres = geo.address || {};
  // Geokoder zwraca "gmina Grodzisk Mazowiecki", a rejestr statystyczny zna
  // sama nazwe, wiec bez odciecia przedrostka ludnosc sie nie dopasowuje.
  const bezPrzedrostka = (t: string) =>
    t.replace(/^(gmina|miasto|powiat|gmina miejska|gmina wiejska)\s+/i, "").trim();
  const kandydaci = [
    adres.municipality,
    adres.city,
    adres.town,
    adres.village,
  ]
    .filter((t): t is string => !!t)
    .map(bezPrzedrostka);
  const nazwaGminy = kandydaci[0] || "";

  const czesci = def.filtry
    .flatMap((f) => [
      `node[${f}](around:5000,${lat},${lon});`,
      `way[${f}](around:5000,${lat},${lon});`,
    ])
    .join("");
  const zapytanie = `[out:json][timeout:25];(${czesci});out center tags;`;
  const overTekst = await get(
    `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(zapytanie)}`,
    40000,
  );
  if (!overTekst) {
    return NextResponse.json({
      status: "BRAK_DANYCH",
      naglowek: "Baza map nie odpowiedziała",
      opis:
        "Publiczny serwer z danymi o punktach bywa przeciążony. Spróbuj za chwilę, a jeśli to się powtórzy, napisz do mnie, policzę ręcznie.",
    });
  }

  type El = {
    lat?: number;
    lon?: number;
    center?: { lat: number; lon: number };
    tags?: Record<string, string>;
  };
  let elementy: El[] = [];
  try {
    elementy = JSON.parse(overTekst)?.elements ?? [];
  } catch {
    elementy = [];
  }

  const punkty = elementy
    .map((e) => {
      const y = e.lat ?? e.center?.lat;
      const x = e.lon ?? e.center?.lon;
      if (y === undefined || x === undefined) return null;
      return {
        nazwa: e.tags?.name || "bez nazwy w bazie",
        odleglosc: Math.round(km(lat, lon, y, x) * 10) / 10,
      };
    })
    .filter((p): p is { nazwa: string; odleglosc: number } => p !== null)
    .sort((a, b) => a.odleglosc - b.odleglosc);

  const w1 = punkty.filter((p) => p.odleglosc <= 1).length;
  const w3 = punkty.filter((p) => p.odleglosc <= 3).length;
  const w5 = punkty.length;

  let lud = nazwaGminy ? await ludnosc(nazwaGminy) : null;
  if (!lud) {
    for (const k of kandydaci.slice(1)) {
      lud = await ludnosc(k);
      if (lud) break;
    }
  }
  const naDziesiecTysiecy =
    lud && lud.liczba > 0 ? Math.round((w5 / lud.liczba) * 10000 * 10) / 10 : null;
  const mieszkancowNaPunkt =
    lud && w5 > 0 ? Math.round(lud.liczba / w5) : null;

  let werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY" = "ZOLTY";
  let naglowek = "";
  if (naDziesiecTysiecy === null) {
    naglowek = `${w5} takich miejsc w promieniu 5 km`;
  } else if (naDziesiecTysiecy < 2.5) {
    werdykt = "ZIELONY";
    naglowek = `${naDziesiecTysiecy} na 10 tysięcy mieszkańców, rynek wygląda na niedosycony`;
  } else if (naDziesiecTysiecy > 5) {
    werdykt = "CZERWONY";
    naglowek = `${naDziesiecTysiecy} na 10 tysięcy mieszkańców, rynek wygląda na nasycony`;
  } else {
    naglowek = `${naDziesiecTysiecy} na 10 tysięcy mieszkańców, nasycenie przeciętne`;
  }

  // Wskaznik na mieszkanca zawodzi tam, gdzie klientami sa przyjezdni.
  // Lepiej powiedziec to wprost, niz pozwolic komus wyciagnac zly wniosek.
  const turystyczne = w5 / Math.max(lud?.liczba ?? 1, 1) > 0.002;
  const zastrzezenie = turystyczne
    ? "Uwaga: w tej okolicy liczba punktów jest bardzo wysoka wobec liczby mieszkańców, co zwykle oznacza miejscowość turystyczną. Tam klientami są przyjezdni, więc sam wskaźnik na mieszkańca zaniża potencjał i decyzji nie należy opierać na nim samym."
    : null;

  return NextResponse.json({
    status: "OK",
    werdykt,
    naglowek,
    zastrzezenie,
    miejsce: geo.display_name.split(",").slice(0, 3).join(", "),
    branza: def.etykieta,
    w1,
    w3,
    w5,
    ludnosc: lud,
    naDziesiecTysiecy,
    mieszkancowNaPunkt,
    najblizsze: punkty.slice(0, 8),
  });
}
