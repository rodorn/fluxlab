import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Narzędzia — kalkulator kosztów, dobór samochodu, kalkulator podatkowy | Fluxlab",
  description: "Praktyczne narzędzia online: dobór samochodu, kalkulator kosztów posiadania auta i kalkulator podatkowy JDG. Bez rejestracji, za darmo.",
  openGraph: {
    title: "Narzędzia — kalkulator kosztów, dobór samochodu, kalkulator podatkowy | Fluxlab",
    description: "Praktyczne narzędzia online: dobór samochodu, kalkulator kosztów posiadania auta i kalkulator podatkowy JDG.",
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

const tools = [
  {
    title: "Dobór samochodu",
    description: "Znajdź idealny segment, nadwozie i moc dla siebie. Odpowiedz na kilka pytań, a algorytm dopasuje najlepsze propozycje.",
    href: "/dobor-samochodu",
    image: "/photos/car-chooser/type-sport.webp",
  },
  {
    title: "Kalkulator kosztów",
    description: "Oblicz pełny koszt posiadania samochodu: paliwo, ubezpieczenie, serwis, amortyzacja i więcej.",
    href: "/kalkulator-kosztow",
    image: "/photos/car-chooser/type-osobowy.jpg",
  },
  {
    title: "Kalkulator podatkowy JDG",
    description: "Porównaj skalę podatkową, podatek liniowy i ryczałt. Uwzględnia składki ZUS, VAT, ulgi i daje jasną odpowiedź, co się bardziej opłaca.",
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
                Bezpłatne kalkulatory i narzędzia, które pomagają podejmować lepsze
                decyzje. Bez rejestracji, bez zbędnych kroków.
              </p>
            </div>
          </div>
        </section>

        {/* Tools grid */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
              {tools.map((tool) => (
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
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                      {tool.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
