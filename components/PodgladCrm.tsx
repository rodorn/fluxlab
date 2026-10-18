"use client";

import { useEffect, useRef, useState } from "react";

type Etap = "nowy" | "kontakt" | "oferta" | "wygrany";

const ETAPY: { id: Etap; nazwa: string }[] = [
  { id: "nowy", nazwa: "Nowy" },
  { id: "kontakt", nazwa: "Kontakt" },
  { id: "oferta", nazwa: "Oferta" },
  { id: "wygrany", nazwa: "Wygrany" },
];

type Zdarzenie = { typ: "formularz" | "mail" | "telefon" | "zadanie"; tekst: string; kiedy: string };
type Lead = { id: number; firma: string; osoba: string; zrodlo: string; etap: Etap; historia: Zdarzenie[] };

const START: Lead[] = [
  {
    id: 1, firma: "Przykład Transport", osoba: "Anna Przykładowa", zrodlo: "Formularz", etap: "nowy",
    historia: [
      { typ: "formularz", tekst: "Zapytanie o flotę 12 aut", kiedy: "dziś 9:02" },
      { typ: "zadanie", tekst: "Zadzwoń w 15 minut (opiekun: Marek)", kiedy: "dziś 9:02" },
    ],
  },
  {
    id: 2, firma: "Demo Instalacje", osoba: "Jan Wzorcowy", zrodlo: "Telefon", etap: "nowy",
    historia: [
      { typ: "telefon", tekst: "Połączenie przychodzące, 4 min", kiedy: "dziś 8:40" },
      { typ: "zadanie", tekst: "Wyślij ofertę wstępną", kiedy: "dziś 8:45" },
    ],
  },
  {
    id: 3, firma: "Test Meble", osoba: "Ewa Testowa", zrodlo: "Poczta", etap: "kontakt",
    historia: [
      { typ: "mail", tekst: "Zapytanie o wycenę, przypisane do opiekuna", kiedy: "wczoraj 16:10" },
      { typ: "telefon", tekst: "Rozmowa, klient prosi o ofertę", kiedy: "wczoraj 16:25" },
    ],
  },
  {
    id: 4, firma: "Wzór Logistyka", osoba: "Piotr Fikcyjny", zrodlo: "Formularz", etap: "oferta",
    historia: [
      { typ: "formularz", tekst: "Zapytanie ze strony", kiedy: "pon 11:00" },
      { typ: "mail", tekst: "Oferta wysłana", kiedy: "wt 10:15" },
      { typ: "zadanie", tekst: "Przypomnij się w czwartek", kiedy: "wt 10:16" },
    ],
  },
  {
    id: 5, firma: "Próbka Budowlana", osoba: "Kasia Pokazowa", zrodlo: "Telefon", etap: "wygrany",
    historia: [
      { typ: "telefon", tekst: "Pierwsza rozmowa", kiedy: "tydz. temu" },
      { typ: "mail", tekst: "Umowa podpisana", kiedy: "wczoraj" },
    ],
  },
];

const IKONA: Record<Zdarzenie["typ"], string> = {
  formularz: "Formularz",
  mail: "Mail",
  telefon: "Telefon",
  zadanie: "Zadanie",
};

