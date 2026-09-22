"use client";

import Link from "next/link";
import { useState } from "react";

import { zglosZdarzenie } from "@/lib/zdarzenie";

/**
 * Wybor etapu, na ktorym gubia sie zgloszenia, na stronie filarowej klastra
 * "Automatyzacja leadow i CRM".
 *
 * Powstal z dwoch powodow naraz. Po pierwsze, klaster liczyl dziesiec
 * podobnych stron, ktore dzielily miedzy siebie te sama pule zapytan i nie
 * linkowaly do siebie nawzajem, wiec filar nie byl filarem, tylko jedenasta
 * strona o tym samym. Tutaj kazdy etap prowadzi do dokladnie jednej strony z
 * klastra, czyli hub w koncu rozdaje ruch lisciom.
 *
 * Po drugie, pomiar pokazal, ze ludzie otwieraja strony narzedzi i nie
 * naciskaja na nich niczego, bo kazde sprawdzenie zaczyna sie od wpisania
 * adresu. Tu nie ma czego wpisywac, sa dwa klikniecia i konkretna odpowiedz,
 * wlacznie z odpowiedzia "przy tej skali nie automatyzuj".
 *
 * Wynik nie obiecuje rezultatu i nie powoluje sie na cudze wdrozenia. Mowi,
 * co sie na danym etapie psuje mechanicznie, jak to sprawdzic samodzielnie i
 * co z tym robie, a ceny sa tymi samymi orientacyjnymi zakresami, ktore stoja
 * nizej na tej stronie.
 */

type Etap = {
  klucz: string;
  nazwa: string;
  /** Co sie na tym etapie psuje, opisane mechanizmem, nie skutkiem. */
  objaw: string;
  /** Sprawdzenie, ktore czytelnik moze zrobic sam, dzis, bez mojego udzialu. */
  sprawdz: string;
  /** Co tu robie, kiedy wchodze w proces. */
  robie: string;
  href: string;
  hrefLabel: string;
  /** Darmowe narzedzie, ktore dotyka tego etapu, jesli takie jest. */
  narzedzie?: { href: string; label: string };
};

