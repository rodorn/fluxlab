import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import LandingForm from "@/components/LandingForm";

export const metadata: Metadata = {
  title: "Audyt zmarnowanego budżetu Google Ads, 69 zł z gwarancją | Fluxlab",
  description:
    "Sprawdzę, ile budżetu Google Ads przepalasz na frazy bez konwersji. Mini-audyt raportu wyszukiwanych haseł, gotowa lista wykluczeń i plan naprawy konta. 69 zł z gwarancją zwrotu, jeśli znajdę mniej niż 500 zł miesięcznie do odzyskania.",
  alternates: { canonical: "/audyt-google-ads" },
  openGraph: {
    title:
      "Audyt zmarnowanego budżetu Google Ads, 69 zł z gwarancją | Fluxlab",
    description:
      "Sprawdzę, ile budżetu Google Ads przepalasz na frazy bez konwersji. Gotowa lista wykluczeń i plan naprawy. 69 zł z gwarancją zwrotu.",
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
    desc: "Udostępniasz konto Google Ads w trybie do odczytu albo przesyłasz eksport raportu wyszukiwanych haseł. Nic nie zmieniam bez Twojej zgody.",
  },
  {
    title: "Analizuję wydatki bez konwersji",
    desc: "Przechodzę przez raport search terms i wyławiam frazy, które kosztują, ale nie sprzedają. Grupuję je i liczę realną kwotę do odzyskania.",
  },
  {
    title: "Dostajesz raport i listę wykluczeń",
    desc: "W ciągu kilku dni odsyłam raport PDF: ile budżetu przepalasz miesięcznie, gotową listę wykluczających słów kluczowych i plan naprawy konta.",
  },
];

const faq = [
  {
    question: "Jak działa gwarancja zwrotu?",
    answer:
      "Jeśli w audycie znajdę mniej niż 500 zł miesięcznie realnie do odzyskania, zwracam całe 69 zł. Ryzyko jest po mojej stronie, płacisz tylko wtedy, gdy audyt faktycznie pokazuje pieniądze do zaoszczędzenia.",
  },
  {
    question: "Czy musicie mieć dostęp do mojego konta Google Ads?",
    answer:
      "Wystarczy dostęp w trybie tylko do odczytu albo eksport raportu wyszukiwanych haseł z ostatnich 30-90 dni. Nie potrzebuję uprawnień do zmian, żeby zrobić audyt.",
  },
  {
    question: "Czy sami wprowadzacie zmiany na koncie?",
    answer:
      "Mini-audyt to diagnoza i gotowa lista wykluczeń, którą wdrażasz sam lub Twoja agencja. Jeśli chcesz, żebym wdrożył wykluczenia i ustawił nocny skrypt pilnujący konta, ustalamy to osobno po audycie.",
  },
  {
    question: "Dla jak dużych kont to ma sens?",
    answer:
      "Najwięcej do odzyskania jest przy budżetach od kilku tysięcy złotych miesięcznie w górę. Przy bardzo małych wydatkach kwoty bywają zbyt niskie, dlatego właśnie działa gwarancja zwrotu, nie ryzykujesz.",
  },
];

export default function AudytGoogleAdsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Produkty", href: "/produkty" },
            { label: "Audyt zmarnowanego budżetu Google Ads" },
          ]}
        />

        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-12">
          <div className="blob blob-cyan -z-10 -top-32 -right-24 h-96 w-96" />
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-5">Produkt</p>
            <h1 className="display-lg text-gray-900 dark:text-white">
              Przestań przepalać budżet Google Ads na frazy bez konwersji
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              Duża część budżetu na Google Ads idzie na kliknięcia, które nigdy
              nie sprzedają. Przeglądam raport wyszukiwanych haseł, liczę ile
              realnie tracisz co miesiąc i daję gotową listę wykluczeń. Za 69
              zł, z gwarancją zwrotu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#zamow" className="btn-primary inline-flex">
                Zamów mini-audyt za 69 zł
              </a>
              <a
                href="#cennik"
                className="text-sm font-semibold text-accent hover:underline"
              >
                Zobacz zakres i gwarancję →
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
                Tak wygląda podsumowanie audytu. To przykład działania narzędzia
                na danych demo, a nie realne konto klienta.
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
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Do odzyskania ok. 2 340 zł/mc
                </span>
              </div>
              <dl className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Budżet bez konwersji
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    26 procent
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Fraz do wykluczenia
                  </dt>
                  <dd className="text-lg font-bold text-gray-900 dark:text-white">
                    47
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-gray-400">
                    Oszczędność rocznie
                  </dt>
                  <dd className="text-lg font-bold text-accent">
                    ok. 28 000 zł
                  </dd>
                </div>
              </dl>
              <div className="mt-5 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-700">
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-red-500">!</span>
                  Fraza &bdquo;darmowy&rdquo; w 3 kampaniach: 1 180 zł kosztu,
                  zero konwersji.
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-amber-500">•</span>
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
              <h2 className="display-xl mb-10 text-gray-900 dark:text-white">
                Cennik i gwarancja
              </h2>
            </div>
            <div className="lg:max-w-2xl">
              <div className="flex flex-col rounded-2xl border border-accent bg-accent/5 p-6 dark:bg-accent/10 lg:p-8">
                <span className="mb-3 inline-block w-fit rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Z gwarancją zwrotu
                </span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mini-audyt Google Ads
                </h3>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  69 zł
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Jeśli znajdę mniej niż 500 zł miesięcznie realnie do
                  odzyskania, zwracam całą kwotę. Płacisz tylko wtedy, gdy audyt
                  pokazuje pieniądze do zaoszczędzenia.
                </p>
                <ul className="mt-5 space-y-2">
                  {[
                    "analiza raportu wyszukiwanych haseł z 30-90 dni",
                    "wyliczenie budżetu przepalanego na frazy bez konwersji",
                    "gotowa lista wykluczających słów kluczowych",
                    "plan naprawy konta uszeregowany według efektu",
                    "gwarancja zwrotu przy odzysku poniżej 500 zł/mc",
                  ].map((f) => (
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
              formId="order_audyt_google_ads"
              heading="Zamów mini-audyt Google Ads"
              intro="Napisz w polu opisu, jaki masz miesięczny budżet i od kiedy działają kampanie. Po zgłoszeniu ustalimy dostęp do konta lub eksport raportu. Cena 69 zł z gwarancją zwrotu, jeśli znajdę mniej niż 500 zł miesięcznie do odzyskania."
              submitLabel="Zamów mini-audyt za 69 zł"
              microCopy="Odpowiedź w 24h. Płatność ustalamy mailowo. Zwrot całej kwoty, jeśli audyt pokaże mniej niż 500 zł/mc do odzyskania."
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
