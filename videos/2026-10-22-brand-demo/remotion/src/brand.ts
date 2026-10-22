import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Бренд «Електрик на кремі» — джерело правди: assets/brand/brand.md
export const C = {
  bg: "#EEEAE2",
  surface: "#D9D4C9",
  ink: "#14161B",
  blue: "#2F47FF",
  orange: "#E2470F",
  onBlue: "#FFFFFF",
};

export const F = {
  head: "Oswald",
  body: "Manrope",
  mono: "JetBrains Mono",
  serif: "Cormorant",
};

export const fontsLoaded = Promise.all([
  loadFont({ family: F.head, url: staticFile("fonts/Oswald-Variable.ttf"), weight: "200 700", display: "block" }),
  loadFont({ family: F.body, url: staticFile("fonts/Manrope-Variable.ttf"), weight: "200 800", display: "block" }),
  loadFont({ family: F.mono, url: staticFile("fonts/JetBrainsMono-Variable.ttf"), weight: "100 800", display: "block" }),
  loadFont({ family: F.serif, url: staticFile("fonts/Cormorant-Italic-Variable.ttf"), weight: "300 700", style: "italic", display: "block" }),
]);
