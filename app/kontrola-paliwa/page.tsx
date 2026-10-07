import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kontrola paliwa we flocie, od 99 zł | Fluxlab",
  description:
    "Portal karty paliwowej pokazuje transakcje, ale nie zestawia ich z trasą. Dopiero to wykrywa tankowanie do kanistra i klon karty. Audyt od 99 zł.",
  alternates: { canonical: "/kontrola-paliwa" },
  openGraph: {
    title: "Kontrola paliwa we flocie, od 99 zł | Fluxlab",
    description:
      "Tankowania zestawione z trasą i przebiegiem wykrywają kanister, obce auto i klon karty. Darmowy skan trzech pojazdów, audyt od 99 zł.",
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
      lead="Portal karty pokazuje tylko listę transakcji. Zestawiamy je z przebiegiem i trasą, a wtedy widać tankowania, których nie da się wytłumaczyć. Zaczynamy od darmowego skanu trzech pojazdów."
      ctaLabel="Zamów darmowy skan"
      ctaNote="Trzy pojazdy za jeden miesiąc, bez opłaty"
      powiazane={[
        {
          przed: "Pełny koszt auta na kierowcę policzycie w",
          kotwica: "kalkulatorze kosztów auta",
          href: "/kalkulator-kosztow",
          po: ".",
        },
        {
          przed: "Dopłatę paliwową kurierów sprawdzicie w",
          kotwica: "audycie faktur kurierskich i dopłat",
          href: "/audyt-kurierski",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Więcej litrów niż mieści bak",
          desc: "Najczęstszy sygnał: kanister albo drugie auto.",
        },
        {
          title: "Dwa tankowania, jedna karta, dwa końce Polski",
          desc: "Za blisko w czasie, za daleko w przestrzeni dla jednego pojazdu.",
        },
        {
          title: "Tankowanie w dniu bez przejazdu",
          desc: "Karta pracuje, auto stoi. Sprawdzamy każdą transakcję z trasą z tego dnia.",
        },
        {
          title: "Spalanie odstające od reszty floty",
          desc: "Auto pali kilkanaście procent więcej niż ten sam model obok.",
        },
      ]}
      pricing={[
        {
          name: "Skan wstępny",
          price: "0 zł",
          desc: "Trzy pojazdy, jeden miesiąc, żeby sprawdzić, czy jest problem.",
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
            "pełny zestaw reguł i mapy",
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
          q: "Czego potrzebujecie, żeby to policzyć?",
          a: "Eksportu transakcji z portalu karty (Orlen Flota, Shell, DKV, UTA, Circle K) oraz przebiegów albo danych z lokalizatora.",
        },
        {
          q: "Czy to jest dowód w sprawie przeciwko kierowcy?",
          a: "Nie. Raport wskazuje transakcje do wyjaśnienia, a nie winnego. To materiał do rozmowy i uszczelnienia procedur.",
        },
        {
          q: "Co z danymi kierowców?",
          a: "Podpisujemy umowę powierzenia, a dane kasujemy po dostarczeniu raportu.",
        },
        {
          q: "Mamy małą flotę, pięć aut. Ma to sens?",
          a: "Tak. Jedno nieuczciwe tankowanie tygodniowo to kilkanaście tysięcy złotych rocznie. Darmowy skan pokaże, czy problem jest.",
        },
      ]}
      formId="order_kontrola_paliwa"
      formHeading="Zamów kontrolę paliwa"
      formIntro="Napisz, ile masz pojazdów, jaką kartę paliwową i czy masz lokalizator albo zapisy przebiegów."
      submitLabel="Zamów kontrolę floty"
      microCopy="Skan wstępny jest bezpłatny. Dane kierowców kasujemy po raporcie."
      serviceName="Kontrola paliwa we flocie"
      serviceDesc="Audyt tankowań z kart paliwowych zestawionych z przebiegami i trasą: wykrywanie tankowań do kanistra, obcych pojazdów i klonów karty, z kwotą straty. Skan wstępny bezpłatny, audyt od 99 zł."
      serviceType="Audyt kosztów paliwa we flocie"
    />
  );
}
