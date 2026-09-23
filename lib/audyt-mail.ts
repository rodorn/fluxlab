/**
 * Raport z audytu w formie wiadomości.
 *
 * Ten sam dokument idzie do dwóch odbiorców, ale nie w tej samej postaci.
 * Klient dostaje raport. Ja dostaję raport plus to, czego klientowi pokazywać
 * nie ma po co: skąd przyszedł, czy zostawił zgodę i co z tego wynika dla
 * ewentualnej rozmowy. Dlatego jest tu jeden generator z przełącznikiem, a
 * nie dwa osobne, które po miesiącu rozjechałyby się treścią.
 */

import type { Ustalenie, Wycena } from "./audyt-ocena";
import type { RaportAI } from "./audyt-raport";
import type { Pomiar } from "./audyt-pomiar";

export type DaneRaportu = {
  domena: string;
  punkty: number | null;
  zbadano: string;
  pomiar: Pomiar;
  ustalenia: (Ustalenie & { material?: { tytul: string; href: string } | null })[];
  wycena: Wycena;
  dostepy: string[];
  opis: RaportAI | null;
};

const BAZA = "https://fluxlab.pl";

const KOLOR: Record<string, string> = {
  krytyczne: "#dc2626",
  wazne: "#d97706",
  drobne: "#6b7280",
};

const ETYKIETA_WAGI: Record<string, string> = {
  krytyczne: "Krytyczne",
  wazne: "Ważne",
  drobne: "Drobne",
};

const NAZWA_OBSZARU: Record<string, string> = {
  dostepnosc: "Dostępność i zaufanie",
  szybkosc: "Szybkość",
  mobile: "Wersja na telefon",
  seo: "Widoczność w wyszukiwarce",
  ai: "Widoczność dla asystentów AI",
  poczta: "Poczta firmowa",
};

