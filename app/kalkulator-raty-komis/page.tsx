import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kalkulator raty dla komisu, 49 zł/mies. | Fluxlab",
  description:
    "Kalkulator raty kredytu i leasingu do wklejenia na stronę komisu. Twoja nazwa, kontakt i oprocentowanie, kod w mailu zaraz po zamówieniu. 49 zł netto.",
  alternates: { canonical: "/kalkulator-raty-komis" },
  openGraph: {
    title: "Kalkulator raty dla komisu, 49 zł/mies. | Fluxlab",
    description: "Klient sam liczy ratę na stronie komisu, a Ty dostajesz zapytanie z kwotą auta.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator raty dla komisu" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kalkulator-raty-komis"
      breadcrumb="Kalkulator raty dla komisu"
      eyebrow="Dla komisów samochodowych"
      h1="Klient policzy ratę na Twojej stronie, zanim zadzwoni"
      lead="Wklejasz jeden kod na stronę komisu i klienci sami sprawdzają ratę kredytu albo leasingu dla ceny auta, wpłaty i okresu. Przycisk „Zapytaj o ofertę” prowadzi na Twój telefon lub e-mail, z ceną auta w wiadomości."
      ctaLabel="Zamów kalkulator"
      ctaNote="49 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Chcesz wiedzieć, co jeszcze psuje stronę komisu? Zrób",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Kredyt i leasing w jednym",
          desc: "Dwie zakładki: rata kredytu z wpłatą własną oraz rata leasingu netto z opłatą wstępną i wykupem.",
        },
        {
          title: "Twoja nazwa, kontakt i oprocentowanie",
          desc: "Podajesz je przy zamówieniu. Zmiany robimy na prośbę, odpisując na mail z kodem.",
        },
        {
          title: "Działa na telefonie",
          desc: "Suwaki i duże przyciski, jedna kolumna. Kalkulator ma stałą szerokość do 480 px i wtapia się w stronę.",
        },
      ]}
      pricing={[
        {
          name: "Kalkulator raty",
          price: "49 zł/mies.",
          kup: "rata-komis",
          desc: "Netto. Kod do wklejenia w mailu, kalkulator działa do końca subskrypcji.",
          features: ["kredyt i leasing", "Twoja nazwa, kontakt i oprocentowanie", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      poCenniku={
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-600">Tak wygląda kalkulator (wersja demonstracyjna):</p>
          <iframe
            src="/embed/rata"
            title="Kalkulator raty, podgląd"
            loading="lazy"
            className="w-full max-w-[480px] rounded-xl border border-black/10"
            style={{ height: 660 }}
          />
        </div>
      }
      faq={[
        {
          q: "Jak wstawić kalkulator na stronę?",
          a: "Po zamówieniu dostajesz mailem jedną linijkę kodu (iframe). Wklejasz ją tam, gdzie ma być kalkulator. W WordPressie to blok „Własny HTML”, w innych systemach odpowiednik wstawki HTML.",
        },
        {
          q: "Czy wyliczenie jest wiążące?",
          a: "Nie. Kalkulator pokazuje ratę orientacyjną z równą ratą i podanym oprocentowaniem. Nie uwzględnia prowizji, ubezpieczenia ani opłat, a warunki ustala finansujący. Pod wynikiem jest o tym informacja dla klienta.",
        },
        {
          q: "Co dzieje się po rezygnacji?",
          a: "Po anulowaniu subskrypcji kalkulator na Twojej stronie pokazuje komunikat, że jest wyłączony. Rezygnujesz w dowolnym dniu, odpisując na mail z kodem.",
        },
        {
          q: "Skąd kalkulator zna ceny aut?",
          a: "Nie zna. Klient ustawia cenę suwakiem. Kalkulator nie jest połączony z Twoją ofertą aut.",
        },
      ]}
      formId="order_rata_komis"
      formHeading="Zamów kalkulator raty"
      formIntro="Podaj nazwę komisu i kontakt dla klientów. Kod do wklejenia dostaniesz mailem."
      submitLabel="Zamów kalkulator"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Kalkulator raty dla komisu"
      serviceDesc="Kalkulator raty kredytu i leasingu do osadzenia na stronie komisu samochodowego. 49 zł netto miesięcznie."
      serviceType="Kalkulator na stronę"
    />
  );
}
