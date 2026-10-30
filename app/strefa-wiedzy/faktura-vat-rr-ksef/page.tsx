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
  "Faktura RR w KSeF nie jest obowiązkowa: od 1.04.2026 możesz ją tam wystawić, a gdy rolnik wskaże Cię w KSeF, wystawiasz tam wszystkie, aż cofnie wskazanie.";

export const metadata: Metadata = {
  title: "Faktura VAT RR w KSeF: kiedy trzeba, kiedy papier | Fluxlab",
  description:
    "Faktura RR w KSeF nie jest obowiązkowa: od 1.04.2026 możesz ją tam wystawić, a gdy rolnik wskaże Cię w KSeF, wystawiasz tam wszystkie, aż cofnie wskazanie.",
  openGraph: {
    title: "Faktura VAT RR w KSeF: kiedy trzeba, kiedy papier | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-vat-rr-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy od 2026 muszę wystawiać faktury VAT RR w KSeF?",
    a: "Nie. KSeF dla faktur VAT RR jest dobrowolny. Obowiązek pojawia się dopiero wtedy, gdy rolnik wskaże Cię w systemie jako uprawnionego nabywcę.",
  },
  {
    q: "Skąd wiem, że rolnik mnie wskazał?",
    a: "Zapytaj rolnika przy pierwszym skupie i potwierdź to w KSeF przed wystawieniem faktury. Wskazanie wiąże Cię do czasu jego cofnięcia.",
  },
  {
    q: "Jak poprawić fakturę VAT RR wystawioną w KSeF?",
    a: "Korektą VAT RR KOREKTA, też w KSeF i w tej samej strukturze FA_RR(1). Faktura spoza systemu dostaje korektę poza systemem.",
  },
  {
    q: "Czy program do faktur sam obsłuży VAT RR w KSeF?",
    a: "Tylko jeśli ma osobną strukturę FA_RR(1). Zwykła FA(3) nie przyjmie faktury VAT RR.",
  },
];

export default function FakturaVatRrKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-vat-rr-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura VAT RR w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktura VAT RR w KSeF: kiedy trzeba
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Fakturę VAT RR za skup od rolnika ryczałtowego wystawia nabywca. Od
              1 kwietnia 2026 może to zrobić w KSeF, ale co do zasady nie musi.
              O tym, czy faktura trafia do systemu, rozstrzyga rolnik.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy rolnik Cię wskazał</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Rolnik składa w{" "}
                <HasloSlownika slug="ksef">KSeF</HasloSlownika>{" "}
                oświadczenie, że jest rolnikiem ryczałtowym, i wskazuje nabywcę.
                Od tej chwili wystawiasz mu faktury VAT RR i korekty tylko w KSeF,
                aż rolnik cofnie wskazanie, co może zrobić w każdej chwili.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Gdy nie wskazał</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Faktura VAT RR powstaje poza KSeF, tak jak przed 2026: na papierze
                albo w PDF, z oświadczeniem rolnika o statusie ryczałtowca. Brak
                numeru KSeF przy takiej fakturze nie jest błędem.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Osobna struktura</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Faktury VAT RR mają w KSeF własną strukturę FA_RR(1), nie FA(3).
                Sprawdź, czy{" "}
                <Link href="/ksef-integracja" className="text-accent hover:underline">
                  Twój program
                </Link>{" "}
                ją obsługuje, zanim pierwszy rolnik Cię wskaże.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-vat-rr-ksef" />
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
              headline: "Faktura VAT RR w KSeF: kiedy trzeba",
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
