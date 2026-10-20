import { ImageResponse } from "next/og";

export const runtime = "edge";

const rozmiar = { width: 1200, height: 630 };

export async function GET(req: Request) {
  const t = (new URL(req.url).searchParams.get("t") ?? "").replace(/\s*\|\s*Fluxlab\s*$/i, "").slice(0, 90).trim();
  const interBold = await fetch(
    new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url),
  ).then((r) => r.arrayBuffer());
  const maly = t.length > 55;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%)",
        padding: "72px",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#c7d2fe" }}>Fluxlab</div>
      <div
        style={{
          display: "flex",
          fontSize: maly ? 60 : 76,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-2px",
          lineHeight: 1.1,
          maxWidth: "1000px",
        }}
      >
        {t || "Strony internetowe i CRM dla firm"}
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#a5b4fc" }}>fluxlab.pl</div>
    </div>,
    { ...rozmiar, fonts: [{ name: "Inter", data: interBold, weight: 700, style: "normal" }] },
  );
}
