import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Mały ZUS Plus w 2026 — kiedy się opłaca, warunki, limity | Fluxlab",
  description:
    "Mały ZUS Plus w 2026: kto może skorzystać, jakie są warunki, limity przychodowe i ile realnie oszczędzasz. Porównanie z pełnym ZUS i ulgą na start.",
  openGraph: {
    title:
      "Mały ZUS Plus w 2026 — kiedy się opłaca, warunki, limity | Fluxlab",
    description:
      "Mały ZUS Plus w 2026: kto może skorzystać, jakie są warunki, limity przychodowe i ile realnie oszczędzasz. Porównanie z pełnym ZUS i ulgą na start.",
    locale: "pl_PL",
    type: "article",
  },
};

export default function MalyZusPlusArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Mały ZUS Plus — kiedy się opłaca w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Mały ZUS Plus to preferencyjne składki społeczne dla
              przedsiębiorców o niższych przychodach. Pozwala płacić mniej
              niż przy pełnym ZUS, ale ma swoje warunki, limity
              i ograniczenia czasowe. Czy warto z niego korzystać? To
              zależy od przychodów, formy opodatkowania i tego, jak długo
              prowadzisz działalność.
            </p>
          </div>
        </section>

        {/* Co to jest mały ZUS Plus */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Co to jest mały ZUS Plus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mały ZUS Plus to mechanizm, który pozwala przedsiębiorcom
              opłacać składki społeczne od niższej podstawy wymiaru. Zamiast
              standardowej podstawy (60% przeciętnego wynagrodzenia, czyli
              5 593,20 zł w 2026), podstawa jest wyliczana na podstawie
              dochodu z poprzedniego roku kalendarzowego.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dotyczy to składek: emerytalnej, rentowej, chorobowej
              i wypadkowej. Nie dotyczy składki zdrowotnej — ta jest
              liczona niezależnie, według zasad właściwych dla danej formy
              opodatkowania.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podstawowa idea jest prosta: jeśli zarabiasz mniej, płacisz
              mniejsze składki społeczne. Dzięki temu więcej zostaje
              w kieszeni na bieżącą działalność. Ceną jest jednak niższa
              podstawa do wyliczenia przyszłej emerytury.
            </p>
          </div>
        </section>

        {/* Kto może skorzystać */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kto może skorzystać z małego ZUS Plus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mały ZUS Plus nie jest dostępny dla wszystkich. Musisz spełnić
              kilka warunków jednocześnie:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Przychód z działalności w poprzednim roku kalendarzowym
                nie przekroczył 120 000 zł
              </li>
              <li>
                Prowadziłeś działalność gospodarczą przez co najmniej
                60 dni w poprzednim roku kalendarzowym
              </li>
              <li>
                Nie korzystałeś w poprzednim roku z ulgi na start ani
                z preferencyjnego ZUS (tzw. małego ZUS bez &bdquo;Plus&rdquo;)
              </li>
              <li>
                Nie rozliczałeś się w poprzednim roku na karcie podatkowej
                z jednoczesnym zwolnieniem z VAT
              </li>
              <li>
                Nie wykonujesz działalności na rzecz byłego pracodawcy
                (ten sam zakres co na etacie w bieżącym lub poprzednim roku)
              </li>
              <li>
                Łączny okres korzystania z małego ZUS Plus nie przekroczył
                36 miesięcy w ciągu ostatnich 60 miesięcy
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Limit 36 miesięcy w ciągu 60 oznacza, że po 3 latach
              preferencyjnych składek musisz wrócić do pełnego ZUS na
              co najmniej 2 lata, zanim ponownie skorzystasz z ulgi.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Limit przychodowy 120 000 zł dotyczy przychodu, nie dochodu.
              Jeśli masz wysokie koszty i niski dochód, ale przychód
              przekracza 120 tys. — nie skorzystasz.
            </p>
          </div>
        </section>

        {/* Ile można zaoszczędzić */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ile można zaoszczędzić na małym ZUS Plus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy pełnym ZUS podstawa wymiaru składek społecznych wynosi
              60% przeciętnego wynagrodzenia, czyli 5 593,20 zł w 2026 roku.
              Łączne składki społeczne (bez zdrowotnej) od tej podstawy
              to ok. 1 773 zł miesięcznie.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na małym ZUS Plus podstawa jest wyliczana z dochodu
              z poprzedniego roku. Formuła jest następująca: dochód roczny
              dzielony przez liczbę dni prowadzenia działalności, pomnożony
              przez 30 — ale nie mniej niż 30% minimalnego wynagrodzenia.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Przykład: dochód 5 000 zł/mies. w poprzednim roku
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Roczny dochód: 60 000 zł. Przy 365 dniach działalności
              podstawa wymiaru: (60 000 / 365) × 30 = ok. 4 932 zł.
              Ale jest ograniczenie — podstawa nie może przekroczyć 60%
              przeciętnego wynagrodzenia (5 593,20 zł) i nie może być
              niższa niż 30% minimalnego wynagrodzenia (1 447,80 zł).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy dochodzie 5 000 zł/mies. podstawa wyniesie ok.
              4 932 zł. Składki społeczne od tej podstawy to ok.
              1 563 zł miesięcznie.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Pełny ZUS: ok. 1 773 zł/mies. składek społecznych</li>
              <li>Mały ZUS Plus (dochód 5 000/mies.): ok. 1 563 zł/mies.</li>
              <li>Oszczędność: ok. 210 zł/mies. (2 520 zł/rok)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy niższym dochodzie oszczędności są większe. Przy dochodzie
              3 000 zł/mies. podstawa spada do ok. 2 959 zł, a składki
              do ok. 937 zł — oszczędność rośnie do ok. 836 zł miesięcznie
              (ponad 10 000 zł rocznie).
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sprawdź różnicę między pełnym i małym ZUS
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

        {/* Mały ZUS Plus vs pełny ZUS vs ulga na start */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Mały ZUS Plus vs pełny ZUS vs ulga na start
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przedsiębiorcy mają do wyboru trzy warianty składek
              społecznych. Każdy ma inne warunki, inne kwoty i inne
              konsekwencje.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Ulga na start (pierwsze 6 miesięcy)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Brak składek społecznych (emerytalna, rentowa, chorobowa, wypadkowa)</li>
              <li>Płacisz tylko składkę zdrowotną</li>
              <li>Dostępna przez 6 pełnych miesięcy od rozpoczęcia działalności</li>
              <li>Warunek: pierwsza działalność lub przerwa min. 60 miesięcy</li>
              <li>Brak wpływu na emeryturę (brak składek = brak kapitału)</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Preferencyjny ZUS (kolejne 24 miesiące)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Podstawa: 30% minimalnego wynagrodzenia (1 447,80 zł w 2026)</li>
              <li>Składki społeczne ok. 459 zł/mies. (bez chorobowej)</li>
              <li>Dostępny przez 24 miesiące po uldze na start</li>
              <li>Znacznie niższe składki niż pełny ZUS</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Mały ZUS Plus (do 36 miesięcy w ciągu 60)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Podstawa wyliczana z dochodu z poprzedniego roku</li>
              <li>Wymaga przychodu ≤ 120 000 zł w poprzednim roku</li>
              <li>Składki zależą od indywidualnej sytuacji</li>
              <li>Dostępny po zakończeniu preferencyjnego ZUS</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Pełny ZUS
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Podstawa: 60% przeciętnego wynagrodzenia (5 593,20 zł w 2026)</li>
              <li>Składki społeczne ok. 1 773 zł/mies.</li>
              <li>Obowiązuje gdy nie przysługują ulgi</li>
              <li>Najwyższe składki, ale też najwyższa podstawa emerytalna</li>
            </ul>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Typowa ścieżka nowego przedsiębiorcy: 6 miesięcy ulgi na
              start → 24 miesiące preferencyjnego ZUS → mały ZUS Plus
              (jeśli spełnia warunki) → pełny ZUS. Łącznie ponad 5 lat
              obniżonych składek.
            </p>
          </div>
        </section>

        {/* Kiedy mały ZUS Plus się NIE opłaca */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy mały ZUS Plus się NIE opłaca
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Mały ZUS Plus nie jest zawsze korzystny. Są sytuacje, w których
              lepiej płacić pełne składki:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Gdy Twój dochód jest na tyle wysoki, że podstawa z małego
                ZUS Plus i tak zbliża się do pełnego ZUS — oszczędność jest
                minimalna
              </li>
              <li>
                Gdy zbliżasz się do wieku emerytalnego — niższe składki
                oznaczają niższą emeryturę, a czas na &bdquo;nadrobienie&rdquo;
                jest krótki
              </li>
              <li>
                Gdy zależy Ci na wyższym zasiłku chorobowym lub macierzyńskim
                — ich wysokość zależy od podstawy wymiaru składek
              </li>
              <li>
                Gdy planujesz kredyt hipoteczny — banki patrzą na
                deklarowaną podstawę wymiaru jako miernik dochodów
              </li>
              <li>
                Gdy przychód zbliża się do 120 000 zł — możesz stracić
                prawo do ulgi w kolejnym roku
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Warto też pamiętać, że mały ZUS Plus to decyzja z
              konsekwencjami długoterminowymi. 36 miesięcy niższych
              składek to 36 miesięcy niższego kapitału emerytalnego.
              Przy obecnym systemie emerytalnym każdy rok się liczy.
            </p>
          </div>
        </section>

        {/* Jak złożyć wniosek */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak złożyć wniosek o mały ZUS Plus
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zgłoszenie do małego ZUS Plus składa się przez deklarację
              ZUS DRA z kodem tytułu ubezpieczenia 0590xx lub 0592xx.
              Termin zgłoszenia to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Do 31 stycznia danego roku — jeśli kontynuujesz
                działalność i chcesz skorzystać z małego ZUS Plus od
                początku roku
              </li>
              <li>
                W ciągu 7 dni od dnia spełnienia warunków — jeśli
                warunki spełniłeś w trakcie roku (np. po zakończeniu
                preferencyjnego ZUS)
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wniosek składa się elektronicznie przez PUE ZUS (eZUS) lub
              osobiście w oddziale ZUS. Do deklaracji trzeba dołączyć
              informację o rocznym przychodzie i dochodzie z poprzedniego
              roku (formularz ZUS DRA cz. II lub ZUS RCA cz. II).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli spóźnisz się z terminem, tracisz prawo do małego ZUS
              Plus na cały rok. Nie ma możliwości zgłoszenia wstecznego.
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
              Mały ZUS Plus to realna oszczędność na składkach społecznych
              dla przedsiębiorców z przychodem do 120 000 zł rocznie.
              Przy niskich dochodach oszczędność sięga kilkuset złotych
              miesięcznie. Ale ma swoje warunki: limit przychodowy, limit
              czasowy (36 miesięcy w ciągu 60) i konsekwencje emerytalne.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Decyzja o skorzystaniu z małego ZUS Plus powinna być częścią
              szerszej kalkulacji — uwzględniającej formę opodatkowania,
              składkę zdrowotną i cele długoterminowe. Nie jest to
              automatycznie najlepsza opcja dla każdego.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Najważniejsze: nie przegap terminu zgłoszenia (31 stycznia
              lub 7 dni od spełnienia warunków). Bez zgłoszenia nie ma
              ulgi.
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
                  Czy mały ZUS Plus obniża składkę zdrowotną?
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
                  Nie. Mały ZUS Plus dotyczy wyłącznie składek społecznych
                  (emerytalna, rentowa, chorobowa, wypadkowa). Składka
                  zdrowotna jest liczona niezależnie, według zasad
                  właściwych dla wybranej formy opodatkowania.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Jak długo można korzystać z małego ZUS Plus?
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
                  Maksymalnie 36 miesięcy w ciągu ostatnich 60 miesięcy.
                  Po wyczerpaniu limitu trzeba wrócić do pełnego ZUS na
                  co najmniej 24 miesiące, zanim ponownie można skorzystać
                  z ulgi.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy mały ZUS Plus wpływa na emeryturę?
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
                  Tak. Niższe składki społeczne oznaczają niższą podstawę
                  wymiaru składki emerytalnej. W konsekwencji na koncie
                  emerytalnym w ZUS gromadzi się mniej kapitału, co obniża
                  przyszłą emeryturę.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy mogę łączyć mały ZUS Plus z ryczałtem?
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
                  Tak. Mały ZUS Plus dotyczy składek społecznych i jest
                  niezależny od formy opodatkowania. Możesz łączyć go
                  z ryczałtem, podatkiem liniowym lub skalą podatkową.
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
                Chcesz policzyć, ile zaoszczędzisz?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sprawdź kalkulator lub umów się na bezpłatną konsultację.
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
                      href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                      className="text-accent hover:underline"
                    >
                      Jak liczyć składkę zdrowotną w JDG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/vat-w-jdg-kiedy-warto"
                      className="text-accent hover:underline"
                    >
                      VAT w JDG — kiedy warto być vatowcem
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
                name: "Czy mały ZUS Plus obniża składkę zdrowotną?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nie. Mały ZUS Plus dotyczy wyłącznie składek społecznych (emerytalna, rentowa, chorobowa, wypadkowa). Składka zdrowotna jest liczona niezależnie, według zasad właściwych dla wybranej formy opodatkowania.",
                },
              },
              {
                "@type": "Question",
                name: "Jak długo można korzystać z małego ZUS Plus?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maksymalnie 36 miesięcy w ciągu ostatnich 60 miesięcy. Po wyczerpaniu limitu trzeba wrócić do pełnego ZUS na co najmniej 24 miesiące, zanim ponownie można skorzystać z ulgi.",
                },
              },
              {
                "@type": "Question",
                name: "Czy mały ZUS Plus wpływa na emeryturę?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak. Niższe składki społeczne oznaczają niższą podstawę wymiaru składki emerytalnej. W konsekwencji na koncie emerytalnym w ZUS gromadzi się mniej kapitału, co obniża przyszłą emeryturę.",
                },
              },
              {
                "@type": "Question",
                name: "Czy mogę łączyć mały ZUS Plus z ryczałtem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak. Mały ZUS Plus dotyczy składek społecznych i jest niezależny od formy opodatkowania. Możesz łączyć go z ryczałtem, podatkiem liniowym lub skalą podatkową.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
