/**
 * Widelki wyceny dla prac, ktorych zakres ustala sie przed startem.
 *
 * Dwie pozycje katalogu, integracje API i automatyzacja raportowania, mialy
 * w cenniku "wycena po diagnozie" i na swoich stronach ani jednej kwoty.
 * Przy pozostalych trzydziestu jeden pozycjach z podana cena wygladalo to
 * jak ukrywanie kosztu.
 *
 * Kwota nie jest tu jedna liczba, bo nia nie jest: spiecie dwoch systemow
 * przez otwarte API i spiecie czterech, z ktorych jeden oddaje dane
 * plikiem, to rozne prace. Zamiast usredniac, rozbijam robote na pozycje z
 * wlasnymi widelkami. Suma powstaje z tego, co odwiedzajacy sam zaznaczy, i
 * nigdzie nie ma liczby wpisanej z reki jako "typowy koszt".
 *
 * Stawki sa te same, ktore stoja jawnie na /wdrozenie-n8n-cena: pojedynczy
 * przeplyw od 790 zl, przeplyw z rozgalezieniami i obsluga bledow do
 * 3 500 zl, opieka 190 zl miesiecznie. Jedno zrodlo stawek, zeby dwie
 * strony nie zaczely mowic innych liczb.
 */

export type PozycjaWyceny = {
  id: string;
  co: string;
  opis: string;
  /** Widelki w zlotych, brutto ceny nie dotyczy: Fluxlab nie jest platnikiem VAT. */
  min: number;
  max: number;
};

export type Wycena = {
  id: string;
  /** Pytanie nad paskiem liczby systemow albo zrodel. */
  pytanie: string;
  /** Warianty do klikniecia. Pierwszy jest stanem poczatkowym. */
  warianty: number[];
  /** Ile sztuk miesci sie juz w pozycji podstawowej. */
  wliczone: number;
  /** Odmiana rzeczownika: 1 / 2, 3, 4 / pozostale. */
  jednostka: { poj: string; mn: string; dop: string };
  baza: PozycjaWyceny;
  zaKazdy: PozycjaWyceny;
  dodatki: PozycjaWyceny[];
  opieka: PozycjaWyceny;
  /** Skad biora sie stawki. Widoczne pod wynikiem, nie w przypisie. */
  skad: string;
};

export const WYCENA_INTEGRACJE: Wycena = {
  id: "integracje",
  pytanie: "Ile systemów ma się dogadać",
  warianty: [2, 3, 4, 5],
  wliczone: 2,
  jednostka: { poj: "system", mn: "systemy", dop: "systemów" },
  baza: {
    id: "baza",
    co: "Dwa systemy, dane idą w jedną stronę",
    opis: "Uzgodnienie pól, przepływ przyrostowy zamiast pełnych przebiegów, obsługa błędów i log, w którym widać cichą awarię. Uruchomienie na Twoich kontach, z przekazaniem konfiguracji.",
    min: 1500,
    max: 2900,
  },
  zaKazdy: {
    id: "kolejny-system",
    co: "Każdy kolejny system",
    opis: "Osobne uwierzytelnienie, osobny zestaw pól do zmapowania i osobne limity zapytań do obsłużenia.",
    min: 690,
    max: 1400,
  },
  dodatki: [
    {
      id: "dwustronnie",
      co: "Dane mają chodzić w obie strony",
      opis: "Zmiana po jednej stronie wraca na drugą. Dochodzi reguła rozstrzygania, który zapis wygrywa, gdy oba systemy zmienią to samo pole.",
      min: 590,
      max: 1200,
    },
    {
      id: "bez-api",
      co: "Któryś system nie ma otwartego API",
      opis: "Zostaje eksport pliku, skrzynka pocztowa albo pobieranie ze strony. Działa, ale wymaga czujnika na zmianę formatu, bo taka zmiana nie zgłasza się sama.",
      min: 890,
      max: 1900,
    },
    {
      id: "wolumen",
      co: "Powyżej dziesięciu tysięcy rekordów miesięcznie",
      opis: "Kolejkowanie, ponawianie nieudanych wywołań i trzymanie się limitów dostawcy, żeby przepływ nie wpadał w blokadę.",
      min: 490,
      max: 900,
    },
    {
      id: "historia",
      co: "Trzeba przenieść dane sprzed wdrożenia",
      opis: "Jednorazowy przerzut historii z uzgodnieniem duplikatów, liczony osobno od bieżącej synchronizacji.",
      min: 390,
      max: 900,
    },
  ],
  opieka: {
    id: "opieka",
    co: "Opieka po wdrożeniu, miesięcznie",
    opis: "Alert, gdy przepływ się wywróci, i poprawka, gdy zewnętrzne API zmieni format. Nieobowiązkowa, rezygnacja z miesiąca na miesiąc.",
    min: 190,
    max: 190,
  },
  skad: "Widełki liczę z własnych stawek za pracę, tych samych, które stoją jawnie na stronie o koszcie wdrożenia n8n. To rząd wielkości do zaplanowania budżetu, nie oferta. Wiążąca kwota pada po bezpłatnej diagnozie, w której sprawdzam, co Twoje systemy naprawdę potrafią oddać.",
};

