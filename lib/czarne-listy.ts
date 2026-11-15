import { esc, ramkaMaila } from "@/lib/fl-produkty";
import { wolajVps } from "@/lib/prodit";

export const PRODUKT_CL = "czarne-listy";
export const LIMIT_DOMEN = 3;

export type Pozycja = { lista: string; nazwa: string; cel: string; status: "czysto" | "lista" | "brak"; link: string };
export type Wynik = {
  domena: string;
  sprawdzono: number;
  na_liscie: number;
  bez_odpowiedzi: number;
  adresy: string[];
  uwagi: string[];
  wyniki: Pozycja[];
};
/** Wpis subskrypcji: domena i opcjonalnie serwer wysyłkowy, w metadanych Stripe jako JSON. */
export type Wpis = { d: string; s?: string };
export type Stan = Record<string, string[]>;

export async function sprawdzNaVps(domena: string, serwer: string, ip: string): Promise<Wynik> {
  const r = await wolajVps("/czarne-listy/sprawdz", { domena, serwer, ip }, 45000);
  if (r.status !== 200) {
    const err = new Error(String(r.dane.error ?? "Chwilowa awaria. Spróbuj za kilka minut."));
    (err as Error & { kod?: number }).kod = r.status;
    throw err;
  }
  return r.dane as unknown as Wynik;
}

export const wpisy = (meta: Record<string, string>): Wpis[] => {
  try {
    return JSON.parse(meta.fl_domeny ?? "[]");
  } catch {
    return [];
  }
};
export const stanZ = (meta: Record<string, string>): Stan => {
  try {
    return JSON.parse(meta.fl_stan ?? "{}");
  } catch {
    return {};
  }
};

/** Identyfikatory list, na których jest którykolwiek sprawdzany adres. */
export const naListach = (w: Wynik): string[] =>
  [...new Set(w.wyniki.filter((x) => x.status === "lista").map((x) => x.lista))].sort();

function zbiorczo(w: Pozycja[]) {
  const po = new Map<string, { nazwa: string; link: string; status: Pozycja["status"]; cele: string[] }>();
  for (const x of w) {
    const z = po.get(x.lista) ?? { nazwa: x.nazwa, link: x.link, status: "czysto" as Pozycja["status"], cele: [] };
    if (x.status === "lista") {
      z.status = "lista";
      z.cele.push(x.cel);
    } else if (x.status === "brak" && z.status === "czysto") z.status = "brak";
    po.set(x.lista, z);
  }
  return [...po.entries()].map(([id, v]) => ({ id, ...v }));
}

const KOL = { czysto: ["#1A7F4B", "czysto"], lista: ["#C0262D", "NA LIŚCIE"], brak: ["#59596D", "brak odpowiedzi"] } as const;

function tabela(w: Wynik) {
  const wiersze = zbiorczo(w.wyniki)
    .map((l) => {
      const [kol, txt] = KOL[l.status];
      const pod = l.cele.length ? `<br><span style="font-size:12px;color:#C0262D">${esc(l.cele.join(", "))}</span>` : "";
      return `<tr><td style="padding:9px 0;border-top:1px solid #E3E3EC;font-size:14px"><a href="${esc(l.link)}" style="color:#1A1A35">${esc(l.nazwa)}</a>${pod}</td><td style="padding:9px 0;border-top:1px solid #E3E3EC;text-align:right;font-weight:700;font-size:13px;color:${kol};white-space:nowrap">${txt}</td></tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">${wiersze}</table>`;
}

const nazwyZ = (w: Wynik, ids: string[]) => zbiorczo(w.wyniki).filter((l) => ids.includes(l.id)).map((l) => l.nazwa);

const PRZYCZYNY =
  "Najpierw usuń przyczynę: przejęte konto pocztowe, wysyłka z nieautoryzowanego serwera albo zainfekowany komputer. Do czasu usunięcia część Twoich maili może trafiać do spamu.";

function ramka(naglowek: string, w: Wynik, wstep: string, wypis: string) {
  const adresy = esc(w.adresy.join(", ") || "brak");
  const uwagi = w.uwagi.map((u) => `<p style="color:#59596D">${esc(u)}</p>`).join("");
  return ramkaMaila({
    naglowek: esc(naglowek),
    tresc: `${wstep}${uwagi}<p style="margin:16px 0 8px;font-size:13px;color:#59596D">Sprawdzone adresy IP serwerów: ${adresy}</p>${tabela(w)}<p style="margin:20px 0 0"><a href="https://fluxlab.pl/czarne-listy" style="color:#6E2CFF">Strona usługi</a></p>`,
    stopka: `Sprawdzamy codziennie i piszemy tylko wtedy, gdy coś się zmieni. <a href="${wypis}" style="color:#59596D">Wypisz się</a>.`,
  });
}

/** Mail po zapisie: pełny wynik pierwszej kontroli. */
export function mailZapisu(w: Wynik, wypis: string) {
  const n = w.na_liscie;
  const temat = n
    ? `${w.domena}: poczta jest na liście spamowej (${n})`
    : `${w.domena}: poczta nie jest na żadnej z ${w.sprawdzono} sprawdzonych list`;
  const wstep = n
    ? `<p><b>Co to znaczy:</b> część odbiorców może odrzucać albo wrzucać do spamu Twoje maile. Wejdź w link przy liście, sprawdź powód i poproś o usunięcie. ${PRZYCZYNY}</p>`
    : "<p>Nie znaleźliśmy żadnego wpisu. Sprawdzamy codziennie i napiszemy tylko wtedy, gdy coś się zmieni.</p>";
  return { temat, html: ramka(temat, w, wstep, wypis), tekst: tekst(temat, w) };
}

/** Mail dobowy, tylko gdy zmienił się zbiór list. */
export function mailZmiany(w: Wynik, nowe: string[], zeszly: string[], wypis: string) {
  const nn = nazwyZ(w, nowe);
  const temat = nowe.length
    ? `Alert: ${w.domena} trafiła na listę spamową (${nn.join(", ")})`
    : `${w.domena}: poczta wyszła z listy spamowej`;
  const wstep =
    (nowe.length ? `<p><b>Co zrobić:</b> otwórz link przy liście, przeczytaj powód wpisu i poproś o usunięcie. ${PRZYCZYNY}</p>` : "") +
    (zeszly.length ? "<p>Dobra wiadomość: z części list Twój adres już zniknął.</p>" : "");
  return { temat, html: ramka(temat, w, wstep, wypis), tekst: tekst(temat, w) };
}

function tekst(temat: string, w: Wynik) {
  const l = zbiorczo(w.wyniki)
    .map((x) => `${x.nazwa}: ${KOL[x.status][1]}`)
    .join("\n");
  return `${temat}\n\nSprawdzone adresy IP: ${w.adresy.join(", ") || "brak"}\n\n${l}\n\nhttps://fluxlab.pl/czarne-listy`;
}
