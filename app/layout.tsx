import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Fraunces, Instrument_Sans } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PomiarFormularzy from "@/components/PomiarFormularzy";
import PomiarAds from "@/components/PomiarAds";
import PikselMeta from "@/components/PikselMeta";
import ZgodaCookies from "@/components/ZgodaCookies";
import PasekAkcji from "@/components/PasekAkcji";
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

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;
const ADS_LABEL_TEL = process.env.NEXT_PUBLIC_ADS_LABEL_TEL;

/** Consent Mode v2 w trybie zaawansowanym: kolejka gtag istnieje od pierwszego
 *  bajtu strony, domyślnie wszystko odmówione. Bez zgody Google dostaje tylko
 *  sygnały bez ciasteczek, więc konwersje Ads liczą się zawsze. Sam gtag/js
 *  ładuje się później (components/GoogleAnalytics.tsx) i przetwarza kolejkę.
 *  Kliknięcia tel: i mailto: są liczone tutaj, żeby nie ginęły przed hydratacją;
 *  identyfikator kliknięcia reklamy z adresu wejścia zostaje w window.__flKlik
 *  (bez zapisu na urządzeniu) i trafia do zgłoszenia (components/PomiarAds.tsx).
 *  Wejście z reklamy ustawia html[data-reklama]: nagłówek bez menu i wyszukiwarki
 *  (elementy z data-poza-reklama), zostają logo, telefon, WhatsApp i wycena. */
const zgodaGoogle = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
try{if(localStorage.getItem('fluxlab_zgoda')==='tak')gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',analytics_storage:'granted',ad_personalization:localStorage.getItem('fluxlab_zgoda_rem')==='tak'?'granted':'denied'})}catch(e){}
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);
gtag('js',new Date());${GA_ID ? `gtag('config','${GA_ID}',{page_path:location.pathname});` : ""}${ADS_ID ? `gtag('config','${ADS_ID}',{allow_enhanced_conversions:true});` : ""}
try{var q=new URLSearchParams(location.search),k={};['gclid','gbraid','wbraid'].forEach(function(n){var v=q.get(n);if(v)k[n]=v});if(k.gclid||k.gbraid||k.wbraid)window.__flKlik=k;if(window.__flKlik||/^(cpc|ppc|paid)/i.test(q.get('utm_medium')||''))document.documentElement.dataset.reklama=''}catch(e){}
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a');if(!a)return;var h=a.getAttribute('href')||'',p={href:h,location:location.pathname};if(h.indexOf('mailto:')===0)gtag('event','email_click',p);else if(h.indexOf('https://wa.me/')===0)gtag('event','whatsapp_click',p);else if(h.indexOf('tel:')===0){gtag('event','phone_click',p);${ADS_ID && ADS_LABEL_TEL ? `gtag('event','conversion',{send_to:'${ADS_ID}/${ADS_LABEL_TEL}'});` : ""}}else return;window.__gtagTeraz=1;window.dispatchEvent(new Event('gtag-teraz'))},true);`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <style>
          {"html[data-zgoda-zapisana] .cookie-consent{display:none}html[data-reklama] [data-poza-reklama]{display:none!important}[data-tylko-reklama]{display:none}html[data-reklama] [data-tylko-reklama]{display:block}"}
        </style>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('fluxlab_zgoda'))document.documentElement.dataset.zgodaZapisana=''}catch(e){}",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: zgodaGoogle,
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
        <PomiarFormularzy />
        <PomiarAds />
        <PikselMeta />
        <ZgodaCookies />
        <CiszaPrzyPrzewijaniu />
        <ViewTransition default="vt-page">{children}</ViewTransition>
        <PasekAkcji />
        <TytulKarty />
        <Mikrotypografia />
        <Dzwieki />
        <Opoznione />
        <PoPierwszymMalowaniu />
      </body>
    </html>
  );
}
