"use client";

import { useState } from "react";

interface Wymog {
  klucz: string;
  etykieta: string;
  waga: "krytyczny" | "wazny";
  jest: boolean;
  brak: string;
}

interface Wynik {
  status: "OK" | "BRAK_SKLEPU" | "BRAK_STRON";
  domena: string;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  opis?: string;
  zbadaneStrony?: string[];
  wymogi?: Wymog[];
  brakiKrytyczne?: number;
}

const MOTYW: Record<string, { ramka: string; tlo: string; tekst: string; etykieta: string }> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Komplet informacji",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Drobne braki",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Kupujący zostaje bez odpowiedzi",
  },
};

export default function ZwrotyCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [zamowien, setZamowien] = useState("300");
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
      const res = await fetch("/api/sprawdz-zwroty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego sklepu.");
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
    const braki = wynik.wymogi?.filter((w) => !w.jest).map((w) => w.etykieta) || [];
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.domena,
          problemType: "Panel zwrotów i reklamacji",
          problemScale: `Werdykt: ${wynik.werdykt}, braki: ${braki.length}, zamówień miesięcznie: ${zamowien}`,
          message: [
            `Sklep: ${wynik.domena}`,
            `Wynik: ${wynik.naglowek}`,
            braki.length ? `Braki: ${braki.join("; ")}` : "Bez braków",
            `Deklarowana liczba zamówień miesięcznie: ${zamowien}`,
            `Sprawdzone strony: ${(wynik.zbadaneStrony || []).join(", ")}`,
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
  const braki = wynik?.wymogi?.filter((w) => !w.jest) || [];
  const liczbaZamowien = Number(zamowien) || 0;
  // Ostrozne zalozenia: co dziesiate zamowienie wraca, a reczna obsluga
  // jednego zwrotu to okolo dwudziestu zlotych pracy.
  const zwrotyMies = Math.round(liczbaZamowien * 0.1);
  const kosztMies = zwrotyMies * 20;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czego kupujący nie znajdzie o zwrotach
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Podaj adres sklepu. Znajdę Twoje strony o zwrotach, reklamacjach i
        regulamin, przeczytam je razem i pokażę, których informacji brakuje.
        Każdy taki brak kończy się mailem z pytaniem, na które ktoś musi
        odpowiedzieć ręcznie.
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
          {stan === "ladowanie" ? "Czytam..." : "Sprawdź sklep"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Otwieram kolejno strony o zwrotach i regulamin, więc to trwa
          kilkanaście sekund.
        </p>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && wynik.status !== "OK" && (
        <div className="mt-6 rounded-xl border border-amber-500/60 bg-amber-50 dark:bg-amber-950/30 p-5">
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
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Przeczytałem {wynik.zbadaneStrony?.length} stron Twojego sklepu.
          </p>

          <ul className="mt-4 space-y-2">
            {wynik.wymogi?.map((w) => (
              <li
                key={w.klucz}
                className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-3"
              >
                <p className="flex items-start gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <span
                    aria-hidden="true"
                    className={w.jest ? "text-emerald-600" : "text-red-600"}
                  >
                    {w.jest ? "✓" : "✕"}
                  </span>
                  {w.etykieta}
                  {!w.jest && w.waga === "krytyczny" && (
                    <span className="ml-1 rounded bg-red-100 px-1.5 py-0.5 text-[11px] font-bold text-red-700 dark:bg-red-950/60 dark:text-red-400">
                      podstawa
                    </span>
                  )}
                </p>
                {!w.jest && (
                  <p className="mt-1 pl-6 text-sm text-gray-700 dark:text-gray-300">
                    {w.brak}
                  </p>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-lg border border-gray-300/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-950/50 p-4">
            <label
              htmlFor="zwroty-zamowienia"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Ile zamówień miesięcznie realizujesz?
            </label>
            <input
              id="zwroty-zamowienia"
              type="number"
              min={1}
              value={zamowien}
              onChange={(e) => setZamowien(e.target.value)}
              className="mt-2 w-40 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Przy ostrożnym założeniu, że wraca co dziesiąte zamówienie, a
              ręczna obsługa jednego zwrotu to około dwudziestu złotych pracy,
              wychodzi{" "}
              <strong>
                {zwrotyMies} zwrotów i mniej więcej {kosztMies.toLocaleString("pl-PL")} zł
              </strong>{" "}
              miesięcznie samej obsługi. To jest ta kwota, którą zabiera
              samoobsługowy panel, a nie sama poprawa regulaminu.
            </p>
          </div>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {braki.length === 0
                ? "Informacje są komplet, więc regulaminu nie ma po co poprawiać. Zostaje pytanie, czy zwroty obsługujecie ręcznie, bo to kosztuje niezależnie od tego, co jest napisane."
                : "Uzupełnienie tych braków to jedna rzecz, a druga to sam proces: dopóki zwrot zgłasza się mailem, każda sprawa przechodzi przez czyjeś ręce."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="zwroty-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę pełny raport i wycenę panelu
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="zwroty-email"
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
        Czytam wyłącznie publicznie dostępne strony Twojego sklepu. To sprawdzenie
        techniczne, czy informacja jest podana i łatwa do znalezienia, a nie opinia
        prawna o treści regulaminu.
      </p>
    </div>
  );
}
