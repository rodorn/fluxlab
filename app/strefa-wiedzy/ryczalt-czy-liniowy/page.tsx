import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Ryczałt czy liniowy w 2026? Które opodatkowanie się bardziej opłaca | Fluxlab",
  description:
    "Porównanie ryczałtu i podatku liniowego dla JDG w 2026. Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć na konkretnych liczbach.",
};

export default function RyczaltCzyLiniowyArticle() {
  const faqItems = [
    {
      question: "Czy mogę mieć ryczałt i VAT jednocześnie?",
      answer:
        "Tak. Ryczałt dotyczy podatku dochodowego, a VAT to osobny podatek. Możesz być na ryczałcie i jednocześnie być czynnym podatnikiem VAT. To częsta i sensowna konfiguracja, szczególnie gdy Twoi klienci są VATowcami.",
    },
    {
      question: "Czy zmiana z ryczałtu na liniowy jest trudna?",
      answer:
        "Nie. Wystarczy złożyć aktualizację CEIDG lub oświadczenie do urzędu skarbowego do 20 lutego roku, od którego chcesz zmienić formę. Zmiana obowiązuje od 1 stycznia tego roku.",
    },
    {
      question: "Przy jakiej stawce ryczałtu liniowy zaczyna wygrywać?",
      answer:
        "To zależy od poziomu kosztów. Ogólna zasada: przy stawce ryczałtu 15% lub wyżej i kosztach powyżej 30-40% przychodu, liniowy zwykle wygrywa. Przy niższych stawkach ryczałtu (8,5-12%) i niskich kosztach, ryczałt ma przewagę.",
    },
    {
      question: "Czy freelancer IT powinien wybrać ryczałt?",
      answer:
        "Przy stawce ryczałtu 12% i niskich kosztach (typowe dla freelancera IT pracującego zdalnie) ryczałt zazwyczaj wygrywa. Ale jeśli masz duże koszty — drogi sprzęt, coworking, podróże — warto przeliczyć też liniowy.",
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
              Ryczałt czy liniowy — co się bardziej opłaca w 2026
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ryczałt i podatek liniowy to dwie najpopularniejsze formy
              opodatkowania wśród przedsiębiorców na B2B. Obie brzmią
              prosto: ryczałt od przychodu, liniowy 19% od dochodu. Ale
              diabeł tkwi w szczegółach — składka zdrowotna, koszty,
              VAT i stawka ryczałtu mogą zmienić wynik o kilka tysięcy
              złotych rocznie.
            </p>
          </div>
        </section>

        {/* Ryczałt — jak działa */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ryczałt — jak działa
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt ewidencjonowany to podatek od przychodu. Nie
              odliczasz kosztów uzyskania przychodu — płacisz procent
              od tego, co wpłynęło na konto (pomniejszone o VAT, jeśli
              jesteś VATowcem).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kluczowe cechy ryczałtu w 2026:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Stawki od 2% do 17%, zależne od rodzaju działalności (PKD)
              </li>
              <li>
                Najczęstsze stawki dla B2B: 8,5% (usługi), 12%
                (programowanie, IT), 15% (doradztwo, marketing)
              </li>
              <li>Brak możliwości odliczenia kosztów uzyskania przychodu</li>
              <li>
                Składka zdrowotna zryczałtowana — trzy progi zależne od
                rocznego przychodu (ok. 420, 700 lub 940 zł miesięcznie
                w 2026)
              </li>
              <li>
                Możliwość odliczenia 50% zapłaconej składki zdrowotnej
              </li>
              <li>Uproszczona ewidencja przychodów (bez KPiR)</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt jest prosty w obsłudze i atrakcyjny przy niskich
              kosztach. Ale brak odliczenia kosztów to poważna wada,
              jeśli wydajesz dużo na prowadzenie działalności.
            </p>
          </div>
        </section>

        {/* Liniowy — jak działa */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Liniowy — jak działa
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podatek liniowy to stała stawka 19% od dochodu, czyli od
              przychodu pomniejszonego o koszty uzyskania przychodu.
              Nie ma progów, nie ma kwoty wolnej — ale możesz odliczać
              wszystkie uzasadnione koszty działalności.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kluczowe cechy liniowego w 2026:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Stała stawka 19% od dochodu</li>
              <li>Pełne odliczenie kosztów uzyskania przychodu</li>
              <li>Brak kwoty wolnej od podatku</li>
              <li>
                Składka zdrowotna: 4,9% dochodu (minimum ok. 315 zł
                miesięcznie)
              </li>
              <li>
                Odliczenie składki zdrowotnej od podstawy opodatkowania
                do limitu 12 900 zł rocznie
              </li>
              <li>
                Prowadzenie KPiR (Księga Przychodów i Rozchodów) lub
                księgi rachunkowej
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Liniowy daje przewidywalność i pełną kontrolę nad kosztami.
              Im wyższe koszty, tym niższy dochód, tym niższy podatek
              i niższa składka zdrowotna.
            </p>
          </div>
        </section>

        {/* Kiedy ryczałt wygrywa */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy ryczałt wygrywa
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Ryczałt jest korzystniejszy od liniowego w określonych
              warunkach. Im więcej z poniższych punktów spełniasz, tym
              większa szansa, że ryczałt wygra:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Twoje koszty uzyskania przychodu są niskie — poniżej
                20–30% przychodu
              </li>
              <li>
                Twoja stawka ryczałtu jest niska — 12% lub mniej
              </li>
              <li>
                Nie planujesz dużych zakupów (sprzęt, samochód, remont
                biura)
              </li>
              <li>
                Twój przychód jest na tyle wysoki, że składka zdrowotna
                na liniowym (4,9% dochodu) byłaby wyższa niż
                zryczałtowana na ryczałcie
              </li>
              <li>
                Cenisz prostotę — ryczałt wymaga prostszej ewidencji
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Typowy profil: freelancer IT na B2B, przychód 15–25 tys.
              zł miesięcznie, koszty poniżej 2 000 zł, stawka ryczałtu
              12%. W takim scenariuszu ryczałt zwykle oszczędza od
              kilku do kilkunastu tysięcy złotych rocznie w porównaniu
              z liniowym.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sprawdź na swoich liczbach w{" "}
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

        {/* Kiedy liniowy wygrywa */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy liniowy wygrywa
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Podatek liniowy staje się korzystniejszy, gdy koszty
              zaczynają odgrywać istotną rolę. Liniowy wygrywa, gdy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Koszty uzyskania przychodu przekraczają 30–40%
                przychodu
              </li>
              <li>
                Stawka ryczałtu dla Twojej działalności wynosi 15% lub
                więcej
              </li>
              <li>
                Masz duże wydatki na samochód w leasingu, sprzęt,
                narzędzia, podwykonawców
              </li>
              <li>
                Potrzebujesz odliczać VAT od dużych zakupów (choć VAT
                działa niezależnie od formy PIT)
              </li>
              <li>
                Chcesz odliczać składkę zdrowotną od podstawy
                opodatkowania (do 12 900 zł rocznie)
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Typowy profil: konsultant lub właściciel małej firmy
              usługowej, przychód 20–30 tys. zł miesięcznie, koszty
              6–10 tys. zł (podwykonawcy, samochód, biuro, narzędzia).
              Na ryczałcie zapłaciłby podatek od pełnych 20–30 tys.,
              na liniowym tylko od 10–20 tys.
            </p>
          </div>
        </section>

        {/* Porównanie na przykładach */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Porównanie na przykładach
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Przykład 1: Programista, 15 000 zł/mies., niskie koszty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przychód roczny: 180 000 zł. Koszty: 1 500 zł/mies.
              (18 000 zł/rok). Stawka ryczałtu: 12%.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Ryczałt: podatek 12% x 180 000 = 21 600 zł. Składka
                zdrowotna zryczałtowana ok. 8 400 zł/rok (po
                odliczeniu 50%). Łącznie ok. 30 000 zł.
              </li>
              <li>
                Liniowy: dochód 162 000 zł. Podatek 19% x (162 000 -
                12 900 odliczenie zdrowotnej) = ok. 28 300 zł. Składka
                zdrowotna 4,9% x 162 000 = 7 938 zł. Łącznie ok.
                36 200 zł.
              </li>
              <li>
                Wynik: ryczałt oszczędza ok. 6 200 zł rocznie.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Przykład 2: Konsultant, 20 000 zł/mies., wysokie koszty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przychód roczny: 240 000 zł. Koszty: 8 000 zł/mies.
              (96 000 zł/rok). Stawka ryczałtu: 15%.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Ryczałt: podatek 15% x 240 000 = 36 000 zł. Składka
                zdrowotna ok. 11 300 zł/rok (po odliczeniu 50%).
                Łącznie ok. 47 300 zł.
              </li>
              <li>
                Liniowy: dochód 144 000 zł. Podatek 19% x (144 000 -
                12 900) = ok. 24 900 zł. Składka zdrowotna 4,9% x
                144 000 = 7 056 zł. Łącznie ok. 31 950 zł.
              </li>
              <li>
                Wynik: liniowy oszczędza ok. 15 350 zł rocznie.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Przykład 3: Specjalista, 12 000 zł/mies., średnie koszty
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przychód roczny: 144 000 zł. Koszty: 3 500 zł/mies.
              (42 000 zł/rok). Stawka ryczałtu: 12%.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Ryczałt: podatek 12% x 144 000 = 17 280 zł. Składka
                zdrowotna ok. 8 400 zł/rok. Łącznie ok. 25 680 zł.
              </li>
              <li>
                Liniowy: dochód 102 000 zł. Podatek 19% x (102 000 -
                12 900) = ok. 16 929 zł. Składka zdrowotna 4,9% x
                102 000 = 4 998 zł. Łącznie ok. 21 927 zł.
              </li>
              <li>
                Wynik: liniowy oszczędza ok. 3 750 zł rocznie. Ale
                przy kosztach poniżej 2 500 zł/mies. ryczałt
                zaczyna wygrywać.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Wniosek: próg, przy którym liniowy zaczyna wygrywać z
              ryczałtem, zależy od trzech zmiennych — stawki ryczałtu,
              poziomu kosztów i składki zdrowotnej. Nie da się podać
              jednej uniwersalnej liczby.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Sprawdź na swoich liczbach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Wpisz swój przychód, koszty i stawkę ryczałtu — kalkulator
                pokaże, która forma jest tańsza.
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
              Składka zdrowotna — decydujący czynnik
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Składka zdrowotna w 2026 roku to często ten element, który
              przesądza o wyniku porównania. Na ryczałcie jest
              zryczałtowana i relatywnie niska. Na liniowym wynosi 4,9%
              dochodu, ale można ją częściowo odliczyć.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Kluczowa różnica: na ryczałcie składka nie rośnie
              proporcjonalnie do przychodu (są trzy progi), a na
              liniowym rośnie razem z dochodem. Przy wysokim dochodzie
              i niskich kosztach różnica w składce zdrowotnej może
              wynosić nawet kilka tysięcy złotych rocznie na korzyść
              ryczałtu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Z drugiej strony, jeśli masz wysokie koszty, Twój dochód
              (podstawa składki na liniowym) jest niższy, a składka
              zdrowotna na liniowym odpowiednio mniejsza.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pełne wyjaśnienie zasad składki zdrowotnej na każdej
              formie znajdziesz w{" "}
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

        {/* Najczęstsze błędy */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze błędy
            </h2>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Patrzenie tylko na stawkę
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              12% ryczałtu brzmi lepiej niż 19% liniowego. Ale ryczałt
              liczy się od przychodu, a liniowy od dochodu. Jeśli
              masz 40% kosztów, efektywna stawka liniowego od
              przychodu to 19% x 60% = 11,4%. Mniej niż 12% ryczałtu.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Ignorowanie składki zdrowotnej
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Porównanie samego podatku to za mało. Składka zdrowotna
              to dodatkowe kilka do kilkunastu tysięcy złotych rocznie
              i jej mechanizm jest zupełnie inny na ryczałcie
              i liniowym. Porównanie bez niej jest niepełne.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Zapominanie o kosztach samochodu
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Samochód w leasingu to jeden z najczęstszych kosztów
              w JDG. Na ryczałcie nie odliczysz rat leasingu, paliwa
              ani eksploatacji. Na liniowym — tak. Jeśli samochód
              kosztuje Cię 3 000 zł miesięcznie, to 36 000 zł
              rocznie nieodliczonych kosztów.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Brak przeliczenia co roku
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przychody i koszty zmieniają się z roku na rok. Forma,
              która była optymalna w zeszłym roku, może nie być
              optymalna w tym. Warto przeliczyć przed 20 lutego
              każdego roku.
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
              Ryczałt i liniowy to dwie dobre formy opodatkowania, ale
              dla różnych sytuacji. Ryczałt wygrywa przy niskich
              kosztach i korzystnej stawce. Liniowy wygrywa przy
              wysokich kosztach i droższych stawkach ryczałtu.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Klucz do dobrej decyzji: nie patrzeć na samą stawkę
              podatkową, ale na łączne obciążenie — podatek plus
              składka zdrowotna, z uwzględnieniem kosztów. A najlepiej
              — policzyć na konkretnych liczbach w kalkulatorze.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pamiętaj: zmiana formy jest możliwa raz w roku, do 20
              lutego. To niewiele czasu na decyzję, która wpływa na
              cały rok podatkowy.
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
                Nie wiesz, która forma jest lepsza dla Ciebie?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Skontaktuj się z nami — pomożemy policzyć i wybrać
                optymalną formę opodatkowania.
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
