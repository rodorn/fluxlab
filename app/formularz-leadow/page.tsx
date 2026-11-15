import type { Metadata } from "next";
import PodgladFormularzaLeada from "@/components/PodgladFormularzaLeada";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Formularz leadów z listą zgłoszeń, 49 zł/mies. | Fluxlab",
  description:
    "Formularz do wklejenia na stronę, mail z każdym zgłoszeniem i lista wszystkich zgłoszeń w panelu. Działa od razu po płatności, 49 zł netto miesięcznie.",
  alternates: { canonical: "/formularz-leadow" },
  openGraph: {
    title: "Formularz leadów z listą zgłoszeń, 49 zł/mies. | Fluxlab",
    description: "Formularz na stronę, mail z każdym zgłoszeniem i lista w panelu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, formularz leadów z listą zgłoszeń" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="formularz-leadow"
      breadcrumb="Formularz leadów"
      eyebrow="Zgłoszenia ze strony"
      typ="usluga"
      tool={<PodgladFormularzaLeada />}
      h1="Zgłoszenia ze strony trafiają na mail i na jedną listę"
      lead="Wklejasz formularz na swoją stronę, a każde zgłoszenie przychodzi mailem i zostaje na liście w panelu. Nic nie ginie w skrzynce, a o zgłoszeniu wiesz od razu."
      ctaLabel="Zobacz przykład"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        { przed: "Chcesz od razu wiedzieć, do kogo zadzwonić najpierw? Dołóż", kotwica: "ocenę leada przez AI", href: "/ocena-leada-ai", po: "." },
      ]}
      checks={[
        { title: "Formularz gotowy do wklejenia", desc: "Dostajesz kod do osadzenia na stronie i osobną stronę z formularzem, do której możesz podlinkować. Formularz działa też na telefonie." },
        { title: "Mail z każdym zgłoszeniem", desc: "Imię, e-mail, telefon, firma, NIP i wiadomość trafiają na Twój adres w ciągu chwili od wysłania formularza." },
        { title: "Lista w panelu", desc: "Wszystkie zgłoszenia zostają w panelu, do którego dostajesz tajny link. Zgłoszenia przechowujemy 365 dni." },
      ]}
      pricing={[
        {
          name: "Formularz leadów",
          price: "49 zł/mies.",
          kup: "lead-formularz",
          desc: "Netto. Formularz, mail ze zgłoszeniem i panel w cenie.",
          features: [
            "formularz do wklejenia na stronę albo przyjmowanie zgłoszeń z Zapier i Make",
            "mail z każdym zgłoszeniem",
            "lista zgłoszeń w panelu przez 365 dni",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Jak zgłoszenia trafiają do usługi?", a: "Po zakupie dostajesz mailem kod formularza do wklejenia na stronę oraz adres, na który wyślesz zgłoszenie z własnego formularza, Zapier albo Make. Działa od razu po płatności." },
        { q: "Czy zgłoszenia przychodzą też SMS-em?", a: "Nie, zgłoszenia przychodzą mailem i są na liście w panelu." },
        { q: "Jak długo zgłoszenia są przechowywane?", a: "365 dni od zgłoszenia. Po rezygnacji dane usuwamy po 30 dniach." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a formularz przestaje przyjmować zgłoszenia." },
      ]}
      formId="order_formularz_leadow"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Formularz leadów z listą zgłoszeń"
      serviceDesc="Formularz na stronę, mail z każdym zgłoszeniem i lista zgłoszeń w panelu. 49 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
