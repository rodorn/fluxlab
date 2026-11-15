import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NoweFirmyFormularz from "@/components/NoweFirmyFormularz";
import { dane } from "@/lib/fl-dane";
import { type Filtr, WOJEWODZTWA, oplaconaSesja } from "@/lib/nowe-firmy";

export const metadata: Metadata = {
  title: "Wybór branży i regionu | Fluxlab",
  description: "Wybierz, jakie nowe spółki mamy wysyłać na maila.",
  alternates: { canonical: "/nowe-firmy-dostep" },
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
      filtr = (await dane("nowefirmy").pobierz<Filtr>("filtry", sesja))?.dane ?? null;
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
              <NoweFirmyFormularz
                sesja={sesja}
                wojewodztwa={[...WOJEWODZTWA]}
                poczatkowe={
                  filtr
                    ? {
                        pkd: filtr.pkd,
                        woj: filtr.woj,
                        tylkoGlowne: filtr.tylkoGlowne,
                      }
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
