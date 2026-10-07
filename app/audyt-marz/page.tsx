import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt marż sklepu, zysk na produkcie, 49 zł | Fluxlab",
  description:
    "Panel pokazuje obrót, a nie to, co zostaje. Liczymy zysk netto na sztuce po prowizjach, zwrotach i dopłatach do wysyłki, wskazujemy martwy stok. 49 zł.",
  alternates: { canonical: "/audyt-marz" },
  openGraph: {
    title:
      "Audyt marż sklepu, realny zysk na każdym produkcie, 49 zł | Fluxlab",
    description:
      "Zysk netto na sztuce po prowizjach, zwrotach i dopłatach do wysyłki. Bestsellery sprzedawane pod kreską i martwy stok. 49 zł.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt marż sklepu",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="audyt-marz"
      breadcrumb="Audyt marż"
      eyebrow="Rentowność asortymentu"
      h1="Sprzedajesz dużo, a nie wiadomo, gdzie te pieniądze"
      lead="Allegro i BaseLinker pokazują obrót, a nie to, co zostaje po prowizji, zwrocie i wysyłce. Z eksportu sprzedaży i cen zakupu liczymy realny zysk na każdej sztuce."
      ctaLabel="Zamów audyt marż"
      ctaNote="Raport w 48 godzin"
      checks={[
        {
          title: "Bestsellery, które dokładasz",
          desc: "Hity sprzedaży często są pod kreską. Wskazujemy je z kwotą straty na sztuce.",
        },
        {
          title: "Wszystkie koszty, nie tylko zakup",
          desc: "Prowizje, zwroty, dopłata do wysyłki i koszt reklamy.",
        },
        {
          title: "Martwy stok i zamrożony kapitał",
          desc: "Ile pieniędzy stoi w towarze, który się nie sprzedaje.",
        },
        {
          title: "Co dokupić, a co wycofać",
          desc: "Lista priorytetów według zysku, nie liczby sztuk.",
        },
      ]}
      pricing={[
        {
          name: "Audyt marż",
          price: "49 zł",
          desc: "Katalog do pięciuset pozycji.",
          features: [
            "zysk netto na każdej sztuce",
            "lista produktów pod kreską",
            "martwy stok i zamrożony kapitał",
            "raport PDF i arkusz z wyliczeniami",
          ],
          featured: true,
        },
        {
          name: "Comiesięczny rachunek",
          price: "149 zł/mc",
          desc: "Ten sam rachunek co miesiąc.",
          features: [
            "wszystko z audytu",
            "porównanie miesiąc do miesiąca",
            "alarm, gdy produkt wpada pod kreskę",
                      ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujecie od nas?",
          a: "Eksportu sprzedaży z trzech miesięcy i listy cen zakupu w CSV albo Excelu.",
        },
        {
          q: "Z jakich systemów przyjmujecie eksport?",
          a: "Allegro, BaseLinker, WooCommerce, Shopify, Shoper, IdoSell albo plik z magazynu.",
        },
        {
          q: "Co z danymi naszych klientów?",
          a: "Nie potrzebujemy ich. Dane osobowe usuwamy przy wczytaniu, pliki kasujemy po raporcie.",
        },
        {
          q: "A jeśli okaże się, że wszystko jest w porządku?",
          a: "To też wynik: przestajesz zgadywać, ile zarabiasz na każdym produkcie.",
        },
      ]}
      formId="order_audyt_marz"
      formHeading="Zamów audyt marż"
      formIntro="Napisz, z jakiego systemu masz eksport i ile masz produktów. Pliki prześlesz mailem po naszej odpowiedzi."
      submitLabel="Zamów audyt marż"
      microCopy="Raport w 48 godzin. Dane kasujemy po dostarczeniu raportu."
      serviceName="Audyt marż sklepu internetowego"
      serviceDesc="Wyliczenie realnego zysku netto na produkt po prowizjach, zwrotach i kosztach wysyłki, lista pozycji sprzedawanych pod kreską i martwy stok. 49 zł."
      serviceType="Analiza rentowności asortymentu"
    />
  );
}
