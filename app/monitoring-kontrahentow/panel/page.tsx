import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PanelMonitoringu } from "@/components/MonitoringKontrahentow";

export const metadata: Metadata = {
  title: "Lista kontrahentów do pilnowania | Fluxlab",
  description: "Lista firm, których status VAT i rachunki sprawdzamy codziennie.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/monitoring-kontrahentow/panel" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ sesja?: string }> }) {
  const { sesja = "" } = await searchParams;
  const poprawna = /^cs_(live|test)_[A-Za-z0-9]+$/.test(sesja);
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-8 lg:p-12">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Firmy do pilnowania</h1>
            <p className="mt-2 mb-6 text-sm text-gray-600 dark:text-gray-300">
              Wpisz NIP-y firm, które mają być pilnowane. Od zapisu sprawdzamy je codziennie i piszemy, gdy zmieni się status VAT albo rachunki. Ten sam link pozwala zmienić listę, więc zapisz go w zakładkach.
            </p>
            {poprawna ? (
              <PanelMonitoringu sesja={sesja} />
            ) : (
              <p role="alert" className="text-sm text-red-700 dark:text-red-400">
                Brakuje potwierdzenia płatności. Otwórz link z maila od Fluxlab albo wróć do strony produktu.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
