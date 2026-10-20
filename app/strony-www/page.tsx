import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import OsCzasuStrony from "@/components/OsCzasuStrony";
import KonfiguratorStrony from "@/components/KonfiguratorStrony";
import GeneratorHasla from "@/components/GeneratorHasla";
import WyscigStron from "@/components/WyscigStron";
import MakietaStrony from "@/components/MakietaStrony";

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
    images: ["/og?t=Tworzenie%20stron%20WWW%20i%20poprawki%20w%20obecnych%20%7C%20Fluxlab"],
  },
};

const pricing = [
  {
    title: "Poprawki i nowe podstrony",
    price: "od 150 zł",
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
      "Tak. Strona firmowa dostaje prosty CMS, w którym edytujesz teksty jak dokument.",
  },
  {
    question: "Hosting i domena?",
    answer:
      "Hosting jest w cenie wdrożenia. Domenę kupujesz na siebie (50-150 zł/rok), konfigurację robimy my.",
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
          <div className="container-wide">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label mb-3 animate-fade-up-1">Usługa</p>
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
              <div className="animate-fade-up-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href="#kontakt" className="btn-primary">
                  Napisz do nas
                </a>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Odpisujemy tego samego dnia, z ceną i terminem.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide pb-12">
          <div className="grid gap-5 md:grid-cols-[2fr_3fr]">
            <Link
              href="/realizacje"
              className="group rounded-2xl border border-accent/40 bg-white/60 dark:bg-gray-900/40 p-6 hover:border-accent transition-colors"
            >
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Ostatnia realizacja: strona FINREAL, pośrednika kredytowego
              </p>
              <p className="mt-3 text-4xl font-bold text-accent">45 → 97</p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                punktów w audycie technicznym, strona 6,4 raza lżejsza
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent group-hover:underline">
                Zobacz realizacje →
              </span>
            </Link>
            <OsCzasuStrony />
          </div>
        </section>

        <KonfiguratorStrony />

        <GeneratorHasla />

        <MakietaStrony />

        <WyscigStron />

        <section id="cennik" className="scroll-mt-20 container-wide">
          <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-10 text-center">
                      Ceny
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
                    <p className="mt-6 mx-auto max-w-3xl text-center text-sm text-gray-600 dark:text-gray-400">
                      Masz już stronę i chcesz, żeby zaczęła zbierać zapytania?
                      Pakiet START: porządki po audycie, tytuły dla Google, zbieranie
                      opinii, wizytówka Google przez 3 miesiące i 2 landingi za
                      3 900 zł netto, z opieką 590 zł miesięcznie.
                    </p>
                  </div>
        </section>

        <section className="container-wide pb-12">
          <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-8 text-center">
                      Najczęstsze pytania
                    </h2>
                    <div className="space-y-4 mx-auto max-w-3xl">
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
        </section>

        <section
          id="kontakt"
          className="scroll-mt-20 container-wide pb-20"
        >
          <LandingForm
            formId="diagnosis_web"
            heading="Napisz, jakiej strony potrzebujesz"
            intro="Odpiszemy z ceną i terminem, tego samego dnia."
            submitLabel="Wyślij"
          />
        </section>
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
