import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TrackedCTA from "@/components/TrackedCTA";
import Tabs from "@/components/Tabs";

export const metadata: Metadata = {
  title: "Automatyzacja CRM dla firm leasingowych i finansowych | Fluxlab",
  description:
    "Automatyzacja leadów i CRM dla firm leasingowych, finansowych i brokerskich: routing po regionie i produkcie, integracje z BIK/KRD/CEIDG, scoring, raportowanie KNF i prowizji. Pełen audyt procesu w 30 minut.",
  openGraph: {
    title: "Automatyzacja CRM dla firm leasingowych i finansowych | Fluxlab",
    description:
      "Automatyzacja leadów i CRM dla firm leasingowych, finansowych i brokerskich: routing po regionie i produkcie, integracje z BIK/KRD/CEIDG, scoring, raportowanie KNF i prowizji. Pełen audyt procesu w 30 minut.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja CRM dla firm leasingowych i finansowych",
      },
    ],
  },
  alternates: {
    canonical: "/automatyzacja-crm-leasing",
  },
};

const symptoms = [
  "Lead z porównywarki / formularza krąży po skrzynkach 24–48 h, zanim trafi do brokera",
  "Brak jednego CRM dla całego biura — handlowcy trzymają deale w Excelu i własnych folderach",
  "BIK/KRD/CEIDG sprawdzane ręcznie po telefonie — 15 minut na każdy lead, nawet ten słaby",
  "Wnioski do leasingodawcy klejone w Wordzie z 5 systemów, każdy partner finansowy ma inny szablon",
  "Status decyzji finansowej spada do brokera mailem, ktoś musi to ręcznie wpisać do CRM i zadzwonić do klienta",
  "Prowizje liczone w Excelu na koniec miesiąca — pomyłki, spóźnienia, frustracja zespołu",
];

const beforeSteps = [
  "Lead z porównywarki / strony / reklamy ląduje w wspólnej skrzynce",
  "Asystent ręcznie przekleja dane do CRM (jeśli istnieje) lub Excela",
  "Broker dzwoni do klienta na ślepo — bez BIK, bez wstępnej oceny zdolności",
  "Po rozmowie ręcznie zbiera dokumenty (KRS, CEIDG, sprawozdania) e-mailem",
  "Klepie wniosek do leasingodawcy w jego szablonie",
  "Status decyzji wpada mailem, broker przepisuje do CRM i dzwoni do klienta",
  "Prowizje liczone ręcznie 5. dnia kolejnego miesiąca",
];

const afterSteps = [
  "Lead z porównywarki / formularza wpada do CRM w 30 sekund, ze źródłem i UTM-ami",
  "Automatyczne wzbogacenie: NIP→GUS, REGON, branża, podstawowe dane finansowe",
  "Routing do brokera po regionie, produkcie i obciążeniu pipeline'u",
  "Wstępne sprawdzenie BIK/KRD (z zachowaniem zgód RODO) i scoring",
  "Broker dzwoni do leada ze score'm i kompletem podstawowych danych",
  "Wniosek do leasingodawcy generowany z CRM w 1 kliknięciu (właściwy szablon partnera)",
  "Status decyzji synchronizowany dwustronnie, klient dostaje powiadomienie SMS",
  "Prowizje liczą się same, raporty KNF i wewnętrzne — automatycznie",
];

