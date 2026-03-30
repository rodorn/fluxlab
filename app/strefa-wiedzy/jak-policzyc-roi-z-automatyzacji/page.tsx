import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Jak policzyć ROI z automatyzacji w firmie | Fluxlab",
  description:
    "Sprawdź, jak realnie policzyć ROI z automatyzacji: czas, koszt pracy, błędy, opóźnienia i skala procesu. Prosty model bez marketingowej ściemy.",
};

export default function RoiAutomatyzacjiArticle() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gray-50 dark:bg-gray-900/50 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="section-label">Strefa wiedzy</span>
            <h1 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Jak policzyć ROI z automatyzacji
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Wiele firm wie, że automatyzacja &bdquo;powinna się
              opłacać&rdquo;, ale nie potrafi policzyć tego w prosty sposób.
              Efekt jest taki, że decyzje są odkładane, bo nikt nie chce
              inwestować w coś, czego nie da się obronić liczbami. Na szczęście
              w większości przypadków ROI z automatyzacji da się policzyć
              szybciej, niż się wydaje.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-16">
            {/* Section 1 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Najprostszy wzór
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed font-mono text-sm bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                ROI = (roczna korzyść z automatyzacji &minus; koszt wdrożenia
                &minus; koszt utrzymania) / koszt wdrożenia
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Nie komplikuj tego bardziej, niż trzeba. Na początku wystarczy
                oszacować trzy rzeczy:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  ile czasu miesięcznie znika dziś na ręczną pracę,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  ile kosztuje godzina tej pracy,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  ile błędów, opóźnień lub utraconych szans powoduje obecny
                  proces.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Co liczyć po stronie korzyści
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Najłatwiej policzyć oszczędność czasu. Jeżeli zespół spędza 20
                godzin miesięcznie na ręcznym przenoszeniu danych, a koszt tej
                pracy wynosi 80 zł za godzinę, to sam ten element daje 1600 zł
                miesięcznie oszczędności.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Ale czas to nie wszystko. Dolicz także:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  mniej błędów w danych,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  szybszy czas reakcji na leady,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  mniej utraconych szans sprzedażowych,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  mniej pracy koordynacyjnej między ludźmi,
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-accent shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  większą przewidywalność procesu.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Gdzie firmy najczęściej zaniżają ROI
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Najczęstszy błąd to liczenie tylko &bdquo;czystego
                klikania&rdquo;, a pomijanie chaosu wokół procesu. Ręczna praca
                to nie tylko samo kopiowanie danych, ale też poprawianie błędów,
                pytania na czacie, przypominanie ludziom o zadaniach i
                opóźnienia w kolejnych etapach.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Drugi błąd to liczenie zbyt optymistyczne. Nie zakładaj, że
                automatyzacja zlikwiduje 100% ręcznej pracy. Lepszy model to
                policzyć 50&ndash;80% redukcji czasu w konkretnym obszarze.
              </p>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Przykład
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Załóżmy, że firma traci 15 godzin miesięcznie na ręczne
                przepisywanie danych do CRM i przygotowanie raportu. Koszt
                godziny pracy to 90 zł. To daje 1350 zł miesięcznie, czyli
                16&nbsp;200 zł rocznie. Jeśli wdrożenie kosztuje 5000 zł, a
                miesięczne utrzymanie 200 zł, to roczny koszt wyniesie 7400 zł.
                Korzyść netto to 8800 zł, a ROI jest dodatnie już w pierwszym
                roku.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                To prosty model, ale wystarcza do podjęcia decyzji. Dokładniejsze
                liczenie ma sens dopiero wtedy, gdy proces jest duży i krytyczny.
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Jak podejść do tematu rozsądnie
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                Nie potrzebujesz idealnego Excela. Potrzebujesz uczciwego
                przybliżenia. Jeśli proces jest częsty, kosztowny i powtarzalny,
                to prawdopodobnie automatyzacja ma sens ekonomiczny. Najpierw
                policz wersję prostą, a dopiero potem schodź w szczegóły.
              </p>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/50 p-8 lg:p-12 text-center">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Chcesz policzyć ROI dla konkretnego procesu, a nie w teorii?
              </p>
              <Link
                href="/automatyzacja-procesow-biznesowych"
                className="btn-primary mt-6 inline-block"
              >
                Zobacz usługę Automatyzacja procesów biznesowych
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
