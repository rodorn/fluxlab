import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Salesforce dla małej firmy — czy warto | Fluxlab",
  description:
    "Czy Salesforce ma sens w małej firmie? Realne koszty, czas wdrożenia, alternatywy (Pipedrive, HubSpot) i scenariusze, w których Salesforce naprawdę się zwraca w 2026.",
  openGraph: {
    title: "Salesforce dla małej firmy — czy warto | Fluxlab",
    description:
      "Czy Salesforce ma sens w małej firmie? Realne koszty, czas wdrożenia, alternatywy (Pipedrive, HubSpot) i scenariusze, w których Salesforce naprawdę się zwraca w 2026.",
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
    canonical: "/strefa-wiedzy/salesforce-dla-malej-firmy",
  },
};

export default function SalesforceDlaMalejFirmyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Salesforce dla małej firmy — czy warto" },
          ]}
        />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Salesforce dla małej firmy — czy warto
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Salesforce kojarzy się z poważnym CRM dla korporacji. W
              rzeczywistości ma też plany skierowane do mniejszych firm, ale
              „mniejsze" nie znaczy „lekkie". Odpowiedź na pytanie, czy warto,
              zależy od tego, jak wygląda proces, dane i ambicje firmy — nie od
              marki na wizytówce.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8">
              <article className="max-w-3xl mx-auto lg:mx-0 w-full space-y-16">
                {/* Section 1 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Co właściwie kupujesz w Salesforce
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Salesforce to nie produkt, tylko platforma. Sales Cloud,
                    Service Cloud, Marketing Cloud, Account Engagement, Data
                    Cloud, Experience Cloud, AppExchange, Flow, Apex. Małe firmy
                    zwykle interesuje Sales Cloud, czasem z dodatkiem Service.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Najmniejszy plan, Starter Suite, jest celowo uproszczony i
                    blisko klasycznego CRM. Wyższe plany (Pro, Enterprise)
                    odblokowują custom obiekty, zaawansowane uprawnienia, Flow
                    Builder, Sandboxy i sensowne integracje. Z każdym poziomem
                    rośnie też potrzeba kogoś, kto ten system będzie utrzymywał.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Realny koszt Salesforce 2026
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Sama licencja to wierzchołek góry lodowej. Dla małej firmy
                    typowe składowe TCO wyglądają tak:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Starter Suite — od 25 USD / user / mies.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pro Suite / Professional — od ok. 80 USD / user / mies.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Enterprise — od ok. 165 USD / user / mies.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Wdrożenie partnera — typowo kilkadziesiąt tysięcy USD na
                      poważne uruchomienie Enterprise.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pakiety AppExchange — często kilkanaście–kilkadziesiąt USD
                      / user / mies. każdy.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Utrzymanie — admin Salesforce wewnętrzny lub partner.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Dla 10-osobowej firmy realny roczny koszt Salesforce
                    Enterprise z sensownym wdrożeniem często przekracza 30–50
                    tys. USD już w pierwszym roku. To wielokrotnie więcej niż
                    Pipedrive Professional, w którym ta sama firma dostaje
                    sprawne narzędzie sprzedażowe.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Czas wdrożenia
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Salesforce Starter da się skonfigurować w 1–2 tygodnie i
                    pracuje wtedy podobnie jak inne CRM-y średniej klasy.
                    Problem w tym, że Starter ma poważne ograniczenia: brak
                    custom obiektów, ograniczone Flow, brak Sandboxa.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Salesforce Enterprise to inna kategoria. Realne wdrożenie z
                    modelem danych, automatyzacjami, integracjami, raportowaniem
                    i szkoleniem zespołu trwa 3–6 miesięcy. Krócej da się
                    odpalić system, ale efekt jest zwykle taki, że firma używa
                    1/10 możliwości i płaci za 10/10.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Niezależnie od planu, sam zakup nic nie zmienia. Dopiero
                    przemyślana{" "}
                    <Link
                      href="/automatyzacja-salesforce"
                      className="text-accent hover:underline"
                    >
                      automatyzacja Salesforce
                    </Link>{" "}
                    osadzona w realnym procesie sprawia, że platforma zaczyna
                    przewyższać prostsze narzędzia.
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kiedy Salesforce ma sens w małej firmie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Małe firmy, w których Salesforce realnie się zwraca, mają
                    zwykle co najmniej jedną z poniższych cech:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      bardzo złożony model danych (multi-brand, multi-region,
                      kanały, partnerzy),
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      potrzeba jednego systemu pod sprzedaż, serwis i marketing,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      sprzedaż enterprise z długim cyklem, kontraktami,
                      forecastem i raportami zarządu,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      regulowana branża wymagająca szczegółowych uprawnień,
                      audytu i compliance,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      stała współpraca z partnerami i klientami, którzy też są w
                      Salesforce.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Jeśli żaden z punktów Cię nie dotyczy, Salesforce zwykle
                    będzie strzelaniem z armaty do wróbla.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kiedy Salesforce nie ma sensu
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    W większości scenariuszy małej firmy Salesforce jest
                    nieadekwatny. Klasyczne sygnały, że nie warto:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      zespół sprzedaży to 1–10 osób,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      proces jest klasyczny (lead → kwalifikacja → oferta →
                      umowa),
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      nie ma osoby ani budżetu na utrzymanie platformy,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      argumentem za Salesforce jest „bo wszyscy go mają", a nie
                      konkretna potrzeba.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    W tych przypadkach lepiej działa Pipedrive lub HubSpot.
                    Szczegółowe porównania znajdziesz w artykułach{" "}
                    <Link
                      href="/strefa-wiedzy/pipedrive-vs-salesforce"
                      className="text-accent hover:underline"
                    >
                      Pipedrive vs Salesforce
                    </Link>{" "}
                    oraz{" "}
                    <Link
                      href="/strefa-wiedzy/hubspot-vs-pipedrive"
                      className="text-accent hover:underline"
                    >
                      HubSpot vs Pipedrive
                    </Link>
                    . Dla solo i mikro firm dobrze pasuje także materiał o tym,
                    jaki{" "}
                    <Link
                      href="/strefa-wiedzy/crm-dla-jednoosobowej-firmy"
                      className="text-accent hover:underline"
                    >
                      CRM wybrać dla jednoosobowej firmy
                    </Link>
                    .
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Alternatywy w stylu Salesforce, ale lżejsze
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Jeśli kusi Cię „enterprise feeling" Salesforce, ale boli
                    cena i waga wdrożenia, w 2026 masz kilka realnych
                    alternatyw:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      HubSpot Sales Hub Professional — kiedy potrzebujesz
                      głębszej automatyzacji i marketing automation w jednym
                      systemie,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Pipedrive Power/Enterprise — kiedy zależy Ci na czystym
                      pipeline z kontrolą uprawnień,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Zoho CRM Enterprise — gdy zależy Ci na elastyczności i
                      niskim koszcie,
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Microsoft Dynamics 365 Sales — gdy stack firmy mocno
                      siedzi w ekosystemie Microsoft.
                    </li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Jak podjąć decyzję bez emocji
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Zanim zdecydujesz się na Salesforce, odpowiedz uczciwie na
                    pięć pytań:
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Czy mam proces, który nie mieści się w klasycznym
                      pipeline?
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Czy potrzebuję obiektów, raportów albo uprawnień, których
                      nie da się odwzorować w Pipedrive/HubSpot?
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Czy mamy budżet na utrzymanie platformy w 3 i 5 roku?
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Czy istnieje plan wdrożenia z fazami i mierzalnymi celami,
                      czy „kupimy i zobaczymy"?
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Czy główny argument za Salesforce jest funkcjonalny, czy
                      „bo prestiż"?
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Zanim w ogóle wejdziesz w temat narzędzia, warto
                    uporządkować proces — pomoże w tym{" "}
                    <Link
                      href="/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm"
                      className="text-accent hover:underline"
                    >
                      praktyczny przewodnik po procesie sprzedaży w CRM
                    </Link>{" "}
                    oraz materiał o{" "}
                    <Link
                      href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                      className="text-accent hover:underline"
                    >
                      automatyzacji CRM od podstaw
                    </Link>
                    . Bez tego Salesforce zostanie tylko drogim notatnikiem.
                  </p>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    A jeśli decyzja zapadnie i wybierasz Salesforce, prawdziwy
                    sens nadaje mu dopiero{" "}
                    <Link
                      href="/automatyzacja-crm"
                      className="text-accent hover:underline"
                    >
                      sensowna automatyzacja CRM
                    </Link>{" "}
                    spięta z resztą systemów firmy oraz dobrze ułożona{" "}
                    <Link
                      href="/automatyzacja-leadow"
                      className="text-accent hover:underline"
                    >
                      automatyzacja leadów
                    </Link>
                    .
                  </p>
                </div>

                {/* Section 8 — typowe pułapki */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Typowe pułapki wdrożeń Salesforce w MŚP
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Po stronie klientów najczęściej widuję kilka powtarzalnych
                    scenariuszy, w których Salesforce nie zadziałał nie dlatego,
                    że jest „zły", tylko dlatego, że został wdrożony w oderwaniu
                    od realiów firmy.
                  </p>
                  <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Brak ownera systemu po stronie klienta — partner
                      konfiguruje, nikt z firmy nie rozumie, jak platforma
                      działa.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Kopiowanie 1:1 procesu z Excela zamiast projektowania go
                      od nowa pod platformę.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Dokupowanie kolejnych modułów (Service, Marketing, CPQ)
                      bez domknięcia poprzedniego.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Oczekiwanie, że handlowcy sami zaczną korzystać z
                      Salesforce bez mapowania procesu i ustawionych
                      automatyzacji.
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-accent shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Wybór Enterprise „na wyrost" — firma przez lata płaci za
                      funkcje, z których realnie korzysta w 10–15%.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    W każdym z tych przypadków odpowiedzią jest nie tyle inne
                    narzędzie, co uporządkowany proces i konkretna strategia
                    wdrożenia. Dobry punkt startu to artykuł o{" "}
                    <Link
                      href="/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami"
                      className="text-accent hover:underline"
                    >
                      łączeniu CRM z innymi systemami
                    </Link>{" "}
                    — pokazuje, jak myśleć o jednym źródle prawdy, zanim
                    zaczniesz kupować licencje.
                  </p>
                </div>

                {/* Section 9 — migracja */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Jak wyjść z Salesforce, jeśli to pomyłka
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Zdarza się, że firma odkrywa po roku, że Salesforce to za
                    duże narzędzie. Dobra wiadomość: migracja jest wykonalna.
                    Zła: wymaga dyscypliny i kilku tygodni pracy.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Praktyczna sekwencja wygląda tak: najpierw audyt realnie
                    wykorzystywanych obiektów i procesów, potem mapowanie pól i
                    statusów do docelowego CRM (Pipedrive, HubSpot), eksport
                    kontaktów i deali przez API lub Data Loader, odtworzenie
                    workflow w nowym narzędziu, migracja historii aktywności w
                    zakresie, który ma sens (zwykle ostatnie 12–24 miesiące), i
                    na końcu odcięcie Salesforce.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Kluczowe jest to, co zwykle pomijane: decyzja, których
                    danych historycznych nie migrujesz. Próba przepisania
                    wszystkiego 1:1 zwykle kończy się miesiącami przeciągania i
                    frustracją zespołu. Szczegółowo omawiam tę dyscyplinę w
                    artykule o{" "}
                    <Link
                      href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                      className="text-accent hover:underline"
                    >
                      rozpoczynaniu automatyzacji CRM
                    </Link>
                    .
                  </p>
                </div>

                {/* Section 10 — FAQ */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    FAQ
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy Salesforce Starter Suite to dobry wybór dla małej
                        firmy?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Bywa sensowny, ale w tej klasie często wygrywa Pipedrive
                        lub HubSpot Free + Sales Starter. Starter Suite ma sens,
                        gdy zakładasz migrację do wyższego planu Salesforce w
                        ciągu 1–2 lat.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Ile osób w zespole „uzasadnia" Salesforce Enterprise?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Liczba sama w sobie niczego nie uzasadnia. Decyduje
                        złożoność procesu, modelu danych i potrzeba rozbudowanej
                        automatyzacji. Spotkałem firmy 200-osobowe, którym
                        Pipedrive wystarcza, i 30-osobowe, które bez Salesforce
                        nie ułożyłyby pracy.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy mogę wdrożyć Salesforce sam, bez partnera?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Starter — tak. Pro / Enterprise — niemal nigdy. Bez
                        admina lub partnera szybko rośnie dług techniczny i
                        zaczyna brakować osoby, która wie, dlaczego coś działa
                        akurat tak.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy Salesforce zwraca się szybciej niż Pipedrive?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Bardzo rzadko w małej firmie. ROI Salesforce zwykle
                        pojawia się dopiero przy złożonych procesach i dużej
                        skali. W prostym B2B Pipedrive zwraca się szybciej i
                        taniej.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy da się zmigrować z Salesforce do Pipedrive lub
                        HubSpot?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Da się — kontakty, deale, podstawowa historia. Trudniej
                        odtworzyć custom obiekty, Flow i raporty. Plan migracji
                        warto rozpisać równolegle do uzasadnienia, dlaczego
                        zmieniacie system.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Co z Einstein i AI w Salesforce?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Einstein i Agentforce są mocne, ale to dodatki na samej
                        górze cennika. Małej firmie zwykle wystarcza zwykłe AI
                        wbudowane w Pipedrive lub HubSpot, bez dopłaty rzędu
                        kilkuset USD per user.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Jaki jest najgorszy scenariusz wdrożenia Salesforce w
                        małej firmie?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Kupić Enterprise „na wzrost", skonfigurować w pośpiechu,
                        nie wyznaczyć admina, dorzucić kilka pakietów z
                        AppExchange — i po roku odkryć, że firma używa 10%
                        funkcji za 100% ceny.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              <TableOfContents containerSelector="article" />
            </div>

            {/* Prev / Next */}
            <div className="max-w-3xl mx-auto mt-16">
              <PrevNextArticle currentHref="/strefa-wiedzy/salesforce-dla-malej-firmy" />
            </div>

            {/* CTA */}
            <div className="max-w-3xl mx-auto mt-16 rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Zastanawiasz się, czy Salesforce to dla Ciebie nie za dużo?
              </p>
              <Link
                href="/automatyzacja-salesforce"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja Salesforce
              </Link>
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
            headline: "Salesforce dla małej firmy — czy warto",
            description:
              "Czy Salesforce ma sens w małej firmie? Realne koszty, czas wdrożenia, alternatywy (Pipedrive, HubSpot) i scenariusze, w których Salesforce naprawdę się zwraca w 2026.",
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

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Czy Salesforce Starter Suite to dobry wybór dla małej firmy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bywa sensowny, ale w tej klasie często wygrywa Pipedrive lub HubSpot Free + Sales Starter. Starter Suite ma sens, gdy zakładasz migrację do wyższego planu Salesforce w ciągu 1–2 lat.",
                },
              },
              {
                "@type": "Question",
                name: "Ile osób w zespole uzasadnia Salesforce Enterprise?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Liczba sama w sobie niczego nie uzasadnia. Decyduje złożoność procesu, modelu danych i potrzeba rozbudowanej automatyzacji.",
                },
              },
              {
                "@type": "Question",
                name: "Czy mogę wdrożyć Salesforce sam, bez partnera?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Starter — tak. Pro lub Enterprise — niemal nigdy. Bez admina lub partnera szybko rośnie dług techniczny i brakuje osoby, która wie, dlaczego coś działa akurat tak.",
                },
              },
              {
                "@type": "Question",
                name: "Czy Salesforce zwraca się szybciej niż Pipedrive?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Bardzo rzadko w małej firmie. ROI Salesforce zwykle pojawia się dopiero przy złożonych procesach i dużej skali. W prostym B2B Pipedrive zwraca się szybciej i taniej.",
                },
              },
              {
                "@type": "Question",
                name: "Czy da się zmigrować z Salesforce do Pipedrive lub HubSpot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Da się — kontakty, deale, podstawowa historia. Trudniej odtworzyć custom obiekty, Flow i raporty. Plan migracji warto rozpisać równolegle do uzasadnienia, dlaczego zmieniacie system.",
                },
              },
              {
                "@type": "Question",
                name: "Co z Einstein i AI w Salesforce?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Einstein i Agentforce są mocne, ale to dodatki na samej górze cennika. Małej firmie zwykle wystarcza zwykłe AI wbudowane w Pipedrive lub HubSpot.",
                },
              },
              {
                "@type": "Question",
                name: "Jaki jest najgorszy scenariusz wdrożenia Salesforce w małej firmie?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Kupić Enterprise na wzrost, skonfigurować w pośpiechu, nie wyznaczyć admina, dorzucić kilka pakietów z AppExchange — i po roku odkryć, że firma używa 10% funkcji za 100% ceny.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
