import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ContactClickTracker from "@/components/ContactClickTracker";
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
  title: "Automatyzacja leadów, CRM i raportowania dla firm B2B | Fluxlab",
  description:
    "Wdrażam automatyzację obsługi leadów, CRM i raportowania w firmach B2B. Lead trafia do CRM, dostaje handlowca, zadanie i raport bez ręcznej pracy. Pierwsze efekty w 2–4 dni.",
  openGraph: {
    title: "Automatyzacja leadów, CRM i raportowania dla firm B2B | Fluxlab",
    description:
      "Wdrażam automatyzację obsługi leadów, CRM i raportowania w firmach B2B. Lead trafia do CRM, dostaje handlowca, zadanie i raport bez ręcznej pracy.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab — Automatyzacja procesów biznesowych i CRM dla firm B2B",
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
                  "@type": "Organization",
                  "@id": "https://fluxlab.pl/#organization",
                  name: "Fluxlab",
                  url: "https://fluxlab.pl",
                  logo: "https://fluxlab.pl/opengraph-image",
                  image: "https://fluxlab.pl/opengraph-image",
                  description:
                    "Automatyzacja obsługi leadów, CRM i raportowania dla firm B2B. Leady trafiają do CRM, dostają handlowca, zadanie i raport bez ręcznej pracy.",
                  areaServed: {
                    "@type": "Country",
                    name: "Poland",
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
        <GoogleAnalytics />
        <ContactClickTracker />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
