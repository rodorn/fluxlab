import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import TaxCalculator from "@/app/kalkulator-podatkowy/TaxCalculator";

// Strona dla widzow HAJS METRICS (odcinek o zarobkach warsztatu, 4.11.2026).
// Widz wpisuje fluxlab.pl/hajs z ekranu, redirect w next.config.ts dokleja
// utm, dzieki czemu zrodlo trafia do licznika i do formularza. Strona jest
// poza indeksem: ten sam kalkulator stoi na /kalkulator-podatkowy.
export const metadata: Metadata = {
  title: "Kalkulator JDG dla widzów HAJS METRICS | Fluxlab",
  description:
    "Policz, ile zostaje w warsztacie na ryczałcie, liniowym i skali w 2026. Do tego: co w warsztacie da się zautomatyzować i za ile.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/hajs" },
};

const DLA_WARSZTATU = [
  [
    "Przypomnienia dla klientów",
    "SMS lub mail przed przeglądem, wymianą opon i końcem gwarancji, z Twojej bazy zleceń. Klient wraca sam, bez dzwonienia.",
  ],
  [
    "Zlecenia i faktury bez przepisywania",
    "Zlecenie z telefonu albo formularza trafia do kalendarza i do faktury. KSeF obsługujemy od pierwszego dnia obowiązku.",
  ],
  [
    "Marża na każdym zleceniu",
    "Raport raz w tygodniu: części, robocizna, czas, kto przynosi zysk. Liczby z systemu, nie z pamięci.",
  ],
];

export default function HajsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-16 pb-6">
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-3">Z odcinka HAJS METRICS</p>
            <h1 className="h1-strony">Ile naprawdę zostaje w warsztacie</h1>
            <p className="hero-lead">
              W odcinku liczyliśmy przychód i koszty. Tu policzysz resztę:
              ZUS, składkę zdrowotną i podatek na ryczałcie, liniowym i
              skali w 2026. Wpisz swoje liczby, wynik jest od razu, bez
              rejestracji.
            </p>
          </div>
        </section>

        <section className="container-wide pb-16">
          <div className="max-w-6xl mx-auto">
            <TaxCalculator />
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-3xl">
            Model uproszczony, bez ulg typu IP Box i rozliczenia z małżonkiem.
            Jak liczymy:{" "}
            <Link href="/strefa-wiedzy/ryczalt-czy-liniowy" className="text-accent hover:underline">
              ryczałt czy liniowy w 2026
            </Link>
            .
          </p>
        </section>

        <section className="pb-16">
          <div className="container-wide max-w-3xl">
            <p className="section-label mb-3">Co robimy</p>
            <h2 className="h2-sekcji">Automatyzacja dla warsztatu</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              FluxLab buduje automatyzacje dla małych firm. Pierwszy krok
              kosztuje 900 do 1 500 zł i zajmuje 5 dni, cena jest stała i
              podana przed pracą.
            </p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-3">
              {DLA_WARSZTATU.map(([t, o]) => (
                <div key={t}>
                  <dt className="text-sm font-semibold text-gray-900 dark:text-white">{t}</dt>
                  <dd className="mt-1 text-sm text-gray-600 dark:text-gray-400">{o}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <CTA
        naglowek="Opisz, co w warsztacie zabiera Ci najwięcej czasu"
        opis="Odpisujemy tego samego dnia: co da się zautomatyzować, za ile i w jakim terminie. Bez zobowiązań. Wejście z odcinka pamiętamy, więc nie musisz o nim pisać."
      />
      <Footer />
    </>
  );
}
