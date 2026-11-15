import { NextResponse } from "next/server";

import { wyslij } from "@/lib/audyt-wyslij";
import { anulujIZwroc, dzienWarszawa, godzinaWarszawa, oznacz, subskrypcja, zamowieniaProduktu } from "@/lib/automaty/zamowienia";
import { BladKlucza, kluczPoprawny, sprawdzKlucz, zbierz, zlozMail } from "@/lib/automaty/sprzedaz-dzien";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GODZINA_RAPORTU = 7;

type Wynik = { produkt: string; sesja: string; wynik: string };

const PRZEPROSINY = (powod: string) => ({
  temat: "Zwracamy pieniądze: nie udało się uruchomić raportu",
  tekst:
    `Dzień dobry,\n\nnie udało się uruchomić codziennego raportu sprzedaży: ${powod}\n\n` +
    "Anulowaliśmy subskrypcję i zwróciliśmy całą opłatę, pieniądze wrócą na kartę w kilka dni. " +
    "Przepraszamy za kłopot. Jeśli chcesz spróbować jeszcze raz, zamów raport ponownie i wklej klucz utworzony według instrukcji na stronie: https://fluxlab.pl/sprzedaz-stripe-codziennie\n\nFluxlab",
});

async function sprzedazStripe(): Promise<Wynik[]> {
  const wyniki: Wynik[] = [];
  const dzis = dzienWarszawa();
  for (const z of await zamowieniaProduktu("sprzedaz-stripe-dzien")) {
    const log = (wynik: string) => wyniki.push({ produkt: "sprzedaz-stripe-dzien", sesja: z.sesja, wynik });
    try {
      const sub = await subskrypcja(z.subskrypcja);
      if (!["active", "trialing"].includes(sub.status)) continue;
      const meta = sub.metadata ?? {};
      const pierwszy = !meta.ostatni_raport;
      if (meta.ostatni_raport === dzis) continue;
      if (!pierwszy && godzinaWarszawa() < GODZINA_RAPORTU) continue;
      if (meta.blad) continue;

      const klucz = z.dane.replace(/\s+/g, "");
      const odpowiedz = async (temat: string, tekst: string) => {
        if (!(await wyslij(z.email, temat, `<pre style="font-family:Arial,sans-serif;font-size:15px;white-space:pre-wrap">${tekst.replace(/[<>&]/g, "")}</pre>`, tekst)))
          throw new Error("mail nie wyszedł");
      };

      if (!kluczPoprawny(klucz)) {
        if (pierwszy) {
          const p = PRZEPROSINY("klucz Stripe wpisany przy zamówieniu ma zły format.");
          await odpowiedz(p.temat, p.tekst);
          await anulujIZwroc(z.subskrypcja);
          log("zwrot: zły format klucza");
        }
        continue;
      }
      try {
        if (pierwszy) await sprawdzKlucz(klucz);
        const rap = await zbierz(klucz);
        const m = zlozMail(rap, pierwszy);
        if (!(await wyslij(z.email, m.temat, m.html, m.tekst))) throw new Error("mail nie wyszedł");
        await oznacz(z.subskrypcja, { ostatni_raport: dzis });
        log(pierwszy ? "pierwszy raport wysłany" : "raport wysłany");
      } catch (e) {
        if (!(e instanceof BladKlucza)) throw e;
        if (pierwszy) {
          const p = PRZEPROSINY("Stripe odrzucił podany klucz (nie działa albo nie ma uprawnienia do odczytu płatności).");
          await odpowiedz(p.temat, p.tekst);
          await anulujIZwroc(z.subskrypcja);
          log("zwrot: klucz odrzucony");
        } else {
          await odpowiedz(
            "Raport sprzedaży wstrzymany: klucz Stripe przestał działać",
            "Dzień dobry,\n\nStripe odrzucił klucz, którym czytamy Twoje płatności (mógł zostać usunięty albo wygasnąć), więc raport jest wstrzymany. Utwórz nowy klucz tylko do odczytu i odpisz na tę wiadomość, podmienimy go. Do tego czasu możesz zrezygnować w dowolnej chwili, bez dalszych opłat.\n\nFluxlab",
          );
          await oznacz(z.subskrypcja, { blad: dzis });
          log("wstrzymany: klucz przestał działać");
        }
      }
    } catch (e) {
      console.error("[automaty/tick] sprzedaz-stripe-dzien", z.sesja, e);
      log(`błąd: ${e instanceof Error ? e.message : "nieznany"}`);
    }
  }
  return wyniki;
}

export async function GET(req: Request) {
  const sekret = process.env.AUTOMATY_TICK_SEKRET;
  if (!sekret || req.headers.get("authorization") !== `Bearer ${sekret}`)
    return NextResponse.json({ error: "brak dostępu" }, { status: 401 });
  const wyniki = [...(await sprzedazStripe())];
  return NextResponse.json({ ok: true, wyniki });
}
