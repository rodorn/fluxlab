import type { Metadata } from "next";

import AudytPocztyKlient from "./AudytPocztyKlient";

export const metadata: Metadata = {
  title: "Audyt poczty firmowej, ochrona przed podszyciem | Fluxlab",
  description:
    "Sprawdzam SPF, DKIM i DMARC Twojej domeny i mówię, czy ktoś obcy może wysłać wiadomość wyglądającą na Waszą. Wynik od ręki, bez rejestracji.",
  alternates: { canonical: "/audyt-poczty" },
  openGraph: {
    title: "Audyt poczty firmowej, ochrona przed podszyciem | Fluxlab",
    description:
      "SPF, DKIM i DMARC sprawdzone w kilka sekund. Pod 84 procent zbadanych przez nas firm dało się podszyć mailowo.",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fluxlab, audyt zabezpieczeń poczty firmowej",
      },
    ],
  },
};

export default function Page() {
  return <AudytPocztyKlient />;
}
