"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Od czego zacząć, jeśli nie wiemy, co chcemy zautomatyzować?",
    answer:
      "Zaczynamy od krótkiej rozmowy wstępnej — bezpłatnie. Opowiadasz, jak wygląda codzienność w Twojej firmie. Wspólnie identyfikujemy, gdzie tracisz najwięcej czasu lub gdzie najczęściej pojawiają się błędy. Jeśli widzimy potencjał, proponujemy audyt procesu, który kończy się konkretną mapą i wyceną wdrożenia.",
  },
  {
    question: "Ile kosztuje automatyzacja?",
    answer:
      "Pierwszym krokiem jest audyt procesu — jego koszt zależy od wielkości firmy i liczby analizowanych procesów, dzięki czemu płacisz adekwatnie do skali swojego biznesu. Na podstawie audytu przygotowujemy stałą wycenę wdrożenia. Projekty zaczynają się od kilku tysięcy złotych. Jeśli masz mniejszy problem, możliwa jest jednorazowa konsultacja. Żadnych ukrytych kosztów — dostajesz jasny zakres i cenę za efekt, zanim wyrazisz zgodę.",
  },
  {
    question: "Dlaczego nie rozliczacie godzinowo?",
    answer:
      "Bo nie powinieneś płacić za nasz czas — powinieneś płacić za wynik. Rozliczenie godzinowe premiuje wolniejszą pracę i generuje niepewność budżetową po Twojej stronie. Stała cena za zakres oznacza, że wiesz dokładnie, co dostajesz i ile to kosztuje, zanim projekt ruszy.",
  },
  {
    question: "Z jakich narzędzi korzystacie?",
    answer:
      "Dobieramy stack do problemu i budżetu — nie jesteśmy przywiązani do jednego narzędzia. Pracujemy z Pythonem (API, automatyzacje, web scraping), n8n, Make i Zapierem, REST API i webhookami, bazami danych (m.in. Supabase), CRM-ami (Pipedrive, HubSpot i innymi) oraz OpenAI API. W projektach wymagających większej kontroli i elastyczności preferujemy rozwiązania oparte o kod.",
  },
  {
    question: "Co po wdrożeniu — zostanę z tym sam?",
    answer:
      "Nie. Po wdrożeniu oferujemy monitoring działania automatyzacji, poprawki oraz dalszy rozwój. Współpraca może przyjąć formę miesięcznego abonamentu albo rozliczenia za konkretny zakres zmian — zależnie od tego, czego potrzebujesz. Przekazujemy też dokumentację i szkolenie, żebyś rozumiał, co działa i dlaczego.",
  },
  {
    question: "Czy pracujecie tylko z polskimi firmami?",
    answer:
      "Nie — współpracujemy z firmami z Polski oraz z klientami anglojęzycznymi. Wszystkie projekty realizujemy zdalnie, więc lokalizacja nie ma znaczenia.",
  },
  {
    question: "Jak długo trwa wdrożenie?",
    answer:
      "Pierwsze wdrożenie zajmuje zazwyczaj 2–4 tygodnie od zatwierdzenia zakresu. Prostsze automatyzacje mogą być gotowe szybciej — najkrótszy projekt zrealizowaliśmy w 9 dni. Czas zależy od liczby integrowanych systemów i złożoności logiki procesu.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <span
          className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
            open ? "rotate-45 border-accent text-accent dark:border-accent dark:text-accent" : ""
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed pr-10">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-12 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container-wide">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Left — heading */}
          <div>
            <p className="section-label mb-3">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Najczęstsze pytania
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-6">
              Nie znalazłeś odpowiedzi? Napisz bezpośrednio — odpiszę tego samego dnia.
            </p>
            <a href="#kontakt" className="btn-primary">
              Zadaj pytanie
            </a>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
