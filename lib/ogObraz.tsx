import { ImageResponse } from "next/og";

export const ogRozmiar = { width: 1200, height: 630 };

export async function ogObraz(tytul: string, nadtytul: string) {
  const interBold = await fetch(
    new URL("../public/fonts/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

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
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <svg viewBox="0 0 1080 1080" width="64" height="64">
          <rect width="1080" height="1080" rx="240" fill="#6366f1" />
          <g
            fill="none"
            stroke="#fff"
            strokeWidth="100"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M380 800 V410 Q380 290 500 290 H590" />
            <path d="M270 540 H500" />
            <path d="M760 290 V800" />
          </g>
          <g fill="#fff">
            <circle cx="590" cy="540" r="36" opacity="0.95" />
            <circle cx="660" cy="540" r="26" opacity="0.7" />
            <circle cx="702" cy="540" r="14" opacity="0.45" />
          </g>
        </svg>
        <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-1px" }}>
          Fluxlab
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ fontSize: 28, color: "#a5b4fc", fontWeight: 700 }}>
          {nadtytul}
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            maxWidth: "1020px",
          }}
        >
          {tytul.replace(/(^|\s)([aiouwzAIOUWZ]) /g, "$1$2\u00a0")}
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#a5b4fc" }}>
        fluxlab.pl
      </div>
    </div>,
    {
      ...ogRozmiar,
      fonts: [{ name: "Inter", data: interBold, weight: 700, style: "normal" }],
    },
  );
}
