import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";
import AudytCRM from "./AudytCRM";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Audyt CRM, darmowa checklista online | Fluxlab",
  description:
    "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji.",
  openGraph: {
    title: "Audyt CRM, darmowa checklista online | Fluxlab",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji.",
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
    canonical: "/audyt-crm",
  },
};

const faqs = [
  {
    question: "Co dokładnie liczy ten audyt?",
    answer:
      "10 fundamentów pipeline'u: źródła leadów, routing, etapy, zadania, follow-up, raporty, ręczne przepisywanie, jakość danych, duplikaty i integracje. Każdy to jedno pytanie tak/nie.",
  },
  {
    question: "Dlaczego „nie wiemy” liczy się jak „nie”?",
    answer:
      "Jeśli nie wiesz, czy coś działa, to nikt tego nie pilnuje. Brak widoczności jest sam w sobie problemem.",
  },
  {
    question: "Dlaczego pytania o duplikaty i przepisywanie są odwrócone?",
    answer:
      "Bo tam „tak” oznacza problem. Ręczne przepisywanie to brak integracji, duplikaty to brak deduplikacji.",
  },
  {
    question: "Czy ten audyt zastępuje konsultację?",
    answer:
      "Nie. Wskazuje najsłabszy obszar. Konkretny plan, koszt i kolejność wdrożeń ustalamy w 30-minutowej diagnozie.",
  },
];

export default function AudytCRMPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/audyt-crm" kolumna="srodek"
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "Audyt CRM" },
          ]}
        />

        {/* Hero, kompaktowy */}
        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="h1-strony">
              Audyt CRM: czy Twój pipeline nadaje się do automatyzacji?
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              10 pytań tak/nie, wynik i obszar do automatyzacji. Bez
              rejestracji, w 3 minuty.
            </p>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje narzędzia audytu CRM"
            tabs={[
              {
                label: "Audyt",
                content: (
                  <div className="py-6 lg:py-8">
                    <NazwaNarzedzia href="/audyt-crm" />
                    <AudytCRM />
                  </div>
                ),
              },
              {
                label: "Jak interpretujemy wynik",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-6">
                        Jak interpretujemy wynik
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>8 do 10, zdrowy pipeline.</strong>{" "}
                            Automatyzacja przyspieszy reakcję i odciąży zespół.
                          </li>
                          <li>
                            <strong>5 do 7, fundament z lukami.</strong>{" "}
                            Najpierw załataj największą lukę, którą wskazuje
                            audyt.
                          </li>
                          <li>
                            <strong>0 do 4, problem jest w procesie.</strong>{" "}
                            Zacznij od podstaw: właściciel leada, etapy, źródło.
                          </li>
                        </ul>
                        <p>
                          Do wyniku dostajesz jeden obszar z największym
                          potencjałem i 2-3 pierwsze kroki.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-8">
                        Najczęstsze pytania
                      </h2>
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <details
                            key={faq.question}
                            className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                          >
                            <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                              {faq.question}
                              <svg
                                className="shrink-0 ml-4 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M10 4v12M4 10h12"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Powiązane treści",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-8">
                        Powiązane treści
                      </h2>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          {
                            href: "/automatyzacja-leadow-crm",
                            title: "Automatyzacja leadów i CRM",
                            description:
                              "Co automatyzujemy w pierwszym etapie.",
                          },
                          {
                            href: "/koszt-recznej-obslugi-leadow",
                            title: "Koszt ręcznej obsługi leadów",
                            description:
                              "Ile miesięcznie kosztuje ręczna praca.",
                          },
                          {
                            href: "/narzedzia",
                            title: "Wszystkie narzędzia",
                            description:
                              "Darmowe kalkulatory, bez rejestracji.",
                          },
                        ].map((article) => (
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
                  </div>
                ),
              },
            ]}
          />
        </div>
        <CTA />

      </main>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Audyt CRM, checklist online",
            url: "https://fluxlab.pl/audyt-crm",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Audyt CRM w 10 pytaniach tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
