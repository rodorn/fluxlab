import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import KalkulatorLeadow from "./KalkulatorLeadow";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Kalkulator kosztu ręcznej obsługi leadów | Fluxlab",
  description:
    "Sprawdź, ile miesięcznie kosztuje ręczne przepisywanie leadów, zakładanie tematów w CRM i ręczne raporty. Realny koszt w zł — zwykle wyższy niż się wydaje.",
  openGraph: {
    title: "Kalkulator kosztu ręcznej obsługi leadów | Fluxlab",
    description:
      "Policz, ile naprawdę kosztuje ręczna obsługa leadów: czas pracy + zgubione zapytania. Wynik w złotówkach miesięcznie i rocznie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/kalkulator-leadow",
  },
};

const faqs = [
  {
    question: "Skąd biorę liczbę leadów miesięcznie?",
    answer:
      "Najprościej: posprawdź statystyki formularza na stronie, skrzynkę z zapytaniami, panel reklam i CRM. Policz wszystko, co wpada do firmy jako potencjalne zapytanie sprzedażowe — niezależnie czy ktoś to później kwalifikuje, czy nie. Jeśli leady wpadają do kilku miejsc (formularz, mail, telefon, LinkedIn), zsumuj. Lepiej oszacować z lekkim zapasem niż w dół — celem jest realny obraz wolumenu, a nie raport do zarządu.",
  },
  {
    question: "Co się składa na „czas ręcznej obsługi jednego leada”?",
    answer:
      "Wszystko, co dzieje się od momentu, gdy lead wpadnie do firmy, do momentu, gdy ma swojego handlowca, deal w CRM i pierwszy kontakt. W typowym procesie to: odczytanie maila/formularza, sprawdzenie czy to nie spam, przepisanie danych do CRM, założenie firmy/osoby/deala, przypisanie handlowca, ustawienie zadania kontaktu i czasem powiadomienie zespołu. Łącznie 3–10 minut zależnie od tego, jak bardzo proces jest poklejony taśmą klejącą.",
  },
  {
    question: "Skąd założenie, że 30% opóźnionych leadów jest utraconych?",
    answer:
      "To model uproszczony. W sprzedaży inbound czas reakcji silnie wpływa na konwersję — lead obsłużony w kilka minut ma znacząco większą szansę zostać klientem niż ten odebrany po godzinie. 30% to konserwatywny środek przedziału, oparty na obserwacjach z moich projektów; w niektórych branżach (leasing, finanse) realny ubytek jest większy, w innych mniejszy. Kalkulator pokazuje skalę problemu, nie precyzyjną prognozę — w diagnozie dopasowuję parametr do Twojej branży i danych.",
  },
  {
    question: "Czy automatyzacja na pewno usunie ten koszt?",
    answer:
      "Nie usunie do zera, ale zwykle redukuje go o 60–90%. Automatyzacja zabiera ręczne przepisywanie, klikanie i pilnowanie follow-upów — czyli to, co kosztuje tu najwięcej. Nadal musi zostać moment na rozmowę handlowca z klientem, kwalifikację i decyzję — to jest praca, którą warto wykonywać świadomie. Realna oszczędność to nie tylko pieniądze, ale szybsza reakcja na leada, mniej zgubionych zapytań i czystsze dane do raportów.",
  },
  {
    question: "Czy kalkulator uwzględnia koszt narzędzi i wdrożenia?",
    answer:
      "Nie — pokazuje wyłącznie miesięczny i roczny koszt status quo, czyli tego, co już dziś płacisz w czasie pracy i utraconej sprzedaży. To jest punkt odniesienia. Koszt wdrożenia automatyzacji (jednorazowy + ewentualne abonamenty narzędzi) zwykle zwraca się w 2–6 miesięcy przy realnym wolumenie leadów. Po diagnozie procesu dostajesz konkretną wycenę i orientacyjny ROI — tam już porównujesz oba światy.",
  },
];

