import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Fluxlab, Automatyzacja procesow biznesowych i CRM dla firm B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const interBold = await fetch(
    new URL("../public/fonts/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
        padding: "60px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <svg viewBox="0 0 1080 1080" width="96" height="96">
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
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              fontFamily: "Inter",
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            Fluxlab
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#c7d2fe",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Automatyzacja procesow biznesowych, CRM, raportowania i integracji API
          dla firm B2B
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "24px",
          }}
        >
          {["CRM", "Raportowanie", "API", "AI"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#e0e7ff",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          fontSize: 18,
          color: "#a5b4fc",
        }}
      >
        fluxlab.pl
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Inter", data: interBold, weight: 700, style: "normal" }],
    },
  );
}
