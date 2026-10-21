import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Proformy nie wystawiasz w KSeF, bo w rozumieniu ustawy o VAT nie jest fakturą. Wysyłasz ją PDF-em jak dotąd, a fakturę wystawiasz w KSeF po zapłacie.";

export const metadata: Metadata = {
  title: "Proforma a KSeF: czy wystawiać ją w KSeF | Fluxlab",
  description:
    "Proformy nie wystawiasz w KSeF, bo w rozumieniu ustawy o VAT nie jest fakturą. Wysyłasz ją PDF-em jak dotąd, a fakturę wystawiasz w KSeF po zapłacie.",
  openGraph: {
    title: "Proforma a KSeF: czy wystawiać ją w KSeF | Fluxlab",
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
    canonical: "/strefa-wiedzy/proforma-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Klient zapłacił proformę przed wykonaniem usługi. Co teraz?",
    a: "Zapłata przed wykonaniem to zaliczka, więc wystawiasz w KSeF fakturę zaliczkową, najpóźniej 15. dnia następnego miesiąca. Nie musisz, gdy usługę wykonasz w tym samym miesiącu, w którym przyszły pieniądze.",
    linki: [{ fraza: "fakturę zaliczkową", href: "/strefa-wiedzy/faktura-zaliczkowa-ksef" }],
  },
  {
    q: "Proforma trafiła do KSeF przez pomyłkę. Co zrobić?",
    a: "Dokument, który dostał numer KSeF, jest fakturą. Jeśli sprzedaży nie było, wystaw do niego korektę do zera.",
    linki: [{ fraza: "korektę do zera", href: "/strefa-wiedzy/blad-w-fakturze-ksef" }],
  },
  {
    q: "Czy nota księgowa idzie do KSeF?",
    a: "Nie. KSeF nie likwiduje not księgowych, ale nie wystawia się ich w systemie. To samo dotyczy zamówień i ofert.",
  },
  {
    q: "Czy na proformie trzeba podać numer KSeF?",
    a: "Nie, bo proforma go nie ma. Numer KSeF dostaje dopiero faktura wystawiona po zapłacie albo po wykonaniu usługi.",
  },
];

export default function ProformaKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/proforma-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Proforma a KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Proforma a KSeF: czy wystawiać ją w systemie
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Nie. Proforma zostaje poza KSeF także po 2027 roku. Do systemu
              trafia dopiero faktura, którą wystawiasz po zapłacie.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Dlaczego poza KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                KSeF przyjmuje{" "}
                <Link
                  href="/strefa-wiedzy/faktura-wewnetrzna-ksef"
                  className="text-accent hover:underline"
                >
                  tylko faktury
                </Link>
                , a proforma w rozumieniu ustawy o
                VAT fakturą nie jest. Ministerstwo Finansów potwierdza to
                wprost w pytaniach o KSeF 2.0.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jak ją wysyłać</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tak jak dotąd: PDF-em, mailem albo z programu do faktur. Nie
                wysyłaj jej do KSeF nawet na próbę, bo dokument z{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  numerem KSeF
                </Link>{" "}
                staje się fakturą.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Faktura po proformie</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gdy klient zapłaci, wystawiasz zwykłą fakturę albo zaliczkową w
                KSeF. Numer proformy możesz wpisać w opisie, żeby klient łatwo
                dopasował płatność.
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
                      {zLinkami(f.a, f.linki)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/proforma-ksef" />
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
              headline: "Proforma a KSeF: czy wystawiać ją w systemie",
              description: OPIS,
              datePublished: "2026-10-19",
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
