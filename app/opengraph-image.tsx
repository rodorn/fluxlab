import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Fluxlab — Automatyzacja procesow biznesowych i CRM dla firm B2B";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)",
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
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
            }}
          >
            Fluxlab
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
            Automatyzacja procesow biznesowych, CRM, raportowania i integracji
            API dla firm B2B
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
      </div>
    ),
    { ...size },
  );
}
