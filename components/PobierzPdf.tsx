"use client";

import { useState } from "react";

import { TRESC_ZGODY_POBRANIA } from "@/lib/pobranie";

export default function PobierzPdf({ plik }: { plik: string }) {
  const [pobrany, setPobrany] = useState(false);
  const [email, setEmail] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [stan, setStan] = useState<"" | "wysyla" | "ok">("");
  const [blad, setBlad] = useState("");

  async function zapisz(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    if (!zgoda) {
      setBlad("Zaznacz zgodę, żebyśmy mogli pisać na ten adres.");
      return;
    }
    setStan("wysyla");
    try {
      const odp = await fetch("/api/pobranie-zgoda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zgoda, plik }),
      });
      const d = await odp.json().catch(() => ({}));
      if (!odp.ok) throw new Error(d.error || "Nie udało się zapisać, spróbuj za chwilę.");
      setStan("ok");
    } catch (err) {
      setBlad(err instanceof Error ? err.message : "Nie udało się zapisać, spróbuj za chwilę.");
      setStan("");
    }
  }

  return (
    <div className="mt-4">
      <a href={`/pobierz/${plik}`} download onClick={() => setPobrany(true)} className="btn-primary self-start">
        Pobierz PDF
      </a>
      {pobrany && stan === "ok" && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          Zapisane. Pierwszy mail z poradami przyjdzie w ciągu godziny (8:00 do 19:00).
        </p>
      )}
      {pobrany && stan !== "ok" && (
        <form onSubmit={zapisz} className="mt-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Porady do tego materiału na maila</p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">Nieobowiązkowe. PDF pobierasz i bez tego.</p>
          <label className="mt-3 block">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="ty@firma.pl"
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-900"
            />
          </label>
          <label className="mt-3 flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={zgoda}
              onChange={(e) => setZgoda(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[rgb(var(--accent-solid))]"
            />
            <span>{TRESC_ZGODY_POBRANIA}</span>
          </label>
          {blad && (
            <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
              {blad}
            </p>
          )}
          <button type="submit" disabled={stan === "wysyla"} className="btn-secondary mt-3 disabled:opacity-60">
            {stan === "wysyla" ? "Zapisujemy…" : "Zapisz mnie"}
          </button>
        </form>
      )}
    </div>
  );
}
