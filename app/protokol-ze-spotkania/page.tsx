import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Protokół ze spotkania z listą zadań, 79 zł | Fluxlab",
  description: "Z nagrania spotkania dostajesz protokół: decyzje, zadania z osobą i terminem oraz gotowy mail do uczestników. 79 zł netto miesięcznie.",
  alternates: { canonical: "/protokol-ze-spotkania" },
  openGraph: {
    title: "Protokół ze spotkania z listą zadań, 79 zł | Fluxlab",
    description: "Z nagrania spotkania dostajesz protokół: decyzje, zadania z osobą i terminem oraz gotowy mail do uczestników. 79 zł netto miesięcznie.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, protokół ze spotkania",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="protokol-ze-spotkania"
      breadcrumb="Protokół ze spotkania z listą zadań"
      eyebrow="Spotkania bez notatek"
      typ="usluga"
      h1="Protokół ze spotkania z listą zadań w mailu"
      lead="Płacisz kartą i wklejasz link do nagrania spotkania. Po kilku minutach dostajesz mailem protokół: decyzje, zadania z osobą i terminem oraz gotowy mail do uczestników. W załączniku pełna transkrypcja."
      ctaLabel="Zamów protokół"
      ctaNote="79 zł netto miesięcznie, do 10 godzin nagrań, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Decyzje i zadania",
          desc: "Lista tego, co ustalono, i kto ma to zrobić do kiedy. Gdy z nagrania nie wynika osoba albo termin, protokół pisze „nie podano”.",
        },
        {
          title: "Mail do uczestników",
          desc: "Gotowy tekst do skopiowania: podsumowanie, decyzje i zadania.",
        },
        {
          title: "Bez zakładania kont",
          desc: "Wklejasz link do pliku, wynik dostajesz mailem na adres z płatności.",
        },
      ]}
      pricing={[
        {
          name: "Protokół ze spotkania z listą zadań",
          price: "79 zł/mies.",
          kup: "protokol-spotkania",
          desc: "Netto. Uruchamia się sam po płatności.",
          features: [
            "decyzje i zadania z osobą i terminem",
            "gotowy mail do uczestników",
            "pełna transkrypcja w załączniku",
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
      formId="order_protokol"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Protokół ze spotkania z listą zadań"
      serviceDesc="Protokół ze spotkania z nagrania: decyzje, zadania, mail do uczestników. 79 zł netto miesięcznie."
      serviceType="Protokół ze spotkania"
    />
  );
}
