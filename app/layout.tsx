import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ContactClickTracker from "@/components/ContactClickTracker";
import SoundProvider from "@/components/SoundProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "Trzy ścieżki: tworzę strony WWW, automatyzuję CRM i obsługę leadów, wyciągam dane z różnych źródeł. Stała cena, mierzalne efekty, pierwsze wdrożenia w 2-4 dni.",
  openGraph: {
    title: "Strony, automatyzacja, dane dla firm B2B | Fluxlab",
    description:
      "Tworzę strony WWW, automatyzuję CRM i leady, wyciągam dane z web/PDF/maili. Stała cena, mierzalne efekty.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — strony, automatyzacja, dane dla firm B2B",
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
                  alternateName: "Fluxlab — automatyzacja B2B",
                  url: "https://fluxlab.pl",
                  logo: "https://fluxlab.pl/opengraph-image",
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
                    email: "iwanekpawel55@gmail.com",
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
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://fluxlab.pl/strefa-wiedzy?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
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
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <SoundProvider>
          <GoogleAnalytics />
          <ContactClickTracker />
          {children}
          <SpeedInsights />
          <Analytics />
        </SoundProvider>
      </body>
    </html>
  );
}
