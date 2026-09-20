import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const UA = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml",
};

// Dane rejestrowe rzadko sa na stronie glownej. Najczesciej leza w stopce
// regulaminu albo na podstronie kontaktu, wiec zagladamy tam wprost.
const PODSTRONY = [
  "",
  "/kontakt",
  "/regulamin",
  "/polityka-prywatnosci",
  "/dane-firmy",
  "/o-nas",
];

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

function nipPoprawny(n: string): boolean {
  if (!/^\d{10}$/.test(n)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let s = 0;
  for (let i = 0; i < 9; i++) s += Number(n[i]) * w[i];
  s %= 11;
  return s !== 10 && s === Number(n[9]);
}

// Suma kontrolna IBAN liczona na duzych liczbach, bo 28 cyfr nie miesci sie
// w zwyklym typie liczbowym.
function ibanPoprawny(d: string): boolean {
  if (!/^\d{26}$/.test(d) || d.startsWith("00")) return false;
  const przestawiony = d.slice(2) + "2521" + d.slice(0, 2);
  let reszta = 0;
  for (const c of przestawiony) reszta = (reszta * 10 + Number(c)) % 97;
  return reszta === 1;
}

function tekstZHtml(html: string): string {
  return html
    .replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[ \t\r\n\f\v]+/g, " ");
}

function znajdzNipy(tekst: string): string[] {
  const wynik = new Set<string>();
  const wzory = [
    /NIP[^0-9A-Za-z]{0,12}((?:PL)?[\s-]?(?:\d[\s-]?){10,13})/gi,
    /"(?:taxID|vatID|nip)"\s*:\s*"?((?:PL)?[\s-]?(?:\d[\s-]?){10,13})/gi,
  ];
  for (const w of wzory) {
    for (const m of tekst.matchAll(w)) {
      const cyfry = m[1].replace(/\D/g, "");
      for (const kandydat of [cyfry.slice(0, 10), cyfry.slice(-10)]) {
        if (nipPoprawny(kandydat)) wynik.add(kandydat);
      }
    }
  }
  return [...wynik];
}

function znajdzRachunki(tekst: string): string[] {
  const wynik = new Set<string>();
  const w = /(?<!\d)(?:PL[\s-]?)?(\d{2}[\s-]?(?:\d{4}[\s-]?){5}\d{4})(?!\d)/g;
  for (const m of tekst.matchAll(w)) {
    const cyfry = m[1].replace(/\D/g, "");
    if (ibanPoprawny(cyfry)) wynik.add(cyfry);
  }
  return [...wynik];
}

