import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculator from "./TaxCalculator";

export const metadata: Metadata = {
  title: "Kalkulator JDG 2026: ryczałt, liniowy, skala i ZUS | Fluxlab",
  description:
    "Porównaj ryczałt, podatek liniowy i skalę podatkową dla JDG w 2026. Uwzględnia ZUS, składkę zdrowotną, VAT, koszty prywatne i samochód. Oblicz, która forma opodatkowania jest najkorzystniejsza.",
  openGraph: {
    title: "Kalkulator JDG 2026: ryczałt, liniowy, skala i ZUS | Fluxlab",
    description:
      "Porównaj ryczałt, podatek liniowy i skalę podatkową dla JDG w 2026. ZUS, zdrowotna, VAT, koszty prywatne i samochód.",
    locale: "pl_PL",
    type: "website",
  },
};

const faqs = [
  {
    question: "Która forma opodatkowania jest najlepsza dla JDG w 2026?",
    answer:
      "To zależy od wysokości przychodu, poziomu kosztów i stawki ryczałtu. Przy niskich kosztach i stawce 12% lub niższej ryczałt często wygrywa. Przy wysokich kosztach liniowy lub skala mogą dać lepszy wynik. Kalkulator powyżej pozwala to porównać na konkretnych liczbach.",
  },
  {
    question: "Jak liczy się składkę zdrowotną na ryczałcie w 2026?",
    answer:
      "Na ryczałcie składka zdrowotna wynosi 9% od podstawy zależnej od rocznego przychodu: do 60 000 zł — 60% przeciętnego wynagrodzenia, do 300 000 zł — 100%, powyżej — 180%. W 2026 r. przeciętne wynagrodzenie wynosi 9 322 zł.",
  },
  {
    question: "Czy na ryczałcie mogę odliczać koszty?",
    answer:
      "Nie. Ryczałt ewidencjonowany nie pozwala odliczać kosztów uzyskania przychodu. Podatek jest naliczany od przychodu, nie od dochodu. Dlatego ryczałt opłaca się przede wszystkim wtedy, gdy koszty działalności są niskie.",
  },
  {
    question: "Kiedy skala podatkowa jest lepsza od liniowego?",
    answer:
      "Skala jest lepsza, gdy dochód nie przekracza ok. 120 000 zł rocznie (dzięki kwocie wolnej 30 000 zł i stawce 12%). Powyżej tego progu wchodzi stawka 32%, i przy wyższych dochodach liniowy 19% zwykle daje niższy podatek.",
  },
  {
    question: "Co uwzględnia ten kalkulator?",
    answer:
      "Kalkulator uwzględnia: trzy formy opodatkowania (skala, liniowy, ryczałt), pełny i mały ZUS, składkę zdrowotną, VAT (czynny, zwolniony, marża), koszty prywatne, samochód firmowy i mieszany, ulgi ZUS dla nowych firm oraz mały ZUS Plus. Wyniki są podane miesięcznie i rocznie.",
  },
  {
    question: "Czy kalkulator zastępuje księgowego?",
    answer:
      "Nie. Kalkulator daje orientacyjne porównanie form opodatkowania na podstawie uproszczonego modelu. Nie uwzględnia indywidualnych ulg, specyficznych PKD, rozliczeń z małżonkiem ani sytuacji, w których przychody pochodzą z kilku źródeł. Ostateczną decyzję warto skonsultować z księgowym.",
  },
];

export default function KalkulatorPodatkowyPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Narzędzie</p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Kalkulator JDG 2026
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Porównaj ryczałt, podatek liniowy i skalę podatkową. Uwzględnij
                  ZUS, zdrowotną, VAT, koszty prywatne i samochód.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "VAT: czynny, zwolniony lub marża",
                    "Pełny ZUS, mały ZUS i ulgi dla nowych firm",
                    "Koszty prywatne i samochód firmowy/mieszany",
                    "Wyniki miesięcznie i rocznie",
                    "Aktualne stawki i progi 2026",
                    "Mały ZUS Plus — automatyczne wyliczenie",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <svg className="shrink-0 mt-0.5 text-accent" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image
                    src="/photos/tax-calculation/calculator.jpg"
                    alt="Kalkulator podatkowy JDG 2026"
                    width={480}
                    height={320}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-900">
                  <Image
                    src="/photos/tax-calculation/urzad-skarbowy-plate.jpg"
                    alt="Urząd Skarbowy"
                    width={96}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl overflow-hidden shadow-lg border-2 border-white dark:border-gray-900">
                  <Image
                    src="/photos/tax-calculation/coin.jpg"
                    alt="Finanse"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-16 lg:pb-24">
          <div className="max-w-6xl min-[1800px]:max-w-none mx-auto px-6 lg:px-8">
            <TaxCalculator />
          </div>
        </section>

        {/* Expert content */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak działa kalkulator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator pobiera Twoje dane wejściowe — przychód, koszty, formę
                ZUS, stawkę ryczałtu, status VAT i opcje samochodu — a następnie
                oblicza dla każdej z trzech form opodatkowania: składki społeczne,
                składkę zdrowotną, podatek dochodowy, ewentualny VAT i kwotę netto
                do dyspozycji.
              </p>
              <p>
                Wyniki są pokazywane obok siebie, żebyś mógł od razu zobaczyć
                różnicę. Forma, która daje najwięcej na rękę, jest oznaczona jako
                najkorzystniejsza. Możesz przełączać widok między wartościami
                miesięcznymi i rocznymi.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dla kogo jest ten kalkulator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator jest przeznaczony dla osób prowadzących jednoosobową
                działalność gospodarczą (JDG) lub planujących jej założenie. Sprawdzi
                się szczególnie, gdy:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>zakładasz firmę i nie wiesz, którą formę opodatkowania wybrać,</li>
                <li>rozważasz zmianę formy na kolejny rok podatkowy,</li>
                <li>chcesz sprawdzić, czy ryczałt nadal się opłaca po zmianie kosztów,</li>
                <li>planujesz przejście z etatu na B2B i chcesz porównać kwotę netto,</li>
                <li>chcesz zobaczyć wpływ samochodu firmowego, VAT lub ulg ZUS na wynik.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Co uwzględnia kalkulator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator uwzględnia najważniejsze elementy wpływające na
                opłacalność formy opodatkowania:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Trzy formy opodatkowania:</strong> skala podatkowa (12%/32%), podatek liniowy (19%), ryczałt ewidencjonowany.</li>
                <li><strong>Składki ZUS:</strong> pełny ZUS, mały ZUS, ulga na start, mały ZUS Plus — z dokładnym wyliczeniem składek społecznych i Funduszu Pracy.</li>
                <li><strong>Składka zdrowotna:</strong> osobno dla każdej formy, według zasad obowiązujących w 2026.</li>
                <li><strong>VAT:</strong> czynny (23%), zwolniony podmiotowo, marża.</li>
                <li><strong>Koszty prywatne:</strong> telefon, internet i inne wydatki używane częściowo prywatnie.</li>
                <li><strong>Samochód:</strong> firmowy (100% odliczenia) lub mieszany (75% PIT, 50% VAT).</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Czego kalkulator nie uwzględnia
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator jest modelem uproszczonym. Nie uwzględnia:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>rozliczenia wspólnego z małżonkiem,</li>
                <li>ulg podatkowych poza ulgą na start i małym ZUS Plus (np. IP Box, ulga B+R),</li>
                <li>przychodów z kilku źródeł jednocześnie,</li>
                <li>specyficznych stawek ryczałtu zależnych od PKD,</li>
                <li>zmian stawek w trakcie roku,</li>
                <li>zaliczek kwartalnych vs miesięcznych.</li>
              </ul>
              <p>
                Dlatego traktuj wynik jako punkt wyjścia do rozmowy z księgowym, a
                nie jako ostateczną odpowiedź.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-article CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Potrzebujesz pomocy z wyborem formy opodatkowania?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Nie zawsze wystarczy sam kalkulator. Jeśli masz złożoną sytuację,
                skonsultuj się z ekspertem.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3 text-base">
                Umów konsultację
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy ryczałt przegrywa z liniowym
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Ryczałt wydaje się prosty i tani, ale nie zawsze wygrywa. Przegrywa
                najczęściej wtedy, gdy:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>koszty działalności są wysokie (np. materiały, podwykonawcy, wynajem),</li>
                <li>stawka ryczałtu jest wysoka (15% lub 17%),</li>
                <li>firma ponosi duże koszty samochodu, sprzętu lub usług,</li>
                <li>przedsiębiorca chce odliczać składkę zdrowotną od dochodu.</li>
              </ul>
              <p>
                W takich przypadkach podatek liniowy 19%, który pozwala odliczać
                koszty i częściowo składkę zdrowotną, może dać lepszy wynik netto.
                Wpisz swoje dane w{" "}
                <Link href="#kalkulator" className="text-accent hover:underline">
                  kalkulator powyżej
                </Link>
                , żeby zobaczyć różnicę na konkretnych liczbach.
              </p>
              <p>
                Więcej o tym porównaniu:{" "}
                <Link
                  href="/strefa-wiedzy/ryczalt-czy-liniowy"
                  className="text-accent hover:underline"
                >
                  Ryczałt czy liniowy — co się bardziej opłaca w 2026
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze błędy przy wyborze formy opodatkowania
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Patrzenie tylko na stawkę podatku.</strong> Stawka to nie
                wszystko. Składka zdrowotna, możliwość odliczenia kosztów i ZUS
                mogą zmienić wynik o kilka tysięcy złotych rocznie.
              </p>
              <p>
                <strong>Ignorowanie składki zdrowotnej.</strong> Na ryczałcie
                zdrowotna zależy od przychodu, na liniowym od dochodu, a na skali
                od dochodu bez możliwości odliczenia. To potrafi być duża różnica.
              </p>
              <p>
                <strong>Założenie, że ryczałt zawsze jest najtańszy.</strong> Przy
                wysokich kosztach i wyższych stawkach ryczałtu liniowy potrafi dać
                lepszy wynik.
              </p>
              <p>
                <strong>Brak uwzględnienia VAT.</strong> Jeśli firma jest czynnym
                VAT-owcem, to wpływa na cashflow i na to, jak liczyć realny
                przychód.
              </p>
              <p>
                <strong>Porównywanie form na zły okres.</strong> Forma opodatkowania
                dotyczy całego roku. Porównuj roczne kwoty, nie miesięczne w
                oderwaniu od kontekstu.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak interpretować wynik
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator pokazuje trzy kolumny: skalę, liniowy i ryczałt. Dla
                każdej formy widzisz podatek, składki ZUS, składkę zdrowotną, VAT
                (jeśli dotyczy) i kwotę do dyspozycji.
              </p>
              <p>
                <strong>Kwota do dyspozycji</strong> to najważniejsza liczba —
                pokazuje, ile realnie zostaje po opłaceniu wszystkich danin.
                Najwyższa kwota do dyspozycji oznacza najkorzystniejszą formę
                dla podanych parametrów.
              </p>
              <p>
                Pamiętaj: wynik zmienia się w zależności od danych wejściowych.
                Warto sprawdzić kilka scenariuszy — np. wyższy przychód, inne
                koszty albo zmianę formy ZUS.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Najczęstsze pytania
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-gray-900 dark:text-white font-medium list-none">
                    {faq.question}
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
                  <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 p-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Źródła i aktualność
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Ostatnia aktualizacja</p>
                  <p>Marzec 2026</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Rok podatkowy</p>
                  <p>2026</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Źródła stawek</p>
                  <p>Ustawa o PIT, ustawa o zryczałtowanym podatku, ustawa o świadczeniach opieki zdrowotnej, obwieszczenia ZUS</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-300">Podstawy wymiaru ZUS</p>
                  <p>Przeciętne wynagrodzenie: 9 322 zł, minimalne wynagrodzenie: 4 826 zł</p>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">Changelog</p>
                <ul className="space-y-1 text-xs">
                  <li><strong>03.2026</strong> — aktualizacja stawek ZUS i progów zdrowotnej na rok 2026</li>
                  <li><strong>03.2026</strong> — dodanie małego ZUS Plus i rozbudowa sekcji eksperckiej</li>
                  <li><strong>02.2026</strong> — dodanie obsługi samochodu firmowego i mieszanego</li>
                  <li><strong>01.2026</strong> — pierwsze wydanie kalkulatora z podstawowymi formami opodatkowania</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Related articles */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Powiązane artykuły
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
                  title: "Jaka forma opodatkowania JDG w 2026?",
                  description: "Porównanie skali, liniowego i ryczałtu — kryteria wyboru, progi, pułapki.",
                },
                {
                  href: "/strefa-wiedzy/ryczalt-czy-liniowy",
                  title: "Ryczałt czy liniowy — co się bardziej opłaca",
                  description: "Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć.",
                },
                {
                  href: "/strefa-wiedzy/skala-czy-liniowy-jdg",
                  title: "Skala czy liniowy — porównanie dla JDG",
                  description: "Kwota wolna, progi, zdrowotna i realne scenariusze.",
                },
                {
                  href: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
                  title: "Jak liczyć składkę zdrowotną w JDG",
                  description: "Zasady 2026 dla skali, liniowego i ryczałtu.",
                },
                {
                  href: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
                  title: "Mały ZUS Plus — kiedy się opłaca",
                  description: "Warunki, limity, oszczędności i kiedy lepiej z niego nie korzystać.",
                },
                {
                  href: "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
                  title: "VAT w JDG — kiedy warto być vatowcem",
                  description: "Zwolnienie podmiotowe, próg 200 000 zł i wpływ na cashflow.",
                },
              ].map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="block p-6 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-accent/30 dark:hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Potrzebujesz automatyzacji rozliczeń lub procesów w firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Jeśli prowadzisz firmę i chcesz usprawnić procesy, raportowanie
                lub integracje, porozmawiajmy.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
                Umów bezpłatną konsultację
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      <Footer />
    </>
  );
}
