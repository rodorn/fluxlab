import type { Metadata } from "next";
import KalkulatorBranzowy from "@/components/KalkulatorBranzowy";

const TYTUL = "Przykładowy kalkulator garaży, wiat i hal";
const OPIS =
  "Działający przykład kalkulatora garażu blaszanego, wiaty lub hali. Producent wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.";

export const metadata: Metadata = {
  title: "Przykładowy kalkulator garaży, wiat i hal | Fluxlab",
  description:
    "Działający przykład kalkulatora garażu blaszanego, wiaty lub hali. Producent wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.",
  openGraph: {
    title: `${TYTUL} | Fluxlab`,
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/kalkulator-garazy-demo" },
};

export default function KalkulatorGarazyDemoPage() {
  return (
    <KalkulatorBranzowy
      sciezka="/kalkulator-garazy-demo"
      okruszek="Przykładowy kalkulator garaży"
      etykieta="Przykład dla producentów garaży i hal"
      tytul={TYTUL}
      wstep="Tak wygląda kalkulator, który producent garaży blaszanych ma na swojej stronie. Klient wpisuje wymiary, wybiera dach i bramę, a od razu widzi koszt z transportem i montażem w widełkach. Wypróbuj poniżej."
      src="/kalkulator-garazy-demo/index.html"
      tytulRamki="Przykładowy kalkulator wyceny garażu, wiaty lub hali"
      zalozenia={[
        "Garaż do 30 m²: 260–380 zł brutto za m² z transportem i montażem",
        "Od 30 do 80 m²: 220–320 zł za m², hala powyżej 80 m²: 180–280 zł za m²",
        "Dach dwuspadowy +10%, z blachodachówką +22%",
        "Brama uchylna 900–1500 zł, dwuskrzydłowa 700–1200 zł, segmentowa z napędem 4500–7500 zł",
        "Wiata otwarta z boków: 65% ceny garażu, fundament poza wyceną",
      ]}
      lead="W wersji dla firmy zapytanie klienta z wymiarami, dachem i bramą trafia do jej skrzynki albo CRM jako lead."
      pole="Ceny za m² dla Twoich modeli, dopłaty za dach i bramy (opcjonalnie)"
    />
  );
}
