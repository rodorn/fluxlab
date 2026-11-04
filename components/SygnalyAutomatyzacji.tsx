"use client";

import { useState } from "react";
import Link from "next/link";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const SYGNALY = [
  {
    klucz: "przepisywanie",
    tekst: "Ktoś przepisuje te same dane z jednego systemu do drugiego.",
    href: "/integracje-api",
    nazwa: "Integracje i API",
  },
  {
    klucz: "leady",
    tekst: "Zapytanie z formularza czeka na odpowiedź dłużej niż godzinę.",
    href: "/czas-reakcji-na-leada",
    nazwa: "Czas reakcji na zapytanie",
  },
  {
    klucz: "raport",
    tekst: "Raport tygodniowy powstaje ręcznie z kilku eksportów.",
    href: "/automatyzacja-raportowania",
    nazwa: "Automatyzacja raportowania",
  },
  {
    klucz: "faktury",
    tekst: "Faktury do KSeF trafiają ręcznie, jedna po drugiej.",
    href: "/ksef-integracja",
    nazwa: "Integracja z KSeF",
  },
  {
    klucz: "followup",
    tekst: "Przypomnienia do klientów zależą od tego, czy ktoś pamięta.",
    href: "/automatyzacja-follow-up",
    nazwa: "Automatyzacja follow-upów",
  },
  {
    klucz: "jedna-osoba",
    tekst: "Gdy jedna osoba jest na urlopie, proces stoi.",
    href: "/jak-pracuje",
    nazwa: "Jak pracujemy",
  },
  {
    klucz: "excel",
    tekst: "Najważniejsze dane żyją w Excelu, który zna jedna osoba.",
    href: "/wlasny-crm",
    nazwa: "Własny CRM",
  },
  {
    klucz: "oplaty",
    tekst: "Rachunek za Zapiera albo Make rośnie co kwartał.",
    href: "/tansze-automatyzacje",
    nazwa: "Tańsze automatyzacje",
  },
  {
    klucz: "bledy",
    tekst: "Co miesiąc ktoś poprawia te same błędy w danych.",
    href: "/audyt-crm",
    nazwa: "Audyt CRM",
  },
] as const;

type Klucz = (typeof SYGNALY)[number]["klucz"];

export default function SygnalyAutomatyzacji() {
  const [odp, setOdp] = useState<Partial<Record<Klucz, boolean>>>({});
  const tak = SYGNALY.filter((s) => odp[s.klucz]);
  const ile = Object.keys(odp).length;

  function zaznacz(k: Klucz, v: boolean) {
    setOdp((o) => {
      if (Object.keys(o).length === 0) zglosZdarzenie("sygnaly_start");
      const n = { ...o, [k]: v };
      if (Object.keys(n).length === SYGNALY.length)
        zglosZdarzenie("sygnaly_koniec");
      return n;
    });
  }

  const werdykt =
    tak.length <= 2
      ? "Na razie automatyzacja się nie zwróci. Jeśli jeden z tych sygnałów boli, wystarczy gotowy program albo prosta reguła w narzędziu, którego już używasz."
      : tak.length <= 5
        ? "Jeden proces warto zautomatyzować już teraz. Zacznij od tego, który zabiera najwięcej godzin w tygodniu: pierwszy krok kosztuje od 900 zł i działa po 5 dniach roboczych."
        : "Ręczna praca zabiera już spory kawałek tygodnia. Zanim cokolwiek kupisz, opłaca się audyt procesu: dostaniesz listę priorytetów i cenę każdego kroku, a koszt audytu odliczamy od wdrożenia.";

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50 md:p-8">
      <ol className="space-y-3">
        {SYGNALY.map((s, i) => {
          const o = odp[s.klucz];
          return (
            <li
              key={s.klucz}
              className={`rounded-xl border p-4 ${
                o === true
                  ? "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
                  : o === false
                    ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
                    : "border-gray-200/80 dark:border-gray-800/80"
              }`}
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {i + 1}. {s.tekst}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  [
                    [true, "Tak, u nas też"],
                    [false, "Nie dotyczy"],
                  ] as const
                ).map(([v, etykieta]) => (
                  <button
                    key={etykieta}
                    type="button"
                    aria-pressed={o === v}
                    onClick={() => zaznacz(s.klucz, v)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      o === v
                        ? "border-accent bg-accent-solid text-white"
                        : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {etykieta}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      {ile > 0 && (
        <div
          aria-live="polite"
          className="mt-6 rounded-xl border border-gray-200/80 bg-white/70 p-5 dark:border-gray-800/80 dark:bg-gray-950/50"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Sygnały u Ciebie: {tak.length} z {SYGNALY.length}
            {ile < SYGNALY.length && `, bez odpowiedzi ${SYGNALY.length - ile}`}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {werdykt}
          </p>
          {tak.length > 0 && (
            <>
              <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">
                Gdzie zacząć przy Twoich odpowiedziach:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {tak.map((s) => (
                  <li key={s.klucz}>
                    <Link href={s.href} className="text-accent hover:underline">
                      {s.nazwa}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
