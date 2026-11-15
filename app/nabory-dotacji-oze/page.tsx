import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Nabory dotacji OZE, alert 19 zł/mies. | Fluxlab",
  description:
    "Obserwujemy strony programów dotacji na fotowoltaikę, magazyny energii i pompy ciepła. Gdy pojawi się nowy tekst o naborze, dostajesz mail. 19 zł netto.",
  alternates: { canonical: "/nabory-dotacji-oze" },
  openGraph: {
    title: "Nabory dotacji OZE, alert 19 zł/mies. | Fluxlab",
    description: "Mail, gdy na stronie programu dotacji pojawi się nowy tekst o naborze lub terminie.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, nabory dotacji OZE" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="nabory-dotacji-oze"
      breadcrumb="Nabory dotacji OZE"
      eyebrow="Alert o dotacjach"
      h1="Nabór dotacji na OZE zaczyna się i kończy szybciej, niż zdążysz o nim usłyszeć"
      lead="Codziennie sprawdzamy strony programów dofinansowania: Mój Prąd, „Moje Ciepło”, Mój Elektryk, Agroenergia, Energia dla wsi i aktualności NFOŚiGW. Gdy pojawi się nowy tekst o naborze, terminie albo wnioskach, dostajesz mail z cytatem i linkiem do strony programu."
      ctaLabel="Włącz alert"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Dla firm i prosumentów liczy się też cena prądu. Zobacz",
          kotwica: "ceny energii na jutro",
          href: "/ceny-energii-jutro",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Dom albo firma",
          desc: "Przy zamówieniu wybierasz, czy chodzi o dom, czy o firmę. Dostajesz tylko strony programów, które do Ciebie pasują.",
        },
        {
          title: "Pierwszy mail od razu",
          desc: "Zaraz po zamówieniu wysyłamy to, co jest dziś na obserwowanych stronach, żebyś zaczynał od aktualnego stanu.",
        },
        {
          title: "Cytat i link, bez naszej oceny",
          desc: "W mailu jest nowy fragment tekstu ze strony programu i link do niej. Termin i warunki zawsze sprawdzasz na stronie programu.",
        },
      ]}
      pricing={[
        {
          name: "Alert o naborach",
          price: "19 zł/mies.",
          kup: "dotacje-oze",
          desc: "Netto. Mail tylko wtedy, gdy na stronach programów pojawi się nowy tekst.",
          features: [
            "codzienne sprawdzanie stron programów",
            "wybór: dom albo firma",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Które strony obserwujecie?",
          a: "Mój Prąd (mojprad.gov.pl), „Moje Ciepło” (mojecieplo.gov.pl), strony programów Mój Elektryk, Agroenergia i Energia dla wsi w serwisie gov.pl oraz aktualności NFOŚiGW. Własnej strony Czystego Powietrza nie obserwujemy, bo nasz automat nie ma do niej dostępu. Nowe komunikaty o tym programie mogą trafić do nas przez aktualności NFOŚiGW.",
        },
        {
          q: "Czy obserwujecie programy wojewódzkie i gminne?",
          a: "Nie. Obserwujemy tylko wymienione strony programów krajowych.",
        },
        {
          q: "Skąd wiecie, że to nowy nabór?",
          a: "Nie wiemy i tego nie twierdzimy. Porównujemy tekst strony z poprzednim dniem i wysyłamy nowe zdania o naborach, terminach i wnioskach. Czy to dotyczy Ciebie, sprawdzasz na stronie programu.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na maila z alertem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_dotacje_oze"
      formHeading="Włącz alert o naborach dotacji"
      formIntro="Napisz, czy chodzi o dom, czy o firmę. Pierwszy mail wyślemy zaraz po zamówieniu."
      submitLabel="Włącz alert"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Nabory dotacji OZE"
      serviceDesc="Codzienny alert e-mail o nowych tekstach na stronach programów dotacji OZE (Mój Prąd, „Moje Ciepło”, Mój Elektryk, Agroenergia, Energia dla wsi, aktualności NFOŚiGW). 19 zł netto miesięcznie."
      serviceType="Monitoring programów dotacji"
    />
  );
}
