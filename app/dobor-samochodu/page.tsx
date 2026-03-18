import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarConfigurator from "./CarConfigurator";

export const metadata: Metadata = {
  title: "Dobór samochodu – Znajdź idealny samochód dla siebie | Fluxlab",
  description:
    "Interaktywne narzędzie do doboru samochodu. Dopasuj segment, nadwozie i moc do swoich potrzeb – bez marketingowej ściemy.",
  openGraph: {
    title: "Dobór samochodu – Znajdź idealny samochód dla siebie | Fluxlab",
    description:
      "Interaktywne narzędzie do doboru samochodu. Dopasuj segment, nadwozie i moc do swoich potrzeb.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function DoborSamochoduPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dobierz idealny samochód
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Odpowiedz na kilka pytań, a podpowiemy Ci jaki segment, typ
              nadwozia i moc silnika najlepiej pasują do Twojego stylu jazdy.
            </p>
          </div>
        </section>

        {/* Configurator */}
        <section className="pb-24">
          <div className="container-wide">
            <CarConfigurator />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