const ETAPY: Etap[] = [
  {
    klucz: "formularz",
    nazwa: "Formularz na stronie",
    objaw:
      "Zgłoszenie wychodzi z formularza jako mail i dalej żyje tylko w czyjejś skrzynce. Jeśli ten mail wpadnie do spamu albo trafi na urlop, nikt się o nim nie dowie, bo nie ma żadnego drugiego śladu.",
    sprawdz:
      "Wyślij zgłoszenie przez własny formularz z prywatnego adresu i sprawdź, w ilu miejscach się pojawiło. Jeśli tylko w jednej skrzynce, to jest cały Wasz rejestr zapytań.",
    robie:
      "Formularz zapisuje zgłoszenie do CRM jako rekord, a mail zostaje tylko powiadomieniem. Awaria poczty przestaje oznaczać utratę zapytania.",
    href: "/automatyzacja-formularza-do-pipedrive",
    hrefLabel: "Formularz prosto do CRM",
    narzedzie: {
      href: "/audyt-poczty",
      label: "Sprawdź, czy Wasza poczta nie ląduje w spamie",
    },
  },
  {
    klucz: "crm",
    nazwa: "Wpis do CRM",
    objaw:
      "Dane z zapytania ktoś przepisuje ręcznie. Przy przepisywaniu gubi się źródło, powstają duplikaty tej samej firmy i pola bywają puste, bo w pośpiechu wypełnia się tylko te wymagane.",
    sprawdz:
      "Otwórz w CRM listę rekordów z ostatniego miesiąca i policz, ile ma puste pole źródła. To jest liczba zapytań, o których nie wiecie, skąd przyszły.",
    robie:
      "Rekord powstaje automatycznie z jednym kompletem pól: osoba, firma, źródło, treść zapytania. Duplikaty są łączone po adresie i numerze telefonu.",
    href: "/crm-jako-system-pracy",
    hrefLabel: "CRM jako system pracy, nie baza kontaktów",
  },
  {
    klucz: "przypisanie",
    nazwa: "Przypisanie handlowca",
    objaw:
      "Zapytanie leży bez właściciela, dopóki ktoś go nie zauważy. Przy dwóch osobach to działa, przy pięciu zaczyna się „myślałem, że Ty to bierzesz”, a w weekend nie bierze tego nikt.",
    sprawdz:
      "Sprawdź w CRM, ile otwartych zapytań nie ma dziś przypisanej osoby. Potem sprawdź to samo dla zapytań z piątku po południu.",
    robie:
      "Reguła przypisania działa na warunkach, które i tak macie w głowie: region, branża, wartość, kolejka. Brak właściciela przestaje być możliwym stanem.",
    href: "/automatyczne-przypisywanie-leadow",
    hrefLabel: "Automatyczne przypisywanie zgłoszeń",
  },
  {
    klucz: "reakcja",
    nazwa: "Pierwszy kontakt",
    objaw:
      "Zapytanie czeka na moment, w którym ktoś ma czas. Pytający w tym czasie zwykle wysłał to samo zapytanie do kilku firm i rozmawia z tą, która odezwała się pierwsza.",
    sprawdz:
      "Weź dziesięć ostatnich zapytań i policz różnicę między godziną wpłynięcia a godziną pierwszej odpowiedzi. Mediana z tych dziesięciu to Wasz realny czas reakcji.",
    robie:
      "Potwierdzenie idzie do pytającego od razu, a do handlowca trafia zadanie z terminem. Czas reakcji zaczyna być mierzony, więc da się o nim rozmawiać.",
    href: "/czas-reakcji-na-leada",
    hrefLabel: "Czas reakcji na zapytanie",
  },
  {
    klucz: "followup",
    nazwa: "Follow-up",
    objaw:
      "Pierwszy kontakt jest, drugiego nie ma. Nikt nie pilnuje zapytań, które utknęły na „odezwę się w przyszłym tygodniu”, bo pilnowanie ich to osobna praca, której nikt nie ma w zakresie.",
    sprawdz:
      "Odfiltruj w CRM zapytania bez aktywności od trzydziestu dni, które nie są zamknięte. To jest lista, o której zespół już zapomniał.",
    robie:
      "Brak aktywności przez ustalony czas sam tworzy zadanie albo wiadomość. Zapytanie nie może po cichu wypaść z procesu, musi zostać zamknięte świadomie.",
    href: "/automatyzacja-follow-up",
    hrefLabel: "Follow-up, który pilnuje się sam",
  },
  {
    klucz: "raport",
    nazwa: "Raport",
    objaw:
      "Liczby składa się ręcznie z CRM i arkuszy, więc powstają rzadko i późno. Bez nich nie widać, na którym etapie odpada najwięcej zapytań, a to jest jedyna informacja potrzebna do decyzji, co naprawiać.",
    sprawdz:
      "Zapytaj, ile godzin zajęło złożenie ostatniego raportu sprzedaży i z ilu źródeł trzeba było ręcznie skopiować dane.",
    robie:
      "Raport składa się sam i pokazuje liczbę zapytań, czas reakcji i etap, na którym odpadają. Przychodzi w ustalonym dniu, bez proszenia.",
    href: "/raportowanie-z-pipedrive",
    hrefLabel: "Raport, który przychodzi sam",
  },
];

type Skala = {
  klucz: string;
  nazwa: string;
  /** Czy przy tej skali automatyzacja tego etapu w ogole ma sens. */
  warto: boolean;
  werdykt: string;
  koszt: string;
};

const SKALE: Skala[] = [
  {
    klucz: "male",
    nazwa: "Do 20 miesięcznie",
    warto: false,
    werdykt:
      "Przy tej skali nie budowałbym pod to automatyzacji. Dwadzieścia zapytań miesięcznie da się obsłużyć ręcznie i uczciwiej jest powiedzieć, że wdrożenie zwróci się tu bardzo długo. Zrób powyższe sprawdzenie sam i popraw jedną rzecz, która wyjdzie najgorzej.",
    koszt: "Koszt: zero, to zmiana w sposobie pracy, nie we wdrożeniu.",
  },
  {
    klucz: "srednie",
    nazwa: "Od 20 do 200 miesięcznie",
    warto: true,
    werdykt:
      "To skala, przy której ręczne pilnowanie zaczyna kosztować więcej niż automat. Jeden etap wystarczy naprawić osobno, nie trzeba przebudowywać całego procesu naraz.",
    koszt:
      "Orientacyjnie od 1 500 zł za ten etap. Diagnoza przed wyceną: 0 zł.",
  },
  {
    klucz: "duze",
    nazwa: "Ponad 200 miesięcznie",
    warto: true,
    werdykt:
      "Przy tym wolumenie naprawianie pojedynczego etapu zwykle przenosi wąskie gardło dalej, zamiast je usunąć. Sensowniej jest spiąć całą ścieżkę razem z raportem, który pokazuje, gdzie realnie odpadają zapytania.",
    koszt:
      "Orientacyjnie od 2 500 zł za ścieżkę z raportem. Integracje przez API wyceniam osobno.",
  },
];

