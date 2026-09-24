/** Lista darmowych narzędzi. Jedno źródło dla strony z narzędziami i dla
 *  licznika na stronie głównej, bo liczba wpisana ręcznie rozjechała się
 *  z rzeczywistością już trzy razy. */
import { PRODUCTS, type ProductCategory } from "./products";

export type Narzedzie = {
  /** Wyróżnik na kafelku, na przykład Nowość. */
  badge?: string;
  /** Jedno zdanie o tym, co narzędzie sprawdza. */
  description: string;
  /** Adres strony narzędzia. */
  href: string;
  /** Klucz ikony z mapy IKONY. */
  ikona?: string;
  /** Obrazek na kafelku, jeśli narzędzie go ma. */
  image?: string;
  /** Nazwa widoczna na kafelku. */
  title: string;
};

export const businessTools: Narzedzie[] = [
  {
    title: "Co z KSeF obowiązuje Was już dziś",
    description:
      "Naciśnijcie swoją grupę podatnika, a rozpiszemy, od kiedy musicie wystawiać faktury w KSeF, który wyjątek jeszcze Was chroni i ile dni mu zostało do 1 stycznia 2027, kiedy kończą się wszystkie przepisy przejściowe naraz. Bez wpisywania czegokolwiek.",
    href: "/ksef-integracja",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Od kiedy musicie mieć adres do e-Doręczeń",
    description:
      "Naciśnij, jak jest zarejestrowany Wasz podmiot, a policzymy datę z ustawy i dni, które zostały. Terminy wchodzą etapami, inaczej dla firmy z CEIDG, inaczej dla spółki z KRS, inaczej dla zawodów zaufania publicznego. Bez wpisywania czegokolwiek.",
    href: "/e-doreczenia-integracja",
    ikona: "pieczec",
    badge: "Nowość",
  },
  {
    title: "Pełny audyt techniczny strony",
    description:
      "Jedno wpisanie adresu zamiast siedmiu osobnych sprawdzeń. Mierzymy szybkość na komputerze i osobno na telefonie, ważę każdy plik, czytamy certyfikat, sprawdzamy widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Na końcu dostajesz kolejność poprawek i cenę naprawy przy każdej pozycji.",
    href: "/audyt-strony",
    ikona: "lupa",
  },
  {
    title: "Czy przeglądarka straszy Twoją stroną",
    description:
      "Wpisz adres strony, a pokażemy, co widzi ktoś, kto trafia do Ciebie z wyszukiwarki. Wygasły certyfikat albo certyfikat firmy hostingowej oznacza pełnoekranowe ostrzeżenie, po którym większość odwiedzających zawraca.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Przeceny bez wymaganej informacji o cenie",
    description:
      "Podaj adres sklepu, a sprawdzimy Twoje aktualne przeceny i pokażemy te, przy których brakuje obowiązkowej informacji o najniższej cenie z trzydziestu dni. Każda pozycja z linkiem do sprawdzenia.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Polskie teksty w wersji angielskiej",
    description:
      "Wpisz adres firmy, a znajdziemy Waszą wersję obcojęzyczną i policzymy fragmenty, które zostały po polsku, oraz sprawdzimy, czy wyszukiwarka w ogóle wie, że macie wersje językowe.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Ilu masz konkurentów w okolicy",
    description:
      "Podaj miejscowość i wybierz branżę, a policzymy punkty w promieniu jednego, trzech i pięciu kilometrów oraz to, ilu mieszkańców przypada na jeden taki punkt. Przydaje się przed podpisaniem najmu.",
    href: "/analiza-lokalizacji",
    ikona: "pinezka",
  },
  {
    title: "Czy asystent AI widzi Twoją stronę",
    description:
      "Wpisz domenę, a sprawdzimy siedem rzeczy, od których zależy, czy roboty zbierające treść dla ChatuGPT, Claude'a i Perplexity mogą ją w ogóle przeczytać: dostęp w robots.txt, treść widoczną bez uruchamiania skryptów, dane uporządkowane, metadane, mapę strony i plik llms.txt.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "Ile przepłacasz za automatyzacje",
    description:
      "Podaj liczbę uruchomień i kroków w scenariuszu, a pokażemy, ile zadań jest naprawdę rozliczanych, ile to kosztuje i po ilu miesiącach zwróciłoby się przeniesienie na własny serwer.",
    href: "/tansze-automatyzacje",
    ikona: "moneta",
  },
  {
    title: "Sprawdzenie pozycji z faktury kurierskiej",
    description:
      "Przepisz trzy liczby z faktury, a policzymy, czy dopłata paliwowa zgadza się ze stawką dla Twojego progu wagowego i ile ta sama pomyłka kosztuje przy kilkuset paczkach miesięcznie.",
    href: "/audyt-kurierski",
    ikona: "paczka",
  },
  {
    title: "Czy Twój dłużnik znika z rejestru",
    description:
      "Wpisz nazwę spółki albo numer KRS, a sprawdzimy w Monitorze Sądowym, czy sąd nie wszczął postępowania o jej rozwiązanie bez likwidacji. Od obwieszczenia biegną trzy miesiące na sprzeciw, potem podmiot znika razem z Twoją należnością.",
    href: "/czujka-rejestrowa",
    ikona: "mlotek",
  },
  {
    title: "Czy klient ustali, komu płaci",
    description:
      "Wpisz adres firmy, a wyciągnę ze strony, kontaktu i regulaminu numer NIP oraz numer konta i sprawdzimy je w wykazie podatników VAT, dokładnie tak jak zrobi to księgowość Twojego klienta przed przelewem.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Czy Google ma listę Twoich podstron",
    description:
      "Wpisz adres firmy, a sprawdzimy, czy macie mapę strony, czy jest wskazana w robots.txt i czy adresy z niej faktycznie działają. Martwy adres na tej liście zużywa limit odwiedzin robota.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Czy Google widzi Twoją stronę podwójnie",
    description:
      "Wpisz adres firmy, a sprawdzimy cztery wersje tego adresu, z www i bez, i pokażemy, czy któraś przekierowuje na drugą. Dwie działające wersje z tą samą treścią to dla wyszukiwarki dwie osobne strony.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Kto jest właścicielem Twojej domeny",
    description:
      "Wpisz domenę, a odczytam z publicznego rejestru, kto figuruje jako abonent i kiedy wygasa rejestracja. Bywa, że właścicielem adresu firmy jest ten, kto kiedyś robił stronę.",
    href: "/wlasnosc-domeny",
    ikona: "klucz",
  },
  {
    title: "Sprawdzenie NIP i kontrahenta",
    description:
      "Wpisz NIP i sprawdź w wykazie Ministerstwa Finansów, czy firma istnieje, czy jest czynnym podatnikiem VAT, od kiedy działa i ile rachunków zgłosiła. Bez rejestracji i bez limitu prób.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Audyt bezpieczeństwa poczty",
    description:
      "Wpisz domenę firmy i sprawdź w kilka sekund, czy ktoś może podszyć się pod Wasz adres i czy Wasze maile trafiają do klientów. Analiza SPF, DKIM i DMARC z publicznego DNS, bez rejestracji.",
    href: "/audyt-poczty",
    ikona: "koperta",
  },
  {
    title: "Czy Twoja strona nie wypisała się z Google",
    description:
      "Wpisz adres firmy, a sprawdzimy trzy miejsca, w których zostaje blokada indeksowania po wersji roboczej: nagłówek odpowiedzi, znacznik w kodzie strony i plik robots.txt. Właściciel tego nie widzi, bo wchodzi z zakładki.",
    href: "/widocznosc-w-google",
    ikona: "oko",
  },
  {
    title: "Czego kupujący nie znajdzie o zwrotach",
    description:
      "Podaj adres sklepu, a sprawdzimy sześć rzeczy, których kupujący szuka przed zakupem: termin na odstąpienie, wzór formularza, kto płaci za odesłanie, jak i kiedy wracają pieniądze oraz czy zwrot da się zgłosić online.",
    href: "/panel-zwrotow",
    ikona: "zwrot",
  },
  {
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Sprawdź, ile miesięcznie kosztuje ręczne przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty. Realny koszt w zł, nie ogólniki.",
    href: "/koszt-recznej-obslugi-leadow",
    ikona: "kalkulator",
  },
  {
    title: "Audyt CRM, checklist online",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji, w 3 minuty.",
    href: "/audyt-crm",
    ikona: "lista",
  },
  {
    title: "Zatrudnić czy zautomatyzować?",
    description:
      "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 jasna decyzja.",
    href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator",
    ikona: "kalkulator",
  },
];

