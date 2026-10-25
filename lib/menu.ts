/** Menu w nagłówku: każda pozycja ma panel o podobnej wielkości
 *  (kolumny po 4–7 linków i kafelek z najważniejszą ofertą). Nazwy stron
 *  bierzemy z lib/sekcje.ts, żeby były takie same jak w stopce i mapie. */

import { SEKCJE, type Strona } from "@/lib/sekcje";
import { categories } from "@/lib/categories";
import { nazwaFilaru } from "@/lib/filary";

export type LinkMenu = Strona & { cena?: string };
export type Kolumna = { tytul: string; linki: LinkMenu[] };
export type Kafel = { tytul: string; opis: string; href: string; cta: string };
export type PozycjaMenu = {
  id: string;
  etykieta: string;
  href: string;
  kolumny: Kolumna[];
  kafel: Kafel;
};

const NAZWY = new Map(
  SEKCJE.flatMap((s) => s.grupy.flatMap((g) => g.strony)).map((x) => [
    x.href,
    x.nazwa,
  ]),
);

const l = (href: string, cena?: string): LinkMenu => {
  const nazwa = NAZWY.get(href);
  if (!nazwa) throw new Error(`Brak ${href} w lib/sekcje.ts`);
  return cena ? { href, nazwa, cena } : { href, nazwa };
};

const kategorie = categories.map((c) => ({
  href: `/strefa-wiedzy/kategoria/${c.slug}`,
  nazwa: c.name,
}));
const polowa = Math.ceil(kategorie.length / 2);

