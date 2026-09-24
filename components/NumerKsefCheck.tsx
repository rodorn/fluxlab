"use client";

import { useState } from "react";
import Przyklady from "@/components/Przyklady";
import { zglosZdarzenie } from "@/lib/zdarzenie";

// Wszystko liczymy w przegladarce. Numer KSeF ma sume kontrolna CRC-8
// (wielomian 0x07, start 0x00) liczona z pierwszych 32 znakow razem z
// myslnikami, wiec literowke da sie wykryc bez pytania KSeF o cokolwiek.
function crc8(tekst: string): string {
  let c = 0;
  for (let i = 0; i < tekst.length; i++) {
    c ^= tekst.charCodeAt(i);
    for (let b = 0; b < 8; b++) {
      c = c & 0x80 ? ((c << 1) ^ 0x07) & 0xff : (c << 1) & 0xff;
    }
  }
  return c.toString(16).toUpperCase().padStart(2, "0");
}

const WAGI_NIP = [6, 5, 7, 2, 3, 4, 5, 6, 7];

function nipPoprawny(nip: string): boolean {
  const suma = WAGI_NIP.reduce((s, w, i) => s + w * Number(nip[i]), 0);
  return suma % 11 !== 10 && suma % 11 === Number(nip[9]);
}

type Wynik = {
  wejscie: string;
  numer?: string;
  poprawny: boolean;
  nip?: string;
  data?: string;
  uwagi: string[];
};

const WZORZEC =
  /\d{10}\s*-?\s*\d{8}\s*-?\s*[0-9A-FO]{12}\s*-?\s*[0-9A-FO]{2}(?![0-9A-F])/g;

function sprawdzLinie(linia: string): Wynik[] {
  const duze = linia.toUpperCase();
  const trafienia = duze.match(WZORZEC);
  if (!trafienia) {
    const znaki = duze.replace(/[^0-9A-Z]/g, "").length;
    return [
      {
        wejscie: linia.trim(),
        poprawny: false,
        uwagi: [
          `To nie ma układu numeru KSeF. Numer ma 35 znaków w postaci NIP-RRRRMMDD-12 znaków-2 znaki, a tu jest ${znaki} liter i cyfr.`,
        ],
      },
    ];
  }
  return trafienia.map((t) => {
    const czyste = t.replace(/[\s-]/g, "").replace(/O/g, "0");
    const nip = czyste.slice(0, 10);
    const data = czyste.slice(10, 18);
    const tech = czyste.slice(18, 30);
    const suma = czyste.slice(30, 32);
    const numer = `${nip}-${data}-${tech}-${suma}`;
    const uwagi: string[] = [];
    let poprawny = true;

    if (/O/.test(t)) {
      uwagi.push(
        "Litera O zamieniona na cyfrę 0, w numerze KSeF nie ma litery O.",
      );
    }
    if (t.replace(/\s/g, "") !== numer && !/O/.test(t)) {
      uwagi.push(
        "Uzupełniliśmy myślniki albo usunęliśmy spacje, sam numer się nie zmienił.",
      );
    }

    const oczekiwana = crc8(`${nip}-${data}-${tech}`);
    if (oczekiwana !== suma) {
      poprawny = false;
      uwagi.push(
        `Suma kontrolna się nie zgadza: na końcu jest ${suma}, a dla tych znaków powinno być ${oczekiwana}. W numerze jest literówka.`,
      );
    }
    if (!nipPoprawny(nip)) {
      poprawny = false;
      uwagi.push(
        `Pierwsze 10 cyfr (${nip}) nie jest poprawnym NIP-em sprzedawcy.`,
      );
    }

    const r = Number(data.slice(0, 4));
    const m = Number(data.slice(4, 6));
    const d = Number(data.slice(6, 8));
    const dzien = new Date(Date.UTC(r, m - 1, d));
    const dataOk =
      dzien.getUTCFullYear() === r &&
      dzien.getUTCMonth() === m - 1 &&
      dzien.getUTCDate() === d;
    if (!dataOk) {
      poprawny = false;
      uwagi.push(`Cyfry ${data} nie tworzą prawdziwej daty.`);
    } else if (r < 2022) {
      poprawny = false;
      uwagi.push(
        "Data przed 1 stycznia 2022, kiedy KSeF zaczął przyjmować faktury.",
      );
    } else if (dzien.getTime() > Date.now()) {
      poprawny = false;
      uwagi.push(
        "Data przyjęcia faktury jest w przyszłości, taki numer nie mógł jeszcze powstać.",
      );
    }

    return {
      wejscie: t.trim(),
      numer,
      poprawny,
      nip,
      data: dataOk
        ? `${data.slice(6, 8)}.${data.slice(4, 6)}.${data.slice(0, 4)}`
        : undefined,
      uwagi,
    };
  });
}

