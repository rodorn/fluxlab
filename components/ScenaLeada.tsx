"use client";

import { useEffect, useRef, useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/* Na żywo: AI czyta zapytanie wpisane przez odwiedzającego, zakłada kartę
   leada i pisze szkic odpowiedzi handlowca (/api/demo-lead). Stoper mierzy
   prawdziwy czas od kliknięcia do gotowej karty. Nic nie jest wysyłane. */

type Karta = {
  temat: string;
  branza: string;
  miasto: string;
  budzet: string;
  termin: string;
  pilnosc: "niska" | "średnia" | "wysoka";
  ocena: number;
  nastepny_krok: string;
  odpowiedz: string;
};

const PRZYKLADY = [
  "Salon fryzjerski w Krakowie, potrzebuję strony z rezerwacją wizyt. Budżet ok. 5 tys., najlepiej przed świętami.",
  "Biuro rachunkowe, 40 klientów. Chcemy przestać przepisywać faktury ręcznie, od stycznia KSeF.",
  "Mam sklep z częściami rowerowymi, leady z formularza giną w skrzynce. Pilne.",
];

const POLA: [keyof Karta, string][] = [
  ["branza", "Branża"],
  ["miasto", "Miasto"],
  ["budzet", "Budżet"],
  ["termin", "Termin"],
];

function sekundy(ms: number) {
  return (ms / 1000).toFixed(2).replace(".", ",");
}

export default function ScenaLeada() {
  const [tekst, setTekst] = useState(PRZYKLADY[0]);
  const [stan, setStan] = useState<"start" | "czeka" | "gotowe" | "blad">(
    "start",
  );
  const [czas, setCzas] = useState(0);
  const [karta, setKarta] = useState<Karta | null>(null);
  const [pisane, setPisane] = useState("");
  const [blad, setBlad] = useState("");
  // Telefon dostaje powiadomienie dopiero, gdy dane „przejdą” łącznikiem z CRM.
  const [telefon, setTelefon] = useState(false);
  const zegar = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (zegar.current) window.clearInterval(zegar.current);
    },
    [],
  );

  // Szkic odpowiedzi „pisze się” na ekranie telefonu.
  useEffect(() => {
    setTelefon(false);
    if (!karta) return;
    const t = window.setTimeout(() => setTelefon(true), 1300);
    return () => window.clearTimeout(t);
  }, [karta]);

  useEffect(() => {
    if (!karta || !telefon) return;
    let i = 0;
    const t = window.setInterval(() => {
      i += 3;
      setPisane(karta.odpowiedz.slice(0, i));
      if (i >= karta.odpowiedz.length) window.clearInterval(t);
    }, 18);
    return () => window.clearInterval(t);
  }, [karta, telefon]);

  async function wyslij(e: React.FormEvent) {
    e.preventDefault();
    if (stan === "czeka" || tekst.trim().length < 10) return;
    zglosZdarzenie("scena_leada");
    setKarta(null);
    setPisane("");
    setBlad("");
    setStan("czeka");
    const start = performance.now();
    setCzas(0);
    zegar.current = window.setInterval(
      () => setCzas(performance.now() - start),
      31,
    );
    try {
      const r = await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tekst }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Błąd");
      setCzas(performance.now() - start);
      setKarta({ ...d, temat: d.temat.charAt(0).toUpperCase() + d.temat.slice(1) });
      setStan("gotowe");
    } catch (err) {
      setBlad(err instanceof Error ? err.message : "Błąd");
      setStan("blad");
    } finally {
      if (zegar.current) window.clearInterval(zegar.current);
    }
  }

  const kolorPilnosci =
    karta?.pilnosc === "wysoka"
      ? "bg-red-500/15 text-red-600 dark:text-red-400"
      : karta?.pilnosc === "średnia"
        ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
        : "bg-gray-500/15 text-gray-600 dark:text-gray-300";

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form onSubmit={wyslij} className="mx-auto max-w-2xl">
        <label htmlFor="scena-tekst" className="sr-only">
          Zapytanie klienta
        </label>
        <textarea
          id="scena-tekst"
          value={tekst}
          maxLength={500}
          rows={3}
          onChange={(e) => setTekst(e.target.value)}
          className="w-full resize-none rounded-2xl border border-gray-300 bg-white px-5 py-4 text-base leading-relaxed outline-none transition-colors focus:border-accent dark:border-white/15 dark:bg-white/[0.04]"
        />
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {PRZYKLADY.map((p, i) => (
            <button
              key={p}
              type="button"
              onClick={() => setTekst(p)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                tekst === p
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-gray-200 text-gray-600 hover:border-accent/50 dark:border-white/10 dark:text-white/60"
              }`}
            >
              {["Fryzjer", "Biuro rachunkowe", "Sklep rowerowy"][i]}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={stan === "czeka"}
            className="btn-primary rounded-full px-8 py-3.5 text-base disabled:opacity-60"
          >
            {stan === "czeka" ? "AI czyta zapytanie…" : "Wyślij jako klient"}
          </button>
          <p
            className={`text-sm tabular-nums transition-opacity ${
              stan === "start" ? "opacity-0" : "opacity-100"
            } ${stan === "gotowe" ? "text-accent" : "text-gray-500 dark:text-white/50"}`}
            aria-live="polite"
          >
            {stan === "gotowe"
              ? `Karta w CRM i szkic odpowiedzi gotowe po ${sekundy(czas)} s`
              : stan === "blad"
                ? blad
                : `${sekundy(czas)} s`}
          </p>
        </div>
      </form>

      <div aria-hidden="true" className="relative mx-auto mt-4 h-12 w-px bg-gradient-to-b from-transparent to-gray-300 dark:to-white/15">
        {stan === "czeka" && <span className="przeplyw-spada" />}
      </div>

      <div className="grid items-center gap-0 md:grid-cols-[3fr_auto_2fr]">
        <div
          className={`relative overflow-hidden rounded-2xl border bg-white p-6 text-left transition-all duration-500 dark:bg-gray-900 ${
            karta
              ? "border-accent shadow-xl shadow-accent/10"
              : "border-gray-200 dark:border-white/10"
          }`}
        >
          {stan === "czeka" && <span aria-hidden="true" className="skan" />}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-white/50">
              CRM: nowy lead
            </span>
            {karta && (
              <span
                className={`scena-wjazd rounded-full px-2.5 py-1 text-xs font-semibold ${kolorPilnosci}`}
              >
                pilność {karta.pilnosc}
              </span>
            )}
          </div>
          {karta ? (
            <>
              <p className="scena-wjazd mt-3 text-xl font-bold">
                {karta.temat}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                {POLA.map(([k, nazwa], i) => (
                  <div
                    key={k}
                    className="scena-wjazd"
                    style={{ animationDelay: `${120 + i * 90}ms` }}
                  >
                    <dt className="text-xs text-gray-500 dark:text-white/50">
                      {nazwa}
                    </dt>
                    <dd
                      className={`text-sm font-medium ${
                        karta[k] === "nie podano"
                          ? "text-gray-400 dark:text-white/35"
                          : ""
                      }`}
                    >
                      {String(karta[k])}
                    </dd>
                  </div>
                ))}
              </dl>
              <div
                className="scena-wjazd mt-5"
                style={{ animationDelay: "500ms" }}
              >
                <div className="flex justify-between text-xs text-gray-500 dark:text-white/50">
                  <span>Szansa na sprzedaż</span>
                  <span className="font-semibold text-accent">
                    {karta.ocena}/100
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent-solid transition-all duration-1000 ease-out"
                    style={{ width: `${pisane ? karta.ocena : 0}%` }}
                  />
                </div>
              </div>
              <p
                className="scena-wjazd mt-5 rounded-xl bg-accent/10 px-4 py-3 text-sm"
                style={{ animationDelay: "650ms" }}
              >
                <span className="font-semibold">Zadanie dla handlowca:</span>{" "}
                {karta.nastepny_krok}
              </p>
            </>
          ) : (
            <div className="mt-4 space-y-3" aria-hidden="true">
              {[70, 45, 55, 35].map((w, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full bg-gray-100 dark:bg-white/[0.06] ${stan === "czeka" ? "animate-pulse" : ""}`}
                  style={{ width: `${w}%` }}
                />
              ))}
              <p className="pt-2 text-sm text-gray-400 dark:text-white/40">
                {stan === "czeka" ? "AI wypełnia kartę…" : "Czeka na zapytanie"}
              </p>
            </div>
          )}
        </div>

        <div aria-hidden="true" className="relative mx-auto h-10 w-px bg-gray-300 md:h-px md:w-12 dark:bg-white/15">
          {karta && !telefon && <span key={karta.temat} className="scena-kropka" style={{ animationDelay: "700ms" }} />}
        </div>

        <div
          className={`mx-auto w-full max-w-[300px] rounded-[2.2rem] border-[6px] border-gray-900 bg-gray-950 p-3 shadow-2xl transition-shadow duration-500 dark:border-white/15 ${
            telefon ? "wibracja shadow-accent/30" : ""
          }`}
        >
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/15" />
          <p className="text-center text-[11px] text-white/40">
            Telefon handlowca
          </p>
          <div className="mt-3 min-h-[230px] rounded-2xl bg-white/[0.06] p-3.5 text-left">
            {karta && telefon ? (
              <div className="scena-wjazd">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                  Nowy lead · zadzwoń w 15 min
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {karta.temat}
                </p>
                <p className="mt-3 text-[11px] text-white/45">
                  Szkic odpowiedzi od AI:
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/85">
                  {pisane}
                  {pisane.length < karta.odpowiedz.length && (
                    <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-accent align-middle" />
                  )}
                </p>
              </div>
            ) : (
              <p className="pt-16 text-center text-sm text-white/35">
                {karta ? "Przychodzi…" : stan === "czeka" ? "…" : "Brak powiadomień"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
