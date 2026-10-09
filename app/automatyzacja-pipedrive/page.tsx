import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import Tabs from "@/components/Tabs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automatyzacja Pipedrive, 100% z CRM | Fluxlab",
  description:
    "Automatyzacje oparte o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i koniec ręcznej pracy.",
  openGraph: {
    title: "Automatyzacja Pipedrive, 100% z CRM | Fluxlab",
    description:
      "Automatyzacje oparte o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i koniec ręcznej pracy.",
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
    canonical: "/automatyzacja-pipedrive",
  },
};

const offer = [
  {
    title: "Automatyczna obsługa leadów",
    desc: "Lead trafia od razu do właściwego handlowca z dealem i pierwszym zadaniem.",
  },
  {
    title: "Integracje przez API",
    desc: "Formularze, ERP, księgowość i call center spięte z Pipedrive, bez duplikatów.",
  },
  {
    title: "Logika biznesowa i webhooki",
    desc: "Zmiany etapów i follow-upy uruchamiają się same, w czasie rzeczywistym.",
  },
  {
    title: "Raporty i czysta baza",
    desc: "Dashboardy, raporty mailem i czyszczenie danych zamiast Excela.",
  },
];

export default function AutomatyzacjaPipedrive() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/automatyzacja-pipedrive" items={[{ label: "Automatyzacja Pipedrive" }]} />

        {/* Hero, kompaktowy */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -top-32 -right-24 w-[420px] h-[420px]" />
          <div className="container-wide max-w-3xl mx-auto relative">
            <div>
              <p className="section-label mb-5">Usługa</p>
              <h1 className="h1-strony mb-6">
                Wykorzystaj Pipedrive w 100%
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl">
                Większość firm używa Pipedrive jak notatnika. Automatyzacje
                robią z niego silnik sprzedaży.
              </p>
              <a href="#sekcje" className="btn-primary">
                Sprawdźmy proces
              </a>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty automatyzacji Pipedrive"
            tabs={[
              {
                label: "Co automatyzujemy",
                content: (
                  <section className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-12 max-w-2xl">
                      Co automatyzujemy
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
                    <p className="mt-8 max-w-3xl text-gray-500 dark:text-gray-400 leading-relaxed">
                      Zwykle zaczynamy od dwóch rzeczy:{" "}
                      <Link
                        href="/automatyzacja-follow-up"
                        className="text-accent hover:underline"
                      >
                        follow-upy po ofercie
                      </Link>
                      {" "}i{" "}
                      <Link
                        href="/czas-reakcji-na-leada"
                        className="text-accent hover:underline"
                      >
                        czas reakcji na nowego leada
                      </Link>
                      .
                    </p>
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
                      formId="diagnosis_pipedrive"
                      heading="Sprawdźmy Twój proces w Pipedrive"
                      intro="Opisz, skąd przychodzą leady, kto je obsługuje i gdzie jest ręczna praca. Odpiszemy, co da największy efekt."
                      submitLabel="Chcemy diagnozę procesu Pipedrive"
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
            name: "Automatyzacja Pipedrive",
            description:
              "Automatyzacje oparte o Pipedrive API, webhooki i integracje systemowe. Obsługa leadów, synchronizacja danych, raporty i koniec ręcznej pracy.",
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
