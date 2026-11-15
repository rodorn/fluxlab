import { randomBytes } from "node:crypto";
import { dane } from "@/lib/fl-dane";
import { stripe } from "@/lib/stripe";
import { daneFirmy, type Firma } from "@/lib/leady/dane-firmy";
import { ocenaLeada, type Ocena } from "@/lib/leady/ocena";
import { PRODUKTY, mailKarta, mailNps, mailOpinia, mailDoLeada, mailPowitalny, mailPrzeprosiny, wyslij } from "@/lib/leady/poczta";

export type Klient = {
  email: string; nazwa: string; produkty: string[]; subskrypcje: Record<string, string>;
  aktywny: boolean; ustawienia: Record<string, string>; wylaczono?: string;
};
export type Zgloszenie = { pola: Record<string, string>; firma: Firma | null; ocena: Ocena | null; status: string };

const db = dane("leady");
const LIMIT_DOBA = 100;
const POLA = ["imie", "email", "telefon", "firma", "nip", "wiadomosc"];
const AKTYWNE = new Set(["active", "trialing", "past_due"]);
const ZNACZNIK = "przyjete_lead";
const RETENCJA_DNI = 365;
const OPINIA_BLOKADA_DNI = 90;
const PO_REZYGNACJI_DNI = 30;
const tajny = (n: number) => randomBytes(n).toString("base64url");

export async function przyjmij(token: string, wej: Record<string, unknown>): Promise<{ kod: number; blad?: string; id?: string }> {
  const k = await db.pobierz<Klient>("klienci", token);
  if (!k || !k.dane.aktywny) return { kod: 404, blad: "Nieznany albo wyłączony formularz." };
  if ((await db.licz("zgloszenia", { klucz: token, od: new Date().toISOString().slice(0, 10) })) >= LIMIT_DOBA)
    return { kod: 429, blad: "Dzienny limit zgłoszeń wyczerpany." };
  const pola: Record<string, string> = {};
  for (const p of POLA) pola[p] = String(wej[p] ?? "").trim().slice(0, 1000);
  let n = 0;
  for (const [a, b] of Object.entries(wej)) {
    if (POLA.includes(a) || a === "token" || !["string", "number"].includes(typeof b) || n >= 8) continue;
    pola[a.slice(0, 40)] = String(b).slice(0, 500);
    n++;
  }
  if (!pola.email && !pola.telefon) return { kod: 400, blad: "Podaj e-mail albo telefon." };
  if (pola.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pola.email)) return { kod: 400, blad: "Adres e-mail wygląda na błędny." };
  const z: Zgloszenie = { pola, firma: null, ocena: null, status: "nowy" };
  return { kod: 202, id: await db.dodaj("zgloszenia", { klucz: token, dane: z }) };
}

