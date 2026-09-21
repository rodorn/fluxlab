import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";
import PorownanieProcesu from "./PorownanieProcesu";

export const metadata: Metadata = {
  title: "Modelowe przepływy automatyzacji | Fluxlab",
  description:
    "Obsługa leadów i tygodniowy raport, czynność po czynności, z minutami przy każdej. Policz na stronie, ile czasu zajmują u Was. To modele, nie opisy cudzych wdrożeń.",
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
        <Breadcrumbs items={[{ label: "Modelowe przepływy" }]} />

        {/* Hero, kompaktowy */}
        <section className="pt-16 pb-6">
          <div className="container-wide">
            <div className="max-w-3xl">
              <p className="section-label mb-3">Modelowe przepływy</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
                Ile czasu zjada proces przed automatyzacją i po niej
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Nie mam jeszcze wdrożeń u firm, więc nie znajdziecie tu cudzych
                wyników ani referencji. Zamiast tego dwa procesy, które
                automatyzuję najczęściej, rozpisane na czynności, z minutami
                przy każdej z nich. Możecie odkliknąć to, czego u siebie nie
                robicie, i zobaczyć własną sumę. Opis wdrożenia z nazwą firmy
                pojawi się tutaj dopiero wtedy, gdy takie wdrożenie powstanie i
                firma zgodzi się na publikację, na warunkach{" "}
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

        {/* Treść w zakładkach, nic nie wycięte, podzielone */}
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
                label: "Jak liczę efekt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                        Jak liczę efekt wdrożenia
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Bez wymyślnych modeli. Porównuję cztery rzeczy przed i
                        po wdrożeniu, to wystarczy, żeby zobaczyć, czy
                        automatyzacja się zwróciła.
                      </p>
                      <ol className="space-y-4">
                        {[
                          {
                            title: "Czas ręcznej pracy",
                            desc: "Ile minut na jednego leada / raport / fakturę przed automatyzacją vs po.",
                          },
                          {
                            title: "Liczba powtórzeń",
                            desc: "Ile razy w tygodniu/miesiącu proces się wykonuje. Bez tego oszczędność godziny to anegdota.",
                          },
                          {
                            title: "Liczba błędów",
                            desc: "Źle przepisane dane, podwójne zapytania, zgubione leady. Każdy błąd to cofnięcie procesu.",
                          },
                          {
                            title: "Wartość opóźnionych / zgubionych leadów",
                            desc: "Najczęściej pomijana metryka. Zwykle największa pozycja w kosztorysie.",
                          },
                        ].map((it, i) => (
                          <li
                            key={it.title}
                            className="flex gap-4 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
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
                        Pierwsze dwie rzeczy policzycie sami w zakładce
                        „Porównanie procesu”. Koszt zgubionych leadów dokłada{" "}
                        <Link
                          href="/kalkulator-leadow"
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
              {
                label: "Kontakt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Chcesz, żeby Wasz proces trafił tutaj?
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Trzy pierwsze firmy dostają wdrożenie za połowę ceny w
                        zamian za zgodę na publiczny opis efektu. Publikuję
                        tylko to, co zaakceptujecie.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/pilotaz" className="btn-primary">
                          Zobacz warunki programu
                        </Link>
                        <TrackedCTA
                          href="/kontakt"
                          location="case_study_final"
                          label="diagnoza"
                          eventName="cta_click_case_study"
                          className="btn-secondary"
                        >
                          Najpierw diagnoza procesu
                        </TrackedCTA>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
