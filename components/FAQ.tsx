"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";

const faqs = [
  {
    question: "Od czego zacząć, jeśli nie wiem, co chcę zautomatyzować?",
    answer:
      "Zaczynamy od bezpłatnej diagnozy. Opowiadasz, jak wygląda codzienność w Twojej firmie. Wspólnie identyfikujemy, gdzie tracisz najwięcej czasu lub gdzie najczęściej pojawiają się błędy. Jeśli widzę potencjał, proponuję płatny audyt procesu, który kończy się konkretną mapą AS-IS → TO-BE i wyceną wdrożenia.",
  },
  {
    question: "Ile kosztuje automatyzacja?",
    answer:
      "Diagnoza jest bezpłatna i kończy się wstępną rekomendacją. Audyt procesu jest płatny — to konkretna dokumentacja: mapa AS-IS → TO-BE, priorytety, narzędzia, harmonogram, wycena i ROI. Koszt audytu odliczam od wdrożenia, jeśli kontynuujemy współpracę. Projekty wdrożeniowe zaczynają się od kilku tysięcy złotych, stała cena za zakres — bez ukrytych kosztów.",
  },
  {
    question: "Dlaczego nie rozliczasz godzinowo?",
    answer:
      "Bo nie powinieneś płacić za mój czas — powinieneś płacić za wynik. Rozliczenie godzinowe premiuje wolniejszą pracę i generuje niepewność budżetową po Twojej stronie. Stała cena za zakres oznacza, że wiesz dokładnie, co dostajesz i ile to kosztuje, zanim projekt ruszy.",
  },
  {
    question: "Z jakich narzędzi korzystasz?",
    answer:
      "Dobieram stack do problemu i budżetu — nie jestem przywiązany do jednego narzędzia. Pracuję z Pythonem (API, automatyzacje, web scraping), n8n, Make i Zapierem, REST API i webhookami, bazami danych (m.in. Supabase), CRM-ami (Pipedrive, HubSpot, Salesforce i innymi) oraz OpenAI API. W projektach wymagających większej kontroli i elastyczności preferuję rozwiązania oparte o kod.",
  },
  {
    question: "Co po wdrożeniu — zostanę z tym sam?",
    answer:
      "Nie. Po wdrożeniu zapewniam monitoring działania automatyzacji, poprawki oraz dalszy rozwój. Współpraca może przyjąć formę miesięcznego abonamentu albo rozliczenia za konkretny zakres zmian — zależnie od tego, czego potrzebujesz. Przekazuję też dokumentację i krótkie szkolenie, żebyś rozumiał, co działa i dlaczego.",
  },
  {
    question: "Pracujesz tylko z polskimi firmami?",
    answer:
      "Nie — współpracuję z firmami z Polski oraz z klientami anglojęzycznymi. Wszystkie projekty realizuję zdalnie, więc lokalizacja nie ma znaczenia.",
  },
  {
    question: "Jak długo trwa wdrożenie?",
    answer:
      "Pierwsze wdrożenie zajmuje zazwyczaj 2–4 dni od zatwierdzenia zakresu. Prostsze automatyzacje mogą być gotowe szybciej — najkrótszy projekt zrobiłem w ciągu kilku godzin. Czas zależy od liczby integrowanych systemów i złożoności logiki procesu.",
  },
];

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-trigger-${index}`;

  return (
    <RevealOnScroll
      delay={Math.min(index + 1, 4) as 1 | 2 | 3 | 4}
      className={`group rounded-xl border transition-all duration-300 ${
        open
          ? "border-accent/40 bg-white dark:bg-gray-800/70 shadow-md shadow-accent/5"
          : "border-gray-100 dark:border-gray-800 bg-white/60 dark:bg-gray-800/30 hover:border-accent/30 hover:bg-white dark:hover:bg-gray-800/60"
      }`}
    >
      <h3 className="m-0">
        <button
          id={buttonId}
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-6 px-5 py-4 text-left rounded-xl"
          aria-expanded={open}
          aria-controls={panelId}
        >
          <span
            className={`text-base font-medium transition-colors duration-200 ${
              open
                ? "text-accent"
                : "text-gray-900 dark:text-white group-hover:text-accent"
            }`}
          >
            {question}
          </span>
          <span
            aria-hidden="true"
            className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full border transition-all duration-300 ${
              open
                ? "rotate-45 border-accent bg-accent text-white"
                : "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 group-hover:border-accent group-hover:text-accent"
            }`}
          >
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1v8M1 5h8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-5 pb-5 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {answer}
          </p>
        </div>
      </div>
    </RevealOnScroll>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section-cyan scroll-mt-16 py-4 lg:py-7 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.answer,
              },
            })),
          }),
        }}
      />

      <div
        aria-hidden="true"
        className="blob blob-cyan animate-drift-slow -z-10 top-[-14%] right-[-10%] w-[440px] h-[440px] opacity-40 dark:opacity-25"
      />
      <div
        aria-hidden="true"
        className="blob blob-accent animate-drift-slow -z-10 bottom-[-16%] left-[-12%] w-[360px] h-[360px] opacity-35 dark:opacity-20"
      />

      <div className="container-wide relative">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 lg:items-start">
          {/* Left - heading */}
          <RevealOnScroll className="lg:sticky lg:top-24">
            <p className="section-label mb-3">FAQ</p>
            <h2
              id="faq-heading"
              className="display-md font-bold text-gray-900 dark:text-white mb-4"
            >
              Najczęstsze pytania
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">
              Nie znalazłeś odpowiedzi? Napisz bezpośrednio - odpiszę tego
              samego dnia.
            </p>
            <a href="#kontakt" className="btn-primary">
              Zadaj pytanie
            </a>
          </RevealOnScroll>

          {/* Right - accordion */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
