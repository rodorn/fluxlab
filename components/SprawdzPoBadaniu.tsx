"use client";

import { useState } from "react";
import Link from "next/link";
import Przyklady, { type Przyklad } from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Blok na koncu wlasnego tekstu badawczego.
 *
 * Powod: szesc tekstow opartych na wlasnym pomiarze konczylo sie odnosnikiem
 * do strony narzedzia, a tam czekal pusty formularz. Czytelnik mial wiec
 * najpierw przejsc na inna strone, potem cos wymyslic i wpisac, zanim
 * cokolwiek zobaczyl. Tutaj jedno klikniecie uruchamia to samo sprawdzenie
 * wprost w tekscie i pokazuje wynik na miejscu.
 *
 * Werdykt jest tym, co zwrocil serwis. Blok nie obiecuje wyniku i nie mowi,
 * co sprawdzenie pokaze.
 */

type Werdykt = "ZIELONY" | "ZOLTY" | "CZERWONY";

interface OdpowiedzWerdykt {
  werdykt?: Werdykt;
  naglowek?: string;
  komentarz?: string;
  /** Ksztalt audytu poczty: punktacja i lista brakow zamiast werdyktu. */
  punkty?: number;
  problemy?: { tytul: string; opis: string }[];
}

interface Wynik {
  werdykt: Werdykt;
  naglowek: string;
  komentarz: string;
}

const MOTYW: Record<Werdykt, { ramka: string; tlo: string; tekst: string }> = {
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
  },
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
  },
};

/**
 * Audyt poczty nie zwraca werdyktu, tylko punktacje i liste brakow. Zeby blok
 * wygladal tak samo niezaleznie od sprawdzenia, sprowadzamy oba ksztalty do
 * jednego: werdykt, naglowek, komentarz.
 */
function ujednolic(dane: OdpowiedzWerdykt, cel: string): Wynik {
  if (typeof dane.punkty === "number") {
    const problemy = dane.problemy ?? [];
    const werdykt: Werdykt =
      dane.punkty >= 80 ? "ZIELONY" : dane.punkty >= 50 ? "ZOLTY" : "CZERWONY";
    return {
      werdykt,
      naglowek: `${cel}: ${dane.punkty} na 100 punktów`,
      komentarz: problemy.length
        ? `Znalezione braki: ${problemy.map((p) => p.tytul).join(", ")}.`
        : "Nie znalazłem żadnego z typowych braków w SPF, DKIM i DMARC.",
    };
  }
  return {
    werdykt: dane.werdykt ?? "ZOLTY",
    naglowek: dane.naglowek ?? "Sprawdzenie zakończone",
    komentarz: dane.komentarz ?? "",
  };
}

export default function SprawdzPoBadaniu({
  naglowek,
  opis,
  endpoint,
  pole = "domena",
  pozycje = [],
  wstep,
  narzedzie,
  kontakt = "Chcesz to poprawić u siebie i nie robić tego samodzielnie?",
}: {
  /** Naglowek bloku, mowi wprost, co da sie tu kliknac. */
  naglowek: string;
  /** Jedno zdanie o tym, co robi sprawdzenie. Bez obietnicy wyniku. */
  opis: string;
  /** Adres sprawdzenia. Bez niego blok pokazuje same odnosniki. */
  endpoint?: string;
  /** Nazwa pola w zapytaniu: wiekszosc sprawdzen bierze domene. */
  pole?: "domena" | "zapytanie";
  pozycje?: Przyklad[];
  wstep?: string;
  /** Pelna wersja narzedzia, dla wlasnych danych. */
  narzedzie: { href: string; etykieta: string };
  kontakt?: string;
}) {
  const [stan, setStan] = useState<"idle" | "ladowanie" | "gotowe" | "blad">(
    "idle",
  );
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [blad, setBlad] = useState("");
  const [cel, setCel] = useState("");

  async function uruchom(wartosc: string) {
    if (!endpoint || !wartosc.trim()) return;
    setCel(wartosc);
    setStan("ladowanie");
    setBlad("");
    setWynik(null);
    zglosZdarzenie("uruchomiono_skan");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [pole]: wartosc }),
      });
      const dane = await res.json();
      if (!res.ok) {
        setBlad(dane?.error || "Nie udało się wykonać sprawdzenia.");
        setStan("blad");
        return;
      }
      const u = ujednolic(dane, wartosc);
      setWynik(u);
      setStan("gotowe");
      zglosZdarzenie(`wynik_${u.werdykt.toLowerCase()}`);
    } catch {
      setBlad("Brak połączenia. Spróbuj ponownie za chwilę.");
      setStan("blad");
    }
  }

  const m = wynik ? MOTYW[wynik.werdykt] : null;

  return (
    <div className="my-10 rounded-2xl border border-gray-200 bg-white/70 p-6 dark:border-gray-800 dark:bg-gray-900/50">
      <strong className="text-lg text-gray-900 dark:text-white">
        {naglowek}
      </strong>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {opis}
      </p>

      {endpoint && pozycje.length > 0 && (
        <Przyklady
          pozycje={pozycje}
          onWybor={uruchom}
          zablokowane={stan === "ladowanie"}
          wstep={wstep ?? "Uruchom na gotowym przykładzie, jednym kliknięciem:"}
        />
      )}

      {stan === "ladowanie" && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Sprawdzam {cel}, to trwa kilkanaście sekund.
        </p>
      )}

      {stan === "blad" && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{blad}</p>
      )}

      {stan === "gotowe" && wynik && m && (
        <div className={`mt-4 rounded-xl border ${m.ramka} ${m.tlo} p-4`}>
          <p className={`text-sm font-semibold ${m.tekst}`}>{wynik.naglowek}</p>
          {wynik.komentarz && (
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {wynik.komentarz}
            </p>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <Link href={narzedzie.href} className="btn-primary px-5 py-2.5 text-sm">
          {narzedzie.etykieta}
        </Link>
        <span className="text-gray-600 dark:text-gray-400">
          {kontakt}{" "}
          <Link href="/kontakt" className="text-accent hover:underline">
            Napisz, co chcesz zmienić
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
