export type ProductCategory = "www" | "automatyzacja" | "dane";

export interface Product {
  name: string;
  tagline: string;
  desc: string;
  price: string;
  href: string;
  cta: string;
  bullets: string[];
  category: ProductCategory;
  featured?: boolean;
}

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  www: "Strony WWW",
  automatyzacja: "Automatyzacja",
  dane: "Dane",
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
    name: "Ratunek po włamaniu na stronę",
    tagline: "Zhakowany WordPress albo WooCommerce",
    desc: "Porównuję pliki Twojej strony z oryginałami prosto z repozytorium WordPressa, więc listę obcych i podmienionych plików mam w minuty, a nie po godzinach ręcznego szukania. Do tego skan bazy pod wstrzyknięcia i podstawionych administratorów.",
    price: "diagnoza 49 zł",
    href: "/strona-po-wlamaniu",
    cta: "Zgłoś włamanie",
    bullets: [
      "raport, którędy weszli, a nie samo posprzątanie",
      "usuwanie spamu SEO i przekierowań na obce strony",
      "zabezpieczenie, żeby backup nie przywrócił backdoora",
    ],
    featured: true,
  },
  {
    category: "www",
    name: "Poprawki i nowe podstrony",
    tagline: "WordPress, Elementor, Greenshift",
    desc: "Drobne zmiany na działającej stronie robione tak, żeby przeżyły aktualizację motywu: style globalne zamiast lokalnych nadpisań i punkty graniczne motywu zamiast sztywnych pikseli.",
    price: "od 99 zł",
    href: "/strony-www",
    cta: "Zamów poprawki",
    bullets: [
      "nowa podstrona w obecnym stylu strony",
      "naprawa wyrównań na komórce i desktopie",
      "sekcje zapisane jako wzorce do samodzielnego użycia",
    ],
  },
  {
    category: "www",
    name: "Audyt szybkości i błędów",
    tagline: "Automatyczny przegląd techniczny",
    desc: "Automat przechodzi po stronie, mierzy czas ładowania, znajduje błędy konsoli, martwe linki, brakujące opisy obrazków i elementy blokujące renderowanie. Wynik to lista poprawek uszeregowana po realnym wpływie.",
    price: "19 zł",
    href: "/audyt-strony",
    cta: "Zamów audyt strony",
    bullets: [
      "priorytety według wpływu, nie lista 200 uwag",
      "co spowalnia stronę na telefonie",
      "błędy, które widzi Google, a nie widzisz Ty",
    ],
  },
  {
    category: "www",
    name: "Landing z formularzem i płatnością",
    tagline: "Szybkie wdrożenie pod jedną kampanię",
    desc: "Jedna strona sprzedażowa z formularzem i bramką płatniczą, gotowa pod BLIK i przelewy. Zgłoszenie zapisuje się zanim klient przejdzie do płatności, więc nie tracisz danych osób, które zrezygnują w trakcie.",
    price: "od 299 zł",
    href: "/strony-www",
    cta: "Zamów landing",
    bullets: [
      "jeden szablon podpięty pod wiele domen",
      "potwierdzenie płatności webhookiem, nie powrotem na stronę",
      "powiadomienie mailem o każdym zgłoszeniu",
    ],
  },

  // ---------- AUTOMATYZACJA ----------
  {
    category: "automatyzacja",
    name: "Pogotowie automatyzacji",
    tagline: "Stanęła integracja albo scenariusz",
    desc: "Naprawa cudzych, już wdrożonych automatyzacji: n8n, Make, Zapier, BaseLinker, WooCommerce, Allegro, webhooki i skrypty po poprzednim wykonawcy. Czytam logi wykonań, znajduję wygasłe poświadczenia i ciche awarie, czyli scenariusze zielone, ale puste.",
    price: "diagnoza 49 zł",
    href: "/pogotowie-automatyzacji",
    cta: "Zgłoś awarię",
    bullets: [
      "odpowiedź do 2 godzin w godzinach pracy",
      "diagnoza płatna z góry, naprawa wyceniana po niej",
      "przejęcie opieki po wykonawcy, który zniknął",
    ],
    featured: true,
  },
  {
    category: "automatyzacja",
    name: "Audyt zmarnowanego budżetu Google Ads",
    tagline: "Odzyskaj pieniądze przepalane na frazy bez konwersji",
    desc: "Analiza raportu wyszukiwanych haseł: ile budżetu idzie na kliknięcia bez efektu, gotowa lista wykluczeń i plan naprawy konta.",
    price: "69 zł",
    href: "/audyt-google-ads",
    cta: "Zamów mini-audyt",
    bullets: [
      "zwrot, jeśli znajdę mniej niż 500 zł/mc do odzyskania",
      "gotowa lista wykluczających słów kluczowych",
      "plan naprawy konta krok po kroku",
    ],
  },
  {
    category: "automatyzacja",
    name: "Audyt poczty firmowej",
    tagline: "SPF, DKIM i DMARC w jednym raporcie",
    desc: "Automat sprawdza, czy Twoja domena jest poprawnie zabezpieczona i czy ktoś może podszyć się pod Twój adres. To najczęstszy powód, dla którego firmowe maile lądują w spamie.",
    price: "19 zł",
    href: "/audyt-poczty",
    cta: "Sprawdź swoją pocztę",
    bullets: [
      "czy ktoś może wysyłać maile jako Ty",
      "dlaczego Twoje wiadomości trafiają do spamu",
      "gotowe rekordy do wklejenia w panelu DNS",
    ],
  },
  {
    category: "automatyzacja",
    name: "Audyt chatbota",
    tagline: "Sprawdź, co Twój asystent AI mówi klientom",
    desc: "Zadaję Twojemu botowi 150 realnych pytań klienta i zderzam każdą odpowiedź z prawdą sklepu: cennikiem, regulaminem i zasadami zwrotów. Wyłapuję halucynacje i obietnice, którymi firma jest związana.",
    price: "69 zł",
    href: "/audyt-chatbota",
    cta: "Zamów audyt bota",
    bullets: [
      "lista odpowiedzi sprzecznych z regulaminem",
      "kosztowne obietnice wypowiedziane przez bota",
      "zestaw testów do powtórzenia po zmianie modelu",
    ],
  },
  {
    category: "automatyzacja",
    name: "Integracje API",
    tagline: "Spięcie systemów, które nie chcą rozmawiać",
    desc: "Łączę sklep, CRM, ERP i hurtownie tak, żeby dane przechodziły same: synchronizacja przyrostowa, obsługa limitów API i logi, które pokazują cichy błąd zanim zepsuje dane.",
    price: "wycena po diagnozie",
    href: "/integracje-api",
    cta: "Opisz integrację",
    bullets: [
      "synchronizacja różnicowa zamiast pełnych przebiegów",
      "odporność na limity i chwilowe awarie API",
      "bezpłatna diagnoza przed wyceną",
    ],
  },
  {
    category: "automatyzacja",
    name: "Automatyzacja raportowania",
    tagline: "Koniec z ręcznym sklejaniem Excela",
    desc: "Raport, który składa się sam i ląduje na mailu o ustalonej godzinie, zamiast zjadać komuś pół dnia w miesiącu.",
    price: "wycena po diagnozie",
    href: "/automatyzacja-raportowania",
    cta: "Zamów automatyzację",
    bullets: [
      "dane z wielu źródeł w jednym zestawieniu",
      "wysyłka cykliczna bez udziału człowieka",
      "alert, gdy liczby wyglądają podejrzanie",
    ],
  },

  // ---------- DANE ----------
  {
    category: "dane",
    name: "Sprawdź auto przed zakupem",
    tagline: "Raport due-diligence dla kupującego",
    desc: "Wklejasz link do oferty z Otomoto lub OLX, a dostajesz benchmark ceny wobec podobnych aut, listę typowych usterek modelu, wykryte red-flagi i gotowy skrypt negocjacji.",
    price: "od 5 zł",
    href: "/sprawdz-auto",
    cta: "Zamów sprawdzenie auta",
    bullets: [
      "price-check 5 zł, pełny raport 15 zł",
      "benchmark ceny i wykrywanie cofniętego licznika",
      "argumenty do negocjacji ceny",
    ],
    featured: true,
  },
  {
    category: "dane",
    name: "Sprawdzony kontrahent",
    tagline: "Zanim wyślesz zaliczkę",
    desc: "Werdykt o konkretnej firmie złożony automatem z publicznych źródeł: Biała Lista VAT, KRS, rejestr zadłużonych, wiek domeny i listy ostrzeżeń. Pojedynczy check zajmuje 30 sekund, ale dopiero złożenie tego razem mówi, czy to firma widmo.",
    price: "od 9 zł",
    href: "/sprawdz-kontrahenta",
    cta: "Sprawdź firmę",
    bullets: [
      "werdykt zielony, żółty albo czerwony z uzasadnieniem",
      "ostrzeżenie, gdy konto jest spoza wykazu VAT",
      "szybki check 9 zł, pełny raport 29 zł",
    ],
  },
  {
    category: "dane",
    name: "ImportRadar DE→PL",
    tagline: "Które auta z Niemiec realnie się opłaca",
    desc: "Skanuję żywe oferty z DE i NL i wskazuję konkretne egzemplarze, które zarabiają po odjęciu wszystkich kosztów sprowadzenia, oraz modele z kosztownymi wadami, których lepiej unikać.",
    price: "od 10 zł",
    href: "/import-radar",
    cta: "Znajdź opłacalne auto",
    bullets: [
      "ranking marży netto na realnych ofertach",
      "akcyza wyliczona dla konkretnego pojazdu",
      "ostrzeżenia przed modelami z drogimi usterkami",
    ],
  },
  {
    category: "dane",
    name: "Audyt marż sklepu",
    tagline: "Które bestsellery realnie tracą pieniądze",
    desc: "Przysyłasz eksport sprzedaży i ceny zakupu, a dostajesz prawdziwy zysk na sztuce po prowizjach, zwrotach i dopłatach do wysyłki. Panel sprzedażowy pokazuje obrót, a nie to, co zostaje na czysto.",
    price: "49 zł",
    href: "/audyt-marz",
    cta: "Zamów audyt marż",
    bullets: [
      "lista produktów sprzedawanych pod kreską",
      "martwy stok i zamrożony w nim kapitał",
      "priorytety, co dokupić, a co odstawić",
    ],
  },
  {
    category: "dane",
    name: "Kontrola paliwa we flocie",
    tagline: "Tankowania zestawione z trasą",
    desc: "Eksport z kart paliwowych zestawiony z przebiegami i trasą. Sam portal karty pokazuje listę transakcji, ale dopiero zestawienie z trasą wyłapuje tankowanie do kanistra, obce auto albo klon karty.",
    price: "od 99 zł",
    href: "/kontrola-paliwa",
    cta: "Zamów kontrolę floty",
    bullets: [
      "lista transakcji do wyjaśnienia z kwotą straty",
      "darmowy skan trzech pojazdów za jeden miesiąc",
      "gotowe reguły blokad na przyszłość",
    ],
  },
  {
    category: "dane",
    name: "Scraping danych na zamówienie",
    tagline: "Dane, których nie da się wyeksportować",
    desc: "Zbieram dane z serwisów, które nie mają eksportu ani API: oferty, ceny, katalogi, listy firm. Dostajesz gotowy arkusz albo zasilaną cyklicznie bazę, bez duplikatów.",
    price: "od 49 zł",
    href: "/scraping-danych",
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
