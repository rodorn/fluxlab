import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Strażnik konwersji od 29 zł | Fluxlab",
  description:
    "Co 6 godzin sprawdzamy, czy znaczniki Google i Meta są na stronie i działają, i piszemy, gdy któregoś zabraknie. 29 zł netto miesięcznie.",
  alternates: { canonical: "/straznik-konwersji" },
  openGraph: {
    title: "Strażnik konwersji od 29 zł | Fluxlab",
    description:
      "Co 6 godzin sprawdzamy, czy znaczniki Google i Meta są na stronie i działają, i piszemy, gdy któregoś zabraknie. 29 zł netto miesięcznie.",
    url: "/straznik-konwersji",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, strażnik konwersji" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="straznik-konwersji"
      typ="usluga"
      breadcrumb="Strażnik konwersji"
      h1="Znacznik Google albo Meta zniknął po aktualizacji strony. Dowiesz się w ciągu godzin, nie po miesiącu"
      lead="Podajesz do trzech stron, na przykład stronę główną i stronę z formularzem. Co 6 godzin sprawdzamy, czy znaczniki są w kodzie, ładują się, a kontener Tag Managera nadal zawiera te same tagi."
      ctaLabel="Włącz strażnika konwersji"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Stan wyjściowy od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z tym, co znaleźliśmy: Tag Manager, Google Analytics 4, Google Ads i Meta Pixel. Od tego stanu liczymy każdą zmianę.",
        },
        {
          title: "Alert po potwierdzeniu",
          desc: "Brak znacznika, skrypt, który się nie ładuje, albo kontener bez tagów sprawdzamy drugi raz po 10 minutach. Mail wychodzi dopiero wtedy, gdy obie próby pokazują to samo.",
        },
        {
          title: "Co sprawdzamy, a czego nie",
          desc: "Widzimy to, co jest na stronie i w opublikowanym kontenerze. Nie widzimy wewnątrz Google ani Meta, ile zgłoszeń zliczono. Jeśli nie znajdziemy żadnego znacznika, zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Strażnik konwersji",
          price: "29 zł/mies.",
          kup: "monitoring-konwersje",
          desc: "Netto. Do trzech stron, sprawdzanie co 6 godzin.",
          features: [
            "lista znaczników znalezionych na starcie",
            "alert po potwierdzeniu, że znacznika brak",
            "mail, gdy wszystko wróci do normy",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jakie strony podać?",
          a: "Strony, na których powinny liczyć się zgłoszenia: strona główna, strona z formularzem, strona z podziękowaniem. Do trzech, oddzielone spacją, dostępne bez logowania.",
        },
        {
          q: "Czy widzicie, ile zgłoszeń zliczył Google?",
          a: "Nie. Sprawdzamy, czy znacznik jest na stronie, czy się ładuje i czy kontener Tag Managera zawiera te same tagi co na starcie. To łapie najczęstszą przyczynę: znacznik zniknął przy zmianie strony.",
        },
        {
          q: "Czy mail przyjdzie przy chwilowym błędzie?",
          a: "Nie. Problem sprawdzamy drugi raz po 10 minutach i piszemy dopiero, gdy się potwierdzi.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pilnowanie wyłączamy automatycznie.",
        },
      ]}
      formId="order_straznik_konwersji"
      formHeading="Zapytaj o więcej stron"
      formIntro="Chcesz pilnować więcej niż trzech stron? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Strażnik konwersji"
      serviceDesc="Sprawdzanie co 6 godzin, czy znaczniki Google i Meta są na stronie, ładują się i nie zniknęły z kontenera Tag Managera, za 29 zł netto miesięcznie."
      serviceType="Monitoring znaczników"
    />
  );
}
