import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title:
    "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
  description:
    "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI. Bez marketingowej mgły — konkrety dla firm B2B.",
  openGraph: {
    title:
      "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
    description:
      "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy",
  },
};

export default function StrefaWiedzy() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs items={[{ label: "Strefa wiedzy" }]} />
        {/* Hero — kompaktowy */}
        <section className="pt-16 pb-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Wiedza</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Strefa wiedzy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Praktyczne artykuły o automatyzacji procesów, CRM, integracjach
                API, raportowaniu i AI. Bez marketingowej mgły — konkrety dla
                firm B2B.
              </p>
            </div>
          </div>
        </section>

        {/* Kategorie w zakładkach — nic nie wycięte, podzielone */}
        <div className="container-wide py-6 lg:py-8">
          <Tabs
            ariaLabel="Kategorie strefy wiedzy"
            tabs={categories.map((category) => ({
              label: category.name,
              content: (
                <div className="py-6 lg:py-8">
                  <div className="max-w-4xl mx-auto">
                    <Link
                      href={`/strefa-wiedzy/kategoria/${category.slug}`}
                      className="inline-block text-sm font-semibold text-accent uppercase tracking-widest mb-2 hover:underline"
                    >
                      {category.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-2xl">
                      {category.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {category.articles.map((article) => (
                        <Link
                          key={article.href}
                          href={article.href}
                          className="block p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                        >
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {article.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>

        {/* CTA */}
        <section className="py-8 lg:py-10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Chcesz porozmawiać o automatyzacji w Twojej firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Bezpłatna diagnoza, bez zobowiązań.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Zamów diagnozę procesu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
