import { wywolajMonitoring } from "@/lib/monitoring";

export const runtime = "nodejs";

const strona = (tytul: string, tekst: string, formularz = "") =>
  new Response(
    `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${tytul}</title>` +
      `<style>body{margin:0;background:#f6f6f8;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827}main{max-width:480px;margin:12vh auto;padding:0 16px}` +
      `div{background:#fff;border-radius:14px;padding:28px 24px}h1{font-size:21px;margin:0 0 10px}p{line-height:1.55;color:#374151;margin:0 0 18px}` +
      `button,a.b{background:#4f46e5;color:#fff;border:0;border-radius:10px;padding:12px 20px;font-size:15px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-block}</style></head>` +
      `<body><main><div><h1>${tytul}</h1><p>${tekst}</p>${formularz}</div></main></body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );

const poprawny = (t: string | null) => !!t && /^[A-Za-z0-9_-]{16,40}$/.test(t);

export async function GET(req: Request) {
  const t = new URL(req.url).searchParams.get("t");
  if (!poprawny(t)) return strona("Nieprawidłowy link", "Ten link do wyłączenia pilnowania jest niepełny. Odpowiedz na mail z usługi, a wyłączymy ją ręcznie.");
  return strona(
    "Wyłączyć pilnowanie?",
    "Przestaniemy sprawdzać tę domenę i wysyłać wiadomości. Możesz włączyć usługę ponownie w dowolnej chwili.",
    `<form method="post" action="/api/monitoring/wypisz?t=${t}"><button type="submit">Wyłącz pilnowanie</button></form>`,
  );
}

export async function POST(req: Request) {
  const t = new URL(req.url).searchParams.get("t");
  if (!poprawny(t)) return strona("Nieprawidłowy link", "Ten link do wyłączenia pilnowania jest niepełny.");
  const { status, dane } = await wywolajMonitoring(`/wypisz?t=${t}`);
  if (status === 404) return strona("Już wyłączone", "Nie znamy tego linku albo pilnowanie zostało już wyłączone.");
  if (status !== 200) return strona("Nie udało się", "Coś poszło nie tak po naszej stronie. Spróbuj za chwilę albo odpowiedz na mail z usługi.");
  const cel = String(dane.cel ?? "").replace(/[<>&"]/g, "");
  return strona("Pilnowanie wyłączone", `Przestaliśmy pilnować ${cel}. Nie wyślemy już żadnej wiadomości w tej sprawie.`);
}
