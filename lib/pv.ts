/** Nr 71: orientacyjna opłacalność fotowoltaiki z magazynem energii. Założenia są jawne i pokazywane klientowi pod wynikiem. */

export const UZYSK_KWH_NA_KWP = 1000;
export const AUTOKONSUMPCJA_BEZ_MAGAZYNU = 0.3;
export const SPRAWNOSC_MAGAZYNU = 0.9;
export const DNI_CYKLU = 250;
export const CENA_NADWYZKI = 0.4;

export type WejsciePv = {
  zuzycie: number;
  mocKwp: number;
  magazynKwh: number;
  cenaPradu: number;
  cenaKwp: number;
  cenaKwh: number;
};

export type WynikPv = {
  produkcja: number;
  autoBez: number;
  autoZ: number;
  oszczednoscBez: number;
  oszczednoscZ: number;
  kosztBez: number;
  kosztZ: number;
  zwrotBez: number | null;
  zwrotZ: number | null;
  zwrotMagazynu: number | null;
};

const zwrot = (koszt: number, rocznie: number) => (rocznie > 0 && koszt > 0 ? koszt / rocznie : null);

export function pv(w: WejsciePv): WynikPv {
  const produkcja = w.mocKwp * UZYSK_KWH_NA_KWP;
  const autoBez = Math.min(produkcja * AUTOKONSUMPCJA_BEZ_MAGAZYNU, w.zuzycie);
  const nadwyzka = produkcja - autoBez;
  const zMagazynu = Math.min(w.magazynKwh * SPRAWNOSC_MAGAZYNU * DNI_CYKLU, nadwyzka, Math.max(w.zuzycie - autoBez, 0));
  const autoZ = autoBez + zMagazynu;
  const oszczednosc = (auto: number) => auto * w.cenaPradu + (produkcja - auto) * CENA_NADWYZKI;
  const oszczednoscBez = oszczednosc(autoBez);
  const oszczednoscZ = oszczednosc(autoZ);
  const kosztBez = w.mocKwp * w.cenaKwp;
  const kosztMagazynu = w.magazynKwh * w.cenaKwh;
  return {
    produkcja,
    autoBez,
    autoZ,
    oszczednoscBez,
    oszczednoscZ,
    kosztBez,
    kosztZ: kosztBez + kosztMagazynu,
    zwrotBez: zwrot(kosztBez, oszczednoscBez),
    zwrotZ: zwrot(kosztBez + kosztMagazynu, oszczednoscZ),
    zwrotMagazynu: zwrot(kosztMagazynu, oszczednoscZ - oszczednoscBez),
  };
}
