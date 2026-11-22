import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pilnowanie konkurentów za 29 zł miesięcznie | Fluxlab",
  description:
    "Co poniedziałek mail z listą zmian na stronach do 3 konkurentów: nowe podstrony, zmieniony tytuł i nagłówek, nowe kwoty w cennikach. 29 zł netto miesięcznie.",
  alternates: { canonical: "/pilnowanie-konkurentow" },
  openGraph: {
    title: "Pilnowanie konkurentów za 29 zł miesięcznie | Fluxlab",
    description:
      "Tygodniowy mail: co konkurenci dodali, usunęli i zmienili na swoich stronach, z kwotami z cenników.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, pilnowanie zmian u konkurentów" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pilnowanie-konkurentow"
      breadcrumb="Pilnowanie konkurentów"
      typ="usluga"
      h1="Co konkurenci zmienili na stronach w tym tygodniu?"
      lead="Podajesz do 3 stron konkurentów. Zapisujemy ich obecny stan i co poniedziałek wysyłamy mail z listą zmian: nowe i zniknięte podstrony, nowy tytuł albo nagłówek strony głównej oraz zmienione kwoty w cennikach i ofertach. Pierwszy mail z zapisanym stanem dostajesz w kilka minut po płatności."
      ctaLabel="Włącz pilnowanie"
      ctaNote="29 zł netto miesięcznie, rezygnacja w każdej chwili"
      checks={[
        {
          title: "Nowe podstrony",
          desc: "Porównujemy listę podstron z mapy witryny i z linków strony głównej. Nowa oferta, landing albo wpis na blogu trafia do maila w tygodniu, w którym się pojawi.",
        },
        {
          title: "Strona główna",
          desc: "Tytuł, opis i główny nagłówek. Zmiana przekazu to zwykle zmiana strategii, a widać ją od razu: „było” i „jest” obok siebie.",
        },
        {
          title: "Kwoty w cennikach",
          desc: "Na stronach, których adres zawiera słowa takie jak cennik, oferta, abonament albo pricing, wyłapujemy kwoty w zł i euro i pokazujemy, które doszły, a które zniknęły.",
        },
        {
          title: "Podstrony, które zniknęły",
          desc: "Wycofana oferta albo usunięty pakiet też trafiają na listę.",
        },
      ]}
      pricing={[
        {
          name: "Pilnowanie do 3 konkurentów",
          price: "29 zł",
          kup: "konkurenci-pilnowanie",
          desc: "Netto, miesięcznie. Pierwszy mail z zapisanym stanem w kilka minut.",
          features: [
            "do 3 stron konkurentów, adresy po spacji",
            "tygodniowy mail w poniedziałek",
            "nowe i zniknięte podstrony",
            "zmiany tytułu, opisu i nagłówka strony głównej",
            "kwoty z cenników i ofert: co doszło, co zniknęło",
            "rezygnacja w każdej chwili",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czy dowiem się o każdej zmianie ceny?",
          a: "Tylko o tych, które widać w tekście strony cennika albo oferty. Gdy konkurent pokazuje ceny skryptem po załadowaniu strony, kalkulatorem albo tylko po zalogowaniu, ich nie zobaczymy. Mail zawsze pokazuje kwoty z tekstu strony, więc przy zmianie sprawdź ją na stronie konkurenta.",
        },
        {
          q: "Co, gdy konkurent blokuje roboty?",
          a: "Jeśli przy zamówieniu strona nie odpowiada albo jej nie pobierzemy, zwracamy całą kwotę. Gdy zablokuje nas później, mail tygodniowy napisze, że strona nie odpowiedziała. Nie omijamy zabezpieczeń przed robotami.",
        },
        {
          q: "Czy mail przyjdzie, gdy nic się nie zmieniło?",
          a: "Tak, krótki, z informacją „bez zmian” przy każdej stronie. Dzięki temu wiesz, że pilnowanie działa.",
        },
        {
          q: "Skąd mamy adresy konkurentów?",
          a: "Podajesz je sam przy zamówieniu, do 3 adresów po spacji. Nie szukamy ich za Ciebie.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Anulujesz subskrypcję. Pilnowanie wtedy kończy się samo, a zapisany stan usuwamy.",
        },
      ]}
      formId="order_konkurenci"
      formHeading="Więcej niż 3 konkurentów?"
      formIntro="Napisz, ilu konkurentów chcesz obserwować i na co zwracasz uwagę, a odpiszemy z wyceną."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy w godzinę, oddzwaniamy w 2 godziny."
      serviceName="Pilnowanie zmian u konkurentów"
      serviceDesc="Tygodniowy mail ze zmianami na stronach do 3 konkurentów: nowe podstrony, tytuł i nagłówek strony głównej oraz kwoty w cennikach, 29 zł netto miesięcznie."
      serviceType="Monitoring stron konkurencji"
    />
  );
}
