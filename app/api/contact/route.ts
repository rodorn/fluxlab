import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

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

const PROBLEM_TYPE_LABELS: Record<string, string> = {
  leady: "Obsługa leadów",
  crm: "CRM (Pipedrive / HubSpot / Salesforce)",
  raportowanie: "Raportowanie",
  integracje: "Integracje API",
  przepisywanie: "Ręczne przepisywanie danych",
  diagnoza: "Nie wiem, chcę diagnozy",
};

const PROBLEM_SCALE_LABELS: Record<string, string> = {
  "do-30": "Do 30 leadów miesięcznie",
  "30-100": "30–100 leadów miesięcznie",
  "100-plus": "100+ leadów miesięcznie",
  "nie-leady": "Nie chodzi o leady, tylko o ręczną pracę",
  "nie-wiem": "Nie wiem",
};

const CONTACT_PREF_LABELS: Record<string, string> = {
  email: "E-mail",
  phone: "Telefon",
  meet: "Google Meet",
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — dla botów udajemy sukces.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = str(body.email, MAX_EMAIL);
  const company = str(body.company, MAX_COMPANY);
  const problemType = str(body.problemType, MAX_VALUE);
  const problemScale = str(body.problemScale, MAX_VALUE);
  const message = str(body.message, MAX_MESSAGE);
  const contactPref = str(body.contactPref, MAX_VALUE) || "email";

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
    "",
    "Opis:",
    message || "(brak)",
    "",
    utmLines ? `--- Atrybucja ---\n${utmLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const subjectCompany = company ? ` (${company})` : "";

  const { error } = await resend.emails.send({
    from: "Formularz Fluxlab <onboarding@resend.dev>",
    to: "iwanekpawel55@gmail.com",
    replyTo: email,
    subject: `Nowa diagnoza: ${problemTypeLabel}${subjectCompany}`,
    text,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości." },
      { status: 500 },
    );
  }

  // Auto-potwierdzenie do klienta — fire-and-forget, błędy nie blokują sukcesu.
  resend.emails
    .send({
      from: "Paweł — Fluxlab <onboarding@resend.dev>",
      to: email,
      subject: "Dostałem zgłoszenie — Fluxlab",
      text: `Cześć,

dzięki za opis procesu. Przejrzę zgłoszenie i wrócę z informacją, czy widzę potencjał na automatyzację oraz jaki byłby sensowny pierwszy krok — zwykle w ciągu 24h.

Jeśli widzę dopasowanie, zaproponuję termin krótkiej rozmowy. Jeśli proces wygląda na zbyt mały albo nieopłacalny do automatyzacji na tym etapie, napiszę to wprost — bez owijania w bawełnę.

Paweł
Fluxlab — Automatyzacja leadów, CRM i raportowania dla firm B2B
fluxlab.pl
`,
    })
    .catch((e) => console.error("[contact] auto-reply failed:", e));

  return NextResponse.json({ ok: true });
}
