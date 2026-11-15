import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Wycena auta z ogłoszeń Otomoto, 19 zł | Fluxlab",
  description:
    "Wklej link do ogłoszenia z Otomoto, a dostaniesz mailem raport cen podobnych aut: mediana, zakres i najbardziej podobne oferty. 19 zł netto.",
  alternates: { canonical: "/wycena-auta-z-ogloszen" },
  openGraph: {
    title: "Wycena auta z ogłoszeń Otomoto, 19 zł | Fluxlab",
    description: "Raport cen podobnych aut z Otomoto dla modelu, rocznika i przebiegu z Twojego ogłoszenia.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, wycena auta z ogłoszeń" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="wycena-auta-z-ogloszen"
      breadcrumb="Wycena auta z ogłoszeń"
      eyebrow="Wycena auta z rynku"
      h1="Czy cena w ogłoszeniu jest rynkowa? Sprawdź na tle podobnych aut"
      lead="Wklej link do ogłoszenia z Otomoto. Odczytamy markę, model, rocznik, przebieg i paliwo, znajdziemy podobne oferty i wyślemy mail z medianą cen, zakresem i listą najbardziej podobnych aut. Dla kupującego to punkt odniesienia przed negocjacją, dla sprzedającego sprawdzenie ceny przed wystawieniem."
      ctaLabel="Zamów wycenę"
      ctaNote="19 zł netto jednorazowo, raport mailem"
      powiazane={[
        {
          przed: "Przed zakupem policz też",
          kotwica: "koszty utrzymania auta",
          href: "/kalkulator-kosztow",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Podobne oferty, nie przypadkowe",
          desc: "Porównujemy ten sam model i rodzaj paliwa, rocznik w zakresie plus minus jeden rok i przebieg plus minus 30 procent.",
        },
        {
          title: "Mediana, zakres i Twoja pozycja",
          desc: "W raporcie jest mediana cen ofertowych, środkowa połowa ogłoszeń, najtańsza i najdroższa oferta oraz odsetek ogłoszeń tańszych od Twojego.",
        },
        {
          title: "Lista najbardziej podobnych aut",
          desc: "Osiem ogłoszeń najbliższych pod względem rocznika i przebiegu, z ceną, miastem i linkiem.",
        },
      ]}
      pricing={[
        {
          name: "Wycena jednego auta",
          price: "19 zł",
          kup: "auto-wycena",
          desc: "Netto, jednorazowo. Raport z cen ofertowych z Otomoto, wysyłany mailem po zamówieniu.",
          features: ["odczyt parametrów z ogłoszenia", "mediana i zakres cen", "osiem najbardziej podobnych ofert"],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy to wycena rzeczoznawcy?",
          a: "Nie. To zestawienie cen ofertowych z Otomoto, a nie cen, za które auta faktycznie sprzedano. Raport nie uwzględnia wyposażenia, stanu technicznego ani historii auta.",
        },
        {
          q: "Jaki link wkleić?",
          a: "Adres ogłoszenia z Otomoto, który zaczyna się od otomoto.pl/osobowe/oferta. Może to być Twoje ogłoszenie albo auto, które chcesz kupić.",
        },
        {
          q: "Co jeśli podobnych ogłoszeń jest mało?",
          a: "Gdy znajdziemy mniej niż pięć podobnych ofert z ceną, napiszemy o tym w mailu zamiast podawać mało wiarygodną medianę.",
        },
        {
          q: "Ile czeka się na raport?",
          a: "Wysyłka działa automatycznie, zwykle w ciągu kilkunastu minut od zamówienia.",
        },
      ]}
      formId="order_auto_wycena"
      formHeading="Zamów wycenę auta"
      formIntro="Wklej link do ogłoszenia z Otomoto. Raport wyślemy mailem po zamówieniu."
      submitLabel="Zamów wycenę"
      microCopy="19 zł netto jednorazowo, bez abonamentu."
      serviceName="Wycena auta z ogłoszeń"
      serviceDesc="Raport cen podobnych aut z Otomoto dla wskazanego ogłoszenia. 19 zł netto jednorazowo."
      serviceType="Wycena auta z ogłoszeń"
    />
  );
}
