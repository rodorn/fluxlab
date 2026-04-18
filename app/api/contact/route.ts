import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_COMPANY = 200;
const MAX_EMAIL = 320;
const MAX_PHONE = 40;
const MAX_TIME = 200;
const MAX_MESSAGE = 5000;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot – botów nie pytamy, po prostu udajemy sukces.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, MAX_NAME);
  const company = str(body.company, MAX_COMPANY);
  const email = str(body.email, MAX_EMAIL);
  const phone = str(body.phone, MAX_PHONE);
  const contactMethod = body.contactMethod === "phone" ? "phone" : "email";
  const contactTime = str(body.contactTime, MAX_TIME);
  const message = str(body.message, MAX_MESSAGE);

  if (!name || !email || !message) {
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
  if (message.length < 5) {
    return NextResponse.json(
      { error: "Wiadomość jest za krótka." },
      { status: 400 },
    );
  }

  const contactMethodLabel = contactMethod === "phone" ? "Telefon" : "E-mail";

  const { error } = await resend.emails.send({
    from: "Formularz Fluxlab <onboarding@resend.dev>",
    to: "iwanekpawel55@gmail.com",
    replyTo: email,
    subject: `Nowe zapytanie od ${name}${company ? ` (${company})` : ""}`,
    text: `Imię i nazwisko: ${name}\nFirma: ${company || "-"}\nE-mail: ${email}\nTelefon: ${phone || "-"}\nPreferowany kontakt: ${contactMethodLabel}\nPreferowany czas kontaktu: ${contactTime || "-"}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: "Nie udało się wysłać wiadomości." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
