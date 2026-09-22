import { PRODUCTS } from "./products";

/**
 * Odpowiedz na jedno pytanie, ktore pada przy kazdej rozmowie o danych:
 * czy to, co mamy, da sie w ogole spiac automatycznie.
 *
 * Trzy filary maja miec to samo: cos, co po nacisnieciu daje wynik bez
 * wpisywania czegokolwiek. Filar "Automatyzacja procesow" ma wybor branzy i
 * droge leada, filar "Integracje i dane" nie mial nic, wiec wchodzacy widzial
 * tam wylacznie zakladki, cennik i formularz.
 *
 * Werdykt liczy sie z najslabszego ogniwa, nie ze sredniej: spiecie jest tak
 * dobre, jak jego trudniejsza strona. Dzieki temu narzedzie potrafi odpowiedziec
 * "tego jeszcze nie spinajcie", a nie tylko sprzedawac.
 */

/** 1 wprost, 2 da sie z zastrzezeniem, 3 najpierw trzeba sprawdzic zrodlo. */
export type Trudnosc = 1 | 2 | 3;

export type Zrodlo = {
  klucz: string;
  nazwa: string;
  opis: string;
  /** Jak dane wychodza na zewnatrz. */
  jak: string;
  /** Co w tym miejscu najczesciej psuje spiecie. */
  ryzyko: string;
  /** Co trzeba miec pod reka, zanim cokolwiek zacznie sie budowac. */
  przygotowac: string;
  trudnosc: Trudnosc;
  /** Pozycja z katalogu, ktora obsluguje ten rodzaj zrodla. */
  produkt: string;
};

export type Cel = {
  klucz: string;
  nazwa: string;
  opis: string;
  jak: string;
  ryzyko: string;
  trudnosc: Trudnosc;
  /** Ustawione tam, gdzie cel decyduje o pozycji z katalogu mocniej niz zrodlo. */
  produkt?: string;
};