async function pobierz(url: string): Promise<string | null> {
  try {
    const r = await fetch(url, {
      headers: UA,
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) return null;
    return (await r.text()).slice(0, 400_000);
  } catch {
    return null;
  }
}

type Podmiot = {
  name: string;
  nip: string;
  statusVat: string | null;
  regon: string | null;
  krs: string | null;
  adres: string | null;
  rachunkow: number;
};

async function zRejestru(nip: string, data: string): Promise<Podmiot | null> {
  try {
    const r = await fetch(
      `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${data}`,
      { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000) },
    );
    if (!r.ok) return null;
    const j = await r.json();
    const s = j?.result?.subject;
    if (!s) return null;
    return {
      name: s.name,
      nip: s.nip,
      statusVat: s.statusVat ?? null,
      regon: s.regon ?? null,
      krs: s.krs ?? null,
      adres: s.workingAddress ?? s.residenceAddress ?? null,
      rachunkow: (s.accountNumbers || []).length,
    };
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
      { error: "Podaj samą domenę, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  let baza = `https://${domena}`;
  if ((await pobierz(baza)) === null) {
    baza = `https://www.${domena}`;
    if ((await pobierz(baza)) === null) {
      return NextResponse.json({
        status: "BRAK_STRONY",
        domena,
        naglowek: "Nie mogę połączyć się z tą stroną",
        komentarz:
          "Ani wersja z www, ani bez www nie odpowiedziała. Sprawdź pisownię albo spróbuj za chwilę.",
      });
    }
  }

  const strony = await Promise.all(PODSTRONY.map((p) => pobierz(baza + p)));
  const sprawdzone = PODSTRONY.filter((_, i) => strony[i] !== null).map(
    (p) => p || "/",
  );
  const tekst = strony
    .filter(Boolean)
    .map((h) => tekstZHtml(h as string))
    .join(" \n ");

  const nipy = znajdzNipy(tekst);
  const rachunki = znajdzRachunki(tekst);
  const data = new Date().toISOString().slice(0, 10);

  const podmioty: Podmiot[] = [];
  for (const n of nipy.slice(0, 3)) {
    const p = await zRejestru(n, data);
    if (p) podmioty.push(p);
  }

  const glowny = podmioty[0] || null;
  const wyrejestrowany = podmioty.some(
    (p) => p.statusVat && p.statusVat !== "Czynny",
  );
  const bezRachunkow = podmioty.some((p) => p.rachunkow === 0);

  let werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY";
  let naglowek: string;
  let komentarz: string;

  if (!nipy.length && rachunki.length) {
    werdykt = "CZERWONY";
    naglowek = "Podajesz numer konta, ale nie podajesz NIP-u";
    komentarz =
      "To najgorsze z możliwych połączeń. Klient firmowy ma dokąd przelać pieniądze, ale nie ma jak sprawdzić, czy ten rachunek należy do Ciebie, bo sprawdzenie w wykazie podatników wymaga pary: numeru konta i NIP-u. Jego księgowość albo zadzwoni z pytaniem, albo wstrzyma przelew.";
  } else if (!nipy.length) {
    werdykt = "CZERWONY";
    naglowek = "Na stronie nie ma NIP-u";
    komentarz = `Przejrzałem ${sprawdzone.length} podstron, w tym kontakt i regulamin, i nie znalazłem numeru NIP. Dla klienta firmowego oznacza to, że nie ustali ze strony, z kim zawiera umowę i komu przelewa pieniądze. Przy zakupach powyżej piętnastu tysięcy złotych jego księgowość ma obowiązek sprawdzić sprzedawcę w wykazie podatników, a bez NIP-u nie ma czego wpisać.`;
  } else if (wyrejestrowany || bezRachunkow) {
    werdykt = "CZERWONY";
    naglowek = "Dane rejestrowe wymagają wyjaśnienia";
    komentarz = `NIP ze strony należy do podmiotu ${glowny?.name}, ale w wykazie podatników ma status ${glowny?.statusVat ?? "nieznany"}${
      glowny?.rachunkow === 0 ? " i nie ma zgłoszonego żadnego rachunku" : ""
    }. Uprzedzam od razu, że taki status nie zawsze oznacza problem, bo zwracają go także duże, działające firmy, na przykład z powodu rozliczania się w grupie. Natomiast Twój klient zobaczy dokładnie to samo co ja i bez wyjaśnienia potraktuje to jako sygnał ostrzegawczy.`;
  } else if (rachunki.length) {
    werdykt = "ZIELONY";
    naglowek = "Klient sprawdzi Cię w kilkanaście sekund";
    komentarz = `Na stronie jest NIP i numer konta, a NIP prowadzi w wykazie do firmy ${glowny?.name} ze statusem ${glowny?.statusVat}. To komplet potrzebny księgowości kupującego, żeby zrobić swoje sprawdzenie i puścić przelew bez pytań.`;
  } else {
    werdykt = "ZOLTY";
    naglowek = "NIP jest, numeru konta brak";
    komentarz = `NIP ze strony prowadzi do firmy ${glowny?.name} ze statusem ${glowny?.statusVat} w wykazie podatników, czyli sprzedawcę da się ustalić. Numeru konta na stronie nie ma, co samo w sobie nie jest błędem, bo zwykle podaje się go na fakturze. Warto tylko wiedzieć, że przy pierwszej transakcji klient i tak sprawdzi parę NIP i numer konta, więc oba muszą się zgadzać z tym, co macie zgłoszone w wykazie.`;
  }

  return NextResponse.json({
    status: "OK",
    domena,
    werdykt,
    naglowek,
    komentarz,
    dataWykazu: data,
    sprawdzonePodstrony: sprawdzone.length,
    nipy,
    rachunkiZnalezione: rachunki.length,
    podmioty,
  });
}
