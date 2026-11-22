import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pilnowanie cen konkurencji od 39 zł | Fluxlab",
  description:
    "Raz na dobę sprawdzamy ceny produktów konkurencji na podanych stronach i piszemy, gdy któraś się zmieni. 39 zł netto miesięcznie.",
  alternates: { canonical: "/pilnowanie-cen-konkurencji" },
  openGraph: {
    title: "Pilnowanie cen konkurencji od 39 zł | Fluxlab",
    description:
      "Raz na dobę sprawdzamy ceny produktów konkurencji na podanych stronach i piszemy, gdy któraś się zmieni.",
    url: "/pilnowanie-cen-konkurencji",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie cen konkurencji" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-cen-konkurencji"
      typ="usluga"
      breadcrumb="Pilnowanie cen konkurencji"
      h1="Konkurent obniżył cenę. Dowiesz się o tym tego samego dnia, a nie od klienta"
      lead="Wklejasz adresy do trzech stron produktów konkurencji. Raz na dobę odczytujemy z nich cenę i piszemy, gdy któraś się zmieni, z kwotą przed i po oraz zmianą w procentach."
      ctaLabel="Włącz pilnowanie cen"
      ctaNote="39 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pierwsze ceny od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z cenami odczytanymi dziś z każdej podanej strony. Widzisz od razu, czy odczytaliśmy to, co chciałeś.",
        },
        {
          title: "Mail tylko przy zmianie",
          desc: "Codziennie porównujemy cenę z poprzednią. Zmianę sprawdzamy drugi raz po 10 minutach, żeby nie pisać o chwilowym błędzie sklepu. Potwierdzoną zmianę dostajesz z kwotą przed i po.",
        },
        {
          title: "Tylko publiczne strony",
          desc: "Odczytujemy cenę widoczną dla każdego odwiedzającego, bez logowania. Duże platformy sprzedażowe blokują automaty. Jeśli nie odczytamy żadnej ceny, zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie cen konkurencji",
          price: "39 zł/mies.",
          kup: "monitoring-ceny",
          desc: "Netto. Do trzech stron produktów, sprawdzanie raz na dobę.",
          features: [
            "ceny z podanych stron w mailu startowym",
            "mail przy każdej potwierdzonej zmianie ceny",
            "kwota przed i po oraz zmiana w procentach",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jakie adresy podać?",
          a: "Adresy stron pojedynczych produktów, na których cena jest widoczna bez logowania. Do trzech adresów, oddzielonych spacją. Strona z listą produktów nie wystarczy.",
        },
        {
          q: "Co jeśli nie odczytacie ceny?",
          a: "Jeśli na żadnej z podanych stron nie znajdziemy ceny, nie uruchamiamy usługi i zwracamy całą kwotę. Dostaniesz o tym mail.",
        },
        {
          q: "Skąd wiecie, że cena się naprawdę zmieniła?",
          a: "Zmianę sprawdzamy drugi raz po 10 minutach. Mail wychodzi dopiero wtedy, gdy obie próby pokazują tę samą nową cenę.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pilnowanie wyłączamy automatycznie.",
        },
      ]}
      formId="order_pilnowanie_cen_konkurencji"
      formHeading="Zapytaj o więcej produktów albo cały sklep"
      formIntro="Chcesz pilnować więcej niż trzech stron? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Pilnowanie cen konkurencji"
      serviceDesc="Codzienne odczytywanie cen z podanych stron produktów konkurencji z mailem przy potwierdzonej zmianie ceny, za 39 zł netto miesięcznie."
      serviceType="Monitoring cen"
    />
  );
}
