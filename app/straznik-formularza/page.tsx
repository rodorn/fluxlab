import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladFormularza } from "@/components/MonitoringTool";

export const metadata: Metadata = {
  title: "Strażnik formularza kontaktowego od 19 zł | Fluxlab",
  description:
    "Raz na dobę wysyłamy zgłoszenie testowe przez formularz na Twojej stronie. Gdy przestanie przechodzić, dostajesz mail. 19 zł netto miesięcznie.",
  alternates: { canonical: "/straznik-formularza" },
  openGraph: {
    title: "Strażnik formularza kontaktowego od 19 zł | Fluxlab",
    description:
      "Raz na dobę wysyłamy zgłoszenie testowe przez formularz na Twojej stronie. Gdy przestanie przechodzić, dostajesz mail. 19 zł netto miesięcznie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, strażnik formularza kontaktowego" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="straznik-formularza"
      tool={<PodgladFormularza />}
      typ="usluga"
      breadcrumb="Strażnik formularza"
      h1="Formularz przestał wysyłać, a Ty nic nie wiesz? Dowiesz się następnego dnia"
      lead="Formularze kontaktowe psują się po cichu: po aktualizacji wtyczki, zmianie poczty albo zmianie hostingu. Raz na dobę wysyłamy przez Twój formularz oznaczone zgłoszenie testowe i piszemy od razu, gdy przestanie przechodzić."
      ctaLabel="Włącz strażnika"
      ctaNote="19 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Zgłoszenie testowe raz na dobę",
          desc: "Wypełniamy formularz jak odwiedzający: temat i treść zaczynają się od „[TEST FluxLab]”, w polu e-mail jest Twój adres. Wiadomość trafia tam, gdzie trafiają zapytania z formularza.",
        },
        {
          title: "Alert, gdy formularz nie przyjmuje zgłoszeń",
          desc: "Pierwszy nieudany test powtarzamy po godzinie. Gdy druga próba też zawiedzie, piszemy z godziną początku i przyczyną, a po naprawie informujemy, że formularz wrócił.",
        },
        {
          title: "Sprawdzamy przed zakupem",
          desc: "Wpisz adres strony z formularzem, a bez wysyłania czegokolwiek powiemy, czy potrafimy go pilnować. Formularzy z captchą i obsługiwanych skryptem nie testujemy.",
        },
      ]}
      pricing={[
        {
          name: "Strażnik formularza",
          price: "19 zł/mies.",
          kup: "monitoring-formularz",
          desc: "Netto. Jeden formularz, test raz na dobę.",
          features: [
            "zgłoszenie testowe raz na dobę",
            "alert mailem po dwóch nieudanych próbach",
            "mail, gdy formularz znowu działa",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Skąd wiecie, że wiadomość dotarła do mojej skrzynki?",
          a: "Nie czytamy Twojej poczty. Sprawdzamy, czy formularz przyjmuje zgłoszenie: kod odpowiedzi i komunikat na stronie. Test zawsze zawiera Twój adres i oznaczenie „[TEST FluxLab]”, więc codzienna wiadomość w skrzynce pokazuje, że całość działa. Gdy przestanie przychodzić, a my milczymy, sprawdź skrzynkę i spam.",
        },
        {
          q: "Jakich formularzy nie obsłużymy?",
          a: "Chronionych captchą (nie wolno nam jej omijać), doładowywanych skryptem po wejściu na stronę i wysyłanych bez zwykłego POST-a. Przed zakupem możesz to sprawdzić w polu powyżej. Jeśli po zamówieniu okaże się, że formularza nie da się testować, zwracamy całą płatność.",
        },
        {
          q: "Czy testowe zgłoszenie nie zaśmieci mi systemu?",
          a: "Jedna wiadomość na dobę, wyraźnie oznaczona. Jeśli formularz zapisuje zgłoszenia w CRM albo uruchamia automaty, ustaw tam regułę, która ignoruje wiadomości, których treść zaczyna się od „[TEST FluxLab]”.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Strażnika wyłączamy automatycznie.",
        },
      ]}
      formId="order_straznik_formularza"
      formHeading="Zapytaj o pilnowanie wielu formularzy"
      formIntro="Masz kilka formularzy albo formularz z captchą? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Strażnik formularza kontaktowego"
      serviceDesc="Codzienne zgłoszenie testowe przez formularz kontaktowy klienta z alertem mailowym, gdy formularz przestaje przyjmować zgłoszenia, za 19 zł netto miesięcznie."
      serviceType="Monitoring formularza"
    />
  );
}
