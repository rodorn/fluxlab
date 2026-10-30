import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Fraunces, Instrument_Sans } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ZgodaCookies from "@/components/ZgodaCookies";
import TloKursora from "@/components/TloKursora";
import TytulKarty from "@/components/TytulKarty";
import Dzwieki from "@/components/Dzwieki";
import Mikrotypografia from "@/components/Mikrotypografia";
import CiszaPrzyPrzewijaniu from "@/components/CiszaPrzyPrzewijaniu";
import Opoznione, { PoPierwszymMalowaniu } from "@/components/Opoznione";
import "./globals.css";
import "./runda3.css";

// display optional: gdy krój nie zdąży w 100 ms, zostaje zastępczy do końca
// wizyty, zamiast podmiany, po której nagłówki zmieniały liczbę wierszy
// i treść podskakiwała (CLS). Zastępczy dopasowany jest w globals.css.
const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "optional",
  adjustFontFallback: false,
  fallback: ["Instrument Sans Zastepczy", "system-ui", "sans-serif"],
});

// Drugi krój tylko na wyróżnione słowa w nagłówkach, kursywą. Tu swap:
// zastępcza kursywa (DejaVu Serif na Linuksie) psuje ogonki ą i ę.
// Bez preload: 154 kB pliku zmiennego opóźniało na słabym łączu LCP podtytułu.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  style: "italic",
  axes: ["opsz"],
  display: "swap",
  preload: false,
  fallback: ["Times New Roman", "Liberation Serif", "Georgia", "serif"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fluxlab.pl"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  title: "Strony, automatyzacja, dane dla firm B2B | Fluxlab",
  description:
    "Tworzymy strony WWW, automatyzujemy CRM i obsługę leadów, wyciągamy dane z różnych źródeł. Stała cena, mierzalne efekty, pierwsze wdrożenia w 2-4 dni.",
  openGraph: {
    title: "Strony, automatyzacja, dane dla firm B2B | Fluxlab",
    description:
      "Tworzymy strony WWW, automatyzujemy CRM i leady, wyciągamy dane z web/PDF/maili. Stała cena, mierzalne efekty.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, strony, automatyzacja, dane dla firm B2B",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <style>
          {"html[data-zgoda-zapisana] .cookie-consent{display:none}"}
        </style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('fluxlab_zgoda'))document.documentElement.dataset.zgodaZapisana=''}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://fluxlab.pl/#organization",
                  name: "Fluxlab",
                  alternateName: "Fluxlab, automatyzacja B2B",
                  legalName: "Paweł Iwanek",
                  // Numery czytane automatycznie po stronie kupującego, który
                  // weryfikuje kontrahenta przed zapłatą.
                  taxID: "7123336008",
                  vatID: "PL7123336008",
                  identifier: {
                    "@type": "PropertyValue",
                    propertyID: "REGON",
                    value: "366862577",
                  },
                  url: "https://fluxlab.pl",
                  logo: "https://fluxlab.pl/icon.svg",
                  image: "https://fluxlab.pl/opengraph-image",
                  description:
                    "Automatyzacja obsługi leadów, CRM i raportowania dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
                  founder: {
                    "@type": "Person",
                    name: "Paweł Iwanek",
                  },
                  knowsAbout: [
                    "Tworzenie stron internetowych",
                    "Web development",
                    "Next.js",
                    "Automatyzacja procesów biznesowych",
                    "CRM",
                    "Pipedrive",
                    "Salesforce",
                    "HubSpot",
                    "n8n",
                    "Zapier",
                    "Make",
                    "Integracje API",
                    "Raportowanie sprzedaży",
                    "Obsługa leadów B2B",
                    "Web scraping",
                    "Ekstrakcja danych z PDF",
                    "OCR",
                    "AI w automatyzacji",
                    "LLM",
                    "Whisper",
                  ],
                  areaServed: {
                    "@type": "Country",
                    name: "Poland",
                  },
                  serviceType: [
                    "Tworzenie stron WWW",
                    "Automatyzacja CRM i leadów",
                    "Scraping i ekstrakcja danych",
                    "Integracje API",
                    "AI w automatyzacji",
                  ],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Usługi Fluxlab",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Bezpłatna diagnoza procesu",
                        },
                        price: "0",
                        priceCurrency: "PLN",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Pierwsza automatyzacja",
                        },
                        priceSpecification: {
                          "@type": "PriceSpecification",
                          priceCurrency: "PLN",
                          minPrice: "1500",
                        },
                      },
                    ],
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "sales",
                    email: "pawel@fluxlab.pl",
                    availableLanguage: ["pl", "en"],
                    areaServed: "PL",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://fluxlab.pl/#website",
                  url: "https://fluxlab.pl",
                  name: "Fluxlab",
                  publisher: { "@id": "https://fluxlab.pl/#organization" },
                  inLanguage: "pl-PL",
                },
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} font-sans`}
      >
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              "<!-- Czytasz źródło strony? To Next.js, Tailwind i Vercel, bez gotowych szablonów. Jeśli lubisz takie szczegóły, napisz: pawel@fluxlab.pl. Klawisze: Ctrl K szukaj, a góra góra dół dół lewo prawo lewo prawo B A pokazuje szkielet strony. -->",
          }}
        />
        <TloKursora />
        <GoogleAnalytics />
        <ZgodaCookies />
        <CiszaPrzyPrzewijaniu />
        <ViewTransition default="vt-page">{children}</ViewTransition>
        <TytulKarty />
        <Mikrotypografia />
        <Dzwieki />
        <Opoznione />
        <PoPierwszymMalowaniu />
      </body>
    </html>
  );
}
