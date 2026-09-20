import { NextResponse } from "next/server";
import tls from "node:tls";

export const runtime = "nodejs";
export const maxDuration = 30;

// Certyfikaty wspoldzielone hostingow. Gdy serwer klienta podaje taki
// certyfikat, przegladarka traktuje to jak podszycie i blokuje wejscie.
const HOSTINGI: Array<{ wzorzec: string; nazwa: string }> = [
  { wzorzec: "home.pl", nazwa: "home.pl" },
  { wzorzec: "nazwa.pl", nazwa: "nazwa.pl" },
  { wzorzec: "cyber-folks", nazwa: "cyber_Folks" },
  { wzorzec: "lh.pl", nazwa: "LH.pl" },
  { wzorzec: "beep.pl", nazwa: "beep.pl" },
  { wzorzec: "dhosting", nazwa: "dhosting" },
  { wzorzec: "kei.pl", nazwa: "kei.pl" },
  { wzorzec: "ovh", nazwa: "OVH" },
  { wzorzec: "az.pl", nazwa: "az.pl" },
  { wzorzec: "hekko", nazwa: "Hekko" },
  { wzorzec: "zenbox", nazwa: "Zenbox" },
  { wzorzec: "seohost", nazwa: "SeoHost" },
];

type Cert = {
  nazwy: string[];
  wystawca: string;
  waznyDo: string | null;
  dniDoKonca: number | null;
};

function czystaDomena(raw: string): string {
  return (raw || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^.*@/, "")
    .replace(/\/.*$/, "")
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");
}

function nazwyZCertu(cert: tls.PeerCertificate): string[] {
  const nazwy = new Set<string>();
  if (cert.subjectaltname) {
    for (const wpis of cert.subjectaltname.split(",")) {
      const t = wpis.trim();
      if (t.startsWith("DNS:")) nazwy.add(t.slice(4).toLowerCase());
    }
  }
  const cn = cert.subject?.CN;
  if (cn) nazwy.add(String(cn).toLowerCase());
  return [...nazwy];
}

function pasuje(domena: string, nazwy: string[]): boolean {
  const kandydaci = [domena, `www.${domena}`];
  return nazwy.some((n) => {
    if (kandydaci.includes(n)) return true;
    if (n.startsWith("*.")) {
      const korzen = n.slice(2);
      return kandydaci.some((k) => k.split(".").slice(1).join(".") === korzen);
    }
    return false;
  });
}

// Node oddaje pelny certyfikat nawet przy rejectUnauthorized: false, wiec da sie
// powiedziec, CO jest zle, a nie tylko ze weryfikacja padla.
function pobierzCert(domena: string): Promise<{
  zaufany: boolean;
  cert: Cert | null;
  blad: string | null;
}> {
  return new Promise((resolve) => {
    let zakonczone = false;
    const koniec = (w: {
      zaufany: boolean;
      cert: Cert | null;
      blad: string | null;
    }) => {
      if (!zakonczone) {
        zakonczone = true;
        resolve(w);
      }
    };

    const socket = tls.connect(
      {
        host: domena,
        port: 443,
        servername: domena,
        rejectUnauthorized: false,
        timeout: 12000,
      },
      () => {
        const surowy = socket.getPeerCertificate();
        const zaufany = socket.authorized;
        let cert: Cert | null = null;
        if (surowy && Object.keys(surowy).length > 0) {
          const waznyDo = surowy.valid_to || null;
          const dni = waznyDo
            ? Math.floor(
                (new Date(waznyDo).getTime() - Date.now()) / 86_400_000,
              )
            : null;
          cert = {
            nazwy: nazwyZCertu(surowy),
            wystawca: String(surowy.issuer?.O || surowy.issuer?.CN || ""),
            waznyDo,
            dniDoKonca: Number.isFinite(dni as number) ? dni : null,
          };
        }
        socket.end();
        koniec({
          zaufany,
          cert,
          blad: zaufany ? null : socket.authorizationError?.toString() || "nieznany",
        });
      },
    );

    socket.on("timeout", () => {
      socket.destroy();
      koniec({ zaufany: false, cert: null, blad: "TIMEOUT" });
    });
    socket.on("error", (e: NodeJS.ErrnoException) => {
      socket.destroy();
      koniec({ zaufany: false, cert: null, blad: e.code || e.message });
    });
  });
}

// Sprawdzamy sam naglowek Location. Podazenie za przekierowaniem na zepsute
// https konczy sie bledem i gubimy informacje, ze przekierowanie istnieje,
// a to wlasnie ono czyni strone nieosiagalna.
async function httpPrzekierowuje(domena: string): Promise<{
  dziala: boolean;
  naHttps: boolean;
}> {
  try {
    const r = await fetch(`http://${domena}/`, {
      redirect: "manual",
      headers: { "User-Agent": "FluxLab-TLS-Check/1.0 (+https://fluxlab.pl)" },
      signal: AbortSignal.timeout(10_000),
    });
    const cel = r.headers.get("location") || "";
    return { dziala: true, naHttps: cel.startsWith("https://") };
  } catch {
    return { dziala: false, naHttps: false };
  }
}

