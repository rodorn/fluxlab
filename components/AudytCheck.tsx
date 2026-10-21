"use client";

import { odmien } from "@/lib/odmiana";
import { useEffect, useRef, useState } from "react";

import Przyklady from "@/components/Przyklady";
import SkanAdresu from "@/components/SkanAdresu";
import PorownanieZFluxlab from "@/components/PorownanieZFluxlab";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import DalejPoWyniku from "@/components/DalejPoWyniku";
import ZamowAudytCalosci from "@/components/ZamowAudytCalosci";
import PopravTo from "@/components/PopravTo";

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
  zysk?: string;
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
    lighthouse?: {
      wydajnosc: number | null;
      dostepnosc: number | null;
      praktyki: number | null;
      seo: number | null;
      fcpMs: number | null;
      lcpMs: number | null;
      tbtMs: number | null;
      cls: number | null;
    } | null;
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
    robots: {
      jest: boolean;
      blokujeWszystko: boolean;
      blokujeAi: string[];
      mapaWskazana: boolean;
    };
    obrazy: {
      wszystkie: number;
      bezAlt: number;
      bezWymiarow: number;
      bezLazy: number;
    };
    cert: {
      wystawca: string;
      waznyDo: string;
      dniDoKonca: number;
      pasujeDoDomeny: boolean;
    } | null;
    poczta: {
      spf: boolean;
      dmarc: boolean;
      dmarcPolityka: string | null;
      mx: boolean;
    };
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
    technologie?: {
      id: string;
      nazwa: string;
      wersja: string | null;
      status: "aktualna" | "starsza" | "przestarzala" | "bez_oceny";
      powod: string;
    }[];
    zapytania?: {
      podstrona: string | null;
      formularz: boolean;
      typyFormularza: string[];
      wlasnySkrypt: boolean;
      crm: { nazwa: string; formularz: boolean }[];
      marketing: string[];
      czat: string[];
      rezerwacje: string[];
      telefon: boolean;
      email: boolean;
    } | null;
    kursor?: {
      klikalnych: number;
      bezRaczki: number;
      problemy: { opis: string; ile: number }[];
      arkuszyNieprzeczytanych: number;
    } | null;
    zasoby: {
      znalezione: number;
      zwazone: number;
      najciezsze: { nazwa: string; rodzaj: string; bajty: number | null }[];
    };
  };
  ustalenia: Ustalenie[];
  wycena: {
    osobno: number;
    pakiet: number;
    rabat: number;
    pilne: number;
    dniRobocze: number;
  };
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
  "Ważymy pliki, które musi pobrać odwiedzający",
  "Sprawdzamy certyfikat, robots.txt, mapę strony i dane dla wyszukiwarki",
  "Sprawdzamy, czy roboty asystentów AI mają tu wstęp",
  "Składamy raport i układamy naprawy w kolejności",
];

/** Typowy czas etapu w sekundach (razem ok. 50 s, tyle trwa zwykle badanie). */
const CZAS_ETAPU = [5, 6, 7, 8, 8, 6, 10];
const START_ETAPU = CZAS_ETAPU.map((_, i) => CZAS_ETAPU.slice(0, i).reduce((a, b) => a + b, 0));

function procentEtapu(i: number, sekundy: number): number {
  const p = ((sekundy - START_ETAPU[i]) / CZAS_ETAPU[i]) * 100;
  // Ostatni etap czeka na prawdziwy wynik, więc nie dochodzi sam do 100%.
  return Math.round(Math.max(0, Math.min(i === CZAS_ETAPU.length - 1 ? 95 : 100, p)));
}

function KolkoProcent({ p }: { p: number }) {
  const r = 11;
  const obwod = 2 * Math.PI * r;
  const gotowe = p >= 100;
  return (
    <span aria-hidden="true" className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center">
      <svg viewBox="0 0 28 28" className="absolute inset-0 -rotate-90">
        <circle cx="14" cy="14" r={r} fill="none" strokeWidth="2.5" className="stroke-gray-200 dark:stroke-white/10" />
        <circle
          cx="14"
          cy="14"
          r={r}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={obwod}
          strokeDashoffset={obwod * (1 - p / 100)}
          className={`transition-[stroke-dashoffset] duration-200 ${gotowe ? "stroke-emerald-500" : "stroke-accent"}`}
        />
      </svg>
      {gotowe ? (
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-emerald-500">
          <path d="M2.5 6.5l2.3 2.3L9.5 3.8" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="text-[8px] font-semibold tabular-nums text-gray-600 dark:text-gray-300">{p}%</span>
      )}
    </span>
  );
}

