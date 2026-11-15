import type { Metadata } from "next";
import PodgladCzatu from "@/components/PodgladCzatu";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Czat AI na stronę z Twojej wiedzy, 99 zł/mies. | Fluxlab",
  description:
    "Czat odpowiada klientom na stronie wyłącznie na podstawie informacji, które sam wkleisz. Działa od razu po płatności, 99 zł netto miesięcznie.",
  alternates: { canonical: "/czat-ai-na-strone" },
  openGraph: {
    title: "Czat AI na stronę z Twojej wiedzy, 99 zł/mies. | Fluxlab",
    description: "Czat AI do wklejenia na stronę, odpowiada tylko na podstawie informacji o Twojej firmie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, czat AI na stronę" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="czat-ai-na-strone"
      breadcrumb="Czat AI na stronę"
      eyebrow="Zgłoszenia ze strony"
      typ="usluga"
      tool={<PodgladCzatu />}
      h1="Czat, który odpowiada klientom o Twojej firmie"
      lead="Wklejasz w panelu informacje o ofercie, cenach, godzinach i kontakcie, a czat na stronie odpowiada na pytania klientów, także wieczorem i w weekend. Odpowiada tylko na podstawie tego, co wkleisz."
      ctaLabel="Wypróbuj czat"
      ctaNote="99 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        { title: "Tylko Twoje informacje", desc: "Czat nie zgaduje. Gdy odpowiedzi nie ma w tym, co wkleiłeś, mówi, że jej nie ma, i odsyła klienta do kontaktu z Tobą." },
        { title: "Gotowe w kilka minut", desc: "Po płatności dostajesz mail z panelem i kodem do wklejenia na stronę. Wpisujesz informacje o firmie i czat zaczyna odpowiadać." },
        { title: "Rozmów nie zapisujemy", desc: "Treści pytań i odpowiedzi nie trafiają do żadnej bazy. Zapisujemy tylko liczbę pytań, żeby pilnować dziennego limitu 300." },
      ]}
      pricing={[
        {
          name: "Czat AI z wiedzy strony",
          price: "99 zł/mies.",
          kup: "lead-czat",
          desc: "Netto. Czat, panel i kod do wklejenia w cenie.",
          features: [
            "czat do wklejenia na stronę jednym kodem",
            "odpowiedzi tylko z informacji, które wkleisz",
            "do 300 pytań klientów dziennie",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Czy czat może się pomylić?", a: "Może. Odpowiada na podstawie Twoich informacji, ale to model AI. Dlatego pod czatem widnieje informacja, że odpowiada asystent AI, a nie człowiek." },
        { q: "Czy czat zbiera dane klientów?", a: "Nie. Nie pyta o dane osobowe i nie zapisuje rozmów. Pytanie trafia do modelu AI (OpenAI), żeby powstała odpowiedź." },
        { q: "Ile informacji mogę wkleić?", a: "Do 6000 znaków: oferta, ceny, godziny, obszar działania, kontakt, najczęstsze pytania." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a czat przestaje odpowiadać." },
      ]}
      formId="order_czat_ai"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Czat AI na stronę"
      serviceDesc="Czat AI do osadzenia na stronie, odpowiadający klientom wyłącznie na podstawie informacji firmy. 99 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
