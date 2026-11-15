import type { Metadata } from "next";
import PodgladRezerwacji from "@/components/PodgladRezerwacji";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Rezerwacje online na stronę, 39 zł/mies. | Fluxlab",
  description:
    "Klient wybiera wolny termin na Twojej stronie, a potwierdzenie przychodzi mailem do obu stron. Działa od razu po płatności, 39 zł netto miesięcznie.",
  alternates: { canonical: "/rezerwacje-online" },
  openGraph: {
    title: "Rezerwacje online na stronę, 39 zł/mies. | Fluxlab",
    description: "Kalendarz rezerwacji do wklejenia na stronę, potwierdzenia mailem dla Ciebie i klienta.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, rezerwacje online" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="rezerwacje-online"
      breadcrumb="Rezerwacje online"
      eyebrow="Zgłoszenia ze strony"
      typ="usluga"
      tool={<PodgladRezerwacji />}
      h1="Klienci sami rezerwują termin, bez telefonów i maili"
      lead="Ustawiasz dni, godziny i długość wizyty, wklejasz jeden kod na stronę, a klient wybiera wolny termin. Zajęty termin znika z kalendarza, a potwierdzenie przychodzi mailem do Was obojga."
      ctaLabel="Wypróbuj kalendarz"
      ctaNote="39 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Twoje dni i godziny", desc: "W panelu ustawiasz dni tygodnia, godziny pracy i długość wizyty. Klienci widzą wolne terminy na 3 tygodnie do przodu, najwcześniej za godzinę." },
        { title: "Bez podwójnych rezerwacji", desc: "Termin zarezerwowany przez jedną osobę znika dla pozostałych w tej samej chwili. Nie trzeba niczego odświeżać ani sprawdzać." },
        { title: "Potwierdzenie mailem", desc: "Klient dostaje potwierdzenie z terminem, a Ty mail z jego danymi. Nadchodzące rezerwacje widzisz w panelu. Dane przechowujemy 365 dni." },
      ]}
      pricing={[
        {
          name: "Rezerwacje online",
          price: "39 zł/mies.",
          kup: "lead-rezerwacje",
          desc: "Netto. Kalendarz, maile z potwierdzeniami i panel w cenie.",
          features: [
            "kalendarz rezerwacji do wklejenia na stronę",
            "potwierdzenia mailem dla klienta i dla Ciebie",
            "lista nadchodzących rezerwacji w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Czy klient dostaje SMS z przypomnieniem?", a: "Nie. Potwierdzenie wysyłamy mailem, SMS-ów na razie nie ma w ofercie." },
        { q: "Czy można odwołać rezerwację?", a: "Klient odpisuje na mail z potwierdzeniem, a Ty umawiasz nowy termin. Odwoływanie z poziomu kalendarza nie jest jeszcze dostępne." },
        { q: "Jak długo dane są przechowywane?", a: "365 dni. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a kalendarz przestaje przyjmować rezerwacje." },
      ]}
      formId="order_rezerwacje_online"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Rezerwacje online"
      serviceDesc="Kalendarz rezerwacji do osadzenia na stronie, potwierdzenia mailem dla klienta i firmy. 39 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
