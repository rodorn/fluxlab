export type ProductCategory = "www" | "automatyzacja" | "dane";

/**
 * Drugi poziom porządku. Trzy filary to za mało, żeby połapać się w
 * trzydziestu kilku pozycjach: w jednym worku lądowało wdrożenie n8n obok
 * sprawdzenia auta przed zakupem. Grupa mówi, czym dana pozycja jest:
 * wdrożeniem, naprawą czegoś istniejącego, czy jednorazowym raportem.
 */
export type ProductGroup =
  | "wdrozenia"
  | "naprawy"
  | "integracje"
  | "raporty"
  | "budowa"
  | "diagnostyka";

export interface Product {
  name: string;
  tagline: string;
  desc: string;
  price: string;
  href: string;
  cta: string;
  bullets: string[];
  category: ProductCategory;
  grupa: ProductGroup;
  featured?: boolean;
  /** Produkt ma darmowe narzedzie dzialajace wprost na swojej stronie. */
  narzedzie?: boolean;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  automatyzacja: "Automatyzacja procesów",
  dane: "Integracje i dane",
  www: "Systemy i strony",
};

export const GROUP_LABEL: Record<ProductGroup, string> = {
  wdrozenia: "Wdrożenia",
  naprawy: "Naprawy i audyty",
  integracje: "Integracje systemów",
  raporty: "Raporty na zamówienie",
  budowa: "Budowa i rozwój",
  diagnostyka: "Diagnostyka strony",
};

/**
 * Stala i celowa kolejnosc grup w kazdym filarze: najpierw to, co buduje,
 * potem to, co naprawia, na koncu jednorazowe raporty. Trzymana w jednym
 * miejscu, bo ten sam porzadek obowiazuje na /produkty i na stronach filarow.
 */
export const GROUP_ORDER: ProductGroup[] = [
  "wdrozenia",
  "integracje",
  "budowa",
  "naprawy",
  "diagnostyka",
  "raporty",
];

/** Kolejnosc filarow, ta sama co w menu i na /narzedzia. */
export const CATEGORY_ORDER: ProductCategory[] = [
  "automatyzacja",
  "dane",
  "www",
];

export const GROUP_INTRO: Record<ProductGroup, string> = {
  wdrozenia: "Proces, który dziś ktoś klika ręcznie, zaczyna dziać się sam.",
  naprawy:
    "Coś już działa, ale działa źle albo przestało. Znajdujemy przyczynę i naprawiamy.",
  integracje:
    "Dwa systemy, które nie rozmawiają ze sobą, zaczynają wymieniać dane.",
  raporty:
    "Publiczne i Wasze własne dane zamienione w jedną decyzję, jednorazowo.",
  budowa: "Strona albo panel, który jest częścią procesu, a nie osobnym bytem.",
  diagnostyka:
    "Konkretna usterka strony, znaleziona i opisana, zwykle w jeden dzień.",
};

export const CATEGORY_INTRO: Record<ProductCategory, string> = {
  www: "Gotowe usługi wokół strony: od ratunku po włamaniu po drobne poprawki i szybkie wdrożenia.",
  automatyzacja:
    "Audyty i naprawy tego, co już masz wdrożone, oraz nowe integracje szyte pod Twój proces.",
  dane: "Raporty, które zamieniają publiczne i Twoje własne dane w jedną decyzję: kupować, sprzedawać, sprawdzić.",
};

