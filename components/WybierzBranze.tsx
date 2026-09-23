"use client";

import Link from "next/link";
import { useState } from "react";

import { BRANZE, DANE, type Branza, type Dane } from "@/lib/branze";
import { CATEGORY_LABEL } from "@/lib/products";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Wybór branży, jeden komponent na dwa miejsca.
 *
 * Powstał z dwóch powodów naraz. Po pierwsze, cztery strony branżowe nie
 * miały ani jednego odnośnika z serwisu, więc wyszukiwarka znała je z mapy
 * strony, ale nie dostawały nic z siły pozostałych podstron. Po drugie,
 * pomiar pokazał, że ludzie otwierają strony narzędzi i nie naciskają na nich
 * niczego, więc pierwszy element do kliknięcia musi być pod nosem i nie może
 * wymagać wpisywania czegokolwiek.
 *
 * Pierwszego powodu wersja z 21 września nie załatwiła, co widać było dopiero
 * w pomiarze grafu linków liczonym z wyrenderowanego HTML: jedyny odnośnik do
 * strony branżowej stał wewnątrz panelu wyniku, czyli powstawał dopiero po
 * kliknięciu. Dla kogoś, kto strony nie klika, a to dotyczy także robotów,
 * tych odnośników nie było. Stąd lista pod przyciskami, zawsze obecna w
 * źródle, niezależnie od tego, czy ktokolwiek cokolwiek nacisnął.
 *
 * Wariant "filar" dokłada drugie kliknięcie, o tym gdzie żyją dane, bo dopiero
 * ono pozwala odpowiedzieć „tego jeszcze nie automatyzujcie”. Na stronie
 * głównej go nie ma, żeby nie robić z niej drugiej strony filarowej.
 */

type Props = {
  /** "glowna" to pasek sekcji na całą szerokość, "filar" to karta w treści. */
  wariant?: "glowna" | "filar";
};

