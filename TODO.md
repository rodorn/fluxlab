# Fluxlab — Plan działania (Strategiczny / Taktyczny / Operacyjny)

> Aktualizacja: **2026-05-07**
> Stan wyjściowy: deployment z 2026-05-04 (commit `676062e`).
> 3 dni od startu — 0 leadów, brak aktywnej dystrybucji.
> Stary TODO.md (kwiecień 2026, sprzed repositioningu) — nadpisany. Historia w `git log -- TODO.md`.
> Templates outbound, LinkedIn, copy — `BRIEF.md` (źródło prawdy, nie powtarzane tutaj).

---

## TL;DR

- **Diagnoza:** zbudowana strona bez kanału dystrybucji = martwy folder. To nie awaria, to baseline.
- **0–14 dni:** weryfikacja trackingu → LinkedIn → outbound. SEO **nie ratuje** pierwszego kwartału.
- **30 dni** bez leada = problem w kanale, nie w stronie. Reset taktyczny, nie rebuild.
- **3 m-ce** to minimum dla decyzji o pivocie pozycjonowania.

Reguły z `BRIEF.md` § P8 (czego nie robić) — obowiązują.

---

## 0. Co jest już zbudowane (źródło prawdy, baseline aktyw)

Zanim zaczniesz nowe zadania, miej w głowie czym dysponujesz. Plan zakłada **dystrybucję tego, co już jest**, nie budowę kolejnych podstron.

- **Homepage**: hero / pain / workflow / pilotaż / services / diagnoza / pricing / proof / process / about / FAQ / CTA
- **Flagowy landing**: `/automatyzacja-leadow-crm` z inline form (formId `diagnosis_lp_leadow`)
- **11 podstron usługowych** — każda z `LandingForm` + dedykowanym formId (atrybucja per-podstrona w GA4):
  - `/automatyzacja-leadow`, `/automatyzacja-crm`, `/automatyzacja-pipedrive`, `/automatyzacja-raportowania`
  - `/integracje-api`, `/automatyzacja-salesforce`, `/automatyzacja-ai`
  - `/n8n`, `/zapier-make`, `/automatyzacja-procesow-biznesowych`
- **10 SEO artykułów P3** — patrz `app/sitemap.ts`
- **4 narzędzia**: `/kalkulator-leadow`, `/audyt-crm`, `/zatrudnic-czy-zautomatyzowac`, `/kalkulator-kosztow`
- **3 strony nawigacyjne**: `/case-study`, `/pilotaz`, `/jak-pracuje`
- **Strefa wiedzy**: 24 artykuły w `/strefa-wiedzy/*`
- **Backend**: `app/api/contact/route.ts` → Resend → `iwanekpawel55@gmail.com` + auto-reply
- **Tracking GA4** (`lib/gtag.ts`): `form_start`, `generate_lead`, `cta_click`, `pricing_view`, `email_click`, `phone_click`
- **JSON-LD**: Organization, Service, FAQPage, BreadcrumbList
- **Atrybucja**: UTM + `landing_page` + `referrer` w każdym formularzu

---

## 1. STRATEGICZNE (horyzont 3–6 miesięcy)

### 1.1 Lock-in pozycjonowania (do 2026-08-07)

Nie zmieniaj „automatyzacja leadów, CRM i raportowania dla firm B2B" przez minimum 8 tygodni dystrybucji. Porzucenie po 4 tyg zerowych leadów = błąd. Decyzja o pivocie — najwcześniej 2026-08-07, po 3 m-cach z aktywnym kanałem.

**Wzmocnienia w okienku** (nie zmiany pozycjonowania):

- [ ] Doprecyzować ICP w outboundzie: leasing/finanse/dealerzy → najbardziej wąski → najlepsza konwersja
- [ ] „Pipedrive operator" jako sub-niche dla LinkedIn („jestem od ludzi, którzy mają Pipedrive i ręczny chaos")
- [ ] Komunikacja „studio prowadzone przez Pawła" — nie cofać do „solo freelancer"

### 1.2 Authority assets (M1–M3, każde 2–8h jednorazowo)

- [ ] **1 publiczne case study z nazwiskiem klienta** — wymaga zgody klienta z portfolio (P1.1 z poprzedniej iteracji, niezamknięte)
- [ ] **3 demo Loom (3–5 min każde)**: Pipedrive lead routing / n8n raport / formularz→CRM integracja
- [ ] **Public repo `fluxlab-templates` na GitHub**: 5 gotowych workflow `.json` (n8n/Make) jako lead magnet → wymaga formularza email do pobrania (sekcja 1.3)

