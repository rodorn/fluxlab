"use client";

import Link from "next/link";
import { useState } from "react";

import {
  CELE,
  LINKI_POWIAZANE,
  ZRODLA,
  ocenSpiecie,
  type Cel,
  type Zrodlo,
} from "@/lib/spiecie-danych";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Sprawdzenie "czy da sie to spiac", na filarze Integracje i dane.
 *
 * Pierwsze klikniecie daje juz wynik, bo mowi, jak dane z tego miejsca
 * wychodza i co tam zwykle psuje spiecie. Drugie, o tym dokad maja trafic,
 * dokleda werdykt. Taka sama kolejnosc jak w wyborze branzy na filarze
 * procesow: jedno klikniecie to juz odpowiedz, a nie dopiero polowa pytania.
 *
 * Odnosniki do stron uslugowych stoja pod przyciskami na stale, a nie tylko w
 * panelu wyniku. Poprzednim razem ta sama lista siedziala w srodku panelu i
 * dla kogos, kto niczego nie nacisnal, a to dotyczy takze robotow, tych
 * odnosnikow po prostu nie bylo.
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

export default function CzyDaSieSpiac({ biezacaStrona }: Props) {
  const [kluczZrodla, setKluczZrodla] = useState<string | null>(null);
  const [kluczCelu, setKluczCelu] = useState<string | null>(null);

  const zrodlo: Zrodlo | null =
    ZRODLA.find((z) => z.klucz === kluczZrodla) ?? null;
  const cel: Cel | null = CELE.find((c) => c.klucz === kluczCelu) ?? null;
  const werdykt = zrodlo && cel ? ocenSpiecie(zrodlo, cel) : null;

  const wybierzZrodlo = (z: Zrodlo) => {
    const nowy = z.klucz === kluczZrodla ? null : z.klucz;
    setKluczZrodla(nowy);
    // Zmiana zrodla nie kasuje celu: ktos porownujacy dwa systemy chce
    // przeklikac zrodla przy tym samym miejscu docelowym.
    if (nowy) zglosZdarzenie(`spiecie_zrodlo_${z.klucz}`);
  };

  const wybierzCel = (c: Cel) => {
    const nowy = c.klucz === kluczCelu ? null : c.klucz;
    setKluczCelu(nowy);
    if (nowy) zglosZdarzenie(`spiecie_cel_${c.klucz}`);
  };

  const kolor = werdykt ? KOLOR[werdykt.poziom] : null;

  return (
    <section
      id="czy-da-sie-spiac"
      aria-labelledby="spiecie-heading"
      className="scroll-mt-20 rounded-3xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-800/80 dark:bg-gray-900/40 lg:p-8"
    >
      <h2
        id="spiecie-heading"
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        Czy da się to spiąć
      </h2>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
        Naciśnij, gdzie dziś leżą Wasze dane. Napiszemy, jak się je stamtąd
        wyciąga i co przy takim źródle psuje spięcie najczęściej. Drugie
        naciśnięcie, o tym dokąd mają trafiać, dokłada ocenę całości. Bez
        wpisywania czegokolwiek i bez podawania adresu.
      </p>

      <h3 className="mt-7 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Gdzie leżą dane
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {ZRODLA.map((z) => (
          <button
            key={z.klucz}
            type="button"
            aria-pressed={z.klucz === kluczZrodla}
            onClick={() => wybierzZrodlo(z)}
            className={`${PRZYCISK} ${
              z.klucz === kluczZrodla ? AKTYWNY : NIEAKTYWNY
            }`}
          >
            {z.nazwa}
          </button>
        ))}
      </div>

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Dokąd mają trafiać
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {CELE.map((c) => (
          <button
            key={c.klucz}
            type="button"
            aria-pressed={c.klucz === kluczCelu}
            onClick={() => wybierzCel(c)}
            className={`${PRZYCISK} ${
              c.klucz === kluczCelu ? AKTYWNY : NIEAKTYWNY
            }`}
          >
            {c.nazwa}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {!zrodlo ? (
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Naciśnij jedno z miejsc powyżej, żeby zobaczyć odpowiedź.
          </p>
        ) : (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-6 dark:border-gray-800 dark:bg-gray-950/40">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {zrodlo.nazwa}
              {cel ? ` do: ${cel.nazwa}` : ""}
            </p>

            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                  Jak się je stamtąd wyciąga
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {zrodlo.jak}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                  Co przy tym źródle psuje spięcie
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {zrodlo.ryzyko}
                </dd>
              </div>
              {cel && (
                <>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      Jak wjeżdżają na miejsce
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {cel.jak}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                      Na co uważać po stronie docelowej
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {cel.ryzyko}
                    </dd>
                  </div>
                </>
              )}
            </dl>

            <p className="mt-5 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                Co przygotować przed rozmową:{" "}
              </span>
              {zrodlo.przygotowac}
            </p>

            {!cel ? (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                Naciśnij jeszcze, dokąd te dane mają trafiać, a dopiszę ocenę
                całego spięcia.
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
