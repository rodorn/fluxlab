"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: integrate with email service (e.g. Resend)
    setSubmitted(true);
  }

  return (
    <section id="kontakt" className="py-20 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-3">Kontakt</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Zacznijmy od rozmowy
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12">
            Napisz kilka słów o swoim procesie — odpiszę w ciągu 24 godzin
            i zaproponuję termin bezpłatnej konsultacji.
          </p>

          {submitted ? (
            <div className="bg-accent-light dark:bg-accent-dark-light rounded-2xl p-10">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Wiadomość wysłana!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Odpiszę najszybciej jak to możliwe, zwykle w ciągu kilku godzin.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-8 shadow-sm text-left space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jan Kowalski"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Firma
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Nazwa firmy"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Adres e-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jan@firma.pl"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Opisz proces, który chcesz zautomatyzować
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Np. Co tydzień ręcznie przenoszę dane z 5 arkuszy do raportu PDF i wysyłam go do 3 osób..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3.5 text-base">
                Wyślij wiadomość
              </button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                Dane są bezpieczne i nie będą udostępniane osobom trzecim.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
