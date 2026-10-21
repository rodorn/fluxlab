import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Prowadzenie wizytówki Google, 349 zł/mies. | Fluxlab",
  description:
    "Prowadzimy Twój Profil Firmy w Google: uporządkowany wpis, cotygodniowe posty, odpowiedzi na opinie i pomiar telefonów z Map. 349 zł netto miesięcznie.",
  alternates: { canonical: "/profil-firmy-google" },
  openGraph: {
    title: "Prowadzenie wizytówki Google, 349 zł/mies. | Fluxlab",
    description:
      "Uporządkowany Profil Firmy w Google, posty co tydzień, odpowiedzi na opinie i pomiar telefonów z Map.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, prowadzenie wizytówki Google",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="profil-firmy-google"
      breadcrumb="Prowadzenie wizytówki Google"
      eyebrow="Profil Firmy w Google"
      h1="Prowadzimy Twoją wizytówkę w Google, żeby klienci z Map dzwonili do Ciebie"
      lead="Klient szuka usługi w okolicy, widzi trzy firmy na mapie i dzwoni do tej, która ma zdjęcia, świeże posty i odpowiedzi na opinie. Dbamy o to co tydzień, a Ty widzisz, ile telefonów i wejść przyszło z Map."
      ctaLabel="Zamów prowadzenie"
      ctaNote="349 zł netto miesięcznie, rezygnacja z miesiąca na miesiąc"
      powiazane={[
        {
          przed: "Strona w ogóle nie pokazuje się w wynikach? Zobacz",
          kotwica: "widoczność w Google",
          href: "/widocznosc-w-google",
          po: ".",
        },
        {
          przed: "Chcesz sprawdzić całą stronę? Zrób",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Uporządkowany wpis",
          desc: "Kategorie, usługi, godziny, zdjęcia i dane zgodne ze stroną i rejestrami.",
        },
        {
          title: "Post co tydzień",
          desc: "Krótki wpis z nowością, poradą albo artykułem z Twojej strony.",
        },
        {
          title: "Odpowiedzi na opinie",
          desc: "Na każdą nową opinię, także krytyczną, w Twoim imieniu i Twoim tonem.",
        },
      ]}
      pricing={[
        {
          name: "Sprawdzenie wizytówki",
          price: "0 zł",
          desc: "Zanim cokolwiek zamówisz.",
          features: [
            "lista błędów i braków w obecnym wpisie",
            "porównanie z trzema firmami obok na mapie",
          ],
        },
        {
          name: "Prowadzenie",
          price: "349 zł/mc",
          desc: "Netto, bez opłaty na start.",
          features: [
            "uporządkowanie wpisu na start w cenie",
            "post co tydzień i odpowiedzi na opinie",
            "pomiar telefonów i wejść z Map co miesiąc",
            "rezygnacja z miesiąca na miesiąc",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy muszę dać dostęp do konta Google?",
          a: "Nie do konta. Dodajesz nas jako menedżera samej wizytówki, a odebrać dostęp możesz jednym kliknięciem.",
        },
        {
          q: "Kto pisze odpowiedzi na opinie?",
          a: "My, w Twoim imieniu. Przy opiniach krytycznych najpierw wysyłamy Ci szkic, a publikujemy po akceptacji.",
        },
        {
          q: "Skąd będę wiedzieć, czy to działa?",
          a: "Co miesiąc dostajesz liczbę wyświetleń, telefonów, próśb o trasę i wejść na stronę z Map, z porównaniem do poprzedniego miesiąca.",
        },
        {
          q: "A jeśli firma nie ma jeszcze wizytówki?",
          a: "Zakładamy ją w ramach pierwszego miesiąca i przeprowadzamy przez weryfikację w Google.",
        },
      ]}
      formId="order_profil_google"
      formHeading="Zamów prowadzenie wizytówki"
      formIntro="Podaj nazwę firmy albo link do wizytówki. Odeślemy, co poprawimy na start."
      submitLabel="Zamawiam prowadzenie"
      microCopy="Dostęp do wizytówki jest potrzebny dopiero na start prac."
      serviceName="Prowadzenie Profilu Firmy w Google"
      serviceDesc="Prowadzenie wizytówki Google (Profil Firmy w Google): uporządkowany wpis, cotygodniowe posty, odpowiedzi na opinie i miesięczny pomiar telefonów oraz wejść z Map. 349 zł netto miesięcznie."
      serviceType="Prowadzenie wizytówki Google"
    />
  );
}
