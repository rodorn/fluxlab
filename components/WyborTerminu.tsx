"use client";

import { useEffect, useState } from "react";

/** Wybór dnia i godziny spotkania Google Meet z wolnych terminów kalendarza
 *  (/api/terminy). Oddaje termin „RRRR-MM-DD GG:MM” albo pusty napis. */

type DzienTerminow = { data: string; godziny: string[] };

function dataLokalna(iso: string) {
  const [r, m, d] = iso.split("-").map(Number);
  return new Date(r, m - 1, d);
}

export default function WyborTerminu({ onZmiana }: { onZmiana: (termin: string) => void }) {
  const [dni, setDni] = useState<DzienTerminow[] | null>(null);
  const [dzien, setDzien] = useState("");
  const [godzina, setGodzina] = useState("");

  useEffect(() => {
    fetch("/api/terminy")
      .then((r) => r.json())
      .then((d: { dni: DzienTerminow[] }) => {
        setDni(d.dni);
        setDzien(d.dni.find((x) => x.godziny.length)?.data ?? d.dni[0]?.data ?? "");
      })
      .catch(() => setDni([]));
  }, []);

  useEffect(() => {
    onZmiana(dzien && godzina ? `${dzien} ${godzina.padStart(5, "0")}` : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dzien, godzina]);

  // Jeden przycisk na godzinę zegarową: pierwszy wolny kwadrans w tej godzinie.
  const godziny = (dni?.find((x) => x.data === dzien)?.godziny ?? []).filter(
    (g, i, lista) => i === 0 || g.slice(0, 2) !== lista[i - 1].slice(0, 2),
  );

  return (
    <div className="scena-wjazd space-y-3">
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Dzień</p>
        {!dni ? (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-[52px] animate-pulse rounded-lg bg-gray-100 dark:bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {dni.map((d) => {
              const data = dataLokalna(d.data);
              const pelny = d.godziny.length === 0;
              return (
                <button
                  key={d.data}
                  type="button"
                  disabled={pelny}
                  aria-pressed={dzien === d.data}
                  onClick={() => {
                    setDzien(d.data);
                    setGodzina("");
                  }}
                  className={`rounded-lg border px-2 py-2 text-center text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    dzien === d.data
                      ? "border-accent bg-accent/10"
                      : "border-gray-200 hover:border-accent/50 dark:border-gray-700"
                  }`}
                >
                  <span className="block font-semibold capitalize text-gray-900 dark:text-white">
                    {d.data === dni[0]?.data
                      ? "Dziś"
                      : data.toLocaleDateString("pl-PL", { weekday: "short" })}
                  </span>
                  <span className="block text-gray-500 dark:text-gray-400">
                    {data.toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Godzina</p>
        {godziny.length ? (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {godziny.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={godzina === g}
                onClick={() => setGodzina(g)}
                className={`rounded-lg border py-2 text-sm tabular-nums transition-colors ${
                  godzina === g
                    ? "border-accent bg-accent/10 font-semibold text-accent"
                    : "border-gray-200 text-gray-700 hover:border-accent/50 dark:border-gray-700 dark:text-gray-300"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dni ? "Tego dnia nie ma już wolnych godzin." : "\u00a0"}
          </p>
        )}
      </div>
      <p className="text-center text-xs text-gray-500 dark:text-gray-400">
        Pokazujemy tylko godziny wolne w naszym kalendarzu. Potwierdzimy zaproszeniem z linkiem do Meet.
      </p>
    </div>
  );
}
