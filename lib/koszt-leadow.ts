/**
 * Rachunek kosztu recznej obslugi zapytan, w jednym miejscu.
 *
 * Ten sam komplet liczb i ten sam wzor obsluguje pelny kalkulator na
 * /koszt-recznej-obslugi-leadow i skrocony rachunek na stronie glownej.
 * Powod jest prosty: dwa miejsca liczace to samo osobno predzej czy pozniej
 * podaja dwie rozne kwoty, a wtedy zadnej z nich nie mozna ufac.
 */

export interface DaneLeadow {
  leadyMies: number;
  czasMin: number;
  kosztH: number;
  /** Udzial zapytan obsluzonych z opoznieniem, w procentach. */
  opoznione: number;
  wartoscKlienta: number;
  /** Konwersja zapytania na platacego klienta, w procentach. */
  konwersja: number;
}

/** Typowy maly zespol B2B. Punkt startowy pelnego kalkulatora. */
export const DOMYSLNE_LEADOW: DaneLeadow = {
  leadyMies: 100,
  czasMin: 5,
  kosztH: 60,
  opoznione: 30,
  wartoscKlienta: 5000,
  konwersja: 5,
};

/**
 * Trzy ukladki danych do podstawienia jednym klikniecem. Roznia sie tym, co
 * w tym rachunku wazy najwiecej: liczba leadow, wartosc klienta i czas na
 * obsluge jednego zapytania. Sa to typowe rzedy wielkosci dla tych trzech
 * rodzajow firm, a nie dane czyjejkolwiek firmy.
 */
export const SCENARIUSZE_LEADOW: {
  etykieta: string;
  opis: string;
  dane: DaneLeadow;
}[] = [
  {
    etykieta: "Agencja B2B",
    opis: "Mało zapytań, długa obsługa, wysoka wartość klienta.",
    dane: {
      leadyMies: 40,
      czasMin: 8,
      kosztH: 70,
      opoznione: 25,
      wartoscKlienta: 12000,
      konwersja: 8,
    },
  },
  {
    etykieta: "Sklep internetowy",
    opis: "Dużo krótkich zapytań, niski koszyk, częste opóźnienia.",
    dane: {
      leadyMies: 400,
      czasMin: 3,
      kosztH: 45,
      opoznione: 45,
      wartoscKlienta: 400,
      konwersja: 12,
    },
  },
  {
    etykieta: "Firma usługowa",
    opis: "Średnia skala, jeden handlowiec na wszystkie zapytania.",
    dane: {
      leadyMies: 120,
      czasMin: 6,
      kosztH: 60,
      opoznione: 35,
      wartoscKlienta: 3500,
      konwersja: 6,
    },
  },
];

/** Udzial opoznionych zapytan, ktore realnie przepadaja. Zalozenie, nie pomiar. */
export const UDZIAL_TRACONYCH = 0.3;

export interface WynikLeadow {
  kosztRecznejPracy: number;
  liczbaPlacacych: number;
  wartoscKlientowMies: number;
  liczbaZgubionych: number;
  kosztZgubionychMies: number;
  kosztCalkowity: number;
  kosztRoczny: number;
}

export function policzKosztLeadow(dane: DaneLeadow): WynikLeadow {
  const kosztRecznejPracy = dane.leadyMies * (dane.czasMin / 60) * dane.kosztH;
  const liczbaPlacacych = dane.leadyMies * (dane.konwersja / 100);
  const wartoscKlientowMies = liczbaPlacacych * dane.wartoscKlienta;
  const liczbaZgubionych =
    dane.leadyMies *
    (dane.opoznione / 100) *
    (dane.konwersja / 100) *
    UDZIAL_TRACONYCH;
  const kosztZgubionychMies = liczbaZgubionych * dane.wartoscKlienta;
  const kosztCalkowity = kosztRecznejPracy + kosztZgubionychMies;

  return {
    kosztRecznejPracy,
    liczbaPlacacych,
    wartoscKlientowMies,
    liczbaZgubionych,
    kosztZgubionychMies,
    kosztCalkowity,
    kosztRoczny: kosztCalkowity * 12,
  };
}
