import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculator from "./TaxCalculator";

export const metadata: Metadata = {
  title: "Kalkulator podatkowy JDG – Skala vs Liniowy vs Ryczałt | Fluxlab",
  description:
    "Porównaj formy opodatkowania działalności gospodarczej: skalę podatkową, podatek liniowy i ryczałt. Uwzględnia ZUS, składkę zdrowotną, VAT i ulgi dla nowych firm.",
  openGraph: {
    title: "Kalkulator podatkowy JDG – Skala vs Liniowy vs Ryczałt | Fluxlab",
    description:
      "Porównaj formy opodatkowania JDG: skala, liniowy, ryczałt. ZUS, zdrowotna, VAT, ulgi.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KalkulatorPodatkowyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-16 lg:py-24">
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Narzędzie</p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Kalkulator podatkowy JDG
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Porównaj formy opodatkowania i sprawdź, która jest najkorzystniejsza
                  dla Twojej działalności. Uwzględnia składki ZUS, zdrowotną, VAT
                  i ulgi dla nowych firm.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/tax-calculation/calculator.jpg"
                    alt="Kalkulator podatkowy"
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-xl shadow-lg bg-white dark:bg-gray-900 flex items-center justify-center p-2">
                  <Image
                    src="/photos/tax-calculation/zus_logo.png"
                    alt="ZUS"
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-900">
                  <Image
                    src="/photos/tax-calculation/coin.jpg"
                    alt="Finanse"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-wide">
            <TaxCalculator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
