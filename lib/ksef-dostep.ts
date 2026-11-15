import { constants, publicEncrypt } from "node:crypto";

export const PRODUKTY_KSEF = ["paczka-biuro", "faktury-kosztowe", "kontrola-faktur"];

export function nipOk(nip: string): boolean {
  if (!/^\d{10}$/.test(nip)) return false;
  const w = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  return w.reduce((a, k, i) => a + k * Number(nip[i]), 0) % 11 === Number(nip[9]);
}

export function zaszyfruj(dane: { nip: string; token: string }): string {
  const pem = (process.env.KSEF_RSA_PUB ?? "").replace(/\\n/g, "\n");
  if (!pem.includes("PUBLIC KEY")) throw new Error("brak KSEF_RSA_PUB");
  return publicEncrypt(
    { key: pem, padding: constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
    Buffer.from(JSON.stringify(dane)),
  ).toString("base64");
}

export type Dostep = {
  nip: string;
  blob: string;
  srodowisko: "prod" | "test";
  produkt: string;
  email: string;
  biuro: string;
  subskrypcja: string;
  sesja: string;
  status: "nowy" | "aktywny" | "blad_tokenu" | "wylaczony";
  blad_mail?: string;
  przypomnienie?: string;
  wyslano: Record<string, string>;
};
