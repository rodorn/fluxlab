import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCostCalculator from "./CarCostCalculator";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kalkulator kosztów samochodu – Ile naprawdę kosztuje Twoje auto? | Fluxlab",
  description:
    "Oblicz pełny roczny koszt posiadania samochodu: paliwo, olej, opony, serwis, ubezpieczenie i utrata wartości. Poznaj realny koszt na kilometr.",
  openGraph: {
    title: "Kalkulator kosztów samochodu – Ile naprawdę kosztuje Twoje auto? | Fluxlab",
    description:
      "Oblicz pełny roczny koszt posiadania samochodu: paliwo, serwis, opony, ubezpieczenie, spadek wartości.",
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
    canonical: "/kalkulator-kosztow",
  },
};

const faqs = [
  {
    question: "Czy kalkulator uwzględnia ubezpieczenie OC i AC?",
    answer:
      "Tak. Roczny koszt ubezpieczenia traktujemy jako jeden z sześciu stałych komponentów obok paliwa, oleju, opon, przeglądów i utraty wartości. Wpisujesz swoją faktyczną składkę OC+AC (suma roczna), a kalkulator rozkłada ją na koszt miesięczny i koszt na kilometr. Pamiętaj, że AC potrafi się istotnie zmieniać z wiekiem auta — młode auto może mieć składkę 3–5 razy wyższą niż sześcio‑siedmioletnie. Jeśli porównujesz dwa auta, sprawdź realną wycenę AC dla każdego z nich, a nie średnią rynkową — różnica dla tej samej wartości pojazdu potrafi sięgać kilkuset złotych rocznie zależnie od modelu.",
  },
  {
    question: "Jak policzyć koszt auta elektrycznego w tym kalkulatorze?",
    answer:
      "Koszt elektryka liczysz tak samo jak spalinowego, z dwiema różnicami. Po pierwsze, zamiast litrów paliwa wpisujesz zużycie energii — np. 18 kWh/100 km — i cenę kWh (domowa taryfa G12 czy stacja szybkiego ładowania to różnica nawet 5–6‑krotna). Po drugie, pomijasz olej i znacząco obniżasz serwis (brak wymiany paska, świec, filtra paliwa, rzadsza obsługa hamulców dzięki odzysku). Utrata wartości bywa wyższa niż przy spalinowych ze względu na niepewność wokół baterii — warto wpisać bardziej konserwatywne założenie. Ubezpieczenie i opony są w zasadzie identyczne, z uwagi na masę auta opony mogą schodzić nieco szybciej.",
  },
  {
    question: "Dlaczego amortyzacja potrafi być największą pozycją kosztu?",
    answer:
      "Amortyzacja, czyli spadek wartości rynkowej auta, to koszt, którego nie widzisz co miesiąc na rachunku — i dlatego większość kierowców go nie liczy. Typowe auto spalinowe traci ok. 15–20% wartości w pierwszym roku, a następnie 8–12% rocznie. Przy aucie za 120 000 zł to 12–18 tys. zł rocznie — często więcej niż roczne paliwo, ubezpieczenie i serwis razem wzięte. Dla aut elektrycznych i aut premium spadek potrafi być szybszy. Ignorowanie tej pozycji sprawia, że „tańszy” droższy samochód wydaje się okazją, a w rzeczywistości kosztuje więcej niż auto w niższym segmencie, które wolniej traci wartość.",
  },
  {
    question: "Czy auto firmowe w JDG jest tańsze od prywatnego?",
    answer:
      "Zwykle tak, ale mniej niż się wydaje. Przy aucie wpisanym w środki trwałe możesz odliczać 75% kosztów w PIT i 50% VAT od rat, paliwa i serwisu (auto używane mieszanie, czyli częściowo prywatnie). Przy aucie używanym wyłącznie do działalności jest to 100%, ale musisz prowadzić szczegółową ewidencję przebiegu. W praktyce oszczędność to 15–25% całkowitego kosztu, nie 50%. Dodatkowo, przy sprzedaży auta firmowego trzeba rozliczyć podatek. Jeśli ważysz decyzję, policz oba warianty — kalkulator daje prawdziwy koszt, a formę rozliczenia dodaj osobno w kalkulatorze podatkowym.",
  },
  {
    question: "Benzyna czy diesel — kiedy się bardziej opłaca?",
    answer:
      "Diesel opłaca się, gdy robisz powyżej ok. 25–30 tys. km rocznie, głównie w trasie. Wyższa cena zakupu i droższy serwis (DPF, EGR, wtryskiwacze) zwracają się na paliwie tylko przy dużym przebiegu. Przy 10–15 tys. km rocznie w mieście benzyna wychodzi niemal zawsze taniej: tańsze auto na starcie, tańszy serwis, mniej awarii drogich komponentów. Warto też uwzględnić strefy czystego transportu — w kilku miastach diesle starsze niż Euro 5/6 już są objęte ograniczeniami, co wpływa na wartość przy sprzedaży. Wpisz do kalkulatora realne zużycie, przebieg roczny i ceny paliw — wynik często jest nieoczywisty.",
  },
  {
    question: "Skąd biorę realne zużycie paliwa?",
    answer:
      "Nie z katalogu producenta i nie z testu WLTP. Najbliższe prawdy są średnie z serwisów społecznościowych — Spritmonitor.de, autocentrum.pl lub nasza‑klasa typu fueleconomy.gov — gdzie kierowcy raportują faktyczne zużycie. Weź medianę dla tego samego modelu, silnika i skrzyni, co Twoje auto. Alternatywa: policz z własnych tankowań. Podziel liczbę zatankowanych litrów przez przejechane kilometry × 100. Zrób to na 3–5 pełnych tankowaniach, żeby zniwelować wahania. Różnica między danymi producenta a realnym zużyciem potrafi wynosić 15–25% — przy 15 tys. km rocznie to 200–400 zł w skali miesiąca.",
  },
  {
    question: "Jak często wymieniać opony i ile to realnie kosztuje?",
    answer:
      "Komplet opon letnich wytrzymuje zazwyczaj 40–60 tys. km, zimowych 4–6 sezonów (niezależnie od przebiegu — guma starzeje się z czasem). Przy rotacji co sezon i dwóch kompletach oznacza to wymianę kompletu średnio co 3–4 lata. Koszt całkowity obejmuje nie tylko same opony (2 500–6 000 zł za komplet), ale też sezonową wymianę (200–400 zł × 2 razy w roku) i przechowywanie, jeśli nie masz gdzie ich trzymać. Auta SUV i elektryki mają droższe opony i krótszą żywotność z powodu masy. W kalkulatorze wpisz roczny uśredniony koszt — np. 2 000 zł rocznie przy autach segmentu C, 3 500 zł przy SUV-ach.",
  },
  {
    question: "Czy leasing obniża realny koszt auta?",
    answer:
      "Nie obniża — przenosi. Leasing zamienia utratę wartości na ratę, a na końcu umowy płacisz wykup albo oddajesz auto. Suma rat + wykup za auto w leasingu jest zwykle zbliżona lub nieco wyższa niż zakup za gotówkę + sprzedaż po 3–4 latach. Przewaga leasingu to cashflow (nie zamrażasz 100+ tys. zł), tarcza podatkowa (raty są kosztem w JDG/spółce) i często serwis w cenie. Wada: przy wyjściu z umowy przed czasem płacisz karę. W kalkulatorze kosztów eksploatacji policzysz realny koszt roczny niezależnie od formy finansowania — wpisz odpowiednio albo ratę leasingową + wykup rozłożony, albo amortyzację własnego auta.",
  },
];

