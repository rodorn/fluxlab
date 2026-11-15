"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DOMYSLNE,
  GRUPY,
  dzienPl,
  dzienTygodnia,
  kodUstawien,
  terminy,
  type Forma,
  type Ustawienia,
  type Vat,
  type Zaliczki,
} from "@/lib/kalendarz-terminow";
import { zglosZdarzenie } from "@/lib/zdarzenie";

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent";

const ETYKIETA = "block text-sm font-medium text-gray-900 dark:text-white";

function Wybor<T extends string>({
  etykieta,
  wartosc,
  opcje,
  onZmiana,
}: {
  etykieta: string;
  wartosc: T;
  opcje: { v: T; t: string }[];
  onZmiana: (v: T) => void;
}) {
  return (
    <label className="block">
      <span className={ETYKIETA}>{etykieta}</span>
      <select
        value={wartosc}
        onChange={(e) => onZmiana(e.target.value as T)}
        className={`${POLE} mt-1.5`}
      >
        {opcje.map((o) => (
          <option key={o.v} value={o.v}>
            {o.t}
          </option>
        ))}
      </select>
    </label>
  );
}

function Przelacznik({
  etykieta,
  opis,
  wlaczony,
  onZmiana,
}: {
  etykieta: string;
  opis: string;
  wlaczony: boolean;
  onZmiana: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-800 px-4 py-3">
      <input
        type="checkbox"
        checked={wlaczony}
        onChange={(e) => onZmiana(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent,#2563eb)]"
      />
      <span>
        <span className="block text-sm font-medium text-gray-900 dark:text-white">
          {etykieta}
        </span>
        <span className="block text-xs text-gray-600 dark:text-gray-400">
          {opis}
        </span>
      </span>
    </label>
  );
}

export default function KalendarzTerminow() {
  const [u, setU] = useState<Ustawienia>(DOMYSLNE);
  const [skopiowano, setSkopiowano] = useState(false);
  const zmien = <K extends keyof Ustawienia>(k: K, v: Ustawienia[K]) =>
    setU((p) => ({ ...p, [k]: v }));

  const kod = kodUstawien(u);
  const sciezka = `/api/kalendarz-terminow?k=${kod}`;
  const [host, setHost] = useState("fluxlab.pl");
  const [dzis, setDzis] = useState<string | null>(null);
  useEffect(() => {
    setDzis(new Date().toISOString().slice(0, 10));
    setHost(window.location.host);
  }, []);

  const najblizsze = useMemo(() => {
    if (!dzis) return [];
    const rok = new Date().getFullYear();
    return terminy(u, rok - 1, rok + 1)
      .filter((t) => t.dzien >= dzis)
      .slice(0, 7);
  }, [u, dzis]);

  const https = `https://${host}${sciezka}`;
  const webcal = `webcal://${host}${sciezka}`;
  const google = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`;

  function start(gdzie: string) {
    zglosZdarzenie(`kalendarz_terminow_${gdzie}`);
  }

  async function kopiuj() {
    start("kopiuj");
    try {
      await navigator.clipboard.writeText(
        `https://${window.location.host}${sciezka}`,
      );
      setSkopiowano(true);
      setTimeout(() => setSkopiowano(false), 2500);
    } catch {
      setSkopiowano(false);
    }
  }

  const cit = u.forma === "cit";

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Złóż kalendarz dla swojej firmy
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Odpowiedz na pięć pytań. Dostaniesz kalendarz, który sam się odświeża, z
        przypomnieniem dwa dni przed terminem i rano w dniu terminu.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Wybor<Forma>
          etykieta="Forma opodatkowania"
          wartosc={u.forma}
          onZmiana={(v) => zmien("forma", v)}
          opcje={[
            { v: "skala", t: "Jednoosobowa firma, skala podatkowa" },
            { v: "liniowy", t: "Jednoosobowa firma, podatek liniowy" },
            { v: "ryczalt", t: "Jednoosobowa firma, ryczałt" },
            { v: "cit", t: "Spółka z o.o. lub S.A. (CIT)" },
          ]}
        />
        <Wybor<Vat>
          etykieta="Rozliczenie VAT"
          wartosc={u.vat}
          onZmiana={(v) => zmien("vat", v)}
          opcje={[
            { v: "m", t: "Miesięczne" },
            { v: "k", t: "Kwartalne" },
            { v: "brak", t: "Brak, firma bez VAT" },
          ]}
        />
        <Wybor<Zaliczki>
          etykieta={
            cit
              ? "Zaliczki na CIT"
              : u.forma === "ryczalt"
                ? "Zaliczki na ryczałt"
                : "Zaliczki na PIT"
          }
          wartosc={u.zaliczki}
          onZmiana={(v) => zmien("zaliczki", v)}
          opcje={[
            { v: "m", t: "Co miesiąc" },
            { v: "k", t: "Co kwartał" },
          ]}
        />
        <div className="grid gap-3 sm:col-span-1">
          <Przelacznik
            etykieta="Firma zatrudnia pracowników"
            opis={
              cit
                ? "Dodaje składki ZUS za zespół, PIT-4R i PIT-11."
                : "Dodaje PIT-4R i PIT-11."
            }
            wlaczony={u.pracownicy}
            onZmiana={(v) => zmien("pracownicy", v)}
          />
          {u.vat !== "brak" && (
            <Przelacznik
              etykieta="Firma handluje z UE"
              opis="Dodaje informację podsumowującą VAT-UE."
              wlaczony={u.vatUe}
              onZmiana={(v) => zmien("vatUe", v)}
            />
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Najbliższe terminy
        </p>
        <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-800">
          {najblizsze.map((t) => (
            <li
              key={`${t.dzien}${t.tytul}`}
              className="flex items-baseline gap-3 py-2.5 text-sm"
            >
              <span className="w-28 shrink-0 tabular-nums text-gray-900 dark:text-white">
                <span className="font-semibold">
                  {dzienPl(t.dzien).replace(/ \d{4}$/, "")}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">
                  {dzienTygodnia(t.dzien)}
                </span>
              </span>
              <span className="min-w-0">
                <span className="mr-2 inline-block rounded bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                  {GRUPY[t.grupa]}
                </span>
                <span className="text-gray-800 dark:text-gray-200">
                  {t.tytul}
                </span>
                {t.dzien !== t.ustawowy && (
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    Przesunięty z {dzienPl(t.ustawowy).replace(/ \d{4}$/, "")} (
                    {dzienTygodnia(t.ustawowy)})
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href={google}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => start("google")}
          className="btn-primary text-center"
        >
          Dodaj do Google Kalendarza
        </a>
        <a
          href={webcal}
          onClick={() => start("webcal")}
          className="btn-secondary text-center"
        >
          Apple i Outlook
        </a>
        <button type="button" onClick={kopiuj} className="btn-secondary">
          {skopiowano ? "Skopiowano" : "Kopiuj link"}
        </button>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        Kalendarz odświeża się sam, więc zmiany terminów trafiają do Ciebie bez
        ponownej instalacji. Bez rejestracji i bez maila.{" "}
        <a
          href={https}
          className="underline underline-offset-2"
          onClick={() => start("plik")}
        >
          Pobierz jako plik kalendarza
        </a>
        .
      </p>
    </div>
  );
}
