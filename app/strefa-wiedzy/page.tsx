import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import OkladkaArtykulu from "@/components/OkladkaArtykulu";
import { categories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Automatyzacja CRM i procesów: strefa wiedzy | Fluxlab",
  description:
    "Automatyzacja CRM w praktyce: od czego zacząć, jak połączyć CRM z innymi systemami, Pipedrive czy Salesforce, Make czy n8n, gdzie AI ma sens.",
  openGraph: {
    title: "Automatyzacja CRM i procesów: strefa wiedzy | Fluxlab",
    description:
      "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
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
        {/* Hero, kompaktowy */}
        <section className="pt-16 pb-6 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Wiedza</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Strefa wiedzy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Krótko i konkretnie o automatyzacji, CRM, integracjach i AI
                dla firm B2B.
              </p>
            </div>
          </div>
        </section>

        {/* Kategorie w zakładkach */}
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
                          className="block overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                        >
                          <OkladkaArtykulu
                            tytul={article.title}
                            kategoria={category.name}
                          />
                          <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {article.description}
                          </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </div>

        <section
          id="automatyzacja-crm-ai"
          className="scroll-mt-20 container-wide pb-10 lg:pb-12"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              Automatyzacja CRM z AI: co AI robi w CRM, a czego nie
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                AI w CRM czyta treść zapytania, streszcza ją i wypełnia pola,
                np. segment albo pilność leada. Nie decyduje o rabatach ani nie
                wysyła wiadomości do klienta bez człowieka. Nie naprawi też
                procesu, którego nie ma: najpierw przydział i{" "}
                <Link
                  href="/automatyzacja-follow-up"
                  className="text-accent hover:underline"
                >
                  follow-upy
                </Link>{" "}
                na regułach, AI tam, gdzie reguła nie wystarcza.
              </p>
              <p>
                Pojedynczy krok AI w istniejącym CRM wyceniamy{" "}
                <Link
                  href="/automatyzacja-leadow-crm"
                  className="text-accent hover:underline"
                >
                  od 1 500 zł
                </Link>
                . Więcej w artykule{" "}
                <Link
                  href="/strefa-wiedzy/ai-w-automatyzacji-firm"
                  className="text-accent hover:underline"
                >
                  AI w automatyzacji firm
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 lg:py-10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Porozmawiajmy o automatyzacji w Twojej firmie
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bezpłatna diagnoza, bez zobowiązań.
              </p>
              <Link
                href="/kontakt"
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