const industrySpecifics = [
  {
    title: "Cykl decyzyjny dłuższy niż w typowym B2B",
    desc: "Od pierwszego kontaktu do wypłaty środków: 7–30 dni dla leasingu pojazdów, 30–90 dni dla większych transakcji (nieruchomości, sprzęt produkcyjny). CRM musi obsługiwać deal, który stoi w pipeline 2 miesiące, bez gubienia kontekstu i bez codziennego klikania przez brokera.",
  },
  {
    title: "Regulacje (RODO + sektor finansowy)",
    desc: "Dane osobowe i finansowe wymagają DPIA, rejestru zgód, terminów retencji. KNF kontroluje brokerów ubezpieczeniowych i pośredników kredytu hipotecznego. Wdrożenie automatyzacji bez zmapowanych zgód i bez audytu retencji to ryzyko regulacyjne — dlatego pierwszy etap wdrażam z prawnikiem klienta po stronie compliance.",
  },
  {
    title: "Wolumen leadów i zmienność jakości",
    desc: "Brokerzy współpracują z 5–15 porównywarkami i lead-genami, jakość leadów leci od 90% trafialności (porównywarki premium) do 5% (lead-geny szerokie). Bez scoringu i routingu po jakości najlepsi brokerzy są przeciążeni słabymi leadami, a mocne tracą reakcję, bo trafiają do najsłabszych.",
  },
  {
    title: "Struktura prowizji wieloskładnikowa",
    desc: "Prowizja od leasingodawcy + bonus od wolumenu + override managera + zwroty po wcześniejszej spłacie + claw-back po 3 miesiącach. Liczenie tego ręcznie w Excelu to godziny w miesiącu i regularne błędy. Automatyzacja prowizji jest zwykle drugim etapem po routingu leadów — i często samodzielnie spłaca cały projekt.",
  },
  {
    title:
      "Integracje z systemami zewnętrznymi (BIK, KRD, CEIDG, leasingodawcy)",
    desc: "BIK i KRD mają API dla podmiotów uprawnionych. CEIDG/KRS — publiczne API. Każdy leasingodawca (PKO Leasing, Millennium Leasing, Idea Getin Leasing, EFL, mLeasing, BNP Paribas, BZ WBK) ma własne API lub portal partnerski. Spięcie tego wszystkiego przez warstwę pośrednią (n8n self-hosted, własny backend) eliminuje 80% ręcznej pracy backoffice.",
  },
];

const firstStage = [
  "Mapping wszystkich źródeł leadów (porównywarki, lead-geny, formularze, telefony) do jednego wejścia CRM",
  "Wzbogacenie po NIP/REGON z GUS i CEIDG, walidacja maila i telefonu",
  "Scoring i routing do brokera po regionie + produkcie + obciążeniu pipeline'u",
  "Integracja z 1–2 najczęściej używanymi leasingodawcami (auto-generowanie wniosku z CRM)",
  "Powiadomienia SMS do klienta o statusie wniosku (decyzja, dosłanie dokumentów, wypłata)",
];

const mistakes = [
  "Wdrażanie BIK/KRD bez zmapowanych zgód RODO — szybka droga do problemu z UODO",
  "Routing tylko po regionie, bez uwzględnienia jakości źródła — najlepsi brokerzy toną w słabych leadach",
  "Liczenie prowizji „prawie automatycznie”, ale z ręcznym kontrolnym Excelem na końcu — wtedy liczone jest dwa razy",
  "Sync z leasingodawcą tylko jednostronny (CRM → partner) — status decyzji dalej spada mailem, dalej trzeba przepisywać",
  "Brak retencji danych — leady sprzed 3 lat dalej leżą w bazie, RODO mówi co innego",
];

