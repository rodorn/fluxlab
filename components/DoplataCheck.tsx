"use client";

import { useState } from "react";

interface Wynik {
  status: "OK";
  werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  opis: string;
  waga: number;
  baza: number;
  naliczona: number;
  naliczonyProcent: number;
  stawkaWlasciwa: number;
  progOpis: string;
  powinnaBycKwota: number;
  roznica: number;
  okres: { od: string; do: string; zrodlo: string };
  progi: Array<{ opis: string; stawka: number }>;
  skalaMiesieczna: { przy100: number; przy500: number; przy2000: number } | null;
}

const MOTYW: Record<string, { ramka: string; tlo: string; tekst: string; etykieta: string }> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Zgodne ze stawką",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Rozbieżność na Twoją korzyść",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Naliczono za dużo",
  },
};

export default function DoplataCheck() {
  const [waga, setWaga] = useState("15");
  const [baza, setBaza] = useState("20");
  const [naliczona, setNaliczona] = useState("8.50");
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
      const res = await fetch("/api/sprawdz-doplate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          waga: Number(waga.replace(",", ".")),
          baza: Number(baza.replace(",", ".")),
          naliczona: Number(naliczona.replace(",", ".")),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tej pozycji.");
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
          company: "Audyt faktur kurierskich",
          problemType: "Audyt kurierski",
          problemScale: `Sprawdzona pozycja: ${wynik.werdykt}, różnica ${wynik.roznica} zł`,
          message: [
            `Waga paczki: ${wynik.waga} kg`,
            `Kwota bazowa: ${wynik.baza} zł`,
            `Dopłata z faktury: ${wynik.naliczona} zł (${wynik.naliczonyProcent} procent)`,
            `Stawka właściwa dla przedziału ${wynik.progOpis}: ${wynik.stawkaWlasciwa} procent, czyli ${wynik.powinnaBycKwota} zł`,
            `Różnica na tej pozycji: ${wynik.roznica} zł`,
            wynik.skalaMiesieczna
              ? `Przy 500 paczkach miesięcznie daje to ${wynik.skalaMiesieczna.przy500} zł`
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

  const m = wynik ? MOTYW[wynik.werdykt] : null;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź jedną pozycję ze swojej faktury kurierskiej
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Dopłata paliwowa potrafi sięgać prawie połowy ceny bazowej, jej stawka
        zmienia się co dwa tygodnie i zależy od progu wagowego. Pomyłka o jeden
        próg jest niewidoczna gołym okiem, a przy kilkuset paczkach robi się z
        tego realna kwota. Przepisz trzy liczby z faktury.
      </p>

      <form onSubmit={sprawdz} className="mt-5 space-y-3">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Waga paczki, kg
            </span>
            <input
              type="text"
              inputMode="decimal"
              required
              value={waga}
              onChange={(e) => setWaga(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Kwota bazowa, zł
            </span>
            <input
              type="text"
              inputMode="decimal"
              required
              value={baza}
              onChange={(e) => setBaza(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-900 dark:text-white">
              Dopłata paliwowa, zł
            </span>
            <input
              type="text"
              inputMode="decimal"
              required
              value={naliczona}
              onChange={(e) => setNaliczona(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary w-full justify-center px-6 py-3 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Liczę..." : "Sprawdź tę pozycję"}
        </button>
      </form>

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {m.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>

          <dl className="mt-4 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            <div className="flex gap-2">
              <dt className="text-gray-500 dark:text-gray-400">Naliczono:</dt>
              <dd className="font-medium text-gray-900 dark:text-white tabular-nums">
                {wynik.naliczona.toFixed(2)} zł ({wynik.naliczonyProcent} procent)
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-500 dark:text-gray-400">Powinno być:</dt>
              <dd className="font-medium text-gray-900 dark:text-white tabular-nums">
                {wynik.powinnaBycKwota.toFixed(2)} zł ({wynik.stawkaWlasciwa} procent)
              </dd>
            </div>
          </dl>

          {wynik.skalaMiesieczna && (
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Gdyby ten sam błąd powtarzał się na wszystkich paczkach
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {[
                  { ile: "100 paczek", kwota: wynik.skalaMiesieczna.przy100 },
                  { ile: "500 paczek", kwota: wynik.skalaMiesieczna.przy500 },
                  { ile: "2000 paczek", kwota: wynik.skalaMiesieczna.przy2000 },
                ].map((p) => (
                  <div
                    key={p.ile}
                    className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-3 text-center"
                  >
                    <p className="text-xl font-bold tabular-nums text-gray-900 dark:text-white">
                      {p.kwota.toLocaleString("pl-PL")} zł
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{p.ile}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Stawki, według których liczę
            </p>
            <ul className="mt-2 space-y-1">
              {wynik.progi.map((p) => (
                <li
                  key={p.opis}
                  className="flex justify-between rounded bg-white/70 dark:bg-gray-950/50 px-3 py-1.5 text-sm"
                >
                  <span className="text-gray-800 dark:text-gray-200">{p.opis}</span>
                  <span className="tabular-nums text-gray-600 dark:text-gray-300">
                    {p.stawka} procent
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Okres {wynik.okres.od} do {wynik.okres.do}, źródło: {wynik.okres.zrodlo}.
              Jeśli Twoja faktura dotyczy innego okresu, stawka była inna i wynik
              trzeba policzyć na stawkach z tamtych dwóch tygodni.
            </p>
          </div>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              To jest jedna pozycja przeliczona ręcznie. Pełny audyt przechodzi
              przez wszystkie linie faktur z wybranego okresu, sprawdza stawkę
              właściwą dla daty każdej przesyłki, wyłapuje korekty wagowe i
              podwójnie naliczone usługi, a kończy się gotową treścią reklamacji.
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z tym wyliczeniem. Odpiszę na {email}, zwykle
                tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="doplata-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, sprawdzę tak całą Twoją fakturę za darmo
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="doplata-email"
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
        Liczę na stawkach jednego przewoźnika z konkretnego okresu. To wyliczenie
        techniczne, a reklamację składa nadawca, bo tylko on jest stroną umowy.
      </p>
    </div>
  );
}
