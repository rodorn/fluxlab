import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import KatalogProduktow from "@/components/KatalogProduktow";
import { PRODUCTS } from "@/lib/products";

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
        <Breadcrumbs href="/produkty" kolumna="srodek" items={[{ label: "Cennik" }]} />
        <section className="pt-12 lg:pt-24 pb-10 lg:pb-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Cennik</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Usługi ze stałą ceną
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Każda pozycja ma podaną kwotę wejścia i konkretny efekt, a wynik
                odsyłamy mailem.
              </p>
            </div>
          </div>
        </section>

        <section className="container-wide pb-14 md:pb-20">
          <div className="mt-8 lg:mt-12">
            <KatalogProduktow />
          </div>

          <div className="mt-16 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-gray-50/60 dark:bg-gray-900/40 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Potrzebujesz czegoś szytego pod Twój proces?
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Zaczynamy od bezpłatnej diagnozy procesu.
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
