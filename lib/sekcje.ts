/** Jedyne źródło drzewa nawigacji strony: sekcje, grupy i strony z nazwami. */

export type Strona = { href: string; nazwa: string };
export type Grupa = { nazwa: string; hub?: string; strony: Strona[] };
export type Sekcja = {
  slug: string;
  nazwa: string;
  hub?: string;
  wMenu: boolean;
  grupy: Grupa[];
};

const s = (href: string, nazwa: string): Strona => ({ href, nazwa });

export const SEKCJE: Sekcja[] = [
  {
    slug: "uslugi",
    nazwa: "Usługi",
    wMenu: true,
    grupy: [
      {
        nazwa: "Automatyzacja procesów",
        hub: "/automatyzacja-leadow-crm",
        strony: [
          s("/automatyzacja-leadow-crm", "Automatyzacja leadów w CRM"),
          s("/automatyzacja-procesow-biznesowych", "Automatyzacja procesów biznesowych"),
          s("/automatyzacja-formularza-do-pipedrive", "Formularz do Pipedrive"),
          s("/automatyczne-przypisywanie-leadow", "Przypisywanie leadów"),
          s("/automatyzacja-follow-up", "Automatyzacja follow-upów"),
          s("/czas-reakcji-na-leada", "Czas reakcji na leada"),
          s("/crm-jako-system-pracy", "CRM jako system pracy"),
          s("/automatyzacja-raportowania", "Automatyzacja raportowania"),
          s("/raportowanie-z-pipedrive", "Raportowanie z Pipedrive"),
          s("/automatyzacja-ai", "Automatyzacja z AI"),
          s("/automatyzacja-pipedrive", "Automatyzacja Pipedrive"),
          s("/automatyzacja-salesforce", "Automatyzacja Salesforce"),
          s("/n8n", "Automatyzacja w n8n"),
          s("/n8n-dla-crm", "n8n dla CRM"),
          s("/wdrozenie-n8n-cena", "Wdrożenie n8n"),
          s("/pogotowie-automatyzacji", "Pogotowie automatyzacji"),
          s("/audyt-chatbota", "Audyt chatbota"),
          s("/audyt-google-ads", "Audyt Google Ads"),
        ],
      },
      {
        nazwa: "Integracje i dane",
        hub: "/scraping-danych",
        strony: [
          s("/scraping-danych", "Scraping danych"),
          s("/integracje-api", "Integracje API"),
          s("/integracja-crm-z-erp", "Integracja CRM z ERP"),
          s("/audyt-marz", "Audyt marż sklepu"),
          s("/kontrola-paliwa", "Kontrola paliwa we flocie"),
        ],
      },
      {
        nazwa: "Systemy i strony",
        hub: "/strony-www",
        strony: [
          s("/strony-www", "Strony WWW i poprawki"),
          s("/landing-z-platnoscia", "Landing z płatnością"),
          s("/strona-po-wlamaniu", "Ratunek po włamaniu na stronę"),
          s("/mail-firmowy", "Mail firmowy"),
        ],
      },
      {
        nazwa: "Branże",
        strony: [
          s("/automatyzacja-dla-ecommerce", "Automatyzacja dla e-commerce"),
          s("/automatyzacja-dla-biur-rachunkowych", "Automatyzacja dla biur rachunkowych"),
          s("/automatyzacja-dla-agencji-marketingowych", "Automatyzacja dla agencji marketingowych"),
          s("/automatyzacja-crm-leasing", "CRM dla firm leasingowych"),
        ],
      },
    ],
  },
  {
    slug: "narzedzia",
    nazwa: "Narzędzia",
    hub: "/narzedzia",
    wMenu: true,
    grupy: [
      {
        nazwa: "Wszystkie narzędzia",
        hub: "/narzedzia",
        strony: [s("/narzedzia", "Narzędzia")],
      },
      {
        nazwa: "Strona i poczta",
        strony: [
          s("/audyt-strony", "Darmowy audyt techniczny"),
          s("/naprawa-https", "Naprawa ostrzeżenia o stronie"),
          s("/widocznosc-w-google", "Widoczność w Google"),
          s("/widocznosc-w-ai", "Widoczność w AI"),
          s("/mapa-strony", "Mapa strony dla Google"),
          s("/podwojny-adres", "Strona pod dwoma adresami"),
          s("/wlasnosc-domeny", "Właściciel domeny"),
          s("/dane-sprzedawcy", "Klient nie wie, komu płaci"),
          s("/kontrola-jezykow", "Kontrola wersji językowej"),
          s("/rejestr-cen", "Rejestr cen w sklepie"),
          s("/panel-zwrotow", "Panel zwrotów i reklamacji"),
          s("/audyt-poczty", "Audyt poczty firmowej"),
        ],
      },
      {
        nazwa: "Firma i rejestry",
        strony: [
          s("/sprawdzenie-nip", "Sprawdzenie NIP"),
          s("/sprawdz-kontrahenta", "Sprawdzony kontrahent"),
          s("/czujka-rejestrowa", "Dłużnik znika z rejestru"),
          s("/analiza-lokalizacji", "Analiza lokalizacji pod punkt"),
          s("/audyt-kurierski", "Audyt faktur kurierskich"),
        ],
      },
      {
        nazwa: "KSeF i e-Doręczenia",
        strony: [
          s("/ksef-integracja", "Integracja z KSeF"),
          s("/ksef-2027", "Lista KSeF na 2027"),
          s("/numer-ksef", "Sprawdzenie numeru KSeF"),
          s("/e-doreczenia-integracja", "Integracja z e-Doręczeniami"),
        ],
      },
      {
        nazwa: "Koszt automatyzacji",
        strony: [
          s("/tansze-automatyzacje", "Tańsze automatyzacje"),
          s("/koszt-recznej-obslugi-leadow", "Koszt ręcznej obsługi leadów"),
          s("/audyt-crm", "Audyt CRM"),
        ],
      },
      {
        nazwa: "Dla osób prywatnych",
        strony: [
          s("/sprawdz-auto", "Sprawdź auto przed zakupem"),
          s("/import-radar", "ImportRadar DE→PL"),
          s("/dobor-samochodu", "Dobór samochodu"),
          s("/kalkulator-kosztow", "Kalkulator kosztów auta"),
          s("/kalkulator-podatkowy", "Kalkulator podatkowy JDG"),
          s("/ceny-energii-jutro", "Ceny energii na jutro"),
        ],
      },
    ],
  },
  {
    slug: "cennik",
    nazwa: "Cennik",
    hub: "/produkty",
    wMenu: true,
    grupy: [
      {
        nazwa: "Cennik",
        hub: "/produkty",
        strony: [s("/produkty", "Cennik")],
      },
    ],
  },
  {
    slug: "strefa-wiedzy",
    nazwa: "Strefa wiedzy",
    hub: "/strefa-wiedzy",
    wMenu: true,
    grupy: [
      {
        nazwa: "Artykuły",
        hub: "/strefa-wiedzy",
        strony: [
          s("/strefa-wiedzy", "Strefa wiedzy"),
          s("/strefa-wiedzy/kategoria/[slug]", "Kategoria artykułów"),
          s("/strefa-wiedzy/ai-w-automatyzacji-firm", "AI w automatyzacji firm"),
          s("/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac", "Automatyzacja CRM z AI, od czego zacząć"),
          s("/strefa-wiedzy/automatyzacja-vs-zatrudnienie", "Automatyzacja vs zatrudnienie"),
          s("/strefa-wiedzy/bledy-w-rejestrze-obiektow-hotelarskich", "Błędy w rejestrze hoteli"),
          s("/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow", "Badanie stron dealerów"),
          s("/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych", "Czym jest automatyzacja procesów"),
          s("/strefa-wiedzy/crm-dla-jednoosobowej-firmy", "CRM dla jednoosobowej firmy"),
          s("/strefa-wiedzy/czy-ai-widzi-strony-dealerow", "Czy AI widzi strony dealerów"),
          s("/strefa-wiedzy/hubspot-vs-pipedrive", "HubSpot vs Pipedrive"),
          s("/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto", "Integracje API, kiedy warto"),
          s("/strefa-wiedzy/e-doreczenia-adres-prywatny-i-firmowy", "e-Doręczenia: adres prywatny i firmowy"),
          s("/strefa-wiedzy/faktury-z-ksef-po-zmianie-biura", "Faktury z KSeF po zmianie biura"),
          s("/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026", "Forma opodatkowania JDG 2026"),
          s("/strefa-wiedzy/jak-liczyc-zdrowotna-jdg", "Składka zdrowotna w JDG"),
          s("/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami", "Łączenie CRM z systemami"),
          s("/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji", "ROI z automatyzacji"),
          s("/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm", "Proces sprzedaży w CRM"),
          s("/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie", "Automatyzacja raportowania w firmie"),
          s("/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie", "Kiedy AI ma sens"),
          s("/strefa-wiedzy/kiedy-odliczyc-vat-z-faktury-ksef", "Odliczenie VAT z faktury KSeF"),
          s("/strefa-wiedzy/konwersje-pokazuja-zero", "Konwersje pokazują zero"),
          s("/strefa-wiedzy/maile-trafiaja-do-spamu", "Maile trafiają do spamu"),
          s("/strefa-wiedzy/make-vs-n8n", "Make vs n8n"),
          s("/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca", "Mały ZUS Plus"),
          s("/strefa-wiedzy/n8n-vs-zapier", "n8n vs Zapier"),
          s("/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy", "Błędy w raportowaniu sprzedaży"),
          s("/strefa-wiedzy/numeracja-faktur-ksef-2027", "Numeracja faktur w KSeF w 2027"),
          s("/strefa-wiedzy/panel-do-sesji-ai", "Panel do sesji AI"),
          s("/strefa-wiedzy/pipedrive-vs-salesforce", "Pipedrive vs Salesforce"),
          s("/strefa-wiedzy/podszywanie-pod-salony-samochodowe", "Podszywanie pod salony samochodowe"),
          s("/strefa-wiedzy/podszywanie-sie-pod-firmowy-email", "Podszywanie pod firmowy adres"),
          s("/strefa-wiedzy/ryczalt-czy-liniowy", "Ryczałt czy liniowy"),
          s("/strefa-wiedzy/salesforce-dla-malej-firmy", "Salesforce dla małej firmy"),
          s("/strefa-wiedzy/skala-czy-liniowy-jdg", "Skala czy liniowy w JDG"),
          s("/strefa-wiedzy/vat-w-jdg-kiedy-warto", "VAT w JDG"),
          s("/strefa-wiedzy/zapier-make-n8n-porownanie", "Zapier, Make i n8n"),
          s("/strefa-wiedzy/zapier-vs-make", "Zapier vs Make"),
          s("/ile-spolek-znika-z-krs", "Spółki znikające z KRS"),
          s("/dane-z-badan", "Dane z badań"),
          s("/zapier-make", "Zapier vs Make, wdrożenie"),
          s("/make-vs-n8n-crm", "Make czy n8n w CRM"),
        ],
      },
    ],
  },
  {
    slug: "o-nas",
    nazwa: "O nas",
    wMenu: true,
    grupy: [
      {
        nazwa: "O nas",
        strony: [
          s("/realizacje", "Realizacje"),
          s("/case-study", "Modelowe przepływy"),
          s("/jak-pracuje", "Jak pracujemy"),
          s("/pilotaz", "Program pilotażowy"),
          s("/kontakt", "Kontakt"),
        ],
      },
    ],
  },
  {
    slug: "prawne",
    nazwa: "Prawne i techniczne",
    wMenu: false,
    grupy: [
      {
        nazwa: "Prawne i techniczne",
        strony: [
          s("/polityka-prywatnosci", "Polityka prywatności"),
          s("/regulamin", "Regulamin"),
          s("/nie-licz-mnie", "Nie licz moich wizyt"),
          s("/cv", "CV Pawła Iwanka"),
          s("/panel", "Panel Fluxdesk"),
          s("/dziekuje", "Podziękowanie za zgłoszenie"),
          s("/spis-stron", "Spis stron"),
        ],
      },
    ],
  },
];

