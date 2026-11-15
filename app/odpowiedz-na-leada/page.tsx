import type { Metadata } from "next";
import PodgladOdpowiedziLeada from "@/components/PodgladOdpowiedziLeada";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Odpowiedź na leada w minutę, 29 zł/mies. | Fluxlab",
  description:
    "Klient zostawia zgłoszenie i w minutę dostaje mail z Twoją ofertą i linkiem do kalendarza, zanim zadzwoni konkurencja. 29 zł netto miesięcznie.",
  alternates: { canonical: "/odpowiedz-na-leada" },
  openGraph: {
    title: "Odpowiedź na leada w minutę, 29 zł/mies. | Fluxlab",
    description: "Mail z ofertą i kalendarzem do każdego, kto zostawi zgłoszenie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, odpowiedź na leada w minutę" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="odpowiedz-na-leada"
      breadcrumb="Odpowiedź na leada w minutę"
      eyebrow="Karta leada"
      typ="usluga"
      tool={<PodgladOdpowiedziLeada />}
      h1="Klient dostaje odpowiedź, zanim odłoży telefon"
      lead="Kto zostawi zgłoszenie z adresem e-mail, w minutę dostaje od Twojej firmy wiadomość z ofertą i przyciskiem do kalendarza. Tekst oferty i link ustawiasz sam w panelu."
      ctaLabel="Zobacz przykład"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        { przed: "Do tego możesz dodać", kotwica: "ocenę leada przez AI", href: "/ocena-leada-ai", po: "." },
      ]}
      checks={[
        { title: "Mail w imieniu Twojej firmy", desc: "Nadawcą jest nazwa firmy z panelu, a odpowiedź klienta trafia prosto na Twój adres. Ty widzisz tylko rozmowę, bez pośrednika." },
        { title: "Oferta i kalendarz Twoimi słowami", desc: "Piszesz krótką ofertę i wklejasz link do kalendarza, na przykład z Google. Zmiana w panelu działa od następnego zgłoszenia." },
        { title: "Bez ręcznej pracy", desc: "Odpowiedź wychodzi sama, także w nocy i w weekend. Zgłoszenie z oznaczeniem, że klient dostał odpowiedź, zostaje na liście w panelu." },
      ]}
      pricing={[
        {
          name: "Odpowiedź na leada w minutę",
          price: "29 zł/mies.",
          kup: "lead-odpowiedz",
          desc: "Netto. Formularz, mail z leadem i panel w cenie.",
          features: [
            "formularz do wklejenia na stronę albo przyjmowanie zgłoszeń z Zapier i Make",
            "automatyczny mail z ofertą i kalendarzem do każdego zgłaszającego",
            "lista zgłoszeń w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Kiedy wychodzi odpowiedź?", a: "Zwykle w ciągu minuty od zgłoszenia, o ile klient podał adres e-mail. Bez adresu zgłoszenie dociera tylko do Ciebie." },
        { q: "Czy muszę mieć kalendarz?", a: "Nie. Wystarczy sama oferta albo sam link. Mail do klienta wychodzi, gdy ustawisz co najmniej jedno z dwóch." },
        { q: "Jak zgłoszenia trafiają do usługi?", a: "Po zakupie dostajesz mailem kod formularza do wklejenia na stronę oraz adres, na który wyślesz zgłoszenie z własnego formularza, Zapier albo Make. Działa od razu po płatności." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, odpowiedzi przestają wychodzić, a dane zgłoszeń usuwamy po 30 dniach od rezygnacji." },
      ]}
      formId="order_odpowiedz_na_leada"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Odpowiedź na leada w minutę"
      serviceDesc="Automatyczny mail z ofertą i linkiem do kalendarza do każdego, kto zostawi zgłoszenie. 29 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
