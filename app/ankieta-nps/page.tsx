import type { Metadata } from "next";
import PodgladAnkietyNps from "@/components/PodgladAnkietyNps";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Ankieta NPS dla klientów, 29 zł/mies. | Fluxlab",
  description:
    "Link do ankiety NPS dla Twoich klientów, mail z każdą odpowiedzią i wynik NPS w panelu. Działa od razu po płatności, 29 zł netto miesięcznie.",
  alternates: { canonical: "/ankieta-nps" },
  openGraph: {
    title: "Ankieta NPS dla klientów, 29 zł/mies. | Fluxlab",
    description: "Link do ankiety, mail z każdą odpowiedzią i wynik NPS w panelu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, ankieta NPS" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="ankieta-nps"
      breadcrumb="Ankieta NPS"
      eyebrow="Opinie klientów"
      typ="usluga"
      tool={<PodgladAnkietyNps />}
      h1="Wiesz, ilu klientów poleci Twoją firmę"
      lead="Wysyłasz klientom jeden link, a oni oceniają firmę w skali od 0 do 10 i dopisują komentarz. Każda odpowiedź przychodzi do Ciebie mailem, a wynik NPS liczy się sam w panelu."
      ctaLabel="Zobacz przykład"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Ankieta w jednym pytaniu", desc: "Klient wybiera ocenę od 0 do 10 i może dopisać komentarz. Ankieta działa na telefonie, a w pytaniu jest nazwa Twojej firmy." },
        { title: "Mail z każdą odpowiedzią", desc: "Odpowiedź przychodzi od razu, z oznaczeniem promotor, neutralny albo krytyk. Niską ocenę widzisz, zanim klient odejdzie." },
        { title: "Wynik NPS w panelu", desc: "Panel liczy wynik z promotorów i krytyków i pokazuje wszystkie odpowiedzi. Odpowiedzi przechowujemy 365 dni." },
      ]}
      pricing={[
        {
          name: "Ankieta NPS",
          price: "29 zł/mies.",
          kup: "lead-nps",
          desc: "Netto. Link do ankiety, maile z odpowiedziami i panel w cenie.",
          features: [
            "link do ankiety do wysłania klientom w mailu, SMS-ie albo komunikatorze",
            "mail z każdą odpowiedzią",
            "wynik NPS i lista odpowiedzi w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Jak klienci dostają ankietę?", a: "Po zakupie dostajesz mailem link do ankiety. Wysyłasz go sam swoim klientom, na przykład w stopce maila albo po zakończeniu zlecenia." },
        { q: "Jak liczony jest wynik NPS?", a: "Odpowiedzi 9 i 10 to promotorzy, od 0 do 6 krytycy, 7 i 8 neutralni. Wynik to odsetek promotorów minus odsetek krytyków." },
        { q: "Jak długo odpowiedzi są przechowywane?", a: "365 dni. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a ankieta przestaje przyjmować odpowiedzi." },
      ]}
      formId="order_ankieta_nps"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Ankieta NPS"
      serviceDesc="Link do ankiety NPS dla klientów, mail z każdą odpowiedzią i wynik NPS w panelu. 29 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
