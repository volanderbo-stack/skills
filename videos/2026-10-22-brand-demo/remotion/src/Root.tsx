import { Composition } from "remotion";
import { fontsLoaded } from "./brand";
import { BrandDemo } from "./BrandDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BrandDemo"
      component={BrandDemo}
      durationInFrames={1326}
      fps={30}
      width={1920}
      height={1080}
      calculateMetadata={async () => {
        await fontsLoaded;
        return {};
      }}
    />
  );
};
