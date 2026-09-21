"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import Przyklady from "@/components/Przyklady";

interface Punkt {
  tytul: string;
  stan: "ok" | "uwaga" | "zle";
  opis: string;
}

interface Wynik {
  status: string;
  domena: string;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  komentarz?: string;
  punkty?: Punkt[];
  szkicLlms?: string | null;
  szkicDanych?: string | null;
}

const MOTYW: Record<string, { ramka: string; tlo: string; tekst: string; etykieta: string }> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Dostępna dla asystentów",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Da się poprawić",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Asystent Cię nie zobaczy",
  },
};

const ZNAK: Record<Punkt["stan"], { s: string; k: string }> = {
  ok: { s: "✓", k: "text-emerald-600 dark:text-emerald-400" },
  uwaga: { s: "!", k: "text-amber-600 dark:text-amber-400" },
  zle: { s: "×", k: "text-red-600 dark:text-red-400" },
};


const PRZYKLADY = [
  { wartosc: "fluxlab.pl" },
  { wartosc: "rp.pl" },
  { wartosc: "wyborcza.pl" },
];

export default function AiCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const [skopiowane, setSkopiowane] = useState<string | null>(null);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(domena);
  }

  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    zglosZdarzenie("uruchomiono_skan");
    try {
      const res = await fetch("/api/sprawdz-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tej strony.");
        setStan("blad");
        return;
      }
      setWynik(data);
      setSkopiowane(null);
      setStan("gotowe");
      zglosZdarzenie(`wynik_${String(data?.werdykt ?? "brak").toLowerCase()}`);
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
          problemType: "Widoczność w asystentach AI",
          problemScale: `Werdykt: ${wynik.werdykt}`,
          message: (wynik.punkty || [])
            .map((p) => `[${p.stan}] ${p.tytul}: ${p.opis}`)
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
        Sprawdź, czy asystent AI w ogóle widzi Twoją stronę
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Coraz częściej klient nie wpisuje frazy w wyszukiwarkę, tylko pyta
        asystenta o firmę do konkretnego zadania. Sprawdzam siedem rzeczy, od
        których zależy, czy Twoja strona może w takiej odpowiedzi wystąpić.
        Bez rejestracji.
      </p>

      <Przyklady
        pozycje={PRZYKLADY}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
      />

      <form onSubmit={sprawdz} className="mt-4 flex flex-col gap-3 sm:flex-row">
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
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź stronę"}
        </button>
      </form>

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

          <ul className="mt-4 space-y-3">
            {(wynik.punkty || []).map((p) => (
              <li key={p.tytul} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={`mt-0.5 font-bold ${ZNAK[p.stan].k}`}
                >
                  {ZNAK[p.stan].s}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {p.tytul}
                  </span>
                  <span className="block text-sm text-gray-700 dark:text-gray-300">
                    {p.opis}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 rounded-lg bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-800 dark:text-gray-200">
            {wynik.komentarz}
          </p>

          {/* Gotowe fragmenty zamiast samego werdyktu. Osoba, ktora nie chce
              zostawiac adresu, i tak wychodzi stad z czyms dzialajacym, a oba
              pliki sa zbudowane wylacznie z tego, co strona juz o sobie mowi,
              wiec nic tu nie jest zmyslone. */}
          {[
            wynik.szkicDanych && {
              klucz: "dane",
              tytul: `Gotowe dane uporządkowane dla ${wynik.domena}`,
              opis:
                "Wklej to w sekcję head swojej strony głównej. Od tego momentu maszyna odczytuje nazwę firmy i opis wprost, zamiast wnioskować z układu strony.",
              tresc: wynik.szkicDanych,
            },
            wynik.szkicLlms && {
              klucz: "llms",
              tytul: `Gotowy szkic pliku llms.txt dla ${wynik.domena}`,
              opis:
                "Uzupełnij miejsca w nawiasach kwadratowych, zapisz jako llms.txt i wrzuć do katalogu głównego serwisu, obok robots.txt. Nic więcej.",
              tresc: wynik.szkicLlms,
            },
          ]
            .filter(Boolean)
            .map((b) => {
              const blok = b as { klucz: string; tytul: string; opis: string; tresc: string };
              return (
                <div
                  key={blok.klucz}
                  className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4"
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {blok.tytul}
                  </p>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                    {blok.opis}
                  </p>
                  <pre className="mt-3 max-h-72 overflow-auto rounded-lg bg-gray-950/90 p-4 text-xs leading-relaxed text-gray-100">
                    {blok.tresc}
                  </pre>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(blok.tresc);
                        setSkopiowane(blok.klucz);
                        zglosZdarzenie(`skopiowano_${blok.klucz}`);
                      } catch {
                        setSkopiowane(null);
                      }
                    }}
                    className="mt-3 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-accent dark:border-gray-700 dark:text-white"
                  >
                    {skopiowane === blok.klucz ? "Skopiowane" : "Skopiuj do schowka"}
                  </button>
                </div>
              );
            })}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            {leadStan === "ok" ? (
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow}>
                <label
                  htmlFor="ai-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę co dokładnie zmienić i w jakiej kolejności
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="ai-email"
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

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        To sprawdzenie stanu technicznego strony, a nie obietnica miejsca w
        odpowiedzi asystenta. Żaden dostawca nie gwarantuje, kogo wymieni, i
        każdy, kto to obiecuje, obiecuje rzecz, na którą nie ma wpływu.
      </p>
    </div>
  );
}
