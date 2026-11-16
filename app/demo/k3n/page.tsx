import type { Metadata } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import DemoK3n from "./DemoK3n";

export const metadata: Metadata = {
  title: "Demo CRM dla K3 Nieruchomości | Fluxlab",
  description:
    "Wersja demonstracyjna: zgłoszenie z formularza trafia do agenta z rejonu, a CRM pilnuje oddzwonienia i powrotów do właściciela.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/demo/k3n" },
};

const KROKI = [
  "Właściciel wypełnia formularz „Zgłoś ofertę” na k3n.pl, tak jak dziś.",
  "Zgłoszenie od razu trafia do agenta, który obsługuje dany rejon, razem z metrażem, ceną i telefonem. Lokalizacja spoza rejonów idzie do kolejnego agenta po kolei.",
  "Agent dostaje powiadomienie, a właściciel mail, że zgłoszenie przyjęto. Jeśli nikt nie oddzwoni do końca dnia roboczego, przypomnienie dostaje agent i kierownik biura.",
  "Gdy właściciel się namyśla, CRM sam przypomina agentowi, kiedy wrócić do rozmowy. Biuro widzi na tablicy, na jakim etapie jest każde zgłoszenie.",
];

export default function DemoK3nPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 pb-6">
          <div className="container-wide max-w-5xl mx-auto">
            <p className="section-label mb-3">Wersja demonstracyjna</p>
            <h1 className="h1-strony">
              Zgłoszenia od właścicieli, które nie giną: demo dla K3
              Nieruchomości
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Wyślij zgłoszenie z formularza i zobacz, co
              dzieje się z nim w CRM biura.
            </p>
          </div>
        </section>

        <section className="pb-8">
          <div className="container-wide max-w-5xl mx-auto">
            <DemoK3n />
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Demo działa w przeglądarce i nigdzie nie wysyła wpisanych danych.
              Rejony i nazwy agentów są przykładowe, w prawdziwym wdrożeniu
              ustawia je biuro.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-wide max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold">Jak to działa</h2>
            <ol className="mt-3 space-y-2 text-gray-600 dark:text-gray-400 list-decimal pl-5">
              {KROKI.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800 py-6">
        <div className="container-wide max-w-3xl mx-auto flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span>Wersja demonstracyjna FluxLab</span>
          <Link href="/" className="underline">
            fluxlab.pl
          </Link>
          <Link href="/polityka-prywatnosci" className="underline">
            Polityka prywatności
          </Link>
        </div>
      </footer>
    </>
  );
}
