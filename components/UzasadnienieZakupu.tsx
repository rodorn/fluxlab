"use client";

import { useState } from "react";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-gray-100 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

const PIERWSZY_KROK = 1200;
const TYGODNIE_W_ROKU = 48;

const zl = (n: number) => `${Math.round(n).toLocaleString("pl-PL")}\u00a0zł`;

export default function UzasadnienieZakupu() {
  const [proces, setProces] = useState("");
  const [godziny, setGodziny] = useState(5);
  const [stawka, setStawka] = useState(60);
  const [skopiowano, setSkopiowano] = useState(false);

  const tygodniowo = Math.max(0, godziny) * Math.max(0, stawka);
  const rocznie = tygodniowo * TYGODNIE_W_ROKU;
  const zwrot =
    tygodniowo > 0 ? Math.ceil(PIERWSZY_KROK / (tygodniowo / 2)) : null;

  const tekst = [
    `Proponuję zlecić FluxLab automatyzację: ${proces.trim() || "[nazwa procesu]"}.`, // głos klienta
    `Dziś zajmuje nam to około ${godziny} godz. tygodniowo, czyli około ${zl(rocznie)} rocznie.`,
    `Pierwszy krok kosztuje ${zl(PIERWSZY_KROK)} netto i trwa 5 dni roboczych, cena jest stała i podana z góry.`,
    zwrot
      ? `Jeśli zautomatyzujemy choć połowę tej pracy, koszt zwróci się po około ${zwrot} ${zwrot === 1 ? "tygodniu" : "tygodniach"}.`
      : "",
    "Poprawki przez 30 dni po odbiorze są bezpłatne. Szczegóły: fluxlab.pl/dla-zespolu",
  ]
    .filter(Boolean)
    .join(" ");

  async function kopiuj() {
    await navigator.clipboard.writeText(tekst);
    setSkopiowano(true);
    window.setTimeout(() => setSkopiowano(false), 1800);
  }

  return (
    <section aria-labelledby="uzasadnienie" className="mt-12 nie-lam">
      <h2
        id="uzasadnienie"
        className="text-lg font-bold text-gray-900 dark:text-white"
      >
        Jak uzasadnić zakup w firmie
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz, ile czasu zespół traci na ręczną pracę. Dostaniesz gotowy akapit
        do maila do szefa albo zarządu.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 print:hidden">
        <label className="text-sm text-gray-700 dark:text-gray-300 col-span-2 sm:col-span-3">
          Jaki proces
          <input
            className={`${POLE} mt-1`}
            value={proces}
            onChange={(e) => setProces(e.target.value)}
            placeholder="np. przepisywanie faktur do systemu"
          />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Godzin tygodniowo
          <input
            className={`${POLE} mt-1`}
            type="number"
            inputMode="numeric"
            min={0}
            value={godziny}
            onChange={(e) => setGodziny(Number(e.target.value))}
          />
        </label>
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Koszt godziny pracy (zł)
          <input
            className={`${POLE} mt-1`}
            type="number"
            inputMode="numeric"
            min={0}
            value={stawka}
            onChange={(e) => setStawka(Number(e.target.value))}
          />
        </label>
        <div className="col-span-2 text-sm text-gray-700 dark:text-gray-300 sm:col-span-1">
          Rocznie
          <p
            className="mt-1 py-2 text-base font-semibold text-gray-900 dark:text-white"
            aria-live="polite"
          >
            {zl(rocznie)}
          </p>
        </div>
      </div>
      <p className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 dark:border-white/10 dark:bg-white/5 dark:text-gray-200">
        {tekst}
      </p>
      <button
        type="button"
        onClick={kopiuj}
        className="btn-primary mt-4 print:hidden"
      >
        <span role="status">
          {skopiowano ? "Skopiowano" : "Kopiuj tekst do maila"}
        </span>
      </button>
    </section>
  );
}
