import { extend, useApplication } from "@pixi/react";
import type { PropsWithChildren } from "react";
import { canUseDOM } from "~/client/utils";
import { Viewport, type IViewportOptions } from "~/engine/core/Viewport";

extend({ Viewport });

export type ViewportComponentProps = PropsWithChildren<Omit<IViewportOptions, "events">>;

export function ViewportComponent({ children }: ViewportComponentProps) {
  const { app } = useApplication();

  if (!app.renderer) return;

  return <pixiViewport events={app.renderer.events}>{children}</pixiViewport>;
}
