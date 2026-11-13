import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import OsCzasuStrony from "@/components/OsCzasuStrony";
import KonfiguratorStrony from "@/components/KonfiguratorStrony";
import GeneratorHasla from "@/components/GeneratorHasla";
import PoleAudytu from "@/components/PoleAudytu";
import WyscigStron from "@/components/WyscigStron";
import MakietaStrony from "@/components/MakietaStrony";
import TasmaEtapow from "@/components/TasmaEtapow";
import TabelaCennika from "@/components/TabelaCennika";
import DlaZakupow from "@/components/DlaZakupow";

export const metadata: Metadata = {
  title: "Tworzenie stron WWW i poprawki w obecnych | Fluxlab",
  description:
    "Nowa strona albo poprawki w obecnej. Szybko, mobilnie, z AI. Hosting w cenie wdrożenia. Landing page od 790 zł, strona w tydzień 2 900 zł.",
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
    title: "Landing page",
    price: "od 790 zł",
    description: "Jedna podstrona, formularz podpięty do CRM, hosting w cenie wdrożenia.",
  },
  {
    title: "Naprawa i poprawki",
    price: "150 / 290 / 490 zł",
    description: "Jedna rzecz: szybkość, formularz, certyfikat albo błąd. Przez Useme płacisz dopiero po sprawdzeniu efektu.",
  },
  {
    title: "Strona w tydzień",
    price: "2 900 zł",
    description: "Do 5 podstron, formularz, kalendarz spotkań. Gotowa w 7 dni, płatność przez Useme albo fakturą z góry.",
    accent: true,
  },
  {
    title: "Strona firmowa z CMS",
    price: "5 900 zł",
    description: "Do 15 podstron, blog i panel edycji, Profil Google podpięty. Gotowa w 12 dni.",
  },
  {
    title: "Sklep z integracją",
    price: "od 9 900 zł",
    description: "Katalog, płatności, kurier i faktury. Gotowy w 21 dni, cenę ustalamy po rozmowie.",
  },
  {
    title: "Opieka: strona i Profil Google",
    price: "od 300 zł/mies.",
    description: "300, 600 albo 1 280 zł miesięcznie: odpowiedzi na opinie, post co tydzień, 2, 5 albo 10 poprawek na kwartał, monitoring.",
  },
  {
    title: "Audyt strony",
    price: "0 zł",
    description: "Szybkość, SEO i formularz w minutę. Od wyniku zaczyna się naprawa.",
  },
];

