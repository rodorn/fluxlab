import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Transkrypcja nagrań ze streszczeniem, 49 zł | Fluxlab",
  description: "Wysyłasz nagranie, a mailem dostajesz pełny tekst i streszczenie. Do 10 godzin w miesiącu, 49 zł netto miesięcznie.",
  alternates: { canonical: "/transkrypcja-nagran" },
  openGraph: {
    title: "Transkrypcja nagrań ze streszczeniem, 49 zł | Fluxlab",
    description: "Wysyłasz nagranie, a mailem dostajesz pełny tekst i streszczenie. Do 10 godzin w miesiącu, 49 zł netto miesięcznie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, transkrypcja nagrań",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="transkrypcja-nagran"
      breadcrumb="Transkrypcja nagrań ze streszczeniem"
      eyebrow="Nagrania na tekst"
      typ="usluga"
      h1="Transkrypcja nagrań ze streszczeniem w mailu"
      lead="Płacisz kartą i wklejasz link do nagrania. Po kilku minutach dostajesz mailem streszczenie w punktach, a w załączniku pełny tekst. Kolejne nagrania wysyłasz przez prosty formularz."
      ctaLabel="Zamów transkrypcję"
      ctaNote="49 zł netto miesięcznie, do 10 godzin nagrań, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Pełny tekst",
          desc: "Rozpoznawanie mowy po polsku i w innych językach. Transkrypcja przychodzi jako plik tekstowy.",
        },
        {
          title: "Streszczenie w punktach",
          desc: "Jedno zdanie o czym jest nagranie i kilka najważniejszych informacji, tylko z tego, co padło w nagraniu.",
        },
        {
          title: "Bez zakładania kont",
          desc: "Wklejasz link do pliku, wynik dostajesz mailem na adres z płatności.",
        },
      ]}
      pricing={[
        {
          name: "Transkrypcja nagrań ze streszczeniem",
          price: "49 zł/mies.",
          kup: "transkrypcja-nagran",
          desc: "Netto. Uruchamia się sam po płatności.",
          features: [
            "pełna transkrypcja w załączniku",
            "streszczenie w punktach w treści maila",
            "do 10 godzin nagrań w miesiącu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jak wysłać nagranie?",
          a: "Przy zamówieniu wklejasz link do pierwszego pliku. Kolejne nagrania wysyłasz na fluxlab.pl/wyslij-nagranie, podając adres e-mail z płatności i link.",
        },
        {
          q: "Jakie pliki są obsługiwane?",
          a: "mp3, m4a, wav, ogg, flac, webm i mp4, do 25 MB na plik. Plik musi być udostępniony każdemu, kto ma link (Dropbox, Dysk Google albo inny bezpośredni link).",
        },
        {
          q: "Czy nagrania są przechowywane?",
          a: "Nie zapisujemy plików. Pobieramy nagranie z linku, wysyłamy do usługi rozpoznawania mowy OpenAI i odsyłamy wynik mailem. Po przetworzeniu możesz usunąć udostępnienie pliku.",
        },
        {
          q: "Jaki jest limit?",
          a: "10 godzin nagrań w miesiącu. Po przekroczeniu limitu kolejne nagrania czekają do początku następnego miesiąca.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na dowolny mail od nas albo użyj panelu płatności w Stripe. Po anulowaniu nagrania przestają być przetwarzane.",
        },
      ]}
      formId="order_transkrypcja"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Transkrypcja nagrań ze streszczeniem"
      serviceDesc="Transkrypcja nagrań i streszczenie mailem. 49 zł netto miesięcznie, do 10 godzin."
      serviceType="Transkrypcja nagrań"
    />
  );
}
