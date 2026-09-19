"use client";

import { useState } from "react";

interface Wynik {
  status: string;
  nip: string;
  verdict: "ZIELONY" | "ZOLTY" | "CZERWONY";
  headline: string;
  detail?: string;
  name?: string;
  statusVat?: string;
  regon?: string;
  krs?: string;
  address?: string;
  registered?: string;
  accountsCount?: number;
  warnings?: string[];
}

const KOLOR: Record<
  string,
  { ring: string; bg: string; text: string; label: string }
> = {
  ZIELONY: {
    ring: "border-emerald-500/60",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    label: "Brak sygnałów ostrzegawczych",
  },
  ZOLTY: {
    ring: "border-amber-500/60",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    label: "Do wyjaśnienia",
  },
  CZERWONY: {
    ring: "border-red-500/60",
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-400",
    label: "Uwaga",
  },
};

export default function NipCheck() {
  const [nip, setNip] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">(
    "idle",
  );
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    try {
      const res = await fetch("/api/sprawdz-nip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nip }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego numeru.");
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

  const k = wynik ? KOLOR[wynik.verdict] : null;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź firmę teraz, za darmo
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz NIP, a od razu sprawdzę go w wykazie podatników VAT Ministerstwa
        Finansów. Bez zakładania konta i bez czekania.
      </p>

      <form onSubmit={sprawdz} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          value={nip}
          onChange={(e) => setNip(e.target.value)}
          inputMode="numeric"
          placeholder="NIP, na przykład 5260250274"
          aria-label="Numer NIP do sprawdzenia"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie" || nip.replace(/\D/g, "").length < 10}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź NIP"}
        </button>
      </form>

      {stan === "blad" && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && k && (
        <div className={`mt-5 rounded-xl border ${k.ring} ${k.bg} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${k.text}`}>
            {k.label}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.headline}
          </p>

          {wynik.name && (
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
              {wynik.name}
            </p>
          )}
          {wynik.detail && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {wynik.detail}
            </p>
          )}

          {wynik.status === "znaleziony" && (
            <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Status VAT:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.statusVat || "brak danych"}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Zarejestrowany:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.registered || "brak danych"}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">
                  Rachunki w wykazie:
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.accountsCount ?? 0}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-500 dark:text-gray-400">KRS:</dt>
                <dd className="font-medium text-gray-900 dark:text-white">
                  {wynik.krs || "brak"}
                </dd>
              </div>
            </dl>
          )}

          {wynik.warnings && wynik.warnings.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {wynik.warnings.map((w) => (
                <li
                  key={w}
                  className="text-sm text-gray-700 dark:text-gray-300 before:mr-2 before:content-['•']"
                >
                  {w}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To jest szybki sprawdzian z jednego rejestru. Pełny raport dokłada
              odpis KRS (likwidacja, zaległości, wykreślenie), wiek domeny oraz
              najważniejsze: sprawdzenie, czy numer konta, na który masz
              zapłacić, rzeczywiście należy do tej firmy.
            </p>
            <a href="#zamow" className="btn-primary mt-4 inline-flex text-sm">
              Zamów pełny raport
            </a>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Dane pochodzą z publicznego wykazu podatników VAT. To analiza danych
        rejestrowych i ocena ryzyka, nie porada prawna ani gwarancja
        wypłacalności.
      </p>
    </div>
  );
}
