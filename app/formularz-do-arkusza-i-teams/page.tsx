import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import PodgladFormularza from "@/components/PodgladFormularza";

export const metadata: Metadata = {
  title: "Formularz do arkusza i Teams lub Slacka, 19 zł | Fluxlab",
  description:
    "Każde zgłoszenie z formularza na Twojej stronie trafia do arkusza Google i na kanał Teams lub Slack. Gotowy adres po zamówieniu, 19 zł netto miesięcznie.",
  alternates: { canonical: "/formularz-do-arkusza-i-teams" },
  openGraph: {
    title: "Formularz do arkusza i Teams lub Slacka, 19 zł | Fluxlab",
    description:
      "Zgłoszenia z formularza w arkuszu i na kanale zespołu, bez pisania kodu.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, formularz do arkusza i Teams",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="formularz-do-arkusza-i-teams"
      breadcrumb="Formularz do arkusza i Teams"
      eyebrow="Zgłoszenia pod ręką"
      typ="usluga"
      h1="Zgłoszenie z formularza w arkuszu i na kanale zespołu w kilka sekund"
      lead="Płacisz kartą, dostajesz maila z gotowym adresem. Podpinasz go pod formularz na swojej stronie, a każde zgłoszenie ląduje w arkuszu Google i, jeśli chcesz, na kanale w Teams albo Slacku."
      ctaLabel="Zamów formularz"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Własny adres formularza",
          desc: "Po zamówieniu dostajesz tajny adres i gotowy kod formularza do wklejenia na stronę. Pola nazywasz jak chcesz.",
        },
        {
          title: "Arkusz Google bez logowania",
          desc: "Jedna formuła w komórce A1 i arkusz pokazuje wszystkie zgłoszenia z kolumnami z Twojego formularza.",
        },
        {
          title: "Teams albo Slack",
          desc: "Wklejasz adres webhooka, my wysyłamy wiadomość testową, a potem każde zgłoszenie od razu na kanał.",
        },
      ]}
      pricing={[
        {
          name: "Formularz do arkusza i kanału",
          price: "19 zł/mies.",
          kup: "formularz-zgloszenia",
          desc: "Netto. Uruchamia się sam po płatności.",
          features: [
            "jeden adres dla wszystkich formularzy na Twojej stronie",
            "do 200 zgłoszeń na godzinę, zgłoszenia trzymamy 90 dni",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co wpisać przy zamówieniu?",
          a: "Tylko nazwę formularza, na przykład „Zapytania ze strony”. Pojawia się w wiadomościach na kanale.",
        },
        {
          q: "Jak podłączyć arkusz Google?",
          a: "W mailu po zamówieniu dostajesz formułę IMPORTDATA z Twoim adresem. Wklejasz ją w komórkę A1 pustego arkusza, a Google sam odświeża zgłoszenia mniej więcej co godzinę.",
        },
        {
          q: "Skąd wziąć adres webhooka Slacka lub Teams?",
          a: "W Slacku utwórz Incoming Webhook dla wybranego kanału. W Teams dodaj w kanale przepływ Workflows z wyzwalaczem „Gdy odebrano żądanie webhooka”. Adres wklejasz na stronie ustawień z maila.",
        },
        {
          q: "Gdzie trzymacie zgłoszenia i jak długo?",
          a: "W naszej bazie, przez 90 dni od zgłoszenia. Po rezygnacji formularz przestaje przyjmować zgłoszenia, a dane usuwamy po 30 dniach.",
        },
        {
          q: "Czy to działa z moim formularzem?",
          a: "Tak, jeśli formularz potrafi wysłać dane metodą POST na dowolny adres (większość kreatorów stron i własny HTML). Adres przyjmuje też dane w formacie JSON.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Odpisz na mail z adresami albo użyj panelu płatności w Stripe. Po anulowaniu formularz przestaje przyjmować zgłoszenia.",
        },
      ]}
      formId="order_formularz_zgloszenia"
      formHeading="Masz pytanie przed zamówieniem?"
      formIntro="Napisz, a odpowiemy, zanim wpiszesz kartę."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Formularz do arkusza i Teams lub Slacka"
      serviceDesc="Zgłoszenia z formularza na stronie klienta trafiają do arkusza Google i na kanał Teams lub Slack. 19 zł netto miesięcznie."
      serviceType="Automatyzacja formularza"
      poCenniku={<PodgladFormularza />}
    />
  );
}
