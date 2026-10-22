import type { Caption } from "@remotion/captions";
import { createTikTokStyleCaptions } from "@remotion/captions";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F } from "./brand";

// Демонстраційні субтитри (без голосу): кожне слово — окремий Caption з часом у мс.
const WORDS = ["Один", "клік", "—", "і", "сторінка", "вже", "тут.", "А", "ми", "щойно", "пройшли", "весь", "її", "шлях."];
const STEP = 300;
const CAPTIONS: Caption[] = WORDS.map((w, i) => ({
  text: (i === 0 ? "" : " ") + w,
  startMs: 300 + i * STEP,
  endMs: 300 + (i + 1) * STEP,
  timestampMs: 300 + i * STEP + STEP / 2,
  confidence: null,
}));
const { pages } = createTikTokStyleCaptions({ captions: CAPTIONS, combineTokensWithinMilliseconds: 2000 });

export const CaptionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const page = [...pages].reverse().find((p) => ms >= p.startMs) ?? pages[0];
  return (
    <AbsoluteFill style={{ backgroundColor: C.surface }}>
      <div style={{ position: "absolute", left: 795, top: 120, width: 330, height: 330, borderRadius: "50%", background: C.bg, opacity: 0.75 }} />
      <div style={{ position: "absolute", left: 610, top: 500, width: 700, height: 640, borderRadius: "350px 350px 0 0", background: C.bg, opacity: 0.75 }} />
      <div
        style={{
          position: "absolute",
          left: 200,
          right: 200,
          bottom: 150,
          textAlign: "center",
          fontFamily: F.body,
          fontWeight: 700,
          fontSize: 64,
          lineHeight: 1.45,
          color: C.ink,
        }}
      >
        {ms >= page.startMs &&
          page.tokens.map((tok) => {
            const active = ms >= tok.fromMs && ms < tok.toMs;
            const past = ms >= tok.toMs;
            return (
              <span key={tok.fromMs} style={{ whiteSpace: "pre" }}>
                <span
                  style={{
                    padding: "0 10px",
                    borderRadius: 10,
                    background: active ? C.blue : "transparent",
                    color: active ? C.onBlue : C.ink,
                    opacity: active || past ? 1 : 0.4,
                  }}
                >
                  {tok.text.trim()}
                </span>{" "}
              </span>
            );
          })}
      </div>
    </AbsoluteFill>
  );
};
