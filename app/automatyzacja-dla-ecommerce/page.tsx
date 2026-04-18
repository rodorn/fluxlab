import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Automatyzacja dla e-commerce — Shopify, WooCommerce, BaseLinker, Allegro | Fluxlab",
  description:
    "Automatyzacja sklepu internetowego: synchronizacja stanów magazynowych, fakturowanie, etykiety InPost/DPD, e-mail marketing i obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden działający proces.",
  openGraph: {
    title:
      "Automatyzacja dla e-commerce — Shopify, WooCommerce, BaseLinker, Allegro | Fluxlab",
    description:
      "Automatyzacja sklepu internetowego: synchronizacja stanów magazynowych, fakturowanie, etykiety InPost/DPD, e-mail marketing i obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden działający proces.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów dla e-commerce",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-ecommerce",
  },
};

const useCases = [
  {
    title: "Synchronizacja stanów magazynowych między kanałami",
    description:
      "Sprzedajesz na własnym sklepie (Shopify, WooCommerce, PrestaShop) i jednocześnie na Allegro, OLX czy Amazon. Automatyzacja pilnuje, żeby stan magazynowy w każdym kanale był aktualny — sprzedaż w jednym miejscu zmniejsza dostępność we wszystkich pozostałych w czasie liczonym w sekundach. Koniec z over-sellem i ręcznym pilnowaniem arkusza.",
  },
  {
    title: "Automatyczne fakturowanie zamówień",
    description:
      "Nowe zamówienie w sklepie automatycznie tworzy fakturę w Fakturowni, iFircie lub InFakcie, z poprawnymi danymi nabywcy, NIP-em pobranym z GUS i właściwą stawką VAT. Faktura trafia do klienta mailem, kopia do księgowej. Zero ręcznego przepisywania.",
  },
  {
    title: "Etykiety wysyłkowe InPost, DPD, Poczta Polska",
    description:
      "Po opłaceniu zamówienia automatyzacja generuje etykietę u wybranego kuriera, zapisuje numer listu przewozowego w zamówieniu i wysyła klientowi maila z linkiem do śledzenia. Magazyn dostaje gotową etykietę do wydruku.",
  },
  {
    title: "E-mail marketing zsynchronizowany z zachowaniem klienta",
    description:
      "Nowy klient automatycznie trafia do MailerLite, Klaviyo lub GetResponse z odpowiednim tagiem (kategoria zakupu, wartość koszyka, częstotliwość). Porzucone koszyki uruchamiają sekwencję maili, a klienci po zakupie dostają prośbę o opinię w odpowiednim momencie.",
  },
  {
    title: "Obsługa zwrotów i reklamacji",
    description:
      "Klient zgłasza zwrot przez formularz. Automatyzacja tworzy zgłoszenie w systemie, generuje etykietę zwrotną, informuje magazyn i wystawia korektę faktury po przyjęciu paczki. Cały proces ma jedno źródło prawdy zamiast trzech maili i dwóch arkuszy.",
  },
];

