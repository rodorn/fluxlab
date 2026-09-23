import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import NipCheck from "@/components/NipCheck";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Sprawdzenie NIP za darmo, wykaz VAT i status firmy | Fluxlab",
  description:
    "Wpisz NIP i sprawdź za darmo, czy firma jest w wykazie Ministerstwa Finansów, czy jest czynnym podatnikiem VAT i ile ma zgłoszonych rachunków.",
  alternates: { canonical: "/sprawdzenie-nip" },
  openGraph: {
    title: "Sprawdzenie NIP za darmo, wykaz VAT i status firmy | Fluxlab",
    description:
      "Darmowe sprawdzenie NIP w wykazie Ministerstwa Finansów. Status VAT, data rejestracji i liczba zgłoszonych rachunków.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, sprawdzenie NIP",
      },
    ],
  },
};

const czytelnik = [
  {
    q: "Czy numer jest poprawny",
    a: "Zanim cokolwiek odpytam, liczymy sumę kontrolną numeru. Literówka w NIP z faktury wychodzi od razu, bez czekania na odpowiedź rejestru.",
  },
  {
    q: "Czy podmiot figuruje w wykazie",
    a: "Odpytujemy wykaz podatników VAT prowadzony przez Ministerstwo Finansów. Brak wpisu przy firmie, która wystawia fakturę z VAT, jest sygnałem, którego nie wolno zignorować.",
  },
  {
    q: "Czy jest czynnym podatnikiem",
    a: "Status zwolniony albo wykreślony zmienia Twoje prawo do odliczenia podatku z takiej faktury.",
  },
  {
    q: "Ile rachunków firma zgłosiła",
    a: "Zero zgłoszonych rachunków oznacza, że każdy numer konta, jaki dostaniesz od tej firmy, jest nie do zweryfikowania w wykazie.",
  },
  {
    q: "Od kiedy działa",
    a: "Data rejestracji sprzed kilku tygodni przy dużym zamówieniu z przedpłatą to typowy układ przy firmach zakładanych na jedną transakcję.",
  },
];

const faq = [
  {
    q: "Czy sprawdzenie jest naprawdę darmowe?",
    a: "Tak. Nie ma rejestracji, nie ma pola na dane kontaktowe wymaganego do sprawdzenia i nie ma limitu prób. Dane pochodzą z publicznego wykazu Ministerstwa Finansów.",
  },
  {
    q: "Skąd pochodzą dane?",
    a: "Z wykazu podatników VAT Ministerstwa Finansów, odpytywanego na bieżąco w momencie sprawdzenia. Nic nie jest pobierane z kopii ani z zapasowej bazy.",
  },
  {
    q: "Czy sprawdzicie, czy konto do przelewu należy do tej firmy?",
    a: "To jest osobny test i najważniejszy z całej weryfikacji, bo podmieniony numer rachunku w mailu jest najczęstszym sposobem przejęcia płatności. Robimy go w płatnym raporcie, bo wymaga porównania Twojego numeru z listą rachunków zgłoszonych przez podmiot.",
  },
  {
    q: "Czy to zastępuje sprawdzenie w KRS?",
    a: "Nie. Darmowe sprawdzenie pokazuje status podatkowy. Informacje o likwidacji, zaległościach i reprezentacji są w KRS i wchodzą do pełnego raportu.",
  },
  {
    q: "Czy zapisujecie sprawdzane numery?",
    a: "Sprawdzenie nie wymaga podania żadnych Twoich danych. Adres mailowy zostawiasz tylko wtedy, gdy sam poprosisz o szerszy raport.",
  },
];

export default function SprawdzenieNipPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: "Sprawdzenie NIP" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Darmowe narzędzie
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Sprawdzenie NIP w wykazie Ministerstwa Finansów
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Wpisz numer, a odpytam wykaz podatników VAT i pokażemy, czy firma
              tam jest, czy jest czynnym podatnikiem, od kiedy działa i ile
              rachunków bankowych zgłosiła. Bez rejestracji i bez limitu prób.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/sprawdzenie-nip" />
            <NipCheck />
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Co dokładnie sprawdzamy
            </h2>
            <dl className="mt-6 space-y-5">
              {czytelnik.map((c) => (
                <div key={c.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {c.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {c.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-14 max-w-3xl rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Czego darmowe sprawdzenie nie powie
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Status w wykazie to dopiero pierwsza warstwa. Firma może być
              czynnym podatnikiem i jednocześnie być w likwidacji, mieć
              zaległości ujawnione w rejestrze albo podać Ci numer konta, który
              do niej nie należy. Najważniejszy test przed przelewem to
              porównanie numeru rachunku z listą rachunków zgłoszonych przez ten
              podmiot, bo podmieniony numer w mailu jest najczęstszym sposobem
              przejęcia płatności.
            </p>
            <p className="mt-4">
              <Link
                href="/sprawdz-kontrahenta"
                className="font-semibold text-accent hover:underline"
              >
                Zobacz pełny raport o kontrahencie, od 9 zł
              </Link>
            </p>
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Częste pytania
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    {f.q}
                  </dt>
                  <dd className="mt-1 text-gray-600 dark:text-gray-300">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sprawdzenie NIP w wykazie VAT",
            url: "https://fluxlab.pl/sprawdzenie-nip",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Dowolna przeglądarka",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            provider: { "@type": "Organization", name: "Fluxlab" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
