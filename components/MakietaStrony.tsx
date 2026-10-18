"use client";

import { useState } from "react";
import { zglosZdarzenie } from "@/lib/zdarzenie";

type Wynik = {
  strona: {
    adres: string;
    host: string;
    nazwa: string;
    tytul: string;
    opis: string;
    naglowki: string[];
    kolor: string;
    logo: string;
    favicon: string;
  };
  hero: { naglowek: string; podtytul: string; korzysci: string[]; przycisk: string };
};

function tekstNa(hex: string): string {
  const k = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const l = 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
  return l > 0.4 ? "#111827" : "#ffffff";
}

function doFormularza(tekst: string) {
  const msg = document.getElementById("message") as HTMLTextAreaElement | null;
  if (msg) {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set?.call(msg, tekst);
    msg.dispatchEvent(new Event("input", { bubbles: true }));
  }
  document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    (document.getElementById("email") as HTMLInputElement | null)?.focus({ preventScroll: true });
  }, 600);
}

export default function MakietaStrony() {
  const [zakladka, setZakladka] = useState<"makieta" | "naglowek">("makieta");
  const [adres, setAdres] = useState("");
  const [ladowanie, setLadowanie] = useState(false);
  const [blad, setBlad] = useState("");
  const [wynik, setWynik] = useState<Wynik | null>(null);
  const [bezLogo, setBezLogo] = useState(false);
  const [bezFavicon, setBezFavicon] = useState(false);

  const [opis, setOpis] = useState("");
  const [lad2, setLad2] = useState(false);
  const [blad2, setBlad2] = useState("");
  const [naglowki, setNaglowki] = useState<string[]>([]);
  const [skopiowano, setSkopiowano] = useState(-1);

  async function wywolaj(url: string, dane: object) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dane),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || "Coś poszło nie tak. Spróbuj jeszcze raz.");
    return json;
  }

  async function zrob(e: React.FormEvent) {
    e.preventDefault();
    if (ladowanie) return;
    setBlad("");
    setLadowanie(true);
    zglosZdarzenie("makieta_strony");
    try {
      const w = (await wywolaj("/api/makieta", { adres })) as Wynik;
      setWynik(w);
      setBezLogo(false);
      setBezFavicon(false);
    } catch (err) {
      setBlad(err instanceof Error ? err.message : "Brak połączenia. Spróbuj jeszcze raz.");
    } finally {
      setLadowanie(false);
    }
  }

  async function zrobNaglowki(e: React.FormEvent) {
    e.preventDefault();
    if (lad2) return;
    if (opis.trim().length < 10) {
      setBlad2("Napisz o firmie choć jedno krótkie zdanie (min. 10 znaków).");
      return;
    }
    setBlad2("");
    setLad2(true);
    zglosZdarzenie("naglowek_ai");
    try {
      const w = await wywolaj("/api/naglowek", { opis: opis.trim() });
      setNaglowki(w.naglowki as string[]);
      setSkopiowano(-1);
    } catch (err) {
      setBlad2(err instanceof Error ? err.message : "Brak połączenia. Spróbuj jeszcze raz.");
    } finally {
      setLad2(false);
    }
  }

  async function kopiuj(t: string, i: number) {
    try {
      await navigator.clipboard.writeText(t);
      setSkopiowano(i);
    } catch {
      setBlad2("Nie udało się skopiować, zaznacz tekst ręcznie.");
    }
  }

  const poleKlasa =
    "min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100";
  const zakladkaKlasa = (aktywna: boolean) =>
    `rounded-2xl px-5 py-2 text-sm font-semibold transition-colors ${
      aktywna
        ? "bg-accent-solid text-white"
        : "border border-gray-300 text-gray-700 hover:border-accent dark:border-gray-700 dark:text-gray-300"
    }`;

  const kolor = wynik?.strona.kolor ?? "#4f46e5";
  const na = tekstNa(kolor);

  return (
    <section id="makieta-strony" aria-labelledby="makieta-heading" className="scroll-mt-20 container-wide">
      <div className="mx-auto max-w-5xl py-10 lg:py-12">
        <h2 id="makieta-heading" className="h2-sekcji mb-3 text-center">
          Twoja strona obok naszej wersji
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Wpisz adres swojej strony. Pobierzemy jej tytuł, opis i kolor, a AI napisze nowe górne okno w Twoich barwach.
        </p>

        <div role="tablist" aria-label="Narzędzie" className="mb-6 flex flex-wrap justify-center gap-2">
          <button type="button" role="tab" aria-selected={zakladka === "makieta"} onClick={() => setZakladka("makieta")} className={zakladkaKlasa(zakladka === "makieta")}>
            Twoja strona obok naszej
          </button>
          <button type="button" role="tab" aria-selected={zakladka === "naglowek"} onClick={() => setZakladka("naglowek")} className={zakladkaKlasa(zakladka === "naglowek")}>
            Nagłówek dla firmy
          </button>
        </div>

        {zakladka === "makieta" && (
          <div role="tabpanel">
            <form onSubmit={zrob} className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label htmlFor="mk-adres" className="sr-only">Adres Twojej strony</label>
              <input
                id="mk-adres"
                type="text"
                inputMode="url"
                value={adres}
                maxLength={300}
                onChange={(e) => setAdres(e.target.value)}
                placeholder="np. twojafirma.pl"
                className={poleKlasa}
              />
              <button type="submit" disabled={ladowanie} className="btn-primary disabled:opacity-60">
                {ladowanie ? "Czytamy stronę..." : "Pokaż obok siebie"}
              </button>
            </form>
            {blad && <p role="alert" className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{blad}</p>}

            {(ladowanie || wynik) && (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2" aria-busy={ladowanie}>
                <div className="min-w-0">
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Dziś</p>
                  <div className="h-full break-words rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                    {ladowanie || !wynik ? (
                      <div role="status" aria-label="Wczytywanie" className="space-y-3">
                        <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          {wynik.strona.favicon && !bezFavicon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={wynik.strona.favicon} alt="" width={28} height={28} referrerPolicy="no-referrer" onError={() => setBezFavicon(true)} className="h-7 w-7 rounded" />
                          ) : (
                            <span className="h-7 w-7 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
                          )}
                          <span className="min-w-0 truncate text-sm text-gray-500 dark:text-gray-400">{wynik.strona.host}</span>
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{wynik.strona.tytul || wynik.strona.nazwa}</h3>
                        {wynik.strona.opis && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{wynik.strona.opis}</p>}
                        {wynik.strona.naglowki.length > 0 && (
                          <ul className="mt-4 space-y-1 border-t border-gray-100 pt-3 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300">
                            {wynik.strona.naglowki.map((n) => (<li key={n} className="truncate">{n}</li>))}
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Nasza wersja</p>
                  <div className="h-full break-words overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
                    {ladowanie || !wynik ? (
                      <div role="status" aria-label="Piszemy" className="flex h-full flex-col items-center gap-3 p-8">
                        <div className="h-7 w-4/5 animate-pulse rounded bg-gray-300/70 dark:bg-gray-700" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                        <div className="mt-3 h-10 w-36 animate-pulse rounded-xl bg-gray-300/70 dark:bg-gray-700" />
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 px-6 py-3" style={{ background: kolor, color: na }}>
                          {wynik.strona.logo && !bezLogo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={wynik.strona.logo} alt="" width={24} height={24} referrerPolicy="no-referrer" onError={() => setBezLogo(true)} className="h-6 w-6 rounded bg-white/90 object-contain" />
                          ) : null}
                          <span className="truncate text-sm font-semibold">{wynik.strona.nazwa}</span>
                        </div>
                        <div className="px-6 py-8 text-center">
                          <h3 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">{wynik.hero.naglowek}</h3>
                          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{wynik.hero.podtytul}</p>
                          <ul className="mt-5 space-y-2 text-left text-sm text-gray-800 dark:text-gray-200">
                            {wynik.hero.korzysci.map((k) => (
                              <li key={k} className="flex items-start gap-2">
                                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: kolor }} />
                                <span>{k}</span>
                              </li>
                            ))}
                          </ul>
                          <span className="mt-6 inline-block rounded-xl px-6 py-3 text-sm font-semibold" style={{ background: kolor, color: na }}>
                            {wynik.hero.przycisk}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {wynik && !ladowanie && (
              <div className="mt-10 text-center">
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  Wersja poglądowa, prawdziwy projekt robimy z Tobą
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => doFormularza(`Strona ${wynik.strona.host}. Chcę taką stronę. Nagłówek z makiety: ${wynik.hero.naglowek}`)}
                >
                  Chcę taką stronę
                </button>
              </div>
            )}
          </div>
        )}

        {zakladka === "naglowek" && (
          <div role="tabpanel">
            <form onSubmit={zrobNaglowki} className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row">
              <label htmlFor="ng-opis" className="sr-only">Czym zajmuje się Twoja firma</label>
              <input
                id="ng-opis"
                type="text"
                value={opis}
                maxLength={300}
                onChange={(e) => setOpis(e.target.value)}
                placeholder="Czym zajmuje się Twoja firma? np. księgowość dla małych sklepów"
                className={poleKlasa}
              />
              <button type="submit" disabled={lad2} className="btn-primary disabled:opacity-60">
                {lad2 ? "Piszemy..." : "Podaj 3 nagłówki"}
              </button>
            </form>
            {blad2 && <p role="alert" className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{blad2}</p>}
            {naglowki.length > 0 && (
              <ul className="mx-auto mt-8 max-w-2xl space-y-3">
                {naglowki.map((n, i) => (
                  <li key={n} className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">{n}</span>
                    <button type="button" onClick={() => kopiuj(n, i)} className="shrink-0 rounded-xl border border-gray-300 px-4 py-1.5 text-sm font-semibold text-gray-700 hover:border-accent dark:border-gray-700 dark:text-gray-300">
                      {skopiowano === i ? "Skopiowano" : "Kopiuj"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
