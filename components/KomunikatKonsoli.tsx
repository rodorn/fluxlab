"use client";

import { useEffect } from "react";

export default function KomunikatKonsoli() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("fl_konsola")) return;
      sessionStorage.setItem("fl_konsola", "1");
    } catch {}
    console.log(
      "%cSzukasz partnera do automatyzacji albo pracy? Napisz: pawel@fluxlab.pl",
      "color:#fff;background:#6366f1;padding:6px 10px;border-radius:6px;font-weight:600;font-size:13px",
    );
  }, []);
  return null;
}
