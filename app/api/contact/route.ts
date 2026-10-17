import { Resend } from "resend";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { ladunekZgloszenia, wyslijZgloszenie } from "@/lib/zgloszenie-kolektor";

// Klient tworzony dopiero przy pierwszym zgloszeniu, a nie przy wczytaniu
// modulu. Inaczej `next build` bez ustawionego klucza wywala sie na etapie
// zbierania danych o trasie i wyglada jak zepsuta galaz, choc na produkcji
// klucz jest ustawiony i wszystko dziala.
let klientResend: Resend | null = null;
function resendKlient(): Resend {
  if (!klientResend) klientResend = new Resend(process.env.RESEND_API_KEY);
  return klientResend;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_COMPANY = 200;
const MAX_EMAIL = 320;
const MAX_VALUE = 200;
const MAX_MESSAGE = 5000;
const MAX_UTM = 200;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

import { PROBLEM_TYPE_LABELS, PROBLEM_SCALE_LABELS } from "@/lib/form-options";

const CONTACT_PREF_LABELS: Record<string, string> = {
  email: "E-mail",
  phone: "Telefon",
  meet: "Google Meet",
};

// Domena fluxlab.pl jest w Resend zweryfikowana (status verified, sending
// enabled), wiec wysylka idzie z wlasnego adresu i dociera do KAZDEGO
// odbiorcy. Wczesniejszy domyslny nadawca z piaskownicy pozwalal pisac
// wylacznie do wlasciciela konta, przez co realny klient nie dostawal
// potwierdzenia. Zmienne srodowiskowe nadal nadpisuja te wartosci.
const FROM_FORMULARZ =
  process.env.RESEND_FROM_FORMULARZ ?? "Formularz Fluxlab <formularz@fluxlab.pl>";
// Sciezka awaryjna. Piaskownica Resend wysyla wylacznie do wlasciciela konta,
// wiec potwierdzenie do prawdziwego klienta nie dociera (zweryfikowane na
// produkcji 19.09.2026: zgloszenie z obcego adresu dostalo alert ODPISZ
// RECZNIE zamiast potwierdzenia). Gdy ustawione sa dane SMTP, potwierdzenie
// idzie nimi i problem znika bez czekania na weryfikacje domeny.
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER;

async function wyslijPrzezSmtp(to: string, subject: string, text: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Brak konfiguracji SMTP");
  }
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transport.sendMail({ from: SMTP_FROM, to, subject, text });
}

const FROM_PAWEL =
  process.env.RESEND_FROM_PAWEL ?? "Paweł, Fluxlab <pawel@fluxlab.pl>";

function potwierdzenie(pref: string, termin: string, telefon: string) {
  const kontakt =
    pref === "meet" && termin
      ? `Prosisz o spotkanie na Google Meet ${termin}. Potwierdzimy termin zaproszeniem z linkiem do rozmowy, a jeśli ta godzina będzie zajęta, zaproponujemy najbliższą wolną.`
      : pref === "phone" && telefon
        ? `Prosisz o telefon pod numer ${telefon}. Zadzwonimy w godzinach pracy, zwykle tego samego dnia.`
        : "Pracujemy i ustalamy wszystko mailowo, więc możesz po prostu odpisać na tę wiadomość.";
  return `Cześć,

dzięki za opis procesu. Przejrzymy zgłoszenie i wrócimy z informacją, czy widzimy potencjał na automatyzację oraz jaki byłby sensowny pierwszy krok, zwykle tego samego dnia.

Jeśli widzimy dopasowanie, odpiszemy z konkretną propozycją zakresu i wyceną. Jeśli proces wygląda na zbyt mały albo nieopłacalny do automatyzacji na tym etapie, napiszemy to wprost, i uzasadnimy dlaczego.

${kontakt}

Paweł
Fluxlab, automatyzacja leadów, CRM i raportowania dla firm B2B
fluxlab.pl
`;
}

