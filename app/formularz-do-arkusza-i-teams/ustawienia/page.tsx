import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UstawieniaFormularza from "@/components/UstawieniaFormularza";

export const metadata: Metadata = {
  title: "Ustawienia formularza | Fluxlab",
  description: "Podłącz kanał Teams lub Slack do formularza.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/formularz-do-arkusza-i-teams/ustawienia" },
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-wide">
          <UstawieniaFormularza />
        </div>
      </main>
      <Footer />
    </>
  );
}
