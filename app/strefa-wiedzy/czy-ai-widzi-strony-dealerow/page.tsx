import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Czy asystenci AI widzą strony dealerów? Badanie 386 domen | Fluxlab",
  description:
    "Sprawdziliśmy 386 domen dealerskich pod kątem tego, czy roboty zbierające treść dla asystentów AI mają co przeczytać. Blokuje je 0,8 procent, ale połowa stron w ogóle nie mówi maszynie, czym jest firma. Pełna metoda i liczby.",
  alternates: {
    canonical: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
  },
  openGraph: {
    title:
      "Czy asystenci AI widzą strony dealerów? Badanie 386 domen | Fluxlab",
    description:
      "Nie blokady są problemem. Problemem jest to, że u ponad połowy nie ma czego zacytować.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie widoczności stron dla asystentów AI",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy takie sprawdzenie jest legalne?",
    answer:
      "Tak. Pobraliśmy stronę główną, plik robots.txt i plik llms.txt, czyli dokładnie to, co pobiera przeglądarka każdego odwiedzającego i każda wyszukiwarka. Jedna domena to trzy zapytania, czyli mniej niż jedno wejście człowieka. Nie logowaliśmy się nigdzie, nie wysłaliśmy żadnej wiadomości i nie obchodziliśmy żadnych zabezpieczeń.",
  },
  {
    question: "Dlaczego liczycie od 255, a nie od 386?",
    answer:
      "Bo 131 domen w ogóle nie oddało strony. To jest osobny wynik, opisany niżej, i mieszanie go z resztą zaciemniałoby obraz. Liczenie domeny bez wpisu w rejestrze nazw jako strony bez danych uporządkowanych byłoby liczeniem tego samego problemu dwa razy.",
  },
  {
    question: "Czy blokowanie tych robotów to błąd?",
    answer:
      "Nie zawsze. Wydawca, który żyje ze sprzedaży własnych treści, ma dobry powód, żeby nie oddawać ich za darmo do trenowania modeli, i duże redakcje faktycznie je blokują. Dealer samochodowy zwykle takiego powodu nie ma: jego treść to opis usług i oferta, a blokada odcina go od kanału, w którym ktoś właśnie pyta o serwis albo o auto.",
  },
  {
    question:
      "Czy to znaczy, że strona bez danych uporządkowanych nie pojawi się w odpowiedzi asystenta?",
    answer:
      "Nie, to nie jest warunek konieczny. Znaczy tyle, że maszyna musi wywnioskować z układu strony, czym jest firma i co oferuje, zamiast odczytać to wprost. Przy wnioskowaniu myli się częściej, a najczęściej myli się o zakres usług i o lokalizację, czyli dokładnie o to, co rozstrzyga, czy ktoś dostanie polecenie.",
  },
  {
    question: "Skąd wiadomo, że roboty nie uruchamiają skryptów?",
    answer:
      "Z dokumentacji dostawców i z zachowania widocznego po stronie serwera. Część z nich potrafi już renderować, ale nie jest to regułą ani gwarancją. Strona, której treść siedzi w samym dokumencie, działa u wszystkich; strona zależna od skryptów działa u części. Przy porównywalnym koszcie wybór jest oczywisty.",
  },
];