// Link "dodaj do Kalendarza Google" na 30 minut od terminu (czas warszawski),
// z klientem jako gościem. Meet dokłada się przyciskiem w oknie wydarzenia.
function linkKalendarza(termin: string, email: string, company: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.exec(termin);
  if (!m) return "";
  const [, r, mi, d, g, mn] = m;
  const start = `${r}${mi}${d}T${g}${mn}00`;
  const koniecMin = Number(g) * 60 + Number(mn) + 30;
  const koniec = `${r}${mi}${d}T${String(Math.floor(koniecMin / 60)).padStart(2, "0")}${String(koniecMin % 60).padStart(2, "0")}00`;
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: `FluxLab: rozmowa${company ? ` z ${company}` : ""}`,
    dates: `${start}/${koniec}`,
    ctz: "Europe/Warsaw",
    add: email,
    details: "Rozmowa o zgłoszeniu z formularza fluxlab.pl",
  });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (hits.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, hits);
    return true;
  }
  hits.push(now);
  requestLog.set(ip, hits);
  return false;
}

function originDozwolony(origin: string): boolean {
  return (
    origin === "https://fluxlab.pl" ||
    origin === "https://www.fluxlab.pl" ||
    /^http:\/\/localhost(:\d+)?$/.test(origin)
  );
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && !originDozwolony(origin)) {
    return NextResponse.json({ error: "Niedozwolone źródło żądania." }, { status: 403 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Za dużo zapytań, odczekaj chwilę i spróbuj ponownie." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot, dla botów udajemy sukces.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = str(body.email, MAX_EMAIL);
  const company = str(body.company, MAX_COMPANY);
  const problemType = str(body.problemType, MAX_VALUE);
  const problemScale = str(body.problemScale, MAX_VALUE);
  const message = str(body.message, MAX_MESSAGE);
  const contactPref = str(body.contactPref, MAX_VALUE) || "email";
  const telefon = str(body.phone, 40);
  const termin = str(body.termin, 20);

  if (!email || !problemType || !problemScale) {
    return NextResponse.json(
      { error: "Wypełnij wymagane pola." },
      { status: 400 },
    );
  }
  if (!EMAIL_RX.test(email)) {
    return NextResponse.json(
      { error: "Nieprawidłowy adres e-mail." },
      { status: 400 },
    );
  }

  const utm = {
    utm_source: str(body.utm_source, MAX_UTM),
    utm_medium: str(body.utm_medium, MAX_UTM),
    utm_campaign: str(body.utm_campaign, MAX_UTM),
    utm_term: str(body.utm_term, MAX_UTM),
    utm_content: str(body.utm_content, MAX_UTM),
    landing_page: str(body.landing_page, MAX_UTM),
    referrer: str(body.referrer, MAX_UTM),
  };

  // Rekord w kolektorze powstaje w chwili zdarzenia, przed mailem. Awaria
  // kolektora nie blokuje maila (blad tylko w konsoli), a awaria maila nie
  // kasuje rekordu.
  await wyslijZgloszenie(
    ladunekZgloszenia({
      email,
      firma: company,
      rodzaj_problemu: problemType,
      skala: problemScale,
      preferowany_kontakt: contactPref,
      opis: [
        telefon && `Telefon: ${telefon}`,
        termin && `Termin Meet: ${termin}`,
        message,
      ]
        .filter(Boolean)
        .join("\n"),
      ...utm,
    }),
  );

  const problemTypeLabel = PROBLEM_TYPE_LABELS[problemType] ?? problemType;
  const problemScaleLabel = PROBLEM_SCALE_LABELS[problemScale] ?? problemScale;
  const contactPrefLabel = CONTACT_PREF_LABELS[contactPref] ?? contactPref;

  const utmLines = Object.entries(utm)
    .filter(([, v]) => v.length > 0)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const text = [
    `E-mail: ${email}`,
    `Firma: ${company || "-"}`,
    `Co chce usprawnić: ${problemTypeLabel}`,
    `Skala: ${problemScaleLabel}`,
    `Preferowany kontakt: ${contactPrefLabel}`,
    telefon ? `Telefon: ${telefon}` : "",
    termin ? `Termin Meet: ${termin}` : "",
    termin ? `Dodaj do kalendarza: ${linkKalendarza(termin, email, company)}` : "",
    "",
    "Opis:",
    message || "(brak)",
    "",
    utmLines ? `--- Atrybucja ---\n${utmLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const subjectCompany = company ? ` (${company})` : "";

  const { error } = await resendKlient().emails.send({
    from: FROM_FORMULARZ,
    to: "iwanekpawel55@gmail.com",
    replyTo: email,
    subject: `${
      contactPref === "meet" && termin
        ? `MEET ${termin}: `
        : contactPref === "phone" && telefon
          ? `ZADZWOŃ ${telefon}: `
          : ""
    }Nowa diagnoza: ${problemTypeLabel}${subjectCompany}`,
    text,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości." },
      { status: 500 },
    );
  }

  // Auto-potwierdzenie do klienta. Nie blokuje sukcesu zgloszenia, ale gdy sie
  // nie uda (np. nadawca z piaskownicy Resend moze pisac tylko do wlasciciela
  // konta), leci alert do Pawla, zeby odpisal recznie. Bez tego lead wyglada
  // dla klienta jak wrzucony w prozne.
  try {
    const { error: replyError } = await resendKlient().emails.send({
      from: FROM_PAWEL,
      to: email,
      subject: "Dostaliśmy zgłoszenie, Fluxlab",
      text: potwierdzenie(contactPref, termin, telefon),
    });

    if (replyError) {
      throw replyError;
    }
  } catch (e) {
    console.error("[contact] auto-reply przez Resend nie przeszedl do", email, "-", e);

    // Druga proba: wlasny serwer pocztowy. Jesli sie uda, klient dostaje
    // potwierdzenie i alert jest niepotrzebny.
    try {
      await wyslijPrzezSmtp(
        email,
        "Dostaliśmy zgłoszenie, Fluxlab",
        potwierdzenie(contactPref, termin, telefon),
      );
      return NextResponse.json({ ok: true });
    } catch (e2) {
      console.error("[contact] auto-reply przez SMTP tez nie przeszedl -", e2);
    }


    // Alert do siebie. Ten adres zawsze dziala, bo jest wlascicielem konta.
    await resendKlient().emails
      .send({
        from: FROM_FORMULARZ,
        to: "iwanekpawel55@gmail.com",
        replyTo: email,
        subject: `ODPISZ RĘCZNIE: klient nie dostał potwierdzenia (${email})`,
        text: `Zgłoszenie z formularza dotarło, ale automatyczne potwierdzenie do klienta NIE zostało wysłane.

Klient: ${email}
Temat zgłoszenia: ${problemTypeLabel}${subjectCompany}

Z jego perspektywy wysłał formularz i nie dostał żadnej odpowiedzi, więc odpisz mu ręcznie, najlepiej od razu. Wystarczy odpowiedzieć na tego maila, bo adres zwrotny jest ustawiony na klienta.

Przyczyna techniczna: ${e instanceof Error ? e.message : String(e)}

Trwałe rozwiązanie: zweryfikować domenę fluxlab.pl w Resend i ustawić RESEND_FROM_FORMULARZ oraz RESEND_FROM_PAWEL w zmiennych środowiskowych, żeby maile wychodziły z adresu w tej domenie zamiast z piaskownicy.
`,
      })
      .catch((alertError) =>
        console.error(
          "[contact] alert o nieudanym potwierdzeniu tez padl:",
          alertError,
        ),
      );
  }

  return NextResponse.json({ ok: true });
}
