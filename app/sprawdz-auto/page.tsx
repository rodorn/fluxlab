import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Sprawdź auto przed zakupem, raport due-diligence od 5 zł | Fluxlab",
  description:
    "Wklej link do oferty z Otomoto lub OLX i sprawdź, czy cena jest uczciwa. Benchmark ceny, wykrywanie cofniętego licznika, checklista usterek modelu i skrypt negocjacji. Price-check 5 zł, pełny raport 15 zł.",
  alternates: { canonical: "/sprawdz-auto" },
  openGraph: {
    title:
      "Sprawdź auto przed zakupem, raport due-diligence od 5 zł | Fluxlab",
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
    title: "Wklejasz link do oferty",
    desc: "Podajesz adres ogłoszenia z Otomoto lub OLX w formularzu. Nie musisz przepisywać żadnych danych.",
  },
  {
    title: "Analizuję ofertę i rynek",
    desc: "Narzędzie zbiera dane z ogłoszenia, porównuje cenę do podobnych aut i sprawdza spójność przebiegu, roku i wyposażenia.",
  },
  {
    title: "Dostajesz raport na maila",
    desc: "W ciągu 24h odsyłam gotowy raport PDF: czy cena jest uczciwa, na co uważać przy tym modelu i jak negocjować.",
  },
];

const pricing = [
  {
    name: "Price-check",
    price: "5 zł",
    desc: "Szybka odpowiedź na jedno pytanie: czy cena tego auta jest uczciwa.",
    features: [
      "benchmark ceny wobec podobnych ofert",
      "ocena, czy oferta jest tania, rynkowa czy zawyżona",
      "sygnał ostrzegawczy przy podejrzanym przebiegu",
      "odpowiedź w 24h na maila",
    ],
    featured: false,
  },
  {
    name: "Pełny raport",
    price: "15 zł",
    desc: "Kompletny due-diligence auta przed oglądaniem i negocjacją.",
    features: [
      "wszystko z price-check",
      "checklista typowych usterek konkretnego modelu",
      "wykrywanie red-flag: niespójny przebieg, cofnięty licznik, historia ceny",
      "gotowy skrypt negocjacji z argumentami na obniżkę",
      "raport PDF do wglądu przy oglądaniu auta",
    ],
    featured: true,
  },
];

const faq = [
  {
    question: "Czy to jest raport z historii pojazdu jak w CEPiK czy Carfax?",
    answer:
      "Nie. To analiza samej oferty i rynku: czy cena jest uczciwa, czy dane w ogłoszeniu są spójne i na co uważać przy tym modelu. To uzupełnienie oficjalnego raportu historii, a nie jego zamiennik.",
  },
  {
    question: "Skąd bierzesz dane do porównania ceny?",
    answer:
      "Z aktualnych ogłoszeń podobnych aut na portalach sprzedażowych. Porównuję rocznik, przebieg, wersję i wyposażenie, żeby cena była odniesiona do realnie porównywalnych ofert.",
  },
  {
    question: "Jak szybko dostanę raport?",
    answer:
      "Zwykle w ciągu 24h od zgłoszenia i potwierdzenia płatności. Jeśli auto Cię goni, napisz w formularzu, że sprawa jest pilna.",
  },
  {
    question: "Co jeśli oferta zniknie zanim zdążę zamówić?",
    answer:
      "Wystarczy, że wkleisz link. Jeśli ogłoszenie zostanie zdjęte, poproszę o zrzut ekranu lub dane z oferty i dokończę analizę na ich podstawie.",
  },
];

export default function SprawdzAutoPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: "Sprawdź auto przed zakupem" },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-cyan -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Produkt</p>
            <h1 className="display-lg text-gray-900 dark:text-white">
              Nie przepłać za używane auto
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Wklejasz link do oferty z Otomoto lub OLX, a ja sprawdzam, czy
              cena jest uczciwa, czy dane się zgadzają i na co uważać przy tym
              modelu. Dostajesz raport i gotowe argumenty do negocjacji, zanim
              pojedziesz oglądać.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#zamow" className="btn-primary inline-flex">
                Sprawdź auto od 5 zł
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
                Tak wygląda fragment raportu. To przykład działania narzędzia na
                danych demo, a nie realne ogłoszenie.
              </p>
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
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  Cena zawyżona o ok. 8 500 zł
                </span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Cena w ofercie
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    72 900 zł
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Mediana rynku
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    64 400 zł
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Realny cel negocjacji
                  </dt>
                  <dd className="text-lg font-bold text-accent">65 000 zł</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-red-500">!</span>
                  Red-flag: przebieg niższy niż w poprzednim ogłoszeniu tego VIN
                  sprzed 6 miesięcy.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-amber-500">•</span>
                  Typowa usterka modelu: łańcuch rozrządu, poproś o fakturę
                  wymiany.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-accent">→</span>
                  Argument do negocjacji: cena o 13 procent powyżej mediany przy
                  wyższym niż typowy przebiegu.
                </p>
              </div>
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
                    Zamów {tier.name.toLowerCase()}
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
              formId="order_sprawdz_auto"
              heading="Zamów sprawdzenie auta"
              intro="Wklej link do oferty z Otomoto lub OLX w polu opisu i napisz, czy chcesz price-check (5 zł) czy pełny raport (15 zł). Odsyłam gotowy raport na maila, zwykle w ciągu 24h."
              submitLabel="Wyślij ofertę do sprawdzenia"
              microCopy="Odpowiedź w 24h. Płatność ustalamy mailowo po potwierdzeniu, że mam komplet danych z oferty."
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
