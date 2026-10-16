import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import SzybkiKontakt from "@/components/SzybkiKontakt";
import OsCzasuStrony from "@/components/OsCzasuStrony";
import Tabs from "@/components/Tabs";
import ProductGrid from "@/components/ProductGrid";
import CoZeStrona from "@/components/CoZeStrona";

export const metadata: Metadata = {
  title: "Tworzenie stron WWW i poprawki w obecnych | Fluxlab",
  description:
    "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI w treści, obrazach i kodzie. Hosting w cenie wdrożenia. Pierwsza wersja w 2-3 tygodnie.",
  alternates: { canonical: "/strony-www" },
  openGraph: {
    title: "Tworzenie stron WWW i poprawki w obecnych | Fluxlab",
    description: "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI.",
    locale: "pl_PL",
    type: "website",
  },
};

const offer = [
  "Nowa strona od zera albo poprawki w istniejącej.",
  "Next.js + Tailwind, mobile-first, Web Vitals 90+.",
  "Treści i grafiki z AI.",
  "Hosting i deployment w cenie wdrożenia.",
];

const pricing = [
  {
    title: "Poprawki i nowe podstrony",
    price: "od 99 zł",
    description: "Zmiana w istniejącej stronie albo nowa podstrona.",
  },
  {
    title: "Landing do 5 podstron",
    price: "od 4 500 zł",
    description: "Formularz prosto do CRM albo skrzynki, z pomiarem źródła zapytań.",
    accent: true,
  },
  {
    title: "Strona firmowa z CMS",
    price: "od 9 000 zł",
    description: "Strona w Next.js z panelem do edycji treści i audytem przed startem. Sklep z integracją od 15 000 zł.",
  },
];

const faq = [
  {
    question: "Ile czasu zajmuje wdrożenie?",
    answer:
      "Poprawka: zwykle ten sam lub następny dzień. Landing: 3-5 dni roboczych. Strona firmowa: 2-3 tygodnie.",
  },
  {
    question: "Czy możemy modyfikować treści samodzielnie?",
    answer:
      "Tak. Strona firmowa dostaje prosty CMS, w którym edytujecie teksty jak dokument.",
  },
  {
    question: "Hosting i domena?",
    answer:
      "Hosting jest w cenie wdrożenia. Domenę kupujecie na siebie (50-150 zł/rok), konfigurację robimy my.",
  },
];

export default function StronyWww() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/strony-www" items={[{ label: "Strony WWW" }]} />

        {/* Hero, kompaktowy */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-24 pb-12 overflow-hidden"
        >
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="blob blob-accent w-[520px] h-[520px] -top-32 -left-32 animate-drift" />
          </div>
          <div className="container-wide max-w-3xl mx-auto">
            <div>
              <p className="section-label mb-4 animate-fade-up-1">Usługa</p>
              <h1
                id="hero-heading"
                className="h1-strony mb-6 animate-fade-up-2"
              >
                Strony internetowe dla firm
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up-3">
                Nowa strona od zera albo poprawki w istniejącej. Pierwsza wersja
                w 2-3 tygodnie.
              </p>
              <div className="animate-fade-up-4">
                <SzybkiKontakt
                  formId="strony_www"
                  temat="Strona internetowa"
                  podpowiedz="Nowa strona czy poprawki?"
                />
                <a
                  href="#poprawiac-czy-budowac"
                  className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
                >
                  Sprawdźcie, poprawiać czy budować od nowa ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-12 max-w-5xl">
          <div className="grid gap-5 md:grid-cols-[2fr_3fr]">
            <Link
              href="/realizacje"
              className="group rounded-2xl border border-accent/40 bg-white/60 dark:bg-gray-900/40 p-6 hover:border-accent transition-colors"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Ostatnia realizacja: strona pośrednika kredytowego
              </p>
              <p className="mt-3 text-4xl font-bold text-accent">45 → 97</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                punktów w audycie technicznym, strona 6,4 raza lżejsza
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent group-hover:underline">
                Zobaczcie realizacje →
              </span>
            </Link>
            <OsCzasuStrony />
          </div>
        </section>

        <section className="container-wide pb-16">
          <CoZeStrona biezacaStrona="/strony-www" />
        </section>

        <section className="container-wide pb-16">
          <ProductGrid category="www" showHeading />
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje oferty stron WWW"
            tabs={[
              {
                label: "Co oferujemy",
                content: (
                  <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-8">
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
                    <p className="mt-8 max-w-2xl text-gray-600 dark:text-gray-400">
                      Przenosicie stronę? Najpierw zróbcie{" "}
                      <Link
                        href="/audyt-poczty"
                        className="text-accent hover:underline"
                      >
                        audyt poczty firmowej
                      </Link>
                      , żeby nie stracić maili na tej samej domenie.
                    </p>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-10">
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
                    <p className="mt-6 max-w-3xl text-sm text-gray-600 dark:text-gray-400">
                      Macie już stronę i chcecie, żeby zaczęła zbierać zapytania?
                      Pakiet START: porządki po audycie, tytuły dla Google, zbieranie
                      opinii, wizytówka Google przez 3 miesiące i 2 landingi za
                      3 900 zł netto, z opieką 590 zł miesięcznie.
                    </p>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-8">
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
                              className="shrink-0 w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
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
                      intro="Napiszcie, jakiej strony potrzebujecie. Odpowiemy w ciągu 24h."
                      submitLabel="Zamawiam diagnozę"
                    />
                  </div>
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
                name: "Landing do 5 podstron",
                price: "4500",
                priceCurrency: "PLN",
                description:
                  "Do 5 podstron, formularz do CRM albo skrzynki, pomiar źródła zapytań.",
              },
              {
                "@type": "Offer",
                name: "Strona firmowa z CMS",
                price: "9000",
                priceCurrency: "PLN",
                description:
                  "Strona w Next.js z panelem do edycji treści, SEO i audytem przed startem.",
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
