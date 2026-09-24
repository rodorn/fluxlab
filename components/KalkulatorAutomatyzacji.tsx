"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import Scenariusze, { type Scenariusz } from "@/components/Scenariusze";

interface Wynik {
  status: "OK";
  werdykt: "ZIELONY" | "ZOLTY";
  naglowek: string;
  opis: string;
  zastrzezenie: string | null;
  uruchomienia: number;
  kroki: number;
  zadania: number;
  zapierPln: number;
  n8nMinPln: number;
  n8nMaxPln: number;
  oszczednoscMies: number;
  oszczednoscRok: number;
  migracjaOd: number;
  zwrotMiesiecy: number | null;
  oplacalne: boolean;
  kurs: number;
  kursData: string;
}

type Dane = { uruchomienia: number; kroki: number };

const SCENARIUSZE: Scenariusz<Dane>[] = [
  {
    etykieta: "Formularz do CRM",
    opis: "400 zgłoszeń miesięcznie, 3 kroki: formularz, osoba w CRM, powiadomienie.",
    dane: { uruchomienia: 400, kroki: 3 },
  },
  {
    etykieta: "Leady z kilku źródeł",
    opis: "3 000 leadów miesięcznie, 6 kroków: źródło, sprawdzenie, CRM, przypisanie, mail, raport.",
    dane: { uruchomienia: 3000, kroki: 6 },
  },
  {
    etykieta: "Zamówienia ze sklepu",
    opis: "15 000 zamówień miesięcznie, 8 kroków: sklep, magazyn, faktura, kurier i statusy.",
    dane: { uruchomienia: 15000, kroki: 8 },
  },
];

export default function KalkulatorAutomatyzacji() {
  const [uruchomienia, setUruchomienia] = useState("2000");
  const [kroki, setKroki] = useState("5");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylamy" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const [wybrany, setWybrany] = useState<string | null>(null);

  function wybierzScenariusz(dane: Dane, etykieta: string) {
    setWybrany(etykieta);
    setUruchomienia(String(dane.uruchomienia));
    setKroki(String(dane.kroki));
    policz(dane);
  }

  async function policz(dane: Dane) {
    setStan("ladowanie");
    zglosZdarzenie("uruchomiono_kalkulator");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/kalkulator-automatyzacji", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dane),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się policzyć.");
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
          company: "Migracja automatyzacji",
          problemType: "Tańsza automatyzacja",
          problemScale: `${wynik.uruchomienia} uruchomień na miesiąc, ${wynik.kroki} kroków`,
          message: [
            `Uruchomień miesięcznie: ${wynik.uruchomienia}`,
            `Kroków w scenariuszu: ${wynik.kroki}`,
            `Zadania rozliczane przez obecnego dostawcę: ${wynik.zadania}`,
            `Szacowany obecny koszt: ${wynik.zapierPln} zł miesięcznie`,
            `Koszt własnego serwera: ${wynik.n8nMinPln} do ${wynik.n8nMaxPln} zł miesięcznie`,
            `Szacowana oszczędność: ${wynik.oszczednoscRok} zł rocznie`,
            wynik.zwrotMiesiecy
              ? `Zwrot migracji po około ${wynik.zwrotMiesiecy} miesiącach`
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

  const zielony = wynik?.werdykt === "ZIELONY";

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Policz, ile naprawdę płacisz za Zapiera i Make
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Popularne narzędzia liczą nie uruchomienia, tylko pojedyncze kroki. Przez
        to pięciokrokowy scenariusz uruchomiony tysiąc razy zużywa pięć tysięcy
        zadań, a nie tysiąc. Podaj dwie liczby, a pokażemy, ile to kosztuje
        naprawdę i ile zostałoby przy własnym serwerze.
      </p>

      <div className="mt-5">
        <Scenariusze
          pozycje={SCENARIUSZE}
          wybrany={wybrany}
          onWybor={wybierzScenariusz}
          wstep="Nie znasz swoich liczb? Policz na gotowym układzie:"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          policz({ uruchomienia: Number(uruchomienia), kroki: Number(kroki) });
        }}
        className="mt-5 space-y-3"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Ile razy miesięcznie uruchamiają się automatyzacje
            </span>
            <input
              type="number"
              min={1}
              max={5000000}
              required
              value={uruchomienia}
              onChange={(e) => {
                setWybrany(null);
                setUruchomienia(e.target.value);
              }}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Ile kroków ma typowy scenariusz
            </span>
            <input
              type="number"
              min={1}
              max={100}
              required
              value={kroki}
              onChange={(e) => {
                setWybrany(null);
                setKroki(e.target.value);
              }}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary w-full justify-center px-6 py-3 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Liczymy..." : "Policz oszczędność"}
        </button>
      </form>

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && (
        <div
          className={`mt-6 rounded-xl border p-5 ${
            zielony
              ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
          }`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-wider ${
              zielony
                ? "text-emerald-700 dark:text-emerald-400"
                : "text-amber-700 dark:text-amber-400"
            }`}
          >
            {wynik.oplacalne ? "Migracja ma sens" : "Na razie zostaw jak jest"}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Zadania rozliczane miesięcznie
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                {wynik.zadania.toLocaleString("pl-PL")}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dziś, szacunkowo
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                {wynik.zapierPln.toLocaleString("pl-PL")} zł
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">miesięcznie</p>
            </div>
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Własny serwer
              </p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900 dark:text-white">
                {wynik.n8nMinPln}-{wynik.n8nMaxPln} zł
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">miesięcznie</p>
            </div>
          </div>

          {wynik.zwrotMiesiecy !== null && (
            <p className="mt-4 text-sm text-gray-800 dark:text-gray-200">
              Przeniesienie wyceniamy od{" "}
              <strong>{wynik.migracjaOd.toLocaleString("pl-PL")} zł</strong>, więc
              przy tej skali zwróciłoby się po{" "}
              <strong>
                {wynik.zwrotMiesiecy}{" "}
                {wynik.zwrotMiesiecy === 1 ? "miesiącu" : "miesiącach"}
              </strong>
              .
            </p>
          )}

          {wynik.zastrzezenie && (
            <p className="mt-3 rounded-lg border border-gray-300/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-700 dark:text-gray-300">
              {wynik.zastrzezenie}
            </p>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.oplacalne
                ? "Przeniesienie polega na odtworzeniu tych samych scenariuszy na serwerze, który należy do Ciebie, i na pilnowaniu, żeby działał. Efekt jest ten sam, a rachunek przestaje rosnąć razem z wolumenem."
                : "Nie namawiam Cię na migrację przy tej skali. Jeśli chcesz, możemy za to sprawdzić, czy da się ograniczyć liczbę kroków w scenariuszach, bo to obniża rachunek od razu i nic nie kosztuje poza jednorazową robotą."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mamy zgłoszenie razem z tym wyliczeniem. Odpiszemy na {email}, zwykle
                tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="kalk-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślemy wyliczenie i plan przeniesienia
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="kalk-email"
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
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{leadBlad}</p>
                )}
              </form>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Przeliczone po kursie {wynik.kurs.toFixed(4)} zł za dolara, kurs
            średni z {wynik.kursData}. Ceny dostawcy z jego publicznego cennika.
          </p>
        </div>
      )}
    </div>
  );
}
