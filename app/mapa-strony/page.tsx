import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import MapaCheck from "@/components/MapaCheck";

export const metadata: Metadata = {
  title: "Czy Google ma listę podstron, sprawdź za darmo | Fluxlab",
  description:
    "Mapa strony to lista adresów, którą wyszukiwarka pobiera jednym zapytaniem. Sprawdź za darmo, czy Twoja ją ma i czy adresy działają. Naprawa od 240 zł.",
  alternates: { canonical: "/mapa-strony" },
  openGraph: {
    title: "Czy Google ma listę podstron, sprawdź za darmo | Fluxlab",
    description:
      "Sprawdzenie mapy strony, pliku robots.txt i adresów, które z tej mapy nie działają. Od ręki, bez rejestracji.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, mapa strony i indeksowanie w wyszukiwarce",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="mapa-strony"
      tool={<MapaCheck />}
      breadcrumb="Mapa strony"
      eyebrow="Indeksowanie w wyszukiwarce"
      h1="Wyszukiwarka może nie wiedzieć o połowie Twoich podstron"
      lead="Robot dostaje gotową listę adresów albo odtwarza ją, klikając w linki. Wtedy podstrona ukryta w menu bywa odkrywana miesiącami, a martwe adresy z listy psują zaufanie do całości."
      ctaLabel="Sprawdź swoją mapę strony"
      ctaNote="Sprawdzenie za darmo, od ręki"
      checks={[
        {
          title: "Czy mapa strony istnieje",
          desc: "Szukamy jej w robots.txt i w standardowych lokalizacjach.",
        },
        {
          title: "Czy adresy z mapy działają",
          desc: "Sprawdzamy próbkę adresów z całej listy. Błędny adres zużywa limit odwiedzin robota.",
        },
        {
          title: "Czy robots.txt nie blokuje serwisu",
          desc: "Blokada z wersji roboczej potrafi trafić na produkcję. Porównujemy dokładne reguły.",
        },
        {
          title: "Co z martwymi adresami",
          desc: "Przekierować czy usunąć z listy. Rozstrzygamy osobno dla każdego adresu.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie",
          price: "0 zł",
          desc: "Od ręki, na tej stronie.",
          features: [
            "mapa strony i robots.txt",
            "próbka adresów z kodami odpowiedzi",
          ],
        },
        {
          name: "Pełny przegląd i naprawa",
          price: "od 240 zł",
          desc: "Cała lista, nie próbka.",
          features: [
            "wszystkie adresy z mapy",
            "nowa mapa pod Wasz system",
            "decyzja dla każdego martwego adresu",
          ],
          featured: true,
        },
        {
          name: "Pilnowanie",
          price: "99 zł/mc",
          desc: "Dla serwisów, które rosną.",
          features: [
            "cykliczne sprawdzanie całej listy",
            "sygnał, gdy adresy wypadają",
          ],
        },
      ]}
      faq={[
        {
          q: "Czy brak mapy strony oznacza, że nie ma nas w Google?",
          a: "Nie. Chodzi o czas i kompletność. Przy kilkunastu podstronach różnicy zwykle nie ma, przy setkach adresów decyduje, ile trafi do wyników.",
        },
        {
          q: "Dlaczego sprawdzacie tylko kilkanaście adresów?",
          a: "Do werdyktu wystarczy próbka, a setki zapytań obciążałyby cudzy serwer. Pełny przegląd robimy na zlecenie właściciela.",
        },
        {
          q: "Skąd wiadomo, że to nie chwilowa awaria serwera?",
          a: "Rozróżniamy kod błędu od braku odpowiedzi. Przy pełnym przeglądzie podejrzane adresy sprawdzamy powtórnie.",
        },
        {
          q: "Jak zgłosić mapę witryny do Google?",
          a: "W Search Console, w zakładce Mapy witryn, oraz linią Sitemap: w robots.txt. Google ignoruje priority i changefreq, a lastmod czyta tylko, gdy zgadza się z faktycznymi zmianami.",
        },
      ]}
      formId="order_mapa_strony"
      formHeading="Zamów pełny przegląd"
      formIntro="Napisz, na czym stoi strona. Odeślemy przegląd wszystkich adresów i propozycję naprawy."
      submitLabel="Zamów przegląd"
      microCopy="Do sprawdzenia nie potrzebujemy dostępów."
      serviceName="Przegląd mapy strony i naprawa martwych adresów"
      serviceDesc="Sprawdzenie wszystkich adresów z mapy strony, wygenerowanie poprawnej mapy pod system klienta, wskazanie jej w robots.txt oraz rozstrzygnięcie przekierowań dla adresów, które przestały działać. Od 240 zł."
      serviceType="Przegląd indeksowania i mapy strony"
    />
  );
}
