import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import PodgladRaportuSprzedazy from "@/components/PodgladRaportuSprzedazy";

export const metadata: Metadata = {
  title: "Sprzedaż ze Stripe co dzień na maila, 19 zł/mies. | Fluxlab",
  description:
    "Rano mail z wczorajszą sprzedażą ze Stripe: płatności, zwroty, nieudane próby i porównanie z poprzednim dniem. 19 zł netto miesięcznie.",
  alternates: { canonical: "/sprzedaz-stripe-codziennie" },
  openGraph: {
    title: "Sprzedaż ze Stripe co dzień na maila, 19 zł/mies. | Fluxlab",
    description: "Wczorajsza sprzedaż, zwroty i porównanie z poprzednim dniem w jednym mailu o 7:00.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, sprzedaż ze Stripe co dzień" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="sprzedaz-stripe-codziennie"
      breadcrumb="Sprzedaż ze Stripe co dzień"
      eyebrow="Raport sprzedaży"
      typ="usluga"
      h1="Wczorajsza sprzedaż ze Stripe w mailu, zanim zrobisz kawę"
      lead="Płacisz kartą, wklejasz klucz tylko do odczytu, a o 7:00 dostajesz mail z tym, co sprzedałeś wczoraj, ile zwróciłeś i jak to wygląda na tle poprzedniego dnia i tego samego dnia tydzień wcześniej."
      ctaLabel="Zamów raport"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Sprawdź też, czy",
          kotwica: "sklep pokazuje poprawne zasady zwrotów",
          href: "/sprawdz-zwroty",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Sprzedaż i zwroty",
          desc: "Kwota i liczba płatności z wczoraj, średnia wartość, największa płatność, zwroty oraz wynik po zwrotach.",
        },
        {
          title: "Porównanie",
          desc: "Zmiana procentowa względem poprzedniego dnia i tego samego dnia tydzień wcześniej oraz suma z ostatnich 7 dni.",
        },
        {
          title: "Nieudane płatności",
          desc: "Ile prób zapłaty się nie powiodło, żebyś zauważył problem z bramką albo kartami klientów od razu.",
        },
      ]}
      pricing={[
        {
          name: "Raport codzienny",
          price: "19 zł/mies.",
          kup: "sprzedaz-stripe-dzien",
          desc: "Netto. Mail każdego dnia około 7:00.",
          features: [
            "pierwszy raport od razu po zamówieniu",
            "każda waluta osobno",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co trzeba wpisać przy zamówieniu?",
          a: "Klucz API Stripe tylko do odczytu. W Stripe wejdź w Programiści, Klucze API, Utwórz klucz z ograniczeniami. Nadaj uprawnienie Odczyt tylko dla Charges i Refunds, resztę zostaw jako Brak. Klucz zaczyna się od rk_live_. Nie podawaj klucza sk_live_ z pełnymi uprawnieniami.",
        },
        {
          q: "Czy możecie coś zmienić na moim koncie Stripe?",
          a: "Nie. Klucz z uprawnieniem do odczytu nie pozwala pobierać pieniędzy, zwracać płatności ani zmieniać ustawień. Czytamy tylko listę płatności i zwrotów z poprzedniej doby.",
        },
        {
          q: "Co jeśli klucz nie zadziała?",
          a: "Dostaniesz mail z przeprosinami, a my anulujemy subskrypcję i zwrócimy całą opłatę. Możesz zamówić ponownie z nowym kluczem.",
        },
        {
          q: "A PayU?",
          a: "Na razie obsługujemy tylko Stripe.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na dowolny raport albo użyj panelu płatności w Stripe. Po anulowaniu raporty przestają przychodzić od następnego dnia.",
        },
      ]}
      formId="order_sprzedaz_stripe"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Sprzedaż ze Stripe co dzień"
      serviceDesc="Codzienny mail z wczorajszą sprzedażą ze Stripe: płatności, zwroty, nieudane próby i porównanie z poprzednim dniem. 19 zł netto miesięcznie."
      serviceType="Raport sprzedaży"
      poCenniku={<PodgladRaportuSprzedazy />}
    />
  );
}
