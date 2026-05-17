import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title:
    "Automatyzacja Salesforce – zaawansowane integracje i custom development | Fluxlab",
  description:
    "Projektuję i wdrażam zaawansowane automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i eliminacja ręcznej pracy zespołu sprzedaży.",
  openGraph: {
    title:
      "Automatyzacja Salesforce – zaawansowane integracje i custom development | Fluxlab",
    description:
      "Projektuję i wdrażam zaawansowane automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i eliminacja ręcznej pracy zespołu sprzedaży.",
    locale: "pl_PL",
    type: "article",
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
    canonical: "/automatyzacja-salesforce",
  },
};

const offer = [
  {
    title: "Automatyzacja procesu sprzedaży",
    desc: "Leady, przypisania, Opportunity i follow-upy odpalają się same — z kontrolą wymaganych danych na każdym etapie.",
  },
  {
    title: "Integracje przez Salesforce API",
    desc: "ERP, księgowość, e-commerce, hurtownie danych i aplikacje customowe spięte w czasie rzeczywistym. Bez wysp danych.",
  },
  {
    title: "Logika w Apex i Flow",
    desc: "Walidacje, wyliczenia, triggery i Platform Events — CRM zaczyna pilnować procesów za zespół.",
  },
  {
    title: "Raporty i hurtownia danych",
    desc: "Dedykowane dashboardy dla zarządu, analizy konwersji i raporty mailem zamiast ograniczonych raportów standardowych.",
  },
];

export default function AutomatyzacjaSalesforce() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja Salesforce" }]} />

        {/* Hero — kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-cyan -top-32 -right-24 w-[420px] h-[420px]" />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 bg-[#00a1e0]/10 dark:bg-[#00a1e0]/15 px-4 py-2 rounded-full mb-6">
                <Image
                  src="/photos/Salesforce.com_logo.svg.png"
                  alt="Salesforce"
                  width={88}
                  height={20}
                  className="h-5 w-auto"
                />
              </div>
              <h1 className="display-lg text-gray-900 dark:text-white mb-6">
                Salesforce wykorzystany w 100%
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
                Większość firm używa 30–40% możliwości platformy. Przewaga
                zaczyna się tam, gdzie kończy się konfiguracja w GUI.
              </p>
              <a href="#sekcje" className="btn-primary px-8 py-3.5 text-base">
                Sprawdźmy proces
              </a>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji Salesforce"
            tabs={[
              {
                label: "Co automatyzuję",
                content: (
                  <section className="py-10 lg:py-12">
                    <h2 className="display-xl text-gray-900 dark:text-white mb-12 max-w-2xl">
                      Co automatyzuję
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
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
                      intro="Opisz krótko, jak dziś wygląda obsługa leadów i deali: jakie dane wchodzą, gdzie się gubią, co handlowcy klikają ręcznie. Dostaniesz informację, czy automatyzacja ma sens i co da największy efekt."
                      submitLabel="Chcę diagnozę procesu Salesforce"
                    />
                  </section>
                ),
              },
            ]}
          />
        </div>
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
              "Projektuję i wdrażam zaawansowane automatyzacje Salesforce: integracje przez API, logika w Apex i Flow, webhooki, hurtownie danych i eliminacja ręcznej pracy zespołu sprzedaży.",
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
