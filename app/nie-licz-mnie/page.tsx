import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WylaczLicznik from "@/components/WylaczLicznik";

export const metadata: Metadata = {
  title: "Nie licz moich wizyt | Fluxlab",
  description:
    "Przełącznik wyłączający licznik odwiedzin dla tej przeglądarki. Dla osób, które pracują nad tą stroną i nie chcą zawyżać własnych statystyk.",
  alternates: { canonical: "/nie-licz-mnie" },
  robots: { index: false, follow: false },
};

export default function NieLiczMnie() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs items={[{ label: "Nie licz moich wizyt" }]} />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Nie licz moich wizyt
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Kto pracuje nad stroną, odwiedza ją częściej niż ktokolwiek inny.
          Przy kilkudziesięciu wejściach na dobę własne wizyty przestają być
          szumem i stają się większością wyniku.
        </p>
        <div className="mt-8">
          <WylaczLicznik />
        </div>
      </main>
      <Footer />
    </>
  );
}
