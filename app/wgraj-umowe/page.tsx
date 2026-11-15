import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WgrajUmowe from "@/components/WgrajUmowe";
import { OFERTA } from "@/lib/sprzedaz";

export const metadata: Metadata = {
  title: "Wgraj dokument | Fluxlab",
  description: "Wgraj plik PDF po opłaceniu zamówienia, a wynik analizy pokażemy na ekranie i wyślemy mailem.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/wgraj-umowe" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ p?: string; sesja?: string }> }) {
  const { p = "", sesja = "" } = await searchParams;
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12">
            <WgrajUmowe sesja={sesja} porownanie={OFERTA[p]?.wgraj === "porownanie"} pytanie={OFERTA[p]?.wgraj === "pytanie"} faktury={OFERTA[p]?.wgraj === "faktury"} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
