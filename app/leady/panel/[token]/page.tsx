import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PanelLeadow from "@/components/PanelLeadow";
import { panel } from "@/lib/leady/rdzen";

export const metadata: Metadata = {
  title: "Panel zgłoszeń | Fluxlab",
  description: "Lista zgłoszeń i ustawienia usługi leadowej.",
  alternates: { canonical: "/leady/panel" },
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) notFound();
  const d = await panel(token);
  if (!d) notFound();
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <h1 className="h1-strony mb-2">Panel zgłoszeń</h1>
            {!d.aktywny && (
              <p className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                Usługa jest wyłączona, bo subskrypcja została anulowana. Zgłoszenia nie są już przyjmowane.
              </p>
            )}
            <PanelLeadow panel={token} token={d.token} produkty={d.produkty} leady={d.leady} ankiety={d.ankiety} ustawienia={d.ustawienia} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
