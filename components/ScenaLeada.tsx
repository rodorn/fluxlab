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

// Przykłady wpisuje odwiedzający, więc mówią jego głosem.
const PRZYKLADY = [ // głos klienta
  "Prowadzę JDG, doradztwo podatkowe. Klienci piszą z formularza i z Facebooka, odpisuję wieczorami i część ucieka. Potrzebuję strony i prostego CRM, budżet ok. 6 tys.", // głos klienta
  "Firma instalacyjna z Wrocławia, 8 osób. Zapytania o pompy ciepła przychodzą mailem, telefonem i z formularza, oferty robimy w Excelu. Chcemy CRM z przydziałem do handlowca.", // głos klienta
  "Hurtownia materiałów budowlanych, 60 pracowników i 12 handlowców. Leady z formularza, telefonu i maila trzeba połączyć z ERP. Budżet do 40 tys., start w pierwszym kwartale.", // głos klienta
  "Kancelaria prawna w Warszawie, prawo rodzinne. Zapytania przychodzą mailem i telefonem, gubimy część z nich. Szukamy porządku przed nowym rokiem.", // głos klienta
  "Robimy kuchnie na wymiar pod Poznaniem. Klienci wysyłają wymiary i zdjęcia, a wycena zajmuje nam tydzień. Budżet do 15 tys.", // głos klienta
  "Salon medycyny estetycznej w Gdańsku. Chcemy, żeby klientka sama umawiała zabieg i dostawała przypomnienie SMS. Start w listopadzie.", // głos klienta
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

type R = React.RefObject<HTMLElement | null>;

/** Linie przepływu liczone z prawdziwych pozycji: od wyniku pod przyciskiem do
 *  karty CRM i od karty do telefonu. Kropki jadą po tych samych ścieżkach. */
function Polaczenia({
  scena,
  zrodlo,
  crm,
  tel,
  stan,
  karta,
  telefon,
}: {
  scena: R;
  zrodlo: R;
  crm: R;
  tel: R;
  stan: string;
  karta: boolean;
  telefon: boolean;
}) {
  const [d, setD] = useState<{ w: number; h: number; p1: string; p2: string } | null>(null);

  useEffect(() => {
    const licz = () => {
      const s = scena.current?.getBoundingClientRect();
      const z = zrodlo.current?.getBoundingClientRect();
      const c = crm.current?.getBoundingClientRect();
      const t = tel.current?.getBoundingClientRect();
      if (!s || !z || !c || !t) return;
      const x = (v: number) => Math.round(v - s.left) + 0.5;
      const y = (v: number) => Math.round(v - s.top) + 0.5;
      const zx = x(z.left + z.width / 2);
      const zy = y(z.bottom + 6);
      const cx = x(c.left + c.width / 2);
      const cy = y(c.top);
      const sr = Math.round((zy + cy) / 2);
      const p1 = `M ${zx} ${zy} V ${sr} H ${cx} V ${cy}`;
      let p2: string;
      if (t.left >= c.right) {
        const ay = y(c.top + c.height / 2);
        const by = y(t.top + t.height / 2);
        const mx = Math.round((x(c.right) + x(t.left)) / 2);
        p2 = `M ${x(c.right)} ${ay} H ${mx} V ${by} H ${x(t.left)}`;
      } else {
        p2 = `M ${cx} ${y(c.bottom)} V ${y(t.top)}`;
      }
      setD({ w: Math.round(s.width), h: Math.round(s.height), p1, p2 });
    };
    licz();
    const ro = new ResizeObserver(licz);
    [scena, zrodlo, crm, tel].forEach((r) => r.current && ro.observe(r.current));
    window.addEventListener("resize", licz);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", licz);
    };
  }, [scena, zrodlo, crm, tel]);

  if (!d) return null;
  const linia = "stroke-gray-300 dark:stroke-white/15";
  return (
    <svg
      key={`${stan}-${karta}-${telefon}`}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      width={d.w}
      height={d.h}
      fill="none"
    >
      <path id="sciezka-1" d={d.p1} className={`${linia} transition-colors ${stan === "czeka" || karta ? "stroke-accent/60" : ""}`} strokeWidth="1.5" strokeLinejoin="round" />
      <path id="sciezka-2" d={d.p2} className={`${linia} ${telefon ? "stroke-accent/60" : ""}`} strokeWidth="1.5" strokeLinejoin="round" />
      {stan === "czeka" && (
        <circle r="4.5" className="scena-kropka-svg">
          <animateMotion dur="1s" repeatCount="indefinite" rotate="auto">
            <mpath href="#sciezka-1" />
          </animateMotion>
        </circle>
      )}
      {karta && !telefon && (
        <circle r="5" opacity="0" className="scena-kropka-svg">
          <set attributeName="opacity" to="1" begin="0.35s" />
          <animateMotion dur="0.9s" begin="0.35s" fill="freeze">
            <mpath href="#sciezka-2" />
          </animateMotion>
        </circle>
      )}
    </svg>
  );
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
  const scena = useRef<HTMLDivElement | null>(null);
  const zrodlo = useRef<HTMLParagraphElement | null>(null);
  const crmRef = useRef<HTMLDivElement | null>(null);
  const telRef = useRef<HTMLDivElement | null>(null);
  // Godzina na ekranie telefonu dopiero po hydracji, bo strona jest statyczna.
  const [godzina, setGodzina] = useState("");
  useEffect(() => {
    const ustaw = () =>
      setGodzina(
        new Date().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Warsaw",
        }),
      );
    ustaw();
    const t = window.setInterval(ustaw, 30_000);
    return () => window.clearInterval(t);
  }, []);

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
    <div ref={scena} className="relative mx-auto w-full max-w-5xl">
      <Polaczenia scena={scena} zrodlo={zrodlo} crm={crmRef} tel={telRef} stan={stan} karta={!!karta} telefon={telefon} />
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
              className={`rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                tekst === p
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-gray-200 text-gray-600 hover:border-accent/50 dark:border-white/10 dark:text-white/60"
              }`}
            >
              {["JDG", "Mała firma", "Średnia firma", "Kancelaria", "Kuchnie na wymiar", "Medycyna estetyczna"][i]}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            type="submit"
            disabled={stan === "czeka"}
            className="btn-primary btn-lg disabled:opacity-60"
          >
            {stan === "czeka" ? "AI czyta zapytanie…" : "Wyślij jako klient"}
          </button>
          <p
            ref={zrodlo}
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

      <div aria-hidden="true" className="h-16" />

      <div className="grid items-center gap-0 md:grid-cols-[3fr_auto_2fr]">
        <div
          ref={crmRef}
          className={`relative z-10 overflow-hidden rounded-2xl border bg-white p-6 text-left transition-all duration-500 dark:bg-gray-900 ${
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
              <p className="pt-2 text-sm text-gray-500 dark:text-white/60">
                {stan === "czeka" ? "AI wypełnia kartę…" : "Czeka na zapytanie"}
              </p>
            </div>
          )}
        </div>

        <div aria-hidden="true" className="h-12 md:h-px md:w-12" />

        <div
          ref={telRef}
          className={`relative z-10 mx-auto h-[460px] w-[240px] rounded-[2.6rem] border-[7px] border-gray-900 bg-gradient-to-b from-accent/15 via-white to-white p-3 shadow-2xl transition-shadow duration-500 dark:border-gray-700 dark:from-accent/25 dark:via-gray-900 dark:to-gray-900 ${
            telefon ? "wibracja shadow-accent/30" : "shadow-gray-900/20"
          }`}
        >
          <div className="mx-auto h-5 w-20 rounded-full bg-gray-900 dark:bg-black" />
          <p className="mt-6 text-center text-4xl font-semibold tabular-nums tracking-tight text-gray-900 dark:text-white">
            {godzina || "\u00a0"}
          </p>
          <p className="text-center text-[11px] text-gray-500 dark:text-white/50">
            Telefon handlowca
          </p>
          <div className="mt-5 text-left">
            {karta && telefon ? (
              <div className="scena-wjazd rounded-2xl bg-white/90 p-3 shadow-lg ring-1 ring-gray-900/5 backdrop-blur dark:bg-white/10 dark:ring-white/10">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-solid" />
                  CRM · zadzwoń w 15 min
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {karta.temat}
                </p>
                <p className="mt-2 text-[10px] text-gray-500 dark:text-white/50">
                  Szkic odpowiedzi od AI:
                </p>
                <p className="mt-0.5 max-h-[170px] overflow-hidden text-[12px] leading-relaxed text-gray-700 dark:text-white/80">
                  {pisane}
                  {pisane.length < karta.odpowiedz.length && (
                    <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-accent align-middle" />
                  )}
                </p>
              </div>
            ) : (
              <p className="pt-10 text-center text-xs text-gray-400 dark:text-white/40">
                {karta ? "Przychodzi…" : stan === "czeka" ? "…" : "Brak powiadomień"}
              </p>
            )}
          </div>
          <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gray-900/30 dark:bg-white/30" />
        </div>
      </div>
    </div>
  );
}
