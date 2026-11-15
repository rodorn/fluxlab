import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Porównanie SEO z 3 konkurentami, 29 zł | Fluxlab",
  description:
    "Podajesz swoją stronę i trzech konkurentów, a mailem dostajesz zestawienie: podstrony, szybkość, opinie Google i jakość tytułów. 29 zł netto.",
  alternates: { canonical: "/porownanie-seo" },
  openGraph: {
    title: "Porównanie SEO z 3 konkurentami, 29 zł | Fluxlab",
    description: "Podstrony, szybkość, opinie Google i jakość opisów Twojej strony na tle trzech konkurentów.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, porównanie SEO z konkurentami" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="porownanie-seo"
      typ="usluga"
      breadcrumb="Porównanie SEO"
      h1="Sprawdź, czego trzej konkurenci mają więcej niż Ty"
      lead="Podajesz adres swojej strony i do trzech konkurentów. W kilka minut dostajesz mailem zestawienie obok siebie: liczbę podstron, szybkość na telefonie, opinie Google i jakość tytułów, opisów oraz danych strukturalnych."
      ctaLabel="Zamów porównanie"
      ctaNote="29 zł netto jednorazowo, płatność kartą"
      checks={[
        {
          title: "Podstrony i treść",
          desc: "Ile podstron każdy serwis ma w mapie strony, jak długie są strony i jakie słowa najczęściej pojawiają się w tytułach i nagłówkach.",
        },
        {
          title: "Szybkość na telefonie",
          desc: "Wynik i czas ładowania głównego elementu strony z testu Google PageSpeed, dla Ciebie i dla każdego konkurenta.",
        },
        {
          title: "Opinie i porządek techniczny",
          desc: "Ocena i liczba opinii z wizytówki Google, jeśli firma ją ma, oraz odsetek stron z poprawnym tytułem, opisem, nagłówkiem H1, adresem kanonicznym i danymi strukturalnymi.",
        },
      ]}
      pricing={[
        {
          name: "Porównanie SEO",
          price: "29 zł",
          kup: "porownanie-seo",
          desc: "Netto, jednorazowo. Twoja strona i do 3 konkurentów, jeden raport mailem.",
          features: [
            "zestawienie w tabeli z wnioskami, gdzie jesteś za konkurentami, a gdzie przed nimi",
            "szybkość mobilna z Google PageSpeed",
            "opinie Google tam, gdzie wizytówka wskazuje domenę firmy",
            "zwrot pieniędzy, gdy któraś strona nie odpowiada",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Najpierw swoją domenę, potem do trzech domen konkurentów, oddzielone spacją, na przykład twojafirma.pl konkurent1.pl konkurent2.pl.",
        },
        {
          q: "Czy raport pokazuje pozycje w wyszukiwarce i ruch konkurentów?",
          a: "Nie. Nie mamy dostępu do danych o pozycjach i ruchu cudzych stron, więc ich nie podajemy. Porównujemy to, co da się zmierzyć z zewnątrz: podstrony, treść, szybkość, opinie i dane techniczne.",
        },
        {
          q: "Skąd bierzecie liczbę podstron?",
          a: "Z mapy strony sitemap.xml każdego serwisu. Gdy serwis jej nie udostępnia, w raporcie jest „brak mapy”, a nie zgadywana liczba.",
        },
        {
          q: "Dlaczego czasem nie ma opinii Google?",
          a: "Opinie pokazujemy tylko wtedy, gdy wizytówka Google wskazuje tę samą domenę. Firmy bez wizytówki albo z inną stroną w wizytówce zostają oznaczone jako brak wizytówki.",
        },
        {
          q: "Czy wyniki szybkości są stałe?",
          a: "To jedno uruchomienie testu Google PageSpeed na telefonie, więc wynik może się różnić o kilka punktów między próbami.",
        },
        {
          q: "Co jeśli strona nie odpowiada?",
          a: "Gdy którejś ze stron nie da się pobrać albo adres jest błędny, zwracamy całą kwotę i dostajesz o tym maila.",
        },
      ]}
      formId="order_porownanie_seo"
      formHeading="Masz więcej stron albo branż do porównania?"
      formIntro="Napisz, ile serwisów chcesz porównywać. Odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Porównanie SEO z 3 konkurentami"
      serviceDesc="Raport mailem: podstrony, szybkość, opinie Google i jakość tytułów Twojej strony na tle trzech konkurentów, za 29 zł netto."
      serviceType="Analiza SEO"
    />
  );
}
