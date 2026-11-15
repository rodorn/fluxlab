"use client";

import { useState } from "react";

export default function PodgladAnkietyNps() {
  const [firma, setFirma] = useState("Studio Dachy Kowalski");
  const [ocena, setOcena] = useState<number | null>(9);
  const [komentarz, setKomentarz] = useState("Szybki kontakt i terminowy montaż.");

  const pole = "rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";
  const typ = ocena === null ? "" : ocena >= 9 ? "promotor" : ocena >= 7 ? "neutralny" : "krytyk";

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz ankietę klienta i mail, który dostaniesz</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz nazwę firmy i wybierz ocenę. Obok powstaje mail z odpowiedzią. To podgląd, nic nie wysyłamy ani nie zapisujemy.
      </p>
      <div className="mt-5 grid gap-3">
        <input className={pole} value={firma} maxLength={120} onChange={(e) => setFirma(e.target.value)} placeholder="Nazwa firmy" aria-label="Nazwa firmy" />
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{firma.trim() ? `Jak oceniasz współpracę z firmą ${firma.trim()}?` : "Jak oceniasz naszą firmę?"}</p>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-11" role="radiogroup" aria-label="Ocena od 0 do 10">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={ocena === i}
              onClick={() => setOcena(i)}
              className={`rounded-lg border py-3 text-sm font-semibold ${ocena === i ? "border-accent bg-accent text-white" : "border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"}`}
            >
              {i}
            </button>
          ))}
        </div>
        <textarea className={pole} rows={2} value={komentarz} maxLength={1000} onChange={(e) => setKomentarz(e.target.value)} placeholder="Komentarz klienta" aria-label="Komentarz klienta" />
      </div>
      {ocena !== null && (
        <div className="mt-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-5 text-sm text-gray-900 dark:text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-accent">Temat: Ankieta NPS: ocena {ocena}{ocena <= 6 ? " (krytyk)" : ""}</p>
          <p className="mt-3 text-base font-bold">Ocena {ocena}/10 ({typ})</p>
          <p className="mt-2">{komentarz.trim() || "Bez komentarza."}</p>
          <p className="mt-3 text-accent">Wynik NPS i wszystkie odpowiedzi</p>
        </div>
      )}
    </div>
  );
}
