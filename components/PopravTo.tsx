"use client";

import { useEffect, useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

type Pozycja = { waga: string; tytul: string };

const KOLEJNOSC = ["krytyczne", "wazne", "drobne"];

/**
 * Blok pod wynikiem audytu. Przenosi listę problemów do formularza na tej
 * samej stronie, żeby nie trzeba było jej przepisywać.
 */
export default function PopravTo({
  domena,
  punkty,
  pozycje,
}: {
  domena: string;
  punkty?: number | null;
  pozycje: Pozycja[];
}) {
  const [widoczny, setWidoczny] = useState(false);
  const [wstawiono, setWstawiono] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setWidoczny(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  if (!pozycje.length) return null;

  const glowne = pozycje
    .slice()
    .sort((a, b) => KOLEJNOSC.indexOf(a.waga) - KOLEJNOSC.indexOf(b.waga))
    .slice(0, 3)
    .map((u) => u.tytul.replace(/\s+/g, " ").trim());
  const opis = `Audyt ${domena}${typeof punkty === "number" ? `, wynik ${punkty}/100` : ""}. Główne problemy: ${glowne.join("; ")}.`.slice(0, 400);
  const hrefProsba = `/?opis=${encodeURIComponent(opis)}#kontakt`;

  function wstaw() {
    zglosZdarzenie("audyt_do_formularza");
    const ostrzezenia = pozycje.filter((u) => u.waga !== "drobne");
    const lista = (ostrzezenia.length ? ostrzezenia : pozycje)
      .slice()
      .sort((a, b) => KOLEJNOSC.indexOf(a.waga) - KOLEJNOSC.indexOf(b.waga))
      .slice(0, 8);
    const tekst = [
      `Audyt strony ${domena}. Proszę o wycenę poprawek:`,
      ...lista.map((u) => `- ${u.tytul.replace(/\s+/g, " ").trim()}`),
    ].join("\n");

    const pole = document.getElementById("message") as HTMLTextAreaElement | null;
    if (pole) {
      const ustaw = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value",
      )?.set;
      if (ustaw) ustaw.call(pole, tekst);
      else pole.value = tekst;
      pole.dispatchEvent(new Event("input", { bubbles: true }));
      pole.rows = Math.max(pole.rows, Math.min(lista.length + 2, 10));
      pole.closest("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setWstawiono(true);
    window.setTimeout(() => document.getElementById("email")?.focus({ preventScroll: true }), 600);
  }

  return (
    <div
      className={`rounded-2xl border border-accent/40 bg-accent/5 p-6 text-center transition-all duration-700 ease-out ${
        widoczny ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Popraw to za mnie
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-700 dark:text-gray-300">
        Wyślij wynik, odpiszemy z ceną poprawek, tego samego dnia.
      </p>
      <button
        type="button"
        onClick={wstaw}
        className="btn-primary mt-4"
      >
        {wstawiono ? "Wynik jest w formularzu" : "Wyślij wynik do wyceny"}
      </button>
      <a
        href={hrefProsba}
        onClick={() => zglosZdarzenie("audyt_popros_o_poprawki")}
        className="mt-3 block text-sm font-medium text-accent hover:underline"
      >
        Poproś o poprawki
      </a>
    </div>
  );
}
