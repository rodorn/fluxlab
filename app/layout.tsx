import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Automatyzacja procesów biznesowych i CRM dla firm B2B | Fluxlab",
  description:
    "Projektujemy i wdrażamy automatyzacje procesów biznesowych, CRM, raportowania i integracji API. Pierwsze efekty w 2–4 dni. Bezpłatna konsultacja.",
  openGraph: {
    title: "Automatyzacja procesów biznesowych i CRM dla firm B2B | Fluxlab",
    description:
      "Projektujemy i wdrażamy automatyzacje procesów biznesowych, CRM, raportowania i integracji API. Pierwsze efekty w 2–4 dni. Bezpłatna konsultacja.",
    locale: "pl_PL",
    type: "website",
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
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&d)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
