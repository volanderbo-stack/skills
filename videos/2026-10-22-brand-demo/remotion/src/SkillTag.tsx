import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./brand";

// Підпис «яким скілом зроблено» по центру знизу; з'являється й зникає в межах свого Sequence.
export const SkillTag: React.FC<{ skill: string }> = ({ skill }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 40 }}>
      <div
        style={{
          background: C.ink,
          color: C.bg,
          fontFamily: F.mono,
          fontWeight: 500,
          fontSize: 24,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "12px 26px",
          borderRadius: 999,
          display: "flex",
          gap: 14,
          alignItems: "center",
          opacity: interpolate(frame, [0.3 * fps, 0.6 * fps, durationInFrames - 0.5 * fps, durationInFrames - 0.2 * fps], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(frame, [0.3 * fps, 0.7 * fps], ["0px 20px", "0px 0px"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 6, background: C.blue }} />
        скіл · {skill}
      </div>
    </AbsoluteFill>
  );
};
