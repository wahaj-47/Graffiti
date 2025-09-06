import { Application, extend, useApplication } from "@pixi/react";
import { Viewport } from "pixi-viewport";

extend({ Viewport });

export function Canvas() {
  const { app } = useApplication();

  return (
    <Application>
      <pixiViewport events={app.renderer.events}></pixiViewport>
    </Application>
  );
}
