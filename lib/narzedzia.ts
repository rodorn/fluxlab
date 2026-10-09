/** Lista darmowych narzędzi. Jedno źródło dla strony z narzędziami i dla
 *  licznika na stronie głównej, bo liczba wpisana ręcznie rozjechała się
 *  z rzeczywistością już trzy razy. */
import { PRODUCTS } from "./products";
import { SEKCJE } from "./sekcje";

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
  /** Pytanie, na które odpowiada narzędzie. Podtytuł kafla pod nazwą. */
  pytanie?: string;
  /** Nazwa widoczna na kafelku, ta sama co w `lib/sekcje.ts`. */
  title: string;
};

export const businessTools: Narzedzie[] = [
  {
    title: "Integracja z KSeF",
    pytanie: "Co z KSeF obowiązuje Was już dziś?",
    description:
      "Wybierzcie grupę podatnika, a pokażemy, od kiedy wystawiacie faktury w KSeF i jaki wyjątek jeszcze Was chroni.",
    href: "/ksef-integracja",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Lista KSeF na 2027",
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
    title: "Integracja z e-Doręczeniami",
    pytanie: "Od kiedy musicie mieć adres do e-Doręczeń?",
    description:
      "Wybierzcie formę działalności, a policzymy, od kiedy musicie mieć adres do e-Doręczeń.",
    href: "/e-doreczenia-integracja",
    ikona: "pieczec",
    badge: "Nowość",
  },
  {
    title: "Darmowy audyt techniczny",
    description:
      "Szybkość, certyfikat, widoczność w Google i u asystentów AI oraz poczta, z ceną naprawy przy każdej pozycji.",
    href: "/audyt-strony",
    ikona: "lupa",
  },
  {
    title: "Naprawa ostrzeżenia o stronie",
    pytanie: "Czy przeglądarka straszy Twoją stroną?",
    description:
      "Wpiszcie adres, a sprawdzimy certyfikat i przekierowania, czyli czy przeglądarka nie straszy klientów ostrzeżeniem.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Rejestr cen w sklepie",
    description:
      "Sprawdzamy Wasze przeceny i pokazujemy te, przy których brakuje najniższej ceny z 30 dni.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Kontrola wersji językowej",
    description:
      "Znajdujemy Waszą wersję obcojęzyczną i liczymy fragmenty, które zostały po polsku.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Analiza lokalizacji pod punkt",
    description:
      "Podajcie miejscowość i branżę, a policzymy konkurencję w promieniu 1, 3 i 5 km.",
    href: "/analiza-lokalizacji",
    ikona: "pinezka",
  },
  {
    title: "Widoczność w AI",
    pytanie: "Czy asystent AI widzi Twoją stronę?",
    description:
      "Sprawdzamy, czy ChatGPT, Claude i Perplexity mogą przeczytać Waszą stronę i zrozumieć, czym się zajmujecie.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "Tańsze automatyzacje",
    pytanie: "Ile naprawdę płacisz za Zapiera i Make?",
    description:
      "Liczymy, ile miesięcznie płacicie za Zapiera albo Make i ile kosztowałyby te same scenariusze na własnym serwerze.",
    href: "/tansze-automatyzacje",
    ikona: "moneta",
  },
  {
    title: "Audyt faktur kurierskich",
    description:
      "Przeliczamy pozycje z faktury kurierskiej i pokazujemy, gdzie dopłata za wagę albo paliwo jest za wysoka.",
    href: "/audyt-kurierski",
    ikona: "paczka",
  },
  {
    title: "Dłużnik znika z rejestru",
    pytanie: "Czy Twój dłużnik znika z rejestru?",
    description:
      "Sprawdzamy w Monitorze Sądowym, czy spółka Waszego dłużnika nie znika z KRS.",
    href: "/czujka-rejestrowa",
    ikona: "mlotek",
  },
  {
    title: "Klient nie wie, komu płaci",
    pytanie: "Czy klient ustali, komu płaci?",
    description:
      "Wyciągamy NIP i numer konta z Waszej strony i sprawdzamy, czy zgadzają się z wykazem podatników VAT.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Mapa strony dla Google",
    pytanie: "Czy Google ma listę Twoich podstron?",
    description:
      "Sprawdzamy, czy macie mapę strony, czy wskazuje ją robots.txt i czy adresy z niej działają.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Strona pod dwoma adresami",
    pytanie: "Czy Google widzi Twoją stronę podwójnie?",
    description:
      "Sprawdzamy cztery wersje Waszego adresu, z www i bez, i czy jedna przekierowuje na drugą.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Właściciel domeny",
    pytanie: "Kto jest właścicielem Waszej domeny?",
    description:
      "Odczytujemy z rejestru, kto jest abonentem Waszej domeny i kiedy wygasa rejestracja.",
    href: "/wlasnosc-domeny",
    ikona: "klucz",
  },
  {
    title: "Sprawdzenie NIP",
    description:
      "Wpiszcie NIP, a sprawdzimy firmę w wykazie VAT, rachunki bankowe i datę rejestracji.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Audyt poczty firmowej",
    description:
      "Sprawdzamy SPF, DKIM i DMARC, czyli czy ktoś może wysyłać maile jako Wy i czemu trafiacie do spamu.",
    href: "/audyt-poczty",
    ikona: "koperta",
  },
  {
    title: "Widoczność w Google",
    pytanie: "Czy Twoja strona nie wypisała się z Google?",
    description:
      "Sprawdzamy trzy miejsca, w których zostaje blokada indeksowania po wersji roboczej strony.",
    href: "/widocznosc-w-google",
    ikona: "oko",
  },
  {
    title: "Panel zwrotów i reklamacji",
    pytanie: "Czego kupujący nie znajdzie o zwrotach?",
    description:
      "Sprawdzamy, czy kupujący znajdzie w sklepie termin zwrotu, formularz i koszt odesłania.",
    href: "/panel-zwrotow",
    ikona: "zwrot",
  },
  {
    title: "Koszt ręcznej obsługi leadów",
    description:
      "Ile miesięcznie kosztuje ręczne przepisywanie leadów, zadania w CRM i ręczne raporty.",
    href: "/koszt-recznej-obslugi-leadow",
    ikona: "kalkulator",
  },
  {
    title: "Audyt CRM",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji, w 3 minuty.",
    href: "/audyt-crm",
    ikona: "lista",
  },
  {
    title: "Automatyzacja vs zatrudnienie",
    pytanie: "Zatrudnić czy zautomatyzować?",
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

const GRUPY = SEKCJE.find((x) => x.slug === "narzedzia")!.grupy.filter(
  (g) => g.nazwa !== "Wszystkie narzędzia",
);

/** Grupy kafli na /narzedzia, w kolejności i z nazwami z `lib/sekcje.ts`. */
export const GRUPY_NARZEDZI: string[] = GRUPY.map((g) => g.nazwa);

/** Kalkulator wbudowany w artykuł nie ma własnej pozycji w sekcjach. */
const GRUPA_SPOZA_SEKCJI: Record<string, string> = {
  "/strefa-wiedzy/automatyzacja-vs-zatrudnienie": "Koszt automatyzacji",
};

/** Jedno zdanie pod nazwą grupy na liście narzędzi. */
export const GRUPA_INTRO_NARZEDZI: Record<string, string> = {
  "Strona i poczta":
    "Strona w oczach wyszukiwarki i asystenta AI, certyfikat, poczta firmowa i zasady sklepu.",
  "Firma i rejestry":
    "Publiczne rejestry i Wasze własne liczby: kontrahent, dłużnik, faktura od kuriera, konkurencja w okolicy.",
  "KSeF i e-Doręczenia":
    "Terminy i sprawdzenia przed obowiązkowymi systemami, z listą braków do przekazania księgowej.",
  "Koszt automatyzacji":
    "Ile kosztuje ręczna praca, co podnosi rachunek za automatyzacje i gdzie proces urywa się po drodze.",
  "Dla osób prywatnych":
    "Samochód, podatki i ceny energii: sprawdzenia dla osób prywatnych i jednoosobowych firm.",
};

function grupaNarzedzia(href: string): string | undefined {
  const h = href.split("#")[0];
  return (
    GRUPY.find((g) => g.strony.some((x) => x.href === h))?.nazwa ??
    GRUPA_SPOZA_SEKCJI[h]
  );
}

/** Kafle grupy w kolejności stron z `lib/sekcje.ts`. */
export function narzedziaGrupy(grupa: string): Narzedzie[] {
  const strony = GRUPY.find((g) => g.nazwa === grupa)?.strony ?? [];
  const pozycja = (href: string) => {
    const i = strony.findIndex((x) => x.href === href.split("#")[0]);
    return i === -1 ? strony.length : i;
  };
  // Pozycje działu „Dla osób prywatnych” z katalogu, które nie mają własnej
  // strony narzędzia (ImportRadar), wchodzą na listę jako kafle z katalogu.
  const zKatalogu: Narzedzie[] = PRODUCTS.filter(
    (p) =>
      p.category === "prywatne" &&
      ![...businessTools, ...otherTools].some((n) => n.href === p.href),
  ).map((p) => ({ title: p.name, description: p.tagline, href: p.href }));
  return [...businessTools, ...otherTools, ...zKatalogu]
    .filter((n) => grupaNarzedzia(n.href) === grupa)
    .sort((a, b) => pozycja(a.href) - pozycja(b.href));
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
