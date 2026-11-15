"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Odp = { ok: boolean; error?: string; vin?: string; region?: string; uwagi?: string[]; marka?: string; producent?: string; fabryka?: string; rok?: string };

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

/** Darmowy podgląd: poprawność VIN i producent z dekodera NHTSA, bez płatności i bez maila. */
export function PodgladAuta() {
  const [vin, setVin] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("sprawdzenie_auta_podglad");
    try {
      const r = await fetch("/api/sprawdzenie-auta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ vin }) });
      const o: Odp = await r.json();
      if (!r.ok || !o.ok) throw new Error(o.error || "Nie udało się sprawdzić numeru VIN.");
      setD(o);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  const wiersze: [string, string | undefined][] = d
    ? [
        ["Marka", d.marka],
        ["Producent", d.producent],
        ["Fabryka", d.fabryka],
        ["Rok modelowy", d.rok],
        ["Region świata", d.region],
      ]
    : [];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={wyslij}>
        <label htmlFor="sa-vin" className="block text-sm font-medium text-gray-900 dark:text-white">
          Numer VIN auta (17 znaków)
        </label>
        <input
          id="sa-vin"
          required
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          maxLength={20}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="np. WVWZZZ1KZAW123456"
          className={`${POLE} mt-2 font-mono uppercase`}
        />
        <button type="submit" disabled={stan === "laduje"} className="btn-primary mt-3 disabled:opacity-50">
          {stan === "laduje" ? "Sprawdzamy..." : "Sprawdź VIN"}
        </button>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Podgląd sprawdza strukturę numeru i producenta. Nic nie zapisujemy.</p>
        {stan === "blad" && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
      {stan === "ok" && d && (
        <div role="status" className="mt-5">
          <p className="text-base font-semibold text-emerald-700 dark:text-emerald-400">Struktura numeru VIN jest poprawna.</p>
          <dl className="mt-3 divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 text-sm">
            {wiersze.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-gray-600 dark:text-gray-300">{k}</dt>
                <dd className="text-right font-medium text-gray-900 dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
          {d.uwagi?.map((u) => (
            <p key={u} className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              {u}
            </p>
          ))}
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Pełny raport z wycofaniami marki, linkiem do Historii pojazdu i listą kontrolną dostaniesz mailem.</p>
        </div>
      )}
    </div>
  );
}
