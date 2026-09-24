"use client";

import { useEffect, useRef, useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Wariant {
  adres: string;
  kod: number | null;
  przekierowanieDo: string | null;
  rozmiar: number | null;
  canonical: string | null;
  blad: string | null;
}

interface Wynik {
  status: string;
  domena: string;
  werdykt: "ZIELONY" | "ZOLTY" | "CZERWONY" | "NIEROZSTRZYGNIETE";
  naglowek: string;
  komentarz: string;
  warianty: Wariant[];
  tenSamRozmiar: boolean;
  maCanonical: boolean;
}

const MOTYW: Record<
  string,
  { ramka: string; tlo: string; tekst: string; etykieta: string }
> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
    etykieta: "Jeden adres",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
    etykieta: "Do sprawdzenia",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Dwie strony zamiast jednej",
  },
  NIEROZSTRZYGNIETE: {
    ramka: "border-gray-400/60",
    tlo: "bg-gray-50 dark:bg-gray-900/60",
    tekst: "text-gray-600 dark:text-gray-400",
    etykieta: "Nie da się ocenić",
  },
};

const ETAPY = [
  "Pytamy adres bez www",
  "Pytamy adres z www",
  "Porównujemy odpowiedzi",
  "Szukamy wskazania wersji głównej",
];

function opisKodu(w: Wariant): string {
  if (w.blad) return w.blad;
  if (w.kod === null) return "brak odpowiedzi";
  if (w.kod >= 300 && w.kod < 400) return `${w.kod}, przekierowanie`;
  if (w.kod === 200) return "200, pełna treść";
  return String(w.kod);
}

function skrocAdres(a: string): string {
  return a.replace(/^https?:\/\//, "");
}

export default function AdresCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [etap, setEtap] = useState(0);
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylamy" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Etapy przesuwaja sie same, zeby bylo widac, ze cos sie dzieje. Zapytania
  // ida rownolegle, wiec to jest ilustracja postepu, nie pomiar.
  useEffect(() => {
    if (stan === "ladowanie") {
      setEtap(0);
      timer.current = setInterval(
        () => setEtap((e) => Math.min(e + 1, ETAPY.length - 1)),
        900,
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
      const res = await fetch("/api/sprawdz-adres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tego adresu.");
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
          company: wynik.domena,
          problemType: "Podwójny adres strony",
          problemScale: `Werdykt: ${wynik.werdykt}`,
          message: [
            `Domena: ${wynik.domena}`,
            ...wynik.warianty.map(
              (w) =>
                `${w.adres}: ${opisKodu(w)}${
                  w.rozmiar !== null ? `, ${w.rozmiar} znaków` : ""
                }${w.przekierowanieDo ? ` -> ${w.przekierowanieDo}` : ""}`,
            ),
            `Znacznik wersji głównej: ${wynik.maCanonical ? "jest" : "brak"}`,
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

  const m = wynik ? MOTYW[wynik.werdykt] : null;
  const glowne = wynik ? wynik.warianty.slice(0, 2) : [];
  const dodatkowe = wynik ? wynik.warianty.slice(2) : [];

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdź, czy Google widzi Twoją stronę podwójnie
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Adres z www i bez www to dla wyszukiwarki dwa różne adresy. Jeżeli oba
        zwracają tę samą treść i żaden nie przekierowuje na drugi, siła linków
        prowadzących do Ciebie dzieli się na pół. W przeglądarce nie widać tego
        w ogóle, bo obie wersje wyglądają identycznie.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "fluxlab.pl" },
          { wartosc: "allegro.pl" },
          { wartosc: "zus.pl" },
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
          {stan === "ladowanie" ? "Sprawdzamy..." : "Sprawdź adres"}
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

      {wynik && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {m.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {glowne.map((w) => (
              <div
                key={w.adres}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60 p-4"
              >
                <p className="truncate font-mono text-sm font-semibold text-gray-900 dark:text-white">
                  {skrocAdres(w.adres)}
                </p>
                <dl className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between gap-2">
                    <dt>Odpowiedź</dt>
                    <dd className="font-medium text-gray-900 dark:text-white">
                      {opisKodu(w)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Wielkość treści</dt>
                    <dd className="font-medium tabular-nums text-gray-900 dark:text-white">
                      {w.rozmiar !== null
                        ? `${w.rozmiar.toLocaleString("pl-PL")} znaków`
                        : "brak"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt>Wersja główna</dt>
                    <dd className="truncate font-medium text-gray-900 dark:text-white">
                      {w.canonical ? skrocAdres(w.canonical) : "nie wskazana"}
                    </dd>
                  </div>
                  {w.przekierowanieDo && (
                    <div className="flex justify-between gap-2">
                      <dt>Kieruje na</dt>
                      <dd className="truncate font-medium text-gray-900 dark:text-white">
                        {skrocAdres(w.przekierowanieDo)}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            ))}
          </div>

          {dodatkowe.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {dodatkowe.map((w) => (
                <span
                  key={w.adres}
                  className="rounded-md border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-950/40 px-2.5 py-1 font-mono text-xs text-gray-600 dark:text-gray-400"
                >
                  {skrocAdres(w.adres)}: {opisKodu(w)}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 rounded-lg bg-white/70 dark:bg-gray-950/50 p-3 text-sm text-gray-800 dark:text-gray-200">
            {wynik.komentarz}
          </p>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Tutaj nie mamy Ci nic do sprzedania. Ten jeden punkt masz ustawiony poprawnie."
                : wynik.werdykt === "NIEROZSTRZYGNIETE"
                  ? "Z zewnątrz tego nie rozstrzygnę, ale mając dostęp do konfiguracji serwera sprawdzimy to od środka."
                  : "Naprawa to przekierowanie jednej wersji na drugą po stronie serwera plus wskazanie wersji głównej w kodzie strony. Sama reguła jest krótka, natomiast wybór wersji i kolejność wdrożenia mają znaczenie, bo źle ustawione przekierowanie potrafi zapętlić stronę."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mamy zgłoszenie razem z wynikiem. Odpiszemy na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="adres-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślemy gotową regułę pod Twój serwer
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="adres-email"
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
