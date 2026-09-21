"use client";

import { useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Punkt {
  nazwa: string;
  odleglosc: number;
}

interface Wynik {
  status: "OK" | "BRAK_MIEJSCA" | "BRAK_DANYCH";
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  opis?: string;
  zastrzezenie?: string | null;
  miejsce?: string;
  branza?: string;
  w1?: number;
  w3?: number;
  w5?: number;
  ludnosc?: { liczba: number; rok: string; jednostka: string } | null;
  naDziesiecTysiecy?: number | null;
  mieszkancowNaPunkt?: number | null;
  najblizsze?: Punkt[];
}

const BRANZE = [
  ["apteka", "Apteka"],
  ["restauracja", "Restauracja lub bar"],
  ["fryzjer", "Fryzjer"],
  ["kosmetyczka", "Salon kosmetyczny"],
  ["piekarnia", "Piekarnia"],
  ["silownia", "Siłownia lub klub fitness"],
  ["przedszkole", "Przedszkole lub żłobek"],
  ["weterynarz", "Weterynarz"],
  ["warsztat", "Warsztat samochodowy"],
  ["myjnia", "Myjnia samochodowa"],
  ["kwiaciarnia", "Kwiaciarnia"],
  ["dentysta", "Dentysta"],
];

// Gotowe pary miejsce i branza. Formularz ma dwa pola, wiec sam start
// wymagal od odwiedzajacego wymyslenia adresu i wybrania branzy, zanim
// zobaczyl, co z tego wychodzi. Te przyciski odwracaja kolejnosc: najpierw
// wynik, potem decyzja, czy sprawdzic wlasna okolice. Miejsca sa celowo
// rozne wielkoscia, zeby bylo widac, ze wskaznik zalezy od gminy.
const PRZYKLADY = [
  {
    miejsce: "Grodzisk Mazowiecki",
    branza: "apteka",
    etykieta: "Apteka, Grodzisk Mazowiecki",
  },
  {
    miejsce: "Zakopane",
    branza: "restauracja",
    etykieta: "Restauracja, Zakopane",
  },
  { miejsce: "Wrocław", branza: "fryzjer", etykieta: "Fryzjer, Wrocław" },
];

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Miejsce na kolejny punkt",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Nasycenie przeciętne",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Rynek gęsto obsadzony",
  },
};

