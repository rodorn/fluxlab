import type { Metadata } from "next";

import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Wstępna odpowiedź podatkowa od AI, 29 zł | Fluxlab",
  description:
    "Opisz sprawę podatkową, a dostaniesz wstępną odpowiedź z podstawą, krokami i ryzykami. Wynik po kilku minutach, 29 zł netto.",
  alternates: { canonical: "/odpowiedz-podatkowa" },
  openGraph: {
    title: "Wstępna odpowiedź podatkowa | Fluxlab",
    description: "Odpowiedź na pytanie podatkowe z podstawą, krokami i ryzykami, po kilku minutach.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, odpowiedź podatkowa" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="odpowiedz-podatkowa"
      breadcrumb="Odpowiedź podatkowa"
      cena="29 zł netto"
      typ="narzedzie"
      h1="Wstępna odpowiedź na pytanie podatkowe, od ręki"
      lead="Płacisz, opisujesz sprawę i po kilku minutach masz na ekranie i w mailu: odpowiedź na wprost, podstawę, co zrobić i gdzie jest ryzyko. To wstępna odpowiedź, a nie interpretacja indywidualna."
      ctaLabel="Kup za 29 zł"
      ctaNote="Bez konta, wynik po kilku minutach"
      checks={[
        {
          title: "Odpowiedź na wprost",
          desc: "Kilka zdań, które odpowiadają na Twoje pytanie, a nie ogólny wykład o podatkach.",
        },
        {
          title: "Podstawa i kroki",
          desc: "Przepisy, na których opiera się odpowiedź, i lista rzeczy do zrobienia w kolejności.",
        },
        {
          title: "Ryzyka i braki w opisie",
          desc: "Wyjątki, w których wynik będzie inny, oraz informacje, których zabrakło, a które zmieniają odpowiedź.",
        },
      ]}
      pricing={[
        {
          name: "Jedno pytanie",
          price: "29 zł",
          kup: "tax-ai",
          desc: "Płatność kartą lub BLIK, potem opis sprawy.",
          features: [
            "odpowiedź, podstawa, kroki i ryzyka",
            "wynik na ekranie i w mailu",
            "gdy odpowiedź się nie uda, zwrot całej płatności",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy to jest doradztwo podatkowe?",
          a: "Nie. To wstępna odpowiedź przygotowana automatycznie, nie interpretacja indywidualna. Przy większych skutkach sprawdź ją u doradcy podatkowego.",
        },
        {
          q: "Jak opisać sprawę?",
          a: "Napisz, kim jesteś podatkowo (np. JDG na ryczałcie, spółka z o.o.), co się stało i o co pytasz. Nie wpisuj PESEL ani numerów rachunków.",
        },
        {
          q: "Jaki stan prawny uwzględnia odpowiedź?",
          a: "Taki, jaki zna model, więc zmiany z ostatnich miesięcy mogły do niego nie trafić. Odpowiedź wskazuje podstawę, żeby można ją było sprawdzić.",
        },
        {
          q: "Czy jest faktura?",
          a: "Tak, na dane podane przy płatności, w ciągu 1 dnia roboczego.",
        },
      ]}
      formId="odpowiedz_podatkowa"
      formHeading="Masz więcej pytań podatkowych?"
      formIntro="Napisz, jakie sprawy podatkowe wracają w Twojej firmie. Odpiszemy, jak to uporządkować."
      submitLabel="Napisz w sprawie większej liczby pytań"
      microCopy="Odpisujemy w 1 dzień roboczy."
      serviceName="Wstępna odpowiedź podatkowa"
      serviceDesc="Wstępna odpowiedź na pytanie podatkowe z podstawą, krokami i ryzykami. 29 zł netto, wynik po kilku minutach."
      serviceType="Informacja podatkowa"
    />
  );
}
