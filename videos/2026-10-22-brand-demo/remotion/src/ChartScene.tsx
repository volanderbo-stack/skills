import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./brand";

// Умовні значення для демонстрації (позначено в кадрі як приклад).
const BARS = [
  { label: "DNS", value: 0.42, accent: false },
  { label: "TLS", value: 0.64, accent: false },
  { label: "Сервер", value: 0.92, accent: true },
  { label: "Рендер", value: 0.55, accent: false },
];

export const ChartScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, padding: "110px 170px 150px", fontFamily: F.body, color: C.ink }}>
      <div
        style={{
          fontFamily: F.mono,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.blue,
          opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        розділ 03
      </div>
      <div style={{ overflow: "hidden", marginTop: 6 }}>
        <div
          style={{
            fontFamily: F.head,
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 1.05,
            textTransform: "uppercase",
            translate: interpolate(frame, [0.1 * fps, 0.75 * fps], ["0px 140px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Швидкість відповіді
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 70, marginTop: 50 }}>
        {BARS.map((b, i) => {
          const s = spring({ frame: frame - (0.5 + i * 0.12) * fps, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });
          return (
            <div key={b.label} style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ height: `${b.value * 100}%`, background: b.accent ? C.blue : C.surface, transformOrigin: "50% 100%", scale: `1 ${Math.max(0, s)}` }} />
              <div
                style={{
                  marginTop: 16,
                  fontFamily: F.mono,
                  fontWeight: 500,
                  fontSize: 30,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: b.accent ? C.blue : C.ink,
                }}
              >
                {b.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          right: 170,
          top: 128,
          fontFamily: F.mono,
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.ink,
          opacity: interpolate(frame, [1.2 * fps, 1.5 * fps], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        приклад · умовні дані
      </div>
    </AbsoluteFill>
  );
};
