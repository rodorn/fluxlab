import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import RelatedProducts from "@/components/RelatedProducts";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Sprawdź auto z Otomoto i OLX przed zakupem od 5 zł | Fluxlab",
  description:
    "Wklej link z Otomoto lub OLX. W 24 h raport PDF: cena wobec podobnych ofert, spójność przebiegu, usterki modelu i argumenty do negocjacji. Od 5 zł.",
  alternates: { canonical: "/sprawdz-auto" },
  openGraph: {
    title: "Sprawdź auto z Otomoto i OLX przed zakupem od 5 zł | Fluxlab",
    description:
      "Wklej link do oferty z Otomoto lub OLX i sprawdź, czy cena jest uczciwa. Benchmark ceny, red-flagi i skrypt negocjacji. Price-check 5 zł, pełny raport 15 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, sprawdź auto przed zakupem",
      },
    ],
  },
};

const steps = [
  {
    title: "Wklejasz link",
    desc: "Adres ogłoszenia z Otomoto lub OLX. Nic nie przepisujesz.",
  },
  {
    title: "Porównujemy z rynkiem",
    desc: "Cena wobec podobnych aut, spójność przebiegu i roku.",
  },
  {
    title: "Raport na maila",
    desc: "PDF w 24 h: czy cena jest uczciwa i jak negocjować.",
  },
];

const pricing = [
  {
    name: "Price-check",
    price: "5 zł",
    desc: "Czy cena tego auta jest uczciwa.",
    features: [
      "benchmark ceny wobec podobnych ofert",
      "sygnał przy podejrzanym przebiegu",
    ],
    featured: false,
  },
  {
    name: "Pełny raport",
    price: "15 zł",
    desc: "Komplet przed oglądaniem i negocjacją.",
    features: [
      "wszystko z price-check",
      "typowe usterki modelu i red-flagi",
      "skrypt negocjacji z argumentami",
    ],
    featured: true,
  },
];

const faq = [
  {
    question: "Czy to raport historii pojazdu jak CEPiK czy Carfax?",
    answer:
      "Nie. Analizujemy ofertę i rynek. To uzupełnienie oficjalnego raportu historii, nie zamiennik.",
  },
  {
    question: "Skąd dane do porównania ceny?",
    answer:
      "Z aktualnych ogłoszeń podobnych aut: ten sam rocznik, przebieg, wersja i wyposażenie.",
  },
  {
    question: "Co jeśli ogłoszenie zniknie?",
    answer:
      "Poprosimy o zrzut ekranu lub dane z oferty i dokończymy analizę.",
  },
];

export default function SprawdzAutoPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/sprawdz-auto"
          items={[
            { label: "Sprawdź auto przed zakupem" },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Narzędzie</p>
            <NazwaNarzedzia href="/sprawdz-auto" />
            <h1 className="h1-strony text-gray-900 dark:text-white">
              Nie przepłać za używane auto
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Wklejasz link z Otomoto lub OLX. Sprawdzamy cenę i dane oferty,
              a Ty dostajesz argumenty do negocjacji przed oględzinami.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#zamow" className="btn-primary inline-flex">
                Sprawdź auto od 5 zł
              </a>
            </div>
          </div>
        </section>

        <div className="container-wide pb-8 space-y-16 lg:space-y-20">
          {/* Jak działa */}
          <section>
            <div className="max-w-3xl">
              <h2 className="h2-sekcji mb-10 text-gray-900 dark:text-white">
                Jak to działa
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className="card-lift rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Przykładowy efekt */}
          <section>
            <div className="max-w-3xl">
              <h2 className="h2-sekcji mb-8 text-gray-900 dark:text-white">
                Przykładowy raport (dane demo)
              </h2>
            </div>
            <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analizowane auto (dane demo)
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Audi A4 2.0 TDI, 2017, 178 000 km
                  </p>
                </div>
                <span className="rounded-full border border-amber-500/60 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">
                  Cena zawyżona o ok. 8 500 zł
                </span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Cena w ofercie
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    72 900 zł
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Mediana rynku
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    64 400 zł
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Realny cel negocjacji
                  </dt>
                  <dd className="text-lg font-bold text-accent">65 000 zł</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-red-700 dark:text-red-400">!</span>
                  Przebieg niższy niż w ogłoszeniu tego VIN sprzed 6 miesięcy.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-accent">→</span>
                  Argument: cena 13% powyżej mediany przy wyższym przebiegu.
                </p>
              </div>
            </div>
          </section>

          {/* Cennik */}
          <section id="cennik" className="scroll-mt-20">
            <div className="max-w-3xl">
              <h2 className="h2-sekcji mb-10 text-gray-900 dark:text-white">
                Cennik
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:max-w-4xl">
              {pricing.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col rounded-2xl border p-6 lg:p-8 ${
                    tier.featured
                      ? "border-accent bg-accent/5 dark:bg-accent/10"
                      : "border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800/60"
                  }`}
                >
                  {tier.featured && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-accent-solid px-3 py-1 text-xs font-semibold text-white">
                      Najczęściej wybierany
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {tier.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <svg
                          className="mt-0.5 flex-shrink-0 text-accent"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7l3 3 6-6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#zamow"
                    className={`mt-6 w-full justify-center text-center text-sm ${
                      tier.featured
                        ? "btn-primary"
                        : "inline-flex items-center rounded-lg border border-gray-200 px-4 py-3 font-semibold text-gray-900 transition-colors hover:border-accent dark:border-gray-700 dark:text-white"
                    }`}
                  >
                    Zamów {tier.name.toLowerCase()}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="max-w-3xl">
              <h2 className="h2-sekcji mb-10 text-gray-900 dark:text-white">
                Pytania i odpowiedzi
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl border border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800/60"
                  >
                    <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 p-6 font-medium text-gray-900 dark:text-white [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <svg
                        className="h-5 w-5 shrink-0 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45"
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
                    <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <RelatedProducts slug="sprawdz-auto" />

          <section id="zamow" className="scroll-mt-20">
            <LandingForm
              formId="order_sprawdz_auto"
              heading="Zamów sprawdzenie auta"
              intro="Wklej link z Otomoto lub OLX i napisz: price-check (5 zł) czy pełny raport (15 zł)."
              submitLabel="Wyślij ofertę do sprawdzenia"
              microCopy="Raport w 24 h. Płatność ustalamy mailowo."
            />
          </section>
        </div>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Sprawdź auto przed zakupem",
            description:
              "Raport due-diligence oferty samochodu: benchmark ceny, wykrywanie red-flag, checklista usterek modelu i skrypt negocjacji. Price-check 5 zł, pełny raport 15 zł.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Analiza oferty samochodu przed zakupem",
            url: "https://fluxlab.pl/sprawdz-auto",
            offers: [
              {
                "@type": "Offer",
                name: "Price-check",
                price: "5",
                priceCurrency: "PLN",
              },
              {
                "@type": "Offer",
                name: "Pełny raport",
                price: "15",
                priceCurrency: "PLN",
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
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
