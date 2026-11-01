import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Automatyzacja AI w firmie: gdzie działa, gdzie nie | Fluxlab",
  description:
    "Automatyzacja AI w firmie: model sortuje zapytania i streszcza dokumenty, a człowiek zatwierdza ryzykowne decyzje. Zobacz, jak wdrażamy AI w procesach.",
  openGraph: {
    title: "Automatyzacja AI w firmie: gdzie działa, gdzie nie | Fluxlab",
    description:
      "Automatyzacja AI w firmie: model sortuje zapytania i streszcza dokumenty, a człowiek zatwierdza ryzykowne decyzje. Zobacz, jak wdrażamy AI w procesach.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/ai-w-automatyzacji-firm",
  },
};

const faq = [
  {
    question: "Na czym polega automatyzacja AI dla firm?",
    answer:
      "Model AI przejmuje czytanie i sortowanie wiadomości oraz dokumentów: klasyfikuje treści, streszcza, porządkuje zgłoszenia, wyciąga dane i przygotowuje robocze odpowiedzi. Ma sens tylko wtedy, gdy przyspiesza konkretny proces i nie obniża jakości.",
  },
  {
    question: "Jak wygląda automatyzacja CRM z AI?",
    answer:
      "AI czyta zapytanie, nadaje mu ocenę i rozpoznaje temat, a handlowiec dostaje w CRM gotowe zadanie. Niepewne sprawy trafiają do człowieka. Działa to dobrze tylko na danych bez duplikatów i braków, dlatego najpierw porządkujemy pola i źródła leadów.",
  },
  {
    question: "Czy firma potrzebuje własnych danych do trenowania modelu?",
    answer:
      "Zwykle nie. Większość zastosowań działa na gotowych modelach, którym podaje się dokumenty firmy, np. cennik i regulamin. Trening własnego modelu to wyjątek, nie punkt startu.",
  },
  {
    question: "Czy AI może podejmować decyzje za pracowników?",
    answer:
      "Nie tam, gdzie błąd dużo kosztuje. Sprawdzony model: AI robi pierwszą analizę, system przekazuje wynik dalej, a człowiek zatwierdza decyzje o wyższym ryzyku. AI się myli, więc powtarzalne analizy idą do modelu, a decyzje zostają u ludzi.",
  },
];

export default function AiWAutomatyzacjiFirmPage() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/strefa-wiedzy/ai-w-automatyzacji-firm"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "AI w automatyzacji firm" },
          ]}
        />

        <section className="pt-24 pb-12">
          <div className="container-wide max-w-3xl mx-auto">
            <div className="text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Automatyzacja AI w firmach
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <Link href="/automatyzacja-ai" className="text-accent hover:underline">
                Automatyzacja AI dla firm
              </Link>{" "}
              to oddanie modelowi AI czytania i sortowania wiadomości oraz
              dokumentów. Ma sens, gdy przyspiesza konkretny proces i nie obniża
              jakości.
            </p>
            </div>

            <h2 className="mt-12 mb-4 h2-sekcji">
              Gdzie AI daje efekt
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Klasyfikacja treści, streszczenia, porządkowanie zgłoszeń,
              wyciąganie danych i robocze odpowiedzi. Efekt to krótszy czas
              reakcji i mniej ręcznej pracy w{" "}
              <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                obsłudze leadów i CRM
              </Link>
              . Ten sam mechanizm działa na stronie firmy:{" "}
              <Link href="/asystent-ai-na-stronie" className="text-accent hover:underline">
                asystent AI na stronie
              </Link>{" "}
              odpowiada klientom na podstawie cennika i regulaminu, nie tylko
              listy FAQ.
            </p>

            <h2 className="mt-10 mb-4 h2-sekcji">
              Gdzie AI nie powinno decydować samo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Tam, gdzie błąd dużo kosztuje. Sprawdzony model: AI robi pierwszą
              analizę, system przekazuje wynik dalej, człowiek zatwierdza
              decyzje o wyższym ryzyku.
            </p>

            <h2 className="mt-10 mb-6 h2-sekcji">Najczęstsze pytania</h2>
            <div className="space-y-4">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-5 font-semibold text-gray-900 dark:text-white list-none">
                    {item.question}
                  </summary>
                  <p className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/ai-w-automatyzacji-firm" />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
            </div>
          </div>
        </section>
        <CTA naglowek="Chcesz wdrożyć AI tam, gdzie naprawdę da efekt?" />
      </main>
      <Footer />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: { "@type": "Answer", text: q.answer },
            })),
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "AI w automatyzacji firm",
            description:
              "Automatyzacja AI w firmie: model sortuje zapytania i streszcza dokumenty, a człowiek zatwierdza ryzykowne decyzje. Zobacz, jak wdrażamy AI w procesach.",
            datePublished: "2026-03-30",
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
          }),
        }}
      />
    </>
  );
}
