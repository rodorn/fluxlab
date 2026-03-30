import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Zapier vs Make (Integromat) — porównanie i wdrożenie automatyzacji | Fluxlab",
  description:
    "Zapier czy Make? Porównujemy platformy automatyzacji, pomagamy wybrać najlepsze narzędzie i wdrażamy workflow dopasowane do potrzeb Twojej firmy.",
  openGraph: {
    title: "Zapier vs Make (Integromat) — porównanie i wdrożenie automatyzacji | Fluxlab",
    description:
      "Zapier czy Make? Porównujemy platformy automatyzacji, pomagamy wybrać najlepsze narzędzie i wdrażamy workflow dopasowane do potrzeb Twojej firmy.",
    locale: "pl_PL",
    type: "article",
  },
};

const useCases = [
  {
    title: "Zapier — prostota i szybkość wdrożenia",
    description:
      "Zapier najlepiej sprawdza się, gdy potrzebujesz szybko połączyć dwa narzędzia prostym przepływem: nowy lead w formularzu trafia do CRM, faktura generuje się po zamówieniu, powiadomienie leci na Slacka. Ponad 7 000 integracji, intuicyjny interfejs i minimalna krzywa uczenia się.",
  },
  {
    title: "Make — zaawansowana logika i kontrola",
    description:
      "Make (dawniej Integromat) to wybór, gdy workflow wymaga rozgałęzień, pętli, obsługi błędów, transformacji danych czy operacji na wielu systemach jednocześnie. Wizualny builder pozwala budować scenariusze, które w Zapier wymagałyby kilku osobnych Zapów lub nie byłyby możliwe.",
  },
  {
    title: "Kiedy użyć obu naraz",
    description:
      "W praktyce wiele firm korzysta z obu platform jednocześnie. Zapier obsługuje proste, liniowe automatyzacje (np. marketing, powiadomienia), a Make przejmuje wieloetapowe procesy operacyjne. Kluczem jest świadomy podział — nie narzędzie, a dopasowanie do konkretnego problemu.",
  },
];

const faq = [
  {
    question: "Czy Zapier jest lepszy od Make?",
    answer:
      "Nie ma jednej odpowiedzi. Zapier jest prostszy i ma więcej gotowych integracji, więc sprawdza się w prostych workflow. Make daje większą kontrolę nad logiką i jest tańszy przy dużej liczbie operacji. Najlepszy wybór zależy od konkretnego procesu.",
  },
  {
    question: "Czy mogę przenieść automatyzacje z jednej platformy na drugą?",
    answer:
      "Tak, ale nie ma automatycznej migracji. Trzeba odtworzyć logikę w nowym narzędziu. Pomagamy w takich migracjach — analizujemy istniejące workflow i przenosimy je z optymalizacją.",
  },
  {
    question: "Ile kosztuje Zapier vs Make?",
    answer:
      "Zapier rozlicza się za liczbę zadań (tasks), Make za liczbę operacji. Przy prostych workflow koszty są zbliżone. Przy dużej skali Make bywa znacznie tańszy, bo operacje są wyceniane korzystniej. Pomagamy dobrać plan tak, żeby nie przepłacać.",
  },
];

const relatedServices = [
  { href: "/automatyzacja-procesow-biznesowych", label: "Automatyzacja procesów biznesowych" },
  { href: "/n8n", label: "n8n — self-hosted automatyzacja" },
];

export default function ZapierMake() {
  return (
    <>
      <Header />
      <main className="pt-16">

        {/* Hero */}
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-sky-50 dark:hidden" />
            <img src="/photos/Flow.avif" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.08] dark:hidden" style={{ filter: "invert(1)" }} />
            <img src="/photos/Flow.avif" alt="" aria-hidden="true" className="w-full h-full object-cover hidden dark:block" />
            <div className="absolute inset-0 hidden dark:block bg-gray-950/90" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent dark:hidden" />
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-950 to-transparent hidden dark:block" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-950 to-transparent hidden dark:block" />
          </div>
          <div className="container-wide max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="section-label mb-4">Usługa</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Zapier vs Make
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Dwie najpopularniejsze platformy automatyzacji no-code na rynku.
                  Pomagamy wybrać właściwe narzędzie, zaprojektować workflow
                  i wdrożyć automatyzacje, które realnie oszczędzają czas i eliminują
                  ręczną pracę.
                </p>
              </div>
              <div className="relative mx-auto lg:mx-0 w-full max-w-md">
                <div className="rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-black/30 border border-gray-100 dark:border-gray-800">
                  <Image src="/photos/electronics.jpg" alt="Zapier vs Make — automatyzacja workflow" width={480} height={320} className="w-full h-auto object-cover" priority />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Czym są Zapier i Make */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Czym są Zapier i Make
              </h2>
              <div className="space-y-4 text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
                <p>
                  Zapier i Make (dawniej Integromat) to platformy no-code, które pozwalają
                  łączyć aplikacje i automatyzować przepływy danych bez pisania kodu.
                  Obie działają w chmurze i obsługują tysiące integracji — od CRM-ów,
                  przez narzędzia marketingowe, po systemy finansowe i bazy danych.
                </p>
                <p>
                  Różnią się podejściem. Zapier stawia na prostotę: liniowe przepływy
                  (trigger + action), ogromną bazę gotowych konektorów i szybkość
                  konfiguracji. Make daje wizualny builder scenariuszy z pełną kontrolą
                  nad logiką — rozgałęzienia, pętle, iteratory, routery, obsługa błędów
                  i transformacje danych na każdym kroku.
                </p>
                <p>
                  W Fluxlab pracujemy z obiema platformami na co dzień. Dobieramy
                  narzędzie do problemu, a nie odwrotnie. Czasem wystarczy prosty Zap,
                  czasem trzeba zbudować wieloetapowy scenariusz w Make, a czasem
                  najlepsza odpowiedź to połączenie obu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Kiedy Zapier, kiedy Make
              </h2>
              <div className="grid gap-6">
                {useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-8"
                  >
                    <div className="flex items-start gap-5">
                      <span className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/10 text-accent text-sm font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {uc.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {uc.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dla kogo + Ile to kosztuje */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Dla kogo
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Dla firm, które chcą automatyzować powtarzalne zadania bez budowania
                  własnego oprogramowania. Szczególnie dla zespołów sprzedaży, marketingu
                  i operacji, które codziennie przenoszą dane między narzędziami, wysyłają
                  powiadomienia ręcznie albo kopiują informacje z systemu do systemu.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ile to kosztuje
                </h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Koszt wdrożenia zależy od liczby automatyzacji, złożoności logiki
                  i integrowanych systemów. Do tego dochodzą koszty subskrypcji platformy.
                  Pomagamy dobrać plan i architekturę tak, żeby nie przepłacać za
                  operacje i utrzymać koszty pod kontrolą w miarę skalowania.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Najczęstsze pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                  >
                    <summary className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 text-gray-900 dark:text-white font-medium">
                      {item.question}
                      <svg
                        className="shrink-0 w-5 h-5 text-gray-400 transition-transform group-open:rotate-45"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-2xl mx-auto text-center bg-accent/5 dark:bg-accent/10 border border-accent/20 rounded-2xl p-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nie wiesz, czy wybrać Zapier czy Make?
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Opowiedz nam o swoim procesie, a dobierzemy narzędzie i zaprojektujemy workflow.
              </p>
              <Link href="/#kontakt" className="btn-primary px-8 py-3.5 text-base">
                Porozmawiajmy
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Powiązane usługi
              </h3>
              <ul className="space-y-3">
                {relatedServices.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
