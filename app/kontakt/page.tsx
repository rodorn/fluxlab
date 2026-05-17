import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Kontakt — Fluxlab",
  description:
    "Napisz, z czym potrzebujesz pomocy — strony WWW, automatyzacja, dane. Bezpłatna diagnoza, odpowiedź w 24h.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt — Fluxlab",
    description:
      "Napisz, z czym potrzebujesz pomocy. Bezpłatna diagnoza, odpowiedź w 24h.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Kontakt" }]} />
        <div className="pt-8 lg:pt-12">
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