const faq = [
  {
    question: "Ile czasu zajmuje wdrożenie?",
    answer:
      "Naprawa: zwykle ten sam lub następny dzień. Strona w tydzień: 7 dni. Strona firmowa z CMS: 12 dni. Sklep: 21 dni.",
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
  {
    question: "Co jest w cenie landing page za 790 zł?",
    answer:
      "Jedna podstrona z formularzem, który trafia do CRM, hosting w cenie wdrożenia i zakres spisany w punktach. Cena netto. Domenę kupujesz na siebie (50-150 zł/rok), jej konfigurację robimy my. Więcej podstron to strona w tydzień od 2 900 zł.",
  },
  {
    question: "Co jest w cenie strony w tydzień (2 900 zł)?",
    answer:
      "Do 5 podstron, formularz kontaktowy, kalendarz spotkań i hosting w cenie wdrożenia. Domenę kupujesz na siebie (50-150 zł/rok), jej konfigurację robimy my. Płatność przez Useme albo fakturą z góry.",
  },
  {
    question: "Co dzieje się po odbiorze strony?",
    answer:
      "Przez 30 dni po odbiorze poprawiamy bez opłat wszystko, co nie działa tak, jak opisaliśmy w ofercie. Potem możesz zostać przy opiece od 300 zł miesięcznie (2, 5 albo 10 poprawek na kwartał) albo zlecać pojedyncze poprawki od 150 zł.",
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
              <a
                href="#konfigurator-heading"
                className="animate-fade-up-2 mb-5 inline-flex flex-wrap items-baseline justify-center gap-x-2 rounded-2xl border border-accent/50 bg-accent/10 px-5 py-3 text-gray-900 dark:text-white"
              >
                <span className="text-sm font-semibold">Landing page</span>
                <span className="text-2xl font-bold text-accent">od 790 zł netto</span>
                <span className="w-full text-xs text-gray-600 dark:text-gray-300">
                  jedna podstrona, formularz do CRM, hosting w cenie
                </span>
              </a>
              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-fade-up-3">
                Nowa strona od zera albo poprawki w istniejącej. Prosta strona
                w 7 dni, firmowa w 12 dni, sklep w 21 dni.
              </p>
              <div className="animate-fade-up-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                <a href="#kontakt" className="btn-primary">
                  Napisz do nas
                </a>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Odpisujemy w 1 dzień roboczy, z ceną i terminem.
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

        <section id="audyt" className="scroll-mt-20 container-wide">
          <div className="mx-auto max-w-5xl py-10 text-center lg:py-12">
            <h2 className="h2-sekcji mb-3">Sprawdź swoją stronę w minutę</h2>
            <PoleAudytu />
          </div>
        </section>

        <GeneratorHasla />

        <MakietaStrony />

        <WyscigStron />

        <TasmaEtapow />

        <section id="cennik" className="scroll-mt-20 container-wide">
          <div className="py-10 lg:py-12">
                    <h2 className="h2-sekcji mb-10 text-center">
                      Ceny
                    </h2>
                    <TabelaCennika />
                    <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-gray-300 pt-8 dark:border-gray-600 md:grid-cols-3">
                      {[pricing[1], pricing[5], pricing[6]].map((track) => (
                        <div key={track.title}>
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                            {track.title}
                          </dt>
                          <dd className="mt-2 text-xl font-semibold tracking-tight text-accent [font-variant-numeric:tabular-nums]">
                            {track.price}
                          </dd>
                          <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {track.description}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-6 mx-auto max-w-3xl text-center text-sm text-gray-600 dark:text-gray-400">
                      Ceny netto. Zakres spisany w punktach i zamknięty, zmiana
                      poza zakresem to pozycja z cennika napraw. Płatność z góry,
                      bez rabatów.
                    </p>
                    <div
                      id="gwarancja"
                      className="mt-10 mx-auto max-w-3xl scroll-mt-20 rounded-2xl border border-gray-200 bg-white/60 p-6 dark:border-gray-700 dark:bg-gray-900/40"
                    >
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Do czego się zobowiązujemy
                      </h3>
                      <dl className="mt-4 divide-y divide-gray-200 text-sm dark:divide-gray-700">
                        {[
                          ["Zakres i termin", "Spisane w ofercie przed startem: co robimy, w ilu dniach i za ile. Prosta strona 7 dni, firmowa 12, sklep 21."],
                          ["30 dni po odbiorze", "Bez opłat poprawiamy wszystko, co nie działa tak, jak opisaliśmy w ofercie."],
                          ["Hosting", "W cenie wdrożenia. Domena na Ciebie, jej konfigurację robimy my."],
                          ["Po 30 dniach", "Opieka od 300 zł miesięcznie albo pojedyncze poprawki od 150 zł."],
                        ].map(([t, d]) => (
                          <div key={t} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4">
                            <dt className="font-semibold text-gray-900 dark:text-white">{t}</dt>
                            <dd className="text-gray-600 dark:text-gray-400 leading-relaxed">{d}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
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

        <DlaZakupow className="container-wide pb-12" />

        <section
          id="kontakt"
          className="scroll-mt-20 container-wide pb-20"
        >
          <LandingForm
            formId="diagnosis_web"
            heading="Napisz, jakiej strony potrzebujesz"
            intro="Odpiszemy z ceną i terminem, w 1 dzień roboczy."
            submitLabel="Wyślij i sprawdź cenę"
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
              "Tworzenie nowych stron WWW i poprawki w obecnych. Next.js, Tailwind, mobile-first, AI w treści i obrazach. Strona w tydzień za 2 900 zł.",
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
                price: "790",
                priceCurrency: "PLN",
                description:
                  "Jedna podstrona, formularz podpięty do CRM, hosting w cenie wdrożenia.",
              },
              {
                "@type": "Offer",
                name: "Strona w tydzień",
                price: "2900",
                priceCurrency: "PLN",
                description:
                  "Do 5 podstron, formularz, kalendarz spotkań, gotowa w 7 dni.",
              },
              {
                "@type": "Offer",
                name: "Strona firmowa z CMS",
                price: "5900",
                priceCurrency: "PLN",
                description:
                  "Do 15 podstron, blog, panel edycji treści, Profil Google podpięty.",
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
