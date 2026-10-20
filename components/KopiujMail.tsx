"use client";

import { useState } from "react";

/** Mail z przyciskiem kopiowania. Sam link mailto działa jak dotąd. */
export default function KopiujMail({ adres, className }: { adres: string; className?: string }) {
  const [skopiowano, setSkopiowano] = useState(false);

  async function kopiuj() {
    try {
      await navigator.clipboard.writeText(adres);
      setSkopiowano(true);
      window.setTimeout(() => setSkopiowano(false), 1800);
    } catch {
      window.location.href = `mailto:${adres}`;
    }
  }

  return (
    <span className="inline-flex items-center gap-2">
      <a href={`mailto:${adres}`} className={className}>
        {adres}
      </a>
      <button
        type="button"
        onClick={kopiuj}
        aria-label={`Skopiuj adres ${adres}`}
        className="cursor-pointer rounded-md border border-gray-200 px-2 py-0.5 text-xs text-gray-600 transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:text-white/70"
      >
        <span role="status">{skopiowano ? "Skopiowano" : "Kopiuj"}</span>
      </button>
    </span>
  );
}
