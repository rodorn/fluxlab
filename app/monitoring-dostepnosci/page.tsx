import type { Metadata } from "next";
import ProductLanding from "@/components/ProductLanding";
import { PodgladDostepnosci } from "@/components/MonitoringTool";

export const metadata: Metadata = {
  title: "Monitoring dostępności strony od 19 zł | Fluxlab",
  description:
    "Sprawdzamy Twoją stronę co 5 minut. Gdy padnie, dostajesz mail, po naprawie informację o przestoju, co miesiąc raport. 19 zł netto miesięcznie.",
  alternates: { canonical: "/monitoring-dostepnosci" },
  openGraph: {
    title: "Monitoring dostępności strony od 19 zł | Fluxlab",
    description:
      "Sprawdzamy Twoją stronę co 5 minut. Gdy padnie, dostajesz mail, po naprawie informację o przestoju, co miesiąc raport. 19 zł netto miesięcznie.",
    locale: "pl_PL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fluxlab, monitoring dostępności strony" }],
  },
};

export default function Page() {
  return (
    <ProductLanding
      slug="monitoring-dostepnosci"
      tool={<PodgladDostepnosci />}
      typ="usluga"
      breadcrumb="Monitoring dostępności"
      h1="Strona padła w nocy? Dowiesz się w kilka minut, nie od klienta"
      lead="Sprawdzamy Twoją stronę co 5 minut przez całą dobę. Gdy nie odpowiada dwa razy z rzędu, dostajesz mail. Gdy strona wróci, piszemy, ile trwał przestój, a pierwszego dnia miesiąca przysyłamy raport z dostępnością."
      ctaLabel="Włącz monitoring"
      ctaNote="19 zł netto miesięcznie, płatność kartą, rezygnacja w dowolnym dniu"
      checks={[
        {
          title: "Sprawdzanie co 5 minut",
          desc: "Wchodzimy na adres tak jak odwiedzający i patrzymy na kod odpowiedzi. Przy błędzie próbujemy ponownie po chwili, żeby nie budzić Cię przez chwilowy zgrzyt.",
        },
        {
          title: "Mail przy awarii i po naprawie",
          desc: "Alert z godziną początku i przyczyną (brak DNS, brak odpowiedzi w 15 sekund, odmowa połączenia, błąd serwera). Po naprawie podsumowanie przestoju.",
        },
        {
          title: "Raport miesięczny",
          desc: "Dostępność w procentach, średni czas odpowiedzi i lista awarii z czasem trwania, 1. dnia każdego miesiąca.",
        },
      ]}
      pricing={[
        {
          name: "Monitoring dostępności",
          price: "19 zł/mies.",
          kup: "monitoring-dostepnosc",
          desc: "Netto. Jedna strona, sprawdzanie co 5 minut.",
          features: [
            "alert mailem po dwóch nieudanych sprawdzeniach",
            "mail po naprawie z czasem przestoju",
            "raport miesięczny z dostępnością",
            "rezygnacja w dowolnym dniu, płacisz za dni korzystania",
          ],
          featured: true,
        },
      ]}
      faq={[
        {
          q: "Co się dzieje po zapłacie?",
          a: "W ciągu kilku minut od płatności monitoring startuje sam i dostajesz mail z pierwszym wynikiem. Adres strony podajesz przy płatności.",
        },
        {
          q: "Po jakim czasie przychodzi alert?",
          a: "Zwykle po 5 do 10 minutach: alert wysyłamy, gdy dwa kolejne sprawdzenia w odstępie 5 minut nie dadzą poprawnej odpowiedzi.",
        },
        {
          q: "Czy są alerty SMS?",
          a: "Na razie alerty idą mailem. Jeśli SMS jest dla Ciebie ważny, napisz do nas przez formularz.",
        },
        {
          q: "Co, jeśli adres jest błędny?",
          a: "Zwracamy całą płatność i wysyłamy mail z wyjaśnieniem. Możesz zamówić ponownie z poprawnym adresem.",
        },
        {
          q: "Jak zrezygnować?",
          a: "Subskrypcję anulujesz w mailu z potwierdzeniem płatności od Stripe albo odpowiadając na mail od nas. Monitoring wyłączamy automatycznie.",
        },
      ]}
      formId="order_monitoring_dostepnosci"
      formHeading="Zapytaj o monitoring wielu stron"
      formIntro="Masz więcej niż jedną stronę, potrzebujesz SMS albo innych odbiorców alertów? Napisz, odpiszemy z propozycją."
      submitLabel="Wyślij zapytanie"
      microCopy="Odpowiadamy w ciągu 1 dnia roboczego."
      serviceName="Monitoring dostępności strony"
      serviceDesc="Sprawdzanie strony co 5 minut z alertem mailowym przy awarii, informacją o przestoju i raportem miesięcznym za 19 zł netto miesięcznie."
      serviceType="Monitoring strony"
    />
  );
}
