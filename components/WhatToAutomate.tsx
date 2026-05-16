import Link from "next/link";
import type { ReactNode } from "react";
import TrackedCTA from "@/components/TrackedCTA";
import RevealOnScroll from "@/components/RevealOnScroll";

type Signal = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

const signals: Signal[] = [
  {
    title: "Robisz to samo co tydzień ręcznie",
    description:
      "Generujesz raporty, wysyłasz follow-upy, kopiujesz dane między arkuszami. Każdy tydzień to samo. Filar: automatyzacja CRM i raportowania.",
    href: "/automatyzacja-leadow-crm",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
  {
    title: "Przepisujesz dane między aplikacjami",
    description:
      "Formularz na stronie → mail → ręcznie do CRM → zadanie. Filar: automatyzacja CRM i leadów lub integracje.",
    href: "/automatyzacja-leadow-crm",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <path d="M10 6.5h4a3 3 0 0 1 3 3V14" />
        <path d="M14 17.5h-4a3 3 0 0 1-3-3V10" />
      </svg>
    ),
  },
  {
    title: "Klient czeka godziny zamiast minut",
    description:
      "Lead wpada, ale nikt nie reaguje od razu. Konkurencja oddzwania pierwsza. Filar: automatyzacja obsługi leadów.",
    href: "/automatyzacja-leadow",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Raport powstaje w piątek wieczorem",
    description:
      "Dane są w CRM, arkuszach, mailach. Raz w tygodniu ktoś to skleja ręcznie. Filar: automatyzacja raportowania.",
    href: "/automatyzacja-raportowania",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M4 20V10" />
        <path d="M10 20V4" />
        <path d="M16 20v-7" />
        <path d="M22 20H2" />
      </svg>
    ),
  },
  {
    title: "Twoja strona wygląda jak z 2018 albo wolno działa",
    description:
      "Mobile nie konwertuje, Google nie indeksuje, klient wraca do konkurencji. Filar: tworzenie / odświeżenie strony WWW.",
    href: "/strony-www",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 21h8" />
        <path d="M12 18v3" />
      </svg>
    ),
  },
  {
    title: "Potrzebujesz danych z zewnątrz — cen, kontaktów, ofert",
    description:
      "Klikasz, kopiujesz, wklejasz do Excela. Albo płacisz za narzędzie, które robi nie to. Filar: scraping danych.",
    href: "/scraping-danych",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
        <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
];

export default function WhatToAutomate() {
  return (
    <section
      id="co-automatyzowac"
      aria-labelledby="co-automatyzowac-heading"
      className="section-amber scroll-mt-16 py-16 lg:py-24 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="blob blob-amber animate-drift-slow -z-10 top-[-15%] left-[-10%] w-[480px] h-[480px] opacity-50 dark:opacity-30"
      />

      <div className="container-wide">
        <div className="max-w-3xl">
          <p className="section-label">Diagnoza</p>
          <h2
            id="co-automatyzowac-heading"
            className="display-lg text-gray-900 dark:text-white"
          >
            Nie wiesz, co automatyzować? Zobacz, gdzie tracisz czas.
          </h2>
          <p className="mt-4 text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Zaznacz, które z poniższych sytuacji znasz z własnej firmy. Każda z
            nich ma rozwiązanie.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signals.map((signal, idx) => {
            const delay = Math.min(idx + 1, 4) as 1 | 2 | 3 | 4;
            return (
              <RevealOnScroll key={signal.title} delay={delay}>
                <Link
                  href={signal.href}
                  className="card-lift h-full rounded-2xl bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm border border-gray-200/60 dark:border-gray-800/60 hover:border-accent/40 dark:hover:border-accent/60 p-6 lg:p-7 flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    {signal.icon}
                  </div>
                  <h3 className="font-semibold text-lg lg:text-xl text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                    „{signal.title}”
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {signal.description}
                  </p>
                  <span className="mt-4 pt-2 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Zobacz rozwiązanie <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="border-t border-gray-200/60 dark:border-gray-800/60 mt-12 pt-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
            Nadal nie wiesz, gdzie zacząć?
          </h3>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Zamów bezpłatną diagnozę procesu. Sprawdzę, co u Ciebie najszybciej
            da efekt, i napiszę wprost, jeśli automatyzacja nie ma sensu.
          </p>
          <div className="mt-6 flex justify-center">
            <TrackedCTA
              href="#kontakt"
              location="what_to_automate"
              label="diagnoza"
              eventName="cta_click_what_to_automate"
              className="btn-primary text-base px-8 py-3.5"
            >
              Zamów bezpłatną diagnozę
            </TrackedCTA>
          </div>
        </div>
      </div>
    </section>
  );
}
