import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  ladunekZgloszenia,
  adresZgloszen,
  wyslijZgloszenie,
} from "./zgloszenie-kolektor.ts";

const fetchOryginalny = globalThis.fetch;
const envOryginalne = { ...process.env };

beforeEach(() => {
  delete process.env.RUCH_SEKRET;
  delete process.env.RUCH_URL;
});

afterEach(() => {
  globalThis.fetch = fetchOryginalny;
  process.env.RUCH_SEKRET = envOryginalne.RUCH_SEKRET;
  process.env.RUCH_URL = envOryginalne.RUCH_URL;
  if (envOryginalne.RUCH_SEKRET === undefined) delete process.env.RUCH_SEKRET;
  if (envOryginalne.RUCH_URL === undefined) delete process.env.RUCH_URL;
});

test("ladunek kompletny: wszystkie pola przepisane, email malymi literami", () => {
  const l = ladunekZgloszenia({
    email: " Anna@Firma.PL ",
    firma: "Firma Sp. z o.o.",
    rodzaj_problemu: "leady",
    skala: "10-50",
    preferowany_kontakt: "email",
    opis: "Opis procesu",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "jesien",
    utm_term: "crm",
    utm_content: "a",
    landing_page: "/oferta",
    referrer: "https://google.com/",
    sesja: "abc",
  });
  assert.deepEqual(l, {
    email: "anna@firma.pl",
    firma: "Firma Sp. z o.o.",
    rodzaj_problemu: "leady",
    skala: "10-50",
    preferowany_kontakt: "email",
    opis: "Opis procesu",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "jesien",
    utm_term: "crm",
    utm_content: "a",
    landing_page: "/oferta",
    referrer: "https://google.com/",
    sesja: "abc",
  });
  assert.equal(Object.keys(l).length, 14);
});

test("ladunek uciety: dlugie pola do limitu, brakujace jako pusty tekst", () => {
  const l = ladunekZgloszenia({
    email: "a".repeat(400) + "@x.pl",
    firma: "f".repeat(300),
    opis: "o".repeat(6000),
    utm_source: "u".repeat(250),
    landing_page: "l".repeat(600),
  });
  assert.equal(l.email.length, 320);
  assert.equal(l.firma.length, 200);
  assert.equal(l.opis.length, 5000);
  assert.equal(l.utm_source.length, 200);
  assert.equal(l.landing_page.length, 500);
  assert.equal(l.skala, "");
  assert.equal(l.referrer, "");
  assert.equal(l.sesja, "");
});

test("adres konczy sie na /zgloszenie przy RUCH_URL z /wizyta", () => {
  process.env.RUCH_URL = "http://127.0.0.1:8097/wizyta";
  assert.equal(adresZgloszen(), "http://127.0.0.1:8097/zgloszenie");
  delete process.env.RUCH_URL;
  assert.equal(adresZgloszen(), "http://146.59.80.185:8087/zgloszenie");
});

test("bez sekretu nie ma zadnego fetch", async () => {
  let wywolan = 0;
  globalThis.fetch = (async () => {
    wywolan += 1;
    return new Response(null, { status: 204 });
  }) as typeof fetch;
  const wynik = await wyslijZgloszenie(ladunekZgloszenia({ email: "a@b.pl" }));
  assert.equal(wynik, false);
  assert.equal(wywolan, 0);
});

test("z sekretem: POST na /zgloszenie z naglowkiem X-Sekret i ladunkiem", async () => {
  process.env.RUCH_SEKRET = "test";
  process.env.RUCH_URL = "http://127.0.0.1:8097/wizyta";
  let adres = "";
  let init: RequestInit | undefined;
  globalThis.fetch = (async (u: string | URL | Request, i?: RequestInit) => {
    adres = String(u);
    init = i;
    return new Response(null, { status: 204 });
  }) as typeof fetch;
  const ladunek = ladunekZgloszenia({ email: "a@b.pl", firma: "X" });
  const wynik = await wyslijZgloszenie(ladunek);
  assert.equal(wynik, true);
  assert.equal(adres, "http://127.0.0.1:8097/zgloszenie");
  assert.equal(init?.method, "POST");
  assert.equal((init?.headers as Record<string, string>)["X-Sekret"], "test");
  assert.deepEqual(JSON.parse(String(init?.body)), ladunek);
  assert.ok(init?.signal instanceof AbortSignal);
});

test("blad fetch nie rzuca, tylko zwraca false", async () => {
  process.env.RUCH_SEKRET = "test";
  const bledy: unknown[] = [];
  const errorOryginalny = console.error;
  console.error = (...a: unknown[]) => {
    bledy.push(a);
  };
  try {
    globalThis.fetch = (async () => {
      throw new Error("polaczenie odrzucone");
    }) as typeof fetch;
    const wynik = await wyslijZgloszenie(
      ladunekZgloszenia({ email: "a@b.pl" }),
    );
    assert.equal(wynik, false);
    assert.equal(bledy.length, 1);

    globalThis.fetch = (async () =>
      new Response("nie ten sekret", { status: 403 })) as typeof fetch;
    const wynik2 = await wyslijZgloszenie(
      ladunekZgloszenia({ email: "a@b.pl" }),
    );
    assert.equal(wynik2, false);
    assert.equal(bledy.length, 2);
  } finally {
    console.error = errorOryginalny;
  }
});
