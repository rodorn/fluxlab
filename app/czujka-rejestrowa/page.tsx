import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import SpolkaCheck from "@/components/SpolkaCheck";

export const metadata: Metadata = {
  title: "Twój dłużnik może zniknąć z KRS w trzy miesiące | Fluxlab",
  description:
    "Sąd wszczyna z urzędu postępowanie o rozwiązanie spółki i daje trzy miesiące na sprzeciw. Sprawdź za darmo, czy jest na niej kontrahent. Monitoring od 99 zł.",
  alternates: { canonical: "/czujka-rejestrowa" },
  openGraph: {
    title: "Twój dłużnik może zniknąć z KRS w trzy miesiące | Fluxlab",
    description:
      "Obwieszczenie w Monitorze Sądowym uruchamia trzymiesięczny termin. Sprawdź kontrahenta za darmo, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, monitoring Monitora Sądowego i Gospodarczego",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="czujka-rejestrowa"
      tool={<SpolkaCheck />}
      breadcrumb="Czujka rejestrowa"
      eyebrow="Należności i kontrahenci"
      h1="Dłużnik może zniknąć z rejestru, a Ty się o tym nie dowiesz"
      lead="Sąd z urzędu rozwiązuje spółki, które nie składają sprawozdań. Od obwieszczenia w Monitorze Sądowym i Gospodarczym masz trzy miesiące na sprzeciw, potem podmiot znika z rejestru. Nikt Cię o tym nie zawiadomi."
      ctaLabel="Sprawdź kontrahenta"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Czy trwa postępowanie o rozwiązanie",
          desc: "Pokazujemy datę obwieszczenia i dzień, w którym mija termin na sprzeciw.",
        },
        {
          title: "Cała historia ogłoszeń od 2013 roku",
          desc: "Widać, co działo się z podmiotem przez lata.",
        },
        {
          title: "Codzienne pilnowanie Twojej listy",
          desc: "Porównujemy Twoją listę z każdym wydaniem Monitora i piszemy w dniu publikacji.",
        },
        {
          title: "Skan wsteczny całego portfela",
          desc: "Jednorazowo sprawdzamy, czy coś już przegapiłeś.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Jeden podmiot, od ręki.",
          features: [
            "historia ogłoszeń od 2013 roku",
            "wykrycie postępowania o rozwiązanie",
            "data, do której można zgłosić sprzeciw",
          ],
        },
        {
          name: "Skan wsteczny portfela",
          price: "od 290 zł",
          desc: "Cała lista kontrahentów, raz.",
          features: [
            "dopasowanie po numerze KRS i po nazwie",
            "lista podmiotów z wszczętym postępowaniem",
            "wskazanie terminów, które już minęły",
            "plik do wgrania do Waszego systemu",
          ],
          featured: true,
        },
        {
          name: "Codzienne pilnowanie",
          price: "od 99 zł/mc",
          desc: "Lista do 500 podmiotów.",
          features: [
            "sprawdzanie każdego nowego wydania",
            "alert mailem w dniu obwieszczenia",
            "miesięczne zestawienie zmian",
          ],
        },
      ]}
      faq={[
        {
          q: "Skąd biorą się te dane?",
          a: "Z jawnej wyszukiwarki Monitora Sądowego i Gospodarczego Ministerstwa Sprawiedliwości.",
        },
        {
          q: "Czy to znaczy, że spółka na pewno zostanie wykreślona?",
          a: "Nie. Obwieszczenie to wszczęcie postępowania, nie wynik. Ale termin na reakcję biegnie od dnia publikacji.",
        },
        {
          q: "Dlaczego dopasowanie idzie po nazwie, a nie po NIP?",
          a: "W ogłoszeniach NIP pojawia się rzadko, numer KRS w dwóch trzecich przypadków. Dlatego dopasowujemy po KRS i nazwie.",
        },
        {
          q: "Czy monitorujecie też upadłości?",
          a: "Nie. Od 2021 roku upadłości trafiają do Krajowego Rejestru Zadłużonych, nie do Monitora.",
        },
      ]}
      formId="order_czujka_rejestrowa"
      formHeading="Zamów sprawdzenie listy kontrahentów"
      formIntro="Napisz, ilu macie kontrahentów i w jakiej formie trzymacie listę. Odeślemy zakres, cenę i przykładowy raport."
      submitLabel="Zamów sprawdzenie"
      microCopy="Wystarczy lista nazw albo numerów KRS. Bez danych osobowych i dostępów."
      serviceName="Monitoring Monitora Sądowego i Gospodarczego dla listy kontrahentów"
      serviceDesc="Codzienne porównywanie listy kontrahentów klienta z nowymi wydaniami Monitora Sądowego i Gospodarczego, ze szczególnym uwzględnieniem postępowań o rozwiązanie podmiotu bez likwidacji, wraz z alertem w dniu obwieszczenia. Od 99 zł miesięcznie."
      serviceType="Monitoring rejestrów publicznych"
    />
  );
}
