import { extend, useApplication } from "@pixi/react";
import type { PropsWithChildren } from "react";
import { Viewport, type IViewportOptions } from "~/engine/core/Viewport";

extend({ Viewport });

export type ViewportComponentProps = PropsWithChildren<Omit<IViewportOptions, "events">>;

export function ViewportComponent({ drag, pinch, wheel, decelerate, children }: ViewportComponentProps) {
  const { app } = useApplication();

  if (!app.renderer) return;

  return (
    <pixiViewport drag={drag} pinch={pinch} wheel={wheel} decelerate={decelerate} events={app.renderer.events}>
      {children}
    </pixiViewport>
  );
}
