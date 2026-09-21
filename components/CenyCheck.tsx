"use client";

import { useEffect, useRef, useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import Przyklady from "@/components/Przyklady";

interface Produkt {
  nazwa: string;
  url: string;
  regularna: number;
  promocyjna: number;
  zgodny: boolean;
  powod: string;
  obnizka: number;
}

interface Wynik {
  domena: string;
  status: "OK" | "BRAK_API" | "BRAK_PROMOCJI" | "BRAK_ODPOWIEDZI";
  metoda?: string;
  probka?: boolean;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  zbadane?: number;
  niezgodne?: number;
  procent?: number;
  naglowek: string;
  opis: string;
  produkty?: Produkt[];
}

const ETAPY = [
  "Sprawdzam, skąd ten sklep da się odczytać",
  "Zbieram produkty, które są teraz przecenione",
  "Otwieram kolejno karty tych produktów",
  "Szukam komunikatu o najniższej cenie z 30 dni",
  "Odsiewam pozorną zgodność, czyli 30 dni na zwrot",
];

// Sklepy dobrane pomiarem: kazdy z nich odpowiada na sprawdzenie i wraca
// z wynikiem, zeby pierwsze klikniecie nie konczylo sie komunikatem o braku
// danych. Werdykt liczony jest na zywo, nie jest tu zapisany.
const PRZYKLADY = [
  { wartosc: "wittchen.com" },
  { wartosc: "morele.net" },
  { wartosc: "sklep-presto.pl" },
];

const MOTYW: Record<string, { ramka: string; tlo: string; tekst: string; etykieta: string }> = {
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
    etykieta: "Są braki",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Większość przecen bez informacji",
  },
};