export const ZRODLA: Zrodlo[] = [
  {
    klucz: "api",
    nazwa: "System z API",
    opis: "CRM, sklep, ERP, który ma udokumentowany interfejs.",
    jak: "Dane pobiera się kluczem dostępowym, w ustalonym rytmie albo od razu po zmianie rekordu, przez powiadomienie z systemu.",
    ryzyko:
      "Limity zapytań i zmiany wersji interfejsu. Jedno i drugie da się obsłużyć, trzeba je tylko sprawdzić przed budową, a nie po awarii.",
    przygotowac:
      "Klucz z uprawnieniem do odczytu i lista pól, które faktycznie mają wyjeżdżać na zewnątrz.",
    trudnosc: 1,
    produkt: "/integracja-crm-z-erp",
  },
  {
    klucz: "arkusz",
    nazwa: "Arkusz Google",
    opis: "Lista, którą zespół uzupełnia ręcznie.",
    jak: "Arkusz czyta się wprost, a zmiana wiersza może od razu uruchamiać dalszy krok.",
    ryzyko:
      "Ktoś doda kolumnę w środku albo wpisze datę po swojemu i przepływ zacznie czytać nie to pole. Dlatego układ arkusza trzeba zamrozić, a wejście sprawdzać.",
    przygotowac:
      "Jeden arkusz uznany za obowiązujący i zgoda na to, że od tej pory kolumny nie zmieniają kolejności.",
    trudnosc: 1,
    produkt: "/integracja-crm-z-erp",
  },
  {
    klucz: "excel",
    nazwa: "Excel na dysku albo w mailu",
    opis: "Plik, który co miesiąc przychodzi od kogoś z zewnątrz.",
    jak: "Plik odbiera się ze skrzynki albo z katalogu, czyta i przepisuje do docelowego układu kolumn.",
    ryzyko:
      "Nadawca zmienia układ arkusza bez uprzedzenia, scala komórki i dopisuje wiersze podsumowań. To najczęstsza przyczyna cichego rozjazdu danych.",
    przygotowac:
      "Trzy ostatnie pliki, żeby dało się zobaczyć, co w nich jest stałe, a co zmienne.",
    trudnosc: 2,
    produkt: "/integracja-crm-z-erp",
  },
  {
    klucz: "strona",
    nazwa: "Strona WWW bez API",
    opis: "Katalog, cennik, lista ofert.",
    jak: "Dane zbiera się ze strony, w ustalonym rytmie, w docelowym układzie kolumn.",
    ryzyko:
      "Zmiana układu strony psuje zbieranie, więc potrzebny jest alarm na nagły spadek liczby rekordów. Osobno sprawdzam, czy regulamin i robots.txt na to pozwalają, bo do treści chronionych logowaniem nie wchodzę.",
    przygotowac:
      "Adres strony i kilka przykładowych pozycji, które mają wylądować w wyniku.",
    trudnosc: 2,
    produkt: "/scraping-danych",
  },
  {
    klucz: "pdf",
    nazwa: "PDF-y i skany",
    opis: "Faktury, umowy, protokoły, specyfikacje.",
    jak: "Dokument przechodzi przez rozpoznanie tekstu, a z niego wyciąga się pola, których szukasz.",
    ryzyko:
      "Przy słabym skanie i nietypowym układzie rozpoznanie bywa niepewne, więc takie pozycje trafiają do ręcznego potwierdzenia zamiast wjeżdżać do systemu po cichu.",
    przygotowac:
      "Dziesięć dokumentów z prawdziwego obiegu, razem z tymi brzydkimi, i lista pól do wyciągnięcia.",
    trudnosc: 2,
    produkt: "/scraping-danych",
  },
  {
    klucz: "mail",
    nazwa: "Zapytania i zamówienia w mailach",
    opis: "Treść pisana zwykłym zdaniem, bez formularza.",
    jak: "Skrzynkę czyta się na bieżąco, a z wiadomości wyciąga te pola, które da się z niej wyczytać.",
    ryzyko:
      "Nie każda wiadomość zawiera komplet danych. Braki trzeba oznaczać jako braki, a nie zgadywać, bo wtedy do CRM trafiają rekordy, którym nikt nie ufa.",
    przygotowac:
      "Dostęp do skrzynki i dwadzieścia typowych wiadomości, na których widać, co zwykle jest w treści.",
    trudnosc: 2,
    produkt: "/scraping-danych",
  },
  {
    klucz: "zamkniety",
    nazwa: "Program bez API i bez eksportu",
    opis: "Stary system, do którego wchodzi się tylko przez jego własne okno.",
    jak: "Zanim cokolwiek powstanie, sprawdzam, czy da się dojść do bazy pod spodem albo wymusić eksport do pliku. To jest jedyna droga, którą warto tu iść.",
    ryzyko:
      "Jeśli żadna z tych dróg nie działa, zostaje klikanie w oknach programu przez automat. To się psuje przy każdej aktualizacji i tego nie buduję, bo koszt utrzymania zjada cały zysk.",
    przygotowac:
      "Nazwa i wersja programu oraz kontakt do kogoś, kto wie, na czym trzyma dane.",
    trudnosc: 3,
    produkt: "/integracja-crm-z-erp",
  },
];

export const CELE: Cel[] = [
  {
    klucz: "crm",
    nazwa: "CRM",
    opis: "Pipedrive, HubSpot, Salesforce.",
    jak: "Rekord wjeżdża przez API, z kontrolą duplikatów po adresie lub numerze NIP.",
    ryzyko:
      "Bez reguły łączenia duplikatów CRM zaleje się tymi samymi firmami w trzech pisowniach.",
    trudnosc: 1,
  },
  {
    klucz: "raport",
    nazwa: "Arkusz i raport",
    opis: "Tabela, która sama przychodzi w poniedziałek rano.",
    jak: "Dane lądują w arkuszu albo w gotowym pliku, a raport wychodzi w ustalonym rytmie, bez czyjegokolwiek kliknięcia.",
    ryzyko:
      "Raport bez daty i bez liczby rekordów wygląda tak samo, gdy dane są świeże i gdy zbieranie stanęło trzy tygodnie temu.",
    trudnosc: 1,
    produkt: "/automatyzacja-raportowania",
  },
  {
    klucz: "erp",
    nazwa: "ERP lub księgowość",
    opis: "System, w którym powstaje faktura i dokument magazynowy.",
    jak: "Jeśli system ma API, dane wjeżdżają wprost. Jeśli nie, zostaje plik w formacie, który on umie zaimportować.",
    ryzyko:
      "Część systemów księgowych przyjmuje tylko import ręczny, więc automat kończy się na przygotowaniu pliku, a ostatni krok robi człowiek. Lepiej wiedzieć to na starcie niż po wdrożeniu.",
    trudnosc: 2,
    produkt: "/integracja-crm-z-erp",
  },
  {
    klucz: "panel",
    nazwa: "Własna baza albo panel",
    opis: "Miejsce, w którym dane mają jedno źródło prawdy.",
    jak: "Dane trafiają do bazy, a panel pokazuje je zespołowi w takiej formie, w jakiej ma z nich korzystać.",
    ryzyko:
      "Własny panel to rzecz do utrzymania. Ma sens wtedy, gdy żaden gotowy system nie obsługuje tego, co robicie, a nie dlatego, że tak ładniej.",
    trudnosc: 1,
  },
];

