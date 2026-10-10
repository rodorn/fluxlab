import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Fakturę z KSeF uznaje się za otrzymaną w dniu nadania numeru KSeF. Od tego dnia, a nie od daty wystawienia, zależy miesiąc odliczenia VAT.";

export const metadata: Metadata = {
  title: "Kiedy odliczyć VAT z faktury z KSeF | Fluxlab",
  description:
    "Fakturę z KSeF uznaje się za otrzymaną w dniu nadania numeru KSeF. Od tego dnia, a nie od daty wystawienia, zależy miesiąc odliczenia VAT.",
  openGraph: {
    title: "Kiedy odliczyć VAT z faktury z KSeF | Fluxlab",
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
    canonical: "/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef",
  },
};

const faq = [
  {
    q: "Faktura wystawiona 30 września, numer KSeF nadany 1 października. Kiedy odliczamy VAT?",
    a: "Najwcześniej w JPK_V7 za październik. Za otrzymaną uznaje się ją 1 października, czyli w dniu nadania numeru.",
  },
  {
    q: "Czy przy zaliczce liczy się data zapłaty?",
    a: "Zapłata tworzy obowiązek podatkowy u sprzedawcy, ale odliczenie i tak nie może wypaść przed okresem, w którym nadano numer KSeF faktury zaliczkowej.",
  },
  {
    q: "A faktura wystawiona w trybie offline?",
    a: "Też liczy się dzień nadania numeru po jej przesłaniu do KSeF, nie dzień, w którym dostaliście wizualizację z kodem QR.",
  },
  {
    q: "Gdzie sprawdzić datę nadania numeru?",
    a: "W samym numerze: po 10 cyfrach NIP sprzedawcy stoi 8 cyfr w układzie RRRRMMDD.",
  },
];

export default function KiedyOdliczycVatKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Kiedy odliczyć VAT z faktury z KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Kiedy odliczyć VAT z faktury z KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Najwcześniej w rozliczeniu za miesiąc, w którym KSeF nadał
              fakturze numer. Data wystawienia i data zapłaty tego nie
              przesuwają.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Skąd ta zasada</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Odliczenie przysługuje nie wcześniej niż za okres, w którym
                faktura została otrzymana (art. 86 ust. 10b pkt 1 ustawy o VAT).
                Fakturę z KSeF uznaje się za otrzymaną w dniu nadania jej numeru
                w KSeF (art. 106na ust. 3).
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy nie zdążycie</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Przy rozliczeniu miesięcznym VAT można odliczyć jeszcze w jednym
                z trzech kolejnych miesięcy (art. 86 ust. 11). Faktury z
                przełomu miesiąca warto więc sprawdzać po dacie numeru, a nie po
                dacie na wydruku.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Data siedzi w numerze</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Numer KSeF zawiera datę nadania w układzie RRRRMMDD. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                pokazuje ją przy każdym wklejonym numerze i wyłapuje literówki,
                bez rejestracji.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef" />
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
              headline: "Kiedy odliczyć VAT z faktury z KSeF",
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
