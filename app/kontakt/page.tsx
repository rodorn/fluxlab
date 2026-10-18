import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import LiveDiagnosis from "@/components/LiveDiagnosis";

export const metadata: Metadata = {
  title: "Kontakt | Fluxlab",
  description:
    "Napisz, z czym potrzebujesz pomocy, strony WWW, automatyzacja, dane. Bezpłatna diagnoza, odpowiedź tego samego dnia.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Fluxlab",
    description:
      "Napisz, z czym potrzebujesz pomocy. Bezpłatna diagnoza, odpowiedź tego samego dnia.",
    locale: "pl_PL",
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/kontakt" items={[{ label: "Kontakt" }]} />
        <CTA />
        {/* Generator AI jako druga sekcja, pod formularzem. */}
        <div className="pt-8 lg:pt-12">
          <LiveDiagnosis />
        </div>
      </main>
      <Footer />
    </>
  );
}
