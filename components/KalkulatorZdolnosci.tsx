"use client";

import { useMemo, useState } from "react";

import { BUFOR_PP, KOSZT_DOROSLY, KOSZT_DZIECKO, LIMIT_DSTI, zdolnosc } from "@/lib/zdolnosc";

type Props = { nazwa: string; kontakt?: string; oproc: number; demo?: boolean };

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")} zł`;
const zaokr = (n: number) => Math.floor(n / 1000) * 1000;

export default function KalkulatorZdolnosci({ nazwa, kontakt, oproc, demo }: Props) {
  const [dochod, setDochod] = useState(8000);
  const [dorosli, setDorosli] = useState(2);
  const [dzieci, setDzieci] = useState(1);
  const [zob, setZob] = useState(0);
  const [lata, setLata] = useState(25);

  const w = useMemo(() => zdolnosc({ dochod, dorosli, dzieci, zobowiazania: zob, oproc, lata }), [dochod, dorosli, dzieci, zob, oproc, lata]);
  const link = kontakt
    ? kontakt.includes("@")
      ? `mailto:${kontakt}?subject=${encodeURIComponent("Zapytanie o kredyt: ok. " + zl(zaokr(w.kredyt)))}`
      : `tel:${kontakt.replace(/[^\d+]/g, "")}`
    : null;

  return (
    <div className="kz">
      <style>{CSS}</style>
      <h1>Sprawdź zdolność kredytową: {nazwa}</h1>
      <label>
        Dochód netto miesięcznie (całego gospodarstwa): <b>{zl(dochod)}</b>
        <input type="range" min={2000} max={40000} step={250} value={dochod} onChange={(e) => setDochod(+e.target.value)} />
      </label>
      <div className="dwa">
        <label>
          Dorośli
          <select value={dorosli} onChange={(e) => setDorosli(+e.target.value)}>
            {[1, 2].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label>
          Dzieci
          <select value={dzieci} onChange={(e) => setDzieci(+e.target.value)}>
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Raty i limity już spłacane miesięcznie: <b>{zl(zob)}</b>
        <input type="range" min={0} max={8000} step={50} value={zob} onChange={(e) => setZob(+e.target.value)} />
      </label>
      <label>
        Okres kredytu
        <select value={lata} onChange={(e) => setLata(+e.target.value)}>
          {[10, 15, 20, 25, 30, 35].map((n) => (
            <option key={n} value={n}>
              {n} lat
            </option>
          ))}
        </select>
      </label>
      <div className="wynik" aria-live="polite">
        <span>Orientacyjna maksymalna kwota kredytu</span>
        <strong>{w.rata > 0 ? `do ${zl(zaokr(w.kredyt))}` : "brak zdolności"}</strong>
        <small>
          {w.rata > 0
            ? `Rata do ${zl(w.rata)} miesięcznie, oprocentowanie ${String(oproc).replace(".", ",")}% i bufor ${String(BUFOR_PP).replace(".", ",")} pp na wzrost stóp.`
            : "Przy podanych kwotach dochód nie wystarcza na ratę. Zmień dane albo skontaktuj się z doradcą."}
        </small>
      </div>
      {link && !demo && (
        <a className="cta" href={link}>
          Umów rozmowę z doradcą
        </a>
      )}
      <p className="uwaga">
        Wyliczenie orientacyjne, nie jest decyzją kredytową ani ofertą. Założenia: koszty życia {zl(KOSZT_DOROSLY)} na dorosłego i {zl(KOSZT_DZIECKO)} na dziecko, rata do {Math.round(LIMIT_DSTI * 100)}% dochodu
        minus spłacane zobowiązania, równa rata. Banki liczą po swojemu, a wynik zależy też od historii kredytowej i rodzaju umowy.
        {demo ? " Wersja demonstracyjna." : ""}
      </p>
    </div>
  );
}

const CSS = `
.kz{max-width:480px;margin:0 auto;padding:16px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827}
.kz h1{font-size:18px;margin:0 0 12px}
.kz label{display:block;font-size:14px;margin:0 0 14px}
.kz .dwa{display:flex;gap:12px}
.kz .dwa label{flex:1}
.kz input[type=range]{width:100%;margin-top:8px}
.kz select{display:block;width:100%;margin-top:6px;padding:10px;font-size:16px;border:1px solid #d1d5db;border-radius:10px;background:#fff}
.kz .wynik{background:#f3f4f6;border-radius:14px;padding:16px;margin:6px 0 14px}
.kz .wynik span{display:block;font-size:13px;color:#4b5563}
.kz .wynik strong{display:block;font-size:30px;margin:2px 0 6px}
.kz .wynik small{display:block;font-size:12px;line-height:1.45;color:#4b5563}
.kz .cta{display:block;text-align:center;background:#0b57d0;color:#fff;text-decoration:none;padding:13px;border-radius:10px;font-size:16px;font-weight:600}
.kz .uwaga{font-size:11px;line-height:1.45;color:#6b7280;margin:12px 0 0}
`;
