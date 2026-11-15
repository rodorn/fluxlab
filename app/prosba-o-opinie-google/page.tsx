import type { Metadata } from "next";
import PodgladProsbyOOpinie from "@/components/PodgladProsbyOOpinie";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Prośba o opinię Google dla klientów, 29 zł/mies. | Fluxlab",
  description:
    "Mail z prośbą o opinię w Google wysyłany Twoim klientom z panelu albo z Zapier i Make. Działa od razu po płatności, 29 zł netto miesięcznie.",
  alternates: { canonical: "/prosba-o-opinie-google" },
  openGraph: {
    title: "Prośba o opinię Google dla klientów, 29 zł/mies. | Fluxlab",
    description: "Mail z przyciskiem do Twojej wizytówki w Google, wysyłany klientom z panelu albo automatu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, prośba o opinię Google" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="prosba-o-opinie-google"
      breadcrumb="Prośba o opinię Google"
      eyebrow="Opinie klientów"
      typ="usluga"
      tool={<PodgladProsbyOOpinie />}
      h1="Więcej opinii w Google bez przypominania się klientom"
      lead="Wklejasz link do swojej wizytówki w Google, wpisujesz adres klienta albo podpinasz Zapier lub Make, a klient dostaje uprzejmy mail z jednym przyciskiem do opinii."
      ctaLabel="Zobacz przykład"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Mail z Twoją nazwą i jednym przyciskiem", desc: "Klient klika i trafia prosto na formularz opinii Twojej firmy w Google. Odpowiedzi trafiają do Twojej skrzynki." },
        { title: "Z panelu albo z automatu", desc: "Adres klienta wpiszesz w panelu albo wyślesz z Zapier i Make żądaniem POST na tajny adres z maila powitalnego." },
        { title: "Bez zalewania klientów", desc: "Na ten sam adres prośba nie wyjdzie drugi raz w ciągu 90 dni, a dzienny limit chroni przed pomyłką. Lista wysłanych próśb jest w panelu." },
      ]}
      pricing={[
        {
          name: "Prośba o opinię Google",
          price: "29 zł/mies.",
          kup: "lead-opinia",
          desc: "Netto. Wysyłka próśb i panel w cenie.",
          features: [
            "mail z przyciskiem do Twojej wizytówki w Google",
            "wysyłka z panelu albo z Zapier i Make",
            "blokada ponownej prośby i lista wysłanych w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Skąd wziąć link do opinii w Google?", a: "W swoim profilu firmy w Google wybierz „Poproś o opinie” i skopiuj link. Wklejasz go raz w panelu." },
        { q: "Czy system sam wysyła prośby do wszystkich klientów?", a: "Nie. Prośbę dostaje tylko ten adres, który wpiszesz w panelu albo wyślesz z własnego systemu. Nie pobieramy list klientów." },
        { q: "Jak długo przechowujecie adresy?", a: "Listę wysłanych próśb przechowujemy 365 dni. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a wysyłka przestaje działać." },
      ]}
      formId="order_prosba_opinia"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Prośba o opinię Google"
      serviceDesc="Mail z prośbą o opinię w Google wysyłany klientom z panelu albo z Zapier i Make. 29 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
