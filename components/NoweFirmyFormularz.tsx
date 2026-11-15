"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";
const POMOC = "mt-1 block text-xs text-gray-500 dark:text-gray-400";

export default function NoweFirmyFormularz({
  sesja,
  wojewodztwa,
  poczatkowe,
}: {
  sesja: string;
  wojewodztwa: string[];
  poczatkowe: { pkd: string[]; woj: string[]; tylkoGlowne: boolean } | null;
}) {
  const [pkd, setPkd] = useState((poczatkowe?.pkd ?? []).join(", "));
  const [woj, setWoj] = useState<string[]>(poczatkowe?.woj ?? []);
  const [tylkoGlowne, setTylkoGlowne] = useState(
    poczatkowe?.tylkoGlowne ?? true,
  );
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [gotowe, setGotowe] = useState(false);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setLaduje(true);
    zglosZdarzenie("nowe_firmy_start");
    try {
      const r = await fetch("/api/nowe-firmy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesja,
          pkd: pkd
            .split(/[,;\n]/)
            .map((x) => x.trim())
            .filter(Boolean),
          woj,
          tylkoGlowne,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setBlad(j?.error ?? "Nie udało się zapisać. Spróbuj za chwilę.");
      else {
        setGotowe(true);
        zglosZdarzenie("nowe_firmy_zapisano");
      }
    } catch {
      setBlad("Nie udało się połączyć. Spróbuj za chwilę.");
    } finally {
      setLaduje(false);
    }
  }

  if (gotowe)
    return (
      <div aria-live="polite">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Zapisane
        </h1>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          W ciągu godziny wyślemy na maila pierwszą listę: spółki z KRS
          zarejestrowane w ostatnich dwóch tygodniach i pasujące do wyboru.
          Potem lista przychodzi w każdy poniedziałek rano. Wybór możesz zmienić
          tutaj w każdej chwili.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setGotowe(false)}
        >
          Zmień wybór
        </button>
      </div>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Jakie nowe spółki mamy wysyłać
      </h1>
      <label className="block">
        <span className={ETYKIETA}>Kody PKD (opcjonalnie, do pięciu)</span>
        <input
          value={pkd}
          onChange={(e) => setPkd(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="np. 62, 69.20.Z, 41.20"
          className={`${POLE} mt-1.5`}
        />
        <span className={POMOC}>
          Wystarczy początek kodu: „62” to cała informatyka, „62.01.Z” to
          dokładnie programowanie. Puste pole to wszystkie branże.
        </span>
      </label>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={tylkoGlowne}
          onChange={(e) => setTylkoGlowne(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Tylko spółki, u których to przeważająca działalność. Bez zaznaczenia
          dostaniesz też spółki, które mają taki kod wśród pozostałych, a tych
          bywa dużo.
        </span>
      </label>
      <fieldset>
        <legend className={ETYKIETA}>Województwa (opcjonalnie)</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {wojewodztwa.map((w) => (
            <label key={w} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={woj.includes(w)}
                onChange={(e) =>
                  setWoj(
                    e.target.checked ? [...woj, w] : woj.filter((x) => x !== w),
                  )
                }
                className="h-4 w-4 shrink-0"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {w.charAt(0) + w.slice(1).toLowerCase()}
              </span>
            </label>
          ))}
        </div>
        <span className={POMOC}>Bez zaznaczenia: cała Polska.</span>
      </fieldset>
      {blad && (
        <p
          role="alert"
          className="rounded-lg border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-800 dark:text-red-300"
        >
          {blad}
        </p>
      )}
      <button
        type="submit"
        disabled={laduje}
        className="btn-primary disabled:opacity-60"
      >
        {laduje ? "Zapisywanie…" : "Zapisz wybór"}
      </button>
    </form>
  );
}
