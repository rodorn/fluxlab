import type { Metadata } from "next";

import OpisyCsv from "@/components/OpisyCsv";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Opisy produktów do sklepu z pliku CSV, za darmo | Fluxlab",
  description:
    "Wgraj plik z nazwami i cechami produktów, a dostaniesz ten sam plik z opisem krótkim, długim i metatagami. Do 25 produktów, bez płatności.",
  alternates: { canonical: "/opisy-produktow-z-csv" },
  openGraph: {
    title: "Opisy produktów do sklepu z pliku CSV | Fluxlab",
    description: "Plik z nazwami i cechami na wejściu, plik z gotowymi opisami i metatagami na wyjściu. Za darmo.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, opisy produktów z CSV" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="opisy-produktow-z-csv"
      tool={<OpisyCsv />}
      breadcrumb="Opisy produktów z CSV"
      cena="0 zł"
      eyebrow="Darmowe narzędzie"
      h1="Opisy produktów do sklepu z pliku CSV, zanim skończysz kawę"
      lead="Wgraj plik z nazwami i cechami produktów. Odeślemy ten sam plik z opisem krótkim, opisem długim i metatagami, gotowy do importu do sklepu."
      bezPrzyciskowHero
      ctaLabel="Wgraj plik"
      ctaNote="Za darmo, do 25 produktów"
      checks={[
        {
          title: "Tylko to, co podasz w pliku",
          desc: "Opis opiera się na Twoich cechach. Nie dopisujemy parametrów, certyfikatów ani gwarancji, których nie ma w danych.",
        },
        {
          title: "Cztery nowe kolumny",
          desc: "opis_krotki do listy produktów, opis_dlugi do karty produktu, meta_title do 60 znaków i meta_description do 155 znaków.",
        },
        {
          title: "Plik do importu",
          desc: "Twoje kolumny zostają bez zmian, polskie znaki w UTF-8, separator taki jak w Twoim pliku. Otwiera się w Excelu i nadaje się do importu do sklepu.",
        },
      ]}
      pricing={[
        {
          name: "Opisy z CSV",
          price: "0 zł",
          desc: "Bez konta i bez płatności. Wynik na ekranie i w mailu.",
          features: [
            "do 25 produktów w jednym pliku",
            "opis krótki, opis długi, meta title i meta description",
            "jeden plik na adres e-mail w ciągu 30 dni",
          ],
          featured: true,
          href: "#narzedzie",
          cta: "Wgraj plik",
        },
      ]}
      faq={[
        {
          q: "Jak ma wyglądać plik?",
          a: "Pierwsza linia to nagłówki kolumn, jedna z nich nazywa się „nazwa” (może być też „produkt” albo „tytuł”). Pozostałe kolumny to cechy, na przykład kolor, materiał, wymiary, cena. Rozdzielacz może być średnikiem, przecinkiem albo tabulatorem. Na stronie jest przykładowy plik do pobrania.",
        },
        {
          q: "Czy opisy są gotowe do publikacji?",
          a: "Są napisane tylko na podstawie Twoich cech, więc nie ma w nich zmyślonych danych. Przed publikacją przeczytaj je raz: tego, czego nie podałeś w pliku, opis nie zawiera.",
        },
        {
          q: "Dlaczego jest limit 25 produktów?",
          a: "Narzędzie jest darmowe i działa od ręki, dlatego jeden plik to do 25 produktów, a z jednego adresu przyjmujemy jeden plik na 30 dni. Większy katalog opiszemy na zlecenie, napisz w formularzu poniżej.",
        },
        {
          q: "Co dzieje się z moim adresem e-mail?",
          a: "Wysyłamy na niego wynik. Adres zapisujemy w naszym systemie kontaktów, a zasady przetwarzania opisuje polityka prywatności.",
        },
      ]}
      formId="opisy_csv"
      formHeading="Masz większy katalog?"
      formIntro="Napisz, ile produktów masz i w jakim sklepie. Odpiszemy, ile kosztuje opisanie całości."
      submitLabel="Napisz w sprawie katalogu"
      microCopy="Odpisujemy w 1 dzień roboczy."
      serviceName="Opisy produktów do sklepu z pliku CSV"
      serviceDesc="Darmowe narzędzie: plik z nazwami i cechami produktów zamienia w plik z opisem krótkim, opisem długim, meta title i meta description. Do 25 produktów, bez płatności."
      serviceType="Opisy produktów dla sklepu internetowego"
    />
  );
}
