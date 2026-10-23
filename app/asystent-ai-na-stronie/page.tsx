import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Asystent AI na stronie: co robi, ile kosztuje, jak zacząć",
  description:
    "Asystent AI na stronę odpowiada z Twojego cennika i regulaminu, nie tylko z listy FAQ. Wdrożenie od 790 zł, opieka 190 zł miesięcznie, audyt bota 69 zł.",
  alternates: { canonical: "/asystent-ai-na-stronie" },
  openGraph: {
    title: "Asystent AI na stronie: co robi, ile kosztuje, jak zacząć",
    description:
      "Czym asystent AI różni się od chatbota z FAQ, ile kosztuje wdrożenie i jak sprawdzić, co mówi klientom.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, asystent AI na stronie",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="asystent-ai-na-stronie"
      breadcrumb="Asystent AI na stronie"
      typ="usluga"
      h1="Asystent AI na stronie"
      lead="Odpowiada klientom z Twojego cennika, regulaminu i oferty, także na pytania, których nie ma w FAQ. Wdrażamy go i sprawdzamy, co mówi."
      ctaLabel="Zapytaj o asystenta"
      ctaNote="Odpisujemy tego samego dnia"
      checks={[
        {
          title: "Co to jest",
          desc: "Chatbot z FAQ wybiera jedną z gotowych odpowiedzi. Asystent AI czyta Twoje dokumenty i składa odpowiedź na pytanie zadane własnymi słowami.",
        },
        {
          title: "Ile kosztuje",
          desc: "Wdrożenie jako przepływ w n8n: od 790 zł, rozbudowany 1 500 do 3 500 zł. Opieka 190 zł miesięcznie albo zero, jeśli prowadzisz go sam.",
        },
        {
          title: "Od czego zacząć",
          desc: "Masz już bota? Zacznij od audytu: 150 pytań klienta zderzonych z cennikiem i regulaminem za 69 zł. Nie masz, opisz nam, o co najczęściej pytają klienci.",
        },
      ]}
      powiazane={[
        {
          przed: "Sprawdź, czy",
          kotwica: "asystenci AI widzą Twoją stronę",
          href: "/widocznosc-w-ai",
          po: ", zanim zaczniesz odpowiadać w ich imieniu.",
        },
        {
          przed: "Rozbicie kosztów n8n:",
          kotwica: "wdrożenie n8n i jego cena",
          href: "/wdrozenie-n8n-cena",
          po: ".",
        },
      ]}
      pricing={[
        {
          name: "Audyt asystenta",
          price: "69 zł",
          desc: "Dla bota, który już działa.",
          features: [
            "150 realnych pytań klienta",
            "odpowiedzi zderzone z cennikiem i regulaminem",
            "raport w 48 godzin",
          ],
          href: "/audyt-chatbota",
          cta: "Zobacz audyt",
        },
        {
          name: "Wdrożenie asystenta",
          price: "od 790 zł",
          desc: "Przepływ w n8n na Twoich dokumentach.",
          features: [
            "odpowiedzi z cennika, regulaminu i oferty",
            "przekazanie rozmowy człowiekowi",
            "opieka 190 zł miesięcznie albo zero",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Czym asystent AI na stronę różni się od chatbota?",
          a: "Chatbot z drzewkiem albo FAQ zna tylko wpisane odpowiedzi. Asystent AI rozumie pytanie i odpowiada z dokumentów firmy, więc trzeba sprawdzić, czy nie zmyśla.",
        },
        {
          q: "Ile kosztuje asystent AI na stronę?",
          a: "U nas wdrożenie od 790 zł, rozbudowane 1 500 do 3 500 zł, opieka 190 zł miesięcznie albo zero. Do tego opłata za model językowy zależna od liczby rozmów.",
        },
        {
          q: "Czy firma odpowiada za to, co obieca asystent?",
          a: "W praktyce tak. W sprawie Moffatt przeciwko Air Canada (2024) linia lotnicza zapłaciła zniżkę obiecaną przez chatbota, choć regulamin jej nie przewidywał.",
        },
        {
          q: "Czego potrzebujecie, żeby zacząć?",
          a: "Adresu strony, cennika, regulaminu i listy pytań, które klienci zadają najczęściej.",
        },
      ]}
      formId="order_asystent_ai"
      formHeading="Zapytaj o asystenta AI"
      formIntro="Podaj adres strony i napisz, o co najczęściej pytają klienci."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpisujemy tego samego dnia. Ustalenia prowadzimy mailowo."
      serviceName="Asystent AI na stronie"
      serviceDesc="Wdrożenie asystenta AI odpowiadającego z cennika, regulaminu i oferty firmy jako przepływ w n8n. Od 790 zł, opieka 190 zł miesięcznie."
      serviceType="Wdrożenie asystenta AI"
    />
  );
}
