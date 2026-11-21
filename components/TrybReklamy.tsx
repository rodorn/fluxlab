"use client";

import { useEffect } from "react";

/** Strona zbudowana pod reklamę działa w trybie reklamy także bez gclid w adresie:
 *  nagłówek bez menu, krótki baner zgody i pasek akcji na telefonie. */
export default function TrybReklamy() {
  useEffect(() => {
    document.documentElement.dataset.reklama = "";
  }, []);
  return null;
}
