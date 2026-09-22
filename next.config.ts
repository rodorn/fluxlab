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
    ];
  },
};

export default nextConfig;