export default function NumerKsefCheck() {
  const [tekst, setTekst] = useState("");
  const [wyniki, setWyniki] = useState<Wynik[] | null>(null);

  function uruchom(wartosc: string) {
    if (!wartosc.trim()) return;
    setTekst(wartosc);
    zglosZdarzenie("uruchomiono_numer_ksef");
    setWyniki(
      wartosc
        .split(/\r?\n/)
        .filter((l) => l.trim())
        .flatMap(sprawdzLinie),
    );
  }

  const dobre = wyniki?.filter((w) => w.poprawny).length ?? 0;

  return (
    <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/50 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Sprawdźcie numer KSeF przed przelewem
      </h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Wklejcie jeden numer albo całą listę, po jednym w wierszu. Mogą być całe
        tytuły przelewów, numery wyłuskamy sami. Liczymy wszystko w
        przeglądarce, nic nie wysyłamy.
      </p>
      <Przyklady
        pozycje={[
          {
            wartosc: "5265877635-20250826-0100001AF629-AF",
            etykieta: "Numer z dokumentacji MF",
          },
          {
            wartosc:
              "Zapłata za FV 12/08/2025, KSeF 5265877635-20250826-0100001AF629-A7",
            etykieta: "Tytuł przelewu z literówką",
          },
        ]}
        onWybor={uruchom}
        wstep="Nie macie pod ręką numeru? Zobaczcie na gotowym przykładzie:"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uruchom(tekst);
        }}
        className="mt-5 flex flex-col gap-3"
      >
        <textarea
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          rows={4}
          spellCheck={false}
          placeholder="Numer KSeF, na przykład 5265877635-20250826-0100001AF629-AF"
          aria-label="Numery KSeF do sprawdzenia"
          className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 font-mono text-sm text-gray-900 dark:text-white outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={!tekst.trim()}
          className="btn-primary justify-center px-6 text-sm disabled:opacity-50 sm:self-start"
        >
          Sprawdź numery
        </button>
      </form>

      {wyniki && (
        <div className="mt-5">
          {wyniki.length > 1 && (
            <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              Poprawnych {dobre} z {wyniki.length}.
            </p>
          )}
          <ul className="space-y-3">
            {wyniki.map((w, i) => (
              <li
                key={i}
                className={`rounded-xl border p-4 ${
                  w.poprawny
                    ? "border-emerald-500/60 bg-emerald-50 dark:bg-emerald-950/30"
                    : "border-red-500/60 bg-red-50 dark:bg-red-950/30"
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-wider ${
                    w.poprawny
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {w.poprawny ? "Numer poprawny" : "Numer błędny"}
                </p>
                <p className="mt-1 break-all font-mono text-sm text-gray-900 dark:text-white">
                  {w.numer ?? w.wejscie}
                </p>
                {w.nip && (
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    NIP sprzedawcy: {w.nip}
                    {w.data && <>, faktura przyjęta w KSeF {w.data}</>}
                  </p>
                )}
                {w.uwagi.map((u) => (
                  <p
                    key={u}
                    className="mt-1 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {u}
                  </p>
                ))}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Poprawna suma kontrolna oznacza, że numer nie ma literówki. Czy
            faktura o tym numerze naprawdę istnieje, potwierdza dopiero KSeF.
          </p>
        </div>
      )}
    </div>
  );
}
