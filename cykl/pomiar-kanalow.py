#!/usr/bin/env python3
"""Pomiar kanalow ruchu jednym poleceniem: licznik na VPS, Resend, Zoho.

Sekcje: zrodla za 24 h i 7 dni, kampanie utm za 7 dni, zdarzenia za 7 dni,
sesje dzienne za 14 dni, statusy maili wyslanych w 24 h i odpowiedzi w Zoho.
Filtr botow pochodzi z raport_ruchu.py, zeby obie liczby sie zgadzaly.
"""

import email, glob, imaplib, json, os, subprocess, sys, urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timedelta, timezone
from email.header import decode_header
from email.utils import parsedate_to_datetime

sys.path.insert(0, os.path.expanduser("~/Projekty/fluxlab-ruch"))
from raport_ruchu import VPS, BAZA, bez_botow  # noqa: E402

PL = timezone(timedelta(hours=2))
MAIL = os.path.expanduser("~/Projekty/mail-audyt")
TERAZ = datetime.now(timezone.utc)
T = int(TERAZ.timestamp())
DOBA, TYDZIEN = T - 86400, T - 7 * 86400


def wiersze():
    # Uklad kolumn jak w raport_ruchu.pobierz (bez_botow czyta r[0], r[3], r[5]),
    # na koncu kampania.
    kod = (
        "import sqlite3,json;"
        "db=sqlite3.connect('%s');"
        "r=db.execute('SELECT czas,sciezka,COALESCE(zrodlo,\\'\\'),sesja,telefon,"
        "COALESCE(zdarzenie,\\'odslona\\'),COALESCE(kampania,\\'\\') FROM wizyty "
        "WHERE czas>%d').fetchall();"
        "print(json.dumps(r))" % (BAZA, T - 14 * 86400)
    )
    out = subprocess.run(
        ["ssh", "-o", "BatchMode=yes", VPS, 'python3 -c "%s"' % kod],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if out.returncode != 0:
        sys.exit("VPS: " + out.stderr.strip()[:200])
    return bez_botow(json.loads(out.stdout or "[]"))


def zrodlo(r):
    return r[2] or "(bez odsyłacza)"


def tabela(tytul, licznik, kol="sesje"):
    print(f"\n## {tytul}")
    if not licznik:
        print("  brak")
        return
    for k, v in sorted(
        licznik.items(), key=lambda x: -x[1][0] if isinstance(x[1], tuple) else -x[1]
    ):
        print(
            f"  {k:<40} {v[0] if isinstance(v, tuple) else v:>5}"
            + (f" {kol}, {v[1]} osób" if isinstance(v, tuple) else "")
        )


def ruch(w):
    odslony = [r for r in w if r[5] == "odslona"]
    for nazwa, od in (("24 h", DOBA), ("7 dni", TYDZIEN)):
        s = defaultdict(set)
        for r in odslony:
            if r[0] > od:
                s[zrodlo(r)].add(r[3])
        # Licznik nie ma identyfikatora osoby, sesja trwa do zamkniecia karty,
        # wiec osoby = sesje z jednego zrodla.
        print(
            f"\n## Źródła, {nazwa}: {len({r[3] for r in odslony if r[0] > od})} sesji, "
            f"{sum(1 for r in odslony if r[0] > od)} odsłon"
        )
        for k, v in sorted(s.items(), key=lambda x: -len(x[1])):
            print(f"  {k:<40} {len(v):>5}")

    k = defaultdict(set)
    for r in odslony:
        if r[0] > TYDZIEN and r[6]:
            k[f"{r[2]} / {r[6]}"].add(r[3])
    tabela("Kampanie utm, 7 dni (sesje)", {a: len(b) for a, b in k.items()})

    z = Counter(f"{r[5]}  {r[1]}" for r in w if r[0] > TYDZIEN and r[5] != "odslona")
    tabela("Zdarzenia, 7 dni (uruchomienia narzędzi, lead_*, klik_po_wyniku)", z)

    print("\n## Sesje dziennie, 14 dni")
    dni = defaultdict(set)
    for r in odslony:
        dni[datetime.fromtimestamp(r[0], PL).strftime("%Y-%m-%d %a")].add(r[3])
    for d in sorted(dni):
        print(f"  {d}  {len(dni[d]):>4}  " + "#" * len(dni[d]))


def resend():
    klucz = json.load(open(os.path.expanduser("~/.config/resend/full.json")))["api_key"]
    segment = {}
    for p in glob.glob(f"{MAIL}/wyslane*.json"):
        for adres in json.load(open(p)):
            segment[adres.lower()] = os.path.basename(p)[:-5]
    maile, po = [], None
    while True:
        url = "https://api.resend.com/emails?limit=100" + (f"&after={po}" if po else "")
        req = urllib.request.Request(
            url,
            headers={
                "Authorization": f"Bearer {klucz}",
                "User-Agent": "curl/8.5.0",
                "Accept": "*/*",
            },
        )
        d = json.loads(urllib.request.urlopen(req, timeout=30).read())
        stare = False
        for m in d["data"]:
            kiedy = datetime.fromisoformat(m["created_at"].replace("+00", "+00:00"))
            if kiedy.timestamp() < DOBA:
                stare = True
                break
            maile.append(m)
        if stare or not d.get("has_more"):
            break
        po = d["data"][-1]["id"]
    print(f"\n## Resend, wysłane w 24 h: {len(maile)}")
    c = Counter(
        (segment.get(m["to"][0].lower(), "spoza wyslane*.json"), m["last_event"])
        for m in maile
    )
    for (s, st), n in sorted(c.items()):
        print(f"  {s:<28} {st:<14} {n:>4}")
    for m in maile:
        if m["last_event"] in ("bounced", "complained", "failed"):
            print(f"  ! {m['to'][0]} -> {m['last_event']}")


def dek(s):
    return "".join(
        t.decode(e or "utf-8", "ignore") if isinstance(t, bytes) else t
        for t, e in decode_header(s or "")
    )


def zoho():
    c = json.load(open(os.path.expanduser("~/.config/zoho/imap.json")))
    M = imaplib.IMAP4_SSL("imap.zoho.eu", 993, timeout=25)
    M.login(c["user"], c["app_password"])
    od = (TERAZ - timedelta(days=1)).strftime("%d-%b-%Y")
    print("\n## Zoho, wiadomości przychodzące w 24 h")
    for folder in ("INBOX", "Spam"):
        if M.select(folder, readonly=True)[0] != "OK":
            print(f"  {folder}: nie da się otworzyć")
            continue
        lista = []
        for i in M.search(None, "SINCE", od)[1][0].split():
            h = email.message_from_bytes(
                M.fetch(i, "(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])")[1][0][1]
            )
            try:
                if parsedate_to_datetime(h["Date"]).timestamp() < DOBA:
                    continue
            except (TypeError, ValueError):
                pass
            nadawca = dek(h["From"])
            if "fluxlab.pl" in nadawca:
                continue
            lista.append((nadawca, dek(h["Subject"])))
        print(f"  {folder}: {len(lista)}")
        for n, t in lista:
            print(f"    {n[:50]} | {t[:70]}")
    M.logout()


if __name__ == "__main__":
    print(f"# Pomiar kanałów, {datetime.now(PL):%Y-%m-%d %H:%M}")
    ruch(wiersze())
    resend()
    zoho()
