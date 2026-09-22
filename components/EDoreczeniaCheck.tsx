"use client";

/**
 * Sprawdzenie terminu e-Doreczen. Dwa klikniecia, zero wpisywania.
 *
 * Powstalo z pomiaru: strony narzedzi sa otwierane, a przyciski nie sa
 * naciskane, bo kazde sprawdzenie zaczyna sie od pustego pola. Tutaj pola
 * nie ma wcale. Odwiedzajacy wskazuje, jak jest zarejestrowany jego podmiot,
 * i od razu dostaje date z ustawy oraz liczbe dni, ktore zostaly.
 *
 * Daty sa ustawowe i nie zaleza od zadnego zewnetrznego serwisu, wiec
 * sprawdzenie liczy sie w przegladarce i nie ma jak nie odpowiedziec.
 * Zrodla sa wypisane pod wynikiem, zeby dalo sie je sprawdzic bez pytania
 * mnie o nic.
 */

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Podmiot = {
  klucz: string;
  etykieta: string;
  /** Dzien, od ktorego obowiazek dziala. Format ISO, liczony w przegladarce. */
  data: string;
  dataOpis: string;
  /** Co dokladnie znaczy ten termin dla tego podmiotu. */
  opis: string;
  /** Warunek, ktory potrafi przesunac termin wczesniej. */
  uwaga?: string;
};

const PODMIOTY: Podmiot[] = [
  {
    klucz: "ceidg-stare",
    etykieta: "Firma w CEIDG, wpisana przed 2025",
    data: "2026-10-01",
    dataOpis: "1 października 2026",
    opis:
      "Przedsiębiorcy wpisani do CEIDG do 31 grudnia 2024 mają obowiązek posiadania adresu do doręczeń elektronicznych od 1 października 2026. Adres można założyć wcześniej, wniosek jest bezpłatny i składa się go przez Biznes.gov.pl.",
    uwaga:
      "Jeżeli po 30 czerwca 2025 składaliście jakikolwiek wniosek o zmianę wpisu w CEIDG, dane do utworzenia adresu trzeba było podać już przy tamtym wniosku, czyli termin minął wcześniej.",
  },
  {
    klucz: "ceidg-nowe",
    etykieta: "Firma w CEIDG, wpisana od 2025",
    data: "2025-01-01",
    dataOpis: "dzień wpisu do CEIDG",
    opis:
      "Przedsiębiorcy rejestrujący działalność od 1 stycznia 2025 podają dane do utworzenia adresu do doręczeń elektronicznych już we wniosku o wpis. Obowiązek istnieje od pierwszego dnia działalności.",
  },
  {
    klucz: "krs-stare",
    etykieta: "Spółka w KRS, zarejestrowana przed 2025",
    data: "2025-04-01",
    dataOpis: "1 kwietnia 2025",
    opis:
      "Podmioty niepubliczne wpisane do KRS przed 1 stycznia 2025 miały obowiązek posiadania adresu do doręczeń elektronicznych od 1 kwietnia 2025.",
  },
  {
    klucz: "krs-nowe",
    etykieta: "Spółka w KRS, zarejestrowana od 2025",
    data: "2025-01-01",
    dataOpis: "dzień wpisu do KRS",
    opis:
      "Podmioty niepubliczne rejestrujące się w KRS od 1 stycznia 2025 zakładają adres do doręczeń elektronicznych w trakcie rejestracji. Obowiązek istnieje od wpisu.",
  },
  {
    klucz: "zawod",
    etykieta: "Zawód zaufania publicznego",
    data: "2025-01-01",
    dataOpis: "1 stycznia 2025",
    opis:
      "Adwokaci, radcowie prawni, doradcy podatkowi, doradcy restrukturyzacyjni, rzecznicy patentowi i notariusze mają obowiązek od 1 stycznia 2025, niezależnie od formy prowadzenia działalności.",
  },
  {
    klucz: "publiczny",
    etykieta: "Podmiot publiczny",
    data: "2025-01-01",
    dataOpis: "1 stycznia 2025",
    opis:
      "Organy administracji rządowej, jednostki budżetowe, które je obsługują, inne organy władzy publicznej, ZUS, KRUS i NFZ mają obowiązek od 1 stycznia 2025.",
  },
  {
    klucz: "wymiar",
    etykieta: "Sąd, prokuratura, komornik",
    data: "2029-10-01",
    dataOpis: "1 października 2029",
    opis:
      "Sądy, trybunały, komornicy, prokuratura, organy ścigania i Służba Więzienna wchodzą jako ostatnie, od 1 października 2029.",
  },
];

