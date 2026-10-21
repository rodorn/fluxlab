"use client";

import { useEffect } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];
const KOLORY = ["#4f46e5", "#6366f1", "#8b5cf6", "#a78bfa", "#312e81"];

function pokazToast() {
  const t = document.createElement("div");
  t.textContent = "Znalazłeś nasz easter egg. Lubimy ludzi, którzy sprawdzają szczegóły.";
  t.setAttribute("role", "status");
  t.style.cssText =
    "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:10000;pointer-events:none;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:12px;font:500 14px/1.4 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:90vw;text-align:center";
  document.body.appendChild(t);
  const a = t.animate(
    [
      { opacity: 0, transform: "translate(-50%,12px)" },
      { opacity: 1, transform: "translate(-50%,0)", offset: 0.1 },
      { opacity: 1, transform: "translate(-50%,0)", offset: 0.85 },
      { opacity: 0, transform: "translate(-50%,12px)" },
    ],
    { duration: 4500, easing: "ease-out" },
  );
  a.onfinish = () => t.remove();
}

function deszcz() {
  pokazToast();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const warstwa = document.createElement("div");
  warstwa.style.cssText =
    "position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:9999";
  document.body.appendChild(warstwa);
  const w = window.innerWidth;
  const h = window.innerHeight;
  const N = 60;
  let zostalo = N;
  for (let i = 0; i < N; i++) {
    const el = document.createElement("div");
    const rozm = 14 + Math.random() * 22;
    const kolor = KOLORY[i % KOLORY.length];
    const logo = i % 3 === 0;
    el.style.cssText = `position:absolute;top:0;left:${Math.random() * w}px;width:${rozm}px;height:${rozm}px;background:${kolor};border-radius:${logo ? "22%" : "50%"};color:#fff;font:700 ${rozm * 0.5}px/${rozm}px system-ui,sans-serif;text-align:center`;
    if (logo) el.textContent = "fl";
    warstwa.appendChild(el);
    const dryf = (Math.random() - 0.5) * 120;
    const a = el.animate(
      [
        { transform: `translate(0,-60px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${dryf}px,${h + 60}px) rotate(${(Math.random() - 0.5) * 720}deg)`, opacity: 1 },
      ],
      { duration: 1800 + Math.random() * 1000, delay: Math.random() * 1000, easing: "cubic-bezier(.4,0,.8,.6)", fill: "backwards" },
    );
    a.onfinish = () => {
      el.remove();
      if (--zostalo === 0) warstwa.remove();
    };
  }
  setTimeout(() => warstwa.remove(), 5000);
}

function faviconZKropka(href: string): Promise<string> {
  return new Promise((resolve) => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d");
    if (!ctx) return resolve(href);
    const kropka = () => {
      ctx.fillStyle = "#4f46e5";
      ctx.beginPath();
      ctx.arc(50, 14, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.stroke();
      resolve(c.toDataURL("image/png"));
    };
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 64, 64);
      kropka();
    };
    img.onerror = () => {
      ctx.fillStyle = "#4f46e5";
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = "#fff";
      ctx.font = "700 30px system-ui,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("fl", 28, 42);
      kropka();
    };
    img.src = href;
  });
}

export default function TytulKarty() {
  useEffect(() => {
    let zapamietany: string | null = null;
    let linkIkony: HTMLLinkElement | null = null;
    let staryHref: string | null = null;
    let dodany = false;
    let wersja = 0;

    const przywrocIkone = () => {
      wersja++;
      if (!linkIkony) return;
      if (dodany) linkIkony.remove();
      else if (staryHref !== null) linkIkony.href = staryHref;
      linkIkony = null;
      staryHref = null;
      dodany = false;
    };

    const onChange = () => {
      if (document.hidden) {
        zapamietany = document.title;
        document.title = "Wróć, mamy dla Ciebie cenę | Fluxlab";
        const biezaca = ++wersja;
        const link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
        const bazowy = link?.href ?? "/icon.svg";
        faviconZKropka(bazowy).then((url) => {
          if (biezaca !== wersja || !document.hidden) return;
          if (link) {
            linkIkony = link;
            staryHref = link.href;
          } else {
            linkIkony = document.createElement("link");
            linkIkony.rel = "icon";
            document.head.appendChild(linkIkony);
            dodany = true;
          }
          linkIkony.type = "image/png";
          linkIkony.href = url;
        });
      } else {
        if (zapamietany !== null) {
          document.title = zapamietany;
          zapamietany = null;
        }
        przywrocIkone();
      }
    };
    document.addEventListener("visibilitychange", onChange);

    // Nowa odpowiedź czatu, gdy karta jest w tle: tytuł zmienia się obok kropki w ikonie.
    const onCzat = () => {
      if (!document.hidden) return;
      if (zapamietany === null) zapamietany = document.title;
      document.title = "Nowa wiadomość od Fluxlab";
    };
    window.addEventListener("fluxlab:nowa-wiadomosc", onCzat);

    let idx = 0;
    let bufor = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = k === KONAMI[idx] ? idx + 1 : k === KONAMI[0] ? 1 : 0;
      if (e.key.length === 1) bufor = (bufor + k).slice(-7);
      if (idx === KONAMI.length) {
        idx = 0;
        document.documentElement.classList.toggle("blueprint");
        deszcz();
      } else if (bufor === "fluxlab") {
        bufor = "";
        deszcz();
      }
    };
    window.addEventListener("keydown", onKey);

    const w = window as unknown as { __fluxlabKonsola?: boolean };
    if (!w.__fluxlabKonsola) {
      w.__fluxlabKonsola = true;
      console.log(
        "%cZaglądasz pod maskę? Ta strona to Next.js na Vercelu. Szukasz partnera do projektu: pawel@fluxlab.pl",
        "color:#4f46e5;font-weight:bold;font-size:13px",
      );
    }
    return () => {
      document.removeEventListener("visibilitychange", onChange);
      window.removeEventListener("fluxlab:nowa-wiadomosc", onCzat);
      window.removeEventListener("keydown", onKey);
      przywrocIkone();
    };
  }, []);
  return null;
}
