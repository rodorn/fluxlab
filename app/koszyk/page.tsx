import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KoszykWidok from "@/components/KoszykWidok";

export const metadata: Metadata = {
  title: "Koszyk | Fluxlab",
  description: "Wybrane usługi, abonamenty i dodatki: stałe ceny opłacisz online, resztę wycenimy.",
  alternates: { canonical: "/koszyk" },
  robots: { index: false, follow: true },
};

export default function KoszykPage() {
  return (
    <>
      <Header />
      <main className="container-wide pt-28 pb-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Koszyk</h1>
        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
          Zbierz usługi, abonamenty i dodatki, których potrzebujesz. Pozycje ze stałą ceną opłacisz online jedną płatnością, a pozostałe wyślesz jednym zapytaniem: odpiszemy z wyceną i kolejnością wdrożenia.
        </p>
        <KoszykWidok />
      </main>
      <Footer />
    </>
  );
}
