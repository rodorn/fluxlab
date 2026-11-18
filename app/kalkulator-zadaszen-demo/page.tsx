import type { Metadata } from "next";
import KalkulatorBranzowy from "@/components/KalkulatorBranzowy";

const TYTUL = "Przykładowy kalkulator zadaszeń tarasu i pergoli";
const OPIS =
  "Działający przykład kalkulatora zadaszenia tarasu i pergoli. Firma wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.";

export const metadata: Metadata = {
  title: "Przykładowy kalkulator zadaszeń i pergoli | Fluxlab",
  description:
    "Działający przykład kalkulatora zadaszenia tarasu i pergoli. Firma wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.",
  openGraph: {
    title: `${TYTUL} | Fluxlab`,
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/kalkulator-zadaszen-demo" },
};

export default function KalkulatorZadaszenDemoPage() {
  return (
    <KalkulatorBranzowy
      sciezka="/kalkulator-zadaszen-demo"
      okruszek="Przykładowy kalkulator zadaszeń"
      etykieta="Przykład dla firm od zadaszeń i pergoli"
      tytul={TYTUL}
      wstep="Tak wygląda kalkulator, który firma od zadaszeń tarasowych ma na swojej stronie. Klient wpisuje wymiary, wybiera pokrycie i sposób montażu, a od razu widzi koszt z montażem w widełkach. Wypróbuj poniżej."
      src="/kalkulator-zadaszen-demo/index.html"
      tytulRamki="Przykładowy kalkulator wyceny zadaszenia tarasu lub pergoli"
      zalozenia={[
        "Konstrukcja aluminiowa z montażem, cena brutto za m²",
        "Poliwęglan komorowy 650–1000 zł, lity 800–1200 zł, szkło VSG 1100–1700 zł za m²",
        "Pergola bioklimatyczna z lamelami obrotowymi 1800–2900 zł za m²",
        "Wolnostojące na czterech słupach +20% względem montażu do ściany",
        "Najmniejsze zlecenie 6000–9000 zł, fundamenty pod słupy poza wyceną",
      ]}
      lead="W wersji dla firmy zapytanie klienta z wymiarami, pokryciem i sposobem montażu trafia do jej skrzynki albo CRM jako lead."
      pole="Ceny za m² dla Twoich pokryć i dopłata za wolnostojące (opcjonalnie)"
    />
  );
}
