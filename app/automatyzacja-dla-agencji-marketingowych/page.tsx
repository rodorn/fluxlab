import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Automatyzacja dla agencji marketingowych — raporty, onboarding, retainery | Fluxlab",
  description:
    "Automatyzacja agencji marketingowej: raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin, fakturowanie retainerów i porządek w 15 projektach naraz. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
  openGraph: {
    title:
      "Automatyzacja dla agencji marketingowych — raporty, onboarding, retainery | Fluxlab",
    description:
      "Automatyzacja agencji marketingowej: raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin, fakturowanie retainerów i porządek w 15 projektach naraz. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów dla agencji marketingowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-dla-agencji-marketingowych",
  },
};

const useCases = [
  {
    title: "Automatyczne raporty z Google Ads, Meta Ads i GA4",
    description:
      "Co tydzień lub co miesiąc raport dla każdego klienta tworzy się sam — z aktualnymi danymi z Google Ads, Meta Ads, GA4, Search Console, TikTok Ads. Może trafić jako PDF mailem, jako dashboard w Looker Studio, albo jako post w dedykowanym kanale Slack klienta. Account managerowie odzyskują kilka godzin tygodniowo na realną pracę z klientem.",
  },
  {
    title: "Onboarding nowego klienta",
    description:
      "Podpisany kontrakt uruchamia łańcuch działań: tworzy się klient w CRM (HubSpot lub Pipedrive), powstaje folder w Google Drive, board projektowy w ClickUp lub Asanie, kanał na Slacku, zaplanowany kickoff w kalendarzu, wysłany welcome pack mailem. Cały proces, który normalnie kosztuje pół dnia pracy account managera, dzieje się sam w 5 minut.",
  },
  {
    title: "Śledzenie godzin i rentowności klienta",
    description:
      "Time tracking z ClickUp, Toggla czy Harvesta automatycznie agreguje się do raportu pokazującego, ile godzin poszło na konkretnego klienta w stosunku do kontraktu. Jeśli przekraczacie budżet retainera, system informuje wcześniej, a nie miesiąc później przy fakturowaniu.",
  },
  {
    title: "Fakturowanie retainerów i nadgodzin",
    description:
      "Każdego pierwszego dnia miesiąca system tworzy faktury za retainery wszystkich klientów, dolicza nadgodziny z time trackera, wystawia w Fakturowni lub iFircie i wysyła z odpowiednim opisem. Dla klientów rozliczanych project-based — fakturowanie spina się z milestone'ami w project boardzie.",
  },
  {
    title: "Lead pipeline i ofertowanie",
    description:
      "Lead z formularza, LinkedIn lub kampanii trafia do CRM, automatycznie się kwalifikuje (po branży, budżecie, źródle), trafia do odpowiedniej osoby. Po pierwszej rozmowie system pilnuje wysłania propozycji, ofert i follow-upów w odpowiednich odstępach.",
  },
];

const painPoints = [
  {
    pain: "Każdy poniedziałek to ręczne klepanie 12 raportów dla klientów",
    solution:
      "Budujemy szablon raportu (Looker Studio, Google Slides z podpiętym arkuszem albo PDF generowany z n8n) i automatyzujemy pobieranie danych z Google Ads, Meta Ads, GA4 oraz Search Console. Raport powstaje sam w nocy z niedzieli na poniedziałek. Account manager dodaje komentarz strategiczny zamiast spędzać 4 godziny w Slidesach.",
  },
  {
    pain: "Nowy klient — i znowu pół dnia tworzenia kont, kanałów, folderów",
    solution:
      "Pojedynczy formularz onboardingowy (lub status w CRM) uruchamia automatyzację, która tworzy: klienta w HubSpot/Pipedrive, folder w Google Drive z gotową strukturą, kanał Slack z odpowiednimi osobami, projekt w ClickUp/Asanie z szablonem zadań, dostępy do Google Ads/Meta Ads, wpis w bazie klientów, zaplanowany kickoff. Wszystko w 5 minut zamiast pół dnia.",
  },
  {
    pain: "15 klientów, 15 kanałów Slacka, 15 boardów — i nikt nie ogarnia, gdzie co stoi",
    solution:
      "Spinamy ClickUp/Asanę z dashboardem, który dla każdego account managera pokazuje status wszystkich jego klientów: deadline'y w tym tygodniu, blokery, zadania klienta wymagające reakcji, status kampanii. Dodatkowo automatyczne podsumowania do Slacka zamiast ręcznego sprawdzania 15 boardów.",
  },
  {
    pain: "Klienci nie widzą, że robicie robotę — pojawiają się dopiero gdy coś się sypie",
    solution:
      "Automatyczne weekly update do klienta ze statusem kampanii, zrealizowanymi zadaniami i planem na kolejny tydzień. Generowane z danych w project boardzie i platformach reklamowych. Klient czuje, że jest informowany, a Wy nie tracicie godziny tygodniowo na ręczne maile.",
  },
  {
    pain: "Czas i koszt na klienta jest niepoliczalny — wszystkie projekty wyglądają na rentowne, a wynik mówi co innego",
    solution:
      "Łączymy time tracking, koszt zespołu (godzinowy), wynagrodzenie umowne klienta (retainer + project fees) w jeden raport rentowności. Co miesiąc widzicie, na którym kliencie zarabiacie, a który zżera marżę. Decyzje biznesowe zaczynają być podejmowane na danych, nie na intuicji właściciela.",
  },
];

