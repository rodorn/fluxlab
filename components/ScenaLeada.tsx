"use client";

import { useEffect, useRef, useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/* Próbne zgłoszenie: imię z pola przechodzi przez CRM do handlowca, który
   dostaje zadanie z odliczaniem 15 minut. Nic nie jest wysyłane. */
const KROK_MS = 900;

function czas(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function ScenaLeada() {
  const [imie, setImie] = useState("Anna");
  const [etap, setEtap] = useState(0);
  const [zostalo, setZostalo] = useState(900);
  const timery = useRef<number[]>([]);

  useEffect(() => {
    if (etap !== 4) return;
    const t = window.setInterval(
      () => setZostalo((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => window.clearInterval(t);
  }, [etap]);

  useEffect(
    () => () => timery.current.forEach((t) => window.clearTimeout(t)),
    [],
  );

  function wyslij(e: React.FormEvent) {
    e.preventDefault();
    timery.current.forEach((t) => window.clearTimeout(t));
    zglosZdarzenie("scena_leada");
    setZostalo(900);
    setEtap(1);
    timery.current = [2, 3, 4].map((n, i) =>
      window.setTimeout(() => setEtap(n), KROK_MS * (i + 1)),
    );
  }

  const kto = imie.trim() || "Klient";
  const wezel = (aktywny: boolean) =>
    `scena-wezel relative flex flex-1 flex-col rounded-2xl border bg-white p-5 text-left transition-all duration-500 dark:bg-gray-900 ${
      aktywny
        ? "border-accent shadow-lg shadow-accent/15 -translate-y-1"
        : "border-gray-200 dark:border-white/10"
    }`;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-stretch">
        <form onSubmit={wyslij} className={wezel(etap === 0 || etap === 1)}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
            1. Formularz na stronie
          </span>
          <label htmlFor="scena-imie" className="mt-3 text-sm font-medium">
            Imię
          </label>
          <input
            id="scena-imie"
            value={imie}
            maxLength={24}
            onChange={(e) => setImie(e.target.value)}
            className="mt-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-accent dark:border-white/15 dark:bg-white/[0.04]"
          />
          <button
            type="submit"
            className="btn-primary mt-3 justify-center rounded-full px-5 py-2.5 text-sm"
          >
            Wyślij próbne zgłoszenie
          </button>
        </form>

        <Lacznik aktywny={etap === 1} />

        <div className={wezel(etap === 2 || etap === 3)}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
            2. CRM
          </span>
          {etap >= 2 ? (
            <div className="scena-wjazd mt-3 rounded-xl bg-accent/10 p-3">
              <p className="text-sm font-semibold">Nowy lead: {kto}</p>
              <p className="mt-1 text-xs text-gray-600 dark:text-white/65">
                źródło: formularz, strona główna
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-400 dark:text-white/40">
              Czeka na zgłoszenie
            </p>
          )}
        </div>

        <Lacznik aktywny={etap === 3} />

        <div className={wezel(etap === 4)}>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
            3. Telefon handlowca
          </span>
          {etap === 4 ? (
            <div className="scena-wjazd mt-3">
              <p className="text-sm font-semibold">Zadzwoń: {kto}</p>
              <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-accent">
                {czas(zostalo)}
              </p>
              <p className="text-xs text-gray-600 dark:text-white/65">
                na pierwszy telefon
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-400 dark:text-white/40">
              Brak zadań
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Lacznik({ aktywny }: { aktywny: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-8 w-px shrink-0 bg-gray-200 md:mx-0 md:h-px md:w-10 md:self-center dark:bg-white/10"
    >
      {aktywny && <span className="scena-kropka" />}
    </div>
  );
}
