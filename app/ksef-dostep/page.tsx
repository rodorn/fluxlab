import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import DostepKsef from "@/components/DostepKsef";

export const metadata: Metadata = {
  title: "Dane do KSeF | Fluxlab",
  description: "Podaj NIP i token KSeF, żeby uruchomić zamówioną usługę.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ksef-dostep" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ sesja?: string }> }) {
  const { sesja = "" } = await searchParams;
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12">
            <DostepKsef sesja={sesja} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
