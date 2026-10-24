import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import BlogDzial from "@/components/BlogDzial";
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
        <Breadcrumbs
          href="/strefa-wiedzy"
          items={[{ label: "Strefa wiedzy" }]}
        />
        {/* Hero, kompaktowy */}
        <section className="pt-6 pb-6">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">Wiedza</p>
              <h1 className="h1-strony">
                Automatyzacja CRM i AI
              </h1>
              <p className="hero-lead">
                Od{" "}
                <Link
                  href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                  className="text-accent hover:underline"
                >
                  CRM
                </Link>{" "}
                i{" "}
                <Link
                  href="/strefa-wiedzy/ai-w-automatyzacji-firm"
                  className="text-accent hover:underline"
                >
                  AI
                </Link>{" "}
                po{" "}
                <Link
                  href="/mail-firmowy"
                  className="text-accent hover:underline"
                >
                  pocztę firmową
                </Link>{" "}
                i{" "}
                <Link
                  href="/audyt-google-ads"
                  className="text-accent hover:underline"
                >
                  Google Ads
                </Link>
                .
              </p>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                Nie znasz jakiegoś pojęcia? Zajrzyj do{" "}
                <Link
                  href="/slownik"
                  className="font-semibold text-accent hover:underline"
                >
                  słownika
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Spis treści: kategorie jako działy */}
        <div className="container-wide py-6 lg:py-8">
          <nav aria-label="Działy strefy wiedzy" className="mb-10 lg:mb-14">
            <ol className="flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0 text-sm">
              {categories.map((c, i) => (
                <li key={c.slug}>
                  <a href={`#${c.slug}`} className="text-gray-700 dark:text-gray-300 hover:text-accent">
                    <span className="tabular-nums text-gray-400 dark:text-gray-500 mr-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          {categories.map((category, i) => (
            <BlogDzial key={category.slug} category={category} numer={i + 1} />
          ))}
        </div>

        <CTA
          naglowek="Porozmawiajmy o automatyzacji w Twojej firmie"
          opis="Bezpłatna diagnoza, bez zobowiązań."
        />
      </main>
      <Footer />
    </>
  );
}
