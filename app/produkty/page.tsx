import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import KatalogProduktow from "@/components/KatalogProduktow";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produkty i narzędzia Fluxlab, gotowe raporty i audyty | Fluxlab",
  description:
    "Katalog Fluxlab w trzech filarach: automatyzacja procesów, integracje i dane, systemy i strony. Filtr zawęża listę jednym naciśnięciem.",
  alternates: { canonical: "/produkty" },
  openGraph: {
    title: "Produkty i narzędzia Fluxlab, gotowe raporty i audyty | Fluxlab",
    description:
      "Katalog Fluxlab w trzech filarach: automatyzacja procesów, integracje i dane, systemy i strony. Filtr zawęża listę jednym naciśnięciem.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, produkty i narzędzia",
      },
    ],
  },
};

export default function ProduktyPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Produkty" }]} />
        <section className="container-wide pb-14 md:pb-20 pt-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Produkty
            </p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Gotowe narzędzia, które rozwiązują jeden policzalny problem
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Zamiast długiego wdrożenia dostajesz konkretny efekt za stałą
              cenę. Większość raportów powstaje automatycznie, dlatego kosztują
              tyle, co obiad, a nie tyle, co konsulting. Zgłoszenie realizuję i
              odsyłam wynik mailem.
            </p>
          </div>

          <div className="mt-12">
            <KatalogProduktow />
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Potrzebujesz czegoś szytego pod Twój proces?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Produkty to gotowce ze stałą ceną. Jeśli masz szerszy proces do
              zautomatyzowania, zacznę od bezpłatnej diagnozy i darmowego dowodu
              na wąskim wycinku.
            </p>
            <div className="mt-6">
              <TrackedCTA
                href="/kontakt"
                location="produkty_cta"
                className="btn-primary"
              >
                Bezpłatna diagnoza
              </TrackedCTA>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Produkty i narzędzia Fluxlab",
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
