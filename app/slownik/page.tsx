import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import SlownikLista from "@/components/SlownikLista";
import { SLOWNIK } from "@/lib/slownik";

const OPIS =
  "KSeF, FA(3), e-Doręczenia, CRM, webhook, DMARC i inne pojęcia z faktur, sprzedaży i automatyzacji wyjaśnione w dwóch zdaniach, z linkiem do narzędzia.";

export const metadata: Metadata = {
  title: "Słownik pojęć: KSeF, CRM, automatyzacja | Fluxlab",
  description:
    "KSeF, FA(3), e-Doręczenia, CRM, webhook, DMARC i inne pojęcia z faktur, sprzedaży i automatyzacji wyjaśnione w dwóch zdaniach, z linkiem do narzędzia.",
  alternates: { canonical: "/slownik" },
  openGraph: {
    title: "Słownik pojęć: KSeF, CRM, automatyzacja | Fluxlab",
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, słownik pojęć",
      },
    ],
  },
};

export default function SlownikPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/slownik"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Słownik pojęć" },
          ]}
        />
        <section className="container-wide max-w-3xl pt-12 pb-20 lg:pt-20">
          <div className="text-center">
            <p className="section-label mb-3">Strefa wiedzy</p>
            <h1 className="h1-strony">Słownik pojęć</h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">
              Pojęcia z faktur, sprzedaży i automatyzacji, każde w dwóch
              zdaniach i bez żargonu.
            </p>
          </div>
          <div className="mt-10">
            <SlownikLista />
          </div>
        </section>
        <CTA />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTermSet",
            name: "Słownik pojęć Fluxlab",
            url: "https://fluxlab.pl/slownik",
            hasDefinedTerm: SLOWNIK.map((h) => ({
              "@type": "DefinedTerm",
              name: h.haslo,
              description: h.opis,
              url: `https://fluxlab.pl/slownik#${h.slug}`,
            })),
          }),
        }}
      />
      <Footer />
    </>
  );
}
