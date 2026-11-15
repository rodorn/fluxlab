import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pilnowanie zmian u konkurentów od 29 zł | Fluxlab",
  description:
    "Co tydzień sprawdzamy mapę strony i cennik trzech konkurentów i piszemy, jakie podstrony i ceny doszły. 29 zł netto miesięcznie.",
  alternates: { canonical: "/pilnowanie-zmian-u-konkurentow" },
  openGraph: {
    title: "Pilnowanie zmian u konkurentów od 29 zł | Fluxlab",
    description:
      "Co tydzień sprawdzamy mapę strony i cennik trzech konkurentów i piszemy, jakie podstrony i ceny doszły. 29 zł netto miesięcznie.",
    url: "/pilnowanie-zmian-u-konkurentow",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie zmian u konkurentów" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-zmian-u-konkurentow"
      typ="usluga"
      breadcrumb="Pilnowanie zmian u konkurentów"
      h1="Konkurent dodał ofertę albo zmienił cennik. Dowiesz się z poniedziałkowego maila"
      lead="Podajesz do trzech domen konkurentów. Raz w tygodniu porównujemy ich mapę strony i strony z cennikiem z poprzednim tygodniem i wysyłamy listę nowych podstron oraz zmian cen."
      ctaLabel="Włącz pilnowanie konkurentów"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Stan wyjściowy od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z liczbą podstron każdego konkurenta. Widzisz, czy odczytaliśmy to, co chciałeś.",
        },
        {
          title: "Co tydzień lista zmian",
          desc: "Co tydzień przychodzi mail: nowe podstrony z mapy strony konkurenta i zmiany na jego stronach z cennikiem, z cenami przed i po. Gdy nic się nie zmieniło, też o tym piszemy.",
        },
        {
          title: "Tylko publiczne strony",
          desc: "Czytamy mapę strony i podstrony widoczne dla każdego, bez logowania. Jeśli nie znajdziemy mapy strony ani linków na żadnej z domen, nie uruchamiamy usługi i zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie zmian u konkurentów",
          price: "29 zł/mies.",
          kup: "monitoring-konkurenci",
          desc: "Netto. Do trzech domen konkurentów, sprawdzanie raz w tygodniu.",
          features: [
            "liczba podstron każdego konkurenta w mailu startowym",
            "tygodniowy mail z nowymi podstronami",
            "zmiany cen na stronach z cennikiem, przed i po",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jakie adresy podać?",
          a: "Domeny konkurentów, na przykład konkurent.pl. Do trzech, oddzielone spacją.",
        },
        {
          q: "Skąd wiecie, co jest nowe?",
          a: "Pierwszego dnia zapisujemy listę podstron z mapy strony konkurenta. Każdy kolejny tydzień porównujemy z tą listą i pokazujemy tylko adresy, których wcześniej nie było.",
        },
        {
          q: "Które ceny sprawdzacie?",
          a: "Ceny ze stron o adresach typu cennik, pricing, ceny, plany albo oferta. Gdy konkurent nie ma takiej strony, pilnujemy samych podstron.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pilnowanie wyłączamy automatycznie.",
        },
      ]}
      formId="order_pilnowanie_zmian_u_konkurentow"
      formHeading="Zapytaj o więcej konkurentów"
      formIntro="Chcesz pilnować więcej niż trzech konkurentów? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Pilnowanie zmian u konkurentów"
      serviceDesc="Tygodniowe porównanie mapy strony i cennika trzech konkurentów z mailem o nowych podstronach i zmianach cen, za 29 zł netto miesięcznie."
      serviceType="Monitoring konkurencji"
    />
  );
}
