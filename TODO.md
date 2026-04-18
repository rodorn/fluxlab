# TODO — Fluxlab: ruch + leady

Uporządkowane wg kolejności wdrożenia. Zaczynamy od góry.

---

## 🔴 ETAP 1 — Fundament (bez tego reszta jest ślepa)

### Backend formularza kontaktowego

- [ ] Zweryfikować stan `/api/contact` — czy faktycznie wysyła mail (Resend / SendGrid)
- [ ] Jeśli brak — podpiąć Resend (darmowy plan, 3000 maili/mies.)
- [ ] Test end-to-end: wysłać z produkcji, sprawdzić czy dotarł
- [ ] Dodać walidację w `components/CTA.tsx`: `required` na message, `type="email"`, per-field error
- [ ] Dodać stan sukcesu (komunikat „Dzięki, odezwę się w 24h")
- [ ] Dodać anty-spam (honeypot lub Cloudflare Turnstile)

### GA4 — zdarzenia konwersji

- [ ] Zweryfikować `NEXT_PUBLIC_GA_MEASUREMENT_ID` w produkcji
- [ ] Event: `form_submit` (formularz kontaktowy)
- [ ] Event: `calculator_used` (trzy kalkulatory)
- [ ] Event: `cta_click` (przyciski „Porozmawiajmy" itp.)
- [ ] Ustawić konwersję na `form_submit` w GA4
- [ ] Skonfigurować Google Search Console + połączyć z GA4

---

## 🔴 ETAP 2 — Zamień ruch w leady (największy potencjał)

### Kalkulatory jako lead magnet

- [ ] `kalkulator-podatkowy`: modal „Wyślij wyniki na email + PDF" po obliczeniu
- [ ] `kalkulator-kosztow`: to samo
- [ ] `dobor-samochodu`: to samo
- [ ] Pod każdym kalkulatorem: CTA „Chcesz omówić swój przypadek? Bezpłatna konsultacja 30 min"
- [ ] Eksport wyników do PDF (jspdf lub server-side)

### Lead magnets — PDF-y / checklisty

- [ ] PDF „Checklist: 10 procesów do automatyzacji w firmie B2B"
- [ ] PDF „Porównanie Zapier vs Make vs n8n — tabela decyzyjna"
- [ ] PDF „Kalkulator ROI z automatyzacji — szablon Excel"
- [ ] Formularz email na końcu każdego artykułu w `strefa-wiedzy`
- [ ] Popup exit-intent z lead magnetem (np. ConvertBox, lub własny)

### Redukcja tarcia w kontakcie

- [ ] Embed Cal.com / Calendly — rezerwacja bez formularza
- [ ] Dedykowana strona `/kontakt` (nie tylko anchor na homepage)
- [ ] Przycisk WhatsApp (float bottom-right)
- [ ] Per-service CTA: „Darmowy audyt CRM" (na `/automatyzacja-crm`), „Darmowy audyt n8n" (na `/n8n`) itp.

---

## 🟠 ETAP 3 — Techniczne SEO (quick wins, hurtowo)

### Schemy JSON-LD

- [ ] `FAQPage` schema na artykułach z sekcją FAQ (masz treść, brakuje schematu → Featured Snippets)
- [ ] `Service` schema na wszystkich stronach usługowych (`automatyzacja-*`, `n8n`, `zapier-make`, `integracje-api`)
  - `areaServed: "PL"`, `priceRange`, `provider`
- [ ] `HowTo` schema na artykułach typu „jak zautomatyzować X"
- [ ] `BreadcrumbList` schema (jeśli `Breadcrumbs.tsx` jeszcze nie ma)
- [ ] `Organization` schema w `app/layout.tsx` (logo, sameAs, kontakt)

### Sitemap + robots

- [ ] Priorytety w `app/sitemap.ts`: strony bramkowe („co-to-jest-\*", „jak-policzyc-roi") → 0.85
- [ ] Ping Google/Bing po nowych publikacjach (IndexNow)
- [ ] Zweryfikować `robots.txt` — czy nie blokuje nic ważnego

### Core Web Vitals

- [ ] Sprawdzić LCP / CLS / INP w GSC
- [ ] Fontsoptymalizacja (Geist — sprawdź `display: swap`, subset)
- [ ] `next/image` na wszystkich grafikach (widths + priority dla hero)

---

## 🟡 ETAP 4 — UX strefy wiedzy (retencja + linkowanie wewnętrzne)

### Komponenty artykułu

- [ ] Komponent `TableOfContents` — auto-generacja z h2/h3, sticky sidebar desktop
- [ ] Komponent `PrevNextArticle` — nawigacja na końcu artykułu
- [ ] Sekcja „Powiązane artykuły" (3–4) na końcu każdego
- [ ] Data publikacji + reading time na górze artykułu
- [ ] Share buttons (LinkedIn, X, kopiuj link)

### Klastry tematyczne (linkowanie wewnętrzne)

- [ ] Zmapować istniejące artykuły na klastry: CRM / Automatyzacja / JDG-podatki / AI
- [ ] W każdym artykule: min. 3–5 linków do innych w tym samym klastrze
- [ ] Hub dla każdego klastra (np. `/strefa-wiedzy/crm`, `/strefa-wiedzy/jdg`)

### Hub strefy wiedzy

- [ ] „Najnowsze artykuły" (top 5) na `/strefa-wiedzy`
- [ ] Filtrowanie po klastrze/tagu
- [ ] RSS feed `/feed.xml`

### Thin content — narzędzia

- [ ] `kalkulator-kosztow` — dodać 3–4 sekcje eksperckie + FAQ (min. 300 słów komentarza)
- [ ] `dobor-samochodu` — jak wyżej

### Mobile UX

- [ ] `Breadcrumbs.tsx` — zwijać do „Home > bieżąca" na <640px
- [ ] Test mobilny wszystkich kalkulatorów (inputy, scroll, CTA)

---

## 🟢 ETAP 5 — Content (długoterminowy ruch organiczny)

### Artykuły porównawcze (SEO long-tail, wysoki intent)

- [ ] Zapier vs Make — co wybrać do automatyzacji?
- [ ] Pipedrive vs Salesforce — porównanie CRM dla MŚP
- [ ] n8n vs Zapier — kiedy warto self-hosting?
- [ ] HubSpot vs Pipedrive — który CRM dla małej firmy?
- [ ] Automatyzacja vs zatrudnienie — co się bardziej opłaca?
- [ ] Make vs n8n — porównanie narzędzi
- [ ] Zapier vs Make vs n8n — wielkie porównanie 2026
- [ ] CRM dla jednoosobowej firmy — co wybrać?
- [ ] Salesforce — czy warto dla małej firmy?
- [ ] Automatyzacja procesów — własne skrypty vs no-code?

### Artykuły poradnikowe

- [ ] Jak zautomatyzować onboarding klienta w 5 krokach
- [ ] Automatyzacja e-mail marketingu — od czego zacząć
- [ ] Jak zintegrować formularz na stronie z CRM
- [ ] Automatyzacja fakturowania — narzędzia i integracje
- [ ] Jak wybrać narzędzie do automatyzacji — checklist
- [ ] 10 procesów które każda firma B2B powinna zautomatyzować
- [ ] Automatyzacja obsługi klienta — chatbot vs workflow
- [ ] Jak mierzyć efektywność automatyzacji w firmie
- [ ] Automatyzacja dla e-commerce — od zamówienia do wysyłki
- [ ] Jak połączyć Kalendarz Google z CRM i automatyzacją

### Strony branżowe (SEO + konwersja B2B)

- [ ] `/automatyzacja-dla-ecommerce`
- [ ] `/automatyzacja-dla-logistyki`
- [ ] `/automatyzacja-dla-agencji-marketingowych`
- [ ] `/automatyzacja-dla-biur-rachunkowych`
- [ ] `/automatyzacja-dla-software-house`

---

## 🟣 ETAP 6 — Social proof BEZ kłamstwa (zamiast case studies)

Nie masz realizacji → nie wymyślamy ich. Budujemy wiarygodność inaczej:

### Opcja A: „Laboratorium" (pasuje do nazwy FluxLab)

- [ ] Sekcja `/laboratorium` lub `/eksperymenty` — własne automatyzacje opisane szczegółowo
  - Przykłady: automatyzacja samej strony Fluxlab, workflow do researchu, integracje własnych narzędzi
  - Format: problem → narzędzia → kroki → mierzalny efekt (ile godzin zaoszczędziłeś)
  - To NIE są case studies klientów — to twoje eksperymenty, 100% prawda
- [ ] Każdy eksperyment → artykuł + screencast / gif / screenshoty workflow

### Opcja B: Open source / public portfolio

- [ ] Publiczne repo z template'ami workflow n8n/Make (.json do importu)
- [ ] Gist-y / repo ze skryptami do integracji API
- [ ] Link na stronie: „Zobacz moje publiczne workflow na GitHubie"

### Opcja C: „Jak pracuję" — transparentność

- [ ] Strona `/jak-pracuje` (proces krok po kroku)
  - Darmowa konsultacja 30 min
  - Audyt (co, ile trwa, co otrzymujesz)
  - Wdrożenie (milestones, płatność, gwarancja)
  - Wsparcie po wdrożeniu
- [ ] Transparentne ceny / widełki cenowe (rzadkość w branży = przewaga)
- [ ] FAQ „co jeśli automatyzacja przestanie działać", „kto to utrzymuje" itp.

### Opcja D: Pilotaż za case study (pozyskaj pierwsze realizacje)

- [ ] Oferta: „Pierwsi 3 klienci — 50% ceny w zamian za case study + testimonial"
- [ ] Dedykowana strona `/pilotaz` z tą ofertą
- [ ] Target: NGO, startupy znajomych, freelancerzy z sieci
- [ ] Po 2–3 pilotach → realne case studies na stronę

### Opcja E: Ekspertyza zamiast logotypów

- [ ] Badge partnerskie narzędzi, których faktycznie używasz (n8n, Make, Zapier) — linkuj do własnych publikacji/repo
- [ ] Certyfikaty (jeśli masz) — n8n Creator, Make Partner itp. — jeśli nie, zrób je (są darmowe/tanie)
- [ ] Profile eksperckie: odpowiedzi na Stack Overflow / n8n community / subredditach → sekcja „Gdzie mnie znajdziesz"

---

## 🔵 ETAP 7 — Retargeting + płatny ruch (dopiero gdy ETAP 1–3 działa)

- [ ] Meta Pixel (FB/IG remarketing)
- [ ] Google Ads remarketing tag
- [ ] LinkedIn Insight Tag (B2B — kluczowe!)
- [ ] Kampania Google Ads na brandowe + long-tail „zapier konsultacja", „n8n wdrożenie"
- [ ] LinkedIn Ads na decision makerów w MŚP (CEO, COO, Head of Ops)

---

## ⚪ NICE-TO-HAVE (kiedyś)

- [ ] Newsletter — cykliczny mailing z nowymi artykułami (wymaga narzędzia: Beehiiv / MailerLite)
- [ ] Webinar / demo video — landing page z zapisem
- [ ] Program poleceń (rabat za polecenie klienta)
- [ ] Integracja formularza z CRM (Pipedrive/HubSpot) zamiast samego maila
- [ ] Hreflang jeśli planujesz wersję EN
- [ ] Backlinki: guest posty na blogach (np. Zapier blog PL, MamStartup), katalogi branżowe, fora
- [ ] Monitoring pozycji (Senuto / Semstorm — darmowy trial starczy na MVP)

---

## Notatki robocze

- Każdy ukończony punkt → commit + push
- Przy każdym nowym artykule/stronie → update `sitemap.ts`
- Co tydzień sprawdzić GSC (indeksacja, zapytania, pozycje)
- Cel 3 miesiące: 500 odwiedzin/dobę organic + 10 leadów/mies.
