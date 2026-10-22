import { Video } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { C } from "./brand";
import { CaptionsScene } from "./CaptionsScene";
import { ChartScene } from "./ChartScene";
import { MapScene } from "./MapScene";
import { SkillTag } from "./SkillTag";

// Демо-ролик бренду: кожен сегмент зроблено окремим скілом, Remotion зводить їх разом.
// HyperFrames 0–12 с · графік 12–16 · карта 16–20,5 · motion-broll 20,5–27,7 · субтитри 27,7–32,2 · промо 32,2–44,2
export const BrandDemo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence name="HyperFrames" from={0} durationInFrames={12 * fps}>
        <Video name="HyperFrames clip" src={staticFile("hyperframes.mp4")} muted />
        <SkillTag skill="hyperframes" />
      </Sequence>
      <Sequence name="Графік" from={12 * fps} durationInFrames={4 * fps}>
        <ChartScene />
        <SkillTag skill="remotion" />
      </Sequence>
      <Sequence name="Карта" from={16 * fps} durationInFrames={4.5 * fps}>
        <MapScene />
        <SkillTag skill="remotion-maps" />
      </Sequence>
      <Sequence name="B-roll" from={20.5 * fps} durationInFrames={7.2 * fps}>
        <Video name="motion-broll clip" src={staticFile("broll.mp4")} muted />
        <SkillTag skill="motion-broll" />
      </Sequence>
      <Sequence name="Субтитри" from={27.7 * fps} durationInFrames={4.5 * fps}>
        <CaptionsScene />
        <SkillTag skill="remotion-captions" />
      </Sequence>
      <Sequence name="Промо" from={32.2 * fps} durationInFrames={12 * fps}>
        <Video name="Promo clip" src={staticFile("promo.mp4")} muted />
        <SkillTag skill="explainer-high-energy" />
      </Sequence>
    </AbsoluteFill>
  );
};
