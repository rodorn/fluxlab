"use client";

import Link from "next/link";
import { useState } from "react";

import {
  LINKI_POWIAZANE,
  STANY,
  ZMIANY,
  ocenStrone,
  type Stan,
  type Zmiana,
} from "@/lib/stan-strony";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Sprawdzenie "poprawiac czy budowac", na filarze Systemy i strony.
 *
 * Trzecie narzedzie zbudowane na tym samym wzorcu co wybor branzy i "czy da
 * sie to spiac": pierwsze klikniecie daje juz odpowiedz, drugie dokleda
 * werdykt i pozycje z katalogu z cena. Bez wpisywania i bez rejestracji.
 *
 * Odnosniki do stron uslugowych stoja pod przyciskami na stale, a nie tylko w
 * panelu wyniku, zeby byly w zrodle HTML takze dla kogos, kto niczego nie
 * nacisnal.
 */

const KOLOR: Record<number, { ramka: string; tlo: string; tekst: string }> = {
  1: {
    ramka: "border-emerald-500/40",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-300",
  },
  2: {
    ramka: "border-amber-500/40",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-300",
  },
  3: {
    ramka: "border-rose-500/40",
    tlo: "bg-rose-50 dark:bg-rose-950/30",
    tekst: "text-rose-700 dark:text-rose-300",
  },
};

const PRZYCISK =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors";
const AKTYWNY = "border-accent bg-accent-solid text-white";
const NIEAKTYWNY =
  "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300";

/** Adres strony, na ktorej stoi komponent. Odnosnik do niej samej nie ma
 *  sensu, wiec w takim wypadku pozycja katalogu pokazuje sie bez linku. */
type Props = { biezacaStrona?: string };

export default function CoZeStrona({ biezacaStrona }: Props) {
  const [kluczStanu, setKluczStanu] = useState<string | null>(null);
  const [kluczZmiany, setKluczZmiany] = useState<string | null>(null);

  const stan: Stan | null = STANY.find((s) => s.klucz === kluczStanu) ?? null;
  const zmiana: Zmiana | null =
    ZMIANY.find((z) => z.klucz === kluczZmiany) ?? null;
  const werdykt = stan && zmiana ? ocenStrone(stan, zmiana) : null;

  const wybierzStan = (s: Stan) => {
    const nowy = s.klucz === kluczStanu ? null : s.klucz;
    setKluczStanu(nowy);
    // Zmiana stanu nie kasuje celu: ktos porownujacy dwie drogi chce
    // przeklikac stany przy tej samej zmianie.
    if (nowy) zglosZdarzenie(`strona_stan_${s.klucz}`);
  };

  const wybierzZmiane = (z: Zmiana) => {
    const nowy = z.klucz === kluczZmiany ? null : z.klucz;
    setKluczZmiany(nowy);
    if (nowy) zglosZdarzenie(`strona_zmiana_${z.klucz}`);
  };

  const kolor = werdykt ? KOLOR[werdykt.poziom] : null;

  return (
    <section
      id="poprawiac-czy-budowac"
      aria-labelledby="stan-strony-heading"
      className="scroll-mt-20 rounded-3xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-800/80 dark:bg-gray-900/40 lg:p-8"
    >
      <h2
        id="stan-strony-heading"
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        Poprawiać czy budować od nowa
      </h2>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
        Naciśnij, co dziś stoi pod Waszym adresem. Napiszemy, co w takim miejscu
        da się zmienić bez przebudowy i gdzie kończy się poprawianie. Drugie
        naciśnięcie, o tym co ma się zmienić, dokłada ocenę całości. Bez
        wpisywania czegokolwiek i bez podawania adresu.
      </p>

      <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Co dziś stoi
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {STANY.map((s) => (
          <button
            key={s.klucz}
            type="button"
            aria-pressed={s.klucz === kluczStanu}
            onClick={() => wybierzStan(s)}
            className={`${PRZYCISK} ${
              s.klucz === kluczStanu ? AKTYWNY : NIEAKTYWNY
            }`}
          >
            {s.nazwa}
          </button>
        ))}
      </div>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Co ma się zmienić
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {ZMIANY.map((z) => (
          <button
            key={z.klucz}
            type="button"
            aria-pressed={z.klucz === kluczZmiany}
            onClick={() => wybierzZmiane(z)}
            className={`${PRZYCISK} ${
              z.klucz === kluczZmiany ? AKTYWNY : NIEAKTYWNY
            }`}
          >
            {z.nazwa}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {!stan ? (
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Naciśnij jedną z pozycji powyżej, żeby zobaczyć odpowiedź.
          </p>
        ) : (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-6 dark:border-gray-800 dark:bg-gray-950/40">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {stan.nazwa}
              {zmiana ? ` i cel: ${zmiana.nazwa}` : ""}
            </p>

            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                  Co da się zmienić bez przebudowy
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {stan.coDaSie}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                  Gdzie kończy się poprawianie
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {stan.ograniczenie}
                </dd>
              </div>
              {zmiana && (
                <>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      Jak się to robi
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {zmiana.jak}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      Czego ta zmiana nie załatwi
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {zmiana.czegoNieZalatwi}
                    </dd>
                  </div>
                </>
              )}
            </dl>

            <p className="mt-5 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                Co przygotować przed rozmową:{" "}
              </span>
              {stan.przygotowac}
            </p>

            {!zmiana ? (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                Naciśnij jeszcze, co ma się zmienić, a dopiszę ocenę całości.
              </p>
            ) : (
              werdykt &&
              kolor && (
                <div
                  className={`mt-5 rounded-xl border p-5 ${kolor.ramka} ${kolor.tlo}`}
                >
                  <p className={`text-base font-bold ${kolor.tekst}`}>
                    {werdykt.naglowek}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {werdykt.zdanie}
                  </p>
                  {werdykt.produkt && (
                    <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
                      Pozycja z katalogu, która to obsługuje:{" "}
                      {werdykt.produkt.href === biezacaStrona ? (
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {werdykt.produkt.nazwa}
                        </span>
                      ) : (
                        <Link
                          href={werdykt.produkt.href}
                          className="font-semibold text-accent hover:underline"
                        >
                          {werdykt.produkt.nazwa}
                        </Link>
                      )}
                      , {werdykt.produkt.cena}.
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        Osobna strona o każdej z tych usług:{" "}
        {LINKI_POWIAZANE.filter((p) => p.href !== biezacaStrona).map((p, i) => (
          <span key={p.href}>
            {i > 0 && ", "}
            <Link href={p.href} className="text-accent hover:underline">
              {p.nazwa.toLowerCase()}
            </Link>
          </span>
        ))}
        .
      </p>
    </section>
  );
}
