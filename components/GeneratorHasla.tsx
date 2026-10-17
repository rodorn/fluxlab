"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Wynik = {
  domena: string;
  haslo: string;
  podtytul: string;
  cta: string;
  alternatywy: string[];
};

function ustawWartosc(
  el: HTMLInputElement | HTMLTextAreaElement,
  wartosc: string,
) {
  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, wartosc);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

export default function GeneratorHasla() {
  const [opis, setOpis] = useState("");
  const [ladowanie, setLadowanie] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [haslo, setHaslo] = useState("");
  const [widoczne, setWidoczne] = useState(true);

  async function generuj(e: React.FormEvent) {
    e.preventDefault();
    if (ladowanie) return;
    const tekst = opis.trim();
    if (tekst.length < 10) {
      setBlad("Napisz o firmie choć jedno krótkie zdanie (min. 10 znaków).");
      return;
    }
    setBlad("");
    setLadowanie(true);
    zglosZdarzenie("generator_hasla");
    try {
      const res = await fetch("/api/generator-hasla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ opis: tekst }),
      });
      const dane = await res.json().catch(() => ({}));
      if (!res.ok) {
        setBlad(dane.error || "Coś poszło nie tak. Spróbuj jeszcze raz.");
        return;
      }
      setWynik(dane as Wynik);
      setHaslo((dane as Wynik).haslo);
      setWidoczne(true);
    } catch {
      setBlad("Brak połączenia. Spróbuj jeszcze raz.");
    } finally {
      setLadowanie(false);
    }
  }

  function wybierz(nowe: string) {
    if (nowe === haslo) return;
    setWidoczne(false);
    window.setTimeout(() => {
      setHaslo(nowe);
      setWidoczne(true);
    }, 180);
  }

  function chceTaka() {
    const kontakt = document.getElementById("kontakt");
    kontakt?.scrollIntoView({ behavior: "smooth", block: "start" });
    const msg = document.getElementById("message") as HTMLTextAreaElement | null;
    if (msg) {
      ustawWartosc(
        msg,
        `Opis firmy: ${opis.trim()}. Podobało mi się hasło: ${haslo}`,
      );
    }
    window.setTimeout(() => {
      (document.getElementById("email") as HTMLInputElement | null)?.focus({
        preventScroll: true,
      });
    }, 600);
  }

  const alternatywy = wynik
    ? [wynik.haslo, ...wynik.alternatywy].filter((h) => h !== haslo)
    : [];

  return (
    <section
      id="generator-hasla"
      aria-labelledby="generator-hasla-heading"
      className="scroll-mt-20 container-wide"
    >
      <div className="mx-auto max-w-4xl py-10 lg:py-12">
        <h2 id="generator-hasla-heading" className="h2-sekcji mb-3 text-center">
          Zobacz hasło na swojej stronie
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Napisz, czym zajmuje się firma. Pokażemy, jak mogłoby wyglądać górne
          okno Twojej nowej strony.
        </p>

        <form
          onSubmit={generuj}
          className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="gh-opis" className="sr-only">
            Opis firmy
          </label>
          <input
            id="gh-opis"
            type="text"
            value={opis}
            maxLength={300}
            onChange={(e) => setOpis(e.target.value)}
            placeholder="np. Warsztat samochodowy w Lublinie, naprawy powypadkowe"
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
          <button
            type="submit"
            disabled={ladowanie}
            className="btn-primary disabled:opacity-60"
          >
            {ladowanie ? "Piszemy..." : "Pokaż moją stronę"}
          </button>
        </form>
        {blad && (
          <p role="alert" className="mt-3 text-center text-sm text-red-600 dark:text-red-400">
            {blad}
          </p>
        )}

        {(ladowanie || wynik) && (
          <div className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-800/60">
                <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-xs text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                  {ladowanie || !wynik ? (
                    <span className="inline-block h-3 w-32 animate-pulse rounded bg-gray-200 align-middle dark:bg-gray-700" />
                  ) : (
                    wynik.domena
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-b from-accent/10 to-transparent px-6 py-14 text-center sm:px-12 sm:py-20">
                {ladowanie || !wynik ? (
                  <div
                    className="mx-auto flex max-w-xl flex-col items-center gap-4"
                    aria-label="Generowanie podglądu"
                    role="status"
                  >
                    <div className="h-8 w-4/5 animate-pulse rounded bg-gray-300/70 dark:bg-gray-700" />
                    <div className="h-8 w-3/5 animate-pulse rounded bg-gray-300/70 dark:bg-gray-700" />
                    <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                    <div className="mt-4 h-11 w-40 animate-pulse rounded-xl bg-gray-300/70 dark:bg-gray-700" />
                  </div>
                ) : (
                  <>
                    <h3
                      className={`mx-auto max-w-2xl text-3xl font-bold leading-tight tracking-tight text-gray-900 transition-all duration-300 dark:text-white sm:text-5xl ${
                        widoczne
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      {haslo}
                    </h3>
                    <p className="mx-auto mt-5 max-w-xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
                      {wynik.podtytul}
                    </p>
                    <span className="mt-8 inline-block rounded-xl bg-accent-solid px-6 py-3 text-sm font-semibold text-white">
                      {wynik.cta}
                    </span>
                  </>
                )}
              </div>
            </div>

            {wynik && !ladowanie && (
              <>
                <div className="mt-6 text-center">
                  <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                    Inne propozycje, kliknij, żeby podmienić:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {alternatywy.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => wybierz(h)}
                        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 transition hover:border-accent hover:text-accent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button type="button" onClick={chceTaka} className="btn-primary">
                    Chcę taką stronę
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
