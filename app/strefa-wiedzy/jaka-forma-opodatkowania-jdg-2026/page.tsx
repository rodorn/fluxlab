import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Jaka forma opodatkowania JDG w 2026? Porównanie skali, liniowego i ryczałtu | Fluxlab",
  description:
    "Którą formę opodatkowania wybrać w 2026: skalę podatkową, podatek liniowy czy ryczałt? Kryteria wyboru, progi, składka zdrowotna i pułapki.",
  openGraph: {
    title:
      "Jaka forma opodatkowania JDG w 2026? Porównanie skali, liniowego i ryczałtu | Fluxlab",
    description:
      "Którą formę opodatkowania wybrać w 2026: skalę podatkową, podatek liniowy czy ryczałt? Kryteria wyboru, progi, składka zdrowotna i pułapki.",
    locale: "pl_PL",
    type: "article",
  },
};

export default function JakaFormaOpodatkowaniaJdgArticle() {
  const faqItems = [
    {
      question: "Czy mogę zmienić formę opodatkowania w trakcie roku?",
      answer:
        "Nie. Formę opodatkowania można zmienić tylko od 1 stycznia kolejnego roku. Wniosek (lub aktualizację CEIDG) należy złożyć do 20 lutego roku, od którego ma obowiązywać nowa forma.",
    },
    {
      question:
        "Która forma jest najlepsza przy przychodzie 15 000 zł miesięcznie?",
      answer:
        "To zależy przede wszystkim od poziomu kosztów i stawki ryczałtu dla Twojej branży. Jeśli masz niskie koszty i stawkę ryczałtu 12% lub niższą, ryczałt może wygrać. Jeśli masz wysokie koszty — liniowy lub skala będą korzystniejsze. Najlepiej sprawdzić to w kalkulatorze na konkretnych liczbach.",
    },
    {
      question: "Czy ryczałt jest zawsze najtańszy?",
      answer:
        "Nie. Ryczałt nie pozwala odliczać kosztów uzyskania przychodu. Jeśli masz wysokie koszty (np. zakup sprzętu, leasing samochodu, materiały), to podatek od pełnego przychodu może być wyższy niż podatek od dochodu na liniowym lub skali.",
    },
    {
      question: "Czy na liniowym mogę odliczyć składkę zdrowotną?",
      answer:
        "Tak. Na podatku liniowym składka zdrowotna wynosi 4,9% dochodu i można ją odliczyć od podstawy opodatkowania do limitu 12 900 zł rocznie.",
    },
    {
      question: "Czy warto konsultować wybór z księgowym?",
      answer:
        "Tak, szczególnie jeśli masz złożoną sytuację — np. kilka źródeł dochodu, rozliczenie z małżonkiem, planowane inwestycje lub zmianę branży. Księgowy pomoże uwzględnić niuanse, które kalkulator nie zawsze obejmie.",
    },
  ];

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jaka forma opodatkowania JDG w 2026?
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Wybór formy opodatkowania to jedna z najważniejszych decyzji
              finansowych w jednoosobowej działalności gospodarczej. W 2026
              roku dostępne są trzy opcje: skala podatkowa, podatek liniowy
              i ryczałt ewidencjonowany. Każda ma inne zasady, inne progi
              i inne konsekwencje dla portfela. Ten artykuł pomoże Ci
              zrozumieć różnice i wybrać świadomie.
            </p>
          </div>
        </section>

        {/* Trzy formy opodatkowania JDG */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Trzy formy opodatkowania JDG — krótkie podsumowanie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W 2026 roku przedsiębiorca prowadzący jednoosobową działalność
              gospodarczą może wybrać jedną z trzech form opodatkowania.
              Każda działa inaczej i każda ma inne konsekwencje dla
              składki zdrowotnej, możliwości odliczania kosztów
              i końcowego obciążenia podatkowego.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Skala podatkowa
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Stawki: 12% do 120 000 zł dochodu, 32% powyżej
              </li>
              <li>Koszty uzyskania przychodu: tak, odliczalne</li>
              <li>
                Składka zdrowotna: 9% dochodu, nieodliczalna od podatku
              </li>
              <li>Kwota wolna: 30 000 zł</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Podatek liniowy
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stawka: stała 19% od dochodu</li>
              <li>Koszty uzyskania przychodu: tak, odliczalne</li>
              <li>
                Składka zdrowotna: 4,9% dochodu, odliczalna do limitu
                12 900 zł rocznie
              </li>
              <li>Kwota wolna: brak</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Ryczałt ewidencjonowany
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Stawki: od 2% do 17% od przychodu (zależnie od rodzaju
                działalności)
              </li>
              <li>Koszty uzyskania przychodu: nie, brak odliczenia</li>
              <li>
                Składka zdrowotna: zryczałtowana, zależna od progu
                przychodu (ok. 420–940 zł miesięcznie w 2026)
              </li>
              <li>Kwota wolna: brak</li>
            </ul>
          </div>
        </section>

        {/* Skala podatkowa */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Skala podatkowa — kiedy ma sens
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Skala podatkowa to domyślna forma opodatkowania. Jeśli nie
              wybierzesz innej, automatycznie rozliczasz się na skali.
              Jej główna przewaga to kwota wolna od podatku — w 2026
              roku wynosi 30 000 zł. Oznacza to, że od pierwszych
              30 000 zł dochodu nie płacisz podatku dochodowego wcale.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Skala ma sens przede wszystkim, gdy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Twój roczny dochód nie przekracza 120 000 zł — wtedy
                płacisz tylko 12%
              </li>
              <li>
                Chcesz rozliczać się wspólnie z małżonkiem — to możliwe
                tylko na skali
              </li>
              <li>
                Masz umiarkowane koszty, ale nie na tyle niskie, żeby
                ryczałt był korzystniejszy
              </li>
              <li>Zależy Ci na kwocie wolnej 30 000 zł</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wadą skali jest wysoka składka zdrowotna — 9% dochodu,
              której nie można odliczyć od podatku. Przy wyższych
              dochodach to realnie zwiększa łączne obciążenie.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Szczegółowe porównanie skali z podatkiem liniowym znajdziesz
              w artykule{" "}
              <Link
                href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                className="text-accent hover:underline"
              >
                Skala czy liniowy — porównanie dla JDG w 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Podatek liniowy */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Podatek liniowy — kiedy ma sens
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podatek liniowy oznacza stałą stawkę 19% od dochodu,
              niezależnie od jego wysokości. Nie ma kwoty wolnej, nie ma
              progów — za to jest przewidywalność. Wiesz z góry, ile
              procent oddasz.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Liniowy wygrywa, gdy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Twój dochód przekracza ok. 100–120 tys. zł rocznie — wtedy
                na skali wpadasz w stawkę 32%
              </li>
              <li>
                Masz wysokie koszty uzyskania przychodu (sprzęt, samochód,
                podwykonawcy)
              </li>
              <li>
                Składka zdrowotna 4,9% z odliczeniem do 12 900 zł jest
                dla Ciebie korzystniejsza niż 9% bez odliczenia na skali
              </li>
              <li>
                Nie potrzebujesz rozliczenia z małżonkiem ani kwoty wolnej
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Główna wada: brak kwoty wolnej. Przy niższych dochodach
              (poniżej 100 tys. zł) skala podatkowa zwykle wychodzi
              korzystniej.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Porównanie liniowego z ryczałtem znajdziesz w{" "}
              <Link
                href="/strefa-wiedzy/ryczalt-czy-liniowy"
                className="text-accent hover:underline"
              >
                Ryczałt czy liniowy — co się bardziej opłaca w 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Ryczałt ewidencjonowany */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ryczałt ewidencjonowany — kiedy ma sens
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt to podatek od przychodu, nie od dochodu. Nie
              odliczasz kosztów uzyskania przychodu — płacisz procent od
              tego, co zarobisz. Stawka zależy od rodzaju działalności
              i waha się od 2% do 17%.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt ma sens, gdy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Masz niskie koszty uzyskania przychodu — poniżej
                20–30% przychodu
              </li>
              <li>
                Twoja stawka ryczałtu jest niska (np. 8,5% lub 12%)
              </li>
              <li>
                Nie planujesz dużych inwestycji do odliczenia (sprzęt,
                samochód)
              </li>
              <li>
                Chcesz prostoty — ryczałt ma uproszczoną ewidencję
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dodatkowa zaleta: składka zdrowotna na ryczałcie jest
              zryczałtowana i nie rośnie proporcjonalnie do przychodu.
              Przy wysokich przychodach może być znacząco niższa niż na
              skali (9% dochodu) czy liniowym (4,9% dochodu).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Główna wada: brak odliczenia kosztów. Jeśli masz wysokie
              koszty, to płacisz podatek od pieniędzy, które tak
              naprawdę wydałeś.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Więcej o porównaniu z liniowym:{" "}
              <Link
                href="/strefa-wiedzy/ryczalt-czy-liniowy"
                className="text-accent hover:underline"
              >
                Ryczałt czy liniowy — co się bardziej opłaca w 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Składka zdrowotna */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Składka zdrowotna — klucz do porównania
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wybór formy opodatkowania to nie tylko kwestia stawki
              podatkowej. Składka zdrowotna w 2026 roku działa zupełnie
              inaczej na każdej z trzech form i potrafi zmienić wynik
              porównania o kilka tysięcy złotych rocznie.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Skala podatkowa
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              9% dochodu. Nie można jej odliczyć od podatku ani od
              podstawy opodatkowania. To realne zwiększenie łącznego
              obciążenia — przy dochodzie 150 000 zł to aż 13 500 zł
              rocznie.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Podatek liniowy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              4,9% dochodu. Można ją odliczyć od podstawy opodatkowania,
              ale tylko do limitu 12 900 zł rocznie. To sprawia, że
              efektywna składka jest niższa, a łączne obciążenie
              bardziej przewidywalne.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Ryczałt ewidencjonowany
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zryczałtowana, zależna od progu rocznego przychodu.
              Nie rośnie proporcjonalnie, co przy wyższych przychodach
              daje znaczącą oszczędność. Można ją częściowo odliczyć
              (50% zapłaconej składki).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Szczegółowe obliczenia składki zdrowotnej dla każdej formy
              znajdziesz w{" "}
              <Link
                href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                className="text-accent hover:underline"
              >
                Jak liczyć składkę zdrowotną w JDG
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Jak wybrać formę */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak wybrać formę — praktyczny schemat
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nie istnieje jedna najlepsza forma opodatkowania. Ale
              istnieje logiczny schemat, który pomaga zawęzić wybór:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Krok 1: Oceń swoje koszty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli Twoje koszty uzyskania przychodu przekraczają
              30–40% przychodu, ryczałt raczej odpada. Zostają skala
              i liniowy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Krok 2: Sprawdź swoją stawkę ryczałtu
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli koszty są niskie, a Twoja stawka ryczałtu wynosi 12%
              lub mniej — ryczałt jest mocnym kandydatem. Przy stawce
              15–17% przewaga ryczałtu maleje.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Krok 3: Oszacuj roczny dochód
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli dochód nie przekracza 120 000 zł — skala podatkowa
              z 12% stawką i kwotą wolną 30 000 zł może wygrać z liniowym.
              Powyżej tego progu liniowy 19% zwykle jest korzystniejszy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Krok 4: Uwzględnij składkę zdrowotną
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przelicz łączne obciążenie: podatek plus składka zdrowotna.
              Sam podatek nie daje pełnego obrazu. Różnica w składce
              zdrowotnej potrafi zmienić wynik o kilka tysięcy złotych.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Krok 5: Policz na swoich liczbach
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Schemat daje kierunek, ale dokładny wynik zależy od
              Twoich konkretnych liczb. Użyj kalkulatora, żeby
              porównać wszystkie trzy formy naraz.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sprawdź wynik na swoich liczbach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Porównaj skalę, liniowy i ryczałt w jednym miejscu —
                z uwzględnieniem składki zdrowotnej i kosztów.
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

        {/* Najczęstsze pułapki */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze pułapki przy wyborze formy
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Ignorowanie składki zdrowotnej
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Największy błąd. Wielu przedsiębiorców porównuje tylko
              stawki podatkowe: 12% vs 19% vs ryczałt. Ale składka
              zdrowotna potrafi zmienić ranking form. Na skali 9%
              nieodliczalna, na liniowym 4,9% częściowo odliczalna,
              na ryczałcie zryczałtowana — to fundamentalna różnica.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Zapominanie o kosztach
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt wygląda atrakcyjnie, dopóki nie policzysz, ile
              kosztów tracisz. Jeśli wydajesz 5 000 zł miesięcznie na
              koszty prowadzenia działalności, na ryczałcie te koszty
              nie pomniejszają podstawy opodatkowania. Na skali
              i liniowym — tak.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Patrzenie tylko na stawkę
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stawka 12% na ryczałcie brzmi lepiej niż 19% na liniowym.
              Ale ryczałt liczy się od przychodu, a liniowy od dochodu.
              Jeśli masz 40% kosztów, efektywna stawka liniowego od
              przychodu to ok. 11,4% — mniej niż 12% ryczałtu.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Brak aktualizacji co roku
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sytuacja finansowa zmienia się z roku na rok. Forma, która
              była optymalna w 2025, niekoniecznie będzie optymalna
              w 2026. Warto przeliczać co roku przed 20 lutego.
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
              Nie istnieje jedna najlepsza forma opodatkowania JDG w 2026.
              Skala podatkowa wygrywa przy niższych dochodach i wspólnym
              rozliczeniu z małżonkiem. Podatek liniowy — przy
              wysokich dochodach i dużych kosztach. Ryczałt — przy
              niskich kosztach i korzystnej stawce.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kluczem jest policzenie łącznego obciążenia: podatek plus
              składka zdrowotna, z uwzględnieniem kosztów uzyskania
              przychodu. Sam procent stawki nie wystarczy.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wyboru dokonujesz raz w roku — do 20 lutego. Warto
              poświęcić godzinę na przeliczenie wariantów, zamiast
              tracić tysiące złotych przez cały rok.
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

        {/* Final CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Potrzebujesz pomocy w wyborze formy opodatkowania?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Skorzystaj z kalkulatora lub skontaktuj się z nami —
                pomożemy dobrać optymalną formę do Twojej sytuacji.
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
                      href="/strefa-wiedzy/ryczalt-czy-liniowy"
                      className="text-accent hover:underline"
                    >
                      Ryczałt czy liniowy — co się bardziej opłaca w 2026
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/skala-czy-liniowy-jdg"
                      className="text-accent hover:underline"
                    >
                      Skala czy liniowy — porównanie dla JDG w 2026
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
                      href="/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca"
                      className="text-accent hover:underline"
                    >
                      Mały ZUS Plus — kiedy się opłaca
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/strefa-wiedzy/vat-w-jdg-kiedy-warto"
                      className="text-accent hover:underline"
                    >
                      VAT w JDG — kiedy warto być VATowcem
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
                      Kalkulator JDG 2026
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
