import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Gutschrift bez umowy o samofakturowanie nie jest fakturą. Fakturę za usługę wystawiasz w KSeF, a korygujesz ją tylko wtedy, gdy zmieniła się cena.";

export const metadata: Metadata = {
  title: "Gutschrift od klienta z Niemiec a KSeF | Fluxlab",
  description:
    "Gutschrift bez umowy o samofakturowanie nie jest fakturą. Fakturę za usługę wystawiasz w KSeF, a korygujesz ją tylko wtedy, gdy zmieniła się cena.",
  openGraph: {
    title: "Gutschrift od klienta z Niemiec a KSeF | Fluxlab",
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
    canonical: "/strefa-wiedzy/gutschrift-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy Gutschrift trafia do KSeF?",
    a: "Nie musi. Samofaktury wystawiane przez firmy zagraniczne nie są objęte obowiązkowym KSeF. Nabywca z Unii może je tam wystawić dobrowolnie tylko przy WDT.",
  },
  {
    q: "Kto nadaje uprawnienie do samofakturowania?",
    a: "Sprzedawca, w Aplikacji Podatnika KSeF albo przez API. Firma z Unii musi mieć numer VAT UE.",
  },
  {
    q: "Czy klient z Niemiec musi mieć dostęp do KSeF?",
    a: "Nie. Bez polskiego NIP się nie zaloguje, więc fakturę dostaje w uzgodniony sposób, z kodem QR do sprawdzenia.",
  },
  {
    q: "Mam fakturę w KSeF i przyszedł Gutschrift. Co z nim?",
    a: "Bez umowy zostaje Twoja faktura. Gutschrift traktujesz jak awizo płatności od klienta.",
  },
];

export default function GutschriftKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/gutschrift-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Gutschrift a KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Gutschrift od klienta z Niemiec a KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Niemieccy kontrahenci często wysyłają Gutschrift zamiast przyjąć
              polską fakturę. Po polsku to samofakturowanie, a ono ma swoje
              warunki.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Bez umowy to nie faktura</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Nabywca wystawia faktury za sprzedawcę tylko wtedy, gdy wcześniej
                zawarto umowę z procedurą zatwierdzania faktur (art. 106d
                ust. 1 ustawy o VAT). Bez niej Gutschrift jest rozliczeniem po
                stronie klienta, a fakturę nadal wystawiasz Ty.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Twoja faktura idzie do KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Fakturę dla firmy z Unii wystawiasz w{" "}
                <Link
                  href="/strefa-wiedzy/faktura-dla-kontrahenta-zagranicznego-ksef"
                  className="text-accent hover:underline"
                >
                  KSeF jak krajową
                </Link>{" "}
                i wysyłasz ją klientowi z kodem QR. Gdy umowa jest podpisana,
                fakturuje klient, a Ty własnych faktur już nie wystawiasz.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy kwoty się różnią</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Gutschrift na 950 euro przy fakturze na 1000 euro wymaga
                ustalenia przyczyny. Gdy obniżono cenę, na przykład po
                reklamacji, wystawiasz fakturę korygującą w KSeF (art. 106j).
                Gdy klient potrącił inną należność, cena usługi się nie zmienia.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/gutschrift-ksef" />
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
              headline: "Gutschrift od klienta z Niemiec a KSeF",
              description: OPIS,
              datePublished: "2026-10-18",
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
