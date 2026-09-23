"use client";

import { useEffect, useRef, useState } from "react";

import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Darmowy audyt zbiorczy.
 *
 * To jest najcięższe narzędzie na stronie i jedyne, które po jednym kliknięciu
 * oddaje kompletny dokument zamiast pojedynczej odpowiedzi. Stąd układ: na
 * górze jedna liczba i jedno zdanie dla kogoś, kto nie przeczyta reszty, niżej
 * ustalenia z podziałem na obszary, a dopiero na końcu surowe pomiary dla
 * kogoś, kto zechce sprawdzić, skąd te liczby.
 *
 * Adres e-mail pojawia się dopiero pod gotowym wynikiem i nigdy przed nim.
 * Wynik nie jest nagrodą za zostawienie kontaktu, tylko powodem, dla którego
 * ktoś może chcieć go zostawić.
 */

type Waga = "krytyczne" | "wazne" | "drobne";

type Ustalenie = {
  klucz: string;
  obszar: string;
  waga: Waga;
  tytul: string;
  fakt: string;
  skutek: string;
  koszt: number;
  samodzielnie: boolean;
  dostep?: string;
  material?: { tytul: string; href: string } | null;
};

type Wynik = {
  /** Raport w postaci, w jakiej policzył go serwer, razem z jego podpisem.
   *  Odsyłamy oba przy prośbie o wysyłkę, żeby serwer nie musiał niczego
   *  pamiętać między jednym a drugim zapytaniem. */
  dokument: string;
  podpis: string | null;
  domena: string;
  zbadano: string;
  osiagalna: boolean;
  zablokowany: boolean;
  powodBlokady: string | null;
  punkty: number | null;
  pomiar: {
    ttfbMs: number | null;
    pelnyMs: number | null;
    htmlBajty: number | null;
    kompresjaHtml: string | null;
    serwer: string | null;
    trescZnakow: number;
    tytul: string | null;
    opisMeta: string | null;
    h1: string[];
    canonical: string | null;
    noindex: boolean;
    og: boolean;
    daneStrukturalne: string[];
    sitemap: { jest: boolean; adresow: number | null };
    robots: { jest: boolean; blokujeWszystko: boolean; blokujeAi: string[]; mapaWskazana: boolean };
    obrazy: { wszystkie: number; bezAlt: number; bezWymiarow: number; bezLazy: number };
    cert: { wystawca: string; waznyDo: string; dniDoKonca: number; pasujeDoDomeny: boolean } | null;
    poczta: { spf: boolean; dmarc: boolean; dmarcPolityka: string | null; mx: boolean };
    mobile: {
      viewport: string | null;
      blokujePowiekszanie: boolean;
      osobnaWersja: boolean;
      ttfbMs: number | null;
      regulMedia: number;
      stalychSzerokosci: number;
      obrazowBezSrcset: number;
      sekundNa4G: number | null;
      wagaCalosci: number;
      cssZnakow: number;
    };
    zasoby: {
      znalezione: number;
      zwazone: number;
      najciezsze: { nazwa: string; rodzaj: string; bajty: number | null }[];
    };
  };
  ustalenia: Ustalenie[];
  wycena: { osobno: number; pakiet: number; rabat: number; pilne: number; dniRobocze: number };
  dostepy: string[];
  opis: {
    werdykt: string;
    streszczenie: string;
    sekcje: { obszar: string; naglowek: string; tekst: string }[];
    kolejnosc: { krok: string; powod: string }[];
    mocneStrony: string[];
  } | null;
};

const ETAPY = [
  "Łączymy się ze stroną i mierzymy czas odpowiedzi",
  "Pobieramy ją drugi raz, tym razem jako telefon",
  "Czytamy style i sprawdzamy, czy układ przestawia się na wąskim ekranie",
  "Ważę pliki, które musi pobrać odwiedzający",
  "Sprawdzamy certyfikat, robots.txt, mapę strony i dane dla wyszukiwarki",
  "Sprawdzamy, czy roboty asystentów AI mają tu wstęp",
  "Składam raport i układam naprawy w kolejności",
];