### 1.3 Distribution moat (M1–M6)

Bez własnego kanału jesteś zależny od Google. Cele do końca Q3 (2026-08-07):

- [ ] LinkedIn: **+500 followers w niszy** (start: zmierzyć dziś)
- [ ] Email lista: **100 subskrybentów** (driver: lead magnet workflow templates)
- [ ] **1 podcast guesting** (np. „Mała Wielka Firma", „Przedsiębiorca Po Godzinach", „BiznesNoc")

### 1.4 Produktyzacja oferty

Cennik z `BRIEF.md` § P5 jest dobry. Cel: zamknąć dyskusję „ile to kosztuje" w 3 produktach + 1 retainerze.

- [x] **Diagnoza** (0 zł) — istnieje
- [ ] **Pierwsza automatyzacja** (od 1 500 zł) — istnieje, dorobić **2 sample SOW** jako PDF (pdf z gotową strukturą wdrożenia)
- [x] **Automatyzacja procesu sprzedaży** (wycena indywidualna) — istnieje
- [ ] **Retainer „CRM Operations"** (NEW, M2 trigger): 2 500–5 000 zł/mies, 8h pracy + monitoring + drobne zmiany. Uruchamiać dopiero po pierwszym closed deal.

### 1.5 Decyzja solo-vs-studio

**Trigger podwykonawcy:** 2 aktywne retainery + 3 wdrożenia w pipeline. Wcześniej solo. Nie skalować przed product-market fit.

### Metryki strategiczne (review: 2026-08-07, koniec Q3)

| Metryka                      | Realistyczny | Optymistyczny |
| ---------------------------- | ------------ | ------------- |
| Płatne wdrożenia closed      | 3            | 6             |
| Aktywny retainer MRR         | 1 (2,5k zł)  | 2 (7,5k zł)   |
| Publiczne case study (named) | 1            | 2             |
| Sesje organic / mies         | 1 500        | 4 000         |
| LinkedIn followers (gain)    | +500         | +1 200        |
| Słowa kluczowe top 10 GSC    | 5            | 15            |
| MQL (kwalifikowane leady)    | 15           | 40            |

---

## 2. TAKTYCZNE (horyzont 4–8 tygodni)

### 2.1 Mix kanałów — priorytety

SEO **nie wystartuje** wcześniej niż w tygodniu 6–10. Nie zaczynaj od ads bez baseline'u CR.

| Kanał      | Priorytet | Czas dziennie | First effect  | Główne ryzyko                 |
| ---------- | --------- | ------------- | ------------- | ----------------------------- |
| LinkedIn   | **P0**    | 30 min        | 2–4 tyg       | brak engagement               |
| Outbound   | **P0**    | 60 min        | 1–2 tyg       | spam reports                  |
| SEO        | P1        | 30 min/tydz   | 6–12 tyg      | brak indeksacji               |
| Polecenia  | P2        | passive       | unpredictable | mała sieć                     |
| Płatne ads | P3 (lock) | 0             | natychmiast   | spalenie kasy bez baseline CR |

### 2.2 LinkedIn cadence (4–8 tyg)

- **3 posty/tydz** (pon/śr/pt 8:30 CET — nisza B2B czyta przed pracą)
- Treści gotowe w `BRIEF.md` § P4 (Post 1 problem / Post 2 Pipedrive / Post 3 ROI). Kolejne — pisać wg tego samego patternu (problem → mechanizm → konkretna rada → 1 zdanie filozofii).
- **5 connection requestów/dzień** (pn–pt) — target: Heads of Sales / CRM Owners / Operations Managers w leasingu/finansach/dealerach. Tekst zaproszenia: `BRIEF.md` § P4 „Zaproszenie LinkedIn".
- **5 wartościowych komentarzy/dzień** pod cudzymi postami z niszy. Komentarz dłuższy niż „świetny post" — z konkretnym insightem.
- Po akceptacji zaproszenia: wiadomość z `BRIEF.md` § P4 „Wiadomość po akceptacji" (NIE pitch — tylko ramowe „pomagam X-om robić Y, gdyby coś było").

### 2.3 Outbound cadence

- **Sekwencja 3-mailowa** z `BRIEF.md` § P4 (E-mail outbound): Wiadomość 1 → Follow-up 1 (po 4 dniach) → Follow-up 2 (po kolejnych 5 dniach).
- **Linkować do podstrony niszowej**, NIE do homepage (`BRIEF.md` § P8). Mapowanie ICP → landing:
  - leasing/finanse → `/automatyzacja-crm-leasing`
  - dealerzy → `/automatyzacja-crm-leasing` (na razie wspólne — w M3 osobny landing jeśli sygnał)
  - Pipedrive heavy users → `/automatyzacja-pipedrive`
  - bałagan w raportach → `/automatyzacja-raportowania`
  - lead routing problem → `/automatyzacja-leadow`
