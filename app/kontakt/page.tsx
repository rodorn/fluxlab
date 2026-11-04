import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import LiveDiagnosis from "@/components/LiveDiagnosis";
import FaqSekcja from "@/components/FaqSekcja";

export const metadata: Metadata = {
  title: "Kontakt | Fluxlab",
  description:
    "Napisz, z czym potrzebujesz pomocy, strony WWW, automatyzacja, dane. Bezpłatna diagnoza, odpowiedź w 1 dzień roboczy.",
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt | Fluxlab",
    description:
      "Napisz, z czym potrzebujesz pomocy. Bezpłatna diagnoza, odpowiedź w 1 dzień roboczy.",
    locale: "pl_PL",
    type: "website",
    images: ["/og?t=Kontakt%20%7C%20Fluxlab"],
  },
};

const PYTANIA_KONTAKT = [
  { q: "Co się dzieje po wysłaniu formularza?", a: "Od razu dostajesz potwierdzenie mailem. Tego samego dnia roboczego odpisujemy, czy widzimy sens współpracy, jaki byłby pierwszy krok, ile kosztuje i ile trwa." },
  { q: "Czy wycena jest płatna?", a: "Nie, wycena kosztuje 0 zł i do niczego nie zobowiązuje." },
  { q: "Czy możemy porozmawiać na żywo?", a: "Tak. W formularzu wybierz Google Meet i godzinę, zaproszenie z linkiem przyjdzie mailem. Możesz też wybrać telefon, wtedy dzwonimy w godzinach pracy, w 1 dzień roboczy." },
];

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
        <FaqSekcja pytania={PYTANIA_KONTAKT} sciezka="/kontakt" className="container-wide py-14" />
      </main>
      <Footer />
    </>
  );
}
