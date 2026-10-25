"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { kodujWycene } from "@/lib/wycenaPdf";
import {
  OPCJE_STRONY,
  RODZAJE,
  TRESCI,
  PRODUKTY,
  OPIEKA,
  MAX_PODSTRON,
  MAX_JEZYKOW,
  ZA_PODSTRONE,
  wycenStrone,
  terminTekst,
  type OpcjaStrony,
} from "@/lib/opcjeStrony";

type Opcja = OpcjaStrony & { id: string };

const OPCJE: Opcja[] = Object.entries(OPCJE_STRONY)
  .map(([id, o]) => ({ id, ...o }))
  .filter((o) => o.wCenie.length < RODZAJE.length);

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

/** Schemat strony składa się na żywo z wybranych opcji. To makieta, nie projekt. */
function PodgladMakiety({
  rodzajId,
  wybrane,
  podstron,
  jezyki,
}: {
  rodzajId: string;
  wybrane: string[];
  podstron: number;
  jezyki: number;
}) {
  const ma = (id: string) => wybrane.includes(id) || OPCJE_STRONY[id].wCenie.includes(rodzajId);
  const blok = "rounded bg-gray-200 dark:bg-white/10";
  const menu = Math.min(6, Math.max(2, Math.ceil(podstron / 3)));
  return (
    <div
      aria-hidden="true"
      className="mx-auto mt-8 max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-950">
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/20" />
        <span className="ml-2 h-4 flex-1 rounded bg-white dark:bg-gray-900" />
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 transition-all duration-300">
          <span className="h-4 w-12 rounded bg-accent-solid" />
          <span className="flex-1" />
          {Array.from({ length: menu }).map((_, i) => (
            <span key={i} className={`h-2 w-8 ${blok} transition-all duration-300`} />
          ))}
          {jezyki > 0 && (
            <span className="rounded border border-accent px-1 text-[9px] font-semibold text-accent">
              {["PL", "EN", "DE", "UA"].slice(0, jezyki + 1).join(" / ")}
            </span>
          )}
        </div>
        <div className="grid grid-cols-[1.4fr_1fr] gap-3 rounded-xl bg-accent/10 p-4">
          <div className="space-y-2">
            <span className={`block h-3 w-4/5 ${blok}`} />
            <span className={`block h-3 w-3/5 ${blok}`} />
            <span className={`block h-2 w-full ${blok}`} />
            <span className="mt-1 inline-block h-5 w-16 rounded-full bg-accent-solid" />
          </div>
          {rodzajId === "landing" ? (
            <div className="space-y-1.5 rounded-lg border border-accent/40 bg-white p-2 dark:bg-gray-900">
              <span className={`block h-2 ${blok}`} />
              <span className={`block h-2 ${blok}`} />
              <span className="block h-3 rounded bg-accent-solid" />
              {ma("crm") && <span className="block text-[9px] font-semibold text-accent">do CRM</span>}
            </div>
          ) : (
            <span className="rounded-lg bg-gray-200/70 dark:bg-white/10" />
          )}
        </div>
        {rodzajId === "sklep" ? (
          <div className="grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <span className={`block aspect-square ${blok}`} />
                <span className={`block h-2 w-3/4 ${blok}`} />
                <span className="block h-2 w-1/2 rounded bg-accent/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-10 ${blok}`} />
            ))}
          </div>
        )}
        {ma("blog") && (
          <div className="grid grid-cols-3 gap-2 border-t border-dashed border-accent/50 pt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1">
                <span className="block h-1.5 w-1/3 rounded bg-accent/60" />
                <span className={`block h-2 ${blok}`} />
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-accent">
          {ma("cms") && <span className="rounded-full border border-accent/50 px-2 py-0.5">panel treści</span>}
          {ma("crm") && rodzajId !== "landing" && <span className="rounded-full border border-accent/50 px-2 py-0.5">formularz do CRM</span>}
          {ma("platnosci") && <span className="rounded-full border border-accent/50 px-2 py-0.5">płatności</span>}
          {ma("projekt") && <span className="rounded-full border border-accent/50 px-2 py-0.5">własny projekt</span>}
          <span className="rounded-full border border-accent/50 px-2 py-0.5">podstron: {podstron}</span>
        </div>
      </div>
    </div>
  );
}


const naglowek = "mb-3 mt-8 text-center text-sm font-semibold text-gray-900 dark:text-white";
const przycisk = (aktywny: boolean) =>
  `rounded-xl border px-3 py-2 text-sm transition-colors ${
    aktywny
      ? "border-accent bg-accent/10 font-semibold text-gray-900 dark:text-white"
      : "border-gray-200 bg-white text-gray-600 hover:border-accent/50 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-300"
  }`;

