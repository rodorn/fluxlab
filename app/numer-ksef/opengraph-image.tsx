import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Sprawdzenie numeru KSeF za darmo: suma kontrolna, NIP sprzedawcy i data przyjęcia faktury, liczone w przeglądarce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const interBold = await fetch(
    new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url),
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#a5b4fc",
            fontWeight: 500,
          }}
        >
          Darmowe sprawdzenie, bez rejestracji, liczone w przeglądarce
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
          Numer KSeF ma literówkę?
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "28px" }}>
        <div
          style={{
            display: "flex",
            fontSize: 46,
            fontWeight: 700,
            fontFamily: "Inter",
            letterSpacing: "-1px",
            lineHeight: 1.25,
            color: "#e0e7ff",
          }}
        >
          Sprawdzamy sumę kontrolną, NIP sprzedawcy i datę przyjęcia, zanim
          numer trafi do przelewu
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
          Od 1 stycznia 2027 numer KSeF trafia do tytułu przelewu
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
          fluxlab.pl/numer-ksef
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Inter", data: interBold, weight: 700, style: "normal" }],
    },
  );
}
