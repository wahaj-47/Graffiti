import { type PixiReactElementProps } from "@pixi/react";
import { Viewport } from "./engine/core/Viewport";
import { Layer } from "./engine/core/Layer";

declare module "@pixi/react" {
  interface PixiElements {
    pixiViewport: PixiReactElementProps<typeof Viewport>;
    pixiLayer: PixiReactElementProps<typeof Layer>;
  }
}
