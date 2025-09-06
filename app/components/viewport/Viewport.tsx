import { extend, useApplication } from "@pixi/react";
import * as PixiViewport from "pixi-viewport";
import type { PropsWithChildren } from "react";

const { Viewport } = PixiViewport;
extend({ Viewport });

type GraffitiViewportProps = Omit<PixiViewport.IViewportOptions, "events">;

export function GraffitiViewport({ children }: PropsWithChildren<GraffitiViewportProps>) {
  const { app } = useApplication();

  return <pixiViewport events={app.renderer.events}>{children}</pixiViewport>;
}
