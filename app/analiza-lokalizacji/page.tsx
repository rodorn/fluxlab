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
      lead="Mapy pokazują pinezki, ale nie mówią, czy rynek jest już obsadzony. Sprawdzamy to liczbami, zanim podpiszesz najem."
      ctaLabel="Zamów pełny raport"
      ctaNote="Raport w 24 godziny"
      checks={[
        {
          title: "Konkurenci w zasięgu dojazdu, nie w linii prostej",
          desc: "W pełnym raporcie liczymy zasięg dziesięciu minut jazdy, bo klient jeździ drogami, nie po okręgu.",
        },
        {
          title: "Nasycenie, a nie sama liczba",
          desc: "Liczy się, ilu mieszkańców przypada na jeden punkt.",
        },
        {
          title: "Porównanie z sąsiedztwem",
          desc: "Zestawienie z sąsiednimi gminami pokazuje, czy miejsce jest puste, czy przepełnione. Przydaje się przy negocjacji czynszu.",
        },
        {
          title: "Trend liczby mieszkańców",
          desc: "Gmina, która rośnie, to inna decyzja niż gmina, która się wyludnia.",
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
            "wniosek: otwierać, negocjować albo zrezygnować",
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
          a: "Z otwartej bazy map i publicznego rejestru statystycznego. Oba źródła są jawne.",
        },
        {
          q: "Czy baza map obejmuje wszystkie firmy?",
          a: "Nie. W miastach pokrycie jest bardzo dobre, na wsiach bywa niepełne, co zaznaczamy w raporcie.",
        },
        {
          q: "Czy wskaźnik na mieszkańca zawsze ma sens?",
          a: "Nie w miejscowościach turystycznych. Sprawdzenie Cię o tym uprzedzi, a w raporcie liczymy wtedy inaczej.",
        },
        {
          q: "Czy to zastąpi rozmowę z pośrednikiem?",
          a: "Nie, ale wchodzisz do niej z liczbami zamiast z wrażeniem.",
        },
      ]}
      formId="order_analiza_lokalizacji"
      formHeading="Zamów raport dla swojej lokalizacji"
      formIntro="Napisz, gdzie jest lokal i jaka to branża. Raport odeślemy w 24 godziny."
      submitLabel="Zamów raport"
      microCopy="Tylko publiczne źródła danych, bez dokumentów i dostępów."
      serviceName="Analiza potencjału lokalizacji pod punkt usługowy"
      serviceDesc="Ocena nasycenia rynku w zasięgu dojazdu: konkurenci, mieszkańcy na punkt, porównanie z sąsiednimi gminami, z jednoznacznym wnioskiem. Od 190 zł."
      serviceType="Analiza rynku lokalnego pod działalność usługową"
    />
  );
}
