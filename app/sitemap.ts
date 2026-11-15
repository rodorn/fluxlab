import type { MetadataRoute } from "next";
import datyStron from "@/lib/daty-stron.json";
import { wszystkieStrony } from "@/lib/sekcje";
import { getAllCategorySlugs } from "@/lib/categories";

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
      url: `${baseUrl}/wlasny-crm`,
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
      url: `${baseUrl}/automatyzacja-procesow-biznesowych`,
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
      url: `${baseUrl}/automatyzacja-leadow-crm`,
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
      url: `${baseUrl}/materialy`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/benchmarking-konkurencji`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sprzedaz-stripe-codziennie`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/omnibus-w-sklepie`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/formularz-do-arkusza-i-teams`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dane-firmy-z-nip`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/odpowiedz-na-leada`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ankieta-nps`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/prosba-o-opinie-google`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-wyceny`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/formularz-leadow`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ocena-leada-ai`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/skaner-domen`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profil-firmy-google`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/oze`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-oze-demo`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
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
      url: `${baseUrl}/slownik`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dla-zespolu`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/jak-pracuje`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/szablony`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/zmiany`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/jak-zbudowana`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pilotaz`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/case-study`,
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
      url: `${baseUrl}/sprawdz-auto`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sprawdz-kontrahenta`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/panel-zwrotow`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audyt-kurierski`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sygnaly-automatyzacji`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/porownanie`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tansze-automatyzacje`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wdrozenie-n8n-cena`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/integracja-crm-z-erp`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/widocznosc-w-ai`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/landing-z-platnoscia`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dane-z-badan`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/e-doreczenia-integracja`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/e-doreczenia-dla-firm`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kursy-nbp`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/raport-edoreczen`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalendarz-terminow`,
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
      url: `${baseUrl}/analiza-lokalizacji`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontrola-jezykow`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
      url: `${baseUrl}/ceny-energii-jutro`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/alert-stop-procentowych`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-zdolnosci-kredytowej`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-pv-z-magazynem`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/wycena-auta-z-ogloszen`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/alert-nowych-ogloszen-auta`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kalkulator-raty-komis`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/nabory-dotacji-oze`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faktury-kosztowe-z-ksef-na-mail`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontrola-faktur-kosztowych`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/paczka-miesieczna-dla-biura`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ile-spolek-znika-z-krs`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/adresy-do-edoreczen`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/czujka-rejestrowa`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dane-sprzedawcy`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/spis-stron`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/mapa-strony`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/podwojny-adres`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wlasnosc-domeny`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/widocznosc-w-google`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/naprawa-https`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pilnowanie-certyfikatu`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/monitoring-dostepnosci`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/alert-wycieku-hasel`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pilnowanie-cen-konkurencji`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/straznik-formularza`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kody-qr`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/naprawa-wordpress`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rejestr-cen`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/narzedzia/kalkulator-zus`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/narzedzia/kalkulator-pit`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/narzedzia/porownanie-form-opodatkowania`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sprawdzenie-nip`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mail-firmowy`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
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
      url: `${baseUrl}/strona-po-wlamaniu`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spf-dkim-dmarc`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/polityka-hasel`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pilnowanie-dns`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/skan-wtyczek-wordpress`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/czarne-listy`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/audyt-strony`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/opisy-produktow-z-csv`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/streszczenie-umowy`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/porownanie-umow`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pogotowie-automatyzacji`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audyt-chatbota`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/asystent-ai-na-stronie`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/audyt-marz`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontrola-paliwa`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/import-radar`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/audyt-google-ads`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
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
      url: `${baseUrl}/raportowanie-z-pipedrive`,
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
      url: `${baseUrl}/crm-jako-system-pracy`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/n8n-dla-crm`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/make-vs-n8n-crm`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/automatyzacja-crm-leasing`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/crm-dla-posrednikow-kredytowych`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/audyt-crm`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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

  // Strony z drzewa nawigacji (lib/sekcje.ts), ktorych nie ma w recznym spisie
  // wyzej. Strony bez indeksu i wzorzec dynamiczny [slug] pomijamy.
  const NOINDEX = new Set(["/cv", "/panel", "/dziekuje", "/nie-licz-mnie"]);
  const znane = new Set([...staticPages, ...articlePages].map((p) => p.url));
  const zNawigacji = wszystkieStrony()
    .filter((p) => !NOINDEX.has(p.href) && !p.href.includes("["))
    .map((p) => ({
      url: `${baseUrl}${p.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
    .filter((p) => !znane.has(p.url));

  const kategorie = getAllCategorySlugs().map((slug) => ({
    url: `${baseUrl}/strefa-wiedzy/kategoria/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const wszystkie = [
    ...staticPages,
    ...articlePages,
    ...zNawigacji,
    ...kategorie,
  ];
  const widziane = new Set<string>();
  return wszystkie
    .filter((p) => {
      const url =
        p.url.length > baseUrl.length + 1 ? p.url.replace(/\/+$/, "") : p.url;
      if (NOINDEX.has(url.replace(baseUrl, "") || "/")) return false;
      if (widziane.has(url)) return false;
      widziane.add(url);
      return true;
    })
    .map(zData);
}
