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
    pytanie: "Czy wszystko z KSeF obowiązuje cię już dziś?",
    description:
      "Wybierz grupę podatnika, a pokażemy, od kiedy wystawiasz faktury w KSeF i jaki wyjątek jeszcze cię chroni.",
    href: "/ksef-integracja",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Kursy NBP",
    pytanie: "Jaki kurs NBP do faktury w walucie?",
    description:
      "Kurs średni NBP z dnia poprzedzającego fakturę i wzór do arkusza, który dopisuje kursy sam.",
    href: "/kursy-nbp",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Raport e-Doręczeń",
    pytanie: "Czy firma musi mieć adres do e-Doręczeń?",
    description:
      "Wpisz NIP albo KRS, a dostaniesz raport: rodzaj firmy, termin obowiązku i stan adresu w odpisie KRS.",
    href: "/raport-edoreczen",
    ikona: "koperta",
    badge: "Nowość",
  },
  {
    title: "Kalendarz terminów",
    pytanie: "Kiedy masz PIT, VAT i ZUS?",
    description:
      "Odpowiedz na pięć pytań o firmę, a dostaniesz kalendarz z terminami i przypomnieniami, który odświeża się sam.",
    href: "/kalendarz-terminow",
    ikona: "lista",
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
      "Wklej numer KSeF albo tytuły przelewów, a sprawdzimy sumę kontrolną, NIP i datę faktury.",
    href: "/numer-ksef",
    ikona: "faktura",
    badge: "Nowość",
  },
  {
    title: "Integracja z e-Doręczeniami",
    pytanie: "Od kiedy musisz mieć adres do e-Doręczeń?",
    description:
      "Wybierz formę działalności, a policzymy, od kiedy musisz mieć adres do e-Doręczeń.",
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
    title: "Czarne listy spamowe",
    pytanie: "Czy maile firmy nie lądują w spamie?",
    description:
      "Sprawdzenie domeny i serwerów poczty na 11 listach spamowych, a potem codzienny alert mailem. Za darmo.",
    href: "/czarne-listy",
    ikona: "lupa",
  },
  {
    title: "Kody QR z licznikiem skanów",
    pytanie: "Czy ktoś skanuje Twoje ulotki?",
    description:
      "Kod QR na ulotkę albo auto, który liczy skany. Obraz do druku i comiesięczny wynik przychodzą mailem.",
    href: "/kody-qr",
    ikona: "lupa",
  },
  {
    title: "Opisy produktów z CSV",
    pytanie: "Nie chce Ci się pisać opisów do sklepu?",
    description:
      "Wgraj plik z nazwami i cechami, a odeślemy go z opisem krótkim, długim i metatagami, za darmo do 25 produktów.",
    href: "/opisy-produktow-z-csv",
    ikona: "lista",
  },
  {
    title: "Naprawa ostrzeżenia o stronie",
    pytanie: "Czy przeglądarka straszy Twoją stroną?",
    description:
      "Wpisz adres, a sprawdzimy certyfikat i przekierowania, czyli czy przeglądarka nie straszy klientów ostrzeżeniem.",
    href: "/naprawa-https",
    ikona: "tarcza",
  },
  {
    title: "Pilnowanie certyfikatu i domeny",
    pytanie: "Kiedy wygasa certyfikat Twojej strony?",
    description:
      "Podaj domenę i e-mail. Sprawdzamy certyfikat HTTPS i ważność domeny raz na dobę i piszemy 30, 14 i 3 dni przed końcem.",
    href: "/pilnowanie-certyfikatu",
    ikona: "tarcza",
    badge: "Nowość",
  },
  {
    title: "Monitoring dostępności strony",
    pytanie: "Czy Twoja strona działa w tej chwili?",
    description:
      "Sprawdzamy adres tak jak odwiedzający i pokazujemy kod odpowiedzi oraz czas. Chcesz, żeby robiono to co 5 minut, włączasz monitoring za 19 zł.",
    href: "/monitoring-dostepnosci",
    ikona: "tarcza",
  },
  {
    title: "Dane firmy z NIP",
    pytanie: "Kim jest firma, która do Ciebie napisała?",
    description:
      "Wpisz NIP, a pokażemy nazwę, adres, KRS i branżę z rejestrów państwowych. W abonamencie dopisujemy je do każdego zgłoszenia.",
    href: "/dane-firmy-z-nip",
    ikona: "lupa",
  },
  {
    title: "Ankieta NPS",
    pytanie: "Czy klienci poleciliby Twoją firmę?",
    description:
      "Wybierz ocenę i zobacz mail z odpowiedzią klienta. W abonamencie dostajesz link do ankiety i wynik NPS w panelu.",
    href: "/ankieta-nps",
    ikona: "lupa",
  },
  {
    title: "Prośba o opinię Google",
    pytanie: "Jak zdobyć więcej opinii w Google?",
    description:
      "Zobacz mail z przyciskiem do Twojej wizytówki, który dostaje klient po zakończonej współpracy. W abonamencie wysyłasz go z panelu albo z Zapier i Make.",
    href: "/prosba-o-opinie-google",
    ikona: "lupa",
  },
  {
    title: "Formularz leadów z listą zgłoszeń",
    pytanie: "Gdzie lądują zgłoszenia ze strony?",
    description:
      "Zobacz formularz, który wkleisz na stronę, i mail, który dostaniesz po każdym zgłoszeniu. W abonamencie zgłoszenia zostają też na liście w panelu.",
    href: "/formularz-leadow",
    ikona: "lupa",
  },
  {
    title: "Ocena leada przez AI",
    pytanie: "Do którego zgłoszenia zadzwonić najpierw?",
    description:
      "Wklej treść zgłoszenia, a pokażemy ocenę gorący, ciepły albo zimny i podpowiedź na rozmowę. W abonamencie ocena jest przy każdym zgłoszeniu.",
    href: "/ocena-leada-ai",
    ikona: "lupa",
  },
  {
    title: "Odpowiedź na leada w minutę",
    pytanie: "Ile czeka klient na Twoją pierwszą odpowiedź?",
    description:
      "Wpisz ofertę i link do kalendarza, a pokażemy mail, który klient dostanie w minutę po zgłoszeniu. W abonamencie wysyłamy go automatycznie.",
    href: "/odpowiedz-na-leada",
    ikona: "lupa",
  },
  {
    title: "Strażnik formularza kontaktowego",
    pytanie: "Czy zgłoszenia z Twojego formularza naprawdę dochodzą?",
    description:
      "Sprawdzamy, czy obsłużymy Twój formularz. Po włączeniu wysyłamy raz na dobę zgłoszenie testowe i piszemy od razu, gdy przestanie przechodzić.",
    href: "/straznik-formularza",
    ikona: "tarcza",
    badge: "Nowość",
  },
  {
    title: "Rejestr cen w sklepie",
    description:
      "Sprawdzamy Twoje przeceny i pokazujemy te, przy których brakuje najniższej ceny z 30 dni.",
    href: "/rejestr-cen",
    ikona: "metka",
  },
  {
    title: "Kontrola wersji językowej",
    description:
      "Znajdujemy Twoją wersję obcojęzyczną i liczymy fragmenty, które zostały po polsku.",
    href: "/kontrola-jezykow",
    ikona: "jezyk",
  },
  {
    title: "Analiza lokalizacji pod punkt",
    description:
      "Podaj miejscowość i branżę, a policzymy konkurencję w promieniu 1, 3 i 5 km.",
    href: "/analiza-lokalizacji",
    ikona: "pinezka",
  },
  {
    title: "Widoczność w AI",
    pytanie: "Czy asystent AI widzi Twoją stronę?",
    description:
      "Sprawdzamy, czy ChatGPT, Claude i Perplexity mogą przeczytać Twoją stronę i zrozumieć, czym się zajmujesz.",
    href: "/widocznosc-w-ai",
    ikona: "lupa",
  },
  {
    title: "9 sygnałów, że czas na automatyzację",
    pytanie: "Czy automatyzacja się u Ciebie zwróci?",
    description:
      "Dziewięć zdań o ręcznej pracy w firmie. Zaznacz pasujące, a pokażemy, czy warto automatyzować i od którego procesu zacząć.",
    href: "/sygnaly-automatyzacji",
    ikona: "moneta",
    badge: "Nowość",
  },
  {
    title: "Tańsze automatyzacje",
    pytanie: "Ile naprawdę płacisz za Zapiera i Make?",
    description:
      "Liczymy, ile miesięcznie płacisz za Zapiera albo Make i ile kosztowałyby te same scenariusze na własnym serwerze.",
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
      "Sprawdzamy w Monitorze Sądowym, czy spółka Twojego dłużnika nie znika z KRS.",
    href: "/czujka-rejestrowa",
    ikona: "mlotek",
  },
  {
    title: "Klient nie wie, komu płaci",
    pytanie: "Czy klient ustali, komu płaci?",
    description:
      "Wyciągamy NIP i numer konta z Twojej strony i sprawdzamy, czy zgadzają się z wykazem podatników VAT.",
    href: "/dane-sprzedawcy",
    ikona: "pieczec",
  },
  {
    title: "Mapa strony dla Google",
    pytanie: "Czy Google ma listę Twoich podstron?",
    description:
      "Sprawdzamy, czy masz mapę strony, czy wskazuje ją robots.txt i czy adresy z niej działają.",
    href: "/mapa-strony",
    ikona: "mapa",
  },
  {
    title: "Strona pod dwoma adresami",
    pytanie: "Czy Google widzi Twoją stronę podwójnie?",
    description:
      "Sprawdzamy cztery wersje Twojego adresu, z www i bez, i czy jedna przekierowuje na drugą.",
    href: "/podwojny-adres",
    ikona: "rozwidlenie",
  },
  {
    title: "Właściciel domeny",
    pytanie: "Kto jest właścicielem Twojej domeny?",
    description:
      "Odczytujemy z rejestru, kto jest abonentem Twojej domeny i kiedy wygasa rejestracja.",
    href: "/wlasnosc-domeny",
    ikona: "klucz",
  },
  {
    title: "Sprawdzenie NIP",
    description:
      "Wpisz NIP, a sprawdzimy firmę w wykazie VAT, rachunki bankowe i datę rejestracji.",
    href: "/sprawdzenie-nip",
    ikona: "lupa",
  },
  {
    title: "Adresy do e-Doręczeń z listy NIP",
    description:
      "Wklej do 50 numerów NIP, a dostaniesz plik z adresami do e-Doręczeń wpisanymi do KRS i listę firm bez adresu.",
    href: "/adresy-do-edoreczen",
    ikona: "lupa",
  },
  {
    title: "Kalkulator ZUS 2026 i 2027",
    description:
      "Składki społeczne i zdrowotna dla dużego ZUS, preferencyjnego, Małego ZUS Plus i ulgi na start, miesięcznie i rocznie. Każda stawka z linkiem do aktu.",
    href: "/narzedzia/kalkulator-zus",
    ikona: "kalkulator",
  },
  {
    title: "Kalkulator PIT 2026 i 2027",
    description:
      "Podatek z działalności i z etatu: skala, liniowy, ryczałt, zaliczki, zeznanie roczne, wspólne rozliczenie i kwota na rękę.",
    href: "/narzedzia/kalkulator-pit",
    ikona: "kalkulator",
  },
  {
    title: "Porównanie form opodatkowania",
    description:
      "Skala, liniowy i ryczałt obok siebie dla 2026 i 2027: ZUS, zdrowotna, podatek i kwota na rękę dla Twoich liczb.",
    href: "/narzedzia/porownanie-form-opodatkowania",
    ikona: "kalkulator",
  },
  {
    title: "Audyt poczty firmowej",
    description:
      "Sprawdzamy SPF, DKIM i DMARC, czyli czy ktoś może wysyłać maile w Twoim imieniu i czemu Twoje wiadomości trafiają do spamu.",
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
      "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. Cztery liczby i jasna odpowiedź.",
    href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator",
    ikona: "kalkulator",
  },
];

export const otherTools: Narzedzie[] = [
  {
    title: "Darmowe szablony",
    description:
      "Brief strony internetowej, checklista przed startem strony i checklista KSeF dla małej firmy do pobrania.",
    href: "/szablony",
    ikona: "lista",
  },
  {
    title: "Sprawdź auto przed zakupem",
    description:
      "Wklej link do ogłoszenia, a porównamy cenę z podobnymi ofertami i pokażemy typowe usterki modelu.",
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
    image: "/photos/car-chooser/type-osobowy.webp",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description:
      "Porównaj skalę podatkową, podatek liniowy i ryczałt ze składkami ZUS i ulgami, z jasną odpowiedzią, co się bardziej opłaca.",
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
    "Publiczne rejestry i Twoje własne liczby: kontrahent, dłużnik, faktura od kuriera, konkurencja w okolicy.",
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
  "/wlasny-crm": "/koszt-recznej-obslugi-leadow",
};
