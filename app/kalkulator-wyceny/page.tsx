import type { Metadata } from "next";
import PodgladKalkulatoraWyceny from "@/components/PodgladKalkulatoraWyceny";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kalkulator wyceny na stronę, 49 zł/mies. | Fluxlab",
  description:
    "Klient zaznacza usługi, widzi sumę i zostawia kontakt, a Ty dostajesz zgłoszenie z wyceną. Działa od razu po płatności, 49 zł netto miesięcznie.",
  alternates: { canonical: "/kalkulator-wyceny" },
  openGraph: {
    title: "Kalkulator wyceny na stronę, 49 zł/mies. | Fluxlab",
    description: "Kalkulator z Twoimi usługami i cenami do wklejenia na stronę, zgłoszenia z wyceną w panelu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator wyceny" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kalkulator-wyceny"
      breadcrumb="Kalkulator wyceny"
      eyebrow="Zgłoszenia ze strony"
      typ="usluga"
      tool={<PodgladKalkulatoraWyceny />}
      h1="Klient sam liczy cenę i zostawia kontakt"
      lead="Wpisujesz swoje usługi i ceny, wklejasz jeden kod na stronę, a odwiedzający zaznacza, czego potrzebuje, widzi sumę i prosi o wycenę. Zgłoszenie z wyliczeniem trafia do Ciebie od razu."
      ctaLabel="Wypróbuj kalkulator"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Twoje usługi i ceny", desc: "W panelu wpisujesz do 20 pozycji w formacie „Nazwa | cena”. Zmiana cen działa od razu, bez ponownego wklejania kodu." },
        { title: "Kod do wklejenia na stronę", desc: "Kalkulator działa w ramce na telefonie i komputerze. Odwiedzający zaznacza pozycje, a suma liczy się na bieżąco." },
        { title: "Zgłoszenie z wyceną", desc: "Dostajesz mail z kontaktem i wybranymi pozycjami, a lista zgłoszeń jest w panelu. Zgłoszenia przechowujemy 365 dni." },
      ]}
      pricing={[
        {
          name: "Kalkulator wyceny",
          price: "49 zł/mies.",
          kup: "lead-kalkulator",
          desc: "Netto. Kalkulator, maile ze zgłoszeniami i panel w cenie.",
          features: [
            "kalkulator z Twoimi usługami i cenami do wklejenia na stronę",
            "mail z kontaktem i wybraną wyceną przy każdym zgłoszeniu",
            "lista zgłoszeń w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Jak dodać kalkulator do strony?", a: "Po zakupie dostajesz mailem kod do wklejenia na stronę. Działa w większości kreatorów stron i w WordPressie." },
        { q: "Czy cena w kalkulatorze jest wiążąca?", a: "To suma pozycji, które wpiszesz, pokazywana jako cena netto. Wiążącą ofertę wysyłasz Ty po kontakcie z klientem." },
        { q: "Jak długo zgłoszenia są przechowywane?", a: "365 dni. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a kalkulator przestaje przyjmować zgłoszenia." },
      ]}
      formId="order_kalkulator_wyceny"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Kalkulator wyceny na stronę"
      serviceDesc="Kalkulator wyceny z usługami i cenami klienta do osadzenia na stronie, zgłoszenia z wyceną w panelu. 49 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
