import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FormularzNagrania from "@/components/FormularzNagrania";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Wyślij nagranie | Fluxlab",
  description: "Formularz dla klientów usług transkrypcji i protokołów ze spotkań.",
  alternates: { canonical: "/wyslij-nagranie" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="px-4 pb-20 pt-32">
      <div className="mx-auto max-w-xl">
        <h1 className="h1-strony">Wyślij nagranie</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Formularz dla klientów, którzy mają aktywną usługę transkrypcji albo protokołu ze spotkania.
          Wynik przyjdzie na adres e-mail podany przy płatności.
        </p>
        <FormularzNagrania />
      </div>
      </main>
      <Footer />
    </>
  );
}
