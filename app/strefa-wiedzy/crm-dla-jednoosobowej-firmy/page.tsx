import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "CRM dla jednoosobowej firmy — co wybrać | Fluxlab",
  description:
    "Praktyczne porównanie CRM dla solo consultantów i jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Google Sheets. Co wybrać i czego unikać w 2026.",
  openGraph: {
    title: "CRM dla jednoosobowej firmy — co wybrać | Fluxlab",
    description:
      "Praktyczne porównanie CRM dla solo consultantów i jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Google Sheets. Co wybrać i czego unikać w 2026.",
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
    canonical: "/strefa-wiedzy/crm-dla-jednoosobowej-firmy",
  },
};

export default function CrmDlaJednoosobowejFirmyArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "CRM dla jednoosobowej firmy — co wybrać" },
          ]}
        />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 lg:py-24">
          <div className="container-wide max-w-3xl mx-auto text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              CRM dla jednoosobowej firmy — co wybrać
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Solo consultant nie ma czasu na konfigurowanie systemu, który
              nigdy nie zacznie zwracać. CRM ma w jego przypadku jeden cel:
              przypomnieć, do kogo trzeba wrócić, i pokazać, gdzie utknęły
              rozmowy. Wszystko poza tym to overengineering.
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
                    Czego naprawdę potrzebuje solo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Jednoosobowa firma nie potrzebuje rozbudowanego pipeline,
                    workflow z 20 krokami ani marketing automation. Potrzebuje
                    odpowiedzi na trzy pytania:
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
                      do kogo dziś muszę się odezwać,
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
                      które rozmowy mogą zamknąć się w tym kwartale,
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
                      gdzie utknęły leady, do których przestałem wracać.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    To wszystko. Reszta to dodatki, które dla jednej osoby
                    częściej rozpraszają niż pomagają.
                  </p>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Pipedrive — solidny środek
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Pipedrive Essential to ok. 14 USD miesięcznie za jednego
                    użytkownika. Dostajesz pipeline, deale, zadania, integrację
                    ze skrzynką i kalendarzem oraz proste raporty. Dla solo
                    consultanta to absolutnie wystarczająca konfiguracja.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Plus: bardzo szybki start, czysty widok pracy. Minus: nie ma
                    sensownego planu darmowego, więc to zawsze koszt. Jeśli
                    chcesz wycisnąć z niego maksimum, warto wesprzeć go{" "}
                    <Link
                      href="/automatyzacja-pipedrive"
                      className="text-accent hover:underline"
                    >
                      automatyzacją Pipedrive
                    </Link>{" "}
                    — choćby prostą: lead z formularza, follow-up po spotkaniu,
                    przypomnienie o utkniętym dealu.
                  </p>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    HubSpot Free — darmowy, ale z gwiazdką
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Darmowy CRM HubSpota dla jednej osoby często wystarcza:
                    kontakty, deale, zadania, integracja Gmail/Outlook,
                    podstawowe szablony e-mail. Limit aktywnych funkcji w
                    darmowej wersji jest jednak realny — przy próbie
                    poważniejszej automatyzacji szybko trafisz na płatne huby.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Dla solo consultanta, który nie planuje skalowania zespołu,
                    HubSpot Free bywa najtańszą opcją na lata. Trzeba mieć tylko
                    świadomość, że ekosystem prowadzi do wyższych planów —
                    pisałem o tym przy okazji porównania{" "}
                    <Link
                      href="/strefa-wiedzy/hubspot-vs-pipedrive"
                      className="text-accent hover:underline"
                    >
                      HubSpot vs Pipedrive
                    </Link>
                    .
                  </p>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Folk i Attio — nowa generacja CRM
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Folk i Attio to młodsze CRM-y zaprojektowane pod relacje, a
                    nie tylko pipeline. Folk dobrze sprawdza się dla
                    konsultantów, agencji i freelancerów — wciąga kontakty z
                    Gmaila/LinkedIn, pokazuje historię relacji, ma proste pipy.
                    Attio idzie w stronę elastycznej bazy danych à la Airtable z
                    funkcjami CRM, świetne dla VC, recruiterów i firm
                    operacyjnych.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Cennik obu zaczyna się od planów dla solo (orientacyjnie
                    20–30 USD / user / mies.), oba mają mocne integracje z
                    Gmailem i Slackiem. Plus: nowoczesny UX, świetnie pasuje do
                    pracy na relacjach. Minus: ekosystem jest mniejszy niż
                    Pipedrive/HubSpot.
                  </p>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Monday CRM — gdy lubisz boardy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Monday CRM nadbudowuje się na uniwersalnej platformie
                    Monday.com. Dla jednoosobowej firmy to sensowny wybór tylko
                    wtedy, gdy i tak prowadzisz na Monday projekty albo
                    operacje. Wtedy CRM siedzi „w domu" obok pozostałych
                    boardów.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Cena Monday CRM zaczyna się od ok. 12–15 USD / seat / mies.
                    przy płatności rocznej, ale typowo wymaga minimum 3 seatów —
                    dla solo to często dyskwalifikacja.
                  </p>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Notion jako CRM DIY
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Notion nie jest CRM-em, ale wielu solo konsultantów używa go
                    jako lekkiej bazy: tabela kontaktów, lista deali, board z
                    etapami, notatki ze spotkań w jednym miejscu. Plus: zerowa
                    nauka, jeśli już używasz Notion. Wszystko jest tam, gdzie
                    trzymasz resztę pracy.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Minus: brak pełnej integracji ze skrzynką i kalendarzem,
                    słabsze przypomnienia, brak natywnego workflow. Sprawdza się
                    przy małych wolumenach (do kilkudziesięciu aktywnych
                    rozmów). Powyżej tego zaczyna się żmudna walka z brakiem
                    automatyzacji.
                  </p>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Google Sheets + automaty — opcja minimalistyczna
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Najtańsza i często niedoceniana opcja: arkusz Google z
                    kolumnami kontakt, status, data ostatniego kontaktu, kolejny
                    krok, deadline. Do tego automatyzacja w Make/n8n/Apps
                    Script: nowy lead z formularza, przypomnienie o follow-upie,
                    raport tygodniowy na maila.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Plus: 0 zł, pełna kontrola, łatwe eksporty i raporty. Minus:
                    wymaga dyscypliny, bo nikt Cię nie pilnuje. Świetnie
                    sprawdza się dla osób, które myślą procesowo. Dla wielu solo
                    to ostatnia szczerze potrzebna „warstwa" CRM przed realnym
                    wzrostem zespołu.
                  </p>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Czego unikać
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Solo consultant nie potrzebuje Salesforce — ani Starter, ani
                    Professional. Cały sens tej platformy to zarządzanie
                    procesami w zespole, modelowanie danych i głębokie
                    uprawnienia. Dla jednej osoby to bardzo drogi i ciężki
                    overengineering. Szczegółowo omawiam to w osobnym artykule o
                    tym, czy{" "}
                    <Link
                      href="/strefa-wiedzy/salesforce-dla-malej-firmy"
                      className="text-accent hover:underline"
                    >
                      Salesforce ma sens dla małej firmy
                    </Link>
                    .
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Druga pułapka: kupowanie HubSpot Professional Suite „na
                    przyszłość". Płacisz miesięcznie kilkaset USD za funkcje, z
                    których realnie nie korzystasz. Lepiej zacząć od Free albo
                    Pipedrive, a do Pro przejść wtedy, gdy faktycznie zatrudnisz
                    drugą osobę.
                  </p>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Jak wybrać w praktyce
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Dobra heurystyka dla solo:
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
                      Sprzedaż projektowa B2B z kilkudziesięcioma rozmowami —
                      Pipedrive lub Folk.
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
                      Inbound i content jako główne źródło — HubSpot Free na
                      start.
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
                      Praca relacyjna, mało aktywnych deali na raz — Notion albo
                      Folk.
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
                      Bardzo prosty proces, mocna dyscyplina — Sheets +
                      Make/n8n.
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
                      Już używasz Monday do projektów — Monday CRM.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Niezależnie od wyboru, prawdziwa różnica zaczyna się
                    dopiero, gdy do CRM dołożysz proste{" "}
                    <Link
                      href="/automatyzacja-leadow"
                      className="text-accent hover:underline"
                    >
                      automatyzacje leadów
                    </Link>{" "}
                    i przemyślaną{" "}
                    <Link
                      href="/automatyzacja-crm"
                      className="text-accent hover:underline"
                    >
                      automatyzację CRM
                    </Link>
                    . Bez tego nawet najlepszy system zostaje notatnikiem.
                  </p>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Jeśli dopiero zaczynasz, warto przejść przez listę kroków z
                    artykułu{" "}
                    <Link
                      href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                      className="text-accent hover:underline"
                    >
                      automatyzacja CRM — od czego zacząć
                    </Link>{" "}
                    — działają niezależnie od wybranego narzędzia.
                  </p>
                </div>

                {/* Section 10 — minimalne automaty */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Minimalny zestaw automatów dla solo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Niezależnie od wybranego narzędzia, jednoosobowa firma
                    powinna mieć ustawione trzy podstawowe przepływy, żeby CRM
                    realnie pracował, a nie tylko trzymał dane.
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
                      Zapis leada z formularza od razu do CRM lub arkusza — bez
                      przepisywania z maila.
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
                      Przypomnienie o follow-upie po 3 i 10 dniach braku
                      odpowiedzi — mailem albo w kalendarzu.
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
                      Raport tygodniowy na maila: aktywne deale, wartości, brak
                      follow-upu powyżej X dni.
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Te trzy elementy dają solo consultantowi większą kontrolę
                    niż najbardziej rozbudowany CRM bez automatyzacji. W
                    Pipedrive zrobisz to natywnie, w HubSpot Free przez proste
                    workflow (często pomaga Make/n8n jako nakładka), w Sheets
                    przez Apps Script lub webhook do Make.
                  </p>
                </div>

                {/* Section 11 — kiedy upgrade */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kiedy solo przerasta wybrane narzędzie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Praktyczne sygnały, że dotychczasowy CRM przestaje
                    wystarczać, są zwykle trzy. Pierwszy: tracisz rozmowy, bo
                    narzędzie nie przypomina o nich we właściwym momencie.
                    Drugi: notatki o kliencie mieszkają w czterech miejscach
                    naraz (mail, kalendarz, Notion, głowa). Trzeci: nie
                    potrafisz szybko odpowiedzieć na pytanie „ilu mam otwartych
                    leadów warto{`ś`}ci 50–100 tys. zł".
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Jeśli któryś z tych objawów występuje, to nie CRM jest za
                    słaby — najczęściej brakuje automatyzacji i prostego
                    porządku w polach. Dopiero po próbie uporządkowania warto
                    zmieniać narzędzie. W tym momencie dobrym następnym krokiem
                    jest pełen{" "}
                    <Link
                      href="/automatyzacja-pipedrive"
                      className="text-accent hover:underline"
                    >
                      setup Pipedrive z automatami
                    </Link>
                    .
                  </p>
                </div>

                {/* Section 12 — porównanie kosztów */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Porównanie rocznych kosztów dla solo
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    Tak naprawdę tylko kilka opcji jest rozsądnych dla
                    jednoosobowej firmy. Poniżej orientacyjne roczne koszty
                    samych licencji (2026), bez automatyzacji zewnętrznych.
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
                      HubSpot Free — 0 USD rocznie, z limitami funkcji i
                      brandingiem.
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
                      Google Sheets + Make/n8n — ok. 0–120 USD rocznie (darmowe
                      tiery automatyzacji zwykle wystarczają).
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
                      Notion — ok. 0–96 USD rocznie (Notion Free często
                      wystarcza).
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
                      Pipedrive Essential — ok. 168 USD rocznie.
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
                      Folk — ok. 240–360 USD rocznie.
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
                      Attio — ok. 240–360 USD rocznie w planach startowych.
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
                      Pipedrive Advanced — ok. 348 USD rocznie (sensowne, jeśli
                      chcesz workflow natywny).
                    </li>
                  </ul>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Dla porównania: Salesforce Starter dla jednego użytkownika
                    to ok. 300 USD rocznie, ale praktycznie nigdy nie zatrzymuje
                    się na tym poziomie — realny koszt przy sensownym
                    wykorzystaniu platformy to co najmniej kilkukrotnie więcej,
                    razem z czasem konfiguracji. Dla solo to zwykle wyrzucone
                    pieniądze.
                  </p>
                  <p className="mt-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                    Niezależnie od wyboru, różnicę w zwrocie robi dopiero dobrze
                    zaplanowana{" "}
                    <Link
                      href="/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac"
                      className="text-accent hover:underline"
                    >
                      pierwsza warstwa automatyzacji
                    </Link>{" "}
                    — ona waży znacznie więcej niż to, czy płacisz 14 czy 29 USD
                    miesięcznie za licencję.
                  </p>
                </div>

                {/* Section 13 — FAQ */}
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    FAQ
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy solo consultant w ogóle potrzebuje CRM?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Jeśli prowadzisz więcej niż 10–15 aktywnych rozmów
                        jednocześnie, tak. Bez systemu zaczynasz tracić leady,
                        do których po prostu nie wracasz na czas.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy darmowy HubSpot wystarczy na lata?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Dla solo bez ambicji marketing automation — często tak.
                        Granica pojawia się wtedy, gdy zaczynasz potrzebować
                        workflow, scoringu i raportów spoza prostych
                        dashboardów.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy Notion jako CRM się sprawdza?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Tak, ale do określonej skali. Sprawdza się przy mało
                        aktywnych rozmowach i mocno relacyjnym modelu sprzedaży.
                        Powyżej tego brak natywnych przypomnień i integracji
                        zaczyna boleć.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Czy warto kupić Salesforce „na wzrost"?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Nie. Salesforce dla jednej osoby jest niewspółmiernie
                        drogi i ciężki w utrzymaniu. Migrację na Salesforce rób
                        wtedy, gdy realnie masz zespół i procesy, które tego
                        wymagają.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Co z arkuszem Google jako CRM?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Działa zaskakująco dobrze, jeśli traktujesz go z
                        dyscypliną i podłączysz proste automatyzacje (Make, n8n,
                        Apps Script). Dla wielu solo to optymalne narzędzie
                        zanim pojawi się drugi człowiek w firmie.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Folk czy Attio dla konsultanta?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Folk jest bardziej „relacyjny" i prostszy w starcie.
                        Attio mocniej elastyczny, lepszy do firm operacyjnych i
                        VC. Dla typowego solo consultanta zwykle wygodniejszy
                        jest Folk.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Kiedy warto zmienić CRM?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Wtedy, gdy regularnie tracisz dane, brakuje Ci
                        konkretnej funkcji, a workaround zajmuje już więcej
                        czasu niż oszczędza. Sama nuda interfejsu nie jest
                        dobrym powodem.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              <TableOfContents containerSelector="article" />
            </div>

            {/* Prev / Next */}
            <div className="max-w-3xl mx-auto mt-16">
              <PrevNextArticle currentHref="/strefa-wiedzy/crm-dla-jednoosobowej-firmy" />
            </div>

            {/* CTA */}
            <div className="max-w-3xl mx-auto mt-16 rounded-2xl bg-accent/10 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Chcesz dobrać CRM i automaty pod swoją jednoosobową firmę?
              </p>
              <Link
                href="/automatyzacja-crm"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja CRM
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
            headline: "CRM dla jednoosobowej firmy — co wybrać",
            description:
              "Praktyczne porównanie CRM dla solo consultantów i jednoosobowych firm: Pipedrive, HubSpot Free, Folk, Attio, Notion, Monday CRM i Google Sheets. Co wybrać i czego unikać w 2026.",
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
                name: "Czy solo consultant w ogóle potrzebuje CRM?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Jeśli prowadzisz więcej niż 10–15 aktywnych rozmów jednocześnie, tak. Bez systemu zaczynasz tracić leady, do których po prostu nie wracasz na czas.",
                },
              },
              {
                "@type": "Question",
                name: "Czy darmowy HubSpot wystarczy na lata?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Dla solo bez ambicji marketing automation — często tak. Granica pojawia się wtedy, gdy zaczynasz potrzebować workflow, scoringu i raportów spoza prostych dashboardów.",
                },
              },
              {
                "@type": "Question",
                name: "Czy Notion jako CRM się sprawdza?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak, ale do określonej skali. Sprawdza się przy mało aktywnych rozmowach i mocno relacyjnym modelu sprzedaży. Powyżej tego brak natywnych przypomnień i integracji zaczyna boleć.",
                },
              },
              {
                "@type": "Question",
                name: "Czy warto kupić Salesforce na wzrost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nie. Salesforce dla jednej osoby jest niewspółmiernie drogi i ciężki w utrzymaniu. Migrację na Salesforce rób wtedy, gdy realnie masz zespół i procesy, które tego wymagają.",
                },
              },
              {
                "@type": "Question",
                name: "Co z arkuszem Google jako CRM?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Działa zaskakująco dobrze, jeśli traktujesz go z dyscypliną i podłączysz proste automatyzacje (Make, n8n, Apps Script).",
                },
              },
              {
                "@type": "Question",
                name: "Folk czy Attio dla konsultanta?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Folk jest bardziej relacyjny i prostszy w starcie. Attio mocniej elastyczny, lepszy do firm operacyjnych i VC. Dla typowego solo consultanta zwykle wygodniejszy jest Folk.",
                },
              },
              {
                "@type": "Question",
                name: "Kiedy warto zmienić CRM?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Wtedy, gdy regularnie tracisz dane, brakuje Ci konkretnej funkcji, a workaround zajmuje już więcej czasu niż oszczędza. Sama nuda interfejsu nie jest dobrym powodem.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
