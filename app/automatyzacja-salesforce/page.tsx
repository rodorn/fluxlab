import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja Salesforce, integracje i rozbudowa | Fluxlab",
  description:
    "Projektujemy i wdrażamy automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i koniec ręcznej pracy.",
  openGraph: {
    title: "Automatyzacja Salesforce, integracje i rozbudowa | Fluxlab",
    description:
      "Projektujemy i wdrażamy automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i koniec ręcznej pracy.",
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
    canonical: "/automatyzacja-salesforce",
  },
};

const offer = [
  {
    title: "Proces sprzedaży",
    desc: "Leady, przypisania i follow-upy odpalają się same, z kontrolą wymaganych danych.",
  },
  {
    title: "Integracje przez API",
    desc: "ERP, księgowość i e-commerce spięte z Salesforce w czasie rzeczywistym.",
  },
  {
    title: "Apex, Flow i raporty",
    desc: "Walidacje, triggery i dashboardy dla zarządu zamiast ręcznej pracy.",
  },
];

export default function AutomatyzacjaSalesforce() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-salesforce" items={[{ label: "Automatyzacja Salesforce" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -top-32 -right-24 w-[420px] h-[420px]" />
          <div className="container-wide max-w-3xl mx-auto relative">
            <div>
              <p className="section-label mb-5">Usługa</p>
              <h1 className="h1-strony mb-6">
                Salesforce wykorzystany w 100%
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
                Większość firm używa małej części platformy. Automatyzujemy to, czego
                nie da się wyklikać w GUI.
              </p>
              <a href="#sekcje" className="btn-primary">
                Sprawdźmy proces
              </a>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji Salesforce"
            tabs={[
              {
                label: "Co automatyzujemy",
                content: (
                  <section className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-12 max-w-2xl">
                      Co automatyzujemy
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-6 max-w-5xl">
                      {offer.map((item) => (
                        <div
                          key={item.title}
                          className="card-lift bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                ),
              },
              {
                label: "Diagnoza",
                content: (
                  <section
                    id="diagnoza"
                    className="scroll-mt-20 py-10 lg:py-12"
                  >
                    <LandingForm
                      formId="diagnosis_salesforce"
                      heading="Sprawdźmy Twój proces w Salesforce"
                      intro="Napisz, gdzie gubią się dane i co handlowcy klikają ręcznie. Odpowiemy, co da największy efekt."
                      submitLabel="Chcemy diagnozę procesu Salesforce"
                    />
                  </section>
                ),
              },
            ]}
          />
        </div>
      <CTA />
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja Salesforce",
            description:
              "Projektujemy i wdrażamy automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i koniec ręcznej pracy.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-salesforce",
          }),
        }}
      />

      <Footer />
    </>
  );
}
