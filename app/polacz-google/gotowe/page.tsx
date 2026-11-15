import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Konto Google połączone | Fluxlab",
  description: "Usługa została uruchomiona.",
  alternates: { canonical: "/polacz-google/gotowe" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="px-4 pb-20 pt-32">
        <div className="mx-auto max-w-xl">
          <h1 className="h1-strony">Konto połączone</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Usługa działa. Pierwsze pliki pojawią się na Dysku Google w ciągu kilkunastu minut od nadejścia pasujących maili. Foldery zakłada aplikacja, wszystko znajdziesz w katalogu „Fluxlab”.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