export default function PodgladCrm() {
  const [leady, setLeady] = useState<Lead[]>(START);
  const [otwarty, setOtwarty] = useState<number | null>(1);
  const [drag, setDrag] = useState<{ id: number; x: number; y: number; nad: Etap | null } | null>(null);
  const [komunikat, setKomunikat] = useState("");
  const dragRef = useRef(drag);
  dragRef.current = drag;

  const przenies = (id: number, etap: Etap) => {
    const l = leady.find((x) => x.id === id);
    if (!l || l.etap === etap) return;
    const nazwa = ETAPY.find((e) => e.id === etap)!.nazwa;
    setLeady((p) =>
      p.map((x) =>
        x.id === id
          ? { ...x, etap, historia: [...x.historia, { typ: "zadanie", tekst: `Etap zmieniony na: ${nazwa}`, kiedy: "teraz" }] }
          : x,
      ),
    );
    setKomunikat(`${l.firma}: etap ${nazwa}`);
  };

  const krok = (id: number, kier: -1 | 1) => {
    const l = leady.find((x) => x.id === id);
    if (!l) return;
    const i = ETAPY.findIndex((e) => e.id === l.etap) + kier;
    if (i < 0 || i >= ETAPY.length) return;
    przenies(id, ETAPY[i].id);
  };

  const znajdzKolumne = (x: number, y: number): Etap | null => {
    const el = document.elementFromPoint(x, y)?.closest("[data-etap]") as HTMLElement | null;
    return (el?.dataset.etap as Etap) ?? null;
  };

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) =>
      setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY, nad: znajdzKolumne(e.clientX, e.clientY) } : d));
    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      const nad = znajdzKolumne(e.clientX, e.clientY);
      if (d && nad) przenies(d.id, nad);
      setDrag(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag?.id, leady]);

  const wybrany = leady.find((l) => l.id === otwarty) ?? null;
  const dragLead = drag ? leady.find((l) => l.id === drag.id) : null;

  return (
    <section className="max-w-5xl mx-auto" aria-labelledby="podglad-crm-h">
      <div className="text-center mb-6">
        <h2 id="podglad-crm-h" className="h2-sekcji mb-2">Tak wygląda panel FluxCRM</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Przeciągnij kartę do innej kolumny albo kliknij ją, żeby zobaczyć historię klienta.
        </p>
        <p className="mt-3 inline-block rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-semibold px-3 py-1">
          Dane przykładowe, fikcyjne firmy i osoby
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ETAPY.map((e) => {
          const wKolumnie = leady.filter((l) => l.etap === e.id);
          const podswietl = drag?.nad === e.id;
          return (
            <div
              key={e.id}
              data-etap={e.id}
              className={`rounded-2xl p-3 min-h-[11rem] ring-1 transition-colors ${
                podswietl
                  ? "ring-2 ring-accent bg-accent/10"
                  : "ring-gray-200 dark:ring-white/10 bg-gray-50 dark:bg-gray-800/40"
              }`}
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex justify-between">
                {e.nazwa}
                <span className="text-gray-500 dark:text-gray-400 tabular-nums">{wKolumnie.length}</span>
              </h3>
              <ul className="space-y-2">
                {wKolumnie.map((l) => {
                  const i = ETAPY.findIndex((x) => x.id === l.etap);
                  return (
                    <li
                      key={l.id}
                      className={`rounded-xl bg-white dark:bg-gray-900 ring-1 p-2.5 ${
                        otwarty === l.id ? "ring-accent" : "ring-gray-200 dark:ring-white/10"
                      } ${drag?.id === l.id ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          onPointerDown={(ev) => {
                            ev.preventDefault();
                            setDrag({ id: l.id, x: ev.clientX, y: ev.clientY, nad: l.etap });
                          }}
                          style={{ touchAction: "none" }}
                          className="cursor-grab select-none text-gray-400 px-1 -ml-1 leading-5"
                          title="Przeciągnij"
                          aria-hidden="true"
                        >
                          ⠿
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtwarty(l.id)}
                          onKeyDown={(ev) => {
                            if (ev.key === "ArrowRight") { ev.preventDefault(); krok(l.id, 1); }
                            if (ev.key === "ArrowLeft") { ev.preventDefault(); krok(l.id, -1); }
                          }}
                          aria-label={`${l.firma}, ${l.osoba}. Otwórz kartę klienta. Strzałki w lewo i w prawo zmieniają etap.`}
                          className="text-left flex-1 min-w-0"
                        >
                          <span className="block text-sm font-semibold text-gray-900 dark:text-white truncate">{l.firma}</span>
                          <span className="block text-xs text-gray-600 dark:text-gray-400 truncate">{l.osoba} · {l.zrodlo}</span>
                        </button>
                      </div>
                      <div className="mt-2 flex justify-end gap-1">
                        <button
                          type="button"
                          disabled={i === 0}
                          onClick={() => krok(l.id, -1)}
                          aria-label={`Przenieś ${l.firma} do poprzedniego etapu`}
                          className="px-2 py-0.5 text-xs rounded-md ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          disabled={i === ETAPY.length - 1}
                          onClick={() => krok(l.id, 1)}
                          aria-label={`Przenieś ${l.firma} do następnego etapu`}
                          className="px-2 py-0.5 text-xs rounded-md ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30"
                        >
                          Przenieś →
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">{komunikat}</p>

      {wybrany && (
        <div className="mt-4 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-white dark:bg-gray-800/60 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{wybrany.firma}</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {wybrany.osoba} · źródło: {wybrany.zrodlo} · etap: {ETAPY.find((e) => e.id === wybrany.etap)!.nazwa}
            </span>
          </div>
          <ol className="space-y-2">
            {wybrany.historia.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="shrink-0 w-20 font-semibold text-accent">{IKONA[h.typ]}</span>
                <span className="flex-1 text-gray-700 dark:text-gray-300">{h.tekst}</span>
                <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{h.kiedy}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {drag && dragLead && (
        <div
          aria-hidden="true"
          className="fixed z-50 pointer-events-none rounded-xl bg-white dark:bg-gray-900 ring-2 ring-accent shadow-lg px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white"
          style={{ left: drag.x + 8, top: drag.y + 8 }}
        >
          {dragLead.firma}
        </div>
      )}
    </section>
  );
}
