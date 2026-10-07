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
      "Artykuły o automatyzacji procesów biznesowych, czym jest, jak liczyć ROI i od czego zacząć.",
    articles: [
      {
        href: "/strefa-wiedzy/konwersje-pokazuja-zero",
        title: "Licznik konwersji pokazuje zero, a zgłoszenia przychodzą",
        description:
          "Cztery przyczyny, przez które analityka nie widzi zgłoszeń docierających na skrzynkę, i kwadrans na rozstrzygnięcie, która to.",
      },
      {
        href: "/strefa-wiedzy/czy-ai-widzi-strony-dealerow",
        title: "Czy asystenci AI widzą strony dealerów samochodowych",
        description:
          "Blokuje je 0,8 procent stron, ale ponad połowa w ogóle nie mówi maszynie, czym jest firma. Badanie na tych samych 386 domenach.",
      },
      {
        href: "/strefa-wiedzy/co-jest-nie-tak-ze-stronami-dealerow",
        title: "Sprawdziliśmy 386 stron dealerów samochodowych",
        description:
          "Ile stron nie pozwala ustalić sprzedawcy, ile nie ma mapy strony i czyje naprawdę są te domeny. Pomiar z metodą i zastrzeżeniami.",
      },
      {
        href: "/strefa-wiedzy/co-to-jest-automatyzacja-procesow-biznesowych",
        title: "Co to jest automatyzacja procesów biznesowych?",
        description:
          "Praktyczny przewodnik, czym jest, gdzie daje efekt i od czego zacząć.",
      },
      {
        href: "/strefa-wiedzy/jak-policzyc-roi-z-automatyzacji",
        title: "Jak policzyć ROI z automatyzacji",
        description:
          "Prosty model bez marketingowej mgły: czas, koszt pracy, błędy i skala procesu.",
      },
      {
        href: "/strefa-wiedzy/automatyzacja-vs-zatrudnienie",
        title: "Automatyzacja vs zatrudnienie, co się bardziej opłaca",
        description:
          "Realne koszty, ryzyka, framework decyzji i praktyczne scenariusze dla firm B2B.",
      },
    ],
  },
  {
    name: "CRM",
    slug: "crm",
    description:
      "Wszystko o automatyzacji CRM, wdrożenie, porządkowanie procesu sprzedaży i integracja z innymi systemami.",
    articles: [
      {
        href: "/strefa-wiedzy/automatyzacja-crm-od-czego-zaczac",
        title: "Automatyzacja CRM, od czego zacząć",
        description:
          "Audyt procesu, leady, zadania, statusy i pierwsze wdrożenia.",
      },
      {
        href: "/strefa-wiedzy/pipedrive-vs-salesforce",
        title: "Pipedrive vs Salesforce, które CRM wybrać",
        description:
          "Porównanie cen, funkcji i modelu danych. Dla kogo Pipedrive, a dla kogo Salesforce.",
      },
      {
        href: "/strefa-wiedzy/hubspot-vs-pipedrive",
        title: "HubSpot vs Pipedrive, co wybrać",
        description:
          "Freemium HubSpot kontra prostota Pipedrive. Pricing, skalowanie, realne koszty.",
      },
    ],
  },
  {
    name: "Narzędzia",
    slug: "narzedzia",
    description:
      "Porównania narzędzi automatyzacji, Zapier, Make, n8n. Kiedy co wybrać w praktyce MŚP.",
    articles: [
      {
        href: "/strefa-wiedzy/zapier-make-n8n-porownanie",
        title: "Zapier vs Make vs n8n, wielkie porównanie 2026",
        description:
          "Pełne porównanie trzech największych narzędzi automatyzacji, ceny, ograniczenia, rekomendacje.",
      },
    ],
  },
  {
    name: "Integracje",
    slug: "integracje",
    description:
      "Integracje API w firmie, kiedy warto, jakie problemy rozwiązują i jak je wdrożyć.",
    articles: [
      {
        href: "/strefa-wiedzy/podszywanie-pod-salony-samochodowe",
        title: "Pod 84 procent salonów można się podszyć mailowo",
        description:
          "Badanie zabezpieczeń poczty na 386 domenach dealerskich. Komplet ochrony ma tylko szesnaście procent.",
      },
      {
        href: "/strefa-wiedzy/maile-trafiaja-do-spamu",
        title: "Dlaczego firmowe maile trafiają do spamu",
        description:
          "Najczęstsze przyczyny lądowania ofert i faktur w spamie oraz konkretne kroki naprawy.",
      },
      {
        href: "/strefa-wiedzy/podszywanie-sie-pod-firmowy-email",
        title: "Podszywanie się pod firmowy adres",
        description:
          "Jak ktoś obcy wysyła wiadomości z Twojej domeny i co ustawić, żeby przestał.",
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
    ],
  },
  {
    name: "AI",
    slug: "ai",
    description:
      "Praktyczne zastosowania AI w firmie, klasyfikacja, streszczenia, wsparcie obsługi i framework decyzji.",
    articles: [
      {
        href: "/strefa-wiedzy/ai-w-automatyzacji-firm",
        title: "AI w automatyzacji firm",
        description:
          "Praktyczne zastosowania: klasyfikacja, streszczenia, wsparcie obsługi.",
      },
    ],
  },
  {
    name: "JDG i podatki",
    slug: "jdg-i-podatki",
    description:
      "Formy opodatkowania JDG, składka zdrowotna, mały ZUS Plus i VAT, porównania i kalkulacje na 2026 rok.",
    articles: [
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
