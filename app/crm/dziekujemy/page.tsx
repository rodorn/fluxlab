import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimacjaWyslania from "@/components/AnimacjaWyslania";

export const metadata: Metadata = {
  title: "Dziękujemy, płatność przyjęta | Fluxlab",
  description: "Płatność za FluxCRM przyjęta. Fakturę VAT i dostęp wyślemy w ciągu 1 dnia roboczego.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/crm/dziekujemy" },
};

export default function CrmDziekujemy() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-10 lg:p-14 shadow-sm text-center">
              <div className="flex justify-center">
                <AnimacjaWyslania />
              </div>
              <h1 className="h1-strony mb-4">Dziękujemy, płatność przyjęta</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Fakturę VAT i dostęp do CRM wyślemy w ciągu 1 dnia roboczego na adres e-mail podany przy płatności.
              </p>
              <Link href="/wlasny-crm" className="btn-secondary mt-8 inline-block">
                Wróć do strony CRM
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
