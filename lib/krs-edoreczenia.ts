/** Odpis aktualny KRS i ocena adresu do e-Doręczeń. Wspólne dla narzędzia
 *  sprawdz-krs-edoreczenia i raportu obowiązku e-Doręczeń. */

export const ODPIS = "https://api-krs.ms.gov.pl/api/krs/OdpisAktualny/";

export type Wynik = {
  status: "JEST_ADRES" | "BRAK_ADRESU";
  krs: string;
  nazwa: string;
  forma: string;
  dataWpisu: string;
  stanZDnia: string;
  adres: string | null;
  termin: string;
  naglowek: string;
  komentarz: string;
};

/** Odpis bywa z surowymi znakami sterujacymi w tekstach, a JSON.parse ich
 *  nie przyjmuje. Zamiana na spacje niczego nie psuje, bo poza napisami to
 *  zwykle biale znaki. */
export async function pobierz(krs: string, rejestr: "P" | "S") {
  const r = await fetch(`${ODPIS}${krs}?rejestr=${rejestr}&format=json`, {
    headers: { "User-Agent": "curl/8.5.0", Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`KRS ${r.status}`);
  const tekst = (await r.text()).replace(/[\u0000-\u001f]/g, " ");
  return JSON.parse(tekst);
}

function naIso(data: string): string {
  const [d, m, r] = data.split(".");
  return `${r}-${m}-${d}`;
}

export function ocen(krs: string, odpis: any): Wynik {
  const naglowekA = odpis?.odpis?.naglowekA ?? {};
  const dzial1 = odpis?.odpis?.dane?.dzial1 ?? {};
  const nazwa: string = dzial1?.danePodmiotu?.nazwa ?? "";
  const forma: string = dzial1?.danePodmiotu?.formaPrawna ?? "";
  const dataWpisu: string = naglowekA?.dataRejestracjiWKRS ?? "";
  const stanZDnia: string = naglowekA?.stanZDnia ?? "";
  const adres: string | null =
    dzial1?.siedzibaIAdres?.adresDoDoreczenElektronicznychWpisanyDoBAE ?? null;

  const przed2025 = !dataWpisu || naIso(dataWpisu) < "2025-01-01";
  const termin = przed2025
    ? "od 1 kwietnia 2025, bo spółka była w KRS przed 2025 rokiem"
    : `od dnia wpisu do KRS (${dataWpisu}), bo spółka powstała po 1 stycznia 2025`;

  if (adres) {
    return {
      status: "JEST_ADRES",
      krs,
      nazwa,
      forma,
      dataWpisu,
      stanZDnia,
      adres,
      termin,
      naglowek: "Adres do e-Doręczeń jest w odpisie KRS",
      komentarz:
        "Obowiązek jest spełniony. Warto jeszcze sprawdzić, kto w spółce jest administratorem skrzynki i czy powiadomienia o nowych pismach trafiają do osoby, która je odbiera, bo po 14 dniach pismo uznaje się za doręczone.",
    };
  }
  return {
    status: "BRAK_ADRESU",
    krs,
    nazwa,
    forma,
    dataWpisu,
    stanZDnia,
    adres: null,
    termin,
    naglowek: "W odpisie KRS nie ma adresu do e-Doręczeń",
    komentarz:
      "Wniosek o adres składa się przez Biznes.gov.pl, spółka wskazuje w nim administratora skrzynki. Kary pieniężnej za brak adresu nie ma, ale urzędy doręczają wtedy pisma papierowo albo usługą hybrydową. Jeśli wniosek już czeka na aktywację, adres pojawi się w odpisie po aktywacji.",
  };
}

