import { PRODUCTS } from "./products";

/**
 * Odpowiedz na pytanie, ktore pada przy kazdej rozmowie o stronie:
 * poprawiac to, co jest, czy budowac od nowa.
 *
 * Trzeci filar, "Systemy i strony", byl jedynym, ktory nie mial niczego do
 * nacisniecia. Filar procesow ma wybor branzy i droge leada, filar danych ma
 * "czy da sie to spiac", a tu wchodzacy widzial wylacznie zakladki, cennik i
 * formularz.
 *
 * Budowa taka sama jak w lib/spiecie-danych.ts, celowo: dwa pytania, wynik juz
 * po pierwszym, werdykt z najslabszego ogniwa. Werdykt liczy sie z trudniejszej
 * strony, nie ze sredniej, dzieki czemu narzedzie potrafi powiedziec "tego nie
 * ma sensu poprawiac" albo "najpierw odzyskajcie dostep", a nie tylko
 * sprzedawac najdrozsza pozycje.
 */

/** 1 poprawka wystarczy, 2 poprawka z zastrzezeniem, 3 poprawka nie wystarczy. */
export type Zakres = 1 | 2 | 3;

export type Stan = {
  klucz: string;
  nazwa: string;
  opis: string;
  /** Co da sie w takim miejscu zmienic bez przebudowy. */
  coDaSie: string;
  /** Na czym takie strony najczesciej staja. */
  ograniczenie: string;
  /** Co miec pod reka, zanim cokolwiek zacznie sie robic. */
  przygotowac: string;
  zakres: Zakres;
  /** Pozycja z katalogu, ktora obsluguje ten stan wyjsciowy. */
  produkt: string;
};

export type Zmiana = {
  klucz: string;
  nazwa: string;
  opis: string;
  /** Co sie przy tym robi. */
  jak: string;
  /** Czego ta zmiana sama z siebie nie zalatwia. */
  czegoNieZalatwi: string;
  zakres: Zakres;
  /** Ustawione tam, gdzie to cel decyduje o pozycji z katalogu, nie stan. */
  produkt?: string;
};

export const STANY: Stan[] = [
  {
    klucz: "firmowa",
    nazwa: "Strona firmowa zrobiona na zamówienie",
    opis: "Kilka podstron, ktoś ją kiedyś dla Was napisał.",
    coDaSie:
      "Treść, nowe podstrony, formularz, płatność, poprawki wyglądu. Przy własnym kodzie zmiana idzie tam, gdzie ma iść, i nic obok niej się nie rusza.",
    ograniczenie:
      "Jeśli nikt nie aktualizował jej od lat, pierwszą robotą bywa postawienie projektu na nowo na swoim komputerze i sprawdzenie, czy w ogóle się buduje. To jest do zrobienia, tylko trzeba o tym wiedzieć przed wyceną.",
    przygotowac:
      "Dostęp do repozytorium albo do serwera i nazwisko osoby, która robiła ją ostatnio.",
    zakres: 1,
    produkt: "/strony-www",
  },
  {
    klucz: "kreator",
    nazwa: "Strona z kreatora",
    opis: "Wix, Squarespace, kreator od hostingu.",
    coDaSie:
      "Teksty, zdjęcia, układ sekcji i formularz zmienia się w panelu kreatora, często szybciej niż w kodzie. Do takich zmian nie potrzebujecie nikogo z zewnątrz.",
    ograniczenie:
      "Kreator nie oddaje kontroli nad tym, co wysyła do przeglądarki, więc czas ładowania i część rzeczy, których szuka wyszukiwarka, nie są w Waszych rękach. Tu kończy się poprawianie, a zaczyna decyzja o przeprowadzce.",
    przygotowac:
      "Login do panelu i informacja, na kogo zapisana jest domena, bo w kreatorach bywa zapisana na kreator.",
    zakres: 2,
    produkt: "/audyt-strony",
  },
  {
    klucz: "wordpress",
    nazwa: "WordPress sprzed kilku lat",
    opis: "Szablon plus kilkanaście wtyczek.",
    coDaSie:
      "Treść i podstrony dodaje się w panelu. Wygląd zmienia się w granicach szablonu, a poza nie wychodzi się osobnym kodem.",
    ograniczenie:
      "Niezaktualizowane wtyczki są najczęstszą drogą włamania na stronę, a każda aktualizacja szablonu potrafi cofnąć wcześniejsze przeróbki. Zanim cokolwiek dokładać, warto sprawdzić, co tam w ogóle jest zainstalowane.",
    przygotowac:
      "Dostęp do panelu i do serwera oraz informacja, kiedy ostatnio robiono kopię zapasową.",
    zakres: 2,
    produkt: "/audyt-strony",
  },
  {
    klucz: "sklep",
    nazwa: "Sklep internetowy",
    opis: "WooCommerce, Shopify, PrestaShop.",
    coDaSie:
      "Treści, karty produktów, sekcje na stronie głównej i teksty przy koszyku. Osobno da się dołożyć automatyzację wokół sklepu, czyli to, co dzieje się po zamówieniu.",
    ograniczenie:
      "W sklepie każda zmiana dotyka pieniędzy, więc nie robi się jej wprost na działającym sklepie, tylko na kopii, i dopiero sprawdzoną przenosi. To jest wolniejsze i tak ma być.",
    przygotowac:
      "Dostęp do panelu sklepu i zgoda na to, że zmiany idą najpierw na kopię.",
    zakres: 2,
    produkt: "/audyt-strony",
  },
  {
    klucz: "brak",
    nazwa: "Nie ma żadnej strony",
    opis: "Jest wizytówka w Google albo profil w mediach.",
    coDaSie:
      "Nic, bo nie ma czego poprawiać. Za to start od zera jest tańszy niż przerabianie cudzego: nic nie trzeba najpierw rozbierać.",
    ograniczenie:
      "Najczęstszy błąd na tym etapie to zamawianie od razu całego serwisu. Jedna strona pod jedną rzecz, którą chcecie sprzedać, wystarcza na początek i pokazuje, czy w ogóle ktoś na nią wchodzi.",
    przygotowac:
      "Jedno zdanie o tym, co ma się dziać po wejściu na stronę, i pomysł na domenę.",
    zakres: 3,
    produkt: "/landing-z-platnoscia",
  },
  {
    klucz: "obca",
    nazwa: "Stroną zarządza obca firma",
    opis: "Nie macie loginów ani dostępu do domeny.",
    coDaSie:
      "Dopóki nie ma dostępu, nic. Da się natomiast sprawdzić od zewnątrz, na kogo zapisana jest domena i gdzie stoi strona, i z tym pójść do rozmowy.",
    ograniczenie:
      "Domena zapisana na agencję jest realnym ryzykiem: przy sporze traci się adres razem z pozycją w wyszukiwarce i adresami mailowymi. To się odkręca, ale zaczyna się od odzyskania wpisu w rejestrze, nie od poprawek na stronie.",
    przygotowac:
      "Umowa z firmą, która ją prowadzi, i adres strony. Reszty nie potrzebujemy, wpis w rejestrze jest jawny.",
    zakres: 3,
    produkt: "/wlasnosc-domeny",
  },
];