export type Werdykt = {
  /** Kolor i ton odpowiedzi. */
  poziom: Trudnosc;
  naglowek: string;
  zdanie: string;
  /** Pozycja z katalogu, razem z cena wzieta wprost z lib/products.ts. */
  produkt: { href: string; nazwa: string; cena: string } | null;
};

const produktPo = (href: string) => {
  const p = PRODUCTS.find((x) => x.href === href);
  return p ? { href: p.href, nazwa: p.name, cena: p.price } : null;
};

export function ocenSpiecie(zrodlo: Zrodlo, cel: Cel): Werdykt {
  // Najslabsze ogniwo, nie srednia. Spiecie latwego zrodla z trudnym celem
  // nie jest latwe w polowie, tylko trudne.
  const poziom = Math.max(zrodlo.trudnosc, cel.trudnosc) as Trudnosc;
  // Pozycje katalogu wybiera ta strona spiecia, ktora jest trudniejsza, bo w
  // niej siedzi wiekszosc pracy. Przy remisie decyduje cel, ale tylko wtedy,
  // gdy zrodlo jest banalne: przy scrapingu i dokumentach sam odczyt jest
  // cala robota i to on ma byc wyceniony.
  const celDecyduje =
    cel.produkt && (cel.trudnosc > zrodlo.trudnosc || zrodlo.trudnosc === 1);
  const href = celDecyduje ? (cel.produkt as string) : zrodlo.produkt;

  if (poziom === 1) {
    return {
      poziom,
      naglowek: "Da się spiąć wprost",
      zdanie:
        "Obie strony mają interfejs, którym da się czytać i zapisywać, więc przepływ jest do zbudowania bez obchodzenia czegokolwiek. Zostaje ustalić, które pola jadą i co ma się dziać, gdy któregoś zabraknie.",
      produkt: produktPo(href),
    };
  }
  if (poziom === 2) {
    return {
      poziom,
      naglowek: "Da się, z jednym zastrzeżeniem",
      zdanie:
        "Trudniejsza strona tego spięcia nie oddaje danych w gotowej postaci, więc przepływ musi mieć kontrolę wejścia i alarm na to, że coś przestało przychodzić. Bez tego rozjazd zauważa się dopiero wtedy, gdy ktoś szuka rekordu, którego nie ma.",
      produkt: produktPo(href),
    };
  }
  return {
    poziom,
    naglowek: "Najpierw sprawdźmy, czy dane da się wydostać",
    zdanie:
      "Dopóki nie wiadomo, czy z tego systemu wyjdzie plik albo zapytanie do bazy, nie ma czego spinać, a budowanie automatu klikającego w jego oknach kosztuje więcej, niż oszczędza. To jest pytanie na jedną rozmowę, nie na wdrożenie.",
    produkt: produktPo(href),
  };
}

/** Strony powiazane, wypisywane pod przyciskami, zawsze w zrodle HTML. */
export const LINKI_POWIAZANE = [
  "/integracja-crm-z-erp",
  "/scraping-danych",
  "/automatyzacja-raportowania",
  "/ksef-integracja",
]
  .map((href) => produktPo(href))
  .filter(
    (x): x is { href: string; nazwa: string; cena: string } => x !== null,
  );
