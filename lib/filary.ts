/** Trzy filary oferty. Jedno miejsce, w którym filar dostaje nazwę.
 *
 *  Powód: ten sam adres nazywał się w czterech miejscach na cztery sposoby.
 *  `/strony-www` było w menu „Systemy i strony", w stopce „Strony WWW", a na
 *  stronie 404 znowu „Strony WWW"; `/scraping-danych` było „Integracje i dane"
 *  w menu, „Dane" w stopce i „Scraping danych" na 404. Wchodzący dostawał trzy
 *  różne firmy zamiast jednej. Nazwa kanoniczna jest tylko tutaj, a kontrola
 *  1f w `scripts/spojnosc.mjs` pilnuje, żeby nikt nie dopisał obok czwartej.
 */
export type Filar = {
  /** Adres strony filaru. */
  href: string;
  /** Nazwa kanoniczna. Ta sama w menu, w stopce, na kaflu i na 404. */
  nazwa: string;
  /** Jedno zdanie pod nazwą tam, gdzie jest na nie miejsce (404). */
  opis: string;
};

export const FILARY: Filar[] = [
  {
    href: "/automatyzacja-leadow-crm",
    nazwa: "Automatyzacja procesów",
    opis: "Lead trafia do CRM, handlowiec dostaje zadanie, raport składa się sam",
  },
  {
    href: "/scraping-danych",
    nazwa: "Integracje i dane",
    opis: "Systemy spięte przez API, dane wyciągnięte stamtąd, gdzie nie ma eksportu",
  },
  {
    href: "/strony-www",
    nazwa: "Systemy i strony",
    opis: "Strony, panele i formularze będące częścią procesu, nie osobnym bytem",
  },
];

/** Nazwa filaru po adresie. Zwraca null dla adresu spoza trzech filarów. */
export function nazwaFilaru(href: string): string | null {
  return FILARY.find((f) => f.href === href)?.nazwa ?? null;
}
