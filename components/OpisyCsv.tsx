"use client";

import { useRef, useState } from "react";

type Przyklad = { nazwa: string; opis_krotki: string; meta_title: string; meta_description: string };
type Wynik = { wyslano: boolean; email: string; liczba: number; przyklady: Przyklad[]; csv: string };

const POLE =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white";

export default function OpisyCsv() {
  const [email, setEmail] = useState("");
  const [plik, setPlik] = useState<File | null>(null);
  const [laduje, setLaduje] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const wejscie = useRef<HTMLInputElement>(null);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    if (!plik || laduje) return;
    setLaduje(true);
    setBlad("");
    try {
      const f = new FormData();
      f.set("email", email);
      f.set("plik", plik);
      const r = await fetch("/api/opisy-csv", { method: "POST", body: f });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error(d.error || "Coś poszło nie tak. Spróbuj ponownie.");
      setWynik(d);
    } catch (err) {
      setBlad((err as Error).message);
    } finally {
      setLaduje(false);
    }
  }

  function pobierz() {
    if (!wynik) return;
    const bajty = Uint8Array.from(atob(wynik.csv), (c) => c.charCodeAt(0));
    const url = URL.createObjectURL(new Blob([bajty], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "opisy-produktow.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  if (wynik) {
    return (
      <div className="rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Gotowe: {wynik.liczba} {wynik.liczba === 1 ? "opis" : "opisów"}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {wynik.wyslano
            ? `Plik z opisami wysłaliśmy na adres ${wynik.email}. Możesz też pobrać go stąd.`
            : "Nie udało się wysłać maila, dlatego pobierz plik stąd."}
        </p>
        <div className="mt-5 space-y-4">
          {wynik.przyklady.map((p) => (
            <div key={p.nazwa} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white">{p.nazwa}</p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{p.opis_krotki}</p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {p.meta_title}
                <br />
                {p.meta_description}
              </p>
            </div>
          ))}
        </div>
        <button type="button" onClick={pobierz} className="btn-primary mt-6 w-full sm:w-auto">
          Pobierz plik CSV
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50 md:p-8">
      <h2 className="sr-only text-xl font-bold text-gray-900 dark:text-white sm:not-sr-only">
        Wgraj plik z produktami
      </h2>
      <form onSubmit={wyslij} className="flex flex-col gap-3 sm:mt-5">
        <input
          ref={wejscie}
          type="file"
          accept=".csv,text/csv"
          required
          onChange={(e) => setPlik(e.target.files?.[0] ?? null)}
          aria-label="Plik CSV z nazwami i cechami produktów"
          className={`${POLE} file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold dark:file:bg-gray-800`}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@adres.pl"
          aria-label="Adres e-mail, na który wyślemy wynik"
          autoComplete="email"
          className={POLE}
        />
        <button type="submit" disabled={laduje || !plik} className="btn-primary disabled:opacity-60">
          {laduje ? "Piszemy opisy, to potrwa do minuty…" : "Napisz opisy"}
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Do 25 produktów w pliku, jeden plik na adres w ciągu 30 dni. Wynik wyślemy na podany adres i pokażemy tutaj.{" "}
          <a href="/przyklad-opisy-produktow.csv" download className="underline">
            Pobierz przykładowy plik
          </a>
          .
        </p>
        {blad && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
    </div>
  );
}
