"use client";

import { useEffect, useRef, useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Ogloszenie {
  data: string;
  nazwa: string;
  monitor: string;
  rozwiazanie: boolean;
}

interface Wynik {
  status: string;
  zapytanie: string;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  komentarz: string;
  liczbaOgloszen?: number;
  ogloszenia?: Ogloszenie[];
  terminDo?: string | null;
  dniDoKonca?: number | null;
}

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Brak postępowania",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Termin już minął",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Spółka znika z rejestru",
  },
};

const ETAPY = [
  "Szukamy podmiotu w Monitorze",
  "Pobieramy jego ogłoszenia od 2013 roku",
  "Sprawdzamy, czy któreś dotyczy rozwiązania",
  "Liczymy termin na sprzeciw",
];

export default function SpolkaCheck() {
  const [zapytanie, setZapytanie] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [etap, setEtap] = useState(0);
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylamy" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (stan === "ladowanie") {
      setEtap(0);
      timer.current = setInterval(
        () => setEtap((e) => Math.min(e + 1, ETAPY.length - 1)),
        1200,
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
    await uruchom(zapytanie);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby
  // wynik powstawal tak samo niezaleznie od tego, skad przyszedl adres.
  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setZapytanie(cel);
    zglosZdarzenie("uruchomiono_skan");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/sprawdz-spolke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zapytanie: cel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego podmiotu.");
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
    setLeadStan("wysylamy");
    setLeadBlad("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.zapytanie,
          problemType: "Monitoring Monitora Sądowego",
          problemScale: `Werdykt: ${wynik.werdykt}`,
          message: [
            `Sprawdzany podmiot: ${wynik.zapytanie}`,
            `Ogłoszeń w Monitorze: ${wynik.liczbaOgloszen ?? 0}`,
            `Postępowanie o rozwiązanie: ${wynik.terminDo ? "TAK, termin do " + wynik.terminDo : "nie"}`,
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

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czy Twój kontrahent nie znika z rejestru
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sąd może z urzędu wszcząć postępowanie o rozwiązanie spółki bez
        likwidacji. Od obwieszczenia w Monitorze Sądowym i Gospodarczym biegną
        trzy miesiące na sprzeciw, a potem podmiot znika z rejestru razem z
        Twoją należnością. Zawiadomienia nikt nie wysyła.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "CD PROJEKT" },
          { wartosc: "ALLEGRO" },
        ]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
        wstep="Nie masz pod ręką nazwy? Zobacz na gotowym przykładzie:"
      />
      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          required
          value={zapytanie}
          onChange={(e) => setZapytanie(e.target.value)}
          placeholder="numer KRS albo nazwa spółki"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Sprawdzamy..." : "Sprawdź w Monitorze"}
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
                  : "text-gray-600 dark:text-gray-600 opacity-60"
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

          {wynik.terminDo && (
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              Termin na zgłoszenie sprzeciwu mija {wynik.terminDo}.
            </p>
          )}

          {(wynik.ogloszenia || []).length > 0 && (
            <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60">
              <table className="w-full text-left text-xs">
                <thead className="text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="px-3 py-2 font-medium">Data</th>
                    <th className="px-3 py-2 font-medium">Monitor</th>
                    <th className="px-3 py-2 font-medium">Podmiot</th>
                  </tr>
                </thead>
                <tbody>
                  {(wynik.ogloszenia || []).map((o) => (
                    <tr
                      key={o.data + o.monitor + o.nazwa}
                      className={`border-t border-gray-100 dark:border-gray-800 ${
                        o.rozwiazanie ? "bg-red-50/60 dark:bg-red-950/30" : ""
                      }`}
                    >
                      <td className="px-3 py-2 tabular-nums text-gray-700 dark:text-gray-300">
                        {o.data}
                      </td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-400">
                        {o.monitor}
                      </td>
                      <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                        {o.nazwa}
                        {o.rozwiazanie && (
                          <span className="ml-2 rounded bg-red-600/90 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                            rozwiązanie
                          </span>
                        )}
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

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Dane z Monitora Sądowego i Gospodarczego, wydania od 2013 roku.
            Pokazujemy do dwunastu najnowszych ogłoszeń.
          </p>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Jeśli masz listę kontrahentów, możemy sprawdzać ją codziennie i odezwać się dopiero wtedy, gdy któryś trafi do wykreślenia."
                : "Przy takim obwieszczeniu liczy się czas, bo termin biegnie od dnia publikacji. Możemy sprawdzić całą Twoją listę kontrahentów wstecz i pilnować jej codziennie."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mamy zgłoszenie razem z wynikiem. Odpiszemy na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="spolka-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślemy zasady sprawdzenia całej listy kontrahentów
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="spolka-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="twoj@email.pl"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    disabled={leadStan === "wysylamy"}
                    className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
                  >
                    {leadStan === "wysylamy" ? "Wysyłamy..." : "Wyślij zgłoszenie"}
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
