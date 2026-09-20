"use client";

import { useState } from "react";

interface Blokada {
  gdzie: string;
  tresc: string;
  opis: string;
}

interface Wynik {
  status: "OK" | "BRAK_STRONY";
  domena: string;
  werdykt?: "ZIELONY" | "CZERWONY";
  naglowek: string;
  opis: string;
  blokady?: Blokada[];
  zastrzezenie?: string | null;
  rozmiarStrony?: number;
}

export default function WidocznoscCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/sprawdz-widocznosc", {
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
          problemType: "Blokada indeksowania",
          problemScale: `Werdykt: ${wynik.werdykt}, blokad: ${wynik.blokady?.length ?? 0}`,
          message: [
            `Sprawdzana strona: ${wynik.domena}`,
            `Wynik: ${wynik.naglowek}`,
            ...(wynik.blokady || []).map((b) => `${b.gdzie}: ${b.tresc}`),
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

  const zly = wynik?.werdykt === "CZERWONY";

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czy Twoja strona nie wypisała się z wyszukiwarki
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Zdarza się, że strona ma w kodzie polecenie, żeby wyszukiwarka jej nie
        pokazywała. Zwykle zostaje po wersji roboczej i nikt tego nie zauważa,
        bo właściciel wchodzi na swoją stronę z zakładki. Sprawdzam trzy miejsca,
        w których taka blokada może siedzieć.
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
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź widoczność"}
        </button>
      </form>

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && wynik.status === "BRAK_STRONY" && (
        <div className="mt-6 rounded-xl border border-amber-500/60 bg-amber-50 dark:bg-amber-950/30 p-5">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>
        </div>
      )}

      {wynik && wynik.status === "OK" && (
        <div
          className={`mt-6 rounded-xl border p-5 ${
            zly
              ? "border-red-500/60 bg-red-50 dark:bg-red-950/30"
              : "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
          }`}
        >
          <p
            className={`text-xs font-bold uppercase tracking-wider ${
              zly
                ? "text-red-700 dark:text-red-400"
                : "text-emerald-700 dark:text-emerald-400"
            }`}
          >
            {zly ? "Strona wyłączona z wyszukiwarki" : "Bez blokad"}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>

          {zly && (
            <div className="mt-4 rounded-lg border border-red-400/60 bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-sm font-bold text-red-700 dark:text-red-400">
                Twoja strona ma {wynik.rozmiarStrony} kilobajtów treści, której
                nikt nie znajdzie
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                Cała praca włożona w opisy, zdjęcia i ofertę jest na serwerze i
                działa, ale nie istnieje dla nikogo, kto szuka Was w
                wyszukiwarce.
              </p>
            </div>
          )}

          {(wynik.blokady || []).map((b) => (
            <div
              key={b.gdzie}
              className="mt-4 rounded-lg bg-white/70 dark:bg-gray-950/50 p-4"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Znalezione w: {b.gdzie}
              </p>
              <p className="mt-1 font-mono text-xs text-red-700 dark:text-red-400 break-all">
                {b.tresc}
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{b.opis}</p>
            </div>
          ))}

          {wynik.zastrzezenie && (
            <p className="mt-4 rounded-lg border border-gray-300/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-700 dark:text-gray-300">
              {wynik.zastrzezenie}
            </p>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {zly
                ? "Zdjęcie takiej blokady to zwykle kilkanaście minut pracy w systemie, na którym stoi strona, plus zgłoszenie do ponownego odwiedzenia przez wyszukiwarkę. Zostaw adres, odeślę dokładnie, co i gdzie trzeba zmienić."
                : "Nic tu nie naprawię i nie będę tego udawał. Jeśli mimo to nie widać Was w wynikach, przyczyna leży gdzie indziej, a wtedy warto zacząć od sprawdzenia, czy wyszukiwarka w ogóle ma dostęp do strony."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="widocznosc-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {zly
                    ? "Podaj maila, odeślę instrukcję naprawy"
                    : "Podaj maila, jeśli chcesz, żebym poszukał innej przyczyny"}
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="widocznosc-email"
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
              </form>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Sprawdzam wyłącznie to, co Twój serwer pokazuje publicznie każdemu
        odwiedzającemu. Nie loguję się nigdzie i nie potrzebuję żadnych dostępów.
      </p>
    </div>
  );
}