const painPoints = [
  {
    pain: "Sprzedajesz ten sam towar na sklepie i na Allegro — i co chwilę masz over-sell",
    solution:
      "Wpinamy BaseLinker albo bezpośrednią integrację (Shopify/WooCommerce ↔ Allegro API), która trzyma stany w jednym źródle prawdy. Każda sprzedaż automatycznie zmniejsza stan we wszystkich kanałach. Jeśli BaseLinker już masz, ale nie wykorzystujesz jego automatyzacji do końca — porządkujemy to bez wymiany narzędzia.",
  },
  {
    pain: "Każde zamówienie to ręczne wystawienie faktury w Fakturowni i przeklejanie danych",
    solution:
      "Łączymy sklep (Shopify/WooCommerce/PrestaShop) bezpośrednio z systemem fakturowym przez API. Faktura powstaje automatycznie w momencie opłacenia, dane firmowe są weryfikowane w GUS, klient dostaje PDF mailem, a księgowa ma wszystko w jednym miejscu. Działa też dla zamówień z Allegro.",
  },
  {
    pain: "Magazyn traci czas na ręczne generowanie etykiet u kuriera",
    solution:
      "Automatyzujemy generowanie etykiet w InPost, DPD, Poczcie Polskiej, GLS, DHL czy Orlen Paczce. Etykieta powstaje automatycznie po opłaceniu lub po ręcznej akceptacji zamówienia (zależnie od procesu). Numer listu trafia do klienta i do CRM.",
  },
  {
    pain: "Lead z formularza Allegro lub maila ginie i nikt do niego nie oddzwania",
    solution:
      "Każde zapytanie z formularza Allegro, ze sklepu, z maila kontaktowego czy z czatu trafia automatycznie do CRM (Pipedrive, HubSpot, własny system) z oznaczeniem źródła. System przypisuje lead do osoby, ustawia zadanie i pilnuje, żeby ktoś faktycznie odpowiedział w ciągu uzgodnionego czasu.",
  },
  {
    pain: "Nie wiesz, ile naprawdę zarabiasz na poszczególnych kanałach i produktach",
    solution:
      "Budujemy automatyczne raportowanie (Looker Studio, Google Sheets, dedykowany dashboard), które łączy dane sprzedażowe, koszty reklam (Meta Ads, Google Ads), koszty wysyłki i marżę produktową. Zamiast eksportować CSV-ki raz w miesiącu, masz aktualny obraz biznesu codziennie.",
  },
];

const tools = [
  {
    name: "BaseLinker",
    description:
      "Centrum operacji dla sprzedaży wielokanałowej (Allegro, Amazon, eBay, sklep własny). Doskonale radzi sobie z magazynem, etykietami i statusami zamówień. Automatyzujemy konfigurację akcji, integracje zewnętrzne i przypadki, których nie pokrywają natywne reguły.",
  },
  {
    name: "Shopify / WooCommerce / PrestaShop",
    description:
      "Integrujemy każdą z popularnych platform sklepowych przez API z fakturowaniem, kurierami, CRM, e-mail marketingiem i hurtowniami. Dla sklepów na własnym hostingu (WooCommerce, PrestaShop) możemy też wprowadzać automatyzacje wewnątrz samego sklepu.",
  },
  {
    name: "n8n",
    description:
      "Self-hosted automatyzacja, która pozwala budować skomplikowane przepływy bez limitów wykonania na zadanie. Idealna dla e-commerce, gdzie liczba zamówień rośnie i koszty Zapiera/Make stają się niewspółmierne.",
  },
  {
    name: "Zapier i Make",
    description:
      "Sprawdzają się w mniejszych sklepach i przy szybkich integracjach point-to-point. Make daje większą kontrolę nad logiką, Zapier wygrywa szerokością integracji. Dobieramy narzędzie do skali — nie odwrotnie.",
  },
  {
    name: "Pipedrive i HubSpot",
    description:
      "Dla e-commerce B2B i sklepów z ofertą hurtową. Automatyzujemy lead pipeline, oferty, follow-upy i przejście klienta z kanału B2C do B2B.",
  },
];