const NAZWA_OBSZARU: Record<string, string> = {
  dostepnosc: "Dostępność i zaufanie",
  szybkosc: "Szybkość",
  mobile: "Wersja na telefon",
  seo: "Widoczność w wyszukiwarce",
  ai: "Widoczność dla asystentów AI",
  poczta: "Poczta firmowa",
};

const KOLEJNOSC_OBSZAROW = ["dostepnosc", "szybkosc", "mobile", "seo", "ai", "poczta"];

const MOTYW_WAGI: Record<Waga, { kropka: string; ramka: string; tekst: string; nazwa: string }> = {
  krytyczne: {
    kropka: "bg-red-500",
    ramka: "border-l-red-500",
    tekst: "text-red-600 dark:text-red-400",
    nazwa: "Krytyczne",
  },
  wazne: {
    kropka: "bg-amber-500",
    ramka: "border-l-amber-500",
    tekst: "text-amber-700 dark:text-amber-400",
    nazwa: "Ważne",
  },
  drobne: {
    kropka: "bg-gray-400",
    ramka: "border-l-gray-400",
    tekst: "text-gray-500 dark:text-gray-400",
    nazwa: "Drobne",
  },
};

function waga(b: number | null): string {
  if (b === null) return "nie zmierzono";
  return b >= 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.round(b / 1024)} kB`;
}

function slownie(p: number): string {
  if (p >= 90) return "bardzo dobry";
  if (p >= 75) return "dobry";
  if (p >= 55) return "wymaga poprawek";
  if (p >= 35) return "słaby";
  return "wymaga pilnej interwencji";
}

function kolorOceny(p: number): string {
  if (p >= 75) return "text-emerald-700 dark:text-emerald-400";
  if (p >= 45) return "text-amber-700 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

/** Pierścień z oceną. Liczba sama w sobie nic nie znaczy, więc obok jest skala. */
function Ocena({ punkty }: { punkty: number }) {
  const obwod = 2 * Math.PI * 52;
  const [narysowane, setNarysowane] = useState(0);

  useEffect(() => {
    // Animacja od zera, żeby było widać, w którą stronę poszła wskazówka.
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / 900);
      setNarysowane(Math.round(punkty * (1 - Math.pow(1 - t, 3))));
      if (t >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [punkty]);

  const kolor = punkty >= 75 ? "#059669" : punkty >= 45 ? "#d97706" : "#dc2626";

  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="stroke-gray-200 dark:stroke-gray-800" />
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          strokeWidth="10"
          stroke={kolor}
          strokeLinecap="round"
          strokeDasharray={obwod}
          strokeDashoffset={obwod - (obwod * narysowane) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-extrabold ${kolorOceny(punkty)}`}>{narysowane}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">na 100</span>
      </div>
    </div>
  );
}

function Wiersz({ nazwa, wartosc }: { nazwa: string; wartosc: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-gray-100 py-2 text-sm last:border-0 dark:border-gray-800">
      <span className="text-gray-600 dark:text-gray-400">{nazwa}</span>
      <span className="text-right font-semibold text-gray-900 dark:text-white">{wartosc}</span>
    </div>
  );
}

