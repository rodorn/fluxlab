/** Nr 74: kalkulacje raty dla komisu. Wzory z równą ratą (annuitetą), kwoty orientacyjne. */

export type WynikRaty = { rata: number; razem: number; odsetki: number; kwota: number; wykup?: number };

const miesieczna = (rocznaProc: number) => rocznaProc / 100 / 12;

export function rataKredytu(cena: number, wplataProc: number, rocznaProc: number, miesiecy: number): WynikRaty {
  const kwota = Math.max(cena * (1 - wplataProc / 100), 0);
  const r = miesieczna(rocznaProc);
  const rata = r === 0 ? kwota / miesiecy : (kwota * r) / (1 - Math.pow(1 + r, -miesiecy));
  const razem = rata * miesiecy;
  return { rata, razem, odsetki: razem - kwota, kwota };
}

/** Leasing: kwoty netto. Opłata wstępna i wykup w % wartości netto auta. */
export function rataLeasingu(cenaNetto: number, wstepnaProc: number, wykupProc: number, rocznaProc: number, miesiecy: number): WynikRaty {
  const kwota = cenaNetto * (1 - wstepnaProc / 100);
  const wykup = cenaNetto * (wykupProc / 100);
  const r = miesieczna(rocznaProc);
  const rata =
    r === 0
      ? (kwota - wykup) / miesiecy
      : ((kwota - wykup * Math.pow(1 + r, -miesiecy)) * r) / (1 - Math.pow(1 + r, -miesiecy));
  const razem = rata * miesiecy + wykup + cenaNetto * (wstepnaProc / 100);
  return { rata, razem, odsetki: razem - cenaNetto, kwota, wykup };
}
