import { ImageResponse } from "next/og";

export const alt = "PlainCost Insights — AWS costs in plain English";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#059669",
              borderRadius: 16,
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            PC
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            PlainCost Insights
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            AWS costs in plain English
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#475569",
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            Weekly reports that show what you spent, what changed, and where
            you can save — no cloud team required.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#047857",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: "#ecfdf5",
              color: "#047857",
            }}
          >
            plaincost.ai
          </div>
          <span style={{ color: "#94a3b8", fontWeight: 500 }}>
            For teams spending $500–$5k/month on AWS
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}