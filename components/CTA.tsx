"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";

export default function CTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [showContactTime, setShowContactTime] = useState(false);
  const [contactTimeVisible, setContactTimeVisible] = useState(false);

  function handleContactMethodChange(method: "email" | "phone") {
    if (method === contactMethod) return;
    setContactMethod(method);
    if (method === "phone") {
      setShowContactTime(true);
      setTimeout(() => setContactTimeVisible(true), 16);
    } else {
      setContactTimeVisible(false);
      setTimeout(() => setShowContactTime(false), 300);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      contactMethod,
      contactTime: contactMethod === "phone"
        ? (form.elements.namedItem("contactTime") as HTMLInputElement).value
        : "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(true);
    }
  }

  return (
    <section id="kontakt" className="scroll-mt-16 py-4 lg:py-7">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label mb-3">Kontakt</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Zacznijmy od rozmowy
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12">
            Napisz kilka słów o swoim procesie - odpiszę w ciągu 24 godzin
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

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Numer telefonu
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="500 000 000"
                    className={inputClass}
                  />
                </div>
                <div>
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Preferowany kontakt
                  </p>
                  <div className="relative flex bg-gray-100 dark:bg-gray-900/60 rounded-lg p-0.5">
                    {/* sliding indicator */}
                    <div
                      className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-md shadow-sm transition-transform duration-200 ease-in-out ${
                        contactMethod === "phone" ? "translate-x-full" : "translate-x-0"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => handleContactMethodChange("email")}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        contactMethod === "email"
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      E-mail
                    </button>
                    <button
                      type="button"
                      onClick={() => handleContactMethodChange("phone")}
                      className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        contactMethod === "phone"
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      }`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      Telefon
                    </button>
                  </div>
                </div>
              </div>

              {showContactTime && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    contactTimeVisible
                      ? "max-h-28 opacity-100"
                      : "max-h-0 opacity-0 !mt-0"
                  }`}
                >
                  <label
                    htmlFor="contactTime"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                  >
                    Preferowany czas kontaktu
                  </label>
                  <input
                    id="contactTime"
                    name="contactTime"
                    type="text"
                    placeholder="Np. pon-pt 10:00-14:00"
                    className={inputClass}
                  />
                </div>
              )}

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

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base disabled:opacity-60">
                {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
              </button>

              {error && (
                <p className="text-center text-sm text-red-500">
                  Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na iwanekpawel55@gmail.com.
                </p>
              )}

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