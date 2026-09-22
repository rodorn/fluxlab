import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  PANEL_COOKIE,
  getGatePassword,
  getPanelLinks,
  isSessionValid,
} from "./gate";

// Bez tego build bez PANEL_GATE_PASSWORD prerenderuje 404 i utrwala je na stałe.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Panel Fluxdesk",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";

const cardClass =
  "rounded-2xl p-6 lg:p-8 bg-white/70 dark:bg-white/5 backdrop-blur-sm ring-1 ring-gray-200/60 dark:ring-white/10";

export default async function PanelPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const password = getGatePassword();
  if (!password) notFound();

  const store = await cookies();
  const authorized = isSessionValid(store.get(PANEL_COOKIE)?.value, password);
  const { e } = await searchParams;

  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center">
        <div className="container-wide py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="section-label mb-3">Fluxdesk</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {authorized ? "Wejście do panelu" : "Panel jest na hasło"}
            </h1>

            {authorized ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Odnośnik otworzy panel tylko na urządzeniu podłączonym do
                  Twojego tailnetu. Z innej sieci, bez Tailscale, adres nie
                  odpowie.
                </p>

                <div className="grid gap-3 mb-8">
                  {getPanelLinks().map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`${cardClass} card-lift block hover:ring-accent/40 transition-all group`}
                    >
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                        {link.label}
                      </p>
                      <p className="mt-1 font-mono text-sm text-accent break-all">
                        {link.url}
                      </p>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-snug">
                        {link.hint}
                      </p>
                    </a>
                  ))}
                </div>

                <form action="/api/panel" method="post">
                  <input type="hidden" name="intent" value="logout" />
                  <button
                    type="submit"
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
                  >
                    Wyloguj z tej strony
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                  Ta strona trzyma tylko adresy panelu. Sam panel nie jest
                  wystawiony do internetu.
                </p>

                <form action="/api/panel" method="post" className={cardClass}>
                  <label
                    htmlFor="panel-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Hasło
                  </label>
                  <input
                    id="panel-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className={inputClass}
                  />

                  {e ? (
                    <p className="mt-3 text-sm text-red-600 dark:text-red-400">
                      Nieprawidłowe hasło. Kolejna próba będzie przyjęta z
                      opóźnieniem.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto mt-5"
                  >
                    Wejdź
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