const tools = [
  {
    name: "HubSpot i Pipedrive",
    description:
      "Pipeline lead generation i obsługi klientów dla agencji. Pipedrive zwykle wybierany dla mniejszych agencji ze względu na prostotę i koszt, HubSpot — gdzie zespół sprzedaży jest większy i potrzeba marketing automation w jednym miejscu z CRM.",
  },
  {
    name: "ClickUp i Asana",
    description:
      "Centra zarządzania projektami klienckimi. ClickUp daje większą elastyczność i lepiej skaluje się przy 20+ klientach. Asana jest prostsza i szybciej wdrażalna. Automatyzujemy templaty projektów, statusy, raportowanie i komunikację z klientem.",
  },
  {
    name: "n8n",
    description:
      "Self-hosted automatyzacja, idealna do budowy własnych raportów (np. agregacja Google Ads + Meta Ads + GA4 → PDF), własnego onboardingu i logiki, której nie pokrywają natywne integracje. Bez limitów wykonań, co liczy się przy generowaniu setek raportów miesięcznie.",
  },
  {
    name: "Zapier i Make",
    description:
      "Szybkie integracje typu „klient zmienił status w Pipedrive → utwórz folder w Drive → wyślij maila”. Dla mniejszych agencji często wystarczające. Make daje większą kontrolę nad logiką, Zapier — szerszy katalog gotowych integracji.",
  },
  {
    name: "Looker Studio",
    description:
      "Standard raportowania klienckiego w marketingu. Spinamy Looker z Google Ads, Meta Ads (przez konektor), GA4, Search Console, CallTracking, CRM. Klient dostaje link do live dashboardu, agencja unika ręcznego klepania prezentacji.",
  },
];

const faq = [
  {
    question:
      "Pracujemy w HubSpot. Czy automatyzacja onboardingu wymaga zmiany CRM?",
    answer:
      "Nie. HubSpot ma rozbudowane workflow własne, które dla części automatyzacji wystarczają. Dla rzeczy, których HubSpot nie umie (np. tworzenie kanału Slack, struktur folderów Drive z odpowiednimi uprawnieniami, projektów w ClickUp), dokładamy n8n lub Zapiera jako warstwę spinającą. CRM zostaje ten, który macie.",
  },
  {
    question:
      "Mamy 30 klientów na retainerach. Czy raporty da się zautomatyzować dla wszystkich naraz?",
    answer:
      "Tak. Standardowo budujemy jeden szablon raportu (Looker Studio lub generowany PDF) i parametryzujemy go po kliencie. Co tydzień system iteruje po liście klientów, podstawia ich dane z Google Ads/Meta Ads/GA4 i wysyła każdemu osobny raport. Dodanie 31. klienta to wpis w arkuszu, nie nowy projekt.",
  },
  {
    question: "Ile to kosztuje przy agencji do 20 osób?",
    answer:
      "Pojedynczy use case (np. tylko automatyczne raporty albo tylko onboarding) to 1–2 tygodnie pracy. Pełne wdrożenie (lead pipeline + onboarding + raporty + fakturowanie + dashboard rentowności) to zwykle 1–3 miesiące, rozbite na etapy. Koszt zależy głównie od liczby integracji i niestandardowej logiki — orientacyjną wycenę dajemy po godzinnej rozmowie.",
  },
  {
    question: "Co z bezpieczeństwem dostępów do kont reklamowych klientów?",
    answer:
      "Automatyzacja działa na kontach, do których agencja ma już dostęp (zwykle przez Google Ads Manager, Meta Business Manager). Nie pobieramy ani nie przechowujemy haseł. Wszystkie integracje korzystają z OAuth, a refresh tokeny trzymamy w bezpiecznym miejscu (n8n self-hosted lub vault). Dostęp jest revokowalny w każdej chwili przez klienta.",
  },
  {
    question:
      "Mamy własną metodologię raportów — czy automatyzacja to ograniczy?",
    answer:
      "Nie powinna. Cała koncepcja polega na tym, że Wy zostawiacie część strategiczną (komentarz, rekomendacje, wnioski), a automatyzacja pobiera za Was dane i generuje warstwę liczbowo-wykresową. Szablon dopasowujemy do tego, jak raportujecie dziś — nie odwrotnie.",
  },
  {
    question:
      "Co z agencjami, które łączą performance marketing z social media managementem?",
    answer:
      "To wręcz idealny przypadek. Im więcej różnych typów usług w jednym kontrakcie, tym większy chaos w project managemencie i tym większy zysk z automatyzacji. Spinamy zarówno performance (raporty z platform reklamowych), jak i SMM (statusy postów, harmonogramy publikacji, raporty zasięgów) w jeden widok dla account managera i klienta.",
  },
  {
    question: "Czy ma sens, jeśli mamy tylko 5 klientów?",
    answer:
      "Częściowo. Przy 5 klientach pełna automatyzacja onboardingu i raportowania może być przerostem formy nad treścią — godzinowy zysk będzie mały. Ale lead pipeline, fakturowanie i prosty dashboard rentowności mają sens nawet przy małej skali, bo zwykle to tu agencje tracą najwięcej pieniędzy na nieefektywności. Po krótkiej rozmowie powiemy uczciwie, co warto, a co odpuścić do większej skali.",
  },
];

