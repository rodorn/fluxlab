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
    title: "Czy klient ustali, komu płaci",
    description:
      "Wyciągamy NIP i numer konta z Waszej strony i sprawdzamy, czy zgadzają się z wykazem podatników VAT.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
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
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Ile miesięcznie kosztuje ręczne przepisywanie leadów, zadania w CRM i ręczne raporty.",
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