const faq = [
  {
    question: "Czy automatyzacja BIK/KRD jest legalna?",
    answer:
      "Tak, jeśli macie zgody klienta i jesteście podmiotem uprawnionym (BIK wymaga umowy z BIK SA, KRD też wymaga umowy). Automatyzacja sprowadza się do tego, że CRM po otrzymaniu zgody klienta odpyta API BIK/KRD przez waszą warstwę integracyjną, zapisze odpowiedź w deal'u i nada scoring. Cała kontrola pozostaje po waszej stronie — automatyzacja nie obchodzi prawa, tylko klikanie. Wdrożenie zawsze konsultuję z prawnikiem klienta i z waszym IOD-em (jeśli go macie).",
  },
  {
    question:
      "Pracujemy na własnym CRM-ie zbudowanym 5 lat temu. Da się to spiąć?",
    answer:
      "Tak, jeśli ma jakikolwiek interfejs zewnętrzny (API, eksport CSV, baza, do której można się podpiąć). W praktyce 9 na 10 firm leasingowych pracuje na mieszance Pipedrive/HubSpot + Excel + własny system do wniosków. Najczęściej budujemy warstwę pośrednią (n8n self-hosted), która spina wszystkie te systemy bez konieczności wymiany czegokolwiek. Po roku zwykle decydujecie, czy zostać przy obecnym CRM-ie, czy migrować — automatyzacja nie wymusza tej decyzji teraz.",
  },
  {
    question:
      "Mamy umowy z 8 leasingodawcami. Czy musimy integrować się ze wszystkimi?",
    answer:
      "Nie. Pierwszy etap to integracja z 1–2 najczęściej używanymi (zwykle 60–80% wolumenu). Reszta dochodzi etapami, w miarę potrzeb. Czasem leasingodawca nie ma API publicznego — wtedy automatyzujemy obieg dokumentów do portalu partnerskiego (RPA / automatyczny upload), co i tak oszczędza 80% ręcznej pracy.",
  },
  {
    question: "Co z RODO i tajemnicą bankową?",
    answer:
      "Dla branży leasingowej standardowo wdrażam automatyzację na n8n self-hosted na waszym serwerze (Polska / EOG). Dane klientów nie wychodzą poza waszą infrastrukturę poza tymi, do których jawnie wysyłacie zapytania (BIK, KRD, leasingodawca). Konfigurujemy retencję, rejestr zgód i logi dostępu. To wymaganie twarde — przed startem audytujemy obecny stan ze strony compliance.",
  },
  {
    question: "Ile kosztuje wdrożenie i ile trwa?",
    answer:
      "Pierwszy etap (routing leadów + wzbogacenie + integracja z 1 leasingodawcą + powiadomienia klienta) to 8–15 tys. zł netto, robione w 3–5 tygodni. Pełna warstwa (sync ze wszystkimi partnerami + scoring BIK/KRD + automatyzacja prowizji + raportowanie KNF) to 25–60 tys. zł netto, etapami przez 3–6 miesięcy. Stała cena, kamienie milowe, płatność po odbiorze.",
  },
  {
    question: "Czy automatyzacja prowizji ma sens przy 3 brokerach?",
    answer:
      "Przy 3 brokerach i prostej strukturze prowizji (jedna stawka per produkt) — Excel wystarczy. Automatyzacja zaczyna mieć sens przy 5+ brokerach lub wieloskładnikowej strukturze prowizji (override, bonusy wolumenowe, claw-backi). Najpilniejszy zwykle jest routing leadów i sync z leasingodawcami — prowizje są zwykle drugim etapem po 3–6 miesiącach.",
  },
];

const diagramSteps = [
  {
    n: "1",
    title: "Lead z porównywarki / formularza / reklamy",
    desc: "Wszystkie źródła trafiają na jeden webhook do CRM, ze źródłem, UTM-em, scoringiem porównywarki.",
    accent: false,
  },
  {
    n: "2",
    title: "Wzbogacenie po NIP/REGON",
    desc: "GUS, CEIDG, KRS — branża, forma prawna, dane kontaktowe firmy. Odcina słabe leady przed dotarciem do brokera.",
    accent: false,
  },
  {
    n: "3",
    title: "BIK / KRD (po zgodzie klienta)",
    desc: "Wstępny scoring zdolności kredytowej. CRM zapisuje wynik w deal'u, broker dzwoni z gotowym kontekstem.",
    accent: true,
  },
  {
    n: "4",
    title: "Routing do brokera",
    desc: "Reguły: region, produkt (auto / sprzęt / nieruchomość), jakość źródła, obciążenie pipeline'u brokera.",
    accent: false,
  },
  {
    n: "5",
    title: "Generowanie wniosku do leasingodawcy",
    desc: "Z CRM jednym klikiem — w szablonie konkretnego partnera (PKO Leasing / EFL / mLeasing / inne).",
    accent: true,
  },
  {
    n: "6",
    title: "Sync statusu decyzji (dwustronny)",
    desc: "Status z leasingodawcy spływa automatycznie do CRM. Klient dostaje powiadomienie SMS, broker — Slack/mail.",
    accent: true,
  },
  {
    n: "7",
    title: "Naliczenie prowizji + raport",
    desc: "Po wypłacie środków prowizja liczy się sama (override managera, bonusy wolumenowe). Raport KNF — automatycznie.",
    accent: true,
  },
];

