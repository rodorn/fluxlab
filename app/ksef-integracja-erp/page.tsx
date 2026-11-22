import type { Metadata } from "next";
import Link from "next/link";
import HeaderReklamy from "@/components/HeaderReklamy";
import FormularzKrotki from "@/components/FormularzKrotki";
import TrybReklamy from "@/components/TrybReklamy";
import H1Wariant from "@/components/H1Wariant";
import AnkietaWyjscia from "@/components/AnkietaWyjscia";

export const metadata: Metadata = {
  title: "Integracja systemu z KSeF dla firm z własnym ERP | Fluxlab",
  description:
    "Podłączamy Twój system do faktur, sklep albo ERP do KSeF w 5 dni roboczych. Od 1 900 zł netto, wycena w 1 dzień roboczy, kod i dostępy zostają u Ciebie.",
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
    t: "Rozpoznanie, 0 zł, 1 dzień roboczy",
    d: "Opisujesz, w czym fakturujesz. W 1 dzień roboczy odpisujemy, czy system da się spiąć, czym i za ile. Gdy wystarczy gotowy program, mówimy to wprost.",
  },
  {
    t: "Wdrożenie, do 5 dni roboczych",
    d: "Spinamy system z KSeF: wysyłka w schemacie FA(3) z walidacją, kolejka ponowień, widok stanu każdej faktury. Termin: 5 dni roboczych od chwili, gdy dostaniemy dostęp do API systemu i dane testowe.",
  },
  {
    t: "Odbiór, w 5. dniu",
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
    a: "5 dni roboczych, liczone od chwili, gdy dostaniemy dostęp do API Twojego systemu i dane testowe. Prosimy, żebyś dostarczył je w 1 dzień roboczy od wyceny. Grudzień 2026 będzie najgorszym momentem na start, bo kończą się przepisy przejściowe 1 stycznia 2027.",
  },
  {
    q: "Mój program księgowy ma już KSeF. Czy muszę coś robić?",
    a: "Najpewniej nie i tak Ci powiemy. Integracja ma sens, gdy faktury powstają poza programem księgowym, na przykład w sklepie, CRM albo własnym systemie, albo gdy faktury kosztowe pobierasz ręcznie.",
  },
  {
    q: "Jak rozliczamy się za wdrożenie?",
    a: "Fakturą VAT albo przez Useme, do wyboru. Formę umowy ustalamy przy wycenie, więc dział zakupów nie musi pytać o szczegóły.",
  },
  {
    q: "Czy to dla mnie, gdy wystawiam kilka faktur miesięcznie?",
    a: "Nie. Przy kilku fakturach w miesiącu wystarczy program do faktur, który ma już wysyłkę do KSeF. Integracja zaczyna się opłacać, gdy ktoś dziś przenosi faktury ręcznie.",
  },
];

const CENNIK = [
  { n: "Rozpoznanie", o: "Czy i czym da się spiąć Twój system", c: "0 zł" },
  {
    n: "Odbiór faktur",
    o: "Własny ERP, sklep, CRM albo arkusz: faktury zakupowe z KSeF",
    c: "1 900 zł",
  },
  {
    n: "Wystawianie i odbiór",
    o: "Wysyłka FA(3), kolejka ponowień, widok stanu, miesiąc opieki",
    c: "3 900 zł",
  },
  {
    n: "KSeF + e-Doręczenia, odbiór",
    o: "1 900 + 1 490 zł minus 15%, dla spółek z KRS",
    c: "2 800 zł",
  },
  {
    n: "KSeF + e-Doręczenia, wystawianie i odbiór",
    o: "3 900 + 1 490 zł minus 15%, dla spółek z KRS",
    c: "4 500 zł",
  },
  {
    n: "Biuro rachunkowe, kilku klientów",
    o: "Pierwszy klient 1 900 zł, każdy kolejny minus 30%",
    c: "1 900 zł + 1 330 zł",
  },
];

const wiersz =
  "flex gap-2 text-base text-gray-800 dark:text-gray-200 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent-solid";

