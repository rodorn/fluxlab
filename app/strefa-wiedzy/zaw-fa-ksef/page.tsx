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
  "Spółka bez pieczęci kwalifikowanej wskazuje w ZAW-FA jedną osobę do KSeF. Ona nadaje uprawnienia innym. Gdy odejdzie, składasz nowe ZAW-FA z następcą.";

export const metadata: Metadata = {
  title: "ZAW-FA w spółce: kogo wskazać i co, gdy odejdzie | Fluxlab",
  description:
    "Spółka bez pieczęci kwalifikowanej wskazuje w ZAW-FA jedną osobę do KSeF. Ona nadaje uprawnienia innym. Gdy odejdzie, składasz nowe ZAW-FA z następcą.",
  openGraph: {
    title: "ZAW-FA w spółce: kogo wskazać i co, gdy odejdzie | Fluxlab",
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
    canonical: "/strefa-wiedzy/zaw-fa-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy w ZAW-FA wpiszę dwóch członków zarządu?",
    a: "Nie, tylko jedną osobę. Drugiej nada pełne uprawnienia ta pierwsza, już w KSeF.",
  },
  {
    q: "Czy spółka z pieczęcią kwalifikowaną składa ZAW-FA?",
    a: "Nie. Pieczęć z NIP spółki daje uprawnienia właścicielskie bez zgłoszeń w urzędzie.",
  },
  {
    q: "Czy ZAW-FA trzeba aktualizować?",
    a: "Nie, dopóki nie zmienia się NIP spółki ani NIP lub PESEL wskazanej osoby. Zgłoszenie opisuje stan z dnia złożenia.",
  },
  {
    q: "Co po wymianie podpisu kwalifikowanego?",
    a: "Jeśli nowy podpis zawiera NIP lub PESEL, uprawnienia zostają. Jeśli były powiązane z odciskiem palca podpisu, zgłaszasz je ponownie.",
  },
];

export default function ZawFaKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/zaw-fa-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "ZAW-FA w spółce" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              ZAW-FA w spółce: kto ma dostęp do KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Spółka loguje się do KSeF pieczęcią kwalifikowaną z NIP albo przez
              osobę wskazaną w ZAW-FA. W zgłoszeniu jest zawsze jedna osoba, a
              resztę uprawnień nadaje ona sama.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Kogo wpisać</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Jedną osobę fizyczną, niekoniecznie z zarządu, na przykład
                dyrektora finansowego. ZAW-FA podpisuje osoba reprezentująca
                spółkę. Wskazana osoba wystawia i odbiera faktury w{" "}
                <HasloSlownika slug="ksef">KSeF</HasloSlownika>{" "}
                oraz nadaje i odbiera uprawnienia innym.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Księgowa, biuro i program</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Kolejne osoby, także z pełnymi uprawnieniami, dodaje ta pierwsza,
                elektronicznie w KSeF, bez nowych zgłoszeń w urzędzie.{" "}
                <Link href="/ksef-integracja" className="text-accent hover:underline">
                  Program księgowy
                </Link>{" "}
                dostaje dostęp przez token wygenerowany przez osobę z
                uprawnieniami. Warto od razu dać pełne uprawnienia drugiej
                osobie, żeby zmiana w zespole nie zablokowała faktur.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy ta osoba odchodzi</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Jeśli nikt inny nie ma pełnych uprawnień, składasz nowe ZAW-FA ze
                wskazaniem następcy. Zgłoszenie działa dopiero po wprowadzeniu
                przez urząd skarbowy, który potwierdza to mailem, więc wysyłka
                pocztą wydłuża przerwę.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/zaw-fa-ksef" />
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
              headline: "ZAW-FA w spółce: kto ma dostęp do KSeF",
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
