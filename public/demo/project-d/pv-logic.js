/*
 * FluxLab - logika kalkulatora oszczednosci PV + pompa ciepla / EV.
 * Czysta matematyka, bez DOM. Dziala w przegladarce (window.PVLogic)
 * i w Node (module.exports) do testow.
 *
 * Model ceny energii z sieci (zl/kWh brutto):
 *   cena_brutto = (cena_energii + oplata_dystrybucyjna_zmienna + akcyza) * (1 + VAT)
 * Akcyza na energie elektryczna: 0.005 zl/kWh (5 zl/MWh) - domyslnie.
 * VAT na energie: 23% (0.23) - domyslnie.
 *
 * Wszystkie parametry sa nadpisywalne przez konfiguracje (parametryzowane).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PVLogic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var DEFAULTS = {
    cenaEnergii: 0.62, // zl/kWh netto (komponent energii czynnej)
    oplataDystrybucyjnaZmienna: 0.38, // zl/kWh netto (dystrybucja zmienna)
    akcyza: 0.005, // zl/kWh
    vat: 0.23, // 23%
    autokonsumpcja: 0.3, // udzial energii z PV zuzyty na biezaco (0-1)
    wspInstalacji: 1000, // kWh rocznie na 1 kWp (uzysk PV w PL, srednio)
    cenaZaKwp: 4200, // zl brutto za 1 kWp instalacji
    // Net-billing (od 2022): nadwyzka rozliczana wg ceny rynkowej.
    // Uproszczenie: energia oddana do sieci warta jest depozytStawka * cena_brutto.
    depozytStawka: 0.5, // 50% wartosci detalicznej za oddana nadwyzke
    // Magazyn energii. ZALOZENIA PRZYKLADOWE, nie dane rynkowe: kazda firma
    // podmienia je w konfiguracji na wlasny cennik i parametry oferowanego magazynu.
    cenaZaKWhMagazynu: 2500, // zl brutto za 1 kWh pojemnosci magazynu (zalozenie)
    cykleMagazynuRocznie: 250, // pelne cykle ladowania/rok wykorzystane w praktyce (zalozenie)
    sprawnoscMagazynu: 0.9, // sprawnosc ladowania + rozladowania (zalozenie)
  };

  // Cena brutto 1 kWh pobranej z sieci.
  function cenaBruttoKWh(p) {
    var netto = p.cenaEnergii + p.oplataDystrybucyjnaZmienna + p.akcyza;
    return netto * (1 + p.vat);
  }

  // Zaokraglenie do 2 miejsc.
  function r2(x) {
    return Math.round(x * 100) / 100;
  }

  /*
   * Wejscie (values):
   *   zuzycieRoczne: kWh/rok (obecne zapotrzebowanie z sieci)
   *   mocPV: kWp (planowana moc instalacji)
   *   dodatkoweZuzyciePompa: kWh/rok (0 jesli brak)
   *   dodatkoweZuzycieEV: kWh/rok (0 jesli brak)
   *   koszic ... parametry cenowe opcjonalne (nadpisuja DEFAULTS)
   */
  function oblicz(values, params) {
    var p = Object.assign({}, DEFAULTS, params || {});
    var v = values || {};

    var zuzycieBazowe = Number(v.zuzycieRoczne) || 0;
    var mocPV = Number(v.mocPV) || 0;
    var pompa = Number(v.dodatkoweZuzyciePompa) || 0;
    var ev = Number(v.dodatkoweZuzycieEV) || 0;

    var zuzycieCalkowite = zuzycieBazowe + pompa + ev;
    var cenaBrutto = cenaBruttoKWh(p);

    // Koszt bez PV (caly prad z sieci).
    var kosztBezPV = zuzycieCalkowite * cenaBrutto;

    // Produkcja PV.
    var produkcjaPV = mocPV * p.wspInstalacji;

    // Autokonsumpcja: czesc produkcji zuzyta na biezaco (unikamy pelnej ceny).
    var zuzytaBezposrednio = Math.min(
      produkcjaPV * p.autokonsumpcja,
      zuzycieCalkowite,
    );

    // Koszt roczny z PV przy danej energii zuzytej na biezaco i nadwyzce.
    function kosztRocznyZPV(zuzyta, nadwyzkaKWh) {
      // Nadwyzka oddana do sieci (net-billing, wartosc obnizona depozytStawka).
      var oszczednoscZNadwyzki = nadwyzkaKWh * cenaBrutto * p.depozytStawka;
      // Energia nadal kupowana z sieci po odjeciu autokonsumpcji i pokrycia z depozytu.
      var brakujace = Math.max(zuzycieCalkowite - zuzyta, 0);
      // Depozyt (z nadwyzki) pokrywa czesc brakujacej energii, ale nie wiecej niz brakuje.
      // Depozyt rozlicza tylko oplate za energie czynna, bez dystrybucji (gdy podano cenaEnergiiDepozyt).
      var cenaDoPokrycia = p.cenaEnergiiDepozyt || cenaBrutto;
      var pokrycie = Math.min(oszczednoscZNadwyzki, brakujace * cenaDoPokrycia);
      return Math.max(brakujace * cenaBrutto - pokrycie, 0);
    }

    var nadwyzka = Math.max(produkcjaPV - zuzytaBezposrednio, 0);
    var kosztZPV = kosztRocznyZPV(zuzytaBezposrednio, nadwyzka);

    var oszczednoscRoczna = kosztBezPV - kosztZPV;

    // Naklad inwestycyjny i zwrot.
    var kosztInstalacji = mocPV * p.cenaZaKwp;
    var okresZwrotu =
      oszczednoscRoczna > 0 ? kosztInstalacji / oszczednoscRoczna : null;
    var oszczednosc25lat = oszczednoscRoczna * 25 - kosztInstalacji;

    // Wariant z magazynem (tylko gdy klient zaznaczyl magazyn i podal pojemnosc > 0).
    // Magazyn ladowany nadwyzka PV oddaje energie wieczorem, wiec zastepuje zakup
    // z sieci po pelnej cenie zamiast oddawania nadwyzki po obnizonej stawce.
    var magazyn = null;
    var pojMag = Number(v.magazynPojemnosc) || 0;
    if (Number(v.magazyn) === 1 && pojMag > 0) {
      var uzytecznaZMagazynu = Math.min(
        pojMag * p.cykleMagazynuRocznie * p.sprawnoscMagazynu,
        nadwyzka * p.sprawnoscMagazynu,
        Math.max(zuzycieCalkowite - zuzytaBezposrednio, 0),
      );
      var zuzytaZMag = zuzytaBezposrednio + uzytecznaZMagazynu;
      var nadwyzkaZMag = Math.max(
        nadwyzka - uzytecznaZMagazynu / p.sprawnoscMagazynu,
        0,
      );
      var kosztZMag = kosztRocznyZPV(zuzytaZMag, nadwyzkaZMag);
      var oszczZMag = kosztBezPV - kosztZMag;
      var kosztInstZMag = kosztInstalacji + pojMag * p.cenaZaKWhMagazynu;
      magazyn = {
        pojemnoscKWh: pojMag,
        energiaZMagazynuKWh: Math.round(uzytecznaZMagazynu),
        kosztZPVIMagazynem: r2(kosztZMag),
        oszczednoscRoczna: r2(oszczZMag),
        oszczednoscMiesieczna: r2(oszczZMag / 12),
        dodatkowaOszczednoscRoczna: r2(oszczZMag - oszczednoscRoczna),
        kosztInstalacji: r2(kosztInstZMag),
        okresZwrotuLat: oszczZMag > 0 ? r2(kosztInstZMag / oszczZMag) : null,
      };
    }

    return {
      magazyn: magazyn,
      cenaBruttoKWh: r2(cenaBrutto),
      zuzycieCalkowite: Math.round(zuzycieCalkowite),
      produkcjaPV: Math.round(produkcjaPV),
      kosztBezPV: r2(kosztBezPV),
      kosztZPV: r2(kosztZPV),
      oszczednoscRoczna: r2(oszczednoscRoczna),
      oszczednoscMiesieczna: r2(oszczednoscRoczna / 12),
      kosztInstalacji: r2(kosztInstalacji),
      okresZwrotuLat: okresZwrotu === null ? null : r2(okresZwrotu),
      oszczednosc25lat: r2(oszczednosc25lat),
    };
  }

  return { oblicz: oblicz, cenaBruttoKWh: cenaBruttoKWh, DEFAULTS: DEFAULTS };
});
