# FluxLab

Strona B2B consultingu specjalizującego się w automatyzacji procesów biznesowych. Zbudowana w Next.js z App Routerem, TypeScriptem i Tailwind CSS.

## Stack technologiczny

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 3.4**
- **Resend** – obsługa formularza kontaktowego
- **Vercel Analytics & Speed Insights**
- **Deploy** – Vercel (push do `main` = produkcja)

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:3000`.

### Zmienne środowiskowe

Skopiuj `.env.local.example` lub utwórz `.env.local` z wymaganymi kluczami:

```
RESEND_API_KEY=...
```

### Dostępne skrypty

| Komenda         | Opis                        |
| --------------- | --------------------------- |
| `npm run dev`   | Serwer deweloperski         |
| `npm run build` | Build produkcyjny           |
| `npm run start` | Serwer produkcyjny (local)  |
| `npm run lint`  | ESLint                      |

## Struktura projektu

```
app/
  layout.tsx                – root layout, Geist font, metadata, SEO
  page.tsx                  – strona glowna (kompozycja sekcji)
  globals.css               – Tailwind + custom utilities
  sitemap.ts                – dynamiczny sitemap
  api/
    contact/                – API formularza kontaktowego (Resend)
    car-parse/              – parser danych samochodow
    car-recommend/          – rekomendacje samochodow
    tax-ai/                 – AI kalkulator podatkowy
  strefa-wiedzy/            – blog / artykuly SEO
  narzedzia/                – interaktywne narzedzia
  kalkulator-kosztow/       – kalkulator kosztow automatyzacji
  kalkulator-podatkowy/     – kalkulator podatkowy JDG
  dobor-samochodu/          – narzedzie doboru samochodu
  automatyzacja-*/          – landing pages SEO

components/
  Header.tsx                – sticky header z mobilnym menu
  Hero.tsx                  – sekcja hero ze statystykami
  Services.tsx              – 4 karty uslug
  Process.tsx               – 4-krokowy proces
  About.tsx                 – sekcja "o mnie" z metrykami
  Pricing.tsx               – cennik
  FAQ.tsx                   – czesto zadawane pytania
  CTA.tsx                   – formularz kontaktowy
  Footer.tsx                – stopka
  Breadcrumbs.tsx           – breadcrumbs (SEO + UI)
  ThemeToggle.tsx           – przelacznik motywu

public/
  photos/                   – zdjecia
  robots.txt                – reguły dla crawlerow
```

## SEO

- Canonical URLs i meta robots na kazdej stronie
- Dynamiczny `sitemap.ts`
- Statyczny `robots.txt`
- JSON-LD structured data
- OpenGraph na artykułach
- Breadcrumbs (schema.org + komponent UI)

## Design

- Kolor akcentowy: indigo (`#6366f1`)
- Jasny motyw, minimalistyczny styl SaaS
- Kontener: `max-w-6xl`, `px-6 lg:px-8`
- Brak bibliotek UI – czysty Tailwind
