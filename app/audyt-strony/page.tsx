import type { Metadata } from "next";

import AudytCheck from "@/components/AudytCheck";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Darmowy audyt techniczny strony, raport w minutę | Fluxlab",
  description:
    "Wpisz adres, a zmierzymy szybkość, certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Bez rejestracji i bez e-maila.",
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
      lead="Wpisz adres i poczekaj kilkadziesiąt sekund. Zmierzymy szybkość na komputerze i telefonie, certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty. Dostaniesz listę poprawek w kolejności, z ceną naprawy. Za darmo i bez rejestracji."
      ctaLabel="Porozmawiajmy o naprawie"
      ctaNote="Diagnoza nic nie kosztuje"
      checks={[
        {
          title: "Osobny pomiar dla telefonu",
          desc: "Sprawdzamy układ, obrazy i wagę strony na łączu komórkowym.",
        },
        {
          title: "Liczby, nie wrażenia",
          desc: "Ważymy każdy plik z osobna. Przy każdym ustaleniu widzisz, co zmierzyliśmy.",
        },
        {
          title: "Kolejność zamiast listy uwag",
          desc: "Kilka kroków w kolejności wykonania zamiast setki uwag bez znaczenia.",
        },
        {
          title: "Cena naprawy w raporcie",
          desc: "Przy każdym problemie koszt usunięcia. Widzisz też, co zrobisz sam.",
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
            "wycena naprawy",
          ],
          featured: true,
        },
        {
          name: "Naprawa warstwy krytycznej",
          price: "od 150 zł",
          desc: "Tylko to, co blokuje.",
          features: [
            "poprawki oznaczone jako krytyczne",
            "ponowny pomiar po zmianach",
          ],
        },
        {
          name: "Naprawa kompletu",
          price: "wg raportu",
          desc: "Wszystkie ustalenia naraz, taniej niż osobno.",
          features: [
            "wszystkie poprawki z raportu",
            "ponowny audyt na dowód",
            "wycena wiążąca przez 30 dni",
          ],
        },
      ]}
      faq={[
        {
          q: "Czemu to jest za darmo?",
          a: "Diagnoza zajmuje maszynie kilkadziesiąt sekund. Wolimy, żeby klient przyszedł z gotową listą i sam zdecydował, czy zleca naprawę.",
        },
        {
          q: "Czym to się różni od PageSpeed Insights?",
          a: "Nie mierzymy czasu rysowania w przeglądarce. Sprawdzamy za to certyfikat, wersje z www i bez, dostęp dla asystentów AI i pocztę, a na końcu podajemy cenę naprawy.",
        },
        {
          q: "Czy musimy podać e-mail?",
          a: "Nie. Raport pokazuje się od razu na ekranie. Adres podajesz tylko, gdy chcesz dostać go na skrzynkę.",
        },
        {
          q: "Czy potrzebujecie dostępów?",
          a: "Do audytu nie, wystarczy publiczny adres. Przy naprawie raport wypisuje, które dostępy są potrzebne.",
        },
      ]}
      formId="audyt_strony_naprawa"
      formHeading="Raport pokazał coś, czego nie chcesz ruszać sam"
      formIntro="Wklej adres strony i napisz, która pozycja z raportu Cię niepokoi. Odpiszemy, ile to zajmie."
      submitLabel="Napisz w sprawie naprawy"
      microCopy="Odpisujemy zwykle tego samego dnia. Ustalenia prowadzimy mailowo."
      serviceName="Darmowy audyt techniczny strony internetowej"
      serviceDesc="Bezpłatne badanie strony: szybkość na komputerze i na telefonie, waga plików, certyfikat, widoczność w wyszukiwarce, dostęp dla asystentów AI i zabezpieczenia poczty, z listą poprawek w kolejności i wyceną naprawy."
      serviceType="Audyt techniczny strony internetowej"
    />
  );
}
