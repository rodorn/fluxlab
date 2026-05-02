import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Narzędzia — kalkulatory ROI, audyty CRM i decyzje biznesowe | Fluxlab",
  description:
    "Bezpłatne narzędzia online dla firm B2B: kalkulator kosztu ręcznej obsługi leadów, audyt CRM, decyzja zatrudnić/zautomatyzować, kalkulator podatkowy JDG. Bez rejestracji.",
  openGraph: {
    title:
      "Narzędzia — kalkulatory ROI, audyty CRM i decyzje biznesowe | Fluxlab",
    description:
      "Bezpłatne narzędzia online dla firm B2B: kalkulator kosztu ręcznej obsługi leadów, audyt CRM, decyzja zatrudnić/zautomatyzować, kalkulator podatkowy JDG.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/narzedzia",
  },
};

const businessTools = [
  {
    title: "Kalkulator kosztu obsługi leadów",
    description:
      "Sprawdź, ile miesięcznie kosztuje ręczne przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty. Realny koszt w zł, nie ogólniki.",
    href: "/kalkulator-leadow",
    badge: "Najpopularniejsze",
  },
  {
    title: "Audyt CRM — checklist online",
    description:
      "10 pytań tak/nie. Wynik X/10 + obszar z największym potencjałem automatyzacji. Bez rejestracji, w 3 minuty.",
    href: "/audyt-crm",
  },
  {
    title: "Zatrudnić czy zautomatyzować?",
    description:
      "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 jasna decyzja.",
    href: "/zatrudnic-czy-zautomatyzowac",
  },
];

const otherTools = [
  {
    title: "Dobór samochodu",
    description:
      "Znajdź idealny segment, nadwozie i moc dla siebie. Odpowiedz na kilka pytań, a algorytm dopasuje najlepsze propozycje.",
    href: "/dobor-samochodu",
    image: "/photos/car-chooser/type-sport.webp",
  },
  {
    title: "Kalkulator kosztów auta",
    description:
      "Oblicz pełny koszt posiadania samochodu: paliwo, ubezpieczenie, serwis, amortyzacja i więcej.",
    href: "/kalkulator-kosztow",
    image: "/photos/car-chooser/type-osobowy.jpg",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description:
      "Porównaj skalę podatkową, podatek liniowy i ryczałt. Uwzględnia składki ZUS, VAT, ulgi i daje jasną odpowiedź, co się bardziej opłaca.",
    href: "/kalkulator-podatkowy",
    image: "/photos/tax-calculation/calculator.jpg",
  },
];

export default function Narzedzia() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Narzędzia" }]} />
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Narzędzia</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Praktyczne narzędzia online
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Bezpłatne kalkulatory i narzędzia, które pomagają podejmować
                lepsze decyzje. Bez rejestracji, bez zbędnych kroków.
              </p>
            </div>
          </div>
        </section>

        {/* Business tools */}
        <section className="py-16 lg:py-20">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <p className="section-label mb-2">Dla firm B2B</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Kalkulatory ROI i decyzji o automatyzacji
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                  Konkretne liczby zamiast ogólników. Każde narzędzie kończy się
                  rekomendacją pierwszego kroku.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {businessTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 hover:border-accent/40 dark:hover:border-accent/50 transition-colors"
                  >
                    {tool.badge && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-accent text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        {tool.badge}
                      </span>
                    )}
                    <div className="w-10 h-10 rounded-xl bg-accent-light dark:bg-accent-dark-light text-accent flex items-center justify-center mb-4">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="16" height="16" rx="2.5" />
                        <path d="M7 7h8M7 11h8M7 15h5" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
                      {tool.description}
                    </p>
                    <span className="text-sm font-medium text-accent inline-flex items-center gap-1.5">
                      Otwórz narzędzie
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other tools */}
        <section className="py-16 lg:py-20 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <p className="section-label mb-2">Pozostałe</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  Narzędzia dla samodzielnych decyzji
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                  Kalkulatory niezwiązane bezpośrednio z automatyzacją B2B — ale
                  przydatne, jeśli prowadzisz JDG albo szukasz auta.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {otherTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group block rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden hover:border-accent/30 dark:hover:border-accent/50 transition-colors"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={tool.image}
                        alt={tool.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
