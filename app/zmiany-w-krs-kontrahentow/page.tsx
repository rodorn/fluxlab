import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Zmiany w KRS kontrahentów od 29 zł | Fluxlab",
  description:
    "Podajesz do 20 firm, a my raz na dobę czytamy ich odpis z KRS i piszemy, gdy zmieni się zarząd, prokura, adres lub kapitał. 29 zł netto miesięcznie.",
  alternates: { canonical: "/zmiany-w-krs-kontrahentow" },
  openGraph: {
    title: "Zmiany w KRS kontrahentów od 29 zł | Fluxlab",
    description:
      "Podajesz do 20 firm, a my raz na dobę czytamy ich odpis z KRS i piszemy, gdy zmieni się zarząd, prokura, adres lub kapitał. 29 zł netto miesięcznie.",
    url: "/zmiany-w-krs-kontrahentow",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, zmiany w KRS kontrahentów" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="zmiany-w-krs-kontrahentow"
      typ="usluga"
      breadcrumb="Zmiany w KRS kontrahentów"
      h1="Kontrahent zmienił zarząd albo adres. Dowiesz się następnego dnia, nie przy kolejnej fakturze"
      lead="Podajesz NIP albo numer KRS do 20 firm. Raz na dobę czytamy odpis aktualny z oficjalnego API Krajowego Rejestru Sądowego i piszemy tylko wtedy, gdy coś się zmieniło."
      ctaLabel="Włącz pilnowanie KRS"
      ctaNote="29 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Stan wyjściowy od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z tym, co jest dziś w KRS: nazwa, forma prawna, siedziba, kapitał, liczba osób w zarządzie. Od tego stanu liczymy każdą zmianę.",
        },
        {
          title: "Co zgłaszamy",
          desc: "Zmianę zarządu (kto doszedł, kto odszedł), prokurentów, adresu siedziby, kapitału zakładowego, nazwy i formy prawnej oraz nowy wpis w rejestrze, także gdy nie umiemy go opisać.",
        },
        {
          title: "Czego nie widzimy",
          desc: "Oficjalne API KRS maskuje dane osób (nazwisko i imię tylko od pierwszej litery), więc zmiany zarządu pokazujemy w takiej postaci. Jednoosobowe działalności nie są w KRS i nie da się ich pilnować. Gdy nie odczytamy żadnej firmy, zwracamy całą opłatę.",
        },
      ]}
      pricing={[
        {
          name: "Zmiany w KRS kontrahentów",
          price: "29 zł/mies.",
          kup: "monitoring-krs",
          desc: "Netto. Do 20 firm, sprawdzanie raz na dobę.",
          features: [
            "stan wyjściowy każdej firmy na starcie",
            "mail tylko przy zmianie, z zapisem było i jest",
            "dane z oficjalnego API KRS, bez scrapingu",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co podać?",
          a: "NIP albo numer KRS, do 20 firm, oddzielone spacją. NIP zamieniamy na numer KRS przez wykaz podatników MF.",
        },
        {
          q: "Skąd dane?",
          a: "Z odpisu aktualnego w oficjalnym API Krajowego Rejestru Sądowego Ministerstwa Sprawiedliwości.",
        },
        {
          q: "Czy przyjdzie mail, gdy nic się nie zmieniło?",
          a: "Nie. Mail wychodzi na starcie i przy każdej zmianie.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Pilnowanie wyłączamy automatycznie.",
        },
      ]}
      formId="order_zmiany_krs"
      formHeading="Zapytaj o więcej firm"
      formIntro="Chcesz pilnować więcej niż 20 firm? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Zmiany w KRS kontrahentów"
      serviceDesc="Codzienne czytanie odpisu z KRS do 20 firm i mail przy zmianie zarządu, prokury, adresu albo kapitału, za 29 zł netto miesięcznie."
      serviceType="Monitoring rejestru KRS"
    />
  );
}
