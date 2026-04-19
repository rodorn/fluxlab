import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fluxlab.pl";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    {
      url: `${baseUrl}/automatyzacja-procesow-biznesowych`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatyzacja-crm`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
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
      url: `${baseUrl}/automatyzacja-ai`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatyzacja-leadow`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/automatyzacja-pipedrive`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/automatyzacja-salesforce`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/n8n`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/zapier-make`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/narzedzia`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-kosztow`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-podatkowy`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dobor-samochodu`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
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

  const articles = [
    "co-to-jest-automatyzacja-procesow-biznesowych",
    "jak-policzyc-roi-z-automatyzacji",
    "automatyzacja-crm-od-czego-zaczac",
    "jak-uporzadkowac-proces-sprzedazy-w-crm",
    "jak-polaczyc-crm-z-innymi-systemami",
    "integracje-api-w-firmie-kiedy-warto",
    "jak-zautomatyzowac-raportowanie-w-firmie",
    "najczestsze-bledy-w-raportowaniu-sprzedazy",
    "ai-w-automatyzacji-firm",
    "kiedy-ai-ma-sens-a-kiedy-nie",
    "jaka-forma-opodatkowania-jdg-2026",
    "ryczalt-czy-liniowy",
    "skala-czy-liniowy-jdg",
    "jak-liczyc-zdrowotna-jdg",
    "maly-zus-plus-kiedy-sie-oplaca",
    "vat-w-jdg-kiedy-warto",
    "zapier-vs-make",
    "n8n-vs-zapier",
    "make-vs-n8n",
    "zapier-make-n8n-porownanie",
    "pipedrive-vs-salesforce",
    "hubspot-vs-pipedrive",
    "crm-dla-jednoosobowej-firmy",
    "salesforce-dla-malej-firmy",
    "automatyzacja-vs-zatrudnienie",
  ];

  const articlePages = articles.map((slug) => ({
    url: `${baseUrl}/strefa-wiedzy/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
