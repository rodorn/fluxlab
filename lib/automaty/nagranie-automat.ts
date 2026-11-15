import { wyslij } from "@/lib/audyt-wyslij";
import { BladAdresu, sprawdzAdres } from "@/lib/bezpieczny-fetch";
import {
  anulujIZwroc,
  dzienWarszawa,
  oznacz,
  subskrypcja,
  zamowieniaProduktu,
} from "@/lib/automaty/zamowienia";
import {
  LIMIT_MINUT,
  bezposredniLink,
  pobierzNagranie,
  protokol,
  streszczenie,
  transkrybuj,
} from "@/lib/automaty/nagranie";

export const PRODUKTY_NAGRAN = [
  "transkrypcja-nagran",
  "protokol-spotkania",
] as const;
export const MAX_KOLEJKA = 2;
export const MAX_LINK = 220;
const NA_RAZ = 2;
const PROBY = 3;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const akapity = (s: string) => esc(s).replace(/\n/g, "<br>");

export const kolejkaZ = (v: unknown) =>
  String(v ?? "")
    .split(" ")
    .filter(Boolean);

export async function linkPoprawny(surowy: string): Promise<boolean> {
  if (
    surowy.length > MAX_LINK ||
    /\s/.test(surowy) ||
    !/^https:\/\//i.test(surowy)
  )
    return false;
  try {
    await sprawdzAdres(bezposredniLink(surowy));
    return true;
  } catch {
    return false;
  }
}

function ramka(tresc: string) {
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:640px">${tresc}<p style="margin-top:24px">Fluxlab</p></div>`;
}

function mailStreszczenie(sz: string, minuty: number) {
  const t = `Dzień dobry,\n\nponiżej streszczenie nagrania (${minuty} min). Pełna transkrypcja jest w załączniku.\n\n${sz}\n\nKolejne nagranie wyślesz na https://fluxlab.pl/wyslij-nagranie\n\nFluxlab`;
  return {
    temat: `Streszczenie nagrania (${minuty} min)`,
    html: ramka(
      `<p>Dzień dobry,</p><p>poniżej streszczenie nagrania (${minuty} min). Pełna transkrypcja jest w załączniku.</p><p>${akapity(sz)}</p><p>Kolejne nagranie możesz wysłać na <a href="https://fluxlab.pl/wyslij-nagranie">fluxlab.pl/wyslij-nagranie</a>.</p>`,
    ),
    tekst: t,
  };
}

function mailProtokol(p: Awaited<ReturnType<typeof protokol>>, minuty: number) {
  const dec = p.decyzje.length
    ? p.decyzje.map((d) => `- ${d}`).join("\n")
    : "Nie zapisano decyzji.";
  const zad = p.zadania.length
    ? p.zadania
        .map((z) => `- ${z.osoba}: ${z.zadanie} (termin: ${z.termin})`)
        .join("\n")
    : "Nie zapisano zadań.";
  const t = `Dzień dobry,\n\nponiżej protokół ze spotkania (${minuty} min). Pełna transkrypcja jest w załączniku.\n\nPodsumowanie\n${p.podsumowanie}\n\nDecyzje\n${dec}\n\nZadania\n${zad}\n\nGotowy mail do uczestników\n${p.mail}\n\nFluxlab`;
  const lista = (l: string[]) =>
    l.length
      ? `<ul style="margin:6px 0;padding-left:20px">${l.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`
      : "<p>Brak.</p>";
  const h = (s: string) => `<h3 style="margin:22px 0 6px">${s}</h3>`;
  return {
    temat: `Protokół ze spotkania (${minuty} min)`,
    html: ramka(
      `<p>Dzień dobry,</p><p>poniżej protokół ze spotkania (${minuty} min). Pełna transkrypcja jest w załączniku.</p>${h("Podsumowanie")}<p>${esc(p.podsumowanie)}</p>${h("Decyzje")}${lista(p.decyzje)}${h("Zadania")}${lista(p.zadania.map((z) => `${z.osoba}: ${z.zadanie} (termin: ${z.termin})`))}${h("Gotowy mail do uczestników")}<p style="background:#f3f4f6;padding:12px;border-radius:8px">${akapity(p.mail)}</p>`,
    ),
    tekst: t,
  };
}

