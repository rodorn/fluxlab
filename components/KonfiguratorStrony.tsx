"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { kodujWycene } from "@/lib/wycenaPdf";

type Rodzaj = {
  id: string;
  nazwa: string;
  opis: string;
  cena: number;
  termin: string;
};

// Ceny i terminy z app/strony-www/page.tsx (pricing, faq) i lib/products.ts.
const RODZAJE: Rodzaj[] = [
  {
    id: "landing",
    nazwa: "Landing do 5 podstron",
    opis: "Formularz prosto do CRM albo skrzynki.",
    cena: 4500,
    termin: "3-5 dni roboczych",
  },
  {
    id: "firmowa",
    nazwa: "Strona firmowa z CMS",
    opis: "Next.js, panel do edycji treści, audyt przed startem.",
    cena: 9000,
    termin: "2-3 tygodnie",
  },
  {
    id: "sklep",
    nazwa: "Sklep z integracją",
    opis: "Sklep połączony z Twoimi systemami.",
    cena: 15000,
    termin: "ustalimy przy wycenie",
  },
];

type Opcja = {
  id: string;
  nazwa: string;
  wCenie: string[];
};

const OPCJE: Opcja[] = [
  { id: "crm", nazwa: "Formularz podpięty do CRM", wCenie: ["landing"] },
  { id: "cms", nazwa: "Panel do edycji treści (CMS)", wCenie: ["firmowa"] },
  { id: "en", nazwa: "Wersja angielska", wCenie: [] },
  { id: "blog", nazwa: "Blog", wCenie: [] },
  { id: "platnosci", nazwa: "Integracja płatności", wCenie: [] },
];

const zl = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") + " zł";

function useAnimowana(cel: number) {
  const [wartosc, setWartosc] = useState(cel);
  const ref = useRef(cel);
  useEffect(() => {
    const start = ref.current;
    if (start === cel) return;
    const t0 = performance.now();
    let id = 0;
    const krok = (t: number) => {
      const p = Math.min(1, (t - t0) / 600);
      const e = 1 - Math.pow(1 - p, 3);
      const v = start + (cel - start) * e;
      ref.current = v;
      setWartosc(v);
      if (p < 1) id = requestAnimationFrame(krok);
    };
    id = requestAnimationFrame(krok);
    return () => cancelAnimationFrame(id);
  }, [cel]);
  return wartosc;
}

export default function KonfiguratorStrony() {
  const [rodzajId, setRodzajId] = useState("firmowa");
  const [wybrane, setWybrane] = useState<string[]>([]);
  const rodzaj = RODZAJE.find((r) => r.id === rodzajId)!;
  const cena = useAnimowana(rodzaj.cena);

  const przelacz = (id: string) =>
    setWybrane((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const notka = (o: Opcja) =>
    o.wCenie.includes(rodzajId) ? "w cenie" : "wycenimy";

  const pobierzPdf = () => {
    const d = kodujWycene({ t: "s", r: rodzajId, o: wybrane });
    window.open(`/wycena?d=${d}`, "_blank", "noopener");
  };

  const wyslij = () => {
    zglosZdarzenie("konfigurator_strony");
    const opcje = OPCJE.filter((o) => wybrane.includes(o.id)).map(
      (o) => `${o.nazwa} (${notka(o)})`,
    );
    const tekst = [
      "Konfiguracja ze strony:",
      `Rodzaj: ${rodzaj.nazwa}, od ${zl(rodzaj.cena)} netto`,
      `Opcje: ${opcje.length ? opcje.join(", ") : "bez dodatków"}`,
      `Termin: ${rodzaj.termin}`,
    ].join("\n");
    const pole = document.getElementById("message");
    if (pole instanceof HTMLTextAreaElement) {
      pole.value = tekst;
      pole.dispatchEvent(new Event("input", { bubbles: true }));
      document
        .getElementById("kontakt")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        document.getElementById("email")?.focus({ preventScroll: true });
      }, 500);
    } else {
      window.location.href = "/#kontakt";
    }
  };

  return (
    <section
      id="konfigurator"
      aria-labelledby="konfigurator-heading"
      className="scroll-mt-20 container-wide"
    >
      <div className="mx-auto max-w-4xl py-10 lg:py-12">
        <h2 id="konfigurator-heading" className="h2-sekcji mb-3 text-center">
          Policz cenę swojej strony
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Wybierz rodzaj i opcje. Cena jest orientacyjna, netto, bez VAT.
        </p>

        <p className="mb-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
          1. Rodzaj strony
        </p>
        <div
          role="radiogroup"
          aria-label="Rodzaj strony"
          className="grid gap-3 md:grid-cols-3"
        >
          {RODZAJE.map((r) => {
            const aktywny = r.id === rodzajId;
            return (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={aktywny}
                onClick={() => setRodzajId(r.id)}
                className={`flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-200 ${
                  aktywny
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                    : "border-gray-200 bg-white hover:border-accent/50 dark:border-gray-700 dark:bg-gray-800/60"
                }`}
              >
                <span className="block font-bold text-gray-900 dark:text-white">
                  {r.nazwa}
                </span>
                <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                  {r.opis}
                </span>
                <span className="mt-auto block pt-3 text-lg font-bold text-accent">
                  od {zl(r.cena)}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mb-3 mt-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
          2. Opcje
        </p>
        <div className="sierota-sm-2 mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
          {OPCJE.map((o) => {
            const aktywna = wybrane.includes(o.id);
            const wCenie = o.wCenie.includes(rodzajId);
            return (
              <button
                key={o.id}
                type="button"
                role="switch"
                aria-checked={aktywna}
                onClick={() => przelacz(o.id)}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                  aktywna
                    ? "border-accent bg-accent/10"
                    : "border-gray-200 bg-white hover:border-accent/50 dark:border-gray-700 dark:bg-gray-800/60"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {o.nazwa}
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {wCenie ? "w cenie" : "wycenimy przy zapytaniu"}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
                    aktywna ? "bg-accent-solid" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
                    style={{ left: aktywna ? "22px" : "2px" }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-accent bg-white p-6 text-center shadow-lg shadow-accent/10 dark:bg-gray-800/60">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            3. Wynik
          </p>
          <p
            className="mt-2 text-4xl font-bold text-accent sm:text-5xl"
            aria-live="polite"
          >
            od {zl(cena)} <span className="text-lg font-semibold">netto</span>
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Termin: {rodzaj.termin}. Hosting w cenie wdrożenia.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={wyslij} className="btn-primary">
              Wyślij tę konfigurację
            </button>
            <button type="button" onClick={pobierzPdf} className="btn-secondary">
              Pobierz wycenę PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