export const WYCENA_RAPORTOWANIE: Wycena = {
  id: "raportowanie",
  pytanie: "Z ilu źródeł zbierają się liczby",
  warianty: [1, 2, 3, 4],
  wliczone: 1,
  jednostka: { poj: "źródło", mn: "źródła", dop: "źródeł" },
  baza: {
    id: "baza",
    co: "Jedno źródło, raport na maila o stałej porze",
    opis: "Pobranie danych, złożenie zestawienia i wysyłka według harmonogramu. Z powiadomieniem, gdy źródło nie oddało danych i raport poszedłby niekompletny.",
    min: 790,
    max: 1500,
  },
  zaKazdy: {
    id: "kolejne-zrodlo",
    co: "Każde kolejne źródło",
    opis: "Dostęp, własny zestaw pól i sprowadzenie do wspólnego formatu, żeby dało się liczby zsumować.",
    min: 390,
    max: 700,
  },
  dodatki: [
    {
      id: "uzgodnienie",
      co: "Źródła pokazują dziś różne liczby",
      opis: "Ustalenie, która definicja obowiązuje, i reguły dopasowania rekordów, na przykład po numerze NIP. To zwykle najdłuższa część pracy i jedyna, której nie da się zrobić bez Was.",
      min: 490,
      max: 1200,
    },
    {
      id: "dzienny",
      co: "Raport dzienny zamiast miesięcznego",
      opis: "Krótszy cykl znosi ręczne poprawianie po fakcie, więc dochodzi kontrola kompletności danych przed każdą wysyłką.",
      min: 290,
      max: 600,
    },
    {
      id: "panel",
      co: "Panel w przeglądarce zamiast maila",
      opis: "Widok, w którym da się zmienić zakres dat i zejść do pojedynczych rekordów, zamiast czekać na następną wysyłkę.",
      min: 900,
      max: 1800,
    },
    {
      id: "alert",
      co: "Alert, gdy liczby wyglądają podejrzanie",
      opis: "Porównanie z poprzednim okresem i sygnał przy odchyleniu, żeby błąd w danych nie dojechał do zarządu jako wynik.",
      min: 290,
      max: 600,
    },
  ],
  opieka: {
    id: "opieka",
    co: "Opieka po wdrożeniu, miesięcznie",
    opis: "Reakcja, gdy źródło zmieni format albo cofnie dostęp, i drobne zmiany w gotowym raporcie. Nieobowiązkowa, rezygnacja z miesiąca na miesiąc.",
    min: 190,
    max: 190,
  },
  skad: "Widełki liczę z własnych stawek za pracę, tych samych, które stoją jawnie na stronie o koszcie wdrożenia n8n. To rząd wielkości do zaplanowania budżetu, nie oferta. Wiążąca kwota pada po bezpłatnej diagnozie, w której oglądam, jak wyglądają Wasze dane.",
};

/**
 * "1 500 zl". Tysiace ze spacja, tak samo jak w calym cenniku.
 *
 * Grupowanie robione recznie, bo `toLocaleString` oddaje raz zwykla spacje,
 * raz waska spacje nierozdzielajaca, zaleznie od tego, czy liczy serwer czy
 * przegladarka. Ta sama kwota wygladala przez to inaczej po wyrenderowaniu
 * strony i po pierwszym nacisnieciu przycisku.
 */
export function zl(kwota: number): string {
  return `${String(kwota).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} zł`;
}

/** "2 systemy", ale "5 systemów". */
export function odmien(n: number, j: Wycena["jednostka"]): string {
  const ost = n % 10;
  const dwie = n % 100;
  if (n === 1) return j.poj;
  if (ost >= 2 && ost <= 4 && (dwie < 12 || dwie > 14)) return j.mn;
  return j.dop;
}
