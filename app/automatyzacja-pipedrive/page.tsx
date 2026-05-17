import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Automatyzacja Pipedrive – jak wycisnąć 100% z CRM | Fluxlab",
  description:
    "Tworzę zaawansowane automatyzacje w oparciu o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i eliminacja ręcznej pracy handlowców.",
  openGraph: {
    title: "Automatyzacja Pipedrive – jak wycisnąć 100% z CRM | Fluxlab",
    description:
      "Tworzę zaawansowane automatyzacje w oparciu o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i eliminacja ręcznej pracy handlowców.",
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
    canonical: "/automatyzacja-pipedrive",
  },
};

const offer = [
  {
    title: "Automatyczna obsługa leadów",
    desc: "Lead trafia od razu do właściwego handlowca z deal'em, etapem i pierwszym zadaniem. Żaden lead nie ginie.",
  },
  {
    title: "Integracje przez API",
    desc: "Formularze, ERP, księgowość, call center i własne bazy spięte z Pipedrive. Bez duplikatów, bez przepisywania.",
  },
  {
    title: "Logika biznesowa i webhooki",
    desc: "Zmiana etapów, follow-upy i procesy backendowe odpalają się same — w czasie rzeczywistym, nie w kolejnym cronie.",
  },
  {
    title: "Raporty i czysta baza",
    desc: "Dedykowane dashboardy, raporty mailem i automatyczne czyszczenie danych zamiast Excela.",
  },
];

export default function AutomatyzacjaPipedrive() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja Pipedrive" }]} />

        {/* Hero */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="blob blob-accent -top-32 -right-24 w-[420px] h-[420px]" />
          <div className="container-wide relative">
            <div className="max-w-3xl">
              <p className="section-label mb-5">Pipedrive CRM</p>
              <h1 className="display-lg text-gray-900 dark:text-white mb-6">
                Wyciśnij 100% z Pipedrive
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
                Większość firm używa Pipedrive jak notatnika. Z dobrymi
                automatyzacjami staje się silnikiem sprzedaży.
              </p>
              <a href="#diagnoza" className="btn-primary px-8 py-3.5 text-base">
                Sprawdźmy proces
              </a>
            </div>
          </div>
        </section>

        {/* Oferta */}
        <section className="py-20 lg:py-28 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
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
          </div>
        </section>

        {/* Form — diagnoza */}
        <section
          id="diagnoza"
          className="scroll-mt-20 py-20 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="container-wide">
            <LandingForm
              formId="diagnosis_pipedrive"
              heading="Sprawdźmy Twój proces w Pipedrive"
              intro="Opisz krótko, jak dziś wygląda obsługa leadów i deali: skąd wpadają, kto je obsługuje, gdzie pojawia się ręczna praca. Dostaniesz informację, czy automatyzacja ma sens i co da największy efekt."
              submitLabel="Chcę diagnozę procesu Pipedrive"
            />
          </div>
        </section>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja Pipedrive",
            description:
              "Tworzę zaawansowane automatyzacje w oparciu o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i eliminacja ręcznej pracy handlowców.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Automatyzacja procesów biznesowych",
            url: "https://fluxlab.pl/automatyzacja-pipedrive",
          }),
        }}
      />

      <Footer />
    </>
  );
}
