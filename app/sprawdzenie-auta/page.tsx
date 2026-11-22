import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladAuta } from "@/components/SprawdzenieAuta";

export const metadata: Metadata = {
  title: "Sprawdzenie auta przed zakupem po VIN, 19 zł | Fluxlab",
  description:
    "Podajesz VIN, a w kilka minut dostajesz mailem raport: poprawność numeru, producent, wycofania marki w UE i lista kontrolna oględzin. 19 zł netto.",
  alternates: { canonical: "/sprawdzenie-auta" },
  openGraph: {
    title: "Sprawdzenie auta przed zakupem po VIN, 19 zł | Fluxlab",
    description: "Poprawność VIN, wycofania marki w UE, link do Historii pojazdu i lista kontrolna oględzin.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, sprawdzenie auta przed zakupem" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="sprawdzenie-auta"
      tool={<PodgladAuta />}
      typ="usluga"
      breadcrumb="Sprawdzenie auta"
      h1="Sprawdź auto po numerze VIN, zanim wpłacisz zaliczkę"
      lead="Podajesz VIN, a my sprawdzamy jego strukturę, ustalamy producenta i fabrykę oraz szukamy wycofań marki w unijnym systemie Safety Gate. Do raportu dokładamy link do Historii pojazdu z danymi do wpisania i listę kontrolną oględzin."
      ctaLabel="Zamów sprawdzenie"
      ctaNote="19 zł netto jednorazowo, płatność kartą"
      checks={[
        {
          title: "Czy VIN jest prawdziwy",
          desc: "Długość, niedozwolone znaki, region, rok modelowy i cyfra kontrolna. Producenta i fabrykę ustalamy z dekodera NHTSA.",
        },
        {
          title: "Wycofania marki w UE",
          desc: "Zgłoszenia z systemu Safety Gate dla marki i modelu, z datą, ryzykiem i linkiem do zgłoszenia. Dotyczą partii aut, nie zawsze Twojego egzemplarza.",
        },
        {
          title: "Historia pojazdu i oględziny",
          desc: "Link do rządowej Historii pojazdu z danymi gotowymi do wpisania oraz lista kontrolna na oględziny i jazdę próbną.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie auta",
          price: "19 zł",
          kup: "sprawdzenie-auta",
          desc: "Netto, jednorazowo. Jeden VIN, jeden raport mailem.",
          features: [
            "poprawność VIN, producent i fabryka",
            "wycofania marki z systemu Safety Gate UE",
            "link do Historii pojazdu i lista kontrolna oględzin",
            "zwrot pieniędzy, gdy VIN jest błędny",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co dokładnie dostaniesz?",
          a: "Mail z raportem: ocena numeru VIN, producent i fabryka, wycofania marki z Safety Gate, link do Historii pojazdu z danymi do wpisania i lista kontrolna oględzin.",
        },
        {
          q: "Czy raport pokazuje przebieg, szkody i właścicieli?",
          a: "Nie. Te dane ma rządowa Historia pojazdu, która wymaga formularza z Twoim udziałem. Dajemy do niej link i dane do wpisania, ale nie pobieramy ich za Ciebie.",
        },
        {
          q: "Czy sprawdzacie, czy auto jest skradzione?",
          a: "Nie. Nie mamy dostępu do jawnej wyszukiwarki pojazdów poszukiwanych, więc tego nie obiecujemy. Zapytaj o to Policję albo sprawdź w ubezpieczalni.",
        },
        {
          q: "Czy wycofanie dotyczy tego auta?",
          a: "Zgłoszenia w Safety Gate obejmują konkretne partie i daty produkcji. Porównaj je z autem i zapytaj dealera marki o akcje serwisowe dla numeru VIN.",
        },
        {
          q: "Czy cyfra kontrolna rozstrzyga o błędzie?",
          a: "Tylko w autach z Ameryki Północnej. W europejskich VIN-ach dziewiąty znak nie musi być cyfrą kontrolną, więc niezgodność jest tylko uwagą.",
        },
        {
          q: "Co jeśli wpiszę zły VIN?",
          a: "Gdy VIN jest błędny albo go nie ma w zamówieniu, zwracamy całą kwotę i dostajesz o tym maila.",
        },
      ]}
      formId="order_sprawdzenie_auta"
      formHeading="Handlujesz autami i sprawdzasz ich wiele?"
      formIntro="Napisz, ile aut sprawdzasz miesięcznie. Odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Sprawdzenie auta przed zakupem"
      serviceDesc="Raport mailem po numerze VIN: poprawność numeru, wycofania marki w UE, link do Historii pojazdu i lista kontrolna, za 19 zł netto."
      serviceType="Weryfikacja pojazdu"
    />
  );
}
