import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";
import RelatedProducts from "@/components/RelatedProducts";

export const metadata: Metadata = {
  title: "Audyt Google Ads: frazy bez konwersji, 69 zł | Fluxlab",
  description:
    "W 3 dni robocze dostajecie frazy Google Ads, które biorą budżet bez konwersji, kwotę do odzyskania co miesiąc i listę wykluczeń. 69 zł z gwarancją zwrotu.",
  alternates: { canonical: "/audyt-google-ads" },
  openGraph: {
    title: "Audyt Google Ads: frazy bez konwersji, 69 zł | Fluxlab",
    description:
      "W 3 dni robocze dostajecie frazy Google Ads, które biorą budżet bez konwersji, kwotę do odzyskania co miesiąc i listę wykluczeń. 69 zł z gwarancją zwrotu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt zmarnowanego budżetu Google Ads",
      },
    ],
  },
};

const steps = [
  {
    title: "Dajesz dostęp do konta",
    desc: "Dostęp tylko do odczytu albo eksport raportu wyszukiwanych haseł.",
  },
  {
    title: "Analizujemy wydatki bez konwersji",
    desc: "Wyławiamy frazy, które kosztują, ale nie sprzedają, i liczymy kwotę do odzyskania.",
  },
  {
    title: "Dostajesz raport i listę wykluczeń",
    desc: "W 3 dni robocze: raport PDF, lista wykluczeń i plan naprawy konta.",
  },
];

const faq = [
  {
    question: "Czy musicie mieć dostęp do naszego konta Google Ads?",
    answer:
      "Wystarczy dostęp tylko do odczytu albo eksport raportu haseł z 30 do 90 dni.",
  },
  {
    question: "Czy sami wprowadzacie zmiany na koncie?",
    answer:
      "Listę wykluczeń wdrażasz sam albo Twoja agencja. Wdrożenie przez nas ustalamy osobno.",
  },
  {
    question: "Dla jak dużych kont to ma sens?",
    answer:
      "Najwięcej przy budżetach od kilku tysięcy złotych miesięcznie. Przy małych chroni Cię gwarancja zwrotu.",
  },
];

export default function AudytGoogleAdsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/audyt-google-ads"
          items={[
            { label: "Audyt zmarnowanego budżetu Google Ads" },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-accent -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Usługa</p>
            <h1 className="h1-strony text-gray-900 dark:text-white">
              Przestań przepalać budżet Google Ads na frazy bez konwersji
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Przeglądamy raport wyszukiwanych haseł z 30 do 90 dni, liczymy, ile
              tracisz co miesiąc, i dajemy gotową listę wykluczeń. 69 zł, z
              gwarancją zwrotu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#zamow" className="btn-primary inline-flex">
                Zamów mini-audyt za 69 zł
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
              <h2 className="h2-sekcji mb-4 text-gray-900 dark:text-white">
                Przykładowy efekt
              </h2>
              <p className="mb-8 text-gray-600 dark:text-gray-300">
                Podsumowanie audytu na danych demo, nie na koncie klienta.
              </p>
            </div>
            <div className="max-w-3xl rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/60 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analizowane konto (dane demo)
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Budżet 9 000 zł/mc, 30 dni, 214 fraz
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  Do odzyskania ok. 2 340 zł/mc
                </span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Budżet bez konwersji
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    26 procent
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Fraz do wykluczenia
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    47
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    Oszczędność rocznie
                  </dt>
                  <dd className="text-lg font-bold text-accent">
                    ok. 28 000 zł
                  </dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-red-700 dark:text-red-400">!</span>
                  Fraza &bdquo;darmowy&rdquo; w 3 kampaniach: 1 180 zł kosztu,
                  zero konwersji.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-amber-700 dark:text-amber-400">•</span>
                  14 fraz z intencją informacyjną, nie zakupową, do
                  przeniesienia na dopasowanie ścisłe.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-accent">→</span>
                  Gotowa lista 47 wykluczeń do wklejenia na poziomie kampanii.
                </p>
              </div>
            </div>
          </section>

          {/* Cennik i gwarancja */}
          <section id="cennik" className="scroll-mt-20">
            <div className="max-w-3xl">
              <h2 className="h2-sekcji mb-10 text-gray-900 dark:text-white">
                Cennik i gwarancja
              </h2>
            </div>
            <div className="lg:max-w-2xl">
              <div className="flex flex-col rounded-2xl border border-accent bg-accent/5 p-6 dark:bg-accent/10 lg:p-8">
                <span className="mb-3 inline-block w-fit rounded-full bg-accent-solid px-3 py-1 text-xs font-semibold text-white">
                  Z gwarancją zwrotu
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mini-audyt Google Ads
                </h3>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  69 zł
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Mniej niż 500 zł miesięcznie do odzyskania? Zwracamy całą
                  kwotę.
                </p>
                <a
                  href="#zamow"
                  className="btn-primary mt-6 w-full justify-center text-center text-sm"
                >
                  Zamów mini-audyt
                </a>
              </div>
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

          <RelatedProducts slug="audyt-google-ads" />

          <section id="zamow" className="scroll-mt-20">
            <LandingForm
              formId="order_audyt_google_ads"
              heading="Zamów mini-audyt Google Ads"
              intro="Napisz, jaki masz miesięczny budżet i od kiedy działają kampanie. Potem ustalimy dostęp albo eksport raportu."
              submitLabel="Zamów mini-audyt za 69 zł"
              microCopy="Odpowiedź w 24h. Zwrot całej kwoty przy odzysku poniżej 500 zł/mc."
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
            name: "Audyt zmarnowanego budżetu Google Ads",
            description:
              "Mini-audyt raportu wyszukiwanych haseł Google Ads: wyliczenie budżetu przepalanego na frazy bez konwersji, gotowa lista wykluczeń i plan naprawy konta. 69 zł z gwarancją zwrotu przy odzysku poniżej 500 zł/mc.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "Polska" },
            serviceType: "Audyt kampanii Google Ads",
            url: "https://fluxlab.pl/audyt-google-ads",
            offers: {
              "@type": "Offer",
              name: "Mini-audyt Google Ads",
              price: "69",
              priceCurrency: "PLN",
            },
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
