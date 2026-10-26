import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Benchmarking konkurencji od 39 zł/mies. | Fluxlab",
  description:
    "Śledzimy konkurencję: ceny, nowe usługi, social media, szybkość stron i opinie Google. Raport codziennie, co tydzień albo co miesiąc, od 39 zł netto.",
  alternates: { canonical: "/benchmarking-konkurencji" },
  openGraph: {
    title: "Benchmarking konkurencji od 39 zł/mies. | Fluxlab",
    description:
      "Ceny, nowe usługi, social media, szybkość stron i opinie Google Twojej konkurencji w jednym raporcie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, benchmarking konkurencji",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="benchmarking-konkurencji"
      breadcrumb="Benchmarking konkurencji"
      eyebrow="Raport o konkurencji"
      h1="Wiesz, co zmienia konkurencja, zanim zauważą to Twoi klienci"
      lead="Wskazujesz firmy, z którymi walczysz o klientów. My sprawdzamy ich ceny, nowe usługi, social media, szybkość stron i opinie w Google, a Ty dostajesz krótki raport z tym, co się zmieniło i co z tego wynika dla Ciebie."
      ctaLabel="Zamów raport"
      ctaNote="Od 39 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Chcesz porównać swoją stronę z konkurencją? Zrób",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
        {
          przed: "Opinie i Mapy też warto poprawić u siebie. Zobacz",
          kotwica: "prowadzenie wizytówki Google",
          href: "/profil-firmy-google",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Ceny i nowe usługi",
          desc: "Zmiany w cennikach, promocje i usługi, które pojawiły się albo zniknęły.",
        },
        {
          title: "Social media i strony",
          desc: "Nowe posty i ich zasięg, a obok szybkość stron konkurencji na telefonie i komputerze.",
        },
        {
          title: "Wnioski z opinii Google",
          desc: "Za co konkurencja dostaje dobre oceny, a za co słabe, czyli gdzie możesz ją wyprzedzić.",
        },
      ]}
      pricing={[
        {
          name: "Raz w miesiącu",
          price: "39 zł/mc",
          kup: "benchmarking-miesiac",
          desc: "Netto. Pełny przegląd na początek miesiąca.",
          features: [
            "ceny, usługi, social media, strony i opinie",
            "porównanie z poprzednim miesiącem",
          ],
        },
        {
          name: "Raz w tygodniu",
          price: "49 zł/mc",
          kup: "benchmarking-tydzien",
          desc: "Netto. Raport w każdy poniedziałek.",
          features: [
            "wszystko z wersji miesięcznej",
            "zmiany z ostatnich 7 dni na górze raportu",
          ],
          featured: true,
        },
        {
          name: "Codziennie",
          price: "69 zł/mc",
          kup: "benchmarking-dzien",
          desc: "Netto. Wiadomość tylko wtedy, gdy coś się zmieniło.",
          features: [
            "wszystko z wersji tygodniowej",
            "zmiana ceny albo nowa usługa tego samego dnia",
          ],
        },
      ]}
      faq={[
        {
          q: "Których konkurentów obserwujecie?",
          a: "Tych, których wskażesz. Listę ustalamy przed startem i możesz ją zmienić w każdym miesiącu.",
        },
        {
          q: "Skąd bierzecie dane?",
          a: "Z publicznych źródeł: stron i cenników konkurencji, ich profili w social mediach, opinii w Google i pomiaru szybkości stron. Nie logujemy się nigdzie w ich imieniu.",
        },
        {
          q: "Jak wygląda raport?",
          a: "Krótki mail z najważniejszymi zmianami i wnioskami, a pod nim szczegóły dla chętnych.",
        },
        {
          q: "Czy da się zmienić częstotliwość?",
          a: "Tak, z miesiąca na miesiąc, bez opłat za zmianę.",
        },
      ]}
      formId="order_benchmarking"
      formHeading="Zamów benchmarking konkurencji"
      formIntro="Podaj swoją stronę i firmy, które chcesz obserwować. Odeślemy przykładowy raport."
      submitLabel="Zamawiam raport"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Benchmarking konkurencji"
      serviceDesc="Cykliczny raport o konkurencji: ceny, nowe usługi, social media, szybkość stron i wnioski z opinii Google. Codziennie 69 zł, co tydzień 49 zł, co miesiąc 39 zł netto miesięcznie."
      serviceType="Analiza konkurencji"
    />
  );
}
