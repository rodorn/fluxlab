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
const ETYKIETY = ["JDG: doradca podatkowy", "Mała firma: pompy ciepła", "Średnia firma: hurtownia", "Kancelaria", "Kuchnie na wymiar", "Medycyna estetyczna"];
/** Firma, do której CRM trafia zapytanie z danego przykładu. */
const FIRMY = [
  "biuro doradztwa podatkowego (jednoosobowa działalność)",
  "mała firma montująca pompy ciepła",
  "hurtownia materiałów budowlanych",
  "kancelaria prawna, prawo rodzinne",
  "producent kuchni na wymiar",
  "salon medycyny estetycznej",
];

const PRZYKLADY = [ // głos klienta
  "Dzień dobry, od stycznia otwieram sklep internetowy z odzieżą. Szukam kogoś, kto poprowadzi księgowość i doradzi, czy ryczałt się opłaca. Mogę przesłać biznesplan.", // głos klienta
  "Dom 160 m² pod Wrocławiem, chcemy zamienić piec gazowy na pompę ciepła. Budżet ok. 50 tys., montaż najlepiej przed końcem lutego. Czy robicie audyt na miejscu?", // głos klienta
  "Firma budowlana z Opola. Potrzebujemy 40 palet bloczków i 120 worków cementu na budowę w przyszłym tygodniu, z dostawą. Prosimy o ofertę z rabatem przy stałej współpracy.", // głos klienta
  "Dzień dobry, chcę złożyć pozew o rozwód, mamy dwoje dzieci i wspólne mieszkanie w Warszawie. Kiedy mogę umówić pierwszą konsultację i ile kosztuje?", // głos klienta
  "Kuchnia w kształcie L, 3,2 na 2,4 m, fronty matowe białe, sprzęt AGD już mamy. Mieszkam w Poznaniu, montaż przed świętami. Ile to mniej więcej kosztuje?", // głos klienta
  "Chciałabym pierwszy raz zrobić botoks okolic oczu. Gdańsk, najlepiej sobota przed południem. Czy jest wcześniej konsultacja i ile kosztuje zabieg?", // głos klienta
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

/** Ikona pogody wg kodu WMO z Open-Meteo: słońce, chmura, deszcz albo śnieg. */
function IkonaPogody({ kod }: { kod: number }) {
  const snieg = (kod >= 71 && kod <= 77) || kod === 85 || kod === 86;
  const deszcz = !snieg && kod >= 51;
  const slonce = kod <= 1;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={slonce ? "text-amber-500" : "text-gray-500 dark:text-white/60"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      {slonce ? (
        <>
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
        </>
      ) : (
        <>
          <path d="M4.5 10.5a2.8 2.8 0 0 1 .3-5.6 3.6 3.6 0 0 1 6.9 1 2.3 2.3 0 0 1-.2 4.6z" />
          {deszcz && <path d="M5.5 12.5l-.6 1.5M8.5 12.5l-.6 1.5M11.5 12.5l-.6 1.5" />}
          {snieg && <path d="M5.5 13.2h.01M8.5 13.8h.01M11.5 13.2h.01" strokeWidth="2" />}
        </>
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
  const szkic = useRef<HTMLParagraphElement | null>(null);
  const ramka = useRef(0);

  // Najechanie przewija szkic odpowiedzi w dół w tempie czytania, zjechanie wraca na górę.
  const przewin = (wDol: boolean) => {
    const el = szkic.current;
    if (!el) return;
    cancelAnimationFrame(ramka.current);
    const cel = wDol ? el.scrollHeight - el.clientHeight : 0;
    const predkosc = wDol ? 0.045 : 0.6; // px na ms
    let poprzedni = performance.now();
    const krok = (t: number) => {
      const dt = t - poprzedni;
      poprzedni = t;
      const roznica = cel - el.scrollTop;
      if (Math.abs(roznica) < 1) return;
      el.scrollTop += Math.sign(roznica) * Math.min(Math.abs(roznica), predkosc * dt);
      ramka.current = requestAnimationFrame(krok);
    };
    ramka.current = requestAnimationFrame(krok);
  };

  useEffect(() => () => cancelAnimationFrame(ramka.current), []);
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
  // Miasto i temperatura pod zegarem, jak na ekranie blokady Androida.
  const [pogoda, setPogoda] = useState<{
    miasto: string;
    temp: number | null;
    kod: number | null;
  } | null>(null);
  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/miasto", { signal: ac.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && typeof d.miasto === "string") setPogoda(d);
      })
      .catch(() => {});
    return () => ac.abort();
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
        body: JSON.stringify({ tekst, firma: FIRMY[PRZYKLADY.indexOf(tekst)] ?? "" }),
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
              {ETYKIETY[i]}
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
          <p
            className={`flex h-4 items-center justify-center gap-1 text-xs font-medium text-gray-700 transition-opacity duration-700 dark:text-white/75 ${
              pogoda ? "opacity-100" : "opacity-0"
            }`}
          >
            {pogoda && (
              <>
                {pogoda.kod !== null && <IkonaPogody kod={pogoda.kod} />}
                {pogoda.miasto}
                {pogoda.temp !== null && ` ${pogoda.temp}°`}
              </>
            )}
          </p>
          <p className="mt-1 text-center text-[11px] text-gray-500 dark:text-white/50">
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
                <p
                  ref={szkic}
                  onMouseEnter={() => przewin(true)}
                  onMouseLeave={() => przewin(false)}
                  className="bez-paska mt-0.5 max-h-[170px] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_82%,transparent)] text-[12px] leading-relaxed text-gray-700 dark:text-white/80"
                >
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
