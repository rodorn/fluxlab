import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Automatyzacja dla biur rachunkowych — KSeF, OCR faktur, Optima, Symfonia, SaldeoSmart | Fluxlab",
  description:
    "Automatyzacja biura rachunkowego: OCR faktur do Comarch Optima, Symfonii i Enova, integracje z SaldeoSmart i KSeF, przypomnienia do klientów o brakujących dokumentach, automatyczne raporty miesięczne. Mniej ręcznego klepania, więcej czasu na klienta.",
  openGraph: {
    title:
      "Automatyzacja dla biur rachunkowych — KSeF, OCR faktur, Optima, Symfonia, SaldeoSmart | Fluxlab",
    description:
      "Automatyzacja biura rachunkowego: OCR faktur do Comarch Optima, Symfonii i Enova, integracje z SaldeoSmart i KSeF, przypomnienia do klientów o brakujących dokumentach, automatyczne raporty miesięczne. Mniej ręcznego klepania, więcej czasu na klienta.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów dla biur rachunkowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-biur-rachunkowych",
  },
};

const useCases = [
  {
    title: "OCR faktur do Comarch Optima, Symfonii i Enova",
    description:
      "Faktura PDF od klienta (mailem, z portalu, ze skanera) trafia automatycznie do OCR (SaldeoSmart, własny model albo gotowe usługi), dane są weryfikowane (NIP w GUS, biała lista VAT) i wprowadzane do Optimy, Symfonii lub Enova jako dokument do zatwierdzenia. Księgowy zatwierdza zamiast wprowadzać.",
  },
  {
    title: "Przypomnienia do klientów o brakujących dokumentach",
    description:
      "System pilnuje, jakich dokumentów brakuje od klienta na bieżący miesiąc. Jeśli do 5. nie wpłynęła np. faktura sprzedaży albo wyciąg bankowy, automatyzacja wysyła przypomnienie mailem lub SMS-em, eskaluje do księgowej po N dniach. Koniec z dzwonieniem do tych samych klientów co miesiąc.",
  },
  {
    title: "Integracja z KSeF (Krajowy System e-Faktur)",
    description:
      "Pobieramy faktury z KSeF dla każdego klienta biura, weryfikujemy z dokumentami papierowymi, wprowadzamy do systemu księgowego. Po wejściu obowiązkowego KSeF (etapowo od 2026) ma to przejść z opcji w obowiązek techniczny — przygotowujemy biuro tak, żeby skala dokumentów nie zabiła zespołu.",
  },
  {
    title: "Automatyczne raporty miesięczne dla klientów",
    description:
      "Raz w miesiącu, po zamknięciu okresu, system generuje dla każdego klienta raport (PIT, VAT, ZUS, koszty, przychody, marża, wynik podatkowy) w jednolitym formacie i wysyła go zaszyfrowanym mailem lub przez portal. Klient nie czeka na maila od księgowej, księgowa nie poświęca pół dnia na rozsyłanie.",
  },
  {
    title: "Onboarding nowego klienta i obieg umowy",
    description:
      "Nowy klient wypełnia formularz, podpisuje umowę online (Autenti, DocuSign), pełnomocnictwo UPL-1 trafia do urzędu skarbowego, dane firmowe są pobierane z GUS, klient zostaje założony w Optimie/Symfonii, w CRM, w systemie do dokumentów. Onboarding skraca się z 2 dni do 30 minut.",
  },
];

