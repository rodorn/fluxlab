import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Samofakturowanie w KSeF wymaga umowy, uprawnienia nadanego nabywcy przez sprzedawcę w KSeF i oznaczenia P_17 w pliku. Bez uprawnienia KSeF odrzuci fakturę.";

export const metadata: Metadata = {
  title: "Samofakturowanie w KSeF: uprawnienie i oznaczenie | Fluxlab",
  description:
    "Samofakturowanie w KSeF wymaga umowy, uprawnienia nadanego nabywcy przez sprzedawcę w KSeF i oznaczenia P_17 w pliku. Bez uprawnienia KSeF odrzuci fakturę.",
  openGraph: {
    title: "Samofakturowanie w KSeF: uprawnienie i oznaczenie | Fluxlab",
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
    canonical: "/strefa-wiedzy/samofakturowanie-ksef",
  },
};

const faq = [
  {
    q: "Kto nadaje uprawnienie?",
    a: "Sprzedawca, w Aplikacji Podatnika KSeF albo przez API, na NIP nabywcy. Nabywca sam go sobie nie nada.",
  },
  {
    q: "KSeF odrzuca fakturę z błędem uprawnień?",
    a: "Sprawdź, czy uprawnienie nadano na właściwy NIP i czy sprzedawca go nie odebrał. Faktura bez numeru KSeF nie jest wystawiona.",
  },
  {
    q: "Kto widzi taką fakturę?",
    a: "Obie strony. Sprzedawca i nabywca mają ją w KSeF z tym samym numerem.",
  },
];

export default function SamofakturowanieKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/samofakturowanie-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Samofakturowanie w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Samofakturowanie w KSeF</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Nabywca może wystawiać faktury w imieniu sprzedawcy także w KSeF.
              Poza umową potrzebne jest uprawnienie w samym systemie.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Co musi być</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  <Link
                    href="/strefa-wiedzy/gutschrift-ksef"
                    className="text-accent hover:underline"
                  >
                    Umowa o samofakturowanie
                  </Link>{" "}
                  i procedura akceptacji faktur przez sprzedawcę, jak przed KSeF.
                </li>
                <li>
                  Uprawnienie do samofakturowania nadane nabywcy przez
                  sprzedawcę w KSeF.
                </li>
                <li>W pliku FA(3) oznaczenie samofakturowania, pole P_17 = 1.</li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Numer bez literówki</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Numer nadany samofakturze trafia do ewidencji obu stron. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                wyłapie literówkę, zanim JPK_VAT pójdzie do urzędu.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/samofakturowanie-ksef" />
          </div>
        </div>
        <CTA naglowek="Chcesz, żeby faktury z KSeF same trafiały do księgowości?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Samofakturowanie w KSeF",
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