export async function POST(request: Request) {
  let domena = "";
  try {
    const body = await request.json();
    domena = czystaDomena(body?.domena);
  } catch {
    return NextResponse.json({ error: "Nieprawidłowe zapytanie." }, { status: 400 });
  }

  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domena)) {
    return NextResponse.json(
      { error: "Podaj sam adres strony, na przykład twojafirma.pl" },
      { status: 400 },
    );
  }

  const [tlsWynik, http] = await Promise.all([
    pobierzCert(domena),
    httpPrzekierowuje(domena),
  ]);

  const { zaufany, cert, blad } = tlsWynik;
  let klasa = "OK";
  let naglowek = "Połączenie szyfrowane działa poprawnie";
  let opis =
    "Przeglądarka otwiera Twoją stronę bez ostrzeżeń, a kłódka przy adresie jest zamknięta.";
  let hosting: string | null = null;

  if (blad === "TIMEOUT" || blad === "ECONNREFUSED" || blad === "ENOTFOUND") {
    klasa = blad === "ENOTFOUND" ? "BRAK_DOMENY" : "BRAK_443";
    naglowek =
      blad === "ENOTFOUND"
        ? "Nie znalazłem takiej domeny"
        : "Serwer nie obsługuje połączenia szyfrowanego";
    opis =
      blad === "ENOTFOUND"
        ? "Sprawdź pisownię adresu. Jeśli jest poprawny, domena nie wskazuje na żaden serwer."
        : "Każde wejście na adres zaczynający się od https kończy się błędem, bo serwer nie odpowiada na tym porcie.";
  } else if (!zaufany && cert) {
    const przeterminowany = cert.dniDoKonca !== null && cert.dniDoKonca < 0;
    const niepasuje = cert.nazwy.length > 0 && !pasuje(domena, cert.nazwy);
    if (przeterminowany) {
      klasa = "WYGASLY";
      naglowek = "Certyfikat Twojej strony wygasł";
      opis = `Stracił ważność ${Math.abs(cert.dniDoKonca as number)} dni temu. Przeglądarka pokazuje odwiedzającym pełnoekranowe ostrzeżenie o niebezpiecznym połączeniu.`;
    } else if (niepasuje) {
      klasa = "CERT_NIE_TEJ_DOMENY";
      const trafiony = HOSTINGI.find((h) =>
        cert.nazwy.some((n) => n.includes(h.wzorzec)),
      );
      hosting = trafiony?.nazwa || null;
      naglowek = "Certyfikat nie należy do Twojej domeny";
      opis = hosting
        ? `Twój serwer podaje certyfikat współdzielony firmy ${hosting}, a nie certyfikat wystawiony na Twoją domenę. Przeglądarka traktuje to jak próbę podszycia się pod cudzą stronę i blokuje wejście.`
        : "Certyfikat jest wystawiony na inną nazwę niż Twoja domena, więc przeglądarka blokuje wejście i ostrzega odwiedzającego.";
    } else {
      klasa = "BLAD_CERTYFIKATU";
      naglowek = "Połączenie szyfrowane nie jest zaufane";
      opis =
        "Przeglądarka odrzuca certyfikat tej strony. Najczęściej brakuje certyfikatu pośredniego, który serwer powinien podawać razem z własnym.";
    }
  } else if (!zaufany) {
    klasa = "BLAD_CERTYFIKATU";
    naglowek = "Nie udało się nawiązać bezpiecznego połączenia";
    opis = "Serwer odpowiada na porcie szyfrowanym, ale połączenie kończy się błędem.";
  } else if (cert?.dniDoKonca !== null && (cert?.dniDoKonca as number) < 21) {
    klasa = "WYGASA_WKROTCE";
    naglowek = `Certyfikat wygasa za ${cert?.dniDoKonca} dni`;
    opis =
      "Dziś jest jeszcze w porządku, ale po tej dacie strona zacznie straszyć odwiedzających. Warto ustawić odnawianie zanim to nastąpi.";
  }

  const stronaNiedostepna = http.naHttps && klasa !== "OK" && klasa !== "WYGASA_WKROTCE";
  // Literowka w adresie to nie jest usterka strony, wiec nie strasz czerwonym.
  const werdykt =
    klasa === "OK"
      ? "ZIELONY"
      : klasa === "WYGASA_WKROTCE" || klasa === "BRAK_DOMENY"
        ? "ZOLTY"
        : "CZERWONY";

  return NextResponse.json({
    domena,
    klasa,
    werdykt,
    naglowek,
    opis,
    stronaNiedostepna,
    hosting,
    http: { dziala: http.dziala, przekierowujeNaHttps: http.naHttps },
    cert: cert
      ? {
          wystawionyNa: cert.nazwy.slice(0, 4),
          wystawca: cert.wystawca,
          waznyDo: cert.waznyDo,
          dniDoKonca: cert.dniDoKonca,
        }
      : null,
  });
}
