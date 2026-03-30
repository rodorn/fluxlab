import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
  description:
    "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI. Bez marketingowej mgły — konkrety dla firm B2B.",
  openGraph: {
    title: "Strefa wiedzy — automatyzacja procesów, CRM, API, raportowanie, AI | Fluxlab",
    description:
      "Praktyczne artykuły o automatyzacji procesów biznesowych, CRM, integracjach API, raportowaniu i AI.",
    locale: "pl_PL",
    type: "website",
  },
};

const categories = [
  {
    name: "Procesy",
    articles: [
      {
        href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
        title: "Co to jest automatyzacja procesów biznesowych?",
        description: "Praktyczny przewodnik — czym jest, gdzie daje efekt i od czego zacząć.",
      },
      {
        href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
        title: "Jak policzyć ROI z automatyzacji",
        description: "Prosty model bez ściemy: czas, koszt pracy, błędy i skala procesu.",
      },
    ],
  },
  {
    name: "CRM",
    articles: [
      {
        href: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
        title: "Automatyzacja CRM — od czego zacząć",
        description: "Audyt procesu, leady, zadania, statusy i pierwsze wdrożenia.",
      },
      {
        href: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
        title: "Jak uporządkować proces sprzedaży w CRM",
        description: "Etapy, kryteria przejścia, pola obowiązkowe i raportowanie.",
      },
      {
        href: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
        title: "Jak połączyć CRM z innymi systemami",
        description: "Model wdrożenia, najczęstsze błędy i jedno źródło prawdy.",
      },
    ],
  },
  {
    name: "Integracje",
    articles: [
      {
        href: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
        title: "Integracje API w firmie — kiedy warto?",
        description: "Kiedy API ma sens, jakie problemy rozwiązuje i kiedy lepiej nie komplikować.",
      },
    ],
  },
  {
    name: "Raportowanie",
    articles: [
      {
        href: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
        title: "Jak zautomatyzować raportowanie w firmie",
        description: "Krok po kroku: definicje, źródła danych, automatyczne dostarczanie.",
      },
      {
        href: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
        title: "Najczęstsze błędy w raportowaniu sprzedaży",
        description: "Złe definicje, rozjazd danych, vanity metrics i ręczne arkusze.",
      },
    ],
  },
  {
    name: "AI",
    articles: [
      {
        href: "/strefa-wiedzy/ai-w-automatyzacji-firm",
        title: "AI w automatyzacji firm",
        description: "Praktyczne zastosowania: klasyfikacja, streszczenia, wsparcie obsługi.",
      },
      {
        href: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
        title: "Kiedy AI ma sens, a kiedy nie",
        description: "Prosty framework decyzji: wolumen, powtarzalność, jakość danych.",
      },
    ],
  },
  {
    name: "JDG i podatki",
    articles: [
      {
        href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
        title: "Jaka forma opodatkowania JDG w 2026?",
        description: "Porównanie skali, liniowego i ryczałtu — kryteria wyboru, progi, pułapki.",
      },
      {
        href: "/strefa-wiedzy/ryczalt-czy-liniowy",
        title: "Ryczałt czy liniowy — co się bardziej opłaca",
        description: "Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć.",
      },
      {
        href: "/strefa-wiedzy/skala-czy-liniowy-jdg",
        title: "Skala czy liniowy — porównanie dla JDG",
        description: "Kwota wolna, progi, zdrowotna i realne scenariusze.",
      },
      {
        href: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
        title: "Jak liczyć składkę zdrowotną w JDG",
        description: "Zasady 2026 dla skali, liniowego i ryczałtu.",
      },
      {
        href: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
        title: "Mały ZUS Plus — kiedy się opłaca",
        description: "Warunki, limity, oszczędności i kiedy lepiej z niego nie korzystać.",
      },
      {
        href: "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
        title: "VAT w JDG — kiedy warto być vatowcem",
        description: "Zwolnienie podmiotowe, próg 200 000 zł i wpływ na cashflow.",
      },
    ],
  },
];

export default function StrefaWiedzy() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Wiedza</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Strefa wiedzy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Praktyczne artykuły o automatyzacji procesów, CRM, integracjach
                API, raportowaniu i AI. Bez marketingowej mgły — konkrety dla
                firm B2B.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto space-y-16">
              {categories.map((category) => (
                <div key={category.name}>
                  <h2 className="text-sm font-semibold text-accent uppercase tracking-widest mb-6">
                    {category.name}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.articles.map((article) => (
                      <Link
                        key={article.href}
                        href={article.href}
                        className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                      >
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {article.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Chcesz porozmawiać o automatyzacji w Twojej firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Bezpłatna konsultacja, bez zobowiązań.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Umów rozmowę
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
