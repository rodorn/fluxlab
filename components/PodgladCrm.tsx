"use client";

import { useEffect, useRef, useState } from "react";

type Etap = "nowy" | "kontakt" | "oferta" | "wygrany";

const ETAPY: { id: Etap; nazwa: string }[] = [
  { id: "nowy", nazwa: "Nowy" },
  { id: "kontakt", nazwa: "Kontakt" },
  { id: "oferta", nazwa: "Oferta" },
  { id: "wygrany", nazwa: "Wygrany" },
];

type Zdarzenie = { typ: "formularz" | "mail" | "telefon" | "zadanie" | "automat"; tekst: string; kiedy: string };
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

function Blysk() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true" className="inline-block shrink-0">
      <path d="M7 1L2.5 7h3l-1 4L9.5 5h-3z" fill="currentColor" />
    </svg>
  );
}

const IKONA: Record<Zdarzenie["typ"], string> = {
  formularz: "Formularz",
  mail: "Mail",
  telefon: "Telefon",
  zadanie: "Zadanie",
  automat: "Automat",
};

/** Co CRM robi sam po wejściu karty do etapu. */
const AUTOMATY: Record<Etap, { skrot: string; kroki: string[] }> = {
  nowy: {
    skrot: "opiekun i zadanie",
    kroki: ["Przypisano opiekuna według regionu: Marek", "Zadanie: zadzwoń w 15 minut"],
  },
  kontakt: {
    skrot: "SMS i przypomnienie",
    kroki: ["SMS do klienta: dziękujemy, oddzwonimy dziś", "Zadanie: rozmowa do 16:00, przypomnienie 15 min wcześniej"],
  },
  oferta: {
    skrot: "oferta PDF i follow-up",
    kroki: ["Oferta PDF wygenerowana z cennika i wysłana mailem", "Follow-up za 3 dni, jeśli klient nie odpisze"],
  },
  wygrany: {
    skrot: "faktura, Slack, powitanie",
    kroki: ["Faktura wystawiona i wysłana do KSeF", "Zespół dostał powiadomienie na Slacku", "Mail powitalny z planem startu"],
  },
};

