import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarConfigurator from "./CarConfigurator";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dobór samochodu – Znajdź idealny samochód dla siebie | Fluxlab",
  description:
    "Interaktywny kreator doboru samochodu. Dopasuj segment, nadwozie, napęd i moc do realnych potrzeb – bez marketingowej ściemy.",
  openGraph: {
    title: "Dobór samochodu – Znajdź idealny samochód dla siebie | Fluxlab",
    description:
      "Interaktywne narzędzie do doboru samochodu. Dopasuj segment, nadwozie i moc do swoich potrzeb.",
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
    canonical: "/dobor-samochodu",
  },
};

const faqs = [
  {
    question: "Skąd wiadomo, że rekomendacja jest trafna?",
    answer:
      "Konfigurator nie „zgaduje” — działa na zestawie reguł. Każde Twoje pytanie zawęża zbiór segmentów (A/B/C/D/E, SUV-y, kombi, vany), typów nadwozia i przedziałów mocy tak, aby pozostały tylko opcje spełniające wszystkie warunki: budżet, liczbę osób, roczny przebieg, typ tras, wymagania ładunkowe. Na końcu dostajesz nie jeden „idealny” model, tylko profil auta (np. „segment C, kombi, 130–160 KM, diesel lub hybryda”), który pasuje do Twojej sytuacji. To świadoma decyzja — zawsze lepiej mieć 5–10 kandydatów do sprawdzenia niż jeden model wybrany pod wpływem reklamy.",
  },
  {
    question: "Czy rekomendacja uwzględnia koszty serwisu i eksploatacji?",
    answer:
      "Konfigurator podpowiada segment i typ napędu z uwzględnieniem ogólnych różnic w kosztach utrzymania — wie, że SUV jest droższy w oponach, diesel droższy w serwisie, a premium droższe w częściach. Nie liczy jednak konkretnej kwoty. Po dobraniu profilu przejdź do kalkulatora kosztów samochodu i wprowadź dane dla 2–3 modeli z rekomendowanego segmentu. Dopiero wtedy zobaczysz rzeczywisty roczny TCO (Total Cost of Ownership) i będziesz mógł wybrać konkretny model na podstawie liczb, a nie wrażeń.",
  },
  {
    question: "Elektryk, hybryda czy spalinowy — jak wybrać napęd?",
    answer:
      "Zasada upraszczająca: do 10 tys. km rocznie, głównie w mieście, z możliwością ładowania w domu — elektryk opłaca się najszybciej. 10–20 tys. km, miks miasto/trasa, bez własnego gniazdka — hybryda (pełna, nie mild) daje najlepszy kompromis. Powyżej 25 tys. km, głównie autostrady i szybkie trasy — diesel nadal wygrywa zasięgiem i zużyciem. Benzyna to dobry wybór, gdy nie jeździsz dużo, ale robisz nieregularne długie trasy — bezpiecznie, tanio w zakupie, niskie ryzyko drogich awarii. Konfigurator pytał o Twój profil jazdy właśnie po to, żeby zaproponować odpowiedni napęd.",
  },
  {
    question: "Czy mogę zmienić preferencje i uruchomić kreator ponownie?",
    answer:
      "Tak. Kreator jest bezstanowy — każde uruchomienie zaczynasz od zera i możesz wypróbować kilka scenariuszy. W praktyce warto to zrobić: najpierw wpisz realistyczne odpowiedzi dla codziennej sytuacji, potem spróbuj „optymistycznej” (większy budżet, więcej miejsca) i „minimalnej” (mniej osób, mniejszy budżet). Zobaczysz, jak zmienia się rekomendowany segment. Często okazuje się, że różnica między potrzebami realnymi a wymarzonymi to jeden segment wyżej — co przekłada się na 20–40% wyższe koszty bez realnej korzyści.",
  },
  {
    question: "Dlaczego sugerujecie te segmenty, a nie konkretne modele?",
    answer:
      "Świadomie. Konkretne modele zmieniają się co roku — generacje, silniki, warianty wyposażenia, roczniki, problemy typowe dla konkretnej partii. Lista „najlepszych 5 modeli” staje się nieaktualna po 6 miesiącach. Segment i profil napędu to trwała informacja: wiesz, że szukasz kombi segmentu C z hybrydą 130–160 KM, i dopiero wtedy przeglądasz aktualny rynek — Toyota Corolla TS, Kia Ceed SW, Skoda Octavia Combi e‑TEC, Ford Focus Mild Hybrid. Wybór konkretnego egzemplarza wymaga sprawdzenia rocznika, przebiegu i stanu, czego żaden konfigurator nie zrobi za Ciebie.",
  },
  {
    question: "Co jeśli żaden wynik mi nie pasuje?",
    answer:
      "To oznacza, że Twoje wymagania są wewnętrznie sprzeczne — np. budżet segmentu B, a potrzeby segmentu D, albo niski koszt eksploatacji przy dużym SUV-ie na autostrady. Kreator pokazuje wtedy profil najbliższy Twoim odpowiedziom, ale warto wrócić do pytań i przemyśleć, który parametr realnie jest sztywny, a który tylko „chciałoby się”. Najczęstsze kompromisy: mniejszy segment przy tej samej funkcjonalności, starszy rocznik zamiast niższej klasy, diesel zamiast elektryka przy dużych przebiegach bez dostępu do ładowarki. Jeśli kompromis nie jest możliwy — prawdopodobnie trzeba zwiększyć budżet.",
  },
  {
    question: "Czy konfigurator nadaje się do wyboru auta służbowego dla firmy?",
    answer:
      "Tak, ale z jednym zastrzeżeniem. Dla auta służbowego oprócz kryteriów osobistych liczą się regulacje podatkowe (limit 150 tys. zł amortyzacji, 225 tys. zł dla elektryków), reprezentacja wobec klientów i polityka flotowa. Kreator pomoże zawęzić segment i napęd. Konkretny model wybierzesz biorąc pod uwagę dostępność w leasingu, oferty serwisowe, gwarancje flotowe. Przy flotach 3+ aut rozmowa z dealerem często daje lepsze warunki niż indywidualny zakup — ale dopiero po określeniu, czego szukasz. W tym pomaga dobór segmentu.",
  },
];