/** Pasek udzialu niezgodnych, zeby liczba byla widokiem a nie tabelka. */
function Pasek({ procent }: { procent: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-end justify-between mb-1.5">
        <span className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums">
          {procent}%
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 pb-1.5">
          przecen bez wymaganej informacji
        </span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            procent === 0
              ? "bg-emerald-500"
              : procent >= 50
                ? "bg-red-500"
                : "bg-amber-500"
          }`}
          style={{ width: `${Math.max(procent, 2)}%` }}
        />
      </div>
    </div>
  );
}

export default function CenyCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [etap, setEtap] = useState(0);
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  async function sprawdz(e: React.FormEvent | null, adres?: string) {
    e?.preventDefault();
    const cel = (adres ?? domena).trim();
    if (!cel) return;
    zglosZdarzenie("uruchomiono_skan");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    setEtap(0);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setEtap((x) => Math.min(x + 1, ETAPY.length - 1)),
      1400,
    );
    try {
      const res = await fetch("/api/sprawdz-ceny", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const data = await res.json();
      if (timer.current) clearInterval(timer.current);
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego sklepu.");
        setStan("blad");
        return;
      }
      setWynik(data);
      setStan("gotowe");
    } catch {
      if (timer.current) clearInterval(timer.current);
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  async function zamow(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setLeadStan("wysylam");
    setLeadBlad("");
    const braki =
      wynik.produkty?.filter((p) => !p.zgodny).map((p) => `${p.nazwa}: ${p.url}`) || [];
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.domena,
          problemType: "Rejestr cen w sklepie",
          problemScale:
            wynik.status === "OK"
              ? `Niezgodnych ${wynik.niezgodne} z ${wynik.zbadane} (${wynik.procent}%)`
              : wynik.status,
          message: [
            `Sprawdzany sklep: ${wynik.domena}`,
            `Wynik skanu: ${wynik.naglowek}`,
            braki.length ? `Pozycje bez informacji:\n${braki.join("\n")}` : "",
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
  const niezgodneProdukty = wynik?.produkty?.filter((p) => !p.zgodny) || [];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź swoje przeceny za darmo
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz adres sklepu. Pobiorę listę produktów, które są u Ciebie teraz
        przecenione, otworzę ich karty i sprawdzę, czy jest przy nich wymagana
        informacja o najniższej cenie z 30 dni. Bez rejestracji i bez żadnych
        dostępów do panelu.
      </p>

      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          required
          value={domena}
          onChange={(e) => setDomena(e.target.value)}
          placeholder="twojsklep.pl"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź sklep"}
        </button>
      </form>

      <Przyklady
        pozycje={PRZYKLADY}
        zablokowane={stan === "ladowanie"}
        wstep="Nie chcesz zaczynać od własnego sklepu? Sprawdź gotowy:"
        onWybor={(w) => {
          setDomena(w);
          void sprawdz(null, w);
        }}
      />

      {stan === "ladowanie" && (
        <ol className="mt-5 space-y-2">
          {ETAPY.map((tekst, i) => (
            <li
              key={tekst}
              className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                i <= etap
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-2 w-2 rounded-full ${
                  i < etap
                    ? "bg-emerald-500"
                    : i === etap
                      ? "bg-accent animate-pulse"
                      : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
              {tekst}
            </li>
          ))}
          <li className="pt-1 text-xs text-gray-400 dark:text-gray-600">
            Otwieram karty jedna po drugiej, więc to trwa kilkanaście sekund.
          </li>
        </ol>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && wynik.status !== "OK" && (
        <div className="mt-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>
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
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>
          {wynik.metoda && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Podstawa wyniku: {wynik.metoda}.
              {wynik.probka
                ? " Ten sklep nie wystawia gotowej listy przecen, więc wynik opisuje sprawdzoną próbkę kart, a nie cały asortyment."
                : ""}
            </p>
          )}

          <Pasek procent={wynik.procent ?? 0} />

          {niezgodneProdukty.length > 0 && (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    <th className="pb-2 pr-3 font-semibold">Produkt</th>
                    <th className="pb-2 pr-3 font-semibold text-right">Było</th>
                    <th className="pb-2 pr-3 font-semibold text-right">Jest</th>
                    <th className="pb-2 pr-3 font-semibold text-right">Obniżka</th>
                    <th className="pb-2 font-semibold">Sprawdź</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70 dark:divide-gray-700/70">
                  {niezgodneProdukty.map((p) => (
                    <tr key={p.url} className="text-gray-800 dark:text-gray-200">
                      <td className="py-2 pr-3">{p.nazwa}</td>
                      <td className="py-2 pr-3 text-right tabular-nums line-through text-gray-500">
                        {p.regularna > 0 ? p.regularna.toFixed(2) : "\u2014"}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums font-semibold">
                        {p.promocyjna > 0 ? p.promocyjna.toFixed(2) : "\u2014"}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-red-600 dark:text-red-400">
                        {p.obnizka > 0 ? `-${p.obnizka}%` : "\u2014"}
                      </td>
                      <td className="py-2">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline"
                        >
                          otwórz
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.niezgodne === 0
                ? "Sprawdziłem tylko obecność komunikatu, nie to, czy podana kwota jest prawdziwa. Tego nie da się ustalić z zewnątrz, bo nikt nie ma historii cen Twojego sklepu. Właśnie dlatego prowadzenie rejestru cen jest osobną usługą: od dnia uruchomienia zbiera dowód na przyszłość."
                : "To sprawdzenie objęło tylko kilka pierwszych przecen. Pełny skan przechodzi przez wszystkie i kończy się raportem PDF, który można przekazać obsłudze sklepu. Zostaw adres, odeślę wynik razem z listą pozycji do poprawy."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem tego skanu. Odpiszę na {email},
                zwykle tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="cenycheck-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {wynik.niezgodne === 0
                    ? "Podaj maila, jeśli chcesz rejestr cen na przyszłość"
                    : "Podaj maila, odeślę pełny skan wszystkich przecen"}
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="cenycheck-email"
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
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{leadBlad}</p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Przesyłam tylko adres sklepu i wynik skanu. Bez zapisu na
                  newsletter.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Sprawdzam wyłącznie publicznie dostępne strony Twojego sklepu i pobieram
        kilka pierwszych przecen. To ocena techniczna obecności komunikatu, nie
        opinia prawna.
      </p>
    </div>
  );
}