export async function obsluzNagrania(
  produkt: (typeof PRODUKTY_NAGRAN)[number],
) {
  const wyniki: { sesja: string; wynik: string }[] = [];
  let zrobione = 0;
  const miesiac = dzienWarszawa().slice(0, 7);
  for (const z of await zamowieniaProduktu(produkt)) {
    if (zrobione >= NA_RAZ) break;
    const log = (wynik: string) => wyniki.push({ sesja: z.sesja, wynik });
    try {
      const sub = await subskrypcja(z.subskrypcja);
      if (sub.status !== "active" && sub.status !== "trialing") continue;
      const meta: Record<string, string> = sub.metadata ?? {};
      let kolejka = kolejkaZ(meta.kolejka);

      if (!meta.start) {
        if (!(await linkPoprawny(z.dane))) {
          const t = `Dzień dobry,\n\nw zamówieniu nie było poprawnego linku do nagrania (musi zaczynać się od https:// i prowadzić do pliku udostępnionego każdemu, kto ma link), więc nie mogliśmy uruchomić usługi. Zwróciliśmy opłatę i anulowaliśmy subskrypcję. Możesz zamówić ponownie.\n\nFluxlab`;
          await wyslij(
            z.email,
            "Zwracamy pieniądze: nie udało się uruchomić usługi",
            `<p>${akapity(t)}</p>`,
            t,
          );
          await anulujIZwroc(z.subskrypcja);
          log("zwrot: zły link");
          zrobione++;
          continue;
        }
        kolejka = [z.dane.trim(), ...kolejka];
        await oznacz(z.subskrypcja, {
          start: new Date().toISOString(),
          kolejka: kolejka.join(" "),
        });
      }
      if (!kolejka.length) continue;
      zrobione++;

      const klucz = `min_${miesiac}`;
      const uzyte = Number(meta[klucz] ?? 0);
      const link = kolejka[0];
      const reszta = kolejka.slice(1).join(" ");
      if (uzyte >= LIMIT_MINUT) {
        const t = `Dzień dobry,\n\nw tym miesiącu wykorzystałeś limit ${LIMIT_MINUT / 60} godzin nagrań. Nagranie z kolejki zostanie przetworzone po 1. dniu kolejnego miesiąca.\n\nFluxlab`;
        if (meta.limit_mail !== miesiac) {
          await wyslij(
            z.email,
            "Limit nagrań w tym miesiącu wykorzystany",
            `<p>${akapity(t)}</p>`,
            t,
          );
          await oznacz(z.subskrypcja, { limit_mail: miesiac });
        }
        log("limit miesięczny");
        continue;
      }

      let bajty: Buffer;
      let nazwa: string;
      let tekst: string;
      let minuty: number;
      try {
        ({ bajty, nazwa } = await pobierzNagranie(link));
        ({ tekst, minuty } = await transkrybuj(bajty, nazwa));
      } catch (e) {
        const trwaly = e instanceof BladAdresu;
        const proby = Number(meta.proby ?? 0) + 1;
        if (trwaly || proby >= PROBY) {
          const powod = trwaly
            ? e.message
            : "Usługa rozpoznawania mowy chwilowo nie odpowiada.";
          const t = `Dzień dobry,\n\nnie udało się przetworzyć nagrania z linku ${link}\n\nPowód: ${powod}\n\nNagranie wyjęliśmy z kolejki i nie zaliczyliśmy go do limitu. Możesz wysłać je ponownie na https://fluxlab.pl/wyslij-nagranie\n\nFluxlab`;
          await wyslij(
            z.email,
            "Nie udało się przetworzyć nagrania",
            `<p>${akapity(t)}</p>`,
            t,
          );
          await oznacz(z.subskrypcja, { kolejka: reszta, proby: "0" });
          log(`nagranie odrzucone: ${powod}`);
        } else {
          await oznacz(z.subskrypcja, { proby: String(proby) });
          log(
            `ponowię (${proby}/${PROBY}): ${e instanceof Error ? e.message : "błąd"}`,
          );
        }
        continue;
      }

      const m =
        produkt === "protokol-spotkania"
          ? mailProtokol(await protokol(tekst), minuty)
          : mailStreszczenie(await streszczenie(tekst), minuty);
      const zal = [
        { filename: "transkrypcja.txt", content: Buffer.from(tekst, "utf8") },
      ];
      const ok = await wyslij(
        z.email,
        m.temat,
        m.html,
        m.tekst,
        undefined,
        zal,
      );
      if (!ok) throw new Error("mail nie wyszedł");
      await oznacz(z.subskrypcja, {
        kolejka: reszta,
        proby: "0",
        [klucz]: String(uzyte + minuty),
      });
      log(`wysłano (${minuty} min)`);
    } catch (e) {
      console.error(`[${produkt}]`, z.sesja, e);
      log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
    }
  }
  return wyniki;
}
