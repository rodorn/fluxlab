import type { Metadata } from "next";

import {
  businessTools,
  otherTools,
  narzedziaFilaru,
  FILARY_NARZEDZI,
  FILAR_INTRO_NARZEDZI,
  type Narzedzie,
} from "@/lib/narzedzia";
import { CATEGORY_LABEL } from "@/lib/products";
import WyborNarzedzia from "@/components/WyborNarzedzia";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title:
    "Narzędzia: kalkulatory ROI, audyty CRM i decyzje biznesowe | Fluxlab",
  description:
    "Bezpłatne narzędzia online dla firm B2B: kalkulator kosztu ręcznej obsługi leadów, audyt CRM, decyzja zatrudnić/zautomatyzować, kalkulator podatkowy JDG. Bez rejestracji.",
  openGraph: {
    title:
      "Narzędzia: kalkulatory ROI, audyty CRM i decyzje biznesowe | Fluxlab",
    description:
      "Bezpłatne narzędzia online dla firm B2B: kalkulator kosztu ręcznej obsługi leadów, audyt CRM, decyzja zatrudnić/zautomatyzować, kalkulator podatkowy JDG.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/narzedzia",
  },
};

// Ikona ma odrozniac narzedzia, a nie tylko ozdabiac karte. Przy szesciu
// identycznych ikonach oko nie ma sie czego zlapac i trzeba czytac wszystko.
const IKONY: Record<string, React.ReactElement> = {
  tarcza: (
    <>
      <path d="M11 2.5 4 5.5v5c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5v-5L11 2.5Z" />
      <path d="M8.5 11.5 10.5 13.5 14 9.5" />
    </>
  ),
  metka: (
    <>
      <path d="M3 10.5V4.5A1.5 1.5 0 0 1 4.5 3h6l8 8-7.5 7.5L3 10.5Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </>
  ),
  jezyk: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M3 11h16M11 3c2.2 2.4 3.3 5.1 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5.1-3.3-8S8.8 5.4 11 3Z" />
    </>
  ),
  pinezka: (
    <>
      <path d="M11 19.5S4.5 13.8 4.5 9a6.5 6.5 0 1 1 13 0c0 4.8-6.5 10.5-6.5 10.5Z" />
      <circle cx="11" cy="9" r="2.3" />
    </>
  ),
  moneta: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="M11 6.5v9M13.5 8.5c-.6-.8-1.5-1.2-2.5-1.2-1.5 0-2.6.8-2.6 2s1 1.7 2.6 2.1c1.6.4 2.6.9 2.6 2.1 0 1.2-1.1 2-2.6 2-1 0-1.9-.4-2.5-1.2" />
    </>
  ),
  paczka: (
    <>
      <path d="M3 7.5 11 3.5l8 4v7l-8 4-8-4v-7Z" />
      <path d="M3 7.5 11 11.5l8-4M11 11.5v7" />
    </>
  ),
  lupa: (
    <>
      <circle cx="9.5" cy="9.5" r="6" />
      <path d="M14 14l4.5 4.5" />
    </>
  ),
  koperta: (
    <>
      <rect x="2.5" y="4.5" width="17" height="13" rx="2" />
      <path d="M2.5 6.5 11 12l8.5-5.5" />
    </>
  ),
  kalkulator: (
    <>
      <rect x="4" y="2.5" width="14" height="17" rx="2" />
      <path d="M7.5 6.5h7M7.5 10.5h.01M11 10.5h.01M14.5 10.5h.01M7.5 14h.01M11 14h.01M14.5 14h.01" />
    </>
  ),
  lista: (
    <>
      <rect x="3" y="3" width="16" height="16" rx="2.5" />
      <path d="M7 7h8M7 11h8M7 15h5" />
    </>
  ),
  mlotek: (
    <>
      <path d="M3.5 18.5 11 11" />
      <path d="M9.5 6.5 14 2l5 5-4.5 4.5-5-5Z" />
      <path d="M2.5 19.5 4 18l1.5 1.5L4 21l-1.5-1.5Z" />
    </>
  ),
  pieczec: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <circle cx="11" cy="11" r="4" />
      <path d="M11 1.5v3M11 17.5v3M1.5 11h3M17.5 11h3" />
    </>
  ),
  mapa: (
    <>
      <path d="M3 5.5 8 3.5l6 2 5-2v13l-5 2-6-2-5 2v-13Z" />
      <path d="M8 3.5v13M14 5.5v13" />
    </>
  ),
  klucz: (
    <>
      <circle cx="7.5" cy="7.5" r="4" />
      <path d="M10.4 10.4 18 18M15 15l2-2M12.8 12.8l2-2" />
    </>
  ),
  oko: (
    <>
      <path d="M2.5 11S6 4.5 11 4.5 19.5 11 19.5 11 16 17.5 11 17.5 2.5 11 2.5 11Z" />
      <circle cx="11" cy="11" r="2.6" />
      <path d="M4 4l14 14" />
    </>
  ),
  zwrot: (
    <>
      <path d="M4 11a7 7 0 1 1 2.6 5.4" />
      <path d="M4 6.5V11h4.5" />
    </>
  ),
  rozwidlenie: (
    <>
      <path d="M11 19v-5" />
      <path d="M11 14 5 8.5V4M11 14l6-5.5V4" />
      <circle cx="5" cy="3" r="1.6" />
      <circle cx="17" cy="3" r="1.6" />
    </>
  ),
};