function esc(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function waga(b: number | null): string {
  if (b === null) return "nie zmierzono";
  return b >= 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.round(b / 1024)} kB`;
}

function wiersz(nazwa: string, wartosc: string): string {
  return `<tr>
    <td style="padding:7px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-size:14px;width:58%">${esc(nazwa)}</td>
    <td style="padding:7px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600">${wartosc}</td>
  </tr>`;
}

function naglowekSekcji(tytul: string): string {
  return `<h2 style="margin:34px 0 12px;font-size:17px;color:#111827;border-bottom:2px solid #6366f1;padding-bottom:6px">${esc(tytul)}</h2>`;
}

/** Ocena słowna zamiast samej liczby. Liczba bez skali nic nie mówi. */
function slownie(p: number): string {
  if (p >= 90) return "bardzo dobry";
  if (p >= 75) return "dobry";
  if (p >= 55) return "wymaga poprawek";
  if (p >= 35) return "słaby";
  return "wymaga pilnej interwencji";
}

export function zlozRaportHtml(d: DaneRaportu, dlaWlasciciela: boolean): string {
  const p = d.pomiar;
  const m = p.mobile;
  const data = new Date(d.zbadano).toLocaleString("pl-PL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Warsaw",
  });

  const kolorPunktow =
    d.punkty === null ? "#6b7280" : d.punkty >= 75 ? "#059669" : d.punkty >= 45 ? "#d97706" : "#dc2626";

  const grupy = new Map<string, typeof d.ustalenia>();
  for (const u of d.ustalenia) {
    if (!grupy.has(u.obszar)) grupy.set(u.obszar, []);
    grupy.get(u.obszar)!.push(u);
  }

  const sekcjeOpisu = new Map(d.opis?.sekcje.map((s) => [s.obszar, s]) ?? []);

  const blokiUstalen = [...grupy.entries()]
    .map(([obszar, lista]) => {
      const komentarz = sekcjeOpisu.get(obszar);
      return `${naglowekSekcji(NAZWA_OBSZARU[obszar] ?? obszar)}
      ${
        komentarz
          ? `<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#374151">${esc(komentarz.tekst)}</p>`
          : ""
      }
      ${lista
        .map(
          (u) => `<div style="border-left:3px solid ${KOLOR[u.waga]};background:#f9fafb;padding:12px 14px;margin-bottom:10px;border-radius:0 6px 6px 0">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${KOLOR[u.waga]};font-weight:700;margin-bottom:3px">${ETYKIETA_WAGI[u.waga]}${u.koszt ? ` · naprawa ${u.koszt} zł` : ""}</div>
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:5px">${esc(u.tytul)}</div>
          <div style="font-size:13px;color:#374151;margin-bottom:5px"><strong>Zmierzono:</strong> ${esc(u.fakt)}</div>
          <div style="font-size:13px;color:#4b5563;line-height:1.6">${esc(u.skutek)}</div>
          ${
            u.samodzielnie
              ? `<div style="font-size:12px;color:#059669;margin-top:6px">Da się zrobić samodzielnie, bez programisty.</div>`
              : ""
          }
          ${
            u.material
              ? `<div style="font-size:12px;margin-top:6px"><a href="${BAZA}${u.material.href}" style="color:#4f46e5">Szerzej o tym: ${esc(u.material.tytul)}</a></div>`
              : ""
          }
        </div>`,
        )
        .join("")}`;
    })
    .join("");

  const tabelaPomiaru = `
  <table style="width:100%;border-collapse:collapse;margin:8px 0 0">
    ${wiersz("Czas do pierwszego bajtu, komputer", p.ttfbMs === null ? "nie zmierzono" : `${p.ttfbMs} ms`)}
    ${wiersz("Czas do pierwszego bajtu, telefon", m.ttfbMs === null ? "nie zmierzono" : `${m.ttfbMs} ms`)}
    ${wiersz("Waga dokumentu", waga(p.htmlBajty))}
    ${wiersz("Waga całości z plikami", waga(m.wagaCalosci))}
    ${wiersz("Plików zważonych", `${d.pomiar.zasoby.filter((z) => z.bajty !== null).length} z ${d.pomiar.zasoby.length} znalezionych`)}
    ${wiersz("Szacowany czas pobrania na łączu komórkowym", m.sekundNa4G === null ? "nie zmierzono" : `około ${m.sekundNa4G} s przy 1,6 Mb/s`)}
    ${wiersz("Kompresja dokumentu", p.kompresjaHtml ? esc(p.kompresjaHtml) : "brak")}
    ${wiersz("Serwer", p.serwer ? esc(p.serwer) : "nie podaje")}
    ${wiersz("Treść po odjęciu skryptów", `${p.trescZnakow} znaków`)}
  </table>`;

  const tabelaMobile = `
  <table style="width:100%;border-collapse:collapse;margin:8px 0 0">
    ${wiersz("Znacznik viewport", m.viewport ? esc(m.viewport) : "brak")}
    ${wiersz("Powiększanie dwoma palcami", m.blokujePowiekszanie ? "zablokowane" : "dozwolone")}
    ${wiersz("Reguły przestawiające układ (@media)", m.cssZnakow > 500 ? String(m.regulMedia) : "nie udało się przeczytać stylów")}
    ${wiersz("Sztywne szerokości w stylach", m.cssZnakow > 500 ? String(m.stalychSzerokosci) : "nie udało się przeczytać stylów")}
    ${wiersz("Obrazy bez wersji na mniejszy ekran", `${m.obrazowBezSrcset} z ${p.obrazy.wszystkie}`)}
    ${wiersz("Osobny dokument dla telefonu", m.osobnaWersja ? "tak" : "nie")}
  </table>`;

  const tabelaSeo = `
  <table style="width:100%;border-collapse:collapse;margin:8px 0 0">
    ${wiersz("Tytuł strony", p.tytul ? `${esc(p.tytul.slice(0, 70))}${p.tytul.length > 70 ? "…" : ""} (${p.tytul.length} zn.)` : "brak")}
    ${wiersz("Opis dla wyników wyszukiwania", p.opisMeta ? `${p.opisMeta.length} znaków` : "brak")}
    ${wiersz("Nagłówki pierwszego poziomu", String(p.h1.length))}
    ${wiersz("Adres podstawowy (canonical)", p.canonical ? "jest" : "brak")}
    ${wiersz("Zakaz indeksowania", p.noindex ? "TAK, strona prosi o pominięcie" : "nie")}
    ${wiersz("Mapa strony", p.sitemap.jest ? `jest${p.sitemap.adresow ? `, ${p.sitemap.adresow} adresów` : ""}` : "brak")}
    ${wiersz("Dane uporządkowane", p.daneStrukturalne.length ? esc(p.daneStrukturalne.slice(0, 5).join(", ")) : "brak")}
    ${wiersz("Znaczniki Open Graph", p.og ? "są" : "brak")}
    ${wiersz("Obrazy bez opisu alt", `${p.obrazy.bezAlt} z ${p.obrazy.wszystkie}`)}
    ${wiersz("Certyfikat", p.cert ? `${esc(p.cert.wystawca)}, ważny do ${p.cert.waznyDo} (${p.cert.dniDoKonca} dni)` : "nie odczytano")}
    ${wiersz("SPF / DMARC", `${p.poczta.spf ? "SPF jest" : "brak SPF"} · ${p.poczta.dmarc ? `DMARC ${p.poczta.dmarcPolityka ?? "jest"}` : "brak DMARC"}`)}
  </table>`;

  const blokWyceny = d.wycena.pakiet
    ? `${naglowekSekcji("Ile kosztuje doprowadzenie tego do porządku")}
    <div style="background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;padding:18px">
      <div style="font-size:14px;color:#3730a3;margin-bottom:10px">Naprawa wszystkiego, co wyżej, w jednym podejściu:</div>
      <div style="font-size:30px;font-weight:800;color:#312e81;line-height:1">${d.wycena.pakiet} zł</div>
      ${
        d.wycena.rabat > 0
          ? `<div style="font-size:13px;color:#4338ca;margin-top:6px">Osobno każda z tych poprawek kosztowałaby razem ${d.wycena.osobno} zł. Za komplet jest taniej o ${d.wycena.rabat} zł, bo dostępy, wdrożenie i testy robi się raz, a nie przy każdej pozycji od nowa.</div>`
          : ""
      }
      <div style="font-size:13px;color:#4b5563;margin-top:10px">Czas: około ${d.wycena.dniRobocze} ${d.wycena.dniRobocze === 1 ? "dzień roboczy" : "dni roboczych"} od otrzymania dostępów.</div>
      ${
        d.wycena.pilne
          ? `<div style="font-size:13px;color:#4b5563;margin-top:10px;padding-top:10px;border-top:1px solid #c7d2fe">Jeżeli budżet ma być mniejszy, sama warstwa krytyczna to <strong>${d.wycena.pilne} zł</strong>. Reszta może poczekać, te rzeczy nie mogą.</div>`
          : ""
      }
      <div style="font-size:12px;color:#6b7280;margin-top:12px">Ceny brutto, bez VAT (zwolnienie podmiotowe). Wycena jest wiążąca przez 30 dni od daty raportu. Jeżeli po wejściu w kod okaże się, że problem jest innego rzędu niż widać z zewnątrz, mówimy o tym przed rozpoczęciem pracy, a nie po.</div>
    </div>`
    : `${naglowekSekcji("Wycena")}
    <p style="font-size:14px;line-height:1.7;color:#374151">Nie znaleźliśmy nic, za co warto byłoby wziąć pieniądze. Strona przeszła wszystkie sprawdzenia, które wykonujemy z zewnątrz.</p>`;

  const blokDostepow = d.dostepy.length
    ? `${naglowekSekcji("Czego potrzebujemy, żeby to naprawić")}
    <p style="font-size:14px;line-height:1.7;color:#374151;margin:0 0 10px">Nie potrzebujemy haseł do niczego. Potrzebujemy dostępu nadanego na nasze konto, który możecie cofnąć jednym kliknięciem po zakończeniu pracy.</p>
    <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:1.9">
      ${d.dostepy.map((x) => `<li>${esc(x)}</li>`).join("")}
    </ul>
    <p style="font-size:13px;color:#6b7280;margin-top:12px">Jeżeli stroną opiekuje się agencja albo informatyk, wystarczy przesłać im tę listę. Część poprawek oznaczonych wyżej jako możliwe samodzielnie zrobicie bez niczyjej pomocy.</p>`
    : "";

  const blokKolejnosci = d.opis?.kolejnosc.length
    ? `${naglowekSekcji("Od czego zacząć")}
    <ol style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:1.7">
      ${d.opis.kolejnosc
        .map(
          (k) =>
            `<li style="margin-bottom:10px"><strong>${esc(k.krok)}</strong><br><span style="color:#6b7280">${esc(k.powod)}</span></li>`,
        )
        .join("")}
    </ol>`
    : "";

  const blokMocnych = d.opis?.mocneStrony.length
    ? `${naglowekSekcji("Co jest zrobione dobrze")}
    <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:1.9">
      ${d.opis.mocneStrony.map((x) => `<li>${esc(x)}</li>`).join("")}
    </ul>`
    : "";

  const blokWlasciciela = dlaWlasciciela
    ? `<div style="background:#fffbeb;border:1px solid #fcd34d;border-radius:8px;padding:14px;margin-bottom:22px">
      <div style="font-size:12px;font-weight:700;color:#92400e;text-transform:uppercase;letter-spacing:.06em">Kopia wewnętrzna</div>
      <div style="font-size:13px;color:#78350f;margin-top:6px">Ten raport wygenerował ktoś na stronie. Poniżej dokładnie to, co zobaczył.</div>
    </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Audyt ${esc(d.domena)}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
<div style="max-width:680px;margin:0 auto;background:#ffffff">
  <div style="background:linear-gradient(135deg,#1e1b4b,#4338ca);padding:30px 28px;color:#fff">
    <div style="font-size:12px;text-transform:uppercase;letter-spacing:.12em;opacity:.8">Fluxlab · audyt techniczny</div>
    <div style="font-size:26px;font-weight:800;margin-top:6px">${esc(d.domena)}</div>
    <div style="font-size:13px;opacity:.85;margin-top:4px">Badanie wykonane ${esc(data)}</div>
  </div>

  <div style="padding:26px 28px">
    ${blokWlasciciela}

    ${
      d.punkty === null
        ? `<div style="display:block;border:1px solid #e5e7eb;border-radius:10px;padding:18px;margin-bottom:22px">
      <div style="font-size:13px;color:#6b7280">Ocena ogólna</div>
      <div style="font-size:20px;font-weight:700;color:#6b7280;line-height:1.3">Nie wystawiamy oceny</div>
      <div style="font-size:14px;color:#374151;margin-top:4px">Nie zobaczyłem tej strony, więc liczba byłaby oceną czegoś innego niż Wasz serwis. Szczegóły niżej.</div>
    </div>`
        : `<div style="display:block;border:1px solid #e5e7eb;border-radius:10px;padding:18px;margin-bottom:22px">
      <div style="font-size:13px;color:#6b7280">Ocena ogólna</div>
      <div style="font-size:38px;font-weight:800;color:${kolorPunktow};line-height:1.1">${d.punkty}<span style="font-size:18px;color:#9ca3af">/100</span></div>
      <div style="font-size:14px;color:#374151;margin-top:2px">Stan ${slownie(d.punkty)}. Znalezionych spraw do poprawy: ${d.ustalenia.length}${
        d.ustalenia.filter((u) => u.waga === "krytyczne").length
          ? `, w tym ${d.ustalenia.filter((u) => u.waga === "krytyczne").length} krytycznych`
          : ""
      }.</div>
    </div>`
    }

    ${
      d.opis
        ? `<div style="background:#f9fafb;border-left:3px solid #4338ca;padding:16px 18px;border-radius:0 8px 8px 0;margin-bottom:8px">
      <div style="font-size:16px;font-weight:700;color:#111827;margin-bottom:8px">${esc(d.opis.werdykt)}</div>
      <div style="font-size:14px;line-height:1.75;color:#374151">${esc(d.opis.streszczenie)}</div>
    </div>`
        : ""
    }

    ${blokiUstalen}

    ${naglowekSekcji("Pomiar szybkości")}
    ${tabelaPomiaru}

    ${naglowekSekcji("Pomiar wersji na telefon")}
    ${tabelaMobile}

    ${naglowekSekcji("Stan techniczny widoczności")}
    ${tabelaSeo}

    ${blokKolejnosci}
    ${blokMocnych}
    ${blokWyceny}
    ${blokDostepow}

    ${naglowekSekcji("Jak to zmierzyliśmy i czego nie sprawdzałem")}
    <p style="font-size:13px;line-height:1.7;color:#4b5563;margin:0 0 10px">
      Wszystkie liczby w tym raporcie pochodzą z jednego badania wykonanego ${esc(data)} z serwera w Europie. Stronę pobrałem dwa razy: raz z nagłówkami komputera, raz z nagłówkami telefonu. Wagę plików liczymy z tego, co faktycznie przyszło, a nie z deklaracji serwera, i podajemy, ilu plików nie udało się zważyć.
    </p>
    <p style="font-size:13px;line-height:1.7;color:#4b5563;margin:0 0 10px">
      Czego tu nie ma, żeby nie było nieporozumień: nie uruchamiałem przeglądarki, więc nie mierzyłem czasu rysowania strony, przesunięć układu ani wyniku Lighthouse. Nie sprawdzałem treści pod kątem merytorycznym, nie oceniałem wyglądu i nie analizowałem konkurencji. Badałem stronę główną, nie każdą podstronę. Pojedynczy pomiar czasu zawsze zależy od chwili, więc wartości graniczne warto sprawdzić drugi raz.
    </p>
    <p style="font-size:13px;line-height:1.7;color:#4b5563;margin:0">
      Raport jest bezpłatny i nie zobowiązuje do niczego. Jeżeli coś w nim budzi wątpliwość, napiszcie, sprawdzimy to jeszcze raz i wytłumaczymy, skąd wzięła się liczba.
    </p>

    <div style="margin-top:28px;padding-top:18px;border-top:1px solid #e5e7eb">
      <a href="${BAZA}/kontakt" style="display:inline-block;background:#4338ca;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:700;font-size:15px">Zlecam naprawę${d.wycena.pakiet ? ` za ${d.wycena.pakiet} zł` : ""}</a>
      <div style="font-size:13px;color:#6b7280;margin-top:12px">Albo odpisz na tę wiadomość, jeżeli chcesz najpierw o czymś dopytać.</div>
    </div>
  </div>

  <div style="padding:18px 28px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;line-height:1.6">
    Fluxlab, Paweł Iwanek · <a href="${BAZA}" style="color:#4f46e5">fluxlab.pl</a> · pawel@fluxlab.pl<br>
    ${
      dlaWlasciciela
        ? "Kopia wewnętrzna raportu wygenerowanego przez odwiedzającego."
        : `Dostajesz tę wiadomość, bo poprosiłeś o przesłanie raportu z audytu ${esc(d.domena)} i zaznaczyłeś zgodę na kontakt. Żeby ją wycofać, odpisz jednym słowem, usuwamy adres tego samego dnia.`
    }
  </div>
</div>
</body></html>`;
}

/** Wersja tekstowa, bo część programów pocztowych nie pokazuje HTML. */
export function zlozRaportTekst(d: DaneRaportu): string {
  const l: string[] = [];
  l.push(`AUDYT TECHNICZNY: ${d.domena}`);
  l.push(`Wykonano: ${new Date(d.zbadano).toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" })}`);
  l.push(
    d.punkty === null
      ? "Ocena: nie wystawiamy, bo nie zobaczyłem tej strony."
      : `Ocena: ${d.punkty}/100, stan ${slownie(d.punkty)}`,
  );
  l.push("");
  if (d.opis) {
    l.push(d.opis.werdykt);
    l.push("");
    l.push(d.opis.streszczenie);
    l.push("");
  }
  l.push(`USTALENIA (${d.ustalenia.length})`);
  for (const u of d.ustalenia) {
    l.push(`- [${ETYKIETA_WAGI[u.waga]}] ${u.tytul}`);
    l.push(`  Zmierzono: ${u.fakt}`);
    l.push(`  Skutek: ${u.skutek}`);
    if (u.koszt) l.push(`  Naprawa: ${u.koszt} zł${u.samodzielnie ? " (da się samodzielnie)" : ""}`);
  }
  l.push("");
  if (d.wycena.pakiet) {
    l.push(`WYCENA: ${d.wycena.pakiet} zł za komplet (osobno ${d.wycena.osobno} zł).`);
    if (d.wycena.pilne) l.push(`Sama warstwa krytyczna: ${d.wycena.pilne} zł.`);
    l.push(`Czas: około ${d.wycena.dniRobocze} dni roboczych od dostępów.`);
  }
  if (d.dostepy.length) {
    l.push("");
    l.push("POTRZEBNE DOSTĘPY: " + d.dostepy.join("; "));
  }
  l.push("");
  l.push("Pomiar wykonany bez uruchamiania przeglądarki, więc bez czasu rysowania i bez wyniku Lighthouse.");
  l.push("fluxlab.pl · pawel@fluxlab.pl");
  return l.join("\n");
}
