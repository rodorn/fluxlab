"use client";

import { useEffect, useRef, useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

interface Strona {
  url: string;
  deklarowanyJezyk: string | null;
  hreflang: number;
  blokow: number;
  polskich: number;
  przyklady: string[];
}

interface Wynik {
  domena: string;
  status: "OK" | "BRAK_STRONY" | "BRAK_WERSJI";
  werdykt?: "ZIELONY" | "ZOLTY" | "CZERWONY";
  naglowek: string;
  opis?: string;
  deklarowanyJezyk?: string | null;
  polskichRazem?: number;
  blokowRazem?: number;
  stronBadanych?: number;
  bezHreflang?: number;
  strony?: Strona[];
}

const ETAPY = [
  "Otwieram stronę główną i szukam wersji językowych",
  "Wchodzę na wersję obcojęzyczną",
  "Rozbijam stronę na pojedyncze fragmenty tekstu",
  "Sprawdzam każdy fragment i liczę znaczniki dla wyszukiwarki",
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
    etykieta: "Drobne braki",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
    etykieta: "Tłumaczenie niedokończone",
  },
};

export default function JezykCheck() {
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
    setEtap(0);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(
      () => setEtap((x) => Math.min(x + 1, ETAPY.length - 1)),
      1600,
    );
    try {
      const res = await fetch("/api/sprawdz-jezyk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const data = await res.json();
      if (timer.current) clearInterval(timer.current);
      if (!res.ok) {
        setBlad(data?.error || "Nie udało się sprawdzić tej strony.");
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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: wynik.domena,
          problemType: "Kontrola wersji językowych",
          problemScale:
            wynik.status === "OK"
              ? `Polskich fragmentów: ${wynik.polskichRazem}, stron bez znaczników: ${wynik.bezHreflang} z ${wynik.stronBadanych}`
              : wynik.status,
          message: [
            `Sprawdzana strona: ${wynik.domena}`,
            `Wynik: ${wynik.naglowek}`,
            ...(wynik.strony || []).map(
              (s) =>
                `${s.url}: ${s.polskich} polskich fragmentów na ${s.blokow}, znaczników hreflang ${s.hreflang}, deklarowany język ${s.deklarowanyJezyk || "brak"}`,
            ),
            ...(wynik.strony?.[0]?.przyklady || []).map((p) => `Przykład: ${p}`),
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
        Sprawdź swoją wersję obcojęzyczną
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz adres strony. Znajdę Waszą wersję angielską albo niemiecką, rozbiję
        ją na pojedyncze fragmenty i pokażę te, które zostały po polsku, a także
        czy wyszukiwarka w ogóle wie, że macie wersje językowe.
      </p>
      <Przyklady
        pozycje={[
          { wartosc: "inpost.pl" },
          { wartosc: "lot.com" },
          { wartosc: "x-kom.pl" },
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
          {stan === "ladowanie" ? "Sprawdzam..." : "Sprawdź stronę"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <ol className="mt-5 space-y-2">
          {ETAPY.map((tekst, i) => (
            <li
              key={tekst}
              className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                i <= etap ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-600"
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
        </ol>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {wynik && wynik.status !== "OK" && (
        <div className="mt-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 p-5">
          <p className="text-lg font-bold text-gray-900 dark:text-white">{wynik.naglowek}</p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{wynik.opis}</p>
        </div>
      )}

      {wynik && wynik.status === "OK" && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {m.etykieta}
          </p>

          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums">
                {wynik.polskichRazem}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                fragmentów wciąż po polsku
                {wynik.deklarowanyJezyk
                  ? `, choć strona deklaruje język ${wynik.deklarowanyJezyk}`
                  : ""}
              </p>
            </div>
            <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 p-4">
              <p className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums">
                {wynik.bezHreflang}/{wynik.stronBadanych}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                sprawdzonych stron bez znaczników, po których wyszukiwarka
                rozpoznaje wersje językowe
              </p>
            </div>
          </div>

          {(wynik.strony || []).map((s) => (
            <div key={s.url} className="mt-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white break-all">
                {s.url}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {s.polskich} polskich fragmentów na {s.blokow} sprawdzonych,
                znaczników językowych: {s.hreflang}
              </p>
              {s.przyklady.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {s.przyklady.map((p, i) => (
                    <li
                      key={`${s.url}-${i}`}
                      className="rounded bg-white/70 dark:bg-gray-950/50 px-3 py-1.5 text-sm text-gray-800 dark:text-gray-200 font-mono"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {wynik.werdykt === "ZIELONY"
                ? "Na sprawdzonych stronach nie znalazłem polskich fragmentów ani braków w oznaczeniach. Pełny audyt idzie głębiej: obejmuje wszystkie podstrony, tytuły, opisy dla wyszukiwarki i opisy zdjęć."
                : "To sprawdzenie objęło tylko kilka stron. Pełny audyt przechodzi przez cały serwis i kończy się listą, w której każdy wpis ma adres, miejsce na stronie i tekst do podmiany, więc przekazujesz ją wprost programiście."}
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="jezykcheck-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odeślę pełną listę miejsc do poprawy
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="jezykcheck-email"
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
                  Przesyłam tylko adres strony i wynik sprawdzenia. Bez zapisu na
                  newsletter.
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Sprawdzam kilka pierwszych stron wersji obcojęzycznej, wyłącznie
        publicznie dostępnych. Wersji polskiej nie liczę jako błędu.
      </p>
    </div>
  );
}
