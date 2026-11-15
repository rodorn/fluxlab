"use client";

import { useState } from "react";

type Wiersz = {
  nip: string;
  nazwa: string;
  krs: string;
  adres: string;
  status: string;
  opis: string;
};
type Wynik = { wiersze: Wiersz[]; odrzucone: string[]; wyslano: boolean };

const PRZYKLAD = "5260250995\n5252344078\n7740001454";

const pole =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

function pobierzCsv(wiersze: Wiersz[]) {
  const k = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const linie = [
    ["NIP", "Nazwa", "KRS", "Adres do e-Doręczeń", "Status"].map(k).join(";"),
  ];
  for (const w of wiersze)
    linie.push([w.nip, w.nazwa, w.krs, w.adres, w.opis].map(k).join(";"));
  const blob = new Blob(["﻿" + linie.join("\r\n") + "\r\n"], {
    type: "text/csv;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "adresy-do-edoreczen.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function AdresyEDoreczenForm() {
  const [lista, setLista] = useState("");
  const [email, setEmail] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [trwa, setTrwa] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setBlad("");
    setWynik(null);
    setTrwa(true);
    try {
      const r = await fetch("/api/adresy-edoreczen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lista, zgoda }),
      });
      const d = await r.json();
      if (!r.ok) setBlad(d.error ?? "Coś poszło nie tak. Spróbuj za chwilę.");
      else setWynik(d);
    } catch {
      setBlad("Brak połączenia. Spróbuj za chwilę.");
    } finally {
      setTrwa(false);
    }
  }

  async function wczytajPlik(f: File | undefined) {
    if (!f) return;
    setLista((await f.text()).slice(0, 20000));
  }

  const jest = wynik?.wiersze.filter((w) => w.status === "jest").length ?? 0;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź listę firm
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wklej do 50 numerów NIP albo wgraj plik CSV. Wynik zobaczysz tutaj i
        dostaniesz mailem razem z plikiem do Excela.
      </p>
      <form onSubmit={wyslij} className="mt-5 space-y-3">
        <label
          className="block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="ade-lista"
        >
          Numery NIP
        </label>
        <textarea
          id="ade-lista"
          value={lista}
          onChange={(e) => setLista(e.target.value)}
          rows={6}
          placeholder={
            "Jeden NIP w wierszu, albo po przecinku:\n5260250995\n5252344078"
          }
          className={pole}
          required
        />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <button
            type="button"
            className="font-semibold text-accent hover:underline"
            onClick={() => setLista(PRZYKLAD)}
          >
            Wstaw przykład
          </button>
          <label className="cursor-pointer font-semibold text-accent hover:underline">
            Wgraj plik CSV lub TXT
            <input
              type="file"
              accept=".csv,.txt,text/csv,text/plain"
              className="sr-only"
              onChange={(e) => wczytajPlik(e.target.files?.[0])}
            />
          </label>
        </div>
        <label
          className="block pt-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="ade-mail"
        >
          Adres e-mail, na który wyślemy wynik
        </label>
        <input
          id="ade-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twoj@adres.pl"
          autoComplete="email"
          className={pole}
          required
        />
        <label className="flex items-start gap-3 text-xs text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={zgoda}
            onChange={(e) => setZgoda(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-indigo-600"
            required
          />
          <span>
            Zgadzam się na przesłanie wyniku na podany adres oraz na jedną
            wiadomość z poradami o e-Doręczeniach od FluxLab. Zgodę wycofasz
            jednym kliknięciem w link „Wypisz mnie” w wiadomości.
          </span>
        </label>
        <button
          type="submit"
          disabled={trwa}
          className="btn-primary w-full disabled:opacity-50 sm:w-auto"
        >
          {trwa ? "Sprawdzamy rejestry…" : "Pobierz adresy"}
        </button>
        {trwa && (
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Przy 50 firmach trwa to do minuty.
          </p>
        )}
      </form>

      {blad && (
        <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}

      {wynik && (
        <div className="mt-6">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Adres do e-Doręczeń ma {jest} z {wynik.wiersze.length} firm
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {wynik.wyslano
              ? "Wynik z plikiem CSV wysłaliśmy na podany adres."
              : "Nie udało się wysłać maila, więc pobierz plik poniżej."}
            {wynik.odrzucone.length > 0 &&
              ` Pominięte numery o złej długości: ${wynik.odrzucone.join(", ")}.`}
          </p>
          <button
            type="button"
            onClick={() => pobierzCsv(wynik.wiersze)}
            className="btn-secondary mt-3"
          >
            Pobierz plik CSV
          </button>
          <ul className="mt-4 divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60">
            {wynik.wiersze.map((w) => (
              <li key={w.nip} className="p-3 text-sm">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {w.nazwa || `NIP ${w.nip}`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  NIP {w.nip}
                  {w.krs && ` · KRS ${w.krs}`}
                </p>
                <p
                  className={`mt-1 break-all ${w.adres ? "font-semibold text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"}`}
                >
                  {w.adres || w.opis}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
