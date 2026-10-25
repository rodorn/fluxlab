"use client";

import { useEffect, useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

type Pozycja = { waga: string; tytul: string };

const KOLEJNOSC = ["krytyczne", "wazne", "drobne"];

/**
 * Blok pod wynikiem audytu. Przenosi wynik i główne problemy do formularza
 * kontaktu, żeby nie trzeba było ich przepisywać.
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
  const hrefProsba = `/kontakt?opis=${encodeURIComponent(opis)}#kontakt`;

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
      <a
        href={hrefProsba}
        onClick={() => zglosZdarzenie("klik_po_wyniku")}
        className="btn-primary mt-4"
      >
        Wyślij wynik do wyceny
      </a>
    </div>
  );
}
