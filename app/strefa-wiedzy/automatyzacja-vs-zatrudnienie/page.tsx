import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import Tabs from "@/components/Tabs";
import PrevNextArticle from "@/components/PrevNextArticle";
import KalkulatorDecyzji from "@/components/KalkulatorDecyzji";
import NazwaNarzedzia from "@/components/NazwaNarzedzia";

export const metadata: Metadata = {
  title: "Automatyzacja czy zatrudnienie w MŚP | Fluxlab",
  description:
    "Kiedy zatrudnić kolejną osobę, a kiedy zautomatyzować proces. Realne koszty, ryzyka i kalkulator decyzji dla firm B2B w 2026.",
  openGraph: {
    title: "Automatyzacja czy zatrudnienie w MŚP | Fluxlab",
    description:
      "Kiedy zatrudnić kolejną osobę, a kiedy zautomatyzować proces. Realne koszty, ryzyka i kalkulator decyzji dla firm B2B w 2026.",
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
    canonical: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
  },
};

export default function AutomatyzacjaVsZatrudnienieArticle() {
  const faqItems = [
    {
      question:
        "Czy automatyzacja realnie zastępuje pracownika, czy tylko odciąża?",
      answer:
        "W większości firm odciąża. Przejmuje przepisywanie danych, przypomnienia, raporty i synchronizację systemów. Decyzje, rozmowy z klientem i wyjątki zostają przy człowieku.",
    },
    {
      question: "Ile kosztuje automatyzacja jednego procesu?",
      answer:
        "Wdrożenie pojedynczego procesu to u nas 1 500 do 8 000 zł, zależnie od liczby integracji i wyjątków. Narzędzia dla kilkunastu scenariuszy to zwykle 200 do 600 zł miesięcznie.",
    },
    {
      question: "Czy automatyzacja wymaga utrzymania?",
      answer:
        "Tak. Kilkanaście scenariuszy to zwykle 2 do 6 godzin pracy miesięcznie: zmiany w API dostawców i drobne poprawki. U zewnętrznego partnera to 500 do 1 500 zł miesięcznie.",
    },
    {
      question: "Czy kalkulator zastępuje wycenę?",
      answer:
        "Nie. Pokazuje, czy w ogóle warto rozmawiać o automatyzacji danego procesu. Wycena wymaga rozmowy o systemach, wyjątkach i dostępności API.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16 prose-justify">
        <Breadcrumbs href="/strefa-wiedzy/automatyzacja-vs-zatrudnienie" kolumna="waska"
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Automatyzacja vs zatrudnienie" },
          ]}
        />

        <section className="pt-16 pb-6">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 h1-artykulu">
              Automatyzacja vs zatrudnienie, co się bardziej opłaca w MŚP
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed !text-left">
              Pracy przybywa, zespół ma pełne ręce. Kalkulator po czterech
              ustawieniach pokazuje, czy taniej wychodzi ręczna praca, etat, czy
              wdrożenie.
            </p>
            <div className="mt-6">
              <Link href="#kalkulator" className="btn-primary">
                Otwórz kalkulator
              </Link>
            </div>
          </div>
        </section>

        <div className="container-wide pb-8">
          <Tabs
            ariaLabel="Rozdziały artykułu"
            tabs={[
              {
                label: "Kalkulator",
                kotwica: "kalkulator",
                content: (
                  <div className="py-6 lg:py-8">
                    <NazwaNarzedzia href="/strefa-wiedzy/automatyzacja-vs-zatrudnienie" />
                    <KalkulatorDecyzji />
                    <p className="max-w-3xl mx-auto mt-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      Etat liczymy jako stawkę razy 168 godzin, czyli minimum
                      bez ZUS-u, urlopu i sprzętu. Jeśli automatyzacja wygrywa
                      nawet z tym minimum, po pełnym koszcie wygrywa tym
                      bardziej.
                    </p>
                  </div>
                ),
              },
              {
                label: "Koszty",
                kotwica: "koszty",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="mb-6 h2-sekcji">
                        Ile kosztuje etat, a ile automatyzacja
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Pensja 6 000 zł brutto na UoP to ok. 7 240 zł
                        miesięcznie po stronie pracodawcy. Z urlopem, sprzętem i
                        wdrożeniem roczny koszt juniora to 95 do 110 tys. zł.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Do tego dochodzi rekrutacja (15 do 30 godzin managera),
                        2 do 3 miesięcy niepełnej wydajności i rotacja 15 do 25%
                        rocznie.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                        <li>Prosty proces: 1 500 do 3 000 zł jednorazowo</li>
                        <li>
                          Średnio złożony, z logiką warunkową: 3 000 do 5 000 zł
                        </li>
                        <li>Złożony, bez gotowego API: 5 000 do 8 000 zł</li>
                        <li>
                          Narzędzia i utrzymanie: kilkaset zł do 1 500 zł
                          miesięcznie
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400">
                        Ten sam rachunek z drugiej strony:{" "}
                        <Link
                          href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                          className="text-accent hover:underline"
                        >
                          jak policzyć ROI z automatyzacji
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Jak zdecydować",
                kotwica: "framework",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="mb-6 h2-sekcji">
                        Cztery pytania, które rozstrzygają
                      </h2>
                      <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-400 mb-6">
                        <li>
                          <strong>Ile godzin miesięcznie?</strong> Poniżej 10
                          zostaw ręcznie. Od 10 do 40 automatyzacja prawie
                          zawsze wygrywa. Powyżej 80 zautomatyzuj większość i
                          dopełnij części etatu.
                        </li>
                        <li>
                          <strong>Rutyna czy osąd?</strong> Back-office to
                          głównie rutyna i dobrze się automatyzuje. Sprzedaż i
                          obsługa ważnych klientów wymagają człowieka.
                        </li>
                        <li>
                          <strong>Czy proces jest stabilny?</strong> Jeśli
                          zasady zmieniają się co tydzień, najpierw zatrudnij, a
                          po kilku miesiącach zautomatyzuj to, co się powtarza.
                        </li>
                        <li>
                          <strong>Jak szybko?</strong> Rekrutacja trwa 2 do 4
                          miesięcy, pilotaż automatyzacji 2 do 4 tygodni.
                        </li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400">
                        Najczęściej wygrywa hybryda: jedna osoba plus
                        automatyzacja zamiast dwóch osób bez niej. Wyłączenie
                        scenariusza to kilka kliknięć, zwolnienie pracownika to
                        miesiące. Więcej w artykule o{" "}
                        <Link
                          href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                          className="text-accent hover:underline"
                        >
                          automatyzacji CRM
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Ryzyka",
                kotwica: "ryzyka",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="mb-6 h2-sekcji">
                        Ryzyka po obu stronach
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Etat to rotacja, urlopy i L4, utrata wiedzy przy
                        odejściu oraz kosztowne zwolnienia przy spadku
                        koniunktury.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Automatyzacja psuje się przy zmianach API i narzędzi, a
                        błąd bez monitoringu potrafi działać tygodniami. Dlatego
                        ustawiamy alerty, dokumentację i jednego właściciela
                        scenariuszy.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Zatrudnij, gdy praca wymaga relacji, negocjacji,
                        kreatywności albo codziennych decyzji. Automatyzacja
                        chaosu daje tylko szybszy chaos.
                      </p>
                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                        <h2 className="mb-6 h2-sekcji">
                          Zatrudnić czy zautomatyzować?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Bezpłatna diagnoza 30 min. Policzymy to dla Twojego
                          procesu.
                        </p>
                        <Link
                          href="/automatyzacja-leadow-crm"
                          className="btn-primary inline-block"
                        >
                          Zobacz usługę automatyzacji procesów
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                kotwica: "faq",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="mb-6 h2-sekcji">
                        FAQ
                      </h2>
                      <div className="space-y-4">
                        {faqItems.map((item, index) => (
                          <details
                            key={index}
                            className="group rounded-2xl border border-gray-200 dark:border-gray-700"
                          >
                            <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                              {item.question}
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
                              {item.answer}
                            </p>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/automatyzacja-vs-zatrudnienie" />
          </div>
        </section>

        <CTA naglowek="Policzmy to dla Twojej firmy" opis="30 minut, konkretne liczby dla Twoich procesów." />

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Powiązane
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                  className="text-accent hover:underline"
                >
                  Jak policzyć ROI z automatyzacji
                </Link>
              </li>
              <li>
                <Link
                  href="/strefa-wiedzy/ai-w-automatyzacji-firm"
                  className="text-accent hover:underline"
                >
                  Kiedy AI ma sens, a kiedy nie
                </Link>
              </li>
              <li>
                <Link
                  href="/automatyzacja-leadow-crm"
                  className="text-accent hover:underline"
                >
                  Automatyzacja procesów i leadów
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Automatyzacja vs zatrudnienie, co się bardziej opłaca w MŚP",
            description:
              "Kiedy zatrudnić kolejną osobę, a kiedy zautomatyzować proces. Realne koszty, ryzyka, framework decyzji i praktyczne scenariusze dla firm B2B w 2026.",
            datePublished: "2026-04-19",
            author: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
            publisher: {
              "@type": "Organization",
              name: "Fluxlab",
              url: "https://fluxlab.pl",
            },
          }),
        }}
      />

      {/* WebApplication Schema, kalkulator jest pierwsza zakladka artykulu */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator: zatrudnić czy zautomatyzować?",
            url: "https://fluxlab.pl/strefa-wiedzy/automatyzacja-vs-zatrudnienie#kalkulator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Kalkulator decyzji: porównanie kosztu ręcznej pracy z kosztem automatyzacji procesu B2B.",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
