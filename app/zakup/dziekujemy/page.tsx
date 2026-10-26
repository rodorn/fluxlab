import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimacjaWyslania from "@/components/AnimacjaWyslania";
import { OFERTA } from "@/lib/sprzedaz";

export const metadata: Metadata = {
  title: "Zamówienie opłacone | Fluxlab",
  description: "Płatność przyjęta. Fakturę VAT wyślemy w ciągu 1 dnia roboczego.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/zakup/dziekujemy" },
};

export default async function ZakupDziekujemy({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const o = OFERTA[(await searchParams).p ?? ""];
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
              {o && <p className="mb-3 font-semibold text-gray-900 dark:text-white">{o.nazwa}</p>}
              <p className="text-gray-600 dark:text-gray-300">
                Fakturę VAT wyślemy w ciągu 1 dnia roboczego na adres e-mail podany przy płatności. W tym samym czasie
                odezwiemy się, żeby zacząć pracę.
              </p>
              <Link href={o?.strona ?? "/"} className="btn-secondary mt-8 inline-block">
                Wróć na stronę
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