function Wybor<T extends string | number>({
  etykieta,
  wartosc,
  opcje,
  zmien,
}: {
  etykieta: string;
  wartosc: T;
  opcje: { id: T; nazwa: string; notka?: string }[];
  zmien: (v: T) => void;
}) {
  return (
    <div role="radiogroup" aria-label={etykieta} className="flex flex-wrap justify-center gap-2">
      {opcje.map((o) => (
        <button
          key={String(o.id)}
          type="button"
          role="radio"
          aria-checked={o.id === wartosc}
          onClick={() => zmien(o.id)}
          className={przycisk(o.id === wartosc)}
        >
          {o.nazwa}
          {o.notka && <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{o.notka}</span>}
        </button>
      ))}
    </div>
  );
}

export default function KonfiguratorStrony() {
  const [rodzajId, setRodzajId] = useState("firmowa");
  const [wybrane, setWybrane] = useState<string[]>([]);
  const [podstron, setPodstron] = useState(10);
  const [jezyki, setJezyki] = useState(0);
  const [tresci, setTresci] = useState<string>("mam");
  const [produkty, setProdukty] = useState<string>("do100");
  const [opieka, setOpieka] = useState(0);

  const konf = { r: rodzajId, o: wybrane, p: podstron, j: jezyki, tr: tresci, pr: produkty, op: opieka };
  const w = wycenStrone(konf)!;
  const rodzaj = w.rodzaj;
  const cena = useAnimowana(w.suma);
  const firmowa = rodzajId === "landing" ? wycenStrone({ ...konf, r: "firmowa" })! : null;

  const przelacz = (id: string) =>
    setWybrane((x) => (x.includes(id) ? x.filter((y) => y !== id) : [...x, id]));

  const pobierzPdf = () => {
    const d = kodujWycene({ t: "s", ...konf });
    window.open(`/wycena?d=${d}`, "_blank", "noopener");
  };

  const wyslij = () => {
    zglosZdarzenie("konfigurator_strony");
    const tekst = [
      "Konfiguracja ze strony:",
      ...w.pozycje.map((p) => `${p.nazwa}: ${zl(p.netto)}`),
      w.wCenie.length ? `W cenie: ${w.wCenie.join(", ")}` : "",
      `Razem: ${rodzajId === "sklep" ? "od " : ""}${zl(w.suma)} netto`,
      ...w.abonamenty.map((a) => `${a.nazwa}: ${zl(a.netto)}/mies.`),
      `Termin: ${terminTekst(w.tygodnie)}`,
    ]
      .filter(Boolean)
      .join("\n");
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
          Ustaw rodzaj, zakres i dodatki. Każda pozycja ma swoją kwotę, netto, bez VAT.
        </p>

        <p className="mb-3 text-center text-sm font-semibold text-gray-900 dark:text-white">
          1. Rodzaj strony
        </p>
        <div role="radiogroup" aria-label="Rodzaj strony" className="grid gap-3 md:grid-cols-3">
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
                <span className="block font-bold text-gray-900 dark:text-white">{r.nazwa}</span>
                <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">{r.opis}</span>
                <span className="mt-auto block pt-3 text-lg font-bold text-accent">od {zl(r.cena)}</span>
              </button>
            );
          })}
        </div>

        <p className={naglowek}>2. Zakres</p>
        <div className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800/60">
          <div>
            <label htmlFor="konf-podstron" className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">Liczba podstron</span>
              <span className="tabular-nums text-accent">
                <span className="text-lg font-bold">{podstron}</span>{" "}
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {podstron > rodzaj.podstron
                    ? `w pakiecie ${rodzaj.podstron}, każda kolejna ${ZA_PODSTRONE} zł`
                    : `w pakiecie do ${rodzaj.podstron}`}
                </span>
              </span>
            </label>
            <input
              id="konf-podstron"
              type="range"
              min={1}
              max={MAX_PODSTRON}
              value={podstron}
              onChange={(e) => setPodstron(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-[rgb(var(--accent))]"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Podstrona to osobny adres: oferta, cennik, kontakt, każda usługa.
            </p>
          </div>

          <div>
            <p className="mb-2 text-center text-sm font-semibold text-gray-900 dark:text-white">Teksty na stronę</p>
            <Wybor
              etykieta="Teksty"
              wartosc={tresci}
              zmien={setTresci}
              opcje={TRESCI.map((t) => ({
                id: t.id,
                nazwa: t.nazwa,
                notka: t.zaPodstrone ? `${t.zaPodstrone} zł za podstronę` : undefined,
              }))}
            />
          </div>

          <div>
            <p className="mb-2 text-center text-sm font-semibold text-gray-900 dark:text-white">
              Języki oprócz polskiego
            </p>
            <Wybor
              etykieta="Języki"
              wartosc={jezyki}
              zmien={setJezyki}
              opcje={Array.from({ length: MAX_JEZYKOW + 1 }, (_, i) => ({
                id: i,
                nazwa: i === 0 ? "Tylko polski" : `+${i}`,
              }))}
            />
          </div>

          {rodzajId === "sklep" && (
            <div>
              <p className="mb-2 text-center text-sm font-semibold text-gray-900 dark:text-white">Produkty w sklepie</p>
              <Wybor
                etykieta="Produkty"
                wartosc={produkty}
                zmien={setProdukty}
                opcje={PRODUKTY.map((x) => ({
                  id: x.id,
                  nazwa: x.nazwa,
                  notka: x.cena ? `+${zl(x.cena)}` : "w cenie",
                }))}
              />
            </div>
          )}
        </div>

        <p className={naglowek}>3. Dodatki</p>
        <div className="sierota-sm-2 mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
          {OPCJE.map((o) => {
            const wCenie = o.wCenie.includes(rodzajId);
            const aktywna = wCenie || wybrane.includes(o.id);
            return (
              <button
                key={o.id}
                type="button"
                role="switch"
                aria-checked={aktywna}
                disabled={wCenie}
                onClick={() => przelacz(o.id)}
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-200 disabled:cursor-default ${
                  aktywna
                    ? "border-accent bg-accent/10"
                    : "border-gray-200 bg-white hover:border-accent/50 dark:border-gray-700 dark:bg-gray-800/60"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">{o.nazwa}</span>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">
                    {wCenie ? "w cenie" : `+${zl(o.cena)}${o.miesiecznie ? ` i ${zl(o.miesiecznie)}/mies.` : ""}`}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-200 ${
                    aktywna ? "bg-accent-solid" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${
                      aktywna ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <p className={naglowek}>4. Opieka po starcie</p>
        <Wybor
          etykieta="Opieka"
          wartosc={opieka}
          zmien={setOpieka}
          opcje={OPIEKA.map((o) => ({ id: o.cena, nazwa: o.cena ? `${zl(o.cena)}/mies.` : "Bez opieki" }))}
        />
        <p className="mt-2 min-h-5 text-center text-xs text-gray-500 dark:text-gray-400">
          {(OPIEKA.find((o) => o.cena === opieka) as { opis?: string } | undefined)?.opis ??
            "Poprawki zamawiasz wtedy, gdy są potrzebne."}
        </p>

        <PodgladMakiety rodzajId={rodzajId} wybrane={wybrane} podstron={podstron} jezyki={jezyki} />

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-accent bg-white p-6 shadow-lg shadow-accent/10 dark:bg-gray-800/60">
          <p className="text-center text-sm font-semibold text-gray-900 dark:text-white">5. Wycena</p>
          <ul className="mt-4 divide-y divide-gray-100 text-sm dark:divide-white/10">
            {w.pozycje.map((p) => (
              <li key={p.nazwa} className="flex items-baseline justify-between gap-4 py-2">
                <span>
                  <span className="text-gray-900 dark:text-white">{p.nazwa}</span>
                  {p.opis && <span className="block text-xs text-gray-500 dark:text-gray-400">{p.opis}</span>}
                </span>
                <span className="whitespace-nowrap font-semibold tabular-nums text-gray-900 dark:text-white">
                  {zl(p.netto)}
                </span>
              </li>
            ))}
          </ul>
          {w.wCenie.length > 0 && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">W cenie: {w.wCenie.join(", ")}.</p>
          )}
          <p className="mt-4 text-center text-4xl font-bold text-accent sm:text-5xl" aria-live="polite">
            {rodzajId === "sklep" ? "od " : ""}
            {zl(cena)} <span className="text-lg font-semibold">netto</span>
          </p>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Termin: {terminTekst(w.tygodnie)}. Hosting w cenie wdrożenia, domena 50-150 zł rocznie.
            {w.miesiecznie > 0 &&
              ` Co miesiąc, poza sumą: ${w.abonamenty.map((x) => `${x.nazwa.split(" ")[0].toLowerCase()} ${zl(x.netto)}`).join(", ")}.`}
          </p>
          {firmowa && firmowa.suma <= w.suma && (
            <p className="mt-3 text-center text-sm">
              <button type="button" onClick={() => setRodzajId("firmowa")} className="font-semibold text-accent hover:underline">
                Strona firmowa z CMS wyjdzie {firmowa.suma < w.suma ? "taniej" : "tyle samo"} ({zl(firmowa.suma)}), a ma panel edycji i blog
              </button>
            </p>
          )}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={wyslij} className="btn-primary">
              Wyślij tę wycenę
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
