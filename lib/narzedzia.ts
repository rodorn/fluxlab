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
    title: "Lista KSeF na 1 stycznia 2027",
    description:
      "Siedem pytań o to, co musicie mieć domknięte, zanim skończą się przepisy przejściowe KSeF: faktury poza systemem, kasa, numer KSeF w przelewie, faktury kosztowe, tryb offline, numeracja faktur i odrzucenia. Na końcu wykaz braków do wysłania księgowej, a biura rachunkowe dostają gotową wiadomość do klientów.",
    href: "/ksef-2027",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Sprawdzenie numeru KSeF",
    description:
      "Wklejcie numer KSeF albo całą listę tytułów przelewów, a sprawdzimy sumę kontrolną, NIP sprzedawcy i datę przyjęcia faktury. Od 1 stycznia 2027 numer trafia do przelewu, więc literówkę lepiej złapać przed bankiem. Liczymy w przeglądarce, nic nie wysyłamy.",
    href: "/numer-ksef",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Od kiedy musicie mieć adres do e-Doręczeń",
    description:
      "Naciśnijcie, jak jest zarejestrowany Wasz podmiot, a policzymy datę z ustawy i dni, które zostały albo które minęły od terminu. Terminy wchodzą etapami, inaczej dla firmy z CEIDG, inaczej dla spółki z KRS, inaczej dla zawodów zaufania publicznego. Bez wpisywania czegokolwiek.",
    href: "/e-doreczenia-integracja",
    ikona: "pieczec",
    badge: "Nowość",
  },
  {
    title: "Pełny audyt techniczny strony",
    description:
      "Jedno wpisanie adresu zamiast siedmiu osobnych sprawdzeń. Mierzymy szybkość na komputerze i osobno na telefonie, ważymy każdy plik, czytamy certyfikat, sprawdzamy widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Na końcu dostajecie kolejność poprawek i cenę naprawy przy każdej pozycji.",
    href: "/audyt-strony",
    ikona: "lupa",
  },
  {
    title: "Czy asystent AI widzi Twoją stronę",
    description:
      "Wpiszcie domenę, a sprawdzimy siedem rzeczy, od których zależy, czy roboty zbierające treść dla ChatuGPT, Claude'a i Perplexity mogą ją w ogóle przeczytać: dostęp w robots.txt, treść widoczną bez uruchamiania skryptów, dane uporządkowane, metadane, mapę strony i plik llms.txt.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "Ile naprawdę płacisz za Zapiera i Make",
    description:
      "Zapier i Make liczą nie uruchomienia, tylko pojedyncze kroki, więc rachunek rośnie szybciej, niż wynika z cennika. Podajcie liczbę uruchomień i kroków, a pokażemy realny koszt i po ilu miesiącach zwróciłoby się przeniesienie na własny serwer.",
    href: "/tansze-automatyzacje",
    ikona: "moneta",
  },
  {
    title: "Sprawdzenie pozycji z faktury kurierskiej",
    description:
      "Przepiszcie trzy liczby z faktury, a policzymy, czy dopłata paliwowa zgadza się ze stawką dla Waszego progu wagowego i ile ta sama pomyłka kosztuje przy kilkuset paczkach miesięcznie.",
    href: "/audyt-kurierski",
    ikona: "paczka",
  },
  {
    title: "Czy klient ustali, komu płaci",
    description:
      "Wpiszcie adres firmy, a wyciągniemy ze strony, kontaktu i regulaminu numer NIP oraz numer konta i sprawdzimy je w wykazie podatników VAT, dokładnie tak jak zrobi to księgowość Waszego klienta przed przelewem.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Sprawdzenie NIP i kontrahenta",
    description:
      "Wpiszcie NIP i sprawdźcie w wykazie Ministerstwa Finansów, czy firma istnieje, czy jest czynnym podatnikiem VAT, od kiedy działa i ile rachunków zgłosiła. Bez rejestracji i bez limitu prób.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Audyt bezpieczeństwa poczty",
    description:
      "Wpiszcie domenę firmy i sprawdźcie w kilka sekund, czy ktoś może podszyć się pod Wasz adres i czy Wasze maile trafiają do klientów. Analiza SPF, DKIM i DMARC z publicznego DNS, bez rejestracji.",
    href: "/audyt-poczty",
    ikona: "koperta",
  },
  {
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Sprawdźcie, ile miesięcznie kosztuje ręczne przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty. Realny koszt w zł, nie ogólniki.",
    href: "/koszt-recznej-obslugi-leadow",
    ikona: "kalkulator",
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
];

/** Ile narzędzi obiecujemy na stronie głównej. */
export const LICZBA_NARZEDZI = businessTools.length;

/**
 * Filar dla narzędzi, które nie mają swojej pozycji w katalogu produktów.
 * Reszta bierze filar wprost z `PRODUCTS`, żeby kafelek narzędzia i kafelek
 * produktu pod tym samym adresem nie trafiały do dwóch różnych działów.
 */
const FILAR_SPOZA_KATALOGU: Record<string, ProductCategory> = {
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
};
