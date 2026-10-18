/** Opcje strony w konfiguratorze /strony-www i w wycenie PDF. Jedno źródło cen,
 *  żeby konfigurator i dokument liczyły tak samo. Ceny netto, orientacyjne:
 *  płatności jak dodatek na /landing-z-platnoscia (790 zł), wersja językowa
 *  jako 30% wdrożenia, bo to tłumaczenie i druga kopia każdej podstrony. */

export type OpcjaStrony = {
  nazwa: string;
  /** Rodzaje strony, w których opcja jest już w cenie. */
  wCenie: string[];
  /** Kwota netto dla danego rodzaju i jego ceny bazowej. */
  cena: (baza: number) => number;
};

export const OPCJE_STRONY: Record<string, OpcjaStrony> = {
  crm: {
    nazwa: "Formularz podpięty do CRM",
    wCenie: ["landing", "firmowa", "sklep"],
    cena: () => 0,
  },
  cms: {
    nazwa: "Panel do edycji treści (CMS)",
    wCenie: ["firmowa", "sklep"],
    cena: () => 1500,
  },
  en: {
    nazwa: "Wersja angielska",
    wCenie: [],
    cena: (baza) => Math.round((baza * 0.3) / 100) * 100,
  },
  blog: {
    nazwa: "Blog",
    wCenie: [],
    cena: () => 1200,
  },
  platnosci: {
    nazwa: "Integracja płatności",
    wCenie: ["sklep"],
    cena: () => 790,
  },
};

export function cenaOpcji(id: string, rodzaj: string, baza: number): number {
  const o = OPCJE_STRONY[id];
  return !o || o.wCenie.includes(rodzaj) ? 0 : o.cena(baza);
}
