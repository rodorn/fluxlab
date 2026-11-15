import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pilnowanie wizytówki Google od 29 zł | Fluxlab",
  description:
    "Codzienna kontrola wizytówki firmy w Google: alert, gdy zmieni się nazwa, adres, godziny, kategoria lub status. 29 zł netto.",
  alternates: { canonical: "/pilnowanie-wizytowki-google" },
  openGraph: {
    title: "Pilnowanie wizytówki Google od 29 zł | Fluxlab",
    description:
      "Codzienna kontrola wizytówki firmy w Google: alert, gdy zmieni się nazwa, adres, godziny, kategoria lub status. 29 zł netto.",
    url: "/pilnowanie-wizytowki-google",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie wizytówki Google" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-wizytowki-google"
      typ="usluga"
      breadcrumb="Pilnowanie wizytówki Google"
      h1="Ktoś zmienił godziny w Twojej wizytówce? Dowiesz się tego z maila"
      lead="Każdy może zgłosić do Google zmianę w wizytówce Twojej firmy, a Google czasem ją przyjmuje. Raz dziennie czytamy wizytówkę i wysyłamy alert, gdy zmieni się nazwa, adres, godziny otwarcia, kategoria, telefon, strona www albo status (zamknięta)."
      ctaLabel="Włącz pilnowanie wizytówki"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Zaczynamy od stanu z dziś",
          desc: "Po zamówieniu znajdujemy wizytówkę po nazwie firmy i mieście i wysyłamy jej aktualne dane. Jeśli to nie ta firma, odpowiadasz na mail, a my poprawiamy.",
        },
        {
          title: "Alert z danymi przed i po",
          desc: "W mailu widzisz, co było i co jest. Zmianę potwierdzamy drugim odczytem godzinę później, żeby chwilowe wahania nie wywoływały fałszywych alarmów.",
        },
        {
          title: "Wizytówka zniknęła",
          desc: "Jeśli Google przestanie zwracać wizytówkę albo oznaczy firmę jako zamkniętą, dostaniesz alert.",
        },
        {
          title: "Czytamy to, co widzą klienci",
          desc: "Dane pochodzą z publicznego interfejsu Google dla map. Nie logujemy się do Twojego profilu firmy i nie możemy cofnąć zmiany, to zrobisz sam w profilu.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie wizytówki Google",
          price: "29 zł/mies.",
          kup: "monitoring-wizytowka",
          desc: "Netto. Jedna wizytówka, kontrola raz dziennie.",
          features: [
            "stan wyjściowy od razu po zamówieniu",
            "alert z danymi przed i po",
            "nazwa, adres, godziny, kategoria, telefon, www, status",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać w polu zamówienia?",
          a: "Nazwę firmy i miasto, tak jak wyszukujesz ją w Mapach Google, na przykład Cukiernia Sowa Warszawa.",
        },
        {
          q: "Czy mogę pilnować kilku wizytówek?",
          a: "Jedno zamówienie to jedna wizytówka. Dla kolejnej złóż osobne zamówienie albo napisz przez formularz poniżej.",
        },
        {
          q: "Czy widzicie opinie klientów?",
          a: "Nie, ta usługa pilnuje danych firmy, nie opinii.",
        },
        {
          q: "Co jeśli nie znajdziecie wizytówki?",
          a: "Nie uruchamiamy usługi i zwracamy całą opłatę.",
        },
      ]}
      formId="order_pilnowanie_wizytowki_google"
      formHeading="Zapytaj o więcej wizytówek"
      formIntro="Masz kilka lokalizacji? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Pilnowanie wizytówki Google"
      serviceDesc="Codzienna kontrola wizytówki firmy w Google z alertem o zmianie nazwy, adresu, godzin, kategorii lub statusu, za 29 zł netto miesięcznie."
      serviceType="Monitoring"
    />
  );
}
