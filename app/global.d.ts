import { type PixiReactElementProps } from "@pixi/react";
import { Viewport } from "./engine/core/Viewport";
import { Artboard } from "./engine/core/Artboard";

declare module "@pixi/react" {
  interface PixiElements {
    pixiViewport: PixiReactElementProps<typeof Viewport>;
    pixiArtboard: PixiReactElementProps<typeof Artboard>;
  }
}
