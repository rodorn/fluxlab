"use client";

/**
 * Lista kontrolna na 1 stycznia 2027, kiedy koncza sie naraz wszystkie
 * przepisy przejsciowe KSeF. Pierwsze sprawdzenie na tej stronie mowi, od
 * kiedy obowiazek dziala. Ta lista mowi, co trzeba miec domkniete, zanim
 * pomylka zacznie kosztowac.
 *
 * Pytania, fakty i zalecenia stoja w HTML od razu, a nie dopiero po
 * kliknieciu, bo tego samego szuka asystent AI pytany "co sie zmienia w KSeF
 * w 2027". Klikniecia licza tylko podsumowanie i skladaja tekst do wyslania
 * ksiegowej, czyli powod, zeby ktos te liste podal dalej.
 */

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Punkt = {
  klucz: string;
  pytanie: string;
  zmiana: string;
  zrobic: string;
};

const PUNKTY: Punkt[] = [
  {
    klucz: "poza-ksef",
    pytanie: "Czy wszystkie faktury dla firm wystawiacie już w KSeF?",
    zmiana:
      "1 stycznia 2027 znika limit 10 tys. zł brutto miesięcznie na faktury wystawiane poza KSeF. Od tego dnia każda faktura dla firmy musi przejść przez system.",
    zrobic:
      "Jeżeli choć część faktur powstaje w Wordzie, w Excelu albo w programie bez KSeF, przenieście je do programu z KSeF albo do darmowej Aplikacji Podatnika KSeF jeszcze w 2026, kiedy pomyłka nic nie kosztuje.",
  },
  {
    klucz: "kasa",
    pytanie:
      "Czy macie ustalone, gdzie od stycznia powstanie faktura do sprzedaży z kasy?",
    zmiana:
      "Faktury wystawiane przy użyciu kasy rejestrującej, w tym paragony z NIP do 450 zł uznawane za faktury uproszczone, są poza KSeF tylko do 31 grudnia 2026.",
    zrobic:
      "Jeżeli sprzedajecie przez kasę, a klienci proszą o fakturę, wybierzcie program, w którym ta faktura powstanie od stycznia, i przećwiczcie to na jednym dokumencie. Jeżeli nie macie kasy, ten punkt Was nie dotyczy.",
  },
  {
    klucz: "przelew",
    pytanie:
      "Czy numer KSeF faktury kosztowej jest pod ręką, kiedy robicie przelew?",
    zmiana:
      "Od 1 stycznia 2027 przelew za fakturę z KSeF między czynnymi podatnikami VAT ma zawierać jej 35-znakowy numer KSeF. Przy zapłacie za wiele faktur jednego kontrahenta wystarczy jeden identyfikator zbiorczy wygenerowany w KSeF. Nie dotyczy to płatności kartą, BLIK-iem ani gotówką.",
    zrobic:
      "Sprawdźcie, czy numer KSeF trafia z programu księgowego do pliku przelewów albo do banku. Jeżeli przelewy robi ktoś, kto widzi tylko PDF faktury, numer będzie przepisywany ręcznie przy każdej płatności.",
  },
  {
    klucz: "koszty",
    pytanie: "Czy ktoś regularnie pobiera faktury kosztowe z KSeF?",
    zmiana:
      "Faktura od dostawcy jest uznana za otrzymaną w dniu nadania jej numeru w KSeF. Dostawca nie musi już wysyłać jej mailem, więc termin płatności biegnie także wtedy, gdy nikt do systemu nie zajrzał.",
    zrobic:
      "Ustalcie, kto i jak często pobiera faktury zakupowe i dokąd one trafiają. Bez tego o fakturze dowiecie się dopiero z upomnienia dostawcy.",
  },
  {
    klucz: "offline",
    pytanie:
      "Czy macie certyfikat KSeF do wystawiania faktur w trybie offline?",
    zmiana:
      "Gdy KSeF nie działa albo nie ma internetu, fakturę wystawia się w trybie offline i wysyła do systemu później. Taka faktura przekazana klientowi poza systemem musi mieć dwa kody QR, a drugiego nie da się wygenerować bez certyfikatu KSeF typu 2, ważnego 2 lata.",
    zrobic:
      "Wygenerujcie certyfikat w Aplikacji Podatnika KSeF teraz, a nie w dniu awarii. Tokeny do logowania zostają, bo Ministerstwo Finansów zrezygnowało z ich wygaszenia, więc certyfikat nie zastępuje tokenu, tylko go uzupełnia.",
  },
  {
    klucz: "odrzucenia",
    pytanie:
      "Czy widzicie, która faktura została odrzucona albo jeszcze nie wysłana?",
    zmiana:
      "Do 31 grudnia 2026 nie ma kar za błędy w KSeF. Od 1 stycznia 2027 za fakturę wystawioną poza KSeF, choć powinna przez niego przejść, naczelnik urzędu skarbowego może nałożyć karę do 100% kwoty VAT z tej faktury albo do 18,7% kwoty należności, gdy faktura jest bez VAT.",
    zrobic:
      "Program albo integracja muszą pokazywać stan każdej faktury: przyjęta z numerem KSeF, odrzucona albo czekająca na wysłanie po trybie offline. Faktura odrzucona po cichu wygląda w systemie tak samo jak wystawiona.",
  },
];

