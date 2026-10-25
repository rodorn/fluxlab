/** Warianty i moduły AI do FluxCRM, wspólne dla konfiguratora /wlasny-crm i wyceny PDF.
 *  Wdrożenie 1 zł, CRM zarabia na abonamencie (Paweł 25.10.2026). Narzędzia AI
 *  to moduły dokładane do każdego wariantu, bez osobnego wariantu z AI. */

export type WariantCrm = "pilotaz" | "integracje";

export const WARIANTY_CRM: {
  id: WariantCrm;
  nazwa: string;
  opis: string;
  abonament: number;
}[] = [
  {
    id: "pilotaz",
    nazwa: "Gotowy CRM",
    opis: "lejek, leady z formularza i poczty",
    abonament: 499,
  },
  {
    id: "integracje",
    nazwa: "Z integracjami",
    opis: "integracje i automatyzacje, jakich potrzebujesz",
    abonament: 1490,
  },
];

export const W_ABONAMENCIE = 3;
export const OSOBA_DODATKOWA = 99;

export type ModulCrm = {
  id: string;
  nazwa: string;
  skrot: string;
  opis: string;
  miesiecznie: number;
};

export const MODULY_CRM: ModulCrm[] = [
  {
    id: "ocena",
    nazwa: "Ocena handlowców przez AI",
    skrot: "ocena handlowców",
    opis: "Model czyta notatki, SMS-y, maile i rozmowy, zestawia je z wiedzą firmy i ocenia pracę każdej osoby.",
    miesiecznie: 199,
  },
  {
    id: "drafty",
    nazwa: "Szkice maili i SMS-ów przez AI",
    skrot: "szkice wiadomości",
    opis: "Gotowa odpowiedź dopasowana do klienta i etapu sprzedaży. Handlowiec poprawia i wysyła.",
    miesiecznie: 99,
  },
];

export const modulyPlatne = (ids: string[]) =>
  MODULY_CRM.filter((m) => ids.includes(m.id));

export function abonamentCrm(
  wariant: WariantCrm,
  osoby: number,
  ids: string[],
) {
  const baza = WARIANTY_CRM.find((w) => w.id === wariant)!.abonament;
  const platne = modulyPlatne(ids);
  return {
    baza,
    platne,
    miesiecznie:
      baza +
      Math.max(0, osoby - W_ABONAMENCIE) * OSOBA_DODATKOWA +
      platne.reduce((s, m) => s + m.miesiecznie, 0),
  };
}
