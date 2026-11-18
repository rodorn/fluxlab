import type { Metadata } from "next";
import KalkulatorBranzowy from "@/components/KalkulatorBranzowy";

const TYTUL = "Przykładowy kalkulator ogrodzeń i bram";
const OPIS =
  "Działający przykład kalkulatora ogrodzenia i bramy. Firma ogrodzeniowa wkleja go na swoją stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.";

export const metadata: Metadata = {
  title: "Przykładowy kalkulator ogrodzeń i bram na stronę | Fluxlab",
  description:
    "Działający przykład kalkulatora ogrodzenia i bramy. Firma ogrodzeniowa wkleja go na swoją stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.",
  openGraph: {
    title: `${TYTUL} | Fluxlab`,
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/kalkulator-ogrodzen-demo" },
};

export default function KalkulatorOgrodzenDemoPage() {
  return (
    <KalkulatorBranzowy
      sciezka="/kalkulator-ogrodzen-demo"
      okruszek="Przykładowy kalkulator ogrodzeń"
      etykieta="Przykład dla firm ogrodzeniowych"
      tytul={TYTUL}
      wstep="Tak wygląda kalkulator, który firma ogrodzeniowa ma na swojej stronie. Klient wpisuje długość, wybiera rodzaj ogrodzenia i bramę, a od razu widzi koszt z montażem w widełkach. Wypróbuj poniżej."
      src="/kalkulator-ogrodzen-demo/index.html"
      tytulRamki="Przykładowy kalkulator wyceny ogrodzenia i bramy"
      zalozenia={[
        "Siatka pleciona: 90–140 zł brutto za metr z montażem",
        "Panel 3D ocynk + RAL: 160–240 zł za metr",
        "Sztachety metalowe: 380–560 zł za metr",
        "Gabion: 700–1100 zł za metr",
        "Brama skrzydłowa 4 m: 3500–6500 zł, przesuwna z napędem: 9000–15 000 zł",
      ]}
      lead="W wersji dla firmy zapytanie klienta z długością, rodzajem ogrodzenia i bramą trafia do jej skrzynki albo CRM jako lead."
      pole="Ceny za metr dla Twoich rodzajów ogrodzeń i ceny bram (opcjonalnie)"
    />
  );
}
