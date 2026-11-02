"use client";

import Link from "next/link";
import { useState } from "react";
import { usun, useKoszyk, wyczysc, type PozycjaKoszyka } from "@/lib/koszyk";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const RODZAJE: { klucz: PozycjaKoszyka["rodzaj"]; nazwa: string }[] = [
  { klucz: "abonament", nazwa: "Abonamenty" },
  { klucz: "dodatek", nazwa: "Dodatki co miesiąc" },
  { klucz: "usluga", nazwa: "Usługi" },
];

export default function KoszykWidok() {
  const koszyk = useKoszyk();
  const [email, setEmail] = useState("");
  const [firma, setFirma] = useState("");
  const [uwagi, setUwagi] = useState("");
  const [pulapka, setPulapka] = useState("");
  const [stan, setStan] = useState<"" | "wysylamy" | "wyslane">("");
  const [blad, setBlad] = useState("");
  const [wyslane, setWyslane] = useState<PozycjaKoszyka[]>([]);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("wysylamy");
    setBlad("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: firma,
          website: pulapka,
          problemType: "Koszyk usług",
          problemScale: `Pozycji w koszyku: ${koszyk.length}`,
          message: [
            ...koszyk.map((p, i) => `${i + 1}. ${p.nazwa} (${p.cena}) https://fluxlab.pl${p.href}`),
            uwagi ? `\nUwagi: ${uwagi}` : "",
          ].join("\n"),
          landing_page: "/koszyk",
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || "Nie udało się wysłać. Napisz na pawel@fluxlab.pl.");
      zglosZdarzenie("koszyk_wyslany");
      setWyslane(koszyk);
      wyczysc();
      setStan("wyslane");
    } catch (err) {
      setBlad((err as Error).message);
      setStan("");
    }
  }

  if (stan === "wyslane")
    return (
      <div className="mt-10 max-w-2xl rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Zapytanie wysłane</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Wycenę {wyslane.length === 1 ? "wybranej pozycji" : `${wyslane.length} wybranych pozycji`} wyślemy na {email}. Potwierdzenie przyjęcia zgłoszenia jest już w Twojej skrzynce.
        </p>
      </div>
    );

  if (!koszyk.length)
    return (
      <div className="mt-10 max-w-2xl rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-white/15">
        <p className="font-semibold text-gray-900 dark:text-white">Koszyk jest pusty</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          W cenniku przy każdej usłudze, abonamencie i dodatku jest przycisk dodania do koszyka.
        </p>
        <Link href="/produkty" className="btn-primary mt-5 inline-flex">
          Przejdź do cennika
        </Link>
      </div>
    );

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_24rem]">
      <div>
        {RODZAJE.map(({ klucz, nazwa }) => {
          const lista = koszyk.filter((p) => p.rodzaj === klucz);
          if (!lista.length) return null;
          return (
            <section key={klucz} className="mb-8">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{nazwa}</h2>
              <ul className="mt-3 divide-y divide-gray-100 rounded-2xl border border-gray-200 dark:divide-white/5 dark:border-white/10">
                {lista.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 px-5 py-4">
                    <Link href={p.href} className="min-w-0 flex-1 font-medium text-gray-900 hover:text-accent dark:text-white">
                      {p.nazwa}
                    </Link>
                    <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">{p.cena}</span>
                    <button
                      type="button"
                      onClick={() => usun(p.id)}
                      aria-label={`Usuń z koszyka: ${p.nazwa}`}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-gray-400 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ceny to najniższe pakiety netto z cennika. Ostateczną kwotę podamy po przejrzeniu całego zestawu.{" "}
          <Link href="/produkty" className="font-medium text-accent hover:underline">
            Dodaj kolejne pozycje
          </Link>
        </p>
      </div>
      <form onSubmit={wyslij} className="h-fit rounded-2xl border border-gray-200 p-6 dark:border-white/10 lg:sticky lg:top-24">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">Wyślij zapytanie o wycenę</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {koszyk.length === 1 ? "1 pozycja" : `${koszyk.length} pozycji`} w koszyku, bez zobowiązań.
        </p>
        <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          E-mail
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Firma lub strona
          <input
            type="text"
            autoComplete="organization"
            value={firma}
            onChange={(e) => setFirma(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <label className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Uwagi
          <textarea
            rows={3}
            value={uwagi}
            onChange={(e) => setUwagi(e.target.value)}
            placeholder="Na przykład: CRM to Pipedrive, start od przyszłego miesiąca"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:border-accent focus:outline-none dark:border-white/15 dark:bg-gray-900 dark:text-white"
          />
        </label>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={pulapka}
          onChange={(e) => setPulapka(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button type="submit" disabled={stan === "wysylamy"} className="btn-primary mt-5 w-full disabled:opacity-60">
          {stan === "wysylamy" ? "Wysyłamy…" : "Wyślij zapytanie"}
        </button>
        {blad && (
          <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
    </div>
  );
}
