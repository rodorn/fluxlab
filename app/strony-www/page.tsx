import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Tworzenie stron WWW i poprawki w obecnych — Fluxlab",
  description:
    "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI w treści, obrazach i kodzie. Hosting w cenie wdrożenia. Pierwsza wersja w 2-3 tygodnie.",
  alternates: { canonical: "/strony-www" },
  openGraph: {
    title: "Tworzenie stron WWW i poprawki w obecnych — Fluxlab",
    description: "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI.",
    locale: "pl_PL",
    type: "website",
  },
};

const offer = [
  "Nowa strona od zera albo poprawki w istniejącej.",
  "Next.js + Tailwind, mobile-first, Web Vitals 90+.",
  "Treści i grafiki z AI — żebyś nie pisał ich miesiącami.",
  "Hosting i deployment w cenie wdrożenia.",
];

const pricing = [
  {
    title: "Diagnoza",
    price: "0 zł",
    description: "Rozmowa: czy warto, co i jak. Bez wciskania.",
  },
  {
    title: "Landing page",
    price: "od 2 500 zł",
    description: "Jedna strona pod cel, z formularzem i deploymentem.",
    accent: true,
  },
  {
    title: "Strona firmowa",
    price: "od 4 500 zł",
    description: "5+ podstron, blog, CMS do samodzielnej edycji.",
  },
];

const faq = [
  {
    question: "Ile czasu zajmuje wdrożenie?",
    answer:
      "Landing page: 2-3 tygodnie. Strona firmowa z 5+ podstronami: 3-5 tygodni. Czas zależy głównie od tego, jak szybko dostaję treści i decyzje po Twojej stronie.",
  },
  {
    question: "Czy mogę modyfikować treści samodzielnie?",
    answer:
      "Tak. Dla strony firmowej podpinam prosty CMS (Sanity albo Notion) — edytujesz teksty jak dokument. Dla landing page-a treści edytujesz przez interfejs GitHuba.",
  },
  {
    question: "Hosting i domena?",
    answer:
      "Hosting w cenie wdrożenia — Vercel ma darmowy plan wystarczający dla większości stron. Domenę kupujesz na siebie (50-150 zł/rok), pomagam z konfiguracją.",
  },
];

export default function StronyWww() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Strony WWW" }]} />

        {/* Hero — kompaktowy */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-24 pb-12 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="blob blob-accent w-[520px] h-[520px] -top-32 -left-32 animate-drift" />
            <div className="blob blob-violet w-[480px] h-[480px] top-20 -right-24 animate-drift-slow" />
          </div>
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up-1">
                Strony WWW · Fluxlab
              </p>
              <h1
                id="hero-heading"
                className="display-xl text-gray-900 dark:text-white mb-6 animate-fade-up-2"
              >
                Strona, która działa — szybko, mobilnie, z AI.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up-3">
                Nowa strona od zera albo poprawki w istniejącej. Pierwsza wersja
                w 2-3 tygodnie.
              </p>
              <div className="animate-fade-up-4">
                <TrackedCTA
                  href="#sekcje"
                  location="strony_www_hero"
                  className="btn-primary"
                >
                  Zamów bezpłatną diagnozę
                </TrackedCTA>
              </div>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty stron WWW"
            tabs={[
              {
                label: "Co oferuję",
                content: (
                  <div className="py-10 lg:py-12">
                    <p className="section-label mb-3">Co oferuję</p>
                    <h2 className="display-lg text-gray-900 dark:text-white mb-8">
                      Krótko i konkretnie
                    </h2>
                    <ul className="space-y-4 max-w-2xl">
                      {offer.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-lg text-gray-700 dark:text-gray-300"
                        >
                          <svg
                            className="flex-shrink-0 mt-1.5 text-accent"
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 8l3.5 3.5L13 5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-10 lg:py-12">
                    <p className="section-label mb-3">Cennik</p>
                    <h2 className="display-lg text-gray-900 dark:text-white mb-10">
                      Trzy ścieżki
                    </h2>
                    <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
                      {pricing.map((track) => (
                        <div
                          key={track.title}
                          className={`card-lift flex flex-col bg-white dark:bg-gray-800/60 border rounded-2xl p-7 ${
                            track.accent
                              ? "border-accent shadow-lg shadow-accent/10 ring-1 ring-accent/30"
                              : "border-gray-100 dark:border-gray-700"
                          }`}
                        >
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {track.title}
                          </h3>
                          <p className="text-3xl font-bold text-accent mb-4">
                            {track.price}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {track.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <p className="section-label mb-3">FAQ</p>
                    <h2 className="display-lg text-gray-900 dark:text-white mb-8">
                      Najczęstsze pytania
                    </h2>
                    <div className="space-y-4 max-w-3xl">
                      {faq.map((item, idx) => (
                        <details
                          key={idx}
                          className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                        >
                          <summary className="flex items-center justify-between gap-4 cursor-pointer p-6 text-sm font-semibold text-gray-900 dark:text-white select-none [&::-webkit-details-marker]:hidden list-none">
                            {item.question}
                            <svg
                              className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
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
                            {item.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                label: "Diagnoza",
                content: (
                  <div id="diagnoza" className="scroll-mt-20 py-10 lg:py-12">
                    <h2 className="sr-only">Bezpłatna diagnoza strony WWW</h2>
                    <LandingForm
                      formId="diagnosis_web"
                      heading="Bezpłatna diagnoza strony WWW"
                      intro="Krótko opisz, jakiej strony potrzebujesz albo co Cię uwiera w obecnej. Wrócę w ciągu 24h z kolejnym krokiem."
                      submitLabel="Zamów diagnozę"
                    />
                  </div>
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
            name: "Tworzenie stron WWW",
            description:
              "Tworzenie nowych stron WWW i poprawki w obecnych. Next.js, Tailwind, mobile-first, AI w treści i obrazach. Pierwsza wersja w 2-3 tygodnie.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Tworzenie stron internetowych",
            url: "https://fluxlab.pl/strony-www",
            offers: [
              {
                "@type": "Offer",
                name: "Diagnoza",
                price: "0",
                priceCurrency: "PLN",
                description:
                  "Bezpłatna rozmowa diagnostyczna: czy warto, co i jak.",
              },
              {
                "@type": "Offer",
                name: "Landing page",
                price: "2500",
                priceCurrency: "PLN",
                description:
                  "Jedna strona z formularzem, deployment, podstawowy SEO.",
              },
              {
                "@type": "Offer",
                name: "Strona firmowa",
                price: "4500",
                priceCurrency: "PLN",
                description:
                  "5+ podstron, CMS, blog, deployment, SEO i schema.",
              },
            ],
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
