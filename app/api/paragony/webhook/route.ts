import { NextResponse } from "next/server";
import { dane } from "@/lib/fl-dane";
import {
  type Konto,
  type Pozycja,
  DOMENA_PARAGONOW,
  LIMIT_GODZINNY,
  LIMIT_MIESIECZNY,
  kontoPoTokenie,
  linkArkusza,
  odczytaj,
  podpisPoprawny,
  poprawData,
  subskrypcjaAktywna,
  wyslijMail,
  zl,
} from "@/lib/paragony";
import { esc } from "@/lib/dokumenty-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const TYPY = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];
const MIN_BAJTOW = 8_000;
const MAX_BAJTOW = 12_000_000;
const MAX_ZALACZNIKOW = 8;

const RESEND = (sciezka: string) =>
  fetch(`https://api.resend.com${sciezka}`, {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "User-Agent": "fluxlab-paragony",
    },
  });

export async function POST(req: Request) {
  const body = await req.text();
  if (
    !podpisPoprawny(
      body,
      req.headers,
      process.env.RESEND_WEBHOOK_PARAGONY ?? "",
    )
  )
    return NextResponse.json({ error: "podpis" }, { status: 401 });

  const zdarzenie = JSON.parse(body);
  if (zdarzenie.type !== "email.received")
    return NextResponse.json({ ok: true });
  const d = zdarzenie.data ?? {};
  const emailId = String(d.email_id ?? "");
  const rx = new RegExp(
    `^([a-f0-9]{20})@${DOMENA_PARAGONOW.replace(/\./g, "\\.")}$`,
    "i",
  );
  const token = ((d.to as string[]) ?? [])
    .map((a) => rx.exec(String(a).trim().toLowerCase())?.[1])
    .find(Boolean);
  if (!emailId || !token)
    return NextResponse.json({ ok: true, pominieto: "adres" });

  const rekord = await kontoPoTokenie(token);
  if (!rekord) return NextResponse.json({ ok: true, pominieto: "konto" });
  const konto: Konto = rekord.dane;
  if (!(await subskrypcjaAktywna(konto.subskrypcja)))
    return NextResponse.json({ ok: true, pominieto: "subskrypcja" });

  const db = dane("paragony");
  const teraz = new Date();
  const godzinaTemu = new Date(teraz.getTime() - 3600_000).toISOString();
  const poczatekMiesiaca = new Date(
    Date.UTC(teraz.getUTCFullYear(), teraz.getUTCMonth(), 1),
  ).toISOString();
  if (
    (await db.licz("pozycje", { klucz: token, od: godzinaTemu })) >=
    LIMIT_GODZINNY
  )
    return NextResponse.json({ ok: true, pominieto: "limit godzinny" });
  if (
    (await db.licz("pozycje", { klucz: token, od: poczatekMiesiaca })) >=
    LIMIT_MIESIECZNY
  ) {
    const miesiac = teraz.toISOString().slice(0, 7);
    if (konto.limit_mail !== miesiac) {
      await db.zmien("konta", token, { dane: { limit_mail: miesiac } });
      await wyslijMail(
        konto.email,
        "Limit zdjęć na ten miesiąc wyczerpany",
        "Limit zdjęć wyczerpany",
        `<p style="margin:0">W tym miesiącu odczytaliśmy już ${LIMIT_MIESIECZNY} zdjęć, czyli limit w abonamencie. Kolejne zdjęcia nie zostaną dopisane do arkusza. Od 1. dnia następnego miesiąca limit wraca do zera.</p>`,
      );
    }
    return NextResponse.json({ ok: true, pominieto: "limit miesieczny" });
  }

  const lr = await RESEND(`/emails/receiving/${emailId}/attachments`);
  if (!lr.ok)
    return NextResponse.json({ error: "zalaczniki" }, { status: 502 });
  const wszystkie: {
    id: string;
    filename: string;
    content_type: string;
    size: number;
    download_url: string;
  }[] = (await lr.json()).data ?? [];
  const pliki = wszystkie
    .filter(
      (z) =>
        TYPY.includes(z.content_type) &&
        z.size >= MIN_BAJTOW &&
        z.size <= MAX_BAJTOW,
    )
    .slice(0, MAX_ZALACZNIKOW);
  const mailId = emailId.slice(0, 8);

  if (!pliki.length) {
    const dziennik = await db.pobierz("powiadomienia", emailId);
    if (!dziennik) {
      await db.ustaw("powiadomienia", emailId, {
        klucz: token,
        dane: { co: "brak zdjęcia" },
      });
      await wyslijMail(
        konto.email,
        "Nie znaleźliśmy zdjęcia w wiadomości",
        "Nie znaleźliśmy zdjęcia paragonu",
        `<p style="margin:0">W wiadomości, którą wysłano na adres do paragonów, nie było zdjęcia ani pliku PDF w obsługiwanym formacie (JPEG, PNG, WebP, GIF albo PDF). Zdjęcia w formacie HEIC z iPhone'a przy wysyłce wybierz jako „Rzeczywisty rozmiar” albo „Duży” w Poczcie, wtedy telefon zmieni je na JPEG.</p>`,
      );
    }
    return NextResponse.json({ ok: true, pominieto: "brak zalacznikow" });
  }

  const zapisane: { p: Pozycja; nazwa: string }[] = [];
  const nieodczytane: string[] = [];
  for (const z of pliki) {
    const id = `${emailId}-${z.id}`;
    if (await db.pobierz("pozycje", id)) continue;
    const pr = await fetch(z.download_url);
    if (!pr.ok)
      return NextResponse.json({ error: "pobranie" }, { status: 502 });
    const o = await odczytaj(
      Buffer.from(await pr.arrayBuffer()),
      z.content_type,
    );
    if (!o.czytelny || (o.brutto === null && !o.sprzedawca)) {
      nieodczytane.push(z.filename || "plik");
      continue;
    }
    const dataDok = poprawData(o.data);
    const p: Pozycja = {
      data: dataDok ?? teraz.toISOString().slice(0, 10),
      sprzedawca: (o.sprzedawca ?? "").slice(0, 120),
      nip: (o.nip ?? "").replace(/\D/g, "").slice(0, 10),
      brutto: o.brutto,
      vat: o.vat,
      waluta: (o.waluta ?? "PLN").slice(0, 3).toUpperCase(),
      kategoria: o.kategoria,
      opis: o.opis.slice(0, 120),
      uwaga: dataDok ? "" : "nie widać daty, wpisano dzień wpłynięcia",
      dodano: teraz.toISOString(),
    };
    await db.ustaw("pozycje", id, { klucz: token, dane: p });
    zapisane.push({ p, nazwa: z.filename || "plik" });
  }

  if (zapisane.length || nieodczytane.length) {
    const wiersze = zapisane
      .map(
        ({ p }) =>
          `<li style="margin:0 0 6px">${esc(p.data)}, ${esc(p.sprzedawca || "bez nazwy")}: <b>${zl(p.brutto)} ${esc(p.waluta)}</b>, ${esc(p.kategoria)}${p.uwaga ? ` (${esc(p.uwaga)})` : ""}</li>`,
      )
      .join("");
    const bledy = nieodczytane.length
      ? `<p style="margin:12px 0 0">Nie udało się odczytać: ${nieodczytane.map(esc).join(", ")}. Zrób zdjęcie jeszcze raz z bliska, przy dobrym świetle, całego paragonu.</p>`
      : "";
    await wyslijMail(
      konto.email,
      zapisane.length
        ? `Dopisane do arkusza: ${zapisane.length}`
        : "Nie udało się odczytać zdjęcia",
      zapisane.length
        ? "Dopisane do arkusza"
        : "Nie udało się odczytać zdjęcia",
      `${zapisane.length ? `<ul style="margin:0;padding-left:18px">${wiersze}</ul>` : ""}${bledy}<p style="margin:12px 0 0"><a href="${linkArkusza(konto.arkusz)}">Otwórz arkusz</a></p>`,
    );
  }
  return NextResponse.json({
    ok: true,
    zapisano: zapisane.length,
    nieodczytano: nieodczytane.length,
    mail: mailId,
  });
}
