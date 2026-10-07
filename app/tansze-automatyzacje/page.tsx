import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorAutomatyzacji from "@/components/KalkulatorAutomatyzacji";

export const metadata: Metadata = {
  title: "Tańsze automatyzacje, koniec opłat za kroki | Fluxlab",
  description:
    "Zapier i Make liczą każdy krok osobno, więc pięć kroków razy tysiąc uruchomień to pięć tysięcy zadań. Policz oszczędność i przenieś to na swój serwer.",
  alternates: { canonical: "/tansze-automatyzacje" },
  openGraph: {
    title: "Tańsze automatyzacje, koniec opłat za kroki | Fluxlab",
    description:
      "Kalkulator oszczędności i przeniesienie scenariuszy na własny serwer. Ten sam efekt, koszt stały zamiast rosnącego.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, tańsze automatyzacje",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="tansze-automatyzacje"
      tool={<KalkulatorAutomatyzacji />}
      breadcrumb="Tańsze automatyzacje"
      eyebrow="Koszt narzędzi"
      h1="Płacisz za kroki, nie za pracę, którą automat wykonuje"
      lead="Zapier i Make liczą każdy krok osobno, więc rachunek rośnie szybciej niż liczba załatwionych spraw. Przenosimy te same scenariusze na Twój serwer, z kosztem stałym."
      ctaLabel="Zamów przeniesienie"
      ctaNote="Wycena po zobaczeniu scenariuszy"
      checks={[
        {
          title: "Te same scenariusze",
          desc: "Odtwarzamy to, co już działa. Nikt w firmie nie musi uczyć się niczego od nowa.",
        },
        {
          title: "Koszt nie rośnie z wolumenem",
          desc: "Płacisz za serwer, nie za kroki. Dwa razy więcej zamówień nie podwaja rachunku.",
        },
        {
          title: "Powiemy, gdy się nie opłaca",
          desc: "Jeśli kalkulator pokaże, że migracja się nie zwróci, mówimy to od razu.",
        },
      ]}
      pricing={[
        {
          name: "Audyt i wyliczenie",
          price: "od 300 zł",
          desc: "Zanim cokolwiek ruszy.",
          features: [
            "przegląd istniejących scenariuszy",
            "policzony realny koszt i oszczędność",
            "uczciwa odpowiedź, czy warto",
          ],
        },
        {
          name: "Przeniesienie",
          price: "od 790 zł",
          desc: "Scenariusze na Twoim serwerze.",
          features: [
            "postawienie i zabezpieczenie serwera",
            "odtworzenie scenariuszy jeden do jednego",
            "testy na danych rzeczywistych",
            "przełączenie bez przestoju",
          ],
          featured: true,
        },
        {
          name: "Utrzymanie",
          price: "od 200 zł/mc",
          desc: "Żeby działało bez Twojego udziału.",
          features: [
            "aktualizacje i kopie zapasowe",
            "monitoring, czy scenariusze się wykonują",
            "reakcja, gdy coś przestanie działać",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy stracimy coś na jakości?",
          a: "Nie. To to samo narzędzie uruchomione u Ciebie, różni się tylko rozliczenie. Niszowe integracje czasem trzeba dopisać i mówimy o tym przed migracją.",
        },
        {
          q: "Co, jeśli serwer padnie?",
          a: "Dlatego utrzymanie jest osobną pozycją: kopie zapasowe, aktualizacje i monitoring wykonań co miesiąc.",
        },
        {
          q: "Od jakiej skali to się opłaca?",
          a: "Policz kalkulatorem wyżej. Im więcej kroków i uruchomień, tym szybciej się zwraca. Przy kilkuset uruchomieniach miesięcznie zwykle nie warto.",
        },
        {
          q: "Co w Zapierze i Make liczy się do limitu?",
          a: "W Zapierze każdy udany krok akcji, bez wyzwalacza, filtrów i Formattera. W Make każde uruchomienie modułu, osobno dla każdej porcji danych. Licz kroki, które coś robią, razy liczbę uruchomień.",
        },
      ]}
      formId="order_tansze_automatyzacje"
      formHeading="Zamów przeniesienie automatyzacji"
      formIntro="Napisz, z czego korzystasz i ile macie scenariuszy. Odeślemy wycenę i opinię, czy migracja ma sens."
      submitLabel="Zamów wycenę"
      microCopy="Do wyceny nie potrzebujemy dostępów, wystarczy opis scenariuszy."
      serviceName="Migracja automatyzacji na własny serwer"
      serviceDesc="Przeniesienie istniejących scenariuszy z usług rozliczanych za każdy krok na własną instancję n8n, wraz z utrzymaniem serwera. Od 790 zł."
      serviceType="Migracja i utrzymanie systemu automatyzacji"
    />
  );
}
