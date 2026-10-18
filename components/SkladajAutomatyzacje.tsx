"use client";

import { useEffect, useRef, useState } from "react";

const KLOCKI = [
  { id: "formularz", nazwa: "Formularz", opis: "Lead wpada ze strony" },
  { id: "mail", nazwa: "Mail", opis: "Potwierdzenie do klienta" },
  { id: "crm", nazwa: "CRM", opis: "Karta klienta i opiekun" },
  { id: "sms", nazwa: "SMS", opis: "„Dzwonimy do 5 minut”" },
  { id: "slack", nazwa: "Slack", opis: "Powiadomienie zespołu" },
  { id: "faktura", nazwa: "Faktura", opis: "Dokument po wygranej" },
] as const;

const KROK_MS = 700;

export default function SkladajAutomatyzacje() {
  const [ciag, setCiag] = useState<string[]>(["formularz", "crm", "sms"]);
  const [aktywny, setAktywny] = useState<number | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [reduce, setReduce] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const nazwa = (id: string) => KLOCKI.find((k) => k.id === id)!.nazwa;
  const dodaj = (id: string) => {
    if (ciag.length >= 8) return;
    setAktywny(null);
    setCiag((c) => [...c, id]);
  };
  const usun = (i: number) => {
    setAktywny(null);
    setCiag((c) => c.filter((_, j) => j !== i));
  };
  const przesun = (i: number, kier: -1 | 1) => {
    const j = i + kier;
    if (j < 0 || j >= ciag.length) return;
    setCiag((c) => {
      const n = [...c];
      [n[i], n[j]] = [n[j], n[i]];
      return n;
    });
  };
  const upusc = (cel: number) => {
    if (dragIdx === null || dragIdx === cel) return;
    setCiag((c) => {
      const n = [...c];
      const [x] = n.splice(dragIdx, 1);
      n.splice(cel, 0, x);
      return n;
    });
    setDragIdx(null);
  };

  const uruchom = () => {
    if (!ciag.length) return;
    if (timer.current) clearTimeout(timer.current);
    if (reduce) {
      setAktywny(ciag.length - 1);
      return;
    }
    const krok = (i: number) => {
      setAktywny(i);
      if (i < ciag.length - 1) timer.current = setTimeout(() => krok(i + 1), KROK_MS);
    };
    krok(0);
  };

  return (
    <section className="max-w-3xl mx-auto" aria-labelledby="sklad-h">
      <div className="text-center mb-6">
        <h2 id="sklad-h" className="h2-sekcji mb-2">Złóż własną automatyzację</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Kliknij klocek, żeby dodać go do przepływu. Kolejność zmienisz przeciągając albo strzałkami.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-5" role="group" aria-label="Paleta klocków">
        {KLOCKI.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => dodaj(k.id)}
            title={k.opis}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-white/10 text-gray-900 dark:text-white hover:ring-accent/50 transition-colors"
          >
            + {k.nazwa}
          </button>
        ))}
      </div>

      <div className="rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-gray-50 dark:bg-gray-800/40 p-4">
        {ciag.length === 0 ? (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 py-6">
            Przepływ jest pusty. Dodaj pierwszy klocek z palety.
          </p>
        ) : (
          <ol className="flex flex-wrap items-center justify-center gap-y-3">
            {ciag.map((id, i) => (
              <li key={i} className="flex items-center">
                <div
                  draggable
                  onDragStart={() => setDragIdx(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => upusc(i)}
                  onDragEnd={() => setDragIdx(null)}
                  className={`relative rounded-xl px-3 py-2 bg-white dark:bg-gray-900 ring-2 transition-all duration-300 ${
                    aktywny === i ? "ring-accent scale-105 shadow-md" : "ring-gray-200 dark:ring-white/10"
                  } ${dragIdx === i ? "opacity-40" : ""}`}
                >
                  <span className="block text-sm font-bold text-gray-900 dark:text-white text-center">
                    {i + 1}. {nazwa(id)}
                  </span>
                  {aktywny === i && (
                    <span
                      aria-hidden="true"
                      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-accent-solid"
                    />
                  )}
                  <span className="mt-1 flex justify-center gap-1">
                    <button type="button" disabled={i === 0} onClick={() => przesun(i, -1)} aria-label={`Przesuń ${nazwa(id)} wcześniej`} className="px-1.5 text-xs rounded ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30">←</button>
                    <button type="button" disabled={i === ciag.length - 1} onClick={() => przesun(i, 1)} aria-label={`Przesuń ${nazwa(id)} później`} className="px-1.5 text-xs rounded ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30">→</button>
                    <button type="button" onClick={() => usun(i)} aria-label={`Usuń ${nazwa(id)}`} className="px-1.5 text-xs rounded ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300">×</button>
                  </span>
                </div>
                {i < ciag.length - 1 && (
                  <span aria-hidden="true" className={`mx-1.5 text-lg ${aktywny !== null && aktywny > i ? "text-accent" : "text-gray-400"}`}>→</span>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={uruchom} disabled={!ciag.length} className="btn-primary disabled:opacity-50">
          Uruchom
        </button>
        <button type="button" onClick={() => { setCiag([]); setAktywny(null); }} className="btn-secondary">
          Wyczyść
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400" role="status" aria-live="polite">
        {aktywny === null
          ? ""
          : aktywny === ciag.length - 1
            ? `Gotowe: ${ciag.map(nazwa).join(" → ")}`
            : `Krok ${aktywny + 1}: ${nazwa(ciag[aktywny])}`}
      </p>
    </section>
  );
}
