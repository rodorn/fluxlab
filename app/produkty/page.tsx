import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import KatalogProduktow from "@/components/KatalogProduktow";
import { CENNIK as PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Cennik: usługi ze stałą ceną | Fluxlab",
  description:
    "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
  alternates: { canonical: "/produkty" },
  openGraph: {
    title: "Cennik: usługi ze stałą ceną | Fluxlab",
    description:
      "Cennik Fluxlab: usługi ze stałą ceną w działach automatyzacja, integracje i dane, systemy i strony oraz dla osób prywatnych.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, cennik usług ze stałą ceną",
      },
    ],
  },
};

export default function ProduktyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/produkty"
          items={[{ label: "Cennik" }]}
        />
        <section className="pt-6 pb-10 lg:pb-12">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Cennik</p>
              <h1 className="h1-strony">
                Usługi ze stałą ceną
              </h1>
              <p className="hero-lead">
                Każda pozycja ma podaną kwotę wejścia i konkretny efekt, a wynik
                odsyłamy mailem.
              </p>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                Darmowe sprawdzenia i kalkulatory są w dziale{" "}
                <Link
                  href="/narzedzia"
                  className="font-semibold text-accent hover:underline"
                >
                  Narzędzia
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide pb-14 md:pb-20">
          <div className="mt-8 lg:mt-12">
            <KatalogProduktow />
          </div>

        </section>
        <CTA
          naglowek="Potrzebujesz czegoś szytego pod Twój proces?"
          opis={
            <>
              Zaczynamy od diagnozy,{" "}
              <Link href="/jak-pracuje" className="text-accent hover:underline">
                tak pracujemy
              </Link>
              .
            </>
          }
        />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Cennik Fluxlab",
            itemListElement: PRODUCTS.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: `https://fluxlab.pl${p.href}`,
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
