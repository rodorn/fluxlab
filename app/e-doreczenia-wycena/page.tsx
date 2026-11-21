import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FormularzKrotki from "@/components/FormularzKrotki";
import TrybReklamy from "@/components/TrybReklamy";

export const metadata: Metadata = {
  title: "Integracja z e-Doręczeniami dla firm | Fluxlab",
  description:
    "Pisma z e-Doręczeń i dowody doręczenia trafiają do Twojego systemu. Od 1 490 zł netto, wycena w 1 dzień roboczy, kod i dostępy zostają u Ciebie.",
  alternates: { canonical: "/e-doreczenia-wycena" },
  robots: { index: false, follow: false },
};

const KROKI = [
  {
    t: "Rozpoznanie, 0 zł, 1 dzień roboczy",
    d: "Opisujesz, gdzie dziś pracujesz z pismami. W 1 dzień roboczy odpisujemy, czy i czym da się spiąć Twój system oraz przy jakiej liczbie pism to się zwraca.",
  },
  {
    t: "Wdrożenie",
    d: "Pisma i dowody doręczenia trafiają do Twojego systemu, a Ty dostajesz powiadomienie o nowym piśmie. Termin dostajesz w wycenie.",
  },
  {
    t: "Odbiór i opieka",
    d: "Sprawdzasz na własnych pismach. Pierwszy miesiąc opieki jest w cenie.",
  },
];

const CENNIK = [
  { n: "Rozpoznanie", o: "Czy i czym da się spiąć Twój system", c: "0 zł" },
  {
    n: "Odbiór pism",
    o: "Pisma i dowody doręczenia w Twoim systemie, powiadomienie, miesiąc opieki",
    c: "1 490 zł",
  },
  {
    n: "KSeF + e-Doręczenia, odbiór",
    o: "1 900 + 1 490 zł minus 15%, dla spółek z KRS",
    c: "2 800 zł",
  },
  {
    n: "Instalacja w infrastrukturze firmy",
    o: "Serwer po Twojej stronie, SSO, przegląd bezpieczeństwa",
    c: "Wycena po diagnozie",
  },
];

const FAQ = [
  {
    q: "Czy mój system to obsłuży?",
    a: "Jeśli ma API, eksport albo bazę, do której możemy się podłączyć, to zwykle tak. Sprawdzamy to bezpłatnie przed wyceną.",
  },
  {
    q: "Czemu dowody doręczenia są ważne?",
    a: "Bez dowodu doręczenia samo pismo nie wykaże, kiedy i czy zostało doręczone. Pobieramy pisma i dowody jako osobne zasoby.",
  },
  {
    q: "Jak rozliczamy się za wdrożenie?",
    a: "Fakturą VAT albo przez Useme, do wyboru. Formę umowy ustalamy przy wycenie.",
  },
  {
    q: "Czy to dla mnie, gdy dostaję kilka pism w roku?",
    a: "Nie. Wystarczy ręczne sprawdzanie skrzynki e-Doręczeń. Integracja zaczyna się opłacać, gdy pism jest dużo albo wiele osób musi o nich wiedzieć.",
  },
];

const karta =
  "rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800";

export default function EDoreczeniaWycena() {
  return (
    <>
      <TrybReklamy />
      <Header />
      <main>
        <section
          id="wycena"
          className="container-wide scroll-mt-16 pt-4 pb-10 text-center"
        >
          <h1 className="h1-strony mx-auto max-w-3xl">
            Pisma z e-Doręczeń prosto do Twojego systemu
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Od 1 490 zł netto, razem z dowodami doręczenia. Wycena w 1 dzień
            roboczy, kod i dostępy zostają u Ciebie.
          </p>
          <div className="mx-auto mt-4 flex max-w-xl flex-col gap-2.5 sm:flex-row sm:justify-center">
            <a
              href="tel:+48665466565"
              data-cta="diagnoza_15min"
              className="btn-primary btn-lg w-full sm:w-auto"
            >
              Diagnoza 15 min, 0 zł: zadzwoń
            </a>
            <a
              href="#wycena"
              data-cta="wycena_hero"
              className="btn-secondary btn-lg w-full sm:w-auto"
            >
              Odbierz wycenę
            </a>
          </div>
          <FormularzKrotki
            nip
            samNumer
            zawsze
            formId="edoreczenia_wycena"
            naglowek="Wycena w 1 dzień roboczy, 0 zł"
            opisPlaceholder="Twój system do pism *"
            opisEtykieta="Nazwa systemu, w którym pracujesz z pismami (wymagane)"
            przycisk="Odbierz wycenę w 1 dzień roboczy"
          />
          <div className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pawel.webp"
              alt="Paweł Iwanek"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <p className="text-left">
              Oddzwania Paweł Iwanek.{" "}
              <a
                href="https://wa.me/48665466565?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20wycen%C4%99%20integracji%20z%20e-Dor%C4%99czeniami."
                target="_blank"
                rel="noopener"
                data-cta="whatsapp"
                className="font-semibold text-accent underline"
              >
                Napisz na WhatsApp
              </a>
            </p>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Trzy kroki</h2>
            <ol className="mt-4 grid gap-4">
              {KROKI.map((k, i) => (
                <li key={k.t} className={karta}>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {i + 1}. {k.t}
                  </p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{k.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Ceny netto</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              {CENNIK.map((w) => (
                <div
                  key={w.n}
                  className="flex items-start justify-between gap-3 border-b border-gray-200 bg-white p-3.5 last:border-b-0 dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    <span className="font-semibold">{w.n}</span>
                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                      {w.o}
                    </span>
                  </p>
                  <p className="shrink-0 text-right font-semibold text-gray-900 dark:text-white">
                    {w.c}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Rozliczamy fakturą VAT albo przez Useme. Kod i dostępy zostają u
              Ciebie.
            </p>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Sprawdzisz kod przed rozmową</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              Klient e-Doręczeń jest publiczny na
              github.com/rodorn/edoreczenia-klient, na licencji MIT. Ocenisz go
              sam albo da go swojemu programiście.
            </p>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Pytania</h2>
            <div className="mt-4 grid gap-4">
              {FAQ.map((f) => (
                <div key={f.q}>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </h3>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className={`mx-auto max-w-3xl ${karta}`}>
            <p className="font-semibold text-gray-900 dark:text-white">
              Dla kogo to nie jest
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              Dla firm, które dostają kilka pism w roku. Wystarczy im ręczne
              sprawdzanie skrzynki e-Doręczeń.
            </p>
          </div>
        </section>
      </main>
      <footer className="container-wide py-8 text-center text-sm text-gray-700 dark:text-gray-300">
        <p>
          FluxLab ·{" "}
          <a
            href="tel:+48665466565"
            className="font-semibold text-accent underline"
          >
            665 466 565
          </a>{" "}
          ·{" "}
          <Link href="/polityka-prywatnosci" className="underline">
            Polityka prywatności
          </Link>
        </p>
      </footer>
    </>
  );
}
