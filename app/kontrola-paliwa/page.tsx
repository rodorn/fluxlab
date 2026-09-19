import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kontrola paliwa we flocie, audyt tankowań, od 99 zł | Fluxlab",
  description:
    "Portal karty paliwowej pokazuje listę transakcji, ale nie zestawia ich z trasą. Dopiero to wyłapuje tankowanie do kanistra, obce auto i klon karty. Darmowy skan trzech pojazdów, audyt od 99 zł.",
  alternates: { canonical: "/kontrola-paliwa" },
  openGraph: {
    title: "Kontrola paliwa we flocie, audyt tankowań, od 99 zł | Fluxlab",
    description:
      "Tankowania zestawione z trasą i przebiegiem wyłapują kanister, obce auto i klon karty. Darmowy skan trzech pojazdów, audyt od 99 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, kontrola paliwa we flocie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kontrola-paliwa"
      breadcrumb="Kontrola paliwa"
      eyebrow="Straty we flocie"
      h1="Sprawdź, czy paliwo z Twoich kart trafia do Twoich aut"
      lead="Podejrzewasz, że coś się nie zgadza, ale portal karty pokazuje tylko listę transakcji. Dopiero zestawienie tych transakcji z przebiegami i trasą pokazuje tankowania, których nie da się wytłumaczyć. Zaczynamy od darmowego skanu trzech pojazdów, żebyś zobaczył, czy w ogóle jest o czym rozmawiać."
      ctaLabel="Zamów darmowy skan"
      ctaNote="Trzy pojazdy za jeden miesiąc, bez opłaty"
      checks={[
        {
          title: "Więcej litrów niż mieści bak",
          desc: "Najprostszy i najczęstszy sygnał. Tankowanie przekraczające pojemność zbiornika oznacza kanister albo drugie auto.",
        },
        {
          title: "Dwa tankowania, jedna karta, dwa końce Polski",
          desc: "Transakcje zbyt blisko w czasie, a zbyt daleko od siebie, żeby wykonał je ten sam pojazd.",
        },
        {
          title: "Tankowanie w dniu bez przejazdu",
          desc: "Karta pracuje, auto stoi. Zestawiam każdą transakcję z przebiegiem i trasą z danego dnia.",
        },
        {
          title: "Spalanie odstające od reszty floty",
          desc: "Pojazd, który nagle pali o kilkanaście procent więcej niż ten sam model obok, plus zakupy niepaliwowe na karcie.",
        },
      ]}
      pricing={[
        {
          name: "Skan wstępny",
          price: "0 zł",
          desc: "Trzy pojazdy, jeden miesiąc, żeby sprawdzić czy jest problem.",
          features: [
            "podstawowe reguły kontrolne",
            "lista transakcji do wyjaśnienia",
            "szacunek skali zjawiska",
            "bez zobowiązania",
          ],
        },
        {
          name: "Audyt kwartalny",
          price: "od 99 zł",
          desc: "Trzy miesiące, cała flota, z kwotą straty.",
          features: [
            "pełny zestaw reguł i mapki",
            "kwota straty w złotych",
            "raport PDF gotowy do rozmowy",
            "reguły blokad na przyszłość",
          ],
          featured: true,
        },
        {
          name: "Monitoring",
          price: "149 zł/mc",
          desc: "Chcesz wiedzieć na bieżąco, nie po roku.",
          features: [
            "comiesięczne przeliczenie reguł",
            "alarm przy nowych anomaliach",
            "śledzenie, czy blokady działają",
            "krótkie podsumowanie miesiąca",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujesz, żeby to policzyć?",
          a: "Eksportu transakcji z portalu kart paliwowych, na przykład Orlen Flota, Shell, DKV, UTA albo Circle K, oraz przebiegów pojazdów lub danych z lokalizatora. Im więcej danych o trasie, tym dokładniejszy wynik.",
        },
        {
          q: "Czy to jest dowód w sprawie przeciwko kierowcy?",
          a: "Nie i tak to opisuję w raporcie. Raport wskazuje transakcje wymagające wyjaśnienia, a nie winnego. To materiał do rozmowy i do uszczelnienia procedur, nie opinia biegłego.",
        },
        {
          q: "Co z danymi kierowców?",
          a: "To dane osobowe, więc podpisujemy umowę powierzenia, przetwarzam je wyłącznie na potrzeby raportu i kasuję po dostarczeniu wyników.",
        },
        {
          q: "Mam małą flotę, pięć aut. Ma to sens?",
          a: "Przy pięciu autach jedno nieuczciwe tankowanie tygodniowo to kilkanaście tysięcy złotych rocznie. Dlatego zaczynamy od darmowego skanu, żeby nie płacić za sprawdzenie, czy w ogóle jest problem.",
        },
      ]}
      formId="order_kontrola_paliwa"
      formHeading="Zamów kontrolę paliwa"
      formIntro="Napisz, ile masz pojazdów, z jakiej karty paliwowej korzystasz i czy masz lokalizator albo zapisy przebiegów. Zaznacz, czy chcesz zacząć od darmowego skanu trzech pojazdów."
      submitLabel="Zamów kontrolę floty"
      microCopy="Skan wstępny jest bezpłatny. Dane kierowców objęte umową powierzenia i kasowane po dostarczeniu raportu."
      serviceName="Kontrola paliwa we flocie"
      serviceDesc="Audyt tankowań z kart paliwowych zestawionych z przebiegami i trasą: wykrywanie tankowań do kanistra, obcych pojazdów i klonów karty, z kwotą straty. Skan wstępny bezpłatny, audyt od 99 zł."
      serviceType="Audyt kosztów paliwa we flocie"
    />
  );
}
