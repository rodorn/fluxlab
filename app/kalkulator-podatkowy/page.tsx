import type { Metadata } from "next";
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
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kalkulator podatkowy JDG
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Porównaj formy opodatkowania i sprawdź, która jest najkorzystniejsza
              dla Twojej działalności. Uwzględnia składki ZUS, zdrowotną, VAT
              i ulgi dla nowych firm.
            </p>
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
