import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Program pilotażowy — 50% ceny dla pierwszych 3 klientów | Fluxlab",
  description:
    "Pierwsi 3 klienci otrzymują wdrożenie automatyzacji za 50% ceny w zamian za case study i testimonial. Oferta dla firm B2B gotowych na realny pilotaż.",
  openGraph: {
    title: "Program pilotażowy — 50% ceny dla pierwszych 3 klientów | Fluxlab",
    description:
      "Pierwsi 3 klienci otrzymują wdrożenie automatyzacji za 50% ceny w zamian za case study i testimonial.",
    locale: "pl_PL",
    type: "website",
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
    canonical: "/pilotaz",
  },
};

const whatYouGet = [
  {
    title: "50% ceny projektu",
    description:
      "Pełny zakres audytu i wdrożenia za połowę standardowej ceny. Widełki potwierdzam po konsultacji, stałą cenę po audycie — bez niespodzianek.",
  },
  {
    title: "Priorytet i zaangażowanie",
    description:
      "Pilotażowe projekty mają dla mnie najwyższy priorytet — bo ich powodzenie buduje moje portfolio. Dostajesz szybszą reakcję, więcej uwagi, pełne zaangażowanie.",
  },
  {
    title: "Rozszerzone wsparcie po wdrożeniu",
    description:
      "60 dni darmowych poprawek zamiast standardowych 30. Plus bezpłatna sesja optymalizacyjna po 3 miesiącach od wdrożenia.",
  },
  {
    title: "Stała cena projektowa",
    description:
      "Tak jak w standardowych projektach — płacisz za efekt, nie za godziny. Transze powiązane z kamieniami milowymi.",
  },
];

const whatYouGive = [
  {
    title: "Case study (mierzalne efekty)",
    description:
      "Po zakończeniu wdrożenia wspólnie opisujemy co, jak i z jakim efektem (oszczędność czasu, eliminacja błędów, szybsza reakcja). Case study publikujemy na fluxlab.pl.",
  },
  {
    title: "Testimonial (krótka wypowiedź)",
    description:
      "Imię, nazwisko, stanowisko, firma plus 2–4 zdania o współpracy. Akceptujesz treść przed publikacją.",
  },
  {
    title: "Zgoda na referencje",
    description:
      "Możliwość poproszenia cię o referencje przez przyszłych klientów (mail lub krótka rozmowa telefoniczna). Nigdy bez twojej zgody na konkretną sytuację.",
  },
  {
    title: "Feedback w trakcie wdrożenia",
    description:
      "Regularna informacja zwrotna co tydzień — nie tylko „działa / nie działa”, ale co można poprawić. Pomaga mi ulepszać proces dla kolejnych klientów.",
  },
];

const criteria = [
  "Firma B2B (produkt lub usługa dla firm, nie dla konsumentów końcowych)",
  "Realny proces do zautomatyzowania (CRM, leady, raportowanie, integracje API, n8n, AI) — nie koncepcja „może by coś usprawnić”",
  "Decydent dostępny na 2–3 rozmowy w trakcie wdrożenia",
  "Gotowość na publikację case study w ciągu 30 dni od zakończenia wdrożenia",
  "Działalność w Polsce (ze względu na zgodność prawną umowy)",
];

