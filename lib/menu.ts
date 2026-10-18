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
      tytul: "Naprawa od 150\u00a0zł",
      opis: "Nowa strona od 4 500 zł, gotowa w 2–3 tygodnie.",
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
      tytul: "Własny CRM od 1\u00a0zł",
      opis: "Pilotaż do 3 osób, abonament 499 zł miesięcznie.",
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
        tytul: "Usługi",
        linki: [
          l("/strony-www", "naprawa od 150 zł"),
          l("/wlasny-crm", "wdrożenie od 1 zł"),
          l("/automatyzacja-leadow-crm", "od 1 500 zł"),
        ],
      },
      {
        tytul: "Na start",
        linki: [
          l("/audyt-strony", "0 zł"),
          l("/pogotowie-automatyzacji", "diagnoza 49 zł"),
          l("/wdrozenie-n8n-cena", "cena z góry"),
        ],
      },
    ],
    kafel: {
      tytul: "Pełny cennik",
      opis: "Wszystkie usługi z ceną z góry, bez rozliczania godzin.",
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
      opis: "Odpisujemy z ceną i terminem, zwykle tego samego dnia.",
      href: "/kontakt",
      cta: "Kontakt",
    },
  },
];
