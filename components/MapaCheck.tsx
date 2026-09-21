"use client";

import { zglosZdarzenie } from "@/lib/zdarzenie";
import { useEffect, useRef, useState } from "react";

interface Zepsuty {
  adres: string;
  kod: number | null;
}

interface Wynik {
  status: string;
  domena: string;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  komentarz: string;
  maRobots?: boolean;
  wskazanaWRobots?: boolean;
  blokadaIndeksowania?: boolean;
  wSitemap?: number;
  sprawdzone?: number;
  zepsute?: Zepsuty[];
}

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Bez zastrzeżeń",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Do poprawy",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Wyszukiwarka nie ma listy stron",
  },
};

const ETAPY = [
  "Czytam plik robots.txt",
  "Szukam mapy strony",
  "Pobieram listę adresów",
  "Sprawdzam próbkę adresów po kolei",
];

export default function MapaCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [etap, setEtap] = useState(0);
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (stan === "ladowanie") {
      setEtap(0);
      timer.current = setInterval(
        () => setEtap((e) => Math.min(e + 1, ETAPY.length - 1)),
        1400,
      );
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [stan]);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("ladowanie");
    zglosZdarzenie("uruchomiono_skan");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/sprawdz-mape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tej strony.");
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
          company: wynik.domena,
          problemType: "Mapa strony i indeksowanie",
          problemScale: `Werdykt: ${wynik.werdykt}`,
          message: [
            `Domena: ${wynik.domena}`,
            `Adresów w mapie strony: ${wynik.wSitemap ?? 0}`,
            `Sprawdzono: ${wynik.sprawdzone ?? 0}`,
            `Nie działa: ${(wynik.zepsute || []).length}`,
            `Mapa wskazana w robots.txt: ${wynik.wskazanaWRobots ? "tak" : "nie"}`,
            `Blokada indeksowania: ${wynik.blokadaIndeksowania ? "TAK" : "nie"}`,
            ...(wynik.zepsute || []).map((z) => `  ${z.kod ?? "brak"} ${z.adres}`),
          ].join("\n"),
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
  const zepsute = wynik?.zepsute || [];
  const dzialajace = (wynik?.sprawdzone ?? 0) - zepsute.length;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czy wyszukiwarka w ogóle ma listę Twoich podstron
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Mapa strony to lista adresów, którą wyszukiwarka pobiera jednym
        zapytaniem, zamiast odkrywać podstrony klikaniem. Sprawdzam, czy ją
        macie, czy jest wskazana w pliku robots.txt i czy adresy z niej
        faktycznie działają. Biorę próbkę, a nie cały serwis, żeby nie obciążać
        Waszego serwera.
      </p>

      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          required
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="twojafirma.pl"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź mapę strony"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <ul className="mt-5 space-y-2">
          {ETAPY.map((t, i) => (
            <li
              key={t}
              className={`flex items-center gap-3 text-sm transition-opacity ${
                i <= etap
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-600 opacity-60"
              }`}
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  i < etap
                    ? "bg-emerald-500"
                    : i === etap
                      ? "bg-accent animate-pulse"
                      : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              {t}
            </li>
          ))}
        </ul>
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
            {wynik.komentarz}
          </p>
        </div>
      )}

      {wynik && wynik.status === "OK" && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {m.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {
                etykieta: "Adresów w mapie",
                wartosc: (wynik.wSitemap ?? 0).toLocaleString("pl-PL"),
              },
              { etykieta: "Sprawdzono", wartosc: String(wynik.sprawdzone ?? 0) },
              { etykieta: "Działa", wartosc: String(Math.max(0, dzialajace)) },
              { etykieta: "Nie działa", wartosc: String(zepsute.length) },
            ].map((k) => (
              <div
                key={k.etykieta}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60 p-3"
              >
                <p className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                  {k.wartosc}
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  {k.etykieta}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-950/40 px-2.5 py-1 text-gray-600 dark:text-gray-400">
              robots.txt: {wynik.maRobots ? "jest" : "brak"}
            </span>
            <span className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-950/40 px-2.5 py-1 text-gray-600 dark:text-gray-400">
              mapa wskazana w robots.txt: {wynik.wskazanaWRobots ? "tak" : "nie"}
            </span>
            {wynik.blokadaIndeksowania && (
              <span className="rounded-md border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 font-semibold text-red-700 dark:text-red-400">
                robots.txt blokuje cały serwis
              </span>
            )}
          </div>

          {zepsute.length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">Odpowiedź</th>
                    <th className="px-3 py-2 font-medium">Adres z mapy strony</th>
                  </tr>
                </thead>
                <tbody>
                  {zepsute.map((z) => (
                    <tr
                      key={z.adres}
                      className="border-t border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-3 py-2 font-semibold tabular-nums text-red-600 dark:text-red-400">
                        {z.kod ?? "brak"}
                      </td>
                      <td className="max-w-md truncate px-3 py-2 font-mono text-gray-700 dark:text-gray-300">
                        {z.adres}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="mt-4 rounded-lg bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-800 dark:text-gray-200">
            {wynik.komentarz}
          </p>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Nie mam Ci tu nic do sprzedania. Jeśli chcesz, mogę sprawdzać to cyklicznie i odzywać się dopiero wtedy, gdy coś się zepsuje."
                : "Naprawa to wygenerowanie mapy strony pod Wasz system, wskazanie jej w robots.txt oraz rozstrzygnięcie, co zrobić z adresami, które nie działają: przekierować na następcę czy usunąć z listy. Pokazuję pełną listę, a nie tylko próbkę."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="mapa-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę pełny przegląd wszystkich adresów
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="mapa-email"
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
                    {leadStan === "wysylam" ? "Wysyłam..." : "Wyślij zgłoszenie"}
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
    </div>
  );
}
