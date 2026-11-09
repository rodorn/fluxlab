"use client";

import { useMemo, useState } from "react";
import {
  druk3293,
  LATA,
  stawki,
  type Rok,
  type WariantSkali,
} from "@/lib/podatki/stawki";
import { liczJdg, type WynikJdg } from "@/lib/podatki/pit";
import type { Forma, Wariant } from "@/lib/podatki/zus";

const pole =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

const zl = (v: number) => Math.round(v).toLocaleString("pl-PL") + " zł";

const liczba = (s: string) => {
  const v = parseFloat(s.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : 0;
};

const FORMY: { v: Forma; nazwa: string }[] = [
  { v: "skala", nazwa: "Skala" },
  { v: "liniowy", nazwa: "Liniowy" },
  { v: "ryczalt", nazwa: "Ryczałt" },
];

const WARIANTY: { v: Wariant; nazwa: string }[] = [
  { v: "ulga-na-start", nazwa: "Ulga na start" },
  { v: "preferencyjny", nazwa: "Preferencyjny" },
  { v: "maly-zus-plus", nazwa: "Mały ZUS Plus" },
  { v: "duzy", nazwa: "Duży" },
];

function Roznica({ v }: { v: number }) {
  const r = Math.round(v);
  if (r === 0) return <span className="text-gray-400">bez zmian</span>;
  return (
    <span
      className={
        r > 0
          ? "text-emerald-700 dark:text-emerald-400"
          : "text-red-700 dark:text-red-400"
      }
    >
      {r > 0 ? "+" : "−"}
      {zl(Math.abs(r))}
    </span>
  );
}

export default function PorownanieForm() {
  const [przychod, setPrzychod] = useState("180000");
  const [koszty, setKoszty] = useState("30000");
  const [stawkaRyczaltu, setStawkaRyczaltu] = useState(12);
  const [wariant, setWariant] = useState<Wariant>("duzy");
  const [chorobowa, setChorobowa] = useState(false);
  const [dochodPoprzedni, setDochodPoprzedni] = useState("48000");
  const [skala2027, setSkala2027] = useState<WariantSkali>("obowiazujace");

  const druk = druk3293(2027);

  const wyniki = useMemo(() => {
    const licz = (rok: Rok, forma: Forma): WynikJdg =>
      liczJdg({
        rok,
        forma,
        przychodRoczny: liczba(przychod),
        kosztyRoczne: liczba(koszty),
        stawkaRyczaltu,
        wariant,
        chorobowa: wariant === "ulga-na-start" ? false : chorobowa,
        dochodPoprzedni: liczba(dochodPoprzedni),
        dniPoprzedni: 365,
        wspolneZMalzonkiem: false,
        dochodMalzonka: 0,
        skala: rok === 2027 && druk ? skala2027 : "obowiazujace",
      });
    return FORMY.map((f) => ({
      ...f,
      lata: LATA.map((rok) => ({ rok, w: licz(rok, f.v) })),
    }));
  }, [
    przychod,
    koszty,
    stawkaRyczaltu,
    wariant,
    chorobowa,
    dochodPoprzedni,
    skala2027,
    druk,
  ]);

  const najlepsza = (rok: Rok) =>
    wyniki.reduce((a, b) =>
      b.lata.find((l) => l.rok === rok)!.w.naReke >
      a.lata.find((l) => l.rok === rok)!.w.naReke
        ? b
        : a,
    ).v;
  const best = { 2026: najlepsza(2026), 2027: najlepsza(2027) } as Record<
    Rok,
    Forma
  >;

  const s = stawki(2026);

  return (
    <div className="max-w-5xl mx-auto">
      <form
        className="grid gap-5 md:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Przychód roczny
          <input
            className={`${pole} mt-1`}
            inputMode="decimal"
            value={przychod}
            onChange={(e) => setPrzychod(e.target.value)}
          />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Koszty roczne
          <input
            className={`${pole} mt-1`}
            inputMode="decimal"
            value={koszty}
            onChange={(e) => setKoszty(e.target.value)}
          />
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Stawka ryczałtu
          <select
            className={`${pole} mt-1`}
            value={stawkaRyczaltu}
            onChange={(e) => setStawkaRyczaltu(Number(e.target.value))}
          >
            {s.ryczaltStawki.v.map((r) => (
              <option key={r.stawka} value={Math.round(r.stawka * 1000) / 10}>
                {(r.stawka * 100).toLocaleString("pl-PL")}%: {r.przyklady}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-gray-700 dark:text-gray-300">
          Składki ZUS
          <select
            className={`${pole} mt-1`}
            value={wariant}
            onChange={(e) => setWariant(e.target.value as Wariant)}
          >
            {WARIANTY.map((o) => (
              <option key={o.v} value={o.v}>
                {o.nazwa}
              </option>
            ))}
          </select>
        </label>
        {wariant === "maly-zus-plus" && (
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Dochód z poprzedniego roku
            <input
              className={`${pole} mt-1`}
              inputMode="decimal"
              value={dochodPoprzedni}
              onChange={(e) => setDochodPoprzedni(e.target.value)}
            />
          </label>
        )}
        {wariant !== "ulga-na-start" && (
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 md:mt-6">
            <input
              type="checkbox"
              checked={chorobowa}
              onChange={(e) => setChorobowa(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Dobrowolna składka chorobowa
          </label>
        )}
        {druk && (
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Skala w 2027 roku
            <select
              className={`${pole} mt-1`}
              value={skala2027}
              onChange={(e) => setSkala2027(e.target.value as WariantSkali)}
            >
              <option value="obowiazujace">Obecne przepisy</option>
              <option value="druk3293">Uchwalona zmiana (druk nr 3293)</option>
            </select>
          </label>
        )}
      </form>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {wyniki.map((f) => {
          const [a, b] = f.lata;
          return (
            <div
              key={f.v}
              className={`rounded-2xl border p-5 ${
                best[2026] === f.v || best[2027] === f.v
                  ? "border-accent"
                  : "border-gray-200/80 dark:border-gray-800/80"
              } bg-gray-50/60 dark:bg-gray-900/40`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {f.nazwa}
                </h3>
                {best[2026] === f.v && best[2027] === f.v ? (
                  <span className="text-xs font-semibold text-accent">
                    najwięcej na rękę
                  </span>
                ) : best[2026] === f.v ? (
                  <span className="text-xs font-semibold text-accent">
                    najlepsza w 2026
                  </span>
                ) : best[2027] === f.v ? (
                  <span className="text-xs font-semibold text-accent">
                    najlepsza w 2027
                  </span>
                ) : null}
              </div>
              <table className="mt-4 w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400">
                    <th className="pb-2 text-left font-normal"></th>
                    <th className="pb-2 text-right font-normal">2026</th>
                    <th className="pb-2 text-right font-normal">2027</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {(
                    [
                      ["Społeczne", "spoleczne"],
                      ["Zdrowotna", "zdrowotna"],
                      ["Podatek", "podatek"],
                      ["Danina", "danina"],
                    ] as const
                  )
                    .filter(
                      ([, k]) => k !== "danina" || a.w.danina + b.w.danina > 0,
                    )
                    .map(([nazwa, k]) => (
                      <tr key={k}>
                        <td className="py-2 text-gray-700 dark:text-gray-300">
                          {nazwa}
                        </td>
                        <td className="py-2 text-right text-gray-900 dark:text-white whitespace-nowrap">
                          {zl(a.w[k])}
                        </td>
                        <td className="py-2 text-right text-gray-900 dark:text-white whitespace-nowrap">
                          {zl(b.w[k])}
                        </td>
                      </tr>
                    ))}
                  <tr className="font-semibold">
                    <td className="py-2 text-gray-900 dark:text-white">
                      Na rękę
                    </td>
                    <td className="py-2 text-right text-gray-900 dark:text-white whitespace-nowrap">
                      {zl(a.w.naReke)}
                    </td>
                    <td className="py-2 text-right text-gray-900 dark:text-white whitespace-nowrap">
                      {zl(b.w.naReke)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 dark:text-gray-400">
                      Miesięcznie
                    </td>
                    <td className="py-2 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {zl(a.w.naRekeMies)}
                    </td>
                    <td className="py-2 text-right text-gray-600 dark:text-gray-300 whitespace-nowrap">
                      {zl(b.w.naRekeMies)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                2027 wobec 2026: <Roznica v={b.w.naReke - a.w.naReke} /> rocznie
              </p>
              {b.w.zdrowotnaSzacunek && (
                <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                  Zdrowotna 2027 to szacunek.
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-10">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Skąd te liczby</h3>
        <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-400">
          {LATA.flatMap((rok) => {
            const st = stawki(rok);
            return (
              [
                ["Minimalne wynagrodzenie", st.minimalne],
                ["Prognozowane przeciętne wynagrodzenie", st.przecietne],
                ["Przeciętne wynagrodzenie w IV kwartale", st.przecietneQ4],
                ["Skala podatkowa", st.kwotaZmniejszajaca],
                ["Podatek liniowy", st.liniowy],
                ["Odliczenie zdrowotnej na liniowym", st.limitOdliczeniaZdrowotnejLiniowy],
              ] as const
            ).map(([nazwa, p]) => (
              <li key={`${rok}-${nazwa}`}>
                {rok}, {nazwa.toLowerCase()}:{" "}
                <a href={p.zrodlo} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {p.akt}
                </a>
                , stan na {p.stan.split("-").reverse().join(".")}
                {p.szacunek && <span className="ml-1 text-amber-700 dark:text-amber-400">(szacunek)</span>}
              </li>
            ));
          })}
          {druk && (
            <li>
              2027, zmiana skali:{" "}
              <a href="https://www.sejm.gov.pl/Sejm10.nsf/PrzebiegProc.xsp?nr=3293" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                druk nr 3293, przebieg procesu w Sejmie
              </a>
              , {druk.status}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