export default function KsefIntegracjaErp() {
  return (
    <>
      <TrybReklamy />
      <HeaderReklamy />
      <main>
        <section id="wycena" className="container-wide scroll-mt-16 pt-4 pb-10 text-center">
          <H1Wariant
            className="h1-strony mx-auto max-w-3xl"
            warianty={[
              "Integracja z KSeF w 5 dni roboczych",
              "Integracja KSeF od 1 900 zł netto, w 5 dni roboczych",
              "Podłączymy Twój system do KSeF w 5 dni roboczych",
            ]}
          />
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Integracja KSeF od 1 900 zł netto. Termin liczymy od dostępu do API systemu i danych
            testowych, które dostajemy w 1 dzień roboczy.
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
          <span id="kontakt" className="block scroll-mt-16" />
          <FormularzKrotki
            nip
            samNumer
            zawsze
            formId="ksef_erp"
            naglowek="Wycena w 1 dzień roboczy, 0 zł"
            opisPlaceholder="Twój system do faktur *"
            opisEtykieta="Nazwa systemu, w którym wystawiasz faktury (wymagane)"
            przycisk="Odbierz wycenę w 1 dzień roboczy"
          />
          <div className="mx-auto mt-3 flex max-w-xl items-center justify-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pawel-96.webp"
              loading="lazy"
              alt="Paweł Iwanek"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <p className="text-left">
              Oddzwania Paweł Iwanek.{" "}
              <a
                href="https://wa.me/48665466565?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20wycen%C4%99%20integracji%20systemu%20z%20KSeF."
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

        <section id="systemy" className="container-wide scroll-mt-16 py-3">
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

        <section id="kroki" className="container-wide scroll-mt-16 py-3">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Trzy kroki</h2>
            <ol className="mt-3 grid gap-2">
              {KROKI.map((k, i) => (
                <li key={k.t}>
                  <details className="group rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-gray-900 dark:text-white">
                      <span>{i + 1}. {k.t}</span>
                      <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">{k.d}</p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="container-wide py-3">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Co dostajesz</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 sm:items-start">
              <details className="group rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-gray-900 dark:text-white">
                  <span>Odbiór faktur, 1 900 zł netto</span>
                  <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
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
              </details>
              <details className="group rounded-2xl border border-accent/60 bg-white p-4 dark:bg-gray-800">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-gray-900 dark:text-white">
                  <span>Wystawianie i odbiór, 3 900 zł netto</span>
                  <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
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
              </details>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Rozpoznanie jest bezpłatne. Rozliczamy fakturą VAT, formę umowy
              ustalamy przy wycenie. Kod i dostępy zostają u Ciebie.
            </p>
          </div>
        </section>

        <section id="ceny" className="container-wide scroll-mt-16 py-3">
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
                  <p className="shrink-0 font-semibold text-gray-900 dark:text-white">
                    {w.c}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Rozliczamy fakturą VAT albo przez Useme. Pakiet z e-Doręczeniami to
              suma cen z cennika minus 15%, dla spółek z KRS.
            </p>
            <p className="mt-4 rounded-2xl border border-accent/60 bg-white p-4 font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
              Jeśli mimo dostarczonych dostępów integracja nie ruszy, zwracamy
              pieniądze za wdrożenie.
            </p>
            <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
              Od 1 stycznia 2027 KSeF obejmuje też firmy, które do tej pory
              miały do 10 tys. zł sprzedaży miesięcznie. Kończą się przepisy
              przejściowe.
            </p>
          </div>
        </section>

        <section className="container-wide py-3">
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

        <section className="container-wide py-3">
          <div className="mx-auto max-w-3xl">
            <h2 className="h2-sekcji">Pytania</h2>
            <div className="mt-3 grid gap-2">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-gray-900 dark:text-white">
                    <h3>{f.q}</h3>
                    <span aria-hidden className="text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-3">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="font-semibold text-gray-900 dark:text-white">
              Dla kogo to nie jest
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-300">
              Dla firm wystawiających kilka faktur w miesiącu z programu do
              faktur, który ma już wysyłkę do KSeF.
            </p>
          </div>
        </section>
        <AnkietaWyjscia />
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
