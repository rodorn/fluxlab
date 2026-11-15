import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kontrola faktur kosztowych, 39 zł/mies. | Fluxlab",
  description:
    "Rachunek z każdej faktury kosztowej z KSeF sprawdzamy w Białej Liście MF i piszemy od razu, gdy nie należy do sprzedawcy. 39 zł netto.",
  alternates: { canonical: "/kontrola-faktur-kosztowych" },
  openGraph: {
    title: "Kontrola faktur kosztowych, 39 zł/mies. | Fluxlab",
    description: "Faktura z cudzym rachunkiem to wyłudzenie albo błąd. Dostajesz alert, zanim zrobisz przelew.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kontrola faktur kosztowych przed zapłatą" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kontrola-faktur-kosztowych"
      breadcrumb="Kontrola faktur kosztowych przed zapłatą"
      eyebrow="KSeF dla firm"
      h1="Każda faktura kosztowa sprawdzona, zanim ją zapłacisz"
      lead="Podmieniony numer rachunku na fakturze to jedno z częstszych wyłudzeń, a zapłata na rachunek spoza białej listy odbiera prawo do kosztu podatkowego przy przelewie powyżej 15 tys. zł. Podajesz NIP i token KSeF, a my sprawdzamy rachunek z każdej nowej faktury kosztowej w Białej Liście MF i piszemy od razu, gdy coś się nie zgadza."
      ctaLabel="Włącz kontrolę faktur"
      ctaNote="39 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Chcesz same faktury na skrzynkę? Zobacz",
          kotwica: "faktury kosztowe z KSeF na maila",
          href: "/faktury-kosztowe-z-ksef-na-mail",
          po: ".",
        },
        {
          przed: "Sprawdzasz pojedynczą fakturę? Użyj",
          kotwica: "sprawdzenia numeru KSeF",
          href: "/numer-ksef",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Alert tylko przy problemie",
          desc: "Mail przychodzi, gdy rachunku z faktury nie ma na białej liście sprzedawcy, numer rachunku jest błędny albo faktura w ogóle go nie podaje. Zgodne faktury nie generują żadnych wiadomości.",
        },
        {
          title: "Sprawdzenie w Białej Liście MF",
          desc: "Rachunek z faktury porównujemy z wykazem podatników VAT Ministerstwa Finansów na dzień pobrania faktury. Nie zgadujemy i nie korzystamy z własnych baz.",
        },
        {
          title: "Token tylko do odczytu faktur, usuwany po rezygnacji",
          desc: "Token zapisujemy zaszyfrowany i używamy wyłącznie do pobrania faktur. Po anulowaniu subskrypcji usuwamy go przy najbliższym przebiegu.",
        },
      ]}
      pricing={[
        {
          name: "Kontrola faktur kosztowych",
          price: "39 zł/mies.",
          kup: "kontrola-faktur",
          desc: "Netto. Jedna firma, jeden NIP, jeden adres e-mail i opcjonalnie drugi, na przykład księgowej.",
          features: [
            "sprawdzenie rachunku z każdej nowej faktury kosztowej",
            "alert od razu, bez czekania do rana",
            "pierwszy mail od razu, z wynikiem dla faktur z ostatnich 7 dni",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd wziąć token KSeF?",
          a: "W Aplikacji Podatnika KSeF, w zakładce Tokeny, wybierz Generuj token i zaznacz uprawnienie do przeglądania faktur. Po opłaceniu zamówienia na stronie z formularzem znajdziesz krótką instrukcję.",
        },
        {
          q: "Co to znaczy, że rachunku nie ma na białej liście?",
          a: "Numer rachunku z faktury nie jest przypisany do NIP-u sprzedawcy w wykazie Ministerstwa Finansów. Przed przelewem zapytaj kontrahenta o numer, najlepiej innym kanałem niż mail z fakturą.",
        },
        {
          q: "Jak często sprawdzacie nowe faktury?",
          a: "Co godzinę. Alert przychodzi po pobraniu faktury z KSeF, zwykle w ciągu godziny od jej pojawienia się.",
        },
        {
          q: "Czy usługa blokuje przelew?",
          a: "Nie. Dostajesz informację i sam decydujesz, co dalej. Nie mamy dostępu do Twojego banku.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "NIP i token usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wysłane maile zostają w skrzynkach ich odbiorców.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z alertem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_kontrola_faktur"
      formHeading="Włącz kontrolę faktur"
      formIntro="Po opłaceniu zamówienia podasz NIP i token KSeF."
      submitLabel="Włącz kontrolę"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Kontrola faktur kosztowych przed zapłatą"
      serviceDesc="Rachunek z każdej faktury kosztowej z KSeF sprawdzany w Białej Liście MF, alert mailem przy niezgodności. 39 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
