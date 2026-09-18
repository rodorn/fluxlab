import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "ImportRadar, opłacalność sprowadzenia auta z Niemiec | Fluxlab",
  description:
    "Które auta z Niemiec realnie się opłaca sprowadzić. Skanuję żywe oferty i podaję marżę netto po wszystkich kosztach oraz modele z drogimi usterkami do unikania. Analiza konkretnego auta lub szukanie okazji pod budżet.",
  alternates: { canonical: "/import-radar" },
  openGraph: {
    title: "ImportRadar, opłacalność sprowadzenia auta z Niemiec | Fluxlab",
    description:
      "Które auta z Niemiec realnie się opłaca sprowadzić. Marża netto po wszystkich kosztach na żywych ofertach plus modele do unikania.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, ImportRadar, opłacalność importu aut",
      },
    ],
  },
};

const steps = [
  {
    title: "Podajesz auto albo budżet",
    desc: "Wklejasz link do niemieckiej oferty (np. mobile.de) albo mówisz, jaki masz budżet i jakiego auta szukasz.",
  },
  {
    title: "Liczę pełny koszt sprowadzenia",
    desc: "Akcyza, transport, tłumaczenia, opłaty rejestracyjne i ryzyko kursowe. Nic nie ginie w kalkulacji.",
  },
  {
    title: "Dostajesz werdykt o marży",
    desc: "Porównuję koszt końcowy z cenami tego modelu w Polsce i mówię wprost, ile realnie zostaje na czysto albo że się nie opłaca.",
  },
];

const pricing = [
  {
    name: "Analiza 1 auta",
    price: "10-20 zł",
    cta: "Zamów analizę auta",
    desc: "Masz na oku konkretne ogłoszenie z Niemiec i chcesz wiedzieć, czy warto.",
    features: [
      "pełny rozkład kosztów sprowadzenia",
      "akcyza wyliczona dla konkretnego pojazdu",
      "porównanie do cen tego modelu w Polsce",
      "werdykt: marża netto albo brak opłacalności",
    ],
    featured: false,
  },
  {
    name: "Znajdź pod budżet",
    price: "20-30 zł",
    cta: "Zamów wyszukiwanie",
    desc: "Podajesz budżet i typ auta, a ja szukam modeli z realną marżą po sprowadzeniu.",
    features: [
      "wszystko z analizy 1 auta",
      "przegląd rynku pod Twój budżet",
      "ranking modeli po marży netto",
      "wskazanie konkretnych, opłacalnych ofert",
    ],
    featured: true,
  },
];

const faq = [
  {
    question: "Czy liczysz akcyzę dokładnie?",
    answer:
      "Tak, akcyzę liczę według pojemności silnika i typu napędu (osobno dla spalinowych, hybryd i elektryków), a nie z grubsza. To ona najczęściej przesądza o opłacalności, więc traktuję ją poważnie.",
  },
  {
    question: "Czy sprowadzasz auto za mnie?",
    answer:
      "Nie. ImportRadar to analiza opłacalności, a nie usługa transportu. Dostajesz twarde liczby i decyzję, czy w ogóle wchodzić w dany samochód. Import realizujesz sam lub przez wybraną firmę.",
  },
  {
    question: "Skąd bierzesz ceny sprzedaży w Polsce?",
    answer:
      "Z aktualnych ogłoszeń tego samego modelu, rocznika i zbliżonego przebiegu na polskich portalach. Dzięki temu marża jest liczona wobec realnego rynku, a nie życzeniowej ceny.",
  },
  {
    question: "Co jeśli analiza pokaże, że się nie opłaca?",
    answer:
      "To też jest wynik wart swojej ceny. Lepiej wydać 150 zł na analizę niż stracić kilka tysięcy na aucie, które w Polsce kupisz taniej. Przy pakiecie znajdź pod budżet od razu szukam alternatyw z marżą.",
  },
];

