import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import PrevNextArticle from "@/components/PrevNextArticle";

export const metadata: Metadata = {
  title: "Make vs n8n — porównanie dla firm MŚP | Fluxlab",
  description:
    "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
  openGraph: {
    title: "Make vs n8n — porównanie dla firm MŚP | Fluxlab",
    description:
      "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
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
    canonical: "/strefa-wiedzy/make-vs-n8n",
  },
};

export default function MakeVsN8nArticle() {
  const faqItems = [
    {
      question: "Czy Make jest tańszy od n8n.cloud?",
      answer:
        "Na niskim wolumenie zwykle Make. Plan Make Core za 9 USD/mies. daje 10 000 operacji, a n8n.cloud Starter za ok. 24 EUR daje 2 500 wykonań scenariuszy. Ale jednostka jest inna: w Make jedna operacja to jeden moduł, w n8n jedno wykonanie to cały scenariusz. Przy złożonych scenariuszach (5–10 modułów) n8n często wychodzi taniej.",
    },
    {
      question: "Czy n8n self-hosted jest tańszy od Make?",
      answer:
        "W długim okresie tak — szczególnie powyżej 50 000 operacji miesięcznie. Make w tej skali to często 100–300 USD/mies. n8n self-hosted na VPS Hetznera za ok. 25 zł/mies. obsłuży podobny wolumen. Trzeba doliczyć koszt utrzymania (200–500 zł/mies. u zewnętrznego wykonawcy lub czas własnego IT).",
    },
    {
      question: "Które narzędzie ma więcej integracji?",
      answer:
        "Make — ok. 1 800 natywnych integracji vs 500+ w n8n. Ale n8n ma natywny moduł HTTP Request i moduł Code (JavaScript), który pozwala zintegrować się z dowolnym API w 30 minut. Dla popularnych SaaS-ów oba narzędzia mają porównywalną głębokość integracji.",
    },
    {
      question: "Czy Make jest łatwiejszy w nauce niż n8n?",
      answer:
        "Trochę. Oba mają wizualny diagram i podobną filozofię działania. Make ma bardziej dopieszczony interfejs, lepszą dokumentację po polsku i większą społeczność tutoriali. n8n jest bliżej programowania — moduł Code, expressions z syntaksem JavaScript, więcej opcji per moduł. Dla osoby technicznej różnica jest niewielka, dla nietechnicznej Make zwykle wygrywa.",
    },
    {
      question: "Czy n8n jest stabilniejszy od Make?",
      answer:
        "Make ma SLA i dedykowany support — jako SaaS musi działać. n8n self-hosted jest tak stabilne, jak Twój serwer i Twoje aktualizacje. Jeśli ktoś dba o backup, monitoring i regularne update, n8n potrafi działać latami bez problemów. Bez tego — bywa różnie. n8n.cloud daje zbliżony poziom stabilności do Make.",
    },
    {
      question: "Co z RODO i lokalizacją danych?",
      answer:
        "Make ma serwery w UE (Czechy, Niemcy) — to często wystarcza dla większości polskich firm. n8n self-hosted na serwerze w Polsce daje pełną kontrolę i jest najczystszą opcją compliance. n8n.cloud ma serwery w UE (Niemcy). Dla branż regulowanych (finanse, zdrowie, sektor publiczny) n8n self-hosted jest najczęściej rekomendowane.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Make vs n8n" },
          ]}
        />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Make vs n8n — porównanie dla firm MŚP
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Make i n8n należą do tej samej kategorii — wizualne platformy
              automatyzacji z mocną logiką. Oba mają diagram, oba obsługują
              warunki, pętle i agregaty, oba radzą sobie z setkami integracji.
              Ale różni je model dostarczania, koszt skalowania i to, co dzieje
              się z Twoimi danymi. Ten artykuł pomaga zdecydować, które z nich
              pasuje do firmy MŚP.
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
                    Make i n8n — krótka charakterystyka
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make (dawniej Integromat) to czeski SaaS, część grupy
                    Celonis. Działa wyłącznie w chmurze — nie ma wersji
                    self-hosted. Płacisz miesięcznie za pakiet operacji.
                    Interfejs to klasyczny diagram, w którym moduły łączysz
                    liniami i konfigurujesz mapowanie danych.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n to platforma open-source z siedzibą w Berlinie. Ma trzy
                    warianty: Community Edition (darmowa, self-hosted, licencja
                    Sustainable Use), n8n.cloud (płatny SaaS, serwery w UE) oraz
                    Enterprise Edition (SSO, RBAC, audit log, version control).
                    Interfejs jest podobny do Make, ale z większym naciskiem na
                    elementy techniczne — code nodes, expressions w stylu
                    JavaScript, możliwość pisania własnych modułów.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Najważniejsza różnica filozofii: Make jest pełnym SaaS-em
                    bez opcji on-prem. n8n daje wybór — chmura lub własny
                    serwer.
                  </p>
                </div>
              </section>

              {/* Sekcja 2 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Pricing dla MŚP — realne scenariusze
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Plany Make w 2026 (orientacyjnie):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Free — 1 000 operacji/mies., 2 aktywne scenariusze</li>
                    <li>Core — od ok. 9 USD/mies. za 10 000 operacji</li>
                    <li>Pro — od ok. 16 USD/mies., custom variables</li>
                    <li>Teams — od ok. 29 USD/mies., role i większe pakiety</li>
                    <li>
                      Enterprise — wycena indywidualna, SSO, dedykowany support
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Plany n8n.cloud (orientacyjnie):
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Starter — od ok. 24 EUR/mies., 2 500 wykonań scenariuszy,
                      5 aktywnych workflow
                    </li>
                    <li>Pro — od ok. 60 EUR/mies., 10 000 wykonań</li>
                    <li>
                      Enterprise — wycena indywidualna, queue mode, SSO,
                      dedykowane środowisko
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted to praktycznie tylko koszt serwera — Hetzner
                    CX22 to ok. 25 zł/mies., DigitalOcean Droplet 12 USD/mies.
                    Plus koszt utrzymania (jeśli outsourcujesz — typowo 200–500
                    zł/mies.).
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Realny przykład dla MŚP, 5 000 wykonań scenariuszy
                    miesięcznie, scenariusze średnio 6-modułowe:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Make: ok. 30 000 operacji = plan Pro za 16 USD/mies.
                      (limit 10 000 zostanie przekroczony, dopłaca się ok. 40–50
                      USD)
                    </li>
                    <li>n8n.cloud Pro: ok. 60 EUR/mies. za 10 000 wykonań</li>
                    <li>
                      n8n self-hosted: ok. 25 zł serwer + ewentualnie 300 zł
                      utrzymania = ok. 325 zł/mies.
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Wniosek: w przedziale 1–10 tys. wykonań Make i n8n.cloud
                    grają w podobnej lidze. Powyżej 30 tys. wykonań self-hosted
                    n8n zaczyna mocno wygrywać.
                  </p>
                </div>
              </section>

              {/* Sekcja 3 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Krzywa nauki i UX
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Pod względem czystego UX Make jest bardziej dopieszczony.
                    Diagramy są ładniejsze, opisy modułów po polsku są lepsze, a
                    społeczność tutoriali (YouTube, blogi) jest większa, też w
                    polskim ekosystemie. Pierwszy scenariusz w Make zbudujesz w
                    30–45 minut, jeśli nigdy wcześniej nie miałeś z nim
                    styczności.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n jest bliżej programisty. Expressions używają syntaksu
                    JavaScript, w wielu modułach trafiasz na opcje, które
                    bardziej kojarzą się z dokumentacją API niż z UI dla
                    biznesu. Code node pozwala napisać dowolny JavaScript, który
                    działa na danych ze scenariusza. Dla osoby technicznej to
                    atut, dla nietechnicznej — dodatkowy próg.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyka: jeśli scenariusze ma budować osoba z biznesu (np.
                    head of operations, marketing manager), Make jest znacznie
                    bezpieczniejszym wyborem. Jeśli to ma być rola półtechniczna
                    albo masz w firmie kogoś, kto zna JavaScript chociaż na
                    poziomie podstawowym — n8n da znacznie więcej swobody.
                  </p>
                </div>
              </section>

              {/* Sekcja 4 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Elastyczność i logika
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Oba narzędzia mają mocną logikę, ale n8n daje więcej
                    swobody. Konkretne różnice, które potrafią mieć znaczenie:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Code node w n8n — pełny JavaScript / Python na danych
                      przepływu. W Make masz „Tools / Set variable" i kilka
                      modułów do transformacji, ale głębsza logika wymaga
                      obejść.
                    </li>
                    <li>
                      Custom nodes w n8n — możesz napisać własny moduł w
                      TypeScripcie i zainstalować go we własnej instancji. W
                      Make nie ma takiej opcji.
                    </li>
                    <li>
                      Wersjonowanie i CI/CD w n8n Enterprise — workflow można
                      wersjonować w gicie, deployować z pipeline. Make ma
                      wbudowany version control, ale słabszy do CI/CD.
                    </li>
                    <li>
                      Sub-workflows w n8n — możesz wywołać jeden workflow z
                      drugiego jak funkcję. Make ma „Make a call to another
                      scenario", ale jest bardziej ograniczone.
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dla typowej firmy MŚP, która ma 10–30 scenariuszy średniego
                    stopnia złożoności, możliwości obu narzędzi są podobne.
                    Różnica zaczyna mieć znaczenie przy 50+ scenariuszach lub
                    gdy pojawiają się wymagania DevOps (środowiska
                    dev/staging/prod, deployment).
                  </p>
                </div>
              </section>

              {/* Sekcja 5 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Compliance, RODO, lokalizacja danych
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dla firm MŚP w Polsce ten temat zwykle nie jest blokerem,
                    ale warto wiedzieć, gdzie stoją oba narzędzia.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make: serwery w UE (Czechy, Niemcy), siedziba w Czechach
                    (część Celonis). DPA dostępne, certyfikat SOC 2. Dla
                    większości firm MŚP w pełni wystarczy do RODO.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n.cloud: serwery w UE (Niemcy), siedziba w Berlinie. DPA,
                    SOC 2 Type II, ISO 27001 w trakcie. Dla MŚP równie
                    bezpieczny wybór jak Make.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted na własnym serwerze w Polsce: pełna
                    kontrola, zero zewnętrznego DPA, dane nigdy nie wychodzą
                    poza Twoją infrastrukturę. To wybór dla branż regulowanych
                    (kancelarie prawne, sektor finansowy, ochrona zdrowia,
                    sektor publiczny). Sprawdź też{" "}
                    <Link
                      href="/integracje-api"
                      className="text-accent hover:underline"
                    >
                      integracje API
                    </Link>{" "}
                    — często dane wrażliwe można przesyłać tylko między
                    systemami w jednej sieci.
                  </p>
                </div>
              </section>

              {/* Sekcja 6 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Skalowanie — co się dzieje przy wzroście
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make skaluje się płynnie — wybierasz większy plan, masz
                    więcej operacji. Limit górny dla planu Teams to ok. 800 000
                    operacji/mies. Powyżej — Enterprise z wyceną indywidualną.
                    Wadą jest liniowy wzrost kosztu z wolumenem.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted skaluje się z mocą serwera. Mały VPS obsłuży
                    kilka tysięcy wykonań dziennie. Większy serwer (4 vCPU, 8 GB
                    RAM) — kilkanaście tysięcy. Powyżej — queue mode (Redis +
                    workers), praktycznie bez górnego limitu. Koszt rośnie z
                    infrastrukturą, nie operacjami.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Praktyczny próg dla MŚP: powyżej 30 000 wykonań miesięcznie
                    n8n self-hosted zaczyna być znacząco tańszy od Make. Powyżej
                    100 000 wykonań — różnica to często rząd wielkości.
                  </p>
                </div>
              </section>

              {/* Sekcja 7 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kto za co odpowiada — model utrzymania
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make to klasyczny SaaS — odpowiedzialność za infrastrukturę
                    leży po stronie producenta. Twoja rola to budować
                    scenariusze, monitorować ich działanie i pilnować, żeby nie
                    skończył się pakiet operacji.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n.cloud — analogicznie do Make, infra po stronie n8n.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    n8n self-hosted — Ty (lub Twój wykonawca) odpowiadasz za:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Serwer (instalacja, aktualizacje OS, security)</li>
                    <li>n8n (aktualizacje, breaking changes, migracje DB)</li>
                    <li>Backup bazy danych i credentials</li>
                    <li>Monitoring uptime i alerty</li>
                    <li>SSL, reverse proxy, ewentualnie firewall</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To zwykle 1–3 godziny miesięcznie po dobrym wdrożeniu. Ale
                    wymaga osoby, która rozumie Linuxa i Dockera. Bez tego
                    self-hosting nie ma sensu — albo wybieraj n8n.cloud, albo
                    Make.
                  </p>
                </div>
              </section>

              {/* Sekcja 8 */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Kiedy wybrać Make, a kiedy n8n — checklist dla MŚP
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Wybierz Make, gdy:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>Nie macie osoby technicznej w firmie</li>
                    <li>
                      Scenariusze ma budować osoba z biznesu, nie programista
                    </li>
                    <li>Wolumen miesięczny do 30 000 operacji</li>
                    <li>
                      Cenicie sobie czas startu — chcecie ruszyć w tym tygodniu
                    </li>
                    <li>
                      Lokalizacja danych w UE wystarcza, nie potrzebujecie
                      pełnej kontroli
                    </li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Wybierz n8n (cloud lub self-hosted), gdy:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                    <li>
                      Macie osobę techniczną albo zewnętrznego partnera, który
                      ogarnia infrastrukturę
                    </li>
                    <li>
                      Wolumen rośnie i koszty Make zaczynają boleć (powyżej 50
                      USD/mies.)
                    </li>
                    <li>
                      Potrzebujecie integracji z systemami wewnętrznymi (on-prem
                      ERP, CRM, baza)
                    </li>
                    <li>
                      Branża wymaga pełnej kontroli nad danymi (finanse,
                      zdrowie, sektor publiczny)
                    </li>
                    <li>Chcecie pisać własne moduły lub mocno custom logikę</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Hybryda również ma sens — Make dla zespołu marketingu i HR,
                    n8n dla backoffice i operacji. Wiele firm MŚP tak właśnie
                    działa.
                  </p>
                </div>
              </section>

              {/* Mid CTA */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      Chcesz dobrać narzędzie pod realne procesy w Twojej
                      firmie?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Audyt procesów, porównanie kosztów i wdrożenie pierwszych
                      scenariuszy w Make lub n8n — bez przepłacania za
                      niepotrzebne plany.
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

              {/* Sekcja 9 — Podsumowanie */}
              <section className="py-12 lg:py-16">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Podsumowanie
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Make i n8n są bliższe sobie niż jakiekolwiek inne narzędzie
                    automatyzacji. Oba mają mocną logikę, dobre integracje i
                    wizualny diagram. Główne różnice to: model dostarczania
                    (Make tylko SaaS, n8n cloud + self-hosted), elastyczność
                    techniczna (n8n więcej, ale za cenę krzywej nauki) i koszt
                    przy dużej skali (n8n self-hosted prawie zawsze tańsze).
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Dla większości firm MŚP Make jest pierwszym, naturalnym
                    wyborem — szybciej startujesz, mniej rzeczy może pójść nie
                    tak. n8n staje się sensowny, gdy wolumen rośnie, pojawiają
                    się wymagania techniczne lub compliance, albo gdy macie w
                    firmie kogoś, kto naprawdę chce mieć kontrolę nad
                    automatyzacjami.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Zanim zdecydujesz, zobacz też{" "}
                    <Link
                      href="/strefa-wiedzy/zapier-vs-make"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make
                    </Link>{" "}
                    oraz{" "}
                    <Link
                      href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make vs n8n
                    </Link>{" "}
                    — pełen obraz pomaga uniknąć decyzji „bo tak wybrał kolega".
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
            <PrevNextArticle currentHref="/strefa-wiedzy/make-vs-n8n" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Make czy n8n? Pomogę dobrać i wdrożyć.
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bez sprzedażowej presji — krótka rozmowa, w której zobaczymy, co
                naprawdę pasuje do Twojej skali i procesów.
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
                      href="/strefa-wiedzy/zapier-make-n8n-porownanie"
                      className="text-accent hover:underline"
                    >
                      Zapier vs Make vs n8n — wielkie porównanie 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych"
                      className="text-accent hover:underline"
                    >
                      Co to jest automatyzacja procesów biznesowych?
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
                      n8n — wdrożenia
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/automatyzacja-crm"
                      className="text-accent hover:underline"
                    >
                      Automatyzacja CRM
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
            headline: "Make vs n8n — porównanie dla firm MŚP",
            description:
              "Make i n8n w boju: koszt, elastyczność, krzywa nauki i lokalizacja danych. Praktyczne porównanie dla małych i średnich firm w 2026 roku.",
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
