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
    a: "Liczymy sumę kontrolną, więc literówka z faktury wychodzi od razu.",
  },
  {
    q: "Czy firma jest w wykazie i czy jest czynnym podatnikiem",
    a: "Brak wpisu albo status zwolniony zmienia Twoje prawo do odliczenia VAT z faktury.",
  },
  {
    q: "Ile rachunków zgłosiła i od kiedy działa",
    a: "Zero rachunków albo rejestracja sprzed kilku tygodni przy dużej przedpłacie to sygnał ostrzegawczy.",
  },
];

const faq = [
  {
    q: "Czy sprawdzenie jest naprawdę darmowe?",
    a: "Tak. Bez rejestracji i bez limitu prób. Dane pochodzą na bieżąco z publicznego wykazu Ministerstwa Finansów.",
  },
  {
    q: "Czy sprawdzicie, czy konto do przelewu należy do tej firmy?",
    a: "Tak, w płatnym raporcie. Porównujemy Twój numer z listą rachunków zgłoszonych przez firmę.",
  },
  {
    q: "Od jakiej kwoty trzeba sprawdzać rachunek w wykazie?",
    a: "Od 15 000 zł brutto jednorazowej transakcji, niezależnie od liczby przelewów.",
  },
  {
    q: "Zapłaciliśmy na rachunek spoza wykazu, co teraz?",
    a: "Złóż zawiadomienie ZAW-NR do urzędu skarbowego w ciągu 7 dni od zlecenia przelewu. To wyłącza sankcje, po terminie już się nie da.",
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
              Wpisz numer i sprawdź status VAT, datę rejestracji oraz liczbę
              zgłoszonych rachunków. Bez rejestracji.
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
              Nie pokaże likwidacji, zaległości ani tego, czy numer konta z maila
              należy do firmy. To sprawdzamy w pełnym raporcie.
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
