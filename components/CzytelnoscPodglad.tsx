"use client";

import { useMemo, useState } from "react";
import { MAX_ZDANIE, analizaTekstu } from "@/lib/czytelnosc";

const PRZYKLAD =
  "W celu realizacji zamówienia dokonujemy weryfikacji danych, a w przypadku gdy dane są niepełne, kontaktujemy się z klientem telefonicznie lub mailowo, aby uzupełnić braki, które uniemożliwiają dalsze procedowanie sprawy, co zwykle trwa do dwóch dni roboczych.  Zamawiasz,,my robimy.";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

export default function CzytelnoscPodglad() {
  const [tekst, setTekst] = useState(PRZYKLAD);
  const w = useMemo(() => analizaTekstu(tekst), [tekst]);
  const grupy: { klucz: "dlugie" | "fraza" | "zapis"; nazwa: string }[] = [
    { klucz: "dlugie", nazwa: `Zdania powyżej ${MAX_ZDANIE} słów` },
    { klucz: "fraza", nazwa: "Frazy, które klient musi przetłumaczyć" },
    { klucz: "zapis", nazwa: "Błędy zapisu" },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 md:p-8">
      <label htmlFor="czytelnosc-tekst" className="text-sm font-semibold text-gray-900 dark:text-white">
        Wklej fragment tekstu ze swojej strony
      </label>
      <textarea
        id="czytelnosc-tekst"
        value={tekst}
        onChange={(e) => setTekst(e.target.value.slice(0, 6000))}
        rows={6}
        className={`${POLE} mt-2`}
      />
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
        Tekst zostaje w przeglądarce, nic nie wysyłamy. Podgląd sprawdza długie zdania, urzędowe frazy i błędy zapisu. Literówki sprawdza dopiero raport dla całej strony.
      </p>
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300" aria-live="polite">
        {w.slow} słów, {w.zdan} {w.zdan === 1 ? "zdanie" : "zdań"}
        {w.srednia ? `, średnio ${Math.round(w.srednia)} słów na zdanie` : ""}.
      </p>
      {w.uwagi.length === 0 ? (
        <p className="mt-3 rounded-lg bg-gray-50 dark:bg-gray-950 p-4 text-sm text-gray-700 dark:text-gray-300">
          Nic do poprawy w tym fragmencie.
        </p>
      ) : (
        grupy.map((g) => {
          const lista = w.uwagi.filter((u) => u.rodzaj === g.klucz);
          if (!lista.length) return null;
          return (
            <div key={g.klucz} className="mt-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{g.nazwa}</h3>
              <ul className="mt-2 space-y-2">
                {lista.slice(0, 8).map((u, i) => (
                  <li key={i} className="rounded-lg border-l-4 border-accent bg-gray-50 dark:bg-gray-950 px-4 py-3 text-sm">
                    <div className="font-semibold text-gray-900 dark:text-white">{u.tytul}</div>
                    <div className="mt-1 text-gray-700 dark:text-gray-300 break-words">{u.rodzaj === "dlugie" ? (u.podzial ?? u.tekst) : u.tekst}</div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
}
