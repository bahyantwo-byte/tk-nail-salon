import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#251a1c",
          color: "#faf5f0",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#f0d9dc",
          }}
        >
          Burlington, Massachusetts
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1,
            marginTop: 24,
          }}
        >
          T&amp;K Nail Salon
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 28, color: "#faf5f0cc" }}>
          Manicure · Pedicure · Acrylics · Waxing · Lash Extensions
        </div>
      </div>
    ),
    size,
  );
}
