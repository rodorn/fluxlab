import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Fakturę dla firmy zagranicznej wystawiasz w KSeF jak każdą inną, a klientowi wysyłasz ją mailem jako PDF z kodem QR. Klient nie zakłada konta w KSeF.";

export const metadata: Metadata = {
  title: "Faktura dla kontrahenta zagranicznego w KSeF | Fluxlab",
  description:
    "Fakturę dla firmy zagranicznej wystawiasz w KSeF jak każdą inną, a klientowi wysyłasz ją mailem jako PDF z kodem QR. Klient nie zakłada konta w KSeF.",
  openGraph: {
    title: "Faktura dla kontrahenta zagranicznego w KSeF | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-dla-kontrahenta-zagranicznego-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy klient zagraniczny musi mieć dostęp do KSeF?",
    a: "Nie. Nie ma polskiego NIP, więc i tak się nie zaloguje. Dostaje fakturę uzgodnionym sposobem, zwykle mailem.",
  },
  {
    q: "Kiedy taka faktura jest uznana za otrzymaną?",
    a: "W dniu, w którym faktycznie trafiła do klienta, a nie w dniu nadania numeru KSeF, jak przy firmie z polskim NIP.",
    linki: [{ fraza: "w dniu nadania numeru KSeF", href: "/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef" }],
  },
  {
    q: "A faktura od zagranicznego dostawcy?",
    a: "Przychodzi poza KSeF, jak dotąd. W JPK_VAT oznaczasz ją BFK.",
    linki: [{ fraza: "oznaczasz ją BFK", href: "/strefa-wiedzy/oznaczenia-jpk-ksef" }],
  },
  {
    q: "Czy są faktury dla zagranicy, których nie wystawia się w KSeF?",
    a: "Tak, faktury rozliczane w procedurach OSS i IOSS. Firma zagraniczna bez siedziby i stałego miejsca prowadzenia działalności w Polsce też nie ma obowiązku KSeF.",
  },
];

export default function FakturaKontrahentZagranicznyKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-dla-kontrahenta-zagranicznego-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura dla kontrahenta zagranicznego w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktura dla kontrahenta zagranicznego w KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Polska firma wystawia ją w KSeF tak samo jak fakturę krajową.
              Różnica jest tylko w tym, jak klient ją dostaje.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Jak wysłać ją klientowi</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient z zagranicy nie pobierze faktury z KSeF, więc wysyłasz mu
                wizualizację, na przykład{" "}
                <Link
                  href="/strefa-wiedzy/zalacznik-do-faktury-ksef"
                  className="text-accent hover:underline"
                >
                  PDF mailem
                </Link>
                . Na wydruku musi być kod QR,
                po którym klient sprawdzi, że faktura naprawdę jest w KSeF.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Dane nabywcy w fakturze</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Firmę z Unii wskazujesz kodem kraju i numerem VAT UE, firmę spoza
                Unii kodem kraju i jej numerem identyfikacyjnym. Gdy klient
                takiego numeru nie ma, zaznaczasz brak identyfikatora zamiast
                wpisywać cokolwiek w pole NIP.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Numer KSeF na fakturze</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Klient często prosi o numer, żeby powołać się na fakturę przy
                płatności. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                pokazuje, czy numer jest poprawny i kiedy go nadano, bez
                rejestracji.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-dla-kontrahenta-zagranicznego-ksef" />
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
              headline: "Faktura dla kontrahenta zagranicznego w KSeF",
              description: OPIS,
              datePublished: "2026-10-17",
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