export const otherTools: Narzedzie[] = [
  {
    title: "Dobór samochodu",
    description:
      "Znajdź idealny segment, nadwozie i moc dla siebie. Odpowiedz na kilka pytań, a algorytm dopasuje najlepsze propozycje.",
    href: "/dobor-samochodu",
    image: "/photos/car-chooser/type-sport.webp",
  },
  {
    title: "Kalkulator kosztów auta",
    description:
      "Oblicz pełny koszt posiadania samochodu: paliwo, ubezpieczenie, serwis, amortyzacja i więcej.",
    href: "/kalkulator-kosztow",
    image: "/photos/car-chooser/type-osobowy.jpg",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description:
      "Porównaj skalę podatkową, podatek liniowy i ryczałt. Uwzględnia składki ZUS, VAT, ulgi i daje jasną odpowiedź, co się bardziej opłaca.",
    href: "/kalkulator-podatkowy",
    image: "/photos/tax-calculation/calculator.jpg",
  },
];

/** Ile narzędzi obiecujemy na stronie głównej. */
export const LICZBA_NARZEDZI = businessTools.length;

/**
 * Filar dla narzędzi, które nie mają swojej pozycji w katalogu produktów.
 * Reszta bierze filar wprost z `PRODUCTS`, żeby kafelek narzędzia i kafelek
 * produktu pod tym samym adresem nie trafiały do dwóch różnych działów.
 */