export const ZMIANY: Zmiana[] = [
  {
    klucz: "tresc",
    nazwa: "Zmienić treść albo dołożyć podstronę",
    opis: "Nowa usługa, nowy cennik, poprawiony opis.",
    jak: "Zmiana idzie w istniejący układ strony, bez ruszania reszty. Zwykle ten sam albo następny dzień.",
    czegoNieZalatwi:
      "Sama nowa podstrona nie sprowadzi nikogo z wyszukiwarki. Żeby w ogóle weszła do indeksu, musi prowadzić do niej link z innej strony serwisu.",
    zakres: 1,
    produkt: "/strony-www",
  },
  {
    klucz: "wyglad",
    nazwa: "Ma wyglądać poważniej",
    opis: "Strona robi wrażenie zrobionej w pośpiechu.",
    jak: "Typografia, odstępy, kolory i zachowanie na telefonie. To jest najtańsza część pracy nad stroną i najszybciej widoczna.",
    czegoNieZalatwi:
      "Wygląd nie naprawia tego, że nie wiadomo, co firma robi. Jeśli pierwsze zdanie na stronie nie mówi wprost, czym się zajmujecie, ładniejszy krój tego nie zastąpi.",
    zakres: 1,
    produkt: "/strony-www",
  },
  {
    klucz: "zgloszenia",
    nazwa: "Zbierać zgłoszenia z formularza",
    opis: "Dziś ludzie dzwonią albo piszą z ręki.",
    jak: "Formularz z potwierdzeniem, wiadomość do Was i zapis zgłoszenia poza samą skrzynką, żeby żadne nie zginęło w mailach.",
    czegoNieZalatwi:
      "Formularz nie zastąpi decyzji, kto i w jakim czasie na zgłoszenie odpowiada. Bez tego zgłoszenia tylko zmieniają miejsce leżenia.",
    zakres: 1,
    produkt: "/landing-z-platnoscia",
  },
  {
    klucz: "platnosc",
    nazwa: "Przyjmować płatność na stronie",
    opis: "Zamówienie i zapłata bez faktury wystawianej ręcznie.",
    jak: "Podpięcie operatora płatności, strona z potwierdzeniem i przekazanie zamówienia dalej, do miejsca, w którym powstaje faktura.",
    czegoNieZalatwi:
      "Płatność wymaga regulaminu, polityki prywatności i widocznych danych sprzedawcy. To nie jest ozdoba, tylko warunek, żeby operator w ogóle włączył Wam przyjmowanie wpłat.",
    zakres: 2,
    produkt: "/landing-z-platnoscia",
  },
  {
    klucz: "szybkosc",
    nazwa: "Ma się szybciej otwierać na telefonie",
    opis: "Na komórce strona buduje się kilkanaście sekund.",
    jak: "Najpierw pomiar, co konkretnie waży, bo przyczyną bywa jeden nieskompresowany obraz albo jeden skrypt, a nie cała strona. Poprawki idą dopiero po pomiarze.",
    czegoNieZalatwi:
      "Na kreatorze i na obcym szablonie część wagi jest poza Waszą kontrolą, więc pomiar potrafi skończyć się wnioskiem, że dalej da się tylko przenosząc stronę.",
    zakres: 2,
    produkt: "/audyt-strony",
  },
  {
    klucz: "google",
    nazwa: "Ma być widoczna w wyszukiwarce",
    opis: "Po nazwie firmy strona nie wychodzi.",
    jak: "Zaczyna się od sprawdzenia, czy strona w ogóle jest w indeksie i czy sama nie prosi robota, żeby jej nie brał. To pierwsza rzecz do wykluczenia i sprawdzenie jest darmowe.",
    czegoNieZalatwi:
      "Techniczne poprawki wpuszczają stronę do indeksu, ale nie ustawiają jej wysoko na zapytania ogólne. To jest osobna, dłuższa praca nad treścią i linkami.",
    zakres: 2,
    produkt: "/widocznosc-w-google",
  },
];