const faq = [
  {
    question:
      "Mam sklep na Shopify i sprzedaję też na Allegro. Czy automatyzacja stanów wymaga BaseLinkera?",
    answer:
      "Niekoniecznie. BaseLinker jest najpopularniejszym wyborem i upraszcza wiele rzeczy, ale dla mniejszej liczby SKU lub specyficznych wymagań robimy też integracje bezpośrednio przez API Allegro i Shopify (np. w n8n). Decyzja zależy od skali, liczby kanałów i tego, jakie inne procesy chcesz spiąć.",
  },
  {
    question:
      "Czy automatyzacja fakturowania zadziała z Fakturownią, iFirmą i InFaktem?",
    answer:
      "Tak. Wszystkie trzy mają API, z którym pracujemy. Konfigurujemy automatyczne tworzenie faktur, weryfikację NIP w GUS, oznaczanie statusu opłacenia i wysyłkę PDF do klienta. W zestawie zwykle robimy też synchronizację z systemem księgowym lub eksport dla księgowej.",
  },
  {
    question: "Ile kosztuje automatyzacja typowego sklepu internetowego?",
    answer:
      "Pojedynczy use case (np. tylko fakturowanie albo tylko etykiety) to kilka dni pracy i koszt liczony w niskich tysiącach. Pełne wpięcie sklepu w 5–6 systemów (fakturowanie, kurierzy, CRM, e-mail marketing, raportowanie) to zwykle 2–6 tygodni wdrożenia. Dokładną wycenę dajemy po krótkiej rozmowie i przejrzeniu obecnego procesu.",
  },
  {
    question:
      "Czy automatyzacja porzuconych koszyków naprawdę przynosi przychód?",
    answer:
      "Tak, jeśli sklep ma sensowny ruch i odpowiednią marżę. Standardowo dobrze działa sekwencja 3 maili (po 1h, 24h, 72h) z dynamiczną treścią pokazującą produkty z koszyka. Konwersja zależy od kategorii — w fashion bywa 8–15%, w produktach impulsowych mniej.",
  },
  {
    question:
      "Co z RODO, jeśli klienci trafiają do CRM i e-mail marketingu automatycznie?",
    answer:
      "Automatyzacja respektuje zgody marketingowe pobrane na etapie zakupu lub w formularzu. Do CRM trafiają wszyscy klienci (podstawa: realizacja umowy), do e-mail marketingu tylko ci, którzy wyrazili zgodę. Wprowadzamy też oznaczanie źródła zgody i datę, co przydaje się przy ewentualnej kontroli.",
  },
  {
    question:
      "Czy automatyzację da się wdrożyć bez przerywania działania sklepu?",
    answer:
      "Tak, większość rzeczy uruchamiamy w trybie testowym (sandbox lub na fragmencie ruchu), a potem przełączamy. Sklep działa cały czas. Większe zmiany w procesie zamówień planujemy poza godzinami szczytu, najczęściej rano w dni robocze.",
  },
  {
    question:
      "Sprzedaję głównie na Allegro. Czy to ma sens, jeśli nie mam własnego sklepu?",
    answer:
      "Ma. Allegro ma własne API i sporo da się zautomatyzować nawet bez sklepu — fakturowanie, etykiety, komunikację z klientem, obsługę dyskusji i reklamacji, raportowanie marży. Pełny stack jest mniejszy niż przy sklepie wielokanałowym, ale potencjał oszczędności na osobie operacyjnej jest taki sam.",
  },
];