const ADRES = "https://fluxlab.pl/ksef-integracja#lista-2027";

type Odp = "tak" | "nie";

export default function ListaKsef2027() {
  const [odp, setOdp] = useState<Record<string, Odp>>({});
  const [skopiowano, setSkopiowano] = useState(false);

  function zaznacz(klucz: string, o: Odp) {
    if (Object.keys(odp).length === 0) {
      zglosZdarzenie("uruchomiono_liste_ksef_2027");
    }
    setOdp((p) => ({ ...p, [klucz]: o }));
    setSkopiowano(false);
  }

  const odpowiedziane = PUNKTY.filter((p) => odp[p.klucz]);
  const otwarte = PUNKTY.filter((p) => odp[p.klucz] === "nie");
  const domkniete = PUNKTY.filter((p) => odp[p.klucz] === "tak").length;
  const wszystkie = odpowiedziane.length === PUNKTY.length;

  async function kopiuj() {
    const tekst = [
      "KSeF od 1 stycznia 2027, co mamy jeszcze do domknięcia:",
      "",
      ...otwarte.map((p, i) => `${i + 1}. ${p.pytanie}\n   ${p.zrobic}`),
      "",
      `Pełna lista z wyjaśnieniami: ${ADRES}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(tekst);
      setSkopiowano(true);
    } catch {
      setSkopiowano(false);
    }
  }

  return (
    <div
      id="lista-2027"
      className="mt-8 scroll-mt-24 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6 md:p-8"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Lista na 1 stycznia 2027: co musicie mieć domknięte
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Tego dnia kończą się naraz wszystkie przepisy przejściowe KSeF i
        zaczynają się kary. Sześć pytań, przy każdym zaznaczcie, czy macie to
        załatwione. Na końcu dostaniecie listę tego, co zostało, gotową do
        wysłania księgowej albo osobie od systemu.
      </p>

      <ol className="mt-6 space-y-4">
        {PUNKTY.map((p, i) => {
          const o = odp[p.klucz];
          return (
            <li
              key={p.klucz}
              className={`rounded-xl border p-4 ${
                o === "tak"
                  ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
                  : o === "nie"
                    ? "border-amber-500/60 bg-amber-50 dark:bg-amber-950/30"
                    : "border-gray-200/80 dark:border-gray-800/80"
              }`}
            >
              <p className="font-semibold text-gray-900 dark:text-white">
                {i + 1}. {p.pytanie}
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Co się zmienia:
                </span>{" "}
                {p.zmiana}
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Co zrobić:
                </span>{" "}
                {p.zrobic}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  [
                    ["tak", "Mamy to"],
                    ["nie", "Jeszcze nie albo nie wiemy"],
                  ] as const
                ).map(([wartosc, etykieta]) => (
                  <button
                    key={wartosc}
                    type="button"
                    aria-pressed={o === wartosc}
                    onClick={() => zaznacz(p.klucz, wartosc)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      o === wartosc
                        ? "border-accent bg-accent-solid text-white"
                        : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {etykieta}
                  </button>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      {odpowiedziane.length > 0 && (
        <div
          aria-live="polite"
          className="mt-6 rounded-xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-950/50 p-5"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            Domknięte {domkniete} z {PUNKTY.length}
            {!wszystkie &&
              `, bez odpowiedzi ${PUNKTY.length - odpowiedziane.length}`}
          </p>
          {otwarte.length === 0 ? (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {wszystkie
                ? "Na koniec przepisów przejściowych jesteście przygotowani. Wróćcie do tej listy w grudniu, bo zmiany w programie albo w zespole potrafią rozszczelnić to, co dziś działa."
                : "Na razie nic nie zostało otwarte. Zaznaczcie pozostałe punkty, żeby mieć pełny obraz."}
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Zostało do zrobienia przed 1 stycznia 2027:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
                {otwarte.map((p) => (
                  <li key={p.klucz}>{p.pytanie}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={kopiuj}
                className="btn-primary mt-4 justify-center px-6 text-sm"
              >
                {skopiowano
                  ? "Skopiowane, wklejcie w maila"
                  : "Skopiuj listę do wysłania"}
              </button>
              {otwarte.some((p) =>
                ["przelew", "koszty", "odrzucenia"].includes(p.klucz),
              ) && (
                <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
                  Punkty o przelewach, fakturach kosztowych i stanie faktur to
                  miejsca, gdzie dane przechodzą między programami, i tam
                  integracja oszczędza najwięcej ręcznej pracy. Jeżeli chcecie,
                  napiszcie przez{" "}
                  <a
                    href="#zamow"
                    className="font-medium text-accent underline underline-offset-2"
                  >
                    formularz niżej
                  </a>
                  , w czym dziś wystawiacie faktury, a odpiszemy, co da się
                  spiąć.
                </p>
              )}
            </>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        Źródła: serwis Ministerstwa Finansów o{" "}
        <a
          href="https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/tryb-offline24/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          trybie offline24
        </a>{" "}
        i{" "}
        <a
          href="https://ksef.podatki.gov.pl/ponizej-10-000-zl/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          limicie 10 tys. zł
        </a>
        , ustawa o VAT w brzmieniu obowiązującym od 1 lutego 2026. To lista
        techniczna, nie porada podatkowa.
      </p>
    </div>
  );
}
