import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import ZwrotyCheck from "@/components/ZwrotyCheck";

export const metadata: Metadata = {
  title: "Panel zwrotów dla sklepu, od 490 zł | Fluxlab",
  description:
    "Sprawdź za darmo, czego kupujący nie znajdzie o zwrotach w Twoim sklepie, i policz koszt ręcznej obsługi. Audyt od 490 zł, panel od 3500 zł.",
  alternates: { canonical: "/panel-zwrotow" },
  openGraph: {
    title: "Panel zwrotów dla sklepu, od 490 zł | Fluxlab",
    description:
      "Samoobsługowe zwroty: numer zamówienia, etykieta zwrotna, status i raport przyczyn. Zamiast kolejki maili.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, panel zwrotów dla sklepu",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="panel-zwrotow"
      tool={<ZwrotyCheck />}
      breadcrumb="Panel zwrotów"
      eyebrow="Obsługa posprzedażowa"
      h1="Zwrot zgłaszany mailem kosztuje Cię za każdym razem"
      lead="Sklep daje najwyżej formularz, który trafia na Twoją skrzynkę. Odpisać, wysłać etykietę, pilnować terminu musi już ktoś z zespołu."
      ctaLabel="Sprawdź swoje zasady zwrotów"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Kupujący obsługuje się sam",
          desc: "Wpisuje numer zamówienia, wybiera pozycje i powód. Nie musi do Ciebie pisać.",
        },
        {
          title: "Etykieta z Twojego konta kurierskiego",
          desc: "Generowana automatycznie, po Twoich stawkach.",
        },
        {
          title: "Pilnowanie terminu na zwrot pieniędzy",
          desc: "System przypomina, zanim termin minie i pojawią się skargi.",
        },
        {
          title: "Raport, które produkty wracają",
          desc: "Przyczyny zwrotów na produkt i dostawcę: opis, rozmiarówka czy dostawca.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie zasad",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "czego kupujący nie znajdzie",
            "co z tego jest podstawą, a co dodatkiem",
            "szacowany koszt ręcznej obsługi",
          ],
        },
        {
          name: "Audyt zwrotów",
          price: "od 490 zł",
          desc: "Z eksportu zamówień, bez wdrożenia.",
          features: [
            "przyczyny zwrotów na produkt",
            "koszt zwrotów wobec marży",
            "które pozycje wracają najczęściej",
            "rekomendacje, co zmienić najpierw",
          ],
          featured: true,
        },
        {
          name: "Panel samoobsługowy",
          price: "od 3500 zł",
          desc: "Wdrożenie całego procesu.",
          features: [
            "zgłoszenie zwrotu przez kupującego",
            "etykieta zwrotna i statusy",
            "powiązanie z systemem zamówień",
            "utrzymanie od 200 zł miesięcznie",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujecie, żeby zrobić audyt?",
          a: "Eksportu zamówień i zwrotów, najlepiej z pół roku.",
        },
        {
          q: "Czy panel zadziała z naszym sklepem?",
          a: "Najpewniej tak, bo łączy się z systemem zamówień, nie z samym sklepem. Napisz, na czym sprzedajesz.",
        },
        {
          q: "Czy to sprawdzenie mówi, czy mamy już obowiązkowy przycisk odstąpienia od umowy?",
          a: "Tak, sprawdzamy, czy zwrot da się zgłosić online, czego od 19 czerwca 2026 wymaga dyrektywa UE 2023/2673. To sprawdzenie techniczne, nie opinia prawna.",
        },
        {
          q: "Co z danymi kupujących?",
          a: "Dane osobowe usuwamy przy wczytywaniu, pliki kasujemy po raporcie. Przy wdrożeniu podpisujemy umowę powierzenia.",
        },
      ]}
      formId="order_panel_zwrotow"
      formHeading="Zamów audyt zwrotów"
      formIntro="Napisz, na czym sprzedajesz i ile masz zamówień miesięcznie. Odeślemy wycenę i opinię, czy panel się opłaci."
      submitLabel="Zamów audyt"
      microCopy="Do wyceny nie potrzebujemy dostępów, wystarczy opis procesu."
      serviceName="Audyt i wdrożenie samoobsługowego procesu zwrotów"
      serviceDesc="Analiza przyczyn zwrotów i panel, w którym kupujący zgłasza zwrot, dostaje etykietę i śledzi status. Od 490 zł."
      serviceType="Automatyzacja obsługi zwrotów w sklepie internetowym"
    />
  );
}
