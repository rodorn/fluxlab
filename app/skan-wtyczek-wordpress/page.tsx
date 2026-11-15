import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Skan wtyczek WordPressa za 29 zł miesięcznie | Fluxlab",
  description:
    "Co miesiąc sprawdzamy wtyczki Twojej strony: które są nieaktualne albo wycofane z katalogu wordpress.org. 29 zł netto miesięcznie, raport mailem.",
  alternates: { canonical: "/skan-wtyczek-wordpress" },
  openGraph: {
    title: "Skan wtyczek WordPressa za 29 zł miesięcznie | Fluxlab",
    description:
      "Raport mailem: jakie wtyczki widać na stronie, które mają nowszą wersję, a które są porzucone.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, skan wtyczek WordPressa" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="skan-wtyczek-wordpress"
      breadcrumb="Skan wtyczek WordPressa"
      typ="usluga"
      h1="Które wtyczki na Twojej stronie są nieaktualne?"
      lead="Podajesz adres strony, a po płatności dostajesz mailem raport: jakie wtyczki widać na stronie, w jakiej są wersji i czy jest nowsza. Zaznaczamy też wtyczki wycofane z katalogu wordpress.org i takie, których autor nie aktualizował od ponad dwóch lat. Raport powtarzamy co 30 dni."
      ctaLabel="Zamów skan wtyczek"
      ctaNote="29 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Wersje wtyczek",
          desc: "Odczytujemy wersję z publicznych plików strony i porównujemy z najnowszą w katalogu wordpress.org.",
        },
        {
          title: "Wtyczki wycofane",
          desc: "Wtyczki usunięte z katalogu, często z powodu luki, dostają wyraźne ostrzeżenie w raporcie.",
        },
        {
          title: "Wtyczki porzucone",
          desc: "Oznaczamy wtyczki bez aktualizacji od ponad dwóch lat, bo nikt już nie łata w nich błędów.",
        },
      ]}
      pricing={[
        {
          name: "Skan wtyczek jednej strony",
          price: "29 zł",
          kup: "wp-wtyczki",
          desc: "Netto, miesięcznie. Pierwszy raport w kilka minut, kolejne co 30 dni.",
          features: [
            "lista wtyczek widocznych na stronie",
            "porównanie z katalogiem wordpress.org",
            "ostrzeżenie o wtyczkach wycofanych i porzuconych",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy to test podatności?",
          a: "Nie. Nie szukamy luk w kodzie ani nie logujemy się do panelu. Sprawdzamy, które wtyczki są nieaktualne albo porzucone, bo to najczęstsza droga ataku na WordPressa.",
        },
        {
          q: "Czy zobaczycie wszystkie wtyczki?",
          a: "Tylko te, które ładują pliki na stronie publicznej. Wtyczki działające wyłącznie w panelu są niewidoczne z zewnątrz, o czym przypominamy w raporcie.",
        },
        {
          q: "Co z wtyczkami płatnymi?",
          a: "Wtyczki spoza katalogu wordpress.org pokazujemy na liście z adnotacją, że wersję trzeba sprawdzić ręcznie.",
        },
        {
          q: "Co, jeśli strona nie jest na WordPressie?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_skan_wtyczek"
      formHeading="Zapytaj o skan kilku stron"
      formIntro="Masz więcej niż jedną stronę albo potrzebujesz aktualizacji wtyczek w cenie? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Skan wtyczek WordPressa"
      serviceDesc="Miesięczny raport o nieaktualnych i porzuconych wtyczkach strony na WordPressie za 29 zł netto miesięcznie."
      serviceType="Przegląd wtyczek WordPressa"
    />
  );
}
