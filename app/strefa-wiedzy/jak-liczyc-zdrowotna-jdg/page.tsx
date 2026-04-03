import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Jak liczyć składkę zdrowotną w JDG w 2026? Skala, liniowy, ryczałt | Fluxlab",
  description:
    "Zasady obliczania składki zdrowotnej w JDG w 2026 roku. Różnice między skalą, liniowym i ryczałtem. Progi, podstawy wymiaru i wpływ na opłacalność formy opodatkowania.",
  openGraph: {
    title:
      "Jak liczyć składkę zdrowotną w JDG w 2026? Skala, liniowy, ryczałt | Fluxlab",
    description:
      "Zasady obliczania składki zdrowotnej w JDG w 2026 roku. Różnice między skalą, liniowym i ryczałtem. Progi, podstawy wymiaru i wpływ na opłacalność formy opodatkowania.",
    locale: "pl_PL",
    type: "article",
  },
  alternates: {
    canonical: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
  },
};

export default function SkladkaZdrowotnaJDGArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "Jak liczyć składkę zdrowotną w JDG" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak liczyć składkę zdrowotną w JDG w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Składka zdrowotna to jeden z najczęściej pomijanych elementów
              przy porównywaniu form opodatkowania. A potrafi zmienić wynik
              o kilka tysięcy złotych rocznie. W 2026 roku zasady są inne
              dla skali, liniowego i ryczałtu — różnią się stawką, podstawą
              wymiaru i możliwością odliczenia. Ten artykuł tłumaczy, jak
              to działa na konkretnych liczbach.
            </p>
          </div>
        </section>

        {/* Składka zdrowotna na skali podatkowej */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Składka zdrowotna na skali podatkowej
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na skali podatkowej składka zdrowotna wynosi 9% dochodu.
              To najwyższa stawka procentowa spośród wszystkich trzech form
              opodatkowania. I co ważne — nie można jej odliczyć od podatku
              ani od dochodu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podstawą wymiaru jest dochód z działalności, czyli przychód
              minus koszty uzyskania przychodu. Składka jest naliczana
              miesięcznie, na podstawie dochodu z danego miesiąca.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Istnieje jednak składka minimalna — nie może być niższa niż 9%
              od 75% minimalnego wynagrodzenia. W 2026 roku minimalne
              wynagrodzenie wynosi 4 826 zł brutto, co daje minimalną
              podstawę wymiaru 3 619,50 zł i minimalną składkę zdrowotną
              ok. 325,76 zł miesięcznie.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Kluczowe cechy na skali
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stawka: 9% dochodu</li>
              <li>Minimalna podstawa: 75% minimalnego wynagrodzenia (3 619,50 zł)</li>
              <li>Odliczenie od podatku: NIE</li>
              <li>Odliczenie od dochodu: NIE</li>
              <li>Naliczanie: miesięczne, od bieżącego dochodu</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W praktyce oznacza to, że przy dochodzie 10 000 zł miesięcznie
              składka zdrowotna na skali wynosi 900 zł — i całość jest
              kosztem, którego nie odzyskasz.
            </p>
          </div>
        </section>

        {/* Składka zdrowotna na liniowym */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Składka zdrowotna na liniowym
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na podatku liniowym składka zdrowotna wynosi 4,9% dochodu.
              To niemal połowa stawki obowiązującej na skali. Ale to nie
              jedyna różnica — na liniowym część składki zdrowotnej można
              odliczyć od dochodu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Limit odliczenia w 2026 roku wynosi 12 900 zł rocznie.
              Oznacza to, że zapłacona składka zdrowotna (do kwoty limitu)
              pomniejsza podstawę opodatkowania, co realnie obniża podatek
              dochodowy o 19% tej kwoty.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Kluczowe cechy na liniowym
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stawka: 4,9% dochodu</li>
              <li>Minimalna podstawa: 75% minimalnego wynagrodzenia (3 619,50 zł)</li>
              <li>Odliczenie od podatku: NIE</li>
              <li>Odliczenie od dochodu: TAK, do limitu 12 900 zł rocznie</li>
              <li>Naliczanie: miesięczne, od bieżącego dochodu</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy dochodzie 10 000 zł miesięcznie składka zdrowotna na
              liniowym wynosi 490 zł. Z możliwością odliczenia od dochodu
              realna oszczędność podatkowa to dodatkowe ok. 93 zł miesięcznie
              (19% z 490 zł). Różnica względem skali jest więc znacząca.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Minimalna składka działa tak samo jak na skali — nie może być
              niższa niż 9% od 75% minimalnego wynagrodzenia (tak,
              minimalna stawka to 9%, nie 4,9%).
            </p>
          </div>
        </section>

        {/* Składka zdrowotna na ryczałcie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Składka zdrowotna na ryczałcie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na ryczałcie składka zdrowotna działa zupełnie inaczej.
              Nie zależy od dochodu, ale od przychodu — a dokładniej od
              progu przychodu, w którym się mieścisz. Stawka to 9% od
              zryczałtowanej podstawy wymiaru.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Trzy progi przychodowe w 2026
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Przychód do 60 000 zł rocznie — podstawa: 60% przeciętnego
                wynagrodzenia = 5 593,20 zł → składka ok. 503,39 zł/mies.
              </li>
              <li>
                Przychód od 60 001 zł do 300 000 zł — podstawa: 100%
                przeciętnego wynagrodzenia = 9 322 zł → składka ok.
                838,98 zł/mies.
              </li>
              <li>
                Przychód powyżej 300 000 zł — podstawa: 180% przeciętnego
                wynagrodzenia = 16 779,60 zł → składka ok. 1 510,16 zł/mies.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To kluczowa różnica: na ryczałcie nie liczy się dochód (czyli
              przychód minus koszty), a sam przychód. Dlatego forma ta jest
              szczególnie korzystna dla osób z niskimi kosztami, ale wysoką
              marżą.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składki zdrowotnej na ryczałcie nie można odliczyć od
              przychodu ani od podatku.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Kluczowe cechy na ryczałcie
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stawka: 9% od zryczałtowanej podstawy</li>
              <li>Podstawa: zależy od progu przychodu (3 progi)</li>
              <li>Odliczenie od podatku: NIE</li>
              <li>Odliczenie od przychodu: NIE</li>
              <li>Naliczanie: miesięczne, stała kwota w ramach progu</li>
            </ul>
          </div>
        </section>

        {/* Porównanie na przykładach */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Porównanie na przykładach
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Poniżej trzy scenariusze z konkretnymi kwotami. Zakładamy
              niskie koszty działalności (typowe dla usług IT, konsultingu,
              freelance).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 1: dochód 6 000 zł/mies. (przychód ~7 000 zł)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Skala: 9% × 6 000 = 540 zł/mies. (6 480 zł/rok)</li>
              <li>Liniowy: 4,9% × 6 000 = 294 zł/mies. (3 528 zł/rok) + odliczenie od dochodu</li>
              <li>Ryczałt: przychód do 60k → ok. 503 zł/mies. (6 040 zł/rok)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy niskim dochodzie liniowy wygrywa na składce zdrowotnej.
              Ryczałt jest porównywalny ze skalą, ale bez możliwości
              odliczenia kosztów.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 2: dochód 15 000 zł/mies. (przychód ~17 000 zł)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Skala: 9% × 15 000 = 1 350 zł/mies. (16 200 zł/rok)</li>
              <li>Liniowy: 4,9% × 15 000 = 735 zł/mies. (8 820 zł/rok) + odliczenie od dochodu</li>
              <li>Ryczałt: przychód 60–300k → ok. 839 zł/mies. (10 068 zł/rok)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy średnim dochodzie różnica między skalą a liniowym
              to ponad 7 000 zł rocznie samej składki zdrowotnej. Ryczałt
              plasuje się pomiędzy nimi.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 3: dochód 30 000 zł/mies. (przychód ~33 000 zł)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Skala: 9% × 30 000 = 2 700 zł/mies. (32 400 zł/rok)</li>
              <li>Liniowy: 4,9% × 30 000 = 1 470 zł/mies. (17 640 zł/rok) + odliczenie od dochodu</li>
              <li>Ryczałt: przychód powyżej 300k → ok. 1 510 zł/mies. (18 122 zł/rok)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy wysokim dochodzie skala jest najdroższa pod względem
              składki zdrowotnej. Liniowy i ryczałt są porównywalne
              kwotowo, ale liniowy pozwala na odliczenie od dochodu do
              limitu 12 900 zł.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sprawdź wpływ zdrowotnej na Twój wynik
              </p>
              <Link
                href="/kalkulator-podatkowy"
                className="btn-primary inline-block"
              >
                Sprawdź w kalkulatorze JDG 2026
              </Link>
            </div>
          </div>
        </section>

        {/* Dlaczego zdrowotna jest tak ważna przy wyborze formy */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dlaczego zdrowotna jest tak ważna przy wyborze formy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wiele osób porównuje formy opodatkowania wyłącznie pod kątem
              stawki podatku dochodowego: 12%/32% na skali, 19% na liniowym,
              kilka procent na ryczałcie. Ale składka zdrowotna potrafi
              zmienić wynik o kilka tysięcy złotych rocznie.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Szczególnie przy dochodach w przedziale 10 000–20 000 zł
              miesięcznie zdrowotna bywa decydująca. Na skali kosztuje
              900–1 800 zł miesięcznie i nie da się jej odliczyć. Na
              liniowym to 490–980 zł z możliwością odliczenia od dochodu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dlatego porównanie form opodatkowania bez uwzględnienia
              składki zdrowotnej jest niepełne. Więcej o samym wyborze
              formy znajdziesz w artykule{" "}
              <Link
                href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                className="text-accent hover:underline"
              >
                Jaka forma opodatkowania JDG w 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Minimum składki zdrowotnej */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Minimum składki zdrowotnej
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Niezależnie od formy opodatkowania obowiązuje minimalna
              składka zdrowotna. Jej podstawą jest 75% minimalnego
              wynagrodzenia, a stawka to 9%.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W 2026 roku: 75% × 4 826 zł = 3 619,50 zł. Składka
              minimalna: 9% × 3 619,50 zł = ok. 325,76 zł miesięcznie.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Minimum dotyczy sytuacji, gdy dochód jest bardzo niski lub
              ujemny. Nawet jeśli w danym miesiącu nie zarobiłeś nic,
              składkę zdrowotną i tak musisz zapłacić.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na skali i liniowym minimum stosuje się, gdy wyliczona
              składka byłaby niższa niż 325,76 zł. Na ryczałcie minimum
              nie ma znaczenia, bo kwoty ryczałtowe i tak są wyższe.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Warto pamiętać, że minimalna składka zdrowotna rośnie co rok
              wraz z minimalnym wynagrodzeniem. To oznacza, że nawet
              przy zerowym dochodzie koszt zdrowotnej systematycznie rośnie.
            </p>
          </div>
        </section>

        {/* Podsumowanie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Podsumowanie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zdrowotna w 2026 roku różni się znacząco w zależności
              od formy opodatkowania. Na skali to 9% dochodu bez odliczenia.
              Na liniowym 4,9% z możliwością odliczenia od dochodu do
              12 900 zł rocznie. Na ryczałcie — stała kwota zależna od
              progu przychodu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy wyborze formy opodatkowania nie wystarczy porównać stawek
              PIT. Trzeba uwzględnić składkę zdrowotną, bo to ona potrafi
              przesądzić o opłacalności. Szczególnie w przedziale dochodów
              8 000–25 000 zł miesięcznie różnice są wyraźne.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Najlepszą metodą jest sprawdzenie konkretnych kwot dla
              swojego poziomu przychodów i kosztów — z uwzględnieniem
              składki zdrowotnej, ZUS i podatku dochodowego łącznie.
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
              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy składkę zdrowotną można odliczyć od podatku?
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
                  Na podatku liniowym można odliczyć składkę zdrowotną od
                  dochodu — do limitu 12 900 zł rocznie. Na skali
                  podatkowej i ryczałcie składka zdrowotna nie podlega
                  odliczeniu.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Jaka jest minimalna składka zdrowotna?
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
                  Minimalna składka zdrowotna wynosi 9% od 75% minimalnego
                  wynagrodzenia. W 2026 roku to ok. 325,76 zł miesięcznie.
                  Obowiązuje nawet przy zerowym lub ujemnym dochodzie.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy na ryczałcie zdrowotna zależy od dochodu?
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
                  Nie. Na ryczałcie składka zdrowotna zależy od przychodu,
                  a dokładniej od progu przychodu rocznego (do 60 tys.,
                  do 300 tys. lub powyżej 300 tys.). Dochód nie ma
                  znaczenia.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Dlaczego zdrowotna na liniowym jest niższa?
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
                  Na liniowym stawka wynosi 4,9% dochodu (vs 9% na skali).
                  Dodatkowo na liniowym można odliczyć zapłaconą składkę
                  od dochodu do limitu 12 900 zł rocznie, co jeszcze
                  bardziej zmniejsza efektywny koszt.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Chcesz policzyć składki dla swojej sytuacji?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Skorzystaj z kalkulatora lub umów się na bezpłatną
                konsultację.
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
                      href="/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026"
                      className="text-accent hover:underline"
                    >
                      Jaka forma opodatkowania JDG w 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/ryczalt-czy-liniowy"
                      className="text-accent hover:underline"
                    >
                      Ryczałt czy liniowy — co wybrać
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                      className="text-accent hover:underline"
                    >
                      Skala czy liniowy w JDG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca"
                      className="text-accent hover:underline"
                    >
                      Mały ZUS Plus — kiedy się opłaca
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Narzędzia
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>
                    <Link
                      href="/kalkulator-podatkowy"
                      className="text-accent hover:underline"
                    >
                      Kalkulator podatkowy JDG 2026
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Czy składkę zdrowotną można odliczyć od podatku?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Na podatku liniowym można odliczyć składkę zdrowotną od dochodu — do limitu 12 900 zł rocznie. Na skali podatkowej i ryczałcie składka zdrowotna nie podlega odliczeniu.",
                },
              },
              {
                "@type": "Question",
                name: "Jaka jest minimalna składka zdrowotna?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Minimalna składka zdrowotna wynosi 9% od 75% minimalnego wynagrodzenia. W 2026 roku to ok. 325,76 zł miesięcznie. Obowiązuje nawet przy zerowym lub ujemnym dochodzie.",
                },
              },
              {
                "@type": "Question",
                name: "Czy na ryczałcie zdrowotna zależy od dochodu?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nie. Na ryczałcie składka zdrowotna zależy od przychodu, a dokładniej od progu przychodu rocznego (do 60 tys., do 300 tys. lub powyżej 300 tys.). Dochód nie ma znaczenia.",
                },
              },
              {
                "@type": "Question",
                name: "Dlaczego zdrowotna na liniowym jest niższa?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Na liniowym stawka wynosi 4,9% dochodu (vs 9% na skali). Dodatkowo na liniowym można odliczyć zapłaconą składkę od dochodu do limitu 12 900 zł rocznie, co jeszcze bardziej zmniejsza efektywny koszt.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
