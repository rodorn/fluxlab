import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Klaster "automatyzacja leadow i CRM" mial trzy strony uslugowe po okolo
  // 400 slow o tym samym, z praktycznie zamiennymi tytulami. Dwie cienkie
  // znikaja, a ich adresy prowadza na filar, zeby nie stracic tego, co juz
  // wskazuje na stare sciezki. Linki wewnetrzne sa przepisane wprost na
  // filar, wiec te przekierowania obsluguja wylacznie ruch z zewnatrz.
  async redirects() {
    return [
      // Strony usuniete 7.10.2026 (audyt: mniej stron, mniej tresci)
      { source: "/naprawa-https", destination: "/audyt-strony", statusCode: 301 },
      { source: "/strona-po-wlamaniu", destination: "/audyt-strony", statusCode: 301 },
      { source: "/widocznosc-w-google", destination: "/audyt-strony", statusCode: 301 },
      { source: "/wlasnosc-domeny", destination: "/audyt-poczty", statusCode: 301 },
      { source: "/podwojny-adres", destination: "/audyt-poczty", statusCode: 301 },
      { source: "/rejestr-cen", destination: "/narzedzia", statusCode: 301 },
      { source: "/kontrola-jezykow", destination: "/narzedzia", statusCode: 301 },
      { source: "/analiza-lokalizacji", destination: "/narzedzia", statusCode: 301 },
      { source: "/czujka-rejestrowa", destination: "/sprawdz-kontrahenta", statusCode: 301 },
      { source: "/ile-spolek-znika-z-krs", destination: "/sprawdz-kontrahenta", statusCode: 301 },
      { source: "/mapa-strony", destination: "/", statusCode: 301 },
      { source: "/ceny-energii-jutro", destination: "/narzedzia", statusCode: 301 },
      { source: "/dobor-samochodu", destination: "/narzedzia", statusCode: 301 },
      { source: "/sprawdz-auto", destination: "/narzedzia", statusCode: 301 },
      { source: "/kontrola-paliwa", destination: "/narzedzia", statusCode: 301 },
      { source: "/import-radar", destination: "/narzedzia", statusCode: 301 },
      { source: "/kalkulator-podatkowy", destination: "/narzedzia", statusCode: 301 },
      { source: "/kalkulator-kosztow", destination: "/koszt-recznej-obslugi-leadow", statusCode: 301 },
      { source: "/audyt-marz", destination: "/narzedzia", statusCode: 301 },
      { source: "/audyt-chatbota", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/audyt-crm", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/audyt-google-ads", destination: "/narzedzia", statusCode: 301 },
      { source: "/panel-zwrotow", destination: "/automatyzacja-dla-ecommerce", statusCode: 301 },
      { source: "/landing-z-platnoscia", destination: "/strony-www", statusCode: 301 },
      { source: "/pogotowie-automatyzacji", destination: "/kontakt", statusCode: 301 },
      { source: "/case-study", destination: "/realizacje", statusCode: 301 },
      { source: "/dane-z-badan", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/wdrozenie-n8n-cena", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/integracja-crm-z-erp", destination: "/integracje-api", statusCode: 301 },
      { source: "/automatyzacja-ai", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/automatyzacja-procesow-biznesowych", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/automatyzacja-pipedrive", destination: "/automatyzacja-formularza-do-pipedrive", statusCode: 301 },
      { source: "/automatyzacja-salesforce", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/raportowanie-z-pipedrive", destination: "/automatyzacja-raportowania", statusCode: 301 },
      { source: "/n8n", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/n8n-dla-crm", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/zapier-make", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/make-vs-n8n-crm", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/crm-jako-system-pracy", destination: "/automatyzacja-leadow-crm", statusCode: 301 },
      { source: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/ryczalt-czy-liniowy", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/skala-czy-liniowy-jdg", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/vat-w-jdg-kiedy-warto", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/make-vs-n8n", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/strefa-wiedzy/n8n-vs-zapier", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/strefa-wiedzy/zapier-vs-make", destination: "/strefa-wiedzy/zapier-make-n8n-porownanie", statusCode: 301 },
      { source: "/strefa-wiedzy/salesforce-dla-malej-firmy", destination: "/strefa-wiedzy/pipedrive-vs-salesforce", statusCode: 301 },
      { source: "/strefa-wiedzy/crm-dla-jednoosobowej-firmy", destination: "/strefa-wiedzy/hubspot-vs-pipedrive", statusCode: 301 },
      { source: "/strefa-wiedzy/panel-do-sesji-ai", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich", destination: "/strefa-wiedzy", statusCode: 301 },
      { source: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie", destination: "/strefa-wiedzy/ai-w-automatyzacji-firm", statusCode: 301 },
      { source: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy", destination: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie", statusCode: 301 },
      { source: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm", destination: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac", statusCode: 301 },
      { source: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami", destination: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac", statusCode: 301 },
      { source: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto", destination: "/integracje-api", statusCode: 301 },
      {
        source: "/automatyzacja-leadow",
        destination: "/automatyzacja-leadow-crm",
        statusCode: 301,
      },
      {
        source: "/automatyzacja-crm",
        destination: "/automatyzacja-leadow-crm",
        statusCode: 301,
      },
      // Kalkulator kosztu leadow i artykul o koszcie recznej obslugi celowaly
      // w to samo zapytanie. Kalkulator jest teraz pierwsza zakladka artykulu,
      // wiec zostaje jeden adres z narzedziem i pelnym rachunkiem.
      {
        source: "/kalkulator-leadow",
        destination: "/koszt-recznej-obslugi-leadow",
        statusCode: 301,
      },
      // Kalkulator decyzji i artykul o automatyzacji kontra zatrudnienie
      // celowaly w to samo zapytanie. Kalkulator jest teraz pierwsza zakladka
      // artykulu, wiec zostaje jeden adres z narzedziem i pelna analiza.
      {
        source: "/zatrudnic-czy-zautomatyzowac",
        destination: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
