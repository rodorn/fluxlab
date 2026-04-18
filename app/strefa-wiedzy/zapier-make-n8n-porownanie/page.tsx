import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Zapier vs Make vs n8n — wielkie porównanie 2026 | Fluxlab",
  description:
    "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
  openGraph: {
    title: "Zapier vs Make vs n8n — wielkie porównanie 2026 | Fluxlab",
    description:
      "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
      },
    ],
  },
  alternates: {
    canonical: "/strefa-wiedzy/zapier-make-n8n-porownanie",
  },
};

export default function ZapierMakeN8nPorownanieArticle() {
  const faqItems = [
    {
      question: "Które narzędzie jest najlepsze dla małej firmy?",
      answer:
        "Dla małej firmy (do 5–10 osób) bez działu IT najczęściej Zapier lub Make. Zapier — gdy potrzebujecie głównie prostych integracji typu „przepisz dane z A do B” i cenicie czas startu. Make — gdy procesy są nieco bardziej złożone (warunki, pętle) i chcecie kontrolować koszty już od początku.",
    },
    {
      question: "Czy n8n da się używać bez znajomości kodu?",
      answer:
        "Tak, ale z ograniczeniami. Wizualny edytor pozwala budować scenariusze bez kodu, podobnie jak w Make. Pełnia możliwości n8n (Code node, expressions w stylu JavaScript, custom modules) wymaga jednak chociaż podstaw programowania. n8n.cloud znosi barierę administracji serwera, ale nie barierę logiki technicznej.",
    },
    {
      question: "Co jest najtańsze przy 100 000 wykonań miesięcznie?",
      answer:
        "n8n self-hosted — bez wątpienia. Serwer za 25–100 zł/mies. plus utrzymanie 200–500 zł/mies. spokojnie udźwignie taki wolumen. Make w tej skali to ok. 200–400 USD/mies. Zapier — często powyżej 600 USD/mies. Różnica między n8n a SaaS-ami przy tej skali to często rząd wielkości.",
    },
    {
      question: "Czy któreś z tych narzędzi obsługuje on-premise?",
      answer:
        "Tylko n8n. Zapier i Make to wyłącznie SaaS — nie ma wersji on-prem. n8n Community Edition i Enterprise Edition można instalować w pełni wewnętrznie, w sieci klienta, bez dostępu do internetu (jeśli nie ma webhooków przychodzących). To często decyduje w branżach regulowanych.",
    },
    {
      question: "Czy mogę zacząć od Zapiera i przejść na Make/n8n później?",
      answer:
        "Tak, to częsta ścieżka. Wiele firm zaczyna od Zapiera (najszybszy start), a po roku-dwóch, gdy procesy się ustabilizują i wolumen urośnie, migruje wybrane scenariusze do Make lub n8n. Nie ma automatycznego importera, ale doświadczenie z Zapiera bardzo przyspiesza budowę w nowym narzędziu.",
    },
    {
      question: "Które ma najlepszy support?",
      answer:
        "Zapier i Make mają płatny support na wyższych planach (Team/Pro+) z odpowiedzią w 24–48h. Enterprise daje dedykowanego account managera. n8n Community ma support społeczności (Discord, forum), n8n.cloud ma email support, n8n Enterprise — dedykowany SLA. Dla typowej firmy MŚP support na poziomie Starter/Pro w obu narzędziach jest porównywalny.",
    },
    {
      question: "Co z bezpieczeństwem danych w każdym z tych narzędzi?",
      answer:
        "Wszystkie trzy mają SOC 2, podpisują DPA i obsługują RODO. Make i n8n mają serwery w UE, Zapier w USA. n8n self-hosted to opcja maksymalnej kontroli — dane w ogóle nie wychodzą poza Twoją sieć. Dla wrażliwych danych (finanse, zdrowie) n8n self-hosted jest standardem.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Zapier vs Make vs n8n" },
          ]}
        />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Zapier vs Make vs n8n — wielkie porównanie 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Trzy najpopularniejsze narzędzia automatyzacji w 2026 roku. Każde
              rozwiązuje ten sam problem inaczej. Zapier optymalizuje na
              prostotę i szybkość startu, Make na elastyczność w rozsądnej
              cenie, n8n na pełną kontrolę i koszt przy dużej skali. Ten artykuł
              porównuje wszystkie trzy w siedmiu wymiarach: pricing, integracje,
              logika, krzywa nauki, skalowalność, compliance i utrzymanie.
            </p>
          </div>
        </section>

        <div className="container-wide">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
            <article>
              {/* Sekcja 1 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Krótko: trzy narzędzia, trzy filozofie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier (USA, od 2012) — pełny SaaS, najwięcej integracji
                    (ok. 6 000), najprostszy interfejs „krok po kroku". Płaci
                    się za taski.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make (Czechy, dawniej Integromat, część Celonis) — pełny
                    SaaS, ok. 1 800 integracji, wizualny diagram z mocną logiką.
                    Płaci się za operacje, znacznie taniej niż Zapier przy
                    podobnym wolumenie.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n (Niemcy, open-source) — chmura n8n.cloud lub własny
                    serwer (self-hosted). Ok. 500+ natywnych integracji + moduł
                    HTTP/Code dla dowolnego API. Płaci się za serwer
                    (self-hosted) lub plan (cloud).
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To nie jest „lepszy/gorszy". To trzy różne strategie pod
                    różne sytuacje. W tym artykule pokazujemy, kiedy każde z
                    nich wygrywa.
                  </p>
                </div>
              </section>

              {/* Sekcja 2 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Pricing — porównanie na trzech wolumenach
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Pricing jest najbardziej mylący w porównaniu — bo każde
                    narzędzie liczy inną jednostkę. Zapier liczy taski (każda
                    akcja = 1 task), Make liczy operacje (każdy moduł = 1
                    operacja), n8n liczy wykonania scenariusza (cały workflow =
                    1 wykonanie). Trzy bardzo różne metryki.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Aby uczciwie porównać, weźmy realny scenariusz: lead z
                    formularza, walidacja, sprawdzenie w CRM, utworzenie /
                    aktualizacja, powiadomienie do Slacka, zadanie w Asanie.
                    Średnio 6–7 kroków. Trzy wolumeny:
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>500 leadów miesięcznie (~3 500 operacji):</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Zapier Professional (750 tasków) — ok. 19,99 USD/mies.
                    </li>
                    <li>Make Core (10 000 operacji) — ok. 9 USD/mies.</li>
                    <li>
                      n8n.cloud Starter (2 500 wykonań) — ok. 24 EUR/mies.
                    </li>
                    <li>
                      n8n self-hosted — ok. 25 zł/mies. (sam serwer, bez
                      utrzymania)
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>
                      5 000 leadów miesięcznie (~35 000 operacji):
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Zapier Team (2 000 tasków + nadwyżka) — ok. 200 USD</li>
                    <li>Make Pro (10 000 + nadwyżka) — ok. 60–80 USD/mies.</li>
                    <li>n8n.cloud Pro (10 000 wykonań) — ok. 60 EUR/mies.</li>
                    <li>
                      n8n self-hosted — ok. 25 zł serwer + 300 zł utrzymania =
                      ok. 325 zł
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>
                      50 000 leadów miesięcznie (~350 000 operacji):
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Zapier Company — od ok. 600 USD/mies.</li>
                    <li>Make Teams — ok. 200–400 USD/mies.</li>
                    <li>n8n.cloud Enterprise — wycena indywidualna</li>
                    <li>
                      n8n self-hosted (większy serwer, queue mode) — ok. 200 zł
                      serwer + 500 zł utrzymania = ok. 700 zł/mies.
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Wniosek: na małej skali różnice są nieistotne. Przy średniej
                    skali Make i n8n.cloud są wyraźnie tańsze od Zapiera. Przy
                    dużej — n8n self-hosted to zwykle rząd wielkości taniej.
                  </p>
                </div>
              </section>

              {/* Sekcja 3 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Integracje — kto pokrywa co
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Surowe liczby:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Zapier — ok. 6 000 integracji</li>
                    <li>Make — ok. 1 800 integracji</li>
                    <li>n8n — ok. 500+ natywnych integracji</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Ale liczby kłamią. Wszystkie popularne SaaS-y (HubSpot,
                    Pipedrive, Salesforce, Slack, Notion, Asana, Airtable,
                    Google Workspace, Microsoft 365, Stripe, Shopify,
                    WooCommerce, Mailchimp, ActiveCampaign) są w każdym z trzech
                    narzędzi.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Różnica zaczyna się przy:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Niszowych SaaS-ach (np. polskie systemy CRM, lokalne
                      narzędzia księgowe) — Zapier zwykle pojawia się jako
                      pierwszy
                    </li>
                    <li>
                      Głębokości integracji — Make często ma więcej akcji per
                      aplikacja niż Zapier
                    </li>
                    <li>
                      Customowych API — n8n ma najlepszy moduł HTTP i Code,
                      pozwala zintegrować się z dowolnym REST API w 30 minut,
                      bez czekania na natywny moduł
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyka: jeśli używasz nietypowego SaaS-u, sprawdź najpierw
                    katalog wszystkich trzech narzędzi. Jeśli go nie ma — n8n
                    będzie najszybszy do dorobienia integracji przez API.
                  </p>
                </div>
              </section>

              {/* Sekcja 4 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Krzywa nauki — kto jest najszybszy do zbudowania pierwszego
                    scenariusza
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier — pierwsza automatyzacja w 10–15 minut, bez
                    dokumentacji, bez konfiguracji. Wybierasz trigger, akcję,
                    mapujesz pola, koniec. To absolutny zwycięzca w kategorii
                    „chcę mieć działające coś na wczoraj".
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make — pierwszy scenariusz w 30–45 minut. Trzeba zrozumieć
                    diagram, kierunek przepływu danych, jak działają routery i
                    iteratory. Krzywa stroma na początku, ale za to dużo większe
                    możliwości od razu.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n — pierwszy scenariusz w 1–2 godziny (n8n.cloud) lub pół
                    dnia (self-hosted, z instalacją). Filozofia podobna do Make,
                    ale więcej elementów technicznych. Expressions w stylu
                    JavaScript, code nodes, zaawansowane opcje autentykacji. Dla
                    osoby technicznej — atut, dla nietechnicznej — dodatkowy
                    próg.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyka: jeśli automatyzacje ma budować osoba z biznesu
                    (marketing, operations) — Zapier lub Make. Jeśli osoba
                    półtechniczna lub programista — n8n da znacznie więcej
                    swobody.
                  </p>
                </div>
              </section>

              {/* Sekcja 5 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Logika i obsługa błędów
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier — najsłabszy w tej kategorii. Ścieżki warunkowe
                    (Paths) są dostępne od planu Professional, ale dość
                    ograniczone. Iteratory nad listami — przez obejście Code
                    step. Error handling — proste retries, brak fallback paths.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make — bardzo mocny. Routery z warunkami, iteratory,
                    agregatory, error handlers per moduł, ponawianie z
                    opóźnieniem, breakpointy do debugowania. Dla większości
                    procesów biznesowych w pełni wystarczające.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n — najmocniejszy. Wszystko, co ma Make, plus: Code node
                    (pełny JavaScript/Python), sub-workflows (workflow jako
                    funkcja), wersjonowanie w gicie (Enterprise), własne moduły
                    w TypeScripcie. Dla scenariuszy graniczących z
                    programowaniem — bezkonkurencyjny.
                  </p>
                </div>
              </section>

              {/* Sekcja 6 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Skalowalność — co się dzieje przy wzroście wolumenu
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier — skaluje się liniowo z kosztem. Każdy task to
                    pieniądz. Plan Company (od ok. 599 USD/mies.) ma górne
                    limity. Powyżej — Enterprise, zwykle z dużymi opłatami.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make — podobnie skaluje się z kosztem, ale taniej. Plan
                    Teams górnie ok. 800 000 operacji/mies. Powyżej — Enterprise
                    z indywidualną wyceną.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted — skaluje się z mocą serwera. Mały VPS
                    obsłuży kilka tysięcy wykonań dziennie. Większy —
                    kilkanaście tysięcy. Powyżej — queue mode (Redis + workers),
                    horyzontalne skalowanie. Praktycznie bez górnego limitu.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n.cloud — skaluje się jak SaaS, ale plany są wyraźnie
                    tańsze niż Zapier i Make przy podobnym wolumenie wykonań.
                  </p>
                </div>
              </section>

              {/* Sekcja 7 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Compliance, RODO, lokalizacja danych
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier — siedziba USA, serwery globalne (USA dominuje). DPA,
                    SOC 2 Type II, ISO 27001. Dla większości firm wystarczy, ale
                    dla branż regulowanych (finanse, zdrowie, sektor publiczny)
                    bywa problematyczny.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make — siedziba Czechy (Celonis), serwery w UE. DPA, SOC 2.
                    Dla typowej polskiej firmy MŚP — wybór bezpieczny i prosty
                    do uzasadnienia.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n.cloud — siedziba Niemcy (Berlin), serwery w UE (Niemcy).
                    Bezpieczne dla RODO.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted — pełna kontrola, dane nigdy nie wychodzą
                    poza Twoją sieć. Standard dla branż regulowanych. Można
                    instalować w pełni wewnętrznie, bez dostępu do internetu
                    (jeśli nie ma webhooków przychodzących).
                  </p>
                </div>
              </section>

              {/* Sekcja 8 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kto za co odpowiada — model utrzymania
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier i Make — pełen SaaS. Producent odpowiada za serwery,
                    aktualizacje, security. Twoja rola: budować i utrzymywać
                    scenariusze, monitorować błędy, pilnować pakietu
                    tasków/operacji.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n.cloud — analogicznie do Make.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted — Ty (lub Twój wykonawca) odpowiadasz za:
                    serwer (OS, security), n8n (aktualizacje, breaking changes),
                    backup bazy i credentials, monitoring uptime, SSL i reverse
                    proxy. To 1–3 godziny miesięcznie po dobrym wdrożeniu, ale
                    wymaga osoby technicznej.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyka: jeśli nie macie osoby ogarniającej Linuxa i
                    Dockera, n8n self-hosted nie ma sensu — wybierajcie
                    n8n.cloud, Make albo Zapier.
                  </p>
                </div>
              </section>

              {/* Sekcja 9 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Decyzja w 4 krokach — który wybrać
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zamiast pisać kolejną tabelę, prosty algorytm:
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Krok 1: jaki wolumen?</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Mały (do 1 000 operacji/mies.) — wszystko jest tanie,
                      wybierz po prostocie
                    </li>
                    <li>
                      Średni (1 000–30 000) — Make lub n8n.cloud, Zapier zaczyna
                      boleć
                    </li>
                    <li>Duży (30 000+) — n8n self-hosted lub Make</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Krok 2: kto buduje scenariusze?</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Osoba z biznesu, bez technicznego backgroundu — Zapier
                    </li>
                    <li>Osoba z biznesu, ale ogarnięta — Make</li>
                    <li>Osoba półtechniczna lub programista — n8n</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Krok 3: jakie wymagania compliance?</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Standardowa firma B2B — wszystko jest OK</li>
                    <li>Branża z lokalizacją danych w UE — Make lub n8n</li>
                    <li>
                      Branża regulowana (finanse, zdrowie, sektor publiczny) —
                      n8n self-hosted
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    <strong>Krok 4: kto utrzymuje?</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Tylko biznes, bez IT — Zapier, Make lub n8n.cloud</li>
                    <li>
                      Macie własne IT lub zewnętrznego partnera — wszystko
                      otwarte
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Trzy odpowiedzi z czterech zwykle wskazują jedno narzędzie.
                  </p>
                </div>
              </section>

              {/* Sekcja 10 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hybryda — najczęstszy układ w średnich firmach
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    W praktyce większość firm średnich nie wybiera jednego
                    narzędzia. Najczęstszy układ to dwa narzędzia równolegle:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Zapier (lub Make) — proste integracje departamentowe
                      (marketing, HR, recruiting)
                    </li>
                    <li>
                      n8n self-hosted — core procesy biznesowe (sprzedaż,
                      operacje, raportowanie, integracje z ERP/CRM)
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Taki model daje szybkość Zapiera/Make tam, gdzie nie trzeba
                    schodzić nisko, i pełną kontrolę n8n tam, gdzie błąd
                    kosztuje pieniądze. Pełniejsze omówienie tego modelu
                    znajdziesz w{" "}
                    <Link
                      href="/strefa-wiedzy/n8n-vs-zapier"
                      className="text-accent hover:underline"
                    >
                      n8n vs Zapier
                    </Link>{" "}
                    oraz{" "}
                    <Link
                      href="/strefa-wiedzy/make-vs-n8n"
                      className="text-accent hover:underline"
                    >
                      Make vs n8n
                    </Link>
                    .
                  </p>
                </div>
              </section>

              {/* Mid CTA */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Chcesz dobrać narzędzie pod swoje realne procesy?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Zrobię audyt Twoich procesów, policzę 12-miesięczny koszt
                      każdego z trzech narzędzi i pomogę zbudować pierwsze
                      scenariusze. Bez sprzedażowej presji.
                    </p>
                    <Link
                      href="/automatyzacja-procesow-biznesowych"
                      className="btn-primary inline-block"
                    >
                      Zobacz usługę automatyzacji procesów
                    </Link>
                  </div>
                </div>
              </section>

              {/* Sekcja 11 — Podsumowanie */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Podsumowanie — który dla kogo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier — gdy potrzebujesz działającej automatyzacji w 15
                    minut, masz mały wolumen, i nie chcesz inwestować w naukę
                    narzędzi.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make — gdy procesy są nieco bardziej złożone, wolumen
                    rośnie, i chcesz rozsądnego kompromisu między łatwością a
                    elastycznością. Sweet spot dla większości firm MŚP.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n — gdy macie osobę techniczną na pokładzie, wymagania
                    compliance, integracje z systemami wewnętrznymi, albo
                    wolumen, który czyni SaaS-y bolesnymi.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Najczęstszy błąd: wybór narzędzia „bo wszyscy używają"
                    zamiast „bo pasuje do naszych procesów". Sprawdź też{" "}
                    <Link
                      href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      co to jest automatyzacja procesów biznesowych
                    </Link>{" "}
                    i{" "}
                    <Link
                      href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                      className="text-accent hover:underline"
                    >
                      jak policzyć ROI z automatyzacji
                    </Link>{" "}
                    — to dwie rzeczy, które warto zrobić przed wyborem
                    narzędzia.
                  </p>
                </div>
              </section>

              {/* FAQ */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
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
                          <span className="ml-4 shrink-0 text-gray-400 transition-transform group-open:rotate-45">
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
              </section>
            </article>
            <TableOfContents containerSelector="article" />
          </div>
        </div>

        {/* Prev / Next */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <PrevNextArticle currentHref="/strefa-wiedzy/zapier-make-n8n-porownanie" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Pomogę wybrać i wdrożyć — bez przepłacania
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Krótka rozmowa, w której zobaczymy, które narzędzie pasuje do
                Twoich procesów, skali i kompetencji w zespole.
              </p>
              <Link href="/#kontakt" className="btn-primary inline-block">
                Umów bezpłatną konsultację
              </Link>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Powiązane artykuły
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      href="/strefa-wiedzy/zapier-vs-make"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make — co wybrać do automatyzacji w 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/n8n-vs-zapier"
                      className="text-accent hover:underline"
                    >
                      n8n vs Zapier — kiedy warto iść w self-hosting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/make-vs-n8n"
                      className="text-accent hover:underline"
                    >
                      Make vs n8n — porównanie dla firm MŚP
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/automatyzacja-vs-zatrudnienie"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja vs zatrudnienie — co się bardziej opłaca
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Usługi
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      href="/zapier-make"
                      className="text-accent hover:underline"
                    >
                      Zapier i Make
                    </Link>
                  </li>
                  <li>
                    <Link href="/n8n" className="text-accent hover:underline">
                      n8n
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja procesów biznesowych
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/integracje-api"
                      className="text-accent hover:underline"
                    >
                      Integracje API
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Zapier vs Make vs n8n — wielkie porównanie 2026",
            description:
              "Pełne porównanie Zapier, Make i n8n w 2026: pricing, integracje, krzywa nauki, skalowalność, compliance i koszt na różną skalę. Konkretne kryteria wyboru.",
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

      {/* FAQPage Schema */}
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
