import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
  description:
    "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
  openGraph: {
    title: "Jak uporządkować proces sprzedaży w CRM | Fluxlab",
    description:
      "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
    locale: "pl_PL",
    type: "article",
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
    canonical: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
  },
};

export default function JakUporzadkowacProcesSprzedazyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Jak uporządkować proces sprzedaży w CRM" },
          ]}
        />
        {/* Kompaktowy nagłówek */}
        <section className="pt-24 pb-10">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak uporządkować proces sprzedaży w CRM
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Problemy z CRM rzadko wynikają z narzędzia. Częściej z procesu,
              którego nikt nie opisał.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <div className="max-w-3xl mx-auto space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Etapy z kryteriami przejścia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Lepiej mniej etapów, ale z jasnym warunkiem wejścia, obowiązkowymi
                danymi, kolejnym ruchem i osobą odpowiedzialną. Jeśli nie wiesz, po
                czym poznać przejście z etapu A do B, proces jest uznaniowy.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Jakość danych, potem automatyzacja
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Pola obowiązkowe i proste reguły sprawiają, że{" "}
                <Link href="/automatyzacja-raportowania" className="text-accent hover:underline">
                  raportowanie
                </Link>{" "}
                ma sens. Dopiero wtedy{" "}
                <Link href="/automatyzacja-leadow-crm" className="text-accent hover:underline">
                  automatyzacja CRM
                </Link>{" "}
                tworzy zadania, przypomina o follow-upie i pilnuje braków.
              </p>
            </section>
            <div className="rounded-2xl bg-accent/10 p-8 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Chcesz uporządkować proces przed automatyzacją?
              </p>
              <Link href="/automatyzacja-leadow-crm" className="btn-primary mt-6 inline-block">
                Zobacz usługę Automatyzacja CRM
              </Link>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="max-w-3xl mx-auto mt-16">
            <PrevNextArticle currentHref="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm" />
          </div>
        </div>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Jak uporządkować proces sprzedaży w CRM",
            description:
              "Jak uporządkować proces sprzedaży w CRM: etapy, kryteria przejścia, pola obowiązkowe, follow-up i raportowanie.",
            datePublished: "2026-03-30",
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
          }),
        }}
      />
    </>
  );
}
