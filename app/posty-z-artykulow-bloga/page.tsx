import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Posty na LinkedIn i Facebook z bloga, 49 zł | Fluxlab",
  description:
    "Każdy nowy wpis na blogu daje 3 szkice postów na LinkedIn i Facebook w mailu. Nic nie publikujemy na Twoich kontach. 49 zł netto miesięcznie.",
  alternates: { canonical: "/posty-z-artykulow-bloga" },
  openGraph: {
    title: "Posty na LinkedIn i Facebook z bloga, 49 zł | Fluxlab",
    description:
      "Trzy szkice postów z każdego nowego artykułu na blogu, gotowe do edycji w mailu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, posty z artykułów bloga",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="posty-z-artykulow-bloga"
      breadcrumb="Posty z artykułów bloga"
      eyebrow="Blog w mediach społecznościowych"
      typ="usluga"
      h1="Trzy szkice postów z każdego nowego wpisu na blogu"
      lead="Płacisz kartą i wpisujesz adres bloga. Pilnujemy go sami, a przy każdym nowym wpisie dostajesz mailem trzy szkice postów: dwa na LinkedIn i jeden na Facebook. Ty poprawiasz i publikujesz."
      ctaLabel="Zamów posty"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Sami pilnujemy bloga",
          desc: "Czytamy kanał RSS lub Atom Twojego bloga. Przy zamówieniu wystarczy sam adres strony.",
        },
        {
          title: "Trzy szkice na wpis",
          desc: "Dwa różne posty na LinkedIn i jeden krótszy na Facebook, z linkiem do artykułu, tylko z faktów z tekstu.",
        },
        {
          title: "Bez dostępu do kont",
          desc: "Szkice dostajesz mailem. Niczego nie publikujemy na Twoich profilach i nie prosimy o hasła.",
        },
      ]}
      pricing={[
        {
          name: "Posty z artykułów bloga",
          price: "49 zł/mies.",
          kup: "posty-z-artykulow",
          desc: "Netto. Uruchamia się sam po płatności.",
          features: [
            "trzy szkice postów z każdego nowego wpisu",
            "próbka z najnowszego artykułu zaraz po zamówieniu",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Adres strony z blogiem, na przykład twojafirma.pl/blog. Szukamy kanału RSS lub Atom i bierzemy z niego wpisy.",
        },
        {
          q: "Co jeśli blog nie ma kanału RSS?",
          a: "Większość systemów (WordPress, Ghost, Hugo, Webflow) udostępnia go domyślnie. Gdy go nie znajdziemy, anulujemy subskrypcję i zwracamy całą opłatę.",
        },
        {
          q: "Czy publikujecie coś na moich kontach?",
          a: "Nie. Dostajesz szkice mailem i sam decydujesz, co i gdzie opublikujesz.",
        },
        {
          q: "Skąd się biorą szkice?",
          a: "Model językowy pisze je na podstawie treści artykułu. Nie dopowiada faktów spoza tekstu, ale przed publikacją przeczytaj szkic i popraw ton.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na mail ze szkicami albo użyj panelu płatności w Stripe. Po anulowaniu szkice przestają przychodzić.",
        },
      ]}
      formId="order_posty_artykuly"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Posty na LinkedIn i Facebook z artykułów bloga"
      serviceDesc="Trzy szkice postów na LinkedIn i Facebook z każdego nowego wpisu na blogu, w mailu. 49 zł netto miesięcznie."
      serviceType="Szkice postów z bloga"
    />
  );
}
