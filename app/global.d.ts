import { type Brush } from "~/graffiti";
import { type PixiReactElementProps } from "@pixi/react";

declare module "@pixi/react" {
  interface PixiElements {
    pixiBrush: PixiReactElementProps<typeof Brush>;
  }
}
