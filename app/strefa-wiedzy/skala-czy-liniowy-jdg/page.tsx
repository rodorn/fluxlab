import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Skala czy liniowy dla JDG w 2026? Porównanie i próg opłacalności | Fluxlab",
  description:
    "Porównanie skali podatkowej i podatku liniowego dla JDG w 2026. Kwota wolna, progi, składka zdrowotna, realne scenariusze i kalkulator.",
  openGraph: {
    title:
      "Skala czy liniowy dla JDG w 2026? Porównanie i próg opłacalności | Fluxlab",
    description:
      "Porównanie skali podatkowej i podatku liniowego dla JDG w 2026. Kwota wolna, progi, składka zdrowotna, realne scenariusze i kalkulator.",
    locale: "pl_PL",
    type: "article",
  },
};

export default function SkalaCzyLiniowyJdgArticle() {
  const faqItems = [
    {
      question: "Od jakiego dochodu liniowy się opłaca?",
      answer:
        "Zwykle od ok. 100-120 tys. zł rocznego dochodu. Przy tym poziomie stawka efektywna na skali (z uwzględnieniem kwoty wolnej i progu 32%) zaczyna przekraczać 19% liniowego. Ale dokładny próg zależy od składki zdrowotnej i indywidualnej sytuacji.",
    },
    {
      question: "Czy na skali mogę rozliczać się z małżonkiem?",
      answer:
        "Tak, to jedna z głównych przewag skali podatkowej. Wspólne rozliczenie pozwala podzielić dochód na dwoje, co obniża efektywną stawkę podatkową. Jest szczególnie korzystne, gdy jeden z małżonków zarabia znacznie więcej niż drugi.",
    },
    {
      question: "Czy składka zdrowotna na liniowym jest niższa?",
      answer:
        "Tak. Na liniowym wynosi 4,9% dochodu, a na skali 9% dochodu. Dodatkowo na liniowym można odliczyć składkę zdrowotną od podstawy opodatkowania do limitu 12 900 zł rocznie. Na skali nie ma żadnego odliczenia.",
    },
    {
      question: "Czy mogę zmienić ze skali na liniowy w ciągu roku?",
      answer:
        "Nie. Zmiana formy opodatkowania jest możliwa tylko od 1 stycznia kolejnego roku. Oświadczenie lub aktualizację CEIDG trzeba złożyć do 20 lutego roku, od którego ma obowiązywać nowa forma.",
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
              Skala czy liniowy — porównanie dla JDG w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Skala podatkowa i podatek liniowy to dwie formy opodatkowania
              oparte na dochodzie. Obie pozwalają odliczać koszty, ale
              różnią się stawkami, kwotą wolną i zasadami składki
              zdrowotnej. Próg, przy którym liniowy zaczyna wygrywać ze
              skalą, nie jest stały — zależy od składek i kosztów. Ten
              artykuł pomaga go znaleźć.
            </p>
          </div>
        </section>

        {/* Skala podatkowa w 2026 */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Skala podatkowa w 2026 — zasady
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Skala podatkowa to domyślna forma opodatkowania w Polsce.
              Jeśli nie wybierzesz innej, automatycznie rozliczasz się
              na skali. Oto jej kluczowe parametry w 2026 roku:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Kwota wolna od podatku: 30 000 zł — od pierwszych
                30 000 zł dochodu nie płacisz podatku dochodowego
              </li>
              <li>
                I próg: 12% od dochodu do 120 000 zł (po odliczeniu
                kwoty wolnej)
              </li>
              <li>
                II próg: 32% od dochodu powyżej 120 000 zł
              </li>
              <li>
                Koszty uzyskania przychodu: tak, pełne odliczenie
              </li>
              <li>
                Składka zdrowotna: 9% dochodu, nieodliczalna od podatku
                ani od podstawy opodatkowania
              </li>
              <li>
                Wspólne rozliczenie z małżonkiem: tak, dostępne
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kwota wolna 30 000 zł to istotna przewaga. Oznacza, że
              pierwsze 30 000 zł dochodu jest efektywnie nieopodatkowane.
              Przy dochodzie 120 000 zł efektywna stawka podatkowa
              wynosi ok. 8,8% — znacznie mniej niż nominalne 12%.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wadą jest wysoka i nieodliczalna składka zdrowotna — 9%
              dochodu. Przy dochodzie 150 000 zł to 13 500 zł rocznie,
              które nie pomniejszają podatku.
            </p>
          </div>
        </section>

        {/* Podatek liniowy w 2026 */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Podatek liniowy w 2026 — zasady
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podatek liniowy to stała stawka niezależna od wysokości
              dochodu. Nie ma progów, nie ma kwoty wolnej — za to
              jest prostota i przewidywalność.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stawka: stała 19% od dochodu</li>
              <li>Kwota wolna: brak</li>
              <li>
                Koszty uzyskania przychodu: tak, pełne odliczenie
              </li>
              <li>
                Składka zdrowotna: 4,9% dochodu (minimum ok. 315 zł
                miesięcznie)
              </li>
              <li>
                Odliczenie składki zdrowotnej: tak, od podstawy
                opodatkowania do limitu 12 900 zł rocznie
              </li>
              <li>
                Wspólne rozliczenie z małżonkiem: nie, niedostępne
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Brak kwoty wolnej oznacza, że od pierwszej złotówki
              dochodu płacisz 19%. Ale niższa składka zdrowotna (4,9%
              vs 9%) i możliwość jej odliczenia częściowo
              rekompensują tę wadę przy wyższych dochodach.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy dochodzie 200 000 zł: składka zdrowotna na skali to
              18 000 zł (nieodliczalna), na liniowym to 9 800 zł
              (odliczalna do 12 900 zł). Różnica w samej składce:
              ponad 8 000 zł.
            </p>
          </div>
        </section>

        {/* Próg opłacalności */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Próg opłacalności
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Próg, przy którym liniowy zaczyna wygrywać ze skalą, to
              kluczowe pytanie. Odpowiedź nie jest jednoznaczna, bo
              zależy od składki zdrowotnej, ale można podać orientacyjne
              ramy.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Sam podatek (bez składki zdrowotnej)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na skali: do 120 000 zł dochodu płacisz 12% minus kwota
              wolna. Efektywna stawka przy 120 000 zł to ok. 8,8%.
              Przy 150 000 zł efektywna stawka rośnie do ok. 14,4%
              (wchodzisz w próg 32%). Na liniowym: zawsze 19%.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Gdyby liczyć sam podatek, próg opłacalności wynosiłby
              ok. 135–140 tys. zł dochodu rocznie.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Podatek + składka zdrowotna
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zdrowotna przesuwa próg w dół. Na skali jest
              wyższa (9% vs 4,9%) i nieodliczalna. To sprawia, że
              łączne obciążenie na skali rośnie szybciej.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Po uwzględnieniu składki zdrowotnej, próg opłacalności
              przesuwa się do ok. 100–120 tys. zł dochodu rocznie.
              Przy dochodzie powyżej 120 tys. zł liniowy jest
              niemal zawsze korzystniejszy, jeśli nie potrzebujesz
              wspólnego rozliczenia z małżonkiem.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Obliczenie na konkretnym przykładzie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dochód 110 000 zł rocznie:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Skala: podatek = 12% x (110 000 - 30 000) = 9 600 zł.
                Składka zdrowotna = 9% x 110 000 = 9 900 zł. Łącznie:
                19 500 zł.
              </li>
              <li>
                Liniowy: składka zdrowotna = 4,9% x 110 000 = 5 390 zł.
                Odliczenie zdrowotnej: 5 390 zł (mieści się w limicie).
                Podatek = 19% x (110 000 - 5 390) = 19 876 zł.
                Łącznie: 25 266 zł.
              </li>
              <li>
                Wynik: skala wygrywa o ok. 5 766 zł.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dochód 150 000 zł rocznie:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Skala: podatek = 12% x 90 000 + 32% x 30 000 =
                10 800 + 9 600 = 20 400 zł. Składka zdrowotna = 9% x
                150 000 = 13 500 zł. Łącznie: 33 900 zł.
              </li>
              <li>
                Liniowy: składka zdrowotna = 4,9% x 150 000 = 7 350 zł.
                Odliczenie zdrowotnej: 7 350 zł. Podatek = 19% x
                (150 000 - 7 350) = 27 104 zł. Łącznie: 34 454 zł.
              </li>
              <li>
                Wynik: skala minimalnie tańsza (o ok. 554 zł), ale przy
                dochodzie 160 000 zł liniowy już wygrywa.
              </li>
            </ul>
          </div>
        </section>

        {/* Porównanie na przykładach */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Porównanie na przykładach
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 1: Dochód 80 000 zł rocznie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy dochodzie 80 000 zł skala podatkowa wygrywa
              zdecydowanie. Kwota wolna 30 000 zł obniża podstawę do
              50 000 zł, a stawka 12% daje podatek 6 000 zł. Na
              liniowym bez kwoty wolnej: 19% x 80 000 = 15 200 zł
              (minus odliczenie zdrowotnej).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Skala: podatek 6 000 zł + zdrowotna 7 200 zł = 13 200 zł
              </li>
              <li>
                Liniowy: zdrowotna 3 920 zł, podatek 19% x (80 000 -
                3 920) = 14 455 zł. Łącznie 18 375 zł.
              </li>
              <li>Wynik: skala oszczędza ok. 5 175 zł.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 2: Dochód 150 000 zł rocznie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy 150 000 zł wchodzisz w II próg skali (32%).
              Różnica w składce zdrowotnej (9% vs 4,9%) zaczyna
              odgrywać kluczową rolę.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Skala: podatek 20 400 zł + zdrowotna 13 500 zł =
                33 900 zł
              </li>
              <li>
                Liniowy: zdrowotna 7 350 zł, podatek 27 104 zł.
                Łącznie 34 454 zł.
              </li>
              <li>
                Wynik: niemal remis. Skala minimalnie tańsza, ale
                różnica jest symboliczna.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Scenariusz 3: Dochód 200 000 zł rocznie
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy 200 000 zł liniowy wygrywa wyraźnie. Wysoki dochód
              powyżej progu 32% na skali i wyższa składka zdrowotna
              przesądzają sprawę.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Skala: podatek 12% x 90 000 + 32% x 80 000 =
                10 800 + 25 600 = 36 400 zł. Zdrowotna 18 000 zł.
                Łącznie 54 400 zł.
              </li>
              <li>
                Liniowy: zdrowotna 9 800 zł, podatek 19% x (200 000 -
                12 900) = 35 549 zł. Łącznie 45 349 zł.
              </li>
              <li>
                Wynik: liniowy oszczędza ok. 9 051 zł rocznie.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sprawdź swój scenariusz w{" "}
              <Link
                href="/kalkulator-podatkowy"
                className="text-accent hover:underline"
              >
                kalkulatorze JDG 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Porównaj na swoich danych
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Wpisz swój dochód — kalkulator pokaże, czy skala czy
                liniowy jest korzystniejszy w Twojej sytuacji.
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

        {/* Składka zdrowotna */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Składka zdrowotna — dlaczego zmienia wynik
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zdrowotna to element, który najczęściej zmienia
              wynik porównania skali z liniowym. Gdyby nie składka
              zdrowotna, skala byłaby korzystniejsza aż do
              dochodu ok. 135–140 tys. zł. Ale składka zdrowotna
              przesuwa ten próg w dół.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Na skali: 9%, nieodliczalna
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zdrowotna na skali wynosi 9% dochodu. Nie można
              jej odliczyć ani od podatku, ani od podstawy
              opodatkowania. To czysty, dodatkowy koszt. Przy dochodzie
              120 000 zł to 10 800 zł rocznie, które po prostu
              znikają z konta.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Na liniowym: 4,9%, częściowo odliczalna
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Na liniowym składka zdrowotna wynosi 4,9% dochodu — niemal
              o połowę mniej. Dodatkowo można ją odliczyć od podstawy
              opodatkowania do limitu 12 900 zł rocznie. To podwójna
              korzyść: niższa składka i częściowy zwrot w postaci
              niższego podatku.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Przykład różnicy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy dochodzie 180 000 zł:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Skala: zdrowotna = 16 200 zł (nieodliczalna)</li>
              <li>
                Liniowy: zdrowotna = 8 820 zł, z czego 8 820 zł
                odliczasz od podstawy (mieści się w limicie 12 900 zł),
                co obniża podatek o ok. 1 676 zł
              </li>
              <li>
                Różnica w składce: 7 380 zł. Plus efekt odliczenia:
                ok. 1 676 zł. Łącznie na korzyść liniowego: ok.
                9 056 zł
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Więcej o zasadach składki zdrowotnej na każdej formie:{" "}
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

        {/* Rozliczenie z małżonkiem */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Rozliczenie z małżonkiem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wspólne rozliczenie z małżonkiem to przewaga dostępna
              wyłącznie na skali podatkowej. Na liniowym nie ma
              takiej możliwości.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jak to działa: łączny dochód obojga małżonków dzieli się
              na pół, a podatek liczy się od połowy — i mnoży przez
              dwa. Efekt: jeśli jeden małżonek zarabia dużo (np.
              powyżej progu 32%), a drugi mało lub wcale, wspólne
              rozliczenie pozwala uniknąć wyższego progu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przykład: Twój dochód to 200 000 zł, małżonek zarabia
              20 000 zł. Łącznie 220 000 zł, podzielone na pół =
              110 000 zł. Oboje mieszczą się w I progu (12%),
              zamiast jednego w II progu (32%).
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Bez wspólnego rozliczenia: podatek od 200 000 zł =
                36 400 zł (12% x 90k + 32% x 80k)
              </li>
              <li>
                Ze wspólnym: podatek od 2 x 110 000 zł = 2 x 9 600 zł
                = 19 200 zł
              </li>
              <li>
                Oszczędność: 17 200 zł na samym podatku
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To ogromna przewaga skali nad liniowym, szczególnie przy
              dużej dysproporcji dochodów między małżonkami. Jeśli to
              Twoja sytuacja, skala może być korzystniejsza nawet
              przy dochodzie powyżej 150 tys. zł.
            </p>
          </div>
        </section>

        {/* Kiedy wybrać skalę, kiedy liniowy */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy wybrać skalę, kiedy liniowy
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Wybierz skalę podatkową, gdy:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Twój roczny dochód nie przekracza 100–120 tys. zł
              </li>
              <li>
                Chcesz rozliczać się wspólnie z małżonkiem
              </li>
              <li>
                Kwota wolna 30 000 zł daje Ci realną korzyść
              </li>
              <li>
                Masz inne dochody opodatkowane na skali (np. umowa
                o pracę) i chcesz je łączyć
              </li>
              <li>
                Planujesz korzystać z ulg podatkowych dostępnych
                na skali (np. ulga na dzieci)
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Wybierz podatek liniowy, gdy:
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Twój roczny dochód przekracza 120–150 tys. zł
              </li>
              <li>
                Nie potrzebujesz wspólnego rozliczenia z małżonkiem
              </li>
              <li>
                Niższa składka zdrowotna (4,9% vs 9%) daje Ci
                realną oszczędność
              </li>
              <li>
                Cenisz przewidywalność — stałe 19% bez progów
              </li>
              <li>
                Nie korzystasz z ulg dostępnych tylko na skali
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W strefie 100–150 tys. zł dochodu wynik jest zbliżony
              i zależy od indywidualnych czynników. Warto policzyć oba
              warianty na swoich liczbach.
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
              Skala podatkowa i podatek liniowy to dwa dobre rozwiązania
              dla różnych poziomów dochodu. Skala wygrywa przy niższych
              dochodach dzięki kwocie wolnej i stawce 12%. Liniowy
              wygrywa przy wyższych dochodach dzięki stałej stawce 19%
              i niższej składce zdrowotnej.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Próg opłacalności to ok. 100–120 tys. zł dochodu rocznie,
              ale składka zdrowotna i możliwość wspólnego rozliczenia
              z małżonkiem mogą go przesunąć w jedną lub drugą stronę.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Najważniejsza rada: nie porównuj samych stawek podatkowych.
              Licz łączne obciążenie — podatek plus składka zdrowotna.
              I policz na swoich liczbach, bo ogólne zasady dają tylko
              kierunek, nie precyzyjną odpowiedź.
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
                Potrzebujesz pomocy w wyborze formy?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Skontaktuj się z nami — pomożemy policzyć i wybrać
                optymalną formę opodatkowania dla Twojej JDG.
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
                      Jaka forma opodatkowania JDG w 2026?
                    </Link>
                  </li>
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
                      href="/strefa-wiedzy/jak-liczyc-zdrowotna-jdg"
                      className="text-accent hover:underline"
                    >
                      Jak liczyć składkę zdrowotną w JDG
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
