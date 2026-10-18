"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Stan = "spoczynek" | "laduje" | "gotowe" | "blad";

const MAX_ZNAKOW = 12000;

function pobierzTekst(): string {
  const korzen =
    document.querySelector("article") ?? document.querySelector("main");
  if (!korzen) return "";
  const kopia = korzen.cloneNode(true) as HTMLElement;
  kopia
    .querySelectorAll("nav, script, style, [data-streszczenie]")
    .forEach((el) => el.remove());
  return (kopia.textContent ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_ZNAKOW);
}

export default function StreszczenieAI() {
  const sciezka = usePathname();
  const jestArtykulem = /^\/strefa-wiedzy\/[^/]+\/?$/.test(sciezka ?? "");
  const [stan, setStan] = useState<Stan>("spoczynek");
  const [punkty, setPunkty] = useState<string[]>([]);
  const [widoczne, setWidoczne] = useState(0);
  const timery = useRef<ReturnType<typeof setTimeout>[]>([]);

  const klucz = `streszczenie:${sciezka}`;

  function pokaz(lista: string[]) {
    timery.current.forEach(clearTimeout);
    timery.current = [];
    setPunkty(lista);
    setWidoczne(0);
    setStan("gotowe");
    lista.forEach((_, i) => {
      timery.current.push(setTimeout(() => setWidoczne(i + 1), 150 * (i + 1)));
    });
  }

  useEffect(() => {
    const t = timery.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    timery.current.forEach(clearTimeout);
    timery.current = [];
    setStan("spoczynek");
    setPunkty([]);
    setWidoczne(0);
  }, [sciezka]);

  if (!jestArtykulem) return null;

  async function streszcz() {
    if (stan === "laduje") return;
    try {
      const zapis = sessionStorage.getItem(klucz);
      if (zapis) {
        const lista = JSON.parse(zapis);
        if (Array.isArray(lista) && lista.length === 3) {
          pokaz(lista);
          return;
        }
      }
    } catch {}
    setStan("laduje");
    try {
      const res = await fetch("/api/streszczenie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tytul: document.querySelector("h1")?.textContent?.trim() ?? "",
          tekst: pobierzTekst(),
        }),
      });
      const dane = await res.json();
      if (!res.ok || !Array.isArray(dane.punkty)) throw new Error();
      try {
        sessionStorage.setItem(klucz, JSON.stringify(dane.punkty));
      } catch {}
      pokaz(dane.punkty);
    } catch {
      setStan("blad");
    }
  }

  return (
    <div
      data-streszczenie
      className="container-wide max-w-3xl mx-auto mt-6 text-center"
    >
      <button
        type="button"
        onClick={streszcz}
        disabled={stan === "laduje"}
        className="btn-secondary rounded-full inline-flex items-center gap-2 disabled:opacity-70"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M12 2l1.9 5.6a3 3 0 001.9 1.9L21.5 11.5l-5.7 2a3 3 0 00-1.9 1.9L12 21l-1.9-5.6a3 3 0 00-1.9-1.9L2.5 11.5l5.7-2a3 3 0 001.9-1.9L12 2z" />
          <path d="M19 2l.7 2.1a1.5 1.5 0 00.9.9L22.7 6l-2.1.7a1.5 1.5 0 00-.9.9L19 9.7l-.7-2.1a1.5 1.5 0 00-.9-.9L15.3 6l2.1-.7a1.5 1.5 0 00.9-.9L19 2z" />
        </svg>
        {stan === "laduje" ? "Streszczamy..." : "Streść w 3 punktach"}
      </button>

      <div aria-live="polite">
        {stan === "laduje" && (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-left space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-accent/20" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-accent/20" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-accent/20" />
          </div>
        )}
        {stan === "blad" && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Nie udało się przygotować streszczenia. Spróbuj za chwilę.
          </p>
        )}
        {stan === "gotowe" && (
          <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/5 p-5 text-left">
            <ol className="space-y-3">
              {punkty.map((p, i) => (
                <li
                  key={i}
                  className={`flex gap-3 text-gray-700 dark:text-gray-300 leading-relaxed transition duration-300 ${
                    widoczne > i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-solid text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <p
              className={`mt-4 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 ${
                widoczne >= punkty.length ? "opacity-100" : "opacity-0"
              }`}
            >
              Streszczenie przygotowało AI na podstawie tego artykułu.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
