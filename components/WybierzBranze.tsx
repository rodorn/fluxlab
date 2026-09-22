"use client";

import Link from "next/link";
import { useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Wybór branży na stronie głównej.
 *
 * Powstał z dwóch powodów naraz. Po pierwsze, cztery strony branżowe nie
 * miały ani jednego odnośnika z serwisu, więc wyszukiwarka je znała z mapy
 * strony, ale nie dostawały nic z siły pozostałych podstron, a odwiedzający
 * nie miał jak do nich trafić z nawigacji. Po drugie, pomiar pokazał, że
 * ludzie otwierają strony narzędzi i nie naciskają na nich niczego, więc
 * pierwszy element do kliknięcia musi być tuż pod nosem i nie może wymagać
 * wpisywania czegokolwiek.
 */

type Branza = {
  klucz: string;
  nazwa: string;
  href: string;
  problemy: string[];
  narzedzia: string;
};

const BRANZE: Branza[] = [
  {
    klucz: "ecommerce",
    nazwa: "Sklep internetowy",
    href: "/automatyzacja-dla-ecommerce",
    problemy: [
      "Stany magazynowe rozjeżdżają się między sklepem a Allegro i ktoś sprzedaje towar, którego nie ma",
      "Zamówienia z kilku kanałów trzeba przeklejać do jednego miejsca",
      "Opisy i zdjęcia produktów wprowadza się ręcznie, po jednym",
    ],
    narzedzia: "Shopify, WooCommerce, BaseLinker, Allegro",
  },
  {
    klucz: "ksiegowosc",
    nazwa: "Biuro rachunkowe",
    href: "/automatyzacja-dla-biur-rachunkowych",
    problemy: [
      "Faktury od klientów przepisuje się z PDF-a do programu księgowego",
      "Każdy klient przysyła dokumenty inaczej i w innym momencie miesiąca",
      "Przy obowiązkowym e-fakturowaniu ilość dokumentów rośnie, a etatów nie przybywa",
    ],
    narzedzia: "Comarch Optima, Symfonia, enova, KSeF",
  },
  {
    klucz: "agencja",
    nazwa: "Agencja marketingowa",
    href: "/automatyzacja-dla-agencji-marketingowych",
    problemy: [
      "Raport dla klienta składa się ręcznie z kilku paneli reklamowych",
      "Wdrożenie nowego klienta to za każdym razem ta sama lista czynności od zera",
      "Nikt nie wie, ile godzin naprawdę zjada obsługa konkretnego abonamentu",
    ],
    narzedzia: "Google Ads, Meta Ads, GA4, Looker Studio",
  },
  {
    klucz: "leasing",
    nazwa: "Leasing i finanse",
    href: "/automatyzacja-crm-leasing",
    problemy: [
      "Wniosek klienta wędruje mailem, a jego status zna tylko osoba, która go prowadzi",
      "Te same dane wpisuje się osobno do CRM i osobno do systemu finansującego",
      "Handlowiec dowiaduje się o decyzji później niż klient",
    ],
    narzedzia: "Pipedrive, HubSpot, systemy finansujące",
  },
];

export default function WybierzBranze() {
  const [wybrana, setWybrana] = useState<string | null>(null);
  const b = BRANZE.find((x) => x.klucz === wybrana) ?? null;

  return (
    <section className="relative z-20 border-t border-gray-200 px-6 py-12 dark:border-white/10 lg:px-10 lg:py-16">
      <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white/90 lg:text-2xl">
        Z jakiej branży jesteś?
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-gray-600 dark:text-white/60">
        Kliknij, a pokażę, co w tej branży najczęściej zjada czas i co da się z
        tym zrobić. Bez formularza i bez podawania czegokolwiek.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {BRANZE.map((x) => {
          const aktywna = x.klucz === wybrana;
          return (
            <button
              key={x.klucz}
              type="button"
              aria-pressed={aktywna}
              onClick={() => {
                const nowa = aktywna ? null : x.klucz;
                setWybrana(nowa);
                if (nowa) zglosZdarzenie(`branza_${x.klucz}`);
              }}
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

      {b && (
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
            Systemy, z którymi to spinam: {b.narzedzia}
          </p>
          <Link
            href={b.href}
            onClick={() => zglosZdarzenie(`branza_przejscie_${b.klucz}`)}
            className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Zobacz, jak to rozwiązuję
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