export default function DrogaLeada() {
  const [etap, setEtap] = useState<Etap | null>(null);
  const [skala, setSkala] = useState<Skala | null>(null);

  const wybierzEtap = (e: Etap) => {
    setEtap(e);
    setSkala(null);
    zglosZdarzenie(`droga_leada_etap_${e.klucz}`);
  };

  const wybierzSkale = (s: Skala) => {
    setSkala(s);
    zglosZdarzenie(`droga_leada_skala_${s.klucz}`);
  };

  return (
    <section
      aria-labelledby="droga-leada"
      className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 dark:border-gray-700 dark:bg-gray-800/60"
    >
      <span className="section-label">Za darmo, bez wpisywania</span>
      <h2
        id="droga-leada"
        className="display-md mt-3 text-gray-900 dark:text-white"
      >
        Na którym etapie gubią się Wasze zapytania?
      </h2>
      <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
        Naciśnij etap, a pokażę, co się tam psuje, jak to sprawdzić u siebie
        jeszcze dzisiaj i co z tym robię. Drugie kliknięcie, o skali, decyduje,
        czy w ogóle warto to automatyzować.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {ETAPY.map((e) => {
          const aktywny = etap?.klucz === e.klucz;
          return (
            <button
              key={e.klucz}
              type="button"
              onClick={() => wybierzEtap(e)}
              aria-pressed={aktywny}
              className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                aktywny
                  ? "border-accent bg-accent-solid text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:text-accent"
              }`}
            >
              {e.nazwa}
            </button>
          );
        })}
      </div>

      {/* Te same szesc stron, ale jako zwykle odnosniki zawsze obecne w
          zrodle. Panel nizej pojawia sie dopiero po kliknieciu, wiec jego
          odnosniki nie istnieja dla nikogo, kto strony nie klika, a to
          dotyczy takze robotow wyszukiwarek. Bez tej listy filar nie
          rozdawalby nic lisciom klastra, czyli nie bylby filarem. */}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Osobna strona o każdym etapie:{" "}
        {ETAPY.map((e, i) => (
          <span key={e.klucz}>
            {i > 0 && ", "}
            <Link href={e.href} className="text-accent hover:underline">
              {e.nazwa.toLowerCase()}
            </Link>
          </span>
        ))}
        .
      </p>

      {etap && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 lg:p-6 dark:border-gray-700 dark:bg-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {etap.nazwa}
          </h3>

          <dl className="mt-4 space-y-4 text-sm leading-relaxed">
            <div>
              <dt className="font-semibold text-gray-900 dark:text-white">
                Co się tu psuje
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                {etap.objaw}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-white">
                Sprawdź to sam, bez mojego udziału
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                {etap.sprawdz}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-white">
                Co z tym robię
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                {etap.robie}
              </dd>
            </div>
          </dl>

          <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Ile zapytań wpada do Was miesięcznie?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SKALE.map((s) => {
                const aktywna = skala?.klucz === s.klucz;
                return (
                  <button
                    key={s.klucz}
                    type="button"
                    onClick={() => wybierzSkale(s)}
                    aria-pressed={aktywna}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                      aktywna
                        ? "border-accent bg-accent-solid text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300 dark:hover:text-accent"
                    }`}
                  >
                    {s.nazwa}
                  </button>
                );
              })}
            </div>
          </div>

          {skala && (
            <div
              className={`mt-5 rounded-xl border p-5 ${
                skala.warto
                  ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  skala.warto
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-400"
                }`}
              >
                {skala.warto
                  ? `${etap.nazwa}, ${skala.nazwa.toLowerCase()}: warto to automatyzować`
                  : `${etap.nazwa}, ${skala.nazwa.toLowerCase()}: jeszcze nie warto`}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {skala.werdykt}
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {skala.koszt}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              href={etap.href}
              className="font-semibold text-accent hover:underline"
            >
              {etap.hrefLabel} →
            </Link>
            {etap.narzedzie && (
              <Link
                href={etap.narzedzie.href}
                className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
              >
                {etap.narzedzie.label} →
              </Link>
            )}
            <Link
              href="/kalkulator-leadow"
              className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent"
            >
              Policz, ile kosztuje Was ręczna obsługa →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
