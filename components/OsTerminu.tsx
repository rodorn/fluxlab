"use client";

import { useState } from "react";

/** Oś czasu 11:00–24:00 z suwakiem co 15 minut. Zajęte kwadranse są
 *  zaszarzone, a suwak przeskakuje na najbliższy wolny start. */

const OD = 11 * 60;
const DO = 24 * 60;
const KROK = 15;
const DLUGOSC = 30;
const OSTATNI = DO - DLUGOSC;
const N = (DO - OD) / KROK;

export const hhmm = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
const naMin = (t: string) => {
  const [g, m] = t.split(":").map(Number);
  return g * 60 + m;
};

export default function OsTerminu({
  wolne,
  wybrana,
  onWybierz,
}: {
  wolne: string[];
  wybrana: string;
  onWybierz: (t: string) => void;
}) {
  // Podczas przeciągania suwak idzie za palcem co minutę, a rezerwacja
  // przeskakuje na najbliższy wolny start. Po puszczeniu ramka dojeżdża płynnie.
  const [reka, setReka] = useState<number | null>(null);
  const wolneMin = wolne.map(naMin);
  const wolny = new Set(wolneMin);
  const startMin = wybrana ? naMin(wybrana) : null;

  // Kwadrans jest wolny, jeśli zaczyna się w nim albo trwa jakieś wolne spotkanie.
  const kwadrans = Array.from({ length: N }, (_, i) => {
    const t = OD + i * KROK;
    return wolny.has(t) || wolny.has(t - KROK);
  });

  const najblizszy = (min: number) =>
    wolneMin.reduce(
      (best, t) =>
        best === null || Math.abs(t - min) < Math.abs(best - min) ? t : best,
      null as number | null,
    );

  const przesun = (min: number) => {
    const t = najblizszy(min);
    if (t !== null) onWybierz(hhmm(t));
  };

  const kierunek = (od: number, k: 1 | -1) => {
    const kolejne = wolneMin.filter((t) => (k === 1 ? t > od : t < od));
    return kolejne.length ? (k === 1 ? Math.min(...kolejne) : Math.max(...kolejne)) : null;
  };
  const klawisz = (e: React.KeyboardEvent) => {
    const od = startMin ?? OD;
    let t: number | null | undefined;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") t = kierunek(od, 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") t = kierunek(od, -1);
    else if (e.key === "Home") t = Math.min(...wolneMin);
    else if (e.key === "End") t = Math.max(...wolneMin);
    else return;
    e.preventDefault();
    if (t !== null && t !== undefined) onWybierz(hhmm(t));
  };
  const pokazana = reka ?? startMin;
  const pelne = wolneMin.filter((t) => t % 60 === 0).slice(0, 6);

  if (!wolneMin.length) {
    return (
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Ten dzień jest już zajęty, wybierz inny.
      </p>
    );
  }

  return (
    <div>
      <p className="text-center text-2xl font-bold tabular-nums tracking-tight text-gray-900 dark:text-white">
        {startMin !== null ? (
          <>
            {hhmm(startMin)}
            <span className="text-gray-400 dark:text-white/40"> – </span>
            {hhmm(startMin + DLUGOSC)}
          </>
        ) : (
          <span className="text-base font-medium text-gray-500 dark:text-gray-400">
            Przesuń suwak albo kliknij godzinę na osi
          </span>
        )}
      </p>

      <div className="relative mt-3 select-none">
        <div className="flex h-10 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          {kwadrans.map((ok, i) => {
            const t = OD + i * KROK;
            const w =
              startMin !== null && t >= startMin && t < startMin + DLUGOSC;
            return (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                disabled={!ok}
                onClick={() => przesun(t)}
                className={`h-full flex-1 transition-colors ${
                  i % 4 === 0 && i
                    ? "border-l border-gray-200 dark:border-gray-700"
                    : ""
                } ${
                  w
                    ? "bg-accent-solid"
                    : ok
                      ? "bg-accent/[0.08] hover:bg-accent/25"
                      : "os-zajete cursor-not-allowed"
                }`}
              />
            );
          })}
        </div>
        {pokazana !== null && (
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 h-10 rounded-lg border-2 border-accent bg-white/30 shadow-md dark:bg-white/10 ${
              reka === null ? "transition-[left] duration-200 ease-out" : ""
            }`}
            style={{
              width: `${(DLUGOSC / (DO - OD)) * 100}%`,
              left: `${((pokazana - OD) / (OSTATNI - OD)) * (100 - (DLUGOSC / (DO - OD)) * 100)}%`,
            }}
          />
        )}
        <input
          type="range"
          min={OD}
          max={OSTATNI}
          step={1}
          value={pokazana ?? OD}
          onChange={(e) => {
            const v = +e.target.value;
            setReka(v);
            przesun(v);
          }}
          onPointerUp={() => setReka(null)}
          onPointerCancel={() => setReka(null)}
          onBlur={() => setReka(null)}
          onKeyDown={klawisz}
          aria-label="Godzina spotkania"
          aria-valuetext={
            startMin !== null
              ? `${hhmm(startMin)} do ${hhmm(startMin + DLUGOSC)}`
              : "nie wybrano"
          }
          className="suwak-terminu absolute inset-x-0 top-0 h-10 w-full cursor-pointer appearance-none bg-transparent"
          style={{ ["--szer" as string]: `${(DLUGOSC / (DO - OD)) * 100}%` }}
        />
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-gray-500 dark:text-gray-400">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={i % 2 ? "hidden sm:inline" : ""}>
              {11 + i}
            </span>
          ))}
        </div>
      </div>

      {pelne.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {pelne.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onWybierz(hhmm(t))}
              aria-pressed={startMin === t}
              className={`rounded-xl border px-3 py-1.5 text-xs tabular-nums transition-colors ${
                startMin === t
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-gray-200 text-gray-700 hover:border-accent/50 dark:border-gray-700 dark:text-gray-300"
              }`}
            >
              {hhmm(t)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
