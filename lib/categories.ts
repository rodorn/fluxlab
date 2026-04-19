export interface Article {
  href: string;
  title: string;
  description: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  articles: Article[];
}

export const categories: Category[] = [
  {
    name: "Procesy",
    slug: "procesy",
    description:
      "Artykuły o automatyzacji procesów biznesowych — czym jest, jak liczyć ROI i od czego zacząć.",
    articles: [
      {
        href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
        title: "Co to jest automatyzacja procesów biznesowych?",
        description:
          "Praktyczny przewodnik — czym jest, gdzie daje efekt i od czego zacząć.",
      },
      {
        href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
        title: "Jak policzyć ROI z automatyzacji",
        description:
          "Prosty model bez ściemy: czas, koszt pracy, błędy i skala procesu.",
      },
      {
        href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
        title: "Automatyzacja vs zatrudnienie — co się bardziej opłaca",
        description:
          "Realne koszty, ryzyka, framework decyzji i praktyczne scenariusze dla firm B2B.",
      },
    ],
  },
  {
    name: "CRM",
    slug: "crm",
    description:
      "Wszystko o automatyzacji CRM — wdrożenie, porządkowanie procesu sprzedaży i integracja z innymi systemami.",
    articles: [
      {
        href: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
        title: "Automatyzacja CRM — od czego zacząć",
        description:
          "Audyt procesu, leady, zadania, statusy i pierwsze wdrożenia.",
      },
      {
        href: "/strefa-wiedzy/jak-uporzadkowac-proces-sprzedazy-w-crm",
        title: "Jak uporządkować proces sprzedaży w CRM",
        description:
          "Etapy, kryteria przejścia, pola obowiązkowe i raportowanie.",
      },
      {
        href: "/strefa-wiedzy/jak-polaczyc-crm-z-innymi-systemami",
        title: "Jak połączyć CRM z innymi systemami",
        description:
          "Model wdrożenia, najczęstsze błędy i jedno źródło prawdy.",
      },
      {
        href: "/strefa-wiedzy/pipedrive-vs-salesforce",
        title: "Pipedrive vs Salesforce — które CRM wybrać",
        description:
          "Porównanie cen, funkcji i modelu danych. Dla kogo Pipedrive, a dla kogo Salesforce.",
      },
      {
        href: "/strefa-wiedzy/hubspot-vs-pipedrive",
        title: "HubSpot vs Pipedrive — co wybrać",
        description:
          "Freemium HubSpot kontra prostota Pipedrive. Pricing, skalowanie, realne koszty.",
      },
      {
        href: "/strefa-wiedzy/crm-dla-jednoosobowej-firmy",
        title: "CRM dla jednoosobowej firmy",
        description:
          "Czy solo-firma potrzebuje CRM. Pipedrive, HubSpot Free, Folk — co wybrać i kiedy.",
      },
      {
        href: "/strefa-wiedzy/salesforce-dla-malej-firmy",
        title: "Salesforce dla małej firmy — czy ma sens",
        description:
          "Starter Suite, Enterprise, koszty wdrożenia i typowe pułapki w MŚP.",
      },
    ],
  },
  {
    name: "Narzędzia",
    slug: "narzedzia",
    description:
      "Porównania narzędzi automatyzacji — Zapier, Make, n8n. Kiedy co wybrać w praktyce MŚP.",
    articles: [
      {
        href: "/strefa-wiedzy/zapier-vs-make",
        title: "Zapier vs Make — co wybrać w 2026",
        description:
          "Porównanie prostoty, elastyczności i kosztów. Praktyczne scenariusze MŚP.",
      },
      {
        href: "/strefa-wiedzy/n8n-vs-zapier",
        title: "n8n vs Zapier — kiedy warto iść w self-hosting",
        description:
          "Open-source kontra SaaS. Koszt, kontrola danych, wymagania techniczne.",
      },
      {
        href: "/strefa-wiedzy/make-vs-n8n",
        title: "Make vs n8n — porównanie dla MŚP",
        description:
          "Koszt, elastyczność, krzywa nauki i lokalizacja danych w UE.",
      },
      {
        href: "/strefa-wiedzy/zapier-make-n8n-porownanie",
        title: "Zapier vs Make vs n8n — wielkie porównanie 2026",
        description:
          "Pełne porównanie trzech największych narzędzi automatyzacji — ceny, ograniczenia, rekomendacje.",
      },
    ],
  },
  {
    name: "Integracje",
    slug: "integracje",
    description:
      "Integracje API w firmie — kiedy warto, jakie problemy rozwiązują i jak je wdrożyć.",
    articles: [
      {
        href: "/strefa-wiedzy/integracje-api-w-firmie-kiedy-warto",
        title: "Integracje API w firmie — kiedy warto?",
        description:
          "Kiedy API ma sens, jakie problemy rozwiązuje i kiedy lepiej nie komplikować.",
      },
    ],
  },
  {
    name: "Raportowanie",
    slug: "raportowanie",
    description:
      "Jak zautomatyzować raportowanie i unikać najczęstszych błędów w raportowaniu sprzedaży.",
    articles: [
      {
        href: "/strefa-wiedzy/jak-zautomatyzowac-raportowanie-w-firmie",
        title: "Jak zautomatyzować raportowanie w firmie",
        description:
          "Krok po kroku: definicje, źródła danych, automatyczne dostarczanie.",
      },
      {
        href: "/strefa-wiedzy/najczestsze-bledy-w-raportowaniu-sprzedazy",
        title: "Najczęstsze błędy w raportowaniu sprzedaży",
        description:
          "Złe definicje, rozjazd danych, vanity metrics i ręczne arkusze.",
      },
    ],
  },
  {
    name: "AI",
    slug: "ai",
    description:
      "Praktyczne zastosowania AI w firmie — klasyfikacja, streszczenia, wsparcie obsługi i framework decyzji.",
    articles: [
      {
        href: "/strefa-wiedzy/ai-w-automatyzacji-firm",
        title: "AI w automatyzacji firm",
        description:
          "Praktyczne zastosowania: klasyfikacja, streszczenia, wsparcie obsługi.",
      },
      {
        href: "/strefa-wiedzy/kiedy-ai-ma-sens-a-kiedy-nie",
        title: "Kiedy AI ma sens, a kiedy nie",
        description:
          "Prosty framework decyzji: wolumen, powtarzalność, jakość danych.",
      },
    ],
  },
  {
    name: "JDG i podatki",
    slug: "jdg-i-podatki",
    description:
      "Formy opodatkowania JDG, składka zdrowotna, mały ZUS Plus i VAT — porównania i kalkulacje na 2026 rok.",
    articles: [
      {
        href: "/strefa-wiedzy/jaka-forma-opodatkowania-jdg-2026",
        title: "Jaka forma opodatkowania JDG w 2026?",
        description:
          "Porównanie skali, liniowego i ryczałtu — kryteria wyboru, progi, pułapki.",
      },
      {
        href: "/strefa-wiedzy/ryczalt-czy-liniowy",
        title: "Ryczałt czy liniowy — co się bardziej opłaca",
        description:
          "Kiedy ryczałt wygrywa, kiedy przegrywa i jak to policzyć.",
      },
      {
        href: "/strefa-wiedzy/skala-czy-liniowy-jdg",
        title: "Skala czy liniowy — porównanie dla JDG",
        description: "Kwota wolna, progi, zdrowotna i realne scenariusze.",
      },
      {
        href: "/strefa-wiedzy/jak-liczyc-zdrowotna-jdg",
        title: "Jak liczyć składkę zdrowotną w JDG",
        description: "Zasady 2026 dla skali, liniowego i ryczałtu.",
      },
      {
        href: "/strefa-wiedzy/maly-zus-plus-kiedy-sie-oplaca",
        title: "Mały ZUS Plus — kiedy się opłaca",
        description:
          "Warunki, limity, oszczędności i kiedy lepiej z niego nie korzystać.",
      },
      {
        href: "/strefa-wiedzy/vat-w-jdg-kiedy-warto",
        title: "VAT w JDG — kiedy warto być vatowcem",
        description:
          "Zwolnienie podmiotowe, próg 200 000 zł i wpływ na cashflow.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