const NAZWA_OBSZARU: Record<string, string> = {
  zapytania: "Zapytania i CRM",
  dostepnosc: "Dostępność i zaufanie",
  szybkosc: "Szybkość",
  mobile: "Wersja na telefon",
  seo: "Widoczność w wyszukiwarce",
  ai: "Widoczność dla asystentów AI",
  poczta: "Poczta firmowa",
  bezpieczenstwo: "Bezpieczeństwo",
  prawo: "Prawo i zaufanie klientów",
};

const KOLEJNOSC_OBSZAROW = [
  "zapytania",
  "dostepnosc",
  "szybkosc",
  "mobile",
  "seo",
  "ai",
  "bezpieczenstwo",
  "prawo",
  "poczta",
];

const MOTYW_WAGI: Record<
  Waga,
  { kropka: string; ramka: string; tekst: string; nazwa: string }
> = {
  krytyczne: {
    kropka: "bg-red-500",
    ramka: "border-l-red-500",
    tekst: "text-red-700 dark:text-red-400",
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
  return b >= 1_048_576
    ? `${(b / 1_048_576).toFixed(1)} MB`
    : `${Math.round(b / 1024)} kB`;
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
  return "text-red-700 dark:text-red-400";
}

/** Tarcza z oceną. Obrys wypełnia się do wyniku, a liczba stoi w środku. */
function Ocena({ punkty }: { punkty: number }) {
  const [narysowane, setNarysowane] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNarysowane(punkty);
      return;
    }
    const start = Date.now();
    const id = setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / 900);
      setNarysowane(Math.round(punkty * (1 - Math.pow(1 - t, 3))));
      if (t >= 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [punkty]);

  const kolor = punkty >= 75 ? "#059669" : punkty >= 45 ? "#d97706" : "#dc2626";
  const tarcza = "M60 8 L106 24 V58 C106 86 86 106 60 116 C34 106 14 86 14 58 V24 Z";

  return (
    <div className="relative h-36 w-32 shrink-0">
      <svg viewBox="0 0 120 124" className="h-full w-full" aria-hidden="true">
        <path
          d={tarcza}
          fill="none"
          strokeWidth="8"
          strokeLinejoin="round"
          className="stroke-gray-200 dark:stroke-gray-800"
        />
        <path
          d={tarcza}
          fill="none"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke={kolor}
          pathLength={100}
          strokeDasharray={100}
          strokeDashoffset={100 - narysowane}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pb-2">
        <span className={`text-3xl font-extrabold ${kolorOceny(punkty)}`}>
          {narysowane}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">na 100</span>
      </div>
    </div>
  );
}

