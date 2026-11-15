import type { Metadata } from "next";
import PodgladBzp from "@/components/PodgladBzp";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Zamówienia publiczne BZP w mailu, 49 zł/mies. | Fluxlab",
  description:
    "Wpisujesz słowa kluczowe i kody CPV, a co rano dostajesz mailem nowe ogłoszenia z BZP. Działa od razu po płatności, 49 zł netto miesięcznie.",
  alternates: { canonical: "/zamowienia-publiczne-bzp" },
  openGraph: {
    title: "Zamówienia publiczne BZP w mailu, 49 zł/mies. | Fluxlab",
    description: "Nowe przetargi z BZP dopasowane do Twojej branży, codziennie rano w mailu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, zamówienia publiczne BZP" }],
  },
};


export default function Page() {
  return (
    <ProductLanding
      slug="zamowienia-publiczne-bzp"
      breadcrumb="Zamówienia publiczne BZP"
      eyebrow="Zgłoszenia ze strony"
      typ="usluga"
      tool={<PodgladBzp />}
      h1="Nowe przetargi z Twojej branży co rano w mailu"
      lead="Wpisujesz słowa kluczowe, kody CPV i ewentualnie województwo. Codziennie sprawdzamy ogłoszenia o zamówieniu w Biuletynie Zamówień Publicznych i wysyłamy Ci tylko te, które pasują."
      ctaLabel="Sprawdź swoją branżę"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Oficjalne źródło", desc: "Dane pochodzą z publicznego API Biuletynu Zamówień Publicznych. Każde ogłoszenie ma link do oryginału z pełną dokumentacją." },
        { title: "Tylko to, co pasuje", desc: "Do 20 słów kluczowych i kodów CPV oraz wybór województwa. Mail przychodzi tylko wtedy, gdy pojawiło się coś nowego, z tytułem, zamawiającym i terminem składania ofert." },
        { title: "Start od razu", desc: "Po zapisaniu kryteriów w panelu dostajesz mail z ogłoszeniami z ostatnich 2 dni. Potem codziennie rano, od poniedziałku do niedzieli." },
      ]}
      pricing={[
        {
          name: "Zamówienia publiczne BZP",
          price: "49 zł/mies.",
          kup: "lead-bzp",
          desc: "Netto. Codzienny mail i panel z ostatnimi ogłoszeniami w cenie.",
          features: [
            "ogłoszenia o zamówieniu z BZP dopasowane do kryteriów",
            "mail co rano, gdy jest coś nowego",
            "lista ostatnich 50 trafień w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Jakie ogłoszenia dostaję?", a: "Ogłoszenia o zamówieniu z Biuletynu Zamówień Publicznych. Nie obejmujemy innych źródeł, na przykład Bazy Konkurencyjności ani platform zamawiających poza BZP." },
        { q: "Czy oferta jest składana za mnie?", a: "Nie. Dostajesz zestawienie z linkami, a ofertę składasz sam u zamawiającego." },
        { q: "Jak długo dane są przechowywane?", a: "Ostatnie trafienia 60 dni. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a maile przestają przychodzić." },
      ]}
      formId="order_zamowienia_bzp"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Zamówienia publiczne BZP"
      serviceDesc="Codzienny mail z nowymi ogłoszeniami z Biuletynu Zamówień Publicznych dopasowanymi do słów kluczowych i kodów CPV. 49 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