export const MENU: PozycjaMenu[] = [
  {
    id: "strony",
    etykieta: nazwaFilaru("/strony-www")!,
    href: "/strony-www",
    kolumny: [
      {
        tytul: "Strony",
        linki: [
          l("/strony-www"),
          l("/landing-z-platnoscia"),
          l("/strona-po-wlamaniu"),
          l("/mail-firmowy"),
          l("/naprawa-https"),
          l("/profil-firmy-google"),
          l("/benchmarking-konkurencji"),
        ],
      },
      {
        tytul: "Sprawdź swoją stronę",
        linki: [
          l("/audyt-strony"),
          l("/widocznosc-w-google"),
          l("/widocznosc-w-ai"),
          l("/mapa-strony"),
          l("/audyt-poczty"),
        ],
      },
    ],
    kafel: {
      tytul: "Strona z opieką od 300\u00a0zł/mies.",
      opis: "Nowa strona od 2 900 zł, poprawki od 150 zł.",
      href: "/strony-www",
      cta: "Zobacz ofertę",
    },
  },
  {
    id: "automatyzacja",
    etykieta: nazwaFilaru("/automatyzacja-leadow-crm")!,
    href: "/automatyzacja-leadow-crm",
    kolumny: [
      {
        tytul: "CRM i leady",
        linki: [
          l("/wlasny-crm"),
          l("/automatyzacja-leadow-crm"),
          l("/automatyczne-przypisywanie-leadow"),
          l("/automatyzacja-follow-up"),
          l("/automatyzacja-formularza-do-pipedrive"),
          l("/raportowanie-z-pipedrive"),
        ],
      },
      {
        tytul: "Automatyzacje",
        linki: [
          l("/automatyzacja-procesow-biznesowych"),
          l("/automatyzacja-raportowania"),
          l("/automatyzacja-ai"),
          l("/automatyzacja-pipedrive"),
          l("/automatyzacja-salesforce"),
          l("/pogotowie-automatyzacji"),
        ],
      },
      {
        tytul: "n8n i integracje",
        linki: [
          l("/n8n"),
          l("/n8n-dla-crm"),
          l("/wdrozenie-n8n-cena"),
          l("/integracje-api"),
          l("/integracja-crm-z-erp"),
          l("/scraping-danych"),
        ],
      },
      {
        tytul: "Branże",
        linki: [
          l("/automatyzacja-dla-ecommerce"),
          l("/automatyzacja-dla-biur-rachunkowych"),
          l("/automatyzacja-dla-agencji-marketingowych"),
          l("/automatyzacja-crm-leasing"),
          l("/audyt-marz"),
          l("/kontrola-paliwa"),
        ],
      },
    ],
    kafel: {
      tytul: "Własny CRM, wdrożenie 0\u00a0zł",
      opis: "Wdrożenie 0 zł, abonament od 499 zł miesięcznie.",
      href: "/wlasny-crm",
      cta: "Zobacz CRM",
    },
  },
  {
    id: "narzedzia",
    etykieta: "Narzędzia",
    href: "/narzedzia",
    kolumny: [
      {
        tytul: "Firma i rejestry",
        linki: [
          l("/sprawdzenie-nip"),
          l("/sprawdz-kontrahenta"),
          l("/czujka-rejestrowa"),
          l("/analiza-lokalizacji"),
          l("/audyt-kurierski"),
        ],
      },
      {
        tytul: "KSeF i e-Doręczenia",
        linki: [
          l("/ksef-integracja"),
          l("/ksef-2027"),
          l("/numer-ksef"),
          l("/e-doreczenia-integracja"),
          l("/szablony"),
        ],
      },
      {
        tytul: "Koszty i audyty",
        linki: [
          l("/tansze-automatyzacje"),
          l("/koszt-recznej-obslugi-leadow"),
          l("/audyt-crm"),
          l("/audyt-chatbota"),
          l("/audyt-google-ads"),
        ],
      },
    ],
    kafel: {
      tytul: "Wszystkie narzędzia",
      opis: "Darmowe sprawdzenia bez rejestracji, wynik w minutę.",
      href: "/narzedzia",
      cta: "Zobacz listę",
    },
  },
  {
    id: "cennik",
    etykieta: "Cennik",
    href: "/produkty",
    kolumny: [
      {
        tytul: "W abonamencie",
        linki: [
          l("/strony-www", "opieka od 300 zł/mies."),
          l("/profil-firmy-google", "349 zł/mies."),
          l("/benchmarking-konkurencji", "od 39 zł/mies."),
          l("/wlasny-crm", "od 499 zł/mies."),
        ],
      },
      {
        tytul: "Jednorazowo",
        linki: [
          l("/audyt-strony", "0 zł"),
          l("/pogotowie-automatyzacji", "diagnoza 49 zł"),
          l("/automatyzacja-leadow-crm", "od 900 zł"),
          l("/wdrozenie-n8n-cena", "od 790 zł"),
        ],
      },
    ],
    kafel: {
      tytul: "Pełny cennik",
      opis: "Abonamenty bez opłaty za wdrożenie i prace jednorazowe z ceną z góry.",
      href: "/produkty",
      cta: "Zobacz cennik",
    },
  },
  {
    id: "wiedza",
    etykieta: "Strefa wiedzy",
    href: "/strefa-wiedzy",
    kolumny: [
      { tytul: "Kategorie", linki: kategorie.slice(0, polowa) },
      { tytul: " ", linki: kategorie.slice(polowa) },
      {
        tytul: "Na start",
        linki: [
          l("/slownik"),
          l("/czas-reakcji-na-leada"),
          l("/crm-jako-system-pracy"),
          l("/strefa-wiedzy/automatyzacja-vs-zatrudnienie"),
        ],
      },
    ],
    kafel: {
      tytul: "Wszystkie artykuły",
      opis: "Krótko o KSeF, CRM, automatyzacji i stronach.",
      href: "/strefa-wiedzy",
      cta: "Czytaj",
    },
  },
  {
    id: "o-nas",
    etykieta: "O nas",
    href: "/jak-pracuje",
    kolumny: [
      {
        tytul: "O nas",
        linki: [
          l("/realizacje"),
          l("/case-study"),
          l("/jak-pracuje"),
          l("/pilotaz"),
        ],
      },
      {
        tytul: "Ta strona",
        linki: [l("/jak-zbudowana"), l("/zmiany"), l("/kontakt")],
      },
    ],
    kafel: {
      tytul: "Napisz do nas",
      opis: "Odpisujemy z ceną i terminem, tego samego dnia.",
      href: "/kontakt",
      cta: "Kontakt",
    },
  },
];

