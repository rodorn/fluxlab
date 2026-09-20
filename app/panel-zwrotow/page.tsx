import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import ZwrotyCheck from "@/components/ZwrotyCheck";

export const metadata: Metadata = {
  title: "Panel zwrotów dla sklepu, koniec obsługi mailem, od 900 zł | Fluxlab",
  description:
    "Sprawdź za darmo, czego kupujący nie znajdzie o zwrotach w Twoim sklepie, i policz, ile kosztuje ręczna obsługa. Audyt przyczyn zwrotów od 900 zł, samoobsługowy panel od 3500 zł.",
  alternates: { canonical: "/panel-zwrotow" },
  openGraph: {
    title: "Panel zwrotów dla sklepu, koniec obsługi mailem, od 900 zł | Fluxlab",
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
      lead="Platformy sklepowe dają najwyżej formularz, który wysyła wiadomość na Twoją skrzynkę. Reszta to już czyjaś praca: odpisać, wyjaśnić termin, wysłać etykietę, przypomnieć o zwrocie pieniędzy. Przy kilkudziesięciu zwrotach miesięcznie robi się z tego stałe zajęcie, którego nikt nie planował."
      ctaLabel="Sprawdź swoje zasady zwrotów"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Kupujący obsługuje się sam",
          desc: "Wpisuje numer zamówienia i adres mailowy, wybiera pozycje i powód. Nie pisze do Ciebie, bo nie musi.",
        },
        {
          title: "Etykieta z Twojego konta kurierskiego",
          desc: "System generuje ją automatycznie, więc korzystasz z własnych stawek, a nie z cennika, który kupujący znajdzie sam.",
        },
        {
          title: "Pilnowanie terminu na zwrot pieniędzy",
          desc: "Termin liczy się od zgłoszenia, a jego przekroczenie kończy się skargami. System przypomina, zanim to nastąpi.",
        },
        {
          title: "Raport, które produkty wracają",
          desc: "Zestawienie przyczyn zwrotów na produkt i dostawcę. To ono pokazuje, czy problem jest w opisie, w rozmiarówce, czy u konkretnego dostawcy.",
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
          price: "od 900 zł",
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
          q: "Czego potrzebujesz, żeby zrobić audyt?",
          a: "Eksportu zamówień i zwrotów z dowolnego okresu, najlepiej pół roku. Im więcej danych, tym pewniejsze wnioski o tym, które produkty wracają systematycznie, a które przypadkiem.",
        },
        {
          q: "Czy panel zadziała z moim sklepem?",
          a: "Najpewniej tak, bo wchodzi na poziomie systemu zamówień, a nie samego sklepu. Napisz, na czym sprzedajesz i czy używasz systemu do obsługi zamówień, powiem wprost, czy to prosty przypadek, czy nie.",
        },
        {
          q: "Czy to jest porada prawna o regulaminie?",
          a: "Nie. Sprawdzam, czy informacja jest podana i łatwa do znalezienia. Ocena samej treści regulaminu należy do prawnika i tak też to opisuję w raporcie.",
        },
        {
          q: "Co z danymi kupujących?",
          a: "Do audytu wystarczą dane o zamówieniach i produktach. Jeśli w eksporcie są dane osobowe, usuwam je przy wczytywaniu, a pliki kasuję po dostarczeniu raportu. Przy wdrożeniu podpisujemy umowę powierzenia.",
        },
      ]}
      formId="order_panel_zwrotow"
      formHeading="Zamów audyt zwrotów"
      formIntro="Napisz, na czym sprzedajesz, ile mniej więcej masz zamówień miesięcznie i jak dziś wygląda zgłoszenie zwrotu. Odeślę wycenę i uczciwą opinię, czy panel Ci się opłaci."
      submitLabel="Zamów audyt"
      microCopy="Do wyceny nie potrzebuję dostępów, wystarczy opis procesu."
      serviceName="Audyt i wdrożenie samoobsługowego procesu zwrotów"
      serviceDesc="Analiza przyczyn zwrotów oraz wdrożenie panelu, w którym kupujący zgłasza zwrot, otrzymuje etykietę i śledzi status, wraz z raportowaniem przyczyn. Od 900 zł."
      serviceType="Automatyzacja obsługi zwrotów w sklepie internetowym"
    />
  );
}
