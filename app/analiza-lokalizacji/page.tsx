import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import LokalizacjaCheck from "@/components/LokalizacjaCheck";

export const metadata: Metadata = {
  title: "Analiza lokalizacji pod lokal, od 190 zł | Fluxlab",
  description:
    "Zanim podpiszesz najem, sprawdź nasycenie rynku: konkurenci w promieniu 1, 3 i 5 km i liczba mieszkańców na punkt. Darmowe sprawdzenie, raport od 190 zł.",
  alternates: { canonical: "/analiza-lokalizacji" },
  openGraph: {
    title: "Analiza lokalizacji pod lokal, od 190 zł | Fluxlab",
    description:
      "Nasycenie rynku w okolicy lokalu: konkurenci w zasięgu dojazdu, mieszkańcy na punkt, porównanie z sąsiednimi gminami.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, analiza lokalizacji pod punkt",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="analiza-lokalizacji"
      tool={<LokalizacjaCheck />}
      breadcrumb="Analiza lokalizacji"
      eyebrow="Decyzja o lokalu"
      h1="Umowa najmu na pięć lat, a rynek sprawdzony na oko"
      lead="Mapy pokazują pinezki i na tym koniec. Nie mówią, ilu mieszkańców przypada na jeden taki punkt, ani czy obok jest gmina, gdzie tych punktów jest o połowę mniej. Sprawdzamy to liczbami, zanim podpiszesz coś, z czego trudno wyjść."
      ctaLabel="Zamów pełny raport"
      ctaNote="Raport w 24 godziny"
      checks={[
        {
          title: "Konkurenci w zasięgu dojazdu, nie w linii prostej",
          desc: "Klient nie porusza się po okręgu, tylko drogami. W pełnym raporcie liczymy zasięg dziesięciu minut jazdy, bo to on decyduje, gdzie ktoś naprawdę pojedzie.",
        },
        {
          title: "Nasycenie, a nie sama liczba",
          desc: "Dwadzieścia punktów w mieście pięćdziesięciotysięcznym i w dziesięciotysięcznym to dwie zupełnie różne sytuacje. Liczy się, ilu mieszkańców przypada na jeden.",
        },
        {
          title: "Porównanie z sąsiedztwem",
          desc: "Dopiero zestawienie z sąsiednimi gminami mówi, czy to miejsce jest wyjątkowo puste, czy przeciwnie. To zdanie potrafi też posłużyć do negocjacji czynszu.",
        },
        {
          title: "Trend liczby mieszkańców",
          desc: "Gmina, która rośnie o kilka tysięcy osób w trzy lata, to inna decyzja niż gmina, która się wyludnia, nawet przy identycznej liczbie konkurentów dzisiaj.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Jedna branża, jeden promień, wynik od ręki.",
          features: [
            "konkurenci w promieniu 1, 3 i 5 km",
            "mieszkańcy na jeden punkt",
            "lista najbliższych konkurentów",
          ],
        },
        {
          name: "Raport lokalizacji",
          price: "od 190 zł",
          desc: "Jedno miejsce, pełna analiza i wniosek.",
          features: [
            "zasięg dojazdu zamiast okręgu",
            "porównanie z sąsiednimi gminami",
            "trend liczby mieszkańców",
            "wniosek: otwierać, negocjować albo odpuścić",
          ],
          featured: true,
        },
        {
          name: "Porównanie miejsc",
          price: "od 899 zł",
          desc: "Masz trzy lokale i nie wiesz który.",
          features: [
            "trzy lokalizacje w jednym zestawieniu",
            "ranking z uzasadnieniem",
            "różnica w potencjale wyrażona liczbami",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd bierzecie dane?",
          a: "Z otwartej bazy map, w której są punkty usługowe, oraz z publicznego rejestru statystycznego, skąd pochodzi liczba mieszkańców. Oba źródła są jawne, więc każdy wynik da się sprawdzić.",
        },
        {
          q: "Czy baza map obejmuje wszystkie firmy?",
          a: "Nie i mówimy to wprost. W miastach pokrycie jest bardzo dobre, na wsiach bywa niepełne. Dlatego traktujemy to jako przekrój rynku, a nie spis powszechny, i tak samo opisujemy w raporcie.",
        },
        {
          q: "Czy wskaźnik na mieszkańca zawsze ma sens?",
          a: "Nie w miejscowościach turystycznych, gdzie klientami są przyjezdni. Darmowe sprawdzenie samo Cię o tym uprzedzi, jeśli wykryje taki układ, a w pełnym raporcie liczymy wtedy inaczej.",
        },
        {
          q: "Czy to zastąpi rozmowę z pośrednikiem?",
          a: "Nie, ale zmienia Twoją pozycję w tej rozmowie. Wchodzisz z liczbami zamiast z wrażeniem, a przy negocjacji czynszu to jest cała różnica.",
        },
      ]}
      formId="order_analiza_lokalizacji"
      formHeading="Zamów raport dla swojej lokalizacji"
      formIntro="Napisz, gdzie jest lokal, jaka to branża i jaki czynsz wchodzi w grę. Odeślemy raport w 24 godziny."
      submitLabel="Zamów raport"
      microCopy="Korzystamy wyłącznie z publicznych źródeł danych. Nie potrzebujemy żadnych dokumentów ani dostępów."
      serviceName="Analiza potencjału lokalizacji pod punkt usługowy"
      serviceDesc="Ocena nasycenia rynku w zasięgu dojazdu: liczba konkurentów, liczba mieszkańców na punkt, porównanie z sąsiednimi gminami i trend demograficzny, z jednoznacznym wnioskiem. Od 190 zł."
      serviceType="Analiza rynku lokalnego pod działalność usługową"
    />
  );
}
