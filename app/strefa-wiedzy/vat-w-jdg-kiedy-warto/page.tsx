import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrevNextArticle from "@/components/PrevNextArticle";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "VAT w JDG, kiedy warto być vatowcem w 2026? | Fluxlab",
  description:
    "Kiedy warto zarejestrować się jako czynny VAT w JDG? Zwolnienie podmiotowe, próg 200 000 zł, wpływ na cashflow, koszty i współpracę z firmami.",
  openGraph: {
    title: "VAT w JDG, kiedy warto być vatowcem w 2026? | Fluxlab",
    description:
      "Kiedy warto zarejestrować się jako czynny VAT w JDG? Zwolnienie podmiotowe, próg 200 000 zł, wpływ na cashflow, koszty i współpracę z firmami.",
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
    canonical: "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
  },
};

export default function VatWJdgArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs href="/strefa-wiedzy/vat-w-jdg-kiedy-warto" kolumna="srodek"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "VAT w JDG, kiedy warto" },
          ]}
        />

        <section className="pt-24 pb-10">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="h1-artykulu mt-4">
              VAT w JDG, kiedy warto być vatowcem
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Czynny VAT pozwala odliczać podatek od zakupów, ale podnosi cenę
              brutto. O wyborze decydują dwie rzeczy: czy sprzedajesz firmom
              (B2B) czy osobom prywatnym (B2C) i ile wydajesz na koszty z VAT.
            </p>
          </div>
        </section>

        <div className="container-wide pb-20 prose-justify">
          <Tabs
            ariaLabel="Rozdziały artykułu VAT w JDG"
            tabs={[
              {
                label: "Zwolnienie i obowiązek",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Zwolnienie podmiotowe
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Przy rocznej sprzedaży netto do 200 000 zł możesz
                        korzystać ze zwolnienia z VAT. Nie naliczasz VAT, nie
                        składasz JPK_V7, ale też nie odliczasz VAT od zakupów.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Zwolnienie działa domyślnie, bez wniosku. Rejestracja
                        jako czynny VAT wymaga formularza VAT-R. Gdy zaczynasz
                        w trakcie roku, limit liczy się proporcjonalnie.
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Kiedy musisz być vatowcem
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          Po przekroczeniu 200 000 zł obrotu, od transakcji,
                          która spowodowała przekroczenie
                        </li>
                        <li>
                          Sprzedaż towarów z załącznika nr 12 do ustawy o VAT
                          (m.in. metale szlachetne, elektronika, paliwa)
                        </li>
                        <li>Usługi prawnicze, doradcze i jubilerskie</li>
                        <li>Sprzedaż nowych środków transportu wewnątrz UE</li>
                        <li>Handel internetowy towarami akcyzowymi</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        W tych kategoriach rejestrujesz się od pierwszego dnia
                        działalności. Obrót warto monitorować na bieżąco.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy warto, kiedy nie",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Kiedy warto być vatowcem dobrowolnie
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Klienci B2B
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Firma odlicza VAT z Twojej faktury, więc liczy się dla
                        niej kwota netto. Zwolnienie nic jej nie daje, a Tobie
                        odbiera odliczenie VAT od zakupów.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Wysokie koszty z VAT
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Sprzęt, oprogramowanie, usługi, samochód: VAT od nich
                        odliczasz. Przy kosztach 5 000 zł netto miesięcznie to
                        1 150 zł VAT miesięcznie, czyli 13 800 zł rocznie.
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Kiedy NIE warto
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Klienci indywidualni (B2C)
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Osoba prywatna płaci cenę brutto. Usługa za 1 000 zł
                        netto kosztuje ją u vatowca 1 230 zł, a bez VAT 1 000
                        zł.
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Niskie koszty z VAT
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Gdy koszty to głównie ZUS i wynagrodzenia, nie ma czego
                        odliczać. Zostaje tylko comiesięczny JPK_V7 i wyższy
                        koszt księgowości.
                      </p>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center mt-12">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Sprawdź wpływ VAT na Twoje rozliczenie
                        </p>
                        <Link href="/kalkulator-podatkowy" className="btn-primary inline-block">
                          Sprawdź w kalkulatorze JDG 2026
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Cashflow, forma, samochód",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                      <h2 className="h2-sekcji mb-6">
                        Wpływ VAT na cashflow
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Faktura na 10 000 zł netto daje 12 300 zł na koncie,
                        ale 2 300 zł (minus VAT z zakupów) oddajesz do 25. dnia
                        następnego miesiąca albo, przy rozliczeniu kwartalnym,
                        miesiąca po kwartale.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        VAT płacisz, nawet gdy klient spóźnia się z zapłatą.
                        Odkładaj go na osobne subkonto zaraz po wystawieniu
                        faktury.
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        VAT a forma opodatkowania
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        VAT i PIT to osobne decyzje. Czynny VAT połączysz z
                        ryczałtem, liniowym i skalą. Ryczałtowiec nie odlicza
                        kosztów w PIT, ale VAT od zakupów odlicza. Więcej w
                        artykule 
                        <Link
                          href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                          className="text-accent hover:underline"
                        >
                          Jaka forma opodatkowania JDG w 2026
                        </Link>
                        .
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        VAT a samochód w firmie
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          Użytek mieszany: odliczasz 50% VAT od zakupu i
                          eksploatacji, bez kilometrówki
                        </li>
                        <li>
                          Wyłącznie firmowy: 100% VAT, ale kilometrówka,
                          zgłoszenie VAT-26 i regulamin użytkowania
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Przy aucie za 100 000 zł netto to 11 500 zł albo 23 000
                        zł odliczenia. W jednoosobowej firmie 100% jest trudne
                        do utrzymania.
                      </p>

                      <h2 className="h2-sekcji mb-6 mt-12">
                        Podsumowanie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        B2B i koszty z VAT: rejestracja prawie zawsze się
                        opłaca. B2C i niskie koszty: zwolnienie jest prostsze i
                        daje niższą cenę brutto. Z VAT możesz zrezygnować po
                        roku, jeśli obrót nie przekracza 200 000 zł.
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
                      <h2 className="h2-sekcji mb-6">
                        FAQ
                      </h2>
                      <div className="space-y-4">
                        <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                          <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                            Czy możemy zrezygnować z VAT po rejestracji?
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
                            Tak, najwcześniej po roku, jeśli obrót nie przekroczył 200 000 zł. Rezygnację zgłaszasz na VAT-R.
                          </p>
                        </details>

                        <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                          <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                            Czy ryczałtowiec może być vatowcem?
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
                            Tak. Forma PIT i status VAT to osobne decyzje.
                          </p>
                        </details>

                        <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                          <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                            Czy klienci indywidualni wolą firmy bez VAT?
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
                            Często tak, bo płacą cenę brutto, a ta jest niższa bez VAT.
                          </p>
                        </details>

                        <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                          <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                            Jak często trzeba składać JPK_V7?
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
                            Co miesiąc. Kwartalna może być tylko część deklaracyjna u małych podatników.
                          </p>
                        </details>
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
                      <PrevNextArticle currentHref="/strefa-wiedzy/vat-w-jdg-kiedy-warto" />

                      <CTA />

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
                              href="/strefa-wiedzy/ryczalt-czy-liniowy"
                              className="text-accent hover:underline"
                            >
                              Ryczałt czy liniowy, co wybrać
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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Czy możemy zrezygnować z VAT po rejestracji?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak, najwcześniej po roku, jeśli obrót nie przekroczył 200 000 zł. Rezygnację zgłaszasz na VAT-R.",
                },
              },
              {
                "@type": "Question",
                name: "Czy ryczałtowiec może być vatowcem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak. Forma PIT i status VAT to osobne decyzje.",
                },
              },
              {
                "@type": "Question",
                name: "Czy klienci indywidualni wolą firmy bez VAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Często tak, bo płacą cenę brutto, a ta jest niższa bez VAT.",
                },
              },
              {
                "@type": "Question",
                name: "Jak często trzeba składać JPK_V7?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Co miesiąc. Kwartalna może być tylko część deklaracyjna u małych podatników.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
