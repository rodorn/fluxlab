import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LandingAnkieta from "@/components/LandingAnkieta";
import { db, zamowienie, type Strona } from "@/lib/landing";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Ankieta landingu | Fluxlab",
  description: "Treść Twojego landingu z formularzem.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/landing-ankieta" },
};
export const dynamic = "force-dynamic";

const KARTA =
  "mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 lg:p-12";

export default async function Page({ searchParams }: { searchParams: Promise<{ sesja?: string }> }) {
  const { sesja } = await searchParams;
  const z = sesja ? await zamowienie(sesja) : null;
  let wstepne: Strona | null = null;
  let nazwa = "";
  if (z?.aktywna) {
    const idx = await db.pobierz<{ slug: string }>("sesje", z.sesja);
    if (idx) wstepne = (await db.pobierz<Strona>("strony", idx.dane.slug))?.dane ?? null;
    const s = await stripe(`checkout/sessions/${z.sesja}`).catch(() => null);
    nazwa = s?.custom_fields?.find((f: { key: string }) => f.key === "dane")?.text?.value ?? "";
  }
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className={KARTA}>
            {!z?.aktywna ? (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Ta strona działa tylko z linku po opłaceniu zamówienia i dopóki subskrypcja jest aktywna. Jeśli go nie masz, odpisz na mail od nas.
              </p>
            ) : (
              <LandingAnkieta sesja={z.sesja} wstepne={wstepne} nazwaZamowienia={nazwa.slice(0, 80)} emailKlienta={z.email} />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