export default function DoborSamochoduPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Dobór samochodu" }]} />

        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <p className="section-label mb-4">Narzędzie</p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dobierz idealny samochód
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Odpowiedz na kilka pytań, a podpowiemy Ci jaki segment, typ
              nadwozia i moc silnika najlepiej pasują do Twojego stylu jazdy.
            </p>
          </div>
        </section>

        {/* Configurator */}
        <section className="pb-16 lg:pb-24">
          <div className="container-wide">
            <CarConfigurator />
          </div>
        </section>

        {/* Methodology */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Jak działa dobór samochodu
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Kreator opiera się na prostym, przewidywalnym modelu decyzyjnym.
                Na podstawie Twoich odpowiedzi odsiewa segmenty i napędy, które
                nie spełniają podanych kryteriów, a następnie pokazuje profil
                pojazdu pasujący do Twojego stylu życia — nie pojedynczy model,
                lecz zestaw parametrów, w których realnie opłaca się szukać.
              </p>
              <p>
                Bierzemy pod uwagę cztery grupy kryteriów:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Użycie.</strong> Typ tras (miasto / miks / trasa),
                  roczny przebieg, liczba osób regularnie w aucie, potrzeby
                  bagażowe (zakupy, dzieci, sprzęt, przyczepa). To podstawa
                  doboru segmentu i nadwozia.
                </li>
                <li>
                  <strong>Budżet.</strong> Kwota zakupu albo miesięczna rata
                  leasingu, plus górny akceptowalny roczny koszt eksploatacji.
                  Definiuje klasę i dostępne warianty wyposażenia.
                </li>
                <li>
                  <strong>Priorytety.</strong> Co jest dla Ciebie ważne:
                  ekonomiczność, komfort, osiągi, przestrzeń, ekologia,
                  prestiż. Te preferencje ważą pozostałe kryteria, gdy nie da
                  się spełnić wszystkich.
                </li>
                <li>
                  <strong>Ograniczenia techniczne.</strong> Dostęp do ładowania
                  w domu (klucz dla elektryka), garaż, częstotliwość długich
                  tras, maksymalna wielkość auta w mieście. Eliminują opcje,
                  które w teorii pasują, ale w praktyce nie zadziałają.
                </li>
              </ul>
              <p>
                Rekomendacje opierają się na wiedzy branżowej o segmentach
                motoryzacyjnych, danych o niezawodności modeli (DEKRA, TÜV,
                J.D. Power) i kosztach utrzymania z serwisów takich jak
                Spritmonitor, Carfax czy Otomoto. Nie korzystamy z algorytmu
                „czarnej skrzynki” — każdą rekomendację można wyjaśnić
                konkretną odpowiedzią z Twojego formularza.
              </p>
            </div>
          </div>
        </section>

        {/* For whom */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Dla kogo jest ten kreator
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Narzędzie jest dla osób, które chcą wybrać auto rozumem,
                a nie emocjami, i wolą przejrzeć 10 realistycznych kandydatów
                niż wikłać się w porównywanie 100 modeli. Sprawdzi się
                w szczególności w czterech sytuacjach:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Wymieniasz auto po kilku latach.</strong>{" "}
                  Poprzednie auto było „OK”, ale zmieniło się życie — nowe
                  dziecko, dłuższa trasa do pracy, firma zamiast etatu.
                  Kreator pomoże sprawdzić, czy nadal segment C wystarczy,
                  czy warto wejść wyżej.
                </li>
                <li>
                  <strong>Firma kupująca flotę.</strong>{" "}
                  Zamiast polegać na rekomendacji dealera („bo akurat mam
                  to w promocji”), wchodzisz do rozmowy z konkretnym profilem
                  auta dopasowanym do pracowników. To daje przewagę
                  negocjacyjną.
                </li>
                <li>
                  <strong>Niezdecydowani między markami i napędami.</strong>{" "}
                  Jeśli zastanawiasz się nad Toyotą vs Skodą vs Kią, ale nie
                  wiesz, czy w ogóle szukasz w dobrym segmencie — zacznij
                  od kreatora, potem przejdź do konkretów.
                </li>
                <li>
                  <strong>Osoby kupujące pierwsze auto.</strong>{" "}
                  Bez bagażu „zawsze jeździłem takim”. Kreator zadaje pytania,
                  które warto sobie zadać przed pierwszym zakupem, a często
                  pomijamy pod wpływem marketingu.
                </li>
              </ul>
              <p>
                Gdy poznasz już segment i napęd, przejdź do{" "}
                <Link href="/kalkulator-kosztow" className="text-accent hover:underline">
                  kalkulatora kosztów eksploatacji
                </Link>
                , żeby sprawdzić, ile konkretny model będzie Cię kosztować
                rocznie. Dwa narzędzia razem dają pełny obraz: czego szukasz
                i ile to realnie kosztuje.
              </p>
            </div>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Najczęstsze błędy przy wyborze samochodu
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Kierowanie się marką zamiast potrzebami.</strong>{" "}
                „Kupuję Audi, bo zawsze chciałem Audi”. To jest zakup
                emocjonalny, nie racjonalny. W tym samym budżecie segmentu
                premium dostępny jest często większy segment marki „zwykłej”,
                który lepiej spełni funkcję transportową. Marka to kwestia
                tożsamości — decyzja świadoma, tak, ale warto wiedzieć, że
                to właśnie za nią płacisz.
              </p>
              <p>
                <strong>Pomijanie kosztów utrzymania.</strong>{" "}
                Auto za 120 tys. zł z tanim serwisem jest często tańsze
                w 5‑letnim horyzoncie niż auto za 90 tys. zł z drogim serwisem,
                szybką utratą wartości i niską niezawodnością. Wybór auta
                na podstawie samej ceny zakupu to najdroższa ścieżka.
              </p>
              <p>
                <strong>Kupowanie „na zapas”.</strong>{" "}
                „Weźmiemy SUV-a, bo może kiedyś będzie dziecko / przyczepa
                / wyjazdy w góry”. Na 95% nie będzie, a jeżdżenie SUV-em po
                mieście przez 4 lata „na wszelki wypadek” to 8–15 tys. zł
                rocznie zmarnowane na paliwo, opony i ubezpieczenie. Lepiej
                dobrać auto do dzisiejszej sytuacji, a gdy coś się zmieni —
                sprzedać i wymienić.
              </p>
              <p>
                <strong>Zakup emocjonalny po jazdzie próbnej.</strong>{" "}
                Salonowa jazda próbna to marketing. Nowiutka kierownica,
                świeży zapach, wypasiona wersja, uprzejmy handlowiec. Decyzja
                po takiej jeździe jest skrzywiona. Wróć do niej po tygodniu
                i sprawdź ponownie parametry, a nie wrażenia. Albo jeszcze
                lepiej — wypożycz ten sam model na weekend z carsharingu albo
                z firmy rent‑a‑car.
              </p>
              <p>
                <strong>Porównywanie aut w różnych wersjach wyposażenia.</strong>
                {" "}„Ten ma skórę, a tamten nie — więc ten jest lepszy”. Bez
                wyrównania wersji porównujesz jabłka z gruszkami. Zrób listę
                funkcji, które naprawdę chcesz mieć, i porównuj auta
                w wersjach, które je zawierają. Dopiero wtedy ceny są
                porównywalne.
              </p>
              <p>
                <strong>Ignorowanie kontekstu używania.</strong>{" "}
                Super sportowe zawieszenie pięknie wygląda w teście
                motoryzacyjnym, ale po 30 km na dziurawej drodze do pracy
                codziennie przez 4 lata potrafi sfrustrować. Auto musi pasować
                do Twojej trasy, a nie do testów na torze.
              </p>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Policz realny koszt wybranego auta
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Gdy już wiesz, jakiego segmentu szukasz, sprawdź ile będzie
                kosztować Cię rocznie utrzymanie konkretnego modelu.
              </p>
              <Link href="/kalkulator-kosztow" className="btn-primary px-8 py-3 text-base">
                Przejdź do kalkulatora kosztów
              </Link>
            </div>
          </div>
        </section>

        {/* Practical tips */}
        <section className="py-12 lg:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Co zrobić z rekomendacją kreatora
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                <strong>1. Zapisz profil, nie tylko wynik.</strong>{" "}
                Segment, nadwozie, napęd, zakres mocy, orientacyjny budżet.
                To pięć parametrów, na których możesz pracować przez kolejne
                tygodnie szukając konkretnego auta.
              </p>
              <p>
                <strong>2. Zrób listę 8–12 modeli pasujących do profilu.</strong>{" "}
                Wchodzisz na Otomoto lub OtoMoto, filtrujesz dokładnie
                według parametrów kreatora i przeglądasz ogłoszenia. Cel:
                zobaczyć, jaka jest realna cena rynkowa i rozrzut wersji.
              </p>
              <p>
                <strong>3. Zawęź do 3–5 finalistów.</strong>{" "}
                Na podstawie niezawodności (ranking TÜV / DEKRA dla konkretnych
                roczników), dostępnych części, opinii właścicieli (fora,
                facebookowe grupy modelowe — tam poznasz prawdziwe problemy).
              </p>
              <p>
                <strong>4. Policz TCO dla finalistów.</strong>{" "}
                Wrzuć każdy do{" "}
                <Link href="/kalkulator-kosztow" className="text-accent hover:underline">
                  kalkulatora kosztów
                </Link>
                . Różnica roczna między podobnymi modelami potrafi wynosić
                3–8 tys. zł — w 5‑letnim horyzoncie to 15–40 tys. zł.
              </p>
              <p>
                <strong>5. Sprawdź finalistów mechanicznie.</strong>{" "}
                Przed zakupem każdego używanego auta — niezależny mechanik,
                nie salon i nie sprzedawca. Koszt 200–400 zł, oszczędność
                potencjalnie kilka tysięcy.
              </p>
              <p>
                <strong>6. Dla firmy — dodaj aspekt podatkowy.</strong>{" "}
                Forma rozliczenia (ewidencja 100%, mieszana 75%/50%) wpływa
                na realny koszt po podatkach.{" "}
                <Link href="/kalkulator-podatkowy" className="text-accent hover:underline">
                  Kalkulator podatkowy
                </Link>
                {" "}pokazuje wpływ samochodu firmowego na wynik JDG.
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
                  href: "/kalkulator-kosztow",
                  title: "Kalkulator kosztów samochodu",
                  description:
                    "Policz roczny koszt utrzymania konkretnego modelu — paliwo, serwis, amortyzacja.",
                },
                {
                  href: "/kalkulator-podatkowy",
                  title: "Kalkulator JDG 2026",
                  description:
                    "Zobacz, jak samochód firmowy wpływa na podatek w każdej z trzech form opodatkowania.",
                },
                {
                  href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
                  title: "Jaka forma opodatkowania JDG w 2026?",
                  description:
                    "Wybór formy wpływa na to, ile z kosztu auta realnie odzyskasz.",
                },
                {
                  href: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
                  title: "Kiedy AI ma sens, a kiedy nie",
                  description:
                    "Framework decyzji — ten sam sposób myślenia, którego warto użyć przy wyborze auta.",
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
                Potrzebujesz wsparcia przy decyzjach flotowych?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Jeśli firma rozważa wymianę floty albo wdrożenie polityki
                samochodowej, możemy pomóc w analizie kosztów i procesu.
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
            name: "Dobór samochodu",
            url: "https://fluxlab.pl/dobor-samochodu",
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "PLN",
            },
            inLanguage: "pl-PL",
            description:
              "Interaktywny kreator doboru samochodu — rekomenduje segment, nadwozie i napęd na podstawie potrzeb użytkownika.",
          }),
        }}
      />

      <Footer />
    </>
  );
}