export default function Page() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-28 md:pt-32">
        <Breadcrumbs
          items={[
            { label: "Strefa wiedzy", href: "/strefa-wiedzy" },
            { label: "Czy AI widzi strony dealerów" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Czy asystenci AI widzą strony dealerów samochodowych
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          O widoczności w odpowiedziach asystentów mówi się dziś głównie w
          kategoriach blokowania robotów. Wzięliśmy 386 domen polskich dealerów
          i serwisów i sprawdziliśmy to wprost. Okazało się, że blokady prawie
          nie istnieją, a prawdziwy problem leży zupełnie gdzie indziej i jest
          znacznie bardziej banalny.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Co dokładnie sprawdzaliśmy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Dla każdej domeny pobraliśmy stronę główną, plik robots.txt i plik
            llms.txt. Z tego policzyliśmy cztery rzeczy: czy któryś z siedmiu
            robotów zbierających treść dla asystentów ma zakaz wejścia, ile
            tekstu zostaje na stronie po odrzuceniu skryptów, czy w dokumencie
            są dane uporządkowane opisujące firmę i czy wypełniony jest opis w
            metadanych.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Drugi punkt wymaga wyjaśnienia, bo jest najważniejszy. Roboty
            zbierające dane na potrzeby modeli w większości nie uruchamiają
            skryptów. Strona, której treść dokleja się dopiero w przeglądarce,
            wygląda u człowieka normalnie, a w samym dokumencie ma kilkaset
            znaków. Dla robota to pusta kartka.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Sto trzydzieści jeden domen nie oddało strony w ogóle
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Zanim doszliśmy do treści, odpadła jedna trzecia próbki. To nie jest
            błąd pomiaru, tylko pierwszy wynik: dla tych domen pytanie o
            widoczność w AI jest bezprzedmiotowe, bo nie ma czego odwiedzić.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Dlaczego 131 domen nie oddało strony"
          podtytul="Z 386 domen z listy. Każda próbowana była pod adresem z www i bez, a przy błędzie certyfikatu także z jego pominięciem i bez szyfrowania."
          slupki={[
            {
              etykieta: "Brak wpisu w rejestrze nazw",
              wartosc: 53,
              opis: "Domena nie wskazuje żadnego serwera. Zwykle nieodnowiona albo porzucona.",
              wyroznij: true,
            },
            {
              etykieta: "Serwer nie odpowiedział",
              wartosc: 37,
              opis: "Przekroczony czas oczekiwania, mimo dwudziestu pięciu sekund na próbę.",
            },
            {
              etykieta: "Certyfikat nie do naprawienia",
              wartosc: 18,
              opis: "Strona nie wstała nawet po pominięciu weryfikacji certyfikatu.",
            },
            {
              etykieta: "Odmowa dostępu",
              wartosc: 14,
              opis: "Serwer odrzucił zapytanie kodem 403, zwykle ochrona przed ruchem automatycznym.",
            },
            {
              etykieta: "Pozostałe błędy",
              wartosc: 9,
              opis: "Błędy serwera i przypadki jednostkowe.",
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Trzy zapytania na domenę, bez logowania i bez obchodzenia zabezpieczeń."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Wśród 255 domen, które stronę oddały, kolejnych 56 zrobiło to
            dopiero po pominięciu weryfikacji certyfikatu, a 34 wyłącznie bez
            szyfrowania. Przeglądarka pokazuje w takich przypadkach ostrzeżenie
            na pełnym ekranie, zanim odwiedzający zobaczy cokolwiek z oferty.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Blokady robotów AI praktycznie nie istnieją
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Spodziewaliśmy się, że to będzie główny wynik badania. Nie jest.
            Spośród 255 działających stron zakaz wejścia dla robotów
            zbierających treść dla asystentów ma <strong>dwie</strong>, czyli
            0,8 procent. Obie blokują wszystkie siedem naraz, co wygląda na
            regułę ogólną napisaną przeciwko robotom kopiującym treść, a nie na
            świadomą decyzję akurat o asystentach.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Dla porównania: wśród dużych polskich wydawców blokady są normą.
            Sprawdziliśmy jeden tytuł prasowy i blokuje pięć z siedmiu tych
            samych robotów. Tam jest to decyzja biznesowa o nieoddawaniu treści,
            z której się żyje. U dealera takiej decyzji nie ma, bo nie ma czego
            bronić: opis serwisu i lista modeli to nie jest towar, który ktoś
            kupuje osobno.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Prawdziwy problem: nie ma czego zacytować
          </h2>
        </div>

        <WykresSlupkowy
          tytul="Czego brakuje na 255 działających stronach"
          podtytul="Odsetek stron, u których dany element nie występuje."
          jednostka="%"
          slupki={[
            {
              etykieta: "Brak danych uporządkowanych",
              wartosc: 54,
              opis: "137 stron. Maszyna musi zgadnąć z układu strony, czym jest firma.",
              wyroznij: true,
            },
            {
              etykieta: "Brak opisu w metadanych",
              wartosc: 58,
              opis: "147 stron. Brakuje zdania, które najczęściej trafia do podsumowania.",
              wyroznij: true,
            },
            {
              etykieta: "Brak pliku robots.txt",
              wartosc: 30,
              opis: "77 stron. Brak nie blokuje niczego, ale nie ma też żadnych wskazówek.",
            },
            {
              etykieta: "Pusta bez skryptów",
              wartosc: 16,
              opis: "41 stron ma poniżej 600 znaków tekstu w samym dokumencie.",
              wyroznij: true,
            },
            {
              etykieta: "Zakaz dla robotów AI",
              wartosc: 1,
              opis: "2 strony. To o tym mówi się najwięcej, a występuje najrzadziej.",
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Próbka 255 domen, które oddały stronę główną."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Zestawienie ostatnich dwóch słupków jest całą treścią tego badania.
            Zakaz wejścia dotyczy dwóch stron, a pusty dokument czterdziestu
            jeden. Dwadzieścia razy częstszy problem polega nie na tym, że robot
            nie chce wejść, tylko na tym, że po wejściu nie znajduje nic.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Mediana ilości tekstu w dokumencie to 3 331 znaków, czyli mniej
            więcej jedna strona maszynopisu. Sto cztery strony na 255 mają
            poniżej dwóch tysięcy znaków. To jest materiał, z którego asystent
            ma zbudować zdanie o tym, czym firma się zajmuje i komu ją polecić.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Komplet czterech warunków, czyli brak blokady, treść w dokumencie,
            dane uporządkowane i wypełniony opis, spełnia 63 strony na 255,
            czyli niecałe 25 procent.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Jedna rzecz, która nas zaskoczyła
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Plik llms.txt, czyli krótki opis serwisu pisany wprost pod modele
            językowe, ma 53 domeny z 255, czyli co piąta. Spodziewaliśmy się
            pojedynczych przypadków, bo to rozwiązanie świeże i nieobowiązkowe.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Po zajrzeniu do środka obraz się wyjaśnia. Część plików jest pisana
            ręcznie i wygląda na przemyślaną, z opisem marek i zakresu usług.
            Cztery zaczynają się od stopki „wygenerowany przez\" i nazwy
            popularnej wtyczki optymalizacyjnej. Innymi słowy: to nie jest fala
            świadomych decyzji, tylko w dużej części efekt uboczny aktualizacji
            wtyczki, która zaczęła generować ten plik sama.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Wniosek jest dla nas dwuznaczny. Z jednej strony to dowód, że
            narzędzia same popychają rynek w tę stronę. Z drugiej, plik
            wygenerowany automatycznie zawiera to samo, co i tak jest na
            stronie, więc firmie, która nie ma czego powiedzieć, nie pomoże.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Czego nie zmierzyliśmy i nie będziemy udawać, że wiemy
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Nie sprawdzaliśmy, czy którykolwiek asystent faktycznie poleca te
            firmy, bo takiego pomiaru nie da się zrobić uczciwie. Odpowiedzi
            różnią się między użytkownikami i zmieniają w czasie, więc
            pojedyncze zapytanie niczego nie dowodzi. Zmierzyliśmy warunki
            wstępne, na które właściciel strony ma wpływ, a nie wynik, na który
            nie ma go nikt.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Nie sprawdzaliśmy też podstron. Strona główna to najlepszy
            pojedynczy wskaźnik i jednocześnie najmniejsze obciążenie cudzego
            serwera, ale serwis może mieć dobrze opisane podstrony ofertowe przy
            ubogiej stronie głównej.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Co z tego wynika praktycznie
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Kolejność działań wynika wprost z liczb. Najpierw sprawdzić, czy
            strona ma treść w samym dokumencie, bo bez tego reszta nie ma
            znaczenia. Potem dopisać dane uporządkowane i opis w metadanych, co
            jest robotą na godziny, nie na tygodnie. Blokady robotów sprawdzić
            na końcu, bo statystycznie ich nie ma.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Zestawienia, na których stoi to badanie, są{" "}
            <Link href="/dane-z-badan" className="text-accent hover:underline">
              do pobrania w formacie CSV
            </Link>
            , bez rejestracji i do zacytowania z podaniem źródła. Bez nazw
            domen, bo lista firm z ich słabymi punktami to nie jest materiał do
            publikacji.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Te same cztery punkty sprawdza nasze{" "}
            <Link
              href="/widocznosc-w-ai"
              className="text-accent hover:underline"
            >
              darmowe narzędzie
            </Link>
            , na dowolnej domenie, bez rejestracji. Jeśli interesuje Cię, co
            jeszcze na tych samych 386 domenach wyszło nie tak, mamy też{" "}
            <Link
              href="/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow"
              className="text-accent hover:underline"
            >
              przegląd stanu technicznego
            </Link>{" "}
            oraz{" "}
            <Link
              href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
              className="text-accent hover:underline"
            >
              badanie zabezpieczeń poczty
            </Link>
            .
          </p>
        </div>

        <SprawdzPoBadaniu
          naglowek="Sprawdź to na żywo, jednym kliknięciem"
          opis="Pobieram wybraną domenę tak, jak robi to asystent AI, i patrzę na te same cztery punkty co w badaniu: treść w dokumencie, dane uporządkowane, opis w metadanych i blokady robotów."
          endpoint="/api/sprawdz-ai"
          pozycje={[
            { wartosc: "fluxlab.pl" },
            { wartosc: "rp.pl" },
            { wartosc: "wyborcza.pl" },
          ]}
          narzedzie={{
            href: "/widocznosc-w-ai",
            etykieta: "Sprawdź swoją domenę",
          }}
          kontakt="Chcesz, żeby ktoś poprawił to, co wyszło na czerwono?"
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Pytania
          </h2>
          <dl className="mt-5 space-y-5">
            {faqItems.map((f) => (
              <div key={f.question}>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  {f.question}
                </dt>
                <dd className="mt-1 text-gray-600 dark:text-gray-300">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Czy asystenci AI widzą strony dealerów samochodowych",
              description:
                "Badanie 386 domen dealerskich. Roboty AI blokuje 0,8 procent stron, ale 54 procent nie ma danych uporządkowanych, a 16 procent jest pustych bez uruchomienia skryptów.",
              datePublished: "2026-09-21",
              author: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
              publisher: {
                "@type": "Organization",
                name: "Fluxlab",
                url: "https://fluxlab.pl",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