export default function PodgladCrm() {
  const [leady, setLeady] = useState<Lead[]>(START);
  const [otwarty, setOtwarty] = useState<number | null>(1);
  const [drag, setDrag] = useState<{ id: number; x: number; y: number; nad: Etap | null } | null>(null);
  const [komunikat, setKomunikat] = useState("");
  const [automat, setAutomat] = useState<{ firma: string; etap: string; kroki: string[]; n: number } | null>(null);
  const dragRef = useRef(drag);
  dragRef.current = drag;
  const start = useRef<{ id: number; x: number; y: number } | null>(null);
  const czasy = useRef<number[]>([]);

  useEffect(() => () => czasy.current.forEach((t) => window.clearTimeout(t)), []);

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
    setOtwarty(id);
    // Automatyzacje etapu dopisują się do historii po kolei, jak w prawdziwym CRM.
    czasy.current.forEach((t) => window.clearTimeout(t));
    const { kroki } = AUTOMATY[etap];
    setAutomat({ firma: l.firma, etap: nazwa, kroki, n: 0 });
    czasy.current = kroki.map((tekst, i) =>
      window.setTimeout(() => {
        setLeady((p) =>
          p.map((x) => (x.id === id ? { ...x, historia: [...x.historia, { typ: "automat", tekst, kiedy: "teraz" }] } : x)),
        );
        setAutomat((a) => (a ? { ...a, n: i + 1 } : a));
      }, 450 * (i + 1)),
    );
    czasy.current.push(window.setTimeout(() => setAutomat(null), 450 * (kroki.length + 1) + 2500));
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

  // Mysz: przeciąga się cała karta (od 6 px ruchu, krótsze kliknięcie otwiera kartę).
  // Dotyk: tylko za uchwyt, żeby nie blokować przewijania strony.
  useEffect(() => {
    const ruch = (e: PointerEvent) => {
      const s0 = start.current;
      if (!s0 || dragRef.current) return;
      if (Math.hypot(e.clientX - s0.x, e.clientY - s0.y) > 6) {
        setDrag({ id: s0.id, x: e.clientX, y: e.clientY, nad: znajdzKolumne(e.clientX, e.clientY) });
      }
    };
    const koniec = () => {
      start.current = null;
    };
    window.addEventListener("pointermove", ruch);
    window.addEventListener("pointerup", koniec);
    return () => {
      window.removeEventListener("pointermove", ruch);
      window.removeEventListener("pointerup", koniec);
    };
  }, []);

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) =>
      setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY, nad: znajdzKolumne(e.clientX, e.clientY) } : d));
    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      const nad = znajdzKolumne(e.clientX, e.clientY);
      if (d && nad) przenies(d.id, nad);
      setDrag(null);
      // Kliknięcie, które zakończyło przeciąganie, nie otwiera karty.
      window.addEventListener("click", (ev) => ev.stopPropagation(), { capture: true, once: true });
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
          Przeciągnij kartę do innej kolumny i zobacz, co CRM zrobi sam. Kliknięcie otwiera historię klienta.
        </p>
        <p className="mt-3 inline-block rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-semibold px-3 py-1">
          Dane przykładowe, fikcyjne firmy i osoby
        </p>
      </div>

      <div className="mb-3 flex min-h-[2.75rem] items-center justify-center" aria-hidden="true">
        {automat ? (
          <div key={automat.firma + automat.etap} className="scena-wjazd flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl bg-accent/10 px-4 py-2 text-sm text-accent">
            <span className="flex items-center gap-1 font-semibold"><Blysk /> {automat.firma} → {automat.etap}:</span>
            {automat.kroki.map((k, i) => (
              <span key={k} className={`transition-opacity duration-300 ${i < automat.n ? "opacity-100" : "opacity-30"}`}>
                {i < automat.n ? "✓" : "…"} {k.split(":")[0]}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400">Przenieś kartę, a CRM sam wykona automatyzacje etapu.</p>
        )}
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
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex justify-between">
                {e.nazwa}
                <span className="text-gray-500 dark:text-gray-400 tabular-nums">{wKolumnie.length}</span>
              </h3>
              <p className="mb-2 mt-0.5 flex items-center gap-1 text-[11px] text-accent">
                <Blysk />
                {AUTOMATY[e.id].skrot}
              </p>
              <ul className="space-y-2">
                {wKolumnie.map((l) => {
                  const i = ETAPY.findIndex((x) => x.id === l.etap);
                  return (
                    <li
                      key={l.id}
                      onPointerDown={(ev) => {
                        const t = ev.target as HTMLElement;
                        if (ev.button !== 0 || t.closest("[data-krok]")) return;
                        if (ev.pointerType !== "mouse" && !t.closest("[data-uchwyt]")) return;
                        if (ev.pointerType === "mouse") ev.preventDefault();
                        start.current = { id: l.id, x: ev.clientX, y: ev.clientY };
                        if (ev.pointerType !== "mouse") setDrag({ id: l.id, x: ev.clientX, y: ev.clientY, nad: l.etap });
                      }}
                      className={`select-none rounded-xl bg-white dark:bg-gray-900 ring-1 p-2.5 transition-shadow hover:shadow-md md:cursor-grab ${
                        otwarty === l.id ? "ring-accent" : "ring-gray-200 dark:ring-white/10"
                      } ${drag?.id === l.id ? "opacity-40" : ""}`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          data-uchwyt
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
                          data-krok
                          disabled={i === 0}
                          onClick={() => krok(l.id, -1)}
                          aria-label={`Przenieś ${l.firma} do poprzedniego etapu`}
                          className="px-2 py-0.5 text-xs rounded-md ring-1 ring-gray-200 dark:ring-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-30"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          data-krok
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
              <li key={i} className={`flex gap-3 text-sm ${h.typ === "automat" ? "scena-wjazd" : ""}`}>
                <span className="shrink-0 w-20 font-semibold text-accent">{h.typ === "automat" && <Blysk />} {IKONA[h.typ]}</span>
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