/** Jedno zdanie pod nazwą linku w panelu menu. */
export const OPIS_MENU: Record<string, string> = {
  "/strony-www": "Nowa strona albo naprawa obecnej",
  "/landing-z-platnoscia": "Sprzedaż od razu, płatność na stronie",
  "/strona-po-wlamaniu": "Czyścimy, łatamy i stawiamy na nogi",
  "/mail-firmowy": "Adres w domenie, poczta bez spamu",
  "/naprawa-https": "Koniec z ostrzeżeniem w przeglądarce",
  "/audyt-strony": "Wynik w minutę, lista poprawek z ceną",
  "/widocznosc-w-google": "Czy Google w ogóle Cię widzi",
  "/profil-firmy-google": "Wizytówka w Mapach, 349 zł/mc",
  "/benchmarking-konkurencji": "Co zmienia konkurencja, od 39 zł/mc",
  "/widocznosc-w-ai": "Czy ChatGPT poleca Twoją firmę",
  "/mapa-strony": "Mapa dla Google bez błędów",
  "/audyt-poczty": "SPF, DKIM, DMARC w jednym sprawdzeniu",
  "/wlasny-crm": "Lead trafia sam do handlowca",
  "/automatyzacja-leadow-crm": "Formularz, CRM, zadanie, raport",
  "/automatyczne-przypisywanie-leadow": "Każdy lead od razu ma opiekuna",
  "/automatyzacja-follow-up": "Przypomnienia, które wysyłają się same",
  "/automatyzacja-formularza-do-pipedrive": "Formularz prosto do Pipedrive",
  "/raportowanie-z-pipedrive": "Raport sprzedaży bez Excela",
  "/automatyzacja-procesow-biznesowych": "Jeden proces od początku do końca",
  "/automatyzacja-raportowania": "Raporty składają się same",
  "/automatyzacja-ai": "AI czyta, streszcza i odpowiada",
  "/automatyzacja-pipedrive": "Pipedrive, który pracuje za zespół",
  "/automatyzacja-salesforce": "Salesforce bez ręcznego klikania",
  "/pogotowie-automatyzacji": "Stanęła integracja? Naprawiamy",
  "/n8n": "Scenariusze w n8n pod klucz",
  "/n8n-dla-crm": "n8n spięty z Twoim CRM",
  "/wdrozenie-n8n-cena": "Ile kosztuje wdrożenie n8n",
  "/integracje-api": "Systemy, które same się dogadują",
  "/integracja-crm-z-erp": "CRM i ERP bez przepisywania",
  "/scraping-danych": "Dane z miejsc bez eksportu",
  "/automatyzacja-dla-ecommerce": "Zamówienia, stany, zwroty",
  "/automatyzacja-dla-biur-rachunkowych": "Dokumenty i KSeF bez przepisywania",
  "/automatyzacja-dla-agencji-marketingowych": "Raporty dla klientów same",
  "/automatyzacja-crm-leasing": "Wnioski i oferty szybciej",
  "/audyt-marz": "Gdzie sklep traci na marży",
  "/kontrola-paliwa": "Tankowania zestawione z trasą",
  "/sprawdzenie-nip": "VAT, rachunek i status w sekundę",
  "/sprawdz-kontrahenta": "Zanim wyślesz towar na kredyt",
  "/czujka-rejestrowa": "Alarm, gdy kontrahent znika",
  "/analiza-lokalizacji": "Czy punkt ma klientów w okolicy",
  "/audyt-kurierski": "Nadpłaty na fakturach kurierów",
  "/ksef-integracja": "Faktury do KSeF z Twojego systemu",
  "/ksef-2027": "Lista rzeczy do zrobienia przed KSeF",
  "/numer-ksef": "Sprawdź numer faktury w KSeF",
  "/e-doreczenia-integracja": "Skrzynka e-Doręczeń w Twoim systemie",
  "/szablony": "Brief i checklisty do pobrania",
  "/tansze-automatyzacje": "Ile przepłacasz za Zapiera",
  "/koszt-recznej-obslugi-leadow": "Ile kosztuje ręczna praca",
  "/audyt-crm": "Czy CRM pomaga, czy przeszkadza",
  "/audyt-chatbota": "Czy chatbot nie zmyśla",
  "/audyt-google-ads": "Budżet przepalany na złe frazy",
  "/slownik": "KSeF, DMARC, webhook po ludzku",
  "/czas-reakcji-na-leada": "Dlaczego liczy się 15 minut",
  "/crm-jako-system-pracy": "CRM, który zespół lubi",
  "/strefa-wiedzy/automatyzacja-vs-zatrudnienie": "Kalkulator: automat czy etat",
  "/realizacje": "Strony i wdrożenia przed i po",
  "/case-study": "Gotowe przepływy krok po kroku",
  "/jak-pracuje": "Od zapytania do wdrożenia",
  "/pilotaz": "Pilotaż CRM na start",
  "/jak-zbudowana": "Technologia tej strony",
  "/zmiany": "Co zmieniliśmy ostatnio",
  "/kontakt": "Odpisujemy tego samego dnia",
};
