import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Biuro, które przejmuje firmę bez dokumentów, pobierze faktury z 2026 z KSeF. Wystarczy, że firma nada mu uprawnienie do przeglądania faktur.";

export const metadata: Metadata = {
  title: "Faktury z KSeF po zmianie biura rachunkowego | Fluxlab",
  description:
    "Biuro, które przejmuje firmę bez dokumentów, pobierze faktury z 2026 z KSeF. Wystarczy, że firma nada mu uprawnienie do przeglądania faktur.",
  openGraph: {
    title: "Jak pobrać faktury firmy z KSeF po zmianie biura",
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
    canonical: "/strefa-wiedzy/faktury-z-ksef-po-zmianie-biura",
  },
};

const faq = [
  {
    q: "Które faktury są w KSeF?",
    a: "Wszystkie wystawione w KSeF, u większości firm sprzedaż i zakupy od 1 kwietnia 2026. Faktur z 2025 wystawionych poza KSeF tam nie ma.",
  },
  {
    q: "Kto nadaje uprawnienie biuru?",
    a: "Osoba, która ma w KSeF prawo nadawania uprawnień w imieniu firmy. W spółce to zwykle członek zarządu, zgłoszony na ZAW-FA albo logujący się pieczęcią kwalifikowaną spółki.",
  },
  {
    q: "Czy poprzednie biuro nadal widzi faktury?",
    a: "Tak, dopóki firma nie odbierze mu uprawnienia. Warto to zrobić przy tej samej okazji.",
  },
  {
    q: "Skąd wziąć deklaracje VAT z 2025?",
    a: "KSeF ich nie przechowuje. Potwierdzenia złożenia JPK (UPO) ma ten, kto je wysyłał, czyli poprzednie biuro albo jego program.",
  },
];

export default function FakturyZKsefPoZmianieBiuraArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktury-z-ksef-po-zmianie-biura"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktury z KSeF po zmianie biura" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktury z KSeF po zmianie biura rachunkowego
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Gdy poprzednie biuro nie oddało dokumentów, faktury z 2026 i tak
              są w KSeF. Firma nadaje nowemu biuru uprawnienie, a biuro pobiera
              sprzedaż i zakupy samo.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Co zrobić krok po kroku</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Osoba uprawniona w firmie loguje się do Aplikacji Podatnika
                KSeF i nadaje biuru, po jego NIP, uprawnienie do przeglądania
                faktur. Biuro widzi wtedy faktury wystawione i otrzymane za
                cały okres, w którym firma była w KSeF.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Czego w KSeF nie ma</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Faktur sprzed wejścia firmy do KSeF, paragonów i deklaracji
                VAT. Przy fakturach z KSeF datę przyjęcia widać w samym numerze,
                co sprawdzi nasz{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  bezpłatny odczyt numeru KSeF
                </Link>
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
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/faktury-z-ksef-po-zmianie-biura" />
          </div>
        </div>
        <CTA naglowek="Chcecie, żeby faktury z KSeF same trafiały do Waszego systemu?" />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Faktury z KSeF po zmianie biura rachunkowego",
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
