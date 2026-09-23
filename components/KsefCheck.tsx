"use client";

/**
 * Sprawdzenie gotowosci do KSeF. Dwa klikniecia, zero wpisywania.
 *
 * Ten sam wzorzec co EDoreczeniaCheck i z tego samego powodu: strony narzedzi
 * sa otwierane, a przyciski nie sa naciskane, bo kazde sprawdzenie zaczyna sie
 * od pustego pola. Tutaj pola nie ma wcale.
 *
 * Roznica wobec e-Doreczen jest taka, ze przy KSeF wiekszosc terminow juz
 * minela. Pierwsze klikniecie odpowiada wiec nie na pytanie "od kiedy", tylko
 * "co juz dziala, a co jeszcze mozna odlozyc", a odliczanie idzie do 1 stycznia
 * 2027, kiedy koncza sie wszystkie przepisy przejsciowe naraz.
 *
 * Daty sa ustawowe, wiec sprawdzenie liczy sie w przegladarce i nie ma jak nie
 * odpowiedziec. Zrodla sa wypisane pod wynikiem, do sprawdzenia bez pytania
 * mnie o nic.
 */

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";
import { KONIEC_PRZEJSCIOWYCH, PODATNICY, type Podatnik } from "@/lib/terminy-ksef";

type Sposob = {
  klucz: string;
  etykieta: string;
  werdykt: "GOTOWE" | "DO_DOMKNIECIA" | "DO_ZBUDOWANIA";
  odpowiedz: string;
};

/** Druga decyzja: co u Was konkretnie zostalo do zrobienia. Pierwsza
 *  odpowiedz jest odmowna, bo firma z gotowym KSeF w programie ksiegowym
 *  nie potrzebuje wdrozenia, tylko najwyzej odbioru kosztowych. */
