"use client";

import { useMemo, useState } from "react";

import { rataKredytu, rataLeasingu } from "@/lib/rata";

type Props = { nazwa: string; kontakt?: string; oprocKredyt: number; oprocLeasing: number; demo?: boolean };

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
const OKRESY = [12, 24, 36, 48, 60, 72, 84];

export default function KalkulatorRaty({ nazwa, kontakt, oprocKredyt, oprocLeasing, demo }: Props) {
  const [tryb, setTryb] = useState<"kredyt" | "leasing">("kredyt");
  const [cena, setCena] = useState(60000);
  const [wplata, setWplata] = useState(10);
  const [okres, setOkres] = useState(48);
  const [wykup, setWykup] = useState(20);

  const w = useMemo(
    () =>
      tryb === "kredyt"
        ? rataKredytu(cena, wplata, oprocKredyt, okres)
        : rataLeasingu(cena, wplata, wykup, oprocLeasing, okres),
    [tryb, cena, wplata, wykup, okres, oprocKredyt, oprocLeasing],
  );
  const op = tryb === "kredyt" ? oprocKredyt : oprocLeasing;
  const link = kontakt
    ? kontakt.includes("@")
      ? `mailto:${kontakt}?subject=${encodeURIComponent("Zapytanie o ratę: auto za " + zl(cena))}`
      : `tel:${kontakt.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <div className="kr">
      <style>{CSS}</style>
      <h1>Policz ratę: {nazwa}</h1>
      <div className="tryby" role="tablist">
        {(["kredyt", "leasing"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tryb === t} className={tryb === t ? "on" : ""} onClick={() => setTryb(t)}>
            {t === "kredyt" ? "Kredyt" : "Leasing (netto)"}
          </button>
        ))}
      </div>
      <label>
        {tryb === "kredyt" ? "Cena auta" : "Cena auta netto"}: <b>{zl(cena)}</b>
        <input type="range" min={5000} max={400000} step={1000} value={cena} onChange={(e) => setCena(+e.target.value)} />
      </label>
      <label>
        {tryb === "kredyt" ? "Wpłata własna" : "Opłata wstępna"}: <b>{wplata}%</b> ({zl((cena * wplata) / 100)})
        <input type="range" min={0} max={50} step={1} value={wplata} onChange={(e) => setWplata(+e.target.value)} />
      </label>
      {tryb === "leasing" && (
        <label>
          Wykup: <b>{wykup}%</b> ({zl((cena * wykup) / 100)})
          <input type="range" min={1} max={40} step={1} value={wykup} onChange={(e) => setWykup(+e.target.value)} />
        </label>
      )}
      <label>
        Okres
        <select value={okres} onChange={(e) => setOkres(+e.target.value)}>
          {OKRESY.map((o) => (
            <option key={o} value={o}>
              {o} mies.
            </option>
          ))}
        </select>
      </label>
      <div className="wynik" aria-live="polite">
        <span>Rata miesięcznie{tryb === "leasing" ? " netto" : ""}</span>
        <strong>{zl(w.rata)}</strong>
        <small>
          Razem do zapłaty {zl(w.razem)}, w tym koszt finansowania {zl(Math.max(w.odsetki, 0))}. Oprocentowanie w wyliczeniu: {String(op).replace(".", ",")}% rocznie.
        </small>
      </div>
      {link && !demo && (
        <a className="cta" href={link}>
          Zapytaj o ofertę
        </a>
      )}
      <p className="uwaga">
        Wyliczenie orientacyjne, nie jest ofertą kredytu ani leasingu. Prowizje, ubezpieczenie i opłaty mogą zmienić ratę. Warunki ustala finansujący po sprawdzeniu zdolności.
        {demo ? " Wersja demonstracyjna." : ""}
      </p>
    </div>
  );
}

const CSS = `
.kr{max-width:480px;margin:0 auto;padding:16px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827}
.kr h1{font-size:18px;margin:0 0 12px}
.kr .tryby{display:flex;gap:8px;margin-bottom:14px}
.kr .tryby button{flex:1;padding:10px;border:1px solid #d1d5db;border-radius:10px;background:#fff;font-size:15px;cursor:pointer}
.kr .tryby button.on{background:#0b57d0;color:#fff;border-color:#0b57d0}
.kr label{display:block;font-size:14px;margin:0 0 14px}
.kr input[type=range]{width:100%;margin-top:8px}
.kr select{display:block;width:100%;margin-top:6px;padding:10px;font-size:16px;border:1px solid #d1d5db;border-radius:10px;background:#fff}
.kr .wynik{background:#f3f4f6;border-radius:14px;padding:16px;margin:6px 0 14px}
.kr .wynik span{display:block;font-size:13px;color:#4b5563}
.kr .wynik strong{display:block;font-size:34px;margin:2px 0 6px}
.kr .wynik small{display:block;font-size:12px;line-height:1.45;color:#4b5563}
.kr .cta{display:block;text-align:center;background:#0b57d0;color:#fff;text-decoration:none;padding:13px;border-radius:10px;font-size:16px;font-weight:600}
.kr .uwaga{font-size:11px;line-height:1.45;color:#6b7280;margin:12px 0 0}
`;