- **20 maili/tydz** (4×5 pn–pt) × 4 tyg = 80 firm × 3 wiadomości = **240 wysyłek**. Cel: 5–10 odpowiedzi pozytywnych.
- A/B test: subject line co batch 10 maili.
- **Tool**: domena pocztowa `pawel@fluxlab.pl` lub `kontakt@fluxlab.pl` (NIE Gmail — szanse na spam folder rosną).

### 2.4 Dystrybucja contentu (repurpose, nie pisanie nowego)

Każdy istniejący artykuł = materiał na 1–3 posty LinkedIn.

- [ ] `/automatyzacja-crm-leasing` → 3 posty (problem leasingu / anonimowy case / metoda)
- [ ] `/koszt-recznej-obslugi-leadow` → 1 post (kalkulator + screenshot wyniku)
- [ ] `/case-study` → 1 post per anonimowe wdrożenie (3 posty)
- [ ] `/zatrudnic-czy-zautomatyzowac` → 1 post (kalkulator + scenariusz „kogo nie zatrudnisz")
- [ ] `/raportowanie-z-pipedrive` → 1 post (technical breakdown)

### 2.5 Konwersja & atrybucja

- [ ] **Hidden field `source_page`** w `components/LandingForm.tsx` — przekazać `window.location.pathname` jawnie (jest już w `landing_page` UTM, ale doprecyzować w treści maila — łatwiej skanować skrzynkę)
- [ ] **GA4 custom dimension `form_id`** → raportowanie konwersji per landing
- [ ] **GA4 conversion event `generate_lead`** ustawić jako konwersję (sprawdzić: Admin → Events → mark as conversion)
- [ ] **Microsoft Clarity** (free tier) na produkcji → heatmapa + session recording. 5 min konfiguracja, najwyższy ROI/min wśród narzędzi.
- [ ] **Cotygodniowy funnel review w GA4** (piątek 17:00, 30 min):
  - Sesje: organic / direct / referral / linkedin
  - `form_start` per `form_id`
  - `generate_lead` per `form_id`
  - drop-off między `form_start` a `generate_lead` (jeśli >70% — debug formularza)

### Metryki taktyczne (mierzone tygodniowo, każdy piątek)

- LinkedIn: impressions, profile views, connection acceptance rate, post engagement rate
- Outbound: open rate, reply rate, **positive reply rate**, meeting rate
- Strona: sesje organic vs direct vs LinkedIn referral, `form_start` → `generate_lead` CR
- Funnel: sesje → form_start → generate_lead → booked call → kwalifikacja

---

## 3. OPERACYJNE (najbliższe 14 dni — z datami)

### Tydzień 1 (07–14 maja)

#### Dzień 0 — 2026-05-07 (czw, blok 2–3h, P0 wszystko)

- [ ] **Tracking sanity check**:
  - [ ] GA4 Realtime → produkcja → wypełnić formularz na `/automatyzacja-leadow-crm`, potwierdzić `form_start` + `generate_lead`
  - [ ] Sprawdzić, czy Resend wysłał maila (skrzynka iwanekpawel55@gmail.com)
  - [ ] Sprawdzić, czy auto-reply doszedł na adres testowy
  - [ ] Sprawdzić `RESEND_API_KEY` w Vercel env (Production)
- [ ] **GSC inicjacja**:
  - [ ] Zalogować się do Search Console
  - [ ] Dodać/potwierdzić własność `fluxlab.pl`
  - [ ] Submit `/sitemap.xml`
  - [ ] Request indexing dla **11 URL-i priorytetowych** (lista poniżej)
- [ ] **Domena pocztowa do outboundu**:
  - [ ] Decyzja: `pawel@fluxlab.pl` czy `kontakt@fluxlab.pl`
  - [ ] Skonfigurować SPF/DKIM/DMARC (jeśli jeszcze nie ma w DNS)
- [ ] **Baseline**: zapisać dziś (07-05) liczby: LinkedIn followers, sesje GA4 cumulative od deployu, GSC impressions

#### Dzień 1 — 2026-05-08 (pt, blok 1.5h)

- [ ] **LinkedIn Post 1** (Post „problem" z BRIEF.md § P4) → publikacja 8:30
- [ ] **Lista outbound**: 50 firm leasingowych/finansowych z LinkedIn Sales Navigator (lub manualnie z firm leasingowych — KRRiF). Arkusz Google Sheets z kolumnami: firma, imię, nazwisko, rola, email, status, data wysłania, odpowiedź.
- [ ] **5 connection requestów** z LinkedIn (tekst z BRIEF.md)
- [ ] **5 komentarzy** pod cudzymi postami z niszy
- [ ] **Tygodniowe retro** 17:00 (30 min) — pierwsza iteracja, jeszcze bez liczb, ale zapisać impressions/profile views

#### Dzień 2-3 — 2026-05-09/10 (sb/nd) — pauza lub:

- [ ] Nagrać **Loom #1** (Pipedrive lead routing demo, 3–5 min)

#### Dzień 4 — 2026-05-11 (pn, blok 2h)

- [ ] **Outbound batch #1**: 10 firm — wiadomość 1 z BRIEF.md, subject **A** („Leady z formularza → CRM bez ręcznego przepisywania")
- [ ] **5 connection requestów** + **5 komentarzy**

#### Dzień 5 — 2026-05-12 (wt, blok 2h)

- [ ] **LinkedIn Post 2** (Pipedrive z BRIEF.md) → publikacja 8:30
- [ ] **5 connection requestów** + **5 komentarzy**

#### Dzień 6 — 2026-05-13 (śr, blok 1.5h)

- [ ] **Outbound batch #2**: 10 nowych firm, subject **B** (testować: „Pipedrive jako notatnik vs system pracy" — A/B vs subject A)
- [ ] **5 connection requestów** + **5 komentarzy**

#### Dzień 7 — 2026-05-14 (czw, blok 2h)

- [ ] **LinkedIn Post 3** (ROI z BRIEF.md) → publikacja 8:30
- [ ] **Loom #1 publikacja** → embed na `/case-study` (jeśli nagrane w weekend)
- [ ] **5 connection requestów** + **5 komentarzy**

### Tydzień 2 (15–21 maja)

#### Dzień 8-13 — kontynuacja cadence

- Codziennie pn-pt: 5 connection requestów + 5 komentarzy
- Pn/Śr/Pt 8:30: post LinkedIn (po 3 gotowych z BRIEF — tworzysz nowe wg patternu)
- Pn: 10 outbound nowych (subject zwycięski z A/B)
- Wt: follow-up #1 do batch #1 (z dnia 4)
- Śr: 10 outbound nowych
- Pt: follow-up #1 do batch #2 (z dnia 6)
- Pt 17:00: tygodniowe retro (porównanie do tyg 1, decyzja o subject line)

#### Dzień 14 — 2026-05-21 (śr) — **MILESTONE RETRO**

**Pierwsze realne dane do oceny:**

| Metryka                              | Realistyczny | Optymistyczny |
| ------------------------------------ | ------------ | ------------- |
| Sesje GA4 (cumulative od 2026-05-04) | 200          | 500           |
| `form_start` events                  | 5            | 15            |
| `generate_lead` events               | **1–2**      | 5             |
| Booked call                          | 0–1          | 2             |
| LinkedIn followers gain              | +20          | +50           |
| Outbound positive replies            | 1–2          | 5             |
| Indeksacja w GSC (z 11 URL)          | 8/11         | 11/11         |

**Decyzja po 14 dniach:**

- ≥ realistyczny → kontynuować cadence
- Poniżej → audyt: czy outbound nie idzie do spamu (test inboxchecker.com), czy LinkedIn jest poprawnie targetowany (review listy connections), czy formularz konwertuje (Microsoft Clarity nagrania)

### URL-e priorytetowe do GSC (Day 0)

```
https://fluxlab.pl/
https://fluxlab.pl/automatyzacja-leadow-crm
https://fluxlab.pl/automatyzacja-leadow
https://fluxlab.pl/automatyzacja-crm
https://fluxlab.pl/automatyzacja-pipedrive
https://fluxlab.pl/automatyzacja-raportowania
https://fluxlab.pl/automatyzacja-crm-leasing
https://fluxlab.pl/case-study
https://fluxlab.pl/audyt-crm
https://fluxlab.pl/kalkulator-leadow
https://fluxlab.pl/zatrudnic-czy-zautomatyzowac
```

---

## 4. Backlog techniczny (P1, do 30 dni jeśli starczy czasu)

- [ ] Hidden `source_page` w `components/LandingForm.tsx` (przy okazji: w treści maila do siebie dopisać „Zgłoszenie z: {source_page}")
- [ ] **Microsoft Clarity** — heatmapa + session recording (5 min, free)
- [ ] OG image per landing (zamiast jednego globalnego)
- [ ] `@vercel/speed-insights` — Web Vitals do GA4
- [ ] Demo video #2 (lead routing) i #3 (raportowanie automatycznie z Pipedrive)
- [ ] Lead magnet `/szablony` z 5 workflow `.json` (n8n/Make) + formularz email
- [ ] Newsletter setup (Beehiiv free → 2 500 subów free)
- [ ] Calendly/Cal.com embed na `/jak-pracuje` (eliminacja tarcia bookingu rozmowy)
- [ ] Hidden source UTM w outboundzie: `?utm_source=outbound&utm_campaign=leasing-{tydz}` per batch — atrybucja gotowa, tylko trzeba używać

---

## 5. Czego NIE robimy w najbliższych 30 dniach (lock)

Zgodnie z `BRIEF.md` § P8 + decyzja taktyczna:

- ❌ Nowe usługi / kategorie (zostajemy przy leady/CRM/raportowanie)
- ❌ Refactor strony bez sygnału z danych (Clarity/GA4 musi to uzasadnić)
- ❌ Reklamy płatne (Google Ads / LinkedIn Ads / Meta Ads) — wracamy do tematu po Q3
- ❌ Kolejne SEO artykuły, jeśli pierwsze 10 P3 nie zaindeksuje się i nie zacznie rankingować w 4 tyg
- ❌ Hiring / podwykonawcy (trigger: 2 retainery + 3 wdrożenia w pipe)
- ❌ Nowy lead magnet, zanim aktualne formularze nie zaczną konwertować
- ❌ Ruch outboundu na homepage (zawsze na podstronę niszową)
- ❌ „Pierwsi klienci" w copy, gdy w About pokazujemy 30+ wdrożeń
- ❌ Obietnice „0 błędów", „X% wzrostu", konkretne %% bez definicji okresu i kontekstu

---

## 6. Decision points (triggery, nie pytania)

| Trigger                               | Termin          | Decyzja                                                 |
| ------------------------------------- | --------------- | ------------------------------------------------------- |
| 0 leadów po 14 dniach                 | 2026-05-21      | Audyt: spam outbound? heatmapa? targeting LinkedIn?     |
| 0 leadów po 28 dniach                 | 2026-06-04      | **Reset taktyczny.** Zmiana ICP albo kanału.            |
| 1+ kwalifikowany lead w 14 dni        | 2026-05-21      | Kontynuować cadence, dorobić Loom #2                    |
| 3+ leady w 30 dniach                  | 2026-06-07      | Skalować outbound do 30 maili/tydz                      |
| 1 closed deal                         | gdy się wydarzy | Dorobić sample SOW.pdf, zaktualizować Pricing           |
| 2 closed deals                        | gdy się wydarzy | Pilotaż retainera „CRM Operations"                      |
| 1 case study z named client zamknięte | gdy się wydarzy | Refactor `/case-study`, podbicie autorytetu w Hero      |
| 8 tyg, < 5 MQL                        | 2026-07-02      | Audyt pozycjonowania (czy nisza, czy kanał, czy oferta) |

---

## 7. Anchory w repo (gdzie co siedzi)

- Brief źródłowy (templates outbound, LinkedIn, copy): `BRIEF.md`
- Backend formularza: `app/api/contact/route.ts` (Resend, auto-reply, walidacja, honeypot)
- Komponenty formularza: `components/LandingForm.tsx`, `components/CTA.tsx`
- Tracking GA4: `lib/gtag.ts`, `components/SectionViewTracker.tsx`, `components/ContactClickTracker.tsx`, `components/TrackedCTA.tsx`
- Sitemap: `app/sitemap.ts` (źródło prawdy URL-i)
- Pricing/oferta: `components/Pricing.tsx`, `components/Diagnosis.tsx`
- Pilotaż: `app/pilotaz/page.tsx`, `components/PilotBanner.tsx`
- Layout/SEO globalne: `app/layout.tsx` (JSON-LD Organization, OG)

---

## 8. Notatki robocze

- Każdy ukończony punkt → checkbox + commit (jeśli kod) lub data odhaczenia (jeśli marketing)
- Co tydzień piątek 17:00 → tygodniowe retro (30 min, **w kalendarzu blok**)
- Co miesiąc → review metryk strategicznych (sekcja 1)
- Stary `TODO.md` (sprzed repositioningu) — historia w `git log -- TODO.md`. Nie wracać.
- Nie podejmować decyzji strategicznej w środku „dnia z zerem" — emocje. Decyzje tylko na piątkowym retro.
