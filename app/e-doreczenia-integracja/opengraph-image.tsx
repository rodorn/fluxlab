import { ImageResponse } from "next/og";
import { PODMIOTY } from "@/lib/terminy-e-doreczen";

const CEIDG = PODMIOTY.find((p) => p.klucz === "ceidg-stare")!;

export const runtime = "edge";

export const alt =
  "Sprawdzenie e-Doręczeń w jednym kliknięciu: od kiedy Wasza firma musi mieć adres do doręczeń elektronicznych i ile dni zostało do 1 października 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const interBold = await fetch(
    new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const dni = Math.max(
    0,
    Math.ceil(
      (new Date(`${CEIDG.data}T00:00:00+02:00`).getTime() -
        Date.now()) /
        86_400_000,
    ),
  );

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        padding: "64px 72px",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#a5b4fc", fontWeight: 500 }}>
          Darmowe sprawdzenie, jedno kliknięcie, bez rejestracji
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "Inter",
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          Od kiedy Wasza firma musi mieć adres do e-Doręczeń?
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "28px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 700,
            fontFamily: "Inter",
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          {dni > 0 ? String(dni) : "Już"}
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#e0e7ff", lineHeight: 1.3 }}>
          {dni > 0
            ? `dni do 1 października 2026, gdy obowiązek obejmuje firmy z CEIDG wpisane przed 2025`
            : `od 1 października 2026 obowiązek obejmuje firmy z CEIDG wpisane przed 2025`}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, color: "#c7d2fe" }}>
          Termin i co zrobić, zanim minie
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#ffffff",
            fontWeight: 700,
            fontFamily: "Inter",
            whiteSpace: "nowrap",
          }}
        >
          fluxlab.pl/e-doreczenia-integracja
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Inter", data: interBold, weight: 700, style: "normal" }],
    },
  );
}
