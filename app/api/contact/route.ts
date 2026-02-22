import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, company, email, phone, contactMethod, contactTime, message } = await req.json();

  const contactMethodLabel = contactMethod === "phone" ? "Telefon" : "E-mail";

  const { error } = await resend.emails.send({
    from: "Formularz Fluxlab <onboarding@resend.dev>",
    to: "iwanekpawel55@gmail.com",
    replyTo: email,
    subject: `Nowe zapytanie od ${name}${company ? ` (${company})` : ""}`,
    text: `Imię i nazwisko: ${name}\nFirma: ${company || "-"}\nE-mail: ${email}\nTelefon: ${phone || "-"}\nPreferowany kontakt: ${contactMethodLabel}\nPreferowany czas kontaktu: ${contactTime || "-"}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
