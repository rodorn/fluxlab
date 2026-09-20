import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent": "FluxLab-Returns-Check/1.0 (+https://fluxlab.pl; pawel@fluxlab.pl)",
};

// Sklepy trzymaja te informacje pod roznymi adresami, a czesto rozbijaja je
// na kilka stron: osobno zwroty, osobno reklamacje, reszta w regulaminie.
// Dlatego zbieramy WSZYSTKIE i oceniamy razem, bo sprawdzenie tylko
// pierwszej znalezionej daje falszywy alarm.
const SCIEZKI = [
  "/zwroty",
  "/zwroty-i-reklamacje",
  "/reklamacje",
  "/regulamin",
  "/informacje/zwroty",
  "/pl/zwroty",
  "/zwrot-towaru",
  "/odstapienie-od-umowy",
];

type Wymog = {
  klucz: string;
  etykieta: string;
  wzorzec: RegExp;
  waga: "krytyczny" | "wazny";
  brak: string;
};

const WYMOGI: Wymog[] = [
  {
    klucz: "termin",
    etykieta: "Termin na odstąpienie od umowy",
    wzorzec: /\b14\s*dni|czternast\w+\s+dni/i,
    waga: "krytyczny",
    brak: "Kupujący nie wie, ile ma czasu na zwrot. To pierwsza rzecz, której szuka przed zakupem, i pierwsza, o którą zapyta mailem.",
  },
  {
    klucz: "odstapienie",
    etykieta: "Prawo odstąpienia opisane wprost",
    wzorzec: /odst[ąa]pieni\w*\s+od\s+umowy|prawo\s+odst[ąa]pieni/i,
    waga: "krytyczny",
    brak: "Brakuje nazwania rzeczy po imieniu. Klient szuka słowa odstąpienie, bo tak brzmi to w przepisach i w poradnikach, do których trafia.",
  },
  {
    klucz: "formularz",
    etykieta: "Wzór formularza odstąpienia",
    wzorzec: /formularz\s+(zwrotu|odst[ąa]pieni)|wz[óo]r\s+odst[ąa]pieni/i,
    waga: "wazny",
    brak: "Bez gotowego wzoru każdy zwrot zaczyna się od maila z pytaniem, co napisać. To jest ta praca, która zjada godziny obsługi.",
  },
  {
    klucz: "pieniadze",
    etykieta: "Sposób i termin zwrotu pieniędzy",
    wzorzec: /zwrot\w*\s+(p[łl]atno|pieni|nale[żz]no)|zwr[óo]cimy\s+(kwot|pieni)/i,
    waga: "krytyczny",
    brak: "Kupujący nie wie, kiedy i jak dostanie pieniądze, więc pisze i dopytuje, a przy opóźnieniu idzie na forum albo do rzecznika.",
  },
  {
    klucz: "koszty",
    etykieta: "Kto płaci za odesłanie",
    wzorzec: /koszt\w*\s+(odes[łl]ania|zwrotu|przesy[łl]ki\s+zwrotnej)|na\s+koszt\s+(kupuj|klient|sklep)/i,
    waga: "wazny",
    brak: "To najczęstsze źródło sporu przy zwrocie. Niedopowiedziane, kończy się kłótnią i złą opinią.",
  },
  {
    klucz: "online",
    etykieta: "Zgłoszenie zwrotu online",
    wzorzec: /zg[łl]o[śs]\s+zwrot|formularz\s+online|panel\s+zwrot|zg[łl]oszenie\s+zwrotu/i,
    waga: "wazny",
    brak: "Zwrot zgłaszany mailem oznacza, że każdą sprawę ktoś przepisuje ręcznie. Przy kilkudziesięciu zwrotach miesięcznie to etat na pół gwizdka.",
  },
];

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

function naTekst(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, k) => String.fromCharCode(Number(k)))
    .replace(/\s+/g, " ");
}

/** Linki ze strony glownej, ktore wygladaja na strone o zwrotach. */
function linkiOZwrotach(html: string, domena: string): string[] {
  const cele = new Set<string>();
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]{0,120}?)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    const tekst = naTekst(m[2]).toLowerCase();
    if (!/zwrot|reklamac|odst[ąa]pie|regulamin/i.test(tekst + " " + href)) continue;
    if (/^(mailto|tel|javascript)/i.test(href)) continue;
    const pelny = href.startsWith("http")
      ? href
      : `https://${domena}${href.startsWith("/") ? "" : "/"}${href}`;
    if (pelny.includes(domena)) cele.add(pelny);
    if (cele.size >= 6) break;
  }
  return [...cele];
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

  const glowna =
    (await pobierz(`https://${domena}/`)) ?? (await pobierz(`https://www.${domena}/`));
  if (glowna === null) {
    return NextResponse.json({
      status: "BRAK_SKLEPU",
      domena,
      naglowek: "Nie mogę otworzyć tego sklepu",
      opis: "Sprawdź pisownię adresu. Jeśli jest poprawny, sprawdzę go ręcznie.",
    });
  }

  const kandydaci = [
    ...linkiOZwrotach(glowna, domena),
    ...SCIEZKI.map((s) => `https://${domena}${s}`),
  ];
  const unikalne = [...new Set(kandydaci)].slice(0, 10);

  const strony = (
    await Promise.all(
      unikalne.map(async (u) => {
        const html = await pobierz(u, 10000);
        if (!html || html.length < 2500) return null;
        return { url: u, tekst: naTekst(html) };
      }),
    )
  ).filter((x): x is { url: string; tekst: string } => x !== null);

  if (strony.length === 0) {
    return NextResponse.json({
      status: "BRAK_STRON",
      domena,
      naglowek: "Nie znalazłem strony o zwrotach ani regulaminu",
      opis:
        "To samo w sobie jest problemem: kupujący szukający zasad zwrotu nie znajdzie ich przed zakupem, a część z niego zrezygnuje. Jeśli te informacje są pod nietypowym adresem, podaj go, sprawdzę dokładnie.",
    });
  }

  const caly = strony.map((s) => s.tekst).join(" ");
  const wyniki = WYMOGI.map((w) => ({
    klucz: w.klucz,
    etykieta: w.etykieta,
    waga: w.waga,
    jest: w.wzorzec.test(caly),
    brak: w.brak,
  }));

  const braki = wyniki.filter((w) => !w.jest);
  const brakiKrytyczne = braki.filter((w) => w.waga === "krytyczny").length;
  const werdykt =
    braki.length === 0 ? "ZIELONY" : brakiKrytyczne > 0 ? "CZERWONY" : "ZOLTY";

  const naglowek =
    braki.length === 0
      ? "Zasady zwrotów opisane kompletnie"
      : `${braki.length} z ${WYMOGI.length} rzeczy, których kupujący nie znajdzie`;

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    zbadaneStrony: strony.map((s) => s.url),
    wymogi: wyniki,
    brakiKrytyczne,
  });
}
