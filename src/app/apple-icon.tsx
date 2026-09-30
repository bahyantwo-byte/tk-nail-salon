import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#251a1c",
          color: "#faf5f0",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        TK
      </div>
    ),
    size,
  );
}
