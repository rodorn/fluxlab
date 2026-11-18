"use client";

import { useEffect, useRef } from "react";

/** Kalkulator demo z /public w ramce. Ramka dostaje czcionkę strony
 *  (reguły @font-face z dokumentu nadrzędnego, ten sam origin), żeby pola
 *  i przyciski nie wyglądały na doklejone. data-bez-paska chowa pasek
 *  „Bezpłatna wycena”, gdy kalkulator jest na ekranie. */
export default function KalkulatorIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  function dopasuj() {
    const doc = ref.current?.contentDocument;
    if (!doc || !ref.current || !doc.location.href.includes(src) || doc.getElementById("fl-kroj")) return;
    const kroj = getComputedStyle(document.body).fontFamily;
    const reguly: string[] = [];
    for (const arkusz of Array.from(document.styleSheets)) {
      try {
        for (const r of Array.from(arkusz.cssRules))
          if (r instanceof CSSFontFaceRule) reguly.push(r.cssText);
      } catch {}
    }
    const styl = doc.createElement("style");
    styl.id = "fl-kroj";
    styl.textContent = `${reguly.join("\n")}\n.fx-calc,.fx-calc input,.fx-calc select,.fx-calc button{font-family:${kroj}}`;
    doc.head.appendChild(styl);
    const ustaw = () => {
      if (ref.current)
        ref.current.style.height = `${doc.documentElement.scrollHeight}px`;
    };
    ustaw();
    new ResizeObserver(ustaw).observe(doc.body);
  }

  useEffect(() => {
    if (ref.current?.contentDocument?.readyState === "complete") dopasuj();
  });

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      onLoad={dopasuj}
      data-bez-paska=""
      data-kalkulator=""
      className="w-full h-[900px] rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10"
      loading="lazy"
    />
  );
}
