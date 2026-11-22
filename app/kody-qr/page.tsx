import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import KodyQr from "@/components/KodyQr";

export const metadata: Metadata = {
  title: "Darmowe kody QR z licznikiem skanów | Fluxlab",
  description:
    "Kod QR na ulotkę albo auto, który liczy skany. Obraz do druku i comiesięczny raport skanów przychodzą mailem. Bezpłatnie, bez konta.",
  alternates: { canonical: "/kody-qr" },
  openGraph: {
    title: "Darmowe kody QR z licznikiem skanów | Fluxlab",
    description: "Kod QR na ulotkę albo auto z licznikiem skanów. Bezpłatnie, bez konta.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kody QR z licznikiem skanów" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kody-qr"
      tool={<KodyQr />}
      breadcrumb="Kody QR z licznikiem"
      eyebrow="Kody QR"
      h1="Kod QR, który pokaże, czy ulotka działa"
      lead="Wydrukowałeś ulotki albo okleiłeś auto i nie wiesz, czy ktokolwiek to skanuje. Ten kod prowadzi na Twoją stronę i liczy każdy skan, a raz w miesiącu dostajesz wynik mailem."
      ctaLabel="Zrób kod"
      ctaNote="Bezpłatnie, do 5 kodów na adres e-mail"
      powiazane={[
        {
          przed: "Chcesz wiedzieć, co ludzie robią po zeskanowaniu? Sprawdź",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Licznik skanów co miesiąc",
          desc: "Pierwszego dnia miesiąca przychodzi mail z liczbą skanów każdego kodu i zmianą wobec poprzedniego miesiąca.",
        },
        {
          title: "Obraz do druku",
          desc: "PNG w załączniku maila i SVG do pobrania ze strony. Wektor skaluje się od wizytówki po plandekę.",
        },
        {
          title: "Bez robotów w liczbach",
          desc: "Podglądy linków w komunikatorach i boty wyszukiwarek nie zawyżają licznika.",
        },
        {
          title: "Adres na stałe",
          desc: "Wydrukowany kod się nie zmienia. Kod wyłączysz jednym kliknięciem w mailu, a docelowy adres zmienisz, odpisując na maila.",
        },
      ]}
      pricing={[
        {
          name: "Kody QR z licznikiem",
          price: "0 zł",
          desc: "Bez konta, bez karty i bez okresu próbnego.",
          features: [
            "do 5 aktywnych kodów na jeden adres e-mail",
            "obraz PNG i SVG do druku",
            "comiesięczny raport skanów na maila",
            "wyłączenie kodu jednym kliknięciem",
          ],
          featured: true,
          href: "#narzedzie",
          cta: "Zrób kod",
        },
      ]}
      faq={[
        {
          q: "Czy kod przestanie działać po czasie?",
          a: "Nie, dopóki sam go nie wyłączysz. Kod prowadzi przez adres fluxlab.pl/q/ i nie ma terminu ważności.",
        },
        {
          q: "Co widzicie, gdy ktoś zeskanuje kod?",
          a: "Zapisujemy tylko datę skanu przypisaną do kodu, żeby policzyć wynik. Nie zbieramy danych osoby, która skanuje.",
        },
        {
          q: "Dlaczego muszę potwierdzić adres e-mail?",
          a: "Bez potwierdzenia nikt nie mógłby założyć kodu na cudzy adres. Kod zaczyna przekierowywać po jednym kliknięciu w mailu.",
        },
        {
          q: "Jakie adresy można wpisać?",
          a: "Dowolną publiczną stronę. Nie przyjmujemy adresów IP, sieci lokalnych ani skracaczy typu bit.ly, bo dwa przekierowania z rzędu psują skan na części telefonów.",
        },
        {
          q: "Czy mogę zmienić adres, na który prowadzi kod?",
          a: "Tak, odpisz na maila z kodem i podaj nowy adres. Wydrukowany obraz zostaje ten sam.",
        },
      ]}
      formId="order_kody_qr"
      formHeading="Masz pytanie o kody QR"
      formIntro="Napisz, na co potrzebujesz kodu, odpowiemy z podpowiedzią, jak go ustawić."
      submitLabel="Wyślij pytanie"
      microCopy="Odpowiadamy w godzinę."
      serviceName="Kody QR z licznikiem skanów"
      serviceDesc="Bezpłatne kody QR z licznikiem skanów: obraz do druku i comiesięczny raport skanów na e-mail."
      serviceType="Generator kodów QR"
    />
  );
}
