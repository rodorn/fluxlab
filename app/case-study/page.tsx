import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CTA from "@/components/CTA";
import Tabs from "@/components/Tabs";
import PorownanieProcesu from "./PorownanieProcesu";

export const metadata: Metadata = {
  title: "Modelowe przepływy automatyzacji | Fluxlab",
  description:
    "Obsługa leadów i tygodniowy raport, czynność po czynności, z minutami przy każdej. Policz, ile zajmują u Was. To modele, nie opisy cudzych wdrożeń.",
  alternates: {
    canonical: "/case-study",
  },
  openGraph: {
    title: "Modelowe przepływy automatyzacji | Fluxlab",
    description:
      "Obsługa leadów i tygodniowy raport, czynność po czynności, z minutami przy każdej. Bez udawania cudzych wdrożeń.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, modelowe przepływy automatyzacji",
      },
    ],
  },
};

export default function CaseStudy() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs href="/case-study" items={[{ label: "Modelowe przepływy" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-16 pb-6">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-3">O nas</p>
              <h1 className="h1-strony mb-5">
                Ile czasu pochłania proces przed automatyzacją i po niej
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Dwa procesy, które automatyzujemy najczęściej, rozpisane na
                czynności z minutami. Odznaczcie to, czego nie robicie, i
                zobaczcie własną sumę. Opisy wdrożeń z nazwą firmy dodamy w
                ramach{" "}
                <Link
                  href="/pilotaz"
                  className="text-accent hover:underline font-medium"
                >
                  programu case study
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony z modelowymi przepływami"
            tabs={[
              {
                label: "Porównanie procesu",
                content: (
                  <div className="py-6 lg:py-8">
                    <PorownanieProcesu />
                  </div>
                ),
              },
              {
                label: "Jak liczymy efekt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="h2-sekcji mb-5">
                        Jak liczymy efekt wdrożenia
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Porównujemy cztery rzeczy przed wdrożeniem i po nim.
                      </p>
                      <ol className="space-y-4">
                        {[
                          {
                            title: "Czas ręcznej pracy",
                            desc: "Minuty na jednego leada, raport albo fakturę.",
                          },
                          {
                            title: "Liczba powtórzeń",
                            desc: "Ile razy w miesiącu proces się wykonuje.",
                          },
                          {
                            title: "Liczba błędów",
                            desc: "Źle przepisane dane, duplikaty, zgubione leady.",
                          },
                          {
                            title: "Wartość zgubionych leadów",
                            desc: "Zwykle największa pozycja w rachunku.",
                          },
                        ].map((it, i) => (
                          <li
                            key={it.title}
                            className="flex gap-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-solid text-white flex items-center justify-center font-bold text-sm">
                              {i + 1}
                            </span>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {it.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {it.desc}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        Koszt zgubionych leadów policzy{" "}
                        <Link
                          href="/koszt-recznej-obslugi-leadow"
                          className="text-accent hover:underline font-medium"
                        >
                          kalkulator kosztu ręcznej obsługi leadów
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
