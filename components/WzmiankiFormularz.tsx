"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";
const POMOC = "mt-1 block text-xs text-gray-500 dark:text-gray-400";

export default function WzmiankiFormularz({
  sesja,
  poczatkowe,
}: {
  sesja: string;
  poczatkowe: { frazy: string[]; wyklucz: string[] } | null;
}) {
  const [frazy, setFrazy] = useState((poczatkowe?.frazy ?? []).join(", "));
  const [wyklucz, setWyklucz] = useState((poczatkowe?.wyklucz ?? []).join(", "));
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);
  const [gotowe, setGotowe] = useState(false);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setLaduje(true);
    zglosZdarzenie("wzmianki_start");
    try {
      const r = await fetch("/api/wzmianki", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sesja,
          frazy: frazy
            .split(/[,;\n]/)
            .map((x) => x.trim())
            .filter(Boolean),
          wyklucz: wyklucz
            .split(/[,;\n]/)
            .map((x) => x.trim())
            .filter(Boolean),
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setBlad(j?.error ?? "Nie udało się zapisać. Spróbuj za chwilę.");
      else {
        setGotowe(true);
        zglosZdarzenie("wzmianki_zapisano");
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
          W ciągu godziny wyślemy na maila pierwsze zestawienie wzmianek z
          ostatnich dni. Potem zestawienie przychodzi w każdy poniedziałek rano.
          Frazy możesz zmienić tutaj w każdej chwili.
        </p>
        <button
          type="button"
          className="btn-secondary mt-6"
          onClick={() => setGotowe(false)}
        >
          Zmień frazy
        </button>
      </div>
    );

  return (
    <form onSubmit={wyslij} className="grid gap-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Czego mamy szukać w sieci
      </h1>
      <label className="block">
        <span className={ETYKIETA}>Frazy do śledzenia (do trzech)</span>
        <input
          value={frazy}
          onChange={(e) => setFrazy(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          required
          placeholder="np. Kowalski Meble, kowalskimeble.pl"
          className={`${POLE} mt-1.5`}
        />
        <span className={POMOC}>
          Nazwa firmy, marki albo produktu, po przecinku. Szukamy dokładnego
          zapisu, więc dodaj też wariant, pod którym o Was piszą.
        </span>
      </label>
      <label className="block">
        <span className={ETYKIETA}>Słowa do pominięcia (opcjonalnie, do trzech)</span>
        <input
          value={wyklucz}
          onChange={(e) => setWyklucz(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder="np. nekrolog, rabat"
          className={`${POLE} mt-1.5`}
        />
        <span className={POMOC}>
          Publikacje z tym słowem w tytule wytniemy z zestawienia. Przydaje się,
          gdy nazwa firmy pokrywa się z innym pojęciem.
        </span>
      </label>
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
        {laduje ? "Zapisywanie…" : "Zapisz frazy"}
      </button>
    </form>
  );
}