function normalizuj(href: string): string {
  const bez = href.split(/[?#]/)[0];
  return bez.length > 1 ? bez.replace(/\/+$/, "") : bez;
}

export function sekcjaStrony(
  href: string,
): { sekcja: Sekcja; grupa: Grupa; strona: Strona } | undefined {
  const h = normalizuj(href);
  for (const sekcja of SEKCJE) {
    for (const grupa of sekcja.grupy) {
      const strona = grupa.strony.find((x) => x.href === h);
      if (strona) return { sekcja, grupa, strona };
    }
  }
  if (h.startsWith("/strefa-wiedzy/")) {
    const sekcja = SEKCJE.find((x) => x.slug === "strefa-wiedzy")!;
    const grupa = sekcja.grupy.find((g) => g.nazwa === "Artykuły")!;
    const kategoria = grupa.strony.find((x) => x.href === "/strefa-wiedzy/kategoria/[slug]")!;
    const strona = h.startsWith("/strefa-wiedzy/kategoria/")
      ? kategoria
      : { href: h, nazwa: "Artykuł" };
    return { sekcja, grupa, strona };
  }
  return undefined;
}

export function nazwaStrony(href: string): string | undefined {
  const h = normalizuj(href);
  for (const sekcja of SEKCJE)
    for (const grupa of sekcja.grupy)
      for (const strona of grupa.strony) if (strona.href === h) return strona.nazwa;
  return undefined;
}

export function wszystkieStrony(): Strona[] {
  const widziane = new Set<string>();
  const wynik: Strona[] = [];
  for (const sekcja of SEKCJE)
    for (const grupa of sekcja.grupy)
      for (const strona of grupa.strony) {
        if (widziane.has(strona.href)) continue;
        widziane.add(strona.href);
        wynik.push(strona);
      }
  return wynik;
}
