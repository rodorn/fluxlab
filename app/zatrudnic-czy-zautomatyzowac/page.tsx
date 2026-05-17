import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";
import Kalkulator from "./Kalkulator";

export const metadata: Metadata = {
  title: "Zatrudnić osobę czy zautomatyzować proces? | Kalkulator decyzji",
  description:
    "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 wynik.",
  openGraph: {
    title: "Zatrudnić osobę czy zautomatyzować proces? | Kalkulator decyzji",
    description:
      "Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia automatyzacji. 4 inputy, 1 wynik.",
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
    canonical: "/zatrudnic-czy-zautomatyzowac",
  },
};

const faqs = [
  {
    question: "Skąd biorę „czas procesu w godzinach miesięcznie”?",
    answer:
      "Jeśli proces wykonuje jedna osoba, pomnóż liczbę powtórzeń × średni czas jednego powtórzenia. Na przykład: 100 leadów × 5 minut = 500 minut = ~8,3 godziny. Jeśli proces wykonuje kilka osób, zsumuj. Jeśli nie wiesz dokładnie, oszacuj „dni pracy w miesiącu poświęcone na ten proces” × 8 i traktuj to jako górne ograniczenie. Lepiej oszacować z lekkim zapasem niż w dół — celem jest realny obraz, a nie raport do księgowości.",
  },
  {
    question: "Dlaczego etat orientacyjny to tylko stawka × 168h?",
    answer:
      "Bo to jest minimum, czyli sama praca. Pełen koszt zatrudnienia jest wyższy o 30–50% przez ZUS pracodawcy, urlop płatny, sprzęt, oprogramowanie, czas rekrutacji i onboardingu. Nie liczę tego w kalkulatorze, bo wynik miałby zbyt dużą wariancję — zatrudnienie B2B vs UoP, junior vs senior, własne biuro vs home office. Pokazuję orientacyjną dolną granicę, żeby porównanie z automatyzacją było uczciwe „w dół”. Jak wyjdzie, że automatyzacja jest tańsza nawet od minimalnego kosztu pracy — to znaczy, że na pewno jest tańsza po pełnym koszcie.",
  },
  {
    question: "Skąd przedział 1500–8000 zł za automatyzację?",
    answer:
      "To realny zakres dla pojedynczego procesu B2B. Dolny próg (1 500–3 000 zł) to prosty workflow w Make/Zapier/n8n: 1 trigger, 2–4 akcje, 1 system docelowy (np. formularz → CRM → mail). Środek (3 000–5 000 zł) to typowy proces z logiką warunkową i 2–3 integracjami (formularz → kwalifikacja AI → routing → CRM → Slack). Górny próg (5 000–8 000 zł) to procesy z wieloma wyjątkami, parsowaniem maili, integracją z systemami legacy. Powyżej 8 000 zł zwykle wchodzimy w wieloprocesowe wdrożenia, które warto rozdzielić na fazy.",
  },
  {
    question: "Co znaczy, że proces musi być „powtarzalny i stabilny”?",
    answer:
      "Powtarzalny: ten sam scenariusz wykonujesz wielokrotnie — kroki są przewidywalne, kolejność stała, wyjątki rzadkie. Stabilny: zasady się nie zmieniają co tydzień. Klasyczne dobre kandydaty: obsługa formularza www → CRM, faktury cykliczne, raport tygodniowy, follow-up. Słabe kandydaty: procesy, gdzie co rusz dochodzi nowy wyjątek (negocjacje z klientem, kwalifikacja niestandardowych zapytań, decyzje wymagające osądu). Te ostatnie warto opisać w SOP-ach, ale nie automatyzować — bo automat trzeba by ciągle przepisywać.",
  },
  {
    question: "Czy kalkulator zastępuje konkretną wycenę?",
    answer:
      "Nie. Daje skalę decyzji: czy w ogóle warto rozmawiać o automatyzacji w Twoim case, czy raczej zostać przy ręcznej obsłudze albo zatrudnić kolejną osobę. Konkretna wycena wymaga rozmowy o specyfice procesu: jakie systemy są w grze, ile wyjątków, czy jest API, czy trzeba parsować maile, ile osób korzysta z efektu. Diagnoza 30-minutowa wystarczy, żeby przejść z „2–8 tys. zł” na „4 200 zł, zwrot w 2,5 miesiąca” albo „nie warto, róbcie ręcznie”.",
  },
];

export default function ZatrudnicCzyZautomatyzowacPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Narzędzia", href: "/narzedzia" },
            { label: "Zatrudnić czy zautomatyzować?" },
          ]}
        />

        {/* Hero — kompaktowy */}
        <section className="pt-24 pb-12">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Zatrudnić osobę czy zautomatyzować proces?
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Porównaj koszt miesięcznej ręcznej pracy z kosztem wdrożenia
              automatyzacji. 4 inputy, 1 wynik — bez rejestracji.
            </p>
            <Link href="#sekcje" className="btn-primary">
              Otwórz kalkulator
            </Link>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje narzędzia decyzyjnego"
            tabs={[
              {
                label: "Kalkulator",
                content: (
                  <div className="py-10 lg:py-12">
                    <Kalkulator />
                  </div>
                ),
              },
              {
                label: "Jak liczę decyzję",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Jak liczę decyzję
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p>
                          Kalkulator porównuje trzy scenariusze: ręczna obsługa
                          (status quo), zatrudnienie kolejnej osoby (etat
                          orientacyjnie), wdrożenie automatyzacji (zakres
                          rynkowy). Logika decyzyjna patrzy na dwa wymiary:
                          powtarzalność i częstotliwość.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Koszt ręcznej pracy</strong> ={" "}
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                              czas_h × koszt_h
                            </code>{" "}
                            miesięcznie. Roczna wartość to ×12.
                          </li>
                          <li>
                            <strong>Etat orientacyjny</strong> ={" "}
                            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                              koszt_h × 168
                            </code>{" "}
                            miesięcznie. To stawka × pełny etat (168 h/mies.) —
                            minimum bez ZUS-u, urlopu, sprzętu i kosztów
                            rekrutacji. Realny pełen koszt zatrudnienia jest
                            wyższy o 30–50%.
                          </li>
                          <li>
                            <strong>Automatyzacja orientacyjnie</strong>: 1
                            500–8 000 zł jednorazowo + 0–200 zł/mies.
                            utrzymania. Konkretna kwota zależy od liczby
                            integracji, logiki warunkowej i tego, czy trzeba
                            parsować dane wejściowe (maile, PDF-y).
                          </li>
                          <li>
                            <strong>Sygnał decyzyjny</strong>: jeśli proces jest
                            powtarzalny i występuje codziennie / kilka razy w
                            tygodniu — mocna rekomendacja automatyzacji. Jeśli
                            nie jest powtarzalny — ręcznie (automatyzacja
                            niestabilnego procesu = ciągłe dopisywanie
                            wyjątków). Jeśli skala jest mała (poniżej 5 h/mies.
                            i okazjonalnie) — ręcznie. W pozostałych przypadkach
                            warto policzyć dokładniej w diagnozie.
                          </li>
                        </ul>
                        <p>
                          Punkt zwrotu (payback period) liczę zgrubnie jako:{" "}
                          <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            koszt_wdrożenia / oszczędność_miesięczna
                          </code>
                          . Przy realistycznej średniej wdrożenia ~4 750 zł i
                          koszcie ręcznej pracy 2 400 zł/mies. zwrot jest w ~2
                          miesiące. To bardzo zgrubny szacunek — w diagnozie
                          liczę pod konkretny proces, z konkretnym zestawem
                          narzędzi.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy zatrudnić",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Kiedy zatrudnienie ma więcej sensu niż automatyzacja
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                        <p>
                          Automatyzacja nie jest odpowiedzią na wszystko. Są
                          sytuacje, w których dodatkowa osoba jest lepszym
                          wyborem — i to nawet z punktu widzenia czystej
                          matematyki, nie tylko „bo lubię ludzi”.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>Proces wymaga osądu</strong>: negocjacje,
                            niestandardowe oferty, decyzje obarczone ryzykiem
                            reputacyjnym. Tu automat daje gorsze wyniki niż
                            średnio kompetentny człowiek.
                          </li>
                          <li>
                            <strong>Proces ciągle się zmienia</strong>: nowy
                            regulator, nowe wytyczne klienta, zmieniające się
                            systemy partnerów. Każda zmiana = koszt modyfikacji
                            automatu.
                          </li>
                          <li>
                            <strong>Skala jest mała</strong>: pojedyncze
                            zdarzenia w miesiącu nie uzasadniają inwestycji we
                            wdrożenie. Tu osoba wykonująca to przy okazji innych
                            zadań jest tańsza i bardziej elastyczna.
                          </li>
                          <li>
                            <strong>Brakuje danych wejściowych</strong>: proces
                            opiera się na intuicji handlowca, kontekście
                            rozmowy, niedoprecyzowanych wymaganiach.
                            Automatyzacja zadziała dopiero, gdy ustabilizujesz
                            dane.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Kiedy automatyzować",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        Kiedy automatyzacja jasno wygrywa
                      </h2>
                      <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            <strong>
                              Proces powtarzalny, codzienny, z jasnym wejściem i
                              wyjściem.
                            </strong>{" "}
                            Klasyk: formularz www → CRM, faktura cykliczna,
                            follow-up po X dniach. Wdrożenie zwraca się zwykle w
                            1–4 miesiące.
                          </li>
                          <li>
                            <strong>
                              Czas reakcji ma duże znaczenie biznesowe.
                            </strong>{" "}
                            Lead, który czeka 2 godziny na odpowiedź, ma
                            wielokrotnie mniejszą szansę zostać klientem niż ten
                            obsłużony w 5 minut. Automat odpowiada zawsze, w tym
                            samym czasie.
                          </li>
                          <li>
                            <strong>
                              Proces wymaga przepisywania danych między
                              systemami.
                            </strong>{" "}
                            Jeśli handlowiec kopiuje dane z formularza do CRM,
                            do arkusza, do Slacka — to jest dokładnie ten typ
                            pracy, który jest tańszy automatycznie i
                            dokładniejszy.
                          </li>
                          <li>
                            <strong>
                              Skala rośnie szybciej niż możesz zatrudniać.
                            </strong>{" "}
                            Automatyzacja skaluje się liniowo bez kosztu
                            marginalnego. Dwa razy więcej leadów = ten sam koszt
                            automatu, dwukrotny koszt zespołu.
                          </li>
                        </ul>
                      </div>
                      <div className="mt-10 bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                        <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Wynik wygląda znajomo?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                          W diagnozie 30-minutowej liczę pełny koszt obecnego
                          procesu, koszt wdrożenia automatyzacji i punkt zwrotu
                          — pod Twoje konkretne narzędzia.
                        </p>
                        <TrackedCTA
                          href="/#kontakt"
                          location="calc_choice_mid"
                          eventName="cta_click_calc_choice"
                          className="btn-primary px-8 py-3 text-base"
                        >
                          Sprawdź, ile zaoszczędzisz konkretnie
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
                    <div className="max-w-3xl mx-auto">
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
                  </div>
                ),
              },
              {
                label: "Powiązane treści",
                content: (
                  <div className="py-10 lg:py-12">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Powiązane treści
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          {
                            href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
                            title:
                              "Automatyzacja vs zatrudnienie — pełny artykuł",
                            description:
                              "Porównanie kosztów, ryzyk i scenariuszy z konkretnymi liczbami.",
                          },
                          {
                            href: "/kalkulator-leadow",
                            title: "Kalkulator kosztu obsługi leadów",
                            description:
                              "Precyzyjniejszy kalkulator dedykowany ręcznej obsłudze leadów (czas + utracona sprzedaż).",
                          },
                          {
                            href: "/audyt-crm",
                            title: "Audyt CRM — checklist online",
                            description:
                              "10 pytań tak/nie. Sprawdź, czy pipeline jest gotowy do automatyzacji.",
                          },
                          {
                            href: "/automatyzacja-leadow-crm",
                            title: "Automatyzacja leadów i CRM dla firm B2B",
                            description:
                              "Co konkretnie da się zautomatyzować w 1. etapie i jak wygląda gotowy proces.",
                          },
                          {
                            href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
                            title: "Jak policzyć ROI z automatyzacji",
                            description:
                              "Metoda liczenia zwrotu z wdrożenia — bez magii, z liczbami.",
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
                      <div className="mt-10 max-w-2xl mx-auto text-center">
                        <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
                          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Chcesz konkretną odpowiedź dla swojego procesu?
                          </h2>
                          <p className="text-gray-500 dark:text-gray-400 mb-8">
                            W diagnozie dostaniesz pełen koszt obecnego procesu,
                            koszt wdrożenia, punkt zwrotu i konkretną listę
                            kroków — albo rekomendację, że nie warto.
                          </p>
                          <TrackedCTA
                            href="/#kontakt"
                            location="calc_choice_final"
                            eventName="cta_click_calc_choice"
                            className="btn-primary px-8 py-3.5 text-base"
                          >
                            Sprawdź, ile zaoszczędzisz konkretnie
                          </TrackedCTA>
                        </div>
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
            name: "Kalkulator: zatrudnić czy zautomatyzować?",
            url: "https://fluxlab.pl/zatrudnic-czy-zautomatyzowac",
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

      <Footer />
    </>
  );
}
