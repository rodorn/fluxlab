import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Alert nowych ogłoszeń aut z Otomoto, 19 zł/mies. | Fluxlab",
  description:
    "Wklej link do wyszukiwania z Otomoto, a dostaniesz mail z każdym nowym ogłoszeniem spełniającym Twoje kryteria. Sprawdzanie co pół godziny. 19 zł netto.",
  alternates: { canonical: "/alert-nowych-ogloszen-auta" },
  openGraph: {
    title: "Alert nowych ogłoszeń aut z Otomoto, 19 zł/mies. | Fluxlab",
    description: "Mail z nowymi ogłoszeniami z Twojego wyszukiwania na Otomoto, sprawdzanymi co pół godziny.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, alert nowych ogłoszeń aut" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="alert-nowych-ogloszen-auta"
      breadcrumb="Alert nowych ogłoszeń auta"
      eyebrow="Alert o nowych ogłoszeniach"
      h1="Dobre oferty znikają w kilka godzin. Dowiedz się o nich pierwszy"
      lead="Ustaw na Otomoto wyszukiwanie z własnymi filtrami: marka, model, rocznik, cena, przebieg, region. Wklej do formularza link do strony z wynikami. Co pół godziny sprawdzamy, czy pojawiło się nowe ogłoszenie, i od razu wysyłamy mail z ceną, parametrami, miastem i linkiem."
      ctaLabel="Włącz alert"
      ctaNote="19 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Gdy znajdziesz auto, sprawdź jego cenę:",
          kotwica: "wycena auta z ogłoszeń",
          href: "/wycena-auta-z-ogloszen",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Twoje filtry, nie nasze",
          desc: "Alert działa na wyszukiwaniu, które sam ustawisz na Otomoto, więc kryteria są dokładnie takie, jak chcesz.",
        },
        {
          title: "Sprawdzanie co pół godziny",
          desc: "Nowe ogłoszenia trafiają do maila zwykle w ciągu pół godziny od pojawienia się w wynikach wyszukiwania.",
        },
        {
          title: "Stan na start od razu",
          desc: "Zaraz po zamówieniu dostajesz mail z liczbą ogłoszeń w wyszukiwaniu i pięcioma najnowszymi. Potem tylko to, co nowe.",
        },
      ]}
      pricing={[
        {
          name: "Alert ogłoszeń",
          price: "19 zł/mies.",
          kup: "auto-alert",
          desc: "Netto. Jedno wyszukiwanie z Otomoto, mail przy każdym nowym ogłoszeniu.",
          features: ["sprawdzanie co pół godziny", "cena, rocznik, przebieg, miasto i link", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Jaki link wkleić?",
          a: "Adres strony z wynikami wyszukiwania na Otomoto, który zaczyna się od otomoto.pl/osobowe, po ustawieniu filtrów. Sortowanie ustawiamy sami na najnowsze.",
        },
        {
          q: "Czy mogę mieć kilka wyszukiwań?",
          a: "Jedno zamówienie obejmuje jedno wyszukiwanie. Na drugie wyszukiwanie złóż osobne zamówienie.",
        },
        {
          q: "Czy każde ogłoszenie trafi do maila?",
          a: "Do maila trafiają ogłoszenia, które pojawią się na pierwszej stronie wyników wyszukiwania posortowanych od najnowszych. Przy bardzo szerokich filtrach zawęź wyszukiwanie.",
        },
        {
          q: "Jak zrezygnować?",
          a: "W dowolnym dniu, odpisując na maila z alertem. Za niewykorzystane dni zwracamy pieniądze.",
        },
      ]}
      formId="order_auto_alert"
      formHeading="Włącz alert ogłoszeń"
      formIntro="Wklej link do wyszukiwania z Otomoto. Pierwszy mail wyślemy po zamówieniu."
      submitLabel="Włącz alert"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Alert nowych ogłoszeń auta"
      serviceDesc="Alert e-mail o nowych ogłoszeniach aut z wyszukiwania na Otomoto. 19 zł netto miesięcznie."
      serviceType="Alert nowych ogłoszeń aut"
    />
  );
}
