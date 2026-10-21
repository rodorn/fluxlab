import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "Faktury wewnętrznej nie wystawiasz w KSeF. Od 2014 roku nie jest fakturą w rozumieniu ustawy o VAT, tylko dokumentem dla Twojej ewidencji.";

export const metadata: Metadata = {
  title: "Faktura wewnętrzna a KSeF: czy ją wysyłać | Fluxlab",
  description:
    "Faktury wewnętrznej nie wystawiasz w KSeF. Od 2014 roku nie jest fakturą w rozumieniu ustawy o VAT, tylko dokumentem dla Twojej ewidencji.",
  openGraph: {
    title: "Faktura wewnętrzna a KSeF: czy ją wysyłać | Fluxlab",
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
    canonical: "/strefa-wiedzy/faktura-wewnetrzna-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Czy faktura wewnętrzna jest w ogóle obowiązkowa?",
    a: "Nie. Możesz ją sporządzać dla porządku, np. przy nieodpłatnym przekazaniu towaru, ale VAT wykazujesz w ewidencji niezależnie od niej.",
  },
  {
    q: "A WNT i import usług?",
    a: "VAT naliczasz sam na podstawie faktury od zagranicznego dostawcy. Ta faktura powstała poza KSeF, więc w JPK_VAT ma oznaczenie BFK.",
    linki: [{ fraza: "oznaczenie BFK", href: "/strefa-wiedzy/oznaczenia-jpk-ksef" }],
  },
  {
    q: "Program wysłał dokument wewnętrzny do KSeF. Co teraz?",
    a: "Dokument z numerem KSeF jest fakturą. Jeśli sprzedaży nie było, wystaw do niego korektę do zera i wyłącz w programie wysyłkę dokumentów wewnętrznych.",
    linki: [{ fraza: "korektę do zera", href: "/strefa-wiedzy/blad-w-fakturze-ksef" }],
  },
];

export default function FakturaWewnetrznaKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/faktura-wewnetrzna-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Faktura wewnętrzna a KSeF" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Faktura wewnętrzna a KSeF: czy ją wysyłać
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Nie. KSeF przyjmuje{" "}
              <Link href="/strefa-wiedzy/proforma-ksef" className="text-accent hover:underline">
                tylko faktury
              </Link>
              , a faktura wewnętrzna nią nie
              jest. Zostaje w Twoim programie jako dokument do ewidencji VAT.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Dlaczego poza KSeF</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Obowiązek wystawiania faktur wewnętrznych zniknął z ustawy o
                VAT w 2014 roku. Dokument, który dziś tak nazywasz, służy
                tylko Twojej ewidencji i nie trafia do żadnego kontrahenta.
              </p>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Jak ją ująć w JPK_VAT</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                W ewidencji sprzedaży dokument wewnętrzny oznaczasz typem WEW.
                Nie ma{" "}
                <Link href="/numer-ksef" className="text-accent hover:underline">
                  numeru KSeF
                </Link>
                , także po 2027 roku.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/faktura-wewnetrzna-ksef" />
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
              headline: "Faktura wewnętrzna a KSeF: czy ją wysyłać",
              description: OPIS,
              datePublished: "2026-10-19",
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