/** Kafelek narzedzia. Wyjety z petli, bo lista jest teraz podzielona na trzy
 *  filary i ten sam markup renderuje sie w trzech miejscach. */
function KafelekNarzedzia({ tool }: { tool: Narzedzie }) {
  return (
    <Link
      href={tool.href}
      className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 p-6 hover:border-accent/40 dark:hover:border-accent/50 transition-colors"
    >
      {tool.badge && (
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-accent-solid text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {tool.badge}
        </span>
      )}
      <div className="w-10 h-10 rounded-xl bg-accent-light dark:bg-accent-dark-light text-accent flex items-center justify-center mb-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {IKONY[tool.ikona ?? "lista"] ?? IKONY.lista}
        </svg>
      </div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
        {tool.title}
      </h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
        {tool.description}
      </p>
      <span className="text-sm font-medium text-accent inline-flex items-center gap-1.5">
        Otwórz narzędzie
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function Narzedzia() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Narzędzia" }]} />
        {/* Hero, kompaktowy */}
        <section className="pt-24 pb-12 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Narzędzia</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Praktyczne narzędzia online
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Bezpłatne kalkulatory i narzędzia, które pomagają podejmować
                lepsze decyzje. Bez rejestracji, bez zbędnych kroków.
              </p>
              <Link href="#sekcje" className="btn-primary">
                Przeglądaj narzędzia
              </Link>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach, nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Kategorie narzędzi"
            tabs={[
              {
                label: "Dla firm B2B",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-5xl mx-auto">
                      <div className="mb-8">
                        <p className="section-label mb-2">Dla firm B2B</p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                          Sprawdź swoją firmę, zanim zapłacisz komukolwiek
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                          Każde narzędzie pracuje na Twoich danych i kończy
                          konkretną liczbą albo werdyktem, nie ogólnikiem. Bez
                          rejestracji i bez zostawiania adresu.
                        </p>
                      </div>
                      <WyborNarzedzia />
                      {FILARY_NARZEDZI.map((filar) => {
                        const wFilarze = narzedziaFilaru(filar);
                        if (!wFilarze.length) return null;
                        return (
                          <section key={filar} className="mt-12 first:mt-10">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {CATEGORY_LABEL[filar]}
                            </h3>
                            <p className="mt-1 mb-6 text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                              {FILAR_INTRO_NARZEDZI[filar]}
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                              {wFilarze.map((tool) => (
                                <KafelekNarzedzia key={tool.href} tool={tool} />
                              ))}
                            </div>
                          </section>
                        );
                      })}
                    </div>
                  </div>
                ),
              },
              {
                label: "Pozostałe",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-5xl mx-auto">
                      <div className="mb-8">
                        <p className="section-label mb-2">Pozostałe</p>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                          Narzędzia dla samodzielnych decyzji
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
                          Kalkulatory niezwiązane bezpośrednio z automatyzacją
                          B2B, ale przydatne, jeśli prowadzisz JDG albo szukasz
                          auta.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        {otherTools.map((tool) => (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            className="group block rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 overflow-hidden hover:border-accent/30 dark:hover:border-accent/50 transition-colors"
                          >
                            {tool.image && (
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <Image
                                src={tool.image}
                                alt={tool.title}
                                width={400}
                                height={250}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                unoptimized
                              />
                            </div>
                            )}
                            <div className="p-6">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                                {tool.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        ))}
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
