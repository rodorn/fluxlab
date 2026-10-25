/** Moduły AI do FluxCRM, wspólne dla konfiguratora /wlasny-crm i wyceny PDF.
 *  W wariancie „Z narzędziami AI” są w cenie wdrożenia i abonamentu. */

export type ModulCrm = {
  id: string;
  nazwa: string;
  skrot: string;
  opis: string;
  cena: number;
  miesiecznie: number;
};

export const MODULY_CRM: ModulCrm[] = [
  {
    id: "ocena",
    nazwa: "Ocena handlowców przez AI",
    skrot: "ocena handlowców",
    opis: "Model czyta notatki, SMS-y, maile i rozmowy, zestawia je z wiedzą firmy i ocenia pracę każdej osoby.",
    cena: 3900,
    miesiecznie: 199,
  },
  {
    id: "drafty",
    nazwa: "Szkice maili i SMS-ów przez AI",
    skrot: "szkice wiadomości",
    opis: "Gotowa odpowiedź dopasowana do klienta i etapu sprzedaży. Handlowiec poprawia i wysyła.",
    cena: 1900,
    miesiecznie: 99,
  },
];

export const modulyPlatne = (wariant: string, ids: string[]) =>
  wariant === "ai" ? [] : MODULY_CRM.filter((m) => ids.includes(m.id));
