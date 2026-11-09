"use client";

import { useMemo, useState } from "react";
import { LATA, stawki, type Pozycja, type Rok } from "@/lib/podatki/stawki";
import { liczZus, type Forma, type Wariant } from "@/lib/podatki/zus";

const WARIANTY: { v: Wariant; nazwa: string; opis: string }[] = [
  {
    v: "ulga-na-start",
    nazwa: "Ulga na start",
    opis: "pierwsze 6 miesięcy, tylko zdrowotna",
  },
  {
    v: "preferencyjny",
    nazwa: "Preferencyjny",
    opis: "kolejne 24 miesiące, 30% minimalnej",
  },
  {
    v: "maly-zus-plus",
    nazwa: "Mały ZUS Plus",
    opis: "podstawa z dochodu z poprzedniego roku",
  },
  { v: "duzy", nazwa: "Duży ZUS", opis: "60% prognozowanego przeciętnego" },
];

const FORMY: { v: Forma; nazwa: string }[] = [
  { v: "skala", nazwa: "Skala" },
  { v: "liniowy", nazwa: "Liniowy" },
  { v: "ryczalt", nazwa: "Ryczałt" },
];

const pole =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

const zl = (v: number) =>
  v.toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " zł";

const liczba = (s: string) => {
  const v = parseFloat(s.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : 0;
};

const procent = (v: number) =>
  (v * 100).toLocaleString("pl-PL", { maximumFractionDigits: 2 }) + "%";

function Wybor<T extends string | number>({
  etykieta,
  opcje,
  wartosc,
  zmien,
}: {
  etykieta: string;
  opcje: { v: T; nazwa: string }[];
  wartosc: T;
  zmien: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-900 dark:text-white">
        {etykieta}
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {opcje.map((o) => (
          <button
            key={String(o.v)}
            type="button"
            onClick={() => zmien(o.v)}
            aria-pressed={wartosc === o.v}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
              wartosc === o.v
                ? "border-accent bg-accent text-white"
                : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-accent"
            }`}
          >
            {o.nazwa}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function KalkulatorZus() {
  const [rok, setRok] = useState<Rok>(2026);
  const [wariant, setWariant] = useState<Wariant>("duzy");
  const [forma, setForma] = useState<Forma>("skala");
  const [chorobowa, setChorobowa] = useState(false);
  const [dochod, setDochod] = useState("10000");
  const [przychod, setPrzychod] = useState("100000");
  const [dochodPoprzedni, setDochodPoprzedni] = useState("48000");
  const [dniPoprzedni, setDniPoprzedni] = useState("365");

  const s = stawki(rok);
  const w = useMemo(
    () =>
      liczZus({
        rok,
        wariant,
        chorobowa: wariant === "ulga-na-start" ? false : chorobowa,
        forma,
        dochodMies:
          forma === "ryczalt" ? liczba(przychod) / 12 : liczba(dochod),
        przychodRoczny:
          forma === "ryczalt" ? liczba(przychod) : liczba(dochod) * 12,
        dochodPoprzedni: liczba(dochodPoprzedni),
        dniPoprzedni: liczba(dniPoprzedni),
      }),
    [
      rok,
      wariant,
      forma,
      chorobowa,
      dochod,
      przychod,
      dochodPoprzedni,
      dniPoprzedni,
    ],
  );

  const wiersze: { nazwa: string; kwota: number; stopa?: string }[] = [
    {
      nazwa: "Emerytalna",
      kwota: w.emerytalna,
      stopa: procent(s.emerytalna.v),
    },
    { nazwa: "Rentowa", kwota: w.rentowa, stopa: procent(s.rentowa.v) },
    { nazwa: "Chorobowa", kwota: w.chorobowa, stopa: procent(s.chorobowa.v) },
    { nazwa: "Wypadkowa", kwota: w.wypadkowa, stopa: procent(s.wypadkowa.v) },
    { nazwa: "Fundusz Pracy", kwota: w.fp, stopa: procent(s.funduszPracy.v) },
  ];

  const opisZdrowotnej =
    forma === "ryczalt"
      ? `${procent(s.zdrowotnaRyczalt.v)} od ${zl(w.podstawaZdrowotnej)}`
      : `${procent(forma === "skala" ? s.zdrowotnaSkala.v : s.zdrowotnaLiniowy.v)} od ${zl(w.podstawaZdrowotnej)}`;

  const zrodla: { nazwa: string; p: Pozycja }[] = [
    { nazwa: "Minimalne wynagrodzenie", p: s.minimalne },
    { nazwa: "Prognozowane przeciętne wynagrodzenie", p: s.przecietne },
    {
      nazwa: "Przeciętne wynagrodzenie w IV kwartale (ryczałt)",
      p: s.przecietneQ4,
    },
    { nazwa: "Stopy składek społecznych", p: s.emerytalna },
    { nazwa: "Składka zdrowotna na skali", p: s.zdrowotnaSkala },
    { nazwa: "Składka zdrowotna na liniowym", p: s.zdrowotnaLiniowy },
    { nazwa: "Składka zdrowotna na ryczałcie", p: s.zdrowotnaRyczalt },
    {
      nazwa: "Limit przychodu dla Małego ZUS Plus",
      p: s.malyZusPlusLimitPrzychodu,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Wybor
          etykieta="Rok"
          opcje={LATA.map((r) => ({ v: r, nazwa: String(r) }))}
          wartosc={rok}
          zmien={setRok}
        />

        <fieldset>
          <legend className="text-sm font-semibold text-gray-900 dark:text-white">
            Rodzaj składek
          </legend>
          <div className="mt-2 grid gap-2">
            {WARIANTY.map((o) => (
              <label
                key={o.v}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
                  wariant === o.v
                    ? "border-accent"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                <input
                  type="radio"
                  name="wariant"
                  checked={wariant === o.v}
                  onChange={() => setWariant(o.v)}
                  className="mt-1 accent-accent"
                />
                <span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {o.nazwa}
                  </span>
                  <span className="block text-gray-500 dark:text-gray-400">
                    {o.opis}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {wariant === "maly-zus-plus" && (
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Dochód z poprzedniego roku
              <input
                className={`${pole} mt-1`}
                inputMode="decimal"
                value={dochodPoprzedni}
                onChange={(e) => setDochodPoprzedni(e.target.value)}
              />
            </label>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Dni działalności w tamtym roku
              <input
                className={`${pole} mt-1`}
                inputMode="numeric"
                value={dniPoprzedni}
                onChange={(e) => setDniPoprzedni(e.target.value)}
              />
            </label>
            <p className="col-span-2 text-xs text-gray-500 dark:text-gray-400">
              Mały ZUS Plus przysługuje, gdy przychód z poprzedniego roku nie
              przekroczył {zl(s.malyZusPlusLimitPrzychodu.v)}.
            </p>
          </div>
        )}

        {wariant !== "ulga-na-start" && (
          <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={chorobowa}
              onChange={(e) => setChorobowa(e.target.checked)}
              className="h-4 w-4 accent-accent"
            />
            Płacę dobrowolną składkę chorobową
          </label>
        )}

        <Wybor
          etykieta="Forma opodatkowania"
          opcje={FORMY}
          wartosc={forma}
          zmien={setForma}
        />

        {forma === "ryczalt" ? (
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Przychód roczny
            <input
              className={`${pole} mt-1`}
              inputMode="decimal"
              value={przychod}
              onChange={(e) => setPrzychod(e.target.value)}
            />
          </label>
        ) : (
          <label className="block text-sm text-gray-700 dark:text-gray-300">
            Dochód miesięczny (przychód minus koszty)
            <input
              className={`${pole} mt-1`}
              inputMode="decimal"
              value={dochod}
              onChange={(e) => setDochod(e.target.value)}
            />
          </label>
        )}
      </form>

      <div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Do zapłaty co miesiąc
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
            {zl(w.razemMies)}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            rocznie {zl(w.razemRok)}
          </p>

          <table className="mt-6 w-full text-sm">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td
                  className="py-2 text-gray-500 dark:text-gray-400"
                  colSpan={2}
                >
                  Podstawa składek społecznych
                </td>
                <td className="py-2 text-right text-gray-900 dark:text-white">
                  {zl(w.podstawa)}
                </td>
              </tr>
              {wiersze.map((r) => (
                <tr key={r.nazwa}>
                  <td className="py-2 text-gray-700 dark:text-gray-300">
                    {r.nazwa}
                  </td>
                  <td className="py-2 text-right text-gray-400">{r.stopa}</td>
                  <td className="py-2 text-right text-gray-900 dark:text-white">
                    {zl(r.kwota)}
                  </td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2 text-gray-900 dark:text-white" colSpan={2}>
                  Społeczne razem
                </td>
                <td className="py-2 text-right text-gray-900 dark:text-white">
                  {zl(w.spoleczne)}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-700 dark:text-gray-300">
                  Zdrowotna
                </td>
                <td className="py-2 text-right text-gray-400 text-xs">
                  {opisZdrowotnej}
                </td>
                <td className="py-2 text-right text-gray-900 dark:text-white">
                  {zl(w.zdrowotna)}
                </td>
              </tr>
              <tr className="font-semibold">
                <td className="py-2 text-gray-900 dark:text-white" colSpan={2}>
                  Razem miesięcznie
                </td>
                <td className="py-2 text-right text-gray-900 dark:text-white">
                  {zl(w.razemMies)}
                </td>
              </tr>
            </tbody>
          </table>
          {w.zdrowotnaSzacunek && (
            <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
              Składka zdrowotna na ryczałcie w {rok} r. to szacunek: GUS poda
              przeciętne wynagrodzenie za IV kwartał w styczniu.
            </p>
          )}
          {forma !== "ryczalt" && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Zdrowotną na skali i liniowym liczymy od dochodu pomniejszonego o
              składki społeczne, nie mniej niż od{" "}
              {procent(s.minPodstawaZdrowotnej.v)} minimalnego wynagrodzenia.
            </p>
          )}
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Skąd te liczby ({rok})
        </h3>
        <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-gray-400">
          {zrodla.map(({ nazwa, p }) => (
            <li key={nazwa}>
              {nazwa}:{" "}
              <a
                href={p.zrodlo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {p.akt}
              </a>
              , stan na {p.stan.split("-").reverse().join(".")}
              {p.szacunek && (
                <span className="ml-1 text-amber-700 dark:text-amber-400">
                  (szacunek)
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
