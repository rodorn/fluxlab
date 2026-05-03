import Image from "next/image";

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
      className="scroll-mt-16 py-4 lg:py-7 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label mb-3">O Fluxlabie</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Praktyczne podejście, mierzalne efekty
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Fluxlab to specjalistyczne studio automatyzacji prowadzone przez
              Pawła Iwanka. W większości projektów pracujesz bezpośrednio ze mną
              — bez account managerów i korporacyjnej warstwy pośredniej.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
              Jeśli projekt wymaga dodatkowych rąk, mówię o tym przed startem i
              dobieram sprawdzonych podwykonawców za Twoją zgodą. Nie ma
              przerzucania odpowiedzialności i nie ma niespodzianek w trakcie.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              Automatyzacja procesów B2B — leady, CRM, raportowanie, integracje
              API — to jedyna rzecz, którą tu robię. Nie jest to agencja z
              piętnastoma usługami w ofercie. Wąsko, ale dobrze.
            </p>

            <ul className="space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-accent-light dark:bg-accent-dark-light flex items-center justify-center flex-shrink-0">
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
                </li>
              ))}
            </ul>
          </div>

          {/* Right - photo */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <Image
                src="/photos/mechanism.jpg"
                alt="Mechanizm - symbol automatyzacji"
                fill
                className="object-cover grayscale"
              />
              {/* Dark overlay for readability of overlay card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-2 gap-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                  >
                    <p className="text-white font-bold text-lg leading-none">
                      {item.value}
                    </p>
                    <p className="text-white/70 text-xs mt-1 leading-tight">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-light dark:bg-accent-dark-light rounded-2xl -z-10" />

            {/* Methodology note */}
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
              Liczby pochodzą z projektów komercyjnych i wewnętrznych
              automatyzacji. Oszczędność czasu liczona jako różnica między
              ręcznym wykonaniem procesu a procesem po wdrożeniu. Szczegóły z
              nazwy firmy publikuję tylko za zgodą klienta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
