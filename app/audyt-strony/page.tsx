import type { Metadata } from "next";

import AudytCheck from "@/components/AudytCheck";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Darmowy audyt techniczny strony, raport w minutę | Fluxlab",
  description:
    "Wpisz adres, a zmierzę szybkość na komputerze i na telefonie, sprawdzę certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Raport z listą poprawek w kolejności i z ceną naprawy. Bez rejestracji i bez podawania e-maila.",
  alternates: { canonical: "/audyt-strony" },
  openGraph: {
    title: "Darmowy audyt techniczny strony | Fluxlab",
    description:
      "Szybkość na telefonie, certyfikat, widoczność w wyszukiwarce i u asystentów AI. Raport z kolejnością poprawek i wyceną naprawy, za darmo i bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, darmowy audyt techniczny strony",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-strony"
      tool={<AudytCheck />}
      breadcrumb="Audyt strony"
      eyebrow="Darmowy audyt techniczny"
      h1="Zobacz, co jest nie tak z Twoją stroną, zanim zapłacisz komukolwiek"
      lead="Wpisz adres i poczekaj kilkadziesiąt sekund. Zmierzę szybkość na komputerze i osobno na telefonie, zważę każdy plik, sprawdzę certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI oraz zabezpieczenia poczty. Dostaniesz raport z listą poprawek ułożoną w kolejności i z ceną za naprawę. Za darmo, bez rejestracji, bez podawania adresu e-mail."
      ctaLabel="Porozmawiajmy o naprawie"
      ctaNote="Diagnoza nic nie kosztuje"
      checks={[
        {
          title: "Osobny pomiar dla telefonu",
          desc: "Pobieram stronę drugi raz z nagłówkami telefonu i sprawdzam, czy układ ma się czym przestawić, czy obrazy mają wersje na mniejszy ekran i ile to wszystko waży na łączu komórkowym.",
        },
        {
          title: "Liczby, nie wrażenia",
          desc: "Ważę każdy plik z osobna zamiast wierzyć deklaracjom serwera i podaję, ilu plików nie udało się zważyć. Przy każdym ustaleniu widzisz, co dokładnie zmierzyłem.",
        },
        {
          title: "Kolejność zamiast listy uwag",
          desc: "Darmowe skanery oddają setkę uwag bez znaczenia. Tu dostajesz kilka kroków w kolejności wykonania, z wyjaśnieniem, dlaczego akurat ten jest pierwszy.",
        },
        {
          title: "Cena naprawy od razu w raporcie",
          desc: "Przy każdym problemie stoi koszt jego usunięcia, a na końcu cena za komplet. Widzisz też, które rzeczy zrobisz sam bez programisty, więc nie płacisz za to nikomu.",
        },
      ]}
      pricing={[
        {
          name: "Audyt",
          price: "0 zł",
          desc: "Pełny raport, od ręki, bez zakładania konta.",
          features: [
            "pomiar na komputerze i na telefonie",
            "certyfikat, wyszukiwarka, asystenci AI, poczta",
            "kolejność poprawek z uzasadnieniem",
            "wycena naprawy i lista potrzebnych dostępów",
          ],
          featured: true,
        },
        {
          name: "Naprawa warstwy krytycznej",
          price: "od 150 zł",
          desc: "Tylko to, co blokuje. Reszta czeka.",
          features: [
            "rzeczy oznaczone w raporcie jako krytyczne",
            "ponowny pomiar po zmianach",
            "krótkie podsumowanie, co się zmieniło",
          ],
        },
        {
          name: "Naprawa kompletu",
          price: "wg raportu",
          desc: "Wszystkie ustalenia z audytu w jednym podejściu, taniej niż każde osobno.",
          features: [
            "wszystkie poprawki z raportu",
            "rabat rosnący z liczbą pozycji",
            "ponowny audyt na dowód",
            "wycena wiążąca przez 30 dni",
          ],
        },
      ]}
      faq={[
        {
          q: "Czemu to jest za darmo?",
          a: "Bo diagnoza zajmuje maszynie kilkadziesiąt sekund, a naprawa zajmuje mnie. Wolę, żeby ktoś przyszedł do mnie z gotową listą i sam zdecydował, czy chce ją zlecić, niż żeby płacił mi za dowiedzenie się, co jest nie tak. Jeżeli okaże się, że strona jest w porządku, raport tak powie i nie będę szukał problemów na siłę.",
        },
        {
          q: "Czym to się różni od PageSpeed Insights?",
          a: "PageSpeed uruchamia przeglądarkę i mierzy czas rysowania, czego ja nie robię i wprost o tym piszę w raporcie. Za to sprawdzam rzeczy, których PageSpeed nie rusza: certyfikat i jego zgodność z domeną, duplikat wersji z www i bez www, dostęp dla robotów asystentów AI, zabezpieczenia poczty oraz to, czy strona nie prosi wyszukiwarki, żeby ją pominęła. Na końcu podaję cenę naprawy, a nie samą ocenę.",
        },
        {
          q: "Czy muszę podać e-mail?",
          a: "Nie. Raport pokazuje się na ekranie od razu i jest kompletny. Adres podajesz tylko wtedy, gdy chcesz dostać ten sam dokument na skrzynkę, żeby przesłać go dalej informatykowi albo agencji.",
        },
        {
          q: "Czy audyt obciąży mój serwer?",
          a: "Nie w stopniu, który dałoby się zauważyć. Pobieram stronę główną dwa razy i najwyżej trzydzieści plików, które i tak pobiera każdy odwiedzający. Przedstawiam się w nagłówku jako FluxlabAudyt, więc zobaczycie mnie w logach.",
        },
        {
          q: "Czy potrzebujesz dostępów do czegokolwiek?",
          a: "Do audytu nie, wystarczy publiczny adres. Dostępy są potrzebne dopiero przy naprawie i raport wypisuje dokładnie które. Nigdy nie potrzebuję Waszych haseł, tylko konta nadanego mnie, które cofniecie jednym kliknięciem po zakończeniu pracy.",
        },
        {
          q: "Skąd mam wiedzieć, że wycena nie jest naciągana?",
          a: "Bo przy każdym pojedynczym problemie stoi jego cena i widzicie, z czego składa się suma. Cena za komplet jest niższa niż suma pozycji, bo dostępy, wdrożenie i testy robi się raz. Część rzeczy raport oznacza jako możliwe do zrobienia samodzielnie i wtedy wprost mówi, żeby za nie nie płacić.",
        },
      ]}
      formId="audyt_strony_naprawa"
      formHeading="Raport pokazał coś, czego nie chcesz ruszać sam"
      formIntro="Wklej adres strony i napisz, która pozycja z raportu Cię niepokoi. Odpiszę, ile to zajmie i czy da się to zrobić taniej, niż wyszło w wycenie."
      submitLabel="Napisz w sprawie naprawy"
      microCopy="Odpisuję zwykle tego samego dnia. Ustalenia prowadzę mailowo."
      serviceName="Darmowy audyt techniczny strony internetowej"
      serviceDesc="Bezpłatne badanie strony: szybkość na komputerze i na telefonie, waga plików, certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty, z listą poprawek w kolejności i wyceną naprawy."
      serviceType="Audyt techniczny strony internetowej"
    />
  );
}