export type WerdyktStrony = {
  poziom: Zakres;
  naglowek: string;
  zdanie: string;
  produkt: { href: string; nazwa: string; cena: string } | null;
};

const produktPo = (href: string) => {
  const p = PRODUCTS.find((x) => x.href === href);
  return p ? { href: p.href, nazwa: p.name, cena: p.price } : null;
};

export function ocenStrone(stan: Stan, zmiana: Zmiana): WerdyktStrony {
  // Najslabsze ogniwo, nie srednia: drobna zmiana na stronie, ktorej nie
  // kontrolujecie, nie jest drobna.
  const poziom = Math.max(stan.zakres, zmiana.zakres) as Zakres;
  // Pozycje katalogu wybiera trudniejsza strona, bo w niej siedzi wiekszosc
  // pracy. Przy remisie decyduje cel, ale tylko wtedy, gdy stan wyjsciowy jest
  // zwyczajny: przy braku dostepu i przy braku strony to on jest cala robota.
  const celDecyduje =
    zmiana.produkt && (zmiana.zakres > stan.zakres || stan.zakres === 1);
  const href = celDecyduje ? (zmiana.produkt as string) : stan.produkt;

  if (poziom === 1) {
    return {
      poziom,
      naglowek: "Wystarczy poprawka",
      zdanie:
        "To jest zmiana w tym, co już stoi, a nie powód do przebudowy. Robi się ją w istniejącym układzie strony i wycenia po opisie, bo liczy się zakres, nie to, że w ogóle trzeba wejść w kod.",
      produkt: produktPo(href),
    };
  }
  if (poziom === 2) {
    return {
      poziom,
      naglowek: "Poprawka tak, ale najpierw pomiar",
      zdanie:
        "Tu odpowiedź zależy od tego, co jest pod spodem, a tego nie da się orzec z zewnątrz na oko. Darmowy audyt techniczny mówi, czy wystarczy poprawka, czy trafiliście na granicę tego, co ta strona umie. Zamawianie przebudowy przed tym pomiarem to kupowanie w ciemno.",
      produkt: produktPo(href),
    };
  }
  return {
    poziom,
    naglowek: "Poprawka tego nie załatwi",
    zdanie:
      "Zanim ruszy jakakolwiek praca nad wyglądem czy treścią, trzeba mieć co poprawiać i mieć do tego dostęp. To jest pytanie na jedną rozmowę, nie na wdrożenie, i odpowiedź bywa taka, że taniej zacząć od jednej nowej strony niż odzyskiwać starą.",
    produkt: produktPo(href),
  };
}

/** Strony powiazane, wypisywane pod przyciskami, zawsze w zrodle HTML. */
export const LINKI_POWIAZANE = [
  "/strony-www",
  "/landing-z-platnoscia",
  "/audyt-strony",
  "/wlasnosc-domeny",
  "/widocznosc-w-google",
]
  .map((href) => produktPo(href))
  .filter(
    (x): x is { href: string; nazwa: string; cena: string } => x !== null,
  );
