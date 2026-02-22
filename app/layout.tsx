import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Fluxlab – Automatyzacja procesów biznesowych",
  description:
    "Automatyzujemy powtarzalne procesy w Twojej firmie. Oszczędzasz czas, eliminujesz błędy i skupiasz się na tym, co naprawdę ważne.",
  openGraph: {
    title: "Fluxlab – Automatyzacja procesów biznesowych",
    description:
      "Automatyzujemy powtarzalne procesy w Twojej firmie. Oszczędzasz czas, eliminujesz błędy i skupiasz się na tym, co naprawdę ważne.",
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
      </body>
    </html>
  );
}
