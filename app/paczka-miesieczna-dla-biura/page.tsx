import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Paczka faktur z KSeF dla biura, 19 zł/mies. | Fluxlab",
  description:
    "Co miesiąc ZIP z fakturami kosztowymi i sprzedażowymi z KSeF, z plikami XML, PDF i zestawieniem CSV, wysłany na maila Twojej księgowej. 19 zł netto.",
  alternates: { canonical: "/paczka-miesieczna-dla-biura" },
  openGraph: {
    title: "Paczka faktur z KSeF dla biura, 19 zł/mies. | Fluxlab",
    description: "Pierwszego dnia miesiąca księgowa dostaje komplet faktur z poprzedniego miesiąca, bez proszenia Ciebie o nie.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, paczka miesięczna z KSeF" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="paczka-miesieczna-dla-biura"
      breadcrumb="Paczka miesięczna z KSeF"
      eyebrow="KSeF dla biura rachunkowego"
      h1="Księgowa dostaje faktury z KSeF sama, pierwszego dnia miesiąca"
      lead="Podajesz NIP i token KSeF swojej firmy oraz adres e-mail biura rachunkowego. Co miesiąc wysyłamy biuru ZIP: faktury kosztowe i sprzedażowe jako XML i PDF oraz zestawienie w CSV do otwarcia w Excelu. Ty dostajesz kopię każdej paczki."
      ctaLabel="Włącz paczkę miesięczną"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Nie wiesz, czy firma jest gotowa na KSeF? Zrób",
          kotwica: "test gotowości na KSeF 2027",
          href: "/ksef-2027",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Pierwsza paczka od razu",
          desc: "Po podaniu danych w ciągu godziny przychodzi paczka z fakturami od początku bieżącego miesiąca, żebyś widział, że działa.",
        },
        {
          title: "Komplet dla księgowej",
          desc: "W ZIP-ie są dwa foldery, kosztowe i sprzedażowe, a w nich XML z KSeF i PDF każdej faktury. Do tego zestawienie CSV z numerami, kwotami i datami.",
        },
        {
          title: "Token tylko do odczytu faktur, usuwany po rezygnacji",
          desc: "Token zapisujemy zaszyfrowany i używamy wyłącznie do pobrania faktur. Po anulowaniu subskrypcji usuwamy go przy najbliższym przebiegu.",
        },
      ]}
      pricing={[
        {
          name: "Paczka miesięczna",
          price: "19 zł/mies.",
          kup: "paczka-biuro",
          desc: "Netto. Jedna firma, jeden NIP, jedno biuro rachunkowe w adresie.",
          features: [
            "faktury kosztowe i sprzedażowe z KSeF",
            "XML, PDF i zestawienie CSV",
            "kopia każdej paczki dla Ciebie",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd wziąć token KSeF?",
          a: "W Aplikacji Podatnika KSeF, w zakładce Tokeny, wybierz Generuj token i zaznacz uprawnienie do przeglądania faktur. Po opłaceniu zamówienia na stronie z formularzem znajdziesz krótką instrukcję.",
        },
        {
          q: "Co z fakturami, gdy token przestanie działać?",
          a: "Wyślemy Ci wiadomość z linkiem do formularza, w którym podasz nowy token. Paczki za czas przerwy dojdą po jego podaniu.",
        },
        {
          q: "Czy mogę wysyłać paczkę tylko do siebie?",
          a: "Tak. Adres biura w formularzu jest opcjonalny, a bez niego paczka trafia tylko do Ciebie.",
        },
        {
          q: "Co się dzieje z moimi danymi po rezygnacji?",
          a: "NIP i token usuwamy przy najbliższym przebiegu po anulowaniu subskrypcji. Wysłane maile zostają w skrzynkach ich odbiorców.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na mail z paczką. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_paczka_biuro"
      formHeading="Włącz paczkę miesięczną"
      formIntro="Po opłaceniu zamówienia podasz NIP, token KSeF i adres biura."
      submitLabel="Włącz paczkę"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Paczka miesięczna faktur z KSeF"
      serviceDesc="Co miesiąc ZIP z fakturami kosztowymi i sprzedażowymi z KSeF (XML, PDF, zestawienie CSV) wysyłany na adres biura rachunkowego. 19 zł netto miesięcznie."
      serviceType="Automatyzacja księgowości"
    />
  );
}
