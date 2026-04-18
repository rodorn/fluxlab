import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "n8n vs Zapier — kiedy warto iść w self-hosting | Fluxlab",
  description:
    "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
  openGraph: {
    title: "n8n vs Zapier — kiedy warto iść w self-hosting | Fluxlab",
    description:
      "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
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
    canonical: "/strefa-wiedzy/n8n-vs-zapier",
  },
};

export default function N8nVsZapierArticle() {
  const faqItems = [
    {
      question: "Czy n8n jest naprawdę darmowy?",
      answer:
        "Wersja Community Edition n8n jest open-source na licencji Sustainable Use License — możesz ją uruchomić bezpłatnie na własnym serwerze i używać wewnętrznie. Płatne są: chmura n8n.cloud (od ok. 24 EUR/mies.) oraz Enterprise Edition (SSO, RBAC, log audytowy, version control). Komercyjne odsprzedawanie n8n jako usługi wymaga osobnej licencji.",
    },
    {
      question: "Ile kosztuje utrzymanie n8n self-hosted?",
      answer:
        "Sam serwer to ok. 5–20 USD/mies. (np. Hetzner CX22, DigitalOcean, AWS Lightsail). Realny koszt to czas dewelopera lub devopsa: pierwsze wdrożenie 4–8 godzin, utrzymanie 1–3 godziny miesięcznie (aktualizacje, monitoring, backupy). Dla firmy bez własnego IT to często 200–500 zł miesięcznie u zewnętrznego wykonawcy.",
    },
    {
      question: "Czy n8n nadaje się dla osoby bez wiedzy technicznej?",
      answer:
        "Tylko warunkowo. Sam interfejs jest podobny do Make i da się w nim budować scenariusze bez kodu. Ale instalacja, aktualizacje, backupy i obsługa błędów wymagają kogoś, kto rozumie Linuxa, Dockera i podstawy serwerów. Bez tego nawet zwykły restart bywa problemem. Alternatywą jest plan n8n Cloud — wtedy zero administracji.",
    },
    {
      question: "Kiedy n8n ma sens dla małej firmy?",
      answer:
        "Gdy spełniasz minimum dwa z trzech warunków: (1) macie w firmie kogoś, kto ogarnia Linuxa lub gotowy jesteś go opłacać, (2) wolumen automatyzacji rośnie i koszt Zapiera/Make zaczyna boleć (powyżej 100 USD/mies.), (3) macie wymagania dot. lokalizacji danych albo systemów wewnętrznych, których nie chcecie wystawiać na zewnątrz.",
    },
    {
      question: "Czy n8n ma tyle integracji co Zapier?",
      answer:
        "Nie. n8n ma ok. 500+ natywnych integracji vs ok. 6 000 w Zapierze. Ale n8n ma natywny moduł HTTP Request i moduł Code (JavaScript/Python) — w praktyce możesz zintegrować się z dowolnym API. Dla popularnych SaaS-ów (HubSpot, Slack, Notion, Pipedrive, Google, Microsoft) integracje są dostępne i działają dobrze.",
    },
    {
      question: "Czy łatwo migrować z Zapiera do n8n?",
      answer:
        "Nie ma automatycznego importera. Migracja oznacza odbudowę scenariuszy w n8n — w praktyce to 30–60% szybciej niż pierwotna budowa, bo logika jest już znana. Dla 10–20 Zapów to typowo 3–5 dni pracy. Warto migrować etapami, zaczynając od najdroższych Zapów (najwięcej tasków).",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "n8n vs Zapier" },
          ]}
        />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              n8n vs Zapier — kiedy warto iść w self-hosting
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              n8n i Zapier rozwiązują ten sam problem zupełnie różnymi metodami.
              Zapier to wynajem mieszkania — szybko, wygodnie, ale płacisz co
              miesiąc i nie masz kluczy do piwnicy. n8n to dom na własnej
              działce — więcej pracy, ale pełna kontrola i tańsze w długim
              okresie. Ten artykuł pokazuje, kiedy ten dom rzeczywiście się
              opłaca.
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
                    Krótko: czym różni się n8n od Zapiera
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier to klasyczne SaaS — rejestrujesz konto, łączysz
                    aplikacje, płacisz miesięcznie. Wszystko działa w chmurze
                    Zapiera, w USA. Nie masz dostępu do kodu, nie kontrolujesz
                    serwera, nie wiesz dokładnie, którędy płyną Twoje dane.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n to platforma open-source. Możesz uruchomić ją na własnym
                    serwerze (Docker, Kubernetes, VPS) i mieć pełną kontrolę:
                    dane nie wychodzą poza Twoją infrastrukturę, nie ma limitu
                    wykonań ani per-task billingu, możesz modyfikować źródła.
                    Możesz też wybrać n8n.cloud — wtedy nie martwisz się o
                    serwer, ale tracisz część zalet self-hostingu.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Pod względem interfejsu n8n jest bliżej Make niż Zapiera —
                    wizualny diagram, moduły, możliwość rozgałęzień i pętli. To
                    nie jest „klikam dalej" jak w Zapierze.
                  </p>
                </div>
              </section>

              {/* Sekcja 2 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Pricing — gdzie jest realna oszczędność
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier rozlicza taski. Plan Professional za 19,99 USD/mies.
                    daje 750 tasków. Plan Team za 69 USD/mies. — 2 000 tasków.
                    Każdy task ponad limit kosztuje dodatkowo. Przy 50 000
                    tasków miesięcznie to już ok. 600–800 USD/mies.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n nie rozlicza per execution. Płacisz za serwer (lub plan
                    n8n.cloud), reszta jest „za darmo". Konkretne liczby
                    porównawcze:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      n8n Community self-hosted na VPS Hetznera (ok. 25 zł/mies.
                      za serwer + ewentualnie 200–500 zł utrzymania) —
                      praktycznie nielimitowana liczba wykonań
                    </li>
                    <li>
                      n8n.cloud Starter (od ok. 24 EUR/mies.) — 2 500 wykonań
                      scenariuszy (nie tasków, tylko całych runów)
                    </li>
                    <li>
                      n8n.cloud Pro (od ok. 60 EUR/mies.) — 10 000 wykonań,
                      więcej userów
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Kluczowa różnica: w n8n „wykonanie" to cały scenariusz, nie
                    pojedynczy krok. Scenariusz z 10 modułami to jedno
                    wykonanie. W Zapierze ten sam scenariusz to 10 tasków.
                    Praktyczna różnica w kosztach przy 5 000 wykonań miesięcznie
                    to często rząd wielkości.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Detal: jeśli porównujesz koszty, policz najpierw{" "}
                    <Link
                      href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                      className="text-accent hover:underline"
                    >
                      ROI z automatyzacji
                    </Link>
                    . Czasem płacenie za Zapiera więcej i tak się opłaca, jeśli
                    oszczędzasz dni pracy zespołu.
                  </p>
                </div>
              </section>

              {/* Sekcja 3 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Krzywa nauki i utrzymanie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier wygrywa pod względem startu. Pierwsza automatyzacja w
                    15 minut, bez instalacji, bez konfiguracji, bez czytania
                    dokumentacji. n8n nawet w wersji n8n.cloud wymaga
                    zrozumienia kilku konceptów (workflow, executions, queue
                    mode), a wersja self-hosted dochodzi jeszcze warstwa
                    serwera.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Konkretne wymagania techniczne dla self-hostingu:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Linux + Docker (lub Docker Compose) — podstawowa znajomość
                    </li>
                    <li>
                      Reverse proxy (nginx, Caddy, Traefik) z SSL — webhooki
                      muszą być dostępne z internetu
                    </li>
                    <li>
                      Backup bazy danych (Postgres lub SQLite) — minimum
                      codzienny snapshot
                    </li>
                    <li>
                      Monitoring uptime — webhook do siebie samego co kilka
                      minut, alert gdy nie wraca
                    </li>
                    <li>
                      Aktualizacje — n8n wypuszcza nową wersję co 1–2 tygodnie,
                      breaking changes raz na kilka miesięcy
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To nie jest dużo dla osoby technicznej, ale dla firmy bez
                    własnego IT to oznacza zewnętrzne wsparcie. W takim
                    przypadku często sensowniejsze jest n8n.cloud, gdzie serwer
                    i aktualizacje są po stronie producenta.
                  </p>
                </div>
              </section>

              {/* Sekcja 4 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kontrola danych i compliance
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To największa zaleta n8n self-hosted. Dane nigdy nie
                    opuszczają Twojej infrastruktury — n8n je tylko przesuwa
                    między systemami, do których ma dostęp. W Zapierze każdy
                    rekord, który przechodzi przez automatyzację, jest
                    przetwarzany na serwerach Zapiera w USA.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dla branż regulowanych (sektor finansowy, zdrowotny,
                    publiczny) to często niepodlegający negocjacji wymóg. n8n
                    self-hosted na własnym serwerze w Polsce daje pełną zgodność
                    z RODO bez konieczności podpisywania DPA z amerykańskim
                    dostawcą.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dodatkowo n8n może działać w sieci wewnętrznej i mieć dostęp
                    do systemów, które nie są wystawione na zewnątrz — on-prem
                    CRM, baza księgowa, ERP w intranecie. Zapier z natury rzeczy
                    musi mieć publiczny endpoint, żeby cokolwiek zrobić.
                  </p>
                </div>
              </section>

              {/* Sekcja 5 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Integracje i elastyczność
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier ma więcej integracji w liczbach bezwzględnych — ok. 6
                    000 vs 500+ w n8n. Dla popularnych SaaS-ów to nie ma
                    znaczenia: HubSpot, Pipedrive, Salesforce, Slack, Notion,
                    Asana, Airtable, Google Workspace, Microsoft 365 są w obu
                    narzędziach.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Różnica zaczyna się przy nietypowych integracjach. n8n ma
                    natywny moduł HTTP Request i moduł Code, w którym możesz
                    napisać kawałek JavaScriptu lub Pythona. To znaczy, że
                    możesz zintegrować się z dowolnym API w 30 minut. W Zapierze
                    podobne rzeczy są możliwe (Webhooks i Code), ale tylko od
                    planu Professional w górę.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dodatkowo n8n pozwala pisać własne nodes (rozszerzenia w
                    TypeScripcie). Jeśli masz wewnętrzny system, do którego
                    chcesz mieć ładny moduł — możesz go napisać raz i używać we
                    wszystkich workflow.
                  </p>
                </div>
              </section>

              {/* Sekcja 6 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Skalowalność — co się dzieje, gdy wolumen rośnie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier skaluje się liniowo z kosztem. Każdy task to
                    pieniądz. Przy małym wolumenie nieistotne, przy dużym —
                    bardzo bolesne. Plan Company kosztuje od ok. 599 USD/mies.,
                    a i tak ma limity tasków.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted skaluje się z mocą serwera. Mały VPS za 25
                    zł/mies. spokojnie udźwignie kilka tysięcy wykonań dziennie.
                    Większy serwer za 200 zł — kilkanaście tysięcy. Jeśli
                    potrzebujesz więcej, n8n ma queue mode (Redis + workers) —
                    możesz horyzontalnie skalować workery i obsługiwać setki
                    tysięcy wykonań dziennie. Koszt rośnie z infrastrukturą, nie
                    z ilością operacji.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyczny próg: powyżej 50 000 wykonań miesięcznie n8n
                    self-hosted jest praktycznie zawsze tańszy niż Zapier (i
                    często też niż Make), nawet wliczając koszt utrzymania.
                  </p>
                </div>
              </section>

              {/* Sekcja 7 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kiedy self-hosting NIE ma sensu
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Self-hosting brzmi atrakcyjnie, ale nie zawsze się opłaca.
                    Wybierz Zapier (lub n8n.cloud), jeśli:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Nie macie nikogo, kto rozumie Linuxa i Dockera, i nie
                      jesteście gotowi tego opłacać na zewnątrz
                    </li>
                    <li>
                      Wolumen jest mały (poniżej 1 000 tasków/mies.) — Zapier
                      Free albo plan Starter wystarczy
                    </li>
                    <li>
                      Macie 5–10 prostych automatyzacji typu „przepisz dane z A
                      do B" — overhead n8n nie ma sensu
                    </li>
                    <li>
                      Cenicie sobie czas startu — chcecie mieć działającą
                      automatyzację za godzinę, nie za tydzień
                    </li>
                    <li>
                      Branża nie wymusza lokalizacji danych w UE i nie macie
                      systemów on-prem
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Self-hosting to zawsze trade-off. Płacisz mniej w dolarach,
                    więcej w czasie i odpowiedzialności. Trzeba policzyć obie
                    strony.
                  </p>
                </div>
              </section>

              {/* Sekcja 8 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hybrydowe podejście — najczęstszy układ
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    W praktyce większość średnich firm jedzie hybrydowo. Zapier
                    do prostych automatyzacji departamentowych (marketing,
                    rekrutacja, HR), n8n do core procesów sprzedażowych i
                    operacyjnych, gdzie wolumen i kontrola danych mają
                    znaczenie.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Przykładowy podział:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Zapier — kalendarz x Slack, formularze HR x Airtable,
                      newsletter x CRM
                    </li>
                    <li>
                      n8n — pipeline leadów, synchronizacja CRM x ERP,
                      raportowanie sprzedażowe, integracja z systemem księgowym
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Taki model daje szybkość Zapiera dla rzeczy nieistotnych
                    biznesowo i pełną kontrolę n8n dla rzeczy, gdzie błąd
                    kosztuje pieniądze. Warto zobaczyć też porównanie{" "}
                    <Link
                      href="/strefa-wiedzy/zapier-vs-make"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make
                    </Link>{" "}
                    i{" "}
                    <Link
                      href="/strefa-wiedzy/make-vs-n8n"
                      className="text-accent hover:underline"
                    >
                      Make vs n8n
                    </Link>{" "}
                    — często to Make, a nie Zapier, bywa drugą nogą hybrydy.
                  </p>
                </div>
              </section>

              {/* Mid CTA */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Rozważasz n8n, ale nie chcesz utrzymywać serwera samemu?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Mogę wdrożyć n8n na Twoim serwerze albo zarządzać nim za
                      Ciebie — pełna kontrola, zero administracji po Twojej
                      stronie.
                    </p>
                    <Link href="/n8n" className="btn-primary inline-block">
                      Zobacz usługę n8n
                    </Link>
                  </div>
                </div>
              </section>

              {/* Sekcja 9 — Podsumowanie */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Podsumowanie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zapier to wybór dla firm, które chcą szybko, wygodnie i bez
                    inwestowania w infrastrukturę. n8n to wybór dla firm, które
                    mają już doświadczenie z automatyzacją, mają osobę
                    techniczną na pokładzie albo zewnętrznego partnera, i chcą
                    skalować bez liniowego wzrostu kosztów.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Self-hosting opłaca się przede wszystkim w trzech
                    sytuacjach: duży wolumen, wymagania compliance / RODO oraz
                    integracje z systemami wewnętrznymi. We wszystkich
                    pozostałych przypadkach Zapier (lub Make) jest po prostu
                    szybszy w setup-ie i mniej ryzykowny.
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
            <PrevNextArticle currentHref="/strefa-wiedzy/n8n-vs-zapier" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Nie wiesz, czy warto wchodzić w self-hosting?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Audyt Twoich procesów i konkretne porównanie kosztów na 12 i 24
                miesiące — bez sprzedażowej presji.
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
                      href="/strefa-wiedzy/make-vs-n8n"
                      className="text-accent hover:underline"
                    >
                      Make vs n8n — porównanie dla firm MŚP
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make vs n8n — wielkie porównanie 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji"
                      className="text-accent hover:underline"
                    >
                      Jak policzyć ROI z automatyzacji
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
                    <Link href="/n8n" className="text-accent hover:underline">
                      n8n — wdrożenia i utrzymanie
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
            headline: "n8n vs Zapier — kiedy warto iść w self-hosting",
            description:
              "Porównanie n8n i Zapier w 2026: pricing, krzywa nauki, kontrola danych, skalowalność i kiedy self-hosting realnie się opłaca. Praktyczne kryteria wyboru.",
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
