import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Pogotowie automatyzacji, naprawa n8n i Make | Fluxlab",
  description:
    "Stanęła integracja i nie schodzą zamówienia. Czytamy logi wykonań, znajdujemy wygasłe poświadczenia i ciche awarie. Diagnoza 49 zł, naprawa od 490 zł.",
  alternates: { canonical: "/pogotowie-automatyzacji" },
  openGraph: {
    title: "Pogotowie automatyzacji, naprawa n8n i Make | Fluxlab",
    description:
      "Stanęła integracja i nie schodzą zamówienia. Czytamy logi wykonań, znajdujemy wygasłe poświadczenia i ciche awarie. Diagnoza 49 zł, naprawa od 490 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, pogotowie automatyzacji",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="pogotowie-automatyzacji"
      breadcrumb="Pogotowie automatyzacji"
      eyebrow="Awaria automatyzacji"
      h1="Stanęła integracja, a wykonawca zniknął"
      lead="Scenariusz świeci na zielono, a zamówienia nie schodzą albo leady nie trafiają do CRM. Czytamy logi wykonań i znajdujemy wygasłe poświadczenia, zmienione API i ciche awarie."
      ctaLabel="Zgłoś awarię"
      ctaNote="Odpowiedź do 2 godzin w godzinach pracy"
      checks={[
        {
          title: "Ciche awarie",
          desc: "Scenariusz zielony, ale pusty, bo filtr po zmianie nazwy pola przestał przepuszczać rekordy.",
        },
        {
          title: "Wygasłe poświadczenia",
          desc: "Odnawiamy połączenia i ustawiamy ostrzeżenie przed kolejnym wygaśnięciem.",
        },
        {
          title: "Przejęcie po poprzedniku",
          desc: "Opisujemy, co robi każdy scenariusz, gdzie są dostępy i co można wyłączyć.",
        },
        {
          title: "Monitoring",
          desc: "Alarm, gdy przebieg skończy się błędem albo przez dobę nie przejdzie żaden rekord.",
        },
      ]}
      pricing={[
        {
          name: "Diagnoza",
          price: "49 zł",
          desc: "Wiesz, co się dzieje i ile kosztuje naprawa.",
          features: [
            "przegląd logów wykonań",
            "przyczyna, nie objaw",
            "wycena naprawy bez zobowiązania",
          ],
        },
        {
          name: "Naprawa",
          price: "od 490 zł",
          desc: "Ma znowu działać, najlepiej dzisiaj.",
          features: [
            "naprawa i test na realnych danych",
            "zabezpieczenie przed powtórką",
            "krótka notatka, co było nie tak",
          ],
          featured: true,
        },
        {
          name: "Opieka",
          price: "299 zł/mc",
          desc: "O awarii nie dowiadujesz się od klienta.",
          features: [
            "monitoring i alarmy",
            "reakcja do 2 godzin w godzinach pracy",
            "drobne zmiany w abonamencie",
          ],
        },
      ]}
      faq={[
        {
          q: "Z czym pracujecie?",
          a: "n8n, Make, Zapier, BaseLinker, WooCommerce, Allegro, Pipedrive, webhooki i skrypty po poprzednim wykonawcy.",
        },
        {
          q: "Nie mamy kontaktu do osoby, która to robiła.",
          a: "To częste i nie przeszkadza. Wystarczy dostęp do narzędzia, resztę odtwarzamy z konfiguracji i logów.",
        },
        {
          q: "Jak przekazać dostępy bezpiecznie?",
          a: "Bez wysyłania haseł: konto z ograniczonymi uprawnieniami albo zaproszenie w narzędziu, które potem odbierasz.",
        },
        {
          q: "Czy diagnoza przepada, jeśli zlecimy naprawę?",
          a: "Nie. Kwota diagnozy odlicza się od naprawy.",
        },
      ]}
      formId="order_pogotowie_automatyzacji"
      formHeading="Zgłoś awarię automatyzacji"
      formIntro="Napisz, na czym to działa, co przestało działać i od kiedy. Jeśli stoją zamówienia, zaznacz to."
      submitLabel="Zgłoś awarię"
      microCopy="Odpowiedź do 2 godzin w godzinach pracy. Diagnoza płatna z góry i odliczana od naprawy."
      serviceName="Pogotowie automatyzacji, naprawa integracji"
      serviceDesc="Diagnoza i naprawa zepsutych automatyzacji: n8n, Make, Zapier, BaseLinker, WooCommerce, Allegro, webhooki. Diagnoza 49 zł, naprawa od 490 zł, opieka 299 zł miesięcznie."
      serviceType="Naprawa i utrzymanie automatyzacji"
    />
  );
}
