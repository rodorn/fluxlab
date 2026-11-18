import type { Metadata } from "next";
import KalkulatorBranzowy from "@/components/KalkulatorBranzowy";

const TYTUL = "Przykładowy kalkulator klimatyzacji";
const OPIS =
  "Przykład kalkulatora klimatyzacji i pompy powietrze-powietrze. Instalator wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.";

export const metadata: Metadata = {
  title: "Przykładowy kalkulator klimatyzacji | Fluxlab",
  description:
    "Przykład kalkulatora klimatyzacji i pompy powietrze-powietrze. Instalator wkleja go na stronę, klient widzi koszt z montażem, a zapytanie trafia do firmy.",
  openGraph: {
    title: `${TYTUL} | Fluxlab`,
    description: OPIS,
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/kalkulator-klimatyzacji-demo" },
};

export default function KalkulatorKlimatyzacjiDemoPage() {
  return (
    <KalkulatorBranzowy
      sciezka="/kalkulator-klimatyzacji-demo"
      okruszek="Przykładowy kalkulator klimatyzacji"
      etykieta="Przykład dla instalatorów klimatyzacji"
      tytul={TYTUL}
      wstep="Tak wygląda kalkulator, który instalator klimatyzacji ma na swojej stronie. Klient podaje liczbę pomieszczeń i metraż, wybiera chłodzenie albo grzanie, a od razu widzi koszt z montażem i roczny koszt prądu. Wypróbuj poniżej."
      src="/kalkulator-klimatyzacji-demo/index.html"
      tytulRamki="Przykładowy kalkulator wyceny klimatyzacji i pompy powietrze-powietrze"
      zalozenia={[
        "Jednostka wewnętrzna z montażem: 3800–5800 zł brutto, +15% przy pomieszczeniu powyżej 35 m²",
        "Dogrzewanie +10%, grzanie jako główne źródło +35% (jednostki do pracy w mrozie)",
        "Moc: 100 W na m² przy chłodzeniu, 110 W przy grzaniu",
        "Prąd: 1,10 zł/kWh brutto, 350 godzin chłodzenia w roku, SEER 6,1, SCOP 4,0",
      ]}
      lead="W wersji dla firmy zapytanie klienta z metrażem, liczbą pomieszczeń i trybem pracy trafia do jej skrzynki albo CRM jako lead."
      pole="Ceny montażu split i multi-split, marki urządzeń (opcjonalnie)"
    />
  );
}
