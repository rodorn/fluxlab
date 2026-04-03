import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCostCalculator from "./CarCostCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kalkulator kosztów samochodu – Ile naprawdę kosztuje Twoje auto? | Fluxlab",
  description:
    "Oblicz pełny koszt posiadania samochodu: paliwo, serwis, spadek wartości. Poznaj koszt na kilometr i godzinę jazdy.",
  openGraph: {
    title: "Kalkulator kosztów samochodu – Ile naprawdę kosztuje Twoje auto? | Fluxlab",
    description:
      "Oblicz pełny koszt posiadania samochodu: paliwo, serwis, spadek wartości.",
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
    canonical: "/kalkulator-kosztow",
  },
};

export default function KalkulatorKosztowPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Kalkulator kosztów" }]} />
        <section className="py-16 lg:py-24">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kalkulator kosztów samochodu
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sprawdź ile naprawdę kosztuje posiadanie samochodu. Uwzględniamy
              paliwo, serwis i spadek wartości.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-wide">
            <CarCostCalculator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
