import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Alert wycieku haseł od 19 zł | Fluxlab",
  description:
    "Raz na dobę sprawdzamy Twój adres e-mail w publicznych bazach wycieków. Gdy pojawi się w nowym, dostajesz mail. 19 zł netto miesięcznie.",
  alternates: { canonical: "/alert-wycieku-hasel" },
  openGraph: {
    title: "Alert wycieku haseł od 19 zł | Fluxlab",
    description:
      "Raz na dobę sprawdzamy Twój adres e-mail w publicznych bazach wycieków. Gdy pojawi się w nowym, dostajesz mail.",
    url: "/alert-wycieku-hasel",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, alert wycieku haseł" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="alert-wycieku-hasel"
      typ="usluga"
      breadcrumb="Alert wycieku haseł"
      h1="Twoje hasło wyciekło z cudzego serwisu? Dowiesz się, zanim ktoś zaloguje się na Twoje konto"
      lead="Wycieki z serwisów, w których masz konto, zdarzają się co tydzień, a firmy informują o nich po miesiącach. Raz na dobę sprawdzamy Twój adres e-mail w publicznych bazach wycieków i piszemy, gdy pojawi się w nowym."
      ctaLabel="Włącz alert"
      ctaNote="19 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pierwszy wynik od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z listą wycieków, w których Twój adres już się pojawił, z rokiem i rodzajem danych. To stan wyjściowy, nie alarm.",
        },
        {
          title: "Mail tylko przy nowym wycieku",
          desc: "Codziennie porównujemy wynik z poprzednim. Gdy pojawi się nowy wyciek, piszemy z nazwą serwisu, rokiem i tym, co wyciekło (hasła, numery telefonu, adresy), oraz z krótką instrukcją, co zrobić.",
        },
        {
          title: "Pilnujemy tylko Twojego adresu",
          desc: "Sprawdzamy wyłącznie adres e-mail, z którego składasz zamówienie. Nie przyjmujemy cudzych adresów, więc nikt nie dostanie od nas informacji o wycieku z cudzej skrzynki.",
        },
      ]}
      pricing={[
        {
          name: "Alert wycieku haseł",
          price: "19 zł/mies.",
          kup: "monitoring-wyciek",
          desc: "Netto. Jeden adres e-mail, sprawdzanie raz na dobę.",
          features: [
            "lista dotychczasowych wycieków od razu po zamówieniu",
            "mail przy każdym nowym wycieku",
            "zalecenia, co zmienić",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd macie dane o wyciekach?",
          a: "Z publicznej bazy XposedOrNot, która zbiera ujawnione zestawy danych. Wysyłamy tam tylko Twój adres e-mail, bez haseł. Nie znamy i nie przechowujemy Twoich haseł.",
        },
        {
          q: "Czy napiszecie, jeśli mój adres jest już w starych wyciekach?",
          a: "Raz, w mailu startowym, jako stan wyjściowy. Kolejne wiadomości przychodzą tylko wtedy, gdy adres pojawi się w nowym wycieku.",
        },
        {
          q: "Czy mogę pilnować adresu firmowego albo kilku adresów?",
          a: "Pilnujemy adresu użytego przy zamówieniu. Dla kilku adresów złóż osobne zamówienia z tych adresów albo napisz przez formularz poniżej.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Alert wyłączamy automatycznie.",
        },
      ]}
      formId="order_alert_wycieku_hasel"
      formHeading="Zapytaj o pilnowanie wielu adresów"
      formIntro="Masz zespół albo kilka domen? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Alert wycieku haseł"
      serviceDesc="Codzienne sprawdzanie adresu e-mail klienta w publicznych bazach wycieków z mailem przy nowym wycieku, za 19 zł netto miesięcznie."
      serviceType="Monitoring wycieków danych"
    />
  );
}