export async function przetworz(token: string, id: string) {
  const k = (await db.pobierz<Klient>("klienci", token))!;
  const z = (await db.pobierz<Zgloszenie>("zgloszenia", id))!.dane;
  const p = new Set(k.dane.produkty);
  try {
    if (p.has("lead-nip") && z.pola.nip) z.firma = await daneFirmy(z.pola.nip);
    if (p.has("lead-ocena"))
      try {
        z.ocena = await ocenaLeada(z.pola, z.firma && !z.firma.blad ? z.firma : null);
      } catch (e) {
        console.error("ocena AI", e);
      }
    z.status = "przetworzony";
    await db.ustaw("zgloszenia", id, { klucz: token, dane: z });
    const u = k.dane.ustawienia;
    if (p.has("lead-odpowiedz") && z.pola.email && (u.oferta || u.kalendarz)) {
      const nazwa = (u.firma || k.dane.nazwa || "Fluxlab").replace(/["<>]/g, "");
      try {
        await wyslij({ do: z.pola.email, temat: `Dziękujemy za zgłoszenie: ${nazwa}`, html: mailDoLeada(u, k.dane.nazwa, z.pola), od: nazwa, replyTo: k.dane.email });
        z.status = "odpowiedziano";
        await db.ustaw("zgloszenia", id, { klucz: token, dane: z });
      } catch (e) {
        console.error("odpowiedź do leada", e);
      }
    }
    const nazwaFirmy = (z.firma && !z.firma.blad && z.firma.nazwa) || z.pola.firma || z.pola.imie || z.pola.email || "zgłoszenie";
    const panel = (await db.pobierz<Klient>("klienci", token))!.klucz!;
    await wyslij({ do: k.dane.email, temat: `Nowy lead: ${nazwaFirmy}${z.ocena ? ` (${z.ocena.kategoria})` : ""}`, html: mailKarta(panel, z.pola, z.firma, z.ocena) });
  } catch (e) {
    console.error("przetworz", id, e);
    z.status = "błąd";
    await db.ustaw("zgloszenia", id, { klucz: token, dane: z }).catch(() => {});
  }
}

export async function ankietaInfo(token: string): Promise<{ firma: string } | null> {
  const k = await db.pobierz<Klient>("klienci", token);
  if (!k || !k.dane.aktywny || !k.dane.produkty.includes("lead-nps")) return null;
  return { firma: k.dane.ustawienia.firma ?? "" };
}

export async function odpowiedzNps(token: string, wej: Record<string, unknown>): Promise<{ kod: number; blad?: string }> {
  const k = await db.pobierz<Klient>("klienci", token);
  if (!k || !k.dane.aktywny || !k.dane.produkty.includes("lead-nps")) return { kod: 404, blad: "Nieznana albo wyłączona ankieta." };
  const ocena = Number(wej.ocena);
  if (!Number.isInteger(ocena) || ocena < 0 || ocena > 10) return { kod: 400, blad: "Wybierz ocenę od 0 do 10." };
  if ((await db.licz("ankiety", { klucz: token, od: new Date().toISOString().slice(0, 10) })) >= LIMIT_DOBA * 5)
    return { kod: 429, blad: "Dzienny limit odpowiedzi wyczerpany." };
  const komentarz = String(wej.komentarz ?? "").trim().slice(0, 1000);
  await db.dodaj("ankiety", { klucz: token, dane: { ocena, komentarz } });
  const panel = k.klucz!;
  await wyslij({ do: k.dane.email, temat: `Ankieta NPS: ocena ${ocena}${ocena <= 6 ? " (krytyk)" : ""}`, html: mailNps(panel, ocena, komentarz) }).catch((e) => console.error("mail NPS", e));
  return { kod: 202 };
}

export async function wyslijProsbeOpinia(p: string, wej: Record<string, unknown>): Promise<{ kod: number; blad?: string }> {
  const [k] = await db.lista<Klient>("klienci", { klucz: p, limit: 1 });
  if (!k || !k.dane.aktywny || !k.dane.produkty.includes("lead-opinia")) return { kod: 404, blad: "Nieznany albo wyłączony panel." };
  const link = k.dane.ustawienia.opinia;
  if (!link) return { kod: 400, blad: "Najpierw wklej link do opinii Google w ustawieniach panelu." };
  const email = String(wej.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { kod: 400, blad: "Adres e-mail wygląda na błędny." };
  const imie = String(wej.imie ?? "").trim().slice(0, 120);
  const wyslane = await db.lista<{ email: string; imie: string }>("opinie", { klucz: k.id, limit: 500 });
  if (wyslane.some((o) => o.dane.email === email && Date.now() - Date.parse(o.utworzono) < OPINIA_BLOKADA_DNI * 86400000))
    return { kod: 409, blad: `Do tego adresu prośba poszła w ciągu ostatnich ${OPINIA_BLOKADA_DNI} dni.` };
  if ((await db.licz("opinie", { klucz: k.id, od: new Date().toISOString().slice(0, 10) })) >= LIMIT_DOBA)
    return { kod: 429, blad: "Dzienny limit próśb wyczerpany." };
  const nazwa = (k.dane.ustawienia.firma || k.dane.nazwa || "Fluxlab").replace(/["<>]/g, "");
  await wyslij({ do: email, temat: `Jak oceniasz współpracę z firmą ${nazwa}?`, html: mailOpinia(nazwa, imie, link), od: nazwa, replyTo: k.dane.email });
  await db.dodaj("opinie", { klucz: k.id, dane: { email, imie } });
  return { kod: 202 };
}

export async function panel(p: string) {
  const [k] = await db.lista<Klient>("klienci", { klucz: p, limit: 1 });
  if (!k) return null;
  const leady = (await db.lista<Zgloszenie>("zgloszenia", { klucz: k.id, limit: 200 })).map((d) => ({ id: d.id, czas: d.utworzono, ...d.dane }));
  const ankiety = (await db.lista<{ ocena: number; komentarz: string }>("ankiety", { klucz: k.id, limit: 500 })).map((d) => ({ id: d.id, czas: d.utworzono, ...d.dane }));
  const opinie = (await db.lista<{ email: string; imie: string }>("opinie", { klucz: k.id, limit: 200 })).map((d) => ({ id: d.id, czas: d.utworzono, ...d.dane }));
  return { token: k.id, aktywny: k.dane.aktywny, produkty: k.dane.produkty, ustawienia: k.dane.ustawienia, leady, ankiety, opinie };
}

export async function zapiszUstawienia(p: string, wej: Record<string, unknown>): Promise<{ kod: number; blad?: string }> {
  const [k] = await db.lista<Klient>("klienci", { klucz: p, limit: 1 });
  if (!k) return { kod: 404, blad: "Nie ma takiego panelu." };
  const u: Record<string, string> = {};
  for (const [a, m] of [["firma", 120], ["oferta", 2000], ["kalendarz", 300], ["opinia", 500]] as const) u[a] = String(wej[a] ?? "").trim().slice(0, m);
  if (u.kalendarz && !u.kalendarz.startsWith("https://")) return { kod: 400, blad: "Link do kalendarza musi zaczynać się od https://." };
  if (u.opinia && !u.opinia.startsWith("https://")) return { kod: 400, blad: "Link do opinii musi zaczynać się od https://." };
  await db.zmien("klienci", k.id, { dane: { ustawienia: u } });
  return { kod: 200 };
}

async function anulujIZwroc(s: { id: string; subscription?: string; invoice?: string }) {
  if (s.subscription)
    await fetch(`https://api.stripe.com/v1/subscriptions/${s.subscription}`, { method: "DELETE", headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` } });
  if (!s.invoice) return;
  const inv = await stripe(`invoices/${s.invoice}`);
  const pi = inv.payment_intent ?? (await stripe(`invoice_payments?invoice=${s.invoice}`)).data?.[0]?.payment?.payment_intent;
  if (pi) await stripe("refunds", new URLSearchParams({ payment_intent: pi }));
}

async function realizuj(s: any, ids: string[]) {
  const email = String(s.customer_details?.email ?? "").trim().toLowerCase();
  if (!email) throw new Error("brak adresu e-mail w zamówieniu");
  const sub = s.subscription ?? s.id;
  const wpis = await db.pobierz<{ token: string }>("indeks", email);
  let token: string, panelId: string, nowy = !wpis;
  if (!wpis) {
    token = tajny(18);
    panelId = tajny(24);
    await db.dodaj("klienci", {
      id: token, klucz: panelId,
      dane: { email, nazwa: s.customer_details?.name ?? "", produkty: ids, subskrypcje: Object.fromEntries(ids.map((p) => [p, sub])), aktywny: true, ustawienia: {} } satisfies Klient,
    });
    await db.ustaw("indeks", email, { dane: { token } });
  } else {
    token = wpis.dane.token;
    const k = (await db.pobierz<Klient>("klienci", token))!;
    panelId = k.klucz!;
    await db.ustaw("klienci", token, {
      klucz: panelId,
      dane: { ...k.dane, produkty: [...new Set([...k.dane.produkty, ...ids])].sort(), subskrypcje: { ...k.dane.subskrypcje, ...Object.fromEntries(ids.map((p) => [p, sub])) }, aktywny: true, wylaczono: undefined },
    });
  }
  await wyslij({ do: email, temat: "Twoja usługa leadowa Fluxlab już działa", html: mailPowitalny(token, panelId, ids, nowy), kopia: true });
  await stripe(`checkout/sessions/${s.id}`, new URLSearchParams({ [`metadata[${ZNACZNIK}]`]: new Date().toISOString() }));
  return `${email}: ${ids.join(",")}`;
}

export async function nowe() {
  const raport: string[] = [];
  const od = Math.floor(Date.now() / 1000) - 30 * 86400;
  const lista = await stripe(`checkout/sessions?status=complete&limit=100&created[gte]=${od}`);
  for (const s of lista.data) {
    const ids = String(s.metadata?.produkt ?? "").split(",").map((x: string) => x.trim()).filter((x: string) => x in PRODUKTY);
    if (!ids.length || s.metadata?.[ZNACZNIK] || s.payment_status === "unpaid") continue;
    try {
      raport.push(await realizuj(s, ids));
    } catch (e) {
      console.error("realizacja", s.id, e);
      const email = s.customer_details?.email;
      try {
        await anulujIZwroc(s);
        if (email) await wyslij({ do: email, temat: "Przepraszamy: nie uruchomiliśmy usługi, pieniądze wracają", html: mailPrzeprosiny() });
        await stripe(`checkout/sessions/${s.id}`, new URLSearchParams({ [`metadata[${ZNACZNIK}]`]: `blad ${new Date().toISOString()}` }));
      } catch (e2) {
        console.error("zwrot", s.id, e2);
      }
      raport.push(`BŁĄD ${s.id}: ${(e as Error).message}`);
    }
  }
  return raport;
}

export async function sprzatanie() {
  const raport: string[] = [];
  const teraz = Date.now();
  for (const k of await db.lista<Klient>("klienci", { limit: 1000 })) {
    const d = k.dane;
    if (d.aktywny) {
      const zostaja: Record<string, string> = {};
      for (const [p, sub] of Object.entries(d.subskrypcje)) {
        let akt = true;
        try {
          akt = AKTYWNE.has((await stripe(`subscriptions/${sub}`)).status);
        } catch {
          /* błąd Stripe: zostaw produkt włączony */
        }
        if (akt) zostaja[p] = sub;
      }
      if (Object.keys(zostaja).length !== Object.keys(d.subskrypcje).length) {
        const wylaczone = Object.keys(d.subskrypcje).filter((p) => !(p in zostaja));
        await db.ustaw("klienci", k.id, { klucz: k.klucz ?? undefined, dane: { ...d, produkty: Object.keys(zostaja), subskrypcje: zostaja, aktywny: Object.keys(zostaja).length > 0, wylaczono: Object.keys(zostaja).length ? undefined : new Date().toISOString() } });
        raport.push(`${d.email}: wyłączono ${wylaczone.join(",")}`);
      }
    } else if (d.wylaczono && teraz - Date.parse(d.wylaczono) > PO_REZYGNACJI_DNI * 86400000) {
      await db.usunKlucz(k.id, "zgloszenia");
      await db.usunKlucz(k.id, "ankiety");
      await db.usunKlucz(k.id, "opinie");
      await db.usun("klienci", k.id);
      await db.usun("indeks", d.email);
      raport.push(`${d.email}: usunięto dane po rezygnacji`);
    }
  }
  await db.usunPrzed("zgloszenia", new Date(teraz - RETENCJA_DNI * 86400000).toISOString());
  await db.usunPrzed("opinie", new Date(teraz - RETENCJA_DNI * 86400000).toISOString());
  await db.usunPrzed("ankiety", new Date(teraz - RETENCJA_DNI * 86400000).toISOString());
  return raport;
}