export const PRODUCTS: Product[] = [
  // ---------- STRONY WWW ----------
  {
    category: "www",
    name: "Poprawki i nowe podstrony",
    tagline: "WordPress, Elementor, Greenshift",
    desc: "Drobne zmiany na działającej stronie robione tak, żeby przeżyły aktualizację motywu: style globalne zamiast lokalnych nadpisań i punkty graniczne motywu zamiast sztywnych pikseli.",
    price: "od 99 zł",
    href: "/strony-www",
    grupa: "budowa",
    cta: "Zamów poprawki",
    bullets: [
      "nowa podstrona w obecnym stylu strony",
      "naprawa wyrównań na komórce i desktopie",
      "sekcje zapisane jako wzorce do samodzielnego użycia",
    ],
  },
  {
    category: "www",
    name: "Darmowy audyt techniczny",
    tagline: "Pełny raport od ręki, bez rejestracji",
    desc: "Wpisujesz adres, a automat mierzy szybkość na komputerze i osobno na telefonie, waży każdy plik, sprawdza certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Wynik to kolejność poprawek z uzasadnieniem i cena naprawy przy każdej pozycji.",
    price: "0 zł",
    href: "/audyt-strony",
    grupa: "diagnostyka",
    cta: "Zrób darmowy audyt",
    narzedzie: true,
    bullets: [
      "osobny pomiar wersji na telefon",
      "kolejność poprawek, nie lista 200 uwag",
      "cena naprawy od razu w raporcie",
    ],
  },

  // ---------- AUTOMATYZACJA ----------
  {
    category: "automatyzacja",
    name: "Tańsze automatyzacje",
    tagline: "Rachunek rośnie, a scenariusze te same",
    desc: "Popularne narzędzia liczą nie uruchomienia, tylko pojedyncze kroki, więc rachunek rośnie szybciej niż praca, którą wykonują. Przenosimy te same scenariusze na serwer, który należy do Ciebie, i pilnujemy, żeby działał. Efekt ten sam, koszt stały.",
    price: "od 790 zł",
    href: "/tansze-automatyzacje",
    grupa: "wdrozenia",
    narzedzie: true,
    cta: "Policz swoją oszczędność",
    bullets: [
      "kalkulator oszczędności od ręki na stronie",
      "te same scenariusze, Twój serwer",
      "utrzymanie od 200 zł/mc",
    ],
  },
  {
    category: "www",
    name: "Widoczność w AI",
    tagline: "Czy asystent w ogóle widzi Twoją stronę",
    desc: "Klient coraz częściej pyta asystenta o firmę do konkretnego zadania zamiast wpisywać frazę w wyszukiwarkę. Sprawdzamy siedem warunków, od których zależy, czy Twoja strona może w takiej odpowiedzi wystąpić: dostęp dla robotów, treść bez skryptów, dane uporządkowane, metadane, mapa strony i llms.txt.",
    price: "sprawdzenie za darmo",
    href: "/widocznosc-w-ai",
    grupa: "diagnostyka",
    narzedzie: true,
    cta: "Sprawdź swoją stronę",
    bullets: [
      "wynik od ręki, bez rejestracji",
      "naprawa warunków wstępnych 890 zł",
      "bez obietnic miejsca w odpowiedzi asystenta",
    ],
  },
  {
    category: "dane",
    name: "Integracja z e-Doręczeniami",
    tagline: "Pisma w systemie, który już macie",
    desc: "Skrzynka do doręczeń elektronicznych jest obowiązkowa, ale nikt nie każe obsługiwać jej ręcznie w osobnym panelu. Spinamy ją z Waszym systemem, razem z pobieraniem dowodów doręczenia, bez których cała rzecz nie ma wartości dowodowej.",
    price: "od 3 900 zł",
    href: "/e-doreczenia-integracja",
    grupa: "integracje",
    narzedzie: true,
    cta: "Opisz, czego używacie",
    bullets: [
      "otwarty klient tego API napisany przez nas, do obejrzenia przed decyzją",
      "odbiór pism 3 900 zł, z wysyłką 7 900 zł",
      "kod i dostępy zostają u Was",
    ],
  },
  {
    category: "dane",
    name: "Integracja z KSeF",
    tagline: "Faktury wychodzą tam, gdzie powstają",
    desc: "Krajowy System e-Faktur jest obowiązkowy, ale nikt nie każe przeklejać do niego faktur ręcznie z osobnej aplikacji. Spinamy z nim Wasz system: wysyłka w schemacie FA(3), zapis numeru KSeF i UPO przy dokumencie, pobieranie faktur kosztowych.",
    price: "od 4 900 zł",
    href: "/ksef-integracja",
    grupa: "integracje",
    narzedzie: true,
    cta: "Opisz, w czym fakturujecie",
    bullets: [
      "otwarty klient tego API z trybem demo, do uruchomienia przed decyzją",
      "odbiór faktur kosztowych 4 900 zł, z wystawianiem 9 900 zł",
      "kod i dostępy zostają u Was",
    ],
  },
  {
    category: "automatyzacja",
    name: "Audyt poczty firmowej",
    tagline: "SPF, DKIM i DMARC w jednym raporcie",
    desc: "Automat sprawdza, czy Twoja domena jest poprawnie zabezpieczona i czy ktoś może podszyć się pod Twój adres. To najczęstszy powód, dla którego firmowe maile lądują w spamie.",
    price: "od 19 zł",
    href: "/audyt-poczty",
    grupa: "naprawy",
    narzedzie: true,
    cta: "Sprawdź swoją pocztę",
    bullets: [
      "czy ktoś może wysyłać maile jako Ty",
      "dlaczego Twoje wiadomości trafiają do spamu",
      "gotowe rekordy do wklejenia w panelu DNS",
      "raport 19 zł, ekspresowa naprawa 299 zł",
    ],
  },
  {
    category: "automatyzacja",
    name: "Integracje API",
    tagline: "Spięcie systemów, które nie chcą rozmawiać",
    desc: "Łączymy sklep, CRM, ERP i hurtownie tak, żeby dane przechodziły same: synchronizacja przyrostowa, obsługa limitów API i logi, które pokazują cichy błąd zanim zepsuje dane.",
    price: "od 1 500 zł",
    href: "/integracje-api",
    grupa: "wdrozenia",
    cta: "Opisz integrację",
    bullets: [
      "synchronizacja różnicowa zamiast pełnych przebiegów",
      "odporność na limity i chwilowe awarie API",
      "zakres wyceny do ustalenia na stronie, bez zapytania ofertowego",
    ],
  },
  {
    category: "automatyzacja",
    name: "Automatyzacja raportowania",
    tagline: "Koniec z ręcznym składaniem raportów",
    desc: "Raport, który składa się sam i ląduje na mailu o ustalonej godzinie, zamiast zajmować komuś pół dnia w miesiącu.",
    price: "od 790 zł",
    href: "/automatyzacja-raportowania",
    grupa: "wdrozenia",
    cta: "Zamów automatyzację",
    bullets: [
      "dane z wielu źródeł w jednym zestawieniu",
      "wysyłka cykliczna bez udziału człowieka",
      "alert, gdy liczby wyglądają podejrzanie",
      "zakres wyceny do ustalenia na stronie, bez zapytania ofertowego",
    ],
  },

  // ---------- DANE ----------
  {
    category: "www",
    name: "Klient nie wie, komu płaci",
    tagline: "Księgowość kupującego sprawdza to przed przelewem",
    desc: "Zanim firma zapłaci, ustala sprzedawcę w wykazie podatników VAT, a przy większych kwotach także to, czy numer konta należy do tego samego podmiotu. Strona bez NIP-u sprawia, że ten test nie ma z czego wyjść. Zdarza się też, że w stopce stoi NIP zupełnie innej spółki.",
    price: "od 290 zł",
    href: "/dane-sprzedawcy",
    grupa: "diagnostyka",
    cta: "Sprawdź swoją stronę",
    narzedzie: true,
    bullets: [
      "sprawdzenie w wykazie podatników za darmo",
      "gotowa stopka i znacznik do wklejenia",
      "pilnowanie wykazu od 120 zł/mc",
    ],
  },
  {
    category: "dane",
    name: "Audyt faktur kurierskich",
    tagline: "Dopłata paliwowa to prawie połowa ceny bazowej",
    desc: "Stawka dopłaty paliwowej zmienia się co dwa tygodnie i zależy od progu wagowego, a korekty wagowe przewoźnik dolicza po swojemu. Przechodzimy przez wszystkie linie faktur, wyłapujemy pozycje policzone niezgodnie z umową i oddajemy gotową treść reklamacji.",
    price: "od 290 zł",
    href: "/audyt-kurierski",
    grupa: "raporty",
    narzedzie: true,
    cta: "Sprawdź pozycję z faktury",
    bullets: [
      "sprawdzenie jednej pozycji od ręki na stronie",
      "pełny audyt albo prowizja od odzyskanej kwoty",
      "gotowa treść reklamacji do przewoźnika",
    ],
  },
  {
    category: "dane",
    name: "Sprawdzony kontrahent",
    tagline: "Zanim wyślesz zaliczkę",
    desc: "Werdykt o konkretnej firmie złożony automatem z publicznych źródeł: Biała Lista VAT, KRS, rejestr zadłużonych, wiek domeny i listy ostrzeżeń. Pojedyncze sprawdzenie zajmuje 30 sekund, ale dopiero złożenie tego razem mówi, czy to firma widmo.",
    price: "od 9 zł",
    href: "/sprawdz-kontrahenta",
    grupa: "raporty",
    narzedzie: true,
    cta: "Sprawdź firmę",
    bullets: [
      "werdykt zielony, żółty albo czerwony z uzasadnieniem",
      "ostrzeżenie, gdy konto jest spoza wykazu VAT",
      "szybkie sprawdzenie 9 zł, pełny raport 29 zł",
    ],
  },
  {
    category: "dane",
    name: "Scraping danych na zamówienie",
    tagline: "Dane, których nie da się wyeksportować",
    desc: "Zbieramy dane z serwisów, które nie mają eksportu ani API: oferty, ceny, katalogi, listy firm. Dostajesz gotowy arkusz albo zasilaną cyklicznie bazę, bez duplikatów.",
    price: "od 49 zł",
    href: "/scraping-danych",
    grupa: "integracje",
    cta: "Opisz, czego szukasz",
    bullets: [
      "deduplikacja i walidacja zamiast surowego zrzutu",
      "jednorazowo albo cyklicznie",
      "darmowa próbka kilkunastu rekordów na start",
    ],
  },
];

