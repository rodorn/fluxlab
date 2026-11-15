import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";

export const metadata: Metadata = {
  title: "Kalkulator PV z magazynem na stronę, 99 zł/mies. | Fluxlab",
  description:
    "Kalkulator opłacalności fotowoltaiki z magazynem energii do wklejenia na stronę instalatora. Twoje ceny i kontakt, kod w mailu po zamówieniu. 99 zł netto.",
  alternates: { canonical: "/kalkulator-pv-z-magazynem" },
  openGraph: {
    title: "Kalkulator PV z magazynem na stronę, 99 zł/mies. | Fluxlab",
    description: "Klient sam sprawdza, ile zaoszczędzi z magazynem energii, a Ty dostajesz zapytanie z parametrami instalacji.",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, kalkulator PV z magazynem" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="kalkulator-pv-z-magazynem"
      breadcrumb="Kalkulator PV z magazynem"
      eyebrow="Dla instalatorów fotowoltaiki"
      h1="Klient policzy, czy magazyn energii mu się opłaca, zanim zadzwoni"
      lead="Wklejasz jeden kod na stronę firmy, a klient ustawia zużycie prądu, moc instalacji i pojemność magazynu. Widzi roczną oszczędność z magazynem i bez, zwrot całości oraz samego magazynu. Przycisk „Poproś o wycenę” prowadzi na Twój telefon lub e-mail, z parametrami w wiadomości."
      ctaLabel="Zamów kalkulator"
      ctaNote="99 zł netto miesięcznie, rezygnacja w dowolnym dniu"
      powiazane={[
        {
          przed: "Chcesz sprawdzić, co jeszcze psuje stronę firmy? Zrób",
          kotwica: "darmowy audyt strony",
          href: "/audyt-strony",
          po: ".",
        },
      ]}
      checks={[
        {
          title: "Z magazynem i bez w jednym widoku",
          desc: "Oszczędność roczna i zwrot dla instalacji bez magazynu oraz z magazynem, a do tego osobny zwrot samego magazynu.",
        },
        {
          title: "Twoje ceny i kontakt",
          desc: "Podajesz cenę instalacji za kWp i magazynu za kWh oraz kontakt dla klientów. Zmiany robimy na prośbę, odpisując na mail z kodem.",
        },
        {
          title: "Założenia widoczne pod wynikiem",
          desc: "Uzysk, udział zużywany na bieżąco, sprawność magazynu i cena nadwyżki są wypisane pod wynikiem, więc klient wie, skąd liczby.",
        },
      ]}
      pricing={[
        {
          name: "Kalkulator PV z magazynem",
          price: "99 zł/mies.",
          kup: "pv",
          desc: "Netto. Kod do wklejenia w mailu, kalkulator działa do końca subskrypcji.",
          features: ["z magazynem i bez", "Twoje ceny i kontakt", "rezygnacja w dowolnym dniu"],
          featured: true,
        },
      ]}
      poCenniku={
        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-600">Tak wygląda kalkulator (wersja demonstracyjna):</p>
          <iframe
            src="/embed/pv"
            title="Kalkulator PV z magazynem, podgląd"
            loading="lazy"
            className="w-full max-w-[480px] rounded-xl border border-black/10"
            style={{ height: 640 }}
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
          a: "Nie. Kalkulator pokazuje wynik orientacyjny na podstawie jawnych założeń, które są pod wynikiem. Rzeczywista oszczędność zależy od dachu, profilu zużycia i taryfy.",
        },
        {
          q: "Skąd kalkulator zna ceny instalatora?",
          a: "Podajesz je przy zamówieniu: cenę instalacji za kWp i magazynu za kWh. Gdy ich nie podasz, kalkulator używa 4500 zł za kWp i 2000 zł za kWh.",
        },
        {
          q: "Co dzieje się po rezygnacji?",
          a: "Po anulowaniu subskrypcji kalkulator na Twojej stronie pokazuje komunikat, że jest wyłączony. Rezygnujesz w dowolnym dniu, odpisując na mail z kodem.",
        },
      ]}
      formId="order_pv"
      formHeading="Zamów kalkulator PV z magazynem"
      formIntro="Podaj nazwę firmy i kontakt dla klientów oraz swoje ceny. Kod do wklejenia dostaniesz mailem."
      submitLabel="Zamów kalkulator"
      microCopy="Rezygnacja w dowolnym dniu, płacisz za dni korzystania."
      serviceName="Kalkulator PV z magazynem"
      serviceDesc="Kalkulator opłacalności fotowoltaiki z magazynem energii do osadzenia na stronie instalatora. 99 zł netto miesięcznie."
      serviceType="Kalkulator na stronę"
    />
  );
}
