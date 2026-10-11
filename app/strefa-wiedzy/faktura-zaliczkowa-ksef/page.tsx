import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "W KSeF zaliczka to faktura zaliczkowa, a rozliczenie to faktura rozliczeniowa z numerami KSeF zaliczek. Gdy zaliczki pokryły całość, ostatnia zamyka sprzedaż.";

export const metadata: Metadata = {
  title: "Faktura zaliczkowa w KSeF: zaliczka i rozliczenie | Fluxlab",
  description:
    "W KSeF zaliczka to faktura zaliczkowa, a rozliczenie to faktura rozliczeniowa z numerami KSeF zaliczek. Gdy zaliczki pokryły całość, ostatnia zamyka sprzedaż.",
  openGraph: {
    title: "Faktura zaliczkowa w KSeF: zaliczka i rozliczenie | Fluxlab",
    description: OPIS,
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, KSeF i automatyzacja dla firm",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/faktura-zaliczkowa-ksef",
  },
};

const faq = [
  {
    q: "Do kiedy wystawić fakturę zaliczkową?",
    a: "Do 15. dnia miesiąca po miesiącu, w którym przyszła zaliczka. Najwcześniej 30 dni przed jej otrzymaniem.",
  },
  {
    q: "Zaliczka i dostawa w tym samym miesiącu?",
    a: "Wtedy faktura zaliczkowa nie jest obowiązkowa. Wystarczy jedna zwykła faktura na całą sprzedaż.",
  },
  {
    q: "Zaliczkowa poszła przed obowiązkiem KSeF, rozliczenie już w KSeF?",
    a: "W fakturze rozliczeniowej podajecie wtedy zwykły numer tamtej faktury zamiast numeru KSeF, bo go nie dostała.",
  },
  {
    q: "Ile zaliczek zmieści jedna faktura rozliczeniowa?",
    a: "Struktura FA(3) przyjmuje do 100 faktur zaliczkowych w jednej fakturze rozliczeniowej.",
  },
];

export default function FakturaZaliczkowaKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-zaliczkowa-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura zaliczkowa w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Faktura zaliczkowa w KSeF</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Zaliczka idzie do KSeF jak każda faktura, z rodzajem „zaliczkowa”.
              Kłopot zaczyna się przy rozliczeniu, bo trzeba w nim wskazać
              numery KSeF wcześniejszych zaliczek.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Dwa sposoby rozliczenia</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  Zostaje dopłata: faktura rozliczeniowa na pozostałą kwotę, z
                  listą numerów KSeF wszystkich faktur zaliczkowych.
                </li>
                <li>
                  Zaliczki pokryły całość: ostatnia faktura zaliczkowa wskazuje
                  numery KSeF poprzednich i faktury rozliczeniowej już nie ma.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Numery zaliczek</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Numer KSeF ma ponad 30 znaków i łatwo w nim o literówkę. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                wyłapie ją, zanim faktura rozliczeniowa pójdzie do systemu.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Pytania</h2>
              <div className="space-y-4">
                {faq.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <summary className="cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {f.q}
                    </summary>
                    <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-zaliczkowa-ksef" />
          </div>
        </div>
        <CTA naglowek="Chcecie, żeby faktury z KSeF same trafiały do księgowości?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Faktura zaliczkowa w KSeF",
              description: OPIS,
              datePublished: "2026-10-11",
              author: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
              publisher: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