type Skala = {
  klucz: string;
  etykieta: string;
  werdykt: "PANEL" | "GRANICA" | "INTEGRACJA";
  odpowiedz: string;
};

/** Druga decyzja: czy w ogole warto to spinac z systemem. Odpowiedz przy
 *  najmniejszej skali jest odmowna i taka ma zostac, bo przy kilku pismach
 *  rocznie integracja jest wydatkiem bez pokrycia. */
const SKALE: Skala[] = [
  {
    klucz: "kilka-rocznie",
    etykieta: "Kilka pism w roku",
    werdykt: "PANEL",
    odpowiedz:
      "Panel dostawcy w zupełności wystarczy i nie ma czego automatyzować. Załóżcie adres, ustawcie powiadomienia na maila i wróćcie do tematu, jeśli pism zacznie przybywać.",
  },
  {
    klucz: "do-dziesieciu",
    etykieta: "Do 10 pism miesięcznie",
    werdykt: "PANEL",
    odpowiedz:
      "Przy tej skali ręczna obsługa w panelu jeszcze się broni. Warto natomiast od początku pilnować pobierania dowodów doręczenia, bo to od nich liczą się terminy, a w panelu łatwo je przeoczyć.",
  },
  {
    klucz: "do-piecdziesieciu",
    etykieta: "Od 10 do 50 pism miesięcznie",
    werdykt: "GRANICA",
    odpowiedz:
      "To jest granica, na której ktoś w firmie zaczyna przepisywać pisma z panelu do swojego systemu. Integracja zaczyna mieć sens, jeśli od doręczenia liczy się termin, którego ktoś musi pilnować ręcznie.",
  },
  {
    klucz: "powyzej-piecdziesieciu",
    etykieta: "Powyżej 50 pism miesięcznie",
    werdykt: "INTEGRACJA",
    odpowiedz:
      "Przy tej skali osobny panel jest kolejnym miejscem do sprawdzania i najsłabszym ogniwem w liczeniu terminów. Pisma i dowody doręczenia powinny trafiać wprost do systemu, w którym pracujecie.",
  },
];

const MOTYW = {
  CZERWONY: {
    ramka: "border-red-500/60",
    tlo: "bg-red-50 dark:bg-red-950/30",
    tekst: "text-red-700 dark:text-red-400",
  },
  ZOLTY: {
    ramka: "border-amber-500/60",
    tlo: "bg-amber-50 dark:bg-amber-950/30",
    tekst: "text-amber-700 dark:text-amber-400",
  },
  ZIELONY: {
    ramka: "border-emerald-500/60",
    tlo: "bg-emerald-50 dark:bg-emerald-950/30",
    tekst: "text-emerald-700 dark:text-emerald-400",
  },
};

type Wynik = {
  podmiot: Podmiot;
  dni: number;
  werdykt: keyof typeof MOTYW;
  etykieta: string;
  naglowek: string;
};

/** Pelne dni miedzy dzisiaj a terminem, liczone na polnocy, zeby godzina
 *  otwarcia strony nie przesuwala wyniku o jeden dzien. */
function dniDo(iso: string): number {
  const teraz = new Date();
  const dzis = Date.UTC(teraz.getFullYear(), teraz.getMonth(), teraz.getDate());
  const [r, m, d] = iso.split("-").map(Number);
  return Math.round((Date.UTC(r, m - 1, d) - dzis) / 86400000);
}

function odmianaDni(n: number): string {
  return n === 1 ? "dzień" : "dni";
}

function policz(podmiot: Podmiot): Wynik {
  const dni = dniDo(podmiot.data);
  if (dni <= 0) {
    return {
      podmiot,
      dni,
      werdykt: "CZERWONY",
      etykieta: "Obowiązek już działa",
      naglowek:
        podmiot.dataOpis.startsWith("dzień")
          ? "Adres do doręczeń elektronicznych powinien istnieć od pierwszego dnia"
          : `Termin minął ${podmiot.dataOpis}, czyli ${Math.abs(dni)} ${odmianaDni(Math.abs(dni))} temu`,
    };
  }
  if (dni <= 120) {
    return {
      podmiot,
      dni,
      werdykt: "ZOLTY",
      etykieta: "Termin blisko",
      naglowek: `Zostało ${dni} ${odmianaDni(dni)}, do ${podmiot.dataOpis}`,
    };
  }
  return {
    podmiot,
    dni,
    werdykt: "ZIELONY",
    etykieta: "Czas jeszcze jest",
    naglowek: `Obowiązek wchodzi ${podmiot.dataOpis}, czyli za ${dni} ${odmianaDni(dni)}`,
  };
}