const faq = [
  {
    question: "Czy moja firma się nadaje?",
    answer:
      "Najszybciej sprawdzimy to na bezpłatnej 30-minutowej konsultacji. Ogólnie: nadajesz się, jeśli masz konkretny, powtarzalny proces, który chcesz zautomatyzować, i jesteś w stanie pokazać mierzalny efekt po wdrożeniu.",
  },
  {
    question: "Ile trwa pilotażowe wdrożenie?",
    answer:
      "Tyle samo co zwykłe — zależnie od zakresu od 2 do 8 tygodni. Pilotaż nie oznacza „na szybko”, oznacza obniżoną cenę w zamian za publikację rezultatu.",
  },
  {
    question: "Czy muszę ujawnić nazwę firmy w case study?",
    answer:
      "Preferuję, żeby tak — imienne case studies są znacznie bardziej wiarygodne. Jeśli to niemożliwe (np. ze względu na zastrzeżenia prawne lub konkurencyjne), możemy opisać branżę i skalę bez nazwy. Ustalamy to przed startem.",
  },
  {
    question: "Kiedy muszę dać testimonial?",
    answer:
      "W ciągu 30 dni od zakończenia wdrożenia i odbioru wszystkich kamieni milowych. Daję ci projekt case study do akceptacji — nic nie publikuję bez twojej zgody.",
  },
  {
    question: "Czy to oznacza niższą jakość pracy?",
    answer:
      "Nie — to oznacza wyższą. Na pilotażach mi szczególnie zależy, bo budują moje portfolio. Jakość techniczna, dokumentacja i wsparcie są takie same lub lepsze niż w standardowych projektach.",
  },
  {
    question: "Co jeśli projekt się nie uda?",
    answer:
      "Jeśli nie dojdziemy do uzgodnionych kamieni milowych z mojej winy — nie płacisz za niedostarczony etap, a także nie wymagam case study. Ryzyko leży po mojej stronie.",
  },
  {
    question: "Dlaczego tylko 3 miejsca?",
    answer:
      "Bo jako solo consultant mogę realnie poprowadzić maksymalnie 3 pilotaże równolegle bez spadku jakości. Po zrealizowaniu 3 case studies oferta pilotażowa kończy się.",
  },
  {
    question: "Jak wygląda aplikacja?",
    answer:
      "Wypełniasz formularz na dole strony lub piszesz wprost. W ciągu 48 h dostajesz odpowiedź: albo umawiamy konsultację, albo — jeśli nie widzę dopasowania — dostajesz szczere wyjaśnienie dlaczego.",
  },
];

export default function Pilotaz() {
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
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Program pilotażowy" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/10 to-transparent border-b border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/15 text-accent text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Zostały 3 miejsca
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Program pilotażowy
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
                50% ceny w zamian za case study
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Pierwsi 3 klienci otrzymują pełne wdrożenie automatyzacji za
                połowę standardowej ceny. W zamian dzielimy się efektem: krótki
                case study i testimonial, które pomagają mi budować portfolio, a
                tobie dają znaczną oszczędność.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#kontakt" className="btn-primary">
                  Aplikuj do pilotażu
                </Link>
                <Link href="/jak-pracuje" className="btn-secondary">
                  Zobacz jak pracuję
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Co dostajesz */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Twoja strona umowy</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Co dostajesz
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {whatYouGet.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Co dajesz w zamian */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Moja strona umowy</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Co dajesz w zamian
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                  Nic, co wymagałoby ujawnienia wrażliwych danych. Wszystko
                  akceptujesz przed publikacją.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {whatYouGive.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kryteria kwalifikacji */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Kryteria</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Dla kogo jest pilotaż
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4">
                  Program jest celowo wąski — chcę mieć pewność, że pilotaże
                  zakończą się sukcesem. Weryfikuję dopasowanie na bezpłatnej
                  konsultacji.
                </p>
              </div>
              <ul className="space-y-3">
                {criteria.map((c) => (
                  <li
                    key={c}
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
                        d="M4 10l4 4 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Proces aplikacji */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="section-label">Proces</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-4">
                  Jak wygląda aplikacja
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    n: "1",
                    title: "Zgłoszenie",
                    desc: "Wysyłasz krótki opis problemu przez formularz lub e-mail. Nie musisz znać rozwiązania — wystarczy opisać ból.",
                  },
                  {
                    n: "2",
                    title: "Konsultacja (48 h)",
                    desc: "W ciągu 48 h odpowiadam: albo umawiamy bezpłatną 30-minutową konsultację, albo mówię wprost, że nie widzę dopasowania.",
                  },
                  {
                    n: "3",
                    title: "Audyt i decyzja",
                    desc: "Jeśli pilotaż ma sens, robię audyt (koszt obniżony), po którym dostajesz konkretną wycenę i harmonogram. Startujemy po akceptacji.",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-6"
                  >
                    <span className="text-3xl font-bold text-accent">
                      {s.n}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
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
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-accent/10 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                3 miejsca. Kończą się jak się skończą.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Aplikuj, nawet jeśli nie masz pewności czy się kwalifikujesz — w
                48 h dostaniesz szczerą odpowiedź.
              </p>
              <Link href="/#kontakt" className="btn-primary">
                Aplikuj do pilotażu
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