const SPOSOBY: Sposob[] = [
  {
    klucz: "program-z-ksef",
    etykieta: "Program księgowy z wbudowanym KSeF",
    werdykt: "GOTOWE",
    odpowiedz:
      "Wystawianie macie załatwione i nie ma czego wdrażać. Zostaje druga strona, o której łatwo zapomnieć: faktury kosztowe, które od 1 lutego 2026 wpadają do KSeF także do Was. Jeżeli ktoś pobiera je ręcznie i przepisuje do systemu, to jest jedyne miejsce, gdzie warto tu cokolwiek automatyzować.",
  },
  {
    klucz: "program-bez-ksef",
    etykieta: "Program bez KSeF albo własny system",
    werdykt: "DO_DOMKNIECIA",
    odpowiedz:
      "Potrzebna jest warstwa pośrednia: Wasz system produkuje dane faktury, ona zamienia je na XML w schemacie FA(3), wysyła przez API i zapisuje numer KSeF razem z UPO przy dokumencie. Bez zapisanego numeru i UPO nie ma czym wykazać, że faktura została przyjęta, a od 1 stycznia 2027 numer KSeF trzeba podawać w przelewie.",
  },
  {
    klucz: "sklep",
    etykieta: "Sklep, BaseLinker albo inna sprzedaż masowa",
    werdykt: "DO_DOMKNIECIA",
    odpowiedz:
      "Tutaj problemem nie jest pojedyncza faktura, tylko ich liczba i to, co się dzieje przy odrzuceniu. Sensowne wdrożenie ma kolejkę z ponowieniami, bo sesja KSeF potrafi nie odpowiedzieć, a faktura odrzucona po cichu wygląda w sklepie jak wystawiona. Sprzedaż dla osób prywatnych zostaje poza systemem, więc strumienie trzeba rozdzielić.",
  },
  {
    klucz: "kasa-fiskalna",
    etykieta: "Kasa fiskalna i paragony z NIP",
    werdykt: "DO_DOMKNIECIA",
    odpowiedz:
      "Do 31 grudnia 2026 możecie zostać przy kasie i nic nie robić. Warto natomiast wiedzieć, że to się kończy z dnia na dzień, razem z brakiem sankcji, więc grudzień 2026 będzie najgorszym możliwym momentem na wybieranie rozwiązania.",
  },
  {
    klucz: "recznie",
    etykieta: "Excel, Word albo papier",
    werdykt: "DO_ZBUDOWANIA",
    odpowiedz:
      "Przy kilku fakturach miesięcznie nie potrzebujecie wdrożenia, tylko darmowej Aplikacji Podatnika KSeF od Ministerstwa Finansów albo zwykłego programu do fakturowania. Powiemy to wprost, zamiast sprzedawać Wam integrację: jeżeli faktur jest mniej niż kilkadziesiąt w miesiącu i nie powstają w żadnym systemie, integracja nie ma czego spinać.",
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
  podatnik: Podatnik;
  dni: number;
  dniDoSankcji: number;
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

function policz(podatnik: Podatnik): Wynik {
  const dni = dniDo(podatnik.data);
  const dniDoSankcji = dniDo(KONIEC_PRZEJSCIOWYCH);
  const wspolne = { podatnik, dni, dniDoSankcji };

  if (podatnik.pozaObowiazkiem) {
    return {
      ...wspolne,
      werdykt: "ZIELONY",
      etykieta: "Obowiązek Was nie obejmuje",
      naglowek: "Faktur w KSeF wystawiać nie musicie",
    };
  }
  if (dni <= 0) {
    return {
      ...wspolne,
      werdykt: "CZERWONY",
      etykieta: "Obowiązek już działa",
      naglowek: `Termin minął ${podatnik.dataOpis}, czyli ${Math.abs(dni)} ${odmianaDni(Math.abs(dni))} temu`,
    };
  }
  return {
    ...wspolne,
    werdykt: "ZOLTY",
    etykieta: "Wyjątek jeszcze działa",
    naglowek: `Zostało ${dni} ${odmianaDni(dni)}, do ${podatnik.dataOpis}`,
  };
}

export default function KsefCheck() {
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [sposob, setSposob] = useState<Sposob | null>(null);
  const [email, setEmail] = useState("");
  const [leadStan, setLeadStan] = useState<"idle" | "wysylamy" | "ok" | "blad">(
    "idle",
  );
  const [leadBlad, setLeadBlad] = useState("");

  function wybierz(p: Podatnik) {
    zglosZdarzenie("uruchomiono_skan");
    setWynik(policz(p));
    setSposob(null);
    setLeadStan("idle");
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
          company: "Sprawdzenie gotowości do KSeF",
          problemType: "KSeF",
          problemScale: sposob
            ? sposob.etykieta
            : "Sposób wystawiania nieokreślony",
          message: [
            `Grupa podatnika: ${wynik.podatnik.etykieta}`,
            `Termin wystawiania w KSeF: ${wynik.podatnik.dataOpis}`,
            wynik.podatnik.pozaObowiazkiem
              ? "Poza obowiązkiem wystawiania."
              : wynik.dni <= 0
                ? "Obowiązek już działa."
                : `Zostało ${wynik.dni} ${odmianaDni(wynik.dni)}.`,
            sposob ? `Dziś faktury powstają tak: ${sposob.etykieta}` : "",
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
        Co z KSeF obowiązuje Was już dziś, a co jeszcze nie
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Terminy weszły etapami i większość z nich już minęła, ale do końca 2026
        roku działa kilka wyjątków naraz. Naciśnijcie swój przypadek, a
        rozpiszemy, co obowiązuje, jaki wyjątek jeszcze Was chroni i ile dni mu
        zostało. Nic nie trzeba wpisywać.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PODATNICY.map((p) => (
          <button
            key={p.klucz}
            type="button"
            onClick={() => wybierz(p)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              wynik?.podatnik.klucz === p.klucz
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
          <p
            className={`text-xs font-bold uppercase tracking-wider ${m.tekst}`}
          >
            {wynik.etykieta}
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {wynik.naglowek}
          </p>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            {wynik.podatnik.opis}
          </p>

          {wynik.podatnik.uwaga && (
            <p className="mt-3 rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                Uwaga:
              </span>{" "}
              {wynik.podatnik.uwaga}
            </p>
          )}

          {!wynik.podatnik.pozaObowiazkiem && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Odbiór faktur
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Obowiązkowy dla wszystkich od 1 lutego 2026, niezależnie od
                  wielkości firmy. Faktury od dostawców przychodzą do KSeF i
                  ktoś musi je stamtąd zabierać.
                </p>
              </div>
              <div className="rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Koniec wyjątków
                </p>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {wynik.dniDoSankcji > 0
                    ? `Za ${wynik.dniDoSankcji} ${odmianaDni(wynik.dniDoSankcji)}, 1 stycznia 2027, kończą się naraz wszystkie przepisy przejściowe: limit 10 tys. zł, faktury z kas, brak sankcji i brak obowiązku numeru KSeF w przelewie.`
                    : "Przepisy przejściowe się skończyły. Obowiązują sankcje i numer KSeF w przelewach."}
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Druga rzecz do rozstrzygnięcia: co u Was zostało do zrobienia
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sam termin nie mówi nic o nakładzie pracy. Jak dziś powstają u Was
              faktury?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SPOSOBY.map((s) => (
                <button
                  key={s.klucz}
                  type="button"
                  onClick={() => setSposob(s)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    sposob?.klucz === s.klucz
                      ? "border-accent bg-accent-solid text-white"
                      : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
                  }`}
                >
                  {s.etykieta}
                </button>
              ))}
            </div>
            {sposob && (
              <p className="mt-3 rounded-lg bg-white/70 dark:bg-gray-950/50 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                {sposob.odpowiedz}
              </p>
            )}
          </div>

          <div className="mt-5 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Faktur za Was wystawiać nie będziemy, bo to robi Wasz system. Możemy
              spiąć go z KSeF: wysyłkę w schemacie FA(3), zapis numeru KSeF i
              UPO przy dokumencie oraz pobieranie faktur kosztowych. Klient tego
              API, którego do tego używamy, leży otwarcie na{" "}
              <a
                href="https://github.com/rodorn/fluxlab-ksef-integracja"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline underline-offset-2"
              >
                GitHubie
              </a>
              , razem z testami i trybem demo działającym bez konta w KSeF.
              Można go uruchomić i ocenić przed rozmową z kimkolwiek.
            </p>

            {leadStan === "ok" ? (
              <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Mamy zgłoszenie razem z tym wynikiem. Odpiszemy na {email}, zwykle
                tego samego dnia.
              </p>
            ) : (
              <form onSubmit={zamow} className="mt-4">
                <label
                  htmlFor="ksef-email"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Podaj maila, odpiszemy, co w Waszym przypadku trzeba spiąć i za
                  ile
                </label>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    id="ksef-email"
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
                    {leadStan === "wysylamy"
                      ? "Wysyłamy..."
                      : "Wyślij zgłoszenie"}
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
        Terminy i limity pochodzą z serwisu Ministerstwa Finansów:{" "}
        <a
          href="https://ksef.podatki.gov.pl/od-kiedy-trzeba-wystawiac-faktury-w-ksef/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          terminy wystawiania faktur
        </a>{" "}
        oraz{" "}
        <a
          href="https://ksef.podatki.gov.pl/ponizej-10-000-zl/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          zasady limitu 10 tys. zł
        </a>
        . To sprawdzenie techniczne, nie porada podatkowa, a przypadki nietypowe
        rozstrzyga treść ustawy i Wasz księgowy.
      </p>
    </div>
  );
}