const painPoints = [
  {
    pain: "Księgowi spędzają połowę dnia na ręcznym wprowadzaniu faktur",
    solution:
      "Wpinamy OCR (SaldeoSmart jest najpopularniejszy w Polsce, ale działamy też na własnych pipeline'ach z modelami AI dla mniej standardowych dokumentów). Rozpoznane faktury trafiają do Optimy/Symfonii/Enova jako dokumenty do akceptacji. Księgowy zatwierdza, ewentualnie poprawia jeden numer — zamiast przepisywać 30 pól z każdej faktury.",
  },
  {
    pain: "Klienci notorycznie spóźniają się z dokumentami, a przypominanie zajmuje godziny",
    solution:
      "Automatyzacja sprawdza w systemie księgowym, czego brakuje od klienta na dany miesiąc, i wysyła kolejno: przypomnienie miłe (5. dnia), przypomnienie konkretne (10. dnia), eskalację do opiekuna (15. dnia). Każdy klient widzi w portalu, czego od niego potrzebujecie. Zespół rachunkowy nie musi być telefonistami.",
  },
  {
    pain: "KSeF wchodzi w 2026 i nikt w biurze nie wie, jak to ma wyglądać operacyjnie",
    solution:
      "Konfigurujemy pobieranie faktur z KSeF dla wszystkich klientów biura (po pełnomocnictwach), parowanie z dokumentami papierowymi, wprowadzanie do Comarch Optima/Symfonii/Enova/InsERT i obsługę faktur wystawianych przez klientów. Przygotowanie wcześniej oznacza, że pierwszy miesiąc pełnego KSeF nie zabija zespołu.",
  },
  {
    pain: "Klienci dzwonią co dzień z pytaniem „kiedy raport za zeszły miesiąc?”",
    solution:
      "Standaryzujemy raport miesięczny (PDF + ewentualny dashboard online) i automatyzujemy jego dystrybucję po zamknięciu okresu. Klient dostaje go o stałym dniu, w stałej formie, przez bezpieczny kanał. Telefonów ubywa, opiekunowie odzyskują czas na realne pytania.",
  },
  {
    pain: "Każdy nowy klient to dwa dni papierologii i pięć systemów do założenia",
    solution:
      "Spinamy formularz onboardingowy z podpisem online umowy (Autenti/DocuSign), pobieraniem danych z GUS, generowaniem UPL-1, zakładaniem klienta w systemie księgowym, w CRM, w SaldeoSmart i w portalu klienta. Czas onboardingu spada z dwóch dni do około pół godziny zegarowej zespołu.",
  },
];

const tools = [
  {
    name: "Comarch Optima, Symfonia, Enova, InsERT",
    description:
      "Cztery najpopularniejsze systemy księgowe w Polsce. Każdy ma własne API lub integracje (Optima przez Comarch ERP API, Symfonia przez Symfonia API, Enova przez SDK). Pracujemy na wszystkich, tworząc warstwę pośrednią, która przyjmuje dane z OCR, KSeF i innych źródeł i wprowadza je we właściwym formacie.",
  },
  {
    name: "SaldeoSmart",
    description:
      "Standard OCR faktur w polskich biurach rachunkowych. Spinamy SaldeoSmart z systemem księgowym i z mailami klientów (faktury wpływają z różnych skrzynek, automatycznie trafiają do SaldeoSmart). Robimy też logikę uzupełniającą — gdy SaldeoSmart nie poradzi sobie z dokumentem, eskalacja do księgowego, a nie cisza.",
  },
  {
    name: "KSeF",
    description:
      "Krajowy System e-Faktur. Pobieranie faktur dla klientów biura (po pełnomocnictwach), weryfikacja, parowanie, wprowadzanie do systemu księgowego. Obsługujemy zarówno przyjmowanie faktur kosztowych klientów, jak i wystawianie faktur sprzedaży przez klientów (jeśli biuro to robi w ich imieniu).",
  },
  {
    name: "n8n",
    description:
      "Self-hosted automatyzacja, w której budujemy większość przepływów dla biur rachunkowych. Pełna kontrola nad danymi (RODO, tajemnica zawodowa), brak limitów na liczbę dokumentów. Idealna dla biur z portfelem 50+ klientów, gdzie liczba operacji miesięcznie idzie w tysiące.",
  },
  {
    name: "Zapier i Make",
    description:
      "Sprawdzają się w mniejszych biurach lub jako uzupełnienie n8n dla prostych integracji (np. lead z formularza → CRM, dokument w Drive → folder klienta). Make daje dobre możliwości w niskiej cenie, Zapier wygrywa szerokością integracji z mniej technicznymi narzędziami.",
  },
  {
    name: "Pipedrive lub HubSpot",
    description:
      "Dla części handlowej biura (pozyskiwanie nowych klientów). Spinamy CRM z onboardingiem, podpisem umowy, fakturowaniem retainera księgowego i — jeśli biuro tego potrzebuje — z bazą klientów w systemie księgowym.",
  },
];

