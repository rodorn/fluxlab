import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Mały ZUS Plus w 2026, kiedy się opłaca | Fluxlab",
  description:
    "Mały ZUS Plus w 2026: kto może skorzystać, jakie są warunki, limity przychodowe i ile realnie oszczędzasz. Porównanie z pełnym ZUS i ulgą na start.",
  openGraph: {
    title: "Mały ZUS Plus w 2026, kiedy się opłaca | Fluxlab",
    description:
      "Mały ZUS Plus w 2026: kto może skorzystać, jakie są warunki, limity przychodowe i ile realnie oszczędzasz. Porównanie z pełnym ZUS i ulgą na start.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
  },
};

const faqs = [
  {
    q: "Czy mały ZUS Plus obniża składkę zdrowotną?",
    a: "Nie. Dotyczy tylko składek społecznych. Zdrowotną liczysz według zasad swojej formy opodatkowania.",
  },
  {
    q: "Jak długo można korzystać z małego ZUS Plus?",
    a: "Najwyżej 36 miesięcy w ciągu ostatnich 60. Potem trzeba wrócić do pełnego ZUS na co najmniej 24 miesiące.",
  },
  {
    q: "Czy mały ZUS Plus wpływa na emeryturę?",
    a: "Tak. Niższe składki to mniej kapitału na koncie w ZUS i niższa emerytura.",
  },
  {
    q: "Czy można łączyć mały ZUS Plus z ryczałtem?",
    a: "Tak. Ulga nie zależy od formy opodatkowania: działa z ryczałtem, liniowym i skalą.",
  },
];

export default function MalyZusPlusArticle() {
  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Mały ZUS Plus, kiedy się opłaca" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Mały ZUS Plus, kiedy się opłaca w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Mały ZUS Plus obniża składki społeczne przy niższych przychodach.
              Czy warto, zależy od dochodu i tego, jak długo prowadzisz
              działalność.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Rozdziały artykułu o małym ZUS Plus"
            tabs={[
              {
                label: "Warunki",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Co to jest i kto może skorzystać
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Składki społeczne liczysz od dochodu z poprzedniego
                        roku, a nie od 60% przeciętnego wynagrodzenia (5 652 zł
                        w 2026). Ulga nie dotyczy składki zdrowotnej.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>przychód w poprzednim roku do 120 000 zł (przychód, nie dochód),</li>
                        <li>działalność przez co najmniej 60 dni w poprzednim roku,</li>
                        <li>brak ulgi na start i preferencyjnego ZUS w poprzednim roku,</li>
                        <li>nie pracujesz na rzecz byłego pracodawcy w tym samym zakresie,</li>
                        <li>najwyżej 36 miesięcy ulgi w ciągu ostatnich 60.</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Ile zaoszczędzisz",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Ile można zaoszczędzić
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Podstawa to roczny dochód podzielony przez liczbę dni
                        działalności, razy 30. Nie mniej niż 1 441,80 zł i nie
                        więcej niż 5 652 zł.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Pełny ZUS: ok. 1 788 zł/mies. składek społecznych</li>
                        <li>Dochód 5 000 zł/mies.: ok. 1 560 zł, oszczędność ok. 228 zł/mies.</li>
                        <li>Dochód 3 000 zł/mies.: ok. 936 zł, oszczędność ok. 852 zł/mies.</li>
                      </ul>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Sprawdź różnicę między pełnym i małym ZUS
                        </p>
                        <Link
                          href="/kalkulator-podatkowy"
                          className="btn-primary inline-block"
                        >
                          Sprawdź w kalkulatorze JDG 2026
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy nie warto",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Ścieżka ulg i kiedy mały ZUS Plus się nie opłaca
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Typowa ścieżka: 6 miesięcy ulgi na start (tylko
                        zdrowotna), 24 miesiące preferencyjnego ZUS (ok. 421
                        zł/mies.), potem mały ZUS Plus i pełny ZUS.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>przy wysokim dochodzie oszczędność jest minimalna,</li>
                        <li>niższe składki to niższa emerytura, zasiłek chorobowy i macierzyński,</li>
                        <li>bank przy kredycie patrzy na zadeklarowaną podstawę,</li>
                        <li>przychód blisko 120 000 zł może odebrać ulgę w kolejnym roku.</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Wniosek",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Jak złożyć wniosek
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zgłaszasz się deklaracją ZUS DRA z kodem 0590xx lub
                        0592xx, przez PUE ZUS (eZUS) albo w oddziale. Termin:
                        do 31 stycznia albo 7 dni od spełnienia warunków.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Spóźnienie oznacza utratę ulgi na cały rok, bez
                        zgłoszenia wstecz.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        FAQ
                      </h2>
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <details
                            key={faq.q}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                          >
                            <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                              {faq.q}
                              <span className="ml-4 shrink-0 text-gray-600 dark:text-gray-400 transition-transform group-open:rotate-45">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <line x1="10" y1="4" x2="10" y2="16" />
                                  <line x1="4" y1="10" x2="16" y2="10" />
                                </svg>
                              </span>
                            </summary>
                            <p className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                              {faq.a}
                            </p>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kontakt",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <PrevNextArticle currentHref="/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca" />

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Chcesz policzyć, ile zaoszczędzisz?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Sprawdź kalkulator lub umów bezpłatną konsultację.
                        </p>
                        <Link
                          href="/kontakt"
                          className="btn-primary inline-block"
                        >
                          Zamów diagnozę procesu
                        </Link>
                      </div>

                      <div className="mt-12">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Powiązane
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                          <li>
                            <Link
                              href="/kalkulator-podatkowy"
                              className="text-accent hover:underline"
                            >
                              Kalkulator podatkowy JDG 2026
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                              className="text-accent hover:underline"
                            >
                              Jaka forma opodatkowania JDG w 2026
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                              className="text-accent hover:underline"
                            >
                              Jak liczyć składkę zdrowotną w JDG
                            </Link>
                          </li>
                        </ul>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </>
  );
}