export default function KalkulatorLeadowPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs items={[{ label: "Kalkulator kosztu leadów" }]} />

        {/* Hero — kompaktowy */}
        <section className="pt-24 pb-12">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kalkulator kosztu ręcznej obsługi leadów
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sprawdź, ile miesięcznie kosztuje Cię ręczne przepisywanie danych,
              zakładanie tematów w CRM i pilnowanie follow-upów. Realny koszt w
              zł — zwykle wyższy, niż się wydaje.
            </p>
          </div>
        </section>

        {/* Treść w zakładkach */}
        <div className="container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje kalkulatora kosztu leadów"
            tabs={[
              {
                label: "Kalkulator",
                content: (
                  <div className="py-8 lg:py-10">
                    <KalkulatorLeadow />
                  </div>
                ),
              },
              {
                label: "Jak liczę",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Jak liczę koszt
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400">
                        <p>
                          Realny koszt ręcznej obsługi leadów składa się z dwóch
                          pozycji: czasu pracy ludzi i utraconej sprzedaży.
                          Pierwsza pojawia się na liście płac, druga jest
                          niewidoczna — i właśnie dlatego boli najbardziej.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Koszt ręcznej pracy / mies.</strong> ={" "}
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                              leady_mies × (czas_min / 60) × koszt_h
                            </code>
                            . Czyste minuty × stawka godzinowa osoby
                            obsługującej.
                          </li>
                          <li>
                            <strong>Koszt zgubionych leadów / mies.</strong> ={" "}
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                              leady_mies × opoznione% × konwersja% × 0,3 ×
                              wartosc_klienta
                            </code>
                            . Zakładamy konserwatywnie, że 30% leadów z
                            opóźnioną reakcją realnie nie konwertuje — i to jest
                            Twoja utracona sprzedaż.
                          </li>
                          <li>
                            <strong>Koszt roczny</strong> ={" "}
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                              (koszt_pracy + koszt_zgubionych) × 12
                            </code>
                            . Wartość, którą warto zestawić z kosztem wdrożenia
                            automatyzacji.
                          </li>
                        </ul>
                        <p>
                          Model jest celowo uproszczony — w prawdziwej diagnozie
                          uwzględniam też koszt błędów w danych, ręczne
                          raportowanie, czas reakcji na leada premium i utratę
                          pozycji negocjacyjnej przy spóźnionym kontakcie. Ale
                          już sama suma „czas + zgubieni klienci” zwykle
                          wystarczy, żeby decyzja o automatyzacji była
                          oczywista.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Dla kogo",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl space-y-12">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          Dla kogo jest ten kalkulator
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400">
                          <p>
                            Kalkulator przyda się każdemu, kto podejrzewa, że
                            firma traci pieniądze na ręcznej obsłudze leadów,
                            ale nie ma policzonej skali problemu. Najczęściej
                            korzystają z niego:
                          </p>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>
                              <strong>
                                Właściciele firm B2B z 30+ leadami miesięcznie
                              </strong>{" "}
                              — zwłaszcza w leasingu, finansach, brokerstwie,
                              dealerach aut, agencjach marketingowych i
                              konsultingu.
                            </li>
                            <li>
                              <strong>Szefowie sprzedaży</strong>, którzy widzą,
                              że handlowcy więcej czasu spędzają na klikaniu w
                              CRM niż na rozmowach z klientami.
                            </li>
                            <li>
                              <strong>
                                Osoby decyzyjne rozważające wdrożenie
                                automatyzacji
                              </strong>{" "}
                              — kalkulator daje konkretną liczbę do
                              przedstawienia zarządowi.
                            </li>
                            <li>
                              <strong>Solopreneurzy i małe zespoły</strong>,
                              którzy wiedzą, że marnują wieczory na
                              przepisywanie danych z maili do arkusza, ale nie
                              wiedzą, czy to jest jeszcze 200 zł/mies., czy już
                              2 000 zł/mies.
                            </li>
                          </ul>
                          <p>
                            Jeśli prowadzisz proces obsługi leadów i chcesz
                            zobaczyć, jak może wyglądać po automatyzacji,
                            sprawdź{" "}
                            <Link
                              href="/automatyzacja-leadow-crm"
                              className="text-accent hover:underline"
                            >
                              landing o automatyzacji leadów i CRM
                            </Link>{" "}
                            — pokazuję tam, co konkretnie da się usunąć w 1.
                            etapie.
                          </p>
                        </div>
                      </div>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Wynik kalkulatora wygląda znajomo?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          W diagnozie pokazuję, które kroki da się usunąć i jaki
                          ROI ma automatyzacja u Ciebie.
                        </p>
                        <TrackedCTA
                          href="/#kontakt"
                          location="calc_leads_mid"
                          eventName="cta_click_calc_leads"
                          className="btn-primary px-8 py-3 text-base"
                        >
                          Zamów bezpłatną diagnozę
                        </TrackedCTA>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl space-y-12">
                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                          Najczęstsze pytania
                        </h2>
                        <div className="space-y-4">
                          {faqs.map((faq) => (
                            <details
                              key={faq.question}
                              className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                            >
                              <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                                {faq.question}
                                <svg
                                  className="shrink-0 ml-4 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <path
                                    d="M10 4v12M4 10h12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </summary>
                              <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.answer}
                              </div>
                            </details>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                          Powiązane treści
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            {
                              href: "/automatyzacja-leadow-crm",
                              title: "Automatyzacja leadów i CRM dla firm B2B",
                              description:
                                "Co konkretnie da się zautomatyzować w 1. etapie i jak wygląda gotowy proces.",
                            },
                            {
                              href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
                              title: "Automatyzacja vs zatrudnienie",
                              description:
                                "Kiedy warto zautomatyzować, a kiedy zatrudnić kolejną osobę — porównanie kosztów.",
                            },
                            {
                              href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
                              title: "Jak policzyć ROI z automatyzacji",
                              description:
                                "Metoda liczenia zwrotu z wdrożenia automatyzacji — bez magii, z liczbami.",
                            },
                            {
                              href: "/narzedzia",
                              title: "Wszystkie narzędzia",
                              description:
                                "Pozostałe kalkulatory i narzędzia online — bez rejestracji, za darmo.",
                            },
                          ].map((article) => (
                            <Link
                              key={article.href}
                              href={article.href}
                              className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                            >
                              <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                                {article.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {article.description}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10 text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          Chcesz sprawdzić, które kroki da się usunąć?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                          W diagnozie dostaniesz mapę obecnego procesu, listę
                          ręcznych kroków, 3 automatyzacje o największym wpływie
                          i orientacyjną wycenę.
                        </p>
                        <TrackedCTA
                          href="/#kontakt"
                          location="calc_leads_final"
                          eventName="cta_click_calc_leads"
                          className="btn-primary px-8 py-3.5 text-base"
                        >
                          Zamów bezpłatną diagnozę
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

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator kosztu ręcznej obsługi leadów",
            url: "https://fluxlab.pl/kalkulator-leadow",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Kalkulator miesięcznego i rocznego kosztu ręcznej obsługi leadów: czas pracy + zgubione zapytania.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