function Skladane({
  tytul,
  children,
  naZdarzenie,
}: {
  tytul: string;
  children: React.ReactNode;
  naZdarzenie?: () => void;
}) {
  const [otwarte, setOtwarte] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800">
      <button
        type="button"
        aria-expanded={otwarte}
        onClick={() => {
          setOtwarte((o) => !o);
          if (!otwarte && naZdarzenie) naZdarzenie();
        }}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
      >
        {tytul}
        <span
          aria-hidden="true"
          className={`text-gray-400 transition-transform ${otwarte ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {otwarte && <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">{children}</div>}
    </div>
  );
}

export default function AudytCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">("idle");
  const [etap, setEtap] = useState(0);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [filtr, setFiltr] = useState<Waga | "wszystko">("wszystko");

  const [email, setEmail] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [mailStan, setMailStan] = useState<"idle" | "wysylamy" | "ok" | "blad">("idle");
  const [mailBlad, setMailBlad] = useState("");

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  // Adres podany na stronie głównej uruchamia badanie od razu po wejściu.
  // Czytamy go z adresu przeglądarki, a nie hakiem useSearchParams, bo ten
  // wymusiłby renderowanie tej strony na żądanie przy każdym wejściu.
  const wystartowano = useRef(false);
  useEffect(() => {
    if (wystartowano.current) return;
    const z = new URLSearchParams(window.location.search).get("domena");
    if (!z) return;
    wystartowano.current = true;
    void uruchom(z);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sprawdz(e: React.FormEvent) {
    e.preventDefault();
    await uruchom(domena);
  }

  async function uruchom(cel: string) {
    if (!cel.trim()) return;
    setDomena(cel);
    zglosZdarzenie("audyt_uruchomiony");
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    setMailStan("idle");
    setEtap(0);
    if (timer.current) clearInterval(timer.current);
    // Etapy idą wolniej niż w lżejszych narzędziach, bo to badanie naprawdę
    // trwa. Pasek, który dobiega do końca i staje, wygląda na zawieszony.
    timer.current = setInterval(
      () => setEtap((e) => Math.min(e + 1, ETAPY.length - 1)),
      2600,
    );
    try {
      const res = await fetch("/api/audyt-www", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domena: cel }),
      });
      const dane = await res.json();
      if (timer.current) clearInterval(timer.current);
      if (!res.ok) {
        setBlad(dane?.error || "Nie udało się zbadać tego adresu.");
        setStan("blad");
        return;
      }
      setWynik(dane);
      setStan("gotowe");
      zglosZdarzenie(`audyt_wynik_${dane.punkty >= 75 ? "dobry" : dane.punkty >= 45 ? "sredni" : "slaby"}`);
    } catch {
      if (timer.current) clearInterval(timer.current);
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  async function poproszOMaila(e: React.FormEvent) {
    e.preventDefault();
    if (!wynik) return;
    setMailStan("wysylamy");
    setMailBlad("");
    try {
      const res = await fetch("/api/audyt-www/wyslij", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dokument: wynik.dokument,
          podpis: wynik.podpis,
          email,
          zgoda,
        }),
      });
      const dane = await res.json().catch(() => null);
      if (!res.ok) {
        setMailBlad(dane?.error || "Nie udało się wysłać raportu.");
        setMailStan("blad");
        return;
      }
      setMailStan("ok");
      zglosZdarzenie("audyt_raport_na_maila");
    } catch {
      setMailBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setMailStan("blad");
    }
  }

  const p = wynik?.pomiar;
  const widoczne = wynik
    ? wynik.ustalenia.filter((u) => filtr === "wszystko" || u.waga === filtr)
    : [];
  const liczby = wynik
    ? {
        krytyczne: wynik.ustalenia.filter((u) => u.waga === "krytyczne").length,
        wazne: wynik.ustalenia.filter((u) => u.waga === "wazne").length,
        drobne: wynik.ustalenia.filter((u) => u.waga === "drobne").length,
      }
    : { krytyczne: 0, wazne: 0, drobne: 0 };

  const obszary = KOLEJNOSC_OBSZAROW.filter((o) => widoczne.some((u) => u.obszar === o));
  const sekcjeOpisu = new Map(wynik?.opis?.sekcje.map((s) => [s.obszar, s]) ?? []);

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Darmowy audyt techniczny Twojej strony
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wpisz adres, a w kilkadziesiąt sekund zmierzymy szybkość na komputerze i
        na telefonie, sprawdzimy certyfikat, widoczność w wyszukiwarce, dostęp
        dla asystentów AI oraz zabezpieczenia poczty. Dostaniesz gotowy raport
        z listą poprawek w kolejności i z ceną za naprawę. Bez rejestracji, bez
        podawania adresu e-mail i bez żadnych dostępów do Waszych systemów.
      </p>

      <Przyklady
        pozycje={[{ wartosc: "fluxlab.pl" }, { wartosc: "example.com" }]}
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
          aria-label="Adres strony do zbadania"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
        <button
          type="submit"
          disabled={stan === "ladowanie"}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Badamy stronę..." : "Zrób darmowy audyt"}
        </button>
      </form>

      {stan === "ladowanie" && (
        <>
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
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    i < etap ? "bg-emerald-500" : i === etap ? "animate-pulse bg-accent" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
                {tekst}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Pełne badanie trwa zwykle od trzydziestu sekund do minuty, bo ważę
            każdy plik osobno, zamiast wierzyć deklaracjom serwera.
          </p>
        </>
      )}

      {stan === "blad" && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{blad}</p>}

      {wynik && p && (
        <div className="mt-8 space-y-8">
          {/* Nagłówek wyniku */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40 sm:flex-row sm:items-start">
            {wynik.punkty !== null && <Ocena punkty={wynik.punkty} />}
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {wynik.domena}
              </p>
              <p
                className={`mt-1 text-xl font-bold ${
                  wynik.punkty === null
                    ? "text-gray-600 dark:text-gray-300"
                    : kolorOceny(wynik.punkty)
                }`}
              >
                {wynik.punkty === null
                  ? "Nie wystawiamy oceny tej stronie"
                  : `Stan ${slownie(wynik.punkty)}`}
              </p>
              {wynik.punkty === null && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {wynik.zablokowany
                    ? `Serwer nie wpuścił naszego pomiaru: ${wynik.powodBlokady}. Ocena wystawiona ekranowi ochrony nie mówiłaby nic o Waszej stronie, więc jej nie wystawiamy.`
                    : "Ten adres nie odpowiedział, więc nie mamy czego oceniać."}
                </p>
              )}
              {wynik.opis && (
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {wynik.opis.werdykt}
                </p>
              )}
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {(["krytyczne", "wazne", "drobne"] as Waga[]).map((w) =>
                  liczby[w] ? (
                    <span
                      key={w}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${MOTYW_WAGI[w].kropka}`} />
                      {liczby[w]} {MOTYW_WAGI[w].nazwa.toLowerCase()}
                    </span>
                  ) : null,
                )}
                {!wynik.ustalenia.length && (
                  <span className="rounded-full border border-emerald-500/50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Nie znaleźliśmy nic do poprawy
                  </span>
                )}
              </div>
            </div>
          </div>

          {wynik.opis && (
            <div className="rounded-xl border-l-4 border-accent bg-gray-50 p-5 dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Streszczenie</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {wynik.opis.streszczenie}
              </p>
            </div>
          )}

          {/* Ustalenia */}
          {wynik.ustalenia.length > 0 && (
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="mr-2 text-lg font-bold text-gray-900 dark:text-white">
                  Co znaleźliśmy
                </h3>
                {(["wszystko", "krytyczne", "wazne", "drobne"] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={filtr === w}
                    onClick={() => setFiltr(w)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                      filtr === w
                        ? "border-accent bg-accent-solid text-white"
                        : "border-gray-300 text-gray-600 hover:border-accent dark:border-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {w === "wszystko" ? `Wszystko (${wynik.ustalenia.length})` : `${MOTYW_WAGI[w].nazwa} (${liczby[w]})`}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {obszary.map((obszar) => {
                  const lista = widoczne.filter((u) => u.obszar === obszar);
                  const komentarz = sekcjeOpisu.get(obszar);
                  return (
                    <div key={obszar}>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-accent">
                        {NAZWA_OBSZARU[obszar] ?? obszar}
                      </h4>
                      {komentarz && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                          {komentarz.tekst}
                        </p>
                      )}
                      <div className="mt-3 space-y-3">
                        {lista.map((u) => (
                          <div
                            key={u.klucz}
                            className={`rounded-r-lg border-l-4 bg-gray-50 p-4 dark:bg-gray-900/50 ${MOTYW_WAGI[u.waga].ramka}`}
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <span className={`text-xs font-bold uppercase tracking-wider ${MOTYW_WAGI[u.waga].tekst}`}>
                                {MOTYW_WAGI[u.waga].nazwa}
                              </span>
                              {u.koszt > 0 && (
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                  naprawa {u.koszt} zł
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">{u.tytul}</p>
                            <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Zmierzono: </span>
                              {u.fakt}
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                              {u.skutek}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                              {u.samodzielnie && (
                                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                                  Zrobisz to sam, bez programisty
                                </span>
                              )}
                              {u.material && (
                                <a href={u.material.href} className="font-medium text-accent hover:underline">
                                  Szerzej: {u.material.tytul}
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kolejność i mocne strony */}
          {wynik.opis && wynik.opis.kolejnosc.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">Od czego zacząć</h3>
              <ol className="space-y-3">
                {wynik.opis.kolejnosc.map((k, i) => (
                  <li key={k.krok} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-solid text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{k.krok}</p>
                      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{k.powod}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {wynik.opis && wynik.opis.mocneStrony.length > 0 && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-50/60 p-5 dark:bg-emerald-950/20">
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                Co jest zrobione dobrze
              </p>
              <ul className="mt-2 space-y-1.5">
                {wynik.opis.mocneStrony.map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span aria-hidden="true" className="text-emerald-700">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pomiary */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Surowe pomiary</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wszystko powyżej wynika z tych liczb. Zaglądaj tu, gdy chcesz
              sprawdzić, skąd wzięło się któreś ustalenie.
            </p>
            <Skladane tytul="Szybkość" naZdarzenie={() => zglosZdarzenie("audyt_rozwin_szybkosc")}>
              <Wiersz nazwa="Czas do pierwszego bajtu, komputer" wartosc={p.ttfbMs === null ? "nie zmierzono" : `${p.ttfbMs} ms`} />
              <Wiersz nazwa="Pełne pobranie dokumentu" wartosc={p.pelnyMs === null ? "nie zmierzono" : `${p.pelnyMs} ms`} />
              <Wiersz nazwa="Waga dokumentu" wartosc={waga(p.htmlBajty)} />
              <Wiersz nazwa="Kompresja" wartosc={p.kompresjaHtml ?? "brak"} />
              <Wiersz nazwa="Serwer" wartosc={p.serwer ?? "nie podaje"} />
              <Wiersz nazwa="Plików zważonych" wartosc={`${p.zasoby.zwazone} z ${p.zasoby.znalezione}`} />
              {p.zasoby.najciezsze.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Najcięższe pliki</p>
                  {p.zasoby.najciezsze.map((z) => (
                    <Wiersz key={z.nazwa} nazwa={`${z.nazwa} (${z.rodzaj})`} wartosc={waga(z.bajty)} />
                  ))}
                </div>
              )}
            </Skladane>

            <Skladane tytul="Wersja na telefon" naZdarzenie={() => zglosZdarzenie("audyt_rozwin_mobile")}>
              <Wiersz nazwa="Znacznik viewport" wartosc={p.mobile.viewport ?? "brak"} />
              <Wiersz nazwa="Powiększanie dwoma palcami" wartosc={p.mobile.blokujePowiekszanie ? "zablokowane" : "dozwolone"} />
              <Wiersz nazwa="Czas do pierwszego bajtu, telefon" wartosc={p.mobile.ttfbMs === null ? "nie zmierzono" : `${p.mobile.ttfbMs} ms`} />
              <Wiersz
                nazwa="Reguły przestawiające układ (@media)"
                wartosc={p.mobile.cssZnakow > 500 ? String(p.mobile.regulMedia) : "nie udało się przeczytać stylów"}
              />
              <Wiersz
                nazwa="Sztywne szerokości w stylach"
                wartosc={p.mobile.cssZnakow > 500 ? String(p.mobile.stalychSzerokosci) : "nie udało się przeczytać stylów"}
              />
              <Wiersz nazwa="Obrazy bez wersji na mniejszy ekran" wartosc={`${p.mobile.obrazowBezSrcset} z ${p.obrazy.wszystkie}`} />
              <Wiersz nazwa="Waga całości do pobrania" wartosc={waga(p.mobile.wagaCalosci)} />
              <Wiersz
                nazwa="Szacowany czas na łączu komórkowym"
                wartosc={p.mobile.sekundNa4G === null ? "nie zmierzono" : `około ${p.mobile.sekundNa4G} s`}
              />
              <Wiersz nazwa="Osobny dokument dla telefonu" wartosc={p.mobile.osobnaWersja ? "tak" : "nie"} />
            </Skladane>

            <Skladane tytul="Widoczność w wyszukiwarce" naZdarzenie={() => zglosZdarzenie("audyt_rozwin_seo")}>
              <Wiersz nazwa="Tytuł" wartosc={p.tytul ? `${p.tytul.length} znaków` : "brak"} />
              <Wiersz nazwa="Opis dla wyników" wartosc={p.opisMeta ? `${p.opisMeta.length} znaków` : "brak"} />
              <Wiersz nazwa="Nagłówki pierwszego poziomu" wartosc={String(p.h1.length)} />
              <Wiersz nazwa="Adres podstawowy (canonical)" wartosc={p.canonical ? "jest" : "brak"} />
              <Wiersz nazwa="Zakaz indeksowania" wartosc={p.noindex ? "TAK" : "nie"} />
              <Wiersz nazwa="Mapa strony" wartosc={p.sitemap.jest ? `jest${p.sitemap.adresow ? `, ${p.sitemap.adresow} adresów` : ""}` : "brak"} />
              <Wiersz nazwa="Open Graph" wartosc={p.og ? "jest" : "brak"} />
              <Wiersz nazwa="Dane uporządkowane" wartosc={p.daneStrukturalne.length ? p.daneStrukturalne.slice(0, 4).join(", ") : "brak"} />
              <Wiersz nazwa="Obrazy bez opisu alt" wartosc={`${p.obrazy.bezAlt} z ${p.obrazy.wszystkie}`} />
              <Wiersz nazwa="Treść po odjęciu skryptów" wartosc={`${p.trescZnakow} znaków`} />
            </Skladane>

            <Skladane tytul="Certyfikat i poczta" naZdarzenie={() => zglosZdarzenie("audyt_rozwin_cert")}>
              <Wiersz
                nazwa="Certyfikat"
                wartosc={p.cert ? `${p.cert.wystawca}, ${p.cert.dniDoKonca} dni do końca` : "nie odczytano"}
              />
              <Wiersz nazwa="Certyfikat pasuje do domeny" wartosc={p.cert ? (p.cert.pasujeDoDomeny ? "tak" : "NIE") : "nie odczytano"} />
              <Wiersz nazwa="Serwery poczty" wartosc={p.poczta.mx ? "są" : "brak"} />
              <Wiersz nazwa="SPF" wartosc={p.poczta.spf ? "jest" : "brak"} />
              <Wiersz nazwa="DMARC" wartosc={p.poczta.dmarc ? `${p.poczta.dmarcPolityka ?? "jest"}` : "brak"} />
              <Wiersz nazwa="robots.txt" wartosc={p.robots.jest ? (p.robots.blokujeWszystko ? "blokuje wszystko" : "jest") : "brak"} />
              <Wiersz nazwa="Roboty AI zablokowane" wartosc={p.robots.blokujeAi.length ? p.robots.blokujeAi.join(", ") : "nie"} />
            </Skladane>
          </div>

          {/* Wycena */}
          {wynik.wycena.pakiet > 0 && (
            <div className="rounded-2xl border border-accent/40 bg-accent/5 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Ile kosztuje doprowadzenie tego do porządku
              </h3>
              <div className="mt-3 flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {wynik.wycena.pakiet} zł
                </span>
                {wynik.wycena.rabat > 0 && (
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    {wynik.wycena.osobno} zł
                  </span>
                )}
              </div>
              {wynik.wycena.rabat > 0 && (
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Za komplet jest taniej o {wynik.wycena.rabat} zł niż za każdą
                  poprawkę osobno, bo dostępy, wdrożenie i testy robi się raz, a
                  nie przy każdej pozycji od nowa.
                </p>
              )}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Czas: około {wynik.wycena.dniRobocze}{" "}
                {wynik.wycena.dniRobocze === 1 ? "dzień roboczy" : "dni roboczych"} od
                otrzymania dostępów. Ceny bez VAT, zwolnienie podmiotowe. Wycena
                jest wiążąca przez 30 dni.
              </p>
              {wynik.wycena.pilne > 0 && (
                <p className="mt-3 border-t border-accent/20 pt-3 text-sm text-gray-700 dark:text-gray-300">
                  Jeżeli budżet ma być mniejszy, sama warstwa krytyczna to{" "}
                  <strong>{wynik.wycena.pilne} zł</strong>. Reszta może poczekać, te
                  rzeczy nie mogą.
                </p>
              )}
              <a
                href={`/kontakt?temat=${encodeURIComponent(`Naprawa po audycie ${wynik.domena}`)}`}
                onClick={() => zglosZdarzenie("audyt_klik_zlecam")}
                className="btn-primary mt-5 inline-flex px-6 py-3 text-sm"
              >
                Zlecam naprawę
              </a>
            </div>
          )}

          {/* Dostępy */}
          {wynik.dostepy.length > 0 && (
            <div className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Czego potrzebujemy, żeby to naprawić
              </h3>
              <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                Nie potrzebujemy haseł do niczego. Potrzebujemy dostępu nadanego na
                nasze konto, który cofniecie jednym kliknięciem po zakończeniu
                pracy.
              </p>
              <ul className="mt-3 space-y-1.5">
                {wynik.dostepy.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span aria-hidden="true" className="text-accent">•</span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Jeżeli stroną opiekuje się agencja albo informatyk, wystarczy
                przesłać im tę listę.
              </p>
            </div>
          )}

          {/* Raport na maila */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40">
            {mailStan === "ok" ? (
              <div>
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                  Raport poszedł na {email}
                </p>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                  Jeżeli nie dotrze w ciągu kilku minut, zajrzyj do spamu. Zgodę
                  możesz wycofać, odpisując na tę wiadomość jednym słowem, usuwamy
                  adres tego samego dnia.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Chcesz ten raport na maila?
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                  Wyślemy dokładnie to, co widzisz wyżej, w formie, którą da się
                  przesłać dalej informatykowi albo agencji. Raport jest już
                  gotowy, więc adres podajesz tylko wtedy, gdy faktycznie chcesz
                  go dostać.
                </p>
                <form onSubmit={poproszOMaila} className="mt-4 space-y-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@adres.pl"
                      aria-label="Adres e-mail do wysyłki raportu"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                    <button
                      type="submit"
                      disabled={mailStan === "wysylamy" || !zgoda}
                      className="btn-primary justify-center px-6 text-sm disabled:opacity-50"
                    >
                      {mailStan === "wysylamy" ? "Wysyłamy..." : "Wyślij raport"}
                    </button>
                  </div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={zgoda}
                      onChange={(e) => setZgoda(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-accent focus:ring-accent dark:border-gray-600"
                    />
                    <span>
                      Zgadzamy się na przesłanie raportu na podany adres i na
                      kontakt w sprawie jego wyników. Zgodę możemy wycofać w każdej
                      chwili, odpisując na wiadomość.
                    </span>
                  </label>
                  {mailStan === "blad" && (
                    <p className="text-sm text-red-600 dark:text-red-400">{mailBlad}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Adres służy do wysłania tego raportu i ewentualnej rozmowy o
                    nim. Nie trafia do żadnej listy wysyłkowej i nie jest nikomu
                    przekazywany.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Metodyka */}
          <Skladane tytul="Jak to zmierzyliśmy i czego nie sprawdzałem" naZdarzenie={() => zglosZdarzenie("audyt_rozwin_metodyka")}>
            <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                Wszystkie liczby pochodzą z jednego badania wykonanego przed
                chwilą. Stronę pobrałem dwa razy: raz z nagłówkami komputera, raz
                z nagłówkami telefonu. Wagę plików liczymy z tego, co faktycznie
                przyszło, a nie z deklaracji serwera, i podajemy, ilu plików nie
                udało się zważyć.
              </p>
              <p>
                Czego tutaj nie ma, żeby nie było nieporozumień: nie uruchamiałem
                przeglądarki, więc nie mierzymy czasu rysowania strony, przesunięć
                układu ani wyniku Lighthouse. Nie oceniamy treści merytorycznie,
                nie oceniamy wyglądu i nie porównuję z konkurencją. Badamy stronę
                główną, nie każdą podstronę. Pojedynczy pomiar czasu zależy od
                chwili, więc wartości graniczne warto sprawdzić drugi raz.
              </p>
              <p>
                Jeżeli któraś liczba budzi wątpliwość, napisz. Sprawdzimy ją
                jeszcze raz i wytłumaczymy, skąd się wzięła.
              </p>
            </div>
          </Skladane>
        </div>
      )}
    </div>
  );
}
