"use client";

import { useState } from "react";

const MALE = "abcdefghijkmnopqrstuvwxyz";
const DUZE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const CYFRY = "23456789";
const ZNAKI = "!@#$%^&*-_=+?";

function los(n: number) {
  const k = new Uint32Array(1);
  const max = Math.floor(0x100000000 / n) * n;
  do crypto.getRandomValues(k);
  while (k[0] >= max);
  return k[0] % n;
}

function generuj(dl: number, znaki: boolean) {
  const pule = [MALE, DUZE, CYFRY, ...(znaki ? [ZNAKI] : [])];
  const wszystkie = pule.join("");
  const wynik = pule.map((p) => p[los(p.length)]);
  while (wynik.length < dl) wynik.push(wszystkie[los(wszystkie.length)]);
  for (let i = wynik.length - 1; i > 0; i--) {
    const j = los(i + 1);
    [wynik[i], wynik[j]] = [wynik[j], wynik[i]];
  }
  return wynik.join("");
}

export default function GeneratorHasel() {
  const [dl, setDl] = useState(16);
  const [znaki, setZnaki] = useState(true);
  const [haslo, setHaslo] = useState("");
  const [skopiowano, setSkopiowano] = useState(false);

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(haslo);
      setSkopiowano(true);
      setTimeout(() => setSkopiowano(false), 2000);
    } catch {
      setSkopiowano(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        Generator haseł
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Hasło powstaje w Twojej przeglądarce i nigdzie nie jest wysyłane.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
          Długość: {dl}
          <input
            type="range"
            min={12}
            max={32}
            value={dl}
            onChange={(e) => setDl(Number(e.target.value))}
            aria-label="Długość hasła"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={znaki}
            onChange={(e) => setZnaki(e.target.checked)}
          />
          znaki specjalne
        </label>
      </div>
      <button
        type="button"
        onClick={() => setHaslo(generuj(dl, znaki))}
        className="btn-primary mt-4"
      >
        Wygeneruj hasło
      </button>
      {haslo && (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center" aria-live="polite">
          <code className="flex-1 break-all rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-base text-gray-900 dark:text-white">
            {haslo}
          </code>
          <button
            type="button"
            onClick={kopiuj}
            className="text-sm text-gray-700 dark:text-gray-300 underline underline-offset-2"
          >
            {skopiowano ? "Skopiowano" : "Kopiuj"}
          </button>
        </div>
      )}
    </div>
  );
}
