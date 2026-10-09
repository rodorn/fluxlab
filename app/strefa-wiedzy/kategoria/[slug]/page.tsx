import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import OkladkaArtykulu from "@/components/OkladkaArtykulu";
import {
  categories,
  getCategoryBySlug,
  getAllCategorySlugs,
} from "@/lib/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name}, Strefa wiedzy | Fluxlab`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "pl_PL",
      type: "website",
    },
    alternates: {
      canonical: `/strefa-wiedzy/kategoria/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: category.name },
          ]}
        />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Strefa wiedzy</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              {category.wstep?.map((akapit) => (
                <p
                  key={akapit}
                  className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-3xl"
                >
                  {akapit}
                </p>
              ))}
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {category.articles.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="block overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                  >
                    <OkladkaArtykulu
                      tytul={article.title}
                      src={
                        article.bezOkladki
                          ? undefined
                          : `/okladki/${article.href.split("/").pop()}.webp`
                      }
                    />
                    <div className="p-4">
                      <h2 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-1">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {article.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back link + Other categories */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-6">
                Pozostałe kategorie
              </h2>
              <div className="flex flex-wrap gap-3 mb-10">
                {categories
                  .filter((c) => c.slug !== slug)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/strefa-wiedzy/kategoria/${c.slug}`}
                      className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
              </div>
              <Link
                href="/strefa-wiedzy"
                className="text-accent hover:underline text-sm font-medium"
              >
                &larr; Wszystkie artykuły
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
