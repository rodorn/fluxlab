"use client";

import { useState } from "react";
import type { Ogloszenie } from "@/lib/leady/bzp";

export default function PodgladBzp() {
  const [q, setQ] = useState("");
  const [stan, setStan] = useState<"" | "laduje" | "ok" | "blad">("");
  const [wynik, setWynik] = useState<{ razem: number; ogloszenia: Ogloszenie[] }>({ razem: 0, ogloszenia: [] });
  const [blad, setBlad] = useState("");

  async function szukaj(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    try {
      const r = await fetch(`/api/bzp-demo?q=${encodeURIComponent(q)}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "Błąd");
      setWynik(d);
      setStan("ok");
    } catch (x) {
      setBlad((x as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Zobacz, co pasuje do Twojej branży</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz słowo kluczowe, a pokażemy prawdziwe ogłoszenia z BZP z ostatnich 2 dni. W abonamencie dostajesz takie zestawienie codziennie rano mailem.
      </p>
      <form onSubmit={szukaj} className="mt-4 flex gap-2">
        <input
          className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-base text-gray-900"
          placeholder="np. remont, oprogramowanie, dach"
          aria-label="Słowo kluczowe"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={100}
        />
        <button className="rounded-xl bg-accent px-4 py-2 font-semibold text-white disabled:opacity-60" disabled={stan === "laduje" || !q.trim()}>
          {stan === "laduje" ? "Szukanie" : "Szukaj"}
        </button>
      </form>
      {stan === "blad" && <p role="alert" className="mt-3 text-sm text-red-600">{blad}</p>}
      {stan === "ok" && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{wynik.razem ? `Znalezione ogłoszenia: ${wynik.razem}${wynik.razem > wynik.ogloszenia.length ? `, widać ${wynik.ogloszenia.length}` : ""}.` : "Brak ogłoszeń z ostatnich 2 dni dla tego słowa."}</p>
          <ul className="mt-3 grid gap-3">
            {wynik.ogloszenia.map((o) => (
              <li key={o.nr} className="rounded-xl border border-gray-200 p-3 text-sm dark:border-gray-700">
                <a className="font-semibold text-accent underline" href={o.url} target="_blank" rel="noreferrer">{o.tytul.slice(0, 160)}</a>
                <div className="mt-1 text-gray-600 dark:text-gray-400">{o.org}, {o.miasto}. Termin ofert: {o.termin ? new Date(o.termin).toLocaleDateString("pl-PL") : "brak"}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
