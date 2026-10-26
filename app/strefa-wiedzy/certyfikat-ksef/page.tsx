import type { Metadata } from "next";
import Link from "next/link";
import HasloSlownika from "@/components/HasloSlownika";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Bez certyfikatu KSeF typu offline nie wystawisz faktury, gdy KSeF nie działa. Wyrobisz go w Aplikacji Podatnika KSeF, a ważny jest najwyżej 2 lata.";

export const metadata: Metadata = {
  title: "Certyfikat KSeF: po co jest i jak go wyrobić | Fluxlab",
  description:
    "Bez certyfikatu KSeF typu offline nie wystawisz faktury, gdy KSeF nie działa. Wyrobisz go w Aplikacji Podatnika KSeF, a ważny jest najwyżej 2 lata.",
  openGraph: {
    title: "Certyfikat KSeF: po co jest i jak go wyrobić | Fluxlab",
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
    canonical: "/strefa-wiedzy/certyfikat-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy certyfikat KSeF jest obowiązkowy?",
    a: "Do zwykłego wystawiania nie, logować się możesz też Profilem Zaufanym albo tokenem. Potrzebny jest dopiero do faktur offline i w awarii.",
  },
  {
    q: "Czy pracownik może używać certyfikatu firmy?",
    a: "Tak. Spółka po zalogowaniu pieczęcią może pobrać kilka certyfikatów na swoje dane i przekazać je pracownikom, a w KSeF widać wtedy spółkę, nie osobę.",
  },
  {
    q: "Czy tokeny znikną z końcem 2026?",
    a: "Nie. Ministerstwo Finansów zdecydowało, że tokeny zostają bezterminowo, a rozporządzenie zostanie znowelizowane.",
  },
];

export default function CertyfikatKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/certyfikat-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Certyfikat KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Certyfikat KSeF: do czego służy i kiedy go wyrobić
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We wtorek o 10:00{" "}
              <HasloSlownika slug="ksef">KSeF</HasloSlownika> przestaje
              odpowiadać, a klient czeka na fakturę.{" "}
              <Link
                href="/strefa-wiedzy/faktura-gdy-ksef-nie-dziala"
                className="text-accent hover:underline"
              >
                Wystawisz ją offline
              </Link>
              , ale z drugim kodem QR, a ten kod wymaga certyfikatu KSeF typu
              offline. W czasie awarii go nie wyrobisz, bo wniosek składa się w
              samym KSeF.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Dwa typy, dwa osobne certyfikaty</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Typ 1 służy do logowania w KSeF, także{" "}
                <Link href="/ksef-integracja" className="text-accent hover:underline">
                  z programu do faktur
                </Link>
                . Typ 2 (offline) podpisuje kod na fakturach w trybie offline24,
                przy niedostępności i w awarii. Jednego certyfikatu na oba cele
                wygenerować się nie da.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdzie go wyrobić</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                W Aplikacji Podatnika KSeF albo przez API, po zalogowaniu
                Profilem Zaufanym, podpisem kwalifikowanym lub pieczęcią spółki.
                Certyfikat jest ważny najwyżej 2 lata, więc wpisz sobie datę
                wymiany. Źródło:{" "}
                <a
                  href="https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/"
                  className="text-accent hover:underline"
                  rel="noopener"
                >
                  Ministerstwo Finansów, Certyfikaty KSeF
                </a>
                .
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
            <PrevNextArticle currentHref="/strefa-wiedzy/certyfikat-ksef" />
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
              headline: "Certyfikat KSeF: do czego służy i kiedy go wyrobić",
              description: OPIS,
              datePublished: "2026-10-26",
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
