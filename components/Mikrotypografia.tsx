"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Twarda spacja po jednoliterowych spójnikach i przyimkach oraz między liczbą
 *  a jednostką, żeby „w”, „z” czy „5” nie zostawały same na końcu wiersza. */
const JEDNOLITEROWE = /(^|[\s(„])([aiouwzAIOUWZ]|\d+)[ ](?=\S)/g;
const POMIN = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE", "PRE"]);

function popraw(korzen: Node) {
  const spacer = document.createTreeWalker(korzen, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement && !POMIN.has(n.parentElement.tagName) && / /.test(n.nodeValue ?? "")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  for (let n = spacer.nextNode(); n; n = spacer.nextNode()) {
    const nowy = n.nodeValue!.replace(JEDNOLITEROWE, "$1$2 ").replace(JEDNOLITEROWE, "$1$2 ");
    if (nowy !== n.nodeValue) n.nodeValue = nowy;
  }
}

export default function Mikrotypografia() {
  const sciezka = usePathname();
  useEffect(() => {
    const id = requestAnimationFrame(() => popraw(document.body));
    return () => cancelAnimationFrame(id);
  }, [sciezka]);
  return null;
}
