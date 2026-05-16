import Image from "next/image";
import CountUp from "@/components/CountUp";
import RevealOnScroll from "@/components/RevealOnScroll";

const points = [
  "Główny segment: firmy B2B z dużą liczbą leadów — leasing, finansowanie, brokerzy, dealerzy, usługi profesjonalne",
  "Buduję na narzędziach, które Twój zespół może samodzielnie utrzymać po zakończeniu projektu",
  "Nie wdrażam zbędnych technologii — wybieram to, co faktycznie rozwiązuje problem",
  "Stała cena za zakres, tygodniowy kontakt, pełna transparentność kosztów",
];

const stats = [
  { label: "Wdrożeń i automatyzacji", value: "30+" },
  { label: "Godz. ręcznej pracy oszczędzonych / mies.", value: "500+" },
  { label: "Czas pierwszej automatyzacji", value: "2–4 dni" },
  { label: "Rozliczanie godzinowe", value: "0%" },
];

export default function About() {
  return (
    <section
      id="o-nas"
      aria-labelledby="o-nas-heading"
      className="section-violet scroll-mt-16 py-4 lg:py-7 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Paweł Iwanek",
            jobTitle: "Konsultant automatyzacji procesów B2B",
            worksFor: { "@id": "https://fluxlab.pl/#organization" },
            knowsAbout: [
              "Automatyzacja procesów biznesowych",
              "Integracje API",
              "CRM (Pipedrive, HubSpot, Salesforce)",
              "n8n",
              "Make",
              "Zapier",
              "Python",
              "Raportowanie sprzedaży",
              "Obsługa leadów B2B",
            ],
            knowsLanguage: ["pl", "en"],
          }),
        }}
      />

      <div
        aria-hidden="true"
        className="blob blob-violet animate-drift-slow -z-10 top-[-12%] left-[-10%] w-[460px] h-[460px] opacity-50 dark:opacity-30"
      />
      <div
        aria-hidden="true"
        className="blob blob-accent animate-drift-slow -z-10 bottom-[-18%] right-[-8%] w-[380px] h-[380px] opacity-40 dark:opacity-25"
      />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <RevealOnScroll>
              <p className="section-label mb-3">O Fluxlabie</p>
              <h2
                id="o-nas-heading"
                className="display-md font-bold text-gray-900 dark:text-white mb-6"
              >
                Praktyczne podejście, mierzalne efekty
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <div className="flex items-start gap-4 mb-8">
                <span className="relative flex-shrink-0">
                  <span className="block w-14 h-14 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-700 shadow-md bg-accent-light dark:bg-accent-dark-light">
                    <Image
                      src="/photos/mechanism.jpg"
                      alt=""
                      width={56}
                      height={56}
                      className="w-full h-full object-cover grayscale"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-gray-50 dark:ring-gray-900"
                  />
                </span>
                <div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                    Paweł Iwanek
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight mt-0.5">
                    Konsultant automatyzacji procesów B2B
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={1}>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Fluxlab to specjalistyczne studio automatyzacji prowadzone przez
                Pawła Iwanka. W większości projektów pracujesz bezpośrednio ze
                mną — bez account managerów i korporacyjnej warstwy pośredniej.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Jeśli projekt wymaga dodatkowych rąk, mówię o tym przed startem
                i dobieram sprawdzonych podwykonawców za Twoją zgodą. Nie ma
                przerzucania odpowiedzialności i nie ma niespodzianek w trakcie.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
                Automatyzacja procesów B2B — leady, CRM, raportowanie,
                integracje API — to jedyna rzecz, którą tu robię. Nie jest to
                agencja z piętnastoma usługami w ofercie. Wąsko, ale dobrze.
              </p>
            </RevealOnScroll>

            <ul className="space-y-3">
              {points.map((point, i) => (
                <RevealOnScroll
                  key={point}
                  as="li"
                  delay={Math.min(i + 1, 4) as 1 | 2 | 3 | 4}
                  className="group flex items-start gap-3 rounded-xl p-3 -m-3 card-lift hover:bg-white dark:hover:bg-gray-800/60"
                >
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-light dark:bg-accent-dark-light flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2.5 2.5L8 3"
                        stroke="#6366f1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {point}
                  </span>
                </RevealOnScroll>
              ))}
            </ul>
          </div>

          {/* Right - photo */}
          <RevealOnScroll delay={2} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl ring-1 ring-black/5 dark:ring-white/10 card-lift">
              <Image
                src="/photos/mechanism.jpg"
                alt="Mechanizm - symbol automatyzacji"
                fill
                className="object-cover grayscale"
              />
              {/* Dark overlay for readability of overlay card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 grid grid-cols-2 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="glass-card rounded-xl px-3 py-2.5 transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <p className="text-white font-bold text-xl leading-none tracking-tight">
                      <CountUp value={item.value} />
                    </p>
                    <p className="text-white/75 text-xs mt-1.5 leading-tight">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-light dark:bg-accent-dark-light rounded-2xl -z-10 animate-soft-pulse" />
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl border-2 border-violet-300/60 dark:border-violet-500/30 -z-10"
            />

            {/* Methodology note */}
            <p className="mt-5 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
              Liczby pochodzą z projektów komercyjnych i wewnętrznych
              automatyzacji. Oszczędność czasu liczona jako różnica między
              ręcznym wykonaniem procesu a procesem po wdrożeniu. Szczegóły z
              nazwy firmy publikuję tylko za zgodą klienta.
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
