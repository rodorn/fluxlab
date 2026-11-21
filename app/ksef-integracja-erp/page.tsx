import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import FormularzKrotki from "@/components/FormularzKrotki";
import TrybReklamy from "@/components/TrybReklamy";

export const metadata: Metadata = {
  title: "Integracja systemu z KSeF dla firm z własnym ERP | Fluxlab",
  description:
    "Podłączamy Twój system do faktur, sklep albo ERP do KSeF. Od 1 900 zł netto, wycena w 1 dzień roboczy, kod i dostępy zostają u Ciebie.",
  alternates: { canonical: "/ksef-integracja-erp" },
  robots: { index: false, follow: false },
};

const SYSTEMY = [
  "Własny ERP albo system magazynowy",
  "Sklep: WooCommerce, PrestaShop, Shopify",
  "CRM, z którego wystawiasz faktury",
  "Arkusz albo program bez obsługi KSeF",
];

const KROKI = [
  {
    t: "Rozpoznanie, 0 zł",
    d: "Opisujesz, w czym fakturujesz. W 1 dzień roboczy odpisujemy, czy system da się spiąć, czym i za ile. Gdy wystarczy gotowy program, mówimy to wprost.",
  },
  {
    t: "Wdrożenie",
    d: "Spinamy system z KSeF: wysyłka w schemacie FA(3) z walidacją, kolejka ponowień, widok stanu każdej faktury. Typowo zajmuje to kilka tygodni, dokładny termin dostajesz w wycenie.",
  },
  {
    t: "Odbiór i opieka",
    d: "Sprawdzasz na własnych fakturach. Numer KSeF i UPO zapisują się przy dokumencie. Przy wystawianiu i odbiorze pierwszy miesiąc opieki jest w cenie.",
  },
];

const FAQ = [
  {
    q: "Czy mój system to obsłuży?",
    a: "Jeśli ma API, eksport albo bazę, do której możemy się podłączyć, to prawie zawsze tak. Sprawdzamy to bezpłatnie przed wyceną. Dokumentacja naszego API jest otwarta bez logowania (ksef.fluxlab.pl/docs), więc Twój programista przeczyta ją przed rozmową.",
  },
  {
    q: "Ile to trwa?",
    a: "Typowe wdrożenie to kilka tygodni od uzgodnienia zakresu. Grudzień 2026 będzie najgorszym momentem na start, bo kończą się przepisy przejściowe 1 stycznia 2027.",
  },
  {
    q: "Mój program księgowy ma już KSeF. Czy muszę coś robić?",
    a: "Najpewniej nie i tak Ci powiemy. Integracja ma sens, gdy faktury powstają poza programem księgowym, na przykład w sklepie, CRM albo własnym systemie, albo gdy faktury kosztowe pobierasz ręcznie.",
  },
  {
    q: "Czy to dla mnie, gdy wystawiam kilka faktur miesięcznie?",
    a: "Nie. Wystarczy darmowa Aplikacja Podatnika KSeF od Ministerstwa Finansów. Integracja zaczyna się opłacać, gdy ktoś dziś przenosi faktury ręcznie.",
  },
];

const wiersz =
  "flex gap-2 text-base text-gray-800 dark:text-gray-200 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent-solid";

export default function KsefIntegracjaErp() {
  return (
    <>
      <TrybReklamy />
      <Header />
      <main>
        <section className="container-wide pt-4 pb-10 text-center">
          <h1 className="h1-strony mx-auto max-w-3xl">
            Podłączymy Twój system do KSeF
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Od 1 900 zł netto. Wycena w 1 dzień roboczy, kod i dostępy zostają u
            Ciebie.
          </p>
          <FormularzKrotki
            zawsze
            formId="ksef_erp"
            naglowek="Wycena w 1 dzień roboczy, 0 zł"
            opisPlaceholder="W czym wystawiasz faktury? np. własny ERP *"
            opisEtykieta="Nazwa systemu, w którym wystawiasz faktury (wymagane)"
            przycisk="Odbierz wycenę w 1 dzień roboczy"
          />
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Jakie systemy podłączamy</h2>
            <ul className="mt-4 grid gap-2.5">
              {SYSTEMY.map((x) => (
                <li key={x} className={wiersz}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Trzy kroki</h2>
            <ol className="mt-4 grid gap-4">
              {KROKI.map((k, i) => (
                <li
                  key={k.t}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
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
            <h2 className="h2-sekcji">Co dostajesz</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Odbiór faktur, 1 900 zł netto
                </p>
                <ul className="mt-3 grid gap-2">
                  <li className={wiersz}>
                    Faktury zakupowe pobierane z KSeF automatycznie
                  </li>
                  <li className={wiersz}>
                    Trafiają do księgowości, obiegu dokumentów albo arkusza
                  </li>
                  <li className={wiersz}>
                    Numer KSeF i UPO przy każdym dokumencie
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-accent/60 bg-white p-4 dark:bg-gray-800">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Wystawianie i odbiór, 3 900 zł netto
                </p>
                <ul className="mt-3 grid gap-2">
                  <li className={wiersz}>Wszystko z odbioru faktur</li>
                  <li className={wiersz}>
                    Wysyłka w schemacie FA(3) z walidacją przed wysłaniem
                  </li>
                  <li className={wiersz}>
                    Kolejka ponowień i widok stanu każdej faktury
                  </li>
                  <li className={wiersz}>Pierwszy miesiąc opieki w cenie</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Rozpoznanie jest bezpłatne. Rozliczamy fakturą VAT, formę umowy
              ustalamy przy wycenie. Kod i dostępy zostają u Ciebie.
            </p>
          </div>
        </section>

        <section className="container-wide py-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Sprawdzone na własnej firmie</h2>
            <p className="mt-3 text-gray-700 dark:text-gray-300">
              2 listopada 2026 FluxLab wystawił w KSeF 3 faktury z tego samego
              mechanizmu: wszystkie przyjęte, z numerem KSeF i UPO przy
              dokumencie. Klient KSeF API jest publiczny na
              github.com/rodorn/fluxlab-ksef-integracja, więc ocenisz kod przed
              rozmową z nami.
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
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="font-semibold text-gray-900 dark:text-white">
              Dla kogo to nie jest
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              Dla firm wystawiających kilka faktur w miesiącu. Użyj darmowej
              Aplikacji Podatnika KSeF od Ministerstwa Finansów.
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
