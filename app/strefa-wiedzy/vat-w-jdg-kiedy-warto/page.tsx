import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "VAT w JDG — kiedy warto być vatowcem w 2026? | Fluxlab",
  description:
    "Kiedy warto zarejestrować się jako czynny VAT w JDG? Zwolnienie podmiotowe, próg 200 000 zł, wpływ na cashflow, koszty i współpracę z firmami.",
  openGraph: {
    title:
      "VAT w JDG — kiedy warto być vatowcem w 2026? | Fluxlab",
    description:
      "Kiedy warto zarejestrować się jako czynny VAT w JDG? Zwolnienie podmiotowe, próg 200 000 zł, wpływ na cashflow, koszty i współpracę z firmami.",
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
    canonical: "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
  },
};

export default function VatWJdgArticle() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Strefa wiedzy", href: "/strefa-wiedzy" }, { label: "VAT w JDG — kiedy warto" }]} />
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              VAT w JDG — kiedy warto być vatowcem
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              VAT to nie tylko dodatkowy podatek — to też narzędzie, które
              pozwala odliczać podatek naliczony od zakupów. Dla jednych
              firm rejestracja jako czynny VAT to obowiązek, dla innych
              świadomy wybór. Kluczowe pytanie brzmi: czy Twoi klienci są
              firmami (B2B) czy osobami prywatnymi (B2C), i jak dużo
              wydajesz na koszty objęte VAT.
            </p>
          </div>
        </section>

        {/* Zwolnienie podmiotowe — co to znaczy */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Zwolnienie podmiotowe — co to znaczy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli Twój roczny obrót (sprzedaż) nie przekracza 200 000 zł,
              możesz korzystać ze zwolnienia podmiotowego z VAT. Oznacza
              to, że:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Nie naliczasz VAT na swoich fakturach</li>
              <li>Nie składasz deklaracji JPK_V7</li>
              <li>Nie musisz prowadzić ewidencji VAT</li>
              <li>Nie możesz odliczać VAT od zakupów</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Limit 200 000 zł dotyczy wartości sprzedaży netto (bez VAT)
              w danym roku kalendarzowym. Jeśli zaczynasz działalność
              w trakcie roku, limit jest proporcjonalny do liczby
              pozostałych dni.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Zwolnienie podmiotowe to opcja domyślna — nie trzeba składać
              żadnego wniosku. Dopiero rejestracja jako czynny VAT wymaga
              złożenia formularza VAT-R.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Warto pamiętać, że zwolnienie podmiotowe to nie to samo co
              zwolnienie przedmiotowe (dotyczące określonych rodzajów
              usług, np. medycznych czy edukacyjnych).
            </p>
          </div>
        </section>

        {/* Kiedy musisz być vatowcem */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy musisz być vatowcem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W niektórych sytuacjach rejestracja jako czynny VAT jest
              obowiązkowa — niezależnie od wysokości obrotu:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Przekroczenie progu 200 000 zł obrotu w roku
                kalendarzowym — obowiązek rejestracji od momentu
                przekroczenia
              </li>
              <li>
                Sprzedaż towarów wymienionych w załączniku nr 12 do
                ustawy o VAT (m.in. metale szlachetne, elektronika,
                paliwa)
              </li>
              <li>
                Świadczenie usług prawniczych, doradczych, jubilerskich
              </li>
              <li>
                Sprzedaż nowych środków transportu wewnątrz UE
              </li>
              <li>
                Handel internetowy towarami akcyzowymi
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli prowadzisz działalność w jednej z tych kategorii,
              zwolnienie podmiotowe Ci nie przysługuje. Musisz
              zarejestrować się jako czynny VAT od pierwszego dnia
              działalności.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przy przekroczeniu progu 200 000 zł obowiązek rejestracji
              powstaje od transakcji, która spowodowała przekroczenie.
              Warto monitorować obrót na bieżąco, by nie przeoczyć
              momentu, w którym zwolnienie przestaje obowiązywać.
            </p>
          </div>
        </section>

        {/* Kiedy warto być vatowcem dobrowolnie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy warto być vatowcem dobrowolnie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Nawet jeśli Twój obrót nie przekracza 200 000 zł, dobrowolna
              rejestracja jako czynny VAT może się opłacać. Oto typowe
              sytuacje:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Klienci B2B
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli Twoi klienci to firmy (B2B), VAT na fakturze nie jest
              dla nich kosztem — odliczają go. Dla klienta B2B liczy się
              kwota netto. Brak VAT na Twojej fakturze nie daje im żadnej
              korzyści, a Tobie odbiera możliwość odliczania VAT od
              własnych zakupów.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Wysokie koszty z VAT
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli kupujesz sprzęt, oprogramowanie, usługi, meble
              biurowe, samochód lub inne rzeczy objęte VAT, jako czynny
              vatowiec odliczasz ten VAT. Przy kosztach 5 000 zł netto
              miesięcznie z 23% VAT, odliczasz 1 150 zł VAT miesięcznie.
              Rocznie to 13 800 zł.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Wizerunek i wiarygodność
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Niektóre firmy wolą współpracować z vatowcami. Brak VAT
              na fakturze bywa postrzegany jako sygnał, że firma jest
              bardzo mała lub dopiero zaczyna. To nie jest argument
              finansowy, ale w niektórych branżach ma znaczenie.
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sprawdź, jak VAT wpłynie na Twój wynik w{" "}
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

        {/* Kiedy NIE warto być vatowcem */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Kiedy NIE warto być vatowcem
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Rejestracja jako czynny VAT nie zawsze jest korzystna. Oto
              sytuacje, w których zwolnienie podmiotowe może być lepszym
              wyborem:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Klienci indywidualni (B2C)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Osoby prywatne nie odliczają VAT. Dla nich liczy się cena
              brutto (końcowa). Jeśli jesteś vatowcem, Twoja usługa za
              1 000 zł netto kosztuje klienta 1 230 zł brutto. Jeśli nie
              jesteś vatowcem, kosztuje 1 000 zł. Przy tej samej cenie
              netto klient płaci mniej — albo Ty musisz obniżyć cenę
              netto, żeby być konkurencyjny.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Niskie koszty z VAT
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli Twoje koszty to głównie wynagrodzenia, składki ZUS
              lub usługi zwolnione z VAT — nie masz dużo VAT do odliczenia.
              W takiej sytuacji bycie vatowcem generuje tylko dodatkową
              administrację bez realnych korzyści.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Obciążenie administracyjne
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Czynny VAT oznacza obowiązek prowadzenia ewidencji VAT
              i składania JPK_V7 co miesiąc. Nawet jeśli rozliczasz VAT
              kwartalnie, JPK_V7 (część ewidencyjna) składasz miesięcznie.
              To dodatkowy czas i potencjalnie koszt księgowości.
            </p>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Sprawdź wpływ VAT na Twoje rozliczenie
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

        {/* Wpływ VAT na cashflow */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Wpływ VAT na cashflow
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jednym z najczęściej pomijanych aspektów VAT jest wpływ na
              przepływy pieniężne. Jako czynny vatowiec pobierasz VAT od
              klientów, ale ten VAT nie jest Twoim przychodem — musisz
              go odprowadzić do urzędu skarbowego.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              W praktyce oznacza to, że na koncie firmowym widzisz
              więcej pieniędzy niż naprawdę masz. Jeśli wystawiasz
              fakturę na 10 000 zł netto + 2 300 zł VAT, na konto
              wpływa 12 300 zł. Ale 2 300 zł (pomniejszone o VAT
              z Twoich zakupów) musisz oddać.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Terminy rozliczeń
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>
                Rozliczenie miesięczne — VAT należny minus naliczony
                płacisz do 25. dnia następnego miesiąca
              </li>
              <li>
                Rozliczenie kwartalne — możliwe dla małych podatników
                (obrót do 2 mln EUR), VAT płacisz do 25. dnia miesiąca
                po kwartale
              </li>
              <li>
                JPK_V7 — część ewidencyjna składana zawsze miesięcznie,
                nawet przy kwartalnym rozliczeniu
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Problem pojawia się, gdy klient płaci z opóźnieniem. Ty
              wystawiłeś fakturę, VAT należny powstał, musisz go
              odprowadzić — a pieniędzy jeszcze nie masz. To klasyczny
              problem cashflow w firmach z długimi terminami płatności.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dlatego warto odkładać VAT na osobne subkonto od razu
              po wystawieniu faktury. Dzięki temu nie wydasz pieniędzy,
              które nie są Twoje.
            </p>
          </div>
        </section>

        {/* VAT a forma opodatkowania */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              VAT a forma opodatkowania
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              VAT i podatek dochodowy (PIT) to dwa osobne podatki.
              Decyzja o VAT jest niezależna od wyboru formy opodatkowania.
              Możesz łączyć status czynnego vatowca z każdą formą:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Ryczałt + czynny VAT — tak, to możliwe i częste</li>
              <li>Podatek liniowy + czynny VAT — standardowa kombinacja dla B2B</li>
              <li>Skala podatkowa + czynny VAT — również możliwe</li>
              <li>Każda forma PIT + zwolnienie z VAT — tak samo dozwolone</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jedyna interakcja między VAT a PIT dotyczy kosztów: na
              ryczałcie nie odliczasz kosztów od przychodu (ale VAT
              od zakupów i tak odliczasz, jeśli jesteś vatowcem). Na
              liniowym i skali koszty netto pomniejszają dochód, a VAT
              od tych kosztów odliczasz w deklaracji VAT.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Więcej o wyborze formy opodatkowania znajdziesz w artykule{" "}
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

        {/* VAT a samochód w firmie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              VAT a samochód w firmie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Samochód w firmie to jeden z najczęstszych powodów, dla
              których przedsiębiorcy rejestrują się jako czynni vatowcy.
              Zasady odliczania VAT zależą od sposobu wykorzystania
              pojazdu:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Użytek mieszany (firmowy + prywatny)
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Odliczasz 50% VAT od zakupu samochodu</li>
              <li>Odliczasz 50% VAT od paliwa i kosztów eksploatacji</li>
              <li>Nie musisz prowadzić kilometrówki</li>
              <li>Większość przedsiębiorców wybiera tę opcję</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Wyłącznie użytek firmowy
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
              <li>Odliczasz 100% VAT od zakupu i eksploatacji</li>
              <li>Musisz prowadzić szczegółową ewidencję przebiegu (kilometrówkę)</li>
              <li>Samochód musi być zgłoszony w urzędzie skarbowym (VAT-26)</li>
              <li>Regulamin użytkowania pojazdu w firmie</li>
              <li>W praktyce trudne do utrzymania przy jednoosobowej działalności</li>
            </ul>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Przykład: kupujesz samochód za 100 000 zł netto + 23 000 zł
              VAT. Przy użytku mieszanym odliczasz 11 500 zł VAT. Przy
              wyłącznym użytku firmowym — 23 000 zł. Różnica jest
              znacząca, ale wymogi dokumentacyjne przy 100% odliczeniu
              są rygorystyczne.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sprawdź, jak VAT od samochodu wpłynie na Twój wynik w{" "}
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

        {/* Podsumowanie */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Podsumowanie
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Decyzja o VAT zależy przede wszystkim od dwóch rzeczy: kto
              jest Twoim klientem i ile wydajesz na koszty z VAT.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli pracujesz B2B i masz koszty z VAT — rejestracja
              jako czynny vatowiec prawie zawsze się opłaca. Odliczasz
              VAT od zakupów, a klienci i tak patrzą na kwotę netto.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Jeśli pracujesz B2C i masz niskie koszty — zwolnienie
              podmiotowe jest prostsze, tańsze administracyjnie i daje
              Ci przewagę cenową (niższa cena brutto dla klienta
              końcowego).
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pamiętaj: decyzję o VAT możesz zmienić. Możesz
              zarejestrować się jako czynny VAT w dowolnym momencie,
              a zrezygnować po minimum roku (jeśli obrót nie przekracza
              200 000 zł). To nie jest decyzja na zawsze.
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
                  Czy mogę zrezygnować z VAT po rejestracji?
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
                  Tak, ale nie wcześniej niż po upływie roku od
                  rejestracji. Warunek: obrót w poprzednim roku nie
                  przekroczył 200 000 zł i nie prowadzisz działalności,
                  która wymaga bycia vatowcem. Rezygnację zgłaszasz na
                  formularzu VAT-R.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy ryczałtowiec może być vatowcem?
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
                  Tak. Forma opodatkowania PIT (ryczałt, liniowy, skala)
                  i status VAT to dwie osobne decyzje. Ryczałtowiec może
                  być czynnym vatowcem i odliczać VAT od zakupów — mimo
                  że nie odlicza kosztów od przychodu w PIT.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Czy klienci indywidualni wolą firmy bez VAT?
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
                  Często tak. Dla klienta indywidualnego liczy się cena
                  końcowa (brutto). Firma bez VAT może zaoferować niższą
                  cenę brutto przy tej samej marży. To szczególnie
                  widoczne w usługach, gdzie cena jest kluczowym
                  kryterium wyboru.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 dark:border-gray-700">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-gray-900 dark:text-white font-medium">
                  Jak często trzeba składać JPK_V7?
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
                  JPK_V7 składa się co miesiąc — nawet jeśli rozliczasz
                  VAT kwartalnie. Część ewidencyjna (rejestry sprzedaży
                  i zakupów) jest zawsze miesięczna. Część deklaracyjna
                  może być kwartalna dla małych podatników.
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
                Nie wiesz, czy warto rejestrować się do VAT?
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
                      href="/strefa-wiedzy/ryczalt-czy-liniowy"
                      className="text-accent hover:underline"
                    >
                      Ryczałt czy liniowy — co wybrać
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
                name: "Czy mogę zrezygnować z VAT po rejestracji?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak, ale nie wcześniej niż po upływie roku od rejestracji. Warunek: obrót w poprzednim roku nie przekroczył 200 000 zł i nie prowadzisz działalności, która wymaga bycia vatowcem.",
                },
              },
              {
                "@type": "Question",
                name: "Czy ryczałtowiec może być vatowcem?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Tak. Forma opodatkowania PIT (ryczałt, liniowy, skala) i status VAT to dwie osobne decyzje. Ryczałtowiec może być czynnym vatowcem i odliczać VAT od zakupów.",
                },
              },
              {
                "@type": "Question",
                name: "Czy klienci indywidualni wolą firmy bez VAT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Często tak. Dla klienta indywidualnego liczy się cena końcowa (brutto). Firma bez VAT może zaoferować niższą cenę brutto przy tej samej marży.",
                },
              },
              {
                "@type": "Question",
                name: "Jak często trzeba składać JPK_V7?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "JPK_V7 składa się co miesiąc — nawet jeśli rozliczasz VAT kwartalnie. Część ewidencyjna jest zawsze miesięczna. Część deklaracyjna może być kwartalna dla małych podatników.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
