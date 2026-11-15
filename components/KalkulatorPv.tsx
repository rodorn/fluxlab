"use client";

import { useMemo, useState } from "react";

import { AUTOKONSUMPCJA_BEZ_MAGAZYNU, CENA_NADWYZKI, DNI_CYKLU, SPRAWNOSC_MAGAZYNU, UZYSK_KWH_NA_KWP, pv } from "@/lib/pv";

type Props = { nazwa: string; kontakt?: string; cenaKwp: number; cenaKwh: number; demo?: boolean };

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
const lat = (n: number | null) => (n === null ? "brak zwrotu" : `${n.toFixed(1).replace(".", ",")} roku`);
const proc = (n: number) => String(n).replace(".", ",");

export default function KalkulatorPv({ nazwa, kontakt, cenaKwp, cenaKwh, demo }: Props) {
  const [zuzycie, setZuzyciePradu] = useState(4000);
  const [moc, setMoc] = useState(6);
  const [mag, setMag] = useState(10);
  const [cena, setCena] = useState(1.1);

  const w = useMemo(() => pv({ zuzycie, mocKwp: moc, magazynKwh: mag, cenaPradu: cena, cenaKwp, cenaKwh }), [zuzycie, moc, mag, cena, cenaKwp, cenaKwh]);
  const link = kontakt
    ? kontakt.includes("@")
      ? `mailto:${kontakt}?subject=${encodeURIComponent(`Zapytanie o fotowoltaikę: ${moc} kWp, magazyn ${mag} kWh`)}`
      : `tel:${kontakt.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <div className="kp">
      <style>{CSS}</style>
      <h1>Fotowoltaika z magazynem energii: {nazwa}</h1>
      <label>
        Roczne zużycie prądu: <b>{zuzycie.toLocaleString("pl-PL")} kWh</b>
        <input type="range" min={1500} max={15000} step={250} value={zuzycie} onChange={(e) => setZuzyciePradu(+e.target.value)} />
      </label>
      <label>
        Moc instalacji: <b>{proc(moc)} kWp</b>
        <input type="range" min={2} max={20} step={0.5} value={moc} onChange={(e) => setMoc(+e.target.value)} />
      </label>
      <label>
        Magazyn energii: <b>{mag === 0 ? "bez magazynu" : `${mag} kWh`}</b>
        <input type="range" min={0} max={30} step={2.5} value={mag} onChange={(e) => setMag(+e.target.value)} />
      </label>
      <label>
        Cena prądu z sieci: <b>{proc(cena)} zł/kWh</b>
        <input type="range" min={0.6} max={1.6} step={0.05} value={cena} onChange={(e) => setCena(+e.target.value)} />
      </label>
      <div className="wynik" aria-live="polite">
        <span>Oszczędność rocznie z magazynem</span>
        <strong>{zl(w.oszczednoscZ)}</strong>
        <small>
          Bez magazynu {zl(w.oszczednoscBez)}. Koszt instalacji z magazynem około {zl(w.kosztZ)}, zwrot po {lat(w.zwrotZ)}. Sam magazyn zwraca się po {mag === 0 ? "-" : lat(w.zwrotMagazynu)}.
        </small>
      </div>
      {link && !demo && (
        <a className="cta" href={link}>
          Poproś o wycenę
        </a>
      )}
      <p className="uwaga">
        Wyliczenie orientacyjne, nie jest ofertą. Założenia: uzysk {UZYSK_KWH_NA_KWP} kWh z 1 kWp rocznie, bez magazynu zużywamy na bieżąco {Math.round(AUTOKONSUMPCJA_BEZ_MAGAZYNU * 100)}% produkcji,
        magazyn pracuje {DNI_CYKLU} dni w roku ze sprawnością {Math.round(SPRAWNOSC_MAGAZYNU * 100)}%, nadwyżka sprzedana po {proc(CENA_NADWYZKI)} zł/kWh. Ceny instalacji: {zl(cenaKwp)} za kWp
        i {zl(cenaKwh)} za kWh magazynu. Rzeczywisty wynik zależy od dachu, profilu zużycia i taryfy.
        {demo ? " Wersja demonstracyjna." : ""}
      </p>
    </div>
  );
}

const CSS = `
.kp{max-width:480px;margin:0 auto;padding:16px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827}
.kp h1{font-size:18px;margin:0 0 12px}
.kp label{display:block;font-size:14px;margin:0 0 14px}
.kp input[type=range]{width:100%;margin-top:8px}
.kp .wynik{background:#f3f4f6;border-radius:14px;padding:16px;margin:6px 0 14px}
.kp .wynik span{display:block;font-size:13px;color:#4b5563}
.kp .wynik strong{display:block;font-size:30px;margin:2px 0 6px}
.kp .wynik small{display:block;font-size:12px;line-height:1.45;color:#4b5563}
.kp .cta{display:block;text-align:center;background:#0b57d0;color:#fff;text-decoration:none;padding:13px;border-radius:10px;font-size:16px;font-weight:600}
.kp .uwaga{font-size:11px;line-height:1.45;color:#6b7280;margin:12px 0 0}
`;
