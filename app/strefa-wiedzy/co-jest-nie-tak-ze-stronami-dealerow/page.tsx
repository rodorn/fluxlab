import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WykresSlupkowy from "@/components/WykresSlupkowy";

export const metadata: Metadata = {
  title: "Sprawdziliśmy 386 stron dealerów samochodowych. Wyniki | Fluxlab",
  description:
    "Ile stron dealerskich nie pozwala ustalić sprzedawcy, ile nie ma mapy strony, ile domen jest zapisanych na obce firmy i ile stron odpowiada pod dwoma adresami naraz. Pomiar na 386 domenach, z metodą i zastrzeżeniami.",
  alternates: {
    canonical: "/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow",
  },
  openGraph: {
    title: "Sprawdziliśmy 386 stron dealerów samochodowych. Wyniki | Fluxlab",
    description:
      "Pomiar na 386 domenach: dane rejestrowe, mapy strony, właściciele domen i podwójne adresy. Z metodą, liczbami i tym, czego nie udało się sprawdzić.",
    locale: "pl_PL",
    type: "article",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, badanie stron dealerów samochodowych",
      },
    ],
  },
};

const faqItems = [
  {
    question: "Skąd wzięliście listę 386 domen?",
    answer:
      "To publiczna lista stron autoryzowanych dealerów i serwisów samochodowych w Polsce, zebrana z ogólnodostępnych źródeł branżowych. Nie zawiera żadnych danych osobowych, tylko adresy firmowych stron internetowych.",
  },
  {
    question: "Czy badanie nie obciążyło tych serwerów?",
    answer:
      "Nie. Każda strona dostała od kilku do kilkunastu zwykłych zapytań, rozłożonych w czasie, czyli mniej niż jeden odwiedzający przeglądający ofertę. Nie testowaliśmy wydajności, nie próbowaliśmy się nigdzie logować i korzystaliśmy wyłącznie z treści dostępnych publicznie oraz z publicznych rejestrów państwowych.",
  },
  {
    question: "Czy wyniki dotyczą tylko motoryzacji?",
    answer:
      "Zmierzyliśmy tylko tę branżę i tylko o niej możemy mówić z liczbami. Mechanizmy są jednak wspólne dla każdej branży, bo dotyczą rejestru domen, wykazu podatników i tego, jak wyszukiwarka odkrywa podstrony. W hurtowniach czy firmach transportowych spodziewamy się innych proporcji, ale tego jeszcze nie zbadaliśmy.",
  },
  {
    question: "Znaleźliście coś u nas, co dalej?",
    answer:
      "Każdy z opisanych problemów ma na tej stronie darmowe narzędzie, które sprawdzi konkretny adres w kilkanaście sekund i pokaże surowy wynik, bez rejestracji i bez zostawiania maila. Dopiero naprawa jest płatna.",
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
            { label: "Badanie stron dealerów" },
          ]}
        />

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Sprawdziliśmy 386 stron dealerów samochodowych
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Nie pytaliśmy nikogo o zdanie i nie wysyłaliśmy ankiet. Wzięliśmy listę
          firmowych stron polskich dealerów i serwisów, a potem sprawdziliśmy
          cztery rzeczy, które da się zmierzyć obiektywnie: czy klient ustali ze
          strony, komu płaci, czy wyszukiwarka dostaje listę podstron, kto
          formalnie jest właścicielem domeny i czy strona nie odpowiada pod dwoma
          adresami naraz. Poniżej liczby, metoda i uczciwa lista tego, czego nie
          udało się rozstrzygnąć.
        </p>

        <div className="prose prose-gray dark:prose-invert mt-10 max-w-none">
          <h2>Czterech na pięciu nie da się zidentyfikować przed przelewem</h2>
          <p>
            Zanim firma zapłaci innej firmie, jej księgowość ustala, kto jest
            sprzedawcą, i sprawdza go w wykazie podatników VAT. Przy kwotach
            powyżej piętnastu tysięcy złotych zapłata na rachunek spoza wykazu
            oznacza dla kupującego utratę kosztu podatkowego, więc ten test robi
            się sam z siebie. Do jego wykonania potrzebny jest numer NIP, a ten
            powinien być na stronie.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Czy ze strony da się ustalić sprzedawcę"
          podtytul="303 domeny, które odpowiedziały. Pozostałe 83 z listy nie mają już nawet wpisu w systemie nazw domen."
          slupki={[
            {
              etykieta: "Brak numeru NIP gdziekolwiek na stronie",
              wartosc: 194,
              opis: "Sprawdzane były też regulamin, polityka prywatności i podstrona kontaktu.",
              wyroznij: true,
            },
            {
              etykieta: "Jest tylko NIP importera, nie sprzedawcy",
              wartosc: 40,
              opis: "Numer jednej spółki figuruje w ten sposób na 48 różnych domenach.",
              wyroznij: true,
            },
            {
              etykieta: "Sprzedawca zidentyfikowany poprawnie",
              wartosc: 67,
            },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Dane rejestrowe z publicznego wykazu podatników VAT Ministerstwa Finansów."
        />

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Najciekawszy jest środkowy słupek. Czterdzieści stron podaje numer,
            owszem, tylko że należy on do importera marki, a nie do spółki, która
            wystawi fakturę. Klient, który sprawdzi ten numer, zobaczy zupełnie
            inną firmę niż ta, z którą rozmawia. To gorsze niż brak numeru, bo
            wygląda na komplet danych.
          </p>
          <p>
            <Link href="/dane-sprzedawcy">
              Sprawdź swoją stronę tym samym narzędziem
            </Link>
            , którym zrobiliśmy ten pomiar.
          </p>

          <h2>Dwie trzecie stron nie daje wyszukiwarce listy podstron</h2>
          <p>
            Mapa strony to plik z listą adresów, który wyszukiwarka pobiera jednym
            zapytaniem, zamiast odkrywać podstrony klikaniem w linki. Przy stronie
            wizytówce nie ma to znaczenia. Przy katalogu z setkami ofert decyduje
            o tym, ile z nich w ogóle trafi do wyników wyszukiwania.
          </p>
        </div>

        <WykresSlupkowy
          tytul="Stan mapy strony"
          podtytul="26 domen, które udało się ocenić w próbce czterdziestu. Reszta nie odpowiedziała."
          slupki={[
            {
              etykieta: "Nie mają mapy strony w ogóle",
              wartosc: 16,
              wyroznij: true,
            },
            {
              etykieta: "Mają mapę, ale wszystkie sprawdzone adresy są martwe",
              wartosc: 2,
              opis: "Wyszukiwarka dostaje listę stron, z których żadna nie działa.",
              wyroznij: true,
            },
            { etykieta: "Bez zastrzeżeń", wartosc: 8 },
          ]}
          zrodlo="Pomiar Fluxlab, wrzesień 2026. Sprawdzana była próbka adresów z każdej mapy, a nie całe serwisy, żeby nie obciążać cudzych serwerów."
        />

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p>
            Te dwa przypadki ze środka są warte osobnego zdania. Mapa strony jest,
            wyszukiwarka ją pobiera, tylko że wszystkie wypisane w niej adresy
            zwracają błąd. W jednym z nich powód okazał się prozaiczny: plik
            wskazuje adresy w wersji bez www, a ta wersja przestała działać.
            Nikt tego nie zauważył, bo w przeglądarce właściciela wszystko
            wygląda normalnie.
          </p>
          <p>
            <Link href="/mapa-strony">Sprawdź mapę swojej strony</Link>.
          </p>

          <h2>Dziesięć firm nie jest właścicielem własnego adresu</h2>
          <p>
            W rejestrze domen wpisany jest jeden podmiot, zwany abonentem, i to on
            decyduje o domenie. A skoro o domenie, to również o stronie i o całej
            poczcie w tej domenie. Przeszliśmy przez rejestr i w dziesięciu
            przypadkach abonentem okazała się firma informatyczna albo agencja
            reklamowa, czyli najczęściej ten, kto kiedyś robił stronę.
          </p>
          <p>
            Nie nazywamy tego oszustwem i nie sugerujemy złej woli. Bywa, że jest
            to układ świadomy, oparty na umowie. Znacznie częściej jest to
            pozostałość po wdrożeniu sprzed lat, o której nikt nie pamięta,
            dopóki nie trzeba czegoś zmienić albo dopóki nie zbliża się termin
            odnowienia, a przypomnienia z rejestru idą na adres abonenta.
          </p>
          <p>
            <Link href="/wlasnosc-domeny">
              Sprawdź, kto jest abonentem Twojej domeny
            </Link>
            . Dane pochodzą z jawnego rejestru, więc każdy może to potwierdzić
            samodzielnie.
          </p>

          <h2>Co się nie potwierdziło</h2>
          <p>
            Zaczynaliśmy z hipotezą, że na stronach znajdziemy numery rachunków
            spoza wykazu podatników, co byłoby najpoważniejszym z możliwych
            ustaleń, bo uderza wprost w kupującego. Rachunek podaje jednak tylko
            dwanaście stron na trzysta trzy, a wszystkie trzynaście znalezionych
            numerów figurowało w wykazie przy właściwej firmie. Hipoteza upadła i
            tak ją zapisujemy.
          </p>
          <p>
            Druga porzucona hipoteza dotyczyła blokowania robotów wyszukiwarek.
            Osiem domen odmawiało dostępu naszemu narzędziu, co wyglądało na
            celowy filtr. Powtórka pomiaru pokazała, że odmowa dotyczy każdego
            ruchu spoza zwykłej przeglądarki i pochodzi od jednego dostawcy
            infrastruktury obsługującego te strony. To nie jest błąd tych firm i
            nie znalazło się w statystykach.
          </p>

          <h2>Czego nie sprawdziliśmy</h2>
          <ul>
            <li>
              Nie uruchamialiśmy przeglądarki, więc strony budujące treść po
              stronie klienta mogły zostać zaliczone do braków niesłusznie.
            </li>
            <li>
              Nie czytaliśmy regulaminów w plikach PDF ani danych wklejonych jako
              obrazek. Jeśli numer NIP jest tylko tam, nasze narzędzie go nie
              zobaczy, ale nie zobaczą go też narzędzia po stronie kupującego.
            </li>
            <li>
              Nie sprawdzaliśmy, które wersje adresów są faktycznie zaindeksowane
              w wyszukiwarce. Do tego potrzebny jest dostęp, którego nie mamy i o
              który nie prosiliśmy.
            </li>
            <li>
              Osiemdziesiąt trzy domeny z listy nie odpowiedziały w ogóle, więc
              nie liczymy ich ani na plus, ani na minus.
            </li>
          </ul>

          <h2>Wniosek</h2>
          <p>
            Żaden z tych czterech problemów nie jest efektowny i żaden nie wywala
            strony. Wszystkie łączy natomiast jedna cecha: są niewidoczne z fotela
            właściciela. W przeglądarce, w której strona działa, poczta chodzi, a
            domena się odnawia, nie widać ani tego, kto formalnie ma do niej
            prawo, ani tego, czego nie widzi wyszukiwarka, ani tego, czego nie
            znajdzie księgowość klienta przed przelewem. Dlatego każde z tych
            czterech sprawdzeń zrobiliśmy darmowym narzędziem, które daje surowy
            wynik od ręki.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
          <p className="text-base font-bold text-gray-900 dark:text-white">
            Sprawdź swoją stronę tymi samymi narzędziami
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["/dane-sprzedawcy", "Czy klient ustali, komu płaci"],
              ["/mapa-strony", "Czy wyszukiwarka ma listę Twoich podstron"],
              ["/wlasnosc-domeny", "Kto jest właścicielem Twojej domeny"],
              ["/podwojny-adres", "Czy Google widzi Twoją stronę podwójnie"],
            ].map(([href, tytul]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-accent hover:underline"
                >
                  {tytul}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Każde działa od ręki, bez rejestracji i bez zostawiania adresu.
          </p>
        </div>

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