function Wiersz({ nazwa, wartosc }: { nazwa: string; wartosc: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-gray-100 py-2 text-sm last:border-0 dark:border-gray-800">
      <span className="text-gray-600 dark:text-gray-400">{nazwa}</span>
      <span className="text-right font-semibold text-gray-900 dark:text-white">
        {wartosc}
      </span>
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
      {otwarte && (
        <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
}

const KLUCZ_WYNIKU = "fluxlab_audyt_wynik";

function KoloLighthouse({ nazwa, wynik }: { nazwa: string; wynik: number | null }) {
  const kolor =
    wynik === null
      ? "text-gray-400"
      : wynik >= 90
        ? "text-emerald-600 dark:text-emerald-400"
        : wynik >= 50
          ? "text-amber-600 dark:text-amber-400"
          : "text-red-600 dark:text-red-400";
  const obwod = 2 * Math.PI * 26;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative h-16 w-16 ${kolor}`}>
        <svg viewBox="0 0 60 60" className="h-16 w-16 -rotate-90" aria-hidden="true">
          <circle cx="30" cy="30" r="26" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="5" />
          <circle
            cx="30"
            cy="30"
            r="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={obwod}
            strokeDashoffset={obwod * (1 - (wynik ?? 0) / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums">
          {wynik ?? "–"}
        </span>
      </div>
      <span className="text-center text-xs text-gray-600 dark:text-gray-400">{nazwa}</span>
    </div>
  );
}

function WynikiLighthouse({
  l,
}: {
  l: NonNullable<Wynik["pomiar"]["lighthouse"]>;
}) {
  const s = (ms: number | null) => (ms === null ? "–" : `${(ms / 1000).toFixed(1).replace(".", ",")} s`);
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-5 dark:border-white/10">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Wynik Lighthouse na telefonie</h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Ten sam test, którego używa Google w PageSpeed Insights. Od 90 punktów jest dobrze.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KoloLighthouse nazwa="Wydajność" wynik={l.wydajnosc} />
        <KoloLighthouse nazwa="Dostępność" wynik={l.dostepnosc} />
        <KoloLighthouse nazwa="Dobre praktyki" wynik={l.praktyki} />
        <KoloLighthouse nazwa="SEO" wynik={l.seo} />
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
        <div><dt className="text-gray-500 dark:text-gray-400">Pierwsza treść</dt><dd className="font-semibold tabular-nums">{s(l.fcpMs)}</dd></div>
        <div><dt className="text-gray-500 dark:text-gray-400">Główna treść</dt><dd className="font-semibold tabular-nums">{s(l.lcpMs)}</dd></div>
        <div><dt className="text-gray-500 dark:text-gray-400">Blokowanie</dt><dd className="font-semibold tabular-nums">{l.tbtMs === null ? "–" : `${l.tbtMs} ms`}</dd></div>
        <div><dt className="text-gray-500 dark:text-gray-400">Przesunięcia układu</dt><dd className="font-semibold tabular-nums">{l.cls === null ? "–" : String(l.cls).replace(".", ",")}</dd></div>
      </dl>
    </div>
  );
}

export default function AudytCheck() {
  const [domena, setDomena] = useState("");
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">(
    "idle",
  );
  const [etap, setEtap] = useState(0);
  const [sekundy, setSekundy] = useState(0);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  // Kiedy powstał pokazany wynik, gdy wczytaliśmy go z przeglądarki.
  const [zapisany, setZapisany] = useState<string | null>(null);
  const [filtr, setFiltr] = useState<Waga | "wszystko">("wszystko");

  const [email, setEmail] = useState("");
  const [zgoda, setZgoda] = useState(false);
  const [mailStan, setMailStan] = useState<"idle" | "wysylamy" | "ok" | "blad">(
    "idle",
  );
  const [mailBlad, setMailBlad] = useState("");

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  // Adres podany na stronie głównej uruchamia badanie od razu po wejściu.
  // Czytamy go z adresu przeglądarki, a nie hakiem useSearchParams, bo ten
  // wymusiłby renderowanie tej strony na żądanie przy każdym wejściu.
  const wystartowano = useRef(false);
  useEffect(() => {
    if (wystartowano.current) return;
    const z = new URLSearchParams(window.location.search).get("domena");
    if (!z) return;
    wystartowano.current = true;
    // „Zobacz wynik” z powitania otwiera zapisany wynik od razu, bez badania.
    try {
      const raw = localStorage.getItem(KLUCZ_WYNIKU);
      const d = raw ? (JSON.parse(raw) as { kiedy: string; dane: Wynik }) : null;
      const bez = (x: string) => x.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
      if (
        d?.dane &&
        bez(d.dane.domena ?? "") === bez(z) &&
        Date.now() - Date.parse(d.kiedy) < 30 * 24 * 60 * 60 * 1000
      ) {
        setDomena(z);
        setWynik(d.dane);
        setZapisany(d.kiedy);
        setStan("gotowe");
        return;
      }
    } catch {}
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
    setZapisany(null);
    setMailStan("idle");
    setEtap(0);
    setSekundy(0);
    if (timer.current) clearInterval(timer.current);
    // Każdy etap ma swój typowy czas, procent w kółku liczy się z upływu czasu.
    const t0 = performance.now();
    timer.current = setInterval(() => {
      const sek = (performance.now() - t0) / 1000;
      setSekundy(sek);
      const i = START_ETAPU.findLastIndex((st) => sek >= st);
      setEtap(Math.max(0, Math.min(i, ETAPY.length - 1)));
    }, 200);
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
      try {
        localStorage.setItem(
          "fluxlab_ostatni_audyt",
          JSON.stringify({
            domena: dane.domena ?? cel,
            kiedy: new Date().toISOString(),
            ileProblemow: Array.isArray(dane.ustalenia) ? dane.ustalenia.length : 0,
          }),
        );
        localStorage.setItem(
          KLUCZ_WYNIKU,
          JSON.stringify({ kiedy: new Date().toISOString(), dane }),
        );
      } catch {}
      zglosZdarzenie(
        `audyt_wynik_${dane.punkty >= 75 ? "dobry" : dane.punkty >= 45 ? "sredni" : "slaby"}`,
      );
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

  const zapytania = filtr === "wszystko" ? (wynik?.pomiar.zapytania ?? null) : null;
  const obszary = KOLEJNOSC_OBSZAROW.filter(
    (o) =>
      widoczne.some((u) => u.obszar === o) || (o === "zapytania" && zapytania),
  );
  const sekcjeOpisu = new Map(
    wynik?.opis?.sekcje.map((s) => [s.obszar, s]) ?? [],
  );

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white/70 p-6 dark:border-gray-800/80 dark:bg-gray-900/50 md:p-8">
      <h2 className="sr-only text-xl sm:not-sr-only font-bold text-gray-900 dark:text-white">
        Darmowy audyt techniczny Twojej strony
      </h2>

      <form onSubmit={sprawdz} className="flex flex-col gap-3 sm:mt-5 sm:flex-row">
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
          className="btn-primary disabled:opacity-50"
        >
          {stan === "ladowanie" ? "Badamy stronę..." : "Zrób darmowy audyt"}
        </button>
      </form>

      <Przyklady
        pozycje={[{ wartosc: "fluxlab.pl" }, { wartosc: "example.com" }]}
        onWybor={uruchom}
        zablokowane={stan === "ladowanie"}
      />

      {stan === "ladowanie" && (
        // Wysokość zbliżona do wyniku, żeby w trakcie badania cennik nie
        // podjeżdżał pod pole, a potem nie uciekał w dół.
        <div className="min-h-[70vh]">
          <SkanAdresu domena={domena} etap={etap} liczbaEtapow={ETAPY.length} />
          <ol className="mt-5 space-y-2">
            {ETAPY.map((tekst, i) => (
              <li
                key={tekst}
                className={`flex items-center gap-3 text-sm transition-opacity duration-300 ${
                  i <= etap
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-600"
                }`}
              >
                <KolkoProcent p={procentEtapu(i, sekundy)} />
                {tekst}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Pełne badanie trwa zwykle od trzydziestu sekund do minuty, bo ważymy
            każdy plik osobno, zamiast wierzyć deklaracjom serwera.
          </p>
        </div>
      )}

      {stan === "blad" && (
        <p className="mt-3 text-sm text-red-700 dark:text-red-400">{blad}</p>
      )}

      {wynik && p && (
        <div className="mt-8 space-y-8">
          {zapisany && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Wynik z{" "}
              {new Date(zapisany).toLocaleString("pl-PL", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
              .{" "}
              <button
                type="button"
                onClick={() => void uruchom(wynik.domena)}
                className="font-semibold text-accent hover:underline"
              >
                Sprawdź ponownie
              </button>
            </p>
          )}
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
                    ? `Serwer nie wpuścił naszego pomiaru: ${wynik.powodBlokady}. Ocena wystawiona ekranowi ochrony nie mówiłaby nic o Twojej stronie, więc jej nie wystawiamy.`
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
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${MOTYW_WAGI[w].kropka}`}
                      />
                      {liczby[w]} {MOTYW_WAGI[w].nazwa.toLowerCase()}
                    </span>
                  ) : null,
                )}
                {!wynik.ustalenia.length && (
                  <span className="rounded-full border border-emerald-500/60 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Nie znaleźliśmy nic do poprawy
                  </span>
                )}
              </div>
            </div>
          </div>

          {wynik.punkty !== null && (
            <PorownanieZFluxlab
              domena={wynik.domena}
              wynik={{
                punkty: wynik.punkty,
                krytyczne: liczby.krytyczne ?? 0,
                wazne: liczby.wazne ?? 0,
              }}
            />
          )}

          <PopravTo
            domena={wynik.domena}
            punkty={wynik.punkty}
            pozycje={wynik.ustalenia.map((u) => ({
              waga: u.waga,
              tytul: u.tytul,
            }))}
          />

          {/* Płatny audyt całej strony */}
          {wynik.osiagalna && (
            <ZamowAudytCalosci domena={wynik.domena} miejsce="wynik" />
          )}

          {/* Raport na maila */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 dark:border-gray-800 dark:bg-gray-900/40">
            {mailStan === "ok" ? (
              <div>
                <p className="text-base font-bold text-emerald-700 dark:text-emerald-400">
                  Wysłaliśmy raport na {email}
                </p>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                  Jeżeli nie dotrze w ciągu kilku minut, zajrzyj do spamu.
                  Zgodę wycofasz, odpisując jednym słowem.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Chcesz ten raport na maila?
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">
                  Wyślemy ten raport na Twój adres, bez listy wysyłkowej.
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
                      className="btn-primary disabled:opacity-50"
                    >
                      {mailStan === "wysylamy"
                        ? "Wysyłamy..."
                        : "Wyślij raport"}
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
                      Zgadzam się na przesłanie raportu na podany adres i na
                      kontakt w sprawie jego wyników. Zgodę mogę wycofać w
                      każdej chwili, odpisując na wiadomość.
                    </span>
                  </label>
                  {mailStan === "blad" && (
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {mailBlad}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>

          {wynik.opis && (
            <div className="rounded-xl border-l-4 border-accent bg-gray-50 p-5 dark:bg-gray-900/50">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Streszczenie
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {wynik.opis.streszczenie}
              </p>
              <DalejPoWyniku kampania="audyt" />
            </div>
          )}

          {/* Ustalenia */}
          {wynik.ustalenia.length > 0 && (
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <h3 className="mr-2 text-lg font-bold text-gray-900 dark:text-white">
                  Co znaleźliśmy
                </h3>
                {(["wszystko", "krytyczne", "wazne", "drobne"] as const).map(
                  (w) => (
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
                      {w === "wszystko"
                        ? `Wszystko (${wynik.ustalenia.length})`
                        : `${MOTYW_WAGI[w].nazwa} (${liczby[w]})`}
                    </button>
                  ),
                )}
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
                      {obszar === "zapytania" && zapytania && (
                        <ZapytaniaKlienta z={zapytania} />
                      )}
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
                              <span
                                className={`text-xs font-bold uppercase tracking-wider ${MOTYW_WAGI[u.waga].tekst}`}
                              >
                                {MOTYW_WAGI[u.waga].nazwa}
                              </span>
                              {u.koszt > 0 && (
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                  naprawa {u.koszt} zł
                                </span>
                              )}
                            </div>
                            <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                              {u.tytul}
                            </p>
                            <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Zmierzono: </span>
                              {u.fakt}
                            </p>
                            <div className="mt-2 grid gap-2 text-sm leading-relaxed sm:grid-cols-2">
                              <p className="text-gray-600 dark:text-gray-400">
                                <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                  Bez poprawki
                                </span>
                                {u.skutek}
                              </p>
                              {u.zysk && (
                                <p className="text-gray-700 dark:text-gray-300">
                                  <span className="block text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                    Co zyskasz
                                  </span>
                                  {u.zysk}
                                </p>
                              )}
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                              {u.samodzielnie && (
                                <span className="font-medium text-emerald-700 dark:text-emerald-400">
                                  Zrobisz to sam, bez programisty
                                </span>
                              )}
                              {u.material && (
                                <a
                                  href={u.material.href}
                                  className="font-medium text-accent hover:underline"
                                >
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

          {/* Technologie strony */}
          {(wynik.pomiar.technologie?.length ?? 0) > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                Technologie strony
              </h3>
              <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                {wynik.pomiar.technologie!.map((t) => (
                  <li key={t.id} className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {t.nazwa}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t.wersja ?? (t.id === "universal-analytics" ? "" : "wersja ukryta")}
                      </span>
                      {t.status === "przestarzala" && (
                        <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 dark:bg-red-950 dark:text-red-400">
                          Przestarzałe
                        </span>
                      )}
                      {t.status === "starsza" && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                          Starsza wersja
                        </span>
                      )}
                      {t.status === "aktualna" && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                          Aktualne
                        </span>
                      )}
                    </div>
                    {(t.status === "przestarzala" || t.status === "starsza") && (
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {t.powod} Poprawiamy to w ramach napraw.
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Kolejność i mocne strony */}
          {wynik.opis && wynik.opis.kolejnosc.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                Od czego zacząć
              </h3>
              <ol className="space-y-3">
                {wynik.opis.kolejnosc.map((k, i) => (
                  <li key={k.krok} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-solid text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {k.krok}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                        {k.powod}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {wynik.opis && wynik.opis.mocneStrony.length > 0 && (
            <div className="rounded-xl border border-emerald-500/60 bg-emerald-50 p-5 dark:bg-emerald-950/30">
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                Co jest zrobione dobrze
              </p>
              <ul className="mt-2 space-y-1.5">
                {wynik.opis.mocneStrony.map((x) => (
                  <li
                    key={x}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span aria-hidden="true" className="text-emerald-700 dark:text-emerald-400">
                      ✓
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.lighthouse && <WynikiLighthouse l={p.lighthouse} />}

          {/* Pomiary */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Surowe pomiary
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Wszystko powyżej wynika z tych liczb. Zaglądaj tu, gdy chcesz
              sprawdzić, skąd wzięło się któreś ustalenie.
            </p>
            <Skladane
              tytul="Szybkość"
              naZdarzenie={() => zglosZdarzenie("audyt_rozwin_szybkosc")}
            >
              <Wiersz
                nazwa="Czas do pierwszego bajtu, komputer"
                wartosc={p.ttfbMs === null ? "nie zmierzono" : `${p.ttfbMs} ms`}
              />
              <Wiersz
                nazwa="Pełne pobranie dokumentu"
                wartosc={
                  p.pelnyMs === null ? "nie zmierzono" : `${p.pelnyMs} ms`
                }
              />
              <Wiersz nazwa="Waga dokumentu" wartosc={waga(p.htmlBajty)} />
              <Wiersz nazwa="Kompresja" wartosc={p.kompresjaHtml ?? "brak"} />
              <Wiersz nazwa="Serwer" wartosc={p.serwer ?? "nie podaje"} />
              <Wiersz
                nazwa="Plików zważonych"
                wartosc={`${p.zasoby.zwazone} z ${p.zasoby.znalezione}`}
              />
              {p.zasoby.najciezsze.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Najcięższe pliki
                  </p>
                  {p.zasoby.najciezsze.map((z) => (
                    <Wiersz
                      key={z.nazwa}
                      nazwa={`${z.nazwa} (${z.rodzaj})`}
                      wartosc={waga(z.bajty)}
                    />
                  ))}
                </div>
              )}
            </Skladane>

            <Skladane
              tytul="Wersja na telefon"
              naZdarzenie={() => zglosZdarzenie("audyt_rozwin_mobile")}
            >
              <Wiersz
                nazwa="Znacznik viewport"
                wartosc={p.mobile.viewport ?? "brak"}
              />
              <Wiersz
                nazwa="Powiększanie dwoma palcami"
                wartosc={
                  p.mobile.blokujePowiekszanie ? "zablokowane" : "dozwolone"
                }
              />
              <Wiersz
                nazwa="Czas do pierwszego bajtu, telefon"
                wartosc={
                  p.mobile.ttfbMs === null
                    ? "nie zmierzono"
                    : `${p.mobile.ttfbMs} ms`
                }
              />
              <Wiersz
                nazwa="Reguły przestawiające układ (@media)"
                wartosc={
                  p.mobile.cssZnakow > 500
                    ? String(p.mobile.regulMedia)
                    : "nie udało się przeczytać stylów"
                }
              />
              <Wiersz
                nazwa="Sztywne szerokości w stylach"
                wartosc={
                  p.mobile.cssZnakow > 500
                    ? String(p.mobile.stalychSzerokosci)
                    : "nie udało się przeczytać stylów"
                }
              />
              <Wiersz
                nazwa="Obrazy bez wersji na mniejszy ekran"
                wartosc={`${p.mobile.obrazowBezSrcset} z ${p.obrazy.wszystkie}`}
              />
              <Wiersz
                nazwa="Waga całości do pobrania"
                wartosc={waga(p.mobile.wagaCalosci)}
              />
              <Wiersz
                nazwa="Szacowany czas na łączu komórkowym"
                wartosc={
                  p.mobile.sekundNa4G === null
                    ? "nie zmierzono"
                    : `około ${p.mobile.sekundNa4G} s`
                }
              />
              <Wiersz
                nazwa="Osobny dokument dla telefonu"
                wartosc={p.mobile.osobnaWersja ? "tak" : "nie"}
              />
            </Skladane>

            <Skladane
              tytul="Widoczność w wyszukiwarce"
              naZdarzenie={() => zglosZdarzenie("audyt_rozwin_seo")}
            >
              <Wiersz
                nazwa="Tytuł"
                wartosc={
                  p.tytul
                    ? `${p.tytul.length} ${odmien(p.tytul.length, "znak", "znaki", "znaków")}`
                    : "brak"
                }
              />
              <Wiersz
                nazwa="Opis dla wyników"
                wartosc={
                  p.opisMeta
                    ? `${p.opisMeta.length} ${odmien(p.opisMeta.length, "znak", "znaki", "znaków")}`
                    : "brak"
                }
              />
              <Wiersz
                nazwa="Nagłówki pierwszego poziomu"
                wartosc={String(p.h1.length)}
              />
              <Wiersz
                nazwa="Adres podstawowy (canonical)"
                wartosc={p.canonical ? "jest" : "brak"}
              />
              <Wiersz
                nazwa="Zakaz indeksowania"
                wartosc={p.noindex ? "TAK" : "nie"}
              />
              <Wiersz
                nazwa="Mapa strony"
                wartosc={
                  p.sitemap.jest
                    ? `jest${p.sitemap.adresow ? `, ${p.sitemap.adresow} ${odmien(p.sitemap.adresow, "adres", "adresy", "adresów")}` : ""}`
                    : "brak"
                }
              />
              <Wiersz nazwa="Open Graph" wartosc={p.og ? "jest" : "brak"} />
              <Wiersz
                nazwa="Dane uporządkowane"
                wartosc={
                  p.daneStrukturalne.length
                    ? p.daneStrukturalne.slice(0, 4).join(", ")
                    : "brak"
                }
              />
              <Wiersz
                nazwa="Obrazy bez opisu alt"
                wartosc={`${p.obrazy.bezAlt} z ${p.obrazy.wszystkie}`}
              />
              <Wiersz
                nazwa="Treść po odjęciu skryptów"
                wartosc={`${p.trescZnakow} ${odmien(p.trescZnakow, "znak", "znaki", "znaków")}`}
              />
            </Skladane>

            {p.kursor && (
              <Skladane
                tytul="Kursor nad przyciskami"
                naZdarzenie={() => zglosZdarzenie("audyt_rozwin_kursor")}
              >
                <Wiersz
                  nazwa="Klikalne elementy, razem z linkami"
                  wartosc={String(p.kursor.klikalnych)}
                />
                <Wiersz
                  nazwa="Bez rączki po najechaniu"
                  wartosc={
                    p.kursor.arkuszyNieprzeczytanych > 0
                      ? "nie udało się przeczytać wszystkich stylów"
                      : String(p.kursor.bezRaczki)
                  }
                />
                {p.kursor.arkuszyNieprzeczytanych === 0 &&
                  p.kursor.problemy.map((x) => (
                    <Wiersz
                      key={x.opis}
                      nazwa={x.opis}
                      wartosc={x.ile > 1 ? `${x.ile} razy` : "1 raz"}
                    />
                  ))}
              </Skladane>
            )}

            <Skladane
              tytul="Certyfikat i poczta"
              naZdarzenie={() => zglosZdarzenie("audyt_rozwin_cert")}
            >
              <Wiersz
                nazwa="Certyfikat"
                wartosc={
                  p.cert
                    ? `${p.cert.wystawca}, ${p.cert.dniDoKonca} dni do końca`
                    : "nie odczytano"
                }
              />
              <Wiersz
                nazwa="Certyfikat pasuje do domeny"
                wartosc={
                  p.cert
                    ? p.cert.pasujeDoDomeny
                      ? "tak"
                      : "NIE"
                    : "nie odczytano"
                }
              />
              <Wiersz
                nazwa="Serwery poczty"
                wartosc={p.poczta.mx ? "są" : "brak"}
              />
              <Wiersz nazwa="SPF" wartosc={p.poczta.spf ? "jest" : "brak"} />
              <Wiersz
                nazwa="DMARC"
                wartosc={
                  p.poczta.dmarc
                    ? `${p.poczta.dmarcPolityka ?? "jest"}`
                    : "brak"
                }
              />
              <Wiersz
                nazwa="robots.txt"
                wartosc={
                  p.robots.jest
                    ? p.robots.blokujeWszystko
                      ? "blokuje wszystko"
                      : "jest"
                    : "brak"
                }
              />
              <Wiersz
                nazwa="Roboty wyszukiwania AI zablokowane"
                wartosc={
                  p.robots.blokujeAi.length
                    ? p.robots.blokujeAi.join(", ")
                    : "nie"
                }
              />
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
                {wynik.wycena.dniRobocze === 1
                  ? "dzień roboczy"
                  : "dni roboczych"}{" "}
                od otrzymania dostępów. Ceny netto, doliczamy 23% VAT.
                Wycena jest wiążąca przez 30 dni.
              </p>
              {wynik.wycena.pilne > 0 && (
                <p className="mt-3 border-t border-accent/20 pt-3 text-sm text-gray-700 dark:text-gray-300">
                  Jeżeli budżet ma być mniejszy, sama warstwa krytyczna to{" "}
                  <strong>{wynik.wycena.pilne} zł</strong>. Reszta może
                  poczekać, te rzeczy nie mogą.
                </p>
              )}
              <a
                href={`/kontakt?temat=${encodeURIComponent(`Naprawa po audycie ${wynik.domena}`)}`}
                onClick={() => zglosZdarzenie("audyt_klik_zlecam")}
                className="btn-primary mt-5"
              >
                Zlecamy naprawę
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
                Nie potrzebujemy haseł do niczego. Potrzebujemy dostępu nadanego
                na nasze konto, który cofniesz jednym kliknięciem po
                zakończeniu pracy.
              </p>
              <ul className="mt-3 space-y-1.5">
                {wynik.dostepy.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span aria-hidden="true" className="text-accent">
                      •
                    </span>
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

          {/* Metodyka */}
          <Skladane
            tytul="Jak to zmierzyliśmy i czego nie sprawdzaliśmy"
            naZdarzenie={() => zglosZdarzenie("audyt_rozwin_metodyka")}
          >
            <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <p>
                Wszystkie liczby pochodzą z jednego badania wykonanego przed
                chwilą. Stronę pobraliśmy dwa razy: raz z nagłówkami komputera,
                raz z nagłówkami telefonu. Wagę plików liczymy z tego, co
                faktycznie przyszło, a nie z deklaracji serwera, i podajemy, ilu
                plików nie udało się zważyć.
              </p>
              <p>
                Czego tutaj nie ma, żeby nie było nieporozumień: nie
                uruchamialiśmy przeglądarki, więc nie mierzymy czasu rysowania
                strony, przesunięć układu ani wyniku Lighthouse. Nie oceniamy
                treści merytorycznie, nie oceniamy wyglądu i nie porównujemy z
                konkurencją. Badamy stronę główną, nie każdą podstronę.
                Pojedynczy pomiar czasu zależy od chwili, więc wartości
                graniczne warto sprawdzić drugi raz.
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

type DaneZapytan = NonNullable<Wynik["pomiar"]["zapytania"]>;

/** Którędy klient zostawia zapytanie i czy trafia ono do CRM. */
function ZapytaniaKlienta({ z }: { z: DaneZapytan }) {
  const crmFormularz = z.crm.filter((c) => c.formularz).map((c) => c.nazwa);
  const wiersze: [string, string][] = [
    [
      "Formularz",
      z.formularz ? z.typyFormularza.join(", ") || "jest" : "nie znaleźliśmy",
    ],
    ["CRM", z.crm.length ? z.crm.map((c) => c.nazwa).join(", ") : "nie wykryto"],
    ["Czat", z.czat.length ? z.czat.join(", ") : "brak"],
    ["Rezerwacje online", z.rezerwacje.length ? z.rezerwacje.join(", ") : "brak"],
    [
      "Klikalny telefon i e-mail",
      `${z.telefon ? "telefon jest" : "brak telefonu"}, ${z.email ? "e-mail jest" : "brak e-maila"}`,
    ],
  ];
  if (z.marketing.length) wiersze.splice(2, 0, ["Newsletter", z.marketing.join(", ")]);
  return (
    <div className="mt-2">
      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Sprawdzamy, którędy klient zostawia zapytanie i czy trafia ono do CRM,
        gdzie ktoś dostaje zadanie, czy tylko do skrzynki.
        {z.podstrona ? ` Czytaliśmy stronę główną i ${new URL(z.podstrona).pathname}.` : ""}
      </p>
      <dl className="mt-3 divide-y divide-gray-200 rounded-lg border border-gray-200 text-sm dark:divide-gray-800 dark:border-gray-800">
        {wiersze.map(([n, w]) => (
          <div key={n} className="flex flex-wrap justify-between gap-x-4 gap-y-0.5 px-4 py-2">
            <dt className="text-gray-600 dark:text-gray-400">{n}</dt>
            <dd className="font-semibold text-gray-900 dark:text-white">{w}</dd>
          </div>
        ))}
      </dl>
      {z.crm.length > 0 && (
        <p className="mt-3 rounded-r-lg border-l-4 border-l-emerald-500 bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
          {crmFormularz.length
            ? `Formularz przekazuje dane do ${crmFormularz.join(", ")}, więc zapytania nie czekają w skrzynce.`
            : `Na stronie działa ${z.crm.map((c) => c.nazwa).join(", ")}, więc zapytania mogą trafiać prosto do CRM.`}
        </p>
      )}
      {z.wlasnySkrypt && z.crm.length === 0 && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Formularz wysyła dane do własnego skryptu strony, więc dalszej drogi zapytania nie widać z zewnątrz.
        </p>
      )}
    </div>
  );
}