export default function EDoreczeniaCheck() {
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [skala, setSkala] = useState<Skala | null>(null);
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylam" | "ok" | "blad">("idle");
  const [leadBlad, setLeadBlad] = useState("");

  function wybierz(p: Podmiot) {
    zglosZdarzenie("uruchomiono_skan");
    setWynik(policz(p));
    setSkala(null);
    setLeadStan("idle");
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
          company: "Sprawdzenie terminu e-Doręczeń",
          problemType: "e-Doręczenia",
          problemScale: skala ? skala.etykieta : "Skala nieokreślona",
          message: [
            `Rodzaj podmiotu: ${wynik.podmiot.etykieta}`,
            `Termin ustawowy: ${wynik.podmiot.dataOpis}`,
            wynik.dni <= 0
              ? "Obowiązek już działa."
              : `Zostało ${wynik.dni} ${odmianaDni(wynik.dni)}.`,
            skala ? `Liczba pism: ${skala.etykieta}` : "",
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
        Od kiedy Wasz podmiot musi mieć adres do e-Doręczeń
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Terminy wchodzą etapami i zależą wyłącznie od tego, gdzie i kiedy podmiot
        został zarejestrowany. Naciśnijcie swój przypadek, a policzę datę z ustawy
        i dni, które zostały. Nic nie trzeba wpisywać.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PODMIOTY.map((p) => (
          <button
            key={p.klucz}
            type="button"
            onClick={() => wybierz(p)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              wynik?.podmiot.klucz === p.klucz
                ? "border-accent bg-accent-solid text-white"
                : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
            }`}
          >
            {p.etykieta}
          </button>
        ))}
      </div>

      {wynik && m && (
        <div className={`mt-6 rounded-xl border ${m.ramka} ${m.tlo} p-5`}>
          <p className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}>
            {wynik.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {wynik.podmiot.opis}
          </p>

          {wynik.podmiot.uwaga && (
            <p className="mt-3 rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                Uwaga:
              </span>{" "}
              {wynik.podmiot.uwaga}
            </p>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Druga rzecz do rozstrzygnięcia: czy to w ogóle warto spinać z systemem
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sam obowiązek nie mówi nic o tym, jak skrzynkę obsługiwać. Ile pism
              urzędowych dostajecie dziś?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKALE.map((s) => (
                <button
                  key={s.klucz}
                  type="button"
                  onClick={() => setSkala(s)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    skala?.klucz === s.klucz
                      ? "border-accent bg-accent-solid text-white"
                      : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
                  }`}
                >
                  {s.etykieta}
                </button>
              ))}
            </div>
            {skala && (
              <p className="mt-3 rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                {skala.odpowiedz}
              </p>
            )}
          </div>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Samego adresu nie założę za Was, bo wniosek składa właściciel
              skrzynki. Mogę natomiast spiąć ją z systemem, którego używacie, razem
              z pobieraniem dowodów doręczenia. Klient tego API, którego do tego
              używam, leży otwarcie na{" "}
              <a
                href="https://github.com/rodorn/edoreczenia-klient"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-2"
              >
                GitHubie
              </a>{" "}
              na licencji MIT, do obejrzenia przed rozmową z kimkolwiek.
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mam zgłoszenie razem z tym wynikiem. Odpiszę na {email}, zwykle tego
                samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="edoreczenia-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odpiszę, co w Waszym przypadku trzeba spiąć i za ile
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="edoreczenia-email"
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
        Daty pochodzą z ustawy o doręczeniach elektronicznych i z harmonogramu
        Ministerstwa Cyfryzacji:{" "}
        <a
          href="https://www.gov.pl/web/e-doreczenia/harmonogram"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          gov.pl/web/e-doreczenia/harmonogram
        </a>{" "}
        oraz{" "}
        <a
          href="https://www.biznes.gov.pl/pl/portal/004495"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          biznes.gov.pl
        </a>
        . To sprawdzenie techniczne, nie porada prawna, a przypadki nietypowe
        rozstrzyga treść ustawy.
      </p>
    </div>
  );
}
