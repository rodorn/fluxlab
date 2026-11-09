"use client";

import { useMemo, useState } from "react";
import {
  druk3293,
  LATA,
  stawki,
  type Pozycja,
  type Rok,
  type WariantSkali,
} from "@/lib/podatki/stawki";
import { liczEtat, liczJdg } from "@/lib/podatki/pit";
import type { Forma, Wariant } from "@/lib/podatki/zus";

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

const MIESIACE = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

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

function Kwota({
  etykieta,
  value,
  onChange,
}: {
  etykieta: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm text-gray-700 dark:text-gray-300">
      {etykieta}
      <input
        className={`${pole} mt-1`}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Wiersz({
  nazwa,
  kwota,
  mocny,
  opis,
}: {
  nazwa: string;
  kwota: number;
  mocny?: boolean;
  opis?: string;
}) {
  return (
    <tr className={mocny ? "font-semibold" : undefined}>
      <td
        className={`py-2 ${mocny ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
      >
        {nazwa}
        {opis && (
          <span className="block text-xs font-normal text-gray-400">
            {opis}
          </span>
        )}
      </td>
      <td className="py-2 text-right text-gray-900 dark:text-white whitespace-nowrap">
        {zl(kwota)}
      </td>
    </tr>
  );
}

function Zaliczki({ zaliczki }: { zaliczki: number[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        Zaliczki miesięczne
      </p>
      <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
        {zaliczki.map((z, i) => (
          <div
            key={i}
            className="rounded-md bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 py-1.5"
          >
            <span className="block text-gray-400">{MIESIACE[i]}</span>
            <span className="text-gray-900 dark:text-white">
              {z.toLocaleString("pl-PL")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KalkulatorPit() {
  const [tryb, setTryb] = useState<"jdg" | "etat">("jdg");
  const [rok, setRok] = useState<Rok>(2026);
  const [skala, setSkala] = useState<WariantSkali>("obowiazujace");
  const [forma, setForma] = useState<Forma>("skala");
  const [przychod, setPrzychod] = useState("120000");
  const [koszty, setKoszty] = useState("20000");
  const [stawkaRyczaltu, setStawkaRyczaltu] = useState(12);
  const [wariant, setWariant] = useState<Wariant>("duzy");
  const [chorobowa, setChorobowa] = useState(false);
  const [dochodPoprzedni, setDochodPoprzedni] = useState("48000");
  const [wspolne, setWspolne] = useState(false);
  const [dochodMalzonka, setDochodMalzonka] = useState("0");
  const [brutto, setBrutto] = useState("8000");
  const [dojazd, setDojazd] = useState(false);
  const [pit2, setPit2] = useState(true);

  const s = stawki(rok);
  const druk = druk3293(rok);
  const w = druk ? skala : "obowiazujace";
  const wspolneAktywne = wspolne && (tryb === "etat" || forma === "skala");

  const jdg = useMemo(
    () =>
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
        wspolneZMalzonkiem: wspolneAktywne,
        dochodMalzonka: liczba(dochodMalzonka),
        skala: w,
      }),
    [
      rok,
      forma,
      przychod,
      koszty,
      stawkaRyczaltu,
      wariant,
      chorobowa,
      dochodPoprzedni,
      wspolneAktywne,
      dochodMalzonka,
      w,
    ],
  );

  const etat = useMemo(
    () =>
      liczEtat({
        rok,
        bruttoMies: liczba(brutto),
        dojazd,
        pit2,
        wspolneZMalzonkiem: wspolneAktywne,
        dochodMalzonka: liczba(dochodMalzonka),
        skala: w,
      }),
    [rok, brutto, dojazd, pit2, wspolneAktywne, dochodMalzonka, w],
  );

  const progi =
    w === "druk3293" && druk
      ? `${procent(s.stawka1.v)} do ${zl(druk.progSkali)}, ${procent(druk.stawka2)} do ${zl(druk.prog2)}, ${procent(druk.stawka3)} powyżej`
      : `${procent(s.stawka1.v)} do ${zl(s.progSkali.v)}, ${procent(s.stawka2.v)} powyżej`;

  const zrodla: { nazwa: string; p: Pozycja }[] = [
    { nazwa: "Skala podatkowa i kwota zmniejszająca", p: s.kwotaZmniejszajaca },
    { nazwa: "Podatek liniowy", p: s.liniowy },
    { nazwa: "Stawki ryczałtu", p: s.ryczaltStawki as unknown as Pozycja },
    {
      nazwa: "Odliczenie zdrowotnej na liniowym",
      p: s.limitOdliczeniaZdrowotnejLiniowy,
    },
    {
      nazwa: "Odliczenie zdrowotnej na ryczałcie",
      p: s.odliczenieZdrowotnejRyczalt,
    },
    { nazwa: "Danina solidarnościowa", p: s.danina },
    {
      nazwa: "Koszty uzyskania przychodu z etatu",
      p: s.kosztyUzyskaniaPracownik,
    },
    { nazwa: "Składki pracownika", p: s.pracownikEmerytalna },
    { nazwa: "Minimalne wynagrodzenie", p: s.minimalne },
    { nazwa: "Prognozowane przeciętne wynagrodzenie", p: s.przecietne },
  ];

  const pierwszy = etat.nettoMies[0];
  const ostatni = etat.nettoMies[11];

  return (
    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Wybor
          etykieta="Rodzaj dochodu"
          opcje={[
            { v: "jdg", nazwa: "Działalność (JDG)" },
            { v: "etat", nazwa: "Umowa o pracę" },
          ]}
          wartosc={tryb}
          zmien={setTryb}
        />
        <Wybor
          etykieta="Rok"
          opcje={LATA.map((r) => ({ v: r, nazwa: String(r) }))}
          wartosc={rok}
          zmien={setRok}
        />

        {druk && (
          <div className="rounded-lg border border-amber-300/70 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/30 p-4 text-sm">
            <p className="text-gray-800 dark:text-gray-200">
              Sejm uchwalił zmianę skali na {rok} r. (druk nr 3293),{" "}
              {druk.status}.
            </p>
            <div className="mt-3">
              <Wybor
                etykieta="Liczyć według"
                opcje={[
                  { v: "obowiazujace", nazwa: "Obecnych przepisów" },
                  { v: "druk3293", nazwa: "Uchwalonej zmiany" },
                ]}
                wartosc={skala}
                zmien={setSkala}
              />
            </div>
          </div>
        )}

        {tryb === "jdg" ? (
          <>
            <Wybor
              etykieta="Forma opodatkowania"
              opcje={[
                { v: "skala", nazwa: "Skala" },
                { v: "liniowy", nazwa: "Liniowy" },
                { v: "ryczalt", nazwa: "Ryczałt" },
              ]}
              wartosc={forma}
              zmien={setForma}
            />
            {forma === "ryczalt" && (
              <label className="block text-sm text-gray-700 dark:text-gray-300">
                Stawka ryczałtu
                <select
                  className={`${pole} mt-1`}
                  value={stawkaRyczaltu}
                  onChange={(e) => setStawkaRyczaltu(Number(e.target.value))}
                >
                  {s.ryczaltStawki.v.map((r) => (
                    <option
                      key={r.stawka}
                      value={Math.round(r.stawka * 1000) / 10}
                    >
                      {procent(r.stawka)}: {r.przyklady}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Kwota
                etykieta="Przychód roczny"
                value={przychod}
                onChange={setPrzychod}
              />
              <Kwota
                etykieta="Koszty roczne"
                value={koszty}
                onChange={setKoszty}
              />
            </div>
            {forma === "ryczalt" && (
              <p className="-mt-3 text-xs text-gray-500 dark:text-gray-400">
                Na ryczałcie koszty nie obniżają podatku; wpisz je, żeby
                zobaczyć kwotę na rękę.
              </p>
            )}
            <Wybor
              etykieta="Składki ZUS"
              opcje={[
                { v: "ulga-na-start", nazwa: "Ulga na start" },
                { v: "preferencyjny", nazwa: "Preferencyjny" },
                { v: "maly-zus-plus", nazwa: "Mały ZUS Plus" },
                { v: "duzy", nazwa: "Duży" },
              ]}
              wartosc={wariant}
              zmien={setWariant}
            />
            {wariant === "maly-zus-plus" && (
              <Kwota
                etykieta="Dochód z poprzedniego roku"
                value={dochodPoprzedni}
                onChange={setDochodPoprzedni}
              />
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
          </>
        ) : (
          <>
            <Kwota
              etykieta="Wynagrodzenie brutto miesięcznie"
              value={brutto}
              onChange={setBrutto}
            />
            <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={pit2}
                onChange={(e) => setPit2(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              PIT-2 złożony u pracodawcy (kwota zmniejszająca co miesiąc)
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={dojazd}
                onChange={(e) => setDojazd(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              Dojazd z innej miejscowości (podwyższone koszty)
            </label>
          </>
        )}

        {(tryb === "etat" || forma === "skala") && (
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={wspolne}
                onChange={(e) => setWspolne(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              Wspólne rozliczenie z małżonkiem
            </label>
            {wspolne && (
              <Kwota
                etykieta="Roczny dochód małżonka do opodatkowania"
                value={dochodMalzonka}
                onChange={setDochodMalzonka}
              />
            )}
          </div>
        )}
      </form>

      <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-6 self-start">
        {tryb === "jdg" ? (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Na rękę miesięcznie
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {zl(jdg.naRekeMies)}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              rocznie {zl(jdg.naReke)}
            </p>
            <table className="mt-6 w-full text-sm">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <Wiersz nazwa="Przychód" kwota={liczba(przychod)} />
                <Wiersz nazwa="Koszty" kwota={liczba(koszty)} />
                <Wiersz nazwa="Składki społeczne" kwota={jdg.spoleczne} />
                <Wiersz nazwa="Składka zdrowotna" kwota={jdg.zdrowotna} />
                {jdg.odliczonaZdrowotna > 0 && (
                  <Wiersz
                    nazwa="Zdrowotna odliczona od podstawy"
                    kwota={jdg.odliczonaZdrowotna}
                  />
                )}
                <Wiersz nazwa="Podstawa opodatkowania" kwota={jdg.podstawa} />
                <Wiersz
                  nazwa="Podatek za rok"
                  kwota={jdg.podatek}
                  mocny
                  opis={
                    forma === "skala"
                      ? `${progi}, minus ${zl(s.kwotaZmniejszajaca.v)}`
                      : forma === "liniowy"
                        ? procent(s.liniowy.v)
                        : `${stawkaRyczaltu.toLocaleString("pl-PL")}% od przychodu`
                  }
                />
                {jdg.danina > 0 && (
                  <Wiersz nazwa="Danina solidarnościowa" kwota={jdg.danina} />
                )}
                {jdg.doplataZwrot !== 0 && (
                  <Wiersz
                    nazwa={
                      jdg.doplataZwrot < 0
                        ? "Zwrot w zeznaniu rocznym"
                        : "Dopłata w zeznaniu rocznym"
                    }
                    kwota={Math.abs(jdg.doplataZwrot)}
                  />
                )}
                <Wiersz nazwa="Na rękę za rok" kwota={jdg.naReke} mocny />
              </tbody>
            </table>
            <Zaliczki zaliczki={jdg.zaliczki} />
            {jdg.zdrowotnaSzacunek && (
              <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                Zdrowotna na ryczałcie w {rok} r. to szacunek do czasu
                komunikatu GUS za IV kwartał.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Netto miesięcznie
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
              {zl(pierwszy)}
            </p>
            {ostatni !== pierwszy && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                w grudniu {zl(ostatni)}, po przekroczeniu progu
              </p>
            )}
            <table className="mt-6 w-full text-sm">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                <Wiersz nazwa="Brutto za rok" kwota={liczba(brutto) * 12} />
                <Wiersz nazwa="Składki społeczne" kwota={etat.spoleczne} />
                <Wiersz nazwa="Składka zdrowotna" kwota={etat.zdrowotna} />
                <Wiersz
                  nazwa="Koszty uzyskania przychodu"
                  kwota={etat.koszty}
                />
                <Wiersz nazwa="Podstawa opodatkowania" kwota={etat.podstawa} />
                <Wiersz
                  nazwa="Podatek za rok"
                  kwota={etat.podatekRoczny}
                  mocny
                  opis={`${progi}, minus ${zl(s.kwotaZmniejszajaca.v)}`}
                />
                {etat.doplataZwrot !== 0 && (
                  <Wiersz
                    nazwa={
                      etat.doplataZwrot < 0
                        ? "Zwrot w zeznaniu rocznym"
                        : "Dopłata w zeznaniu rocznym"
                    }
                    kwota={Math.abs(etat.doplataZwrot)}
                  />
                )}
                <Wiersz nazwa="Netto za rok" kwota={etat.nettoRok} mocny />
              </tbody>
            </table>
            <Zaliczki zaliczki={etat.zaliczki} />
          </>
        )}
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
          {druk && (
            <li>
              Zmiana skali na {rok} r.:{" "}
              <a
                href={`https://www.sejm.gov.pl/Sejm10.nsf/PrzebiegProc.xsp?nr=3293`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
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
