import { extend, useApplication } from "@pixi/react";
import { type PropsWithChildren, type Ref } from "react";
import { Viewport, type IViewportOptions } from "~/engine/core/Viewport";

extend({ Viewport });

export interface ViewportComponentProps extends IViewportOptions {
  ref?: Ref<Viewport>;
}

export function ViewportComponent({ children, ...props }: PropsWithChildren<Omit<ViewportComponentProps, "events">>) {
  const { app } = useApplication();

  if (!app.renderer) return;

  return (
    <pixiViewport events={app.renderer.events} {...props}>
      {children}
    </pixiViewport>
  );
}