const relatedServices = [
  {
    label: "Automatyzacja procesów biznesowych",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { label: "Integracje API", href: "/integracje-api" },
  { label: "Automatyzacja CRM", href: "/automatyzacja-crm" },
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { label: "n8n — wdrożenia", href: "/n8n" },
  { label: "Zapier i Make", href: "/zapier-make" },
];

const relatedArticles = [
  {
    label: "Co to jest automatyzacja procesów biznesowych",
    href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
  },
  {
    label: "Integracje API w firmie — kiedy warto",
    href: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
  },
  {
    label: "Jak policzyć ROI z automatyzacji",
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
];

export default function AutomatyzacjaDlaEcommerce() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Automatyzacja dla e-commerce" }]} />

        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-sky-50 dark:hidden" />
            <img
              src="/photos/Flow.avif"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:hidden"
              style={{ filter: "invert(1)" }}
            />
            <img
              src="/photos/Flow.avif"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover hidden dark:block"
            />
            <div className="absolute inset-0 hidden dark:block bg-gray-950/90" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-950 to-transparent hidden dark:block" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-950 to-transparent hidden dark:block" />
          </div>
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Dla branży</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Automatyzacja dla e-commerce
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Sklep internetowy ma kilkadziesiąt punktów, w których ludzie
                  ręcznie przepisują dane między systemami. Magazyn, faktury,
                  etykiety, mail marketing, Allegro, BaseLinker. Każdy z tych
                  punktów da się spiąć tak, żeby działał sam — a Ty miał czas na
                  sprzedaż, nie na klepanie.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/Factory.avif"
                    alt="Automatyzacja dla e-commerce"
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Co automatyzujemy */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Co automatyzujemy w e-commerce
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Sklep internetowy to kilkanaście systemów, które muszą ze sobą
                rozmawiać: platforma sklepowa, marketplace, magazyn,
                fakturowanie, kurier, e-mail marketing, księgowość. Im większa
                skala, tym większy koszt każdego ręcznego punktu styku.
                Automatyzacja e-commerce polega na tym, żeby te systemy spiąć
                tak, by zamówienie przeszło całą drogę bez udziału człowieka —
                chyba że człowiek jest naprawdę potrzebny.
              </p>

              <div className="space-y-6">
                {useCases.map((useCase) => (
                  <div
                    key={useCase.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {useCase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Konkretne problemy */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Konkretne problemy, które rozwiązujemy
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Poniżej najczęstsze sytuacje, z którymi zgłaszają się sklepy
                internetowe — i to, jak podchodzimy do nich od strony
                technicznej. Każda z tych rzeczy jest do zrobienia w kilka dni
                lub tygodni, nie miesięcy.
              </p>

              <div className="space-y-6">
                {painPoints.map((item) => (
                  <div
                    key={item.pain}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      „{item.pain}”
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.solution}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Narzędzia */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Narzędzia, z którymi pracujemy w e-commerce
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Nie sprzedajemy konkretnego narzędzia. Dobieramy je do skali
                sklepu, liczby kanałów i tego, co już działa. Najczęściej
                spotykany stack dla polskiego e-commerce wygląda jednak podobnie
                i poniżej opisujemy te narzędzia, w których robimy najwięcej
                wdrożeń.
              </p>

              <div className="space-y-6">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                Jeśli dopiero zastanawiasz się, czy wybrać{" "}
                <Link href="/n8n" className="text-accent hover:underline">
                  n8n
                </Link>{" "}
                czy{" "}
                <Link
                  href="/zapier-make"
                  className="text-accent hover:underline"
                >
                  Zapier lub Make
                </Link>
                , opisaliśmy to w sekcji usług. Dla bardziej rozbudowanych
                integracji bezpośrednio z API platform sklepowych zajrzyj do{" "}
                <Link
                  href="/integracje-api"
                  className="text-accent hover:underline"
                >
                  integracji API
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Dla kogo */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Dla kogo
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Dla sklepów internetowych z realnym wolumenem zamówień
                (orientacyjnie od kilkudziesięciu miesięcznie wzwyż), które
                tracą czas na ręczne przepisywanie danych między systemami.
                Szczególnie dla firm sprzedających wielokanałowo (sklep +
                Allegro + ewentualnie Amazon czy eBay), gdzie chaos rośnie
                szybciej niż przychody. Pracujemy zarówno z e-commerce B2C, jak
                i B2B — w tym drugim przypadku często łączymy automatyzację
                sklepu z{" "}
                <Link
                  href="/automatyzacja-leadow"
                  className="text-accent hover:underline"
                >
                  automatyzacją leadów
                </Link>{" "}
                i procesem ofertowania.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Najczęściej zadawane pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium">
                      {item.question}
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
                    <div className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Twój sklep rośnie, a operacja zaczyna gasić pożary?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam stack i procesy. Wskażemy konkretne miejsca, gdzie
                automatyzacja zwróci się w 2–3 miesiące.
              </p>
              <Link
                href="/#kontakt"
                className="btn-primary px-8 py-3.5 text-base"
              >
                Porozmawiajmy
              </Link>
              <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
                Bezpłatna konsultacja · Odpowiedź w 24h
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Powiązane usługi
                  </h2>
                  <ul className="space-y-3">
                    {relatedServices.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                        >
                          <svg
                            className="shrink-0 text-accent"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2.5 7l3 3 6-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Powiązane artykuły
                  </h2>
                  <ul className="space-y-3">
                    {relatedArticles.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                        >
                          <svg
                            className="shrink-0 text-accent"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M2.5 7l3 3 6-6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Automatyzacja dla e-commerce",
            description:
              "Automatyzacja sklepu internetowego: synchronizacja stanów magazynowych, fakturowanie, etykiety InPost/DPD, e-mail marketing i obsługa zwrotów. Łączymy Shopify, WooCommerce, PrestaShop, BaseLinker i Allegro w jeden działający proces.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType: "Automatyzacja procesów biznesowych dla e-commerce",
            url: "https://fluxlab.pl/automatyzacja-dla-ecommerce",
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
            mainEntity: faq.map((item) => ({
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

      <Footer />
    </>
  );
}
