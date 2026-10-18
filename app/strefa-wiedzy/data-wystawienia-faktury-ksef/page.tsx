import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Faktura online w KSeF jest wystawiona w dniu przesłania pliku, nie nadania numeru. Data w P_1 musi się z nim zgadzać, a wysyłka później to tryb offline24.";

export const metadata: Metadata = {
  title: "Data wystawienia faktury w KSeF: dzień wysyłki | Fluxlab",
  description:
    "Faktura online w KSeF jest wystawiona w dniu przesłania pliku, nie nadania numeru. Data w P_1 musi się z nim zgadzać, a wysyłka później to tryb offline24.",
  openGraph: {
    title: "Data wystawienia faktury w KSeF: dzień wysyłki | Fluxlab",
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
    canonical: "/strefa-wiedzy/data-wystawienia-faktury-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Numer KSeF przyszedł po północy. Która data jest dobra?",
    a: "Dzień wysyłki. Liczy się chwila, w której plik zarejestrował się na bramce KSeF, a nie późniejsze nadanie numeru.",
  },
  {
    q: "Czy mogę wpisać w P_1 wczorajszą datę i wysłać fakturę dziś?",
    a: "Tak, ale wtedy to faktura w trybie offline24 z datą wystawienia z P_1. Wysyłasz ją najpóźniej w następnym dniu roboczym po tej dacie.",
  },
  {
    q: "Czym jest pole DataWytworzeniaFa?",
    a: "To techniczna data i godzina utworzenia pliku XML przez program. Datą wystawienia faktury jest wyłącznie P_1.",
  },
  {
    q: "Czy nabywca musi zaakceptować fakturę?",
    a: "Nie. Faktura jest otrzymana w chwili nadania numeru KSeF, bez potwierdzenia od kontrahenta.",
  },
];

export default function DataWystawieniaFakturyKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/data-wystawienia-faktury-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Data wystawienia faktury w KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Data wystawienia faktury w KSeF
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Fakturę online uznaje się za wystawioną w dniu, w którym plik
              trafił do KSeF. Dzień nadania numeru KSeF nie ma tu znaczenia.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Faktura online</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Data w polu P_1 musi być zgodna z dniem przesłania pliku XML do{" "}
                <Link href="/slownik#ksef" className="text-accent hover:underline">
                  KSeF
                </Link>
                . Wysyłasz fakturę 1 lutego, a numer przychodzi 2 lutego: faktura
                jest wystawiona 1 lutego. P_1 jest obowiązkowe, bez niego KSeF
                faktury nie przyjmie.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Wysyłka następnego dnia</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Faktura wysłana później niż data w P_1 staje się fakturą w trybie
                offline24. Datą wystawienia jest wtedy P_1, a plik trzeba dosłać
                najpóźniej w następnym dniu roboczym. Tak samo jest,{" "}
                <Link
                  href="/strefa-wiedzy/faktura-gdy-ksef-nie-dziala"
                  className="text-accent hover:underline"
                >
                  gdy KSeF nie działa
                </Link>
                .
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Odliczenie u nabywcy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Nabywca patrzy na inną datę:{" "}
                <Link
                  href="/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef"
                  className="text-accent hover:underline"
                >
                  VAT odlicza najwcześniej
                </Link>{" "}
                w miesiącu nadania numeru KSeF. Ten dzień jest w samym numerze,
                więc sprawdzisz go w darmowym{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  sprawdzeniu numeru KSeF
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
                      {zLinkami(f.a, f.linki)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/data-wystawienia-faktury-ksef" />
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
              headline: "Data wystawienia faktury w KSeF",
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