/** Trzy pierscienie zasiegu, zeby bylo widac rozklad, a nie jedna liczbe. */
function Pierscienie({ w1, w3, w5 }: { w1: number; w3: number; w5: number }) {
  const maks = Math.max(w5, 1);
  const wiersze = [
    { etykieta: "do 1 km", wartosc: w1 },
    { etykieta: "do 3 km", wartosc: w3 },
    { etykieta: "do 5 km", wartosc: w5 },
  ];
  return (
    <div className="mt-4 space-y-2">
      {wiersze.map((w) => (
        <div key={w.etykieta} className="flex items-center gap-3">
          <span className="w-16 text-xs text-gray-500 dark:text-gray-400">
            {w.etykieta}
          </span>
          <div className="flex-1 h-6 rounded bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full bg-accent/80 transition-all duration-700 ease-out"
              style={{ width: `${Math.max((w.wartosc / maks) * 100, 3)}%` }}
            />
          </div>
          <span className="w-10 text-right text-sm font-bold tabular-nums text-gray-900 dark:text-white">
            {w.wartosc}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function LokalizacjaCheck() {
  const [miejsce, setMiejsce] = useState("");
  const [branza, setBranza] = useState("apteka");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">(
    "idle",
  );
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">(
    "idle",
  );
  const [leadBlad, setLeadBlad] = useState("");

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(miejsce, branza);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby wynik
  // powstawal tak samo niezaleznie od tego, skad przyszly miejsce i branza.
  async function uruchom(celMiejsce: string, celBranza: string) {
    if (!celMiejsce.trim()) return;
    setMiejsce(celMiejsce);
    setBranza(celBranza);
    zglosZdarzenie("uruchomiono_skan");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/sprawdz-lokalizacje", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ miejsce: celMiejsce, branza: celBranza }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego miejsca.");
        setStan("blad");
        return;
      }
      setWynik(data);
      setStan("gotowe");
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  async function zamow(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setLeadStan("wysylam");
    setLeadBlad("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.miejsce || miejsce,
          problemType: "Analiza lokalizacji pod punkt",
          problemScale: `${wynik.branza}, ${wynik.w5} punktów w 5 km`,
          message: [
            `Sprawdzane miejsce: ${wynik.miejsce}`,
            `Branża: ${wynik.branza}`,
            `Konkurenci: ${wynik.w1} do 1 km, ${wynik.w3} do 3 km, ${wynik.w5} do 5 km`,
            wynik.ludnosc
              ? `Ludność ${wynik.ludnosc.jednostka}: ${wynik.ludnosc.liczba} (${wynik.ludnosc.rok})`
              : "Ludności nie udało się dopasować",
            wynik.naDziesiecTysiecy !== null
              ? `Wskaźnik: ${wynik.naDziesiecTysiecy} na 10 tys. mieszkańców`
              : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => null);
        setLeadBlad(d?.error || "Nie udało się wysłać zgłoszenia.");
        setLeadStan("blad");
        return;
      }
      setLeadStan("ok");
    } catch {
      setLeadBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setLeadStan("blad");
    }
  }

  const m = wynik?.werdykt ? MOTYW[wynik.werdykt] : null;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, ilu masz konkurentów w okolicy
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Podaj miejscowość albo adres i wybierz branżę. Policzę punkty w
        promieniu pięciu kilometrów, zestawię je z liczbą mieszkańców gminy i
        powiem, ilu ludzi przypada na jeden taki punkt. Bez rejestracji.
      </p>

      <Przyklady
        pozycje={PRZYKLADY.map((p) => ({
          wartosc: `${p.miejsce}|${p.branza}`,
          etykieta: p.etykieta,
        }))}
        onWybor={(w) => {
          const [m, b] = w.split("|");
          void uruchom(m, b);
        }}
        zablokowane={stan === "ladowanie"}
        wstep="Nie masz jeszcze konkretnego adresu? Zobacz na gotowym przykładzie:"
      />

      <form onSubmit={sprawdz} className="mt-5 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            required
            value={miejsce}
            onChange={(e) => setMiejsce(e.target.value)}
            placeholder="Grodzisk Mazowiecki albo ulica i miasto"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
          />
          <select
            value={branza}
            onChange={(e) => setBranza(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
          >
            {BRANZE.map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary w-full justify-center px-6 py-3 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Liczę..." : "Sprawdź okolicę"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Pytam bazę map o punkty i rejestr statystyczny o liczbę mieszkańców.
          To trwa kilkanaście sekund.
        </p>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && wynik.status !== "OK" && (
        <div className="mt-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {wynik.opis}
          </p>
        </div>
      )}

      {wynik && wynik.status === "OK" && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p
            className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}
          >
            {m.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {wynik.branza}, {wynik.miejsce}
          </p>

          <Pierscienie
            w1={wynik.w1 ?? 0}
            w3={wynik.w3 ?? 0}
            w5={wynik.w5 ?? 0}
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                {wynik.mieszkancowNaPunkt?.toLocaleString("pl-PL") ??
                  "brak danych"}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                mieszkańców na jeden taki punkt
              </p>
            </div>
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
                {wynik.ludnosc
                  ? wynik.ludnosc.liczba.toLocaleString("pl-PL")
                  : "brak"}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {wynik.ludnosc
                  ? `mieszkańców, ${wynik.ludnosc.jednostka}, dane z ${wynik.ludnosc.rok}`
                  : "nie udało się dopasować gminy do rejestru"}
              </p>
            </div>
          </div>

          {wynik.zastrzezenie && (
            <p className="mt-4 rounded-lg border border-amber-400/50 bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-800 dark:text-gray-200">
              {wynik.zastrzezenie}
            </p>
          )}

          {wynik.najblizsze && wynik.najblizsze.length > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Najbliżsi konkurenci
              </p>
              <ul className="mt-2 space-y-1">
                {wynik.najblizsze.map((p, i) => (
                  <li
                    key={`${p.nazwa}-${i}`}
                    className="flex justify-between gap-3 rounded bg-white/70 dark:bg-gray-950/50 px-3 py-1.5 text-sm"
                  >
                    <span className="text-gray-800 dark:text-gray-200">
                      {p.nazwa}
                    </span>
                    <span className="tabular-nums text-gray-500 dark:text-gray-400">
                      {p.odleglosc} km
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To jest szybki przekrój jednej branży w jednym promieniu. Pełny
              raport liczy zasięg dojazdu zamiast okręgu, zestawia Twoją
              lokalizację z sąsiednimi gminami, dokłada trend liczby mieszkańców
              i kończy się wnioskiem: otwierać, negocjować czynsz albo odpuścić.
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z tym wynikiem. Odpiszę na {email}, zwykle
                tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="lokalizacja-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę pełny raport dla tej lokalizacji
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="lokalizacja-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={leadStan === "wysylam"}
                    className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
                  >
                    {leadStan === "wysylam"
                      ? "Wysyłam..."
                      : "Wyślij zgłoszenie"}
                  </button>
                </div>
                {leadStan === "blad" && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {leadBlad}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Dane o punktach pochodzą z otwartej bazy map, a liczba mieszkańców z
        publicznego rejestru statystycznego. Baza map bywa niekompletna na
        wsiach, więc wynik traktuj jako przekrój, nie spis powszechny.
      </p>
    </div>
  );
}
