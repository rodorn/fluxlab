"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { kodujWycene } from "@/lib/wycenaPdf";
import {
  MODULY_CRM,
  OSOBA_DODATKOWA,
  W_ABONAMENCIE,
  WARIANTY_CRM,
  abonamentCrm,
  type WariantCrm,
} from "@/lib/modulyCrm";

const zl = (n: number) =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

function useAnimowana(cel: number) {
  const [v, setV] = useState(cel);
  const ref = useRef(cel);
  useEffect(() => {
    const od = ref.current;
    if (od === cel) return;
    const start = performance.now();
    let id = 0;
    const krok = (t: number) => {
      const p = Math.min(1, (t - start) / 450);
      const e = 1 - Math.pow(1 - p, 3);
      const w = od + (cel - od) * e;
      ref.current = w;
      setV(w);
      if (p < 1) id = requestAnimationFrame(krok);
      else ref.current = cel;
    };
    id = requestAnimationFrame(krok);
    return () => cancelAnimationFrame(id);
  }, [cel]);
  return v;
}

export default function KonfiguratorCrm() {
  const [osoby, setOsoby] = useState(5);
  const [moduly, setModuly] = useState<string[]>([]);

  const [wariant, setWariant] = useState<WariantCrm>("integracje");
  const { baza, platne, miesiecznie } = abonamentCrm(wariant, osoby, moduly);
  const rok = 1 + 12 * miesiecznie;

  const aMies = useAnimowana(miesiecznie);
  const aRok = useAnimowana(rok);
  const brutto = Math.round((miesiecznie + 1) * 123) / 100;
  const [kupuje, setKupuje] = useState(false);
  const [bladZakupu, setBladZakupu] = useState("");

  useEffect(() => {
    const zHasha = () => {
      const w = window.location.hash.match(/^#kup-(pilotaz|integracje)$/)?.[1];
      if (!w) return;
      setWariant(w as WariantCrm);
      document.getElementById("kup")?.scrollIntoView({ behavior: "smooth" });
    };
    zHasha();
    window.addEventListener("hashchange", zHasha);
    return () => window.removeEventListener("hashchange", zHasha);
  }, []);

  async function kup() {
    zglosZdarzenie("kup_crm");
    setKupuje(true);
    setBladZakupu("");
    try {
      const r = await fetch("/api/crm-zakup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wariant, osoby, moduly }),
      });
      const d = await r.json();
      if (!d.url) throw new Error(d.error);
      window.location.href = d.url;
    } catch (e) {
      setBladZakupu(
        (e as Error).message || "Płatność chwilowo niedostępna. Napisz do nas.",
      );
      setKupuje(false);
    }
  }

  function pobierzPdf() {
    const d = kodujWycene({ t: "c", n: osoby, w: wariant, m: moduly });
    window.open(`/wycena?d=${d}`, "_blank", "noopener");
  }

  function wyslij() {
    zglosZdarzenie("konfigurator_crm");
    const nazwa = WARIANTY_CRM.find((w) => w.id === wariant)!.nazwa;
    const tekst =
      `Konfiguracja FluxCRM: ${osoby} ${osoby === 1 ? "osoba" : "osób"}, wariant: ${nazwa}. ` +
      (moduly.length
        ? `Moduły AI: ${MODULY_CRM.filter((m) => moduly.includes(m.id)).map((m) => m.nazwa).join(", ")}. `
        : "") +
      `Abonament ${zl(miesiecznie)} zł netto miesięcznie, wdrożenie 1 zł, ` +
      `rok ${zl(rok)} zł netto.`;
    const pole = document.getElementById(
      "message",
    ) as HTMLTextAreaElement | null;
    if (!pole) {
      window.location.href = "/#kontakt";
      return;
    }
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    )?.set;
    if (setter) setter.call(pole, tekst);
    else pole.value = tekst;
    pole.dispatchEvent(new Event("input", { bubbles: true }));
    pole.scrollIntoView({ behavior: "smooth", block: "center" });
    const email = document.getElementById("email") as HTMLInputElement | null;
    window.setTimeout(() => email?.focus({ preventScroll: true }), 500);
  }

  return (
    <section id="kup" className="mt-16 scroll-mt-24" aria-labelledby="konf-crm-h">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="konf-crm-h" className="h2-sekcji">
          Policz abonament dla swojego zespołu
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Wybierz liczbę osób i wariant. Wdrożenie 1 zł, ceny netto.
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200/80 bg-white/60 p-6 text-center dark:border-gray-800/80 dark:bg-gray-900/40 sm:p-8">
          <label
            htmlFor="konf-osoby"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Liczba osób w CRM
          </label>
          <p
            className="mt-1 text-6xl font-bold tabular-nums text-accent"
            aria-live="polite"
          >
            {osoby}
          </p>
          <input
            id="konf-osoby"
            type="range"
            min={1}
            max={30}
            step={1}
            value={osoby}
            onChange={(e) => setOsoby(Number(e.target.value))}
            className="mt-4 w-full accent-[rgb(var(--accent-solid))]"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>1</span>
            <span>30</span>
          </div>

          <div
            role="radiogroup"
            aria-label="Wariant CRM"
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {WARIANTY_CRM.map((w) => {
              const aktywny = wariant === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  role="radio"
                  aria-checked={aktywny}
                  onClick={() => setWariant(w.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-center transition sm:w-[calc(50%-0.375rem)] ${
                    aktywny
                      ? "border-accent bg-accent/10 ring-2 ring-accent/40"
                      : "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900"
                  } hover:border-accent`}
                >
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {w.nazwa}
                  </span>
                  <span className="block text-lg font-bold tabular-nums text-accent">
                    {zl(w.abonament)}&nbsp;zł/mies.
                  </span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {w.opis}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-8 text-sm font-medium text-gray-700 dark:text-gray-300">
            Moduły AI
          </p>
          <div className="mt-3 grid gap-3 text-left sm:grid-cols-2">
            {MODULY_CRM.map((m) => {
              const aktywny = moduly.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  role="switch"
                  aria-checked={aktywny}
                  onClick={() =>
                    setModuly((x) =>
                      x.includes(m.id) ? x.filter((y) => y !== m.id) : [...x, m.id],
                    )
                  }
                  className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 transition disabled:cursor-default ${
                    aktywny
                      ? "border-accent bg-accent/10"
                      : "border-gray-200 bg-white hover:border-accent dark:border-gray-700 dark:bg-gray-900"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      {m.nazwa}
                    </span>
                    <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
                      {m.opis}
                    </span>
                    <span className="mt-2 block text-xs font-semibold tabular-nums text-accent">
                      +{m.miesiecznie} zł/mies.
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
                      aktywny ? "bg-accent-solid" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                        aktywny ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-200/80 pt-6 dark:border-gray-800/80">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Abonament miesięcznie
            </p>
            <p className="text-4xl font-bold tabular-nums text-gray-900 dark:text-white">
              {zl(aMies)}&nbsp;zł{" "}
              <span className="text-base font-medium text-gray-600 dark:text-gray-400">
                netto
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              {osoby <= W_ABONAMENCIE
                ? `${zl(baza)} zł obejmuje do ${W_ABONAMENCIE} osób`
                : `${zl(baza)} zł za ${W_ABONAMENCIE} osoby plus ${osoby - W_ABONAMENCIE} × ${OSOBA_DODATKOWA} zł`}
              {platne.map((m) => `, ${m.miesiecznie} zł ${m.skrot}`).join("")}
            </p>

            <div className="mx-auto mt-6 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wdrożenie
                </p>
                <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  1&nbsp;zł
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pierwszy rok
                </p>
                <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {zl(aRok)}&nbsp;zł
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Pierwsza płatność:{" "}
            <span className="font-semibold tabular-nums text-gray-900 dark:text-white">
              {brutto.toLocaleString("pl-PL", { minimumFractionDigits: 2 })}&nbsp;zł
              brutto
            </span>{" "}
            (abonament i wdrożenie z VAT 23%)
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={kup}
              disabled={kupuje}
              className="btn-primary disabled:opacity-60"
            >
              {kupuje ? "Przechodzimy do płatności…" : "Kup online"}
            </button>
            <button type="button" onClick={wyslij} className="btn-secondary">
              Wyślij tę konfigurację
            </button>
            <button type="button" onClick={pobierzPdf} className="btn-secondary">
              Pobierz wycenę PDF
            </button>
          </div>
          {bladZakupu && (
            <p role="alert" className="mt-3 text-sm text-red-600 dark:text-red-400">
              {bladZakupu}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