const faq = [
  {
    question:
      "Pracujemy w Comarch Optima. Czy automatyzacja wymaga zmiany systemu?",
    answer:
      "Nie. Optima ma API, z którym pracujemy bezpośrednio (Comarch ERP API). Wprowadzamy dokumenty z OCR, pobieramy faktury z KSeF, eksportujemy raporty — wszystko bez zmiany systemu księgowego. Tak samo działamy z Symfonią, Enovą i InsERT.",
  },
  {
    question:
      "Mamy SaldeoSmart, ale tylko częściowo wykorzystany. Da się to lepiej spiąć?",
    answer:
      "Tak. Najczęściej spotykany przypadek: SaldeoSmart rozpoznaje faktury, ale ktoś i tak ręcznie eksportuje plik i wgrywa do Optimy. Łączymy te dwa kroki tak, żeby rozpoznana faktura trafiała do systemu księgowego sama (jako dokument do akceptacji albo zatwierdzona od razu — zależnie od reguł). Ten jeden klik na fakturę pomnożony przez 1000 dokumentów miesięcznie to konkretne godziny.",
  },
  {
    question: "Jak wygląda automatyzacja KSeF w 2026?",
    answer:
      "Obowiązkowy KSeF dla największych firm wchodzi etapowo od lutego 2026. Dla biura oznacza to konieczność pobierania faktur sprzedażowych klientów z KSeF (jeśli klient sam wystawia) oraz pobierania faktur kosztowych. Konfigurujemy pobieranie po pełnomocnictwach, weryfikację dokumentów i wprowadzanie do systemu księgowego. Najlepiej zacząć przed wejściem obowiązku, żeby pierwszy miesiąc nie był pożarem.",
  },
  {
    question: "Co z tajemnicą zawodową i RODO?",
    answer:
      "Dla biur rachunkowych standardowo konfigurujemy automatyzację w architekturze, gdzie dane klientów nie wychodzą poza Polskę / EOG, a najczęściej w ogóle nie wychodzą poza serwer biura (n8n self-hosted na Waszej infrastrukturze). Wszystkie integracje z KSeF, GUS, białą listą działają na oficjalnych API. RODO i tajemnica zawodowa to wymóg twardy — nie obchodzimy go.",
  },
  {
    question: "Ile kosztuje wdrożenie automatyzacji w biurze rachunkowym?",
    answer:
      "Pojedynczy use case (np. tylko automatyczne przypomnienia o dokumentach albo tylko spięcie SaldeoSmart z Optimą) to 1–2 tygodnie pracy. Pełne wdrożenie (OCR + KSeF + przypomnienia + raporty miesięczne + onboarding) to typowo 2–4 miesiące, robione etapami. Wycenę dajemy po godzinnej rozmowie i przejrzeniu obecnego stacku.",
  },
  {
    question: "Mamy 30 klientów. Czy to ma sens przy takiej skali?",
    answer:
      "Przy 30 klientach najszybciej zwracają się: automatyczne przypomnienia o dokumentach, OCR z bezpośrednim wprowadzaniem do systemu księgowego i raporty miesięczne. Pełna automatyzacja onboardingu zaczyna mieć sens raczej od ~50 klientów rocznie nowych. Po krótkiej rozmowie wskazujemy uczciwie, co warto przy Waszej skali, a co lepiej zostawić do większego portfela.",
  },
  {
    question:
      "Klienci wysyłają faktury w 5 różny sposób (mail, Drive, paczka, portal). Da się to ujednolicić?",
    answer:
      "Tak. Konfigurujemy jedno wejście (np. portal klienta lub dedykowany adres e-mail per klient), do którego automatycznie spływają dokumenty z różnych źródeł. Z punktu widzenia księgowego — wszystko ląduje w jednym miejscu, w odpowiednim folderze klienta, z metadanymi (data, kategoria). Z punktu widzenia klienta — może dalej przesyłać tak, jak przesyłał, ale nic już nie ginie.",
  },
];

