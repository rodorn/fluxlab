import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Gdy KSeF nie działa, fakturę wystawia się offline i dosyła następnego dnia roboczego albo w 7 dni roboczych po awarii. Poza KSeF idzie z dwoma kodami QR.";

export const metadata: Metadata = {
  title: "Faktura, gdy KSeF nie działa: offline24 i awaria | Fluxlab",
  description:
    "Gdy KSeF nie działa, fakturę wystawia się offline i dosyła następnego dnia roboczego albo w 7 dni roboczych po awarii. Poza KSeF idzie z dwoma kodami QR.",
  openGraph: {
    title: "Faktura, gdy KSeF nie działa: offline24 i awaria | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-gdy-ksef-nie-dziala",
  },
};

const faq = [
  {
    q: "Nie mamy internetu, a klient czeka na fakturę. Co robimy?",
    a: "Wystawiacie ją w trybie offline24 w strukturze FA(3) i wysyłacie do KSeF najpóźniej następnego dnia roboczego. Ogłoszenie awarii nie jest do tego potrzebne.",
  },
  {
    q: "Jaka jest data wystawienia takiej faktury?",
    a: "Data z pola P_1, czyli ta, którą wpisaliście na fakturze, a nie dzień wysłania do KSeF.",
  },
  {
    q: "Kiedy nabywca ją otrzymuje?",
    a: "Firma z NIP otrzymuje ją w dniu nadania numeru KSeF i od tego dnia liczy odliczenie VAT. Konsument i firma zagraniczna otrzymują ją w dniu faktycznego doręczenia.",
  },
  {
    q: "Po co certyfikat KSeF?",
    a: "Bez certyfikatu typu offline nie wygenerujecie drugiego kodu QR. Wyrabia się go w Aplikacji Podatnika KSeF i warto zrobić to przed pierwszą awarią.",
  },
];

export default function FakturaGdyKsefNieDzialaArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-gdy-ksef-nie-dziala"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura, gdy KSeF nie działa" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Faktura, gdy KSeF nie działa</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Wystawiacie ją dalej, w tej samej strukturze FA(3), i dosyłacie do
              KSeF później. Termin zależy od tego, czyja to przerwa.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Trzy terminy</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  Problem po Waszej stronie (tryb offline24, art. 106nda):
                  najpóźniej następny dzień roboczy po wystawieniu.
                </li>
                <li>
                  Niedostępność ogłoszona w BIP MF (art. 106nh): następny dzień
                  roboczy po jej zakończeniu.
                </li>
                <li>
                  Awaria ogłoszona w BIP MF (art. 106nf): 7 dni roboczych od jej
                  zakończenia.
                </li>
              </ul>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Przy awarii całkowitej, ogłoszonej w mediach, faktur nie dosyła
                się do KSeF wcale.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Dwa kody QR</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Fakturę przekazaną klientowi poza KSeF, zanim dostanie numer,
                oznacza się dwoma kodami QR. Pierwszy pozwala ją sprawdzić, drugi
                potwierdza wystawcę i wymaga certyfikatu KSeF typu offline.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Czy faktura doszła</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Po dosłaniu faktura dostaje numer KSeF z datą nadania. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                odczytuje tę datę i wyłapuje literówki, bez rejestracji.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-gdy-ksef-nie-dziala" />
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
              headline: "Faktura, gdy KSeF nie działa",
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
