import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Geist, Instrument_Serif } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ZgodaCookies from "@/components/ZgodaCookies";
import LicznikWizyt from "@/components/LicznikWizyt";
import ContactClickTracker from "@/components/ContactClickTracker";
import ScrollProgress from "@/components/ScrollProgress";
import Czat from "@/components/Czat";
import NowaWersja from "@/components/NowaWersja";
import ScrollToTop from "@/components/ScrollToTop";
import TytulKarty from "@/components/TytulKarty";
import MagnesPrzyciskow from "@/components/MagnesPrzyciskow";
import KomunikatKonsoli from "@/components/KomunikatKonsoli";
import PlynnePrzewijanie from "@/components/PlynnePrzewijanie";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Drugi krój tylko na wyróżnione słowa w nagłówkach, kursywą.
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
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
      <body className={`${geistSans.variable} ${instrumentSerif.variable} font-sans`}>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              "<!-- Czytasz źródło strony? To Next.js, Tailwind i Vercel, bez gotowych szablonów. Jeśli lubisz takie szczegóły, napisz: pawel@fluxlab.pl. Klawisze: Ctrl K szukaj, a góra góra dół dół lewo prawo lewo prawo B A pokazuje szkielet strony. -->",
          }}
        />
        <GoogleAnalytics />
        <ZgodaCookies />
        <LicznikWizyt />
        <ContactClickTracker />
        <ScrollProgress />
        <PlynnePrzewijanie />
        <ViewTransition default="vt-page">{children}</ViewTransition>
        <ScrollToTop />
        <TytulKarty />
        <MagnesPrzyciskow />
        <KomunikatKonsoli />
        <Czat />
        <NowaWersja />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