const relatedServices = [
  {
    label: "Automatyzacja procesów biznesowych",
    href: "/automatyzacja-procesow-biznesowych",
  },
  { label: "Automatyzacja CRM", href: "/automatyzacja-crm" },
  { label: "Automatyzacja raportowania", href: "/automatyzacja-raportowania" },
  { label: "Automatyzacja leadów", href: "/automatyzacja-leadow" },
  { label: "Integracje API", href: "/integracje-api" },
  { label: "n8n — wdrożenia", href: "/n8n" },
  { label: "Zapier i Make", href: "/zapier-make" },
];

const relatedArticles = [
  {
    label: "Jak zautomatyzować raportowanie w firmie",
    href: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
  },
  {
    label: "Jak połączyć CRM z innymi systemami",
    href: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
  },
  {
    label: "Najczęstsze błędy w raportowaniu sprzedaży",
    href: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
  },
  {
    label: "Jak policzyć ROI z automatyzacji",
    href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  },
];

export default function AutomatyzacjaDlaAgencjiMarketingowych() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[{ label: "Automatyzacja dla agencji marketingowych" }]}
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
                  Automatyzacja dla agencji marketingowych
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Agencja marketingowa traci kilkanaście godzin tygodniowo na
                  raporty, onboarding i pilnowanie 15 projektów naraz. Spinamy
                  HubSpot, Pipedrive, ClickUp, Asanę, Slacka, Google Ads, Meta
                  Ads i GA4 tak, żeby zespół zajmował się klientem, a nie
                  klepaniem slajdów.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/raport.jpg"
                    alt="Automatyzacja dla agencji marketingowych"
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
                Co automatyzujemy w agencji marketingowej
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Agencja to setki powtarzalnych mikro-procesów: nowy klient, nowy
                projekt, nowy raport, nowa faktura, nowa kampania, nowy
                kontrakt. Każdy z nich ręcznie zajmuje 10–60 minut komuś
                kompetentnemu. Pomnożone przez liczbę klientów i tygodni daje to
                etat lub dwa rocznie. Automatyzacja przenosi te mikro-procesy na
                maszynę, zostawiając ludziom strategię i pracę z klientem.
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
                Poniżej najczęstsze sytuacje z agencji performance i agencji
                360°. Każdy z tych bólów spotykamy w niemal każdej rozmowie — i
                każdy ma dość konkretne rozwiązanie technologiczne.
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
                Narzędzia, z którymi pracujemy w agencjach
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-10">
                Większość agencji używa podobnego stacku: CRM, project
                management, time tracking, raportowanie, komunikacja, platformy
                reklamowe. Nasza rola polega na spięciu tego, co już macie — nie
                na sprzedaży nowego oprogramowania.
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
                Po szczegóły dotyczące samych platform automatyzacji zajrzyj do{" "}
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
                . Część integracji robimy bezpośrednio na API platform
                reklamowych — opisujemy to na stronie{" "}
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
                Dla agencji marketingowych z portfelem przynajmniej kilkunastu
                aktywnych klientów, gdzie ręczne raportowanie, onboarding i
                fakturowanie zaczyna pożerać tygodnie pracy zespołu. Pracujemy z
                agencjami performance (Google Ads, Meta Ads, kampanie B2B),
                agencjami SEO, social media oraz pełnoserwisowymi 360°.
                Szczególnie często wdrażamy automatyzację procesów ofertowania
                (więcej w sekcji{" "}
                <Link
                  href="/automatyzacja-leadow"
                  className="text-accent hover:underline"
                >
                  automatyzacja leadów
                </Link>
                ) i raportowania klienckiego (
                <Link
                  href="/automatyzacja-raportowania"
                  className="text-accent hover:underline"
                >
                  automatyzacja raportowania
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
                Zespół spędza więcej czasu na raportach niż na klientach?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Pokaż nam Wasz proces. Wskażemy konkretne miejsca, gdzie
                automatyzacja odda zespołowi 10–20 godzin tygodniowo.
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
            name: "Automatyzacja dla agencji marketingowych",
            description:
              "Automatyzacja agencji marketingowej: raporty z Google Ads, Meta Ads i GA4, onboarding klienta, śledzenie godzin, fakturowanie retainerów i porządek w 15 projektach naraz. Spinamy HubSpot, Pipedrive, ClickUp, Asanę i Slacka.",
            provider: { "@id": "https://fluxlab.pl/#organization" },
            areaServed: { "@type": "Country", name: "PL" },
            serviceType:
              "Automatyzacja procesów biznesowych dla agencji marketingowych",
            url: "https://fluxlab.pl/automatyzacja-dla-agencji-marketingowych",
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
