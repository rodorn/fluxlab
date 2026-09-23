import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";
import SprawdzPoBadaniu from "@/components/SprawdzPoBadaniu";

export const metadata: Metadata = {
  title: "Rejestr hoteli gubi Kraków i Warszawę. Nasz pomiar | Fluxlab",
  description:
    "W Centralnym Wykazie Obiektów Hotelarskich 504 wpisy mają województwo zapisane jako liczba 1, a przy pobieraniu znika co piąty obiekt. Metoda i liczby.",
  alternates: {
    canonical: "/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich",
  },
  openGraph: {
    title: "Rejestr hoteli gubi Kraków i Warszawę. Nasz pomiar | Fluxlab",
    description:
      "Dwa błędy w rządowym rejestrze obiektów hotelarskich, opisane liczbami i możliwe do powtórzenia przez każdego.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie rejestru obiektów hotelarskich",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Czy to znaczy, że dane w rejestrze są nieprawdziwe?",
    answer:
      "Nie. Same wpisy wyglądają poprawnie: nazwa, adres, kategoria i liczba miejsc się zgadzają. Problem dotyczy tego, jak rejestr wydaje te dane na zewnątrz, czyli pola województwa przy pięciu miastach oraz stronicowania przy pobieraniu całości.",
  },
  {
    question: "Jak to sprawdzić samodzielnie?",
    answer:
      "Wystarczy pobrać rejestr przez jego publiczny interfejs i policzyć dwie rzeczy: ile rekordów ma województwo zapisane jako liczba oraz ile jest unikalnych identyfikatorów w porównaniu z liczbą, którą deklaruje sam rejestr. Obie liczby powinny się zgadzać i przy stronicowaniu się nie zgadzają.",
  },
  {
    question: "Dlaczego liczba zgubionych rekordów jest za każdym razem inna?",
    answer:
      "Bo kolejność wyników nie jest ustalona. Interfejs sam deklaruje, że dane nie są sortowane, więc przy pobieraniu strona po stronie część rekordów trafia dwa razy, a część nie trafia wcale. W naszych czterech pobraniach strata wyniosła kolejno 158, 188 i 707 rekordów.",
  },
  {
    question: "Kogo to realnie dotyka?",
    answer:
      "Każdego, kto buduje coś na tych danych: porównywarki, narzędzia dla branży, analizy rynku noclegowego, a także urzędów korzystających z rejestru w zestawieniach. Jeśli ktoś liczy obiekty w województwie, przy pięciu największych miastach dostanie zero.",
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
            { label: "Błędy w rejestrze hoteli" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Rządowy rejestr hoteli gubi Kraków i Warszawę
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Centralny Wykaz Obiektów Hotelarskich to jedyne miejsce, w którym
          państwo potwierdza, że dany obiekt może nazywać się hotelem.
          Pobraliśmy go w całości i policzyliśmy, co zawiera. Same wpisy są w
          porządku, natomiast sposób, w jaki rejestr wydaje dane na zewnątrz, ma
          dwa błędy, z których każdy przekłamuje wynik o kilkanaście procent.
        </p>

        <div className="mt-10">
          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Pięćset cztery obiekty leżą w województwie o nazwie „1"
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            W 504 wpisach na 3374, czyli w blisko piętnastu procentach rejestru,
            pole województwa zawiera znak „1" zamiast nazwy. Sprawdziliśmy, o
            które obiekty chodzi, i okazało się, że to nie jest przypadkowy
            rozrzut po kraju.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Obiekty z województwem zapisanym jako „1”"
          podtytul="Wszystkie 504 wpisy pochodzą z pięciu miast. Reszta rejestru ma nazwy województw poprawnie."
          slupki={[
            { etykieta: "Kraków", wartosc: 207, wyroznij: true },
            { etykieta: "Warszawa", wartosc: 122, wyroznij: true },
            { etykieta: "Wrocław", wartosc: 76, wyroznij: true },
            { etykieta: "Poznań", wartosc: 58, wyroznij: true },
            { etykieta: "Łódź", wartosc: 39, wyroznij: true },
            { etykieta: "bez podanego miasta", wartosc: 2 },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026, na pełnym pobraniu Centralnego Wykazu Obiektów Hotelarskich."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            To są miasta na prawach powiatu, więc najpewniej gdzieś w drodze
            gubi się rozróżnienie między powiatem a województwem i zostaje po
            nim techniczna jedynka. Skutek jest natomiast bardzo praktyczny: kto
            filtruje rejestr po województwie, przy tych pięciu miastach dostanie
            pustkę. Małopolska bez Krakowa to 377 obiektów zamiast 584, czyli
            ponad jedna trzecia rynku znika z zestawienia.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przy okazji drobiazg tej samej natury: jeden wpis ma województwo
            zapisane jako „Lubelskie " ze spacją na końcu, więc w każdym
            grupowaniu tworzy osobną kategorię.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Przy pobieraniu znika nawet co piąty obiekt
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Drugi błąd jest cichszy i przez to groźniejszy. Rejestr wydaje dane
            stronami i przy każdej odpowiedzi podaje, ile łącznie ma rekordów.
            Ta liczba zawsze wynosi 3374 i zawsze się zgadza. Nie zgadza się
            natomiast to, co faktycznie przychodzi.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Pobraliśmy cały rejestr cztery razy, zmieniając wielkość strony i
            odstęp między zapytaniami. Za każdym razem przyszło dokładnie 3374
            wiersze. Za każdym razem część z nich była powtórzeniem tego samego
            obiektu, a tyle samo innych nie przyszło wcale.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Ile obiektów przepadło w kolejnych pobraniach"
          podtytul="Za każdym razem przychodzi 3374 wiersze, a rejestr deklaruje 3374 rekordy. Różnica to duplikaty."
          slupki={[
            {
              etykieta: "strona po 200, z odstępem",
              wartosc: 158,
              wyroznij: true,
            },
            {
              etykieta: "strona po 200, bez odstępu",
              wartosc: 188,
              wyroznij: true,
            },
            {
              etykieta: "strona po 500, z odstępem",
              wartosc: 707,
              wyroznij: true,
            },
            { etykieta: "pobranie bez straty", wartosc: 0 },
          ]}
          jednostka=" utraconych"
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Każde pobranie liczone przez porównanie unikalnych identyfikatorów z deklarowaną liczbą rekordów."
        />

        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Przyczyna jest widoczna w samej odpowiedzi rejestru: pole mówiące o
            sortowaniu zawsze informuje, że dane nie są posortowane. Bez
            ustalonej kolejności stronicowanie nie ma sensu, bo między jedną
            stroną a drugą kolejność może się zmienić. Część rekordów trafia
            wtedy dwa razy, a część ani razu.
          </p>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Najgorsze jest to, że nic tego nie sygnalizuje. Licznik pokazuje
            poprawną liczbę, pobranie kończy się bez błędu, plik ma właściwą
            liczbę wierszy. Dopiero policzenie unikalnych identyfikatorów
            pokazuje, że brakuje co dwudziestego albo co piątego obiektu,
            zależnie od tego, jak duże strony pobierano.
          </p>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Co z tym zrobić, jeśli korzystasz z tych danych
          </h2>
          <ul className="mb-4 ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-400">
            <li className="leading-relaxed">
              Po pobraniu policz unikalne identyfikatory i porównaj je z liczbą,
              którą rejestr sam deklaruje. Jeśli się nie zgadzają, pobierz
              ponownie, aż się zgodzą.
            </li>
            <li className="leading-relaxed">
              Mniejsze strony gubią mniej. W naszym pomiarze strona po 200
              rekordów traciła około pięciu procent, a po 500 ponad dwadzieścia.
            </li>
            <li className="leading-relaxed">
              Nie filtruj po polu województwa bez wcześniejszego poprawienia
              piątki miast na prawach powiatu, bo inaczej wypadną z zestawienia
              w całości.
            </li>
            <li className="leading-relaxed">
              Przycinaj białe znaki w nazwach województw, bo jeden wpis ma
              spację na końcu.
            </li>
          </ul>

          <h2 className="mt-12 mb-5 text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Czego nie sprawdziliśmy
          </h2>
          <ul className="mb-4 ml-5 list-disc space-y-2 text-gray-600 dark:text-gray-400">
            <li className="leading-relaxed">
              Nie wiemy, czy błąd stronicowania występuje zawsze, czy zależy od
              obciążenia serwera. Zaobserwowaliśmy go w każdym z czterech
              pobrań, ale za każdym razem z inną skalą.
            </li>
            <li className="leading-relaxed">
              Nie sprawdzaliśmy pozostałych rejestrów turystycznych pod tym
              samym kątem, poza stwierdzeniem, że dwa z nich są praktycznie
              puste.
            </li>
            <li className="leading-relaxed">
              Nie zgłosiliśmy tego jeszcze nigdzie. Opisujemy to publicznie,
              ponieważ każdy, kto korzysta z tych danych, powinien wiedzieć, jak
              je pobierać, żeby nie stracić części rejestru.
            </li>
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Zobacz też inne nasze badania na publicznych danych
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow"
                className="text-accent hover:underline"
              >
                Sprawdziliśmy 386 stron dealerów samochodowych
              </Link>
            </li>
            <li>
              <Link
                href="/strefa-wiedzy/podszywanie-pod-salony-samochodowe"
                className="text-accent hover:underline"
              >
                Pod 84 procent salonów można się podszyć mailowo
              </Link>
            </li>
            <li>
              <Link
                href="/ile-spolek-znika-z-krs"
                className="text-accent hover:underline"
              >
                Ile spółek dziennie trafia do wykreślenia z KRS
              </Link>
            </li>
          </ul>
        </div>

        <SprawdzPoBadaniu
          naglowek="Zobacz, co publiczny rejestr mówi o konkretnej spółce"
          opis="Przeszukuję obwieszczenia Monitora Sądowego i Gospodarczego od 2013 roku i sprawdzamy jedną rzecz: czy wobec podmiotu toczy się postępowanie o rozwiązanie bez likwidacji. To ten sam rodzaj danych, co rejestr z tego badania, tylko inny rejestr."
          endpoint="/api/sprawdz-spolke"
          pole="zapytanie"
          pozycje={[{ wartosc: "CD PROJEKT" }, { wartosc: "ALLEGRO" }]}
          wstep="Nie masz pod ręką nazwy? Uruchom na gotowym przykładzie:"
          narzedzie={{
            href: "/ile-spolek-znika-z-krs",
            etykieta: "Sprawdź swojego kontrahenta",
          }}
          kontakt="Chcesz mieć takie sprawdzenie na całej swojej bazie kontrahentów?"
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
              headline: "Rządowy rejestr hoteli gubi Kraków i Warszawę",
              description:
                "W Centralnym Wykazie Obiektów Hotelarskich 504 wpisy mają województwo zapisane jako liczba, a przy pobieraniu znika nawet co piąty obiekt mimo poprawnego licznika.",
              datePublished: "2026-09-20",
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