export default function ImportRadarPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: "ImportRadar DE→PL" },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-cyan -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Produkt</p>
            <h1 className="display-lg text-gray-900 dark:text-white">
              Sprawdź, czy import z Niemiec naprawdę się opłaca
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Cena w niemieckim ogłoszeniu to dopiero początek. Liczę pełny
              koszt sprowadzenia, akcyzę, transport i opłaty, a potem porównuję
              go z cenami tego auta w Polsce. Dostajesz jedną liczbę, która
              mówi, ile zostaje na czysto.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#zamow" className="btn-primary inline-flex">
                Zamów analizę od 10 zł
              </a>
              <a
                href="#cennik"
                className="text-sm font-semibold text-accent hover:underline"
              >
                Zobacz cennik →
              </a>
            </div>
          </div>
        </section>

        <div className="container-wide pb-8 space-y-16 lg:space-y-20">
          {/* Jak działa */}
          <section>
            <div className="max-w-3xl">
              <h2 className="display-xl mb-10 text-gray-900 dark:text-white">
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
              <h2 className="display-xl mb-4 text-gray-900 dark:text-white">
                Przykładowy efekt
              </h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                Tak wygląda rozkład kosztów w analizie. To przykład działania
                narzędzia na danych demo, a nie realna oferta.
              </p>
            </div>
            <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analizowane auto (dane demo)
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    BMW 320d, 2019, 2.0 diesel, 95 000 km
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Marża netto ok. 9 100 zł
                </span>
              </div>
              <dl className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
                {[
                  ["Cena zakupu w Niemczech", "76 500 zł"],
                  ["Akcyza (2.0 diesel)", "8 640 zł"],
                  ["Transport i opłaty", "3 200 zł"],
                  ["Tłumaczenia i rejestracja", "1 060 zł"],
                  ["Koszt końcowy", "89 400 zł"],
                  ["Mediana ceny w Polsce", "98 500 zł"],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between py-2.5 ${
                      i === arr.length - 1 || i === arr.length - 2
                        ? "font-semibold text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <dt className="text-sm">{label}</dt>
                    <dd className="text-sm">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-300">
                <span className="text-accent">→</span> Werdykt: opłacalne, marża
                ok. 9 100 zł przed kosztami drobnych napraw. Rekomendacja:
                negocjuj cenę zakupu poniżej 74 000 zł, żeby zwiększyć zapas.
              </p>
            </div>
          </section>

          {/* Cennik */}
          <section id="cennik" className="scroll-mt-20">
            <div className="max-w-3xl">
              <h2 className="display-xl mb-10 text-gray-900 dark:text-white">
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
                    <span className="mb-3 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
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
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="max-w-3xl">
              <h2 className="display-xl mb-10 text-gray-900 dark:text-white">
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
                        className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-45"
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

          {/* Formularz zamówienia */}
          <section id="zamow" className="scroll-mt-20">
            <LandingForm
              formId="order_import_radar"
              heading="Zamów analizę opłacalności importu"
              intro="Wklej link do niemieckiej oferty w polu opisu albo podaj budżet i typ auta, jeśli chcesz pakiet znajdź pod budżet. Odsyłam pełny rozkład kosztów i werdykt o marży, zwykle w ciągu 24h."
              submitLabel="Wyślij auto do analizy"
              microCopy="Odpowiedź w 24h. Płatność ustalamy mailowo po potwierdzeniu zakresu (analiza 1 auta 10-20 zł, znajdź pod budżet 20-30 zł)."
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
            name: "ImportRadar, opłacalność importu aut DE→PL",
            description:
              "Analiza opłacalności sprowadzenia auta z Niemiec do Polski: pełny kalkulator kosztów, akcyza i marża netto wobec cen w Polsce. Analiza 1 auta 10-20 zł, znajdź pod budżet 20-30 zł.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Analiza opłacalności importu samochodu",
            url: "https://fluxlab.pl/import-radar",
            offers: [
              {
                "@type": "Offer",
                name: "Analiza 1 auta",
                price: "10",
                priceCurrency: "PLN",
              },
              {
                "@type": "Offer",
                name: "Znajdź pod budżet",
                price: "20",
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
