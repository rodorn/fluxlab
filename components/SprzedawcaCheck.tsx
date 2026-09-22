"use client";

import { useEffect, useRef, useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Podmiot {
  name: string;
  nip: string;
  statusVat: string | null;
  regon: string | null;
  krs: string | null;
  adres: string | null;
  rachunkow: number;
}

interface Wynik {
  status: string;
  domena: string;
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  komentarz: string;
  dataWykazu?: string;
  sprawdzonePodstrony?: number;
  nipy?: string[];
  rachunkiZnalezione?: number;
  podmioty?: Podmiot[];
}

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Da się sprawdzić",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Częściowo",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Klient nie ma czego sprawdzić",
  },
};

const ETAPY = [
  "Pobieram stronę główną",
  "Zaglądam do kontaktu i regulaminu",
  "Szukam numeru NIP i numeru konta",
  "Pytam wykaz podatników VAT",
];

export default function SprzedawcaCheck() {
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
        1300,
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
    await uruchom(domena);
  }

  // Jedno wejscie dla formularza i dla przyciskow z przykladami, zeby
  // wynik powstawal tak samo niezaleznie od tego, skad przyszedl adres.
  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    zglosZdarzenie("uruchomiono_skan");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setLeadStan("idle");
    try {
      const res = await fetch("/api/sprawdz-sprzedawce", {
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
          problemType: "Dane sprzedawcy na stronie",
          problemScale: `Werdykt: ${wynik.werdykt}`,
          message: [
            `Domena: ${wynik.domena}`,
            `Sprawdzonych podstron: ${wynik.sprawdzonePodstrony ?? 0}`,
            `NIP na stronie: ${(wynik.nipy || []).join(", ") || "brak"}`,
            `Numerów konta na stronie: ${wynik.rachunkiZnalezione ?? 0}`,
            ...(wynik.podmioty || []).map(
              (p) => `  ${p.nip} ${p.name}, VAT ${p.statusVat}, rachunków ${p.rachunkow}`,
            ),
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
  const podmioty = wynik?.podmioty || [];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czy klient ustali ze strony, komu płaci
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Księgowość firmy, która ma Ci zapłacić, przed przelewem sprawdza
        sprzedawcę w wykazie podatników VAT. Potrzebuje do tego NIP-u, a przy
        większych kwotach także numeru konta. Zaglądam na stronę główną, kontakt
        i regulamin, wyciągam te dane i sprawdzam je w wykazie tak samo, jak
        zrobi to Twój klient.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "fluxlab.pl" },
          { wartosc: "x-kom.pl" },
          { wartosc: "empik.com" },
        ]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
      />
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
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź dane sprzedawcy"}
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

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              {
                etykieta: "Sprawdzonych podstron",
                wartosc: String(wynik.sprawdzonePodstrony ?? 0),
              },
              { etykieta: "NIP na stronie", wartosc: String((wynik.nipy || []).length) },
              {
                etykieta: "Numerów konta",
                wartosc: String(wynik.rachunkiZnalezione ?? 0),
              },
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

          {podmioty.length > 0 && (
            <div className="mt-4 space-y-3">
              {podmioty.map((p) => (
                <div
                  key={p.nip}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60 p-4"
                >
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {p.name}
                  </p>
                  <dl className="mt-2 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-2">
                    <div className="flex gap-2">
                      <dt className="text-gray-500 dark:text-gray-400">NIP:</dt>
                      <dd className="font-mono text-gray-900 dark:text-white">
                        {p.nip}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-gray-500 dark:text-gray-400">Status VAT:</dt>
                      <dd
                        className={`font-semibold ${
                          p.statusVat === "Czynny"
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {p.statusVat || "brak danych"}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Rachunków w wykazie:
                      </dt>
                      <dd className="font-medium tabular-nums text-gray-900 dark:text-white">
                        {p.rachunkow}
                      </dd>
                    </div>
                    {p.adres && (
                      <div className="flex gap-2">
                        <dt className="text-gray-500 dark:text-gray-400">Adres:</dt>
                        <dd className="text-gray-900 dark:text-white">{p.adres}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          )}

          <p className="mt-4 rounded-lg bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-800 dark:text-gray-200">
            {wynik.komentarz}
          </p>

          {wynik.dataWykazu && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Stan wykazu podatników na dzień {wynik.dataWykazu}. Wykaz zmienia
              się codziennie, więc wynik jest zdjęciem na dziś, a nie stanem
              trwałym.
            </p>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Nie mam Ci tu nic do sprzedania. Jeśli macie więcej domen albo oddziałów, mogę sprawdzić wszystkie naraz i pilnować, czy coś się w wykazie nie zmieniło."
                : "Naprawa jest tania: brakujące dane w stopce i w regulaminie plus znacznik, po którym wyszukiwarka i narzędzia zakupowe odczytają je automatycznie. Odsyłam gotowy fragment do wklejenia, nie samą diagnozę."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="sprzedawca-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę gotowy fragment do wklejenia w stopkę
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="sprzedawca-email"
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
