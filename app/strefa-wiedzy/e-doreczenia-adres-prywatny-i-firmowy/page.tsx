import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Przedsiębiorca z CEIDG może mieć dwa adresy do e-Doręczeń: prywatny i firmowy. To dwie osobne skrzynki, adres prywatny nie zastępuje firmowego.";

export const metadata: Metadata = {
  title: "e-Doręczenia: adres prywatny i firmowy w JDG | Fluxlab",
  description:
    "Przedsiębiorca z CEIDG może mieć dwa adresy do e-Doręczeń: prywatny i firmowy. To dwie osobne skrzynki, adres prywatny nie zastępuje firmowego.",
  openGraph: {
    title: "e-Doręczenia w JDG: czy można mieć adres prywatny i firmowy",
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
    canonical: "/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy",
  },
};

const faq = [
  {
    q: "Czy adres prywatny wystarczy do spraw firmy?",
    a: "Nie. Firma z CEIDG musi mieć własny adres, wpisany do bazy adresów elektronicznych jako adres przedsiębiorcy.",
  },
  {
    q: "Czy obie skrzynki mogą mieć ten sam e-mail do powiadomień?",
    a: "Tak. E-mail służy tylko do powiadomień o nowej wiadomości, sama korespondencja czeka w skrzynce.",
  },
  {
    q: "Od kiedy JDG musi mieć adres firmowy?",
    a: "Firmy wpisane do CEIDG przed 2025 od 1 października 2026, nowe od dnia wpisu.",
  },
  {
    q: "Gdzie założyć adres firmowy?",
    a: "Na biznes.gov.pl, wnioskiem o adres do doręczeń elektronicznych dla firmy z CEIDG.",
  },
];

export default function EDoreczeniaAdresPrywatnyIFirmowyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "e-Doręczenia: adres prywatny i firmowy" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              e-Doręczenia w JDG: adres prywatny i firmowy
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Tak, można mieć oba i to nie koliduje. Adres prywatny służy do
              Waszych spraw jako osoby, adres firmowy do spraw działalności z
              CEIDG.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Dwie osobne skrzynki</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Pisma do firmy urząd wyśle na adres przedsiębiorcy, pisma do
                Was prywatnie na adres prywatny. Każdą skrzynkę trzeba czytać
                osobno, bo list w jednej nie pojawi się w drugiej.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jak sprawdzić, co jest założone</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Adres firmowy widać w bazie adresów elektronicznych po NIP. Dla
                spółek z KRS stan adresu sprawdza nasze{" "}
                <Link
                  href="/e-doreczenia-integracja"
                  className="text-accent hover:underline"
                >
                  bezpłatne sprawdzenie e-Doręczeń
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
            <PrevNextArticle currentHref="/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy" />
          </div>
        </div>
        <CTA naglowek="Chcecie, żeby pisma z e-Doręczeń same trafiały do systemu?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "e-Doręczenia w JDG: adres prywatny i firmowy",
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
