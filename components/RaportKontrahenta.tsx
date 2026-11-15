"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Odp = { ok: boolean; error?: string; nazwa?: string; statusVat?: string; krs?: string | null; adres?: string; rachunki?: number };

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

/** Darmowy podgląd raportu: podstawowe dane z wykazu VAT, bez płatności i bez maila. */
export function PodgladRaportu() {
  const [nip, setNip] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("raport_kontrahenta_podglad");
    try {
      const r = await fetch("/api/raport-kontrahenta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nip }) });
      const o: Odp = await r.json();
      if (!r.ok || !o.ok) throw new Error(o.error || "Nie udało się sprawdzić firmy.");
      setD(o);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={wyslij}>
        <label htmlFor="rk-nip" className="block text-sm font-medium text-gray-900 dark:text-white">
          NIP kontrahenta
        </label>
        <input id="rk-nip" required inputMode="numeric" autoComplete="off" value={nip} onChange={(e) => setNip(e.target.value)} placeholder="np. 526 025 09 95" className={`${POLE} mt-2 font-mono`} />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
            {stan === "laduje" ? "Sprawdzamy..." : "Zobacz podstawowe dane"}
          </button>
          <button type="button" onClick={() => setNip("5260250995")} className="text-sm font-medium text-accent underline underline-offset-2">
            Wstaw przykład
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Podgląd pokazuje dane z wykazu VAT. Odpis z KRS i Monitor Sądowy i Gospodarczy są w pełnym raporcie. Nic nie zapisujemy.</p>
        {stan === "blad" && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
      {stan === "ok" && d && (
        <div role="status" className="mt-5 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-base font-semibold text-gray-900 dark:text-white">{d.nazwa}</p>
          <dl className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <div>
              Status VAT:{" "}
              <span className={d.statusVat === "Czynny" ? "font-semibold text-emerald-700 dark:text-emerald-400" : "font-semibold text-red-700 dark:text-red-400"}>{d.statusVat || "brak"}</span>
            </div>
            {d.krs && <div>KRS: {d.krs}</div>}
            {d.adres && <div>Adres: {d.adres}</div>}
            <div>Rachunków w wykazie: {d.rachunki}</div>
          </dl>
        </div>
      )}
    </div>
  );
}
