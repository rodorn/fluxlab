import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KalkulatorAutomatyzacji from "@/components/KalkulatorAutomatyzacji";

export const metadata: Metadata = {
  title:
    "Tańsze automatyzacje, migracja z rozliczania za kroki, od 790 zł | Fluxlab",
  description:
    "Zapier i Make liczą każdy krok osobno, więc pięciokrokowy scenariusz uruchomiony tysiąc razy to pięć tysięcy zadań. Policz oszczędność na stronie i przenieś te same scenariusze na własny serwer.",
  alternates: { canonical: "/tansze-automatyzacje" },
  openGraph: {
    title:
      "Tańsze automatyzacje, migracja z rozliczania za kroki, od 790 zł | Fluxlab",
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
      lead="Rozliczanie za każdy krok osobno sprawia, że rachunek rośnie szybciej niż liczba spraw, które automat załatwia. Dołożenie jednego warunku do scenariusza potrafi podnieść koszt o kilkadziesiąt procent, choć efekt dla firmy nie zmienia się wcale."
      ctaLabel="Zamów przeniesienie"
      ctaNote="Wycena po zobaczeniu scenariuszy"
      checks={[
        {
          title: "Te same scenariusze, nie nowe",
          desc: "Nie przebudowuję Wam procesów. Odtwarzam dokładnie to, co już działa, żeby po migracji nikt w firmie nie musiał uczyć się niczego od nowa.",
        },
        {
          title: "Koszt przestaje rosnąć z wolumenem",
          desc: "Na własnym serwerze płacisz za maszynę, a nie za liczbę wykonanych kroków. Podwojenie liczby zamówień nie podwaja rachunku za automatyzację.",
        },
        {
          title: "Powiem wprost, gdy się nie opłaca",
          desc: "Kalkulator wyżej potrafi odpowiedzieć, że przy Twojej skali migracja się nie zwróci. Wolę to powiedzieć od razu niż wziąć pieniądze za coś, co nie ma sensu.",
        },
        {
          title: "Utrzymanie, a nie porzucenie",
          desc: "Własny serwer wymaga aktualizacji i kopii zapasowych. To realne dwie do czterech godzin miesięcznie, które biorę na siebie, bo inaczej oszczędność zamienia się w problem.",
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
          q: "Czy stracę coś na jakości?",
          a: "Nie, bo to to samo narzędzie w wersji, którą uruchamiasz u siebie. Różnica jest w rozliczeniu, nie w możliwościach. Wyjątkiem są gotowe integracje z bardzo niszowymi usługami, które czasem trzeba dopisać ręcznie, i mówię o tym przed migracją, a nie po.",
        },
        {
          q: "Co, jeśli serwer padnie?",
          a: "Dlatego utrzymanie jest osobną pozycją, a nie dodatkiem gratis. Kopie zapasowe, aktualizacje i monitoring wykonań to praca, która musi się dziać co miesiąc, i uczciwiej jest ją wycenić, niż udawać, że jej nie ma.",
        },
        {
          q: "Od jakiej skali to się opłaca?",
          a: "Policz to kalkulatorem wyżej na swoich liczbach. Z grubsza: im więcej kroków ma scenariusz i im częściej się uruchamia, tym szybciej migracja się zwraca. Przy kilkuset uruchomieniach miesięcznie zwykle nie warto.",
        },
        {
          q: "Czy to jest legalne wobec obecnego dostawcy?",
          a: "Tak. Rezygnujesz z płatnej usługi i uruchamiasz u siebie narzędzie z otwartym kodem, przeznaczone właśnie do tego. Nie obchodzimy żadnych zabezpieczeń ani warunków.",
        },
      ]}
      formId="order_tansze_automatyzacje"
      formHeading="Zamów przeniesienie automatyzacji"
      formIntro="Napisz, z czego dziś korzystasz, ile mniej więcej macie scenariuszy i co robią najważniejsze z nich. Odeślę wycenę i uczciwą opinię, czy migracja ma u Was sens."
      submitLabel="Zamów wycenę"
      microCopy="Do wyceny nie potrzebuję dostępów, wystarczy opis scenariuszy."
      serviceName="Migracja automatyzacji na własny serwer"
      serviceDesc="Przeniesienie istniejących scenariuszy z usług rozliczanych za każdy krok na własną instancję n8n, wraz z utrzymaniem serwera. Od 790 zł."
      serviceType="Migracja i utrzymanie systemu automatyzacji"
    />
  );
}
