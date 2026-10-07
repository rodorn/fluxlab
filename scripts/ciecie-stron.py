import json, os, re, glob, subprocess
os.chdir(os.path.expanduser("~/Projekty/fluxlab-site"))
M = json.load(open("scripts/ciecie-stron.json"))
for k in M:
    subprocess.run(["git", "rm", "-rq", "app" + k], check=True)

def usun_obiekty(s, sciezka):
    n = 0
    wz = re.compile(r'(href|url)\s*:\s*[`"](?:\$\{baseUrl\})?' + re.escape(sciezka) + r'(#[^"`]*)?[`"]')
    while True:
        zmiana = False
        for m in wz.finditer(s):
            i, d = m.start(), 0
            while i > 0:
                i -= 1
                if s[i] == "}": d += 1
                elif s[i] == "{":
                    if d == 0: break
                    d -= 1
            j, d = m.end(), 0
            while j < len(s):
                if s[j] == "{": d += 1
                elif s[j] == "}":
                    if d == 0: break
                    d -= 1
                j += 1
            k = i - 1
            while k >= 0 and s[k] in " \t\n": k -= 1
            if k < 0 or s[k] not in "[,": continue
            e = j + 1
            while e < len(s) and s[e] in " \t": e += 1
            if e < len(s) and s[e] == ",": e += 1
            a = i
            while a > 0 and s[a - 1] in " \t": a -= 1
            if a > 0 and s[a - 1] == "\n" and e < len(s) and s[e] == "\n": e += 1
            s = s[:a] + s[e:]; n += 1; zmiana = True
            break
        if not zmiana: return s, n

pliki = [f for f in glob.glob("app/**/*.ts*", recursive=True) + glob.glob("components/**/*.ts*", recursive=True) + glob.glob("lib/**/*.ts", recursive=True)]
raport = {}
for f in pliki:
    s0 = s = open(f).read()
    for k in sorted(M, key=len, reverse=True):
        s, n = usun_obiekty(s, k)
        if n: raport.setdefault(f, []).append(f"-{n} {k}")
        cel = M[k]
        s, n2 = re.subn(r'(["`(=])(?:https://fluxlab\.pl)?' + re.escape(k) + r'(?:#[\w-]*)?(?=["`)\s])', lambda m: m.group(1) + cel, s)
        if n2: raport.setdefault(f, []).append(f"~{n2} {k}->{cel}")
    if s != s0: open(f, "w").write(s)

if os.path.exists("public/llms.txt"):
    t = open("public/llms.txt").read().split("\n")
    t2 = [l for l in t if not any(re.search(re.escape("fluxlab.pl" + k) + r'(?![\w/-])', l) for k in M)]
    open("public/llms.txt", "w").write("\n".join(t2)); raport["public/llms.txt"] = [f"-{len(t)-len(t2)} linii"]

d = json.load(open("lib/daty-stron.json"))
for k in M: d.pop(k, None)
json.dump(d, open("lib/daty-stron.json", "w"), ensure_ascii=False, indent=2)

c = open("next.config.ts").read()
wpisy = "".join(f'      {{ source: "{k}", destination: "{v}", statusCode: 301 }},\n' for k, v in M.items())
c = c.replace("    return [\n", "    return [\n      // Strony usuniete 7.10.2026 (audyt: mniej stron, mniej tresci)\n" + wpisy, 1)
open("next.config.ts", "w").write(c)
for f, r in sorted(raport.items()): print(f, " ".join(r)[:300])
