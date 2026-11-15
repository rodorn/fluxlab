import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Widoczność na frazy w Google od 39 zł | Fluxlab",
  description:
    "Raz w tygodniu sprawdzamy, na której pozycji w Google jest Twoja strona dla 20 fraz, i pokazujemy zmiany oraz konkurentów. 39 zł netto.",
  alternates: { canonical: "/widocznosc-na-frazy-w-google" },
  openGraph: {
    title: "Widoczność na frazy w Google od 39 zł | Fluxlab",
    description:
      "Raz w tygodniu sprawdzamy, na której pozycji w Google jest Twoja strona dla 20 fraz, i pokazujemy zmiany oraz konkurentów. 39 zł netto.",
    url: "/widocznosc-na-frazy-w-google",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, widoczność na frazy w Google" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="widocznosc-na-frazy-w-google"
      typ="usluga"
      breadcrumb="Widoczność na frazy w Google"
      h1="Na której pozycji jesteś w Google i kto jest przed Tobą? Co tydzień w mailu"
      lead="Podajesz domenę i do 20 fraz, na których zależy Ci na klientach. Raz w tygodniu sprawdzamy wyniki Google dla Polski i wysyłamy mail: Twoja pozycja dla każdej frazy, zmiana od zeszłego tygodnia i firmy, które najczęściej są w pierwszej dziesiątce."
      ctaLabel="Włącz pomiar widoczności"
      ctaNote="39 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pierwszy pomiar od razu",
          desc: "Po zamówieniu dostajesz mail z pozycjami na dziś. Od następnego tygodnia każdy mail pokazuje, co poszło w górę, a co spadło.",
        },
        {
          title: "Konkurenci z pierwszej dziesiątki",
          desc: "W mailu widzisz, które domeny najczęściej wyprzedzają Cię na Twoich frazach i na jakiej średnio są pozycji.",
        },
        {
          title: "Wynik dla Polski, bez personalizacji",
          desc: "Pozycje czytamy z wyników Google dla Polski, tak jak widzi je osoba niezalogowana. Zależnie od miejsca i urządzenia mogą się różnić, dlatego traktuj je jako trend.",
        },
        {
          title: "Bez dostępu do Twoich kont",
          desc: "Nie potrzebujemy Search Console ani logowania. Sprawdzamy to, co widać w publicznych wynikach wyszukiwania.",
        },
      ]}
      pricing={[
        {
          name: "Widoczność na frazy w Google",
          price: "39 zł/mies.",
          kup: "monitoring-widocznosc",
          desc: "Netto. Jedna domena, do 20 fraz, pomiar raz w tygodniu.",
          features: [
            "pierwszy pomiar od razu po zamówieniu",
            "pozycja dla każdej frazy i zmiana od zeszłego tygodnia",
            "najczęstsi konkurenci w pierwszej dziesiątce",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać w polu zamówienia?",
          a: "Najpierw domenę, potem frazy po przecinku, na przykład: firma.pl, księgowa Warszawa, biuro rachunkowe Mokotów. Pole mieści około 255 znaków, czyli kilkanaście krótkich fraz. Jeśli potrzebujesz więcej, napisz przez formularz poniżej.",
        },
        {
          q: "Czy to są dokładne pozycje z Google Search Console?",
          a: "Nie. To pozycje z publicznych wyników Google dla Polski, sprawdzone raz w tygodniu. Dobrze pokazują kierunek zmian i konkurentów, ale nie zastępują danych z Search Console o realnych wyświetleniach.",
        },
        {
          q: "Co znaczy „poza pierwszą 20”?",
          a: "Sprawdzamy pierwsze 20 wyników. Jeśli Twojej domeny w nich nie ma, w mailu zobaczysz taką informację zamiast numeru pozycji.",
        },
        {
          q: "Co jeśli Google nie zwróci wyników?",
          a: "Powtarzamy pobranie w ciągu doby. Jeśli przy pierwszym zamówieniu się nie uda, nie uruchamiamy usługi i zwracamy całą opłatę.",
        },
      ]}
      formId="order_widocznosc_na_frazy_w_google"
      formHeading="Zapytaj o więcej fraz lub domen"
      formIntro="Potrzebujesz więcej niż 20 fraz albo kilku domen? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Widoczność na frazy w Google"
      serviceDesc="Cotygodniowy pomiar pozycji strony w Google dla do 20 fraz z porównaniem do poprzedniego tygodnia i listą konkurentów, za 39 zł netto miesięcznie."
      serviceType="Monitoring"
    />
  );
}
