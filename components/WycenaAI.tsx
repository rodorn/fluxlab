"use client";

import { useState } from "react";
import Link from "next/link";
import { event as gaEvent } from "@/lib/gtag";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Pozycja = { nazwa: string; cena: string; href: string; opis: string };
type Wynik = { pozycje: Pozycja[]; komentarz: string; rozmowa: boolean };

const PRZYKLADY = [
  "Formularz ze strony ma trafiać do CRM",
  "Strona dla gabinetu z rezerwacją",
  "Faktury z maili ręcznie przepisujemy do arkusza",
];

export default function WycenaAI() {
  const [opis, setOpis] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [laduje, setLaduje] = useState(false);

  async function wycen(tekst: string) {
    setLaduje(true);
    setBlad("");
    setWynik(null);
    gaEvent("wycena_ai", { dlugosc: tekst.length });
    zglosZdarzenie("wycena_ai");
    try {
      const r = await fetch("/api/wycena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opis: tekst }),
      });
      const j = await r.json();
      if (!r.ok) setBlad(j.error ?? "Coś poszło nie tak, spróbuj ponownie.");
      else setWynik(j);
    } catch {
      setBlad("Brak połączenia, spróbuj ponownie.");
    } finally {
      setLaduje(false);
    }
  }

  const doKontaktu = (forma: string) =>
    `/kontakt?forma=${forma}&opis=${encodeURIComponent(opis)}&utm_source=wycena_ai`;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-gray-900 sm:p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (opis.trim()) wycen(opis.trim());
        }}
      >
        <label
          htmlFor="wycena-opis"
          className="block text-base font-semibold text-gray-900 dark:text-white"
        >
          Napisz, czego potrzebujesz, AI dobierze usługę i cenę
        </label>
        <textarea
          id="wycena-opis"
          rows={3}
          maxLength={1000}
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          placeholder="Np. klienci piszą przez formularz i maila, a my ręcznie przepisujemy to do Excela."
          className="mt-3 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/15 dark:bg-gray-950 dark:text-white"
        />
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {PRZYKLADY.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setOpis(p);
                wycen(p);
              }}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 hover:border-accent hover:text-accent dark:border-white/10 dark:text-gray-400"
            >
              {p}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={laduje || !opis.trim()}
          className="btn-primary mt-4 w-full disabled:opacity-60"
        >
          {laduje ? "AI dobiera usługę..." : "Wyceń"}
        </button>
      </form>

      <div aria-live="polite">
        {blad && (
          <p className="mt-4 text-center text-sm text-red-600">{blad}</p>
        )}
        {wynik && (
          <div className="mt-5 text-left">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.komentarz}
            </p>
            {wynik.pozycje.length > 0 && (
              <ul className="mt-4 space-y-2">
                {wynik.pozycje.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:border-accent dark:border-white/10"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                          {p.nazwa}
                        </span>
                        <span className="block text-xs text-gray-500 dark:text-gray-400">
                          {p.opis}
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-sm font-bold text-accent">
                        {p.cena}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {wynik.rozmowa
                ? "Tu najlepiej sprawdzi się krótka rozmowa. Po niej dostajesz stałą cenę."
                : "Cenę potwierdzamy po krótkiej rozmowie albo mailu."}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                href={doKontaktu("meet")}
                className="btn-primary text-center"
              >
                Umów 30 min w Google Meet
              </Link>
              <Link
                href={doKontaktu("email")}
                className="btn-secondary text-center"
              >
                Wyślij opis mailem
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
