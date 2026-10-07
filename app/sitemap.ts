import type { MetadataRoute } from "next";
import datyStron from "@/lib/daty-stron.json";

// Data ostatniej zmiany pochodzi z historii gita danej strony, a nie z momentu
// budowania, zeby wyszukiwarka odrozniala strony faktycznie zmienione od calej
// reszty. Odswieza to `node scripts/daty-stron.mjs`.
const DATY = datyStron as Record<string, string>;

function zData<T extends { url: string }>(wpis: T) {
  const sciezka = wpis.url.replace("https://fluxlab.pl", "") || "/";
  const data = DATY[sciezka];
  return data ? { ...wpis, lastModified: new Date(data) } : wpis;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fluxlab.pl";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    {
      url: `${baseUrl}/strony-www`,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/scraping-danych`,
      changeFrequency: "monthly" as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/automatyzacja-raportowania`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integracje-api`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatyzacja-leadow-crm`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/narzedzia`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/strefa-wiedzy`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jak-pracuje`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pilotaz`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/realizacje`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/produkty`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sprawdz-kontrahenta`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audyt-kurierski`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tansze-automatyzacje`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/widocznosc-w-ai`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/e-doreczenia-integracja`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ksef-integracja`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ksef-2027`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/numer-ksef`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/strefa-wiedzy/podszywanie-pod-salony-samochodowe`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dane-sprzedawcy`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sprawdzenie-nip`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audyt-poczty`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/regulamin`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/audyt-strony`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/koszt-recznej-obslugi-leadow`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatyzacja-formularza-do-pipedrive`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/automatyczne-przypisywanie-leadow`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/czas-reakcji-na-leada`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/automatyzacja-follow-up`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/automatyzacja-crm-leasing`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/automatyzacja-dla-ecommerce`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/automatyzacja-dla-agencji-marketingowych`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/automatyzacja-dla-biur-rachunkowych`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ];

  // Lista artykulow bierze sie z historii gita, ktora obejmuje wszystkie pliki
  // stron, a nie z recznego spisu. Reczny spis zgubil juz dwa artykuly, bo
  // dopisanie do niego bylo osobnym krokiem, o ktorym latwo zapomniec.
  const articles = Object.keys(DATY)
    .filter((s) => s.startsWith("/strefa-wiedzy/"))
    .map((s) => s.slice("/strefa-wiedzy/".length))
    .sort();

  const articlePages = articles.map((slug) => ({
    url: `${baseUrl}/strefa-wiedzy/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages].map(zData);
}