export default function AutomatyzacjaCrmLeasing() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main>
        <Breadcrumbs
          items={[
            { label: "Automatyzacja CRM dla firm leasingowych i finansowych" },
          ]}
        />

        {/* Hero — kompaktowy */}
        <section className="pt-16 pb-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Branża: leasing i finanse</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Automatyzacja leadów i CRM dla firm leasingowych, finansowych i
                brokerskich
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Pierwsze pytanie nie brzmi: „jaki CRM kupić?”. Pierwsze pytanie
                brzmi: „dlaczego lead z porównywarki krąży 36 godzin, zanim
                broker do niego oddzwoni?”. Automatyzujemy obsługę leada od
                wpadnięcia do CRM przez BIK/KRD, wniosek do leasingodawcy, sync
                statusu decyzji, aż po prowizję — w architekturze, która spełnia
                RODO i wymogi sektora finansowego.
              </p>
              <TrackedCTA
                href="#sekcje"
                location="article_automatyzacja-crm-leasing_hero"
                label="Chcę audyt procesu leadów"
                eventName="cta_click_article_audit"
                className="btn-primary"
              >
                Chcę audyt procesu leadów
              </TrackedCTA>
            </div>
          </div>
        </section>

        {/* Treść w zakładkach — nic nie wycięte, podzielone */}
        <div id="sekcje" className="scroll-mt-20 container-wide pb-20">
          <Tabs
            ariaLabel="Sekcje strony automatyzacji CRM dla leasingu"
            tabs={[
              {
                label: "Specyfika branży",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Specyfika branży</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Czym leasing i finanse różnią się od „typowego B2B”
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Generyczny CRM (Pipedrive, HubSpot) wystarczy do prostej
                        sprzedaży. Dla firm leasingowych i brokerów finansowych
                        pojawia się 5 czynników, które łamią standardową
                        konfigurację:
                      </p>
                      <div className="space-y-4">
                        {industrySpecifics.map((s, i) => (
                          <div
                            key={s.title}
                            className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                          >
                            <div className="flex items-start gap-4">
                              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                                {i + 1}
                              </span>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                  {s.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {s.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Problem biznesowy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Problem biznesowy</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Pipeline w głowie brokera + Excel w plecy księgowego
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Typowa firma brokerska po 3–5 latach na rynku ma trzy
                        bóle jednocześnie: lead z porównywarki dociera za późno,
                        dokumentacja klienta krąży po skrzynkach, a prowizje są
                        liczone w Excelu z opóźnieniem i błędami. Ekosystem
                        partnerów (leasingodawcy, ubezpieczyciele) wymusza pracę
                        w 6 portalach, każdy ze swoim interfejsem. Generyczny
                        CRM (Pipedrive, HubSpot) tylko częściowo łata problem —
                        bo nie umie się wpiąć w BIK, w portale leasingowe ani w
                        naliczanie prowizji wieloskładnikowej.
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Lead z porównywarki krąży 24–48 h, zanim broker oddzwoni",
                          "Każda wycena i wniosek to 30–60 minut ręcznego klepania",
                          "Status decyzji od leasingodawcy przepisywany ręcznie do CRM",
                          "Prowizje liczone w Excelu, błędy raz na 2–3 miesiące",
                          "Brak jednego widoku pipeline dla całego biura",
                          "Compliance / RODO traktowane „jak coś, co kiedyś trzeba ogarnąć”",
                        ].map((p) => (
                          <li
                            key={p}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">
                              {p}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Objawy",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Objawy</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Konkretne zachowania w biurze brokerskim
                      </h2>
                      <ul className="space-y-3">
                        {symptoms.map((s) => (
                          <li
                            key={s}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <svg
                              className="flex-shrink-0 mt-0.5 text-accent"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M10 2v6m0 4v.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Koszt problemu",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Koszt problemu</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Ile to kosztuje firmę 6-osobową
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Realny przykład: biuro brokerskie, 4 brokerów + 2 osoby
                        backoffice, 800 leadów miesięcznie z 6 porównywarek,
                        średnio 80 wniosków leasingowych miesięcznie. Konwersja
                        z leada na zamknięty wniosek 10%. Średnia prowizja 1 200
                        zł netto.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Wolny czas reakcji (24 h vs 5 min)
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ~15% utraconych leadów
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            120 leadów × 10% × 1 200 zł = 14 400 zł/mies.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Ręczne klepanie wniosków
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            80 × 45 min = 60 h/mies.
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Prawie cały etat tylko na wnioski
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Liczenie prowizji + korekty
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            16 h/mies. + błędy
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Przeliczenia 2–3 razy w roku, frustracja zespołu
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Łącznie miesięcznie
                          </p>
                          <p className="text-2xl font-bold text-accent">
                            ~25–35 tys. zł
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Stracone deale + koszt pracy backoffice
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Pierwszy etap automatyzacji (8–15 tys. zł netto) zwraca
                        się w pierwszym miesiącu po uruchomieniu, jeśli biuro ma
                        4+ brokerów i 500+ leadów miesięcznie.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                label: "Przed wdrożeniem",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Przed wdrożeniem</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                        Obecny proces obsługi leada w biurze brokerskim
                      </h2>
                      <ol className="space-y-3">
                        {beforeSteps.map((step, i) => (
                          <li
                            key={step}
                            className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl p-5"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-sm font-semibold">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ),
              },
              {
                label: "Po wdrożeniu",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Po wdrożeniu</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-8">
                        Jak wygląda proces po automatyzacji
                      </h2>
                      <ol className="space-y-3">
                        {afterSteps.map((step, i) => (
                          <li
                            key={step}
                            className="flex items-start gap-4 bg-white dark:bg-gray-800/60 border border-accent/20 rounded-xl p-5"
                          >
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-semibold">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ),
              },
              {
                label: "Diagram",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto mb-10">
                      <span className="section-label">Diagram</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Anatomia workflow „lead → BIK/KRD → wniosek → decyzja →
                        klient”
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        Każdy krok jest mierzalny osobno. Akcentowane kafelki to
                        miejsca, w których standardowy CRM się kończy, a zaczyna
                        się integracja sektora finansowego.
                      </p>
                    </div>
                    <ol className="relative max-w-3xl mx-auto space-y-3 lg:space-y-4">
                      {diagramSteps.map((s, i, arr) => (
                        <li key={s.n} className="relative">
                          <div
                            className={`flex gap-4 lg:gap-5 items-start bg-white dark:bg-gray-800/80 border rounded-2xl p-5 lg:p-6 ${
                              s.accent
                                ? "border-accent/40 shadow-sm"
                                : "border-gray-100 dark:border-gray-700"
                            }`}
                          >
                            <div
                              className={`flex-shrink-0 w-10 h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center font-bold text-sm tabular-nums ${
                                s.accent
                                  ? "bg-accent text-white"
                                  : "bg-accent-light dark:bg-accent-dark-light text-accent"
                              }`}
                            >
                              {s.n}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {s.title}
                              </h3>
                              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                {s.desc}
                              </p>
                            </div>
                          </div>
                          {i < arr.length - 1 && (
                            <div className="flex justify-center py-1.5">
                              <svg
                                className="text-gray-300 dark:text-gray-600"
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                aria-hidden="true"
                              >
                                <path
                                  d="M7 2v8m0 0l-3-3m3 3l3-3"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              },
              {
                label: "Pierwszy etap",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Pierwszy etap</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Co wdrażam w biurze brokerskim w pierwszych 3–5
                        tygodniach
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        Nie zaczynam od pełnej automatyzacji wszystkich 8
                        leasingodawców + prowizji + raportów KNF. Zaczynam od
                        pętli, która zwróci się w pierwszym miesiącu i pokaże
                        zarządowi liczbę odzyskanych godzin tygodniowo.
                      </p>
                      <ul className="space-y-3">
                        {firstStage.map((s, i) => (
                          <li
                            key={s}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </span>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {s}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Antywzorce",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Antywzorce</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
                        Typowe błędy przy automatyzacji firm leasingowych
                      </h2>
                      <ul className="space-y-3">
                        {mistakes.map((m) => (
                          <li
                            key={m}
                            className="flex items-start gap-3 bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-xl px-5 py-4"
                          >
                            <svg
                              className="flex-shrink-0 mt-0.5 text-red-400"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M5 5l10 10M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {m}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                label: "Cennik",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <span className="section-label">Cennik</span>
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-4">
                        Ile kosztuje wdrożenie
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                        Stała cena projektowa, kamienie milowe, płatność po
                        odbiorze etapu. Wycenę dostajesz po godzinnym audycie
                        procesu i przejrzeniu obecnego stacku.
                      </p>
                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pierwszy etap
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            8–15 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Routing leadów + wzbogacenie + integracja z 1
                            leasingodawcą + powiadomienia klienta. 3–5 tygodni.
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800/60 border border-accent/30 rounded-2xl p-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Pełna warstwa branżowa
                          </p>
                          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            25–60 tys. zł
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Sync ze wszystkimi partnerami + scoring BIK/KRD +
                            automatyzacja prowizji + raportowanie KNF. 3–6
                            miesięcy etapami.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/automatyzacja-leadow-crm"
                        className="btn-secondary"
                      >
                        Zobacz pełny cennik automatyzacji CRM
                      </Link>
                    </div>
                  </div>
                ),
              },
              {
                label: "FAQ",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
                        Najczęstsze pytania
                      </h2>
                      <div className="space-y-4">
                        {faq.map((item) => (
                          <details
                            key={item.question}
                            className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                          >
                            <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 list-none">
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {item.question}
                              </span>
                              <svg
                                className="flex-shrink-0 transition-transform group-open:rotate-180"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M5 7l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </summary>
                            <div className="px-6 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
                              {item.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Powiązane",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-3xl mx-auto">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Powiązane
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Usługi
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <Link
                                href="/automatyzacja-leadow-crm"
                                className="text-accent hover:underline"
                              >
                                Automatyzacja leadów i CRM
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/automatyzacja-pipedrive"
                                className="text-accent hover:underline"
                              >
                                Automatyzacja Pipedrive
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/automatyzacja-salesforce"
                                className="text-accent hover:underline"
                              >
                                Automatyzacja Salesforce
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/n8n"
                                className="text-accent hover:underline"
                              >
                                n8n — wdrożenia
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/n8n-dla-crm"
                                className="text-accent hover:underline"
                              >
                                n8n dla CRM
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/zapier-make"
                                className="text-accent hover:underline"
                              >
                                Zapier i Make
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                            Strefa wiedzy
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>
                              <Link
                                href="/strefa-wiedzy/make-vs-n8n"
                                className="text-accent hover:underline"
                              >
                                Make vs n8n
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/strefa-wiedzy/n8n-vs-zapier"
                                className="text-accent hover:underline"
                              >
                                n8n vs Zapier
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/make-vs-n8n-crm"
                                className="text-accent hover:underline"
                              >
                                Make vs n8n dla CRM
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Audyt",
                content: (
                  <div className="py-6 lg:py-8">
                    <div className="max-w-2xl mx-auto text-center">
                      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Audyt procesu leadów dla biura brokerskiego
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        30 minut rozmowy o procesie. Wyjdziesz z mapą procesu,
                        wskazaniem 3 najpilniejszych miejsc do automatyzacji i
                        widełkami cenowymi. Bez zobowiązań — jeśli nie zobaczę
                        dopasowania, powiem to wprost.
                      </p>
                      <TrackedCTA
                        href="/#kontakt"
                        location="article_automatyzacja-crm-leasing_final"
                        label="Chcę audyt procesu leadów"
                        eventName="cta_click_article_audit"
                        className="btn-primary"
                      >
                        Chcę audyt procesu leadów
                      </TrackedCTA>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
