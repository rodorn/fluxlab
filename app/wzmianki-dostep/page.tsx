import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import WzmiankiFormularz from "@/components/WzmiankiFormularz";
import { dane } from "@/lib/fl-dane";
import { type Filtr, oplaconaSesja } from "@/lib/wzmianki";

export const metadata: Metadata = {
  title: "Frazy do śledzenia | Fluxlab",
  description: "Podaj, jakie wzmianki o firmie mamy zbierać.",
  alternates: { canonical: "/wzmianki-dostep" },
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const KARTA =
  "mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ sesja?: string }>;
}) {
  const { sesja = "" } = await searchParams;
  const s = await oplaconaSesja(sesja);
  let filtr: Filtr | null = null;
  if (s) {
    try {
      filtr = (await dane("wzmianki").pobierz<Filtr>("filtry", sesja))?.dane ?? null;
    } catch {
      filtr = null;
    }
  }
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className={KARTA}>
            {!s ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Ta strona działa tylko z linku po opłaceniu zamówienia. Jeśli go
                nie masz, odpisz na mail od nas.
              </p>
            ) : (
              <WzmiankiFormularz
                sesja={sesja}
                poczatkowe={
                  filtr
                    ? { frazy: filtr.frazy, wyklucz: filtr.wyklucz }
                    : null
                }
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
