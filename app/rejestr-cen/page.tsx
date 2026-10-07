import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import CenyCheck from "@/components/CenyCheck";

export const metadata: Metadata = {
  title: "Najniższa cena z 30 dni i rejestr cen, od 49 zł | Fluxlab",
  description:
    "Przy każdej obniżce sklep ma podać najniższą cenę z 30 dni. Sprawdzamy każdą przecenioną pozycję z zewnątrz i pokazujemy te bez tej informacji. Od 49 zł.",
  alternates: { canonical: "/rejestr-cen" },
  openGraph: {
    title: "Najniższa cena z 30 dni i rejestr cen, od 49 zł | Fluxlab",
    description:
      "Skan wszystkich przecen w sklepie i lista tych bez wymaganej informacji o najniższej cenie z 30 dni. Bez dostępu do panelu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, rejestr cen w sklepie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="rejestr-cen"
      tool={<CenyCheck />}
      breadcrumb="Rejestr cen"
      eyebrow="Obowiązek informowania o cenie"
      h1="Przecena bez informacji o cenie z 30 dni to ryzyko, którego nie widać z panelu"
      lead="Wtyczka liczy cenę minimalną z własnej bazy, która bywa czyszczona albo nadpisana importem. Sprawdzamy każdą przecenę z zewnątrz, tak jak zobaczy ją kontrola."
      ctaLabel="Sprawdź nasz sklep"
      ctaNote="Wynik tego samego dnia"
      checks={[
        {
          title: "Każda przecena, nie próbka",
          desc: "Bierzemy listę przecenionych produktów ze sklepu i sprawdzamy kartę po karcie.",
        },
        {
          title: "Tylko właściwy komunikat",
          desc: "„30 dni” o zwrocie towaru się nie liczy. Uznajemy wyłącznie najniższą cenę sprzed obniżki.",
        },
        {
          title: "Dowód do sprawdzenia",
          desc: "Przy każdej niezgodności cena przed i po oraz link do karty produktu.",
        },
        {
          title: "Rejestr cen",
          desc: "Codziennie zapisujemy ceny sklepu. Po 30 dniach masz niezależną historię na wypadek sporu.",
        },
      ]}
      pricing={[
        {
          name: "Skan sklepu",
          price: "49 zł",
          desc: "Jednorazowe sprawdzenie wszystkich przecen.",
          features: [
            "lista pozycji bez wymaganej informacji",
            "raport PDF z linkami do kart",
          ],
          featured: true,
        },
        {
          name: "Skan i naprawa",
          price: "od 590 zł",
          desc: "Poprawiamy liczenie i wyświetlanie ceny minimalnej.",
          features: [
            "wszystko ze skanu",
            "warianty i zestawy",
            "ponowny skan po zmianach",
          ],
        },
        {
          name: "Rejestr cen",
          price: "99 zł/mc",
          desc: "Codzienny zapis cen jako dowód.",
          features: [
            "historia ceny każdego produktu",
            "sygnał, gdy przecena rusza bez komunikatu",
          ],
        },
      ]}
      faq={[
        {
          q: "Od jakiej ceny liczy się najniższą cenę z 30 dni?",
          a: "Od wszystkich cen z 30 dni przed obniżką, a obok ceny obniżonej podaje się najniższą z nich (art. 4 ust. 2 ustawy o informowaniu o cenach). Produkt w ofercie krócej: od pierwszego dnia sprzedaży.",
        },
        {
          q: "Jaka jest kara za brak tej informacji?",
          a: "Do 20 000 zł, przy powtórnych naruszeniach do 40 000 zł (art. 6 ustawy). Nakłada ją Inspekcja Handlowa na sklep, nie na dostawcę wtyczki.",
        },
        {
          q: "Czego potrzebujecie do skanu?",
          a: "Tylko adresu sklepu. Korzystamy z danych publicznych, bez loginu i wtyczki.",
        },
        {
          q: "A jeśli nic nie znajdziecie?",
          a: "Wtedy nie płacisz za skan.",
        },
      ]}
      formId="order_rejestr_cen"
      formHeading="Sprawdź swój sklep"
      formIntro="Podaj adres sklepu i silnik. Jeśli nie znajdziemy niezgodności, nie płacisz."
      submitLabel="Zamów skan sklepu"
      microCopy="Skan tylko publicznych stron sklepu, bez dostępów."
      serviceName="Skan obowiązku informowania o najniższej cenie z 30 dni"
      serviceDesc="Sprawdzenie wszystkich przecenionych pozycji w sklepie pod kątem obowiązkowej informacji o najniższej cenie z 30 dni przed obniżką, wraz z raportem PDF. Od 49 zł."
      serviceType="Audyt zgodności prezentacji cen w sklepie internetowym"
    />
  );
}
