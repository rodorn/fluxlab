import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

const OPIS =
  "Fakturę przyjętą przez KSeF poprawia tylko sprzedawca, fakturą korygującą. Przy złym NIP robi korektę do zera i nową fakturę, a odrzucony plik wysyła od nowa.";

export const metadata: Metadata = {
  title: "Błąd w fakturze w KSeF: jak ją poprawić | Fluxlab",
  description:
    "Fakturę przyjętą przez KSeF poprawia tylko sprzedawca, fakturą korygującą. Przy złym NIP robi korektę do zera i nową fakturę, a odrzucony plik wysyła od nowa.",
  openGraph: {
    title: "Błąd w fakturze w KSeF: jak ją poprawić | Fluxlab",
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
    canonical: "/strefa-wiedzy/blad-w-fakturze-ksef",
  },
};

const faq = [
  {
    q: "Czy fakturę w KSeF da się anulować albo usunąć?",
    a: "Nie. Faktura z numerem KSeF zostaje w systemie na zawsze, więc błąd poprawiacie fakturą korygującą, w razie potrzeby do zera.",
  },
  {
    q: "Ile korekt można wystawić do jednej faktury?",
    a: "Bez limitu. Wystawiacie tyle korekt, ile trzeba, żeby faktura była w końcu prawidłowa.",
  },
  {
    q: "Klient chce korekty do zera, bo brakuje numeru zamówienia. Musimy?",
    a: "Nie. Brak danych dodatkowych nie jest pomyłką z ustawy o VAT. Korekta jest potrzebna przy zmianie podstawy lub podatku, zwrocie, rabacie albo błędzie na fakturze.",
  },
  {
    q: "Jedna korekta do kilku faktur?",
    a: "Można, ale korekta zbiorcza musi wskazać każdą fakturę pierwotną: numer nadany przez Was, numer KSeF i datę wystawienia.",
  },
];

export default function BladWFakturzeKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/blad-w-fakturze-ksef"
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Błąd w fakturze w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Błąd w fakturze w KSeF</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Faktury przyjętej przez KSeF nie da się edytować ani usunąć.
              Poprawia ją sprzedawca, a sposób zależy od rodzaju błędu.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Trzy sytuacje</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  Zła kwota, stawka, opis albo rachunek: faktura korygująca z
                  numerem KSeF faktury pierwotnej. KSeF nie sprawdza rachunków
                  ani danych kontrahenta, więc taki błąd przejdzie.
                </li>
                <li>
                  Zły NIP nabywcy: korekta do zera na błędny NIP i nowa faktura
                  na właściwy. Błędna zostaje widoczna dla firmy o tamtym NIP.
                </li>
                <li>
                  Plik odrzucony przez KSeF: faktura nie powstała, więc
                  wysyłacie nowy, poprawny plik zamiast korekty.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Nabywca nie poprawi sam</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                W KSeF nie ma noty korygującej. Nabywca, który widzi błąd, prosi
                sprzedawcę o korektę.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Numer faktury pierwotnej</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Korekta musi wskazać numer KSeF poprawianej faktury. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                wyłapie literówkę w tym numerze, zanim korekta pójdzie do
                systemu.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/blad-w-fakturze-ksef" />
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
              headline: "Błąd w fakturze w KSeF",
              description: OPIS,
              datePublished: "2026-10-11",
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
