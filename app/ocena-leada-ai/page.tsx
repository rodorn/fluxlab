import type { Metadata } from "next";
import PodgladOceny from "@/components/PodgladOceny";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Ocena leada przez AI, 29 zł/mies. | Fluxlab",
  description:
    "Zgłoszenie dostaje ocenę: gorący, ciepły albo zimny, plus streszczenie i podpowiedź na rozmowę. Wiesz, do kogo dzwonić pierwszego. 29 zł netto miesięcznie.",
  alternates: { canonical: "/ocena-leada-ai" },
  openGraph: {
    title: "Ocena leada przez AI, 29 zł/mies. | Fluxlab",
    description: "Gorący, ciepły albo zimny: ocena i następny krok przy każdym zgłoszeniu.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, ocena leada przez AI" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="ocena-leada-ai"
      breadcrumb="Ocena leada przez AI"
      eyebrow="Karta leada"
      typ="usluga"
      tool={<PodgladOceny />}
      h1="Wiesz, do którego zgłoszenia zadzwonić najpierw"
      lead="Każde zgłoszenie z formularza dostaje ocenę: gorący, ciepły albo zimny, w skali 1 do 10, ze streszczeniem i podpowiedzią, o co zapytać przy telefonie. Ocena jest w mailu i w panelu."
      ctaLabel="Zobacz przykład"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        { przed: "Do karty leada dopisze też", kotwica: "dane firmy z NIP", href: "/dane-firmy-z-nip", po: "." },
      ]}
      checks={[
        { title: "Ocena tylko z treści zgłoszenia", desc: "Model dostaje to, co klient wpisał w formularzu, i dane firmy, jeśli podał NIP. Niczego nie dopowiada, a polecenia ukryte w treści zgłoszenia ignoruje." },
        { title: "Podpowiedź na rozmowę", desc: "Jedno zdanie, co zrobić dalej: o co zapytać, czego brakuje do wyceny. Handlowiec nie zaczyna rozmowy od zera." },
        { title: "Od razu w mailu i w panelu", desc: "Kategoria stoi w tytule maila, więc gorące zgłoszenie widać na liście skrzynki. Wszystkie zgłoszenia zostają w panelu, do którego dostajesz tajny link." },
      ]}
      pricing={[
        {
          name: "Ocena leada przez AI",
          price: "29 zł/mies.",
          kup: "lead-ocena",
          desc: "Netto. Formularz, mail z leadem i panel w cenie.",
          features: [
            "formularz do wklejenia na stronę albo przyjmowanie zgłoszeń z Zapier i Make",
            "ocena, streszczenie i następny krok przy każdym zgłoszeniu",
            "lista zgłoszeń z kategorią w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Czy ocena jest pewna?", a: "To podpowiedź do ustalenia kolejności telefonów, nie wyrok. Zgłoszenie zimne też trafia do maila i do panelu, nic nie jest odrzucane." },
        { q: "Kto czyta treść zgłoszeń?", a: "Treść trafia do modelu AI tylko po to, żeby powstała ocena, i zostaje w Twoim panelu. Nie używamy jej do niczego innego." },
        { q: "Jak zgłoszenia trafiają do usługi?", a: "Po zakupie dostajesz mailem kod formularza do wklejenia na stronę oraz adres, na który wyślesz zgłoszenie z własnego formularza, Zapier albo Make. Działa od razu po płatności." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, zgłoszenia przestają być przyjmowane, a dane zgłoszeń usuwamy po 30 dniach od rezygnacji." },
      ]}
      formId="order_ocena_leada_ai"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Ocena leada przez AI"
      serviceDesc="Ocena zgłoszeń z formularza: kategoria, punkty, streszczenie i następny krok. 29 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