export function productsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

/**
 * Trzeci poziom porzadku w katalogu: ile to kosztuje na wejsciu.
 *
 * Ceny w katalogu sa pisane po ludzku ("od 99 zl", "diagnoza 49 zl",
 * "od 3 900 zl", "wycena po diagnozie"), bo tak czyta je odwiedzajacy.
 * Do filtrowania i do znacznikow schema.org potrzebna jest ta sama kwota
 * jako liczba, wiec wyciagamy ja w jednym miejscu, zamiast trzymac obok
 * napisu drugie pole, ktore z czasem rozjedzie sie z pierwszym.
 */
export type PriceBand = "do50" | "do300" | "do1000" | "od1000" | "wycena";

export const PRICE_BAND_LABEL: Record<PriceBand, string> = {
  do50: "Do 50 zł",
  do300: "51 do 300 zł",
  do1000: "301 do 1000 zł",
  od1000: "Powyżej 1000 zł",
  wycena: "Wycena po diagnozie",
};

export const PRICE_BAND_ORDER: PriceBand[] = [
  "do50",
  "do300",
  "do1000",
  "od1000",
  "wycena",
];

export const PRICE_BAND_INTRO: Record<PriceBand, string> = {
  do50: "Jednorazowe sprawdzenia i raporty, które kupuje się bez zastanowienia.",
  do300:
    "Pojedyncza usterka strony albo jeden audyt, zamknięty zwykle w kilka dni.",
  do1000:
    "Wdrożenie jednego procesu albo panelu, liczone od podanej kwoty w górę.",
  od1000: "Integracje dwóch systemów, gdzie zakres ustala się przed startem.",
  wycena:
    "Praca, której zakresu nie da się podać z góry. Kwotę podajemy po diagnozie.",
};

/**
 * Kwota wejscia z ceny zapisanej slownie. Zwraca null, gdy cena zalezy od
 * diagnozy i zadnej liczby po prostu nie ma. "za darmo" to zero, a nie brak
 * ceny: darmowe sprawdzenie ma kwote, tylko rowna zeru.
 *
 * Rozpoznawane zapisy pilnuje `scripts/spojnosc.mjs`, zeby nowa cena w
 * nieznanym formacie nie wpadla po cichu do zlego przedzialu.
 */
export function cenaWejscia(price: string): number | null {
  if (/darmo|bezpłatn/i.test(price)) return 0;
  // Tysiace sa pisane ze spacja ("3 900 zl"), wiec najpierw ja usuwamy,
  // inaczej z ceny wyszlaby trojka.
  const liczba = price.replace(/(\d)[\s  ](?=\d)/g, "$1").match(/\d+/);
  return liczba ? Number(liczba[0]) : null;
}

export function pasmoCeny(price: string): PriceBand {
  const kwota = cenaWejscia(price);
  if (kwota === null) return "wycena";
  if (kwota <= 50) return "do50";
  if (kwota <= 300) return "do300";
  if (kwota <= 1000) return "do1000";
  return "od1000";
}
