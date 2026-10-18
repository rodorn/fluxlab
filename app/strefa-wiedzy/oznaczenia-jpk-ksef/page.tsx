import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import { zLinkami, type LinkWTekscie } from "@/lib/zLinkami";

const OPIS =
  "W JPK_VAT faktura ma numer KSeF albo oznaczenie: OFF dla awarii KSeF, BFK dla faktury spoza KSeF, DI dla dowodu innego niż faktura, np. paragonu.";

export const metadata: Metadata = {
  title: "Numer KSeF, OFF, BFK czy DI w JPK_VAT | Fluxlab",
  description:
    "W JPK_VAT faktura ma numer KSeF albo oznaczenie: OFF dla awarii KSeF, BFK dla faktury spoza KSeF, DI dla dowodu innego niż faktura, np. paragonu.",
  openGraph: {
    title: "Numer KSeF, OFF, BFK czy DI w JPK_VAT | Fluxlab",
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
    canonical: "/strefa-wiedzy/oznaczenia-jpk-ksef",
  },
};

const faq: { q: string; a: string; linki?: LinkWTekscie[] }[] = [
  {
    q: "Rachunek oznaczasz DI czy BFK?",
    a: "Rachunek nie jest fakturą, więc DI. Rachunek od sprzedawcy zwolnionego z VAT nie daje odliczenia, więc w ewidencji zakupu zwykle go nie ma.",
    linki: [{ fraza: "sprzedawcy zwolnionego z VAT", href: "/strefa-wiedzy/ksef-jdg-zwolniona-z-vat" }],
  },
  {
    q: "Faktura offline24 nie ma numeru w dniu złożenia JPK?",
    a: "Oznaczasz ją DI, a gdy dostanie numer KSeF, korygujesz ewidencję i wpisujesz ten numer.",
  },
  {
    q: "Faktura z awarii KSeF nie ma jeszcze numeru?",
    a: "Oznaczasz ją OFF. Po nadaniu numeru korekta ewidencji nie jest potrzebna.",
  },
  {
    q: "Faktura od zagranicznego dostawcy?",
    a: "BFK, bo powstała poza KSeF. Tak samo dokumenty do WNT i importu usług.",
  },
];

export default function OznaczeniaJpkKsefArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          href="/strefa-wiedzy/oznaczenia-jpk-ksef"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Oznaczenia KSeF w JPK_VAT" },
          ]}
        />
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">Numer KSeF, OFF, BFK czy DI w JPK_VAT</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Od lutego 2026 każdy dokument w ewidencji sprzedaży i zakupu ma
              numer KSeF albo jedno z trzech oznaczeń. Decyduje stan w dniu
              złożenia JPK_VAT.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="mb-4 h2-sekcji">Które oznaczenie</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                <li>
                  Numer KSeF: faktura ma już numer, także wystawiona w trybie
                  offline24, niedostępności lub awarii.
                </li>
                <li>OFF: faktura z trybu awarii, która numeru jeszcze nie ma.</li>
                <li>
                  BFK: faktura wystawiona poza KSeF, papierowa lub
                  elektroniczna.
                </li>
                <li>
                  DI: dowód inny niż faktura, np. paragon, oraz faktura offline24
                  lub z niedostępności bez numeru.
                </li>
              </ul>
            </section>
            <section>
              <h2 className="mb-4 h2-sekcji">Numer bez literówki</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Błędny numer KSeF w JPK oznacza potem korektę pliku. Nasze{" "}
                <Link
                  href="/numer-ksef"
                  className="text-accent hover:underline"
                >
                  sprawdzenie numeru KSeF
                </Link>{" "}
                wyłapie literówkę, zanim plik pójdzie do urzędu.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/oznaczenia-jpk-ksef" />
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
              headline: "Numer KSeF, OFF, BFK czy DI w JPK_VAT",
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
