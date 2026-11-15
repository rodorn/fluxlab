import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Ceny paliw dla floty: hurt Orlenu i Twoje stacje | Fluxlab",
  description:
    "Codziennie rano hurtowe ceny Orlenu i ceny stacji, które wskażesz, tylko świeże, z datą wpisu. Dla firm z flotą aut. 29 zł netto miesięcznie.",
  alternates: { canonical: "/paliwa-dla-floty" },
  openGraph: {
    title: "Ceny paliw dla floty: hurt Orlenu i Twoje stacje | Fluxlab",
    description:
      "Hurtowe ceny Orlenu i ceny wskazanych stacji w jednym mailu każdego ranka.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, ceny paliw dla floty",
      },
    ],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="paliwa-dla-floty"
      breadcrumb="Ceny paliw dla floty"
      eyebrow="Ceny paliw dla floty"
      h1="Ceny paliw na Twoich stacjach i hurt Orlenu, co rano w jednym mailu"
      lead="Wskazujesz do sześciu stacji, na których tankują Twoje auta, linkami z autocentrum.pl. Każdego ranka dostajesz mail z oficjalnymi hurtowymi cenami Orlenu na benzynę i diesla oraz ze świeżymi cenami z Twoich stacji. Przy każdej cenie stacji jest data wpisu, a stacje bez świeżych cen są opisane wprost."
      ctaLabel="Włącz codzienny mail"
      ctaNote="29 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Hurt Orlenu jako punkt odniesienia",
          desc: "Pb95, Pb98 i diesel z oficjalnych cen hurtowych ORLEN, z datą, od której obowiązują. To cena hurtowa netto, nie cena na stacji.",
        },
        {
          title: "Tylko świeże ceny stacji",
          desc: "Ceny stacji wpisują kierowcy, więc pokazujemy tylko wpisy z ostatnich 2 dni, każdy z datą. Gdy stacja nie ma świeżej ceny, piszemy „brak świeżych cen”.",
        },
        {
          title: "Stacje wybierasz Ty",
          desc: "Nie szukamy najtańszej stacji w mieście. Pilnujemy dokładnie tych stacji, które wskażesz, więc wiesz, na czym stoi liczba w mailu.",
        },
      ]}
      pricing={[
        {
          name: "Codzienny mail z cenami paliw",
          price: "29 zł/mies.",
          kup: "paliwa-flota",
          desc: "Netto. Hurt Orlenu i do 6 Twoich stacji, mail każdego ranka.",
          features: [
            "hurt Orlenu: Pb95, Pb98, diesel",
            "ceny stacji z datą wpisu",
            "rezygnacja w dowolnym dniu",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd są ceny stacji?",
          a: "Z autocentrum.pl, gdzie ceny wpisują kierowcy. Mogą odbiegać od rzeczywistych, dlatego pokazujemy tylko wpisy z ostatnich 2 dni i datę każdego z nich.",
        },
        {
          q: "Co to są hurtowe ceny Orlenu?",
          a: "Oficjalne ceny hurtowe, które ORLEN publikuje na swojej stronie. Są netto i nie są ceną, jaką zapłacisz na stacji, ale pokazują kierunek zmian cen paliw.",
        },
        {
          q: "Jak wskazać stacje?",
          a: "W autocentrum.pl wejdź na stronę stacji i skopiuj adres, który zaczyna się od autocentrum.pl/stacje-paliw. Wklej do 3 adresów w pierwszym polu i do 3 kolejnych w drugim, oddzielone spacją.",
        },
        {
          q: "Czy znajdziecie najtańszą stację w moim mieście?",
          a: "Nie. Pokazujemy ceny stacji, które sam wskażesz, i hurt Orlenu jako punkt odniesienia.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na maila z cenami. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_paliwa_flota"
      formHeading="Włącz codzienny mail z cenami paliw"
      formIntro="Wklej linki do stacji z autocentrum.pl. Pierwszy mail wyślemy po zamówieniu."
      submitLabel="Włącz codzienny mail"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Dzienny mail z cenami paliw"
      serviceDesc="Codzienny mail z hurtowymi cenami Orlenu i cenami wskazanych stacji. 29 zł netto miesięcznie."
      serviceType="Dzienny mail z cenami paliw"
    />
  );
}