const relatedServices = [
  {
    label: "Automatyzacja procesów biznesowych",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { label: "Integracje API", href: "/integracje-api" },
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { label: "Automatyzacja CRM", href: "/automatyzacja-crm" },
  { label: "Automatyzacja leadów", href: "/automatyzacja-leadow" },
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
    label: "Jak zautomatyzować raportowanie w firmie",
    href: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
  },
  {
    label: "Jak policzyć ROI z automatyzacji",
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
];

export default function AutomatyzacjaDlaBiurRachunkowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[{ label: "Automatyzacja dla biur rachunkowych" }]}
        />

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
                  Automatyzacja dla biur rachunkowych
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  KSeF od 2026, rosnąca liczba dokumentów, klienci spóźnieni z
                  dostarczeniem faktur, ręczne wprowadzanie do Optimy czy
                  Symfonii — to są realne bóle, które kosztują biuro etat lub
                  dwa rocznie. Automatyzujemy OCR, KSeF, przypomnienia, raporty
                  i onboarding tak, żeby zespół miał czas na doradztwo, a nie na
                  przepisywanie.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/data.jpg"
                    alt="Automatyzacja dla biur rachunkowych"
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
                Co automatyzujemy w biurze rachunkowym
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Biuro rachunkowe to operacja oparta o dwa zasoby: czas
                księgowych i kompletność danych od klientów. Każda godzina
                ręcznego wprowadzania faktury, każdy telefon o brakujący wyciąg,
                każda sklejana ręcznie deklaracja to koszt, który rośnie liniowo
                z portfelem klientów. Automatyzacja przerywa tę zależność —
                biuro może obsługiwać dwa razy więcej klientów bez podwajania
                zespołu.
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
                Poniżej najczęstsze sytuacje, które słyszymy od właścicieli i
                kierowników biur rachunkowych. Każdy z tych problemów ma
                konkretne rozwiązanie technologiczne — zwykle dające się wdrożyć
                w tygodniach, nie miesiącach.
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
                Narzędzia, z którymi pracujemy w biurach rachunkowych
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Polskie biura rachunkowe pracują głównie na czterech systemach
                księgowych i kilku narzędziach pomocniczych. Nasza rola polega
                na spięciu tego, co już macie — z OCR, KSeF, portalem klienta i
                automatyką komunikacji.
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
                Po szczegóły dotyczące samej platformy automatyzacji zajrzyj do{" "}
                <Link href="/n8n" className="text-accent hover:underline">
                  n8n
                </Link>{" "}
                lub{" "}
                <Link
                  href="/zapier-make"
                  className="text-accent hover:underline"
                >
                  Zapier i Make
                </Link>
                . Integracje z systemami księgowymi i KSeF opisujemy w sekcji{" "}
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
                Dla biur rachunkowych z portfelem od kilkudziesięciu klientów
                wzwyż, w których ręczne wprowadzanie faktur, gonienie klientów
                za dokumentami i klepanie raportów miesięcznych zaczyna
                pochłaniać większość czasu zespołu. Pracujemy zarówno z biurami
                pełnoksięgowymi, jak i z biurami obsługującymi głównie
                JDG/KPiR/ryczałt. Szczególnie często wdrażamy{" "}
                <Link
                  href="/automatyzacja-raportowania"
                  className="text-accent hover:underline"
                >
                  automatyzację raportowania
                </Link>{" "}
                miesięcznego oraz integracje OCR i KSeF z systemami księgowymi (
                <Link
                  href="/integracje-api"
                  className="text-accent hover:underline"
                >
                  integracje API
                </Link>
                ).
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
                KSeF blisko, a zespół już dziś nie wyrabia z papierami?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam, jak dziś wygląda obieg dokumentów w biurze. Wskażemy
                konkretne miejsca, gdzie automatyzacja odda zespołowi
                kilkanaście godzin tygodniowo.
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
            name: "Automatyzacja dla biur rachunkowych",
            description:
              "Automatyzacja biura rachunkowego: OCR faktur do Comarch Optima, Symfonii i Enova, integracje z SaldeoSmart i KSeF, przypomnienia do klientów o brakujących dokumentach, automatyczne raporty miesięczne. Mniej ręcznego klepania, więcej czasu na klienta.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType:
              "Automatyzacja procesów biznesowych dla biur rachunkowych",
            url: "https://fluxlab.pl/automatyzacja-dla-biur-rachunkowych",
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
