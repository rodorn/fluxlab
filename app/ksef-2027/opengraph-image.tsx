import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "KSeF od 1 stycznia 2027: darmowa lista kontrolna dla firm i biur rachunkowych";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const punkty = [
  "Koniec limitu 10 tys. zł poza KSeF",
  "Faktury z kasy fiskalnej przez KSeF",
  "Numer KSeF w tytule przelewu",
  "Faktura kosztowa doręczona w dniu nadania numeru",
];

export default function OGImage() {
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
        <div style={{ fontSize: 26, color: "#a5b4fc", fontWeight: 500 }}>
          Darmowa lista kontrolna, bez rejestracji
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: 1.1,
          }}
        >
          KSeF od 1 stycznia 2027
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {punkty.map((p) => (
          <div
            key={p}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 30,
              color: "#e0e7ff",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "30px",
                height: "30px",
                borderRadius: "6px",
                border: "3px solid #a5b4fc",
              }}
            />
            {p}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ fontSize: 24, color: "#c7d2fe" }}>
          Plus gotowa wiadomość dla biur rachunkowych do klientów
        </div>
        <div style={{ fontSize: 26, color: "#ffffff", fontWeight: 700 }}>
          fluxlab.pl/ksef-2027
        </div>
      </div>
    </div>,
    { ...size },
  );
}