export default function WybierzBranze({ wariant = "glowna" }: Props) {
  const [wybrana, setWybrana] = useState<string | null>(null);
  const [dane, setDane] = useState<Dane | null>(null);
  const b: Branza | null = BRANZE.find((x) => x.klucz === wybrana) ?? null;
  const filar = wariant === "filar";

  const wybierz = (x: Branza) => {
    const aktywna = x.klucz === wybrana;
    const nowa = aktywna ? null : x.klucz;
    setWybrana(nowa);
    setDane(null);
    if (nowa) zglosZdarzenie(`branza_${x.klucz}`);
  };

  const listaLinkow = (
    <p
      className={`mt-4 text-sm ${
        filar
          ? "text-gray-600 dark:text-gray-400"
          : "text-gray-600 dark:text-white/60"
      }`}
    >
      Osobna strona o każdej branży:{" "}
      {BRANZE.map((x, i) => (
        <span key={x.klucz}>
          {i > 0 && ", "}
          <Link href={x.href} className="text-accent hover:underline">
            {x.nazwa.toLowerCase()}
          </Link>
        </span>
      ))}
      .
    </p>
  );

  const przyciski = (
    <div className="mt-6 flex flex-wrap gap-2">
      {BRANZE.map((x) => {
        const aktywna = x.klucz === wybrana;
        return (
          <button
            key={x.klucz}
            type="button"
            aria-pressed={aktywna}
            onClick={() => wybierz(x)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              aktywna
                ? "border-accent bg-accent-solid text-white"
                : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {x.nazwa}
          </button>
        );
      })}
    </div>
  );

  const wynikGlowna = b && (
    <div className="mt-6 max-w-3xl rounded-2xl border border-gray-200 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        Co najczęściej zjada czas w tej branży
      </p>
      <ul className="mt-3 space-y-2">
        {b.problemy.map((p) => (
          <li
            key={p}
            className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <span aria-hidden="true" className="text-accent">
              •
            </span>
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Systemy, z którymi to spinamy: {b.systemy}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          href={b.href}
          onClick={() => zglosZdarzenie(`branza_przejscie_${b.klucz}`)}
          className="group inline-flex items-center gap-1.5 font-semibold text-accent hover:underline"
        >
          Zobacz, jak to rozwiązuję
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <Link
          href={b.narzedzie.href}
          className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
        >
          {b.narzedzie.label} →
        </Link>
      </div>
    </div>
  );

  const wynikFilar = b && (
    <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 lg:p-6 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {b.nazwa}
        </h3>
        <span className="rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300">
          {CATEGORY_LABEL[b.filar]}
        </span>
      </div>

      <dl className="mt-4 space-y-4 text-sm leading-relaxed">
        <div>
          <dt className="font-semibold text-gray-900 dark:text-white">
            Co tu zjada czas
          </dt>
          <dd className="mt-1 text-gray-700 dark:text-gray-300">{b.czas}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-white">
            Policz to sam, bez naszego udziału
          </dt>
          <dd className="mt-1 text-gray-700 dark:text-gray-300">{b.policz}</dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-900 dark:text-white">
            Co z tym robimy
          </dt>
          <dd className="mt-1 text-gray-700 dark:text-gray-300">{b.robie}</dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          Gdzie dziś żyją dane z tego procesu?
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DANE.map((d) => {
            const aktywne = dane?.klucz === d.klucz;
            return (
              <button
                key={d.klucz}
                type="button"
                aria-pressed={aktywne}
                onClick={() => {
                  setDane(d);
                  zglosZdarzenie(`branza_dane_${d.klucz}`);
                }}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                  aktywne
                    ? "border-accent bg-accent-solid text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:text-accent"
                }`}
              >
                {d.nazwa}
              </button>
            );
          })}
        </div>
      </div>

      {dane && (
        <div
          className={`mt-5 rounded-xl border p-5 ${
            dane.warto
              ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              dane.warto
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-amber-700 dark:text-amber-400"
            }`}
          >
            {dane.warto
              ? `${b.nazwa}, dane ${dane.nazwa.toLowerCase()}: jest z czego zbudować`
              : `${b.nazwa}, dane ${dane.nazwa.toLowerCase()}: najpierw uporządkujcie dane`}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {dane.werdykt}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {dane.koszt}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          href={b.href}
          onClick={() => zglosZdarzenie(`branza_przejscie_${b.klucz}`)}
          className="font-semibold text-accent hover:underline"
        >
          {b.hrefLabel} →
        </Link>
        <Link
          href={b.narzedzie.href}
          className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
        >
          {b.narzedzie.label} →
        </Link>
        <Link
          href="/kontakt"
          className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
        >
          Opisz swój proces, odpowiem co da się z nim zrobić →
        </Link>
      </div>
    </div>
  );

  const naglowek = (
    <>
      {filar && <span className="section-label">Za darmo, bez wpisywania</span>}
      <h2
        id="wybor-branzy"
        className={
          filar
            ? "display-md mt-3 text-gray-900 dark:text-white"
            : "text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90 lg:text-2xl"
        }
      >
        {filar ? "Co zjada czas w Waszej branży?" : "Z jakiej branży jesteś?"}
      </h2>
      <p
        className={`mt-2 max-w-3xl text-sm ${
          filar
            ? "text-gray-600 dark:text-gray-400"
            : "text-gray-600 dark:text-white/60"
        }`}
      >
        {filar
          ? "Naciśnij branżę, a pokażemy, która czynność pochłania w niej najwięcej powtarzalnej pracy, jak to policzyć u siebie jeszcze dzisiaj i co z tym robimy. Drugie kliknięcie, o tym gdzie trzymacie dane, decyduje, czy w ogóle jest co automatyzować."
          : "Kliknij, a pokażemy, co w tej branży najczęściej zjada czas i co da się z tym zrobić. Bez formularza i bez podawania czegokolwiek."}
      </p>
    </>
  );

  if (filar) {
    return (
      <section
        aria-labelledby="wybor-branzy"
        className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-800/60"
      >
        {naglowek}
        {przyciski}
        {listaLinkow}
        {wynikFilar}
      </section>
    );
  }

  return (
    <section
      aria-labelledby="wybor-branzy"
      className="relative z-20 border-t border-gray-200 px-6 py-12 dark:border-white/10 lg:px-10 lg:py-16"
    >
      {naglowek}
      {przyciski}
      {listaLinkow}
      {wynikGlowna}
    </section>
  );
}
