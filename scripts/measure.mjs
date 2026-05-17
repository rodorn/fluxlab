import { chromium } from "playwright";

const BASE = "https://www.fluxlab.pl";

const ROUTES = [
  "/",
  "/strony-www",
  "/automatyzacja-leadow-crm",
  "/scraping-danych",
  "/automatyzacja-crm",
  "/automatyzacja-leadow",
  "/automatyzacja-pipedrive",
  "/automatyzacja-salesforce",
  "/automatyzacja-raportowania",
  "/integracje-api",
  "/automatyzacja-ai",
  "/n8n",
  "/zapier-make",
  "/automatyzacja-procesow-biznesowych",
  "/automatyzacja-crm-leasing",
  "/automatyzacja-dla-agencji-marketingowych",
  "/automatyzacja-dla-biur-rachunkowych",
  "/automatyzacja-dla-ecommerce",
  "/audyt-crm",
  "/automatyczne-przypisywanie-leadow",
  "/automatyzacja-follow-up",
  "/automatyzacja-formularza-do-pipedrive",
  "/case-study",
  "/crm-jako-system-pracy",
  "/czas-reakcji-na-leada",
  "/dobor-samochodu",
  "/dziekuje",
  "/jak-pracuje",
  "/kalkulator-kosztow",
  "/kalkulator-leadow",
  "/kalkulator-podatkowy",
  "/koszt-recznej-obslugi-leadow",
  "/make-vs-n8n-crm",
  "/n8n-dla-crm",
  "/narzedzia",
  "/pilotaz",
  "/polityka-prywatnosci",
  "/raportowanie-z-pipedrive",
  "/regulamin",
  "/strefa-wiedzy",
  "/zatrudnic-czy-zautomatyzowac",
  "/strefa-wiedzy/ai-w-automatyzacji-firm",
  "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
  "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
  "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
  "/strefa-wiedzy/crm-dla-jednoosobowej-firmy",
  "/strefa-wiedzy/hubspot-vs-pipedrive",
  "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
  "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
  "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
  "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
  "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
  "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
  "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
  "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
  "/strefa-wiedzy/make-vs-n8n",
  "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
  "/strefa-wiedzy/n8n-vs-zapier",
  "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
  "/strefa-wiedzy/pipedrive-vs-salesforce",
  "/strefa-wiedzy/ryczalt-czy-liniowy",
  "/strefa-wiedzy/salesforce-dla-malej-firmy",
  "/strefa-wiedzy/skala-czy-liniowy-jdg",
  "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
  "/strefa-wiedzy/zapier-make-n8n-porownanie",
  "/strefa-wiedzy/zapier-vs-make",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const results = [];
for (const route of ROUTES) {
  try {
    await page.goto(BASE + route, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(400);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    results.push({ route, h });
  } catch (e) {
    results.push({ route, h: -1, err: String(e).slice(0, 60) });
  }
}

await browser.close();

results.sort((a, b) => b.h - a.h);
let over = 0;
for (const r of results) {
  const flag = r.h > 2000 ? " ❌ >2000" : r.h < 0 ? " ⚠ ERROR" : " ✓";
  if (r.h > 2000) over++;
  console.log(`${String(r.h).padStart(6)}px  ${r.route}${flag}`);
}
console.log(`\n${results.length} stron · ${over} przekracza 2000px`);