export default function KalkulatorKosztowPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Kalkulator kosztów" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kalkulator kosztów samochodu
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sprawdź, ile naprawdę kosztuje posiadanie samochodu. Uwzględniamy
              paliwo, olej, opony, serwis, ubezpieczenie i utratę wartości.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-16 lg:pb-24">
          <div className="container-wide">
            <CarCostCalculator />
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak liczymy koszt samochodu
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Koszt posiadania samochodu składa się z sześciu komponentów,
                które kalkulator sumuje rocznie, dzieli na miesiące i rozkłada
                na każdy przejechany kilometr. Dzięki temu dwa auta, które na
                papierze kosztują podobnie, okazują się w rzeczywistości różnić
                o 10–15 tys. zł rocznie.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Paliwo.</strong> Liczone jako roczny przebieg ×
                  realne zużycie na 100 km × cena paliwa. Używaj mediany z
                  Spritmonitor albo z własnych tankowań, nie danych
                  producenta — różnica potrafi wynosić 15–25%.
                </li>
                <li>
                  <strong>Olej i płyny.</strong> Wymiana co 15–30 tys. km lub
                  raz w roku, plus filtry i sezonowe uzupełnienia. Dla auta
                  osobowego to 400–800 zł rocznie.
                </li>
                <li>
                  <strong>Opony.</strong> Komplet letnich + zimowych wymieniany
                  co 3–4 lata plus dwa przekładania sezonowe. Roczny koszt 1 500–4 000 zł
                  zależnie od segmentu.
                </li>
                <li>
                  <strong>Serwis i przeglądy.</strong> Przeglądy okresowe (1–2 rocznie),
                  naprawy bieżące, klocki, tarcze, części eksploatacyjne. Dla
                  4–8‑letniego auta segmentu C zakładamy 2 000–4 000 zł rocznie.
                </li>
                <li>
                  <strong>Ubezpieczenie.</strong> OC + AC + NNW w skali rocznej,
                  zgodnie z Twoją rzeczywistą polisą.
                </li>
                <li>
                  <strong>Utrata wartości (amortyzacja).</strong> Różnica między
                  obecną wartością auta a szacowaną wartością za rok. Typowo
                  15–20% w pierwszym roku, 8–12% rocznie potem.
                </li>
              </ul>
              <p>
                Źródła danych referencyjnych: średnie ceny paliw (e‑petrol.pl,
                orlen.pl), mediany zużycia (Spritmonitor.de, autocentrum.pl),
                aktualne cenniki części (motointegrator, emex), wyceny rynkowe
                aut używanych (Otomoto, Auto‑Świat, Eurotax). Każdą z tych
                liczb możesz nadpisać w kalkulatorze własnymi danymi.
              </p>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dla kogo jest ten kalkulator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kalkulator przyda się wszędzie tam, gdzie decyzja o samochodzie
                wiąże się z realnymi pieniędzmi — a nie tylko z wrażeniem
                „fajnie się prowadzi”. Najczęściej korzystają z niego cztery
                grupy osób:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Właściciele firm i JDG rozważający zakup auta służbowego.</strong>
                  {" "}Zanim podpiszesz umowę leasingu, warto wiedzieć, ile
                  realnie będzie kosztować utrzymanie auta przez cały okres
                  finansowania — nie tylko rata.
                </li>
                <li>
                  <strong>Osoby porównujące leasing z zakupem za gotówkę.</strong>
                  {" "}Leasing zamienia amortyzację na ratę — kalkulator pokazuje
                  realny koszt niezależnie od formy finansowania i pozwala
                  porównać oba scenariusze na tych samych założeniach.
                </li>
                <li>
                  <strong>Pracownicy na „autach służbowych”.</strong>{" "}
                  Sprawdź, czy benefit w postaci auta firmowego naprawdę
                  Ci się opłaca w porównaniu z ekwiwalentem pieniężnym
                  i własnym autem.
                </li>
                <li>
                  <strong>Kierowcy wymieniający auto.</strong> Porównaj dwa
                  modele, które wpadły Ci w oko. Często auto droższe w zakupie
                  okazuje się tańsze w całkowitym koszcie dzięki wolniejszej
                  utracie wartości.
                </li>
              </ul>
              <p>
                Jeśli prowadzisz JDG i chcesz sprawdzić, jak auto wpłynie na
                Twoje rozliczenie,{" "}
                <Link href="/kalkulator-podatkowy" className="text-accent hover:underline">
                  kalkulator podatkowy
                </Link>
                {" "}uwzględnia samochód firmowy i mieszany w każdej z trzech
                form opodatkowania.
              </p>
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dlaczego to ma znaczenie
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Przeciętny kierowca w Polsce zakłada, że auto kosztuje go „tyle,
                ile rata plus paliwo”. To jest pomyłka o 30–50% w dół. Rzeczywisty
                koszt posiadania (TCO — Total Cost of Ownership) uwzględnia dodatkowo
                amortyzację, serwis, opony i ubezpieczenie, które razem stanowią
                połowę rachunku.
              </p>
              <p>
                Przykład: auto za 120 000 zł z ratą leasingową 2 200 zł i paliwem
                600 zł miesięcznie wydaje się kosztować 2 800 zł/mies. Realnie,
                po doliczeniu ubezpieczenia (250 zł), serwisu (300 zł), opon
                (150 zł) i utraty wartości ponad ratę (500 zł — bo leasing nie
                pokrywa całej amortyzacji) dochodzisz do 4 000 zł/mies. To różnica
                14 400 zł rocznie — tyle co dobra premia albo wakacje.
              </p>
              <p>
                Dla firmy to istotne dwa razy: wpływa na wynik finansowy i na
                decyzje o flocie. Jeśli zarządzasz 3–5 autami, nieświadome
                niedoszacowanie kosztu o 1 000 zł/mies. na auto to 36–60 tys. zł
                rocznie, które znikają z rachunku zysków i strat bez Twojej
                kontroli. Dobry model TCO pozwala świadomie wybierać między
                segmentami, napędami i formami finansowania — i negocjować
                twardo z dealerami.
              </p>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze błędy przy liczeniu kosztów auta
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Pomijanie amortyzacji.</strong> To najczęstszy
                i najdroższy błąd. Amortyzacja to zwykle największa pozycja
                w całym koszcie auta, a jednocześnie niewidoczna, bo nie
                pojawia się na żadnym rachunku. Ignorowanie jej oznacza, że
                w ogóle nie liczysz kosztu „bycia właścicielem” — tylko koszt
                jeżdżenia.
              </p>
              <p>
                <strong>Zużycie paliwa z reklamy lub karty katalogowej.</strong>{" "}
                WLTP i NEDC są w najlepszym razie optymistyczne, w najgorszym
                oderwane od rzeczywistości. Realne zużycie jest wyższe o 15–25%.
                Przy 15 tys. km rocznie to różnica 200–400 zł miesięcznie.
              </p>
              <p>
                <strong>Niedoszacowanie kosztu opon.</strong> „Przecież opony
                kupuje się raz na kilka lat” — tak, ale to komplet za 3–5 tys.
                zł plus sezonowa wymiana 2× rocznie. W skali miesiąca to
                realnie 150–300 zł, nie 50 zł, które zwykle zakłada przeciętny
                właściciel.
              </p>
              <p>
                <strong>Zakładanie stałego serwisu przez cały okres.</strong>{" "}
                Pierwsze 3 lata nowego auta to głównie przeglądy i oleje.
                Po przebiegu 100–150 tys. km zaczynają się tarcze, klocki,
                zawieszenie, wymiany rozrządu, drobne naprawy. Jeśli planujesz
                trzymać auto długo, uwzględnij rosnącą krzywą kosztów.
              </p>
              <p>
                <strong>Ignorowanie kosztu kapitału.</strong> Jeśli wydałeś
                100 000 zł na auto, nie zarabiasz na tych pieniądzach. Przy
                oprocentowaniu lokaty 4–5% to 4–5 tys. zł rocznie „niewidocznego”
                kosztu. W kalkulatorze możesz go dodać do amortyzacji albo
                uwzględnić jako osobną pozycję w analizie.
              </p>
              <p>
                <strong>Porównywanie rat zamiast TCO.</strong> „Ten leasing
                ma ratę 1 800, a tamten 2 200”. OK, a wykup? A pakiet serwisowy?
                A ubezpieczenie? A dopuszczalny przebieg? Dopiero TCO liczone
                na pełny okres umowy daje realny obraz.
              </p>
            </div>
          </div>
        </section>

        {/* Mid-article CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Nie wiesz, które auto wybrać?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Zanim policzysz koszty, warto zawęzić listę modeli do takich,
                które realnie pasują do Twoich potrzeb.
              </p>
              <Link href="/dobor-samochodu" className="btn-primary px-8 py-3 text-base">
                Przejdź do doboru samochodu
              </Link>
            </div>
          </div>
        </section>

        {/* Practical tips */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Praktyczne wskazówki przy interpretacji wyniku
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Patrz na koszt na kilometr, nie na miesiąc.</strong>{" "}
                Miesięczny koszt rośnie liniowo z przebiegiem. Jeśli jeździsz
                8 tys. km rocznie, a ktoś 25 tys. km, porównywanie miesięcznych
                kwot nie ma sensu. Koszt na kilometr pokazuje, ile realnie
                płacisz za każdą przejechaną trasę.
              </p>
              <p>
                <strong>Porównuj dwa scenariusze, nie jeden w próżni.</strong>{" "}
                Wpisz do kalkulatora dane dla auta, które masz, i dla auta,
                które rozważasz. Różnica roczna pokaże, czy zmiana ma sens
                finansowy — i o ile.
              </p>
              <p>
                <strong>Uwzględnij koszt czasu, a nie tylko pieniędzy.</strong>{" "}
                Auto tańsze w eksploatacji, ale wymagające częstych wizyt
                u mechanika, „kosztuje” też Twój czas. Przy 4–6 wizytach
                rocznie po 2–3 godziny to 10–20 godzin — niewidoczne w żadnym
                rachunku.
              </p>
              <p>
                <strong>Nie zapomnij o kosztach jednorazowych.</strong>{" "}
                Rejestracja, pierwsze wyposażenie, akcesoria, opony zimowe
                jeśli kupujesz tylko letnie. Na starcie auta to łatwo 3–8 tys.
                zł ponad cenę zakupu.
              </p>
              <p>
                <strong>Sprawdzaj wyniki dla realnego horyzontu.</strong>{" "}
                Koszt auta za 3 lata i za 7 lat to dwa różne światy — inne
                amortyzacja, inne naprawy, inna wartość rezydualna. Policz
                wariant, który odpowiada Twojemu realnemu planowi, nie
                uśrednienie.
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

        {/* Related articles */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Powiązane treści
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  href: "/dobor-samochodu",
                  title: "Dobór samochodu — interaktywny kreator",
                  description:
                    "Zanim policzysz koszty, dobierz segment, nadwozie i napęd do swoich potrzeb.",
                },
                {
                  href: "/kalkulator-podatkowy",
                  title: "Kalkulator JDG 2026",
                  description:
                    "Samochód firmowy i mieszany w trzech formach opodatkowania — zobacz, jak wpływa na podatek.",
                },
                {
                  href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
                  title: "Jaka forma opodatkowania JDG w 2026?",
                  description:
                    "Forma rozliczenia wpływa na to, ile z kosztu auta odzyskasz.",
                },
                {
                  href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
                  title: "Jak policzyć ROI z automatyzacji",
                  description:
                    "Ten sam sposób myślenia o kosztach — pełny TCO zamiast wybranych pozycji.",
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
                Potrzebujesz automatyzacji procesów w firmie?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Jeśli flota, raportowanie kosztów albo integracja z systemem
                księgowym zjadają Ci czas, porozmawiajmy.
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

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Kalkulator kosztów samochodu",
            url: "https://fluxlab.pl/kalkulator-kosztow",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Kalkulator rocznego kosztu posiadania samochodu: paliwo, olej, opony, serwis, ubezpieczenie, utrata wartości. Koszt na kilometr i miesiąc.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
