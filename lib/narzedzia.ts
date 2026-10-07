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
      "Wybierzcie grupę podatnika, a pokażemy, od kiedy wystawiacie faktury w KSeF i jaki wyjątek jeszcze Was chroni.",
    href: "/ksef-integracja",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Lista KSeF na 1 stycznia 2027",
    description:
      "Siedem pytań o to, co trzeba domknąć przed 1 stycznia 2027, z listą braków do wysłania księgowej.",
    href: "/ksef-2027",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Sprawdzenie numeru KSeF",
    description:
      "Wklejcie numer KSeF albo tytuły przelewów, a sprawdzimy sumę kontrolną, NIP i datę faktury.",
    href: "/numer-ksef",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Od kiedy musicie mieć adres do e-Doręczeń",
    description:
      "Wybierzcie formę działalności, a policzymy, od kiedy musicie mieć adres do e-Doręczeń.",
    href: "/e-doreczenia-integracja",
    ikona: "pieczec",
    badge: "Nowość",
  },
  {
    title: "Pełny audyt techniczny strony",
    description:
      "Szybkość, certyfikat, widoczność w Google i u asystentów AI oraz poczta, z ceną naprawy przy każdej pozycji.",
    href: "/audyt-strony",
    ikona: "lupa",
  },
  {
    title: "Czy przeglądarka straszy Twoją stroną",
    description:
      "Wpiszcie adres strony, a pokażemy, co widzi ktoś, kto trafia do Was z wyszukiwarki. Wygasły certyfikat albo certyfikat firmy hostingowej oznacza pełnoekranowe ostrzeżenie, po którym większość odwiedzających zawraca.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Przeceny bez wymaganej informacji o cenie",
    description:
      "Podajcie adres sklepu, a sprawdzimy Wasze aktualne przeceny i pokażemy te, przy których brakuje obowiązkowej informacji o najniższej cenie z trzydziestu dni. Każda pozycja z linkiem do sprawdzenia.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Polskie teksty w wersji angielskiej",
    description:
      "Wpiszcie adres firmy, a znajdziemy Waszą wersję obcojęzyczną i policzymy fragmenty, które zostały po polsku, oraz sprawdzimy, czy wyszukiwarka w ogóle wie, że macie wersje językowe.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Ilu masz konkurentów w okolicy",
    description:
      "Podajcie miejscowość i wybierzcie branżę, a policzymy punkty w promieniu jednego, trzech i pięciu kilometrów oraz to, ilu mieszkańców przypada na jeden taki punkt. Przydaje się przed podpisaniem najmu.",
    href: "/analiza-lokalizacji",
    ikona: "pinezka",
  },
  {
    title: "Czy asystent AI widzi Twoją stronę",
    description:
      "Sprawdzamy, czy ChatGPT, Claude i Perplexity mogą przeczytać Waszą stronę i zrozumieć, czym się zajmujecie.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "Ile naprawdę płacisz za Zapiera i Make",
    description:
      "Liczymy, ile miesięcznie płacicie za Zapiera albo Make i ile kosztowałyby te same scenariusze na własnym serwerze.",
    href: "/tansze-automatyzacje",
    ikona: "moneta",
  },
  {
    title: "Sprawdzenie pozycji z faktury kurierskiej",
    description:
      "Przeliczamy pozycje z faktury kurierskiej i pokazujemy, gdzie dopłata za wagę albo paliwo jest za wysoka.",
    href: "/audyt-kurierski",
    ikona: "paczka",
  },
  {
    title: "Czy Twój dłużnik znika z rejestru",
    description:
      "Wpiszcie nazwę spółki albo numer KRS, a sprawdzimy w Monitorze Sądowym, czy sąd nie wszczął postępowania o jej rozwiązanie bez likwidacji. Od obwieszczenia biegną trzy miesiące na sprzeciw, potem podmiot znika razem z Waszą należnością.",
    href: "/czujka-rejestrowa",
    ikona: "mlotek",
  },
  {
    title: "Czy klient ustali, komu płaci",
    description:
      "Wyciągamy NIP i numer konta z Waszej strony i sprawdzamy, czy zgadzają się z wykazem podatników VAT.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Czy Google ma listę Twoich podstron",
    description:
      "Wpiszcie adres firmy, a sprawdzimy, czy macie mapę strony, czy jest wskazana w robots.txt i czy adresy z niej faktycznie działają. Martwy adres na tej liście zużywa limit odwiedzin robota.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Czy Google widzi Twoją stronę podwójnie",
    description:
      "Wpiszcie adres firmy, a sprawdzimy cztery wersje tego adresu, z www i bez, i pokażemy, czy któraś przekierowuje na drugą. Dwie działające wersje z tą samą treścią to dla wyszukiwarki dwie osobne strony.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Kto jest właścicielem Waszej domeny",
    description:
      "Wpiszcie domenę, a odczytamy z publicznego rejestru, kto figuruje jako abonent i kiedy wygasa rejestracja. Bywa, że właścicielem adresu firmy jest ten, kto kiedyś robił stronę.",
    href: "/wlasnosc-domeny",
    ikona: "klucz",
  },
  {
    title: "Sprawdzenie NIP i kontrahenta",
    description:
      "Wpiszcie NIP, a sprawdzimy firmę w wykazie VAT, rachunki bankowe i datę rejestracji.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Audyt bezpieczeństwa poczty",
    description:
      "Sprawdzamy SPF, DKIM i DMARC, czyli czy ktoś może wysyłać maile jako Wy i czemu trafiacie do spamu.",
    href: "/audyt-poczty",
    ikona: "koperta",
  },
  {
    title: "Czy Twoja strona nie wypisała się z Google",
    description:
      "Wpiszcie adres firmy, a sprawdzimy trzy miejsca, w których zostaje blokada indeksowania po wersji roboczej: nagłówek odpowiedzi, znacznik w kodzie strony i plik robots.txt. Właściciel tego nie widzi, bo wchodzi z zakładki.",
    href: "/widocznosc-w-google",
    ikona: "oko",
  },
  {
    title: "Czego kupujący nie znajdzie o zwrotach",
    description:
      "Podajcie adres sklepu, a sprawdzimy sześć rzeczy, których kupujący szuka przed zakupem: termin na odstąpienie, wzór formularza, kto płaci za odesłanie, jak i kiedy wracają pieniądze oraz czy zwrot da się zgłosić online.",
    href: "/panel-zwrotow",
    ikona: "zwrot",
  },
  {
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Ile miesięcznie kosztuje ręczne przepisywanie leadów, zadania w CRM i ręczne raporty.",
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
      "Porównajcie koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 jasna decyzja.",
    href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator",
    ikona: "kalkulator",
  },
];

export const otherTools: Narzedzie[] = [
  {
    title: "Ceny energii na jutro",
    description:
      "Rynkowa cena energii z PSE na kolejną dobę: najtańsze i najdroższe cztery godziny oraz godziny z ceną ujemną. Przydaje się, gdy możecie przesunąć ładowanie auta, pompę ciepła albo magazyn energii.",
    href: "/ceny-energii-jutro",
  },
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
  "/ksef-2027": "dane",
  "/numer-ksef": "dane",
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
    "Ile kosztuje ręczna praca, co podnosi rachunek za automatyzacje i gdzie proces urywa się po drodze.",
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
