import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Fakturę dla osoby prywatnej nie trzeba wystawiać w KSeF. Wolno na papierze albo w PDF; wystawiona w KSeF trafia do klienta jako PDF lub wydruk z kodem QR.";

export const metadata: Metadata = {
  title: "Faktura dla osoby prywatnej a KSeF: czy trzeba | Fluxlab",
  description:
    "Fakturę dla osoby prywatnej nie trzeba wystawiać w KSeF. Wolno na papierze albo w PDF; wystawiona w KSeF trafia do klienta jako PDF lub wydruk z kodem QR.",
  openGraph: {
    title: "Faktura dla osoby prywatnej a KSeF: czy trzeba | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef",
  },
};

const faq = [
  {
    q: "Klient bez firmy prosi o fakturę. Musi przejść przez KSeF?",
    a: "Nie. Faktura dla konsumenta może być papierowa albo w PDF, a KSeF jest dla niej dobrowolny także po 1 lutego 2026.",
  },
  {
    q: "Klient prowadzi JDG, ale kupuje prywatnie?",
    a: "Według Ministerstwa Finansów to w istocie sprzedaż konsumencka, więc KSeF jest dobrowolny. Zakup na firmę, z jej NIP na fakturze, idzie już przez KSeF.",
  },
  {
    q: "Jak konsument dostanie fakturę wystawioną w KSeF?",
    a: "Nie zaloguje się do KSeF, więc przekazujecie ją w uzgodniony sposób, na przykład PDF mailem albo wydruk z kodem QR.",
  },
  {
    q: "A faktura do paragonu?",
    a: "Ta sama zasada: dla konsumenta możecie wystawić ją w KSeF albo poza nim.",
  },
];

export default function FakturaDlaOsobyPrywatnejKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura dla osoby prywatnej a KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Faktura dla osoby prywatnej a KSeF</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Nie musicie wystawiać jej w KSeF. Fakturę dla konsumenta wolno
              wystawić na papierze albo w PDF, tak jak przed 2026 rokiem.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Kto jest konsumentem</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Osoba bez działalności, a także przedsiębiorca kupujący na
                własny, prywatny użytek. Dla obu KSeF jest dobrowolny (art. 106ga
                ust. 2 ustawy o VAT i odpowiedzi MF do KSeF 2.0).
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy wystawicie ją w KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Konsument nie ma dostępu do KSeF, więc fakturę dostaje od Was jako
                PDF albo wydruk z kodem QR. Numer takiej faktury i datę jego
                nadania odczyta nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>
                , bez rejestracji.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-dla-osoby-prywatnej-ksef" />
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
              headline: "Faktura dla osoby prywatnej a KSeF",
              description: OPIS,
              datePublished: "2026-10-10",
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
