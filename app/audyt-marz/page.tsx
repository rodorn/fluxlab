import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Audyt marż sklepu, realny zysk na każdym produkcie, 49 zł | Fluxlab",
  description:
    "Panel pokazuje obrót, a nie to, co zostaje. Liczę zysk netto na sztuce po prowizjach, zwrotach i dopłatach do wysyłki, wskazuję bestsellery sprzedawane pod kreską i martwy stok. 49 zł.",
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
      lead="Allegro i BaseLinker pokazują obrót i marżę brutto. Nie pokazują, co zostaje po prowizji, zwrocie i dopłacie do darmowej wysyłki. Bierzesz swój eksport sprzedaży i ceny zakupu, a ja liczę realny zysk na każdej sztuce."
      ctaLabel="Zamów audyt marż"
      ctaNote="Raport w 48 godzin"
      checks={[
        {
          title: "Bestsellery, które dokładasz",
          desc: "Najczęściej to właśnie hity sprzedaży są pod kreską, bo mają najniższą marżę i najwięcej zwrotów. Wskazuję je z kwotą straty na sztuce.",
        },
        {
          title: "Wszystkie koszty, nie tylko zakup",
          desc: "Prowizje marketplace, zwroty, dopłata do wysyłki, alokacja kosztu reklamy. Dopiero po nich widać prawdziwy wynik.",
        },
        {
          title: "Martwy stok i zamrożony kapitał",
          desc: "Ile pieniędzy stoi na półce w towarze, który nie schodzi, i co z tego warto wyprzedać, żeby odzyskać gotówkę.",
        },
        {
          title: "Co dokupić, a co odstawić",
          desc: "Lista priorytetów, uszeregowana po realnym zysku, a nie po liczbie sztuk.",
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
          desc: "Chcesz widzieć to co miesiąc, a nie raz.",
          features: [
            "wszystko z audytu",
            "porównanie miesiąc do miesiąca",
            "alarm, gdy produkt wpada pod kreskę",
            "krótkie podsumowanie zmian",
          ],
        },
      ]}
      faq={[
        {
          q: "Czego potrzebujesz ode mnie?",
          a: "Eksportu sprzedaży za wybrany okres, najlepiej trzy miesiące, oraz listy cen zakupu w pliku CSV albo Excel. Im dokładniejsze koszty zakupu, tym dokładniejszy wynik.",
        },
        {
          q: "Z jakich systemów przyjmujesz eksport?",
          a: "Allegro, BaseLinker, WooCommerce, Shopify, Shoper, IdoSell i zwykły plik z magazynu. Jeśli masz coś innego, przyślij próbkę, zwykle da się to przerobić.",
        },
        {
          q: "Co z danymi moich klientów?",
          a: "Nie potrzebuję ich. Wystarczą dane o produktach i transakcjach. Jeśli w eksporcie są dane osobowe, usuwam je przy wczytywaniu i kasuję pliki po dostarczeniu raportu.",
        },
        {
          q: "A jeśli okaże się, że wszystko jest w porządku?",
          a: "To też jest wynik wart tych pieniędzy, bo przestajesz zgadywać. Z doświadczenia przy katalogu powyżej stu pozycji prawie zawsze znajduje się kilka, które realnie dokładają.",
        },
      ]}
      formId="order_audyt_marz"
      formHeading="Zamów audyt marż"
      formIntro="Napisz, z jakiego systemu masz eksport sprzedaży, za jaki okres i ile mniej więcej masz produktów. Pliki podeślesz mailem po mojej odpowiedzi, nie wrzucaj ich tutaj."
      submitLabel="Zamów audyt marż"
      microCopy="Raport w 48 godzin. Dane sprzedażowe przetwarzam tylko na potrzeby raportu i kasuję po dostarczeniu."
      serviceName="Audyt marż sklepu internetowego"
      serviceDesc="Wyliczenie realnego zysku netto na produkt po prowizjach, zwrotach i kosztach wysyłki, lista pozycji sprzedawanych pod kreską i martwy stok. 49 zł."
      serviceType="Analiza rentowności asortymentu"
    />
  );
}
