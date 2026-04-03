import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
  description:
    "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI. Bez marketingowej mgły — konkrety dla firm B2B.",
  openGraph: {
    title: "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
    description:
      "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI.",
    locale: "pl_PL",
    type: "website",
  },
  alternates: {
    canonical: "/strefa-wiedzy",
  },
};

export default function StrefaWiedzy() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy" }]} />
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Wiedza</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
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

        {/* Categories */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto space-y-16">
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={`/strefa-wiedzy/kategoria/${category.slug}`}
                    className="inline-block text-sm font-semibold text-accent uppercase tracking-widest mb-6 hover:underline"
                  >
                    {category.name}
                  </Link>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.articles.map((article) => (
                      <Link
                        key={article.href}
                        href={article.href}
                        className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                      >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {article.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Chcesz porozmawiać o automatyzacji w Twojej firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Bezpłatna konsultacja, bez zobowiązań.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Umów rozmowę
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
