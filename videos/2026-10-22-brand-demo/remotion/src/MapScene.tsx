import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./brand";

// Схематичний маршрут (без картографічного сервісу й ключів): лінія малюється від точки до точки.
const ROUTE = "M1520 400 C 1200 480, 900 380, 700 520 S 420 600, 380 640";

export const MapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [0.5 * fps, 2.4 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const a = spring({ frame: frame - 0.25 * fps, fps, config: { damping: 12 } });
  const b = spring({ frame: frame - 2.35 * fps, fps, config: { damping: 10 } });
  const labelB = interpolate(frame, [2.4 * fps, 2.7 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <g stroke={C.surface} strokeWidth={2}>
          {[270, 540, 810].map((y) => (
            <line key={y} x1={0} y1={y} x2={1920} y2={y} />
          ))}
          {[480, 960, 1440].map((x) => (
            <line key={x} x1={x} y1={0} x2={x} y2={1080} />
          ))}
        </g>
        <path d="M300 690 C 520 470, 820 760, 1060 560 S 1460 380, 1600 430" fill="none" stroke={C.surface} strokeWidth={70} strokeLinecap="round" opacity={0.7} />
        <path d={ROUTE} fill="none" stroke={C.blue} strokeWidth={12} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={draw} />
        <circle cx={1520} cy={400} r={26 * Math.max(0, a)} fill={C.ink} />
        <circle cx={380} cy={640} r={32 * Math.max(0, b)} fill={C.blue} />
        <circle cx={380} cy={640} r={12 * Math.max(0, b)} fill={C.onBlue} />
        <text x={1520} y={340} textAnchor="middle" fontFamily={F.head} fontWeight={700} fontSize={72} fill={C.ink} opacity={Math.min(1, Math.max(0, a))}>
          КИЇВ
        </text>
        <text x={380} y={750} textAnchor="middle" fontFamily={F.head} fontWeight={700} fontSize={72} fill={C.blue} opacity={labelB}>
          ЛЬВІВ
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 90,
          fontFamily: F.mono,
          fontWeight: 500,
          fontSize: 30,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: C.blue,
        }}
      >
        маршрут · схема
      </div>
    </AbsoluteFill>
  );
};
