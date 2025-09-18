import { extend, useApplication } from "@pixi/react";
import { useCallback, useEffect, useRef, type PropsWithChildren } from "react";
import { Viewport, type IViewportOptions } from "~/engine/core/Viewport";

extend({ Viewport });

export interface ViewportComponentProps extends IViewportOptions {}

export function ViewportComponent({ children, ...props }: PropsWithChildren<Omit<ViewportComponentProps, "events">>) {
  const { app } = useApplication();

  if (!app.renderer) return;

  return (
    <pixiViewport events={app.renderer.events} {...props}>
      {children}
    </pixiViewport>
  );
}
