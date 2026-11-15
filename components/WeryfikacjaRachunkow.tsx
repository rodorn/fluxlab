"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Status = "ok" | "inny_podmiot" | "nieczynny" | "brak" | "bledny" | "blad";
type Wiersz = { nr: number; rachunek: string; nip: string; nazwa: string; kwota: number | null; status: Status; podmiot: string; uwaga: string };
type Odp = {
  ok: boolean;
  error?: string;
  wiersze?: Wiersz[];
  ograniczone?: boolean;
  wyslano?: boolean;
  email?: string;
  pominiete?: number;
  podsumowanie?: { razem: number; ok: number; problemy: number };
};

const ETYKIETA: Record<Status, string> = {
  ok: "Na białej liście",
  inny_podmiot: "Rachunek innej firmy",
  nieczynny: "Bez czynnego VAT",
  brak: "Spoza białej listy",
  bledny: "Błędny numer",
  blad: "Nie sprawdzono",
};

const POLE =
  "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30";

const PRZYKLAD = `Odbiorca;Rachunek;Kwota
PKO Bank Polski;17 1050 0086 1000 0090 3036 2629;1 200,00
Dostawca Testowy;61 1090 1014 0000 0712 1981 2874;18 500,00
Literówka sp. z o.o.;17 1050 0086 1000 0090 3036 2628;310,00`;

const fmt = (r: string) => `${r.slice(0, 2)} ${r.slice(2).replace(/(\d{4})(?=\d)/g, "$1 ")}`;

function Wyniki({ d }: { d: Odp }) {
  const w = d.wiersze ?? [];
  const p = d.podsumowanie;
  return (
    <div role="status" className="mt-5">
      {p && (
        <p className="text-base font-semibold text-gray-900 dark:text-white">
          {p.problemy === 0
            ? `Wszystkie ${p.razem} rachunków są na białej liście.`
            : `${p.ok} z ${p.razem} rachunków jest na białej liście, ${p.problemy} do sprawdzenia.`}
        </p>
      )}
      <ul className="mt-3 divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700">
        {w.map((x) => (
          <li key={x.nr} className="py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-mono text-sm text-gray-900 dark:text-white break-all">{fmt(x.rachunek)}</span>
              <span className={`text-sm font-semibold ${x.status === "ok" ? "text-emerald-700 dark:text-emerald-400" : x.status === "blad" ? "text-gray-600 dark:text-gray-400" : "text-red-700 dark:text-red-400"}`}>
                {ETYKIETA[x.status]}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
              {x.podmiot || x.nazwa || "bez nazwy"}
              {x.kwota != null ? ` · ${x.kwota.toLocaleString("pl-PL", { minimumFractionDigits: 2 })} zł` : ""}
            </p>
            {x.status !== "ok" && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{x.uwaga}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Podgląd na żywo: do pięciu rachunków sprawdzanych w wykazie MF, bez płatności i bez maila. */
export function PodgladRachunkow() {
  const [tekst, setTekst] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    zglosZdarzenie("weryfikacja_rachunkow_podglad");
    try {
      const f = new FormData();
      f.set("tekst", tekst);
      const r = await fetch("/api/weryfikacja-rachunkow?podglad=1", { method: "POST", body: f });
      const o: Odp = await r.json();
      if (!r.ok || !o.ok) throw new Error(o.error || "Nie udało się sprawdzić rachunków.");
      setD(o);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-7 shadow-sm">
      <form onSubmit={wyslij}>
        <label htmlFor="wr-tekst" className="block text-sm font-medium text-gray-900 dark:text-white">
          Wklej fragment paczki przelewów albo numery rachunków
        </label>
        <textarea
          id="wr-tekst"
          required
          rows={5}
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          placeholder="Jeden rachunek w wierszu albo cały wiersz z CSV z banku"
          className={`${POLE} mt-2 font-mono`}
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" disabled={stan === "laduje"} className="btn-primary disabled:opacity-50">
            {stan === "laduje" ? "Sprawdzamy..." : "Sprawdź rachunki"}
          </button>
          <button type="button" onClick={() => setTekst(PRZYKLAD)} className="text-sm font-medium text-accent underline underline-offset-2">
            Wstaw przykład
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Podgląd sprawdza pierwsze 5 rachunków. Nic nie zapisujemy.</p>
        {stan === "blad" && (
          <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
            {blad}
          </p>
        )}
      </form>
      {stan === "ok" && d && (
        <>
          <Wyniki d={d} />
          {d.ograniczone && <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">W Twoim tekście jest więcej rachunków. Pełną paczkę, do 500 przelewów, sprawdza subskrypcja.</p>}
        </>
      )}
    </div>
  );
}

/** Panel po płatności: wgranie paczki CSV, wynik na stronie i w mailu. */
export function PanelRachunkow({ sesja }: { sesja: string }) {
  const [plik, setPlik] = useState<File | null>(null);
  const [tekst, setTekst] = useState("");
  const [stan, setStan] = useState<"cisza" | "laduje" | "ok" | "blad">("cisza");
  const [d, setD] = useState<Odp | null>(null);
  const [blad, setBlad] = useState("");

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    setStan("laduje");
    setBlad("");
    try {
      const f = new FormData();
      f.set("sesja", sesja);
      if (plik) f.set("plik", plik);
      else f.set("tekst", tekst);
      const r = await fetch("/api/weryfikacja-rachunkow", { method: "POST", body: f });
      const o: Odp = await r.json();
      if (!r.ok || !o.ok) throw new Error(o.error || "Nie udało się sprawdzić paczki.");
      setD(o);
      setStan("ok");
    } catch (er) {
      setBlad((er as Error).message);
      setStan("blad");
    }
  }

  return (
    <form onSubmit={wyslij}>
      <label htmlFor="pr-plik" className="block text-sm font-medium text-gray-900 dark:text-white">
        Plik CSV z paczką przelewów
      </label>
      <input
        id="pr-plik"
        type="file"
        accept=".csv,.txt,.elixir,text/csv,text/plain"
        onChange={(e) => setPlik(e.target.files?.[0] ?? null)}
        className="mt-2 block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white"
      />
      <label htmlFor="pr-tekst" className="mt-5 block text-sm font-medium text-gray-900 dark:text-white">
        Albo wklej zawartość pliku
      </label>
      <textarea id="pr-tekst" rows={5} value={tekst} onChange={(e) => setTekst(e.target.value)} disabled={!!plik} className={`${POLE} mt-2 font-mono`} />
      <button type="submit" disabled={stan === "laduje" || (!plik && !tekst.trim())} className="btn-primary mt-4 disabled:opacity-50">
        {stan === "laduje" ? "Sprawdzamy w wykazie MF..." : "Sprawdź paczkę"}
      </button>
      {stan === "blad" && (
        <p role="alert" className="mt-3 text-sm text-red-700 dark:text-red-400">
          {blad}
        </p>
      )}
      {stan === "ok" && d && (
        <>
          <Wyniki d={d} />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            {d.wyslano ? `Pełny wynik z plikiem CSV wysłaliśmy na ${d.email}.` : "Nie udało się wysłać maila z wynikiem, wynik widzisz powyżej."}
            {d.pominiete ? ` Pominęliśmy ${d.pominiete} wierszy bez numeru rachunku.` : ""}
          </p>
        </>
      )}
    </form>
  );
}
