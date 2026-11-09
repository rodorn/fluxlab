import r2026 from "./reguly/2026.json";
import r2027 from "./reguly/2027.json";

export type Rok = 2026 | 2027;
export type WariantSkali = "obowiazujace" | "druk3293";

export type Pozycja<T = number> = {
  v: T;
  zrodlo: string;
  akt: string;
  stan: string;
  szacunek?: boolean;
  uwagi?: string;
};

export type StawkaRyczaltu = { stawka: number; przyklady: string };

export type Stawki = {
  rok: Rok;
  wygenerowano: string;
  minimalne: Pozycja;
  przecietne: Pozycja;
  przecietneQ4: Pozycja;
  emerytalna: Pozycja;
  rentowa: Pozycja;
  chorobowa: Pozycja;
  wypadkowa: Pozycja;
  funduszPracy: Pozycja;
  zdrowotnaSkala: Pozycja;
  zdrowotnaLiniowy: Pozycja;
  zdrowotnaRyczalt: Pozycja;
  minPodstawaZdrowotnej: Pozycja;
  limitOdliczeniaZdrowotnejLiniowy: Pozycja;
  odliczenieZdrowotnejRyczalt: Pozycja;
  kwotaWolna: Pozycja;
  kwotaZmniejszajaca: Pozycja;
  progSkali: Pozycja;
  stawka1: Pozycja;
  stawka2: Pozycja;
  liniowy: Pozycja;
  daninaProg: Pozycja;
  danina: Pozycja;
  ryczaltStawki: Pozycja<StawkaRyczaltu[]>;
  malyZusPlusLimitPrzychodu: Pozycja;
  kosztyUzyskaniaPracownik: Pozycja;
  kosztyUzyskaniaPracownikZamiejscowy: Pozycja;
  pracownikEmerytalna: Pozycja;
  pracownikRentowa: Pozycja;
  pracownikChorobowa: Pozycja;
};

export type Druk3293 = {
  progSkali: number;
  prog2: number;
  stawka2: number;
  stawka3: number;
  danina: number;
  limitRyczaltuEUR: number;
  status: string;
  zrodlo: string;
};

const REGULY = { 2026: r2026, 2027: r2027 } as unknown as Record<
  Rok,
  Stawki & { _warianty_3293?: Druk3293 | null }
>;

export const LATA: Rok[] = [2026, 2027];

export function stawki(rok: Rok): Stawki {
  return REGULY[rok];
}

export function druk3293(rok: Rok): Druk3293 | null {
  return REGULY[rok]._warianty_3293 ?? null;
}

export type Prog = { do: number | null; stawka: number };

export function progiSkali(
  rok: Rok,
  wariant: WariantSkali = "obowiazujace",
): Prog[] {
  const s = stawki(rok);
  const d = wariant === "druk3293" ? druk3293(rok) : null;
  if (d)
    return [
      { do: d.progSkali, stawka: s.stawka1.v },
      { do: d.prog2, stawka: d.stawka2 },
      { do: null, stawka: d.stawka3 },
    ];
  return [
    { do: s.progSkali.v, stawka: s.stawka1.v },
    { do: null, stawka: s.stawka2.v },
  ];
}

export function stawkaDaniny(
  rok: Rok,
  wariant: WariantSkali = "obowiazujace",
): number {
  const d = wariant === "druk3293" ? druk3293(rok) : null;
  return d ? d.danina : stawki(rok).danina.v;
}
