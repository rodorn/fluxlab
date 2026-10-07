import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Landing z formularzem i płatnością, od 299 zł | Fluxlab",
  description:
    "Jedna strona sprzedażowa z formularzem i bramką pod BLIK i przelewy. Zgłoszenie zapisuje się przed płatnością, a potwierdzenie przychodzi webhookiem.",
  alternates: { canonical: "/landing-z-platnoscia" },
  openGraph: {
    title: "Landing z formularzem i płatnością, od 299 zł | Fluxlab",
    description:
      "Szybkie wdrożenie pod jedną kampanię. Nie tracisz danych osób, które zrezygnują w trakcie płatności.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, landing z formularzem i płatnością",
      },
    ],
  },
};

export default function LandingZPlatnoscia() {
  return (
    <ProductLanding
      slug="landing-z-platnoscia"
      breadcrumb="Landing z płatnością"
      eyebrow="Strony"
      h1="Landing z formularzem i płatnością"
      lead="Jedna strona pod jedną kampanię: opis, formularz, płatność. Zgłoszenie zapisuje się przed płatnością, a status potwierdza operator płatności."
      ctaLabel="Opisz, co sprzedajesz"
      ctaNote="Od 299 zł, wdrożenie zwykle w kilka dni"
      checks={[
        {
          title: "Zgłoszenie zapisuje się przed płatnością",
          desc: "Osoba, która wypełniła formularz i zrezygnowała przy BLIK-u, nie znika. Masz do kogo wrócić.",
        },
        {
          title: "Potwierdzenie płatności idzie webhookiem",
          desc: "Status zamówienia ustala operator płatności, a nie powrót klienta na stronę. Zamknięta karta nie zostawia opłaconego zamówienia jako nieopłacone.",
        },
        {
          title: "Jeden szablon, wiele kampanii",
          desc: "Treść i ceny są oddzielone od układu. Kolejny landing to podmiana zawartości i domeny, nie nowy projekt.",
        },
        {
          title: "Czego nie obejmuje cena",
          desc: "Umowy z operatorem płatności, jego prowizji oraz domeny i hostingu, jeśli nie macie własnych.",
        },
      ]}
      pricing={[
        {
          name: "Jedna kampania",
          price: "299 zł",
          desc: "Strona, formularz, powiadomienia.",
          features: [
            "Jedna strona sprzedażowa na Waszej domenie",
            "Formularz z zapisem przed płatnością",
            "Powiadomienie mailem o każdym zgłoszeniu",
            "Potwierdzenie dla kupującego",
          ],
        },
        {
          name: "Z płatnością",
          price: "790 zł",
          desc: "Z podpiętą bramką i obsługą statusów.",
          features: [
            "Wszystko z wariantu podstawowego",
            "Bramka płatnicza pod BLIK i przelewy",
            "Potwierdzenie płatności webhookiem",
            "Panel ze zgłoszeniami i statusem płatności",
            "Regulamin i zgody wymagane przy sprzedaży online",
          ],
          featured: true,
        },
        {
          name: "Kolejna kampania",
          price: "190 zł",
          desc: "Gdy szablon już stoi.",
          features: [
            "Nowa treść i grafiki na istniejącym szablonie",
            "Osobna domena albo adres pod istniejącą",
            "Osobna lista zgłoszeń",
            "Bez budowania od zera",
          ],
        },
      ]}
      faq={[
        {
          q: "Jakiej bramki płatniczej używacie?",
          a: "Tej, którą wybierzecie, bo umowa jest zawierana na Waszą firmę. Wszyscy liczący się operatorzy w Polsce wysyłają potwierdzenie webhookiem.",
        },
        {
          q: "Ile to trwa?",
          a: "Wariant z płatnością zwykle trzy do pięciu dni roboczych od chwili, gdy mamy treść i dostęp do bramki.",
        },
        {
          q: "Czy strona będzie na WordPressie?",
          a: "Nie, jeśli nie ma powodu. Bez CMS-a strona ładuje się szybciej i nie wymaga aktualizacji. Jeśli landing ma być częścią Waszego WordPressa, zrobimy go tam.",
        },
        {
          q: "Co, jeśli kampania nie przyniesie efektów?",
          a: "Strona i kod zostają u Was. Nie ma abonamentu ani przywiązania do naszego serwera.",
        },
      ]}
      formId="landing_platnosc"
      formHeading="Napisz, co sprzedajesz i komu"
      formIntro="Jedno zdanie o produkcie, cena i czy macie bramkę płatniczą. Odpiszemy, który wariant ma sens."
      submitLabel="Wyślij opis kampanii"
      microCopy="Odpisujemy zwykle tego samego dnia. Ustalenia prowadzimy mailowo."
      serviceName="Landing z formularzem i płatnością"
      serviceDesc="Strona sprzedażowa pod jedną kampanię, z formularzem zapisującym zgłoszenie przed płatnością i bramką płatniczą potwierdzaną webhookiem."
      serviceType="Tworzenie stron internetowych"
    />
  );
}
