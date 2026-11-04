import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSekcja from "@/components/FaqSekcja";
import SygnalyAutomatyzacji from "@/components/SygnalyAutomatyzacji";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "9 sygnałów, że czas na automatyzację | Fluxlab",
  description:
    "Dziewięć pytań o ręczną pracę w firmie. Zaznacz, co Cię dotyczy, a dostaniesz ocenę, czy automatyzacja się zwróci i od czego zacząć. Bez maila i rejestracji.",
  alternates: { canonical: "/sygnaly-automatyzacji" },
  openGraph: {
    title: "9 sygnałów, że czas na automatyzację | Fluxlab",
    description:
      "Dziewięć pytań o ręczną pracę w firmie. Zaznacz, co Cię dotyczy, a dostaniesz ocenę, czy automatyzacja się zwróci i od czego zacząć. Bez maila i rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, 9 sygnałów, że czas na automatyzację",
      },
    ],
  },
};

const PYTANIA = [
  { q: "Ile sygnałów oznacza, że warto automatyzować?", a: "Trzy i więcej to zwykle co najmniej jeden proces, który zwróci się w kilka miesięcy. Przy jednym czy dwóch wystarczy często gotowy program albo prosta reguła w narzędziu, które już masz." },
  { q: "Czy muszę podać maila, żeby zobaczyć wynik?", a: "Nie. Wynik i lista stron, od których warto zacząć, pokazują się od razu na tej stronie. Nic nie zapisujemy." },
  { q: "Od czego zacząć, gdy sygnałów jest dużo?", a: "Od audytu procesu. Dostajesz listę priorytetów z ceną każdego kroku, a koszt audytu odliczamy od wdrożenia." },
];

export default function SygnalyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          href="/sygnaly-automatyzacji"
          items={[{ label: "Narzędzia", href: "/narzedzia" }, { label: "9 sygnałów" }]}
        />
        <section className="pt-6 pb-8">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="section-label mb-3">Sprawdzenie w 2 minuty</p>
            <h1 className="h1-strony">9 sygnałów, że czas na automatyzację</h1>
            <p className="hero-lead">
              Zaznacz, które zdania pasują do Twojej firmy. Wynik pokaże, czy
              automatyzacja się zwróci i od którego procesu zacząć. Bez maila
              i rejestracji.
            </p>
          </div>
        </section>
        <section className="max-w-3xl mx-auto px-6 lg:px-8 pb-12" aria-label="Sygnały">
          <NazwaNarzedzia href="/sygnaly-automatyzacji" dane />
          <SygnalyAutomatyzacji />
        </section>
        <FaqSekcja pytania={PYTANIA} sciezka="/sygnaly-automatyzacji" className="container-wide pb-14" />
        <CTA naglowek="Sprawdź, który z Twoich procesów zwróci się najszybciej" />
      </main>
      <Footer />
    </>
  );
}
