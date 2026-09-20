// Liczenie obwieszczen o rozwiazaniu spolek bez likwidacji, wprost z
// wyszukiwarki Monitora Sadowego i Gospodarczego. Wydzielone z trasy API,
// bo strona liczaca te same dane nie powinna odpytywac wlasnego serwera:
// przy budowaniu ten adres jeszcze nie istnieje i strona wychodzi pusta.
const BAZA = "https://wyszukiwarka-msig.ms.gov.pl/api/Monitor/";
const NAGLOWKI = {
  "User-Agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  Referer: "https://wyszukiwarka-msig.ms.gov.pl/",
};
const FRAZA = "bez przeprowadzania postępowania likwidacyjnego";

export type Dzien = { data: string; ile: number | null };

function parametry(od: string, doD: string, strona: number) {
  return new URLSearchParams({
    entityName: "",
    krs: "",
    nip: "",
    textInPosition: "",
    textInBody: FRAZA,
    signatureType: "A",
    signatureOfCase: "",
    signatureKRS: "",
    court: "",
    from: od,
    to: doD,
    page: String(strona),
  }).toString();
}

function nastr(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// Licznik interfejsu zwraca liczbe STRON, nie wierszy, wiec liczymy pelne
// strony i doliczamy dlugosc ostatniej.
async function ileWDniu(dzien: string): Promise<number | null> {
  try {
    const rc = await fetch(BAZA + "SearchCount?" + parametry(dzien, dzien, 1), {
      headers: NAGLOWKI,
      signal: AbortSignal.timeout(15000),
    });
    if (!rc.ok) return null;
    const stron = Number(await rc.json());
    if (!stron || stron < 1) return 0;
    const ro = await fetch(BAZA + "Search?" + parametry(dzien, dzien, stron), {
      headers: NAGLOWKI,
      signal: AbortSignal.timeout(15000),
    });
    if (!ro.ok) return null;
    const d = await ro.json();
    return (stron - 1) * 50 + (((d?.list as unknown[]) || []).length);
  } catch {
    return null;
  }
}

export async function wykreslenia() {
  const dni: Dzien[] = [];
  const dzis = new Date();
  for (let i = 0; i < 14 && dni.length < 7; i++) {
    const d = new Date(dzis);
    d.setDate(d.getDate() - i);
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    dni.push({ data: d.toISOString().slice(0, 10), ile: await ileWDniu(nastr(d)) });
  }
  const znane = dni.filter((x) => x.ile !== null && x.ile > 0);
  const suma = znane.reduce((a, x) => a + (x.ile || 0), 0);
  const srednia = znane.length ? Math.round(suma / znane.length) : null;
  return {
    dni,
    srednia,
    rocznie: srednia ? srednia * 250 : null,
    zrodlo:
      "Monitor Sądowy i Gospodarczy, wyszukiwarka Ministerstwa Sprawiedliwości",
  };
}
