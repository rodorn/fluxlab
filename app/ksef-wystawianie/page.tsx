import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WystawianieKsef from "@/components/WystawianieKsef";
import { dane } from "@/lib/fl-dane";

export const metadata: Metadata = {
  title: "Faktury z pliku do KSeF | Fluxlab",
  description: "Podaj dane firmy i wgraj plik z fakturami, żeby wystawić je w KSeF.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/ksef-wystawianie" },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ sesja?: string }> }) {
  const { sesja = "" } = await searchParams;
  let maDane = false;
  let odnowa = false;
  if (/^cs_(live|test)_[A-Za-z0-9]+$/.test(sesja)) {
    try {
      const d = await dane("ksef").pobierz<{ status: string }>("dostepy", sesja);
      odnowa = d?.dane.status === "blad_tokenu";
      maDane = !!d && !odnowa;
    } catch {}
  }
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12">
            <WystawianieKsef sesja={sesja} maDane={maDane} odnowa={odnowa} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
