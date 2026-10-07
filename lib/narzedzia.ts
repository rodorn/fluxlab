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
      "Wpiszcie adres, a sprawdzimy certyfikat i przekierowania, czyli czy przeglądarka nie straszy klientów ostrzeżeniem.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Przeceny bez wymaganej informacji o cenie",
    description:
      "Sprawdzamy Wasze przeceny i pokazujemy te, przy których brakuje najniższej ceny z 30 dni.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Polskie teksty w wersji angielskiej",
    description:
      "Znajdujemy Waszą wersję obcojęzyczną i liczymy fragmenty, które zostały po polsku.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Ilu masz konkurentów w okolicy",
    description:
      "Podajcie miejscowość i branżę, a policzymy konkurencję w promieniu 1, 3 i 5 km.",
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
      "Sprawdzamy w Monitorze Sądowym, czy spółka Waszego dłużnika nie znika z KRS.",
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
      "Sprawdzamy, czy macie mapę strony, czy wskazuje ją robots.txt i czy adresy z niej działają.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Czy Google widzi Twoją stronę podwójnie",
    description:
      "Sprawdzamy cztery wersje Waszego adresu, z www i bez, i czy jedna przekierowuje na drugą.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Kto jest właścicielem Waszej domeny",
    description:
      "Odczytujemy z rejestru, kto jest abonentem Waszej domeny i kiedy wygasa rejestracja.",
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
      "Sprawdzamy trzy miejsca, w których zostaje blokada indeksowania po wersji roboczej strony.",
    href: "/widocznosc-w-google",
    ikona: "oko",
  },
  {
    title: "Czego kupujący nie znajdzie o zwrotach",
    description:
      "Sprawdzamy, czy kupujący znajdzie w sklepie termin zwrotu, formularz i koszt odesłania.",
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
    title: "Sprawdź auto przed zakupem",
    description:
      "Wklejcie link do ogłoszenia, a porównamy cenę z podobnymi ofertami i pokażemy typowe usterki modelu.",
    href: "/sprawdz-auto",
  },
  {
    title: "Ceny energii na jutro",
    description:
      "Ceny energii z PSE na jutro: najtańsze i najdroższe godziny oraz godziny z ceną ujemną.",
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
