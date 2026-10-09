import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import { kotwica } from "@/lib/kotwica";
import NumerKsefCheck from "@/components/NumerKsefCheck";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Sprawdź numer KSeF faktury: NIP, data i suma | Fluxlab",
  description:
    "Sprawdźcie fakturę po numerze KSeF w 10 s, bez logowania: NIP sprzedawcy, data przyjęcia i suma kontrolna. Liczymy w Waszej przeglądarce.",
  alternates: { canonical: "/numer-ksef" },
  openGraph: {
    title: "Sprawdź numer KSeF faktury: NIP, data i suma | Fluxlab",
    description:
      "Darmowe sprawdzenie numeru KSeF przed przelewem. Suma kontrolna, NIP sprzedawcy i data przyjęcia faktury, liczone w przeglądarce.",
    locale: "pl_PL",
    type: "website",
  },
};

const czesci = [
  {
    q: "10 cyfr: NIP sprzedawcy",
    a: "Sprawdzamy jego sumę kontrolną jak przy każdym NIP-ie.",
  },
  {
    q: "8 cyfr: data przyjęcia w KSeF",
    a: "Układ RRRRMMDD. Od tego dnia faktura kosztowa jest uznana za otrzymaną.",
  },
  {
    q: "12 znaków: część techniczna",
    a: "Cyfry i litery A do F nadawane przez system.",
  },
  {
    q: "2 znaki: suma kontrolna",
    a: "CRC-8 z pierwszych 32 znaków. Literówka prawie zawsze zmienia sumę, więc wychodzi od razu.",
  },
];

const faq = [
  {
    q: "Czy numer KSeF trzeba podawać w przelewie?",
    a: "Od 1 stycznia 2027 tak, przy zapłacie za fakturę z KSeF między czynnymi podatnikami VAT, także w przelewie MPP. Nie dotyczy karty, BLIK-a ani gotówki.",
  },
  {
    q: "Czy poprawny numer oznacza, że faktura istnieje?",
    a: "Nie. Poprawna suma mówi tylko, że nie ma literówki. Istnienie faktury potwierdza KSeF.",
  },
  {
    q: "Numer jest z faktury sprzed 2026 roku i wychodzi błąd sumy kontrolnej, to na pewno literówka?",
    a: "Niekoniecznie. Numery sprzed 1 lutego 2026 czasem liczą sumę innym wzorem. Literówki w NIP-ie i dacie i tak wychwycimy.",
  },
  {
    q: "Czy wysyłacie gdzieś wklejone numery?",
    a: "Nie. Sprawdzenie liczy się w Waszej przeglądarce, bez rejestracji i limitu prób.",
  },
];

export default function NumerKsefPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          href="/numer-ksef"
          items={[
            { label: "Sprawdzenie numeru KSeF" },
          ]}
        />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="section-label mb-3">Narzędzie</p>
            <h1 className="h1-strony">
              Sprawdzenie numeru KSeF przed przelewem
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Od 1 stycznia 2027 numer KSeF trafia do tytułu przelewu. Wklejcie
              numery, a sprawdzimy, czy nie ma w nich literówki.
            </p>
          </div>

          <div className="mt-10">
            <NazwaNarzedzia href="/numer-ksef" />
            <NumerKsefCheck />
          </div>

          <div className="mt-16 max-w-3xl">
            <h2 className="h2-sekcji">
              Z czego składa się numer KSeF
            </h2>
            <dl className="mt-6 space-y-5">
              {czesci.map((c) => (
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
            <h2 className="h2-sekcji">
              Co jeszcze trzeba domknąć przed 1 stycznia 2027
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Numer w przelewie to jeden z siedmiu punktów, które kończą się
              razem z przepisami przejściowymi KSeF.
            </p>
            <p className="mt-4">
              <Link
                href="/ksef-2027"
                className="font-semibold text-accent hover:underline"
              >
                Przejdźcie listę KSeF na 1 stycznia 2027
              </Link>
            </p>
          </div>

          <div className="mt-14 max-w-3xl">
            <h2 className="h2-sekcji">
              Częste pytania
            </h2>
            <dl className="mt-6 space-y-5">
              {faq.map((f) => (
                <div key={f.q} id={kotwica(f.q)} className="scroll-mt-20">
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
      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Sprawdzenie numeru KSeF",
            url: "https://fluxlab.pl/numer-ksef",
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
              url: `https://fluxlab.pl/numer-ksef#${kotwica(f.q)}`,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
