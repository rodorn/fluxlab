import type { Metadata } from "next";
import PodgladDanychFirmy from "@/components/PodgladDanychFirmy";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Dane firmy do leada z NIP, 19 zł/mies. | Fluxlab",
  description:
    "Zgłoszenie z numerem NIP dostaje nazwę firmy, adres, KRS, REGON, status VAT i branżę z rejestrów, zanim zadzwonisz. Mail z kartą leada, 19 zł netto miesięcznie.",
  alternates: { canonical: "/dane-firmy-z-nip" },
  openGraph: {
    title: "Dane firmy do leada z NIP, 19 zł/mies. | Fluxlab",
    description: "Nazwa, adres, KRS i branża firmy dopisane do każdego zgłoszenia z NIP-em.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, dane firmy do leada z NIP" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="dane-firmy-z-nip"
      breadcrumb="Dane firmy z NIP"
      eyebrow="Karta leada"
      typ="usluga"
      tool={<PodgladDanychFirmy />}
      h1="Zgłoszenie z NIP-em wraca do Ciebie z gotową kartą firmy"
      lead="Klient wpisuje w formularzu NIP, a Ty dostajesz mail z jego firmą: nazwą, adresem, KRS, REGON-em, statusem VAT i branżą z rejestrów. Zamiast szukać w wyszukiwarce, dzwonisz od razu."
      ctaLabel="Zobacz przykład"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        { przed: "Chcesz sprawdzić wiarygodność kontrahenta? Użyj", kotwica: "darmowego sprawdzania NIP", href: "/sprawdzenie-nip", po: "." },
      ]}
      checks={[
        { title: "Dane z rejestrów urzędowych", desc: "Nazwa, adres, KRS, REGON i status VAT z wykazu podatników Ministerstwa Finansów, aktualne na dzień zgłoszenia." },
        { title: "Branża z KRS", desc: "Dla spółek z wpisem w KRS dopisujemy przeważającą działalność (PKD). Dla firm bez KRS, na przykład jednoosobowych, branży z rejestru nie ma i tak to oznaczamy." },
        { title: "Od razu w mailu i w panelu", desc: "Każde zgłoszenie przychodzi mailem na Twój adres z kartą firmy, a wszystkie zostają na liście w panelu, do którego dostajesz tajny link." },
      ]}
      pricing={[
        {
          name: "Dane firmy z NIP",
          price: "19 zł/mies.",
          kup: "lead-nip",
          desc: "Netto. Formularz, mail z leadem i panel w cenie.",
          features: [
            "formularz do wklejenia na stronę albo przyjmowanie zgłoszeń z Zapier i Make",
            "karta firmy w każdym mailu ze zgłoszeniem z NIP-em",
            "lista zgłoszeń w panelu",
          ],
          featured: true,
        },
      ]}
      faq={[
        { q: "Jak zgłoszenia trafiają do usługi?", a: "Po zakupie dostajesz mailem kod formularza do wklejenia na stronę oraz adres, na który wyślesz zgłoszenie z własnego formularza, Zapier albo Make. Działa od razu po płatności." },
        { q: "Co jeśli klient poda błędny NIP?", a: "W mailu zobaczysz informację, że numer ma błędną sumę kontrolną albo nie figuruje w wykazie VAT. Zgłoszenie i tak do Ciebie dochodzi." },
        { q: "Skąd są dane?", a: "Z publicznego wykazu podatników VAT Ministerstwa Finansów i z Krajowego Rejestru Sądowego. Nie kupujemy ani nie odsprzedajemy baz danych." },
        { q: "Jak zrezygnować?", a: "W dowolnym dniu w portalu płatności, link jest w potwierdzeniu płatności. Za niewykorzystane dni zwracamy pieniądze, a formularz przestaje przyjmować zgłoszenia." },
      ]}
      formId="order_dane_firmy_nip"
      formHeading="Masz pytanie przed zakupem?"
      formIntro="Napisz, a odpowiemy w ciągu dnia roboczego."
      submitLabel="Wyślij pytanie"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Dane firmy do leada z NIP"
      serviceDesc="Uzupełnianie zgłoszeń z NIP-em o nazwę, adres, KRS, REGON, status VAT i branżę z rejestrów. 19 zł netto miesięcznie."
      serviceType="Automatyzacja leadów"
    />
  );
}