const FILAR_SPOZA_KATALOGU: Record<string, ProductCategory> = {
  "/audyt-crm": "automatyzacja",
  "/koszt-recznej-obslugi-leadow": "automatyzacja",
  "/sprawdzenie-nip": "dane",
  "/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator": "automatyzacja",
};

export function filarNarzedzia(href: string): ProductCategory {
  const produkt = PRODUCTS.find((p) => p.href === href);
  return produkt?.category ?? FILAR_SPOZA_KATALOGU[href] ?? "automatyzacja";
}

/**
 * Wprowadzenie do działu na liście narzędzi. Nazwy działów biorę z katalogu
 * produktów, żeby menu, kafelki i katalog mówiły to samo, ale zdanie pod
 * nazwą opisuje darmowe sprawdzenia, a nie płatne usługi.
 */
export const FILAR_INTRO_NARZEDZI: Record<ProductCategory, string> = {
  automatyzacja:
    "Ile kosztuje ręczna robota, co zjada rachunek za automatyzacje i gdzie proces urywa się po drodze.",
  dane: "Publiczne rejestry i Wasze własne liczby: kontrahent, dłużnik, faktura od kuriera, konkurencja w okolicy.",
  www: "Co o Waszej stronie wie wyszukiwarka, asystent AI i kupujący, który właśnie na nią trafił.",
};

/** Kolejność działów na liście narzędzi, ta sama co w menu i w katalogu. */
export const FILARY_NARZEDZI: ProductCategory[] = [
  "automatyzacja",
  "dane",
  "www",
];

export function narzedziaFilaru(filar: ProductCategory): Narzedzie[] {
  return businessTools.filter((n) => filarNarzedzia(n.href) === filar);
}

/**
 * Produkty, które mają na swojej stronie darmowe sprawdzenie, ale nie dostają
 * własnego kafelka, bo uruchamiają dokładnie to samo narzędzie co pozycja
 * wskazana obok. Dwa kafelki z tym samym sprawdzeniem wyglądałyby jak dwa
 * różne narzędzia.
 */
export const NARZEDZIE_WSPOLNE: Record<string, string> = {
  "/sprawdz-kontrahenta": "/sprawdzenie-nip",
  "/wdrozenie-n8n-cena": "/tansze-automatyzacje",
};
