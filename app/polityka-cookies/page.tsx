import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Polityka cookies ze skanu strony za 49 zł | Fluxlab",
  description:
    "Skanujemy stronę, wykrywamy faktycznie działające narzędzia i wysyłamy politykę cookies z listą dostawców w PDF. 49 zł netto, wynik mailem w kilka minut.",
  alternates: { canonical: "/polityka-cookies" },
  openGraph: {
    title: "Polityka cookies ze skanu strony za 49 zł | Fluxlab",
    description:
      "Polityka z listą narzędzi wykrytych na Twojej stronie: analityka, piksele, wideo, mapy i czaty.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, polityka cookies ze skanu strony",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="polityka-cookies"
      breadcrumb="Polityka cookies ze skanu"
      typ="usluga"
      h1="Polityka cookies z szablonu nie pasuje do Twojej strony? Zrób ją ze skanu"
      lead="Po płatności skanujemy stronę główną i do trzech podstron, rozpoznajemy narzędzia zewnętrzne i wysyłamy mailem politykę cookies w PDF. Tabela zawiera tylko to, co faktycznie działa na stronie, z celem, czasem plików i dostawcą."
      ctaLabel="Zamów politykę cookies"
      ctaNote="49 zł netto, jednorazowo. PDF mailem w kilka minut"
      checks={[
        {
          title: "Lista z faktów, nie z szablonu",
          desc: "Rozpoznajemy Google Analytics, Google Ads, piksele Meta i TikToka, mapy cieplne, wideo, mapy, czaty i płatności.",
        },
        {
          title: "Uwagi o zgodach",
          desc: "Mail wskazuje, czy narzędzia wymagające zgody działają bez widocznego banera, oraz co jeszcze warto sprawdzić ręcznie.",
        },
        {
          title: "Gotowy dokument",
          desc: "Polityka ma podstawę prawną, opis praw odwiedzających i miejsce na dane administratora. Wystarczy uzupełnić je i opublikować.",
        },
      ]}
      pricing={[
        {
          name: "Polityka cookies ze skanu",
          price: "49 zł",
          kup: "cookies-skan",
          desc: "Netto, jednorazowo. PDF i lista narzędzi w mailu w kilka minut po płatności.",
          features: [
            "skan strony głównej i do 3 podstron",
            "tabela narzędzi z celem, cookies i dostawcą",
            "uwagi o brakującym banerze zgód",
            "polityka w PDF do uzupełnienia danymi firmy",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy skan widzi wszystko?",
          a: "Nie. To skan statyczny kodu stron. Narzędzia ładowane dopiero po zgodzie, po kliknięciu albo przez menedżer tagów mogą być niewidoczne. Mail przypomina, jak to sprawdzić.",
        },
        {
          q: "Czy to porada prawna?",
          a: "Nie. To gotowy wzór oparty na faktach ze strony. Dane administratora trzeba uzupełnić, a w razie wątpliwości dokument warto pokazać prawnikowi.",
        },
        {
          q: "Czy w cenie jest baner zgód na stronie?",
          a: "Nie. Dostajesz politykę i listę narzędzi. Baner zgód wdrażasz u siebie, na przykład wtyczką albo narzędziem do zarządzania zgodami.",
        },
        {
          q: "Co, jeśli strona nie otworzy się podczas skanu?",
          a: "Zwracamy całą kwotę i wysyłamy mail z wyjaśnieniem, więc nic nie tracisz.",
        },
      ]}
      formId="order_polityka_cookies"
      formHeading="Zapytaj o baner zgód i audyt prywatności"
      formIntro="Potrzebujesz wdrożenia banera zgód albo przeglądu zgodności całej strony? Napisz, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Polityka cookies ze skanu strony"
      serviceDesc="Skan strony, lista wykrytych narzędzi i polityka cookies w PDF z podstawą prawną za 49 zł netto."
      serviceType="Dokument polityki cookies"
    />
  );
}
